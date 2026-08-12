const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { URL } = require("url");

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const raw = fs.readFileSync(envPath, "utf8");
  raw.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) return;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (key && !(key in process.env)) {
      process.env[key] = value;
    }
  });
}

loadEnvFile();
const { askTutor, generateQuiz } = require("./agent/agent");

const host = "127.0.0.1";
const port = Number(process.env.PORT || 4174);
const root = __dirname;
const teacherAccessCode = process.env.NAWA_TEACHER_ACCESS_CODE || "NAWA-TEACHER-2026";
const dataDir = path.join(root, "data");
const usersFile = path.join(dataDir, "users.json");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jsx": "text/babel; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles = new Set(["teacher", "student"]);
const sessions = new Map();

const teacherDashboardData = {
  "teacher-demo-1": {
    teacherName: "Ahmad Al-Khatib",
    summary: [
      { value: "26", title: "Active students", text: "Students who opened a lab or completed an activity in the last 24 hours." },
      { value: "7", title: "Labs in progress", text: "Experiments that still need a follow-up discussion in class." },
      { value: "88%", title: "Average completion", text: "Average progress across the current class sections." }
    ],
    students: [
      { id: "ST-201", name: "Laith Al-Ajarmeh", grade: "Grade 9", section: "9-A", experiment: "Electromagnetic induction", progress: 92, quizScore: 9, lastActive: "12 minutes ago", status: "Complete" },
      { id: "ST-202", name: "Saja Al-Khawaldeh", grade: "Grade 9", section: "9-A", experiment: "Galvanic cell", progress: 74, quizScore: 7, lastActive: "25 minutes ago", status: "In progress" },
      { id: "ST-203", name: "Mohammad Al-Shawabkeh", grade: "Grade 10", section: "10-B", experiment: "DNA replication", progress: 58, quizScore: 6, lastActive: "40 minutes ago", status: "Needs support" },
      { id: "ST-204", name: "Tala Nassar", grade: "Grade 10", section: "10-B", experiment: "Linear momentum", progress: 84, quizScore: 8, lastActive: "1 hour ago", status: "Complete" },
      { id: "ST-205", name: "Adam Al-Zoubi", grade: "Grade 8", section: "8-C", experiment: "Electromagnetic induction", progress: 37, quizScore: 4, lastActive: "2 hours ago", status: "Needs support" }
    ]
  }
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function ensureUserStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, "[]", "utf8");
  }
}

