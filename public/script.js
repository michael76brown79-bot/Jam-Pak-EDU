/* ============================================================
   Jam-Pak EDU - Main Application Script
   ============================================================ */

const app = document.getElementById("app");
const API_BASE = (() => {
  if (window.location.protocol === "file:") return "http://localhost:3001";
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (isLocal && window.location.port !== "3001") return "http://localhost:3001";
  return "";
})();

const SUBJECT_CHOICES = [
  { value: "Math", label: "Mathematics" },
  { value: "English", label: "English Language" },
  { value: "Science", label: "Science" },
  { value: "Social Studies", label: "Social Studies" },
  { value: "Geography", label: "Geography" }
];
const BUILDER_SUBJECT_CHOICES = [
  { value: "Math", label: "Math" },
  { value: "English", label: "English" },
  { value: "Science", label: "Science" },
  { value: "Social Studies", label: "Social Studies" },
  { value: "Geography", label: "Geography" },
  { value: "History", label: "History" },
  { value: "Music", label: "Music" },
  { value: "English Literature", label: "English Literature" },
  { value: "Biology", label: "Biology" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Physics", label: "Physics" }
];
const GRADE_LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const PRIMARY_GRADES = ["1", "2", "3", "4", "5", "6"];
const HIGH_SCHOOL_GRADES = ["7", "8", "9", "10", "11"];
const SUBJECT_CHOICES_BY_GRADE = {
  "1": ["Math", "English", "Social Studies", "Science"],
  "2": ["Math", "English", "Social Studies", "Science"],
  "3": ["Math", "English", "Science", "Social Studies", "History"],
  "4": ["Math", "English", "Science", "Social Studies", "History"],
  "5": ["Math", "English", "Science", "Social Studies", "Geography", "History", "Music"],
  "6": ["Math", "English", "Science", "Social Studies", "Geography", "History", "Music"],
  "7": ["Math", "English", "Science", "Social Studies", "Geography", "History", "Music"],
  "8": ["Math", "English", "Science", "Social Studies", "Geography", "History", "Music"],
  "9": ["Math", "English", "Science", "Social Studies", "Geography", "History", "Music"],
  "10": ["Math", "English", "English Literature", "Biology", "Chemistry", "Physics", "Geography", "History"],
  "11": ["Math", "English", "English Literature", "Biology", "Chemistry", "Physics", "Geography", "History"]
};

const AVATAR_CHOICES = [
  "island-ace","sunset-star","reggae-rider","blue-wave","gold-leaf","mint-vibe",
  "jamaica-star","class-champ","quiz-hero","island-spark","learning-wave","book-blaze",
  "focus-flame","green-rhythm","gold-rush","edu-power","bright-beat","smart-step",
  "top-score","future-lead","study-king","study-queen","brain-jam","victory-vibe",
  "coral-crown","drum-master","mango-mind","sunshine-scholar","river-runner","island-reader",
  "pineapple-pro","blue-mountain","maroon-maestro","paradise-pro","quiz-captain","bright-bloom"
];
const AVATAR_STYLE = "adventurer-neutral";

const ICONS = {
  host: `<svg viewBox="0 0 100 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 68 L10 44 L27 60 L50 12 L73 60 L90 44 L90 68 Z"/>
    <rect x="10" y="68" width="80" height="10" rx="5"/>
    <circle cx="10" cy="44" r="6"/>
    <circle cx="50" cy="12" r="7"/>
    <circle cx="90" cy="44" r="6"/>
  </svg>`,
  join: `<svg viewBox="0 0 100 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <circle cx="33" cy="22" r="14"/>
    <path d="M3 80 C3 57 17 46 33 46 C49 46 63 57 63 80 Z"/>
    <circle cx="72" cy="18" r="11"/>
    <path d="M50 80 C50 61 61 52 72 52 C84 52 97 61 97 80 Z"/>
  </svg>`,
  solo: `<svg viewBox="0 0 100 80" fill="none" stroke="currentColor" stroke-width="3.5"
      stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="50" y1="10" x2="50" y2="74"/>
    <path d="M14 10 Q32 12 50 14 L50 74 Q32 72 14 70 Z"/>
    <path d="M86 10 Q68 12 50 14 L50 74 Q68 72 86 70 Z"/>
    <line x1="21" y1="26" x2="44" y2="28"/>
    <line x1="21" y1="36" x2="44" y2="38"/>
    <line x1="21" y1="46" x2="44" y2="48"/>
    <line x1="56" y1="28" x2="79" y2="26"/>
    <line x1="56" y1="38" x2="79" y2="36"/>
    <line x1="56" y1="48" x2="79" y2="46"/>
  </svg>`,
  debate: `<svg viewBox="0 0 100 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="60" height="40" rx="12"/>
    <polygon points="14,42 2,60 30,42"/>
    <circle cx="18" cy="22" r="4.5" fill="white"/>
    <circle cx="32" cy="22" r="4.5" fill="white"/>
    <circle cx="46" cy="22" r="4.5" fill="white"/>
    <rect x="38" y="48" width="60" height="38" rx="12"/>
    <polygon points="72,47 98,32 88,47"/>
    <circle cx="56" cy="67" r="4" fill="white"/>
    <circle cx="68" cy="67" r="4" fill="white"/>
    <circle cx="80" cy="67" r="4" fill="white"/>
  </svg>`
};

const hostState = {};
const joinState = {};
const soloState = {};
const debateState = {};
const ownerState = { accessToken: null };
const teacherState = {
  accessToken: null,
  teacher: null,
  classes: [],
  quizzes: [],
  pendingSchoolId: "",
  pendingTeachingLevel: "high",
  prefillEmail: ""
};
const studentState = {
  accessToken: null,
  student: null,
  prefillEmail: "",
  pendingSchoolId: "",
  pendingTeacherId: "",
  pendingGradeLevel: "7"
};
const gameState = {
  sessionId: null,
  currentQuestion: null,
  score: 0,
  answered: 0,
  modeLabel: "",
  topic: "",
  revealTimer: null,
  playerId: null,
  playerName: "",
  avatarId: null,
  isMultiplayer: false,
  questionLimit: 15,
  questionNumber: 0,
  secondsLeft: 0,
  waitPollTimer: null,
  countdownInterval: null
};

// â”€â”€ Audio â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let _audioCtx = null;
function getAudioContext() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

function playTick(secondsLeft) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = secondsLeft <= 3 ? 1046 : 659;
    osc.type = "sine";
    gain.gain.setValueAtTime(secondsLeft <= 3 ? 0.45 : 0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (secondsLeft <= 3 ? 0.18 : 0.12));
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.18);
  } catch (_e) {}
}

// â”€â”€ Countdown overlay â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function showCountdownOverlay(number) {
  const existing = document.getElementById("countdownOverlay");
  if (existing) existing.remove();
  const overlay = document.createElement("div");
  overlay.id = "countdownOverlay";
  overlay.className = "countdown-overlay";
  overlay.innerHTML = `<span class="countdown-number">${number}</span>`;
  document.body.appendChild(overlay);
  setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 900);
}

function clearCountdownTimer() {
  if (gameState.countdownInterval) {
    clearInterval(gameState.countdownInterval);
    gameState.countdownInterval = null;
  }
  const existing = document.getElementById("countdownOverlay");
  if (existing) existing.remove();
}

function startCountdownTimer(initialSeconds) {
  clearCountdownTimer();
  gameState.secondsLeft = initialSeconds;

  const updateDisplay = () => {
    const el = document.getElementById("timerValue");
    if (el) el.textContent = `${gameState.secondsLeft}s`;
  };
  updateDisplay();

  gameState.countdownInterval = setInterval(() => {
    gameState.secondsLeft = Math.max(0, gameState.secondsLeft - 1);
    updateDisplay();
    if (gameState.secondsLeft > 0) {
      playTick(gameState.secondsLeft);
    }
    if (gameState.secondsLeft <= 3 && gameState.secondsLeft > 0) {
      showCountdownOverlay(gameState.secondsLeft);
    }
    if (gameState.secondsLeft <= 0) {
      clearCountdownTimer();
    }
  }, 1000);
}

function headerMini() {
  return `
    <div class="logo-mini-wrap">
      <span class="logo-mini">
        <span class="jam">Jam</span>-<span class="pak">Pak</span> <span class="edu">EDU</span>
      </span>
    </div>`;
}

function footerHTML() {
  return `
    <footer class="footer">
      &copy; 2025-2026
      <span class="brand-name">Jam-Pak EDU</span>
      <span class="sep">|</span>
      All Rights Reserved
    </footer>`;
}

function stepDots(total, current) {
  return Array.from({ length: total }, (_, i) =>
    `<div class="step-dot${i < current ? " active" : ""}"></div>`
  ).join("");
}

function resolveSubjectChoice(value) {
  return BUILDER_SUBJECT_CHOICES.find((item) => item.value === value)
    || SUBJECT_CHOICES.find((item) => item.value === value)
    || { value, label: value };
}

function subjectsForGrade(grade) {
  const values = SUBJECT_CHOICES_BY_GRADE[String(grade || "").trim()] || SUBJECT_CHOICES.map((item) => item.value);
  return values.map((value) => resolveSubjectChoice(value));
}

function ensureValidSubjectForGrade(state) {
  if (!state || !state.grade) return;
  const fallbackSubject = subjectsForGrade(state.grade)[0]?.value || "";
  if (!state.subject || !isSubjectAllowedForGrade(state.grade, state.subject)) {
    state.subject = fallbackSubject;
  }
}

function isSubjectAllowedForGrade(grade, subject) {
  return subjectsForGrade(grade).some((item) => item.value === subject);
}

function subjectCardsMarkup(selected, grade) {
  return subjectsForGrade(grade).map((subject) =>
    `<button class="subject-card${selected === subject.value ? " selected" : ""}" type="button" data-subject="${subject.value}">
      ${subject.label}
    </button>`
  ).join("");
}

function gradeCardMarkup(selected, grade) {
  return `<div class="grade-card${selected === grade ? " selected" : ""}" data-grade="${grade}">Grade ${grade}</div>`;
}

function avatarImageUrl(avatarId) {
  return `https://api.dicebear.com/9.x/${AVATAR_STYLE}/svg?seed=${encodeURIComponent(avatarId)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

function avatarImageTag(avatarId, label, className) {
  return `<img class="${className}" src="${avatarImageUrl(avatarId)}" alt="${label} avatar" loading="lazy" referrerpolicy="no-referrer"/>`;
}

function avatarCardsMarkup(selected) {
  return AVATAR_CHOICES.map((avatarId) =>
    `<button class="avatar-card${selected === avatarId ? " selected" : ""}" type="button" data-avatar="${avatarId}" aria-label="Choose avatar" aria-pressed="${selected === avatarId}">
      <span class="avatar-portrait-wrap">
        ${avatarImageTag(avatarId, "Avatar option", "avatar-portrait")}
        <span class="avatar-check" aria-hidden="true">&#10003;</span>
      </span>
    </button>`
  ).join("");
}

function builderSelectOptions(items, selected) {
  return items.map((item) => {
    const value = typeof item === "string" ? item : item.value;
    const label = typeof item === "string" ? item : item.label;
    return `<option value="${value}"${selected === value ? " selected" : ""}>${label}</option>`;
  }).join("");
}

function buildApiUrl(url) {
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE}${url}`;
}

