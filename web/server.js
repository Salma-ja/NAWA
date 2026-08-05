const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const host = "127.0.0.1";
const port = 4174;
const root = __dirname;

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
const sessions = new Map();

const users = [
  { id: "t-001", role: "teacher", email: "teacher@nawa.lab", password: "Teacher@123", name: "أحمد الخطيب" },
  { id: "t-002", role: "teacher", email: "science.lead@nawa.lab", password: "Teacher@123", name: "سارة العبدالله" },
  { id: "s-001", role: "student", email: "student@nawa.lab", password: "Student@123", name: "ليث العجارمة" },
  { id: "s-002", role: "student", email: "learner@nawa.lab", password: "Student@123", name: "تالا نصار" }
];

const teacherDashboardData = {
  "t-001": {
    teacherName: "أحمد الخطيب",
    summary: [
      { value: "26", title: "طلاب نشطون", text: "عدد الطلاب الذين فتحوا تجربة أو أكملوا نشاطًا خلال آخر 24 ساعة." },
      { value: "7", title: "تجارب قيد المتابعة", text: "تجارب مفتوحة حاليًا وتحتاج متابعة أو نقاشًا داخل الصف." },
      { value: "88%", title: "متوسط الإنجاز", text: "متوسط إكمال التجارب والاختبارات القصيرة في الشعب الحالية." }
    ],
    students: [
      { id: "ST-201", name: "ليث العجارمة", grade: "الصف التاسع", section: "9-أ", experiment: "الحث الكهرومغناطيسي", progress: 92, quizScore: 9, lastActive: "منذ 12 دقيقة", status: "مكتمل" },
      { id: "ST-202", name: "سجى الخوالدة", grade: "الصف التاسع", section: "9-أ", experiment: "الخلية الجلفانية", progress: 74, quizScore: 7, lastActive: "منذ 25 دقيقة", status: "يتابع" },
      { id: "ST-203", name: "محمد الشوابكة", grade: "الصف العاشر", section: "10-ب", experiment: "تضاعف DNA", progress: 58, quizScore: 6, lastActive: "منذ 40 دقيقة", status: "يحتاج دعم" },
      { id: "ST-204", name: "تالا نصار", grade: "الصف العاشر", section: "10-ب", experiment: "التصادم الخطي", progress: 84, quizScore: 8, lastActive: "منذ ساعة", status: "مكتمل" },
      { id: "ST-205", name: "آدم الزعبي", grade: "الصف الثامن", section: "8-ج", experiment: "الحث الكهرومغناطيسي", progress: 37, quizScore: 4, lastActive: "منذ ساعتين", status: "يحتاج دعم" }
    ]
  },
  "t-002": {
    teacherName: "سارة العبدالله",
    summary: [
      { value: "0", title: "طلاب نشطون", text: "لا يوجد نشاط طلابي مسجل لهذه الشعبة حتى الآن." },
      { value: "0", title: "تجارب قيد المتابعة", text: "لم يتم فتح أي تجربة بعد من هذه المجموعة." },
      { value: "--", title: "متوسط الإنجاز", text: "سيظهر المتوسط تلقائيًا بعد بدء أول نشاط طلابي." }
    ],
    students: []
  }
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
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

function getSessionFromRequest(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
  if (!token || !sessions.has(token)) return null;
  return sessions.get(token);
}

function handleLogin(req, res) {
  readJsonBody(req)
    .then((body) => {
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const role = String(body.role || "").trim();

      if (!email || !password) {
        sendJson(res, 400, { message: "يرجى إدخال البريد الإلكتروني وكلمة المرور." });
        return;
      }

      if (!emailPattern.test(email)) {
        sendJson(res, 400, { message: "صيغة البريد الإلكتروني غير صحيحة." });
        return;
      }

      const user = users.find((item) => item.email.toLowerCase() === email && item.role === role);
      if (!user || user.password !== password) {
        sendJson(res, 401, { message: "بيانات الدخول غير صحيحة. تأكد من البريد الإلكتروني وكلمة المرور." });
        return;
      }

      const token = `nawa-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessions.set(token, {
        userId: user.id,
        role: user.role,
        email: user.email,
        name: user.name
      });

      sendJson(res, 200, {
        token,
        profile: {
          id: user.id,
          role: user.role,
          email: user.email,
          name: user.name
        }
      });
    })
    .catch(() => {
      sendJson(res, 400, { message: "تعذر قراءة بيانات الدخول. حاول مرة أخرى." });
    });
}

function handleTeacherDashboard(req, res, url) {
  const session = getSessionFromRequest(req);
  if (!session) {
    sendJson(res, 401, { message: "انتهت الجلسة أو لم يتم تسجيل الدخول." });
    return;
  }

  if (session.role !== "teacher") {
    sendJson(res, 403, { message: "هذه الصفحة متاحة للمعلم فقط." });
    return;
  }

  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  const sort = (url.searchParams.get("sort") || "progress").trim();
  const dataset = teacherDashboardData[session.userId] || {
    teacherName: session.name,
    summary: [],
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
    name: (a, b) => a.name.localeCompare(b.name, "ar"),
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