function loadUsers() {
  ensureUserStore();
  try {
    const raw = fs.readFileSync(usersFile, "utf8");
    const users = JSON.parse(raw);
    return Array.isArray(users) ? users : [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  ensureUserStore();
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf8");
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, originalHash] = storedHash.split(":");
  const nextHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(originalHash, "hex"), Buffer.from(nextHash, "hex"));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 1e6) {
        reject(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function sanitizeProfile(user) {
  return {
    id: String(user.id),
    role: user.role,
    email: user.email,
    name: user.name
  };
}

function createSession(user) {
  const token = `nawa-${crypto.randomUUID()}`;
  sessions.set(token, {
    userId: String(user.id),
    role: user.role,
    email: user.email,
    name: user.name
  });
  return token;
}

function getSessionFromRequest(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!token || !sessions.has(token)) return null;
  return sessions.get(token);
}

function getRequestLanguage(body) {
  return String(body?.language || "ar").trim().toLowerCase() === "en" ? "en" : "ar";
}

async function handleLogin(req, res) {
  try {
    const body = await readJsonBody(req);
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = String(body.role || "").trim().toLowerCase();

    if (!email || !password) {
      sendJson(res, 400, { message: "Enter both email and password." });
      return;
    }

    if (!emailPattern.test(email)) {
      sendJson(res, 400, { message: "Enter a valid email address." });
      return;
    }

    if (!roles.has(role)) {
      sendJson(res, 400, { message: "Choose a valid account type before signing in." });
      return;
    }

    const user = loadUsers().find((item) => item.email === email);
    if (!user || user.role !== role) {
      sendJson(res, 401, { message: "This account was not found for the selected role." });
      return;
    }

    const passwordMatches = verifyPassword(password, user.passwordHash);
    if (!passwordMatches) {
      sendJson(res, 401, { message: "Incorrect password. Try again." });
      return;
    }

    const token = createSession(user);
    sendJson(res, 200, { token, profile: sanitizeProfile(user) });
  } catch (error) {
    sendJson(res, 400, { message: "Could not read the login request. Please try again." });
  }
}

async function handleRegister(req, res) {
  try {
    const body = await readJsonBody(req);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = String(body.role || "").trim().toLowerCase();
    const accessCode = String(body.teacherAccessCode || "").trim();

    if (!name || !email || !password) {
      sendJson(res, 400, { message: "Complete your name, email, and password to create an account." });
      return;
    }

    if (!roles.has(role)) {
      sendJson(res, 400, { message: "Choose whether this account belongs to a student or teacher." });
      return;
    }

    if (!emailPattern.test(email)) {
      sendJson(res, 400, { message: "Enter a valid email address." });
      return;
    }

    if (password.length < 8) {
      sendJson(res, 400, { message: "Password must be at least 8 characters long." });
      return;
    }

    if (role === "teacher" && accessCode !== teacherAccessCode) {
      sendJson(res, 403, { message: "Teacher accounts require a valid access code." });
      return;
    }

    const users = loadUsers();
    const existingUser = users.find((item) => item.email === email);
    if (existingUser) {
      sendJson(res, 409, { message: "This email is already registered. Sign in instead." });
      return;
    }

    const user = {
      id: `user-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
      name,
      email,
      role,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString()
    };
    users.push(user);
    saveUsers(users);

    const token = createSession(user);
    sendJson(res, 201, {
      token,
      profile: sanitizeProfile(user)
    });
  } catch (error) {
    sendJson(res, 400, { message: "Could not create the account. Please try again." });
  }
}

async function handleChat(req, res) {
  try {
    const body = await readJsonBody(req);
    const message = String(body.message || "").trim();

    if (!message) {
      sendJson(res, 400, { message: "Enter a message first." });
      return;
    }

    if (!process.env.OPENAI_API_KEY) {
      sendJson(res, 503, { message: "The tutor is not connected yet. Add OPENAI_API_KEY to web/.env and restart the server." });
      return;
    }

    const reply = await askTutor({
      message,
      history: Array.isArray(body.history) ? body.history : [],
      labContext: body.labContext || null,
      language: getRequestLanguage(body),
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL
    });

    sendJson(res, 200, { reply });
  } catch (error) {
    sendJson(res, error.status || 500, { message: error.message || "Could not reach the tutor." });
  }
}

async function handleQuiz(req, res) {
  try {
    const body = await readJsonBody(req);

    if (!process.env.OPENAI_API_KEY) {
      sendJson(res, 503, { message: "The quiz generator is not connected yet. Add OPENAI_API_KEY to web/.env and restart the server." });
      return;
    }

    const questions = await generateQuiz({
      materialId: body.materialId || "physics",
      experimentIndex: body.experimentIndex,
      experimentTitle: body.experimentTitle,
      language: getRequestLanguage(body),
      count: Number.isInteger(body.count) ? body.count : 3,
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL
    });

    sendJson(res, 200, { questions });
  } catch (error) {
    sendJson(res, error.status || 500, { message: error.message || "Could not generate the quiz." });
  }
}

function handleTeacherDashboard(req, res, url) {
  const session = getSessionFromRequest(req);
  if (!session) {
    sendJson(res, 401, { message: "Your session has expired. Sign in again." });
    return;
  }

  if (session.role !== "teacher") {
    sendJson(res, 403, { message: "Only teachers can open this dashboard." });
    return;
  }

  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  const sort = (url.searchParams.get("sort") || "progress").trim();
  const dataset = teacherDashboardData[session.userId] || {
    teacherName: session.name,
    summary: [
      { value: "0", title: "Active students", text: "No student activity has been recorded for this teacher yet." },
      { value: "0", title: "Labs in progress", text: "No experiment sessions have been tracked yet." },
      { value: "--", title: "Average completion", text: "Completion data will appear after students start using the labs." }
    ],
    students: []
  };

  let students = [...dataset.students];
  if (q) {
    students = students.filter((student) =>
      [student.name, student.grade, student.section, student.experiment, student.status]
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }

  const sorters = {
    progress: (a, b) => b.progress - a.progress,
    score: (a, b) => b.quizScore - a.quizScore,
    name: (a, b) => a.name.localeCompare(b.name, "en"),
    recent: (a, b) => a.id.localeCompare(b.id, "en")
  };
  students.sort(sorters[sort] || sorters.progress);

  setTimeout(() => {
    sendJson(res, 200, {
      teacherName: dataset.teacherName,
      summary: dataset.summary,
      students
    });
  }, 260);
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    handleLogin(req, res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    handleRegister(req, res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/chat") {
    handleChat(req, res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/quiz") {
    handleQuiz(req, res);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/status") {
    sendJson(res, 200, { ok: true, aiConnected: Boolean(process.env.OPENAI_API_KEY) });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/teacher/dashboard") {
    handleTeacherDashboard(req, res, url);
    return;
  }

  const requestPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath);

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(content);
  });
}).listen(port, host, () => {
  console.log(`NAWA web server running at http://${host}:${port}`);
});
