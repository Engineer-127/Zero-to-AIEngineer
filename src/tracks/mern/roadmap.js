/* Zero to MERN Developer: 13 weeks, 91 days. Written for people who have never coded. */
export const PHASES=[
 {n:1,name:"Web Foundations",c:"#D4760A",w:[1,3],goal:"Understand how websites work, build and style real pages with HTML and CSS, and put them online with Git and GitHub."},
 {n:2,name:"JavaScript",c:"#B38A00",w:[4,6],goal:"Learn the language of the web: make pages interactive and pull live data from the internet."},
 {n:3,name:"React (Frontend)",c:"#0A8CB0",w:[7,9],goal:"Build fast, modern user interfaces from reusable components, the way real companies do."},
 {n:4,name:"Backend: Node, Express & MongoDB",c:"#5C9A12",w:[10,12],goal:"Build your own server and API, save data in a database, and add secure login."},
 {n:5,name:"Full-Stack MERN & Job Ready",c:"#7648E0",w:[13,13],goal:"Connect everything into one live app, polish your portfolio and get ready for interviews."}
];

export const R={
 mdnWeb:["MDN: How the web works","https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works"],
 mdnHtml:["MDN: HTML basics","https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"],
 mdnCss:["MDN: CSS styling basics","https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"],
 mdnLayout:["MDN: CSS layout","https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"],
 mdnJs:["MDN: JavaScript first steps","https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting"],
 mdnAsync:["MDN: Asynchronous JavaScript","https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS"],
 mdnHttp:["MDN: An overview of HTTP","https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"],
 fcc:["freeCodeCamp: Responsive Web Design (free)","https://www.freecodecamp.org/learn/"],
 odin:["The Odin Project: Foundations (free)","https://www.theodinproject.com/paths/foundations/courses/foundations"],
 odinFs:["The Odin Project: Full Stack JavaScript","https://www.theodinproject.com/paths/full-stack-javascript"],
 jsinfo:["javascript.info: The Modern JavaScript Tutorial","https://javascript.info/"],
 eloquent:["Eloquent JavaScript (free book)","https://eloquentjavascript.net/"],
 flexfroggy:["Flexbox Froggy (game)","https://flexboxfroggy.com/"],
 gridgarden:["Grid Garden (game)","https://cssgridgarden.com/"],
 kevin:["Kevin Powell: CSS (YouTube)","https://www.youtube.com/@KevinPowell"],
 traversy:["Traversy Media (YouTube)","https://www.youtube.com/@TraversyMedia"],
 netninja:["Net Ninja (YouTube)","https://www.youtube.com/@NetNinja"],
 chaiCode:["Chai aur Code: Hitesh Choudhary (Hindi, YouTube)","https://www.youtube.com/@chaiaurcode"],
 codewithharry:["CodeWithHarry (Hindi, YouTube)","https://www.youtube.com/@CodeWithHarry"],
 gitBook:["Pro Git book (free)","https://git-scm.com/book/en/v2"],
 ghSkills:["GitHub Skills: Introduction to GitHub","https://skills.github.com/"],
 ghPages:["GitHub Pages quickstart","https://docs.github.com/en/pages/quickstart"],
 terminal:["The Odin Project: Command line basics","https://www.theodinproject.com/lessons/foundations-command-line-basics"],
 devtools:["Chrome DevTools docs","https://developer.chrome.com/docs/devtools"],
 vscode:["VS Code: Getting started","https://code.visualstudio.com/docs/getstarted/getting-started"],
 react:["react.dev: Learn React (official)","https://react.dev/learn"],
 reactThink:["react.dev: Thinking in React","https://react.dev/learn/thinking-in-react"],
 vite:["Vite: Getting started","https://vite.dev/guide/"],
 router:["React Router docs","https://reactrouter.com/"],
 tailwind:["Tailwind CSS docs","https://tailwindcss.com/docs"],
 vercel:["Vercel: Deploy a Vite app","https://vercel.com/docs/frameworks/frontend/vite"],
 node:["Node.js: Learn","https://nodejs.org/en/learn"],
 npm:["npm docs: About packages","https://docs.npmjs.com/about-packages-and-modules"],
 express:["Express: Getting started","https://expressjs.com/en/starter/installing.html"],
 thunder:["Thunder Client (VS Code API tester)","https://www.thunderclient.com/"],
 postman:["Postman Learning Center","https://learning.postman.com/"],
 mongoU:["MongoDB University (free courses)","https://learn.mongodb.com/"],
 atlas:["MongoDB Atlas: Get started (free tier)","https://www.mongodb.com/docs/atlas/getting-started/"],
 mongoose:["Mongoose docs","https://mongoosejs.com/docs/"],
 jwt:["jwt.io: Introduction to JSON Web Tokens","https://jwt.io/introduction"],
 owasp:["OWASP Top 10 (web security basics)","https://owasp.org/www-project-top-ten/"],
 render:["Render: Deploy a Node/Express app","https://render.com/docs/deploy-node-express-app"],
 fullstackopen:["Full Stack Open (University of Helsinki, free)","https://fullstackopen.com/en/"],
 interview:["Front-end interview handbook","https://www.frontendinterviewhandbook.com/"],
 leetcode:["LeetCode: JavaScript 30 days","https://leetcode.com/studyplan/30-days-of-javascript/"]
};