async function api(url, method, body, accessToken) {
  const requestUrl = buildApiUrl(url);
  let response;
  const headers = { "Content-Type": "application/json" };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
  const payload = body ? JSON.stringify(body) : undefined;

  try {
    response = await fetch(requestUrl, {
      method: method || "GET",
      headers,
      body: payload
    });
  } catch (_error) {
    if (!/^https?:\/\//i.test(url)) {
      const fallbackBases = ["http://localhost:3001", "http://127.0.0.1:3001"];
      for (const base of fallbackBases) {
        try {
          response = await fetch(`${base}${url}`, {
            method: method || "GET",
            headers,
            body: payload
          });
          break;
        } catch (_fallbackError) {
          // Continue trying fallbacks
        }
      }
    }
    if (!response) {
      throw new Error("Cannot reach the game server. Open the app from http://localhost:3001 and try again.");
    }
  }

  let data = {};
  try {
    data = await response.json();
  } catch (_error) {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
}

async function fetchSchools(searchText, levelFilter = "") {
  const query = String(searchText || "").trim();
  const level = String(levelFilter || "").trim().toLowerCase();
  const params = new URLSearchParams();
  if (query) params.set("search", query);
  if (level === "primary" || level === "high" || level === "both") params.set("level", level);
  const suffix = params.toString();
  const path = suffix ? `/api/schools?${suffix}` : "/api/schools";
  const result = await api(path);
  let schools = Array.isArray(result.schools) ? result.schools : [];
  if (!schools.length && level && level !== "both") {
    const fallbackParams = new URLSearchParams();
    if (query) fallbackParams.set("search", query);
    const fallbackSuffix = fallbackParams.toString();
    const fallbackPath = fallbackSuffix ? `/api/schools?${fallbackSuffix}` : "/api/schools";
    const fallback = await api(fallbackPath);
    schools = Array.isArray(fallback.schools) ? fallback.schools : [];
  }
  return schools;
}

function learningLevelFromGrade(gradeLevel) {
  const grade = Number(gradeLevel);
  if (Number.isNaN(grade)) return "";
  if (grade >= 1 && grade <= 6) return "primary";
  if (grade >= 7 && grade <= 11) return "high";
  return "";
}

async function fetchTeachersBySchool(schoolId, teachingLevelFilter = "") {
  if (!schoolId) return [];
  const teachingLevel = String(teachingLevelFilter || "").trim().toLowerCase();
  const params = new URLSearchParams();
  if (teachingLevel === "primary" || teachingLevel === "high" || teachingLevel === "both") {
    params.set("teachingLevel", teachingLevel);
  }
  const suffix = params.toString();
  const path = suffix
    ? `/api/schools/${encodeURIComponent(schoolId)}/teachers?${suffix}`
    : `/api/schools/${encodeURIComponent(schoolId)}/teachers`;
  const result = await api(path);
  return Array.isArray(result.teachers) ? result.teachers : [];
}

async function fetchTeacherClassesPublic(teacherId) {
  if (!teacherId) return [];
  const result = await api(`/api/teachers/${encodeURIComponent(teacherId)}/classes/public`);
  return Array.isArray(result.classes) ? result.classes : [];
}

function schoolOptionsMarkup(schools, selectedSchoolId) {
  return schools.map((school) => {
    const selected = selectedSchoolId === school.schoolId ? " selected" : "";
    const levelLabel = school.level ? ` [${String(school.level).toUpperCase()}]` : "";
    return `<option value="${school.schoolId}"${selected}>${school.name} (${school.parish})${levelLabel}</option>`;
  }).join("");
}

function teacherOptionsMarkup(teachers, selectedTeacherId) {
  return teachers.map((teacher) => {
    const selected = selectedTeacherId === teacher.teacherId ? " selected" : "";
    return `<option value="${teacher.teacherId}"${selected}>${teacher.name}</option>`;
  }).join("");
}

function classOptionsMarkup(classes, selectedClassId) {
  return classes.map((cls) => {
    const selected = selectedClassId === cls.classId ? " selected" : "";
    return `<option value="${cls.classId}"${selected}>${cls.className}</option>`;
  }).join("");
}

function renderHome() {
  app.innerHTML = `
    <div class="page">
      <div class="home-shell">
        <div class="home-hero">
          <div class="logo-wrap">
            <h1 class="logo">
              <span class="jam">Jam</span>-<span class="pak">Pak</span> <span class="edu">EDU</span>
            </h1>
            <p class="tagline">Choose Your Pack</p>
            <p class="subtagline">Host a live room, join a challenge, study solo, or debate.</p>
          </div>
          <div class="hero-pills">
            <span>Multiplayer Rooms</span>
            <span>Curated Quizzes</span>
            <span>Jamaican Curriculum</span>
          </div>
        </div>

        <div class="menu-cards">
          <div class="pack-card card-host" id="card-host" role="button" tabindex="0">
            <div class="card-title">Host Game</div>
          </div>

          <div class="pack-card card-join" id="card-join" role="button" tabindex="0">
            <div class="card-title">Join Game</div>
          </div>

          <div class="pack-card card-solo" id="card-solo" role="button" tabindex="0">
            <div class="card-title">Solo Study</div>
          </div>

          <div class="pack-card card-debate" id="card-debate" role="button" tabindex="0">
            <div class="card-title">Debate</div>
          </div>
        </div>
        <div class="selected-pack-label">Selected Pack <strong id="selectedPackValue">None</strong></div>
        <div class="home-tools">
          <button class="btn-back" id="teacherPortalBtn">${teacherState.accessToken ? "Teacher Portal" : "Teacher Sign In"}</button>
          <button class="btn-back" id="studentPortalBtn">${studentState.accessToken ? "Student Portal" : "Student Sign In"}</button>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("card-host").onclick = () => renderHost(1);
  document.getElementById("card-join").onclick = renderJoin;
  document.getElementById("card-solo").onclick = () => renderSolo(1);
  document.getElementById("card-debate").onclick = renderDebate;
  document.getElementById("teacherPortalBtn").onclick = () => {
    if (teacherState.accessToken) {
      renderTeacherPortal();
      return;
    }
    renderTeacherAccess();
  };
  document.getElementById("studentPortalBtn").onclick = () => {
    if (studentState.accessToken && studentState.student) {
      renderStudentDashboard();
      return;
    }
    renderStudentAccess();
  };

  const selectedPackValue = document.getElementById("selectedPackValue");
  document.querySelectorAll(".pack-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (selectedPackValue) selectedPackValue.textContent = card.querySelector(".card-title").textContent;
    });
    card.addEventListener("mouseleave", () => {
      if (selectedPackValue) selectedPackValue.textContent = "None";
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });
}

function bindGradeSelection(onSelect) {
  document.querySelectorAll(".grade-card").forEach((card) => {
    card.onclick = () => {
      document.querySelectorAll(".grade-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      onSelect(card.dataset.grade);
    };
  });
}

function bindSubjectSelection(onSelect) {
  document.querySelectorAll(".subject-card").forEach((card) => {
    card.onclick = () => {
      document.querySelectorAll(".subject-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      onSelect(card.dataset.subject);
    };
  });
}

function bindAvatarSelection(onSelect) {
  document.querySelectorAll(".avatar-card").forEach((card) => {
    card.onclick = () => {
      document.querySelectorAll(".avatar-card").forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      card.setAttribute("aria-pressed", "true");
      onSelect(card.dataset.avatar);
    };
  });
}

function renderOwnerAccess() {
  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page">
        <div class="inner-header">
          <span class="inner-title">Owner Access</span>
          <button class="btn-back" id="ownerBackBtn">Back</button>
        </div>
        <div class="panel">
          <label class="field-label" for="ownerCode">Owner Access Code</label>
          <input type="text" id="ownerCode" placeholder="Enter owner access code"/>
          <div id="ownerSetupWrap" class="hidden">
            <p class="status-note">No owner code found yet. Create one now (12+ characters).</p>
            <button class="btn-back btn-inline" id="ownerSetupBtn">Set Owner Code</button>
          </div>
          <button class="btn-primary btn-gold" id="ownerLoginBtn">Sign In</button>
          <p class="status-note" id="ownerStatus"></p>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("ownerBackBtn").onclick = renderHome;
  const status = document.getElementById("ownerStatus");
  const setupWrap = document.getElementById("ownerSetupWrap");
  const setupBtn = document.getElementById("ownerSetupBtn");

  api("/api/auth/owner/status")
    .then((result) => {
      if (!result.configured) setupWrap.classList.remove("hidden");
    })
    .catch((error) => {
      status.textContent = error.message;
    });

  setupBtn.onclick = async () => {
    const accessCode = document.getElementById("ownerCode").value.trim();
    if (accessCode.length < 12) {
      status.textContent = "Use at least 12 characters for your owner code.";
      return;
    }
    status.textContent = "Setting owner code...";
    try {
      await api("/api/auth/owner/setup", "POST", { accessCode });
      setupWrap.classList.add("hidden");
      status.textContent = "Owner code saved. You can now sign in.";
    } catch (error) {
      status.textContent = error.message;
    }
  };

  document.getElementById("ownerLoginBtn").onclick = async () => {
    const accessCode = document.getElementById("ownerCode").value.trim();
    if (!accessCode) {
      status.textContent = "Enter the owner access code.";
      return;
    }
    status.textContent = "Signing in...";
    try {
      const result = await api("/api/auth/owner/login", "POST", { accessCode });
      ownerState.accessToken = result.accessToken;
      status.textContent = "Owner authenticated.";
      renderQuestionBuilder();
    } catch (error) {
      status.textContent = error.message;
    }
  };
}

function renderTeacherAccess() {
  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page">
        <div class="inner-header">
          <span class="inner-title">Teacher Sign In</span>
          <button class="btn-back" id="teacherBackBtn">Back</button>
        </div>
        <div class="panel">
          <label class="field-label" for="teacherEmail">Teacher Email</label>
          <input type="text" id="teacherEmail" placeholder="teacher@example.com" value="${teacherState.prefillEmail || ""}"/>
          <label class="field-label" for="teacherPassword">Teacher Password</label>
          <input type="password" id="teacherPassword" placeholder="Teacher password"/>
          <button class="btn-primary btn-gold" id="teacherLoginBtn">Sign In</button>
          <button class="btn-back btn-inline" id="teacherCreateBtn">Create Teacher Account</button>
          <p class="status-note" id="teacherStatus"></p>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("teacherBackBtn").onclick = renderHome;
  document.getElementById("teacherCreateBtn").onclick = () => renderTeacherRegister();
  document.getElementById("teacherLoginBtn").onclick = async () => {
    const email = document.getElementById("teacherEmail").value.trim();
    const password = document.getElementById("teacherPassword").value.trim();
    const status = document.getElementById("teacherStatus");
    if (!email || !password) {
      status.textContent = "Enter teacher email and password.";
      return;
    }
    status.textContent = "Signing in...";
    try {
      const result = await api("/api/auth/teacher/login", "POST", { email, password });
      teacherState.accessToken = result.accessToken;
      teacherState.teacher = result.teacher;
      teacherState.prefillEmail = "";
      status.textContent = "Teacher authenticated.";
      renderTeacherPortal();
    } catch (error) {
      status.textContent = error.message;
    }
  };
}

async function renderTeacherRegister() {
  const selectedLevel = teacherState.pendingTeachingLevel || "high";
  teacherState.pendingTeachingLevel = selectedLevel;

  let schools = [];
  try {
    schools = await fetchSchools("", selectedLevel);
  } catch (_error) {
    schools = [];
  }
  const selectedSchool = schools.some((school) => school.schoolId === teacherState.pendingSchoolId)
    ? teacherState.pendingSchoolId
    : schools[0]?.schoolId || "";
  teacherState.pendingSchoolId = selectedSchool;

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide">
        <div class="inner-header">
          <span class="inner-title">Create Teacher Account</span>
          <button class="btn-back" id="teacherRegisterBackBtn">Back</button>
        </div>
        <div class="panel">
          <label class="field-label" for="teacherRegName">Full Name</label>
          <input type="text" id="teacherRegName" placeholder="Enter your full name"/>
          <label class="field-label" for="teacherRegEmail">Email</label>
          <input type="text" id="teacherRegEmail" placeholder="teacher@example.com"/>
          <label class="field-label" for="teacherRegPassword">Password</label>
          <input type="password" id="teacherRegPassword" placeholder="At least 8 characters"/>
          <label class="field-label" for="teacherRegLevel">Teaching Level</label>
          <select id="teacherRegLevel">
            <option value="high"${selectedLevel === "high" ? " selected" : ""}>High School (Grades 7-11)</option>
            <option value="primary"${selectedLevel === "primary" ? " selected" : ""}>Primary (Grades 1-6)</option>
            <option value="both"${selectedLevel === "both" ? " selected" : ""}>Both Primary and High</option>
          </select>
          <label class="field-label" for="teacherRegSearch">Search School</label>
          <input type="text" id="teacherRegSearch" placeholder="Search Jamaican school by name or parish"/>
          <label class="field-label" for="teacherRegSchool">Select School</label>
          <select id="teacherRegSchool">${schoolOptionsMarkup(schools, selectedSchool) || "<option value=''>No schools found</option>"}</select>
          <button class="btn-primary btn-gold" id="teacherRegisterSubmitBtn">Create Teacher Account</button>
          <p class="status-note" id="teacherRegisterStatus"></p>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("teacherRegisterBackBtn").onclick = renderTeacherAccess;

  document.getElementById("teacherRegLevel").onchange = async (event) => {
    teacherState.pendingTeachingLevel = event.target.value;
    const select = document.getElementById("teacherRegSchool");
    const query = document.getElementById("teacherRegSearch").value;
    try {
      const filtered = await fetchSchools(query, teacherState.pendingTeachingLevel);
      teacherState.pendingSchoolId = filtered[0]?.schoolId || "";
      select.innerHTML = schoolOptionsMarkup(filtered, teacherState.pendingSchoolId) || "<option value=''>No schools found</option>";
    } catch (_error) {
      teacherState.pendingSchoolId = "";
      select.innerHTML = "<option value=''>No schools found</option>";
    }
  };

  document.getElementById("teacherRegSearch").oninput = async (event) => {
    const query = event.target.value;
    const select = document.getElementById("teacherRegSchool");
    try {
      const filtered = await fetchSchools(query, teacherState.pendingTeachingLevel);
      const selected = filtered.some((school) => school.schoolId === teacherState.pendingSchoolId)
        ? teacherState.pendingSchoolId
        : filtered[0]?.schoolId || "";
      teacherState.pendingSchoolId = selected;
      select.innerHTML = schoolOptionsMarkup(filtered, selected) || "<option value=''>No schools found</option>";
    } catch (_error) {
      teacherState.pendingSchoolId = "";
      select.innerHTML = "<option value=''>No schools found</option>";
    }
  };

  document.getElementById("teacherRegSchool").onchange = (event) => {
    teacherState.pendingSchoolId = event.target.value;
  };

  document.getElementById("teacherRegisterSubmitBtn").onclick = async () => {
    const name = document.getElementById("teacherRegName").value.trim();
    const email = document.getElementById("teacherRegEmail").value.trim();
    const password = document.getElementById("teacherRegPassword").value.trim();
    const schoolId = document.getElementById("teacherRegSchool").value;
    const teachingLevel = document.getElementById("teacherRegLevel").value;
    const status = document.getElementById("teacherRegisterStatus");

    if (!name || !email || !password || !schoolId) {
      status.textContent = "Please complete all required fields.";
      return;
    }

    status.textContent = "Creating teacher account...";
    try {
      await api("/api/auth/teacher/register", "POST", { name, email, password, schoolId, teachingLevel });
      teacherState.prefillEmail = email;
      teacherState.pendingSchoolId = schoolId;
      teacherState.pendingTeachingLevel = teachingLevel;
      status.textContent = "Account created. Please sign in.";
      setTimeout(() => renderTeacherAccess(), 500);
    } catch (error) {
      status.textContent = error.message;
    }
  };
}

function renderStudentAccess() {
  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page">
        <div class="inner-header">
          <span class="inner-title">Student Sign In</span>
          <button class="btn-back" id="studentBackBtn">Back</button>
        </div>
        <div class="panel">
          <label class="field-label" for="studentEmail">Student Email</label>
          <input type="text" id="studentEmail" placeholder="student@example.com" value="${studentState.prefillEmail || ""}"/>
          <label class="field-label" for="studentPassword">Student Password</label>
          <input type="password" id="studentPassword" placeholder="Student password"/>
          <button class="btn-primary btn-gold" id="studentLoginBtn">Sign In</button>
          <button class="btn-back btn-inline" id="studentCreateBtn">Create Student Account</button>
          <p class="status-note" id="studentStatus"></p>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("studentBackBtn").onclick = renderHome;
  document.getElementById("studentCreateBtn").onclick = () => renderStudentRegister();
  document.getElementById("studentLoginBtn").onclick = async () => {
    const email = document.getElementById("studentEmail").value.trim();
    const password = document.getElementById("studentPassword").value.trim();
    const status = document.getElementById("studentStatus");

    if (!email || !password) {
      status.textContent = "Enter student email and password.";
      return;
    }

    status.textContent = "Signing in...";
    try {
      const result = await api("/api/auth/student/login", "POST", { email, password });
      studentState.accessToken = result.accessToken;
      studentState.student = result.student;
      studentState.prefillEmail = "";
      status.textContent = `Welcome, ${result.student.name}.`;
      renderStudentDashboard();
    } catch (error) {
      status.textContent = error.message;
    }
  };
}


async function renderStudentDashboard() {
  if (!studentState.accessToken || !studentState.student) {
    renderStudentAccess();
    return;
  }

  const student = studentState.student;
  let studentClasses = [];
  let studentAssignments = [];
  try {
    const classResult = await api("/api/student/classes", "GET", null, studentState.accessToken);
    studentClasses = classResult.classes || [];
    student.studentClasses = studentClasses;
  } catch (_error) {}
  try {
    const assignmentResult = await api("/api/student/assignments", "GET", null, studentState.accessToken);
    studentAssignments = assignmentResult.assignments || [];
  } catch (_error) {}
  let schoolName = "School not found";
  let teacherName = "Teacher not found";
  let className = student.classId ? "Class not found" : "Not assigned yet";

  try {
    const schools = await fetchSchools("");
    const school = schools.find((item) => item.schoolId === student.schoolId);
    if (school) schoolName = `${school.name} (${school.parish})`;
  } catch (_error) {
    schoolName = "Unable to load school";
  }

  try {
    const teacherResult = await api(`/api/schools/${encodeURIComponent(student.schoolId)}/teachers`);
    const teacher = (teacherResult.teachers || []).find((item) => item.teacherId === student.teacherId);
    if (teacher) teacherName = teacher.name;
  } catch (_error) {
    teacherName = "Unable to load teacher";
  }

  if (student.classId) {
    try {
      const classes = await fetchTeacherClassesPublic(student.teacherId);
      const linked = classes.find((item) => item.classId === student.classId);
      if (linked) className = linked.className;
    } catch (_error) {
      className = "Unable to load class";
    }
  }

  // Load history from localStorage
  const historyKey = `jampak_history_${student.studentId || student.email}`;
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(historyKey) || "[]");
  } catch (_e) { history = []; }
  const quizzesPlayed = history.length;
  const bestScore = history.length ? Math.max(...history.map((h) => h.score || 0)) : 0;
  const avgScore = history.length
    ? Math.round(history.reduce((s, h) => s + (h.score || 0), 0) / history.length)
    : 0;
  const recentHistory = history.slice(-5).reverse();
  const pendingAssignments = studentAssignments.filter((assignment) => !assignment.submission || assignment.submission.grade === null || assignment.submission.grade === undefined);
  const gradedAssignments = studentAssignments.filter((assignment) => assignment.submission && assignment.submission.grade !== null && assignment.submission.grade !== undefined);

  const encoded = encodeURIComponent(student.name || "student");
  const avatarSrc = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encoded}&backgroundColor=b6e3f4`;

  const historyRowsHTML = recentHistory.length
    ? recentHistory.map((h) => `
        <div class="sd-history-row">
              <span class="sd-history-subject">${h.subject || "Quiz"} - Grade ${h.grade || "?"}</span>
          <span class="sd-history-score">${h.score || 0}%</span>
          <span class="sd-history-date">${h.date ? new Date(h.date).toLocaleDateString() : ""}</span>
        </div>`).join("")
    : "";

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="tp-container">

        <div class="sd-hero">
          <div class="sd-hero-avatar" id="sdHeroAvatarWrap">
            <img class="sd-avatar-img" id="sdHeroAvatarImg" src="${avatarSrc}" alt="Avatar"/>
          </div>
          <div class="sd-hero-info">
            <div class="sd-hero-name">${student.name}</div>
            <div class="sd-hero-grade">Grade ${student.gradeLevel || "?"}</div>
            <div class="sd-hero-details">
              <span>School: ${schoolName}</span>
              <span>Teacher: ${teacherName}</span>
              <span>Class: ${className}</span>
            </div>
          </div>
          <div class="sd-hero-btns">
            <button class="btn-back" id="studentHomeBtn">Home</button>
            <button class="btn-back" id="studentSignOutBtn">Sign Out</button>
          </div>
        </div>

        <div class="tp-stats-row" style="grid-template-columns:repeat(3,1fr)">
          <div class="tp-stat">
            <div class="tp-stat-num">${quizzesPlayed}</div>
            <div class="tp-stat-label">Quizzes Played</div>
          </div>
          <div class="tp-stat">
            <div class="tp-stat-num">${bestScore}%</div>
            <div class="tp-stat-label">Best Score</div>
          </div>
          <div class="tp-stat">
            <div class="tp-stat-num">${gradedAssignments.length ? Math.round(gradedAssignments.reduce((sum, assignment) => sum + assignment.submission.grade, 0) / gradedAssignments.length) : avgScore}%</div>
            <div class="tp-stat-label">Assignment Average</div>
          </div>
        </div>

        <div class="sd-classroom-grid">
          <div class="panel sd-class-panel">
            <div class="dashboard-section-head"><p class="section-heading">MY CLASSES</p><button class="btn-back btn-inline" id="sdJoinClassBtn">+ Join Class</button></div>
            <div id="sdJoinClassPanel"></div>
            ${studentClasses.length ? studentClasses.map((item) => `<div class="sd-class-row"><div><strong>${item.className}</strong><small>${item.teacherName} · ${item.subject || "Classroom"}</small></div><span>${item.classCode}</span></div>`).join("") : `<p class="status-note">You are not connected to a class yet.</p>`}
          </div>
          <div class="panel sd-assignment-panel">
            <div class="dashboard-section-head"><p class="section-heading">ASSIGNMENTS</p><span class="sd-assignment-count">${pendingAssignments.length} open</span></div>
            ${studentAssignments.length ? studentAssignments.slice(0, 5).map((item) => `<div class="sd-assignment-row"><div><strong>${item.title}</strong><small>${item.className} · ${item.teacherName}${item.dueDate ? ` · Due ${item.dueDate}` : ""}</small></div><span class="${item.submission?.grade !== null && item.submission?.grade !== undefined ? "graded" : "needs-work"}">${item.submission?.grade !== null && item.submission?.grade !== undefined ? `${item.submission.grade}%` : "To do"}</span></div>`).join("") : `<p class="status-note">No assignments yet. Your teachers' work will appear here.</p>`}
          </div>
        </div>

        <div class="sd-quick-grid">
          <div class="sd-action-card" id="sdSoloBtn">
            <div class="sd-action-icon">Study</div>
            <div class="sd-action-title">Solo Study</div>
            <div class="sd-action-desc">Practice on your own, pick any subject</div>
          </div>
          <div class="sd-action-card sd-action-gold" id="sdJoinBtn">
            <div class="sd-action-icon">Play</div>
            <div class="sd-action-title">Join Live Game</div>
            <div class="sd-action-desc">Enter a room code from your teacher</div>
          </div>
        </div>

        <div class="panel">
          <p class="section-heading">Customize Avatar</p>
          <div class="avatar-grid">${avatarCardsMarkup(student.avatarId || "island-ace")}</div>
          <p class="status-note" id="studentAvatarStatus">Choose your avatar style for gameplay.</p>
        </div>

        ${recentHistory.length ? `
        <div class="panel">
          <p class="section-heading">Recent Sessions</p>
          <div class="sd-history">${historyRowsHTML}</div>
        </div>` : ""}

      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("studentHomeBtn").onclick = renderHome;
  document.getElementById("studentSignOutBtn").onclick = () => {
    studentState.accessToken = null;
    studentState.student = null;
    renderHome();
  };

  document.getElementById("sdSoloBtn").onclick = () => {
    if (studentState.student) {
      soloState.name = studentState.student.name || "Student";
      soloState.grade = studentState.student.gradeLevel || soloState.grade;
    }
    renderSolo(1);
  };

  document.getElementById("sdJoinBtn").onclick = renderJoin;

  document.getElementById("sdJoinClassBtn").onclick = () => {
    const panel = document.getElementById("sdJoinClassPanel");
    panel.innerHTML = `<div class="sd-join-class-form"><input id="sdClassCodeInput" placeholder="Enter class code, e.g. JPK-8-AB12"/><button class="btn-primary" id="sdClassCodeSubmit">Join</button><p class="status-note" id="sdClassJoinStatus"></p></div>`;
    document.getElementById("sdClassCodeSubmit").onclick = async () => {
      const status = document.getElementById("sdClassJoinStatus");
      status.textContent = "Joining class...";
      try {
        const result = await api("/api/student/classes/join", "POST", { classCode: document.getElementById("sdClassCodeInput").value }, studentState.accessToken);
        studentState.student = result.student;
        renderStudentDashboard();
      } catch (error) { status.textContent = error.message; }
    };
  };

  bindAvatarSelection((avatarId) => {
    if (!studentState.student) return;
    studentState.student.avatarId = avatarId;
    document.getElementById("studentAvatarStatus").textContent = "Avatar updated for your next game.";
    const newSrc = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(avatarId)}&backgroundColor=b6e3f4`;
    const heroImg = document.getElementById("sdHeroAvatarImg");
    if (heroImg) heroImg.src = newSrc;
  });
}


async function renderStudentRegister() {
  const selectedGrade = studentState.pendingGradeLevel || "7";
  studentState.pendingGradeLevel = selectedGrade;
  const selectedLevel = learningLevelFromGrade(selectedGrade);

  let schools = [];
  try {
    schools = await fetchSchools("", selectedLevel);
  } catch (_error) {
    schools = [];
  }
  const selectedSchool = schools.some((school) => school.schoolId === studentState.pendingSchoolId)
    ? studentState.pendingSchoolId
    : schools[0]?.schoolId || "";
  studentState.pendingSchoolId = selectedSchool;

  let teachers = [];
  try {
    teachers = await fetchTeachersBySchool(selectedSchool, selectedLevel);
  } catch (_error) {
    teachers = [];
  }
  const selectedTeacher = teachers.some((teacher) => teacher.teacherId === studentState.pendingTeacherId)
    ? studentState.pendingTeacherId
    : teachers[0]?.teacherId || "";
  studentState.pendingTeacherId = selectedTeacher;

  let classes = [];
  try {
    classes = await fetchTeacherClassesPublic(selectedTeacher);
  } catch (_error) {
    classes = [];
  }

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide">
        <div class="inner-header">
          <span class="inner-title">Create Student Account</span>
          <button class="btn-back" id="studentRegisterBackBtn">Back</button>
        </div>
        <div class="panel">
          <label class="field-label" for="studentRegName">Full Name</label>
          <input type="text" id="studentRegName" placeholder="Enter your full name"/>
          <label class="field-label" for="studentRegEmail">Email</label>
          <input type="text" id="studentRegEmail" placeholder="student@example.com"/>
          <label class="field-label" for="studentRegPassword">Password</label>
          <input type="password" id="studentRegPassword" placeholder="At least 8 characters"/>
          <label class="field-label" for="studentRegGrade">Grade Level</label>
          <select id="studentRegGrade">${builderSelectOptions(GRADE_LEVELS, selectedGrade)}</select>
          <label class="field-label" for="studentRegSchoolSearch">Search School</label>
          <input type="text" id="studentRegSchoolSearch" placeholder="Search Jamaican school"/>
          <label class="field-label" for="studentRegSchool">Select School</label>
          <select id="studentRegSchool">${schoolOptionsMarkup(schools, selectedSchool) || "<option value=''>No schools found</option>"}</select>
          <label class="field-label" for="studentRegTeacher">Select Teacher</label>
          <select id="studentRegTeacher">${teacherOptionsMarkup(teachers, selectedTeacher) || "<option value=''>No teachers found for school</option>"}</select>
          <label class="field-label" for="studentRegClass">Select Classroom (optional)</label>
          <select id="studentRegClass"><option value="">No class selected</option>${classOptionsMarkup(classes, "")}</select>
          <button class="btn-primary btn-gold" id="studentRegisterSubmitBtn">Create Student Account</button>
          <p class="status-note" id="studentRegisterStatus"></p>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("studentRegisterBackBtn").onclick = renderStudentAccess;

  async function refreshSchoolTeacherClassOptions(searchText) {
    const grade = document.getElementById("studentRegGrade").value;
    const level = learningLevelFromGrade(grade);
    studentState.pendingGradeLevel = grade;
    const select = document.getElementById("studentRegSchool");
    const teacherSelect = document.getElementById("studentRegTeacher");
    const classSelect = document.getElementById("studentRegClass");
    const query = String(searchText || "").trim();

    const schoolsForLevel = await fetchSchools(query, level);
    const selectedSchoolId = schoolsForLevel.some((school) => school.schoolId === studentState.pendingSchoolId)
      ? studentState.pendingSchoolId
      : schoolsForLevel[0]?.schoolId || "";
    studentState.pendingSchoolId = selectedSchoolId;
    select.innerHTML = schoolOptionsMarkup(schoolsForLevel, selectedSchoolId) || "<option value=''>No schools found</option>";

    const teachersForSchool = await fetchTeachersBySchool(selectedSchoolId, level);
    const selectedTeacherId = teachersForSchool.some((teacher) => teacher.teacherId === studentState.pendingTeacherId)
      ? studentState.pendingTeacherId
      : teachersForSchool[0]?.teacherId || "";
    studentState.pendingTeacherId = selectedTeacherId;
    teacherSelect.innerHTML = teacherOptionsMarkup(teachersForSchool, selectedTeacherId) || "<option value=''>No teachers found for school</option>";

    const classesForTeacher = await fetchTeacherClassesPublic(selectedTeacherId);
    classSelect.innerHTML = `<option value="">No class selected</option>${classOptionsMarkup(classesForTeacher, "")}`;
  }

  document.getElementById("studentRegSchoolSearch").oninput = async (event) => {
    try {
      await refreshSchoolTeacherClassOptions(event.target.value);
    } catch (_error) {
      document.getElementById("studentRegSchool").innerHTML = "<option value=''>No schools found</option>";
      document.getElementById("studentRegTeacher").innerHTML = "<option value=''>No teachers found for school</option>";
      document.getElementById("studentRegClass").innerHTML = "<option value=''>No class selected</option>";
    }
  };

  document.getElementById("studentRegGrade").onchange = async () => {
    const searchText = document.getElementById("studentRegSchoolSearch").value;
    try {
      await refreshSchoolTeacherClassOptions(searchText);
    } catch (_error) {
      document.getElementById("studentRegSchool").innerHTML = "<option value=''>No schools found</option>";
      document.getElementById("studentRegTeacher").innerHTML = "<option value=''>No teachers found for school</option>";
      document.getElementById("studentRegClass").innerHTML = "<option value=''>No class selected</option>";
    }
  };

  document.getElementById("studentRegSchool").onchange = async (event) => {
    const schoolId = event.target.value;
    studentState.pendingSchoolId = schoolId;
    const level = learningLevelFromGrade(document.getElementById("studentRegGrade").value);
    const teacherSelect = document.getElementById("studentRegTeacher");
    const classSelect = document.getElementById("studentRegClass");
    try {
      const teachersForSchool = await fetchTeachersBySchool(schoolId, level);
      teacherSelect.innerHTML = teacherOptionsMarkup(teachersForSchool, teachersForSchool[0]?.teacherId || "") || "<option value=''>No teachers found for school</option>";
      studentState.pendingTeacherId = teacherSelect.value;
      const classesForTeacher = await fetchTeacherClassesPublic(studentState.pendingTeacherId);
      classSelect.innerHTML = `<option value="">No class selected</option>${classOptionsMarkup(classesForTeacher, "")}`;
    } catch (_error) {
      teacherSelect.innerHTML = "<option value=''>No teachers found for school</option>";
      classSelect.innerHTML = "<option value=''>No class selected</option>";
    }
  };

  document.getElementById("studentRegTeacher").onchange = async (event) => {
    const teacherId = event.target.value;
    studentState.pendingTeacherId = teacherId;
    const classSelect = document.getElementById("studentRegClass");
    try {
      const classesForTeacher = await fetchTeacherClassesPublic(teacherId);
      classSelect.innerHTML = `<option value="">No class selected</option>${classOptionsMarkup(classesForTeacher, "")}`;
    } catch (_error) {
      classSelect.innerHTML = "<option value=''>No class selected</option>";
    }
  };

  document.getElementById("studentRegisterSubmitBtn").onclick = async () => {
    const name = document.getElementById("studentRegName").value.trim();
    const email = document.getElementById("studentRegEmail").value.trim();
    const password = document.getElementById("studentRegPassword").value.trim();
    const gradeLevel = document.getElementById("studentRegGrade").value;
    const schoolId = document.getElementById("studentRegSchool").value;
    const teacherId = document.getElementById("studentRegTeacher").value;
    const classId = document.getElementById("studentRegClass").value;
    const status = document.getElementById("studentRegisterStatus");

    if (!name || !email || !password || !schoolId || !teacherId) {
      status.textContent = "Please complete all required fields.";
      return;
    }

    status.textContent = "Creating student account...";
    try {
      await api("/api/auth/student/register", "POST", {
        name,
        email,
        password,
        gradeLevel,
        schoolId,
        teacherId,
        classId: classId || null
      });
      studentState.prefillEmail = email;
      status.textContent = "Student account created. Please sign in.";
      setTimeout(() => renderStudentAccess(), 500);
    } catch (error) {
      status.textContent = error.message;
    }
  };
}

async function renderTeacherPortal() {
  if (!teacherState.accessToken) {
    renderTeacherAccess();
    return;
  }

  let classes = [];
  let quizzes = [];
  let assignments = [];
  let pendingReviews = [];
  try {
    const classResult = await api("/api/teacher/classes", "GET", null, teacherState.accessToken);
    classes = classResult.classes || [];
    const quizResult = await api("/api/teacher/quizzes", "GET", null, teacherState.accessToken);
    quizzes = quizResult.quizzes || [];
    const assignmentResult = await api("/api/teacher/assignments", "GET", null, teacherState.accessToken);
    assignments = assignmentResult.assignments || [];
  } catch (_error) {
    classes = teacherState.classes || [];
    quizzes = teacherState.quizzes || [];
    assignments = [];
  }
  try {
    const reviewResult = await api("/api/teacher/reviews/pending", "GET", null, teacherState.accessToken);
    pendingReviews = reviewResult.reviews || [];
  } catch (_error) {
    pendingReviews = [];
  }
  teacherState.classes = classes;
  teacherState.quizzes = quizzes;

  const teacher = teacherState.teacher;
  const teacherName = teacher ? teacher.name : "Teacher";
  const schoolName = teacher ? (teacher.schoolName || teacher.school || "") : "";
  const classOptions = classes.map((cls) => `<option value="${cls.classId}">${cls.className}</option>`).join("");

  // Build total student count
  const totalStudents = classes.reduce((sum, cls) => sum + (cls.studentCount || 0), 0);

  // Class cards markup
  const classCardsHTML = classes.map((cls) => `
    <div class="tp-class-card">
      <div class="tp-class-icon">CLASS</div>
      <div class="tp-class-name">${cls.className}</div>
      <div class="tp-class-count">${cls.studentCount || 0} student${(cls.studentCount || 0) !== 1 ? "s" : ""}</div>
      <div class="tp-class-code">${cls.classCode || "Code pending"}</div>
      <div class="tp-class-actions">
        <button class="tp-class-btn tp-view-btn" data-classid="${cls.classId}">View</button>
        <button class="tp-class-btn tp-add-btn" data-classid="${cls.classId}" data-classname="${cls.className}">+ Students</button>
      </div>
    </div>`).join("");

  // Quiz cards markup
  const quizCardsHTML = quizzes.map((quiz) => `
    <div class="tp-quiz-card">
      <span class="tp-quiz-subject">${quiz.subject || "General"}</span>
      <div class="tp-quiz-title">${quiz.title}</div>
      <div class="tp-quiz-meta">
        <span>Grade ${quiz.gradeBand || "?"}</span>
        <span>${quiz.questionLimit || "?"} Qs</span>
        <span>${quiz.questionTimeSeconds || "?"}s</span>
      </div>
      <button class="btn-primary btn-gold tp-launch-btn" data-quizid="${quiz.quizId}">Start Session</button>
      <p class="tp-launch-status" id="tp-launch-status-${quiz.quizId}"></p>
    </div>`).join("");

  // Reviews markup
  const reviewsHTML = pendingReviews.map((rev) => `
    <div class="tp-review-item" id="tp-review-${rev.reviewId || rev.answerId}">
      <div class="tp-review-question">${rev.prompt || rev.question || "Question"}</div>
      <div class="tp-review-answer">Student answered: <strong>${rev.answer || rev.studentAnswer || ""}</strong></div>
      <div class="tp-review-btns">
        <button class="btn-primary tp-review-correct-btn" data-id="${rev.reviewId || rev.answerId}">Correct</button>
        <button class="btn-back tp-review-incorrect-btn" data-id="${rev.reviewId || rev.answerId}">Incorrect</button>
      </div>
    </div>`).join("");

  const reviewTabLabel = pendingReviews.length
    ? `<button class="tp-tab tp-tab-alert" data-tab="reviews">Reviews (${pendingReviews.length})</button>`
    : "";

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="tp-container">

        <div class="tp-header">
          <div class="tp-header-left">
            <div class="tp-icon-wrap">TEACHER</div>
            <div>
              <div class="tp-welcome-line">Teacher Portal</div>
              <div class="tp-name-line">${teacherName}</div>
              ${schoolName ? `<div class="tp-school-line">School: ${schoolName}</div>` : ""}
            </div>
          </div>
          <div class="tp-header-btns">
            <button class="btn-back" id="teacherPortalBackBtn">Home</button>
            <button class="btn-back" id="tpSignOutBtn">Sign Out</button>
          </div>
        </div>

        <div class="tp-stats-row">
          <div class="tp-stat">
            <div class="tp-stat-num">${classes.length}</div>
            <div class="tp-stat-label">Classes</div>
          </div>
          <div class="tp-stat">
            <div class="tp-stat-num">${totalStudents}</div>
            <div class="tp-stat-label">Students</div>
          </div>
          <div class="tp-stat">
            <div class="tp-stat-num">${quizzes.length}</div>
            <div class="tp-stat-label">Quizzes</div>
          </div>
          <div class="tp-stat${pendingReviews.length ? " tp-stat-alert" : ""}">
            <div class="tp-stat-num">${pendingReviews.length}</div>
            <div class="tp-stat-label">Pending Reviews</div>
          </div>
        </div>

        <div class="tp-tabs">
          <button class="tp-tab active" data-tab="classes">Classes</button>
          <button class="tp-tab" data-tab="assignments">Assignments (${assignments.length})</button>
          <button class="tp-tab" data-tab="quizzes">Quizzes</button>
          <button class="tp-tab" data-tab="create">Create Quiz</button>
          <button class="tp-tab" data-tab="questions">Questions</button>
          ${reviewTabLabel}
        </div>

        <div class="tp-section hidden" id="tp-tab-assignments">
          <div class="tp-assignments-layout">
            <div class="panel">
              <p class="section-heading">CREATE ASSIGNMENT</p>
              <p class="status-note">Set work for one of your classes and track it from the same dashboard.</p>
              <select id="tpAssignmentClass">${classOptions || "<option value=''>Create a class first</option>"}</select>
              <input type="text" id="tpAssignmentTitle" placeholder="Assignment title"/>
              <select id="tpAssignmentType"><option>Quiz</option><option>Debate</option><option>Study Pack</option><option>Discussion</option></select>
              <textarea id="tpAssignmentInstructions" rows="4" placeholder="Instructions for your students"></textarea>
              <label class="field-label" for="tpAssignmentDue">Due date</label>
              <input type="date" id="tpAssignmentDue"/>
              <label class="field-label" for="tpAssignmentPoints">Points</label>
              <input type="number" id="tpAssignmentPoints" min="1" max="1000" value="100"/>
              <button class="btn-primary btn-gold" id="tpCreateAssignmentBtn">CREATE ASSIGNMENT</button>
              <p class="status-note" id="tpAssignmentStatus"></p>
            </div>
            <div class="panel">
              <p class="section-heading">CLASS PROGRESS</p>
              ${classes.length ? classes.map((cls) => `<div class="tp-progress-row"><div><strong>${cls.className}</strong><small>${cls.studentCount || 0} students · ${assignments.filter((item) => item.classId === cls.classId).length} assignments</small></div><button class="btn-back btn-inline tp-progress-btn" data-classid="${cls.classId}">View Progress</button></div>`).join("") : `<p class="status-note">Create a class to begin tracking progress.</p>`}
              <div id="tpProgressPanel"></div>
            </div>
          </div>
          <div class="tp-assignment-grid">${assignments.length ? assignments.map((assignment) => `<div class="tp-assignment-card"><span>${assignment.activityType}</span><strong>${assignment.title}</strong><small>${classes.find((cls) => cls.classId === assignment.classId)?.className || "Class"} · ${assignment.submissions?.length || 0} submissions</small></div>`).join("") : `<p class="status-note">No assignments created yet.</p>`}</div>
        </div>

        <!-- CLASSES TAB -->
        <div class="tp-section" id="tp-tab-classes">
          <div id="tpInlinePanel"></div>
          <div class="tp-class-grid">
            ${classCardsHTML}
            <div class="tp-class-card tp-new-class" id="tpNewClassCard">
              <div class="tp-new-class-icon">+</div>
              <div class="tp-class-name">New Class</div>
            </div>
          </div>
        </div>

        <!-- QUIZZES TAB -->
        <div class="tp-section hidden" id="tp-tab-quizzes">
          ${quizzes.length ? `<div class="tp-quiz-grid">${quizCardsHTML}</div>` : `
          <div class="tp-empty">
            <div class="tp-empty-icon">QUIZ</div>
            <div class="tp-empty-msg">No quizzes yet. Create one to get started!</div>
            <button class="btn-primary btn-gold" id="tpGoCreateBtn">Create a Quiz</button>
          </div>`}
        </div>

        <!-- CREATE QUIZ TAB -->
        <div class="tp-section hidden" id="tp-tab-create">
          <div class="panel">
            <p class="section-heading">Create Quiz Settings</p>
            <p class="status-note">Choose timing and round rules for this teacher-created quiz.</p>
            <select id="tpQuizClass">${classOptions || "<option value=''>No classes yet</option>"}</select>
            <input type="text" id="tpQuizTitle" placeholder="Quiz title"/>
            <select id="tpQuizGrade">${builderSelectOptions(GRADE_LEVELS, "1")}</select>
            <select id="tpQuizSubject">${builderSelectOptions(BUILDER_SUBJECT_CHOICES, "Math")}</select>
            <label class="field-label" for="tpQuestionLimit">Questions per Round</label>
            <input type="number" id="tpQuestionLimit" min="5" max="60" value="15"/>
            <label class="field-label" for="tpQuestionTime">Seconds per Question</label>
            <input type="number" id="tpQuestionTime" min="5" max="180" value="20"/>
            <label class="toggle-row"><input type="checkbox" id="tpWaitAllToggle" checked/> Wait for all players (or timer) before next question</label>
            <label class="toggle-row"><input type="checkbox" id="tpRevealToggle" checked/> Reveal correct answer immediately</label>
            <label class="toggle-row"><input type="checkbox" id="tpManualToggle"/> Manual review for short answers</label>
            <button class="btn-primary btn-gold" id="tpCreateQuizBtn">Create Quiz</button>
            <p class="status-note" id="tpQuizStatus"></p>
          </div>
        </div>

        <!-- QUESTIONS TAB -->
        <div class="tp-section hidden" id="tp-tab-questions">
          <div class="panel">
            <p class="section-heading">Teacher Question Builder</p>
            <select id="tqGrade">${builderSelectOptions(GRADE_LEVELS, "1")}</select>
            <select id="tqSubject">${builderSelectOptions(BUILDER_SUBJECT_CHOICES, "Math")}</select>
            <input type="text" id="tqCategory" placeholder="Category (optional)"/>
            <select id="tqType">
              <option value="mcq">Multiple Choice</option>
              <option value="true_false">True / False</option>
              <option value="short_answer">Short Answer</option>
            </select>
            <input type="text" id="tqPrompt" placeholder="Question prompt"/>
            <div id="tqTypeFields"></div>
            <button class="btn-primary btn-gold" id="tpAddQuestionBtn">Add Question</button>
            <p class="status-note" id="tpQuestionStatus"></p>
          </div>
        </div>

        <!-- REVIEWS TAB -->
        ${pendingReviews.length ? `
        <div class="tp-section hidden" id="tp-tab-reviews">
          <div class="panel">
            <p class="section-heading">Pending Reviews</p>
            ${reviewsHTML}
            <p class="status-note" id="tpReviewStatus"></p>
          </div>
        </div>` : ""}

      </div>
    </div>
    ${footerHTML()}`;

  // â”€â”€ Tab switching â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.querySelectorAll(".tp-tab").forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll(".tp-tab").forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      const tabName = btn.dataset.tab;
      document.querySelectorAll(".tp-section").forEach((sec) => sec.classList.add("hidden"));
      const target = document.getElementById(`tp-tab-${tabName}`);
      if (target) target.classList.remove("hidden");
    };
  });

  // â”€â”€ Header buttons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.getElementById("teacherPortalBackBtn").onclick = renderHome;
  document.getElementById("tpSignOutBtn").onclick = () => {
    teacherState.accessToken = null;
    teacherState.teacher = null;
    renderHome();
  };

  // â”€â”€ Empty state â†’ Create Quiz tab â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const goCreateBtn = document.getElementById("tpGoCreateBtn");
  if (goCreateBtn) {
    goCreateBtn.onclick = () => {
      document.querySelectorAll(".tp-tab").forEach((t) => t.classList.remove("active"));
      document.querySelector('.tp-tab[data-tab="create"]').classList.add("active");
      document.querySelectorAll(".tp-section").forEach((sec) => sec.classList.add("hidden"));
      document.getElementById("tp-tab-create").classList.remove("hidden");
    };
  }

  // â”€â”€ New class card â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.getElementById("tpNewClassCard").onclick = () => {
    const panel = document.getElementById("tpInlinePanel");
    if (panel.querySelector("#tpClassName")) { panel.innerHTML = ""; return; }
    panel.innerHTML = `
      <div class="tp-inline-form">
        <p class="section-heading">New Class</p>
        <input type="text" id="tpClassName" placeholder="Class name (e.g., Grade 3A Math)"/>
        <select id="tpClassGrade">${builderSelectOptions(GRADE_LEVELS, "7")}</select>
        <select id="tpClassSubject">${builderSelectOptions(BUILDER_SUBJECT_CHOICES, "Math")}</select>
        <button class="btn-primary" id="tpCreateClassBtn">Create Class</button>
        <p class="status-note" id="tpClassStatus"></p>
      </div>`;
    document.getElementById("tpCreateClassBtn").onclick = async () => {
      const className = document.getElementById("tpClassName").value.trim();
      const status = document.getElementById("tpClassStatus");
      if (!className) { status.textContent = "Enter a class name."; return; }
      status.textContent = "Creating class...";
      try {
        await api("/api/teacher/classes/create", "POST", { className, gradeBand: document.getElementById("tpClassGrade").value, subject: document.getElementById("tpClassSubject").value }, teacherState.accessToken);
        status.textContent = "Class created.";
        renderTeacherPortal();
      } catch (error) {
        status.textContent = error.message;
      }
    };
  };

  document.getElementById("tpCreateAssignmentBtn").onclick = async () => {
    const status = document.getElementById("tpAssignmentStatus");
    const classId = document.getElementById("tpAssignmentClass").value;
    const title = document.getElementById("tpAssignmentTitle").value.trim();
    if (!classId || !title) { status.textContent = "Choose a class and enter an assignment title."; return; }
    status.textContent = "Creating assignment...";
    try {
      await api("/api/teacher/assignments/create", "POST", {
        classId,
        title,
        activityType: document.getElementById("tpAssignmentType").value,
        instructions: document.getElementById("tpAssignmentInstructions").value.trim(),
        dueDate: document.getElementById("tpAssignmentDue").value,
        points: document.getElementById("tpAssignmentPoints").value
      }, teacherState.accessToken);
      renderTeacherPortal();
    } catch (error) { status.textContent = error.message; }
  };

  document.querySelectorAll(".tp-progress-btn").forEach((button) => {
    button.onclick = async () => {
      const panel = document.getElementById("tpProgressPanel");
      panel.innerHTML = `<p class="status-note">Loading class progress...</p>`;
      try {
        const result = await api(`/api/teacher/classes/${button.dataset.classid}/progress`, "GET", null, teacherState.accessToken);
        panel.innerHTML = `<div class="tp-progress-summary"><strong>${result.classAverage === null ? "No grades yet" : `${result.classAverage}% class average`}</strong>${(result.students || []).map((student) => `<div class="tp-student-progress"><span>${student.name}</span><strong>${student.assignmentAverage === null ? "Not graded" : `${student.assignmentAverage}%`}</strong></div>`).join("")}</div>`;
      } catch (error) { panel.innerHTML = `<p class="status-note">${error.message}</p>`; }
    };
  });

  // â”€â”€ View / Add Students buttons on class cards â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.querySelectorAll(".tp-view-btn").forEach((btn) => {
    btn.onclick = async () => {
      const classId = btn.dataset.classid;
      const panel = document.getElementById("tpInlinePanel");
      panel.innerHTML = `<div class="tp-inline-form"><p class="status-note">Loading students...</p></div>`;
      try {
        const res = await api(`/api/teacher/classes/${classId}/students`, "GET", null, teacherState.accessToken);
        const students = res.students || [];
        const rows = students.length
          ? students.map((s) => `
              <div class="tp-student-row">
                <img class="tp-student-avatar" src="https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${encodeURIComponent(s.name)}&backgroundColor=b6e3f4" alt=""/>
                <span>${s.name}</span>
                <span style="margin-left:auto;font-size:0.8rem;color:rgba(255,255,255,0.4)">Grade ${s.gradeLevel || "?"}</span>
              </div>`).join("")
          : `<p class="status-note">No students in this class yet.</p>`;
        panel.innerHTML = `
          <div class="tp-inline-form">
            <p class="section-heading">Students (${students.length})</p>
            ${rows}
            <button class="btn-back" id="tpClosePanelBtn" style="margin-top:12px">Close</button>
          </div>`;
        document.getElementById("tpClosePanelBtn").onclick = () => { panel.innerHTML = ""; };
      } catch (error) {
        panel.innerHTML = `<div class="tp-inline-form"><p class="status-note">${error.message}</p></div>`;
      }
    };
  });

  document.querySelectorAll(".tp-add-btn").forEach((btn) => {
    btn.onclick = () => {
      const classId = btn.dataset.classid;
      const className = btn.dataset.classname;
      const panel = document.getElementById("tpInlinePanel");
      if (panel.querySelector(`#tpStudentsInput[data-classid="${classId}"]`)) { panel.innerHTML = ""; return; }
      panel.innerHTML = `
        <div class="tp-inline-form">
          <p class="section-heading">Add Students to ${className}</p>
          <input type="text" id="tpStudentsInput" data-classid="${classId}" placeholder="Student names, separated by commas"/>
          <button class="btn-primary" id="tpAddStudentsBtn">Add Students</button>
          <p class="status-note" id="tpStudentsStatus"></p>
        </div>`;
      document.getElementById("tpAddStudentsBtn").onclick = async () => {
        const raw = document.getElementById("tpStudentsInput").value.trim();
        const status = document.getElementById("tpStudentsStatus");
        if (!raw) { status.textContent = "Enter student names."; return; }
        const students = raw.split(",").map((name) => name.trim()).filter(Boolean).map((name, index) => ({
          name,
          avatarId: AVATAR_CHOICES[index % AVATAR_CHOICES.length]
        }));
        status.textContent = "Adding students...";
        try {
          await api(`/api/teacher/classes/${classId}/students/add`, "POST", { students }, teacherState.accessToken);
          status.textContent = `Added ${students.length} student${students.length !== 1 ? "s" : ""}.`;
          document.getElementById("tpStudentsInput").value = "";
        } catch (error) {
          status.textContent = error.message;
        }
      };
    };
  });

  // â”€â”€ Quiz launch buttons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.querySelectorAll(".tp-launch-btn").forEach((btn) => {
    btn.onclick = async () => {
      const quizId = btn.dataset.quizid;
      const statusEl = document.getElementById(`tp-launch-status-${quizId}`);
      statusEl.textContent = "Starting...";
      try {
        const result = await api(`/api/teacher/quizzes/${quizId}/start`, "POST", {}, teacherState.accessToken);
        statusEl.textContent = `Room Code: ${result.roomCode}`;
      } catch (error) {
        statusEl.textContent = error.message;
      }
    };
  });

  // â”€â”€ Create Quiz button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.getElementById("tpCreateQuizBtn").onclick = async () => {
    const classId = document.getElementById("tpQuizClass").value;
    const title = document.getElementById("tpQuizTitle").value.trim();
    const gradeBand = document.getElementById("tpQuizGrade").value;
    const subject = document.getElementById("tpQuizSubject").value;
    const questionLimit = Number(document.getElementById("tpQuestionLimit").value);
    const questionTimeSeconds = Number(document.getElementById("tpQuestionTime").value);
    const waitForAllPlayers = document.getElementById("tpWaitAllToggle").checked;
    const revealAnswersImmediately = document.getElementById("tpRevealToggle").checked;
    const requireManualReviewForShortAnswers = document.getElementById("tpManualToggle").checked;
    const status = document.getElementById("tpQuizStatus");
    if (!classId || !title) { status.textContent = "Choose class and enter quiz title."; return; }
    status.textContent = "Creating quiz...";
    try {
      await api("/api/teacher/quizzes/create", "POST", {
        classId,
        title,
        gradeBand,
        subject,
        questionLimit,
        questionTimeSeconds,
        waitForAllPlayers,
        revealAnswersImmediately,
        requireManualReviewForShortAnswers
      }, teacherState.accessToken);
      status.textContent = "Quiz created!";
      renderTeacherPortal();
    } catch (error) {
      status.textContent = error.message;
    }
  };

  // â”€â”€ Question builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const tqType = document.getElementById("tqType");
  const tqFields = document.getElementById("tqTypeFields");
  const renderTeacherTypeFields = () => {
    if (tqType.value === "mcq") {
      tqFields.innerHTML = `
        <input type="text" id="tqOptA" placeholder="Option A"/>
        <input type="text" id="tqOptB" placeholder="Option B"/>
        <input type="text" id="tqOptC" placeholder="Option C"/>
        <input type="text" id="tqOptD" placeholder="Option D"/>
        <select id="tqCorrectOpt">
          <option value="a">Correct: A</option>
          <option value="b">Correct: B</option>
          <option value="c">Correct: C</option>
          <option value="d">Correct: D</option>
        </select>`;
      return;
    }
    if (tqType.value === "true_false") {
      tqFields.innerHTML = `
        <select id="tqCorrectBool">
          <option value="true">Correct: True</option>
          <option value="false">Correct: False</option>
        </select>`;
      return;
    }
    tqFields.innerHTML = `
      <input type="text" id="tqAnswers" placeholder="Accepted answers (comma separated)"/>
      <input type="text" id="tqExplanation" placeholder="Explanation (optional)"/>`;
  };
  tqType.onchange = renderTeacherTypeFields;
  renderTeacherTypeFields();

  document.getElementById("tpAddQuestionBtn").onclick = async () => {
    const status = document.getElementById("tpQuestionStatus");
    const gradeBand = document.getElementById("tqGrade").value;
    const subject = document.getElementById("tqSubject").value;
    const category = document.getElementById("tqCategory").value.trim() || subject;
    const type = document.getElementById("tqType").value;
    const prompt = document.getElementById("tqPrompt").value.trim();
    if (!prompt) { status.textContent = "Enter a question prompt."; return; }
    const q = { gradeBand, subject, category, difficulty: "easy", type, prompt, options: [], explanation: "" };
    if (type === "mcq") {
      const a = document.getElementById("tqOptA").value.trim();
      const b = document.getElementById("tqOptB").value.trim();
      const c = document.getElementById("tqOptC").value.trim();
      const d = document.getElementById("tqOptD").value.trim();
      if (!a || !b || !c || !d) { status.textContent = "Fill all MCQ options."; return; }
      q.options = [{ id: "a", text: a }, { id: "b", text: b }, { id: "c", text: c }, { id: "d", text: d }];
      q.correctOptionId = document.getElementById("tqCorrectOpt").value;
      q.correctBoolean = null;
      q.acceptableAnswers = [];
    } else if (type === "true_false") {
      q.correctOptionId = null;
      q.correctBoolean = document.getElementById("tqCorrectBool").value === "true";
      q.acceptableAnswers = [];
    } else {
      const answers = document.getElementById("tqAnswers").value.split(",").map((x) => x.trim()).filter(Boolean);
      if (!answers.length) { status.textContent = "Add at least one accepted answer."; return; }
      q.correctOptionId = null;
      q.correctBoolean = null;
      q.acceptableAnswers = answers;
      q.explanation = document.getElementById("tqExplanation").value.trim();
    }
    status.textContent = "Saving question...";
    try {
      await api("/api/questions/import", "POST", { questions: [q] }, teacherState.accessToken);
      status.textContent = "Question added to bank.";
      document.getElementById("tqPrompt").value = "";
    } catch (error) {
      status.textContent = error.message;
    }
  };

  // â”€â”€ Review buttons â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  document.querySelectorAll(".tp-review-correct-btn, .tp-review-incorrect-btn").forEach((btn) => {
    btn.onclick = async () => {
      const reviewId = btn.dataset.id;
      const correct = btn.classList.contains("tp-review-correct-btn");
      const statusEl = document.getElementById("tpReviewStatus");
      try {
        await api(`/api/teacher/reviews/${reviewId}`, "POST", { correct }, teacherState.accessToken);
        const item = document.getElementById(`tp-review-${reviewId}`);
        if (item) item.remove();
        if (statusEl) statusEl.textContent = correct ? "Marked correct." : "Marked incorrect.";
      } catch (error) {
        if (statusEl) statusEl.textContent = error.message;
      }
    };
  });
}

