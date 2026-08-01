const http = require("http");
const fs = require("fs");
const path = require("path");

/**
 * Loads KEY=value pairs from web/.env before anything reads process.env.
 * Keeps the project dependency-free -- no dotenv package needed.
 */
function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  let raw;
  try {
    raw = fs.readFileSync(envPath, "utf8");
  } catch {
    return;
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

const { askTutor, generateQuiz, DEFAULT_MODEL } = require("./agent/agent");

const host = "127.0.0.1";
const port = Number(process.env.PORT) || 4174;
const root = __dirname;

const MAX_BODY_BYTES = 32 * 1024;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 30;
const rateBuckets = new Map();

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

function getApiKey() {
  const key = (process.env.OPENAI_API_KEY || "").trim();
  return key || null;
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Request body too large"), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(Object.assign(new Error("Invalid JSON body"), { statusCode: 400 }));
      }
    });
    req.on("error", reject);
  });
}

/** Cheap per-client throttle so a stuck loop cannot drain the API credit. */
function rateLimited(req) {
  const client = req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const bucket = rateBuckets.get(client);

  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(client, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

function reportAgentError(res, error) {
  console.error("[nawa-agent]", error.message, error.detail || "");
  const status = error.status;

  if (status === 401) {
    return sendJson(res, 502, { error: "auth", message: "The OpenAI API key was rejected. Check OPENAI_API_KEY in web/.env." });
  }
  if (status === 429) {
    return sendJson(res, 502, { error: "rate_limit", message: "OpenAI is rate limiting or the account is out of credit." });
  }
  if (status === 404) {
    return sendJson(res, 502, { error: "model", message: `The model "${process.env.OPENAI_MODEL || DEFAULT_MODEL}" is not available to this account. Set OPENAI_MODEL in web/.env to one you can access.` });
  }
  return sendJson(res, 502, { error: "upstream", message: "The tutor service could not be reached. Check the server console for details." });
}

async function handleApi(req, res, pathname) {
  if (pathname === "/api/status" && req.method === "GET") {
    return sendJson(res, 200, {
      configured: Boolean(getApiKey()),
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL
    });
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "method", message: "Use POST." });
  }

  if (rateLimited(req)) {
    return sendJson(res, 429, { error: "throttled", message: "Too many requests. Wait a moment and try again." });
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return sendJson(res, 503, {
      error: "not_configured",
      message: "The tutor is not connected yet. Add OPENAI_API_KEY to web/.env and restart the server."
    });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch (error) {
    return sendJson(res, error.statusCode || 400, { error: "bad_request", message: error.message });
  }

  const model = process.env.OPENAI_MODEL || DEFAULT_MODEL;

  if (pathname === "/api/chat") {
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message) {
      return sendJson(res, 400, { error: "bad_request", message: "A message is required." });
    }
    try {
      const reply = await askTutor({
        message,
        history: body.history,
        labContext: body.labContext,
        language: body.language === "ar" ? "ar" : "en",
        apiKey,
        model
      });
      return sendJson(res, 200, { reply });
    } catch (error) {
      return reportAgentError(res, error);
    }
  }

  if (pathname === "/api/quiz") {
    try {
      const questions = await generateQuiz({
        materialId: body.materialId,
        experimentIndex: body.experimentIndex,
        experimentTitle: body.experimentTitle,
        language: body.language === "ar" ? "ar" : "en",
        count: Math.min(Math.max(Number(body.count) || 3, 1), 6),
        apiKey,
        model
      });
      return sendJson(res, 200, { questions });
    } catch (error) {
      return reportAgentError(res, error);
    }
  }

  return sendJson(res, 404, { error: "not_found", message: "Unknown endpoint." });
}

/**
 * Server-only paths. These must never be reachable over HTTP:
 * .env holds the API key, and agent/ is the server-side tutor code.
 */
function isProtected(requestPath) {
  const segments = requestPath.split(/[/\\]/).filter(Boolean);
  return segments.some(
    (segment) => segment.startsWith(".") || segment.toLowerCase() === "agent"
  );
}

function serveStatic(req, res, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  const requestPath = decoded === "/" ? "/index.html" : decoded;
  const filePath = path.join(root, path.normalize(requestPath));

  // Keep every served file inside web/, whatever the request path claims,
  // and never expose secrets or server-side code.
  if (!filePath.startsWith(root + path.sep) || isProtected(requestPath)) {
    res.writeHead(403, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    res.end("Forbidden");
    return;
  }

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
}

http.createServer((req, res) => {
  const pathname = (req.url || "/").split("?")[0];

  if (pathname.startsWith("/api/")) {
    handleApi(req, res, pathname).catch((error) => {
      console.error("[nawa-server]", error);
      sendJson(res, 500, { error: "server", message: "Unexpected server error." });
    });
    return;
  }

  serveStatic(req, res, pathname);
}).listen(port, host, () => {
  const configured = Boolean(getApiKey());
  console.log(`NAWA web server running at http://${host}:${port}`);
  console.log(
    configured
      ? `AI tutor: connected (model: ${process.env.OPENAI_MODEL || DEFAULT_MODEL})`
      : "AI tutor: NOT configured - add OPENAI_API_KEY to web/.env, then restart"
  );
});
