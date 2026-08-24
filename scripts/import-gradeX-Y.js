/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";
const GRADE_BAND = "X-Y"; // replace with the real band

const qSA = (id, subject, category, prompt, correctAnswer, explanation = "") => ({
  id,
  gradeBand: GRADE_BAND,
  subject,
  category,
  type: "short_answer",
  difficulty: "medium",
  prompt,
  correctAnswer,
  explanation
});

const qTF = (id, subject, category, prompt, correctBoolean, explanation = "") => ({
  id,
  gradeBand: GRADE_BAND,
  subject,
  category,
  type: "true_false",
  difficulty: "medium",
  prompt,
  correctBoolean,
  explanation
});

const qMC = (id, subject, category, prompt, choices, correctChoice, explanation = "") => ({
  id,
  gradeBand: GRADE_BAND,
  subject,
  category,
  type: "multiple_choice",
  difficulty: "medium",
  prompt,
  choices,
  correctChoice,
  explanation
});

const questions = [
  qSA(
    "example_001",
    "Mathematics",
    "Math",
    "If f(x) = 3x^2 - 5x + 2, find f(-2).",
    "24",
    "Substitute x = -2: 3(-2)^2 - 5(-2) + 2 = 12 + 10 + 2 = 24."
  ),
  qTF(
    "example_002",
    "Mathematics",
    "Math",
    "Perpendicular lines have gradients whose product is -1.",
    true,
    "Perpendicular gradients multiply to -1."
  ),
  qMC(
    "example_003_math",
    "Mathematics",
    "Math",
    "If f(x) = 3x^2 - 5x + 2, find f(-2).",
    [
      { key: "A", text: "24" },
      { key: "B", text: "25" },
      { key: "C", text: "26" },
      { key: "D", text: "27" }
    ],
    "A",
    "Substitute x = -2 and simplify to get 24."
  ),
  qMC(
    "example_004_eng",
    "English",
    "English",
    "Choose the correct word.",
    [
      { key: "A", text: "affect" },
      { key: "B", text: "effect" }
    ],
    "A",
    "Affect means to influence."
  )
];

async function run() {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questions })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("Import failed:", data);
    process.exit(1);
  }

  console.log(`Imported ${questions.length} questions.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { useState } from "react";

export default function QuestionCard({ question }) {
  const [flipped, setFlipped] = useState(false);

  const answer =
    question.type === "true_false"
      ? question.correctBoolean ? "True" : "False"
      : question.correctAnswer || question.correctChoice || "N/A";

  return (
    <div
      className={`question-card ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
    >
      <div className="question-card-inner">
        <div className="question-card-front">
          <h3>{question.subject}</h3>
          <p>{question.prompt}</p>
          <small>Click to reveal answer</small>
        </div>

        <div className="question-card-back">
          <h3>Answer</h3>
          <p>{answer}</p>
          <h4>Explanation</h4>
          <p>{question.explanation || "No explanation provided."}</p>
        </div>
      </div>
    </div>
  );
}