async function createHostLobby() {
  if (!hostState.grade) {
    throw new Error("Please select a grade first.");
  }

  const availableSubjects = subjectsForGrade(hostState.grade);
  if (!hostState.subject || !isSubjectAllowedForGrade(hostState.grade, hostState.subject)) {
    hostState.subject = availableSubjects[0]?.value || "Math";
  }

  const statusEl = document.getElementById("hostCreateStatus") || document.getElementById("hostLobbyInfo");
  if (statusEl) statusEl.textContent = "Creating lobby...";

  const session = await api("/api/session/create", "POST", {
    mode: "host",
    hostName: hostState.name,
    avatarId: hostState.avatarId,
    gradeBand: hostState.grade,
    subject: hostState.subject
  });

  hostState.sessionId = session.sessionId;
  hostState.roomCode = session.roomCode;
  hostState.playerCount = session.playerCount;
  hostState.playerId = session.playerId;
  return session;
}

function renderQuestionBuilder() {
  if (!ownerState.accessToken) {
    renderOwnerAccess();
    return;
  }
  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide">
        <div class="inner-header">
          <span class="inner-title">Owner Question Builder</span>
          <div class="header-actions">
            <button class="btn-back" id="builderSignOutBtn">Sign Out</button>
            <button class="btn-back" id="builderBackBtn">Back</button>
          </div>
        </div>
        <div class="panel">
          <p class="section-heading">Create Teacher Account (Owner)</p>
          <input type="text" id="otName" placeholder="Teacher full name"/>
          <input type="text" id="otEmail" placeholder="Teacher email"/>
          <input type="text" id="otPassword" placeholder="Temporary password"/>
          <button class="btn-primary" id="otCreateTeacherBtn">Create Teacher</button>
          <p class="status-note" id="otStatus"></p>
        </div>
        <div class="panel">
          <label class="field-label" for="qbGrade">Grade Band</label>
          <select id="qbGrade">${builderSelectOptions(GRADE_LEVELS, "1")}</select>

          <label class="field-label" for="qbSubject">Subject</label>
          <select id="qbSubject">${builderSelectOptions(BUILDER_SUBJECT_CHOICES, "Math")}</select>

          <label class="field-label" for="qbCategory">Category</label>
          <input type="text" id="qbCategory" placeholder="e.g., Basic Math"/>

          <label class="field-label" for="qbType">Question Type</label>
          <select id="qbType">
            <option value="mcq">Multiple Choice</option>
            <option value="true_false">True / False</option>
            <option value="short_answer">Short Answer</option>
          </select>

          <label class="field-label" for="qbPrompt">Question Prompt</label>
          <input type="text" id="qbPrompt" placeholder="Type the question"/>

          <div id="qbTypeFields"></div>

          <button class="btn-primary btn-gold" id="qbSaveBtn">Add Question</button>
          <p class="status-note" id="qbStatus"></p>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  const typeFields = document.getElementById("qbTypeFields");
  const typeSelect = document.getElementById("qbType");
  const status = document.getElementById("qbStatus");

  const renderTypeFields = () => {
    const type = typeSelect.value;
    if (type === "mcq") {
      typeFields.innerHTML = `
        <label class="field-label" for="qbOptA">Option A</label>
        <input type="text" id="qbOptA" placeholder="Option A"/>
        <label class="field-label" for="qbOptB">Option B</label>
        <input type="text" id="qbOptB" placeholder="Option B"/>
        <label class="field-label" for="qbOptC">Option C</label>
        <input type="text" id="qbOptC" placeholder="Option C"/>
        <label class="field-label" for="qbOptD">Option D</label>
        <input type="text" id="qbOptD" placeholder="Option D"/>
        <label class="field-label" for="qbCorrectOption">Correct Option</label>
        <select id="qbCorrectOption">
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          <option value="d">D</option>
        </select>`;
      return;
    }

    if (type === "true_false") {
      typeFields.innerHTML = `
        <label class="field-label" for="qbCorrectBoolean">Correct Answer</label>
        <select id="qbCorrectBoolean">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>`;
      return;
    }

    typeFields.innerHTML = `
      <label class="field-label" for="qbAnswers">Accepted Answers (comma separated)</label>
      <input type="text" id="qbAnswers" placeholder="e.g., 10, ten"/>
      <label class="field-label" for="qbExplanation">Explanation (optional)</label>
      <input type="text" id="qbExplanation" placeholder="Optional explanation"/>`;
  };

  typeSelect.onchange = renderTypeFields;
  renderTypeFields();

  document.getElementById("builderBackBtn").onclick = renderHome;
  document.getElementById("builderSignOutBtn").onclick = () => {
    ownerState.accessToken = null;
    renderHome();
  };
  document.getElementById("otCreateTeacherBtn").onclick = async () => {
    const name = document.getElementById("otName").value.trim();
    const email = document.getElementById("otEmail").value.trim();
    const password = document.getElementById("otPassword").value.trim();
    const statusBox = document.getElementById("otStatus");
    if (!name || !email || !password) {
      statusBox.textContent = "Enter teacher name, email, and password.";
      return;
    }
    statusBox.textContent = "Creating teacher account...";
    try {
      await api("/api/owner/teachers/create", "POST", { name, email, password }, ownerState.accessToken);
      statusBox.textContent = "Teacher account created.";
      document.getElementById("otName").value = "";
      document.getElementById("otEmail").value = "";
      document.getElementById("otPassword").value = "";
    } catch (error) {
      statusBox.textContent = error.message;
    }
  };

  document.getElementById("qbSaveBtn").onclick = async () => {
    const gradeBand = document.getElementById("qbGrade").value;
    const subject = document.getElementById("qbSubject").value;
    const category = document.getElementById("qbCategory").value.trim() || subject;
    const prompt = document.getElementById("qbPrompt").value.trim();
    const type = typeSelect.value;

    if (!prompt) {
      status.textContent = "Please enter a question prompt.";
      return;
    }

    const payload = {
      gradeBand,
      subject,
      category,
      difficulty: "easy",
      type,
      prompt,
      options: [],
      explanation: ""
    };

    if (type === "mcq") {
      const a = document.getElementById("qbOptA").value.trim();
      const b = document.getElementById("qbOptB").value.trim();
      const c = document.getElementById("qbOptC").value.trim();
      const d = document.getElementById("qbOptD").value.trim();
      if (!a || !b || !c || !d) {
        status.textContent = "Please fill all four options.";
        return;
      }
      payload.options = [
        { id: "a", text: a },
        { id: "b", text: b },
        { id: "c", text: c },
        { id: "d", text: d }
      ];
      payload.correctOptionId = document.getElementById("qbCorrectOption").value;
      payload.acceptableAnswers = [];
      payload.correctBoolean = null;
    } else if (type === "true_false") {
      payload.correctBoolean = document.getElementById("qbCorrectBoolean").value === "true";
      payload.correctOptionId = null;
      payload.acceptableAnswers = [];
    } else {
      const answersRaw = document.getElementById("qbAnswers").value.trim();
      const answers = answersRaw.split(",").map((item) => item.trim()).filter(Boolean);
      if (!answers.length) {
        status.textContent = "Please add at least one accepted answer.";
        return;
      }
      payload.acceptableAnswers = answers;
      payload.explanation = document.getElementById("qbExplanation").value.trim();
      payload.correctOptionId = null;
      payload.correctBoolean = null;
    }

    status.textContent = "Saving question...";
    try {
      const result = await api("/api/questions/import", "POST", { questions: [payload] }, ownerState.accessToken);
      status.textContent = `Saved. Total bank now: ${result.total}`;
      document.getElementById("qbPrompt").value = "";
      if (type === "mcq") {
        document.getElementById("qbOptA").value = "";
        document.getElementById("qbOptB").value = "";
        document.getElementById("qbOptC").value = "";
        document.getElementById("qbOptD").value = "";
      } else if (type === "short_answer") {
        document.getElementById("qbAnswers").value = "";
        document.getElementById("qbExplanation").value = "";
      }
    } catch (error) {
      status.textContent = error.message;
    }
  };
}

