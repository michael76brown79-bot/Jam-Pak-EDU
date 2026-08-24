/* eslint-disable no-console */
const API = "http://localhost:3001/api/questions/import";

function qSA(id, category, prompt, answers, explanation = "", difficulty = "hard") {
  return {
    id,
    gradeBand: "10-11",
    subject: category,
    category,
    difficulty,
    type: "short_answer",
    prompt,
    acceptableAnswers: Array.isArray(answers) ? answers : [answers],
    explanation
  };
}

function qTF(id, category, prompt, value, explanation = "", difficulty = "hard") {
  return {
    id,
    gradeBand: "10-11",
    subject: category,
    category,
    difficulty,
    type: "true_false",
    prompt,
    correctBoolean: value,
    explanation
  };
}

const questions = [
  qSA("g10_11_math_001", "Mathematics", "If f(x) = 3x^2 - 5x + 2, find f(-2).", ["24"], "3(-2)^2 - 5(-2) + 2 = 24"),
  qSA("g10_11_math_002", "Mathematics", "Calculate the length of vector (5, -12).", ["13"]),
  qTF("g10_11_math_003", "Mathematics", "If two lines are perpendicular, the product of their gradients is -1.", true),
  qSA("g10_11_math_004", "Mathematics", "Solve for x: [[2,3],[1,4]] * [x,1]^T = [7,9]^T.", ["2"]),
  qSA("g10_11_math_005", "Mathematics", "What is the scale factor of an enlargement if area scale factor is 36?", ["6"]),
  qSA("g10_11_math_006", "Mathematics", "How many subsets can be formed from a set with 5 elements?", ["32"]),
  qSA("g10_11_math_007", "Mathematics", "Find the sum of interior angles of a 10-sided polygon.", ["1440", "1440 degrees"]),
  qTF("g10_11_math_008", "Mathematics", "The sine of 150 degrees is negative.", false),
  qSA("g10_11_math_009", "Mathematics", "Volume of a cylinder with radius 3 cm, height 7 cm, using pi=22/7.", ["198", "198 cm3", "198 cm³"]),
  qSA("g10_11_math_010", "Mathematics", "Factorize: 2x^2 - 7x + 3.", ["(2x-1)(x-3)", "(x-3)(2x-1)"]),
  qSA("g10_11_math_011", "Mathematics", "Find gradient of a line parallel to 4x - 2y = 8.", ["2"]),
  qSA("g10_11_math_012", "Mathematics", "Find the upper class boundary for 25 - 29.", ["29.5"]),
  qTF("g10_11_math_013", "Mathematics", "A cyclic quadrilateral has opposite angles summing to 180°.", true),
  qSA("g10_11_math_014", "Mathematics", "If log2(x) = 5, find x.", ["32"]),
  qSA("g10_11_math_015", "Mathematics", "Find total surface area of a cube with volume 64 cm^3.", ["96", "96 cm2", "96 cm²"]),
  qSA("g10_11_math_016", "Mathematics", "Midpoint between P(-3,8) and Q(5,-2).", ["(1,3)", "1,3"]),
  qTF("g10_11_math_017", "Mathematics", "The transpose of a 2x3 matrix is 3x2.", true),
  qSA("g10_11_math_018", "Mathematics", "Standard deviation of a dataset where all values are identical.", ["0"]),
  qSA("g10_11_math_019", "Mathematics", "Find tan(45°).", ["1"]),
  qSA("g10_11_math_020", "Mathematics", "Find roots of x^2 - 9 = 0.", ["3 and -3", "-3 and 3", "x=3, x=-3"])
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

  console.log("Import success:", data);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});