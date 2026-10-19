/* MERN Phase 5: Full-Stack MERN and Job Ready (Week 13)
   Code samples use normal template literals: backticks and ${ inside code are escaped. */
export default {

/* ---------- Week 13: Full-stack MERN ---------- */
"w13-1": {
 m: "Today the dining room meets the kitchen. Your React app starts talking to your own API.",
 e: "Until now your React apps called other people's APIs, and your API was tested with Thunder Client. Now you join them. React runs on one address (localhost:5173) and Express on another (localhost:5000). In development, Vite's proxy forwards any request starting with /api to your Express server, so the browser thinks it's one site and CORS doesn't get in the way. In production, the frontend reads the API's address from an environment variable.",
 k: ["Monorepo layout: one repo with client/ (React) and server/ (Express) folders", "Vite proxy: server.proxy: { \"/api\": \"http://localhost:5000\" } in vite.config.js", "In production: fetch(\`\${import.meta.env.VITE_API_URL}/api/notes\`)", "One api.js helper that adds the base URL, JSON headers and the auth token", "Run both: two terminals (npm run dev in each), or the concurrently package"],
 t: ["Create a mern-notes folder with client/ (a new Vite React app) and server/ (copy your notes-api)", "Add the Vite proxy for /api", "Write client/src/services/api.js with a request() helper that handles JSON and errors", "Temporarily remove protect from GET /api/notes, and show the notes in React", "Add a form in React that POSTs a new note and adds it to the list", "Open the Network tab and watch React call your own API"],
 c: `// client/vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": "http://localhost:5000" },
  },
});

// client/src/services/api.js
const BASE = import.meta.env.VITE_API_URL || "";  // "" in dev, so the proxy is used

export async function request(path, { method = "GET", body, token } = {}) {
  const res = await fetch(\`\${BASE}/api\${path}\`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: \`Bearer \${token}\` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// usage
const notes = await request("/notes", { token });
const created = await request("/notes", { method: "POST", body: { title }, token });`,
 q: [["How does a React frontend communicate with an Express backend?", "Over HTTP. React sends requests with fetch or axios to the Express API's endpoints, usually with JSON bodies and an Authorization header, and renders the JSON responses. CORS must allow the frontend's origin, or a dev proxy is used."],
     ["What does the Vite dev proxy do?", "It forwards matching requests (like /api/*) from the Vite dev server to the backend, so the browser only talks to one origin during development, which avoids CORS issues."]],
 x: ["Hard-coding http://localhost:5000 in components, which breaks in production", "Forgetting to start the backend, then debugging \"Failed to fetch\" for an hour", "Duplicating fetch logic in every component"],
 d: "Your React app lists and creates notes through your own Express API and MongoDB.",
 min: 75
},
"w13-2": {
 m: "Signup and login screens turn a demo into a product people can actually use.",
 e: "You'll build Register and Login pages that call your auth API. When login succeeds, you store the token and the user in an AuthContext (and in localStorage so a refresh keeps you logged in). A ProtectedRoute component acts as a guard: if there's no user, it redirects to /login. The navbar shows \"Login\" to guests and \"Hi, Priya · Logout\" to logged-in users.",
 k: ["AuthContext holds user, token, login(), register() and logout()", "Persist the token in localStorage, and on app start call /api/auth/me to restore the user", "ProtectedRoute: if (!user) return <Navigate to=\"/login\" replace />", "Logout = clear the token and user, then navigate to /login", "Show API errors on the form (\"Invalid email or password\")"],
 t: ["Build AuthContext with login, register and logout using your api.js helper", "Build Register and Login pages with controlled forms, loading states and error messages", "Save the token in localStorage and restore the session on app load with GET /api/auth/me", "Build ProtectedRoute and wrap the notes page in it", "Update the navbar to show the user's name and a Logout button", "Put protect back on the notes routes and send the token with every notes request"],
 c: `// client/src/context/AuthContext.jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!token) { setReady(true); return; }
    request("/auth/me", { token })
      .then(setUser)
      .catch(() => logout())
      .finally(() => setReady(true));
  }, [token]);

  async function login(email, password) {
    const data = await request("/auth/login", { method: "POST", body: { email, password } });
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

// client/src/components/ProtectedRoute.jsx
export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" replace />;
}`,
 q: [["How do you implement protected routes in React?", "Keep the auth state in context, and wrap private routes in a component that checks for a user. If there isn't one, redirect to login with <Navigate>. Show a loading state while the session is being restored so users aren't wrongly redirected."],
     ["Is a protected route in React enough to secure data?", "No. It only hides the UI. Real protection is on the backend: every API request must be authenticated and authorised, because anyone can call the API directly."]],
 x: ["Redirecting to login before checking the saved token, which kicks users out on every refresh", "Treating frontend route guards as real security", "Forgetting to clear the user's data on logout"],
 d: "Users can register, log in, stay logged in after refresh, log out, and can't reach the notes page as a guest.",
 min: 90
},
"w13-3": {
 m: "Create, read, update, delete, all from the screen. This is what employers mean by a \"full-stack CRUD app\".",
 e: "Today the user can do everything through the interface: add a note, see their notes, edit one in place, delete one with a confirmation, and filter or search. You'll also handle what happens between the click and the server's reply: disabling buttons, showing that something is saving, and updating the list. Optimistic updates (changing the UI first, then rolling back if the server fails) make apps feel instant.",
 k: ["After a successful POST, add the returned note to state (don't re-fetch everything)", "Edit mode: a note switches between view and an inline edit form", "Delete with a confirmation step (an \"Are you sure?\" inline prompt, not window.confirm)", "Optimistic delete: remove from state first, then restore it if the API call fails", "Pass search and category as query parameters to your API's filters"],
 t: ["Build NoteForm for creating notes (title, body, category)", "Build NoteItem with view and edit modes, saving with PUT", "Add delete with an inline \"Delete? Yes / No\" confirmation", "Make delete optimistic, with a rollback and an error message if it fails", "Add search and category filters that call GET /api/notes?search=&category=", "Add pagination buttons using the totalPages from your API"],
 c: `async function handleDelete(id) {
  const previous = notes;
  setNotes(notes.filter((n) => n._id !== id));      // optimistic: update UI first
  try {
    await request(\`/notes/\${id}\`, { method: "DELETE", token });
  } catch (err) {
    setNotes(previous);                              // roll back
    setError("Couldn't delete the note. Please try again.");
  }
}

async function handleUpdate(id, changes) {
  const updated = await request(\`/notes/\${id}\`, { method: "PUT", body: changes, token });
  setNotes(notes.map((n) => (n._id === id ? updated : n)));
}

async function handleCreate(note) {
  const created = await request("/notes", { method: "POST", body: note, token });
  setNotes([created, ...notes]);
}`,
 q: [["What is an optimistic update?", "Updating the UI immediately as if the server request succeeded, then rolling back if it fails. It makes apps feel faster. It suits actions that rarely fail, like likes or deletes."],
     ["After creating an item, should you re-fetch the whole list?", "Usually you insert the item the server returned into local state, which saves a request. Re-fetching is simpler and guarantees consistency. Libraries like TanStack Query handle this with cache invalidation."]],
 x: ["Using the array index instead of MongoDB's _id as the key", "Letting users double-submit while a request is in progress", "No feedback when an action fails"],
 d: "A logged-in user can create, view, edit, delete, search and filter notes entirely from the UI.",
 min: 90
},
"w13-4": {
 m: "A project that isn't live doesn't exist to a recruiter. Today the whole MERN stack goes online.",
 e: "Three pieces go to three free homes. The database is already on MongoDB Atlas. The Express API goes to Render, which runs your Node server and gives it a URL. The React frontend goes to Vercel. Then you connect them with environment variables: Render gets MONGO_URI, JWT_SECRET and CLIENT_URL (your Vercel URL, for CORS), and Vercel gets VITE_API_URL (your Render URL). It's like moving house: pack each room, move it, then reconnect the electricity and water.",
 k: ["Render: New → Web Service → connect the repo → root directory server → build npm install → start npm start", "Add environment variables in the Render dashboard, never in code", "Atlas Network Access: allow Render to connect (0.0.0.0/0 is the simple option for a free-tier learning project)", "Vercel: root directory client, VITE_API_URL = your Render URL, plus the SPA rewrite in vercel.json", "Render's free tier sleeps when idle, so the first request can take 30–60 seconds. Mention it in your README"],
 t: ["Make sure server/package.json has \"start\": \"node index.js\" and the server uses process.env.PORT", "Deploy the server to Render with all its environment variables, and open /api/health in the browser", "Update Atlas Network Access so Render can connect", "Deploy the client to Vercel with VITE_API_URL set, and add vercel.json for routing", "Set CLIENT_URL on Render to your Vercel URL (for CORS) and redeploy", "Test the full flow live: register, log in, CRUD, log out, on both your laptop and your phone"],
 c: `// server/index.js: use the port the host gives you
const PORT = process.env.PORT || 5000;
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.listen(PORT, () => console.log(\`API on port \${PORT}\`));

// Render environment variables
// MONGO_URI   = mongodb+srv://...
// JWT_SECRET  = (long random string)
// CLIENT_URL  = https://mern-notes.vercel.app
// NODE_ENV    = production

// Vercel environment variables
// VITE_API_URL = https://mern-notes-api.onrender.com

// client/vercel.json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`,
 q: [["How did you deploy your MERN application?", "MongoDB on Atlas, the Express API on Render with its secrets as environment variables, and the React app on Vercel with the API URL as a build-time variable. CORS on the API allows the Vercel domain, and both redeploy automatically on push."],
     ["What problems did you face when deploying, and how did you fix them?", "Typical ones: CORS errors (set CLIENT_URL correctly), Atlas blocking the server's IP, a missing environment variable, React Router 404s on refresh (fixed with a rewrite), and the server needing process.env.PORT."]],
 x: ["CORS errors because CLIENT_URL has a trailing slash or the wrong domain", "Forgetting that Vite env variables are baked in at build time, so you must redeploy after changing them", "Hard-coded port 5000 on Render"],
 d: "Your full MERN app works end to end on public URLs, from your phone.",
 min: 90
},
"w13-5": {
 m: "Skills get you the interview. A clear portfolio, GitHub and resume get you noticed in the first place.",
 e: "Recruiters spend about 30 seconds on a first look. In that time they need to see: what you can build (live projects), that you write real code (GitHub), and that you can communicate (README files and a clean resume). Coming from a non-coding background is a strength if you tell it well: you bring domain knowledge, communication skills and proof that you can learn fast.",
 k: ["Portfolio: 3–4 best projects with live links, GitHub links, screenshots and one line on what each shows", "GitHub: a profile README, pinned repos, good READMEs, and steady commits", "Resume: one page, with a projects section above education if you're switching careers, and action verbs plus results", "LinkedIn: headline like \"MERN Stack Developer | React · Node · MongoDB\", with your projects in Featured", "Your career-switch story in 3 sentences: where you came from, why web development, what you've built"],
 t: ["Update your portfolio with the capstone, the shopping cart, the movie app and the weather app", "Write a GitHub profile README (a repo named the same as your username) with your stack and pinned projects", "Make sure every pinned repo has a README with a live link, screenshot, features, tech and setup steps", "Write a one-page resume: summary, skills, 3 projects with bullet points, experience, education", "Update your LinkedIn headline, About section and Featured projects", "Write and rehearse your 60-second \"tell me about yourself\""],
 c: `RESUME PROJECT BULLETS (example)

MERN Notes: Full-stack notes app            live link · GitHub
• Built a full-stack app with React, Express, MongoDB and JWT auth
  that lets users securely create, search and organise notes
• Designed a REST API with 10 endpoints, input validation (zod),
  bcrypt password hashing, rate limiting and centralised error handling
• Deployed on Vercel + Render + MongoDB Atlas with environment-based config

TELL ME ABOUT YOURSELF (shape)
1. Past: "I spent 4 years in [field], where I [relevant strength]."
2. Switch: "I got into web development because [real reason]."
3. Proof: "In the last 3 months I built [capstone], which [what it does]."
4. Now: "I'm looking for a junior MERN role where I can [goal]."`,
 q: [["Tell me about yourself.", "Keep it to about 60 seconds: your background and its transferable strengths, why you moved into development, the projects that prove your skills (with one concrete detail), and what you're looking for next."],
     ["Why should we hire you with no professional coding experience?", "Point to proof: deployed full-stack projects, clean code on GitHub, how fast you learned, and what your previous career brings (communication, domain knowledge, ownership). Show you can learn and deliver."],
     ["What is your favourite project and why?", "Pick the capstone. Explain the problem, the architecture (React, Express, MongoDB, JWT), one hard bug or decision and how you solved it, and what you'd improve."]],
 x: ["A two-page resume full of courses but no projects", "Repos with no README, or tutorial clones with no changes of your own", "Hiding your previous career instead of using it as a strength"],
 d: "Your portfolio, GitHub profile, resume and LinkedIn are updated, and you can give a 60-second introduction.",
 min: 90
},
"w13-6": {
 m: "Interviews are a skill like any other. Practise the questions out loud and they stop being scary.",
 e: "Junior MERN interviews usually have three parts: concept questions (JavaScript, React, Node, MongoDB), a coding exercise (often small array or string problems, or building a small component), and a project walkthrough. Every lesson in this roadmap has interview questions. The Interview question bank below collects all of them, so use it like flashcards. For coding, practise explaining your thinking out loud as you solve problems.",
 k: ["JavaScript must-knows: closures, the event loop, promises and async/await, this, == vs ===, map/filter/reduce", "React must-knows: state vs props, useEffect, keys, lifting state, Context, controlled inputs", "Backend must-knows: REST, status codes, middleware, JWT auth, bcrypt, CORS, SQL vs NoSQL", "Coding: reverse a string, palindromes, FizzBuzz, counting characters, removing duplicates, finding max/min", "Use the STAR method for behavioural questions: Situation, Task, Action, Result"],
 t: ["Go through the interview question bank (filter by phase) and answer each question out loud before revealing the answer", "Solve 5 easy problems: reverse a string, check a palindrome, count vowels, remove duplicates from an array, find the second largest number", "Explain closures and the event loop to an imaginary interviewer, then compare with the model answers", "Rehearse a 3-minute walkthrough of your capstone: problem, architecture, a challenge, what's next", "Do a mock interview with a friend, or record yourself answering 5 questions", "Make a list of 10 companies hiring junior MERN developers and apply to 3 of them this week"],
 c: `// Common junior coding questions

const reverse = (s) => s.split("").reverse().join("");

const isPalindrome = (s) => {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === reverse(clean);
};

const unique = (arr) => [...new Set(arr)];

const countChars = (s) =>
  [...s].reduce((acc, ch) => ({ ...acc, [ch]: (acc[ch] || 0) + 1 }), {});

const secondLargest = (nums) => {
  const sorted = [...new Set(nums)].sort((a, b) => b - a);
  return sorted[1];
};

// a closure: the inner function remembers count
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();
next(); // 1
next(); // 2`,
 q: [["What is a closure?", "A function that remembers the variables from the scope where it was created, even after that outer function has finished. It's used for private state, factories, and callbacks like event handlers."],
     ["Explain the JavaScript event loop.", "JavaScript runs one call stack. Async work (timers, network) is handled by the browser or Node, and its callbacks wait in queues. When the stack is empty, the event loop runs all microtasks (promise callbacks) first, then the next task (like a timer callback)."],
     ["What is the difference between the MERN and MEAN stacks?", "Only the frontend differs: MERN uses React (a UI library) and MEAN uses Angular (a full framework). Both use MongoDB, Express and Node.js."]],
 x: ["Memorising answers without understanding them: interviewers ask follow-ups", "Coding silently. Talk through your approach", "Waiting until you feel \"ready\" to apply. Start now and learn from every interview"],
 d: "You've answered the bank's questions out loud, solved 5 coding problems, rehearsed your project walkthrough, and sent your first applications.",
 min: 90
},
"w13-p": {
 m: "Day 91. You started not knowing what HTML was. Today you ship a full-stack app with login, live on the internet.",
 e: "Your capstone is a full MERN expense tracker: users sign up and log in, add expenses with an amount, category, date and note, edit and delete them, filter by month and category, and see a summary (total this month and spending per category). It reuses everything: React with Context and Router, Express with auth middleware, Mongoose models with validation, and deployment on Vercel, Render and Atlas. Take it as far as your time allows, and keep improving it after day 91.",
 k: ["Models: User, and Expense { user, amount, category (enum), date, note }", "API: auth routes + /api/expenses CRUD + GET /api/expenses/summary?month=2026-10", "The summary uses MongoDB aggregation: $match by user and month, $group by category, $sum the amount", "Frontend: login/register, dashboard with summary cards, expense list with filters, add/edit form", "Polish: loading, error and empty states, a responsive layout, money formatted in ₹"],
 t: ["Plan it: write the user stories (\"As a user I can...\"), the API endpoints and the React pages", "Backend: Expense model, CRUD routes scoped to req.user, and the summary endpoint with aggregation", "Frontend: reuse your auth code, then build the dashboard, the expense list with filters, and the add/edit form", "Show the per-category summary as simple bars (divs with widths), or try a chart library like Recharts", "Deploy all three parts and test the full flow on your phone", "Write a strong README: problem, features, screenshots or a GIF, architecture, tech stack, setup, and what you'd add next", "Post on LinkedIn: \"I went from zero to a full-stack MERN developer in 90 days. Here's what I built\" with the live link", "Celebrate 🎉, then pick your next step: TypeScript, Next.js, testing, or the AI Engineer track"],
 c: `// server/controllers/expenseController.js: monthly summary by category
import mongoose from "mongoose";

export async function summary(req, res) {
  const [year, month] = req.query.month.split("-").map(Number);   // "2026-10"
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const byCategory = await Expense.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(req.user._id), date: { $gte: start, $lt: end } } },
    { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
    { $sort: { total: -1 } },
  ]);

  const total = byCategory.reduce((sum, c) => sum + c.total, 0);
  res.json({ month: req.query.month, total, byCategory });
}

// client: a simple bar per category
{data.byCategory.map((c) => (
  <div key={c._id}>
    <span>{c._id}: {formatPrice(c.total)}</span>
    <div className="h-2 rounded bg-indigo-500" style={{ width: \`\${(c.total / data.total) * 100}%\` }} />
  </div>
))}`,
 q: [["What is the MongoDB aggregation pipeline?", "A sequence of stages ($match, $group, $sort, $project, $lookup and so on) that transform documents step by step on the database server. It's used for reports, summaries and analytics without loading every document into the application."],
     ["Walk me through the architecture of your capstone.", "A React SPA on Vercel with an AuthContext and React Router, calling a REST API on Render built with Express, with JWT auth middleware, zod validation and central error handling, backed by MongoDB Atlas through Mongoose models. The summary uses an aggregation pipeline, and secrets live in environment variables."],
     ["What would you improve with more time?", "Tests (Jest, Supertest, React Testing Library), TypeScript, refresh tokens with httpOnly cookies, charts and CSV export, recurring expenses, budgets with alerts, and CI that runs tests before every deploy."]],
 x: ["Trying to build every feature at once. Ship the core first (auth + CRUD), then add the summary, then polish", "No README or live link, which makes the project invisible to recruiters", "Stopping after day 91. Keep building, keep applying"],
 d: "Your expense tracker is live with login, full CRUD, filters and a monthly summary, it has a great README, and you've shared it publicly. You're a MERN developer.",
 min: 300
}
};
