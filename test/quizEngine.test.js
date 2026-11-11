const test = require("node:test");
const assert = require("node:assert/strict");
const { getEligibleQuestions } = require("../src/core/quizEngine");
const { shouldShowLeaderboard } = require("../src/core/session");
const { applyLegacyQuestionReview } = require("../src/core/questionReview");
const questionBank = require("../src/data/question-bank.json");
const { questions: seedQuestions } = require("../src/data/questions");

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

test("legacy questions need review for cross-grade repeats, not missing explanations", () => {
  const reviewed = applyLegacyQuestionReview([
    { id: "unique", gradeBand: "5", subject: "English", prompt: "Unique prompt", explanation: "" },
    {
      id: "repeat-5",
      gradeBand: "5",
      subject: "English",
      prompt: "Repeated prompt",
      explanation: "",
      reviewStatus: "pending",
      reviewNote: "Add a clear explanation for students."
    },
    { id: "repeat-6", gradeBand: "6", subject: "English", prompt: "Repeated prompt", explanation: "" },
    {
      id: "old-pending",
      gradeBand: "5",
      subject: "Math",
      prompt: "Older prompt",
      reviewStatus: "pending",
      reviewNote: "Add a clear explanation for students."
    }
  ]);

  assert.equal(reviewed.find((question) => question.id === "unique").reviewStatus, "approved");
  assert.equal(reviewed.find((question) => question.id === "repeat-5").reviewStatus, "pending");
  assert.equal(reviewed.find((question) => question.id === "repeat-6").reviewStatus, "pending");
  assert.equal(reviewed.find((question) => question.id === "repeat-5").reviewNote, "This prompt appears in another grade; confirm the correct grade.");
  assert.equal(reviewed.find((question) => question.id === "old-pending").reviewStatus, "approved");
});

test("the new Grade 5 and 6 English questions have matching fallback copies and answer keys", () => {
  const batch = questionBank.filter((question) => question.id.startsWith("pilot-g"));
  const seedById = new Map(seedQuestions.map((question) => [question.id, question]));
  const reviewedBatch = applyLegacyQuestionReview(batch);

  assert.equal(batch.length, 10);
  assert.equal(batch.filter((question) => question.gradeBand === "5").length, 5);
  assert.equal(batch.filter((question) => question.gradeBand === "6").length, 5);

  for (const [index, question] of batch.entries()) {
    const seedQuestion = seedById.get(question.id);
    assert.ok(seedQuestion);
    assert.equal(seedQuestion.prompt, question.prompt);
    assert.equal(seedQuestion.correctOptionId, question.correctOptionId);
    assert.equal(reviewedBatch[index].reviewStatus, "approved");
    assert.equal(question.subject, "English");
    assert.equal(question.type, "mcq");
    assert.equal(question.options.length, 4);
    assert.equal(question.options.filter((option) => option.id === question.correctOptionId).length, 1);
    assert.ok(question.explanation.length >= 10);
  }
});
