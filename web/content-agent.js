/**
 * UI strings for the AI tutor. Loaded last so it wins over content.js
 * and content-overrides.js.
 *
 * These are interface labels only. Nothing here is an answer -- every reply
 * the student sees comes from the agent at runtime.
 */
Object.assign(window.NAWA_CONTENT.en, {
  chatName: "Jarreeb",
  chatTitle: "NAWA Science Tutor",
  chatWelcome: "Ask me anything about the experiment you are running - how it works, why a reading changed, or what a result means. I can explain it, hint at the next step, or quiz you.",
  chatLabel: "Try asking",
  chatQuickExplain: "Explain this experiment",
  chatQuickHint: "Give me a hint",
  chatQuickQuiz: "Quiz me on this lab",
  chatPlaceholder: "Ask about this lab...",
  chatSendLabel: "Send",
  chatThinking: "Thinking...",
  chatClear: "New chat",
  chatExpand: "Expand",
  chatCollapse: "Shrink",
  chatContextNone: "No experiment open",
  chatContextPrefix: "Working on",
  chatNotConfigured: "The tutor is not connected yet. Add your OpenAI API key to web/.env and restart the server.",
  chatErrorGeneric: "Something went wrong reaching the tutor. Please try again.",
  chatRetry: "Retry",
  chatDisclaimer: "AI can make mistakes. Check anything important against your lab results."
});

Object.assign(window.NAWA_CONTENT.ar, {
  chatName: "جريب",
  chatTitle: "مرشد نواة العلمي",
  chatWelcome: "اسألني أي شيء عن التجربة التي تشغّلها: كيف تعمل، لماذا تغيّرت القراءة، أو ماذا تعني النتيجة. أستطيع أن أشرح، أو أعطيك تلميحًا، أو أختبرك.",
  chatLabel: "جرّب أن تسأل",
  chatQuickExplain: "اشرح لي هذه التجربة",
  chatQuickHint: "أعطني تلميحًا",
  chatQuickQuiz: "اختبرني في هذا المختبر",
  chatPlaceholder: "اسأل عن هذا المختبر...",
  chatSendLabel: "إرسال",
  chatThinking: "يفكّر...",
  chatClear: "محادثة جديدة",
  chatExpand: "تكبير",
  chatCollapse: "تصغير",
  chatContextNone: "لا توجد تجربة مفتوحة",
  chatContextPrefix: "تعمل على",
  chatNotConfigured: "المرشد غير متصل بعد. أضف مفتاح OpenAI في ملف web/.env ثم أعد تشغيل الخادم.",
  chatErrorGeneric: "تعذّر الوصول إلى المرشد. حاول مرة أخرى.",
  chatRetry: "إعادة المحاولة",
  chatDisclaimer: "قد يخطئ الذكاء الاصطناعي. تحقّق من المعلومات المهمة مع نتائج مختبرك."
});

/* Quiz page: AI-generated questions */
Object.assign(window.NAWA_CONTENT.en, {
  quizAiGenerate: "Generate new questions with AI",
  quizAiLoading: "Writing your questions...",
  quizAiBadge: "AI generated",
  quizAiFailed: "Could not generate questions right now. Showing the standard set instead.",
  quizExplanationLabel: "Why",
  quizAnswerCorrect: "Correct",
  quizAnswerWrong: "Not quite"
});

Object.assign(window.NAWA_CONTENT.ar, {
  quizAiGenerate: "ولّد أسئلة جديدة بالذكاء الاصطناعي",
  quizAiLoading: "يجري إعداد الأسئلة...",
  quizAiBadge: "من إنشاء الذكاء الاصطناعي",
  quizAiFailed: "تعذّر توليد الأسئلة الآن. سيتم عرض المجموعة الأساسية.",
  quizExplanationLabel: "السبب",
  quizAnswerCorrect: "إجابة صحيحة",
  quizAnswerWrong: "ليست صحيحة"
});
