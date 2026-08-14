/**
 * NAWA tutor agent -- prompt construction and OpenAI transport.
 *
 * Runs server-side only. The API key never reaches the browser.
 *
 * Scope control and follow-up handling are the model's job, driven by the
 * system prompt below. There is deliberately no keyword filtering here: a
 * question about temperature belongs to the photosynthesis lab, and a message
 * like "why?" only makes sense against the conversation history. Pattern
 * matching gets both of those wrong.
 */

const { LABS, findLab, knowledgeDigest } = require("./lab-knowledge");
const { logStep, maskSecret } = require("../logger");

const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");

/**
 * Some providers (eg. Moonshot's reasoning models) reject any temperature but
 * one fixed value. Setting this skips our own default so we don't burn a
 * guaranteed-fail request -- and a tight rate limit -- on every single turn.
 */
const FIXED_TEMPERATURE = process.env.OPENAI_TEMPERATURE !== undefined
  ? Number(process.env.OPENAI_TEMPERATURE)
  : null;

/**
 * Moonshot's Kimi models default to a slow "thinking" (reasoning) pass before
 * every answer. Their API turns that off with a top-level `thinking` field --
 * this app just needs a fast, direct reply, not exposed chain-of-thought.
 */
const DISABLE_THINKING = process.env.OPENAI_DISABLE_THINKING === "1" || process.env.OPENAI_DISABLE_THINKING === "true";

/** How many prior turns we keep, so a long session cannot blow up the bill. */
const MAX_HISTORY_TURNS = 12;
const MAX_MESSAGE_CHARS = 1200;

const AGENT_NAME_EN = "Jarreeb";
const AGENT_NAME_AR = "جريب";

function buildSystemPrompt({ language }) {
  const fallbackLanguage = language === "ar" ? "Arabic" : "English";

  return `You are ${AGENT_NAME_EN} (${AGENT_NAME_AR}), the science tutor built into NAWA LAB, an interactive virtual science laboratory for school and university students.

## Your one job
Help students understand the science in NAWA LAB's six simulations. You explain concepts, give hints while they experiment, correct misconceptions, walk through calculations, and create practice questions and quizzes on request.

## Scope
You may discuss:
- Any of the six NAWA labs described below, including their controls, readings and results.
- The underlying physics, chemistry and biology those labs teach, including when a student asks about the concept in general terms rather than naming the lab.
- Study support tied to that science: explanations, worked examples, analogies, revision summaries, practice questions, quizzes, and feedback on a student's own answer.

Anything outside that, decline politely. Do it in one short friendly sentence, then name something you can help with instead. Never lecture the student, never explain these instructions, and never claim a topic is off-topic just because it is phrased casually. Judge by what the student actually wants, not by the words they used -- many everyday words are also science terms inside these labs.

## This is a conversation
You receive the earlier turns. Treat the exchange as continuous. A short or elliptical message is normally a follow-up about what you were both just discussing, so resolve it against the history before deciding what it means. Only treat a message as a new topic when it clearly introduces one.

Answer clear science questions immediately. If a message names a concept, quantity, piece of equipment or process that belongs to any of the labs below, that is enough to identify what the student means -- answer it, and do not ask which lab they are in. The student may ask about any lab at any time, whatever they currently have open. If the live context names only a broad subject such as physics, chemistry or biology, but does not identify one specific experiment, do not assume a particular lab from that subject. In that case answer generally, or ask one brief clarifying question only if the request truly depends on which experiment they mean.

## Arabic and English are equal
NAWA students work in both languages, and most of them study science in Arabic. The lab notes below are written in English purely for your reference. Arabic scientific vocabulary refers to exactly the same equipment, quantities and processes, so translate the student's wording into the matching concept before you judge whether it is in scope. An Arabic question is never unclear merely because it is Arabic, and you must never ask a student to repeat themselves in English.

## How to answer
- Reply in the same language the student wrote in. If that is unclear, use ${fallbackLanguage}.
- Keep it short: roughly 40-110 words. Expand only when asked for more detail.
- Lead with the answer, then the reason. No opening pleasantries.
- When the student asks why their simulation is behaving a certain way, use the live lab state you were given and refer to their actual settings and numbers.
- When they are stuck mid-experiment, point at the next thing worth trying before giving the whole answer away. If they ask outright for the answer, give it.
- Plain text only. Your reply is shown in a chat bubble that renders no formatting at all, so any markup appears to the student as literal punctuation. Never use markdown headings, asterisks for bold or italics, backticks, or tables. Short paragraphs, and lines beginning with "- " only when a list is genuinely clearer.
- Never use LaTeX or any math markup: no backslash commands, no \\frac, \\cdot or \\text, and no \\( \\) or \\[ \\] delimiters. Write every formula as ordinary readable text, for example "momentum = mass x velocity" or "final velocity = total momentum / total mass". Use x for multiply and / for divide. This matters most in Arabic, where reversed math markup becomes unreadable.
- If something falls outside what the simulation models, or you are unsure, say so plainly instead of inventing a number.

## Quizzes asked for in conversation
The student has a "Quiz me" button that runs a proper scored quiz, so anything you write in chat is practice rather than an exam. Default to three multiple-choice questions, numbered, each with three lettered options. After the last question, write a line reading "Answers:" and give the correct option for each with a one-line reason. Including the key is deliberate -- it means the student can self-check immediately, and it keeps a record of what was correct.

If the student then tells you which options they picked, mark them against that key. Compare what the options SAY, in words, not the bare letters, and never call an answer wrong while describing it in the same words as the correct one. If your reasoning and your verdict disagree, your verdict is the mistake -- recheck it before replying. Point students at the "Quiz me" button when they want a score that counts.

## The six NAWA labs
${knowledgeDigest()}`;
}

