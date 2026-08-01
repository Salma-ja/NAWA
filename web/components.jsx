const { useEffect, useState } = React;

const Counter = ({ target, suffix = "", duration = 1600 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const step = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <>{count}{suffix}</>;
};

const FeatureIcon = ({ type }) => {
  if (type === "simulation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19h16" />
        <path d="M6 16l3-4 3 2 4-6 2 3" />
        <circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="16" cy="8" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "coach") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 1 6 6c0 2.2-1.2 3.9-3 5l-1 3h-4l-1-3c-1.8-1.1-3-2.8-3-5a6 6 0 0 1 6-6Z" />
        <path d="M9 21h6" />
        <path d="M10 10a2 2 0 1 1 4 0c0 1.2-.8 1.7-1.4 2.2-.4.3-.6.6-.6 1.3" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l2 2 4-4" />
      <path d="M21 12c0 4.5-4 8-9 9-5-1-9-4.5-9-9V6l9-3 9 3v6Z" />
    </svg>
  );
};

const OrbitMark = () => (
  <span className="brand-mark">
    <svg className="brand-logo-svg" viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="nawaCoreGlow" cx="50%" cy="50%" r="62%">
          <stop offset="0%" stopColor="rgba(139, 116, 255, 0.95)" />
          <stop offset="55%" stopColor="rgba(85, 137, 255, 0.62)" />
          <stop offset="100%" stopColor="rgba(85, 137, 255, 0)" />
        </radialGradient>
        <radialGradient id="nawaCoreFill" cx="36%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#8dc3ff" />
          <stop offset="35%" stopColor="#6f93ff" />
          <stop offset="100%" stopColor="#6857f5" />
        </radialGradient>
        <linearGradient id="nawaOrbitBlue" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#53a7ff" />
          <stop offset="100%" stopColor="#1e66dd" />
        </linearGradient>
        <linearGradient id="nawaOrbitViolet" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#7d4cff" />
          <stop offset="100%" stopColor="#5a39df" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="61" height="61" rx="16" className="brand-logo-frame" />
      <circle cx="32" cy="33" r="15" fill="url(#nawaCoreGlow)" className="brand-logo-glow" />
      <g className="brand-core-shell">
        <ellipse cx="32" cy="33" rx="10.5" ry="10.8" fill="url(#nawaCoreFill)" className="brand-core-body" />
        <ellipse cx="30.4" cy="29.4" rx="3.1" ry="4.8" fill="rgba(255,255,255,0.16)" className="brand-core-shine" />
      </g>
      <g className="brand-orbit-blue">
        <ellipse cx="31.5" cy="33" rx="20" ry="8.4" transform="rotate(-42 31.5 33)" fill="none" stroke="url(#nawaOrbitBlue)" strokeWidth="1.55" />
        <circle cx="17.2" cy="27.9" r="1.2" fill="#6aa8ff" />
      </g>
      <g className="brand-orbit-violet">
        <ellipse cx="31.6" cy="32.6" rx="17.4" ry="8.1" transform="rotate(29 31.6 32.6)" fill="none" stroke="url(#nawaOrbitViolet)" strokeWidth="1.55" />
        <circle cx="44.5" cy="37.6" r="1.15" fill="#9b7cf5" />
      </g>
      <g className="brand-orbit-inner">
        <ellipse cx="31.7" cy="33" rx="6" ry="12" fill="none" stroke="rgba(112,165,255,0.56)" strokeWidth="1.15" />
        <circle cx="40.3" cy="20.5" r="0.9" fill="#3e7def" />
      </g>
    </svg>
  </span>
);

