const path = require("path");
const fs   = require("fs");
const crypto = require("crypto");
const express = require("express");

const { questions: seedQuestions } = require("./data/questions");
const { createSession, createRoomCode } = require("./core/session");
const { getNextQuestion } = require("./core/quizEngine");

const app  = express();
const PORT = Number(process.env.PORT) || 3001;
const SCORE_CORRECT = 15;
const SCORE_INCORRECT = -5;
const OWNER_ACCESS_CODE = String(process.env.OWNER_ACCESS_CODE || "").trim();
const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;
const ROOM_CODE_PATTERN = /^JAM\d{5}$/;
const QUESTION_LIMIT_DEFAULT = 15;
const QUESTION_TIME_LIMIT_MS_DEFAULT = 15000;
const MCQ_LABELS = ["a", "b", "c", "d"];

const HIGH_SECONDARY_SCHOOL_NAMES = [
  "Albert Town High","Allman Town Junior High","Alston High","Anchovy High","Annotto Bay High","Ardenne High",
  "Balaclava High","Bellefield High","Belmont Academy","Bishop Gibson High","Black River High","Bog Walk High",
  "Bridgeport High","Brown's Town High","Buff Bay High","Bustamante High","Calabar High","Cambridge High",
  "Campion College","Cedric Titus High","Central High","Charlemont High","Christiana High","Clan Carty High",
  "Clarendon College","Claude McKay High","Convent of Mercy (Alpha)","Cornwall College","Cumberland High",
  "deCarteret College","Denbigh High","Denham Town High","Donald Quarrie High","Dunoon Park Technical",
  "Edith Dalton James High","Edwin Allen High","Eltham High","Excelsior High","Fair Prospect High",
  "Foga Road High","Frome Technical High","Garvey Maceo High","Gaynstead High","Glenmuir High",
  "Glengoffe High","Grange Hill High","Green Island High","Green Pond High","Guy's Hill High",
  "Hampton School","Happy Grove High","Herbert Morrison Technical","Holy Childhood High","Holy Trinity High",
  "Hopewell High","Horace Clarke High","Immaculate Conception High","Innswood High","Iona High","Islington High",
  "Jamaica College","Jonathan Grant High","Jose Marti Technical","Kellits High","Kemps Hill High",
  "Kingston College","Kingston Technical","Knockalva Technical","Knox College","Lacovia High","Lennon High",
  "Lewisville High","Little London High","Maggotty High","Manchester High","Manning's School",
  "Marcus Garvey Technical","Marymount High","May Day High","McGrath High","Meadowbrook High",
  "Merl Grove High","Mile Gully High","Mona High","Montego Bay High","Morant Bay High","Mount Alvernia High",
  "Muschett High","New Forest High","Newell High","Norman Manley High","Old Harbour High",
  "Oracabessa High","Papine High","Paul Bogle High","Pembroke Hall High","Penwood High","Petersfield High",
  "Port Antonio High","Porus High","Robert Lightbourne High","Roger Clarke High","Rusea's High",
  "Saint Jago High","Seaforth High","Spanish Town High","Spot Valley High","St. Andrew High (Girls)",
  "St. Andrew Technical (STATHS)","St. Catherine High","St. Elizabeth Technical (STETHS)","St. George's College",
  "St. Hugh's High","St. James High","St. Mary High","St. Mary Technical","St. Thomas Technical",
  "Steer Town Academy","Sydney Pagon Agricultural","Tacky High","Tarrant High","Tacius Golding High",
  "Thompson Town High","Titchfield High","Tivoli Gardens High","Troy High","Vauxhall High",
  "Vere Technical","Westwood High","Winston Jones High","Wolmer's Boys' School","Wolmer's Girls' School",
  "Yallahs High","York Castle High","Airlie High","Amity Hall Secondary","Apex Academy","Armadale Alternative",
  "Bickersteth Secondary","Bluefields Academy","Broadleaf High","Browns Hall Secondary","Bryan's Bay High",
  "Cascade Secondary","Castleton Secondary","Chetolah Park Junior High","Claverty Cottage Secondary",
  "Dallas Secondary","Devon Secondary","Discovery Bay Secondary","Dundee Secondary","Dynamic Environmental",
  "Ecklemann High","Elite Academy","Enid Bennett High","Evelyn Mitchell Infant & Junior High",
  "Flowery Field Secondary","Font Hill Secondary","Fort George Secondary","Frankfield Primary & Junior High",
  "Garlogie Primary & Junior High","Green Park Primary & Junior High","Gibbs Secondary","Goshen Secondary",
  "Haddo Secondary","Hall's Delight Secondary","Hayes Primary & Junior High","Highgate Secondary",
  "Independence City Junior High","Inswood Secondary","International Secondary","Inverniss Secondary",
  "Jamintel Secondary","Jericho Secondary","JMMB Secondary Institute","John's Hall Secondary",
  "King's Century Academy","Kingston College (Extension)","Kyth Academy","Lashley High","Leanora Secondary",
  "Llandewey Secondary","Lluidas Vale Secondary","Long Bay Secondary","Mavis Bank High","May Pen Junior High",
  "Middlesex High","Minto Secondary","Moores Primary & Junior High","Nain Secondary","National Academy",
  "New Day Primary & Junior High","Northern Technical","Nyah Academy","Osbourne Store Primary & Junior High",
  "Overriver Secondary","Pear Tree Secondary","Pembroke Hall Secondary","Pine Grove Secondary","Point Hill Secondary",
  "Quality Academics","Queensborough High","Rest Primary & Junior High","Richmond Secondary","Rock Secondary",
  "Sanguinetti Secondary","Sligoville Secondary","Southborough Secondary","St. George's Girls Secondary",
  "The Queen's School","Top Hill Secondary","Trinity Secondary","Tyall Secondary","Ultimate Achievement Academy",
  "Unity Secondary","Universal Academy","Urban High","Valiant Academy","Victoria Secondary",
  "Vineyard Town Junior High","Vision Academy","Waltham Secondary","Whitehouse Secondary","Windsor High",
  "Woodside Secondary","Zion Academy","St Hilda?s Diocesan High School"
];