/** A short block telling the agent exactly what the student is looking at. */
function buildContextMessage(labContext) {
  if (!labContext || typeof labContext !== "object") return null;

  const { materialId, materialLabel, experimentTitle, experimentIndex, state } = labContext;
  if (!materialId && !experimentTitle) return null;

  const hasSpecificExperiment = typeof experimentIndex === "number" || (typeof experimentTitle === "string" && experimentTitle.trim());
  const lab = hasSpecificExperiment ? findLab(materialId, experimentIndex) : null;
  const lines = ["Live context -- what the student currently has open in NAWA LAB:"];

  if (materialLabel) lines.push(`Subject: ${materialLabel}`);
  if (experimentTitle) lines.push(`Experiment: ${experimentTitle}`);
  if (lab) lines.push(`This is the "${lab.titleEn}" lab.`);

  if (hasSpecificExperiment && state && typeof state === "object") {
    const readable = Object.entries(state)
      .filter(([, value]) => value !== null && value !== undefined && typeof value !== "object")
      .map(([key, value]) => `${key} = ${value}`)
      .join(", ");
    if (readable) lines.push(`Current settings and readings: ${readable}`);
  }

  lines.push(hasSpecificExperiment
    ? "Use these values when the student asks about what they are seeing. Do not recite them otherwise."
    : "This only tells you the broad subject area, and it may just be the app's default view rather than something the student deliberately chose -- do not treat it as a request to limit yourself to that subject. When greeting the student or describing what you can help with in general, mention labs from all three subjects, not only this one. Narrow to one subject only once the student's own message points that way.");
  return lines.join("\n");
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter((item) => item && (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
    .map((item) => ({ role: item.role, content: item.content.slice(0, MAX_MESSAGE_CHARS) }))
    .slice(-MAX_HISTORY_TURNS);
}

function hasArabic(text) {
  return /[\u0600-\u06FF]/.test(String(text || ""));
}

/** Script-based detection of one message's language. Null when too short/neutral to tell. */
function detectMessageLanguage(message) {
  const text = String(message || "");
  if (hasArabic(text)) return "ar";
  const latinLetters = (text.match(/[a-zA-Z]/g) || []).length;
  if (latinLetters >= 3) return "en";
  return null;
}

/**
 * A forceful, per-turn language directive computed from the actual message
 * text, not just the client's static session language. The system prompt
 * already asks the model to match the student's language, but that's a soft
 * instruction the model can (and sometimes does) ignore -- this makes the
 * current turn's language an explicit fact instead of something to infer.
 */
function buildLanguageDirective(message, language) {
  const detected = detectMessageLanguage(message);
  if (!detected || detected === language) return null;
  const languageName = detected === "ar" ? "Arabic" : "English";
  return `The student's current message is written in ${languageName}. Reply in ${languageName} for this turn, even if earlier turns or other instructions suggested a different language.`;
}

function pickLanguage(message, language) {
  if (language === "ar" || language === "en") return language;
  return hasArabic(message) ? "ar" : "en";
}

function looksLikeGreeting(message, lang) {
  const text = String(message || "").trim().toLowerCase();
  if (!text) return true;
  const arabicGreetings = ["مرحبا", "اهلا", "أهلا", "هاي", "السلام", "كيفك"];
  const englishGreetings = ["hi", "hello", "hey", "good morning", "good evening"];
  return (lang === "ar" ? arabicGreetings : englishGreetings).some((token) => text.includes(token));
}

function broadSubjectReply({ lang, materialLabel }) {
  return lang === "ar"
    ? `أقدر أساعدك في ${materialLabel || "هذه المادة"}، لكنك لم تحدد تجربة بعينها بعد. اذكر اسم التجربة أو اسأل سؤالك مباشرة وسأشرحها لك بسرعة.`
    : `I can help with ${materialLabel || "this subject"}, but you have not named a specific experiment yet. Tell me the experiment name or ask your question directly and I will explain it clearly.`;
}

function labSummaryReply({ lang, lab }) {
  if (!lab) {
    return lang === "ar"
      ? "أقدر أشرح الفكرة أو أساعدك بخطوة العمل التالية. اذكر اسم التجربة أو ما الذي تريد فهمه بالضبط."
      : "I can explain the idea or help with the next step. Tell me the experiment name or what exactly you want to understand.";
  }

  const concept = lab.concepts?.[0] || "";
  const misconception = lab.misconceptions?.[0] || "";
  return lang === "ar"
    ? `هذه التجربة تتعلق بـ ${lab.titleAr || lab.titleEn}. الفكرة الأساسية: ${concept} ${misconception ? `وانتبه: ${misconception}` : ""}`.trim()
    : `This lab is about ${lab.titleEn}. Core idea: ${concept}${misconception ? ` Watch out for this common mistake: ${misconception}` : ""}`;
}

function genericLocalReply({ message, labContext, language }) {
  const lang = pickLanguage(message, language);
  const hasSpecificExperiment = Boolean(
    typeof labContext?.experimentIndex === "number" ||
    (typeof labContext?.experimentTitle === "string" && labContext.experimentTitle.trim())
  );

  if (looksLikeGreeting(message, lang)) {
    return lang === "ar"
      ? "أهلاً! اكتب سؤالك العلمي مباشرة، أو اذكر اسم التجربة، وسأساعدك في الفكرة أو الخطوة التالية."
      : "Hi! Ask your science question directly, or name the experiment, and I will help with the idea or the next step.";
  }

  if (!hasSpecificExperiment) {
    return broadSubjectReply({ lang, materialLabel: labContext?.materialLabel });
  }

  const lab = findLab(labContext?.materialId, labContext?.experimentIndex);
  return labSummaryReply({ lang, lab });
}

async function callOpenAI({ messages, apiKey, model = DEFAULT_MODEL, jsonMode = false, maxTokens = 700, requestId, omitTemperature = false, retriedRateLimit = false, retriedForLength = false }) {
  const body = {
    model,
    messages,
    max_tokens: maxTokens
  };
  if (!omitTemperature) {
    body.temperature = FIXED_TEMPERATURE !== null && !Number.isNaN(FIXED_TEMPERATURE)
      ? FIXED_TEMPERATURE
      : (jsonMode ? 0.4 : 0.6);
  }
  if (jsonMode) body.response_format = { type: "json_object" };
  if (DISABLE_THINKING) body.thinking = { type: "disabled" };

  const startedAt = Date.now();
  logStep("agent", "callOpenAI:request", {
    requestId,
    model,
    baseUrl: BASE_URL,
    apiKeyPrefix: maskSecret(apiKey),
    jsonMode,
    maxTokens,
    thinkingDisabled: DISABLE_THINKING,
    messageCount: messages.length
  });

  let response;
  try {
    response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });
  } catch (error) {
    logStep("agent", "callOpenAI:network_error", {
      requestId,
      durationMs: Date.now() - startedAt,
      message: error.message
    });
    throw error;
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");

    // Some OpenAI-compatible providers reject response_format outright.
    // Retry once without it -- parseJsonLoosely can still recover the object.
    if (jsonMode && response.status === 400) {
      logStep("agent", "callOpenAI:retry_without_json_mode", { requestId, status: response.status });
      return callOpenAI({ messages, apiKey, model, jsonMode: false, maxTokens, requestId, omitTemperature, retriedRateLimit, retriedForLength });
    }

    // Some models (eg. reasoning models) only accept their own fixed temperature.
    // Retry once letting the provider default apply instead of our custom value.
    if (!omitTemperature && response.status === 400 && /temperature/i.test(detail)) {
      logStep("agent", "callOpenAI:retry_without_temperature", { requestId, status: response.status });
      return callOpenAI({ messages, apiKey, model, jsonMode, maxTokens, requestId, omitTemperature: true, retriedRateLimit, retriedForLength });
    }

    // A tight per-minute cap can trip on ordinary back-to-back messages.
    // The provider tells us how long to wait -- one short retry beats an
    // immediate fallback to the canned local reply.
    if (!retriedRateLimit && response.status === 429) {
      const waitSeconds = Number(detail.match(/after (\d+(?:\.\d+)?) second/i)?.[1]) || 1.5;
      const waitMs = Math.min(waitSeconds * 1000 + 300, 5000);
      logStep("agent", "callOpenAI:retry_after_rate_limit", { requestId, status: response.status, waitMs });
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      return callOpenAI({ messages, apiKey, model, jsonMode, maxTokens, requestId, omitTemperature, retriedRateLimit: true, retriedForLength });
    }

    logStep("agent", "callOpenAI:error_response", {
      requestId,
      status: response.status,
      durationMs: Date.now() - startedAt,
      detail: detail.slice(0, 300)
    });

    const error = new Error(`Chat completion request failed (${response.status})`);
    error.status = response.status;
    error.detail = detail.slice(0, 500);
    throw error;
  }

  const payload = await response.json();
  const choice = payload.choices?.[0];
  const content = choice?.message?.content?.trim() || "";

  // Reasoning models can spend the whole token budget thinking and leave
  // nothing for the visible answer. Retry once with more room rather than
  // silently returning an empty reply.
  if (!content && choice?.finish_reason === "length" && !retriedForLength) {
    const nextMaxTokens = Math.min(maxTokens * 2, 16000);
    logStep("agent", "callOpenAI:retry_after_empty_length", { requestId, maxTokens, nextMaxTokens });
    return callOpenAI({ messages, apiKey, model, jsonMode, maxTokens: nextMaxTokens, requestId, omitTemperature, retriedRateLimit, retriedForLength: true });
  }

  // Still nothing after a retry (or an empty reply for some other reason) --
  // an empty string is never a useful answer, so treat it as a failure and
  // let the caller fall back to the canned local reply instead of a blank bubble.
  if (!content) {
    logStep("agent", "callOpenAI:empty_content", { requestId, finishReason: choice?.finish_reason });
    const error = new Error("Provider returned an empty reply.");
    error.status = 502;
    throw error;
  }

  logStep("agent", "callOpenAI:success", {
    requestId,
    status: response.status,
    durationMs: Date.now() - startedAt,
    finishReason: choice?.finish_reason,
    replyLength: content.length
  });

  return content;
}

