const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const databaseUrl = String(process.env.DATABASE_URL || "").trim();
const databaseSsl = process.env.DATABASE_SSL === "true";
const pool = databaseUrl
  ? new Pool({
      connectionString: databaseUrl,
      ssl: databaseSsl
        ? { rejectUnauthorized: false }
        : process.env.NODE_ENV === "production" ? {} : undefined
    })
  : null;

if (pool) {
  pool.on("error", (error) => console.error("PostgreSQL connection error:", error.message));
}

const schemaFile = path.join(__dirname, "..", "data", "schema.sql");
let applicationStateWrites = Promise.resolve();
const QUESTION_COLUMNS = [
  "id", "grade_band", "subject", "category", "difficulty", "type", "prompt",
  "options", "correct_option_id", "correct_boolean", "acceptable_answers",
  "explanation", "review_status", "review_note", "author_role", "author_teacher_id",
  "source_reference"
];

function isConfigured() {
  return Boolean(pool);
}

function questionValues(question) {
  return [
    question.id,
    String(question.gradeBand || ""),
    String(question.subject || ""),
    String(question.category || question.subject || ""),
    String(question.difficulty || "easy"),
    String(question.type || "mcq"),
    String(question.prompt || ""),
    JSON.stringify(Array.isArray(question.options) ? question.options : []),
    question.correctOptionId || null,
    typeof question.correctBoolean === "boolean" ? question.correctBoolean : null,
    JSON.stringify(Array.isArray(question.acceptableAnswers) ? question.acceptableAnswers : []),
    String(question.explanation || ""),
    ["pending", "approved", "rejected"].includes(question.reviewStatus) ? question.reviewStatus : "approved",
    String(question.reviewNote || ""),
    question.authorRole || null,
    question.authorTeacherId || null,
    question.sourceReference || null
  ];
}

async function insertQuestions(questions, queryClient = pool) {
  if (!queryClient || !questions.length) return;
  const width = QUESTION_COLUMNS.length;
  const values = [];
  const records = questions.map(questionValues);
  const tuples = records.map((record, rowIndex) => {
    const placeholders = record.map((value, columnIndex) => {
      values.push(value);
      return `$${rowIndex * width + columnIndex + 1}`;
    });
    return `(${placeholders.join(", ")})`;
  });
  await queryClient.query(
    `INSERT INTO questions (${QUESTION_COLUMNS.join(", ")})
     VALUES ${tuples.join(", ")}
     ON CONFLICT (id) DO NOTHING`,
    values
  );
}

function fromQuestionRow(row) {
  return {
    id: row.id,
    gradeBand: row.grade_band,
    subject: row.subject,
    category: row.category,
    difficulty: row.difficulty,
    type: row.type,
    prompt: row.prompt,
    options: row.options || [],
    correctOptionId: row.correct_option_id,
    correctBoolean: row.correct_boolean,
    acceptableAnswers: row.acceptable_answers || [],
    explanation: row.explanation,
    reviewStatus: row.review_status,
    reviewNote: row.review_note,
    authorRole: row.author_role,
    authorTeacherId: row.author_teacher_id,
    sourceReference: row.source_reference
  };
}

