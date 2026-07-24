const { useEffect, useMemo, useRef, useState } = React;
const CONTENT = window.NAWA_CONTENT;
const { Header, HeroSection, FeaturesSection, ExperimentSection, CTASection, FooterSection, ChatWidget } = window.NawaComponents;

function App() {
  const [language, setLanguage] = useState("ar");
  const [theme, setTheme] = useState("dark");
  const [chatOpen, setChatOpen] = useState(false);
  const [coilTurns, setCoilTurns] = useState(12);
  const [magnetX, setMagnetX] = useState(0.16);
  const [dragging, setDragging] = useState(false);
  const [inducedSignal, setInducedSignal] = useState(0);
  const stageRef = useRef(null);
  const lastMagnetX = useRef(0.16);

  const c = CONTENT[language];
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = isArabic ? "???? ???" : "NAWA LAB";
  }, [language, isArabic]);

  const rotation = useMemo(() => ({ transform: "rotate(102deg) scale(1.17)" }), []);
  const visibleTurns = useMemo(() => Array.from({ length: Math.max(4, Math.min(8, Math.round(coilTurns / 2))) }), [coilTurns]);
  const coilLoopOffsets = useMemo(() => visibleTurns.map((_, index) => 226 + index * 11), [visibleTurns]);
  const bulbPower = Math.max(0, Math.min(1, inducedSignal / 100));
  const magnetSvgX = 152 + magnetX * 188;

  const updateMagnetPosition = (nextPosition) => {
    const clamped = Math.max(0.08, Math.min(0.92, nextPosition));
    const delta = Math.abs(clamped - lastMagnetX.current);
    const coilCenter = 0.58;
    const proximity = Math.max(0, 1 - Math.abs(clamped - coilCenter) / 0.18);
    const movementStrength = delta * 3200;
    const turnFactor = coilTurns / 12;
    const insideBoost = proximity > 0.72 ? 24 * turnFactor : 0;
    const nextSignal = Math.min(100, Math.round(movementStrength * proximity * turnFactor + insideBoost));
    lastMagnetX.current = clamped;
    setMagnetX(clamped);
    setInducedSignal(nextSignal);
  };

  const handleStagePointer = (event) => {
    if (!stageRef.current) return;
    const bounds = stageRef.current.getBoundingClientRect();
    const nextPosition = (event.clientX - bounds.left) / bounds.width;
    updateMagnetPosition(nextPosition);
  };

  useEffect(() => {
    setInducedSignal((current) => Math.min(100, Math.round(current * (0.84 + coilTurns / 24))));
  }, [coilTurns]);

  useEffect(() => {
    if (dragging) return undefined;
    const timer = window.setInterval(() => setInducedSignal((value) => Math.max(0, value - 4)), 90);
    return () => window.clearInterval(timer);
  }, [dragging, coilTurns]);

  return (
    <div className={`app theme-${theme} ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <div className="orb one"></div>
      <div className="orb two"></div>
      <div className="orb three"></div>
      <div className="shell">
        <div className="container">
          <Header c={c} isArabic={isArabic} language={language} theme={theme} onToggleLanguage={() => setLanguage(language === "ar" ? "en" : "ar")} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
          <HeroSection c={c} rotation={rotation} />
          <FeaturesSection c={c} />
          <ExperimentSection c={c} stageRef={stageRef} dragging={dragging} setDragging={setDragging} handleStagePointer={handleStagePointer} coilLoopOffsets={coilLoopOffsets} bulbPower={bulbPower} magnetSvgX={magnetSvgX} inducedSignal={inducedSignal} coilTurns={coilTurns} magnetX={magnetX} setCoilTurns={setCoilTurns} updateMagnetPosition={updateMagnetPosition} />
          <CTASection c={c} />
          <FooterSection c={c} />
          <ChatWidget c={c} chatOpen={chatOpen} setChatOpen={setChatOpen} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