function renderHost(step) {
  let content = "";

  if (step === 1) {
    if (!hostState.avatarId) hostState.avatarId = "island-ace";
    content = `
      <label class="field-label" for="hostName">Your Name</label>
      <input type="text" id="hostName" placeholder="Enter your name"
             value="${hostState.name || ""}" autocomplete="off"/>
      <p class="section-heading">Choose Avatar</p>
      <div class="avatar-grid">${avatarCardsMarkup(hostState.avatarId)}</div>
      <button class="btn-primary btn-gold" id="hostNext">Continue</button>`;
  } else if (step === 2) {
    content = `
      <p class="section-heading">Primary School</p>
      <div class="grade-grid grade-grid-3">
        ${PRIMARY_GRADES.map((grade) => gradeCardMarkup(hostState.grade, grade)).join("")}
      </div>
      <p class="section-heading">High School</p>
      <div class="grade-grid grade-grid-5">
        ${HIGH_SCHOOL_GRADES.map((grade) => gradeCardMarkup(hostState.grade, grade)).join("")}
      </div>
      <button class="btn-primary btn-gold" id="hostNext">Continue</button>`;
  } else if (step === 3) {
    content = `
      <p class="section-heading">Choose Category</p>
      <div class="subject-grid">
        ${subjectCardsMarkup(hostState.subject, hostState.grade)}
      </div>
      <button class="btn-primary btn-gold" id="hostCreateLobby">Generate Room Code</button>
      <p class="status-note" id="hostCreateStatus"></p>`;
  } else if (step === 4) {
    content = `
      <p class="status-note center">Share this room code with players</p>
      <div class="room-code-display">${hostState.roomCode || "------"}</div>
      <div class="player-count">Players in lobby: <strong id="hostPlayerCount">${hostState.playerCount || 0}</strong></div>
      <p class="status-note center" id="hostLobbyInfo"></p>
      <div class="lobby-actions">
        <button class="btn-back btn-inline" id="refreshLobbyBtn">Refresh Player Count</button>
        <button class="btn-back btn-inline" id="shareLobbyBtn">Share Game Link</button>
        <button class="btn-primary btn-gold" id="regenerateLobbyBtn">Generate New Code</button>
        <button class="btn-primary btn-gold" id="hostStart">Start Game</button>
      </div>`;
  }

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide">
        <div class="inner-header">
          <span class="inner-title">Host Game</span>
          <button class="btn-back" id="backBtn">Back</button>
        </div>
        <div class="step-indicator">${stepDots(4, step)}</div>
        <div class="panel">${content}</div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("backBtn").onclick =
    step === 1 ? renderHome : () => renderHost(step - 1);

  if (step === 1) {
    bindAvatarSelection((avatarId) => { hostState.avatarId = avatarId; });
    document.getElementById("hostNext").onclick = () => {
      const name = document.getElementById("hostName").value.trim();
      if (!name) {
        alert("Please enter your name to continue.");
        return;
      }
      hostState.name = name;
      renderHost(2);
    };
  } else if (step === 2) {
    bindGradeSelection((grade) => { hostState.grade = grade; });
    document.getElementById("hostNext").onclick = () => {
      if (!hostState.grade) {
        alert("Please select a grade.");
        return;
      }
      ensureValidSubjectForGrade(hostState);
      renderHost(3);
    };
  } else if (step === 3) {
    ensureValidSubjectForGrade(hostState);
    bindSubjectSelection((subject) => { hostState.subject = subject; });
    document.getElementById("hostCreateLobby").onclick = async () => {
      try {
        await createHostLobby();
        renderHost(4);
      } catch (error) {
        const status = document.getElementById("hostCreateStatus");
        if (status) status.textContent = error.message;
        else alert(error.message);
      }
    };
  } else if (step === 4) {
    const lobbyInfo = document.getElementById("hostLobbyInfo");
    lobbyInfo.textContent = "Waiting for players to join.";

    document.getElementById("refreshLobbyBtn").onclick = async () => {
      if (!hostState.sessionId) return;
      try {
        const session = await api(`/api/session/${hostState.sessionId}`);
        hostState.playerCount = session.playerCount;
        document.getElementById("hostPlayerCount").textContent = String(session.playerCount);
        lobbyInfo.textContent = "Lobby updated.";
      } catch (error) {
        lobbyInfo.textContent = error.message;
      }
    };

    document.getElementById("regenerateLobbyBtn").onclick = async () => {
      try {
        await createHostLobby();
        renderHost(4);
      } catch (error) {
        lobbyInfo.textContent = error.message;
      }
    };

    document.getElementById("shareLobbyBtn").onclick = async () => {
      if (!hostState.roomCode) {
        lobbyInfo.textContent = "Generate a room code first.";
        return;
      }
      const joinUrl = new URL(window.location.href);
      joinUrl.search = `?room=${encodeURIComponent(hostState.roomCode)}`;
      joinUrl.hash = "join";
      const shareText = `Join my Jam-Pak EDU game! Room code: ${hostState.roomCode}`;
      try {
        if (navigator.share) {
          await navigator.share({ title: "Join my Jam-Pak EDU game", text: shareText, url: joinUrl.href });
          lobbyInfo.textContent = "Game link shared.";
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(joinUrl.href);
          lobbyInfo.textContent = "Game link copied. Send it to your players.";
        } else {
          lobbyInfo.textContent = `Share this link: ${joinUrl.href}`;
        }
      } catch (_error) {
        lobbyInfo.textContent = "Could not share right now. Please copy the game link manually.";
      }
    };


    document.getElementById("hostStart").onclick = () => {
      if (!hostState.sessionId) {
        alert("Create the host lobby first.");
        return;
      }
      api(`/api/session/${hostState.sessionId}/start`, "POST", { playerId: hostState.playerId })
        .then(() => startQuiz({
          sessionId: hostState.sessionId,
          modeLabel: "Hosted Game",
          topic: `Room ${hostState.roomCode}`,
          playerId: hostState.playerId,
          playerName: hostState.name,
          avatarId: hostState.avatarId,
          isMultiplayer: true
        }))
        .catch((error) => { lobbyInfo.textContent = error.message; });
    };
  }
}

