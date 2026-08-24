/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

function qSA(id, prompt, answers, explanation = "") {
  return {
    id,
    gradeBand: "7-9",
    subject: "Mathematics",
    category: "Mathematics",
    difficulty: "medium",
    type: "short_answer",
    prompt,
    acceptableAnswers: Array.isArray(answers) ? answers : [answers],
    explanation
  };
}

function qTF(id, prompt, isTrue, explanation = "") {
  return {
    id,
    gradeBand: "7-9",
    subject: "Mathematics",
    category: "Mathematics",
    difficulty: "medium",
    type: "true_false",
    prompt,
    correctBoolean: isTrue,
    explanation
  };
}

function qMC(id, prompt, choices, correctKey, explanation = "") {
  return {
    id,
    gradeBand: "7-9",
    subject: "Mathematics",
    category: "Mathematics",
    difficulty: "medium",
    type: "multiple_choice",
    prompt,
    choices, // [{key:"A",text:"..."},...]
    correctChoice: correctKey,
    explanation
  };
}

const questions = [
  qMC("g7_9_math_001", "What is the value of (-5) × (-4) + (-3)?", [
    { key: "A", text: "-23" }, { key: "B", text: "17" }, { key: "C", text: "-17" }, { key: "D", text: "23" }
  ], "B"),
  qSA("g7_9_math_002", "Solve the linear equation for x: 3x - 7 = 14.", ["7"]),
  qSA("g7_9_math_003", "Expand and simplify: 4(2x - 5) + 3x.", ["11x-20", "11x - 20"]),
  qTF("g7_9_math_004", "A triangle with sides 5 cm, 12 cm, and 13 cm is right-angled.", true),
  qSA("g7_9_math_005", "Calculate simple interest on $12,000 at 5% p.a. for 3 years.", ["1800", "$1800"]),
  qSA("g7_9_math_006", "Find the median: 55, 82, 67, 91, 74.", ["74"]),
  qSA("g7_9_math_007", "If 3:5 = x:20, find x.", ["12"]),
  qSA("g7_9_math_008", "Find 2^5 - 3^2.", ["23"]),
  qSA("g7_9_math_009", "Area of a circle with radius 14 cm (π = 22/7).", ["616", "616 cm2", "616 cm²"]),
  qTF("g7_9_math_010", "The sum of interior angles of any quadrilateral is 180°.", false),
  qSA("g7_9_math_011", "Find the gradient of y = -4x + 7.", ["-4"]),
  qSA("g7_9_math_012", "A bicycle costs $25,000 plus 15% GCT. Total cost?", ["28750", "$28750"]),
  qSA("g7_9_math_013", "Convert 2.5 kilometres to metres.", ["2500", "2500 m"]),
  qTF("g7_9_math_014", "2 is the only even prime number.", true),
  qSA("g7_9_math_015", "Factorize completely: 6ax - 9ay.", ["3a(2x-3y)", "3a(2x - 3y)"]),
  qSA("g7_9_math_016", "Find Q1 of: 3, 5, 7, 8, 12, 13, 15.", ["5"]),
  qSA("g7_9_math_017", "Find √169 × 2.", ["26"]),
  qTF("g7_9_math_018", "An obtuse angle is strictly between 90° and 180°.", true),
  qSA("g7_9_math_019", "Solve 2y + 5 ≤ 17.", ["y<=6", "y ≤ 6", "y<= 6"]),
  qMC("g7_9_math_020", "A bag has 4 blue and 6 red marbles. P(blue)?", [
    { key: "A", text: "1/2" }, { key: "B", text: "2/5" }, { key: "C", text: "3/5" }, { key: "D", text: "2/3" }
  ], "B")
];

async function run() {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questions })
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Import failed");
  console.log("Imported:", questions.length, data);
}

run().catch((e) => {
  console.error(e.message);
  process.exit(1);
});