const HeroScienceGlyph = ({ type }) => {
  if (type === "physics") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <rect x="9" y="44" width="54" height="6" rx="3" fill="rgba(113,163,255,0.18)" />
        <circle cx="24" cy="47" r="8" fill="#4f8fff" />
        <circle cx="50" cy="47" r="8" fill="#ff5f82" />
        <path d="M24 47h26" stroke="rgba(255,255,255,0.46)" strokeWidth="3" strokeLinecap="round" />
        <path d="M17 28c4-5 10-7 18-7" stroke="#89e8ff" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 20l-8 1 3 7" stroke="#89e8ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "chemistry") {
    return (
      <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <path d="M28 11h16" stroke="#d8e9ff" strokeWidth="4" strokeLinecap="round" />
        <path d="M33 12v18l-11 18a8 8 0 0 0 7 12h14a8 8 0 0 0 7-12L39 30V12" stroke="rgba(222,235,255,0.9)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 44c4-3 7-4 11-4 7 0 10 6 16 6 2 0 4-.4 6-1.4" stroke="#6ff3c7" strokeWidth="3" strokeLinecap="round" />
        <circle cx="31" cy="49" r="3" fill="#8ae0ff" />
        <circle cx="40" cy="53" r="4" fill="#4f8fff" />
        <circle cx="48" cy="47" r="3" fill="#b48cff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <path d="M36 58c10 0 18-8 18-18 0-6-3-12-8-15 0-11-7-18-18-18S10 15 10 25c0 3 .6 5.9 1.8 8.4C8.2 36 6 40 6 44c0 8 6 14 14 14h16Z" fill="rgba(43,184,120,0.18)" stroke="rgba(124,242,183,0.9)" strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 52V28" stroke="#aaf5c9" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M36 36c-7 0-11-4-13-10" stroke="#8ef0ba" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 42c6 0 11-3 14-9" stroke="#8ef0ba" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 31c5 0 9-3 11-7" stroke="#8ef0ba" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

const Header = ({ c, language, onToggleLanguage, onOpenLogin, activeProfile, onOpenDashboard, isTeacher }) => (
  <header className="nav">
    <a className="brand" href="#home">
      <OrbitMark />
      <span className="brand-wordmark">NAWA LAB</span>
    </a>
    <nav className="nav-links">
      <a href="#features">{c.nav[0]}</a>
      <a href="#experience">{c.nav[1]}</a>
      <a href="#faq">{c.nav[2]}</a>
      <a href="#contact">{c.nav[3]}</a>
    </nav>
    <div className="nav-actions">
      <button className="btn lang-btn" onClick={onToggleLanguage}>
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9"></circle>
          <path d="M3 12h18"></path>
          <path d="M12 3a15 15 0 0 1 0 18"></path>
          <path d="M12 3a15 15 0 0 0 0 18"></path>
        </svg>
        <span>{language === "ar" ? "AR" : "EN"}</span>
      </button>
      {activeProfile ? <div className="profile-pill">{activeProfile}</div> : null}
      {isTeacher ? <button className="btn btn-secondary" type="button" onClick={onOpenDashboard}>{c.teacherDashboardButton}</button> : null}
      <button className="btn btn-primary" type="button" onClick={onOpenLogin}>{c.launchDemo}</button>
    </div>
  </header>
);

const HeroSection = ({ c, rotation }) => {
  const heroTags = c.heroTags || [c.liveSimulation, c.aiSignal, c.features?.[1]?.title].filter(Boolean);
  const scienceNodes = [
    {
      key: "physics",
      title: c.heroPhysicsTitle || "Physics",
      text: c.heroPhysicsText || c.experimentList?.[1]?.text || "",
      badge: c.heroPhysicsBadge || c.physicsLabTag || "Physics",
      style: { top: "8%", right: "8%" }
    },
    {
      key: "chemistry",
      title: c.heroChemistryTitle || "Chemistry",
      text: c.heroChemistryText || c.materials?.find((item) => item.id === "chemistry")?.experiments?.[0]?.text || "",
      badge: c.heroChemistryBadge || "Chemistry",
      style: { bottom: "18%", right: "2%" }
    },
    {
      key: "biology",
      title: c.heroBiologyTitle || "Biology",
      text: c.heroBiologyText || c.materials?.find((item) => item.id === "biology")?.experiments?.[0]?.text || "",
      badge: c.heroBiologyBadge || "Biology",
      style: { bottom: "6%", left: "4%" }
    }
  ];

  return (
    <main id="home" className="hero hero-nucleus">
      <div className="hero-copy">
        <div className="eyebrow">
          <span>*</span>
          <span>{c.eyebrow}</span>
        </div>
        <h1>{c.heroTitleBefore} <span>{c.heroTitleAccent}</span><br />{c.heroTitleAfter}</h1>
        <p>{c.heroText}</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#experience">{c.heroPrimaryCta || c.start}</a>
        </div>
        <div className="hero-tag-row">
          {heroTags.map((tag) => (
            <span className="hero-tag" key={tag}>{tag}</span>
          ))}
        </div>
        <div className="hero-stats">
          {c.stats.slice(1).map((stat) => (
            <div className="stat" key={stat.label}>
              <div className="stat-value"><Counter target={stat.value} suffix={stat.suffix} /></div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="dashboard hero-lab">
          <div className="visual-top">
            <div className="window-dots"><span></span><span></span><span></span></div>
            <div className="mini-chip">{c.heroVisualChip || c.liveSimulation}</div>
          </div>
          <div className="nucleus-stage">
            <div className="nucleus-rings">
              <div className="nucleus-ring ring-a"></div>
              <div className="nucleus-ring ring-b"></div>
              <div className="nucleus-ring ring-c"></div>
              <div className="nucleus-core" style={rotation}>
                <span className="nucleus-pulse"></span>
                <strong>{c.heroCoreLabel || "NAWA"}</strong>
                <small>{c.heroCoreSubLabel || "Nucleus of Science"}</small>
              </div>
              <div className="nucleus-orbit-dot orbit-dot-a"></div>
              <div className="nucleus-orbit-dot orbit-dot-b"></div>
              <div className="nucleus-orbit-dot orbit-dot-c"></div>
            </div>
            {scienceNodes.map((node) => (
              <article className={`science-preview ${node.key}`} key={node.key} style={node.style}>
                <div className="science-preview-art"><HeroScienceGlyph type={node.key} /></div>
                <div className="science-preview-copy">
                  <span className="science-preview-badge">{node.badge}</span>
                  <h3>{node.title}</h3>
                  <p>{node.text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="hero-sticker">{c.heroMeaningTag || c.aiSignal}</div>
        </div>
      </div>
    </main>
  );
};

const FeaturesSection = ({ c }) => (
  <section id="features">
    <div className="section-head"><div><h2>{c.featuresTitle}</h2><p>{c.featuresText}</p></div></div>
    <div className="grid-3">
      {c.features.map((feature) => (
        <article className="card" key={feature.title}>
          <div className="icon-badge"><FeatureIcon type={feature.icon} /></div>
          <h3>{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </div>
  </section>
);

const ExperimentScene = ({ stageRef, dragging, setDragging, handleStagePointer, coilLoopOffsets, bulbPower, magnetSvgX }) => (
  <div className="induction-stage" ref={stageRef} onPointerDown={(event) => { setDragging(true); event.currentTarget.setPointerCapture(event.pointerId); handleStagePointer(event); }} onPointerMove={(event) => { if (!dragging) return; handleStagePointer(event); }} onPointerUp={(event) => { setDragging(false); event.currentTarget.releasePointerCapture(event.pointerId); }}>
    <svg className="induction-svg" viewBox="0 0 420 260" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="bulbGlowSvg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255,244,170,0.95)" /><stop offset="45%" stopColor="rgba(255,232,124,0.55)" /><stop offset="100%" stopColor="rgba(255,232,124,0)" /></radialGradient>
        <linearGradient id="bulbGlassSvg" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" stopColor="#fffef0" /><stop offset="55%" stopColor="#ece0a8" /><stop offset="100%" stopColor="#b8b3a6" /></linearGradient>
        <linearGradient id="socketSvg" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stopColor="#d9d9d9" /><stop offset="100%" stopColor="#8d8d8d" /></linearGradient>
        <linearGradient id="northSvg" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stopColor="#ff5c7a" /><stop offset="100%" stopColor="#d82747" /></linearGradient>
        <linearGradient id="southSvg" x1="0%" x2="0%" y1="0%" y2="100%"><stop offset="0%" stopColor="#3da5ff" /><stop offset="100%" stopColor="#1267d6" /></linearGradient>
      </defs>
      <line x1="0" y1="246" x2="420" y2="246" stroke="rgba(60,94,124,0.38)" strokeWidth="2" />
      <ellipse cx="45" cy="56" rx={28 + bulbPower * 8} ry={28 + bulbPower * 8} fill="url(#bulbGlowSvg)" opacity={bulbPower} />
      <g transform="translate(22 22) rotate(-18 28 28)"><path d="M16 10 C4 18, 4 46, 24 56 C40 64, 62 58, 68 40 C74 22, 58 2, 36 2 C28 2, 22 4, 16 10 Z" fill="url(#bulbGlassSvg)" stroke="rgba(72,72,72,0.45)" strokeWidth="2" /><path d="M28 18 C24 22, 24 34, 30 40" className="wire-stroke" style={{ stroke: "rgba(92,92,92,0.65)", strokeWidth: 2 }} /><path d="M36 16 C32 22, 32 36, 38 44" className="wire-stroke" style={{ stroke: "rgba(92,92,92,0.65)", strokeWidth: 2 }} /><rect x="62" y="24" width="22" height="18" rx="4" fill="url(#socketSvg)" stroke="rgba(60,60,60,0.35)" strokeWidth="1.2" /></g>
      <path className="wire-stroke" d="M86 70 L86 134 L214 134" /><path className="wire-stroke" d="M100 70 L100 148 L214 148" />
      <g opacity={0.96}>{coilLoopOffsets.map((cx, index) => <ellipse key={index} className="coil-loop" cx={cx} cy="141" rx="18" ry="45" />)}</g>
      <ellipse cx="264" cy="141" rx={34 + bulbPower * 8} ry={50 + bulbPower * 9} fill="rgba(255,232,124,0.08)" opacity={0.18 + bulbPower * 0.42} />
      <line x1="282" y1="141" x2="356" y2="141" stroke="rgba(76,110,145,0.3)" strokeWidth="2" />
      <g transform={`translate(${magnetSvgX} 141)`}><rect x="-48" y="-20" width="48" height="40" rx="6" fill="url(#northSvg)" stroke="rgba(120,30,48,0.3)" strokeWidth="1" /><rect x="0" y="-20" width="48" height="40" rx="6" fill="url(#southSvg)" stroke="rgba(18,60,130,0.3)" strokeWidth="1" /><text className="magnet-label" x="-24" y="1">N</text><text className="magnet-label" x="24" y="1">S</text></g>
      <g className="field-stroke"><line x1={magnetSvgX} y1="88" x2={magnetSvgX} y2="108" /><path d={`M${magnetSvgX} 84 l-5 7 h10 z`} fill="#6aa05b" stroke="none" /><line x1={magnetSvgX} y1="174" x2={magnetSvgX} y2="154" /><path d={`M${magnetSvgX} 178 l-5 -7 h10 z`} fill="#6aa05b" stroke="none" /><line x1={magnetSvgX - 46} y1="141" x2={magnetSvgX - 26} y2="141" /><path d={`M${magnetSvgX - 50} 141 l7 -5 v10 z`} fill="#6aa05b" stroke="none" /><line x1={magnetSvgX + 26} y1="141" x2={magnetSvgX + 46} y2="141" /><path d={`M${magnetSvgX + 50} 141 l-7 -5 v10 z`} fill="#6aa05b" stroke="none" /></g>
    </svg>
  </div>
);

const PhysicsCollisionSimulation = ({ c }) => {
  const massOptions = [0.5, 1, 1.5, 2, 2.5, 3];
  const velocityOptions = [-4, -2, 0, 2, 4];
  const isArabic = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
  const [config, setConfig] = useState({
    massA: 1.5,
    massB: 1,
    velocityA: 4,
    velocityB: -2,
    collisionType: "elastic",
    friction: 0.08,
    speed: 1,
    running: false,
    progress: 0
  });
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  useEffect(() => {
    if (!config.running) return undefined;
    const timer = window.setInterval(() => {
      setConfig((current) => {
        const next = Math.min(100, current.progress + 1.8 * current.speed);
        return { ...current, progress: next, running: next < 100 };
      });
    }, 28);
    return () => window.clearInterval(timer);
  }, [config.running, config.speed]);

  const setValue = (key, value) => setConfig((current) => ({ ...current, [key]: value }));
  const reset = () => setConfig({
    massA: 1.5,
    massB: 1,
    velocityA: 4,
    velocityB: -2,
    collisionType: "elastic",
    friction: 0.08,
    speed: 1,
    running: false,
    progress: 0
  });

  const totalMomentumBefore = config.massA * config.velocityA + config.massB * config.velocityB;
  const totalEnergyBefore = 0.5 * config.massA * config.velocityA * config.velocityA + 0.5 * config.massB * config.velocityB * config.velocityB;
  const finalElasticA = ((config.massA - config.massB) / (config.massA + config.massB)) * config.velocityA + ((2 * config.massB) / (config.massA + config.massB)) * config.velocityB;
  const finalElasticB = ((2 * config.massA) / (config.massA + config.massB)) * config.velocityA + ((config.massB - config.massA) / (config.massA + config.massB)) * config.velocityB;
  const finalShared = totalMomentumBefore / (config.massA + config.massB);
  const finalVelocityA = config.collisionType === "elastic" ? finalElasticA : finalShared;
  const finalVelocityB = config.collisionType === "elastic" ? finalElasticB : finalShared;
  const totalMomentumAfter = config.massA * finalVelocityA + config.massB * finalVelocityB;
  const totalEnergyAfter = 0.5 * config.massA * finalVelocityA * finalVelocityA + 0.5 * config.massB * finalVelocityB * finalVelocityB;
  const momentumGap = Math.abs(totalMomentumBefore - totalMomentumAfter);
  const energyLoss = Math.max(0, totalEnergyBefore - totalEnergyAfter);
  const impact = config.progress / 100;
  const approach = Math.min(1, impact / 0.48);
  const settle = Math.max(0, (impact - 0.48) / 0.52);
  const cartAX = impact < 0.5 ? 12 + approach * 28 : 40 - settle * (config.collisionType === "elastic" ? 12 : 6);
  const cartBX = impact < 0.5 ? 76 - approach * 28 : (config.collisionType === "elastic" ? 60 + settle * 16 : 53 + settle * 8);
  const statusText = config.collisionType === "elastic" ? (isArabic ? "مرن" : "Elastic") : (isArabic ? "غير مرن" : "Inelastic");
  const stageTitle = config.collisionType === "elastic"
    ? (isArabic ? "تصادم مرن" : "Elastic collision")
    : (isArabic ? "تصادم غير مرن" : "Inelastic collision");
  const stageHint = config.collisionType === "elastic"
    ? c.physicsCollisionHint
    : c.physicsCollisionCoach;
  const metricLabels = isArabic
    ? {
        momentumBefore: "الزخم قبل",
        momentumAfter: "الزخم بعد",
        energyBefore: "الطاقة الحركية قبل",
        energyAfter: "الطاقة الحركية بعد",
        energyLost: "الطاقة المفقودة",
        momentumGap: "فرق الزخم"
      }
    : {
        momentumBefore: "Momentum before",
        momentumAfter: "Momentum after",
        energyBefore: "Kinetic energy before",
        energyAfter: "Kinetic energy after",
        energyLost: "Energy lost",
        momentumGap: "Momentum gap"
      };
  const controlLabels = isArabic
    ? { massA: "الكتلة أ", massB: "الكتلة ب", velocityA: "السرعة أ", velocityB: "السرعة ب" }
    : { massA: "Mass A", massB: "Mass B", velocityA: "Velocity A", velocityB: "Velocity B" };
  const cartLabels = isArabic ? { a: "أ", b: "ب" } : { a: "A", b: "B" };
  const massUnit = isArabic ? "كغ" : "kg";
  const velocityUnit = isArabic ? "م/ث" : "m/s";
  const questions = c.physicsCollisionQuestions || [];

  return (
    <div className="collision-grid">
      <aside className="collision-results card-lite">
        <div className="collision-panel-head">
          <strong>{c.physicsCollisionQuestionsTitle}</strong>
          <span className="lab-tag">{statusText}</span>
        </div>
        <div className="collision-metrics">
          <div className="collision-metric"><span>{metricLabels.momentumBefore}</span><strong>{totalMomentumBefore.toFixed(2)}</strong></div>
          <div className="collision-metric"><span>{metricLabels.momentumAfter}</span><strong>{totalMomentumAfter.toFixed(2)}</strong></div>
          <div className="collision-metric"><span>{metricLabels.energyBefore}</span><strong>{totalEnergyBefore.toFixed(2)}</strong></div>
          <div className="collision-metric"><span>{metricLabels.energyAfter}</span><strong>{totalEnergyAfter.toFixed(2)}</strong></div>
          <div className="collision-metric"><span>{metricLabels.energyLost}</span><strong>{energyLoss.toFixed(2)}</strong></div>
          <div className="collision-metric"><span>{metricLabels.momentumGap}</span><strong>{momentumGap.toFixed(2)}</strong></div>
        </div>
        <div className="collision-quiz">
          {questions.map((item, index) => (
            <button key={item.question} className={`collision-question ${selectedQuestion === index ? "active" : ""}`} type="button" onClick={() => setSelectedQuestion(index)}>
              <span className="collision-question-index">{String(index + 1).padStart(2, "0")}</span>
              <strong className="collision-question-text">{item.question}</strong>
              {selectedQuestion === index ? <em>{item.answer}</em> : null}
            </button>
          ))}
        </div>
      </aside>

      <section className="collision-stage card-lite">
        <div className="collision-stage-top">
          <div>
            <strong>{stageTitle}</strong>
            <p>{stageHint}</p>
          </div>
          <div className="collision-stage-actions">
            <button className="micro-btn" type="button" onClick={() => setConfig((current) => current.running ? { ...current, running: false } : { ...current, running: true, progress: current.progress >= 100 ? 0 : current.progress })}>{config.running ? (isArabic ? "إيقاف" : "Pause") : (isArabic ? "ابدأ +" : "Start +")}</button>
            <button className="micro-btn secondary" type="button" onClick={reset}>{isArabic ? "إعادة" : "Reset"}</button>
          </div>
        </div>
        <div className="collision-track">
          <div className={`collision-flash ${config.progress > 45 && config.progress < 60 ? "on" : ""}`}></div>
          <div className="collision-cart cart-a" style={{ left: `${cartAX}%` }}>
            <span>{cartLabels.a}</span>
            <strong>{config.massA.toFixed(1)} {massUnit}</strong>
          </div>
          <div className="collision-cart cart-b" style={{ left: `${cartBX}%` }}>
            <span>{cartLabels.b}</span>
            <strong>{config.massB.toFixed(1)} {massUnit}</strong>
          </div>
          <div className="collision-arrow arrow-a" style={{ left: `${Math.max(12, cartAX - 5)}%`, opacity: impact < 0.55 ? 1 : 0.55 }}>{config.velocityA >= 0 ? "→" : "←"}</div>
          <div className="collision-arrow arrow-b" style={{ left: `${Math.min(84, cartBX + 2)}%`, opacity: impact < 0.55 ? 1 : 0.55 }}>{config.velocityB >= 0 ? "→" : "←"}</div>
          <div className="collision-readout">
            <strong>{config.progress < 48 ? (isArabic ? "قبل التصادم" : "Before impact") : config.collisionType === "elastic" ? (isArabic ? "بعد الارتداد" : "After bounce") : (isArabic ? "حركة مشتركة" : "Joined motion")}</strong>
            <span>{c.physicsCollisionSummary}</span>
          </div>
        </div>
      </section>

      <aside className="collision-controls card-lite">
        <div className="collision-panel-head">
          <strong>{c.physicsCollisionCoach}</strong>
          <span className="lab-tag">{isArabic ? "الزخم" : "Momentum"}</span>
        </div>
        <div className="collision-control">
          <label><span>{controlLabels.massA}</span><strong>{config.massA.toFixed(1)} {massUnit}</strong></label>
          <div className="collision-option-row">
            {massOptions.map((value) => (
              <button
                key={`mass-a-${value}`}
                type="button"
                className={`collision-option ${config.massA === value ? "active" : ""}`}
                onClick={() => setValue("massA", value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="collision-control">
          <label><span>{controlLabels.massB}</span><strong>{config.massB.toFixed(1)} {massUnit}</strong></label>
          <div className="collision-option-row">
            {massOptions.map((value) => (
              <button
                key={`mass-b-${value}`}
                type="button"
                className={`collision-option ${config.massB === value ? "active" : ""}`}
                onClick={() => setValue("massB", value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="collision-control">
          <label><span>{controlLabels.velocityA}</span><strong>{config.velocityA.toFixed(1)} {velocityUnit}</strong></label>
          <div className="collision-option-row">
            {velocityOptions.map((value) => (
              <button
                key={`velocity-a-${value}`}
                type="button"
                className={`collision-option ${config.velocityA === value ? "active" : ""}`}
                onClick={() => setValue("velocityA", value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="collision-control">
          <label><span>{controlLabels.velocityB}</span><strong>{config.velocityB.toFixed(1)} {velocityUnit}</strong></label>
          <div className="collision-option-row">
            {velocityOptions.map((value) => (
              <button
                key={`velocity-b-${value}`}
                type="button"
                className={`collision-option ${config.velocityB === value ? "active" : ""}`}
                onClick={() => setValue("velocityB", value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="collision-toggle">
          <button className={`micro-btn ${config.collisionType === "elastic" ? "" : "secondary"}`} type="button" onClick={() => setValue("collisionType", "elastic")}>{isArabic ? "مرن" : "Elastic"}</button>
          <button className={`micro-btn ${config.collisionType === "inelastic" ? "" : "secondary"}`} type="button" onClick={() => setValue("collisionType", "inelastic")}>{isArabic ? "غير مرن" : "Inelastic"}</button>
        </div>
        <div className="collision-control">
          <label><span>{isArabic ? "سرعة الزمن" : "Time speed"}</span><strong>{config.speed}x</strong></label>
          <div className="speed-switcher">
            {[1, 2, 4].map((speed) => <button key={speed} className={`micro-btn ${config.speed === speed ? "" : "secondary"}`} type="button" onClick={() => setValue("speed", speed)}>{speed}x</button>)}
          </div>
        </div>
      </aside>
    </div>
  );
};

const MoleculeFlow = ({ className, label }) => <span className={`bio-molecule ${className}`}>{label}</span>;

const MiniTrendChart = ({ title, points, strokeClass, valueKey }) => {
  const safePoints = points.length ? points : [{ [valueKey]: 0 }];
  const maxValue = Math.max(...safePoints.map((point) => point[valueKey]), 1);
  const step = safePoints.length > 1 ? 220 / (safePoints.length - 1) : 220;
  const d = safePoints.map((point, index) => {
    const x = index * step;
    const y = 84 - (point[valueKey] / maxValue) * 64;
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");

  return (
    <div className="bio-chart-card">
      <div className="bio-chart-title">{title}</div>
      <svg viewBox="0 0 220 88" className="bio-chart" aria-hidden="true">
        <path d="M0 84 H220" className="bio-chart-axis" />
        <path d={d} className={`bio-chart-line ${strokeClass}`} />
      </svg>
    </div>
  );
};

const BiologySimulation = ({ c, currentMaterial, bioSettings, setBioSettings, bioMetrics, bioTrend, resetBiologyExperiment }) => {
  const setSpeed = (speed) => setBioSettings({ ...bioSettings, timeSpeed: speed });
  const setRange = (key, value) => setBioSettings({ ...bioSettings, [key]: Number(value) });
  const statusLevel = (value) => value >= 67 ? c.bioStatusHigh : value >= 34 ? c.bioStatusMedium : c.bioStatusLow;
  const statusClass = (value) => value >= 67 ? "high" : value >= 34 ? "medium" : "low";
  const indicator = (value) => value >= 50 ? "up" : "down";
  const toolItems = [
    { key: "light", label: c.bioLightLabel, value: bioSettings.lightOn ? c.bioOn : c.bioOff, kind: "toggle" },
    { key: "water", label: c.bioWaterLabel, value: `${bioSettings.water}%`, kind: "range" },
    { key: "co2", label: c.bioCo2Label, value: `${bioSettings.co2}%`, kind: "range" },
    { key: "o2", label: c.bioO2Label, value: `${bioSettings.o2}%`, kind: "range" }
  ];
  const resultItems = [
    { label: c.bioResults.photo, value: bioMetrics.photosynthesisRate, suffix: "%", emphasize: true },
    { label: c.bioResults.respiration, value: bioMetrics.respirationRate, suffix: "%", emphasize: true },
    { label: c.bioResults.oxygenProduced, value: bioMetrics.oxygenProduced, suffix: "%" },
    { label: c.bioResults.co2Consumed, value: bioMetrics.carbonDioxideConsumed, suffix: "%" },
    { label: c.bioResults.co2Released, value: bioMetrics.carbonDioxideReleased, suffix: "%" },
    { label: c.bioResults.glucoseProduced, value: bioMetrics.glucoseProduced, suffix: "%" },
    { label: c.bioResults.atpProduced, value: bioMetrics.atpProduced, suffix: "%" }
  ];

  return (
    <div className="bio-lab-layout">
      <div className="bio-controls card-lite">
        <div className="bio-panel-head">
          <strong>{c.bioControlTitle}</strong>
          <button className="micro-btn secondary" type="button" onClick={resetBiologyExperiment}>{c.bioReset}</button>
        </div>
        <div className="bio-slider-grid">
          <label className="bio-slider">
            <span>{c.bioTempLabel}<strong>{bioSettings.temperature}°C</strong></span>
            <input type="range" min="10" max="45" value={bioSettings.temperature} onChange={(event) => setRange("temperature", event.target.value)} />
          </label>
        </div>
        <div className="bio-speed-row">
          <span>{c.bioSpeedLabel}</span>
          <div className="bio-speed-actions">
            {[1, 5, 10].map((speed) => <button key={speed} className={`bio-speed-btn ${bioSettings.timeSpeed === speed ? "active" : ""}`} type="button" onClick={() => setSpeed(speed)}>{speed}x</button>)}
          </div>
        </div>
      </div>

      <div className="bio-sim card-lite">
        <div className="bio-mission-card">
          <strong>{c.bioMissionTitle}</strong>
          <span>{c.bioMissionText}</span>
        </div>
        <div className={`bio-plant-chamber ${bioMetrics.plantState}`}>
          <div className="bio-toolbelt">
            {toolItems.map((tool) => (
              <div className={`bio-tool-card ${tool.key}`} key={tool.key}>
                <div className="bio-tool-head">
                  <strong>{tool.label}</strong>
                  <span>{tool.value}</span>
                </div>
                {tool.kind === "toggle" ? (
                  <button className={`bio-switch tool ${bioSettings.lightOn ? "on" : ""}`} type="button" onClick={() => setBioSettings({ ...bioSettings, lightOn: !bioSettings.lightOn })}>
                    <span>{bioSettings.lightOn ? c.bioOn : c.bioOff}</span>
                  </button>
                ) : (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bioSettings[tool.key]}
                    onChange={(event) => setRange(tool.key, event.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
          <div className={`bio-sun ${bioSettings.lightOn ? "on" : "off"}`}></div>
          {bioSettings.lightOn ? <div className="bio-sun-rays"></div> : null}
          <div className="bio-chamber-glass"></div>
          <div className="bio-plant">
            <div className="bio-stem"></div>
            <div className="bio-leaf leaf-one"></div>
            <div className="bio-leaf leaf-two"></div>
            <div className="bio-leaf leaf-three"></div>
            <div className="bio-roots"></div>
          </div>
          <div className="bio-flow-layer">
            <MoleculeFlow className="water one" label="H2O" />
            <MoleculeFlow className="water two" label="H2O" />
            <MoleculeFlow className="co2 one" label="CO2" />
            <MoleculeFlow className="co2 two" label="CO2" />
            <MoleculeFlow className="o2 one" label="O2" />
            <MoleculeFlow className="o2 two" label="O2" />
            <MoleculeFlow className="glucose one" label="C6H12O6" />
            <MoleculeFlow className="atp one" label="ATP" />
          </div>
        </div>
        <div className="bio-feedback-wrap">
          <div className="bio-feedback-card">{bioMetrics.feedback}</div>
          <div className="bio-feedback-card secondary">{bioMetrics.respirationFeedback}</div>
        </div>
      </div>

      <div className="bio-results card-lite">
        <div className="bio-panel-head">
          <strong>{c.bioResultsTitle}</strong>
          <span className={`bio-health-chip ${bioMetrics.plantState}`}>{bioMetrics.plantState === "healthy" ? c.bioHealthy : bioMetrics.plantState === "slight" ? c.bioSlight : c.bioWilted}</span>
        </div>
        <div className="bio-result-grid">
          {resultItems.map((item) => (
            <div className="bio-result-item" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}{item.suffix || ""}</strong>
              <div className="bio-result-meta">
                <span className={`bio-indicator ${indicator(item.value)}`}>{indicator(item.value) === "up" ? "↑" : "↓"}</span>
                <span className={`bio-status ${statusClass(item.value)}`}>{statusLevel(item.value)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bio-chart-grid">
          <MiniTrendChart title={c.bioChartOxygen} points={bioTrend} strokeClass="oxygen" valueKey="oxygen" />
          <MiniTrendChart title={c.bioChartCarbon} points={bioTrend} strokeClass="carbon" valueKey="carbon" />
        </div>
      </div>
    </div>
  );
};

const DNAReplicationSimulation = ({ c, currentMaterial, resetBiologyExperiment }) => {
  const templateSequence = useMemo(() => (c.bioDnaTemplate || "ATGCCATG").split(""), [c]);
  const complementMap = useMemo(() => ({ A: "T", T: "A", C: "G", G: "C" }), []);
  const [stage, setStage] = useState(0);
  const [activeBase, setActiveBase] = useState(null);
  const [wrongHint, setWrongHint] = useState("");
  const [resultUnlocked, setResultUnlocked] = useState(false);
  const [placedBases, setPlacedBases] = useState(() => Array(templateSequence.length).fill(""));
  const [attempts, setAttempts] = useState({ correct: 0, incorrect: 0 });

  const stageItems = [
    c.bioDnaStage1 || "Unzip DNA",
    c.bioDnaStage2 || "Add RNA Primer",
    c.bioDnaStage3 || "Build Leading Strand",
    c.bioDnaStage4 || "Build Lagging Strand",
    c.bioDnaStage5 || "Remove Primers",
    c.bioDnaStage6 || "Seal DNA",
    c.bioDnaStage7 || "View Results"
  ];

  const completion = useMemo(() => {
    let a = 0;
    let t = 0;
    let cCount = 0;
    let gCount = 0;
    let atPairs = 0;
    let cgPairs = 0;
    let totalHydrogenBonds = 0;

    templateSequence.forEach((base, index) => {
      const placed = placedBases[index];
      if (!placed || placed !== complementMap[base]) return;
      a += base === "A" ? 1 : placed === "A" ? 1 : 0;
      t += base === "T" ? 1 : placed === "T" ? 1 : 0;
      cCount += base === "C" ? 1 : placed === "C" ? 1 : 0;
      gCount += base === "G" ? 1 : placed === "G" ? 1 : 0;
      if (base === "A" || base === "T") atPairs += 1;
      if (base === "C" || base === "G") cgPairs += 1;
    });

    totalHydrogenBonds = atPairs * 2 + cgPairs * 3;

    return {
      a,
      t,
      cCount,
      gCount,
      atPairs,
      cgPairs,
      totalHydrogenBonds,
      totalNucleotides: (a + t + cCount + gCount) || 0,
      complete: placedBases.every((base, index) => base === complementMap[templateSequence[index]])
    };
  }, [placedBases, templateSequence, complementMap]);

  const handleReset = () => {
    resetBiologyExperiment();
    setStage(0);
    setActiveBase(null);
    setWrongHint("");
    setResultUnlocked(false);
    setPlacedBases(Array(templateSequence.length).fill(""));
    setAttempts({ correct: 0, incorrect: 0 });
  };

  const placeBase = (slotIndex) => {
    if (!activeBase) return;
    const expected = complementMap[templateSequence[slotIndex]];
    setAttempts((current) => current);
    if (activeBase !== expected) {
      setAttempts((current) => ({ ...current, incorrect: current.incorrect + 1 }));
      setWrongHint(c.bioDnaWrongHint || "Adenine pairs with Thymine, and Cytosine pairs with Guanine.");
      window.setTimeout(() => setWrongHint(""), 1800);
      return;
    }
    setPlacedBases((current) => {
      const next = [...current];
      next[slotIndex] = activeBase;
      return next;
    });
    setAttempts((current) => ({ ...current, correct: current.correct + 1 }));
    setWrongHint("");
    setStage((current) => Math.max(current, 2));
    setActiveBase(null);
  };

  useEffect(() => {
    if (completion.complete) {
      setStage(6);
      setResultUnlocked(true);
    }
  }, [completion.complete]);

  const handleShowResults = () => {
    if (!completion.complete) {
      setWrongHint(c.bioDnaFinishHint || c.bioDnaWrongHint || "Complete the complementary strand first, then press Show Results.");
      window.setTimeout(() => setWrongHint(""), 2200);
      return;
    }
    setResultUnlocked(true);
    setStage(6);
  };

  const currentStageText = [
    c.bioDnaStage1Text,
    c.bioDnaStage2Text,
    c.bioDnaStage3Text,
    c.bioDnaStage4Text,
    c.bioDnaStage5Text,
    c.bioDnaStage6Text,
    c.bioDnaStage7Text
  ][stage] || c.bioDnaIntro;

  const isComplete = completion.complete;

  return (
    <div className="dna-lab">
      <aside className="dna-progress card-lite">
        <div className="dna-panel-head">
          <strong>{c.bioDnaProgressTitle || "Replication Progress"}</strong>
          <button className="micro-btn secondary" type="button" onClick={handleReset}>{c.bioReset}</button>
        </div>
        <div className="dna-stage-list">
          {stageItems.map((item, index) => (
            <button
              key={item}
              type="button"
              className={`dna-stage-item ${stage === index ? "active" : ""} ${stage > index || (isComplete && index === stageItems.length - 1) ? "done" : ""}`}
              onClick={() => setStage(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </button>
          ))}
        </div>
      </aside>

      <section className="dna-workspace card-lite">
        <div className="bio-next-stage-head dna-top">
          <div>
            <h3>{c.bioDnaLabName || currentMaterial.labName}</h3>
            <p>{c.bioDnaLabText || currentMaterial.labText}</p>
          </div>
          <div className="dna-stage-pill">{stageItems[stage]}</div>
        </div>

        <div className="dna-guide">
          <div className="dna-guide-step"><strong>1</strong><span>{c.bioDnaGuide1 || "Choose a base"}</span></div>
          <div className="dna-guide-step"><strong>2</strong><span>{c.bioDnaGuide2 || "Fill the empty slots"}</span></div>
          <div className="dna-guide-step"><strong>3</strong><span>{c.bioDnaGuide3 || "Press Show Results"}</span></div>
          <button className="micro-btn dna-guide-action" type="button" onClick={handleShowResults}>{c.bioDnaShowResults || "Show Results"}</button>
        </div>

        <div className="dna-status-row">
          <div className="dna-status-card"><span>{c.bioDnaDirection}</span><strong>3' → 5'</strong><em>{c.bioDnaReadDirection}</em></div>
          <div className="dna-status-card highlight"><span>{c.bioDnaPolymerase}</span><strong>5' → 3'</strong><em>{c.bioDnaBuildDirection}</em></div>
          <div className="dna-status-card"><span>{c.bioDnaSemiconservative}</span><strong>{isComplete ? c.bioDnaConfirmed : c.bioDnaWorking}</strong><em>{c.bioDnaSemiconservativeText}</em></div>
        </div>

        <div className={`dna-helix-card stage-${stage} ${isComplete ? "complete" : ""}`}>
          <div className="dna-helix-header">
            <div className="dna-end-label left">3'</div>
            <div className="dna-helix-title">{c.bioDnaHelixTitle || "DNA Replication Fork"}</div>
            <div className="dna-end-label right">5'</div>
          </div>
          <div className="dna-helix-body">
            <div className={`dna-enzyme dna-helicase ${stage >= 0 ? "on" : ""}`}>{c.bioDnaHelicase || "Helicase"}</div>
            <div className={`dna-enzyme dna-primase ${stage >= 1 ? "on" : ""}`}>{c.bioDnaPrimase || "Primase"}</div>
            <div className={`dna-enzyme dna-polymerase ${stage >= 2 ? "on" : ""}`}>{c.bioDnaPolymerase || "DNA Polymerase"}</div>
            <div className={`dna-enzyme dna-ligase ${stage >= 5 ? "on" : ""}`}>{c.bioDnaLigase || "Ligase"}</div>
            <div className={`dna-fork ${stage >= 0 ? "open" : ""}`}></div>
            <div className={`dna-strand dna-original left ${stage >= 1 ? "unzipped" : ""}`}></div>
            <div className={`dna-strand dna-original right ${stage >= 1 ? "unzipped" : ""}`}></div>
            <div className="dna-base-rungs">
              {templateSequence.map((base, index) => (
                <div className="dna-rung" key={`${base}-${index}`}>
                  <span className="dna-template-base">{base}</span>
                  <button className={`dna-slot ${placedBases[index] ? "filled" : ""}`} type="button" onClick={() => placeBase(index)}>
                    {placedBases[index] || "?"}
                  </button>
                  <span className="dna-template-base complement">{complementMap[base]}</span>
                </div>
              ))}
            </div>
            <div className={`dna-fork-message ${wrongHint ? "warn" : ""}`}>{wrongHint || currentStageText}</div>
          </div>
        </div>

        <div className="dna-builder-grid">
          <div className="dna-template card-lite">
            <div className="dna-card-head">
              <strong>{c.bioDnaChallengeTitle || "Sequence challenge"}</strong>
              <span>{c.bioDnaTemplateLabel || "Template strand"}</span>
            </div>
            <div className="dna-sequence-line">
              {templateSequence.map((base, index) => (
                <div className="dna-sequence-cell" key={`tpl-${base}-${index}`}>
                  <span className="dna-sequence-tag">{base}</span>
                  <strong>{placedBases[index] || "—"}</strong>
                </div>
              ))}
            </div>
            <div className="dna-template-note">{c.bioDnaTemplateText || "Tap a nucleotide, then tap a blank slot to build the complementary strand."}</div>
          </div>

          <div className="dna-pool card-lite">
            <div className="dna-card-head">
              <strong>{c.bioDnaNucleotidePool || "Nucleotide cards"}</strong>
              <span>{activeBase ? `${c.bioDnaSelected || "Selected"}: ${activeBase}` : c.bioDnaPickBase}</span>
            </div>
            <div className="dna-base-pool">
              {["A", "T", "C", "G"].map((base) => (
                <button key={base} type="button" className={`dna-base-card ${activeBase === base ? "active" : ""}`} onClick={() => setActiveBase(base)}>
                  <strong>{base}</strong>
                  <span>{c[`bioDnaBase${base}`] || base}</span>
                </button>
              ))}
            </div>
            <div className="dna-pool-actions">
              <button className="micro-btn secondary" type="button" onClick={() => setActiveBase(null)}>{c.bioDnaClearSelection || "Clear selection"}</button>
              <button className="micro-btn" type="button" onClick={() => setStage((current) => Math.min(current + 1, 6))}>{c.bioDnaNextStage || "Next stage"}</button>
            </div>
          </div>
        </div>
      </section>

      <aside className="dna-results card-lite">
        <div className="dna-panel-head">
          <strong>{c.bioDnaResultsTitle || "Live Results"}</strong>
          <span className={`bio-health-chip ${isComplete ? "healthy" : "slight"}`}>{isComplete ? c.bioDnaComplete || "Complete" : c.bioDnaInProgress || "In progress"}</span>
        </div>
        <div className="dna-stats-grid">
          <div className="dna-stat"><span>A</span><strong>{completion.a}</strong></div>
          <div className="dna-stat"><span>T</span><strong>{completion.t}</strong></div>
          <div className="dna-stat"><span>C</span><strong>{completion.cCount}</strong></div>
          <div className="dna-stat"><span>G</span><strong>{completion.gCount}</strong></div>
          <div className="dna-stat"><span>{c.bioDnaTotal || "Total nucleotides"}</span><strong>{completion.totalNucleotides}</strong></div>
          <div className="dna-stat"><span>{c.bioDnaAtPairs || "A-T pairs"}</span><strong>{completion.atPairs}</strong></div>
          <div className="dna-stat"><span>{c.bioDnaCgPairs || "C-G pairs"}</span><strong>{completion.cgPairs}</strong></div>
          <div className="dna-stat"><span>{c.bioDnaHydrogenBonds || "Hydrogen bonds"}</span><strong>{completion.totalHydrogenBonds}</strong></div>
        </div>
        <div className="dna-tutor card-lite">
          <strong>{c.bioDnaTutorTitle || c.bioTutorTitle}</strong>
          <p>{wrongHint || (resultUnlocked || isComplete ? c.bioDnaConclusion : currentStageText)}</p>
        </div>
        <div className="dna-tutor card-lite">
          <strong>{c.bioDnaFinalCardTitle || "Performance"}</strong>
          <p>{`${c.bioDnaCorrectAttempts || "Correct attempts"}: ${attempts.correct}`}</p>
          <p>{`${c.bioDnaIncorrectAttempts || "Incorrect attempts"}: ${attempts.incorrect}`}</p>
          <p>{`${c.bioDnaSemiconservative}: ${isComplete ? c.bioDnaConfirmed : c.bioDnaWorking}`}</p>
        </div>
        {resultUnlocked || isComplete ? (
          <div className="dna-final-banner">
            <strong>{c.bioDnaComplete || "Complete"}</strong>
            <p>{c.bioDnaConclusion}</p>
            <button className="micro-btn secondary" type="button" onClick={handleReset}>{c.bioReset}</button>
          </div>
        ) : null}
      </aside>
    </div>
  );
};

const BiologySimulationV2 = ({ c, currentMaterial, bioSettings, setBioSettings, bioMetrics, bioTrend, resetBiologyExperiment, selectedExperimentIndex }) => {
  if (selectedExperimentIndex === 1) {
    return <DNAReplicationSimulation c={c} currentMaterial={currentMaterial} resetBiologyExperiment={resetBiologyExperiment} />;
  }

  const [insideLeaf, setInsideLeaf] = useState(false);
  const visualState = bioSettings.lightOn ? "healthy" : "wilted";
  const plantStateLabel = visualState === "healthy" ? c.bioHealthy : c.bioWilted;
  const moleculeStatus = [
    { label: "CO2", arrow: bioSettings.lightOn ? "?" : "?", tone: "co2", hint: bioSettings.lightOn ? c.bioLeafCo2 : c.bioLeafRespiration },
    { label: "O2", arrow: bioSettings.lightOn ? "?" : "?", tone: "o2", hint: bioSettings.lightOn ? c.bioLeafO2 : c.bioLeafRespiration },
    { label: "ATP", arrow: "?", tone: "atp", hint: c.bioLeafAtp }
  ];

  return (
    <div className="bio-next-lab bio-next-lab-minimal">
      <aside className="bio-next-controls card-lite">
        <div className="bio-next-head">
          <strong>{c.bioControlTitle}</strong>
          <button className="micro-btn secondary" type="button" onClick={resetBiologyExperiment}>{c.bioReset}</button>
        </div>
        <div className="bio-next-controls-list">
          <div className="bio-next-control">
            <div className="bio-next-control-head">
              <span className="bio-next-control-icon" aria-hidden="true">??</span>
              <div>
                <strong>{c.bioLightLabel}</strong>
                <span>{bioSettings.lightOn ? c.bioOn : c.bioOff}</span>
              </div>
            </div>
            <button className={`bio-switch tool ${bioSettings.lightOn ? "on" : ""}`} type="button" onClick={() => setBioSettings({ ...bioSettings, lightOn: !bioSettings.lightOn })}>
              <span>{bioSettings.lightOn ? c.bioOn : c.bioOff}</span>
            </button>
          </div>
        </div>
      </aside>

      <section className="bio-next-stage card-lite">
        <div className="bio-next-stage-head">
          <div>
            <h3>{currentMaterial.labName}</h3>
            <p>{currentMaterial.labText}</p>
          </div>
          <button className={`bio-leaf-toggle ${insideLeaf ? "on" : ""}`} type="button" onClick={() => setInsideLeaf((current) => !current)}>
            {c.bioInsideLeaf}
          </button>
        </div>

        <div className={`bio-next-chamber ${visualState} ${bioSettings.lightOn ? "light-on" : "light-off"} ${insideLeaf ? "inside" : ""}`}>
          <div className={`bio-next-sun ${bioSettings.lightOn ? "on" : "off"}`}></div>
          {bioSettings.lightOn ? <div className="bio-next-rays"></div> : null}
          {bioSettings.lightOn ? <div className="bio-next-stream co2"><span>CO2</span><span>CO2</span></div> : null}
          {bioSettings.lightOn ? <div className="bio-next-stream o2"><span>O2</span><span>O2</span></div> : null}
          {!bioSettings.lightOn ? <div className="bio-next-stream dark-co2"><span>CO2</span><span>CO2</span></div> : null}
          {bioSettings.lightOn ? <div className="bio-next-stream glucose"><span>Glucose</span></div> : null}
          <div className="bio-next-stream atp"><span>ATP</span></div>

          <div className="bio-next-plant">
            <div className="bio-next-root"></div>
            <div className="bio-next-stem"></div>
            <div className="bio-next-leaf leaf-a"></div>
            <div className="bio-next-leaf leaf-b"></div>
            <div className="bio-next-leaf leaf-c"></div>
          </div>

          <div className="bio-next-status bio-next-status-top">
            <div className="bio-next-status-chip"><span>{c.bioPlantStatus}</span><strong>{plantStateLabel}</strong></div>
            <div className="bio-next-status-chip"><span>{c.bioPhotosynthesis}</span><strong>{bioSettings.lightOn ? c.bioActive : c.bioStopped}</strong></div>
            <div className="bio-next-status-chip"><span>{c.bioRespiration}</span><strong>{c.bioActive}</strong></div>
          </div>

          {insideLeaf ? (
            <div className="bio-next-inside">
              <div className="bio-next-cell-card"><strong>{c.bioInsideLeafChloroplast}</strong><span>{c.bioInsideLeafChloroplastText}</span></div>
              <div className="bio-next-cell-card"><strong>{c.bioInsideLeafMito}</strong><span>{c.bioInsideLeafMitoText}</span></div>
              <div className="bio-next-equations">
                <div>{c.bioEquationPhoto}</div>
                <div>{c.bioEquationRespiration}</div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <aside className="bio-next-results card-lite bio-next-results-top">
        <div className="bio-next-head">
          <strong>{c.bioResultsTitle}</strong>
          <span className={`bio-health-chip ${visualState}`}>{plantStateLabel}</span>
        </div>
        <div className="bio-next-tracker">
          <strong>{c.bioTrackerTitle}</strong>
          <div className="bio-next-tracker-list">
            {moleculeStatus.map((item) => (
              <div className={`bio-next-tracker-item ${item.tone}`} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.arrow}</strong>
                <em>{item.hint}</em>
              </div>
            ))}
          </div>
        </div>
        <div className="bio-next-assistant">
          <strong>{c.bioTutorTitle}</strong>
          <p>{bioMetrics.feedback}</p>
          <p>{bioMetrics.respirationFeedback}</p>
        </div>
      </aside>
    </div>
  );
};
const ChemistrySimulationLegacy = ({ c, chemSettings, setChemSettings, chemMetrics, chemTrend, resetChemistryExperiment }) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const setSpeed = (speed) => setChemSettings({ ...chemSettings, timeSpeed: speed });
  const pickOption = (key, value) => setChemSettings({ ...chemSettings, [key]: value });
  const metrics = [
    { label: c.chemResults.voltage, value: chemMetrics.voltage, suffix: "V", status: chemMetrics.status },
    { label: c.chemResults.current, value: chemMetrics.current, suffix: "mA", status: chemMetrics.current >= 10 ? "high" : chemMetrics.current >= 6 ? "medium" : "low" },
    { label: c.chemResults.electrons, value: chemMetrics.electrons, suffix: "", status: chemMetrics.electrons >= 0.002 ? "high" : chemMetrics.electrons >= 0.001 ? "medium" : "low" },
    { label: c.chemResults.znConcentration, value: chemMetrics.znConcentration, suffix: "M", status: "medium" },
    { label: c.chemResults.cuConcentration, value: chemMetrics.cuConcentration, suffix: "M", status: "medium" },
    { label: c.chemResults.zincMass, value: chemMetrics.zincMass, suffix: "g", status: "low" },
    { label: c.chemResults.copperMass, value: chemMetrics.copperMass, suffix: "g", status: "high" }
  ];
  const stepItems = c.chemSteps || [];
  const questionItems = c.chemQuestions || [];
  const electrodeOptions = ["Zn", "Cu", "Fe", "Ag", "Mg", "Ni"];
  const solutionOptions = ["ZnSO4", "CuSO4", "AgNO3", "FeSO4", "HCl", "NaCl", "H2SO4", "MgSO4"];
  const bridgeOptions = [
    { id: "KNO3", label: "KNO3" },
    { id: "NaCl", label: "NaCl" },
    { id: "KCl", label: "KCl" },
    { id: "none", label: c.chemNoBridge }
  ];
  const halfReactionLeft = `${chemSettings.anode}(s) -> ${chemMetrics.anodeIon} + 2e-`;
  const halfReactionRight = `${chemMetrics.cathodeIon} + 2e- -> ${chemSettings.cathode}(s)`;
  const fullReaction = `${chemSettings.anode}(s) + ${chemMetrics.cathodeIon}(aq) -> ${chemMetrics.anodeIon}(aq) + ${chemSettings.cathode}(s)`;
  const stateLabel = (value) => value === "high" ? c.chemStatusHigh : value === "medium" ? c.chemStatusMedium : c.chemStatusLow;
  const stateArrow = (value) => value === "high" ? "↑" : value === "medium" ? "→" : "↓";

  return (
    <div className="chem-lab-v2">
      <aside className="chemv2-results card-lite">
        <div className="chemv2-panel-head">
          <strong>{c.chemResultsTitle}</strong>
          <span className={`chem-status-chip ${chemMetrics.status}`}>{stateLabel(chemMetrics.status)}</span>
        </div>
        <div className="chemv2-results-list">
          {metrics.map((item) => (
            <div className="chemv2-result-row" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}{item.suffix}</strong>
              <div className={`chemv2-state ${item.status}`}>
                <span>{stateArrow(item.status)}</span>
                <em>{stateLabel(item.status)}</em>
              </div>
            </div>
          ))}
        </div>
        <div className="chem-chart-stack">
          <MiniTrendChart title={c.chemChartVoltage} points={chemTrend} strokeClass="oxygen" valueKey="voltage" />
          <MiniTrendChart title={c.chemChartCurrent} points={chemTrend} strokeClass="carbon" valueKey="current" />
        </div>
      </aside>

      <main className="chemv2-center">
        <div className="chemv2-topbar card-lite">
          <div className="chemv2-top-copy">
            <h4>{c.chemLabHeroTitle}</h4>
            <p>{c.chemLabHeroText}</p>
          </div>
          <button className="micro-btn secondary" type="button" onClick={resetChemistryExperiment}>{c.chemReset}</button>
        </div>

        <div className="chemv2-stepbar card-lite">
          {stepItems.map((step, index) => (
            <div className={`chemv2-step-chip ${index < 4 ? "done" : ""}`} key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>

        <div className="chemv2-stage card-lite">
          <div className="chemv2-status-card">
            <strong>{c.chemCircuitStatus}</strong>
            <span>{chemMetrics.cellReady ? c.chemCircuitClosed : c.chemCircuitOpen}</span>
            <p>{chemMetrics.feedback}</p>
          </div>

          <div className="chemv2-electron-label left">
            <strong>{c.chemDirectionTitle}</strong>
            <span>{chemSettings.anode}</span>
          </div>
          <div className="chemv2-electron-label right">
            <strong>{c.chemDirectionEnd}</strong>
            <span>{chemSettings.cathode}</span>
          </div>

          <div className="chemv2-wire">
            <div className={`chemv2-bulb ${chemMetrics.cellReady && chemSettings.lampOn ? "on" : "off"}`}></div>
            <div className="chemv2-voltmeter">{chemMetrics.voltage} V</div>
          </div>

          <div className="chemv2-electrons">
            <span>e-</span>
            <span>e-</span>
            <span>e-</span>
          </div>

          <div className="chemv2-cell-scene">
            <div className="chemv2-beaker left">
              <div className="chemv2-electrode">{chemSettings.anode}</div>
              <div className="chemv2-liquid left"></div>
              <div className="chemv2-beaker-label">{chemSettings.electrolyteLeft}</div>
            </div>
            <div className={`chemv2-bridge ${chemSettings.saltBridge === "none" ? "off" : ""}`}>
              <div className="chemv2-bridge-label">{chemSettings.saltBridge === "none" ? c.chemNoBridge : chemSettings.saltBridge}</div>
              <div className="chemv2-bridge-ions">
                <span>{chemSettings.saltBridge === "NaCl" ? "Na+" : "K+"}</span>
                <span>{chemSettings.saltBridge === "none" ? "×" : chemSettings.saltBridge === "KCl" || chemSettings.saltBridge === "NaCl" ? "Cl-" : "NO3-"}</span>
              </div>
            </div>
            <div className="chemv2-beaker right">
              <div className="chemv2-electrode copper">{chemSettings.cathode}</div>
              <div className="chemv2-liquid right"></div>
              <div className="chemv2-beaker-label">{chemSettings.electrolyteRight}</div>
            </div>
          </div>

          <div className="chemv2-reactions">
            <div className="chemv2-reaction-box">
              <strong>{c.chemAnodeLabel}</strong>
              <span>{halfReactionLeft}</span>
            </div>
            <div className="chemv2-reaction-box">
              <strong>{c.chemCathodeLabel}</strong>
              <span>{halfReactionRight}</span>
            </div>
            <div className="chemv2-reaction-total">{fullReaction}</div>
          </div>
        </div>

        <div className="chemv2-bottom-grid">
          <div className="chemv2-microview card-lite">
            <div className="chemv2-panel-head">
              <strong>{c.chemMicroTitle}</strong>
            </div>
            <div className="chemv2-micro-cards">
              <div className="chemv2-micro-card">
                <strong>{c.chemStoryLeft}</strong>
                <span>{c.chemStoryLeftText}</span>
              </div>
              <div className="chemv2-micro-card">
                <strong>{c.chemStoryBridge}</strong>
                <span>{c.chemStoryBridgeText}</span>
              </div>
              <div className="chemv2-micro-card">
                <strong>{c.chemStoryRight}</strong>
                <span>{c.chemStoryRightText}</span>
              </div>
            </div>
          </div>

          <div className="chemv2-questions card-lite">
            <div className="chemv2-panel-head">
              <strong>{c.chemQuestionsTitle}</strong>
            </div>
            <div className="faq-list chem-faq-list">
              {questionItems.map((item, index) => {
                const isOpen = index === activeQuestion;
                return (
                  <article className={`faq-item ${isOpen ? "open" : ""}`} key={item.question}>
                    <button className="faq-question" type="button" onClick={() => setActiveQuestion(isOpen ? -1 : index)}>
                      <span>{item.question}</span>
                      <span className={`faq-chevron ${isOpen ? "open" : ""}`}>v</span>
                    </button>
                    {isOpen ? <div className="faq-answer"><p>{item.answer}</p></div> : null}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <aside className="chemv2-tools card-lite">
        <div className="chemv2-panel-head">
          <strong>{c.chemToolsTitle}</strong>
        </div>
        <div className="chemv2-tool-group">
          <div className="chem-tool-label">{c.chemStepElectrodes}</div>
          <div className="chemv2-subgroup">
            <div className="chemv2-subtitle">{c.chemAnodeLabel}</div>
            <div className="chem-tool-grid">
              {electrodeOptions.map((metal) => (
                <button key={`anode-${metal}`} type="button" className={`chem-tool-card ${chemSettings.anode === metal ? "active" : ""}`} onClick={() => pickOption("anode", metal)}>{metal}</button>
              ))}
            </div>
          </div>
          <div className="chemv2-subgroup">
            <div className="chemv2-subtitle">{c.chemCathodeLabel}</div>
            <div className="chem-tool-grid">
              {electrodeOptions.map((metal) => (
                <button key={`cathode-${metal}`} type="button" className={`chem-tool-card ${chemSettings.cathode === metal ? "active" : ""}`} onClick={() => pickOption("cathode", metal)}>{metal}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="chemv2-tool-group">
          <div className="chem-tool-label">{c.chemLeftSolutionLabel}</div>
          <div className="chem-tool-grid">
            {solutionOptions.map((solution) => (
              <button key={`left-${solution}`} type="button" className={`chem-tool-card ${chemSettings.electrolyteLeft === solution ? "active" : ""}`} onClick={() => pickOption("electrolyteLeft", solution)}>{solution}</button>
            ))}
          </div>
        </div>
        <div className="chemv2-tool-group">
          <div className="chem-tool-label">{c.chemRightSolutionLabel}</div>
          <div className="chem-tool-grid">
            {solutionOptions.map((solution) => (
              <button key={`right-${solution}`} type="button" className={`chem-tool-card ${chemSettings.electrolyteRight === solution ? "active" : ""}`} onClick={() => pickOption("electrolyteRight", solution)}>{solution}</button>
            ))}
          </div>
        </div>
        <div className="chemv2-tool-group">
          <div className="chem-tool-label">{c.chemBridgeLabel}</div>
          <div className="chem-tool-grid compact">
            {bridgeOptions.map((bridge) => (
              <button key={bridge.id} type="button" className={`chem-tool-card ${chemSettings.saltBridge === bridge.id ? "active" : ""}`} onClick={() => pickOption("saltBridge", bridge.id)}>{bridge.label}</button>
            ))}
          </div>
        </div>
        <div className="chemv2-tool-group">
          <div className="chem-tool-label">{c.chemSpeedLabel}</div>
          <div className="bio-speed-actions">
            {[1, 5, 10].map((speed) => <button key={speed} className={`bio-speed-btn ${chemSettings.timeSpeed === speed ? "active" : ""}`} type="button" onClick={() => setSpeed(speed)}>{speed}x</button>)}
          </div>
        </div>
        <div className="chem-toggle-grid">
          <button type="button" className={`chem-toggle-card ${chemSettings.connected ? "active" : ""}`} onClick={() => pickOption("connected", !chemSettings.connected)}>
            <strong>{c.chemWireToggle}</strong>
            <span>{chemSettings.connected ? c.bioOn : c.bioOff}</span>
          </button>
          <button type="button" className={`chem-toggle-card ${chemSettings.lampOn ? "active" : ""}`} onClick={() => pickOption("lampOn", !chemSettings.lampOn)}>
            <strong>{c.chemLampToggle}</strong>
            <span>{chemSettings.lampOn ? c.bioOn : c.bioOff}</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

const ChemistrySimulation = ({ c, chemSettings, setChemSettings, chemMetrics, chemTrend, resetChemistryExperiment }) => {
  const isArabic = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
  const [reactionActive, setReactionActive] = useState(false);
  const [activeDropTarget, setActiveDropTarget] = useState("anode");
  const [buildStep, setBuildStep] = useState(0);
  const setSpeed = (speed) => setChemSettings({ ...chemSettings, timeSpeed: speed });
  const pickOption = (key, value) => setChemSettings({ ...chemSettings, [key]: value });
  const setAndAdvance = (key, value, nextStep) => {
    pickOption(key, value);
    setActiveDropTarget(key);
    if (typeof nextStep === "number") setBuildStep((current) => Math.max(current, nextStep));
  };

  useEffect(() => {
    if (!chemMetrics.cellReady) setReactionActive(false);
  }, [chemMetrics.cellReady]);

  useEffect(() => {
    if (!reactionActive || !chemMetrics.cellReady) return undefined;
    const timer = window.setInterval(() => setBuildStep((current) => Math.max(current, 3)), 500);
    return () => window.clearInterval(timer);
  }, [reactionActive, chemMetrics.cellReady]);

  const electrodes = [
    { id: "Zn", name: "Zinc", symbol: "Zn", desc: isArabic ? "قدرة عالية على فقد الإلكترونات" : "High electron release ability" },
    { id: "Cu", name: "Copper", symbol: "Cu", desc: isArabic ? "يميل لاكتساب الإلكترونات" : "Strong electron gain tendency" },
    { id: "Mg", name: "Magnesium", symbol: "Mg", desc: isArabic ? "نشاط عالٍ جدًا" : "Very high reactivity" },
    { id: "Fe", name: "Iron", symbol: "Fe", desc: isArabic ? "نشاط متوسط" : "Moderate reactivity" },
    { id: "Ag", name: "Silver", symbol: "Ag", desc: isArabic ? "نشاط منخفض" : "Low reactivity" }
  ];
  const solutions = ["ZnSO4", "CuSO4", "AgNO3", "MgSO4", "HCl"];
  const bridges = ["KNO3", "KCl", "NaCl"];
  const solutionTone = { ZnSO4: "zinc", CuSO4: "copper", AgNO3: "silver", MgSO4: "magnesium", HCl: "acid" };
  const electrodeStrength = { Mg: 1.22, Zn: 1, Fe: 0.74, Ag: 0.64, Cu: 0.52 };
  const normalizedVoltage = Math.max(0.12, Number(chemMetrics.voltage || 0));
  const flowLabel = chemMetrics.current >= 10 ? (isArabic ? "عالٍ" : "High") : chemMetrics.current >= 6 ? (isArabic ? "متوسط" : "Medium") : (isArabic ? "منخفض" : "Low");
  const statusBadge = chemMetrics.status === "high" ? (isArabic ? "مرتفع" : "High") : chemMetrics.status === "medium" ? (isArabic ? "متوسط" : "Medium") : (isArabic ? "منخفض" : "Low");
  const stageProgress = [
    { key: "materials", label: isArabic ? "اختيار المواد" : "Select Materials" },
    { key: "build", label: isArabic ? "بناء الخلية" : "Build Cell" },
    { key: "run", label: isArabic ? "تشغيل التفاعل" : "Run Reaction" },
    { key: "analyze", label: isArabic ? "تحليل النتائج" : "Analyze Results" }
  ];
  const assistantText = chemMetrics.cellReady
    ? (isArabic
      ? "يفقد الزنك الإلكترونات لأنه أكثر نشاطًا، بينما تكتسبها أيونات النحاس وتتحول إلى نحاس صلب على القطب."
      : "Zinc loses electrons because it is more reactive, while copper ions gain them and become solid copper on the electrode.")
    : (isArabic
      ? "اختر قطبين مختلفين، أضف المحاليل المناسبة، ثم صِل الجسر الملحي لإكمال الخلية."
      : "Choose two different electrodes, add matching solutions, then connect the salt bridge to complete the cell.");
  const reactionStatus = chemMetrics.cellReady
    ? (reactionActive ? (isArabic ? "ناجحة" : "Successful") : (isArabic ? "جاهزة للتشغيل" : "Ready to run"))
    : (isArabic ? "غير مكتملة" : "Incomplete");
  const bestCombos = Object.entries(electrodeStrength)
    .flatMap(([anode, av]) => Object.entries(electrodeStrength).filter(([cathode]) => cathode !== anode).map(([cathode, cv]) => ({
      anode,
      cathode,
      voltage: Number(Math.max(0.3, Math.min(2.1, Math.abs(av - cv) * 1.35 + 0.24)).toFixed(2))
    })))
    .sort((a, b) => b.voltage - a.voltage)
    .slice(0, 3);
  const dragStart = (kind, value) => (event) => {
    event.dataTransfer.setData("text/plain", JSON.stringify({ kind, value }));
  };
  const handleDrop = (target) => (event) => {
    event.preventDefault();
    try {
      const payload = JSON.parse(event.dataTransfer.getData("text/plain"));
      if (target === "anode" && payload.kind === "electrode") setAndAdvance("anode", payload.value, 1);
      if (target === "cathode" && payload.kind === "electrode") setAndAdvance("cathode", payload.value, 1);
      if (target === "electrolyteLeft" && payload.kind === "solution") setAndAdvance("electrolyteLeft", payload.value, 1);
      if (target === "electrolyteRight" && payload.kind === "solution") setAndAdvance("electrolyteRight", payload.value, 1);
      if (target === "saltBridge" && payload.kind === "bridge") setAndAdvance("saltBridge", payload.value, 2);
    } catch {
      return;
    }
  };
  const selectedOxidation = `${chemSettings.anode}(s) -> ${chemMetrics.anodeIon} + 2e-`;
  const selectedReduction = `${chemMetrics.cathodeIon} + 2e- -> ${chemSettings.cathode}(s)`;
  const overallReaction = `${chemSettings.anode}(s) + ${chemMetrics.cathodeIon}(aq) -> ${chemMetrics.anodeIon}(aq) + ${chemSettings.cathode}(s)`;
  const particles = Array.from({ length: reactionActive && chemMetrics.cellReady ? 6 : 3 }, (_, index) => index);

  return (
    <div className="chem-galv-lab">
      <div className="chem-galv-nav card-lite">
        <div className="chem-galv-brand">
          <strong>NAWA LAB</strong>
          <span>{isArabic ? "مختبر الخلية الغلفانية" : "Galvanic Cell Laboratory"}</span>
        </div>
        <div className="chem-galv-steps">
          {stageProgress.map((step, index) => (
            <div key={step.key} className={`chem-galv-step ${buildStep >= index ? "active" : ""}`}>
              <span>{index + 1}</span>
              <strong>{step.label}</strong>
            </div>
          ))}
        </div>
        <button className="micro-btn secondary" type="button" onClick={() => { resetChemistryExperiment(); setReactionActive(false); setBuildStep(0); }}>{isArabic ? "إعادة" : "Reset"}</button>
      </div>

      <div className="chem-galv-grid">
        <aside className="chem-galv-toolbox card-lite">
          <div className="chem-galv-title">
            <h4>{isArabic ? "أدوات المختبر" : "Laboratory Toolbox"}</h4>
            <p>{isArabic ? "اسحب العناصر إلى الخلية أو انقر عليها لبناء التجربة." : "Drag elements into the cell or click them to build the experiment."}</p>
          </div>

          <div className="chem-galv-group">
            <strong>{isArabic ? "الأقطاب" : "Electrodes"}</strong>
            <div className="chem-galv-card-grid">
              {electrodes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  draggable
                  onDragStart={dragStart("electrode", item.id)}
                  className={`chem-galv-item ${chemSettings.anode === item.id || chemSettings.cathode === item.id ? "active" : ""}`}
                  onClick={() => setAndAdvance(activeDropTarget === "cathode" ? "cathode" : "anode", item.id, 1)}
                >
                  <span className="chem-galv-symbol">{item.symbol}</span>
                  <strong>{item.name}</strong>
                  <small>{item.desc}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="chem-galv-group">
            <strong>{isArabic ? "المحاليل" : "Solutions"}</strong>
            <div className="chem-galv-card-grid bottles">
              {solutions.map((solution) => (
                <button
                  key={solution}
                  type="button"
                  draggable
                  onDragStart={dragStart("solution", solution)}
                  className={`chem-galv-bottle ${chemSettings.electrolyteLeft === solution || chemSettings.electrolyteRight === solution ? "active" : ""}`}
                  onClick={() => setAndAdvance(activeDropTarget === "electrolyteRight" ? "electrolyteRight" : "electrolyteLeft", solution, 1)}
                >
                  <span>{solution}</span>
                  <small>{isArabic ? "زجاجة متوهجة" : "Glowing bottle"}</small>
                </button>
              ))}
            </div>
          </div>

        </aside>

        <main className="chem-galv-stage card-lite">
          <div className="chem-galv-stage-head">
            <div>
              <h4>{isArabic ? "ورشة الخلية الغلفانية" : "Galvanic Cell Workspace"}</h4>
              <p>{isArabic ? "مختبر رقمي تفاعلي يُظهر الإلكترونات والأيونات والاختزال والأكسدة بطريقة مرئية." : "An immersive digital laboratory that makes electrons, ions, oxidation, and reduction visible."}</p>
            </div>
            <div className="chem-galv-actions">
              <button className="micro-btn" type="button" onClick={() => { setReactionActive((current) => !current); setBuildStep((current) => Math.max(current, 2)); }}>
                {reactionActive ? (isArabic ? "إيقاف التفاعل" : "Pause Reaction") : (isArabic ? "ابدأ التفاعل" : "Start Reaction")}
              </button>
            </div>
          </div>

          <div className="chem-galv-inline-controls">
            <div className="chem-galv-group compact">
              <strong>{isArabic ? "الجسر الملحي" : "Salt Bridge"}</strong>
              <div className="chem-galv-card-row">
                {bridges.map((bridge) => (
                  <button
                    key={bridge}
                    type="button"
                    draggable
                    onDragStart={dragStart("bridge", bridge)}
                    className={`chem-galv-chip ${chemSettings.saltBridge === bridge ? "active" : ""}`}
                    onClick={() => setAndAdvance("saltBridge", bridge, 2)}
                  >
                    {bridge}
                  </button>
                ))}
              </div>
            </div>

            <div className="chem-galv-group compact">
              <strong>{isArabic ? "سرعة الزمن" : "Time Speed"}</strong>
              <div className="bio-speed-actions">
                {[1, 5, 10].map((speed) => <button key={speed} className={`bio-speed-btn ${chemSettings.timeSpeed === speed ? "active" : ""}`} type="button" onClick={() => setSpeed(speed)}>{speed}x</button>)}
              </div>
            </div>
          </div>

          <div className="chem-galv-scene">
            <div className="chem-galv-status card-lite">
              <strong>{isArabic ? "حالة التفاعل" : "Reaction Status"}</strong>
              <span>{reactionStatus}</span>
              <p>{chemMetrics.feedback}</p>
            </div>

            <div className="chem-galv-voltmeter card-lite">
              <strong>{normalizedVoltage.toFixed(2)} V</strong>
              <span>{isArabic ? "فرق الجهد" : "Voltage"}</span>
            </div>

            <div className="chem-galv-wire">
              <div className={`chem-galv-bulb ${chemMetrics.cellReady && chemSettings.lampOn && reactionActive ? "on" : "off"}`} />
              <div className="chem-galv-electrons">
                {particles.map((item) => <span key={item} style={{ animationDelay: `${item * 120}ms` }}>e⁻</span>)}
              </div>
            </div>

            <div className="chem-galv-beakers">
              <div className={`chem-galv-beaker left ${activeDropTarget === "anode" || activeDropTarget === "electrolyteLeft" ? "highlight" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop("anode")}>
                <div className={`chem-galv-liquid left ${solutionTone[chemSettings.electrolyteLeft] || ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop("electrolyteLeft")} />
                <div className="chem-galv-electrode">{chemSettings.anode}</div>
                <div className="chem-galv-label">{chemSettings.electrolyteLeft}</div>
                <div className="chem-galv-reaction">
                  <strong>{isArabic ? "الأكسدة" : "Oxidation"}</strong>
                  <span>{selectedOxidation}</span>
                </div>
              </div>

              <div className={`chem-galv-bridge ${activeDropTarget === "saltBridge" ? "highlight" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop("saltBridge")}>
                <strong>{chemSettings.saltBridge}</strong>
                <span>{isArabic ? "حركة الأيونات" : "Ion movement"}</span>
              </div>

              <div className={`chem-galv-beaker right ${activeDropTarget === "cathode" || activeDropTarget === "electrolyteRight" ? "highlight" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop("cathode")}>
                <div className={`chem-galv-liquid right ${solutionTone[chemSettings.electrolyteRight] || ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop("electrolyteRight")} />
                <div className="chem-galv-electrode copper">{chemSettings.cathode}</div>
                <div className="chem-galv-label">{chemSettings.electrolyteRight}</div>
                <div className="chem-galv-reaction">
                  <strong>{isArabic ? "الاختزال" : "Reduction"}</strong>
                  <span>{selectedReduction}</span>
                </div>
              </div>
            </div>

            <div className="chem-galv-equation card-lite">
              <strong>{isArabic ? "المعادلة الكلية" : "Overall Reaction"}</strong>
              <span>{overallReaction}</span>
            </div>
          </div>
        </main>

        <aside className="chem-galv-results card-lite">
          <div className="chem-galv-panel">
            <div className="chemv2-panel-head">
              <strong>{isArabic ? "ماذا يحدث؟" : "What's happening?"}</strong>
            </div>
            <p className="chem-galv-assistant">{assistantText}</p>
          </div>

          <div className="chem-galv-panel">
            <div className="chemv2-panel-head">
              <strong>{isArabic ? "وضع التحدي" : "Challenge Mode"}</strong>
            </div>
            <div className="chem-galv-ranking">
              {bestCombos.map((item, index) => (
                <div className="chem-galv-rank" key={`${item.anode}-${item.cathode}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.anode} / {item.cathode}</strong>
                  <em>{item.voltage} V</em>
                </div>
              ))}
            </div>
            <p className="chem-galv-discovery">{isArabic ? "حاول بناء الخلية الأعلى جهدًا بمقارنة نشاط الأقطاب المختلفة." : "Try building the highest-voltage cell by comparing electrode reactivity."}</p>
          </div>

          <div className="chem-chart-stack">
            <MiniTrendChart title={isArabic ? "فرق الجهد مع الزمن" : "Voltage Over Time"} points={chemTrend} strokeClass="oxygen" valueKey="voltage" />
            <MiniTrendChart title={isArabic ? "شدة التيار مع الزمن" : "Current Over Time"} points={chemTrend} strokeClass="carbon" valueKey="current" />
          </div>

          <div className="chem-galv-panel">
            <div className="chemv2-panel-head">
              <strong>{isArabic ? "ملخص الأداء" : "Cell Performance"}</strong>
              <span className={`chem-status-chip ${chemMetrics.status}`}>{statusBadge}</span>
            </div>
            <div className="chem-galv-stat-grid">
              <div className="chem-galv-stat"><span>{isArabic ? "فرق الجهد" : "Voltage"}</span><strong>{normalizedVoltage.toFixed(2)} V</strong></div>
              <div className="chem-galv-stat"><span>{isArabic ? "تدفق الإلكترونات" : "Electron Flow"}</span><strong>{flowLabel}</strong></div>
              <div className="chem-galv-stat"><span>{isArabic ? "حالة التفاعل" : "Reaction Status"}</span><strong>{reactionStatus}</strong></div>
              <div className="chem-galv-stat"><span>{isArabic ? "الاكتشاف" : "Discovery"}</span><strong>{isArabic ? "كلما زاد فرق النشاط زاد الجهد." : "Higher reactivity gap raises voltage."}</strong></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ChemistryIonDetectionSimulation = ({ c, currentMaterial, resetChemistryExperiment }) => {
  const isArabic = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
  const ionPool = useMemo(() => ([
    { ion: "Cl-", label: "Cl⁻", name: isArabic ? "كلوريد" : "Chloride" },
    { ion: "SO4", label: "SO₄²⁻", name: isArabic ? "كبريتات" : "Sulfate" },
    { ion: "CO3", label: "CO₃²⁻", name: isArabic ? "كربونات" : "Carbonate" },
    { ion: "Cu", label: "Cu²⁺", name: isArabic ? "نحاس" : "Copper" },
    { ion: "Fe2", label: "Fe²⁺", name: isArabic ? "حديد ثنائي" : "Iron(II)" },
    { ion: "Fe3", label: "Fe³⁺", name: isArabic ? "حديد ثلاثي" : "Iron(III)" },
    { ion: "NH4", label: "NH₄⁺", name: isArabic ? "أمونيوم" : "Ammonium" },
    { ion: "Zn", label: "Zn²⁺", name: isArabic ? "زنك" : "Zinc" },
    { ion: "Ca", label: "Ca²⁺", name: isArabic ? "كالسيوم" : "Calcium" }
  ]), [isArabic]);

  const reagents = [
    { id: "AgNO3", label: "AgNO₃", name: isArabic ? "نترات الفضة" : "Silver nitrate" },
    { id: "BaCl2", label: "BaCl₂", name: isArabic ? "كلوريد الباريوم" : "Barium chloride" },
    { id: "NaOH", label: "NaOH", name: isArabic ? "هيدروكسيد الصوديوم" : "Sodium hydroxide" },
    { id: "NH3", label: "NH₃", name: isArabic ? "الأمونيا" : "Ammonia solution" },
    { id: "HCl", label: "HCl", name: isArabic ? "حمض هيدروكلوريك" : "Hydrochloric acid" },
    { id: "HNO3", label: "HNO₃", name: isArabic ? "حمض نيتريك مخفف" : "Dilute nitric acid" }
  ];

  const sampleTypes = ionPool.map((item) => item.ion);
  const [sampleIndex, setSampleIndex] = useState(() => Math.floor(Math.random() * sampleTypes.length));
  const [selectedReagent, setSelectedReagent] = useState("AgNO3");
  const [useExcess, setUseExcess] = useState(false);
  const [guidedMode, setGuidedMode] = useState(true);
  const [teacherMode, setTeacherMode] = useState(true);
  const [log, setLog] = useState([]);
  const [confidence, setConfidence] = useState(16);
  const [possible, setPossible] = useState(sampleTypes);
  const [observation, setObservation] = useState({
    reagent: isArabic ? "اختر كاشفًا" : "Choose a reagent",
    observation: isArabic ? "ابدأ التجربة من اليسار." : "Start the test from the shelf.",
    meaning: isArabic ? "سيظهر التحليل هنا مباشرة." : "The interpretation will appear here."
  });
  const [finalIon, setFinalIon] = useState("");
  const [revealed, setRevealed] = useState(false);

  const sample = ionPool[sampleIndex];

  const makeSample = () => {
    const nextIndex = Math.floor(Math.random() * sampleTypes.length);
    setSampleIndex(nextIndex);
    setSelectedReagent("AgNO3");
    setUseExcess(false);
    setLog([]);
    setConfidence(16);
    setPossible(sampleTypes);
    setFinalIon("");
    setRevealed(false);
    setObservation({
      reagent: isArabic ? "عينة جديدة" : "New sample",
      observation: isArabic ? "ابدأ بكاشف واحد واضح." : "Start with one clear reagent.",
      meaning: isArabic ? "سجّل أول ملاحظة ثم واصل الاستقصاء." : "Record the first observation, then continue."
    });
  };

  const getReaction = (ion, reagent, excess) => {
    const shared = {
      reagent: reagents.find((item) => item.id === reagent)?.name || reagent,
      observation: isArabic ? "لا تغير مرئي" : "No visible change",
      meaning: isArabic ? "لا توجد دلالة قوية هنا." : "No strong clue from this test.",
      nextPossible: null,
      boost: 7,
      icon: "·"
    };

    if (reagent === "AgNO3") {
      if (ion === "Cl-") return { ...shared, observation: c.chemIonWhitePpt || (isArabic ? "راسب أبيض" : "White precipitate"), meaning: isArabic ? "يدل على وجود أيون الكلوريد." : "This points to chloride ions.", nextPossible: ["Cl-"], boost: 28, icon: "○" };
      return { ...shared, meaning: isArabic ? "غياب الراسب يستبعد الكلوريد." : "No precipitate suggests chloride is unlikely.", nextPossible: sampleTypes.filter((item) => item !== "Cl-"), boost: 12 };
    }
    if (reagent === "BaCl2") {
      if (ion === "SO4") return { ...shared, observation: c.chemIonWhitePpt || (isArabic ? "راسب أبيض" : "White precipitate"), meaning: isArabic ? "يدل على وجود الكبريتات." : "This indicates sulfate ions.", nextPossible: ["SO4"], boost: 28, icon: "○" };
      return { ...shared, meaning: isArabic ? "غياب الراسب يستبعد الكبريتات." : "No precipitate suggests sulfate is unlikely.", nextPossible: sampleTypes.filter((item) => item !== "SO4"), boost: 12 };
    }
    if (reagent === "HCl" || reagent === "HNO3") {
      if (ion === "CO3") return { ...shared, observation: c.chemIonGas || (isArabic ? "فقاعات غاز" : "Gas bubbles"), meaning: isArabic ? "الغاز يعني كربونات." : "Gas bubbles point to carbonate.", nextPossible: ["CO3"], boost: 30, icon: "◌" };
      return { ...shared, meaning: isArabic ? "عدم ظهور فقاعات يستبعد الكربونات." : "No bubbling makes carbonate unlikely.", nextPossible: sampleTypes.filter((item) => item !== "CO3"), boost: 12 };
    }
    if (reagent === "NaOH" || reagent === "NH3") {
      if (ion === "Cu") return { ...shared, observation: c.chemIonBluePpt || (isArabic ? "راسب أزرق" : "Blue precipitate"), meaning: isArabic ? "هذا يشير إلى النحاس الثنائي." : "This suggests copper(II).", nextPossible: ["Cu"], boost: 30, icon: "◉" };
      if (ion === "Fe2") return { ...shared, observation: c.chemIonGreenPpt || (isArabic ? "راسب أخضر" : "Green precipitate"), meaning: isArabic ? "هذا يشير إلى الحديد الثنائي." : "This suggests iron(II).", nextPossible: ["Fe2"], boost: 30, icon: "◉" };
      if (ion === "Fe3") return { ...shared, observation: c.chemIonBrownPpt || (isArabic ? "راسب بني" : "Brown precipitate"), meaning: isArabic ? "هذا يشير إلى الحديد الثلاثي." : "This suggests iron(III).", nextPossible: ["Fe3"], boost: 30, icon: "◉" };
      if (ion === "NH4") return { ...shared, observation: c.chemIonGas || (isArabic ? "غاز الأمونيا" : "Ammonia gas"), meaning: isArabic ? "الأمونيا تعني أمونيوم." : "Ammonia gas points to ammonium.", nextPossible: ["NH4"], boost: 30, icon: "◌" };
      if (ion === "Zn") return { ...shared, observation: useExcess ? (c.chemIonDissolves || (isArabic ? "يذوب الراسب في الفائض" : "Precipitate dissolves in excess")) : (c.chemIonWhitePpt || (isArabic ? "راسب أبيض" : "White precipitate")), meaning: isArabic ? "الزنك يظهر راسبًا أبيض ويذوب في الفائض." : "Zinc gives a white precipitate that dissolves in excess.", nextPossible: ["Zn"], boost: 32, icon: useExcess ? "◌" : "○" };
      if (ion === "Ca") return { ...shared, observation: c.chemIonWhitePpt || (isArabic ? "راسب أبيض" : "White precipitate"), meaning: isArabic ? "بقاء الراسب يوحي بالكالسيوم." : "A remaining white precipitate suggests calcium.", nextPossible: ["Ca"], boost: 22, icon: "○" };
      return { ...shared, meaning: isArabic ? "هذا الكاشف يستبعد بعض الأيونات الموجبة." : "This reagent helps exclude some cations.", nextPossible: sampleTypes.filter((item) => !["Cu", "Fe2", "Fe3", "NH4", "Zn", "Ca"].includes(item)), boost: 10 };
    }

    return shared;
  };

  const applyReagent = () => {
    const result = getReaction(sample.ion, selectedReagent, useExcess);
    setObservation({
      reagent: reagents.find((item) => item.id === selectedReagent)?.name || selectedReagent,
      observation: result.observation,
      meaning: result.meaning
    });
    setLog((current) => [{
      reagent: reagents.find((item) => item.id === selectedReagent)?.label || selectedReagent,
      observation: result.observation,
      interpretation: result.meaning
    }, ...current].slice(0, 6));
    setConfidence((value) => Math.min(100, value + result.boost));
    if (result.nextPossible) {
      setPossible((current) => {
        const next = current.filter((item) => result.nextPossible.includes(item));
        return next.length ? next : current;
      });
      if (result.nextPossible.length === 1) setFinalIon(result.nextPossible[0]);
    } else {
      setPossible((current) => current);
    }
    if (guidedMode && log.length === 0) {
      setObservation((current) => ({ ...current, meaning: current.meaning || (isArabic ? "سجل الملاحظة الأولى ثم جرّب كاشفًا آخر." : "Record the first clue, then try another reagent.") }));
    }
  };

  const finalIonLabel = ionPool.find((item) => item.ion === (finalIon || sample.ion)) || sample;
  const couldBe = possible.length > 1 ? possible : [finalIon || sample.ion];

  const handleFinalAnswer = () => {
    if (!possible.length || confidence < 28) {
      setObservation({
        reagent: isArabic ? "الخطوة الأخيرة" : "Final step",
        observation: isArabic ? "أضف اختبارًا إضافيًا أولًا." : "Run one more test first.",
        meaning: c.chemIonFinalHint || (isArabic ? "استخدم كاشفًا آخر لتأكيد الأيون." : "Use one more reagent to confirm the ion.")
      });
      return;
    }
    setFinalIon(possible[0] || sample.ion);
    setRevealed(true);
    setConfidence(100);
  };

  const handleReset = () => {
    resetChemistryExperiment();
    makeSample();
  };

  return (
    <div className="chem-ion-lab">
      <aside className="chem-ion-shelf card-lite">
        <div className="chem-panel-head">
          <strong>{c.chemIonShelfTitle || (isArabic ? "رف الكواشف" : "Reagent Shelf")}</strong>
          <button className="micro-btn secondary" type="button" onClick={handleReset}>{c.bioReset || (isArabic ? "إعادة" : "Reset")}</button>
        </div>
        <div className="chem-ion-sample card-lite">
          <span>{c.chemIonLabName || (isArabic ? "عينة مجهولة X" : "Unknown Solution X")}</span>
          <strong>{isArabic ? "عينة مجهولة" : "Unknown sample"}</strong>
          <p>{c.chemIonLabText || (isArabic ? "أضف كاشفًا لتحديد الأيون." : "Add reagents to identify the ion.")}</p>
        </div>
        <div className="chem-ion-reagent-grid">
          {reagents.map((reagent) => (
            <button
              key={reagent.id}
              type="button"
              className={`chem-ion-reagent ${selectedReagent === reagent.id ? "active" : ""}`}
              onClick={() => setSelectedReagent(reagent.id)}
            >
              <strong>{reagent.label}</strong>
              <span>{reagent.name}</span>
            </button>
          ))}
        </div>
        <div className="chem-ion-toggle-row">
          <button type="button" className={`chem-ion-toggle ${guidedMode ? "active" : ""}`} onClick={() => setGuidedMode((current) => !current)}>{c.chemIonGuidedMode || (isArabic ? "الوضع الموجّه" : "Guided Mode")}</button>
          <button type="button" className={`chem-ion-toggle ${teacherMode ? "active" : ""}`} onClick={() => setTeacherMode((current) => !current)}>{c.chemIonTeacherMode || (isArabic ? "وضع المعلم" : "Teacher Mode")}</button>
        </div>
        <div className="chem-ion-toggle-row">
          <button type="button" className={`chem-ion-toggle ${useExcess ? "active" : ""}`} onClick={() => setUseExcess((current) => !current)}>{isArabic ? "فائض الكاشف" : "Use excess"}</button>
          <button type="button" className="micro-btn" onClick={makeSample}>{c.chemIonNewSample || (isArabic ? "عينة جديدة" : "Try Another Unknown")}</button>
        </div>
      </aside>

      <section className="chem-ion-scene card-lite">
        <div className="chem-ion-head">
          <div>
            <h3>{c.chemIonLabTitle || (isArabic ? "الكيمياء • كشف الأيونات" : "Chemistry • Ion Detection")}</h3>
            <p>{c.chemIonTag || (isArabic ? "محاكاة تحليل أيونات" : "Ion analysis simulation")}</p>
          </div>
          <div className="chem-ion-stepper">
            <span>{c.chemIonGuide1 || (isArabic ? "اختر كاشفًا" : "Pick a reagent")}</span>
            <span>{c.chemIonGuide2 || (isArabic ? "شاهد التفاعل" : "Watch the reaction")}</span>
            <span>{c.chemIonGuide3 || (isArabic ? "حدد الأيون" : "Narrow the ion list")}</span>
          </div>
        </div>

        <div className="chem-ion-chamber">
          <div className="chem-ion-tube">
            <div className="chem-ion-liquid"></div>
            <div className="chem-ion-sample-mark">{sample.label}</div>
            {selectedReagent ? <div className="chem-ion-drop">{selectedReagent}</div> : null}
            <div className={`chem-ion-visual ${observation.observation.includes("white") || observation.observation.includes("أبيض") ? "white" : observation.observation.includes("blue") || observation.observation.includes("أزرق") ? "blue" : observation.observation.includes("green") || observation.observation.includes("أخضر") ? "green" : observation.observation.includes("brown") || observation.observation.includes("بني") ? "brown" : observation.observation.includes("Gas") || observation.observation.includes("غاز") ? "gas" : ""}`}></div>
            <div className="chem-ion-magnifier">
              <strong>{observation.observation}</strong>
              <span>{observation.meaning}</span>
            </div>
          </div>
          <div className="chem-ion-footer">
            <div className="chem-ion-guess">
              <span>{c.chemIonObservationTitle || (isArabic ? "الملاحظة الحية" : "Live Observation")}</span>
              <strong>{observation.reagent}</strong>
            </div>
            <button className="micro-btn" type="button" onClick={applyReagent}>{isArabic ? "أضف الكاشف" : "Add Reagent"}</button>
          </div>
        </div>
      </section>

      <aside className="chem-ion-results card-lite">
        <div className="chem-panel-head">
          <strong>{c.chemIonObservationTitle || (isArabic ? "الملاحظة الحية" : "Live Observation")}</strong>
          <span className="chem-status-chip medium">{Math.round(confidence)}%</span>
        </div>
        <div className="chem-ion-observation card-lite">
          <span>{observation.reagent}</span>
          <strong>{observation.observation}</strong>
          <p>{observation.meaning}</p>
        </div>
        <div className="chem-ion-log">
          <strong>{c.chemIonLogTitle || (isArabic ? "سجل الملاحظات" : "Observation Log")}</strong>
          {log.length ? log.map((entry, index) => (
            <div className="chem-ion-log-row" key={`${entry.reagent}-${index}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{entry.reagent}</strong>
              <em>{entry.observation}</em>
            </div>
          )) : <div className="chem-ion-empty">{isArabic ? "ابدأ بأول اختبار." : "Start with the first test."}</div>}
        </div>
        <div className="chem-ion-chip-wrap">
          <strong>{c.chemIonPossibleTitle || (isArabic ? "الأيونات المحتملة" : "Possible Ions")}</strong>
          <div className="chem-ion-chip-grid">
            {ionPool.map((item) => (
              <span key={item.ion} className={`chem-ion-chip ${couldBe.includes(item.ion) ? "active" : ""}`}>{item.label}</span>
            ))}
          </div>
        </div>
        <div className="chem-ion-confidence">
          <div className="chem-panel-head">
            <strong>{c.chemIonConfidenceTitle || (isArabic ? "مستوى الثقة" : "Confidence")}</strong>
            <span>{Math.round(confidence)}%</span>
          </div>
          <div className="chem-ion-meter"><span style={{ width: `${confidence}%` }}></span></div>
        </div>
        <div className="chem-ion-final card-lite">
          <strong>{c.chemIonFinalTitle || (isArabic ? "الجواب النهائي" : "Final Answer")}</strong>
          <p>{revealed ? `${finalIonLabel.label} - ${finalIonLabel.name}` : (guidedMode ? (c.chemIonFinalHint || (isArabic ? "استخدم كاشفًا آخر أولًا." : "Use one more reagent first.")) : (isArabic ? "جرّب تحديد الأيون الآن." : "Try identifying the ion now."))}</p>
          <div className="chem-ion-final-actions">
            <button className="micro-btn" type="button" onClick={handleFinalAnswer}>{c.chemIonFinalButton || (isArabic ? "حدد الأيون النهائي" : "Identify Final Ion")}</button>
            <button className="micro-btn secondary" type="button" onClick={() => setRevealed(true)}>{c.chemIonRevealAnswer || (isArabic ? "كشف الجواب" : "Reveal Answer")}</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

const ExperimentSection = ({ c, activeMaterial, setActiveMaterial, stageRef, dragging, setDragging, handleStagePointer, coilLoopOffsets, bulbPower, magnetSvgX, inducedSignal, coilTurns, magnetX, setCoilTurns, updateMagnetPosition, bioSettings, setBioSettings, bioMetrics, bioTrend, resetBiologyExperiment, chemSettings, setChemSettings, chemMetrics, chemTrend, resetChemistryExperiment, onOpenQuiz, onSelectExperiment }) => {
  const materials = Array.isArray(c.materials) ? c.materials : [];
  const currentMaterial = materials.find((material) => material.id === activeMaterial) || materials[0];
  const [selectedExperimentIndex, setSelectedExperimentIndex] = useState(null);
  const turnOptions = [2, 4, 6, 8, 10, 12, 14, 16, 18];
  const materialIcons = {
    physics: "⚛️",
    chemistry: "🧪",
    biology: "🌿"
  };
  const experimentIcons = {
    physics: (
      <svg viewBox="0 0 120 120" className="experiment-card-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="expPhysicsMagnetA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4d8dff" />
            <stop offset="100%" stopColor="#2245c7" />
          </linearGradient>
          <linearGradient id="expPhysicsMagnetB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5a7d" />
            <stop offset="100%" stopColor="#d62d59" />
          </linearGradient>
        </defs>
        <path d="M30 20 C18 20 12 28 12 40 v28 c0 22 16 40 38 40 h20 c22 0 38-18 38-40 V40 c0-12-6-20-18-20 h-6 v46 c0 12-8 22-20 22 h-4 c-12 0-20-10-20-22 V20z" fill="rgba(69,227,195,0.12)" stroke="rgba(69,227,195,0.3)" strokeWidth="3"/>
        <path d="M26 20 h20 v46 c0 10 6 16 14 16 h0 V102 h-10 c-19 0-32-14-32-34 V40 c0-10 3-20 8-20z" fill="url(#expPhysicsMagnetA)"/>
        <path d="M74 20 h20 c5 0 8 10 8 20 v28 c0 20-13 34-32 34 H60 V82 h0 c8 0 14-6 14-16 V20z" fill="url(#expPhysicsMagnetB)"/>
        <path d="M41 34 c7 6 12 18 12 30" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M79 34 c-7 6 -12 18 -12 30" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    ),
    physicsCollision: (
      <svg viewBox="0 0 120 120" className="experiment-card-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="expCollisionA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#57a7ff" />
            <stop offset="100%" stopColor="#2948c7" />
          </linearGradient>
          <linearGradient id="expCollisionB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6f8a" />
            <stop offset="100%" stopColor="#df335f" />
          </linearGradient>
        </defs>
        <path d="M18 76 H102" stroke="rgba(255,255,255,0.28)" strokeWidth="4" strokeLinecap="round" />
        <rect x="18" y="44" width="26" height="20" rx="5" fill="url(#expCollisionA)" />
        <rect x="76" y="44" width="26" height="20" rx="5" fill="url(#expCollisionB)" />
        <path d="M44 54 H76" stroke="rgba(255,255,255,0.5)" strokeWidth="5" strokeLinecap="round" />
        <path d="M44 54 l8 -6" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
        <path d="M76 54 l-8 6" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="29" cy="68" r="6" fill="rgba(22,34,74,0.9)" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <circle cx="91" cy="68" r="6" fill="rgba(22,34,74,0.9)" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        <circle cx="60" cy="54" r="10" fill="rgba(255,215,120,0.22)" />
      </svg>
    ),
    chemistry: (
      <svg viewBox="0 0 120 120" className="experiment-card-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="expChemFlask" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7cf0d5" />
            <stop offset="100%" stopColor="#2d7cff" />
          </linearGradient>
        </defs>
        <path d="M48 14 h24" stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round"/>
        <path d="M56 16 v28 l-22 34 c-8 12 1 28 16 28 h20 c15 0 24-16 16-28 L64 44 V16" fill="rgba(255,255,255,0.04)" stroke="rgba(190,232,255,0.72)" strokeWidth="5" strokeLinejoin="round"/>
        <path d="M40 72 c7-6 14-9 20-9 s13 3 20 9 v12 c0 8-5 16-14 16 H54 c-9 0-14-8-14-16z" fill="url(#expChemFlask)"/>
        <circle cx="52" cy="76" r="4" fill="rgba(255,255,255,0.35)"/>
        <circle cx="68" cy="84" r="3" fill="rgba(255,255,255,0.3)"/>
      </svg>
    ),
    biology: (
      <svg viewBox="0 0 120 120" className="experiment-card-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="expBioLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#72f2a5" />
            <stop offset="100%" stopColor="#1b9e5a" />
          </linearGradient>
        </defs>
        <path d="M60 102 V48" stroke="rgba(134,231,168,0.75)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M60 50 C52 24 28 22 20 42 c-8 19 8 38 28 38 7 0 12-2 12-2" fill="url(#expBioLeaf)"/>
        <path d="M60 56 C68 28 92 26 100 46 c8 19-8 36-28 36-7 0-12-2-12-2" fill="url(#expBioLeaf)"/>
        <path d="M60 50 C49 45 38 47 28 58" stroke="rgba(255,255,255,0.28)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M60 56 C71 51 82 53 92 64" stroke="rgba(255,255,255,0.28)" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    biologyDNA: (
      <svg viewBox="0 0 120 120" className="experiment-card-art-svg" aria-hidden="true">
        <defs>
          <linearGradient id="expBioDNAA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7be7ff" />
            <stop offset="100%" stopColor="#3d63ff" />
          </linearGradient>
          <linearGradient id="expBioDNAB" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff5c8e" />
            <stop offset="100%" stopColor="#d92d67" />
          </linearGradient>
        </defs>
        <path d="M34 18 C50 34 50 52 34 68 C18 84 18 102 34 108" fill="none" stroke="rgba(123,231,255,0.45)" strokeWidth="6" strokeLinecap="round" />
        <path d="M86 18 C70 34 70 52 86 68 C102 84 102 102 86 108" fill="none" stroke="rgba(255,92,142,0.45)" strokeWidth="6" strokeLinecap="round" />
        <path d="M40 28 H80" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
        <path d="M38 44 H82" stroke="rgba(255,255,255,0.6)" strokeWidth="4" strokeLinecap="round" />
        <path d="M36 60 H84" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" />
        <path d="M38 76 H82" stroke="rgba(255,255,255,0.6)" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 92 H80" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="42" cy="28" r="7" fill="url(#expBioDNAA)" />
        <circle cx="78" cy="28" r="7" fill="url(#expBioDNAB)" />
      </svg>
    )
  };

  useEffect(() => {
    setSelectedExperimentIndex(null);
  }, [activeMaterial]);

  // Report the open experiment upward so the AI tutor knows the student's context.
  // Runs before the early return below, so the hook order stays stable.
  useEffect(() => {
    if (typeof onSelectExperiment !== "function") return;
    if (selectedExperimentIndex === null) {
      onSelectExperiment(null);
      return;
    }
    const list = Array.isArray(currentMaterial?.experiments) ? currentMaterial.experiments : [];
    const item = list[selectedExperimentIndex];
    onSelectExperiment({ index: selectedExperimentIndex, title: item?.title || "" });
  }, [selectedExperimentIndex, currentMaterial, onSelectExperiment]);

  if (!currentMaterial) return null;
  const isPhysics = currentMaterial.id === "physics";
  const isChemistry = currentMaterial.id === "chemistry";
  const isBiology = currentMaterial.id === "biology";
  const experiments = Array.isArray(currentMaterial.experiments) ? currentMaterial.experiments : [];
  const selectedExperiment = selectedExperimentIndex === null ? null : experiments[selectedExperimentIndex];
  const formatExperimentNumber = (title) => {
    const match = String(title || "").match(/^(\d+)\s*[-–—]\s*(.*)$/);
    return match ? { number: match[1], title: match[2] } : { number: "", title: title || "" };
  };
  const isPhysicsInduction = isPhysics && selectedExperimentIndex !== 1;
  const isRtl = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
  const isChemistryIon = isChemistry && selectedExperimentIndex === 1;
  const experimentLabTitle = isPhysics && selectedExperimentIndex === 1
    ? (isRtl ? "مختبر الفيزياء • الزخم الخطي" : c.physicsCollisionLabTitle)
    : isChemistryIon
      ? (c.chemIonLabTitle || currentMaterial.labTitle)
    : isBiology && selectedExperimentIndex === 1
      ? (c.bioDnaLabTitle || currentMaterial.labTitle)
      : currentMaterial.labTitle;
  const experimentLabTag = isPhysics && selectedExperimentIndex === 1
    ? (isRtl ? "الزخم الخطي" : c.physicsCollisionTag)
    : isChemistryIon
      ? (c.chemIonTag || currentMaterial.tag)
    : isBiology && selectedExperimentIndex === 1
      ? (c.bioDnaTag || currentMaterial.tag)
      : currentMaterial.tag;
  const experimentLabName = isPhysics && selectedExperimentIndex === 1
    ? c.physicsCollisionName
    : isChemistryIon
      ? (c.chemIonLabName || currentMaterial.labName)
    : isBiology && selectedExperimentIndex === 1
      ? (c.bioDnaLabName || currentMaterial.labName)
      : currentMaterial.labName;
  const experimentLabText = isPhysics && selectedExperimentIndex === 1
    ? c.physicsCollisionText
    : isChemistryIon
      ? (c.chemIonLabText || currentMaterial.labText)
    : isBiology && selectedExperimentIndex === 1
      ? (c.bioDnaLabText || currentMaterial.labText)
      : currentMaterial.labText;
  return (
    <section id="experience">
      <div className="section-head"><div><h2>{c.experienceTitle}</h2><p>{c.experienceText}</p></div></div>
      <div className="materials-shell">
        <div className="materials-tabs">
          {materials.map((material) => (
            <button
              key={material.id}
              type="button"
              className={`materials-tab ${material.id === currentMaterial.id ? "active" : ""}`}
              onClick={() => setActiveMaterial(material.id)}
            >
              <span className="materials-tab-icon" aria-hidden="true">{materialIcons[material.id] || "•"}</span>
              <span>{material.label}</span>
            </button>
          ))}
        </div>
        <div className="materials-subtitle">{currentMaterial.note}</div>
      </div>
      <div className="experiment-browser">
        <div className="experiment-picker-grid">
          {experiments.map((item, index) => (
            (() => {
              const parts = formatExperimentNumber(item.title);
              return (
            <div
              key={item.title}
              className={`experiment-picker-card ${selectedExperimentIndex === index ? "active" : ""}`}
            >
              <div className="experiment-card-copy">
                <div className="experiment-card-title">
                  <div className="experiment-number-badge">{parts.number || String(index + 1).padStart(2, "0")}</div>
                  <strong>{parts.title}</strong>
                </div>
                <span>{item.text}</span>
                <button className="micro-btn experiment-start-btn" type="button" onClick={() => setSelectedExperimentIndex(selectedExperimentIndex === index ? null : index)}>{c.experimentStart}</button>
              </div>
              <div className="experiment-card-art">
                {currentMaterial.id === "physics" && index === 1
                  ? experimentIcons.physicsCollision
                  : currentMaterial.id === "biology" && index === 1
                    ? experimentIcons.biologyDNA
                    : experimentIcons[currentMaterial.id] || <span className="experiment-card-fallback">+</span>}
              </div>
            </div>
              );
            })()
          ))}
        </div>
      </div>
      {selectedExperiment ? (
      <div className="lab-experiment">
        <div className="lab-experiment-head">
          <div>
            <div className="lab-head-row">
              <h3>{experimentLabTitle}</h3>
              <div className="lab-head-chips">
                <div className="lab-tag">{experimentLabTag}</div>
                {(() => {
                  const parts = formatExperimentNumber(selectedExperiment.title);
                  return <div className="lab-experiment-pill"><span className="lab-experiment-pill-number">{parts.number}</span><span>{parts.title}</span></div>;
                })()}
              </div>
            </div>
            <p><strong>{experimentLabName}</strong> - {experimentLabText}</p>
          </div>
          <div className="lab-top-actions">
            <button
              className="micro-btn"
              type="button"
              onClick={() => onOpenQuiz({
                materialId: currentMaterial.id,
                materialLabel: currentMaterial.label,
                experimentTitle: selectedExperiment.title,
                experimentIndex: selectedExperimentIndex
              })}
            >
              {c.openQuizButton}
            </button>
          </div>
        </div>
        {isPhysicsInduction ? (
          <div className="induction-grid">
            <ExperimentScene stageRef={stageRef} dragging={dragging} setDragging={setDragging} handleStagePointer={handleStagePointer} coilLoopOffsets={coilLoopOffsets} bulbPower={bulbPower} magnetSvgX={magnetSvgX} />
            <div className="induction-panel">
              <div className="meter-card"><div className="meter-head"><strong>{c.outputLabel}</strong><span className="meter-value">{inducedSignal} - {c.outputUnit}</span></div><div className="meter-track"><div className="meter-fill" style={{ width: `${inducedSignal}%` }}></div></div><div className="meter-note">{c.physicsHint}</div></div>
              <div className="control-card">
                <div className="control-row">
                  <label><span>{c.turnsLabel}</span><strong>{coilTurns}</strong></label>
                  <div className="turn-option-grid" role="radiogroup" aria-label={c.turnsLabel}>
                    {turnOptions.map((turns) => (
                      <button
                        key={turns}
                        type="button"
                        className={`turn-option ${coilTurns === turns ? "active" : ""}`}
                        onClick={() => setCoilTurns(turns)}
                        aria-pressed={coilTurns === turns}
                      >
                        {turns}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="control-note">{c.physicsHint}</div>
                <div className="control-actions"><button className="micro-btn secondary" type="button" onClick={() => updateMagnetPosition(0.16)}>{c.resetMagnet}</button></div>
                <div className="control-note">{currentMaterial.labText}</div>
              </div>
            </div>
          </div>
        ) : isPhysics ? (
          <PhysicsCollisionSimulation c={c} />
        ) : isChemistry ? (
          selectedExperimentIndex === 1 ? (
            <ChemistryIonDetectionSimulation c={c} currentMaterial={currentMaterial} resetChemistryExperiment={resetChemistryExperiment} />
          ) : (
            <ChemistrySimulation c={c} chemSettings={chemSettings} setChemSettings={setChemSettings} chemMetrics={chemMetrics} chemTrend={chemTrend} resetChemistryExperiment={resetChemistryExperiment} />
          )
        ) : isBiology ? (
          <BiologySimulationV2 c={c} currentMaterial={currentMaterial} bioSettings={bioSettings} setBioSettings={setBioSettings} bioMetrics={bioMetrics} bioTrend={bioTrend} resetBiologyExperiment={resetBiologyExperiment} selectedExperimentIndex={selectedExperimentIndex} />
        ) : (
          <div className="material-placeholder">
            <strong>{currentMaterial.emptyTitle}</strong>
            <p>{currentMaterial.emptyText}</p>
          </div>
        )}
      </div>
      ) : null}
    </section>
  );
};

const FAQSection = ({ c }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq">
      <div className="section-head"><div><h2>{c.faqTitle}</h2><p>{c.faqText}</p></div></div>
      <div className="faq-list">
        {c.faqItems.map((item, index) => {
          const isOpen = index === openIndex;
          return (
            <article className={`faq-item ${isOpen ? "open" : ""}`} key={item.question}>
              <button className="faq-question" type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                <span>{item.question}</span>
                <span className={`faq-chevron ${isOpen ? "open" : ""}`}>v</span>
              </button>
              {isOpen ? <div className="faq-answer"><p>{item.answer}</p></div> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
};

const FooterSection = ({ c }) => (
  <footer className="footer" id="contact">
    <div className="footer-summary">{c.footer.map((item) => <div key={item}>{item}</div>)}</div>
    <div className="contact-cards">
      <div className="contact-card"><strong>{c.contactTitle}</strong><div>{c.contactNameLabel}: {c.contactName}</div><div>{c.contactPhoneLabel}: {c.contactPhone}</div><div>{c.contactLinkedInLabel}: <a href="https://www.linkedin.com/in/salma-moath-/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B6PS4y5SvTTy8eCqiFVwt1g%3D%3D" target="_blank" rel="noreferrer">linkedin.com/in/salma-moath-</a></div></div>
      <div className="contact-card"><strong>{c.contactTitle}</strong><div>{c.contactNameLabel}: {c.secondaryContactName}</div><div>{c.contactPhoneLabel}: {c.secondaryContactPhone}</div></div>
    </div>
  </footer>
);

/** Renders the agent's plain-text reply, preserving its line breaks. */
const ChatMessageBody = ({ text }) => (
  <>
    {String(text).split("\n").map((line, index) => (
      <span key={index} className="ai-chat-line">{line}</span>
    ))}
  </>
);

/**
 * A scored quiz inside the chat.
 *
 * The questions come from the model, but the marking is done here in plain
 * JavaScript against the answer index the API returned. Asking the model to
 * remember which letter was correct across turns proved unreliable, and a
 * tutor that marks a right answer wrong is worse than no tutor at all.
 */
const ChatQuizCard = ({ c, questions }) => {
  const [picked, setPicked] = useState({});
  const answeredCount = Object.keys(picked).length;
  const score = questions.reduce(
    (total, question, index) => total + (picked[index] === question.answer ? 1 : 0),
    0
  );

  return (
    <div className="ai-chat-quiz">
      <div className="ai-chat-quiz-head">
        <strong>{c.quizAiBadge}</strong>
        <span>{c.quizScoreLabel}: {score}/{questions.length}</span>
      </div>
      {questions.map((question, index) => {
        const chosen = picked[index];
        const answered = chosen !== undefined;
        return (
          <div className="ai-chat-quiz-q" key={index}>
            <div className="ai-chat-quiz-prompt">{index + 1}. {question.prompt}</div>
            {question.options.map((option, optionIndex) => {
              const state = !answered
                ? ""
                : optionIndex === question.answer
                  ? "correct"
                  : optionIndex === chosen
                    ? "wrong"
                    : "";
              return (
                <button
                  key={optionIndex}
                  type="button"
                  className={`ai-chat-quiz-option ${state}`}
                  disabled={answered}
                  onClick={() => setPicked((current) => ({ ...current, [index]: optionIndex }))}
                >
                  {option}
                </button>
              );
            })}
            {answered ? (
              <div className="ai-chat-quiz-feedback">
                <strong>{chosen === question.answer ? c.quizAnswerCorrect : c.quizAnswerWrong}</strong>
                {question.explanation ? <span>{question.explanation}</span> : null}
              </div>
            ) : null}
          </div>
        );
      })}
      {answeredCount === questions.length ? (
        <div className="ai-chat-quiz-total">{c.quizScoreLabel}: {score}/{questions.length}</div>
      ) : null}
    </div>
  );
};

const ChatWidget = ({ c, chatOpen, setChatOpen, labContext, language }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [lastAttempt, setLastAttempt] = useState("");
  const [expanded, setExpanded] = useState(false);
  const scrollRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, pending, error]);

  useEffect(() => {
    if (chatOpen && inputRef.current) inputRef.current.focus();
  }, [chatOpen]);

  const send = async (rawText) => {
    const text = String(rawText || "").trim();
    if (!text || pending) return;

    // The full prior exchange goes with every request, so the agent can
    // resolve follow-ups like "why?" against what was already said.
    const history = messages
      .filter((item) => item.role !== "quiz")
      .map((item) => ({ role: item.role, content: item.content }));

    setMessages((current) => [...current, { role: "user", content: text }]);
    setInput("");
    setError(null);
    setLastAttempt(text);
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, labContext, language })
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(payload.error === "not_configured" ? c.chatNotConfigured : payload.message || c.chatErrorGeneric);
        return;
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.reply }]);
    } catch {
      setError(c.chatErrorGeneric);
    } finally {
      setPending(false);
    }
  };

  /** The "Quiz me" button: structured questions, marked locally. */
  const runQuiz = async () => {
    if (pending) return;
    setMessages((current) => [...current, { role: "user", content: c.chatQuickQuiz }]);
    setError(null);
    setLastAttempt("");
    setPending(true);

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId: labContext?.materialId,
          experimentIndex: labContext?.experimentIndex,
          experimentTitle: labContext?.experimentTitle,
          language
        })
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !Array.isArray(payload.questions) || !payload.questions.length) {
        setError(payload.error === "not_configured" ? c.chatNotConfigured : payload.message || c.quizAiFailed);
        return;
      }
      setMessages((current) => [...current, { role: "quiz", questions: payload.questions }]);
    } catch {
      setError(c.quizAiFailed);
    } finally {
      setPending(false);
    }
  };

  const retry = () => {
    if (!lastAttempt) return;
    // Drop the user turn that failed, then resend it.
    setMessages((current) => {
      const last = current[current.length - 1];
      return last && last.role === "user" ? current.slice(0, -1) : current;
    });
    send(lastAttempt);
  };

  const startNewChat = () => {
    setMessages([]);
    setError(null);
    setInput("");
    setLastAttempt("");
  };

  const quickActions = [
    { label: c.chatQuickExplain, run: () => send(c.chatQuickExplain) },
    { label: c.chatQuickHint, run: () => send(c.chatQuickHint) },
    { label: c.chatQuickQuiz, run: runQuiz }
  ].filter((action) => action.label);
  const contextLabel = labContext?.experimentTitle
    ? `${c.chatContextPrefix} ${labContext.experimentTitle}`
    : c.chatContextNone;

  return (
    <div className="ai-chat-widget">
      {chatOpen ? (
        <div className={`ai-chat-panel ${expanded ? "expanded" : ""}`}>
          <div className="ai-chat-head">
            <div className="ai-chat-head-id">
              <span className="ai-chat-head-mark" aria-hidden="true"><OrbitMark /></span>
              <div>
                <div className="ai-chat-mini-name">{c.chatName}</div>
                <div className="ai-chat-context">{contextLabel}</div>
              </div>
            </div>
            <div className="ai-chat-head-actions">
              {messages.length ? (
                <button className="ai-chat-new" onClick={startNewChat} type="button">{c.chatClear}</button>
              ) : null}
              <button
                className="ai-chat-expand"
                onClick={() => setExpanded((current) => !current)}
                aria-label={expanded ? c.chatCollapse : c.chatExpand}
                title={expanded ? c.chatCollapse : c.chatExpand}
                type="button"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {expanded ? (
                    <><path d="M9 3v6H3"></path><path d="M15 21v-6h6"></path></>
                  ) : (
                    <><path d="M3 9V3h6"></path><path d="M21 15v6h-6"></path></>
                  )}
                </svg>
              </button>
              <button className="ai-chat-close" onClick={() => setChatOpen(false)} aria-label="Close chat" type="button">x</button>
            </div>
          </div>

          <div className="ai-chat-scroll" ref={scrollRef}>
            {messages.length === 0 ? (
              <>
                <div className="ai-chat-bubble">{c.chatWelcome}</div>
                <div className="ai-chat-section-label">{c.chatLabel}</div>
                <div className="ai-chat-actions">
                  {quickActions.map((action) => (
                    <button key={action.label} className="ai-chat-action" type="button" onClick={action.run}>
                      <span>{action.label}</span>
                      <span className="ai-chat-action-arrow">{">"}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              messages.map((item, index) => (
                item.role === "quiz" ? (
                  <ChatQuizCard key={index} c={c} questions={item.questions} />
                ) : (
                  <div key={index} className={`ai-chat-msg ${item.role}`}>
                    <ChatMessageBody text={item.content} />
                  </div>
                )
              ))
            )}

            {pending ? (
              <div className="ai-chat-msg assistant pending">
                <span className="ai-chat-dot"></span>
                <span className="ai-chat-dot"></span>
                <span className="ai-chat-dot"></span>
                <span className="ai-chat-thinking">{c.chatThinking}</span>
              </div>
            ) : null}

            {error ? (
              <div className="ai-chat-error">
                <span>{error}</span>
                {lastAttempt ? (
                  <button className="ai-chat-retry" type="button" onClick={retry}>{c.chatRetry}</button>
                ) : null}
              </div>
            ) : null}
          </div>

          <form
            className="ai-chat-input"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <div className="ai-chat-input-shell">
              <input
                ref={inputRef}
                className="ai-chat-field"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={c.chatPlaceholder}
                aria-label={c.chatPlaceholder}
                disabled={pending}
                maxLength={1200}
              />
              <button className="ai-chat-send" type="submit" aria-label={c.chatSendLabel} disabled={pending || !input.trim()}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
              </button>
            </div>
            <div className="ai-chat-disclaimer">{c.chatDisclaimer}</div>
          </form>
        </div>
      ) : (
        <button className="ai-chat-trigger" onClick={() => setChatOpen(true)} aria-label="Open NAWA AI Coach" type="button"><OrbitMark /></button>
      )}
    </div>
  );
};

const LoginPortal = ({ c, loginOpen, selectedRole, setSelectedRole, loginForm, setLoginForm, onClose, onSubmit }) => {
  if (!loginOpen) return null;

  const roles = [
    { id: "teacher", title: c.loginRoles.teacher.title, text: c.loginRoles.teacher.text },
    { id: "student", title: c.loginRoles.student.title, text: c.loginRoles.student.text },
    { id: "guest", title: c.loginRoles.guest.title, text: c.loginRoles.guest.text }
  ];

  return (
    <div className="login-overlay" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="login-shell">
        <button className="login-close" type="button" onClick={onClose} aria-label={c.loginClose}>x</button>
        <div className="login-copy">
          <div className="eyebrow login-eyebrow"><span>+</span><span>{c.loginEyebrow}</span></div>
          <h2 id="login-title">{c.loginTitle}</h2>
          <p>{c.loginText}</p>
        </div>
        <div className="login-role-grid">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={`login-role-card ${selectedRole === role.id ? "active" : ""}`}
              onClick={() => setSelectedRole(role.id)}
            >
              <strong>{role.title}</strong>
              <span>{role.text}</span>
            </button>
          ))}
        </div>
        <div className="login-form-card">
          <div className="login-form-head">
            <strong>{c.loginRoles[selectedRole].title}</strong>
            <span>{selectedRole === "guest" ? c.loginGuestNote : c.loginFormNote}</span>
          </div>
          <div className={`login-form-grid ${selectedRole === "guest" ? "guest" : "member"}`}>
            {selectedRole !== "guest" ? (
              <>
                <label className="login-field">
                  <span>{c.loginEmailLabel}</span>
                  <input type="email" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} placeholder={c.loginEmailPlaceholder} />
                </label>
                <label className="login-field">
                  <span>{c.loginPasswordLabel}</span>
                  <input type="password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} placeholder={c.loginPasswordPlaceholder} />
                </label>
              </>
            ) : (
              <label className="login-field">
                <span>{c.loginGuestLabel}</span>
                <input type="text" value={loginForm.purpose} onChange={(event) => setLoginForm({ ...loginForm, purpose: event.target.value })} placeholder={c.loginGuestPlaceholder} />
              </label>
            )}
          </div>
          <div className="login-actions">
            <button className="btn btn-secondary" type="button" onClick={onClose}>{c.loginCancel}</button>
            <button className="btn btn-primary" type="button" onClick={onSubmit}>{c.loginContinue}</button>
          </div>
          <div className="login-helper">{selectedRole === "guest" ? c.loginGuestHelper : c.loginMemberHelper}</div>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboard = ({ c, activeProfile, onBack, onOpenQuiz }) => {
  const cards = c.teacherDashboardCards || [];

  return (
    <section className="teacher-dashboard" id="teacher-dashboard">
      <div className="section-head">
        <div>
          <h2>{c.teacherDashboardTitle}</h2>
          <p>{c.teacherDashboardText}</p>
        </div>
      </div>
      <div className="teacher-dashboard-shell">
        <div className="teacher-dashboard-hero">
          <div>
            <span className="teacher-badge">{c.teacherOnlyBadge}</span>
            <h3>{activeProfile?.name || c.loginRoles.teacher.title}</h3>
            <p>{c.teacherDashboardWelcome}</p>
          </div>
          <div className="teacher-dashboard-actions">
            <button className="btn btn-secondary" type="button" onClick={onBack}>{c.backToExperiments}</button>
            <button className="btn btn-primary" type="button" onClick={onOpenQuiz}>{c.openQuizButton}</button>
          </div>
        </div>
        <div className="teacher-dashboard-grid">
          {cards.map((card) => (
            <article className="teacher-dashboard-card" key={card.title}>
              <strong>{card.value}</strong>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const QUIZ_BANK = {
  physics: [
    {
      promptAr: "ماذا يحدث للإشارة المستحثة عندما تزيد عدد لفات الملف؟",
      promptEn: "What happens to the induced signal when the number of coil turns increases?",
      optionsAr: ["تزداد", "تختفي", "تبقى ثابتة"],
      optionsEn: ["It increases", "It disappears", "It stays constant"],
      answer: 0
    },
    {
      promptAr: "في التصادم داخل نظام مغلق، أي كمية تبقى محفوظة دائمًا؟",
      promptEn: "In a closed-system collision, which quantity stays conserved?",
      optionsAr: ["الزخم", "اللون", "درجة الحرارة فقط"],
      optionsEn: ["Momentum", "Color", "Temperature only"],
      answer: 0
    }
  ],
  chemistry: [
    {
      promptAr: "ما وظيفة الجسر الملحي في الخلية الغلفانية؟",
      promptEn: "What is the role of the salt bridge in a galvanic cell?",
      optionsAr: ["يحافظ على توازن الشحنات", "يزيد لون المحلول", "يوقف حركة الأيونات"],
      optionsEn: ["Maintains charge balance", "Changes solution color", "Stops ion movement"],
      answer: 0
    },
    {
      promptAr: "متى تكون الخلية الغلفانية أقوى عادة؟",
      promptEn: "When is a galvanic cell usually stronger?",
      optionsAr: ["عند وجود قطبين مختلفين", "عند فصل الأسلاك", "عند غياب الجسر الملحي"],
      optionsEn: ["With different electrodes", "When wires are disconnected", "Without a salt bridge"],
      answer: 0
    }
  ],
  biology: [
    {
      promptAr: "أي عامل يدعم عملية البناء الضوئي مباشرة؟",
      promptEn: "Which factor directly supports photosynthesis?",
      optionsAr: ["الضوء", "الظلام", "انعدام الماء"],
      optionsEn: ["Light", "Darkness", "No water"],
      answer: 0
    },
    {
      promptAr: "في تضاعف DNA، أي قاعدة ترتبط مع A؟",
      promptEn: "During DNA replication, which base pairs with A?",
      optionsAr: ["T", "C", "G"],
      optionsEn: ["T", "C", "G"],
      answer: 0
    }
  ]
};

const QuizPage = ({ c, quizContext, onBack, language }) => {
  const isArabic = typeof document !== "undefined" && document.documentElement?.dir === "rtl";
  const materialId = quizContext?.materialId || "physics";

  // The built-in bank is the baseline; AI questions replace it when generated.
  const bankQuestions = (QUIZ_BANK[materialId] || QUIZ_BANK.physics).map((question) => ({
    prompt: isArabic ? question.promptAr : question.promptEn,
    options: isArabic ? question.optionsAr : question.optionsEn,
    answer: question.answer,
    explanation: ""
  }));

  const [aiQuestions, setAiQuestions] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(null);
  const [answers, setAnswers] = useState({});

  const questions = aiQuestions || bankQuestions;
  const score = questions.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  const completed = Object.keys(answers).length === questions.length;

  const generate = async () => {
    if (generating) return;
    setGenerating(true);
    setGenError(null);
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materialId,
          experimentIndex: quizContext?.experimentIndex,
          experimentTitle: quizContext?.experimentTitle,
          language
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !Array.isArray(payload.questions) || !payload.questions.length) {
        setGenError(payload.error === "not_configured" ? c.chatNotConfigured : payload.message || c.quizAiFailed);
        return;
      }
      setAiQuestions(payload.questions);
      setAnswers({});
    } catch {
      setGenError(c.quizAiFailed);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section className="quiz-page" id="quiz-page">
      <div className="section-head">
        <div>
          <h2>{c.quizTitle}</h2>
          <p>{quizContext?.experimentTitle ? `${c.quizForLabel} ${quizContext.experimentTitle}` : c.quizText}</p>
        </div>
      </div>
      <div className="quiz-shell">
        <div className="quiz-summary-card">
          <span className="teacher-badge">{quizContext?.materialLabel || c.quizDefaultMaterial}</span>
          <h3>{c.quizReadyTitle}</h3>
          <p>{c.quizText}</p>
          <div className="quiz-top-actions">
            <button className="btn btn-secondary" type="button" onClick={onBack}>{c.backToExperiments}</button>
            <button className="btn btn-secondary quiz-ai-btn" type="button" onClick={generate} disabled={generating}>
              {generating ? c.quizAiLoading : c.quizAiGenerate}
            </button>
            <div className="quiz-score-pill">{c.quizScoreLabel}: {score}/{questions.length}</div>
          </div>
          {aiQuestions ? <div className="quiz-ai-badge">{c.quizAiBadge}</div> : null}
          {genError ? <div className="quiz-ai-error">{genError}</div> : null}
        </div>
        <div className="quiz-question-list">
          {questions.map((question, index) => {
            const chosen = answers[index];
            const answered = chosen !== undefined;
            return (
              <article className="quiz-question-card" key={`${materialId}-${aiQuestions ? "ai" : "bank"}-${index}`}>
                <div className="quiz-question-number">{String(index + 1).padStart(2, "0")}</div>
                <h4>{question.prompt}</h4>
                <div className="quiz-options">
                  {question.options.map((option, optionIndex) => {
                    const state = !answered
                      ? ""
                      : optionIndex === question.answer
                        ? "correct"
                        : optionIndex === chosen
                          ? "wrong"
                          : "";
                    return (
                      <button
                        key={`${option}-${optionIndex}`}
                        type="button"
                        className={`quiz-option ${chosen === optionIndex ? "active" : ""} ${state}`}
                        onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {answered && question.explanation ? (
                  <div className="quiz-explanation">
                    <strong>{chosen === question.answer ? c.quizAnswerCorrect : c.quizAnswerWrong}</strong>
                    <span>{question.explanation}</span>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
        {completed ? (
          <div className="quiz-result-banner">
            <strong>{c.quizCompletedLabel}</strong>
            <span>{c.quizScoreLabel}: {score}/{questions.length}</span>
          </div>
        ) : null}
      </div>
    </section>
  );
};

window.NawaComponents = { Header, HeroSection, FeaturesSection, ExperimentSection, FAQSection, FooterSection, ChatWidget, LoginPortal, TeacherDashboard, QuizPage };