function renderJoin() {
  if (!joinState.avatarId) joinState.avatarId = "sunset-star";
  const roomFromLink = new URLSearchParams(window.location.search).get("room");
  const initialRoomCode = /^JAM\d{5}$/i.test(roomFromLink || "") ? roomFromLink.toUpperCase() : "";
  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide">
        <div class="inner-header">
          <span class="inner-title">Join Game</span>
          <button class="btn-back" id="backBtn">Back</button>
        </div>
        <div class="panel">
          <label class="field-label" for="joinName">Your Name</label>
          <input type="text" id="joinName" placeholder="Enter your name" autocomplete="off"/>
          <p class="section-heading">Choose Avatar</p>
          <div class="avatar-grid">${avatarCardsMarkup(joinState.avatarId)}</div>

          <label class="field-label" for="joinCode">Room Code</label>
          <input type="text" id="joinCode" class="code-input"
               placeholder="JAM01234" maxlength="8" autocomplete="off" value="${initialRoomCode}"/>

          <button class="btn-primary btn-gold" id="joinBtn">Join Game</button>
          <p class="status-note center" id="joinStatus"></p>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("backBtn").onclick = renderHome;
  bindAvatarSelection((avatarId) => { joinState.avatarId = avatarId; });

  document.getElementById("joinCode").addEventListener("input", (event) => {
    event.target.value = event.target.value.toUpperCase();
  });

  document.getElementById("joinBtn").onclick = async () => {
    const name = document.getElementById("joinName").value.trim();
    const roomCode = document.getElementById("joinCode").value.trim().toUpperCase();
    const status = document.getElementById("joinStatus");

    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (!/^JAM\d{5}$/.test(roomCode)) {
      alert("Please enter a valid room code (JAM + 5 digits).");
      return;
    }

    status.textContent = "Joining room...";

    try {
      const session = await api("/api/session/join", "POST", {
        roomCode,
        playerName: name,
        avatarId: joinState.avatarId
      });
      startQuiz({
        sessionId: session.sessionId,
        modeLabel: "Joined Game",
        topic: `Room ${session.roomCode}`,
        playerId: session.playerId,
        playerName: name,
        avatarId: joinState.avatarId,
        isMultiplayer: true
      });
    } catch (error) {
      status.textContent = error.message;
    }
  };
}