async function initialize(legacyQuestions) {
  if (!pool) return null;
  await pool.query(fs.readFileSync(schemaFile, "utf8"));
  const { rows: countRows } = await pool.query("SELECT COUNT(*)::integer AS count FROM questions");
  const isInitialImport = countRows[0].count === 0;
  const grouped = new Map();
  for (const question of legacyQuestions) {
    const prompt = String(question.prompt || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const key = `${String(question.subject || "").toLowerCase()}|${prompt}`;
    if (!prompt) continue;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(question);
  }
  const migrationQuestions = legacyQuestions.map((question) => {
    const prompt = String(question.prompt || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const group = grouped.get(`${String(question.subject || "").toLowerCase()}|${prompt}`) || [];
    const appearsAcrossGrades = new Set(group.map((item) => String(item.gradeBand))).size > 1;
    const missingExplanation = String(question.explanation || "").trim().length < 10;
    const reviewNotes = [];
    if (appearsAcrossGrades) reviewNotes.push("This prompt appears in another grade; confirm the correct grade.");
    if (missingExplanation) reviewNotes.push("Add a clear explanation for students.");
    const needsLegacyReview = reviewNotes.length > 0;
    return isInitialImport && needsLegacyReview && question.reviewStatus === "approved"
      ? { ...question, reviewStatus: "pending", reviewNote: reviewNotes.join(" ") }
      : question;
  });
  await insertQuestions(migrationQuestions);
  const { rows } = await pool.query("SELECT * FROM questions ORDER BY created_at, id");
  return rows.map(fromQuestionRow);
}

async function updateQuestionReview(questionId, { reviewStatus, explanation, gradeBand, subject, category }) {
  if (!pool) return null;
  const { rows } = await pool.query(
    `UPDATE questions
     SET review_status = $2, explanation = $3, grade_band = $4,
       subject = $5, category = $6, review_note = '', updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [questionId, reviewStatus, explanation, gradeBand, subject, category]
  );
  return rows[0] ? fromQuestionRow(rows[0]) : null;
}

async function resetQuestions(questions) {
  if (!pool) return;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM questions");
    await insertQuestions(questions, client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function listQuestionsByStatus(reviewStatus, { limit, offset }) {
  if (!pool) return null;
  const { rows: countRows } = await pool.query(
    "SELECT COUNT(*)::integer AS total FROM questions WHERE review_status = $1",
    [reviewStatus]
  );
  const { rows } = await pool.query(
    `SELECT * FROM questions
     WHERE review_status = $1
     ORDER BY created_at, id
     LIMIT $2 OFFSET $3`,
    [reviewStatus, limit, offset]
  );
  return { questions: rows.map(fromQuestionRow), total: countRows[0].total };
}

async function loadApplicationState() {
  if (!pool) return null;
  const { rows } = await pool.query(
    "SELECT state FROM application_state WHERE state_key = 'primary'"
  );
  return rows[0] ? rows[0].state : null;
}

async function saveApplicationState(state) {
  if (!pool) return;
  const serializedState = JSON.stringify(state);
  const write = applicationStateWrites.then(() => pool.query(
      `INSERT INTO application_state (state_key, state)
       VALUES ('primary', $1::jsonb)
       ON CONFLICT (state_key)
       DO UPDATE SET state = EXCLUDED.state, updated_at = NOW()`,
      [serializedState]
    ));
  applicationStateWrites = write.catch((error) => {
    console.error("Failed to persist application state:", error.message);
  });
  await write;
}

async function recordResults(results) {
  if (!pool || !results.length) return;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const result of results) {
      await client.query(
        `INSERT INTO quiz_results
          (session_id, player_id, nickname, grade_band, subject, score,
           questions_answered, correct_answers)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (session_id, player_id) DO NOTHING`,
        [
          result.sessionId,
          result.playerId,
          result.nickname,
          result.gradeBand,
          result.subject,
          result.score,
          result.questionsAnswered,
          result.correctAnswers
        ]
      );
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function getLeaderboard({ gradeBand, subject, limit = 50 }) {
  if (!pool) return null;
  const values = [];
  const filters = [];
  if (gradeBand) {
    values.push(gradeBand);
    filters.push(`grade_band = $${values.length}`);
  }
  if (subject) {
    values.push(subject);
    filters.push(`subject = $${values.length}`);
  }
  values.push(Math.min(Math.max(Number(limit) || 50, 1), 100));
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const limitPlaceholder = `$${values.length}`;
  const { rows } = await pool.query(
    `WITH best_attempts AS (
       SELECT DISTINCT ON (LOWER(nickname))
         nickname, grade_band, subject, score, questions_answered,
         correct_answers, completed_at
       FROM quiz_results
       ${where}
       ORDER BY LOWER(nickname), score DESC, completed_at ASC
     )
     SELECT nickname, grade_band AS "gradeBand", subject, score,
       questions_answered AS "questionsAnswered",
       correct_answers AS "correctAnswers", completed_at AS "completedAt"
     FROM best_attempts
     ORDER BY score DESC, correct_answers DESC, completed_at ASC
     LIMIT ${limitPlaceholder}`,
    values
  );
  return rows;
}

async function close() {
  if (pool) await pool.end();
}

module.exports = {
  close,
  getLeaderboard,
  initialize,
  insertQuestions,
  isConfigured,
  loadApplicationState,
  listQuestionsByStatus,
  recordResults,
  resetQuestions,
  saveApplicationState,
  updateQuestionReview
};
