/**
 * Minimal day-by-day step logger for the AI (tutor/quiz) flow.
 *
 * Writes one JSON line per step to logs/<YYYY-MM-DD>.log at the repo root, so
 * a day's worth of chat/quiz activity can be traced end to end when something
 * goes wrong. Metadata only (ids, lengths, status codes, error messages) --
 * never full prompt or response text.
 */

const fs = require("fs");
const path = require("path");

const logsDir = path.join(__dirname, "..", "logs");

function ensureLogsDir() {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
}

function todayLogFile() {
  const date = new Date().toISOString().slice(0, 10);
  return path.join(logsDir, `${date}.log`);
}

function logStep(scope, step, details = {}) {
  const entry = {
    time: new Date().toISOString(),
    scope,
    step,
    ...details
  };

  try {
    ensureLogsDir();
    fs.appendFileSync(todayLogFile(), `${JSON.stringify(entry)}\n`, "utf8");
  } catch (error) {
    console.error("Failed to write log entry", error);
  }
}

/** Enough of a secret to tell keys apart in logs, never enough to reuse. */
function maskSecret(value) {
  const str = String(value || "");
  if (!str) return "(missing)";
  if (str.length <= 10) return "***";
  return `${str.slice(0, 6)}...${str.slice(-4)}`;
}

module.exports = { logStep, maskSecret };