function renderSolo(step) {
  let content = "";

  if (step === 1) {
    content = `
      <label class="field-label" for="soloName">Your Name</label>
      <input type="text" id="soloName" placeholder="Enter your name"
             value="${soloState.name || ""}" autocomplete="off"/>
      <button class="btn-primary" id="soloNext">Continue</button>`;
  } else if (step === 2) {
    content = `
      <p class="section-heading">Primary School</p>
      <div class="grade-grid grade-grid-3">
        ${PRIMARY_GRADES.map((grade) => gradeCardMarkup(soloState.grade, grade)).join("")}
      </div>
      <p class="section-heading">High School</p>
      <div class="grade-grid grade-grid-5">
        ${HIGH_SCHOOL_GRADES.map((grade) => gradeCardMarkup(soloState.grade, grade)).join("")}
      </div>
      <button class="btn-primary" id="soloNext">Continue</button>`;
  } else if (step === 3) {
    content = `
      <p class="section-heading">Choose Category</p>
      <div class="subject-grid">
        ${subjectCardsMarkup(soloState.subject, soloState.grade)}
      </div>
      <button class="btn-primary" id="soloStart">Start Studying</button>
      <p class="status-note center" id="soloStatus"></p>`;
  }

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide">
        <div class="inner-header">
          <span class="inner-title">Solo Study</span>
          <button class="btn-back" id="backBtn">Back</button>
        </div>
        <div class="step-indicator">${stepDots(3, step)}</div>
        <div class="panel">${content}</div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("backBtn").onclick =
    step === 1 ? renderHome : () => renderSolo(step - 1);

  if (step === 1) {
    document.getElementById("soloNext").onclick = () => {
      const name = document.getElementById("soloName").value.trim();
      if (!name) {
        alert("Please enter your name to continue.");
        return;
      }
      soloState.name = name;
      renderSolo(2);
    };
  } else if (step === 2) {
    bindGradeSelection((grade) => { soloState.grade = grade; });
    document.getElementById("soloNext").onclick = () => {
      if (!soloState.grade) {
        alert("Please select a grade.");
        return;
      }
      ensureValidSubjectForGrade(soloState);
      renderSolo(3);
    };
  } else if (step === 3) {
    ensureValidSubjectForGrade(soloState);
    bindSubjectSelection((subject) => { soloState.subject = subject; });
    document.getElementById("soloStart").onclick = async () => {
      const status = document.getElementById("soloStatus");
      if (!soloState.subject || !isSubjectAllowedForGrade(soloState.grade, soloState.subject)) {
        alert("Please select a category.");
        return;
      }
      status.textContent = "Loading your study session...";

      try {
        const session = await api("/api/session/create", "POST", {
          mode: "solo",
          hostName: soloState.name,
          gradeBand: soloState.grade,
          subject: soloState.subject
        });
        startQuiz({
          sessionId: session.sessionId,
          modeLabel: "Solo Study",
          topic: `${soloState.grade} | ${soloState.subject}`
        });
      } catch (error) {
        status.textContent = error.message;
      }
    };
  }
}