const PRIMARY_PREP_SCHOOL_NAMES = [
  "Allman Town Primary","Alva Primary","Avalon Preparatory","Avondale Prep","Balaclava Primary","Barbary Hall Primary",
  "Belair Prep","Black River Primary","Blake's Prep","Mona Prep","Brampton Primary","Broadleaf Primary",
  "Brown's Town Primary","Bull Savannah Primary","Burnt Savannah Primary","Camperdown Primary","Carron Hall Primary",
  "Castor Elementary","Central Branch Primary","Clan Carthy Primary","Clarendon Prep","Corinaldi Avenue Primary",
  "Craighead Primary","Cross Primary","Cumberland Primary","Dalvey Primary","Darliston Primary","Denbigh Primary",
  "Discovery Bay All-Age","Duhaney Park Primary","Easington Primary","Ebenezer Primary","Elletson Primary",
  "Emmanuel Christian Academy","Ensom City Primary","Fairfield Primary","Fletcher's Land Primary",
  "Frankfield Primary","Franklin Town Primary","Friendship Primary","Gimme-Me-Bit Primary","Glengoffe Primary",
  "Golden Spring Primary","Gordon Town Primary","Greenvale Primary","Half Way Tree Primary","Harbour View Primary",
  "Highholborn Street Primary","Hope Primary","Howard Prep","Ilan Prep","Independence City Primary",
  "Innisair Elementary","International Prep","Islington Primary","Jack's River Primary","Jericho Primary",
  "Jessie Ripoll Primary","John Rollins Success Primary","Jones Town Primary","Kellits Primary","Kensington Primary",
  "King's Gate Prep","Kingston Parish Church Primary","Knights Prep","Lanaman Prep","Lyssons Primary","Liberty Prep",
  "Linstead Primary","Little London Primary","Luke Lane Primary","Mandeville Primary","Maxfield Park Primary",
  "May Pen Primary","McAuley Primary","Meadowbrook Prep","Mico Practising Primary","Mile Gully Primary",
  "Milk River Primary","Mizpah Primary","Morant Bay Primary","Naggo Head Primary","New Day Primary",
  "New Providence Primary","New Testament Prep","Norman Gardens Primary","Oasis Prep","Old Harbour Primary",
  "Oracabessa Primary","Osborn Store Primary","Our Lady of the Angels Prep","Plowden Primary","Port Antonio Primary",
  "Portmore Missionary Prep","Porus Primary","Primrose Prep","Queen's Prep","Quickstep Primary","Race Course Primary",
  "Rollington Town Primary","Runaway Bay Primary","Sanguinetti Primary","Santa Cruz Primary","Savanna-la-Mar Primary",
  "Shortwood Practising","Spanish Town Primary","St. Aloysius Primary","St. Andrew Prep","St. George's Prep",
  "St. Jago Prep","St. John the Baptist Primary","St. Jude's Primary","St. Mary's Prep",
  "St. Peter and Paul Prep","Stella Maris Prep","Swallowfield Primary","Tarrant Primary","Thompson Town Primary",
  "Titchfield Primary","Tivoli Gardens Primary","Trench Town Primary","Unity Primary","Upper Rock Spring Primary",
  "Vaz Prep","Victoria Jubilee Primary","Villa Prep","Wakefield Primary","Waltham Park Primary","Wesley Prep",
  "Whitfield Primary","Windward Road Primary","Yallahs Primary","York Castle Primary","Zion Hill Primary",
  "Angels Primary","Ascot Primary","Bartons Primary","Bellas Gate Primary","Belmont Park Primary",
  "Bermaddy Primary","Berry Hill Primary and Infant","Berwick Primary","Bois Content Primary",
  "Bonnett Primary and Infant","Braeton Primary & Junior High","Bridgeport Primary","Browns Hall Primary",
  "Cassava River Primary and Infant","Cedar Valley Primary and Infant","Crescent Primary","Davis Primary",
  "Eccleston Primary","Eltham Park Primary","Ewarton Primary","Garden Hill Primary and Infant","Gibraltar Primary",
  "Ginger Ridge Primary","Good Hope Primary","Grateful Hill Primary","Greater Portmore Primary",
  "Gregory Park Primary","Guanaboa Vale Primary","Harewood Primary","Harkers Hall Primary","Highgate Primary",
  "Horizon Park Primary","Innswood Primary","Juan de Bolas Primary","Lluidas Vale Primary","Macca Tree Primary",
  "Morris Hall Primary","Mount Hermon Primary","Mount Industry Primary","Mount Rosser Primary & Infant",
  "Paul Mountain Primary","Pear Tree Grove Primary","Point Hill Primary","Polly Ground Primary","Portsmouth Primary",
  "Red Ground Primary","Rio Magno Primary","Seafield Primary","Sligoville Primary","Southborough Primary",
  "St. Catherine Primary","St. John's Primary","Time and Patience Primary","Top Jackson Primary and Infant",
  "Troja Primary","Tulloch Primary","Tydixon Primary and Infant","Victoria Primary","Waterford Primary",
  "Watermount Primary"
];

function buildDefaultSchools() {
  const map = new Map();

  const add = (name, level) => {
    const cleanName = String(name || "").trim();
    if (!cleanName) return;
    const key = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const existing = map.get(key);
    if (existing) {
      if (existing.level !== level) existing.level = "both";
      return;
    }
    map.set(key, {
      schoolId: `sch_${key.replace(/\s+/g, "_")}`,
      name: cleanName,
      parish: "Jamaica",
      level
    });
  };

  HIGH_SECONDARY_SCHOOL_NAMES.forEach((name) => add(name, "high"));
  PRIMARY_PREP_SCHOOL_NAMES.forEach((name) => add(name, "primary"));

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

const DEFAULT_JAMAICAN_SCHOOLS = buildDefaultSchools();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: "10mb" }));

const publicDir      = path.join(__dirname, "..", "public");
const bankFile       = path.join(__dirname, "data", "question-bank.json");
const accessFile     = path.join(__dirname, "data", "access-control.json");

app.use(express.static(publicDir));
app.get("/", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));

// -- Load question bank from disk, fall back to seed ---------
function loadBank() {
  if (fs.existsSync(bankFile)) {
    try {
      const saved = JSON.parse(fs.readFileSync(bankFile, "utf8"));
      if (Array.isArray(saved) && saved.length) {
        console.log(`Loaded ${saved.length} questions from disk.`);
        return saved;
      }
    } catch (e) {
      console.warn("Could not parse question-bank.json, using seed.", e.message);
    }
  }
  console.log(`Using ${seedQuestions.length} seed questions.`);
  return [...seedQuestions];
}

