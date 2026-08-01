# NAWA

An AI-powered virtual lab that helps students learn science through interactive simulations.

**Making the Invisible, Understandable**

NAWA is an AI-powered simulation lab for the science you can't see: electromagnetic fields, chemical reactions, and cellular processes.

> Built for the **JSYP Hackathon** · Education Sector · Phase 1  
> Team **4 BITS**: Salma, Mohammad, Tasneem, Ro'aa

---

## The Problem

Science is often taught through textbooks, lectures, and formulas, while real lab access remains limited. Students end up memorizing laws without truly seeing them in action.

- **Limited Lab Access**: Cost, equipment, time, and safety constraints keep many classrooms away from hands-on experiments.
- **Memorizing, Not Understanding**: Students may recall formulas and definitions but still struggle to explain the concepts behind them.
- **Hard to Picture, Hard to Engage**: Topics like electromagnetic induction, electricity, and mechanics are difficult to grasp without visualization and interaction.

## Our Solution

NAWA is an AI-powered web platform where students **run** the experiment, not just read about it.

| Feature | Description |
|---|---|
| **Interactive Simulations** | Adjust variables and watch the effects instantly in experiments that feel like a real lab. |
| **AI Coach** | Get real-time guidance and explanations through every step of the experiment. |
| **Quizzes & Feedback** | Reinforce learning with short evaluations that confirm real understanding. |

**Flow:** Explore -> Understand -> Master

## How It Works

### Two ways in, one experience

- **School students**: Scan a QR code printed next to the experiment in the textbook and open it directly.
- **University students**: Choose a science track such as Physics, Chemistry, or Biology, then choose the experiment.

### Inside the experiment

1. **Equipment appears**: Based on the selected experiment, the right tools and setup are shown immediately.
2. **Manipulate it**: Adjust the variables that matter for that experiment and watch the results update live.
3. **Understand why**: Receive AI guidance, live hints, interactive support, and step-by-step clarification.
4. **Personalized quiz**: Finish with a short adaptive evaluation generated from the student's own actions.

## Who Benefits

- **Students**: Build real intuition, learn at their own pace, and practice without needing a physical lab.
- **Teachers**: Gain better visibility into misconceptions and classroom learning gaps.
- **Schools and Ministries**: Deliver lab-quality science education at lower cost, even where equipment is limited.

## Competitive Edge

| Aspect | Existing Solutions | NAWA |
|---|---|---|
| Content Type | Educational videos only | Interactive simulations |
| Student Role | Passive watching | Hands-on practice and experimentation |
| Feedback | No instant guidance | Smart AI coach with continuous support |
| Assessment | Separate from the experiment | Built into the experience in real time |
| Personalization | Same content for everyone | Personalized learning path |

## Architecture

```text
Web Experience -> Simulation Engine -> Backend Events -> AI Coach and Quiz
```

- **Web Experience**: Student-facing interface for experiment selection, controls, and interactive learning.
- **Simulation Engine**: Core science logic and visual feedback for each experiment.
- **Backend Events**: Tracks actions and sends experiment context for guidance and analytics.
- **AI Coach and Quiz**: Explains, guides, and generates adaptive assessment flows.

> The simulation calculates the science. The AI explains, guides, and personalizes the learning.

## Repository Structure

```text
NAWA/
|-- web/
|   `-- index.html          # Main frontend prototype
|-- assets/
|   `-- brand/              # Logos, icons, and brand guide images
|-- docs/
|   `-- reference/          # Video and visual reference frames
`-- README.md
```

## Roadmap

| Phase | Focus |
|---|---|
| 01 | Define experiments and learning goals |
| 02 | Build simulations from scientific concepts |
| 03 | Connect the AI coach to experiment activity |
| 04 | Add adaptive quiz flows |
| 05 | Test, improve usability, and expand content |

## What We'll Build Next

- Two entry paths: QR-code linking for school use and a subject-first experiment picker for university use.
- Simulation modules across Physics, Chemistry, and Biology.
- A working AI mentor grounded in the live simulation state.
- A short adaptive evaluation generated dynamically from the student's actions.

## Future Vision

- Teacher dashboard and classroom analytics
- Multi-language support

## Run Locally

```bash
cd web
node server.js
```

Then open <http://127.0.0.1:4174>.

Opening `web/index.html` directly from the file system does **not** work: the browser blocks Babel from
fetching the `.jsx` files over `file://`, and the AI tutor needs the server's API endpoints.

### AI tutor setup

The tutor calls the OpenAI API from the server, so the key is never exposed to the browser.

1. Copy `web/.env.example` to `web/.env`.
2. Put your key in it: `OPENAI_API_KEY=sk-...`
3. Restart the server.

On start-up the server prints whether the tutor is connected. `web/.env` is git-ignored -- never commit a real key.

| Variable | Default | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | *(required)* | Your OpenAI key. Without it the tutor returns a clear "not configured" message. |
| `OPENAI_MODEL` | `gpt-4o-mini` | Any chat-completions model. `gpt-4o` is noticeably more accurate, especially in Arabic. |
| `OPENAI_BASE_URL` | OpenAI | Only change for Azure OpenAI or a compatible proxy. |
| `PORT` | `4174` | Server port. |

### How the tutor works

| Piece | File |
|---|---|
| Lab grounding: real controls, formulas and misconceptions from each simulation | `web/agent/lab-knowledge.js` |
| System prompt, scope rules, OpenAI transport | `web/agent/agent.js` |
| `POST /api/chat`, `POST /api/quiz`, `GET /api/status` | `web/server.js` |
| Chat UI and in-chat scored quiz | `ChatWidget` in `web/components.jsx` |

- **Stays on topic.** The agent answers questions about the six labs and the science behind them, and
  politely declines anything else. Scope is judged by the model from the system prompt -- there is no
  keyword filter, because words like *temperature* are off-topic as weather but on-topic in the
  photosynthesis lab.
- **Follows the conversation.** Every request carries the previous turns, so "why?" or "and the other
  one?" resolve against what was just discussed.
- **Knows what the student is doing.** The student's live simulation settings and readings are sent with
  each message, so the tutor can answer "why is my voltage 0?" from their actual setup.
- **Quizzes are marked in code.** The model writes the questions and the answer key; the app compares the
  student's choice against that key in JavaScript. Letting the model mark answers from memory proved
  unreliable, so it no longer does.
- **Works in Arabic and English**, following whichever language the student writes in.

## Team

| Name | Role |
|---|---|
| Salma | Leader and frontend developer |
| Mohammad | Backend developer |
| Tasneem | Designer |
| Ro'aa | AI engineer |

## References

- Bestiantono, D.S. et al. (2019). *University Students' Misconception in Electromagnetism.* J. Phys.: Conf. Ser. 1417, 012074.
- *General Students' Misconceptions Related to Electricity and Magnetism.* arXiv:physics/0503132.
- *Meta-Analysis of the Effectiveness of PhET Simulations in Physics Education.* Int. J. Online and Biomedical Engineering (iJOE), 2026.
- University of the Philippines Diliman (2023), cited in: *Why Schools Lack Laboratory and Equipment in Science.* IJRISS, 2024.
- *A Comprehensive Review of AI-Based Intelligent Tutoring Systems.* arXiv:2507.18882, 2025.

---

*4 BITS · JSYP Hackathon 2026 · Education Sector*
