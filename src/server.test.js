'use strict';
/**
 * Basic integration tests for Jam-Pak EDU server.
 * Run with: node src/server.test.js
 */
const http = require('http');

const BASE = 'http://localhost:3002';
let passed = 0;
let failed = 0;

// Override port for tests
process.env.PORT = '3002';
const { server } = require('./server');

server.on('listening', runTests);
server.listen(3002);

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'localhost',
      port: 3002,
      path,
      method,
      headers: { 'Content-Type': 'application/json', ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) }
    };
    const req = http.request(options, (res) => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, body: raw }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function assert(condition, label) {
  if (condition) { console.log('  ✅', label); passed++; }
  else           { console.error('  ❌', label); failed++; }
}

async function runTests() {
  console.log('\nJam-Pak EDU – Server Tests\n');

  // Signup
  console.log('Signup tests:');
  let r = await request('POST', '/api/signup', { username: 'alice', password: 'pw123', role: 'student' });
  assert(r.status === 201, 'signup creates student account (201)');
  assert(r.body.role === 'student', 'role is student');

  r = await request('POST', '/api/signup', { username: 'bob', password: 'pw456', role: 'teacher' });
  assert(r.status === 201, 'signup creates teacher account (201)');
  assert(r.body.role === 'teacher', 'role is teacher');

  r = await request('POST', '/api/signup', { username: 'alice', password: 'pw', role: 'student' });
  assert(r.status === 409, 'duplicate username returns 409');

  r = await request('POST', '/api/signup', { username: 'x', password: '', role: 'student' });
  assert(r.status === 400, 'missing password returns 400');

  // Login
  console.log('\nLogin tests:');
  r = await request('POST', '/api/login', { username: 'alice', password: 'pw123' });
  assert(r.status === 200, 'login succeeds (200)');
  assert(r.body.username === 'alice', 'returns username');

  r = await request('POST', '/api/login', { username: 'alice', password: 'wrong' });
  assert(r.status === 401, 'wrong password returns 401');

  // Solo questions
  console.log('\nSolo study tests:');
  r = await request('GET', '/api/solo/questions?count=3');
  assert(r.status === 200, 'solo questions returns 200');
  assert(Array.isArray(r.body.questions) && r.body.questions.length === 3, 'returns 3 questions');
  assert(!r.body.questions[0].answer, 'answers are hidden');

  const qId = r.body.questions[0].id;
  const { questions: allQ } = require('./questions');
  const correctAnswer = allQ.find(q => q.id === qId).answer;
  r = await request('POST', '/api/solo/answer', { questionId: qId, answer: correctAnswer });
  assert(r.status === 200, 'answer submission 200');
  assert(r.body.correct === true, 'correct answer flagged as correct');

  r = await request('POST', '/api/solo/answer', { questionId: qId, answer: 'WRONG' });
  assert(r.body.correct === false, 'wrong answer flagged incorrect');

  // Host + Join game
  console.log('\nHost/Join game tests:');
  r = await request('POST', '/api/game/host', { username: 'alice' });
  assert(r.status === 201, 'host game 201');
  const roomCode = r.body.roomCode;
  assert(typeof roomCode === 'string' && roomCode.length === 6, 'room code is 6 chars');

  r = await request('GET', `/api/game/${roomCode}`);
  assert(r.status === 200, 'get room 200');
  assert(r.body.state === 'waiting', 'room state is waiting');

  r = await request('POST', '/api/game/join', { username: 'bob', roomCode });
  assert(r.status === 200, 'join game 200');
  assert(r.body.players.includes('bob'), 'bob is in players');

  r = await request('POST', '/api/game/join', { username: 'carol', roomCode: 'ZZZZZZ' });
  assert(r.status === 404, 'invalid room returns 404');

  // Debate
  console.log('\nDebate tests:');
  r = await request('GET', '/api/debate/topic');
  assert(r.status === 200, 'debate topic 200');
  assert(typeof r.body.topic === 'string', 'topic is a string');

  // Summary
  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  server.close(() => process.exit(failed > 0 ? 1 : 0));
}
