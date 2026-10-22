import { PHASES, R, WEEKS, LIB } from "./roadmap.js";
import p1 from "./lessons/p1.js";
import p2 from "./lessons/p2.js";
import p3 from "./lessons/p3.js";
import p4 from "./lessons/p4.js";
import p5 from "./lessons/p5.js";
import p6 from "./lessons/p6.js";
import p7 from "./lessons/p7.js";
import p8 from "./lessons/p8.js";
import p9 from "./lessons/p9.js";
import p10 from "./lessons/p10.js";
import p11 from "./lessons/p11.js";
import d1 from "./drills/w1.js";
import d2 from "./drills/w2.js";
import d3 from "./drills/w3.js";
import d4 from "./drills/w4.js";
import d5 from "./drills/w5.js";

/* Syntax drills ride along on their lesson as .p (problem + several worked solutions). */
const DRILLS = { ...d1, ...d2, ...d3, ...d4, ...d5 };
const LESSONS = { ...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7, ...p8, ...p9, ...p10, ...p11 };
for (const [id, p] of Object.entries(DRILLS)) LESSONS[id] = { ...LESSONS[id], p };

function AiMap() {
  return (
    <div className="map">
      <div className="nest">
        <div className="nest-title"><b>Artificial Intelligence</b><span>search, logic, planning, reinforcement learning, cognitive computing</span><em>Phase 9</em></div>
        <div className="nest">
          <div className="nest-title"><b>Machine Learning</b><span>learns patterns from data: regression, trees, clustering</span><em>Phase 3</em></div>
          <div className="nest">
            <div className="nest-title"><b>Deep Learning</b><span>neural networks: CNNs, RNNs, Transformers</span><em>Phase 4</em></div>
            <div className="nest">
              <div className="nest-title"><b>Generative AI</b><span>LLMs and diffusion models that create text, images, audio</span><em>Phase 7</em></div>
              <div className="nest-title" style={{ borderTop: "1px dashed var(--line)", paddingTop: 8 }}><b>Agentic AI</b><span>LLM + tools + memory + a loop that acts</span><em>Phase 8</em></div>
            </div>
          </div>
        </div>
        <div className="foundation"><b>Foundation for all of it</b><span>Python · data tools · linear algebra, calculus, statistics · Phases 1–2</span></div>
      </div>
      <div className="side-col">
        <div className="side"><b>Computer Vision &amp; Perception</b><span>images, video, depth, 3D, sensors</span><em>Phase 5</em></div>
        <div className="side"><b>NLP &amp; Speech</b><span>text, language, embeddings, audio</span><em>Phase 6</em></div>
        <div className="side"><b>MLOps &amp; Deployment</b><span>getting models to real users</span><em>Phase 10</em></div>
        <div className="side"><b>AI &amp; App Security</b><span>red-teaming, OWASP, legal labs only</span><em>Phase 11</em></div>
      </div>
    </div>
  );
}

export default {
  id: "ai",
  label: "AI Engineer",
  title: "Zero to AI Engineer",
  storageKey: "zero-to-ai-engineer-v1",
  unit: "weeks",
  lede: "One ordered path from your first line of Python to shipping agents: data and math, machine learning, deep learning, computer vision and perception, NLP, Gen AI, agentic AI, classical AI and cognitive computing, deployment, then AI security. Every day has a lesson: the motto, a simple explanation, a hands-on task, starter code, interview questions and a clear finish line. Learn by building, one day at a time.",
  mapTitle: "How it all fits together",
  mapIntro: "Each field sits inside a bigger one. Vision and language are application areas that use every layer. Learn from the outside in.",
  Map: AiMap,
  drillTitle: "Python syntax drills",
  drillHint: "Every coding problem from Phase 1, each with one or more worked solutions. Type the answer yourself first, then compare. Repeat until the syntax is automatic, so real-world code reads like plain English.",
  bankHint: 'Every interview question from every lesson, with model answers. Filter by phase or search a topic like "RAG" or "overfitting".',
  doneMessage: "Keep building, and read new papers each week on Hugging Face.",
  rules: [
    ["70% building, 30% watching.", "A video you watched is not a skill. The project at the end of each week is the real test."],
    ["Push everything to GitHub.", "One repo per project with a README, a screenshot and a live demo link where possible."],
    ["Don't skip Phases 1–3 to reach Gen AI.", "You'll hit a bug in week one of LLM work that only fundamentals can fix."],
    ["Use AI as a tutor, not a ghostwriter.", "Ask it to explain and review. Type the code yourself while learning."],
    ["Behind schedule is fine.", "The order matters; the dates don't. Stretch a week into two when a topic is hard."],
    ["Write about what you learn.", "A short LinkedIn post per phase builds your profile and cements the concepts."],
  ],
  PHASES,
  WEEKS,
  R,
  LIB,
  LESSONS,
};
