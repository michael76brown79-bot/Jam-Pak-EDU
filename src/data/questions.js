const questions = [
  {
    id: "q1",
    gradeBand: "3-4",
    subject: "Math",
    category: "Addition",
    difficulty: "easy",
    prompt: "What is 7 + 5?",
    options: [
      { id: "a", text: "11" },
      { id: "b", text: "12" },
      { id: "c", text: "13" },
      { id: "d", text: "10" }
    ],
    correctOptionId: "b",
    explanation: "7 plus 5 equals 12."
  },
  {
    id: "q2",
    gradeBand: "3-4",
    subject: "Math",
    category: "Subtraction",
    difficulty: "easy",
    prompt: "What is 15 - 7?",
    options: [
      { id: "a", text: "8" },
      { id: "b", text: "7" },
      { id: "c", text: "9" },
      { id: "d", text: "6" }
    ],
    correctOptionId: "a",
    explanation: "15 minus 7 equals 8."
  },
  {
    id: "q3",
    gradeBand: "7-9",
    subject: "Geography",
    category: "Jamaica",
    difficulty: "medium",
    prompt: "What is the capital city of Jamaica?",
    options: [
      { id: "a", text: "Montego Bay" },
      { id: "b", text: "Spanish Town" },
      { id: "c", text: "Kingston" },
      { id: "d", text: "Mandeville" }
    ],
    correctOptionId: "c",
    explanation: "Kingston is the capital and largest city of Jamaica."
  }
];

module.exports = { questions };