export const WEEKS=[
/* Phase 1: Web Foundations */
{t:"How the web works and your first HTML page",h:8,goal:"Understand what a website really is, set up your computer, and write your first web pages in HTML.",
 tasks:["How the internet and websites work (no code today)","Set up your computer: Chrome, VS Code and a projects folder","Your first HTML page: tags, headings and paragraphs","Links, images and lists","Tables, forms and input boxes","Semantic HTML and accessibility: pages everyone can use"],
 proj:"Your \"About Me\" page in pure HTML",res:["mdnWeb","mdnHtml","vscode","fcc","codewithharry"],skills:["How the web works","HTML","VS Code"]},
{t:"Styling with CSS",h:9,goal:"Make pages look good: colours, fonts, spacing and layouts that work on phones and laptops.",
 tasks:["CSS basics: selectors, colours and fonts","The box model: margin, border, padding","Flexbox: line things up in a row or column","CSS Grid: two-dimensional layouts","Responsive design: looking good on every screen size","Polish: CSS variables, hover effects and transitions"],
 proj:"A responsive personal portfolio landing page",res:["mdnCss","mdnLayout","flexfroggy","gridgarden","kevin"],skills:["CSS","Flexbox","Grid","Responsive design"]},
{t:"Developer tools: terminal, Git, GitHub and going live",h:8,goal:"Use the tools every developer uses daily, and publish your site on the internet for free.",
 tasks:["The terminal: talking to your computer with text","Git: save points for your code","GitHub: back up and share your code online","Put your website live with GitHub Pages","Chrome DevTools: look inside any website","Thinking like a programmer: break problems down, and use AI as a tutor"],
 proj:"Your portfolio live on the internet, with a proper Git history",res:["terminal","gitBook","ghSkills","ghPages","devtools","odin"],skills:["Terminal","Git","GitHub","GitHub Pages","DevTools"]},
/* Phase 2: JavaScript */
{t:"JavaScript fundamentals",h:9,goal:"Learn the building blocks of programming: storing data, making decisions, repeating work and writing reusable functions.",
 tasks:["What JavaScript is, and your first console.log","Variables and data types: let, const, text, numbers, true/false","Operators and decisions: if, else and comparisons","Loops: let the computer do the repeating","Functions: reusable recipes","Arrays: keeping lists of things"],
 proj:"Mini console programs: grade calculator and a number-guessing game",res:["mdnJs","jsinfo","eloquent","chaiCode"],skills:["Variables","Conditions","Loops","Functions","Arrays"]},
{t:"Objects and the DOM: making pages interactive",h:10,goal:"Use JavaScript to change a web page live, react to clicks and typing, and remember data between visits.",
 tasks:["Objects: grouping related information","Array power tools: map, filter, find and reduce","The DOM: changing the page with JavaScript","Events: reacting to clicks and typing","Forms and saving data with localStorage","Debugging: reading errors without panic"],
 proj:"A to-do list app that remembers your tasks",res:["jsinfo","mdnJs","odin","netninja"],skills:["Objects","Array methods","DOM","Events","localStorage"]},
{t:"Modern JavaScript and talking to the internet",h:10,goal:"Write modern JavaScript and fetch live data from public APIs, the skill every React and Node app is built on.",
 tasks:["Modern JS syntax: arrow functions, template strings, destructuring, spread","Modules: splitting code into files with import and export","Asynchronous JavaScript: callbacks and promises","async/await and fetch(): getting data from the internet","JSON and public APIs","Error handling: try/catch and loading states"],
 proj:"A weather app that shows live weather for any city",res:["mdnAsync","jsinfo","traversy","chaiCode"],skills:["ES6+","Modules","Promises","async/await","fetch","JSON"]},
/* Phase 3: React */
{t:"React basics",h:10,goal:"Understand why React exists and build your first app out of components.",
 tasks:["Why React? Create your first project with Vite","JSX: HTML-like code inside JavaScript","Components and props: Lego blocks for UIs","State with useState: making components remember","Handling events and showing things conditionally","Rendering lists with map() and keys"],
 proj:"A flashcard study app built with React",res:["react","vite","chaiCode","netninja"],skills:["React","Vite","JSX","Components","Props","useState"]},
{t:"React in depth",h:10,goal:"Handle forms, load data from APIs, build multi-page apps and style them quickly.",
 tasks:["Forms in React: controlled inputs","useEffect: loading data when a component appears","Lifting state up and planning components","Multiple pages with React Router","Styling fast with Tailwind CSS","Custom hooks: reuse your logic"],
 proj:"A movie search app with search, details pages and favourites",res:["react","reactThink","router","tailwind"],skills:["Controlled forms","useEffect","React Router","Tailwind CSS","Custom hooks"]},
{t:"React for real-world apps",h:9,goal:"Manage app-wide data, handle real-world states and publish your React app.",
 tasks:["Global state with the Context API","useReducer: organised state for complex apps","Loading, error and empty states: good user experience","Project structure and clean code: folders, naming, ESLint, Prettier","Performance basics: re-renders, useMemo and React DevTools","Deploy your React app on Vercel"],
 proj:"A shopping cart app with Context, live on Vercel",res:["react","vercel","fullstackopen","traversy"],skills:["Context API","useReducer","UX states","Vercel"]},
/* Phase 4: Backend */
{t:"Node.js and Express: your first server",h:10,goal:"Understand what a backend does and build your own API with Node and Express.",
 tasks:["What is a backend? Meet Node.js","npm and package.json: using other people's code","HTTP basics: requests, methods and status codes","Your first Express server and routes","Middleware and reading JSON from requests","REST API design and testing with Thunder Client or Postman"],
 proj:"A notes REST API (create, read, update, delete)",res:["node","npm","express","mdnHttp","thunder"],skills:["Node.js","npm","Express","HTTP","REST APIs"]},
{t:"Databases with MongoDB",h:10,goal:"Save data permanently in a real cloud database and connect it to your API.",
 tasks:["What is a database? SQL vs NoSQL in plain words","Set up MongoDB Atlas: a free database in the cloud","CRUD in MongoDB: insert, find, update and delete","Mongoose: schemas and models","Connect Express to MongoDB: a full CRUD API","Validation and relationships between data"],
 proj:"Your notes API, now saving to MongoDB",res:["mongoU","atlas","mongoose","fullstackopen"],skills:["MongoDB","Atlas","Mongoose","Schemas","CRUD"]},
{t:"Authentication and security",h:10,goal:"Let users sign up and log in safely, and protect your API from common attacks.",
 tasks:["Environment variables: keeping secrets out of your code","Hashing passwords with bcrypt","Login with JSON Web Tokens (JWT)","Protecting routes with auth middleware","Central error handling and input validation","Security basics: CORS, Helmet and rate limiting"],
 proj:"A secure auth API: register, login and a protected \"my profile\" route",res:["jwt","owasp","express","mongoose"],skills:["bcrypt","JWT","Auth middleware","CORS","Security"]},
/* Phase 5: Full-stack MERN & job ready */
{t:"Full-stack MERN: connect, deploy, get hired",h:12,goal:"Join React to your API, put the whole app online and get ready for job applications.",
 tasks:["Connect React to your Express API","Sign up and login screens in React","Full CRUD from the user interface","Deploy: API on Render, database on Atlas, frontend on Vercel","Portfolio, GitHub profile, resume and LinkedIn","Interview prep: MERN questions and JavaScript coding practice"],
 proj:"Capstone: a full MERN expense tracker with login, live on the internet",res:["fullstackopen","render","vercel","interview","leetcode","odinFs"],skills:["Full-stack MERN","Deployment","Portfolio","Interviews"]}
];