function renderDebate() {
  const debateCategories = {
    "Jamaican Politics & Government": [
      "Should Jamaica become a republic?",
      "Is the Jamaican government doing enough for ordinary citizens?",
      "Should politicians be required to have a university degree?",
      "Should voting be mandatory?",
      "Should politicians be allowed to serve unlimited terms?",
      "Is Jamaica's two-party political system a problem?",
      "Should Jamaica lower the voting age to 16?",
      "Should government officials receive the same healthcare as ordinary citizens?",
      "Should Jamaica spend less money on tourism and more on local communities?",
      "Is corruption the biggest problem facing Jamaica?"
    ],
    "Education": [
      "Should students be allowed to use AI for schoolwork?",
      "Are CXC exams an unfair way to measure intelligence?",
      "Should students be able to choose whether they wear uniforms?",
      "Should schools punish students for things they post on social media?",
      "Should corporal punishment be completely banned?",
      "Should students be allowed to openly criticize teachers?",
      "Are Jamaican schools preparing students for real life?",
      "Should schools teach financial literacy instead of some traditional subjects?",
      "Should failing students be allowed to move to the next grade?",
      "Should academic grades matter less when applying for jobs?"
    ],
    "Music & Jamaican Culture": [
      "Is modern dancehall damaging Jamaica's image?",
      "Has dancehall become too explicit?",
      "Should Jamaican radio stations have stricter rules about lyrics?",
      "Is reggae still Jamaica's most important musical genre?",
      "Are Jamaican artists doing enough to represent Jamaica positively?",
      "Should Jamaican musicians be required to give back to their communities?",
      "Is Jamaican culture being diluted by American culture?",
      "Should Patois be considered an official language?",
      "Is Jamaica's obsession with foreign trends hurting local culture?"
    ],
    "Youth & Society": [
      "Should parents be allowed to check their teenagers' phones?",
      "Should teenagers have strict curfews?",
      "Is social media making Jamaican youth less respectful?",
      "Should parents be held responsible for their children's behaviour?",
      "Should teenagers be allowed to work full-time during school?",
      "Are Jamaican parents too strict?",
      "Are Jamaican parents too lenient compared with previous generations?",
      "Should young people be allowed to move out at 16?",
      "Is Jamaica becoming too dangerous for young people?"
    ],
    "Money, Jobs & Migration": [
      "Should Jamaicans who migrate abroad be expected to financially support family back home?",
      "Is brain drain Jamaica's fault?",
      "Should Jamaica make it easier for young people to start businesses?",
      "Is tourism creating enough opportunities for Jamaicans?",
      "Should foreigners be allowed to own Jamaican land?",
      "Should Jamaicans living abroad have the same voting rights as residents?",
      "Is leaving Jamaica for better opportunities abandoning your country?",
      "Should minimum wage be significantly higher?",
      "Should employers be required to pay young workers the same as older workers for the same job?"
    ],
    "Crime & Justice": [
      "Should Jamaica bring back harsher punishments for serious crimes?",
      "Should life imprisonment replace the death penalty?",
      "Should the death penalty be abolished completely?",
      "Should juveniles who commit serious crimes receive adult sentences?",
      "Should police have more power to search people?",
      "Should convicted criminals be allowed to vote?",
      "Is Jamaica's justice system too soft on criminals?",
      "Should people convicted of corruption permanently lose the right to hold public office?"
    ],
    "Jamaica's Future": [
      "Should Jamaica become fully independent from foreign economic influence?",
      "Should Jamaica stop relying so heavily on tourism?",
      "Should Jamaica invest more in technology than traditional industries?",
      "Should Jamaica encourage more foreign investment even if foreigners own local businesses?",
      "Is Jamaica actually getting better, or are Jamaicans just getting used to the problems?",
      "Should Jamaica prioritize fixing infrastructure before investing in major new projects?",
      "Should Jamaica focus on keeping its young people rather than depending on remittances?"
    ],
    "Technology & Media": [
      "Is artificial intelligence a shortcut or the future of learning?",
      "Should social media companies be responsible for teenage mental health?",
      "Should influencers be held responsible for the products they promote?",
      "Is privacy more important than safety online?",
      "Should schools ban smartphones completely?",
      "Does social media bring people together or make loneliness worse?"
    ]
  };
  const categoryNames = Object.keys(debateCategories);
  if (!debateState.category || !debateCategories[debateState.category]) {
    debateState.category = categoryNames[0];
  }
  const topics = debateCategories[debateState.category];
  if (!debateState.mode) debateState.mode = "choice";

  const selectedTopicLabel = debateState.topic || "";
  const customTopicValue = debateState.customTopic || "";
  const roomCode = debateState.roomCode || "";
  const joinCodeValue = debateState.joinCode || "";

  let content = "";

  if (debateState.mode === "create") {
    content = `
      <p class="section-heading debate-create-title">CREATE A DEBATE ROOM</p>
      <div class="debate-category-list" role="tablist" aria-label="Debate categories">
        ${categoryNames.map((category) =>
          `<button class="debate-category-btn${debateState.category === category ? " selected" : ""}" type="button" data-category="${category}" role="tab" aria-selected="${debateState.category === category}">${category}</button>`
        ).join("")}
      </div>
      <p class="section-heading debate-category-heading">${debateState.category} QUESTIONS</p>
      <div class="debate-topics">
        ${topics.map((topic, index) =>
          `<button class="debate-topic-btn${selectedTopicLabel === topic ? " selected" : ""}" type="button" data-index="${index}" aria-pressed="${selectedTopicLabel === topic}">
            <span class="debate-topic-copy">${topic}</span>
            <span class="debate-topic-action">${selectedTopicLabel === topic ? "&#10003; SELECTED" : "DEBATE &rarr;"}</span>
          </button>`
        ).join("")}
      </div>
      <div class="debate-custom-panel">
        <span class="debate-custom-eyebrow">STUDENT-CREATED</span>
        <p class="section-heading">CREATE YOUR OWN QUESTION</p>
        <p class="status-note">Have a question your class should debate?</p>
        <textarea id="customTopic" rows="3" placeholder="Type your debate question here...">${customTopicValue}</textarea>
        <label class="field-label" for="customCategory">Category</label>
        <select id="customCategory">${categoryNames.map((category) => `<option value="${category}"${debateState.category === category ? " selected" : ""}>${category}</option>`).join("")}</select>
        <button class="btn-back btn-inline" id="addCustomQuestionBtn" type="button">+ Add Question</button>
      </div>
      <button class="btn-primary btn-gold debate-create-btn" id="debateCreateRoomBtn" type="button">CREATE DEBATE ROOM</button>
      <p class="status-note center" id="debateStatus"></p>`;
  } else if (debateState.mode === "join") {
    content = `
      <p class="section-heading">Join a Debate Room</p>
      <p class="status-note center">Enter the room code shared by the host to join the discussion.</p>
      <input type="text" id="debateJoinCode" placeholder="Enter room code" value="${joinCodeValue}"/>
      <button class="btn-primary btn-gold" id="debateJoinRoomBtn">Join Room</button>
      <p class="status-note center" id="debateStatus"></p>`;
  } else if (debateState.mode === "room") {
    content = `
      <p class="section-heading">Debate Room Ready</p>
      <p class="status-note center">Share this code with players so they can join the discussion.</p>
      <div class="room-code-display">${roomCode}</div>
      <div class="player-count">Topic: <strong>${selectedTopicLabel || "Custom debate prompt"}</strong></div>
      <p class="status-note center">This is a live debate room setup. You can now invite learners to join and discuss the topic together.</p>
      <button class="btn-primary btn-gold" id="debateCreateAnotherBtn">Create Another Room</button>
      <button class="btn-primary" id="debateBackBtn">Back to Options</button>`;
  } else {
    content = `
      <p class="section-heading">Would you like to debate with others?</p>
      <p class="status-note center">Choose a room mode and start a live discussion with classmates or learners.</p>
      <div class="debate-topics">
        <button class="btn-primary btn-gold" id="debateCreateChoiceBtn">Create Debate Room</button>
        <button class="btn-primary" id="debateJoinChoiceBtn">Join Debate Room</button>
      </div>
      <p class="status-note center" id="debateStatus"></p>`;
  }

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide">
        <div class="inner-header">
          <span class="inner-title">Debate</span>
          <button class="btn-back" id="backBtn">Back</button>
        </div>
        <div class="panel">${content}</div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("backBtn").onclick = renderHome;

  if (debateState.mode === "create") {
    document.querySelectorAll(".debate-category-btn").forEach((button) => {
      button.onclick = () => {
        debateState.category = button.dataset.category;
        debateState.topic = "";
        debateState.customTopic = "";
        renderDebate();
      };
    });

    document.querySelectorAll(".debate-topic-btn").forEach((button) => {
      button.onclick = () => {
        document.querySelectorAll(".debate-topic-btn").forEach((b) => b.classList.remove("selected"));
        document.querySelectorAll(".debate-topic-btn").forEach((b) => {
          b.setAttribute("aria-pressed", "false");
          const action = b.querySelector(".debate-topic-action");
          if (action) action.innerHTML = "DEBATE &rarr;";
        });
        button.classList.add("selected");
        button.setAttribute("aria-pressed", "true");
        const action = button.querySelector(".debate-topic-action");
        if (action) action.innerHTML = "&#10003; SELECTED";
        debateState.topic = topics[Number(button.dataset.index)];
        debateState.customTopic = "";
        document.getElementById("debateStatus").textContent = "Topic selected.";
      };
    });

    const customCategory = document.getElementById("customCategory");
    const customInput = document.getElementById("customTopic");
    document.getElementById("addCustomQuestionBtn").onclick = () => {
      const customTopic = customInput.value.trim();
      const status = document.getElementById("debateStatus");
      if (!customTopic) {
        status.textContent = "Write your debate question first.";
        customInput.focus();
        return;
      }
      debateState.category = customCategory.value;
      debateState.topic = customTopic;
      debateState.customTopic = customTopic;
      status.textContent = "Student-created question selected.";
    };

    document.getElementById("debateCreateRoomBtn").onclick = () => {
      const customTopic = document.getElementById("customTopic").value.trim();
      const status = document.getElementById("debateStatus");
      const topic = customTopic || debateState.topic;
      if (!topic) {
        status.textContent = "Select or enter a debate topic first.";
        return;
      }
      debateState.topic = topic;
      debateState.customTopic = customTopic;
      debateState.roomCode = `DEB${String(Math.floor(1000 + Math.random() * 9000))}`;
      debateState.mode = "room";
      renderDebate();
    };
  } else if (debateState.mode === "join") {
    document.getElementById("debateJoinRoomBtn").onclick = () => {
      const roomCode = document.getElementById("debateJoinCode").value.trim().toUpperCase();
      const status = document.getElementById("debateStatus");
      if (!roomCode) {
        status.textContent = "Enter a room code to join.";
        return;
      }
      debateState.joinCode = roomCode;
      debateState.roomCode = roomCode;
      debateState.mode = "room";
      renderDebate();
    };
  } else if (debateState.mode === "room") {
    const createAnotherBtn = document.getElementById("debateCreateAnotherBtn");
    if (createAnotherBtn) {
      createAnotherBtn.onclick = () => {
        debateState.mode = "create";
        debateState.roomCode = "";
        debateState.joinCode = "";
        renderDebate();
      };
    }
    const backBtn = document.getElementById("debateBackBtn");
    if (backBtn) {
      backBtn.onclick = () => {
        debateState.mode = "choice";
        debateState.roomCode = "";
        debateState.joinCode = "";
        renderDebate();
      };
    }
  } else {
    const createChoiceBtn = document.getElementById("debateCreateChoiceBtn");
    if (createChoiceBtn) {
      createChoiceBtn.onclick = () => {
        debateState.mode = "create";
        renderDebate();
      };
    }
    const joinChoiceBtn = document.getElementById("debateJoinChoiceBtn");
    if (joinChoiceBtn) {
      joinChoiceBtn.onclick = () => {
        debateState.mode = "join";
        renderDebate();
      };
    }
  }
}

