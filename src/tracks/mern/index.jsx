import { PHASES, R, WEEKS, LIB } from "./roadmap.js";
import p1 from "./lessons/p1.js";
import p2 from "./lessons/p2.js";
import p3 from "./lessons/p3.js";
import p4 from "./lessons/p4.js";
import p5 from "./lessons/p5.js";

const LAYERS = [
  { letter: "R", name: "React", role: "The dining room", desc: "Everything the user sees and clicks: pages, buttons, forms.", where: "Runs in the browser", phase: "Phase 3", c: "#0A8CB0" },
  { letter: "E", name: "Express", role: "The waiter", desc: "Takes orders (requests) from React, checks them, brings back data.", where: "Runs on the server", phase: "Phase 4", c: "#5C9A12" },
  { letter: "N", name: "Node.js", role: "The kitchen", desc: "The engine that runs your JavaScript on the server.", where: "Runs on the server", phase: "Phase 4", c: "#5C9A12" },
  { letter: "M", name: "MongoDB", role: "The pantry", desc: "Stores users, notes and orders safely, even after restarts.", where: "Runs in the cloud", phase: "Phase 4", c: "#7648E0" },
];

function MernMap() {
  return (
    <div className="mern-map">
      <div className="flow" role="list" aria-label="How a request travels through a MERN app">
        {LAYERS.map((l, i) => (
          <div className="flow-step" role="listitem" key={l.letter} style={{ "--pc": l.c }}>
            <div className="flow-card">
              <span className="flow-letter" aria-hidden="true">{l.letter}</span>
              <div className="flow-text">
                <b>{l.name}</b>
                <span className="flow-role">{l.role}</span>
                <span>{l.desc}</span>
                <em>{l.where} · {l.phase}</em>
              </div>
            </div>
            {i < LAYERS.length - 1 && <span className="flow-arrow" aria-hidden="true">⇄</span>}
          </div>
        ))}
      </div>
      <div className="foundation">
        <b>Foundation for all of it</b>
        <span>HTML · CSS · JavaScript · Git &amp; GitHub · Phases 1–2. One language, JavaScript, runs every layer.</span>
      </div>
    </div>
  );
}

const GLOSSARY = [
  ["Frontend", "The part of an app you see and click, running in your browser."],
  ["Backend", "The hidden part running on a server: rules, logins and data."],
  ["Server", "A computer that's always on, waiting to answer requests."],
  ["Browser", "The app you use to visit websites: Chrome, Safari, Edge."],
  ["HTML", "Labels content on a page: this is a heading, this is a button."],
  ["CSS", "Styles the page: colours, fonts, spacing and layout."],
  ["JavaScript", "The programming language that makes pages interactive. MERN uses it everywhere."],
  ["Code editor", "Software for writing code. We use VS Code."],
  ["Terminal", "A text window where you type commands to your computer."],
  ["Git", "Save points for your code, so you can always go back."],
  ["GitHub", "A website that stores your Git projects online, and works as your developer CV."],
  ["Deploy", "Putting your app on the internet so anyone can use it."],
  ["Variable", "A labelled box that holds a value."],
  ["Function", "A named recipe of steps you can run again and again."],
  ["Array", "An ordered list of things: [\"tea\", \"coffee\"]."],
  ["Object", "A group of labelled details: { name: \"Asha\", age: 25 }."],
  ["DOM", "The browser's live map of a page, which JavaScript can change."],
  ["API", "A waiter between programs: you ask for data, it brings back a response."],
  ["JSON", "A text format for sending data, which looks like JavaScript objects."],
  ["HTTP request", "A message from the browser to a server: GET, POST, PUT or DELETE."],
  ["Component", "A reusable piece of a React screen, like a Lego block."],
  ["State", "Data a component remembers. When it changes, the screen updates."],
  ["Props", "Information passed into a component, like settings."],
  ["npm", "An app store for code packages."],
  ["Database", "An organised, permanent store of data."],
  ["CRUD", "Create, Read, Update, Delete: the four things apps do with data."],
  ["Authentication", "Checking who you are (logging in)."],
  ["Token (JWT)", "A signed digital wristband that proves you're logged in."],
  ["Environment variable", "A secret setting, like a password, kept outside your code."],
  ["Bug", "Code that doesn't do what you expected. Every developer writes them daily."],
];

export default {
  id: "mern",
  label: "MERN Developer",
  title: "Zero to MERN Developer",
  storageKey: "zero-to-mern-developer-v1",
  lede: "A 90-day path from \"what is HTML?\" to a full-stack app with login, live on the internet. Made for people with no coding background: every lesson explains things in plain words with everyday examples, then gives you something small to build. You'll learn HTML, CSS and JavaScript, then React, Node, Express and MongoDB, and finish with a deployed capstone, a portfolio and interview prep.",
  pace: [
    ["Steady", "90 days", "about 1.5 hours a day, one lesson a day"],
    ["Fast track", "60 days", "about 2.5 hours a day, three lessons every two days"],
  ],
  mapTitle: "How a MERN app fits together",
  mapIntro: "Think of a restaurant. Each letter of MERN is one part of it, and a request travels from the dining room to the pantry and back. You'll build each part in order.",
  Map: MernMap,
  glossary: GLOSSARY,
  bankHint: 'Every interview question from every lesson, with model answers. Filter by phase or search a topic like "useEffect", "JWT" or "CORS".',
  doneMessage: "Keep building, keep applying, and try the AI Engineer track next.",
  rules: [
    ["Type the code yourself.", "Copy-pasting feels fast but teaches nothing. Typing builds the muscle memory."],
    ["Being confused is part of learning.", "Everyone feels lost in weeks 4 and 7. It passes. Re-read the lesson, then try again tomorrow."],
    ["Build every project, even badly.", "A finished, ugly project teaches more than a perfect one you never finish."],
    ["Push to GitHub every day.", "Your green squares are proof of consistency, and recruiters look at them."],
    ["Use AI as a tutor, not a ghostwriter.", "Ask it to explain errors and quiz you. Don't let it write your projects."],
    ["Ask for help after 20 minutes.", "Stuck longer than that? Post your question with what you tried and the error message."],
  ],
  PHASES,
  WEEKS,
  R,
  LIB,
  LESSONS: { ...p1, ...p2, ...p3, ...p4, ...p5 },
};
