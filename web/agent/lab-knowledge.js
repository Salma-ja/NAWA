/**
 * Grounding knowledge for the NAWA tutor agent.
 *
 * Everything here is derived from the actual simulation code in components.jsx
 * and app.jsx, so the agent describes the labs the students really see -- the
 * same control names, the same ranges, the same formulas. If a simulation
 * changes, update the matching entry here.
 */

const LABS = [
  {
    id: "physics-induction",
    subject: "physics",
    experimentIndex: 0,
    titleEn: "Electromagnetic induction (Moving magnet & coil)",
    titleAr: "الحث الكهرومغناطيسي (مغناطيس متحرك وملف)",
    controls: [
      "Magnet position: dragged left/right across the stage, clamped to 0.08-0.92 of the stage width.",
      "Coil turns: chosen from 2, 4, 6, 8, 10, 12, 14, 16, 18 (default 12).",
      "Reset magnet button returns the magnet to position 0.16."
    ],
    outputs: [
      "Induced signal, 0-100, shown on a meter bar.",
      "A bulb whose brightness follows the induced signal."
    ],
    model: [
      "The induced signal depends on HOW FAST the magnet moves, not where it sits: strength = |change in position| * 3200.",
      "It is scaled by proximity to the coil centre (coil centre is at 0.58; proximity falls to zero beyond 0.18 away).",
      "It is scaled by a turns factor = turns / 12, so doubling the turns roughly doubles the signal.",
      "An extra boost of 24 * turnFactor is added when the magnet is deep inside the coil (proximity > 0.72).",
      "When the student stops dragging, the signal decays by 4 every 90 ms down to zero."
    ],
    concepts: [
      "Faraday's law: an EMF is induced by a CHANGING magnetic flux, not by flux itself.",
      "Flux depends on field strength, coil area, and the number of turns.",
      "Lenz's law: the induced current opposes the change that produced it.",
      "Faster motion and more turns both increase the induced EMF."
    ],
    misconceptions: [
      "Thinking a magnet resting inside the coil keeps producing current -- it does not, because the flux is no longer changing.",
      "Thinking the magnet must physically touch the coil.",
      "Confusing the magnet's strength with the speed of the motion.",
      "Believing more turns means a stronger magnet rather than a larger induced EMF."
    ]
  },
  {
    id: "physics-collisions",
    subject: "physics",
    experimentIndex: 1,
    titleEn: "Momentum and collisions (two carts)",
    titleAr: "الزخم والتصادمات (عربتان)",
    controls: [
      "Mass A and Mass B: 0.5, 1, 1.5, 2, 2.5 or 3 kg (defaults 1.5 and 1).",
      "Velocity A and Velocity B: -4, -2, 0, 2 or 4 m/s (defaults +4 and -2).",
      "Collision type: elastic or inelastic.",
      "Playback speed and a Run/Reset control."
    ],
    outputs: [
      "Momentum before and after.",
      "Kinetic energy before and after.",
      "Energy lost, and the momentum gap (difference before vs after)."
    ],
    model: [
      "Momentum before = mA*vA + mB*vB.",
      "Kinetic energy before = 0.5*mA*vA^2 + 0.5*mB*vB^2.",
      "Elastic final velocities use the standard formulas: vA' = ((mA-mB)/(mA+mB))*vA + ((2*mB)/(mA+mB))*vB, and vB' = ((2*mA)/(mA+mB))*vA + ((mB-mA)/(mA+mB))*vB.",
      "Inelastic: the carts move together at the shared velocity = total momentum / (mA + mB).",
      "Energy lost = kinetic energy before - kinetic energy after (always 0 for elastic, positive for inelastic)."
    ],
    concepts: [
      "Momentum is conserved in every collision in a closed system.",
      "Kinetic energy is conserved ONLY in an elastic collision.",
      "In a perfectly inelastic collision the objects stick together and share one final velocity.",
      "Velocity is a vector -- direction matters, which is why negative values exist."
    ],
    misconceptions: [
      "Thinking kinetic energy is always conserved -- it is not in an inelastic collision.",
      "Thinking the heavier cart always keeps moving in its original direction.",
      "Forgetting that a negative velocity means motion in the opposite direction.",
      "Confusing momentum (mv) with kinetic energy (0.5mv^2)."
    ]
  },
  {
    id: "chemistry-galvanic",
    subject: "chemistry",
    experimentIndex: 0,
    titleEn: "Galvanic (voltaic) cell laboratory",
    titleAr: "مختبر الخلية الغلفانية",
    controls: [
      "Anode and cathode metals, dragged into place: Zn, Cu, Mg, Fe or Ag.",
      "Left and right electrolyte solutions: ZnSO4, CuSO4, AgNO3, MgSO4 or HCl.",
      "Salt bridge: KNO3, KCl, NaCl -- or none.",
      "Wire connected on/off, lamp on/off, and a time-speed control.",
      "A four-step build flow: Select Materials, Build Cell, Run Reaction, Analyze Results."
    ],
    outputs: [
      "Voltage (capped at 1.95 V), current, electron flow, ions moved.",
      "Live oxidation, reduction and overall equations.",
      "A rolling voltage/current trend chart, plus electrode mass and concentration readings."
    ],
    model: [
      "Voltage comes from the GAP in reactivity between the two electrodes. Internal reactivity values: Mg 1.22, Zn 1.00, Fe 0.74, Ag 0.64, Cu 0.52.",
      "Voltage = |reactivityAnode - reactivityCathode| * 1.85 * electrolyteFactor * saltBridgeFactor, then penalties are applied.",
      "Salt bridge factor: KNO3 = 1.0, KCl = 0.9, NaCl = 0.82, none = 0.1.",
      "Penalties: the same metal on both sides multiplies by 0.18, a disconnected wire by 0.08, lamp off by 0.92.",
      "Current = voltage * 10.6 * speed factor. The cell only counts as 'ready' when the wire is connected, a salt bridge is present, and the two electrodes are different."
    ],
    concepts: [
      "Oxidation happens at the anode (loses electrons); reduction happens at the cathode (gains electrons).",
      "Electrons travel through the external wire; ions travel through the salt bridge.",
      "The salt bridge keeps both half-cells electrically neutral so the reaction can continue.",
      "The bigger the difference in reactivity between the two metals, the larger the cell voltage.",
      "In the classic Zn/Cu cell: Zn(s) -> Zn2+ + 2e-, and Cu2+ + 2e- -> Cu(s)."
    ],
    misconceptions: [
      "Thinking electrons travel through the salt bridge -- ions do, electrons use the wire.",
      "Thinking the salt bridge is optional; without it the voltage collapses.",
      "Using the same metal for both electrodes and expecting a voltage.",
      "Mixing up which electrode is oxidised -- the more reactive metal is the anode."
    ]
  },
  {
    id: "chemistry-ions",
    subject: "chemistry",
    experimentIndex: 1,
    titleEn: "Detecting ions in an unknown solution",
    titleAr: "الكشف عن الأيونات في محلول مجهول",
    controls: [
      "A randomly assigned unknown ion from: Cl-, SO4 2-, CO3 2-, Cu2+, Fe2+, Fe3+, NH4+, Zn2+, Ca2+.",
      "Six reagents: AgNO3, BaCl2, NaOH, NH3, HCl, dilute HNO3.",
      "An 'excess reagent' toggle, a guided mode, a test log, and a final-answer submission."
    ],
    outputs: [
      "An observation, an interpretation, a shrinking list of possible ions, and a confidence bar.",
      "A final answer can only be submitted once confidence reaches 28%."
    ],
    model: [
      "AgNO3 gives a white precipitate with chloride.",
      "BaCl2 gives a white precipitate with sulfate.",
      "HCl or dilute HNO3 produce gas bubbles with carbonate.",
      "NaOH or NH3: copper(II) gives a blue precipitate, iron(II) green, iron(III) brown, ammonium releases ammonia gas, calcium gives a white precipitate that stays.",
      "Zinc gives a white precipitate with NaOH that DISSOLVES in excess -- that is the key test to tell zinc from calcium."
    ],
    concepts: [
      "Qualitative analysis identifies ions by their characteristic reactions, not by measuring amounts.",
      "A precipitate forms when two solutions produce an insoluble salt.",
      "Precipitate colour is the main clue for transition-metal cations.",
      "Each negative test is still useful -- it eliminates candidates."
    ],
    misconceptions: [
      "Thinking one test is enough to identify an ion; usually you need to eliminate alternatives too.",
      "Forgetting the excess-reagent step, which is what separates zinc from calcium.",
      "Thinking 'no visible change' means the test failed -- it is real evidence that rules ions out.",
      "Confusing iron(II) green with iron(III) brown precipitates."
    ]
  },
  {
    id: "biology-photosynthesis",
    subject: "biology",
    experimentIndex: 0,
    titleEn: "Photosynthesis and cellular respiration",
    titleAr: "البناء الضوئي والتنفس الخلوي",
    controls: [
      "Light on/off.",
      "Water level, CO2 level, O2 level (0-100).",
      "Temperature (the plant is happiest near 27 C).",
      "Time speed, a reset, and an 'inside the leaf' view toggle."
    ],
    outputs: [
      "Photosynthesis rate and respiration rate.",
      "Oxygen produced, CO2 consumed, CO2 released, glucose produced, ATP produced.",
      "A visible plant that wilts, plus a rolling O2/CO2 trend chart."
    ],
    model: [
      "Photosynthesis rate = light * (water/100) * (CO2/100) * temperature penalty * 100.",
      "The temperature penalty peaks at 27 C and falls off in BOTH directions -- too hot is as bad as too cold.",
      "With the light off, photosynthesis drops to zero but respiration keeps running.",
      "Respiration rate rises with oxygen level and temperature and never falls below 20.",
      "Oxygen produced = 0.82 * photosynthesis rate; glucose = 0.63 * rate; ATP comes from both respiration and glucose."
    ],
    concepts: [
      "Photosynthesis: 6CO2 + 6H2O + light -> C6H12O6 + 6O2. It needs light and happens in chloroplasts.",
      "Respiration: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP. It happens in mitochondria, day AND night.",
      "The two processes are complementary: the products of one are the reactants of the other.",
      "Enzymes have an optimum temperature; above it they denature and rates fall."
    ],
    misconceptions: [
      "Thinking plants only respire at night -- they respire continuously, all day.",
      "Thinking plants do the opposite of animals; both respire, plants additionally photosynthesise.",
      "Thinking hotter always means faster -- past the optimum, enzymes denature.",
      "Thinking plants take in oxygen only and never release it."
    ]
  },
  {
    id: "biology-dna",
    subject: "biology",
    experimentIndex: 1,
    titleEn: "DNA replication",
    titleAr: "تضاعف الحمض النووي",
    controls: [
      "Seven stages: Unzip DNA, Add RNA primer, Build leading strand, Build lagging strand, Remove primers, Seal DNA, View results.",
      "The student picks a base (A, T, C or G) and clicks a slot to pair it against the template.",
      "Wrong pairings are rejected with a hint and counted as an incorrect attempt."
    ],
    outputs: [
      "Correct/incorrect attempt counts and replication progress.",
      "A final summary: counts of A, T, C, G, the number of AT and CG pairs, and the total hydrogen bonds."
    ],
    model: [
      "Base pairing rule enforced by the simulation: A pairs with T, C pairs with G.",
      "Hydrogen bonds are counted as 2 per AT pair and 3 per CG pair.",
      "Results only unlock once the whole complementary strand is correct."
    ],
    concepts: [
      "Helicase unzips the double helix by breaking hydrogen bonds and forms the replication fork.",
      "Primase lays down a short RNA primer so DNA polymerase has a starting point.",
      "DNA polymerase reads the template 3' -> 5' and builds the new strand 5' -> 3'.",
      "The leading strand is built continuously; the lagging strand is built in short Okazaki fragments.",
      "DNA ligase seals the sugar-phosphate backbone between fragments.",
      "Replication is semiconservative: each new molecule keeps one original strand and one new strand."
    ],
    misconceptions: [
      "Thinking both new strands are built continuously -- the lagging strand is fragmented.",
      "Thinking replication produces one old and one entirely new molecule, rather than two hybrids.",
      "Mixing up the reading direction (3'->5') with the building direction (5'->3').",
      "Thinking CG and AT pairs have the same number of hydrogen bonds -- CG has 3, AT has 2."
    ]
  }
];

/** Maps the app's material id + experiment index to a lab entry. */
function findLab(materialId, experimentIndex) {
  if (!materialId) return null;
  return LABS.find(
    (lab) => lab.subject === materialId && lab.experimentIndex === Number(experimentIndex)
  ) || LABS.find((lab) => lab.subject === materialId) || null;
}

/** Compact text block describing every lab, used to ground the agent. */
function knowledgeDigest() {
  return LABS.map((lab) => [
    `### ${lab.titleEn} (${lab.titleAr}) [subject: ${lab.subject}]`,
    `Controls: ${lab.controls.join(" ")}`,
    `Readouts: ${lab.outputs.join(" ")}`,
    `How the simulation computes it: ${lab.model.join(" ")}`,
    `Concepts: ${lab.concepts.join(" ")}`,
    `Common misconceptions: ${lab.misconceptions.join(" ")}`
  ].join("\n")).join("\n\n");
}

module.exports = { LABS, findLab, knowledgeDigest };