function clearRevealTimer() {
  if (gameState.revealTimer) {
    clearTimeout(gameState.revealTimer);
    gameState.revealTimer = null;
  }
}

function clearWaitPoll() {
  if (gameState.waitPollTimer) {
    clearTimeout(gameState.waitPollTimer);
    gameState.waitPollTimer = null;
  }
}

function getCorrectAnswerText(question, result) {
  if (!question) return "";
  if (question.type === "mcq") {
    const answer = question.options.find((option) => option.id === result.correctOptionId);
    if (!answer) return "";
    return `${answer.id.toUpperCase()}) ${answer.text}`;
  }
  if (question.type === "true_false") {
    return result.correctBoolean ? "True" : "False";
  }
  if (question.type === "short_answer") {
    const first = Array.isArray(result.acceptableAnswers) ? result.acceptableAnswers[0] : "";
    return first || "";
  }
  return "";
}

function renderLeaderboardMarkup(leaderboard) {
  if (!Array.isArray(leaderboard) || !leaderboard.length) return "";
  return `
    <div class="leaderboard">
      <p class="section-heading">Final Leaderboard</p>
      ${leaderboard.map((player, index) => `
        <div class="leader-row${index === 0 ? " top" : ""}">
          <div class="leader-left">
            <span class="leader-rank">#${index + 1}</span>
            ${avatarImageTag(player.avatarId || "island-ace", player.name || "Player", "avatar-thumb")}
            <span class="leader-name">${player.name}</span>
          </div>
          <strong class="leader-score">${player.score}</strong>
        </div>
      `).join("")}
    </div>`;
}

function renderQuizShell() {
  const scoreLabel = gameState.isMultiplayer ? "Your Score" : "Score";
  const playerBadge = gameState.isMultiplayer
    ? `<span class="quiz-meta-item player-badge">${avatarImageTag(gameState.avatarId || "island-ace", gameState.playerName || "Player", "avatar-mini")} ${gameState.playerName || "Player"}</span>`
    : "";

  app.innerHTML = `
    <div class="page">
      ${headerMini()}
      <div class="inner-page inner-page-wide quiz-page">
        <div class="inner-header">
          <span class="inner-title">${gameState.modeLabel}</span>
          <button class="btn-back" id="quitBtn">Quit</button>
        </div>

        <div class="quiz-meta">
          <span class="quiz-meta-item">${scoreLabel}: <strong id="scoreValue">0</strong></span>
          <span class="quiz-meta-item">Answered: <strong id="answeredValue">0</strong></span>
          <span class="quiz-meta-item">Time Left: <strong id="timerValue">15s</strong></span>
          ${playerBadge}
          <span class="quiz-meta-item" id="topicBadge">${gameState.topic || "Live Questions"}</span>
        </div>

        <div class="panel quiz-panel">
          <p class="status-note" id="quizStatus">Loading question...</p>
          <div class="qa-card" id="qaCard">
            <div class="qa-card-inner">
              <div class="qa-face qa-front">
                <p class="qa-face-label">Question Card</p>
                <h2 class="quiz-prompt" id="quizPrompt"></h2>
              </div>
              <div class="qa-face qa-back">
                <p class="qa-face-label">Answer Reveal</p>
                <p class="qa-result" id="qaResult"></p>
                <p class="qa-correct" id="qaCorrect"></p>
                <p class="qa-explanation" id="qaExplanation"></p>
              </div>
            </div>
          </div>
          <div class="quiz-options" id="quizOptions"></div>
          <div class="quiz-tf hidden" id="quizTF">
            <button class="quiz-option" data-bool="true">True</button>
            <button class="quiz-option" data-bool="false">False</button>
          </div>
          <div class="quiz-short hidden" id="quizShortWrap">
            <input type="text" id="quizShortInput" placeholder="Enter your answer"/>
            <button class="btn-primary" id="quizShortSubmit">Submit Answer</button>
          </div>
        </div>
      </div>
    </div>
    ${footerHTML()}`;

  document.getElementById("quitBtn").onclick = () => {
    clearRevealTimer();
    clearWaitPoll();
    clearCountdownTimer();
    renderHome();
  };
}

function updateScoreBoard() {
  document.getElementById("scoreValue").textContent = String(gameState.score);
  document.getElementById("answeredValue").textContent = String(gameState.answered);
}

async function startQuiz({ sessionId, modeLabel, topic, playerId, playerName, avatarId, isMultiplayer }) {
  clearRevealTimer();
  clearWaitPoll();
  clearCountdownTimer();
  gameState.sessionId = sessionId;
  gameState.currentQuestion = null;
  gameState.score = 0;
  gameState.answered = 0;
  gameState.modeLabel = modeLabel;
  gameState.topic = topic || "Live Questions";
  gameState.playerId = playerId || null;
  gameState.playerName = playerName || "";
  gameState.avatarId = avatarId || null;
  gameState.isMultiplayer = Boolean(isMultiplayer);
  gameState.questionLimit = 15;
  gameState.questionNumber = 0;
  gameState.secondsLeft = 15;

  renderQuizShell();
  await loadNextQuestion();
}

async function loadNextQuestion() {
  clearRevealTimer();
  clearWaitPoll();
  clearCountdownTimer();
  const status = document.getElementById("quizStatus");
  const prompt = document.getElementById("quizPrompt");
  const optionsWrap = document.getElementById("quizOptions");
  const tfWrap = document.getElementById("quizTF");
  const shortWrap = document.getElementById("quizShortWrap");
  const shortInput = document.getElementById("quizShortInput");
  const shortSubmit = document.getElementById("quizShortSubmit");
  const qaCard = document.getElementById("qaCard");
  const qaResult = document.getElementById("qaResult");
  const qaCorrect = document.getElementById("qaCorrect");
  const qaExplanation = document.getElementById("qaExplanation");

  status.textContent = "Loading question...";
  optionsWrap.innerHTML = "";
  tfWrap.classList.add("hidden");
  shortWrap.classList.add("hidden");
  prompt.textContent = "";
  if (shortInput) shortInput.value = "";
  if (shortSubmit) shortSubmit.disabled = false;
  if (qaCard) qaCard.classList.remove("flipped");
  if (qaResult) qaResult.textContent = "";
  if (qaCorrect) qaCorrect.textContent = "";
  if (qaExplanation) qaExplanation.textContent = "";
  tfWrap.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
    button.classList.remove("disabled", "correct", "wrong");
  });

  try {
    const playerQuery = gameState.playerId ? `?playerId=${encodeURIComponent(gameState.playerId)}` : "";
    const data = await api(`/api/session/${gameState.sessionId}/next-question${playerQuery}`);
    if (data.waiting) {
      const timerValue = document.getElementById("timerValue");
      if (timerValue && typeof data.secondsLeft === "number") {
        timerValue.textContent = `${data.secondsLeft}s`;
      }
      const reason = data.waitingForHost || data.waitReason === "host"
        ? "Waiting for the host to start the game..."
        : data.waitReason === "players"
          ? `Waiting for players (${data.answeredCount}/${data.totalPlayers})...`
          : "Waiting for all players...";
      status.textContent = `${reason} ${typeof data.secondsLeft === "number" ? `(${data.secondsLeft}s)` : ""}`;
      gameState.waitPollTimer = setTimeout(() => {
        loadNextQuestion();
      }, 1000);
      return;
    }

    if (data.done) {
      status.textContent = "Session complete.";
      prompt.textContent = "No more questions in this session.";
      let leaderboardMarkup = "";
      if (gameState.isMultiplayer) {
        const leaderboardData = Array.isArray(data.leaderboard) ? data.leaderboard : [];
        if (leaderboardData.length) {
          leaderboardMarkup = renderLeaderboardMarkup(leaderboardData);
        }
      }
      optionsWrap.innerHTML = `
        <div class="quiz-complete">
          <p>Your final score is ${gameState.score} points over ${gameState.answered} questions.</p>
          ${leaderboardMarkup}
          <button class="btn-primary btn-gold" id="homeFromComplete">Back to Home</button>
        </div>`;
      const backHome = document.getElementById("homeFromComplete");
      if (backHome) backHome.onclick = renderHome;
      return;
    }

    gameState.currentQuestion = data.question;
    gameState.questionNumber = Number(data.questionNumber || gameState.questionNumber || 0);
    gameState.questionLimit = Number(data.questionLimit || gameState.questionLimit || 15);
    const initialSeconds = Number(data.secondsLeft || 15);
    status.textContent = `Question ${gameState.questionNumber}/${gameState.questionLimit}`;
    prompt.textContent = data.question.prompt;

    startCountdownTimer(initialSeconds);

    if (data.question.type === "mcq") {
      data.question.options.forEach((option, index) => {
        const button = document.createElement("button");
        const label = ["A", "B", "C", "D"][index] || String.fromCharCode(65 + index);
        const optionId = label.toLowerCase();
        button.className = "quiz-option";
        button.textContent = `${label}) ${option.text}`;
        button.onclick = () => submitAnswer({ selectedOptionId: optionId }, button);
        optionsWrap.appendChild(button);
      });
    } else if (data.question.type === "true_false") {
      tfWrap.classList.remove("hidden");
      tfWrap.querySelectorAll("button").forEach((button) => {
        button.onclick = () => {
          const answerBoolean = button.dataset.bool === "true";
          submitAnswer({ answerBoolean }, button);
        };
      });
    } else if (data.question.type === "short_answer") {
      shortWrap.classList.remove("hidden");
      const submitShort = () => {
        const answerText = document.getElementById("quizShortInput").value.trim();
        if (!answerText) {
          status.textContent = "Enter an answer before submitting.";
          return;
        }
        submitAnswer({ answerText });
      };
      document.getElementById("quizShortSubmit").onclick = submitShort;
      document.getElementById("quizShortInput").onkeydown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          submitShort();
        }
      };
    }
  } catch (error) {
    status.textContent = error.message;
  }
}

async function submitAnswer(answerPayload, clickedButton) {
  if (!gameState.currentQuestion) return;

  clearRevealTimer();
  clearCountdownTimer();
  const options = document.querySelectorAll(".quiz-option");
  options.forEach((button) => {
    button.disabled = true;
    button.classList.add("disabled");
  });
  const tfButtons = document.querySelectorAll("#quizTF .quiz-option");
  tfButtons.forEach((button) => {
    button.disabled = true;
    button.classList.add("disabled");
  });
  const shortSubmit = document.getElementById("quizShortSubmit");
  if (shortSubmit) shortSubmit.disabled = true;

  try {
    const result = await api(`/api/session/${gameState.sessionId}/answer`, "POST", {
      questionId: gameState.currentQuestion.id,
      playerId: gameState.playerId,
      ...answerPayload
    });

    gameState.answered += 1;
    const pointsDelta = typeof result.pointsDelta === "number"
      ? result.pointsDelta
      : (result.isCorrect ? 15 : -5);
    if (typeof result.playerScore === "number") {
      gameState.score = result.playerScore;
    } else {
      gameState.score += pointsDelta;
    }
    updateScoreBoard();

    if (clickedButton && result.isCorrect !== null) {
      clickedButton.classList.add(result.isCorrect ? "correct" : "wrong");
    }

    if (result.revealAnswer !== false && result.correctOptionId) {
      document.querySelectorAll(".quiz-option").forEach((button) => {
        if (button.textContent.toLowerCase().startsWith(result.correctOptionId.toLowerCase() + ")")) {
          button.classList.add("correct");
        }
      });
    }

    const qaCard = document.getElementById("qaCard");
    const qaResult = document.getElementById("qaResult");
    const qaCorrect = document.getElementById("qaCorrect");
    const qaExplanation = document.getElementById("qaExplanation");
    const status = document.getElementById("quizStatus");
    const correctAnswerText = getCorrectAnswerText(gameState.currentQuestion, result);
    const pendingManualReview = result.pendingManualReview === true;
    const revealAnswer = result.revealAnswer !== false;

    if (qaResult) {
      if (pendingManualReview) {
        qaResult.textContent = "Answer saved for teacher review.";
        qaResult.className = "qa-result";
      } else {
        const prefix = result.isCorrect ? "Correct!" : "Not quite.";
        const pointsText = pointsDelta > 0 ? ` +${pointsDelta} points` : ` ${pointsDelta} points`;
        qaResult.textContent = `${prefix}${pointsText}`;
        qaResult.className = `qa-result ${result.isCorrect ? "correct" : "wrong"}`;
      }
    }
    if (qaCorrect) {
      if (pendingManualReview) {
        qaCorrect.textContent = "Teacher will grade this long-answer response.";
      } else if (!revealAnswer) {
        qaCorrect.textContent = "Answer reveal is disabled for this quiz.";
      } else {
        qaCorrect.textContent = correctAnswerText ? `Correct Answer: ${correctAnswerText}` : "Correct answer revealed.";
      }
    }
    if (qaExplanation) {
      qaExplanation.textContent = revealAnswer && result.explanation ? result.explanation : "";
    }
    if (qaCard) qaCard.classList.add("flipped");
    if (status) status.textContent = "Review the answer...";

    const delayMs = result.waitingForOthers ? 1000 : 2400;
    if (result.waitingForOthers && status) {
      status.textContent = `Waiting for players (${result.answeredCount}/${result.totalPlayers})... ${result.secondsLeft || 0}s`;
    }
    gameState.revealTimer = setTimeout(() => {
      loadNextQuestion();
    }, delayMs);
  } catch (error) {
    const status = document.getElementById("quizStatus");
    if (status) status.textContent = error.message;
    options.forEach((button) => {
      button.disabled = false;
      button.classList.remove("disabled");
    });
    tfButtons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("disabled");
    });
    if (shortSubmit) shortSubmit.disabled = false;
  }
}

const linkedRoomCode = new URLSearchParams(window.location.search).get("room");
if (/^JAM\d{5}$/i.test(linkedRoomCode || "")) {
  renderJoin();
} else {
  renderHome();
}


