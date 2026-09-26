/* Phase 10: MLOps, Deployment & Career (Weeks 46-48) */
window.LESSONS = window.LESSONS || {};
Object.assign(window.LESSONS, {

/* ---------- Week 46: Shipping models ---------- */
"w46-1": {
 m: "Serving a model behind an API is how ML becomes part of a real product.",
 e: "Wrap your saved model in FastAPI: it loads once at startup and answers prediction requests over HTTP.",
 k: ["Load model at startup (lifespan)", "Pydantic request and response schemas", "Batch endpoint for many rows", "Health and version endpoints", "Input validation"],
 t: ["Serve your Titanic or churn pipeline with POST /predict", "Add /health and /version", "Add a batch endpoint", "Load-test with 100 requests using a simple script", "Measure average latency"],
 c: String.raw`from contextlib import asynccontextmanager
from fastapi import FastAPI
from pydantic import BaseModel
import joblib, pandas as pd
models = {}
@asynccontextmanager
async def lifespan(app):
    models["m"] = joblib.load("model.joblib"); yield
app = FastAPI(lifespan=lifespan)
class Passenger(BaseModel):
    Pclass: int; Sex: str; Age: float; Fare: float; Embarked: str = "S"
@app.post("/predict")
def predict(p: Passenger):
    return {"survival": float(models["m"].predict_proba(pd.DataFrame([p.model_dump()]))[0, 1])}`,
 q: [["How do you serve an ML model?", "Load it once in an API service, validate inputs, return predictions, and add health checks, logging and monitoring."],
     ["Online vs batch inference?", "Online answers individual requests in real time; batch scores many records on a schedule."]],
 x: ["Loading the model on every request"],
 d: "API returns predictions with measured latency.",
 min: 60
},
"w46-2": {
 m: "Docker makes your app run the same everywhere. It's expected in almost every AI engineering job.",
 e: "A Docker image is a lunchbox with your code, Python and libraries packed together, so it tastes the same on any machine.",
 k: ["Dockerfile: FROM, COPY, RUN, CMD", "Slim base images", "Layer caching: copy requirements first", ".dockerignore", "docker build, run, ports, env vars"],
 t: ["Write a Dockerfile for your FastAPI model service", "Build and run it locally", "Call it from your browser at localhost:8000/docs", "Shrink the image size and compare"],
 c: String.raw`FROM python:3.12-slim
WORKDIR /app
COPY pyproject.toml uv.lock ./
RUN pip install uv && uv sync --frozen --no-dev
COPY . .
CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
# docker build -t titanic-api . && docker run -p 8000:8000 titanic-api`,
 q: [["Docker image vs container?", "An image is the packaged template; a container is a running instance of it."],
     ["Why copy dependency files before code?", "Docker caches that layer, so rebuilding after code changes doesn't reinstall dependencies."]],
 x: ["Putting secrets in the image"],
 d: "Your API runs from a container.",
 min: 60
},
"w46-3": {
 m: "A model nobody can reach doesn't count. Deploying gives you a real URL for your portfolio.",
 e: "Push your container or app to a hosting service that runs it on the internet.",
 k: ["Hugging Face Spaces (Gradio, Streamlit, Docker)", "Render or Railway for Docker APIs", "Cloud VMs (EC2, Azure VM, GCE)", "Environment variables for secrets", "Cold starts on free tiers"],
 t: ["Deploy your Docker API to Render or Railway", "Deploy a Gradio demo to Hugging Face Spaces", "Set secrets through the dashboard", "Test from your phone"],
 q: [["How would you deploy a model to production?", "Containerise, deploy to a managed platform or Kubernetes, configure secrets and scaling, add monitoring and a rollback path."]],
 x: ["Hard-coding the localhost URL in the frontend"],
 d: "A public URL that works from your phone.",
 min: 60
},
"w46-4": {
 m: "Experiment tracking and a model registry are how teams know which model is in production and why.",
 e: "MLflow records every training run (settings, metrics, files) and keeps a versioned shelf of approved models.",
 k: ["mlflow.start_run, log_param, log_metric, log_model", "MLflow UI to compare runs", "Model registry with versions and aliases", "Loading a model by registry name"],
 t: ["Add MLflow tracking to your churn training script", "Run 5 experiments and compare in the UI", "Register the best model", "Load it by name in your API"],
 c: String.raw`import mlflow, mlflow.sklearn
mlflow.set_experiment("churn")
with mlflow.start_run():
    mlflow.log_params({"lr": 0.05, "leaves": 31})
    model.fit(X_tr, y_tr)
    mlflow.log_metric("auc", auc)
    mlflow.sklearn.log_model(model, "model", registered_model_name="churn")`,
 q: [["What is a model registry?", "A central store of model versions with metadata and stages or aliases, so teams know which version is deployed."]],
 x: ["Registering models without the data version used"],
 d: "API loads the registered model.",
 min: 60
},
"w46-5": {
 m: "CI runs your tests automatically on every push, catching bugs before users do.",
 e: "GitHub Actions is a robot that runs your tests every time you push code, and shows a green tick or red cross.",
 k: [".github/workflows/ci.yml", "Triggers: push, pull_request", "Steps: checkout, setup Python, install, test", "Caching dependencies", "Status badge in README"],
 t: ["Add a CI workflow that runs pytest", "Add a lint step (ruff)", "Break a test and watch CI fail", "Add the status badge to your README"],
 c: String.raw`name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v5
      - run: uv sync
      - run: uv run ruff check .
      - run: uv run pytest -q`,
 q: [["What is CI/CD?", "Continuous integration automatically builds and tests every change; continuous delivery/deployment automatically releases passing changes."]],
 x: ["Tests that need secrets failing in CI"],
 d: "Green CI badge on your repo.",
 min: 45
},
"w46-p": {
 m: "A containerised, tested, deployed model API is the standard 'can you ship?' proof.",
 e: "Your churn or Titanic model as a Dockerised FastAPI with CI and a public URL.",
 k: ["FastAPI + Docker", "Tests + GitHub Actions", "Deployed with secrets", "README with architecture diagram"],
 t: ["Combine this week's work into one repo", "CI runs tests and builds the image", "Deploy and add the URL to the README", "Add an architecture diagram (Mermaid)", "Record a 1-minute demo"],
 q: [["Walk me through your deployment pipeline.", "Push triggers CI tests and image build; passing builds deploy to the host; secrets come from the platform; health checks confirm it's live."]],
 x: ["Manual steps not written anywhere"],
 d: "Public URL, green CI.",
 min: 180
},

/* ---------- Week 47: Production ML & LLMOps ---------- */
"w47-1": {
 m: "Models decay silently when the world changes. Monitoring catches it before the business notices.",
 e: "Data drift: the inputs change (new customer types). Concept drift: the relationship changes (what predicts churn changes). Monitoring compares today with training time.",
 k: ["Log inputs, predictions and outcomes", "Drift metrics: PSI, KS test", "Evidently for drift reports", "Alerts and retraining triggers", "Delayed labels"],
 t: ["Log every prediction from your API to a file or SQLite", "Simulate drift by shifting a feature", "Generate an Evidently drift report", "Define an alert rule"],
 q: [["Data drift vs concept drift?", "Data drift is a change in input distribution; concept drift is a change in the relationship between inputs and the target."],
     ["How do you monitor a model without labels?", "Track input and prediction distributions for drift, then evaluate properly when labels arrive."]],
 x: ["Only monitoring server uptime"],
 d: "Drift report detects your simulated shift.",
 min: 60
},
"w47-2": {
 m: "Choosing batch vs real-time and GPU vs CPU decides cost and user experience.",
 e: "Real-time is a made-to-order kitchen; batch is cooking everything overnight. GPUs are powerful but expensive, so use them only when needed.",
 k: ["Latency, throughput, cost trade-offs", "Batch scoring with scheduled jobs", "Autoscaling and cold starts", "GPU for large models, CPU for small ones", "Serverless GPU options"],
 t: ["Write a batch scoring script for 100k rows and time it", "Compare CPU inference cost per 1,000 predictions for your model", "Estimate monthly cost for 1M predictions on a small GPU vs CPU", "Write when to choose each"],
 q: [["How do you decide batch vs real-time inference?", "Whether predictions are needed instantly per request, how fresh they must be, and cost; batch is cheaper when latency doesn't matter."]],
 x: ["Paying for an always-on GPU for a tiny model"],
 d: "Cost comparison written.",
 min: 45
},
"w47-3": {
 m: "Most companies run on AWS, Azure or GCP. Knowing one AI platform is a strong hiring signal.",
 e: "Each cloud offers managed model training, hosting and LLM APIs. Learn one well; the others are similar.",
 k: ["AWS: SageMaker, Bedrock", "Azure: Azure AI Foundry, Azure OpenAI", "GCP: Vertex AI, Gemini API", "IAM and least privilege", "Cost alerts and free tiers"],
 t: ["Pick one cloud (Azure fits many Indian consulting roles)", "Create a free account with a budget alert", "Call a hosted LLM through the platform", "Deploy a small model endpoint and delete it after testing"],
 q: [["What would you use to host an LLM app on your chosen cloud?", "Name the managed LLM service, the compute for your API (container service), storage and the vector database option."]],
 x: ["Forgetting to delete endpoints and getting billed"],
 d: "One working cloud call and a budget alert.",
 min: 120
},
"w47-4": {
 m: "LLMOps is how teams keep LLM apps reliable as prompts, models and data change.",
 e: "Treat prompts like code: version them, test them with evals on every change, and trace production traffic.",
 k: ["Prompt versioning in Git or a prompt registry", "Eval suite in CI with a pass threshold", "Tracing and feedback in production", "Model upgrades behind evals", "Guardrail monitoring"],
 t: ["Move prompts into versioned files", "Add your RAG eval set to CI with a minimum score", "Change a prompt and watch CI catch a regression", "Add tracing and feedback collection"],
 q: [["How do you safely change a prompt in production?", "Version it, run the eval suite, compare with the current version, roll out gradually and monitor traces and feedback."]],
 x: ["Editing prompts directly in production"],
 d: "CI fails on a deliberate regression.",
 min: 60
},
"w47-5": {
 m: "Chip Huyen's AI Engineering is the most practical book on building with foundation models.",
 e: "It covers evaluation, prompting, RAG, agents, fine-tuning, data and inference optimisation in one place.",
 k: ["Evaluation methodology", "Prompt engineering and RAG", "Agents", "Fine-tuning and dataset engineering", "Inference optimisation and architecture"],
 t: ["Read the chapters on evaluation and RAG/agents", "Write 10 takeaways", "Apply one idea to your capstone"],
 q: [["What's the biggest lesson from building AI products?", "Evaluation is the foundation; without reliable evals you can't improve or safely change anything."]],
 x: ["Reading without applying"],
 d: "One idea applied to a project.",
 min: 300
},
"w47-p": {
 m: "Adding monitoring and evals-in-CI turns a demo into something production-grade.",
 e: "Pick an earlier project and add drift monitoring plus an automatic eval gate.",
 k: ["Prediction logging", "Drift report", "Eval in CI with threshold"],
 t: ["Add prediction logging to your ML API", "Schedule a weekly drift report with GitHub Actions", "Add RAG evals to CI for your Gen AI capstone", "Document the monitoring in the README"],
 q: [["How do you know your deployed model is still good?", "Monitor drift and prediction distributions, collect outcomes for real metrics, and alert when thresholds are crossed."]],
 x: ["Monitoring without alerts"],
 d: "Scheduled drift report and eval gate running.",
 min: 180
},

/* ---------- Week 48: Portfolio and job hunt ---------- */
"w48-1": {
 m: "Recruiters spend seconds on your GitHub. Pinned, polished projects decide whether they look further.",
 e: "Your GitHub profile is a shop window. Put your 4-6 best items at the front, well lit and labelled.",
 k: ["Profile README with a one-line pitch", "Pin 4-6 projects covering ML, DL/CV, Gen AI and agents", "Each README: problem, demo link, results, stack, how to run", "Consistent names and descriptions"],
 t: ["Create a profile README", "Choose and pin your 6 best projects", "Polish each README with a demo GIF", "Archive or hide weak repos"],
 q: [["Which project are you proudest of and why?", "Pick one, explain the problem, your decisions, a hard problem you solved and measurable results."]],
 x: ["Pinning tutorial clones"],
 d: "Profile looks strong at a glance.",
 min: 120
},
"w48-2": {
 m: "Writing about your work builds visibility and proves you understand it.",
 e: "Each capstone becomes a short post: what you built, one thing you learned, a demo link.",
 k: ["Hook in the first line", "One lesson per post", "Visual: GIF, chart or diagram", "Link to repo and demo", "Consistency beats virality"],
 t: ["Write a LinkedIn post for each capstone (up to 10)", "Schedule one or two a week", "Write one longer blog post (Medium, Hashnode or dev.to) on your best project"],
 q: [["How do you stay current in AI?", "Name your sources (papers feed, newsletters, building side projects) and something recent you tried."]],
 x: ["Posts with no link or visual"],
 d: "Posts drafted and scheduled.",
 min: 120
},
"w48-3": {
 m: "A resume built around AI projects and impact gets shortlisted for AI roles.",
 e: "Each bullet: action verb, what you built, the tech, and a number that shows impact.",
 k: ["One page, ATS-friendly", "Projects section with links", "Bullets: action + what + how + result", "Skills grouped: ML, DL, Gen AI, MLOps", "Tailor keywords per job"],
 t: ["Rewrite your resume with an AI projects section", "Write 3 bullets per project with numbers", "Tailor it to 3 real job descriptions", "Get feedback from one person in the field"],
 q: [["Tell me about yourself.", "90 seconds: your background, why AI, 2 projects with results, and what you want next."]],
 x: ["Listing every library you've touched"],
 d: "Tailored resume versions ready.",
 min: 120
},
"w48-4": {
 m: "AI interviews test theory, system design and coding. Structured prep turns this roadmap into offers.",
 e: "Revise the interview questions from every lesson, practise designing systems out loud, and keep coding sharp.",
 k: ["ML theory: bias-variance, metrics, regularisation, trees, neural nets", "LLM topics: RAG, fine-tuning, evals, agents, cost", "ML/LLM system design: requirements, data, model, serving, monitoring", "Python coding and SQL", "Behavioural answers with STAR"],
 t: ["Go through the interview questions from this site's lessons and answer each out loud", "Do 3 mock system designs: fraud detection, RAG chatbot, recommendation feed", "Solve 30 Python/SQL problems", "Do 2 mock interviews with a friend or AI"],
 q: [["Design a RAG system for a company's internal documents.", "Clarify users and scale, ingestion and chunking, embeddings and hybrid retrieval, permissions, generation with citations, evals, monitoring and cost."],
     ["Design a fraud detection system.", "Real-time features, a fast model with a threshold tuned for recall at acceptable precision, human review queue, feedback loop and drift monitoring."]],
 x: ["Jumping to the model before clarifying requirements"],
 d: "3 designs and 2 mocks completed.",
 min: 600
},
"w48-5": {
 m: "Applying consistently and smartly turns preparation into interviews.",
 e: "Target roles that match your projects, apply with tailored materials, and use referrals.",
 k: ["Roles: AI Engineer, ML Engineer, Gen AI Developer, Applied Scientist, MLOps", "Job boards: LinkedIn, Naukri, Wellfound, company careers pages", "Referrals have much higher response rates", "Track applications in a sheet", "Follow up politely"],
 t: ["List 30 target companies", "Find a contact at 10 of them for referrals", "Apply to 5-10 roles a week with tailored resumes", "Track every application and response", "Review and adjust every 2 weeks"],
 q: [["Why do you want this role?", "Connect the company's AI work to a specific project of yours and what you want to learn next."]],
 x: ["Mass-applying with one generic resume"],
 d: "Tracker running with applications sent.",
 min: 240
},
"w48-p": {
 m: "A portfolio site ties everything together in one link you can share anywhere.",
 e: "A simple personal site that shows who you are and links every capstone with a demo.",
 k: ["Hero: name, role, one-line pitch", "Project cards with demo and repo links", "Short about section", "Contact and resume link", "Deploy on Vercel"],
 t: ["Build a one-page site (or extend your existing portfolio)", "Add a card for each capstone with a GIF", "Link resume and LinkedIn", "Deploy on Vercel with a custom domain if you like", "Share it in your LinkedIn featured section"],
 q: [["What would you build next?", "Name a concrete, ambitious project that extends your skills and why it matters."]],
 x: ["Broken demo links"],
 d: "Portfolio live and linked everywhere.",
 min: 240
}
});