function saveBank(bank) {
  try {
    fs.writeFileSync(bankFile, JSON.stringify(bank, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to save question bank:", e.message);
  }
}

let questionBank = loadBank();

function hashSecret(secret) {
  return crypto.createHash("sha256").update(String(secret || "")).digest("hex");
}

function loadAccessControl() {
  if (fs.existsSync(accessFile)) {
    try {
      const saved = JSON.parse(fs.readFileSync(accessFile, "utf8"));
      return {
        ownerCodeHash: typeof saved.ownerCodeHash === "string" ? saved.ownerCodeHash : "",
        teachers: Array.isArray(saved.teachers) ? saved.teachers : [],
        students: Array.isArray(saved.students) ? saved.students : [],
        schools: Array.isArray(saved.schools) && saved.schools.length ? saved.schools : [...DEFAULT_JAMAICAN_SCHOOLS],
        classes: Array.isArray(saved.classes) ? saved.classes : [],
        quizzes: Array.isArray(saved.quizzes) ? saved.quizzes : [],
        manualReviews: Array.isArray(saved.manualReviews) ? saved.manualReviews : []
      };
    } catch (e) {
      console.warn("Could not parse access-control.json, using empty defaults.", e.message);
    }
  }
  return {
    ownerCodeHash: "",
    teachers: [],
    students: [],
    schools: [...DEFAULT_JAMAICAN_SCHOOLS],
    classes: [],
    quizzes: [],
    manualReviews: []
  };
}

function saveAccessControl(data) {
  try {
    fs.writeFileSync(accessFile, JSON.stringify(data, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to save access control data:", e.message);
  }
}

const accessControl = loadAccessControl();
if (!Array.isArray(accessControl.schools) || !accessControl.schools.length) {
  accessControl.schools = [...DEFAULT_JAMAICAN_SCHOOLS];
  saveAccessControl(accessControl);
}
if (!Array.isArray(accessControl.students)) {
  accessControl.students = [];
  saveAccessControl(accessControl);
}
const authSessions = new Map();

const sessions    = new Map();
const roomToSession = new Map();

function createPlayer({ name, avatarId }) {
  return {
    playerId: `p_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    name: String(name || "Player").trim(),
    avatarId: String(avatarId || "pulse").trim(),
    score: 0,
    joinedAt: Date.now()
  };
}

function getRequestToken(req) {
  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) return authHeader.slice(7).trim();
  if (req.body && typeof req.body.accessToken === "string") return req.body.accessToken.trim();
  if (req.query && typeof req.query.accessToken === "string") return req.query.accessToken.trim();
  return "";
}

function issueToken(payload) {
  const token = crypto.randomBytes(24).toString("hex");
  authSessions.set(token, { ...payload, expiresAt: Date.now() + TOKEN_TTL_MS });
  return token;
}

function getAuthContext(req) {
  const token = getRequestToken(req);
  if (!token) return null;
  const session = authSessions.get(token);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    authSessions.delete(token);
    return null;
  }
  return session;
}

function requireAuth(req, res) {
  const auth = getAuthContext(req);
  if (!auth) {
    res.status(401).json({ error: "Unauthorized. Please sign in." });
    return null;
  }
  return auth;
}

function requireRole(req, res, roles) {
  const auth = requireAuth(req, res);
  if (!auth) return null;
  if (!roles.includes(auth.role)) {
    res.status(403).json({ error: "Forbidden. Insufficient role." });
    return null;
  }
  return auth;
}

function leaderboardFor(session) {
  return [...(session.players || [])]
    .sort((a, b) => b.score - a.score || a.joinedAt - b.joinedAt)
    .map((player) => ({
      playerId: player.playerId,
      name: player.name,
      avatarId: player.avatarId,
      score: player.score
    }));
}

function normalizeQuestion(q, i) {
  const type = (q.type || "mcq").toLowerCase();
  return {
    id:              q.id || `q_${Date.now()}_${i}_${Math.random().toString(36).slice(2)}`,
    gradeBand:       String(q.gradeBand || "3").trim(),
    subject:         String(q.subject   || "General").trim(),
    category:        String(q.category  || q.subject || "General").trim(),
    difficulty:      q.difficulty || "easy",
    type,
    prompt:          q.prompt || "Untitled question",
    options:         Array.isArray(q.options) ? q.options : [],
    correctOptionId: q.correctOptionId || null,
    correctBoolean:  typeof q.correctBoolean === "boolean" ? q.correctBoolean : null,
    acceptableAnswers: Array.isArray(q.acceptableAnswers) ? q.acceptableAnswers : [],
    explanation:     q.explanation || ""
  };
}

function listTeacherClasses(teacherId) {
  return accessControl.classes.filter((cls) => cls.teacherId === teacherId);
}

function listTeacherQuizzes(teacherId) {
  return accessControl.quizzes.filter((quiz) => quiz.teacherId === teacherId);
}

function normalizeFreeText(value) {
  return String(value || "")
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function findSchoolById(schoolId) {
  return accessControl.schools.find((school) => school.schoolId === schoolId) || null;
}

function normalizeSchoolLevel(level) {
  const value = String(level || "").trim().toLowerCase();
  if (value === "high" || value === "secondary") return "high";
  if (value === "primary") return "primary";
  if (value === "both") return "both";
  return "";
}

function schoolSupportsLevel(school, level) {
  const requested = normalizeSchoolLevel(level);
  if (!requested) return true;
  const schoolLevel = normalizeSchoolLevel(school.level || "");
  if (!schoolLevel) return true;
  if (schoolLevel === "both") return true;
  return schoolLevel === requested;
}

function teacherSupportsLevel(teacher, level) {
  const requested = normalizeSchoolLevel(level);
  if (!requested) return true;
  const teacherLevel = normalizeSchoolLevel(teacher.teachingLevel || "both") || "both";
  if (teacherLevel === "both") return true;
  return teacherLevel === requested;
}

function learningLevelFromGrade(gradeLevel) {
  const grade = Number(String(gradeLevel || "").trim());
  if (!Number.isFinite(grade)) return "";
  return grade <= 6 ? "primary" : "high";
}

function isPrimaryTeacherByName(name) {
  const text = normalizeFreeText(name);
  return text.includes("primary") || text.includes("prep") || text.includes("preparatory") || text.includes("infant") || text.includes("elementary");
}

function isHighTeacherByName(name) {
  const text = normalizeFreeText(name);
  return text.includes("high") || text.includes("college") || text.includes("secondary") || text.includes("technical") || text.includes("academy") || text.includes("junior high");
}

function inferTeacherLevelFromSchool(school) {
  if (!school || !school.name) return "both";
  const primary = isPrimaryTeacherByName(school.name);
  const high = isHighTeacherByName(school.name);
  if (primary && high) return "both";
  if (primary) return "primary";
  if (high) return "high";
  return normalizeSchoolLevel(school.level) || "both";
}

function normalizeSchoolCatalog(schools) {
  const map = new Map();
  const normalizeName = (name) => String(name || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const mergeLevel = (left, right) => {
    const first = normalizeSchoolLevel(left || "");
    const second = normalizeSchoolLevel(right || "");
    if (!first) return second || "";
    if (!second) return first;
    if (first === second) return first;
    return "both";
  };

  DEFAULT_JAMAICAN_SCHOOLS.forEach((school) => {
    const key = normalizeName(school.name);
    if (!key) return;
    map.set(key, {
      schoolId: school.schoolId,
      name: school.name,
      parish: school.parish || "Jamaica",
      level: normalizeSchoolLevel(school.level || "") || inferTeacherLevelFromSchool(school)
    });
  });

  (Array.isArray(schools) ? schools : []).forEach((school) => {
    const name = String(school?.name || "").trim();
    if (!name) return;
    const key = normalizeName(name);
    if (!key) return;

    const existing = map.get(key);
    const inferredLevel = inferTeacherLevelFromSchool({ name, level: school?.level || "" });
    const providedLevel = normalizeSchoolLevel(school?.level || "") || inferredLevel;
    if (!existing) {
      map.set(key, {
        schoolId: String(school?.schoolId || `sch_${key.replace(/\s+/g, "_")}`),
        name,
        parish: String(school?.parish || "Jamaica"),
        level: providedLevel || "both"
      });
      return;
    }

    existing.level = mergeLevel(existing.level, providedLevel) || existing.level || "both";
    if (school?.schoolId && !String(existing.schoolId || "").trim()) existing.schoolId = String(school.schoolId);
    if (school?.parish && String(existing.parish || "").trim() === "Jamaica") existing.parish = String(school.parish);
    if (name.length > existing.name.length) existing.name = name;
    map.set(key, existing);
  });

  return [...map.values()].sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));
}

function normalizeTeacherProfiles(teachers, schools) {
  const schoolMap = new Map((Array.isArray(schools) ? schools : []).map((school) => [school.schoolId, school]));
  return (Array.isArray(teachers) ? teachers : []).map((teacher) => {
    const school = schoolMap.get(teacher.schoolId) || null;
    const normalizedLevel = normalizeSchoolLevel(teacher.teachingLevel || "") || inferTeacherLevelFromSchool(school || { name: teacher.name || "", level: "" });
    return { ...teacher, teachingLevel: normalizedLevel || "both" };
  });
}

{
  const schoolsBefore = JSON.stringify(accessControl.schools || []);
  const teachersBefore = JSON.stringify(accessControl.teachers || []);
  accessControl.schools = normalizeSchoolCatalog(accessControl.schools);
  accessControl.teachers = normalizeTeacherProfiles(accessControl.teachers, accessControl.schools);
  const schoolsAfter = JSON.stringify(accessControl.schools || []);
  const teachersAfter = JSON.stringify(accessControl.teachers || []);
  if (schoolsBefore !== schoolsAfter || teachersBefore !== teachersAfter) {
    saveAccessControl(accessControl);
  }
}

function isOwnerCodeConfigured() {
  return Boolean(OWNER_ACCESS_CODE || accessControl.ownerCodeHash);
}

function verifyOwnerCode(accessCode) {
  if (OWNER_ACCESS_CODE) return String(accessCode) === OWNER_ACCESS_CODE;
  if (accessControl.ownerCodeHash) return hashSecret(accessCode) === accessControl.ownerCodeHash;
  return false;
}

function isLocalRequest(req) {
  const ip = String(req.ip || req.connection?.remoteAddress || "");
  return ip === "::1" || ip === "127.0.0.1" || ip.endsWith("::ffff:127.0.0.1");
}

function createUniqueRoomCode() {
  for (let i = 0; i < 25; i++) {
    const roomCode = createRoomCode();
    if (!roomToSession.has(roomCode)) return roomCode;
  }
  throw new Error("Could not create a unique room code");
}

function shuffleOptions(options) {
  const list = Array.isArray(options) ? [...options] : [];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = list[i];
    list[i] = list[j];
    list[j] = tmp;
  }
  return list;
}

function isMultiplayerSession(session) {
  return session.mode === "host" || session.mode === "teacher_host";
}

function buildRoundQuestion(question) {
  const type = question.type || "mcq";
  if (type !== "mcq") {
    return {
      question: { id: question.id, type, prompt: question.prompt, options: question.options || [] },
      correctOptionId: question.correctOptionId || null
    };
  }

  const shuffled = shuffleOptions(question.options || []);
  const labeled = shuffled.map((option, index) => ({
    id: MCQ_LABELS[index] || String.fromCharCode(97 + index),
    text: option.text
  }));

  let correctOptionId = null;
  const originalCorrectIndex = shuffled.findIndex((option) => option.id === question.correctOptionId);
  if (originalCorrectIndex >= 0) {
    correctOptionId = MCQ_LABELS[originalCorrectIndex] || null;
  }

  return {
    question: { id: question.id, type, prompt: question.prompt, options: labeled },
    correctOptionId
  };
}

function createRoundForSession(session, bank) {
  const limit = Number(session.questionLimit || QUESTION_LIMIT_DEFAULT);
  if ((session.askedQuestionIds || []).length >= limit) return null;

  const question = getNextQuestion(session, bank);
  if (!question) return null;

  const round = buildRoundQuestion(question);
  const now = Date.now();
  session.currentRound = {
    questionId: question.id,
    question: round.question,
    type: round.question.type,
    prompt: round.question.prompt,
    correctOptionId: round.correctOptionId,
    startedAt: now,
    deadlineAt: now + Number(session.questionTimeLimitMs || QUESTION_TIME_LIMIT_MS_DEFAULT),
    answeredPlayerIds: [],
    questionNumber: (session.askedQuestionIds || []).length
  };
  return session.currentRound;
}

function roundProgress(session) {
  const round = session.currentRound;
  if (!round) return null;
  const totalPlayers = Math.max(1, (session.players || []).length);
  const answeredCount = (round.answeredPlayerIds || []).length;
  const timedOut = Date.now() >= round.deadlineAt;
  const everyoneAnswered = answeredCount >= totalPlayers;
  const secondsLeft = Math.max(0, Math.ceil((round.deadlineAt - Date.now()) / 1000));
  return { totalPlayers, answeredCount, timedOut, everyoneAnswered, secondsLeft };
}

app.get("/api/health", (_req, res) => {
  const subjects = [...new Set(questionBank.map(q => q.subject))];
  const grades   = [...new Set(questionBank.map(q => q.gradeBand))];
  res.json({ ok: true, port: PORT, questions: questionBank.length, subjects, grades });
});

// -- Access / Auth --------------------------------------------
app.get("/api/auth/owner/status", (_req, res) => {
  return res.json({
    configured: isOwnerCodeConfigured(),
    envManaged: Boolean(OWNER_ACCESS_CODE)
  });
});

app.get("/api/schools", (req, res) => {
  const parish = String(req.query.parish || "").trim().toLowerCase();
  const search = normalizeFreeText(req.query.search || "");
  const level = normalizeSchoolLevel(req.query.level || "");

  const schools = accessControl.schools
    .filter((school) => {
      if (parish && String(school.parish || "").trim().toLowerCase() !== parish) return false;
      if (!schoolSupportsLevel(school, level)) return false;
      if (!search) return true;
      const haystack = normalizeFreeText(`${school.name} ${school.parish} ${school.level || ""}`);
      return haystack.includes(search);
    })
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));

  return res.json({ schools });
});

app.get("/api/schools/:schoolId/teachers", (req, res) => {
  const school = findSchoolById(req.params.schoolId);
  if (!school) return res.status(404).json({ error: "School not found" });

  const teachingLevel = normalizeSchoolLevel(req.query.teachingLevel || "");

  const teachers = accessControl.teachers
    .filter((teacher) => teacher.schoolId === school.schoolId)
    .filter((teacher) => teacherSupportsLevel(teacher, teachingLevel))
    .map((teacher) => ({
      teacherId: teacher.teacherId,
      name: teacher.name,
      schoolId: teacher.schoolId,
      teachingLevel: normalizeSchoolLevel(teacher.teachingLevel || "both") || "both"
    }))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || "")));

  return res.json({ school, teachers });
});

app.get("/api/teachers/:teacherId/classes/public", (req, res) => {
  const teacherId = String(req.params.teacherId || "").trim();
  if (!teacherId) return res.status(400).json({ error: "teacherId is required" });

  const classes = accessControl.classes
    .filter((cls) => cls.teacherId === teacherId)
    .map((cls) => ({ classId: cls.classId, className: cls.className, createdAt: cls.createdAt }));

  return res.json({ classes });
});

app.post("/api/auth/owner/setup", (req, res) => {
  if (OWNER_ACCESS_CODE) {
    return res.status(409).json({ error: "Owner access code is managed by OWNER_ACCESS_CODE environment variable." });
  }
  if (accessControl.ownerCodeHash) {
    return res.status(409).json({ error: "Owner access code is already configured." });
  }
  if (!isLocalRequest(req)) {
    return res.status(403).json({ error: "Owner setup is only allowed from localhost." });
  }
  const { accessCode } = req.body || {};
  const code = String(accessCode || "").trim();
  if (code.length < 12) {
    return res.status(400).json({ error: "Owner access code must be at least 12 characters." });
  }
  accessControl.ownerCodeHash = hashSecret(code);
  saveAccessControl(accessControl);
  return res.json({ ok: true, configured: true });
});

app.post("/api/auth/owner/login", (req, res) => {
  const { accessCode } = req.body || {};
  if (!accessCode) return res.status(400).json({ error: "accessCode is required" });
  if (!isOwnerCodeConfigured()) {
    return res.status(409).json({ error: "Owner access code is not set yet. Complete setup first." });
  }
  if (!verifyOwnerCode(accessCode)) {
    return res.status(401).json({ error: "Invalid owner access code" });
  }
  const accessToken = issueToken({ role: "owner", owner: true });
  return res.json({ ok: true, role: "owner", accessToken });
});

app.post("/api/auth/teacher/register", (req, res) => {
  const { name, email, password, schoolId, teachingLevel } = req.body || {};
  if (!name || !email || !password || !schoolId) {
    return res.status(400).json({ error: "name, email, password and schoolId are required" });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  const school = findSchoolById(String(schoolId).trim());
  if (!school) return res.status(404).json({ error: "Selected school was not found" });

  const normalizedEmail = String(email).trim().toLowerCase();
  if (accessControl.teachers.some((item) => item.email.toLowerCase() === normalizedEmail)) {
    return res.status(409).json({ error: "Teacher email already exists" });
  }

  const normalizedTeachingLevel = normalizeSchoolLevel(teachingLevel) || inferTeacherLevelFromSchool(school);

  const teacher = {
    teacherId: `t_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    name: String(name).trim(),
    email: normalizedEmail,
    schoolId: school.schoolId,
    teachingLevel: normalizedTeachingLevel,
    passwordHash: hashSecret(password),
    createdAt: Date.now()
  };
  accessControl.teachers.push(teacher);
  saveAccessControl(accessControl);

  return res.status(201).json({
    ok: true,
    teacher: { teacherId: teacher.teacherId, name: teacher.name, email: teacher.email, schoolId: teacher.schoolId, teachingLevel: teacher.teachingLevel }
  });
});

app.post("/api/auth/teacher/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }
  const teacher = accessControl.teachers.find((item) => item.email.toLowerCase() === String(email).toLowerCase());
  if (!teacher) return res.status(404).json({ error: "Teacher account not found" });
  if (teacher.passwordHash !== hashSecret(password)) {
    return res.status(401).json({ error: "Invalid teacher credentials" });
  }
  const accessToken = issueToken({ role: "teacher", teacherId: teacher.teacherId, teacherName: teacher.name });
  return res.json({
    ok: true,
    role: "teacher",
    accessToken,
    teacher: { teacherId: teacher.teacherId, name: teacher.name, email: teacher.email, schoolId: teacher.schoolId || null, teachingLevel: normalizeSchoolLevel(teacher.teachingLevel || "both") || "both" }
  });
});

app.post("/api/auth/student/register", (req, res) => {
  const { name, email, password, schoolId, teacherId, classId, gradeLevel } = req.body || {};
  if (!name || !email || !password || !schoolId || !teacherId) {
    return res.status(400).json({ error: "name, email, password, schoolId and teacherId are required" });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters." });
  }

  const school = findSchoolById(String(schoolId).trim());
  if (!school) return res.status(404).json({ error: "Selected school was not found" });

  const teacher = accessControl.teachers.find((item) => item.teacherId === String(teacherId).trim());
  if (!teacher) return res.status(404).json({ error: "Teacher not found" });
  if (teacher.schoolId !== school.schoolId) {
    return res.status(400).json({ error: "Teacher does not belong to the selected school." });
  }

  const expectedLevel = learningLevelFromGrade(gradeLevel);
  if (expectedLevel && !schoolSupportsLevel(school, expectedLevel)) {
    return res.status(400).json({ error: `Please choose a ${expectedLevel} school for that grade level.` });
  }
  if (expectedLevel && !teacherSupportsLevel(teacher, expectedLevel)) {
    return res.status(400).json({ error: `Selected teacher is not set for ${expectedLevel} level.` });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  if (accessControl.students.some((item) => item.email.toLowerCase() === normalizedEmail)) {
    return res.status(409).json({ error: "Student email already exists" });
  }

  let linkedClass = null;
  if (classId) {
    linkedClass = accessControl.classes.find((cls) => cls.classId === String(classId).trim() && cls.teacherId === teacher.teacherId);
    if (!linkedClass) return res.status(404).json({ error: "Selected class not found for this teacher." });
  }

  const student = {
    studentId: `stu_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    name: String(name).trim(),
    email: normalizedEmail,
    passwordHash: hashSecret(password),
    schoolId: school.schoolId,
    teacherId: teacher.teacherId,
    classId: linkedClass ? linkedClass.classId : null,
    gradeLevel: String(gradeLevel || "").trim() || null,
    createdAt: Date.now()
  };

  accessControl.students.push(student);

  if (linkedClass) {
    linkedClass.students = Array.isArray(linkedClass.students) ? linkedClass.students : [];
    if (!linkedClass.students.some((item) => item.studentId === student.studentId)) {
      linkedClass.students.push({
        studentId: student.studentId,
        name: student.name,
        avatarId: "island-ace"
      });
    }
  }

  saveAccessControl(accessControl);

  return res.status(201).json({
    ok: true,
    student: {
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      schoolId: student.schoolId,
      teacherId: student.teacherId,
      classId: student.classId,
      gradeLevel: student.gradeLevel
    }
  });
});

app.post("/api/auth/student/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const student = accessControl.students.find((item) => item.email.toLowerCase() === normalizedEmail);
  if (!student) return res.status(404).json({ error: "Student account not found" });
  if (student.passwordHash !== hashSecret(password)) {
    return res.status(401).json({ error: "Invalid student credentials" });
  }

  const accessToken = issueToken({ role: "student", studentId: student.studentId, studentName: student.name });
  return res.json({
    ok: true,
    role: "student",
    accessToken,
    student: {
      studentId: student.studentId,
      name: student.name,
      email: student.email,
      schoolId: student.schoolId,
      teacherId: student.teacherId,
      classId: student.classId,
      gradeLevel: student.gradeLevel
    }
  });
});

app.post("/api/owner/teachers/create", (req, res) => {
  const auth = requireRole(req, res, ["owner"]);
  if (!auth) return;
  const { name, email, password, schoolId, teachingLevel } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email and password are required" });
  }
  const normalizedEmail = String(email).trim().toLowerCase();
  if (accessControl.teachers.some((item) => item.email.toLowerCase() === normalizedEmail)) {
    return res.status(409).json({ error: "Teacher email already exists" });
  }
  const teacher = {
    teacherId: `t_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    name: String(name).trim(),
    email: normalizedEmail,
    schoolId: schoolId ? String(schoolId).trim() : null,
    teachingLevel: normalizeSchoolLevel(teachingLevel || "") || "both",
    passwordHash: hashSecret(password),
    createdAt: Date.now()
  };
  accessControl.teachers.push(teacher);
  saveAccessControl(accessControl);
  return res.json({ ok: true, teacher: { teacherId: teacher.teacherId, name: teacher.name, email: teacher.email } });
});

app.get("/api/owner/teachers", (req, res) => {
  const auth = requireRole(req, res, ["owner"]);
  if (!auth) return;
  const teachers = accessControl.teachers.map((teacher) => ({
    teacherId: teacher.teacherId,
    name: teacher.name,
    email: teacher.email,
    createdAt: teacher.createdAt
  }));
  return res.json({ teachers });
});

app.post("/api/teacher/classes/create", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  const { className } = req.body || {};
  if (!className) return res.status(400).json({ error: "className is required" });
  const teacherClass = {
    classId: `c_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    teacherId: auth.teacherId,
    className: String(className).trim(),
    students: [],
    createdAt: Date.now()
  };
  accessControl.classes.push(teacherClass);
  saveAccessControl(accessControl);
  return res.json({ ok: true, class: teacherClass });
});

app.get("/api/teacher/classes", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  return res.json({ classes: listTeacherClasses(auth.teacherId) });
});

app.post("/api/teacher/classes/:classId/students/add", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  const teacherClass = accessControl.classes.find((cls) => cls.classId === req.params.classId && cls.teacherId === auth.teacherId);
  if (!teacherClass) return res.status(404).json({ error: "Class not found" });

  const { students } = req.body || {};
  if (!Array.isArray(students) || !students.length) {
    return res.status(400).json({ error: "students array is required" });
  }

  students.forEach((item) => {
    const name = typeof item === "string" ? item.trim() : String(item?.name || "").trim();
    if (!name) return;
    const avatarId = typeof item === "string" ? "island-ace" : String(item.avatarId || "island-ace");
    teacherClass.students.push({
      studentId: `s_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
      name,
      avatarId
    });
  });

  saveAccessControl(accessControl);
  return res.json({ ok: true, class: teacherClass });
});