/** Builds the message array for a chat turn, shared by both transports. */
function buildChatMessages({ message, history, labContext, language }) {
  const messages = [{ role: "system", content: buildSystemPrompt({ language }) }];

  const context = buildContextMessage(labContext);
  if (context) messages.push({ role: "system", content: context });

  const languageDirective = buildLanguageDirective(message, language);
  if (languageDirective) messages.push({ role: "system", content: languageDirective });

  messages.push(...normalizeHistory(history));
  messages.push({ role: "user", content: String(message).slice(0, MAX_MESSAGE_CHARS) });

  return messages;
}

/** One chat turn. `history` carries the earlier turns so follow-ups resolve. */
async function askTutor({ message, history, labContext, language, apiKey, model, requestId }) {
  logStep("agent", "askTutor:prompt_built", {
    requestId,
    historyTurns: normalizeHistory(history).length,
    hasLabContext: Boolean(labContext),
    language
  });
  const messages = buildChatMessages({ message, history, labContext, language });
  return callOpenAI({ messages, apiKey, model, maxTokens: 6000, requestId });
}

/**
 * Streams a chat turn token by token.
 *
 * Yields text fragments as the provider produces them. The caller is
 * responsible for reassembling them -- fragments can split mid-word and even
 * mid-escape-sequence, so nothing may interpret a fragment on its own.
 */
