# Zero to AI Engineer

A 48-week, week-by-week roadmap tracker that goes from your first line of Python to shipping AI agents. Tick off topics and projects as you go, and your progress is saved in your browser.

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

- Progress tracking by task, week and phase, with a colour-coded progress bar
- An "Up next" card that jumps straight to your current week
- "Mark week done" to skip topics you already know
- A diagram showing how AI, ML, deep learning, Gen AI and agents fit together
- A library of the best free channels, courses and books
- Light and dark mode, and a mobile-friendly layout
- No build step and no dependencies: a single `index.html`

## Run locally

Open `index.html` in any browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Deploy

The page is static, so Vercel serves it with no configuration. Every push to `main` redeploys it.
