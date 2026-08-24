let currentSessionId = null;
let currentQuestion = null;

const ids = ["menu","hostPanel","joinPanel","soloPanel","debatePanel","settingsPanel","quizPanel","infoModal"];
const panels = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));

function hideAll() { Object.values(panels).forEach(p => p?.classList.add("hidden")); }
function openPanel(id) { hideAll(); panels[id]?.classList.remove("hidden"); }

document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => openPanel(btn.dataset.open));
});

document.getElementById("openSettings").addEventListener("click", () => openPanel("settingsPanel"));
document.getElementById("openInfo").addEventListener("click", () => openPanel("infoModal"));

document.querySelectorAll(".back").forEach(btn => {
  btn.addEventListener("click", () => openPanel("menu"));
});

async function api(url, method = "GET", body) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

document.getElementById("createHostSession").addEventListener("click", async () => {
  try {
    const data = await api("/api/session/create", "POST", {
      mode: "host",
      hostName: document.getElementById("hostName").value.trim(),
      gradeBand: document.getElementById("hostGrade").value,
      subject: document.getElementById("hostSubject").value
    });
    currentSessionId = data.sessionId;
    document.getElementById("hostInfo").textContent = `Code: ${data.roomCode} | Players: ${data.playerCount}`;
    await loadNextQuestion();
  } catch (e) {
    document.getElementById("hostInfo").textContent = e.message;
  }
});

document.getElementById("joinSession").addEventListener("click", async () => {
  try {
    const data = await api("/api/session/join", "POST", {
      roomCode: document.getElementById("joinCode").value.trim(),
      playerName: document.getElementById("joinName").value.trim()
    });
    currentSessionId = data.sessionId;
    document.getElementById("joinInfo").textContent = `Joined ${data.roomCode} | Players: ${data.playerCount}`;
    await loadNextQuestion();
  } catch (e) {
    document.getElementById("joinInfo").textContent = e.message;
  }
});

document.getElementById("startSolo").addEventListener("click", async () => {
  try {
    const data = await api("/api/session/create", "POST", {
      mode: "solo",
      gradeBand: document.getElementById("soloGrade").value,
      subject: document.getElementById("soloSubject").value
    });
    currentSessionId = data.sessionId;
    await loadNextQuestion();
  } catch {}
});

async function loadNextQuestion() {
  if (!currentSessionId) return;
  const data = await api(`/api/session/${currentSessionId}/next-question`);
  openPanel("quizPanel");

  const qPrompt = document.getElementById("qPrompt");
  const qOptions = document.getElementById("qOptions");
  const feedback = document.getElementById("feedback");
  const shortWrap = document.getElementById("shortAnswerWrap");
  const tfWrap = document.getElementById("tfWrap");

  qOptions.innerHTML = "";
  feedback.textContent = "";
  shortWrap.classList.add("hidden");
  tfWrap.classList.add("hidden");

  if (data.done) {
    qPrompt.textContent = data.message;
    currentQuestion = null;
    return;
  }

  currentQuestion = data.question;
  qPrompt.textContent = currentQuestion.prompt;

  if (currentQuestion.type === "mcq") {
    currentQuestion.options.forEach(opt => {
      const b = document.createElement("button");
      b.className = "answer-btn";
      b.textContent = `${opt.id}) ${opt.text}`;
      b.onclick = () => submitAnswer({ selectedOptionId: opt.id });
      qOptions.appendChild(b);
    });
  } else if (currentQuestion.type === "true_false") {
    tfWrap.classList.remove("hidden");
  } else if (currentQuestion.type === "short_answer") {
    shortWrap.classList.remove("hidden");
  } else {
    qOptions.innerHTML = `<div class="answer-btn">Learning card: read the explanation and continue.</div>`;
    submitAnswer({});
  }
}

async function submitAnswer(extra = {}) {
  if (!currentSessionId || !currentQuestion) return;
  const data = await api(`/api/session/${currentSessionId}/answer`, "POST", {
    questionId: currentQuestion.id,
    ...extra
  });
  document.getElementById("feedback").textContent =
    `${data.isCorrect ? "✅ Correct" : "❌ Incorrect"} ${data.explanation ? "| " + data.explanation : ""}`;
}

document.getElementById("submitShortAnswer").addEventListener("click", () => {
  const v = document.getElementById("shortAnswerInput").value;
  submitAnswer({ answerText: v });
});

document.querySelectorAll(".tf-btn").forEach(btn => {
  btn.addEventListener("click", () => submitAnswer({ answerBoolean: btn.dataset.bool === "true" }));
});

document.getElementById("nextQuestion").addEventListener("click", loadNextQuestion);
openPanel("menu");
