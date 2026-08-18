function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function matchesChosenTopic(question, selectedValue) {
  const chosen = normalize(selectedValue);
  const subject = normalize(question.subject);
  const category = normalize(question.category);
  return subject === chosen || category === chosen;
}

function matchesChosenGrade(questionGrade, selectedGrade) {
  // All questions are now tagged with individual grades.
  // Exact match only — no range overlap needed.
  return normalize(questionGrade) === normalize(selectedGrade);
}

function getEligibleQuestions(session, allQuestions) {
  const { gradeBand, subject } = session.filters;
  const unanswered = allQuestions.filter((q) => !session.askedQuestionIds.includes(q.id));

  // Prefer questions that match both grade and subject exactly.
  const exactInBank = allQuestions.filter((q) =>
    matchesChosenGrade(q.gradeBand, gradeBand) && matchesChosenTopic(q, subject)
  );
  const exactUnanswered = unanswered.filter((q) =>
    matchesChosenGrade(q.gradeBand, gradeBand) && matchesChosenTopic(q, subject)
  );

  if (exactInBank.length > 0) {
    return exactUnanswered;
  }

  // Fallback 1: same grade, any subject (e.g. subject not yet in bank for this grade)
  const gradeOnly = unanswered.filter((q) => matchesChosenGrade(q.gradeBand, gradeBand));
  if (gradeOnly.length) return gradeOnly;

  // Fallback 2: same subject, any grade (avoids a completely empty session)
  const subjectOnly = unanswered.filter((q) => matchesChosenTopic(q, subject));
  if (subjectOnly.length) return subjectOnly;

  return unanswered;
}

function getNextQuestion(session, allQuestions) {
  const eligible = getEligibleQuestions(session, allQuestions);
  if (!eligible.length) return null;
  const next = eligible[Math.floor(Math.random() * eligible.length)];
  session.askedQuestionIds.push(next.id);
  return next;
}

function checkAnswer(question, selectedOptionId) {
  const isCorrect = question.correctOptionId === selectedOptionId;
  return { isCorrect, correctOptionId: question.correctOptionId, explanation: question.explanation };
}

module.exports = { getEligibleQuestions, getNextQuestion, checkAnswer };