export const LIB=[
 {h:"YouTube channels",items:[["Chai aur Code (Hitesh Choudhary)","https://www.youtube.com/@chaiaurcode","JavaScript, React, backend (Hindi)"],["CodeWithHarry","https://www.youtube.com/@CodeWithHarry","web dev from zero (Hindi)"],["Traversy Media","https://www.youtube.com/@TraversyMedia","crash courses on everything web"],["Net Ninja","https://www.youtube.com/@NetNinja","short, clear playlists: React, Node, MongoDB"],["Kevin Powell","https://www.youtube.com/@KevinPowell","the best CSS teacher"],["Fireship","https://www.youtube.com/@Fireship","100-second overviews of tools"],["Web Dev Simplified","https://www.youtube.com/@WebDevSimplified","JavaScript and React concepts"]]},
 {h:"Free courses",items:[["freeCodeCamp","https://www.freecodecamp.org/learn/","Phases 1–2, with certificates"],["The Odin Project","https://www.theodinproject.com/","the whole path, project-based"],["react.dev Learn","https://react.dev/learn","Phase 3, official"],["Full Stack Open","https://fullstackopen.com/en/","Phases 3–5, University of Helsinki"],["MongoDB University","https://learn.mongodb.com/","Phase 4, free badges"],["GitHub Skills","https://skills.github.com/","Git and GitHub, hands-on"],["Scrimba: Learn React (free tier)","https://scrimba.com/learn-react-c0e","interactive React"]]},
 {h:"Books & references",items:[["MDN Web Docs","https://developer.mozilla.org/","the web's official dictionary"],["javascript.info","https://javascript.info/","modern JavaScript, start to finish"],["Eloquent JavaScript","https://eloquentjavascript.net/","free book, deeper JS"],["You Don't Know JS Yet","https://github.com/getify/You-Dont-Know-JS","how JS really works"],["Express docs","https://expressjs.com/","backend reference"],["Mongoose docs","https://mongoosejs.com/docs/","database reference"],["roadmap.sh: Full-stack","https://roadmap.sh/full-stack","see the bigger picture"]]}
];
