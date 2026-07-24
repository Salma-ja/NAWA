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
    <span className="brand-orbit-ring"></span>
    <span className="brand-orbit-ring-two"></span>
    <span className="brand-nucleus"></span>
    <span className="brand-orbit-dot"></span>
    <span className="brand-orbit-dot-two"></span>
  </span>
);

const Header = ({ c, isArabic, language, theme, onToggleLanguage, onToggleTheme }) => (
  <header className="nav">
    <a className="brand" href="#home">
      <OrbitMark />
      <span className="brand-wordmark">NAWA LAB</span>
    </a>
    <nav className="nav-links">
      <a href="#features">{c.nav[0]}</a>
      <a href="#experience">{c.nav[1]}</a>
      <a href="#about">{c.nav[2]}</a>
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
      <button className="btn icon-btn" onClick={onToggleTheme} aria-label={theme === "dark" ? c.themeNext : (isArabic ? "????? ??????" : "Dark Mode")}>
        {theme === "dark" ? (
          <svg viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"></path></svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        )}
      </button>
      <button className="btn btn-primary">{c.launchDemo}</button>
    </div>
  </header>
);

const HeroSection = ({ c, rotation }) => (
  <main id="home" className="hero">
    <div>
      <div className="eyebrow"><span>?</span><span>{c.eyebrow}</span></div>
      <h1>{c.heroTitleBefore} <span>{c.heroTitleAccent}</span><br />{c.heroTitleAfter}</h1>
      <p>{c.heroText}</p>
      <div className="hero-actions">
        <button className="btn btn-primary">{c.start}</button>
        <button className="btn btn-secondary">{c.curriculum}</button>
      </div>
      <div className="hero-stats">
        {c.stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <div className="stat-value"><Counter target={stat.value} suffix={stat.suffix} /></div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="hero-visual">
      <div className="dashboard">
        <div className="visual-top"><div className="window-dots"><span></span><span></span><span></span></div><div className="mini-chip">{c.liveSimulation}</div></div>
        <div className="planet-wrap"><div className="orbit one"><div className="electron"></div></div><div className="orbit two"><div className="electron"></div></div><div className="planet" style={rotation}></div></div>
        <div className="floating-card top"><div className="card-title">{c.aiSignal}</div><div className="wave"><span></span><span></span><span></span><span></span><span></span></div></div>
        <div className="hero-sticker">{c.aiSignal}</div>
      </div>
    </div>
  </main>
);

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

const ExperimentSection = ({ c, stageRef, dragging, setDragging, handleStagePointer, coilLoopOffsets, bulbPower, magnetSvgX, inducedSignal, coilTurns, magnetX, setCoilTurns, updateMagnetPosition }) => (
  <section id="experience">
    <div className="section-head"><div><h2>{c.experienceTitle}</h2><p>{c.experienceText}</p></div></div>
    <div className="lab-experiment">
      <div className="lab-experiment-head"><div><h3>{c.physicsLabTitle}</h3><p><strong>{c.physicsLabName}</strong> — {c.physicsLabText}</p></div><div className="lab-tag">{c.physicsLabTag}</div></div>
      <div className="induction-grid">
        <ExperimentScene stageRef={stageRef} dragging={dragging} setDragging={setDragging} handleStagePointer={handleStagePointer} coilLoopOffsets={coilLoopOffsets} bulbPower={bulbPower} magnetSvgX={magnetSvgX} />
        <div className="induction-panel">
          <div className="meter-card"><div className="meter-head"><strong>{c.outputLabel}</strong><span className="meter-value">{inducedSignal}% · {c.outputUnit}</span></div><div className="meter-track"><div className="meter-fill" style={{ width: `${inducedSignal}%` }}></div></div><div className="meter-note">{c.physicsHint}</div></div>
          <div className="control-card">
            <div className="control-row"><label><span>{c.turnsLabel}</span><strong>{coilTurns}</strong></label><input type="range" min="6" max="18" value={coilTurns} onChange={(event) => setCoilTurns(Number(event.target.value))} /></div>
            <div className="control-row"><label><span>{c.magnetLabel}</span><strong>{Math.round(magnetX * 100)}%</strong></label><input type="range" min="8" max="92" value={Math.round(magnetX * 100)} onChange={(event) => updateMagnetPosition(Number(event.target.value) / 100)} /></div>
            <div className="control-actions"><button className="micro-btn" type="button" onClick={() => updateMagnetPosition(0.5)}>{c.insertMagnet}</button><button className="micro-btn secondary" type="button" onClick={() => updateMagnetPosition(0.16)}>{c.resetMagnet}</button></div>
            <div className="control-note">{c.physicsLabText}</div>
          </div>
        </div>
      </div>
      <div className="experiment-list">{c.experimentList.map((item, index) => <div className={`experiment-item ${index === 0 ? "active" : ""}`} key={item.title}><strong>{item.title}</strong><span>{item.text}</span></div>)}</div>
    </div>
    <div className="feature-row">
      <div className="card"><div className="timeline">{c.steps.map((step, index) => <div className="timeline-item" key={step.title}><div className="timeline-index">0{index + 1}</div><div><h4>{step.title}</h4><p>{step.text}</p></div></div>)}</div></div>
      <div className="card screen"><div className="screen-panel"><div className="screen-top">{c.pills.map((pill) => <div className="pill" key={pill}>{pill}</div>)}</div><div className="grid-4">{c.subjects.map((subject) => <div className="experiment-panel" key={subject.name}><div className="card-title">{subject.name}</div><p>{subject.note}</p></div>)}</div></div></div>
    </div>
  </section>
);

const CTASection = ({ c }) => <div className="cta" id="about"><div><h3>{c.ctaTitle}</h3><p>{c.ctaText}</p></div><div className="nav-actions"><button className="btn btn-secondary">{c.bookDemo}</button><button className="btn btn-primary">{c.getStarted}</button></div></div>;

const FooterSection = ({ c }) => (
  <footer className="footer" id="contact">
    <div className="footer-summary">{c.footer.map((item) => <div key={item}>{item}</div>)}</div>
    <div className="contact-card"><strong>{c.contactTitle}</strong><div>{c.contactNameLabel}: {c.contactName}</div><div>{c.contactPhoneLabel}: {c.contactPhone}</div><div>{c.contactLinkedInLabel}: <a href="https://www.linkedin.com/in/salma-moath-/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B6PS4y5SvTTy8eCqiFVwt1g%3D%3D" target="_blank" rel="noreferrer">linkedin.com/in/salma-moath-</a></div></div>
  </footer>
);

const ChatWidget = ({ c, chatOpen, setChatOpen }) => (
  <div className="ai-chat-widget">
    {chatOpen ? (
      <div className="ai-chat-panel">
        <div className="ai-chat-head"><div className="ai-chat-brand"><div className="ai-chat-avatar"><OrbitMark /></div><div><div className="ai-chat-name">{c.chatName}</div><div className="ai-chat-status">{c.chatStatus}</div></div></div><button className="ai-chat-close" onClick={() => setChatOpen(false)} aria-label="Close chat" type="button">×</button></div>
        <div className="ai-chat-bubble">{c.chatMessage}</div><div className="ai-chat-section-label">{c.chatLabel}</div>
        <div className="ai-chat-actions"><button className="ai-chat-action" type="button"><span>{c.chatPrimary}</span><span className="ai-chat-action-arrow">›</span></button><button className="ai-chat-action" type="button"><span>{c.chatSecondary}</span><span className="ai-chat-action-arrow">›</span></button></div>
        <div className="ai-chat-input"><div className="ai-chat-input-shell"><span className="ai-chat-placeholder">{c.chatPlaceholder}</span><button className="ai-chat-send" type="button" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></button></div></div>
      </div>
    ) : (
      <button className="ai-chat-trigger" onClick={() => setChatOpen(true)} aria-label="Open NAWA AI Coach" type="button"><OrbitMark /></button>
    )}
  </div>
);

window.NawaComponents = { Header, HeroSection, FeaturesSection, ExperimentSection, CTASection, FooterSection, ChatWidget };
