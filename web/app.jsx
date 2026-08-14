const { useEffect, useMemo, useRef, useState } = React;
const CONTENT = window.NAWA_CONTENT;
const { Header, HeroSection, FeaturesSection, ExperimentSection, FAQSection, FooterSection, ChatWidget, LoginPortal, TeacherDashboard, QuizPage } = window.NawaComponents;

function App() {
  const [language, setLanguage] = useState("ar");
  const [theme, setTheme] = useState("dark");
  const [chatOpen, setChatOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [loginSubmitting, setLoginSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [activeProfile, setActiveProfile] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [currentView, setCurrentView] = useState("home");
  const [quizContext, setQuizContext] = useState(null);
  const [activeMaterial, setActiveMaterial] = useState("physics");
  const [loginForm, setLoginForm] = useState({ name: "", email: "", password: "", teacherAccessCode: "" });
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
  const isTeacher = activeProfile?.role === "teacher";
  const activeProfileLabel = activeProfile ? `${c.loginRoles[activeProfile.role].title}: ${activeProfile.name}` : "";

  useEffect(() => {
    const savedSession = window.NawaLocalPlatform?.loadSession?.();
    if (!savedSession?.profile || !savedSession?.token) return;
    setActiveProfile(savedSession.profile);
    setAuthToken(savedSession.token);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = isArabic ? "\u0645\u062e\u062a\u0628\u0631 \u0646\u0648\u0627\u0629" : "NAWA LAB";
  }, [language, isArabic]);

  const rotation = useMemo(() => ({ transform: "rotate(102deg) scale(1.17)" }), []);
  const visibleTurns = useMemo(() => Array.from({ length: Math.max(2, Math.min(9, Math.round(coilTurns / 2) + 1)) }), [coilTurns]);
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
    const ionLabels = {
      Zn: "Zn2+",
      Fe: "Fe2+",
      Mg: "Mg2+",
      Cu: "Cu2+",
      Ag: "Ag+",
      Ni: "Ni2+"
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
    const zincMass = Number((0.76 + Math.max(0, (1.2 - voltage) * 0.28)).toFixed(2));
    const copperMass = Number((1.24 + voltage * 0.24).toFixed(2));
    const znConcentration = Number((0.98 + voltage * 0.08).toFixed(2));
    const cuConcentration = Number((0.92 - voltage * 0.12).toFixed(2));
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
      feedback,
      zincMass,
      copperMass,
      znConcentration,
      cuConcentration,
      anodeIon: ionLabels[chemSettings.anode] || `${chemSettings.anode}2+`,
      cathodeIon: ionLabels[chemSettings.cathode] || `${chemSettings.cathode}2+`
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

  const handleOpenLogin = () => {
    setAuthMode("login");
    setLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setLoginOpen(false);
    setLoginError("");
    setLoginSubmitting(false);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoginSubmitting(true);
    try {
      const payload = authMode === "register"
        ? {
            name: loginForm.name.trim(),
            role: selectedRole,
            email: loginForm.email.trim(),
            password: loginForm.password,
            teacherAccessCode: loginForm.teacherAccessCode.trim()
          }
        : {
            role: selectedRole,
            email: loginForm.email.trim(),
            password: loginForm.password
          };

    
const endpoint = authMode === "register"
  ? "/api/auth/register"
  : "/api/auth/login";
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
const result = await response.json().catch(() => ({}));
if (!response.ok) {
  setLoginError(result.message || result.error || c.loginErrorGeneric);
  return;
}

// Enforce role match — teacher can't log in from student portal and vice versa
const profile = result.profile || { name: result.name, role: result.role, email: payload.email };
if (!profile?.name || !profile?.role) {
  setLoginError(c.loginErrorGeneric);
  return;
}

setActiveProfile(profile);
setAuthToken(result.token || "");
      setCurrentView("home");
      setLoginOpen(false);
      setAuthMode("login");
      setLoginForm({ name: "", email: "", password: "", teacherAccessCode: "" });
    } catch (error) {
      setLoginError(error?.message || c.loginErrorNetwork);
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleLogout = () => {
    setActiveProfile(null);
    setAuthToken("");
    setCurrentView("home");
    setLoginForm({ name: "", email: "", password: "", teacherAccessCode: "" });
  };

  const handleOpenDashboard = () => {
    if (!isTeacher) return;
    setCurrentView("dashboard");
  };

  const handleOpenHome = () => setCurrentView("home");

  const handleOpenQuiz = (payload) => {
    setQuizContext(payload);
    setCurrentView("quiz");
  };

  const chatContext = useMemo(() => {
    const materialLabels = {
      physics: c.subjects?.[0]?.name || "Physics",
      chemistry: c.subjects?.[1]?.name || "Chemistry",
      biology: c.subjects?.[2]?.name || "Biology"
    };

    const state =
      activeMaterial === "physics"
        ? { coilTurns, magnetX, inducedSignal, dragging }
        : activeMaterial === "chemistry"
          ? chemSettings
          : bioSettings;

    return {
      materialId: activeMaterial,
      materialLabel: materialLabels[activeMaterial] || activeMaterial,
      state
    };
  }, [activeMaterial, bioSettings, c.subjects, chemSettings, coilTurns, dragging, inducedSignal, magnetX]);

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
          <Header c={c} isArabic={isArabic} language={language} theme={theme} onToggleLanguage={() => setLanguage(language === "ar" ? "en" : "ar")} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} onOpenLogin={handleOpenLogin} activeProfile={activeProfileLabel} onOpenDashboard={handleOpenDashboard} isTeacher={isTeacher} onLogout={handleLogout} />
          {currentView === "dashboard" ? (
            <TeacherDashboard c={c} activeProfile={activeProfile} authToken={authToken} onBack={handleOpenHome} />
          ) : currentView === "quiz" ? (
            <QuizPage c={c} quizContext={quizContext} onBack={handleOpenHome} authToken={authToken} />
          ) : (
            <>
              <HeroSection c={c} rotation={rotation} onOpenLogin={handleOpenLogin} />
              <ExperimentSection c={c} activeProfile={activeProfile} activeMaterial={activeMaterial} setActiveMaterial={setActiveMaterial} stageRef={stageRef} dragging={dragging} setDragging={setDragging} handleStagePointer={handleStagePointer} coilLoopOffsets={coilLoopOffsets} bulbPower={bulbPower} magnetSvgX={magnetSvgX} inducedSignal={inducedSignal} coilTurns={coilTurns} magnetX={magnetX} setCoilTurns={setCoilTurns} updateMagnetPosition={updateMagnetPosition} bioSettings={bioSettings} setBioSettings={setBioSettings} bioMetrics={bioMetrics} bioTrend={bioTrend} resetBiologyExperiment={resetBiologyExperiment} chemSettings={chemSettings} setChemSettings={setChemSettings} chemMetrics={chemMetrics} chemTrend={chemTrend} resetChemistryExperiment={resetChemistryExperiment} onOpenQuiz={handleOpenQuiz} />
              <FeaturesSection c={c} />
              <FAQSection c={c} />
              <FooterSection c={c} />
            </>
          )}
          <ChatWidget c={c} chatOpen={chatOpen} setChatOpen={setChatOpen} labContext={chatContext} language={language} />
          <LoginPortal c={c} loginOpen={loginOpen} authMode={authMode} setAuthMode={setAuthMode} selectedRole={selectedRole} setSelectedRole={setSelectedRole} loginForm={loginForm} setLoginForm={setLoginForm} loginError={loginError} loginSubmitting={loginSubmitting} onClose={handleCloseLogin} onSubmit={handleSubmitLogin} />
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
