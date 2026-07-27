const { useEffect, useMemo, useRef, useState } = React;
const CONTENT = window.NAWA_CONTENT;
const { Header, HeroSection, FeaturesSection, ExperimentSection, FAQSection, FooterSection, ChatWidget, LoginPortal } = window.NawaComponents;

function App() {
  const [language, setLanguage] = useState("ar");
  const [theme, setTheme] = useState("dark");
  const [chatOpen, setChatOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [activeProfile, setActiveProfile] = useState(null);
  const [activeMaterial, setActiveMaterial] = useState("physics");
  const [loginForm, setLoginForm] = useState({ name: "", identifier: "", contact: "" });
  const [chemSettings, setChemSettings] = useState({
    anode: "Zn",
    cathode: "Cu",
    electrolyteLeft: "ZnSO4",
    electrolyteRight: "CuSO4",
    saltBridge: "KNO3",
    connected: true,
    lampOn: true,
    timeSpeed: 1
  });
  const [chemTrend, setChemTrend] = useState([]);
  const [bioSettings, setBioSettings] = useState({
    lightOn: true,
    water: 74,
    co2: 62,
    o2: 48,
    temperature: 26,
    timeSpeed: 1
  });
  const [bioTrend, setBioTrend] = useState([]);
  const [coilTurns, setCoilTurns] = useState(12);
  const [magnetX, setMagnetX] = useState(0.16);
  const [dragging, setDragging] = useState(false);
  const [inducedSignal, setInducedSignal] = useState(0);
  const stageRef = useRef(null);
  const lastMagnetX = useRef(0.16);

  const c = CONTENT[language];
  const isArabic = language === "ar";
  const activeProfileLabel = activeProfile ? `${c.loginRoles[activeProfile.role].title}: ${activeProfile.name}` : "";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = isArabic ? "مختبر نوى" : "NAWA LAB";
  }, [language, isArabic]);

  const rotation = useMemo(() => ({ transform: "rotate(102deg) scale(1.17)" }), []);
  const visibleTurns = useMemo(() => Array.from({ length: Math.max(4, Math.min(8, Math.round(coilTurns / 2))) }), [coilTurns]);
  const coilLoopOffsets = useMemo(() => visibleTurns.map((_, index) => 226 + index * 11), [visibleTurns]);
  const bulbPower = Math.max(0, Math.min(1, inducedSignal / 100));
  const magnetSvgX = 152 + magnetX * 188;
  const bioMetrics = useMemo(() => {
    const waterFactor = bioSettings.water / 100;
    const co2Factor = bioSettings.co2 / 100;
    const o2Factor = bioSettings.o2 / 100;
    const lightFactor = bioSettings.lightOn ? 1 : 0;
    const tempPenalty = Math.max(0, 1 - Math.abs(bioSettings.temperature - 27) / 20);
    const basePhoto = lightFactor * waterFactor * co2Factor * tempPenalty * 100;
    const respirationBase = Math.max(20, 26 + o2Factor * 24 + (bioSettings.temperature - 20) * 1.9 + bioSettings.timeSpeed * 5);
    const respirationRate = Math.round(Math.min(100, respirationBase));
    const photosynthesisRate = Math.round(Math.min(100, basePhoto));
    const oxygenProduced = Math.round(photosynthesisRate * 0.82);
    const carbonDioxideConsumed = Math.round(photosynthesisRate * 0.76);
    const carbonDioxideReleased = Math.round(respirationRate * 0.41);
    const glucoseProduced = Math.round(photosynthesisRate * 0.63);
    const atpProduced = Math.round(respirationRate * 0.72 + glucoseProduced * 0.18);
    const plantState = !bioSettings.lightOn && waterFactor < 0.35
      ? "wilted"
      : photosynthesisRate < 35 || waterFactor < 0.45
        ? "slight"
        : "healthy";

    let feedback = c.bioFeedbackActive;
    if (!bioSettings.lightOn) {
      feedback = c.bioFeedbackNoLight;
    } else if (bioSettings.water < 20) {
      feedback = c.bioFeedbackNoWater;
    } else if (bioSettings.co2 < 25) {
      feedback = c.bioFeedbackLowCo2;
    }
    const respirationFeedback = !bioSettings.lightOn ? c.bioFeedbackRespirationDark : c.bioFeedbackRespirationNormal;

    return {
      photosynthesisRate,
      respirationRate,
      oxygenProduced,
      carbonDioxideConsumed,
      carbonDioxideReleased,
      glucoseProduced,
      atpProduced,
      plantState,
      feedback,
      respirationFeedback
    };
  }, [bioSettings, c]);

  const chemMetrics = useMemo(() => {
    const electrodeStrength = {
      Zn: 1,
      Fe: 0.74,
      Mg: 1.22,
      Cu: 0.52,
      Ag: 0.64,
      Ni: 0.58
    };
    const solutionStrength = {
      ZnSO4: 1,
      CuSO4: 1,
      AgNO3: 1.08,
      FeSO4: 0.82,
      HCl: 0.76,
      NaCl: 0.68,
      H2SO4: 0.9,
      MgSO4: 0.88
    };
    const bridgeFactor = {
      KNO3: 1,
      NaCl: 0.82,
      KCl: 0.9,
      none: 0.1
    };

    const sameElectrodePenalty = chemSettings.anode === chemSettings.cathode ? 0.18 : 1;
    const polarityGap = Math.abs((electrodeStrength[chemSettings.anode] || 0.5) - (electrodeStrength[chemSettings.cathode] || 0.5));
    const electrolyteFactor = ((solutionStrength[chemSettings.electrolyteLeft] || 0.8) + (solutionStrength[chemSettings.electrolyteRight] || 0.8)) / 2;
    const wiringFactor = chemSettings.connected ? 1 : 0.08;
    const lampFactor = chemSettings.lampOn ? 1 : 0.92;
    const speedFactor = 1 + chemSettings.timeSpeed * 0.06;
    const bridgeSupport = bridgeFactor[chemSettings.saltBridge] || 0.4;
    const rawVoltage = polarityGap * 1.85 * electrolyteFactor * bridgeSupport * sameElectrodePenalty * wiringFactor * lampFactor;
    const voltage = Number(Math.max(0, Math.min(1.95, rawVoltage)).toFixed(2));
    const current = Number((voltage * 10.6 * speedFactor).toFixed(1));
    const electrons = Number((current / 5000).toExponential(2));
    const ionsMoved = Math.round(current * 7.2);
    const cellReady = chemSettings.connected && chemSettings.saltBridge !== "none" && chemSettings.anode !== chemSettings.cathode;
    const status = voltage >= 1.2 ? "high" : voltage >= 0.6 ? "medium" : "low";
    const feedback = !chemSettings.connected
      ? c.chemFeedbackDisconnected
      : chemSettings.saltBridge === "none"
        ? c.chemFeedbackNoBridge
        : chemSettings.anode === chemSettings.cathode
          ? c.chemFeedbackSameElectrode
          : c.chemFeedbackWorking;

    return {
      voltage,
      current,
      electrons,
      ionsMoved,
      cellReady,
      status,
      feedback
    };
  }, [chemSettings, c]);

  useEffect(() => {
    const tickMs = Math.max(220, 1100 / bioSettings.timeSpeed);
    const timer = window.setInterval(() => {
      setBioTrend((current) => {
        const nextPoint = {
          oxygen: bioMetrics.oxygenProduced,
          carbon: Math.max(0, bioMetrics.carbonDioxideReleased - Math.round(bioMetrics.carbonDioxideConsumed * 0.4))
        };
        return [...current.slice(-11), nextPoint];
      });
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [bioMetrics, bioSettings.timeSpeed]);

  useEffect(() => {
    const tickMs = Math.max(280, 1200 / chemSettings.timeSpeed);
    const timer = window.setInterval(() => {
      setChemTrend((current) => {
        const nextPoint = {
          voltage: chemMetrics.voltage,
          current: chemMetrics.current
        };
        return [...current.slice(-11), nextPoint];
      });
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [chemMetrics, chemSettings.timeSpeed]);

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

  const handleOpenLogin = () => setLoginOpen(true);

  const handleCloseLogin = () => {
    setLoginOpen(false);
  };

  const handleSubmitLogin = () => {
    const fallbackName = c.loginRoles[selectedRole].title;
    setActiveProfile({
      role: selectedRole,
      name: loginForm.name.trim() || fallbackName
    });
    setLoginOpen(false);
  };

  const resetBiologyExperiment = () => {
    setBioSettings({
      lightOn: true,
      water: 74,
      co2: 62,
      o2: 48,
      temperature: 26,
      timeSpeed: 1
    });
    setBioTrend([]);
  };

  const resetChemistryExperiment = () => {
    setChemSettings({
      anode: "Zn",
      cathode: "Cu",
      electrolyteLeft: "ZnSO4",
      electrolyteRight: "CuSO4",
      saltBridge: "KNO3",
      connected: true,
      lampOn: true,
      timeSpeed: 1
    });
    setChemTrend([]);
  };

  return (
    <div className={`app theme-${theme} ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <div className="orb one"></div>
      <div className="orb two"></div>
      <div className="orb three"></div>
      <div className="shell">
        <div className="container">
          <Header c={c} isArabic={isArabic} language={language} theme={theme} onToggleLanguage={() => setLanguage(language === "ar" ? "en" : "ar")} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} onOpenLogin={handleOpenLogin} activeProfile={activeProfileLabel} />
          <HeroSection c={c} rotation={rotation} onOpenLogin={handleOpenLogin} />
          <FeaturesSection c={c} />
          <ExperimentSection c={c} activeMaterial={activeMaterial} setActiveMaterial={setActiveMaterial} stageRef={stageRef} dragging={dragging} setDragging={setDragging} handleStagePointer={handleStagePointer} coilLoopOffsets={coilLoopOffsets} bulbPower={bulbPower} magnetSvgX={magnetSvgX} inducedSignal={inducedSignal} coilTurns={coilTurns} magnetX={magnetX} setCoilTurns={setCoilTurns} updateMagnetPosition={updateMagnetPosition} bioSettings={bioSettings} setBioSettings={setBioSettings} bioMetrics={bioMetrics} bioTrend={bioTrend} resetBiologyExperiment={resetBiologyExperiment} chemSettings={chemSettings} setChemSettings={setChemSettings} chemMetrics={chemMetrics} chemTrend={chemTrend} resetChemistryExperiment={resetChemistryExperiment} />
          <FAQSection c={c} />
          <FooterSection c={c} />
          <ChatWidget c={c} chatOpen={chatOpen} setChatOpen={setChatOpen} />
          <LoginPortal c={c} loginOpen={loginOpen} selectedRole={selectedRole} setSelectedRole={setSelectedRole} loginForm={loginForm} setLoginForm={setLoginForm} onClose={handleCloseLogin} onSubmit={handleSubmitLogin} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
