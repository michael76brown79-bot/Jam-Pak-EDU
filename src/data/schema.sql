CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  grade_band TEXT NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_option_id TEXT,
  correct_boolean BOOLEAN,
  acceptable_answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  explanation TEXT NOT NULL DEFAULT '',
  review_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (review_status IN ('pending', 'approved', 'rejected')),
  review_note TEXT NOT NULL DEFAULT '',
  author_role TEXT,
  author_teacher_id TEXT,
  source_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS review_note TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS questions_quiz_lookup_idx
  ON questions (grade_band, subject, review_status);

CREATE TABLE IF NOT EXISTS quiz_results (
  result_id BIGSERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  player_id TEXT NOT NULL,
  nickname TEXT NOT NULL,
  grade_band TEXT NOT NULL,
  subject TEXT NOT NULL,
  score INTEGER NOT NULL,
  questions_answered INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (session_id, player_id)
);

CREATE INDEX IF NOT EXISTS quiz_results_leaderboard_idx
  ON quiz_results (grade_band, subject, score DESC, completed_at ASC);
