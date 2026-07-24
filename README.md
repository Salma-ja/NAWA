# NAWA
An AI-powered virtual lab that helps students learn science through simulations.

**Making the Invisible, Understandable**

An AI-powered simulation lab for the science you can't see — electromagnetic fields, chemical reactions, and cellular processes.

> Built for the **JSYP Hackathon** · Education Sector · Phase 1
> Team **4 BITS**: Salma, Mohammad, Tasneem, Ro'aa

---

## The Problem

Science is taught through textbooks, lectures, and formulas — but lab time is scarce, so students learn the laws without ever seeing them work.

- **Limited Lab Access** — cost, equipment, time, and safety concerns keep many classrooms out of the laboratory entirely.
- **Memorizing, Not Understanding** — students recall formulas and definitions but struggle to explain the concepts behind them.
- **Hard to Picture, Hard to Engage** — concepts like electromagnetic induction, electricity, and mechanics are difficult to grasp without seeing them in action.

## Our Solution

LUMEN is an AI-powered web platform where students **run** the experiment, not just read about it.

| Feature | Description |
|---|---|
| **Interactive Simulations** | Adjust variables and watch the effects instantly, in experiments that replicate a real lab. |
| **AI Coach** | Real-time guidance and explanations that walk students through every step of the experiment. |
| **Quizzes & Feedback** | A quiz after every experiment reinforces learning and confirms real understanding. |

**Flow:** Explore → Understand → Master

## How It Works

### Two ways in, one experience
- **School students** — scan a QR code printed next to the experiment in their textbook; it opens directly.
- **University students** — choose a science type (Physics, Chemistry, Biology), then choose the experiment.

### Inside the experiment
1. **Equipment appears** — based on the experiment chosen, the exact equipment shows up (coils, beakers, charges, etc.)
2. **Manipulate it** — adjust exactly the variables that experiment calls for (current, turns, concentration...) and watch it happen.
3. **Understand why** — live guidance, AI-powered questions, smart in-experience alerts, and an interactive chatbot for support.
4. **Personalized quiz** — a short adaptive evaluation generated dynamically from the student's own actions.

## Who Benefits

- **Students** — build real intuition, learn at their own pace, no physical lab required.
- **Teachers** — real-time learning analytics reveal misconceptions and class-wide knowledge gaps automatically.
- **Schools & Ministries** — a low-cost way to deliver lab-quality science education, even where equipment is limited.

## Competitive Edge

| Aspect | Existing Solutions | LUMEN |
|---|---|---|
| Content Type | Educational videos only | Interactive simulations |
| Student Role | Passive watching | Hands-on practice & experimentation |
| Feedback | No instant guidance | Smart AI coach with continuous support |
| Assessment | Separated from the experiment | Built into the experience in real time |
| Personalization | Same content for everyone | Personalized learning path |

## Architecture

```
Frontend Website  →  Simulation Engine  →  Backend + Events  →  AI Coach + Quiz
```

- **Frontend Website** — Next.js / React interface, experiment selection + sliders, responsive student experience.
- **Simulation Engine** — physics formulas in JavaScript, SVG/Canvas animations, real-time variable updates.
- **Backend + Events** — lightweight API layer, tracks student actions, sends experiment context to the AI.
- **AI Coach + Quiz** — context-based alerts, optional chatbot support, mixed quiz after completion.

> The simulation calculates the science. The AI explains, guides, and personalizes the learning.

## Project Structure

```
lumen/
├── apps/
│   ├── web/                # Next.js frontend (experiment selection, UI, sliders)
│   └── api/                 # Backend layer (API routes, student action tracking)
├── packages/
│   ├── simulation-engine/  # Physics/chemistry logic + Canvas/SVG animations
│   └── ai-coach/            # AI coach logic, prompts, and quiz generation
├── docs/
│   └── architecture.md
└── README.md
```

## Roadmap

| Phase | Focus |
|---|---|
| 01 | Define Experiments — select physics laws and learning goals |
| 02 | Build Simulations — convert formulas into interactive visuals |
| 03 | Connect AI Coach — send actions + results for guided feedback |
| 04 | Add Quiz Flow — generate questions based on student interaction |
| 05 | Test & Expand — improve usability and add more experiments |

## What We'll Build (Phase 2)

- Two entry paths: QR-code linking for school textbooks, subject-then-experiment picker for university students.
- Simulation modules in Physics, Chemistry, and Biology (fields, reactions, cell processes) using existing 2D canvas libraries.
- A working AI mentor grounded in the live simulation state, via an LLM API.
- A 3-question adaptive evaluation generated dynamically from the student's own actions.

## Future Vision (Beyond This Competition)

- Teacher dashboard & class analytics
- Multi-language support

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Salma-ja/NAWA.git
cd NAWA

# Install frontend dependencies
cd apps/web
npm install
npm run dev
```

## Team — 4 BITS

| Name | Role |
|---|---|
| Salma | leader & Front end develper |
| Mohammad | Backend developer|
| Tasneem | Designer |
| Ro'aa | AI Engineer|

## References

- Bestiantono, D.S. et al. (2019). *University Students' Misconception in Electromagnetism.* J. Phys.: Conf. Ser. 1417, 012074.
- *General Students' Misconceptions Related to Electricity and Magnetism.* arXiv:physics/0503132.
- *Meta-Analysis of the Effectiveness of PhET Simulations in Physics Education.* Int. J. Online and Biomedical Engineering (iJOE), 2026.
- University of the Philippines Diliman (2023), cited in: *Why Schools Lack Laboratory and Equipment in Science.* IJRISS, 2024.
- *A Comprehensive Review of AI-Based Intelligent Tutoring Systems.* arXiv:2507.18882, 2025.

---

*4 BITS · JSYP Hackathon 2026 · Education Sector*
