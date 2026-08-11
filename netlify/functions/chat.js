const { askTutor } = require("../../web/agent/agent");

function readJsonBody(event) {
  try {
    return event.body ? JSON.parse(event.body) : {};
  } catch {
    return null;
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ message: "Method not allowed" }) };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      statusCode: 503,
      body: JSON.stringify({ message: "The tutor is not connected yet. Add OPENAI_API_KEY in Netlify environment variables." })
    };
  }

  const body = readJsonBody(event);
  if (!body) {
    return { statusCode: 400, body: JSON.stringify({ message: "Could not read the chat request." }) };
  }

  const message = String(body.message || "").trim();
  if (!message) {
    return { statusCode: 400, body: JSON.stringify({ message: "Enter a message first." }) };
  }

  try {
    const reply = await askTutor({
      message,
      history: Array.isArray(body.history) ? body.history : [],
      labContext: body.labContext || null,
      language: String(body.language || "ar").toLowerCase() === "en" ? "en" : "ar",
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL
    });

    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (error) {
    return {
      statusCode: error.status || 500,
      body: JSON.stringify({ message: error.message || "Could not reach the tutor." })
    };
  }
};
