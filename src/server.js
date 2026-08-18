'use strict';

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { questions } = require('./questions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

// ── In-memory stores ──────────────────────────────────────────────────────────
const rooms = new Map();   // roomCode → { host, players: [], state, questions, round }
const users = new Map();   // username → { username, role, passwordHash }

// ── Rate limiters ─────────────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute
  max: 120,
  standardHeaders: true,
  legacyHeaders: false
});

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateRoomCode() {
  return crypto.randomBytes(3).toString('hex').toUpperCase(); // e.g. "A3F2C1"
}

async function hashPassword(pw) {
  return bcrypt.hash(pw, 10);
}

async function verifyPassword(pw, hash) {
  return bcrypt.compare(pw, hash);
}

function pickQuestions(count = 5) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(generalLimiter);

// ── REST API ──────────────────────────────────────────────────────────────────

// Signup
app.post('/api/signup', authLimiter, async (req, res) => {
  const { username, password, role } = req.body || {};
  if (!username || !password || !['teacher', 'student'].includes(role)) {
    return res.status(400).json({ error: 'username, password and role (teacher|student) required' });
  }
  if (users.has(username)) {
    return res.status(409).json({ error: 'Username already taken' });
  }
  const passwordHash = await hashPassword(password);
  users.set(username, { username, role, passwordHash });
  return res.status(201).json({ message: 'Account created', username, role });
});

// Login
app.post('/api/login', authLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  const user = users.get(username);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  return res.json({ message: 'Login successful', username: user.username, role: user.role });
});

// Solo study – return a set of questions (without answers)
app.get('/api/solo/questions', (req, res) => {
  const count = Math.min(parseInt(req.query.count, 10) || 5, questions.length);
  const selected = pickQuestions(count).map(({ id, subject, grade, text, options }) => ({
    id, subject, grade, text, options
  }));
  return res.json({ questions: selected });
});

// Solo study – submit answer for one question
app.post('/api/solo/answer', (req, res) => {
  const { questionId, answer } = req.body || {};
  const q = questions.find(x => x.id === questionId);
  if (!q) return res.status(404).json({ error: 'Question not found' });
  const correct = q.answer === answer;
  return res.json({ correct, correctAnswer: q.answer, explanation: q.explanation });
});

// Debate – return a debate prompt/topic
app.get('/api/debate/topic', (req, res) => {
  const topics = [
    'Should homework be banned in Jamaican schools?',
    'Is technology more harmful than beneficial for students?',
    'Should school uniforms be mandatory?',
    'Should physical education be compulsory every day?',
    'Is social media a positive influence on Jamaican youth?'
  ];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  return res.json({ topic });
});

// Host game – create a room
app.post('/api/game/host', (req, res) => {
  const { username } = req.body || {};
  if (!username) return res.status(400).json({ error: 'username required' });
  const roomCode = generateRoomCode();
  rooms.set(roomCode, {
    host: username,
    players: [username],
    state: 'waiting',  // waiting | active | finished
    questions: pickQuestions(5),
    round: 0,
    scores: { [username]: 0 }
  });
  return res.status(201).json({ roomCode });
});

// Join game – join an existing room
app.post('/api/game/join', (req, res) => {
  const { username, roomCode } = req.body || {};
  if (!username || !roomCode) return res.status(400).json({ error: 'username and roomCode required' });
  const room = rooms.get(roomCode.toUpperCase());
  if (!room) return res.status(404).json({ error: 'Room not found' });
  if (room.state !== 'waiting') return res.status(409).json({ error: 'Game already started' });
  if (!room.players.includes(username)) {
    room.players.push(username);
    room.scores[username] = 0;
  }
  return res.json({ roomCode: roomCode.toUpperCase(), players: room.players });
});

// Get room info
app.get('/api/game/:roomCode', (req, res) => {
  const room = rooms.get(req.params.roomCode.toUpperCase());
  if (!room) return res.status(404).json({ error: 'Room not found' });
  const { host, players, state, round, scores } = room;
  return res.json({ host, players, state, round, scores });
});

// Serve frontend for any other path
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// ── Socket.IO ─────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  // Join a room channel
  socket.on('joinRoom', ({ roomCode, username }) => {
    const code = (roomCode || '').toUpperCase();
    const room = rooms.get(code);
    if (!room) {
      socket.emit('error', { message: 'Room not found' });
      return;
    }
    socket.join(code);
    io.to(code).emit('playerJoined', { username, players: room.players });
  });

  // Host starts the game
  socket.on('startGame', ({ roomCode }) => {
    const code = (roomCode || '').toUpperCase();
    const room = rooms.get(code);
    if (!room) return;
    room.state = 'active';
    room.round = 0;
    sendNextQuestion(code);
  });

  // Player submits an answer
  socket.on('submitAnswer', ({ roomCode, username, questionId, answer }) => {
    const code = (roomCode || '').toUpperCase();
    const room = rooms.get(code);
    if (!room || room.state !== 'active') return;
    const q = room.questions[room.round];
    if (!q || q.id !== questionId) return;
    const correct = q.answer === answer;
    if (correct && room.scores[username] !== undefined) {
      room.scores[username] += 10;
    }
    socket.emit('answerResult', { correct, correctAnswer: q.answer, explanation: q.explanation });
    io.to(code).emit('scoreUpdate', { scores: room.scores });
  });

  // Advance to next question
  socket.on('nextQuestion', ({ roomCode }) => {
    const code = (roomCode || '').toUpperCase();
    const room = rooms.get(code);
    if (!room) return;
    room.round += 1;
    if (room.round >= room.questions.length) {
      room.state = 'finished';
      io.to(code).emit('gameOver', { scores: room.scores });
    } else {
      sendNextQuestion(code);
    }
  });
});

function sendNextQuestion(roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;
  const q = room.questions[room.round];
  const { id, subject, grade, text, options } = q;
  io.to(roomCode).emit('question', {
    round: room.round + 1,
    total: room.questions.length,
    question: { id, subject, grade, text, options }
  });
}

// ── Start ─────────────────────────────────────────────────────────────────────
if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Jam-Pak EDU server running at http://localhost:${PORT}`);
  });
}

module.exports = { app, server };