async function* streamTutor({ message, history, labContext, language, apiKey, model = DEFAULT_MODEL }) {
  const messages = buildChatMessages({ message, history, labContext, language });

  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 700,
      stream: true
    })
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const error = new Error(`Chat completion request failed (${response.status})`);
    error.status = response.status;
    error.detail = detail.slice(0, 500);
    throw error;
  }

  const decoder = new TextDecoder();
  let buffer = "";

  for await (const chunk of response.body) {
    buffer += decoder.decode(chunk, { stream: true });

    // Server-sent events arrive as "data: {...}" lines separated by newlines.
    // A chunk can end mid-line, so only complete lines are consumed here.
    let newline;
    while ((newline = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);

      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (payload === "[DONE]") return;

      try {
        const token = JSON.parse(payload).choices?.[0]?.delta?.content;
        if (token) yield token;
      } catch {
        // A malformed keep-alive or comment frame; skip it.
      }
    }
  }
}

/**
 * Parses a JSON reply that may not be pure JSON.
 *
 * Providers other than OpenAI often ignore response_format and wrap the object
 * in a ```json fence or a sentence of preamble. Recovering the object here
 * keeps the quiz working across OpenAI-compatible services.
 */
function parseJsonLoosely(raw) {
  const text = String(raw || "").trim();
  if (!text) return null;

  const candidates = [text];

  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) candidates.push(fenced[1].trim());

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    candidates.push(text.slice(firstBrace, lastBrace + 1));
  }

  for (const candidate of candidates) {
    try {
      const value = JSON.parse(candidate);
      if (value && typeof value === "object") return value;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

const QUIZ_CONTRACT = `Respond with a single JSON object holding one key, "questions": an array of question objects. Each question object has "prompt" (string), "options" (array of exactly 3 strings), "answer" (integer, the 0-based index into options of the correct one) and "explanation" (one short sentence saying why it is correct). Every string must be written in the requested language.`;

/** Generates a quiz grounded in one specific lab. */
async function generateQuiz({ materialId, experimentIndex, experimentTitle, language, count = 3, apiKey, model, requestId }) {
  logStep("agent", "generateQuiz:start", { requestId, materialId, experimentIndex, experimentTitle, language, count });
  const lab = findLab(materialId, experimentIndex);
  const languageName = language === "ar" ? "Arabic" : "English";

  const labBlock = lab
    ? [
        `Lab: ${lab.titleEn}`,
        `Concepts: ${lab.concepts.join(" ")}`,
        `How the simulation behaves: ${lab.model.join(" ")}`,
        `Misconceptions worth testing: ${lab.misconceptions.join(" ")}`
      ].join("\n")
    : `Lab: ${experimentTitle || materialId}`;

  const messages = [
    {
      role: "system",
      content: `You write short assessment questions for NAWA LAB, a virtual science laboratory. Write clear, unambiguous multiple-choice questions that test real understanding of the lab rather than recall of wording. Pitch them at a strong secondary-school student, and aim at least one question at a common misconception. ${QUIZ_CONTRACT}`
    },
    {
      role: "user",
      content: `Write ${count} multiple-choice questions in ${languageName} about this lab.\n\n${labBlock}`
    }
  ];

  const raw = await callOpenAI({ messages, apiKey, model, jsonMode: true, maxTokens: 8000, requestId });

  const parsed = parseJsonLoosely(raw);
  if (!parsed) {
    logStep("agent", "generateQuiz:parse_failed", { requestId });
    throw new Error("The model did not return valid quiz JSON.");
  }

  const questions = Array.isArray(parsed.questions) ? parsed.questions : [];
  const clean = questions
    .filter((q) => q && typeof q.prompt === "string" && Array.isArray(q.options) && q.options.length >= 2)
    .map((q) => {
      const options = q.options.slice(0, 4).map(String);
      return {
        prompt: q.prompt,
        options,
        answer: Number.isInteger(q.answer) && q.answer >= 0 && q.answer < options.length ? q.answer : 0,
        explanation: typeof q.explanation === "string" ? q.explanation : ""
      };
    });

  if (!clean.length) {
    logStep("agent", "generateQuiz:no_usable_questions", { requestId });
    throw new Error("The model returned no usable questions.");
  }

  logStep("agent", "generateQuiz:success", { requestId, questionCount: clean.length });
  return clean;
}

module.exports = { askTutor, streamTutor, generateQuiz, buildSystemPrompt, genericLocalReply, DEFAULT_MODEL };
