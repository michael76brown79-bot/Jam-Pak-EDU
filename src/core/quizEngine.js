function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function matchesChosenTopic(question, selectedValue, selectedSubject) {
  const chosen = normalize(selectedValue);
  const subject = normalize(question.subject);
  const category = normalize(question.category);
  if (subject !== normalize(selectedSubject)) return false;
  return chosen === normalize(selectedSubject)
    ? subject === chosen || category === chosen
    : category === chosen;
}

function matchesChosenGrade(questionGrade, selectedGrade) {
  // All questions are now tagged with individual grades.
  // Exact match only — no range overlap needed.
  return normalize(questionGrade) === normalize(selectedGrade);
}

function getEligibleQuestions(session, allQuestions) {
  const { gradeBand, subject, category } = session.filters;
  const unanswered = allQuestions.filter((q) => !session.askedQuestionIds.includes(q.id));

  // Never borrow questions from another grade, subject, or selected topic.
  const exactInBank = allQuestions.filter((q) =>
    matchesChosenGrade(q.gradeBand, gradeBand) &&
    matchesChosenTopic(q, category || subject, subject)
  );
  const exactUnanswered = unanswered.filter((q) =>
    matchesChosenGrade(q.gradeBand, gradeBand) &&
    matchesChosenTopic(q, category || subject, subject)
  );

  if (exactInBank.length > 0) {
    return exactUnanswered;
  }

  return [];
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
