# Zero to AI Engineer

A 48-week roadmap from your first line of Python to shipping AI agents, broken into **296 daily lessons**. Each day tells you why the topic matters, explains it simply, and gives you something to build. Your progress is saved in your browser.

## Every day's lesson includes

- **Motto:** why this topic is worth learning
- **In simple words:** a plain-English explanation with an everyday analogy
- **Key concepts:** the handful of ideas to remember
- **Hands-on task:** step-by-step things to build or try
- **Starter code:** copy-ready code for most topics
- **Interview questions:** 2–3 likely questions with model answers (500 in total)
- **Common mistakes:** what trips people up
- **You're done when:** a clear finish line
- **Learn from:** the best free resources for that week

## What it covers

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

Each week includes:

- a short goal
- 4–6 topics to check off
- a hands-on project to build
- free resources: courses, docs, books and YouTube
- the skills you'll gain

The whole path takes about 9 hours a week.

## Features

- A "Today" card that opens your next unfinished day's lesson
- A lesson view with previous and next day buttons, arrow-key navigation, and "Mark day complete"
- Shareable links to any day, for example `/#day-42`
- An interview question bank with search and phase filters
- Progress tracking by day, week and phase, with a colour-coded progress bar
- "Mark week done" to skip topics you already know
- A diagram showing how AI, ML, deep learning, Gen AI and agents fit together
- A library of the best free channels, courses and books
- Light and dark mode, and a mobile-friendly layout
- No build step and no dependencies: `index.html` plus lesson data in `lessons/p1.js` … `lessons/p10.js`

## Editing lessons

Each phase's lessons live in `lessons/pN.js`, keyed by task id (`w12-3` is week 12, topic 3; `w12-p` is that week's project). Fields: `m` motto, `e` simple explanation, `k` key concepts, `t` task steps, `c` starter code, `q` interview questions as `[question, answer]`, `x` common mistakes, `d` done-when, `min` estimated minutes.

## Run locally

Serve the folder (opening the file directly also works):

```bash
python3 -m http.server 8000
```

## Deploy

The page is static, so Vercel serves it with no configuration. Every push to `main` redeploys it.
