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

const Header = ({ c, language, onToggleLanguage, onOpenLogin, activeProfile }) => (
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
      <button className="btn btn-primary" type="button" onClick={onOpenLogin}>{c.launchDemo}</button>
    </div>
  </header>
);

const HeroSection = ({ c, rotation }) => (
  <main id="home" className="hero">
    <div>
      <div className="eyebrow"><span>?</span><span>{c.eyebrow}</span></div>
      <h1>{c.heroTitleBefore} <span>{c.heroTitleAccent}</span><br />{c.heroTitleAfter}</h1>
      <p>{c.heroText}</p>
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

const ChemistrySimulation = ({ c, chemSettings, setChemSettings, chemMetrics, chemTrend, resetChemistryExperiment }) => {
  const setSpeed = (speed) => setChemSettings({ ...chemSettings, timeSpeed: speed });
  const pickOption = (key, value) => setChemSettings({ ...chemSettings, [key]: value });
  const metrics = [
    { label: c.chemResults.voltage, value: chemMetrics.voltage, suffix: "V" },
    { label: c.chemResults.current, value: chemMetrics.current, suffix: "mA" },
    { label: c.chemResults.electrons, value: chemMetrics.electrons, suffix: "" },
    { label: c.chemResults.ionsMoved, value: chemMetrics.ionsMoved, suffix: "" }
  ];
  const halfReactionLeft = `${chemSettings.anode}(s) -> ${chemSettings.anode}2+ + 2e-`;
  const halfReactionRight = `${chemSettings.cathode}2+ + 2e- -> ${chemSettings.cathode}(s)`;
  const fullReaction = `${chemSettings.anode}(s) + ${chemSettings.cathode}2+(aq) -> ${chemSettings.anode}2+(aq) + ${chemSettings.cathode}(s)`;

  return (
    <div className="chemistry-layout">
      <aside className="chem-side-panel card-lite">
        <div className="chem-panel-head">
          <strong>{c.chemResultsTitle}</strong>
          <span className={`chem-status-chip ${chemMetrics.status}`}>{chemMetrics.status === "high" ? c.chemStatusHigh : chemMetrics.status === "medium" ? c.chemStatusMedium : c.chemStatusLow}</span>
        </div>
        <div className="chem-results-grid">
          {metrics.map((item) => (
            <div className="chem-metric-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}{item.suffix}</strong>
            </div>
          ))}
        </div>
        <div className="chem-feedback-card">{chemMetrics.feedback}</div>
        <div className="chem-chart-stack">
          <MiniTrendChart title={c.chemChartVoltage} points={chemTrend} strokeClass="oxygen" valueKey="voltage" />
          <MiniTrendChart title={c.chemChartCurrent} points={chemTrend} strokeClass="carbon" valueKey="current" />
        </div>
      </aside>

      <div className="chemistry-core card-lite">
        <div className="chem-toolbar">
          <div className="chem-toolbar-group">
            <span>{c.chemStepElectrodes}</span>
            <div className="chem-chip-row">
              {["Zn", "Cu", "Fe", "Ag", "Mg", "Ni"].map((metal) => (
                <button key={`anode-${metal}`} type="button" className={`chem-chip ${chemSettings.anode === metal ? "active" : ""}`} onClick={() => pickOption("anode", metal)}>{metal}</button>
              ))}
            </div>
            <div className="chem-chip-row secondary">
              {["Zn", "Cu", "Fe", "Ag", "Mg", "Ni"].map((metal) => (
                <button key={`cathode-${metal}`} type="button" className={`chem-chip ${chemSettings.cathode === metal ? "active" : ""}`} onClick={() => pickOption("cathode", metal)}>{metal}</button>
              ))}
            </div>
          </div>

          <div className="chem-speed-box">
            <span>{c.chemSpeedLabel}</span>
            <div className="bio-speed-actions">
              {[1, 5, 10].map((speed) => <button key={speed} className={`bio-speed-btn ${chemSettings.timeSpeed === speed ? "active" : ""}`} type="button" onClick={() => setSpeed(speed)}>{speed}x</button>)}
            </div>
          </div>
        </div>

        <div className="chem-stage">
          <div className="chem-direction-card left">
            <strong>{c.chemDirectionTitle}</strong>
            <span>{chemSettings.anode}</span>
          </div>
          <div className="chem-direction-card right">
            <strong>{c.chemDirectionEnd}</strong>
            <span>{chemSettings.cathode}</span>
          </div>

          <div className="chem-electron-flow">
            <span className="chem-electron">e-</span>
            <span className="chem-electron">e-</span>
            <span className="chem-electron">e-</span>
          </div>

          <div className="chem-wire">
            <div className={`chem-bulb ${chemMetrics.cellReady ? "on" : "off"} ${chemSettings.lampOn ? "" : "dim"}`}>
              <div className="chem-bulb-glow"></div>
            </div>
            <div className="chem-voltmeter">{chemMetrics.voltage} V</div>
          </div>

          <div className="chem-beakers">
            <div className="chem-beaker left">
              <div className="chem-electrode">{chemSettings.anode}</div>
              <div className="chem-liquid left"></div>
              <div className="chem-solution-tag">{chemSettings.electrolyteLeft}</div>
            </div>
            <div className={`chem-salt-bridge ${chemSettings.saltBridge === "none" ? "off" : ""}`}>
              <span>{chemSettings.saltBridge === "none" ? c.chemNoBridge : chemSettings.saltBridge}</span>
              <div className="chem-ion-flow">
                <span>K+</span>
                <span>NO3-</span>
              </div>
            </div>
            <div className="chem-beaker right">
              <div className="chem-electrode copper">{chemSettings.cathode}</div>
              <div className="chem-liquid right"></div>
              <div className="chem-solution-tag">{chemSettings.electrolyteRight}</div>
            </div>
          </div>

          <div className="chem-reaction-panel">
            <div className="chem-half-reaction">
              <strong>{c.chemAnodeLabel}</strong>
              <span>{halfReactionLeft}</span>
            </div>
            <div className="chem-half-reaction">
              <strong>{c.chemCathodeLabel}</strong>
              <span>{halfReactionRight}</span>
            </div>
            <div className="chem-overall-reaction">{fullReaction}</div>
          </div>
        </div>

        <div className="chem-story-grid">
          <div className="chem-story-card">
            <strong>{c.chemStoryLeft}</strong>
            <span>{c.chemStoryLeftText}</span>
          </div>
          <div className="chem-story-card">
            <strong>{c.chemStoryBridge}</strong>
            <span>{c.chemStoryBridgeText}</span>
          </div>
          <div className="chem-story-card">
            <strong>{c.chemStoryRight}</strong>
            <span>{c.chemStoryRightText}</span>
          </div>
        </div>
      </div>

      <aside className="chem-tools-panel card-lite">
        <div className="bio-panel-head">
          <strong>{c.chemToolsTitle}</strong>
          <button className="micro-btn secondary" type="button" onClick={resetChemistryExperiment}>{c.chemReset}</button>
        </div>

        <div className="chem-tool-group">
          <div className="chem-tool-label">{c.chemLeftSolutionLabel}</div>
          <div className="chem-tool-grid">
            {["ZnSO4", "CuSO4", "AgNO3", "FeSO4", "HCl", "NaCl", "H2SO4", "MgSO4"].map((solution) => (
              <button key={`left-${solution}`} type="button" className={`chem-tool-card ${chemSettings.electrolyteLeft === solution ? "active" : ""}`} onClick={() => pickOption("electrolyteLeft", solution)}>{solution}</button>
            ))}
          </div>
        </div>

        <div className="chem-tool-group">
          <div className="chem-tool-label">{c.chemRightSolutionLabel}</div>
          <div className="chem-tool-grid">
            {["ZnSO4", "CuSO4", "AgNO3", "FeSO4", "HCl", "NaCl", "H2SO4", "MgSO4"].map((solution) => (
              <button key={`right-${solution}`} type="button" className={`chem-tool-card ${chemSettings.electrolyteRight === solution ? "active" : ""}`} onClick={() => pickOption("electrolyteRight", solution)}>{solution}</button>
            ))}
          </div>
        </div>

        <div className="chem-tool-group">
          <div className="chem-tool-label">{c.chemBridgeLabel}</div>
          <div className="chem-tool-grid compact">
            {[
              { id: "KNO3", label: "KNO3" },
              { id: "NaCl", label: "NaCl" },
              { id: "KCl", label: "KCl" },
              { id: "none", label: c.chemNoBridge }
            ].map((bridge) => (
              <button key={bridge.id} type="button" className={`chem-tool-card ${chemSettings.saltBridge === bridge.id ? "active" : ""}`} onClick={() => pickOption("saltBridge", bridge.id)}>{bridge.label}</button>
            ))}
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

const ExperimentSection = ({ c, activeMaterial, setActiveMaterial, stageRef, dragging, setDragging, handleStagePointer, coilLoopOffsets, bulbPower, magnetSvgX, inducedSignal, coilTurns, magnetX, setCoilTurns, updateMagnetPosition, bioSettings, setBioSettings, bioMetrics, bioTrend, resetBiologyExperiment, chemSettings, setChemSettings, chemMetrics, chemTrend, resetChemistryExperiment }) => {
  const materials = Array.isArray(c.materials) ? c.materials : [];
  const currentMaterial = materials.find((material) => material.id === activeMaterial) || materials[0];
  if (!currentMaterial) return null;
  const isPhysics = currentMaterial.id === "physics";
  const isChemistry = currentMaterial.id === "chemistry";
  const isBiology = currentMaterial.id === "biology";

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
              {material.label}
            </button>
          ))}
        </div>
        <div className="materials-subtitle">{currentMaterial.note}</div>
      </div>
      <div className="lab-experiment">
        <div className="lab-experiment-head"><div><h3>{currentMaterial.labTitle}</h3><p><strong>{currentMaterial.labName}</strong> - {currentMaterial.labText}</p></div><div className="lab-tag">{currentMaterial.tag}</div></div>
        {isPhysics ? (
          <div className="induction-grid">
            <ExperimentScene stageRef={stageRef} dragging={dragging} setDragging={setDragging} handleStagePointer={handleStagePointer} coilLoopOffsets={coilLoopOffsets} bulbPower={bulbPower} magnetSvgX={magnetSvgX} />
            <div className="induction-panel">
              <div className="meter-card"><div className="meter-head"><strong>{c.outputLabel}</strong><span className="meter-value">{inducedSignal}% - {c.outputUnit}</span></div><div className="meter-track"><div className="meter-fill" style={{ width: `${inducedSignal}%` }}></div></div><div className="meter-note">{c.physicsHint}</div></div>
              <div className="control-card">
                <div className="control-row"><label><span>{c.turnsLabel}</span><strong>{coilTurns}</strong></label><input type="range" min="6" max="18" value={coilTurns} onChange={(event) => setCoilTurns(Number(event.target.value))} /></div>
                <div className="control-row"><label><span>{c.magnetLabel}</span><strong>{Math.round(magnetX * 100)}%</strong></label><input type="range" min="8" max="92" value={Math.round(magnetX * 100)} onChange={(event) => updateMagnetPosition(Number(event.target.value) / 100)} /></div>
                <div className="control-actions"><button className="micro-btn" type="button" onClick={() => updateMagnetPosition(0.5)}>{c.insertMagnet}</button><button className="micro-btn secondary" type="button" onClick={() => updateMagnetPosition(0.16)}>{c.resetMagnet}</button></div>
                <div className="control-note">{currentMaterial.labText}</div>
              </div>
            </div>
          </div>
        ) : isChemistry ? (
          <ChemistrySimulation c={c} chemSettings={chemSettings} setChemSettings={setChemSettings} chemMetrics={chemMetrics} chemTrend={chemTrend} resetChemistryExperiment={resetChemistryExperiment} />
        ) : isBiology ? (
          <BiologySimulation c={c} currentMaterial={currentMaterial} bioSettings={bioSettings} setBioSettings={setBioSettings} bioMetrics={bioMetrics} bioTrend={bioTrend} resetBiologyExperiment={resetBiologyExperiment} />
        ) : (
          <div className="material-placeholder">
            <strong>{currentMaterial.emptyTitle}</strong>
            <p>{currentMaterial.emptyText}</p>
          </div>
        )}
        <div className="experiment-list">{currentMaterial.experiments.map((item, index) => <div className={`experiment-item ${index === 0 ? "active" : ""}`} key={item.title}><strong>{item.title}</strong><span>{item.text}</span></div>)}</div>
      </div>
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

const ChatWidget = ({ c, chatOpen, setChatOpen }) => (
  <div className="ai-chat-widget">
    {chatOpen ? (
      <div className="ai-chat-panel">
        <div className="ai-chat-head"><div className="ai-chat-brand"><div className="ai-chat-avatar"><OrbitMark /></div><div><div className="ai-chat-name">{c.chatName}</div><div className="ai-chat-status">{c.chatStatus}</div></div></div><button className="ai-chat-close" onClick={() => setChatOpen(false)} aria-label="Close chat" type="button">x</button></div>
        <div className="ai-chat-bubble">{c.chatMessage}</div><div className="ai-chat-section-label">{c.chatLabel}</div>
        <div className="ai-chat-actions"><button className="ai-chat-action" type="button"><span>{c.chatPrimary}</span><span className="ai-chat-action-arrow">{">"}</span></button><button className="ai-chat-action" type="button"><span>{c.chatSecondary}</span><span className="ai-chat-action-arrow">{">"}</span></button></div>
        <div className="ai-chat-input"><div className="ai-chat-input-shell"><span className="ai-chat-placeholder">{c.chatPlaceholder}</span><button className="ai-chat-send" type="button" aria-label="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></button></div></div>
      </div>
    ) : (
      <button className="ai-chat-trigger" onClick={() => setChatOpen(true)} aria-label="Open NAWA AI Coach" type="button"><OrbitMark /></button>
    )}
  </div>
);

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
          <div className="login-form-grid">
            <label className="login-field">
              <span>{c.loginNameLabel}</span>
              <input type="text" value={loginForm.name} onChange={(event) => setLoginForm({ ...loginForm, name: event.target.value })} placeholder={c.loginNamePlaceholder} />
            </label>
            {selectedRole !== "guest" ? (
              <label className="login-field">
                <span>{selectedRole === "teacher" ? c.loginTeacherIdLabel : c.loginStudentIdLabel}</span>
                <input type="text" value={loginForm.identifier} onChange={(event) => setLoginForm({ ...loginForm, identifier: event.target.value })} placeholder={selectedRole === "teacher" ? c.loginTeacherIdPlaceholder : c.loginStudentIdPlaceholder} />
              </label>
            ) : null}
            <label className="login-field">
              <span>{selectedRole === "guest" ? c.loginGuestLabel : c.loginEmailLabel}</span>
              <input type="text" value={loginForm.contact} onChange={(event) => setLoginForm({ ...loginForm, contact: event.target.value })} placeholder={selectedRole === "guest" ? c.loginGuestPlaceholder : c.loginEmailPlaceholder} />
            </label>
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

window.NawaComponents = { Header, HeroSection, FeaturesSection, ExperimentSection, FAQSection, FooterSection, ChatWidget, LoginPortal };
