function createSession({ mode, gradeBand, subject }) {
  return {
    sessionId: `sess_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    mode,
    filters: { gradeBand, subject },
    askedQuestionIds: [],
    players: [],
    roomCode: null
  };
}

function createRoomCode() {
  const suffix = Math.floor(Math.random() * 100000).toString().padStart(5, "0");
  return `JAM${suffix}`;
}

function shouldShowLeaderboard(session) {
  return session.showLeaderboard !== false;
}

module.exports = { createSession, createRoomCode, shouldShowLeaderboard };
