# Jam-Pak EDU

Jam-Pak EDU is a Jamaican-themed educational game prototype.

## Features

- **Host Game** – create a game room with a shareable room code
- **Join Game** – join a room using a room code
- **Solo Study** – self-paced quiz with instant feedback
- **Debate Mode** – debate topic generator with side selection and argument prompts
- **Teacher & Student Signup/Login**
- **Sample Question Bank** – 10 questions across Maths, Science, History, English and Geography

## Run locally

1. Install [Node.js](https://nodejs.org/)
2. Install dependencies: `npm install`
3. Start the server: `node src/server.js`
4. Open: [http://localhost:3001](http://localhost:3001)

## Run tests

```
npm test
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/signup` | Create a student or teacher account |
| POST | `/api/login` | Log in |
| GET | `/api/solo/questions` | Fetch quiz questions (pass `?count=N`) |
| POST | `/api/solo/answer` | Submit an answer and get feedback |
| GET | `/api/debate/topic` | Get a random debate topic |
| POST | `/api/game/host` | Create a multiplayer game room |
| POST | `/api/game/join` | Join a game room by code |
| GET | `/api/game/:roomCode` | Get room status and scores |

Real-time multiplayer (Host/Join) is powered by **Socket.IO**.
