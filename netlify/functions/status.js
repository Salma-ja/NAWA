exports.handler = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    ok: true,
    aiConnected: Boolean(process.env.OPENAI_API_KEY)
  })
});
