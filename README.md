# Zero to MERN Developer · Zero to AI Engineer

Two free, day-by-day learning paths in one React app. A toggle at the top switches between them, and each path saves its own progress in your browser.

| Path | Length | Who it's for |
|---|---|---|
| **Zero to MERN Developer** (default) | 13 weeks · **91 daily lessons** (about 90 days, or 60 on the fast track) | People with **no coding background** who want to become full-stack web developers |
| **Zero to AI Engineer** | 54 weeks · 338 daily lessons | From your first line of Python to shipping AI agents and securing AI apps |

## Every day's lesson includes

- **Motto:** why this topic is worth learning
- **In simple words:** a plain-English explanation with an everyday analogy
- **Key concepts:** the handful of ideas to remember
- **Hands-on task:** step-by-step things to build or try
- **Starter code:** copy-ready code for most topics
- **Interview questions:** 2–3 likely questions with model answers (238 for MERN, 578 for AI)
- **Common mistakes:** what trips people up
- **You're done when:** a clear finish line
- **Learn from:** the best free resources for that week

## Zero to MERN Developer

Written for complete beginners. Lessons start with "how does a website work?" and explain every new idea with everyday examples (a restaurant for the stack, labelled jars for variables, a concert wristband for login tokens). A **jargon buster** explains 30 common terms in plain English.

| Phase | Topic | Weeks | Days |
|---|---|---|---|
| 1 | Web Foundations: how the web works, HTML, CSS, Flexbox, Grid, responsive design, terminal, Git, GitHub, deploying | 1–3 | 1–21 |
| 2 | JavaScript: variables, conditions, loops, functions, arrays, objects, the DOM, events, localStorage, modern JS, async/await, APIs | 4–6 | 22–42 |
| 3 | React: components, props, state, forms, useEffect, React Router, Tailwind, custom hooks, Context, useReducer, deploying on Vercel | 7–9 | 43–63 |
| 4 | Backend: Node, npm, HTTP, Express, REST APIs, MongoDB Atlas, Mongoose, bcrypt, JWT auth, validation, CORS, Helmet, rate limiting | 10–12 | 64–84 |
| 5 | Full-stack MERN & job ready: connect React to the API, auth screens, full CRUD, deploy on Vercel + Render + Atlas, portfolio, resume, interview prep | 13 | 85–91 |

Projects you build along the way: an About Me site, a responsive portfolio (live on GitHub Pages), console games, a to-do app, a weather app, a flashcard app, a movie search app, a shopping cart, a notes REST API with MongoDB, a secure auth API, and a **capstone MERN expense tracker** with login, live on the internet.

**Pace:** Steady is 90 days at about 1.5 hours a day. Fast track is 60 days at about 2.5 hours a day (three lessons every two days).

## Zero to AI Engineer

> **Phase 11 (AI & Application Security) is ethical hacking, taught the legal way.** Every exercise uses deliberately vulnerable practice apps, official training labs (PortSwigger, TryHackMe, OWASP Juice Shop), or systems you own. The rule throughout: only ever test systems you own or have written permission to test. Unauthorised access to any other system is a crime (in India, under the IT Act, 2000).

| Phase | Topic | Weeks |
|---|---|---|
| 1 | Python Foundations | 1–5 |
| 2 | Data & Math for AI (NumPy, Pandas, visualisation, linear algebra, calculus, statistics) | 6–10 |
| 3 | Machine Learning (regression, classification, trees and boosting, clustering, pipelines, Kaggle) | 11–17 |
| 4 | Deep Learning (PyTorch, CNNs, RNNs, Transformers, GANs, diffusion) | 18–24 |
| 5 | Computer Vision & Perception (OpenCV, YOLO, segmentation, tracking, pose, CLIP, depth, 3D point clouds) | 25–29 |
| 6 | NLP & Speech (spaCy, Hugging Face, embeddings, semantic search, Whisper) | 30–32 |
| 7 | Generative AI & LLMs (prompting, RAG, evaluation, fine-tuning with LoRA, multimodal) | 33–38 |
| 8 | Agentic AI (tool calling, MCP, memory, LangGraph, multi-agent systems, agent evals) | 39–42 |
| 9 | Classical AI & Cognitive Computing (search, logic, knowledge graphs, Bayesian networks, reinforcement learning) | 43–45 |
| 10 | MLOps, Deployment & Career (Docker, MLflow, CI/CD, monitoring, portfolio, interviews) | 46–48 |
| 11 | AI & Application Security: ethical, legal labs only (OWASP web/API/mobile/LLM Top 10, red-teaming, defensive ML) | 49–54 |

## Features

- A track toggle at the top: **MERN Developer** first, then **AI Engineer**. The app remembers your last choice
- A "Today" card that opens your next unfinished day's lesson
- A lesson view with previous and next day buttons, arrow-key navigation, and "Mark day complete"
- Shareable links to any day, for example `/#mern/day-12` or `/#ai/day-42` (old `/#day-42` links still open the AI track)
- An interview question bank per track, with search and phase filters
- Progress tracking by day, week and phase, saved separately for each track
- "Mark week done" to skip topics you already know
- A diagram of how the pieces fit together for each track
- A library of the best free channels, courses and books
- Light and dark mode, and a mobile-friendly layout

## Run it locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Deploying

`.github/workflows/deploy.yml` builds the app and publishes `dist/` to GitHub Pages on every push to `main`. One-time setup: in the repo, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

## Project structure

```
src/
├── App.jsx                 # track toggle, hash routing, page layout
├── components/             # Roadmap (tabs, weeks, tasks), LessonModal, Sections (summary, bank, glossary, rules, library)
├── lib/track.js            # derives days/weeks from a track, progress hook
├── styles.css
└── tracks/
    ├── mern/               # index.jsx (copy, diagram, glossary), roadmap.js, lessons/p1–p5.js
    └── ai/                 # index.jsx, roadmap.js, lessons/p1–p11.js
```

Each track is loaded only when it's opened, so visitors to one path don't download the other's lessons.

## Editing lessons

Each phase's lessons live in `src/tracks/<track>/lessons/pN.js`, keyed by task id (`w12-3` is week 12, topic 3; `w12-p` is that week's project). Fields: `m` motto, `e` simple explanation, `k` key concepts, `t` task steps, `c` starter code, `q` interview questions as `[question, answer]`, `x` common mistakes, `d` done-when, `min` estimated minutes, and optionally `note` for a safety callout.

Starter code uses normal template literals, so escape backticks as `` \` `` and `${` as `\${` inside code samples.

Weeks, phases and resources live in `src/tracks/<track>/roadmap.js`.