app.post("/api/teacher/quizzes/create", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  const {
    classId, title, gradeBand, subject,
    revealAnswersImmediately = true,
    requireManualReviewForShortAnswers = false,
    questionLimit,
    questionTimeSeconds,
    waitForAllPlayers = true
  } = req.body || {};
  if (!classId || !title || !gradeBand || !subject) {
    return res.status(400).json({ error: "classId, title, gradeBand, subject are required" });
  }
  const teacherClass = accessControl.classes.find((cls) => cls.classId === classId && cls.teacherId === auth.teacherId);
  if (!teacherClass) return res.status(404).json({ error: "Class not found" });

  const parsedLimit = Number(questionLimit);
  const finalQuestionLimit = Number.isFinite(parsedLimit)
    ? Math.max(5, Math.min(60, Math.floor(parsedLimit)))
    : QUESTION_LIMIT_DEFAULT;

  const parsedSeconds = Number(questionTimeSeconds);
  const finalQuestionTimeSeconds = Number.isFinite(parsedSeconds)
    ? Math.max(5, Math.min(180, Math.floor(parsedSeconds)))
    : Math.ceil(QUESTION_TIME_LIMIT_MS_DEFAULT / 1000);

  const quiz = {
    quizId: `qz_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
    teacherId: auth.teacherId,
    classId,
    title: String(title).trim(),
    gradeBand: String(gradeBand).trim(),
    subject: String(subject).trim(),
    settings: {
      revealAnswersImmediately: Boolean(revealAnswersImmediately),
      requireManualReviewForShortAnswers: Boolean(requireManualReviewForShortAnswers),
      questionLimit: finalQuestionLimit,
      questionTimeLimitMs: finalQuestionTimeSeconds * 1000,
      waitForAllPlayers: Boolean(waitForAllPlayers)
    },
    createdAt: Date.now()
  };
  accessControl.quizzes.push(quiz);
  saveAccessControl(accessControl);
  return res.json({ ok: true, quiz });
});

app.get("/api/teacher/quizzes", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  return res.json({ quizzes: listTeacherQuizzes(auth.teacherId) });
});

app.post("/api/teacher/quizzes/:quizId/start", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  const quiz = accessControl.quizzes.find((item) => item.quizId === req.params.quizId && item.teacherId === auth.teacherId);
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });

  const teacher = accessControl.teachers.find((item) => item.teacherId === auth.teacherId);
  const teacherName = teacher ? teacher.name : "Teacher";
  const session = createSession({ mode: "host", gradeBand: quiz.gradeBand, subject: quiz.subject });
  const hostPlayer = createPlayer({ name: teacherName, avatarId: "island-ace" });
  session.players = [hostPlayer];
  session.roomCode = createUniqueRoomCode();
  session.playerCount = 1;
  session.revealAnswersImmediately = quiz.settings.revealAnswersImmediately;
  session.requireManualReviewForShortAnswers = quiz.settings.requireManualReviewForShortAnswers;
  session.questionLimit = Number(quiz.settings.questionLimit || QUESTION_LIMIT_DEFAULT);
  session.questionTimeLimitMs = Number(quiz.settings.questionTimeLimitMs || QUESTION_TIME_LIMIT_MS_DEFAULT);
  session.waitForAllPlayers = quiz.settings.waitForAllPlayers !== false;
  session.currentRound = null;
  session.quizId = quiz.quizId;
  session.classId = quiz.classId;
  session.mode = "teacher_host";

  sessions.set(session.sessionId, session);
  roomToSession.set(session.roomCode, session.sessionId);
  return res.json({
    ok: true,
    quizId: quiz.quizId,
    sessionId: session.sessionId,
    roomCode: session.roomCode,
    playerId: hostPlayer.playerId
  });
});

app.get("/api/teacher/reviews/pending", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  const teacherQuizIds = new Set(listTeacherQuizzes(auth.teacherId).map((quiz) => quiz.quizId));
  const pending = accessControl.manualReviews.filter((item) => teacherQuizIds.has(item.quizId) && item.status === "pending");
  return res.json({ pending });
});

app.post("/api/teacher/reviews/:reviewId/grade", (req, res) => {
  const auth = requireRole(req, res, ["teacher"]);
  if (!auth) return;
  const review = accessControl.manualReviews.find((item) => item.reviewId === req.params.reviewId);
  if (!review) return res.status(404).json({ error: "Review item not found" });
  const teacherQuizIds = new Set(listTeacherQuizzes(auth.teacherId).map((quiz) => quiz.quizId));
  if (!teacherQuizIds.has(review.quizId)) return res.status(403).json({ error: "Forbidden" });

  const { points } = req.body || {};
  if (typeof points !== "number") return res.status(400).json({ error: "points number is required" });
  review.status = "graded";
  review.pointsAwarded = points;
  review.gradedAt = Date.now();

  const session = sessions.get(review.sessionId);
  if (session) {
    const player = (session.players || []).find((item) => item.playerId === review.playerId);
    if (player) player.score += points;
  }

  saveAccessControl(accessControl);
  return res.json({ ok: true, review });
});

// -- Browse questions (for debugging) ------------------------
app.get("/api/questions", (req, res) => {
  const { gradeBand, subject } = req.query;
  let list = questionBank;
  if (gradeBand) list = list.filter(q => q.gradeBand === gradeBand);
  if (subject)   list = list.filter(q =>
    q.subject.toLowerCase()  === subject.toLowerCase() ||
    q.category.toLowerCase() === subject.toLowerCase()
  );
  res.json({ total: list.length, questions: list });
});

// -- Import questions (saves to disk) ------------------------
app.post("/api/questions/import", (req, res) => {
  const auth = requireRole(req, res, ["owner", "teacher"]);
  if (!auth) return;
  const incoming = req.body?.questions;
  if (!Array.isArray(incoming) || !incoming.length) {
    return res.status(400).json({ error: "Body must include questions: []" });
  }

  const normalized = incoming.map((q, i) => normalizeQuestion(q, i));
  normalized.forEach((q) => {
    q.authorRole = auth.role;
    if (auth.role === "teacher") q.authorTeacherId = auth.teacherId;
  });

  // Deduplicate by id
  const existingIds = new Set(questionBank.map(q => q.id));
  const fresh = normalized.filter(q => !existingIds.has(q.id));

  questionBank = questionBank.concat(fresh);
  saveBank(questionBank);

  return res.json({ ok: true, imported: fresh.length, duplicatesSkipped: normalized.length - fresh.length, total: questionBank.length });
});

// -- Delete all imported questions (reset to seed) ------------
app.delete("/api/questions/reset", (_req, res) => {
  questionBank = [...seedQuestions];
  if (fs.existsSync(bankFile)) fs.unlinkSync(bankFile);
  res.json({ ok: true, total: questionBank.length });
});

// -- Sessions -------------------------------------------------
app.post("/api/session/create", (req, res) => {
  const { mode, gradeBand, subject, hostName, avatarId } = req.body || {};
  if (!mode || !gradeBand || !subject) {
    return res.status(400).json({ error: "mode, gradeBand, subject are required" });
  }

  const session = createSession({ mode, gradeBand, subject });
  session.players     = [];
  let hostPlayer = null;
  if (hostName) {
    hostPlayer = createPlayer({ name: hostName, avatarId });
    session.players.push(hostPlayer);
  }
  session.roomCode    = mode === "host" ? createUniqueRoomCode() : null;
  session.playerCount = session.players.length;
  session.revealAnswersImmediately = true;
  session.requireManualReviewForShortAnswers = false;
  session.questionLimit = QUESTION_LIMIT_DEFAULT;
  session.questionTimeLimitMs = QUESTION_TIME_LIMIT_MS_DEFAULT;
  session.waitForAllPlayers = isMultiplayerSession(session);
  session.currentRound = null;

  sessions.set(session.sessionId, session);
  if (session.roomCode) roomToSession.set(session.roomCode, session.sessionId);

  return res.json({
    sessionId: session.sessionId,
    roomCode: session.roomCode,
    playerCount: session.playerCount,
    playerId: hostPlayer ? hostPlayer.playerId : null,
    leaderboard: leaderboardFor(session)
  });
});

app.post("/api/session/join", (req, res) => {
  const { roomCode, playerName, avatarId } = req.body || {};
  if (!roomCode) return res.status(400).json({ error: "roomCode is required" });
  const normalizedRoomCode = String(roomCode).toUpperCase();
  if (!ROOM_CODE_PATTERN.test(normalizedRoomCode)) {
    return res.status(400).json({ error: "Room code must match JAM + 5 digits (example: JAM01234)." });
  }

  const sessionId = roomToSession.get(normalizedRoomCode);
  if (!sessionId) return res.status(404).json({ error: "Room not found" });

  const session = sessions.get(sessionId);
  if (!session)  return res.status(404).json({ error: "Session not found" });

  let joinedPlayer = null;
  if (playerName) {
    joinedPlayer = createPlayer({ name: playerName, avatarId });
    session.players.push(joinedPlayer);
  }
  session.playerCount = session.players.length;

  return res.json({
    sessionId: session.sessionId,
    roomCode: session.roomCode,
    playerCount: session.playerCount,
    filters: session.filters,
    playerId: joinedPlayer ? joinedPlayer.playerId : null,
    leaderboard: leaderboardFor(session)
  });
});

app.get("/api/session/:sessionId", (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  return res.json({
    sessionId: session.sessionId,
    roomCode: session.roomCode,
    playerCount: session.playerCount,
    mode: session.mode,
    filters: session.filters,
    leaderboard: leaderboardFor(session)
  });
});

app.get("/api/session/:sessionId/leaderboard", (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  return res.json({ leaderboard: leaderboardFor(session) });
});

app.get("/api/session/:sessionId/next-question", (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const playerId = String(req.query.playerId || "").trim() || null;
  const multiplayer = isMultiplayerSession(session);

  if (multiplayer) {
    if (!session.currentRound) {
      const round = createRoundForSession(session, questionBank);
      if (!round) {
        return res.json({ done: true, message: "No more questions for this session.", leaderboard: leaderboardFor(session) });
      }
    }

    const progress = roundProgress(session);
    const hasAnswered = playerId ? session.currentRound.answeredPlayerIds.includes(playerId) : false;
    const shouldAdvance = progress.timedOut || (session.waitForAllPlayers ? progress.everyoneAnswered : hasAnswered);

    if (shouldAdvance) {
      session.currentRound = null;
      const nextRound = createRoundForSession(session, questionBank);
      if (!nextRound) {
        return res.json({ done: true, message: "No more questions for this session.", leaderboard: leaderboardFor(session) });
      }
      const nextProgress = roundProgress(session);
      return res.json({
        done: false,
        waiting: false,
        question: nextRound.question,
        questionNumber: nextRound.questionNumber,
        questionLimit: Number(session.questionLimit || QUESTION_LIMIT_DEFAULT),
        secondsLeft: nextProgress ? nextProgress.secondsLeft : 0,
        totalPlayers: nextProgress ? nextProgress.totalPlayers : Math.max(1, (session.players || []).length),
        answeredCount: nextProgress ? nextProgress.answeredCount : 0
      });
    }

    if (hasAnswered) {
      return res.json({
        done: false,
        waiting: true,
        waitReason: progress.timedOut ? "timer" : "players",
        secondsLeft: progress.secondsLeft,
        answeredCount: progress.answeredCount,
        totalPlayers: progress.totalPlayers,
        questionNumber: session.currentRound.questionNumber,
        questionLimit: Number(session.questionLimit || QUESTION_LIMIT_DEFAULT)
      });
    }

    return res.json({
      done: false,
      waiting: false,
      question: session.currentRound.question,
      questionNumber: session.currentRound.questionNumber,
      questionLimit: Number(session.questionLimit || QUESTION_LIMIT_DEFAULT),
      secondsLeft: progress.secondsLeft,
      totalPlayers: progress.totalPlayers,
      answeredCount: progress.answeredCount
    });
  }

  const limit = Number(session.questionLimit || QUESTION_LIMIT_DEFAULT);
  if ((session.askedQuestionIds || []).length >= limit) {
    session.currentRound = null;
    return res.json({ done: true, message: "No more questions for this session.", leaderboard: leaderboardFor(session) });
  }

  const q = getNextQuestion(session, questionBank);
  if (!q) return res.json({ done: true, message: "No more questions for this session.", leaderboard: leaderboardFor(session) });

  const roundQuestion = buildRoundQuestion(q);
  session.currentRound = {
    questionId: q.id,
    correctOptionId: roundQuestion.correctOptionId,
    question: roundQuestion.question,
    answeredPlayerIds: []
  };
  return res.json({
    done: false,
    waiting: false,
    question: roundQuestion.question,
    questionNumber: (session.askedQuestionIds || []).length,
    questionLimit: limit,
    secondsLeft: Math.ceil(Number(session.questionTimeLimitMs || QUESTION_TIME_LIMIT_MS_DEFAULT) / 1000)
  });
});

app.post("/api/session/:sessionId/answer", (req, res) => {
  const session = sessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });

  const { questionId, selectedOptionId, answerText, answerBoolean, playerId } = req.body || {};
  const q = questionBank.find((x) => x.id === questionId);
  if (!q) return res.status(404).json({ error: "Question not found" });

  const multiplayer = isMultiplayerSession(session);
  if (multiplayer) {
    if (!playerId) return res.status(400).json({ error: "playerId is required for multiplayer answers" });
    if (!session.currentRound || session.currentRound.questionId !== questionId) {
      return res.status(409).json({ error: "This question is no longer active." });
    }
    if (session.currentRound.answeredPlayerIds.includes(playerId)) {
      return res.status(409).json({ error: "You already answered this question." });
    }
  }

  const type = q.type || "mcq";
  let isCorrect = false;
  let pendingManualReview = false;
  let pointsDelta = 0;

  if (type === "mcq") {
    const hasServedRound = session.currentRound && session.currentRound.questionId === questionId;
    const correctOptionId = hasServedRound
      ? session.currentRound.correctOptionId
      : q.correctOptionId;
    isCorrect = correctOptionId === selectedOptionId;
  } else if (type === "true_false") {
    isCorrect = q.correctBoolean === Boolean(answerBoolean);
  } else if (type === "short_answer") {
    if (session.requireManualReviewForShortAnswers && session.quizId) {
      pendingManualReview = true;
      const player = (session.players || []).find((item) => item.playerId === playerId);
      accessControl.manualReviews.push({
        reviewId: `rv_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
        quizId: session.quizId,
        classId: session.classId || null,
        sessionId: session.sessionId,
        playerId: playerId || null,
        playerName: player ? player.name : "Unknown",
        questionId: q.id,
        prompt: q.prompt,
        answerText: String(answerText || ""),
        status: "pending",
        createdAt: Date.now()
      });
      saveAccessControl(accessControl);
    } else {
      const submitted = normalizeFreeText(answerText);
      const acceptable = (q.acceptableAnswers || []).map((a) => normalizeFreeText(a)).filter(Boolean);
      isCorrect = acceptable.includes(submitted);
    }
  } else if (type === "learning") {
    isCorrect = true;
  }

  if (multiplayer && session.currentRound && playerId) {
    session.currentRound.answeredPlayerIds.push(playerId);
  }

  if (!pendingManualReview) pointsDelta = isCorrect ? SCORE_CORRECT : SCORE_INCORRECT;
  let playerScore = null;
  if (playerId) {
    const player = (session.players || []).find((item) => item.playerId === playerId);
    if (player) {
      player.score += pointsDelta;
      playerScore = player.score;
    }
  }

  const revealAnswer = session.revealAnswersImmediately !== false && !pendingManualReview;
  const progress = multiplayer ? roundProgress(session) : null;

  return res.json({
    isCorrect: pendingManualReview ? null : isCorrect,
    type,
    pointsDelta,
    playerScore,
    pendingManualReview,
    revealAnswer,
    explanation: revealAnswer ? (q.explanation || "") : "",
    correctOptionId: revealAnswer
      ? (session.currentRound && session.currentRound.questionId === questionId ? session.currentRound.correctOptionId : (q.correctOptionId || null))
      : null,
    acceptableAnswers: revealAnswer ? (q.acceptableAnswers || []) : [],
    correctBoolean: revealAnswer ? q.correctBoolean : null,
    waitingForOthers: multiplayer ? Boolean(progress && !progress.timedOut && session.waitForAllPlayers && !progress.everyoneAnswered) : false,
    secondsLeft: progress ? progress.secondsLeft : null,
    answeredCount: progress ? progress.answeredCount : null,
    totalPlayers: progress ? progress.totalPlayers : null,
    leaderboard: leaderboardFor(session)
  });
});

app.listen(PORT, () => console.log(`Jam-Pak EDU running: http://localhost:${PORT}`));
