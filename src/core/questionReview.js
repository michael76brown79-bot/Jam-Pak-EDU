const CROSS_GRADE_REVIEW_NOTE = "This prompt appears in another grade; confirm the correct grade.";
const MISSING_EXPLANATION_REVIEW_NOTE = "Add a clear explanation for students.";

function normalizePrompt(prompt) {
  return String(prompt || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function findCrossGradeDuplicateIds(questions) {
  const groups = new Map();
  for (const question of questions) {
    const prompt = normalizePrompt(question.prompt);
    if (!prompt) continue;
    const key = `${String(question.subject || "").toLowerCase()}|${prompt}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(question);
  }

  const duplicateIds = new Set();
  for (const group of groups.values()) {
    if (new Set(group.map((question) => String(question.gradeBand))).size < 2) continue;
    group.forEach((question) => duplicateIds.add(question.id));
  }
  return duplicateIds;
}

function applyLegacyQuestionReview(questions) {
  const crossGradeDuplicateIds = findCrossGradeDuplicateIds(questions);
  return questions.map((question) => {
    const hasReviewStatus = ["pending", "approved", "rejected"].includes(question.reviewStatus);
    let reviewStatus = hasReviewStatus ? question.reviewStatus : "approved";
    let reviewNote = String(question.reviewNote || "")
      .replace(MISSING_EXPLANATION_REVIEW_NOTE, "")
      .trim();

    if (reviewStatus === "pending" && !reviewNote && !crossGradeDuplicateIds.has(question.id)) {
      reviewStatus = "approved";
    }

    if (!hasReviewStatus && crossGradeDuplicateIds.has(question.id)) {
      reviewStatus = "pending";
      reviewNote = CROSS_GRADE_REVIEW_NOTE;
    } else if (reviewStatus === "pending" && crossGradeDuplicateIds.has(question.id) && !reviewNote) {
      reviewNote = CROSS_GRADE_REVIEW_NOTE;
    }

    return { ...question, reviewStatus, reviewNote };
  });
}

module.exports = {
  CROSS_GRADE_REVIEW_NOTE,
  MISSING_EXPLANATION_REVIEW_NOTE,
  findCrossGradeDuplicateIds,
  applyLegacyQuestionReview
};
