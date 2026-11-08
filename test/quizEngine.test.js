const test = require("node:test");
const assert = require("node:assert/strict");
const { getEligibleQuestions } = require("../src/core/quizEngine");
const { shouldShowLeaderboard } = require("../src/core/session");

function session(filters, askedQuestionIds = []) {
  return { filters, askedQuestionIds };
}

const questions = [
  { id: "g4-math", gradeBand: "4", subject: "Math", category: "Fractions" },
  { id: "g5-math", gradeBand: "5", subject: "Math", category: "Fractions" },
  { id: "g4-english", gradeBand: "4", subject: "English", category: "Fractions" },
  { id: "g4-topic", gradeBand: "4", subject: "Math", category: "Geometry" }
];

test("quiz questions never fall back to another grade or subject", () => {
  assert.deepEqual(
    getEligibleQuestions(session({ gradeBand: "4", subject: "Science", category: "Science" }), questions),
    []
  );
  assert.deepEqual(
    getEligibleQuestions(session({ gradeBand: "4", subject: "Math", category: "Fractions" }), questions),
    [questions[0]]
  );
});

test("a selected topic must match exactly and asked questions are not repeated", () => {
  const filters = { gradeBand: "4", subject: "Math", category: "Fractions" };
  assert.deepEqual(getEligibleQuestions(session(filters, ["g4-math"]), questions), []);
  assert.deepEqual(
    getEligibleQuestions(session({ ...filters, category: "Geometry" }), questions),
    [questions[3]]
  );
});

test("leaderboards are shown by default and can be disabled for a teacher quiz", () => {
  assert.equal(shouldShowLeaderboard({}), true);
  assert.equal(shouldShowLeaderboard({ showLeaderboard: true }), true);
  assert.equal(shouldShowLeaderboard({ showLeaderboard: false }), false);
});
