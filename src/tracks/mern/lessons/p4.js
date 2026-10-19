/* MERN Phase 4: Backend with Node, Express and MongoDB (Weeks 10-12)
   Code samples use normal template literals: backticks and ${ inside code are escaped. */
export default {

/* ---------- Week 10: Node.js and Express ---------- */
"w10-1": {
 m: "Until now you've built the dining room. This week you build the kitchen.",
 e: "Picture a restaurant. The frontend (React) is the dining room: menus, tables, what customers see. The backend is the kitchen: customers never see it, but it does the real work, like checking orders, cooking, and keeping the pantry stocked (the database). Node.js lets you write that kitchen in the JavaScript you already know. A backend is just a program that waits for requests and sends back responses.",
 k: ["Node.js runs JavaScript outside the browser, on your computer or a server", "The backend holds secrets, enforces rules, talks to the database and serves data to the frontend", "Never trust the frontend: anyone can change browser code, so prices and permissions are checked on the backend", "In Node there's no window or document. Instead you get access to files, the network and the operating system", "Run a file with: node app.js"],
 t: ["Check Node is installed: node -v", "Create a folder backend-practice and a file hello.js with console.log(\"Hello from Node!\"), then run node hello.js", "Use Node's built-in os module to print your computer's platform and free memory", "Use the fs module to write a text file and then read it back", "Write down 3 things a food-delivery app's backend must do that the frontend should never be trusted with", "Draw the restaurant analogy with React, Express, Node and MongoDB labelled"],
 c: `// hello.js
console.log("Hello from Node!");

import os from "node:os";
import fs from "node:fs";

console.log("Platform:", os.platform());
console.log("Free memory (MB):", Math.round(os.freemem() / 1024 / 1024));

fs.writeFileSync("note.txt", "Written by Node.js");
console.log(fs.readFileSync("note.txt", "utf8"));

// run with: node hello.js
// (using import needs "type": "module" in package.json, which you'll add tomorrow)`,
 q: [["What is Node.js?", "A JavaScript runtime built on Chrome's V8 engine that runs JavaScript outside the browser. It's used to build servers, APIs, command-line tools and more, and it's good at handling many simultaneous connections."],
     ["Why is Node.js good for building APIs?", "Its non-blocking, event-driven model handles many concurrent requests efficiently, it uses JavaScript on both frontend and backend, and npm has a huge ecosystem of packages."],
     ["Why shouldn't business rules only live in the frontend?", "Frontend code runs on the user's device and can be read and modified. Prices, permissions and validation must be enforced on the server, which the user can't tamper with."]],
 x: ["Trying to use document or window in Node", "Thinking the backend is a different language you have to learn from scratch. It's the same JavaScript"],
 d: "You've run JavaScript files with Node, and can explain what a backend does using the restaurant analogy.",
 min: 45
},
"w10-2": {
 m: "Nobody builds everything from scratch. npm gives you over two million free building blocks.",
 e: "npm (Node Package Manager) is an app store for code. Need to send emails, handle dates or build a server? Someone has published a package for it. package.json is your project's ID card and shopping list: its name, the packages it depends on, and handy scripts. node_modules is the folder where packages get installed. It's huge, and you never commit it, because anyone can rebuild it with npm install.",
 k: ["npm init -y creates package.json", "npm install express adds a dependency. npm install -D nodemon adds a dev-only tool", "\"type\": \"module\" in package.json lets you use import/export", "scripts: \"dev\": \"node --watch server.js\" lets you run npm run dev, and Node restarts when files change", "Add node_modules to .gitignore. package-lock.json records exact versions, so commit it"],
 t: ["Create a folder notes-api, run npm init -y and open package.json", "Add \"type\": \"module\" to package.json", "Install express: npm install express. Look in package.json and node_modules", "Add a \"dev\" script using node --watch and an index.js that logs something", "Create a .gitignore containing node_modules and .env", "Delete node_modules, run npm install, and see everything come back"],
 c: `# terminal
mkdir notes-api && cd notes-api
npm init -y
npm install express

// package.json
{
  "name": "notes-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch index.js",
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  }
}

# .gitignore
node_modules
.env`,
 q: [["What is package.json?", "The manifest for a Node project: its name, version, scripts, and the dependencies and devDependencies it needs. npm install reads it to install everything."],
     ["What is the difference between dependencies and devDependencies?", "dependencies are needed to run the app in production (like express). devDependencies are only needed while developing (like testing tools or linters)."],
     ["Why commit package-lock.json but not node_modules?", "package-lock.json records the exact versions installed so everyone gets the same setup. node_modules is huge and can be recreated from the lock file with npm install."]],
 x: ["Committing node_modules to GitHub", "Installing packages globally (-g) that should belong to the project", "Running npm install in the wrong folder and creating a stray package.json"],
 d: "You have a notes-api project with Express installed, a dev script, and a .gitignore.",
 min: 45
},
"w10-3": {
 m: "HTTP is the language browsers and servers speak. Learn it once and every API makes sense.",
 e: "Every time the frontend talks to the backend, it sends an HTTP request: a letter with a method (what you want to do), a URL (what it's about), headers (extra info, like who you are), and sometimes a body (the data). The server replies with a response: a status code (how it went), headers, and a body (usually JSON). The methods map to everyday actions: GET is \"show me\", POST is \"create this\", PUT/PATCH is \"update this\", DELETE is \"remove this\".",
 k: ["GET (read), POST (create), PUT (replace), PATCH (update part of), DELETE (remove)", "2xx = success: 200 OK, 201 Created, 204 No Content", "4xx = the client's mistake: 400 Bad Request, 401 Unauthorized (not logged in), 403 Forbidden (not allowed), 404 Not Found", "5xx = the server's mistake: 500 Internal Server Error", "Headers: Content-Type: application/json says the body is JSON. Authorization carries login tokens"],
 t: ["Open DevTools → Network on any website, click a request, and find the method, status code and headers", "Find a POST request on a site when you submit something (like a search or a like)", "Make a cheat sheet of the 5 methods and 10 status codes in your own words", "For a food-delivery app, write which method and URL you'd use to: list restaurants, see one restaurant, place an order, cancel an order", "Use curl in the terminal: curl https://jsonplaceholder.typicode.com/posts/1"],
 c: `REQUEST
POST /api/orders HTTP/1.1
Host: api.foodapp.com
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...

{ "restaurantId": 42, "items": [{ "dishId": 7, "qty": 2 }] }

RESPONSE
HTTP/1.1 201 Created
Content-Type: application/json

{ "orderId": 9001, "status": "preparing", "eta": "30 min" }`,
 q: [["What are the main HTTP methods and what are they used for?", "GET reads data, POST creates a resource, PUT replaces it, PATCH partially updates it, and DELETE removes it."],
     ["What's the difference between 401 and 403?", "401 Unauthorized means you're not authenticated: no valid login. 403 Forbidden means you're logged in but don't have permission for this action."],
     ["What does it mean that HTTP is stateless?", "Each request is independent and the server doesn't remember previous requests. State like login is carried in each request, for example with a token or cookie."]],
 x: ["Using GET to change data (GET should be safe to repeat)", "Returning 200 with an error message inside, instead of a proper 4xx or 5xx status"],
 d: "You can read any request in the Network tab and know what its method and status code mean.",
 min: 45
},
"w10-4": {
 m: "In about ten lines of code you'll have a real web server running on your own computer.",
 e: "Express is a small framework that makes building servers in Node easy. You create an app, then define routes: \"when someone sends a GET request to /api/notes, run this function\". Each route function gets two objects: req (the request, what the customer ordered) and res (the response, what you send back). app.listen starts the server on a port, like opening a specific counter at the restaurant.",
 k: ["const app = express(); app.listen(5000) starts a server at http://localhost:5000", "app.get(\"/path\", (req, res) => { ... }) handles GET requests", "res.json(data) sends JSON. res.status(404).json(...) sets the status code", "Route parameters: app.get(\"/api/notes/:id\") → req.params.id", "Query strings: /api/notes?search=react → req.query.search"],
 t: ["Create index.js in notes-api with an Express server on port 5000", "Add GET / that returns { message: \"API is running\" }", "Add GET /api/notes that returns an array of 3 hard-coded notes", "Add GET /api/notes/:id that returns one note, or 404 if it doesn't exist", "Add a ?search= query that filters notes by title", "Visit each URL in your browser and check it works"],
 c: `import express from "express";

const app = express();
const PORT = 5000;

let notes = [
  { id: 1, title: "Learn Express", body: "Routes, req and res" },
  { id: 2, title: "Learn MongoDB", body: "Next week" },
  { id: 3, title: "Build the capstone", body: "Week 13" },
];

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.get("/api/notes", (req, res) => {
  const { search } = req.query;
  const result = search
    ? notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
    : notes;
  res.json(result);
});

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

app.listen(PORT, () => console.log(\`Server running on http://localhost:\${PORT}\`));`,
 q: [["What is Express.js?", "A minimal, flexible web framework for Node.js that provides routing, middleware and helpers for handling HTTP requests and responses. It's the E in MERN."],
     ["What are req.params, req.query and req.body?", "req.params holds route parameters like :id in /notes/:id. req.query holds the query string after ?, like ?search=react. req.body holds data sent in the request body, usually JSON from POST or PUT."],
     ["What is a port?", "A number that identifies a specific program on a computer, so several servers can run at once. localhost:5000 means \"this computer, the program listening on port 5000\"."]],
 x: ["Forgetting that req.params.id is a string, so comparing it to a number fails", "Sending two responses for one request (always return after res.json in an if)", "The \"port already in use\" error: another server is running, so stop it with Ctrl+C"],
 d: "Your server returns all notes, one note by id (or 404), and filtered notes by search.",
 min: 60
},
"w10-5": {
 m: "Middleware is the assembly line every request passes through. It's where logging, parsing and security happen.",
 e: "Middleware functions run between the request arriving and your route sending a response, like security checks at an airport: check the ticket, scan the bag, then board. Each one can look at the request, change it, stop it, or call next() to pass it along. express.json() is a built-in middleware that reads JSON from the request body and puts it in req.body, which you need to create data with POST.",
 k: ["app.use(express.json()) is needed to read JSON bodies in req.body", "A middleware is (req, res, next) => { ...; next(); }", "Order matters: middleware runs in the order you app.use() it", "Middleware can be global (app.use) or for a single route (app.get(\"/x\", check, handler))", "Popular middleware: cors, helmet, morgan (logging)"],
 t: ["Add app.use(express.json()) at the top of your server", "Write a logger middleware that prints the method, URL and time of each request", "Add POST /api/notes that creates a note from req.body and returns 201", "Validate: if title is missing, return 400 with an error message", "Add PUT /api/notes/:id to update a note and DELETE /api/notes/:id to remove it", "Write a middleware that only lets requests with ?key=secret through, and use it on DELETE"],
 c: `app.use(express.json());

// custom logger middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} \${req.method} \${req.url}\`);
  next(); // pass to the next middleware or route
});

app.post("/api/notes", (req, res) => {
  const { title, body } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const note = { id: Date.now(), title, body: body || "" };
  notes.push(note);
  res.status(201).json(note);
});

app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).json({ error: "Note not found" });
  Object.assign(note, req.body);
  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  notes = notes.filter((n) => n.id !== Number(req.params.id));
  res.status(204).end();
});`,
 q: [["What is middleware in Express?", "A function with access to req, res and next that runs during the request-response cycle. It can modify the request, end the response, or call next() to pass control on. It's used for parsing, logging, auth and error handling."],
     ["Why is req.body undefined in my POST route?", "The JSON body-parsing middleware isn't registered. Add app.use(express.json()) before the routes, and make sure the client sends Content-Type: application/json."],
     ["What happens if middleware doesn't call next() or send a response?", "The request hangs until it times out, because nothing finishes the cycle."]],
 x: ["Forgetting express.json(), so req.body is undefined", "Registering middleware after the routes that need it", "Forgetting next(), so requests hang forever"],
 d: "Your API logs every request and supports creating, updating and deleting notes with validation.",
 min: 60
},
"w10-6": {
 m: "A well-designed API is predictable. Anyone can guess how it works without reading the docs.",
 e: "REST is a set of conventions for designing APIs around \"resources\" (things like notes, users, orders). URLs are nouns (/api/notes), and the HTTP method is the verb. The browser can only easily send GET requests, so to test POST, PUT and DELETE you use an API client like Thunder Client (inside VS Code) or Postman: a tool for sending any kind of request and seeing the response.",
 k: ["Resources are plural nouns: /api/notes, /api/notes/:id", "GET /notes (list), GET /notes/:id (one), POST /notes (create), PUT/PATCH /notes/:id (update), DELETE /notes/:id (delete)", "Avoid verbs in URLs: not /getNotes or /deleteNote", "Nest for relationships: /api/users/:id/notes", "Return consistent JSON shapes and correct status codes"],
 t: ["Install the Thunder Client extension in VS Code (or download Postman)", "Send a GET to http://localhost:5000/api/notes", "Send a POST with a JSON body { \"title\": \"Test\" } and check you get 201", "Send a POST with no title and check you get 400", "Test PUT, DELETE and a GET for an id that doesn't exist (404)", "Save all requests in a collection called Notes API", "Write a table in your README listing every endpoint, its method and what it does"],
 c: `Notes API

| Method | Endpoint          | Description        | Success |
|--------|-------------------|--------------------|---------|
| GET    | /api/notes        | List all notes     | 200     |
| GET    | /api/notes/:id    | Get one note       | 200     |
| POST   | /api/notes        | Create a note      | 201     |
| PUT    | /api/notes/:id    | Update a note      | 200     |
| DELETE | /api/notes/:id    | Delete a note      | 204     |

Errors: 400 (missing title), 404 (note not found)`,
 q: [["What is REST?", "Representational State Transfer: an architectural style for APIs where resources are identified by URLs, manipulated with standard HTTP methods, requests are stateless, and representations are usually JSON."],
     ["What's the difference between PUT and PATCH?", "PUT replaces the whole resource with the data sent. PATCH updates only the fields sent. In practice many APIs use PUT for partial updates, but the distinction is a common interview question."],
     ["How would you design the URLs for a blog API with posts and comments?", "GET/POST /api/posts, GET/PUT/DELETE /api/posts/:id, and GET/POST /api/posts/:id/comments for the comments on a post."]],
 x: ["Verbs in URLs like /api/createNote", "Returning 200 for everything", "Inconsistent response shapes between endpoints"],
 d: "Every endpoint is tested in Thunder Client or Postman, including error cases, and documented in your README.",
 min: 60
},
"w10-p": {
 m: "Your first backend: a working REST API you designed, built and tested yourself.",
 e: "Today you clean up and finish the Notes API: full CRUD, validation, consistent errors, a logger, and routes moved into their own file with express.Router. The data still lives in memory (it resets when the server restarts). Next week you'll connect it to a real database, so organise it well now.",
 k: ["express.Router() groups related routes into their own file", "Folder structure: routes/, controllers/ (the functions), index.js", "Consistent error format: { error: \"message\" }", "Data in memory disappears on restart, which is why we need a database"],
 t: ["Move the notes routes into routes/notes.js using express.Router()", "Move each handler function into controllers/notesController.js", "Add a pinned field and a GET /api/notes?pinned=true filter", "Add a catch-all 404 handler for unknown routes", "Test every endpoint in Thunder Client, including errors", "Push to GitHub with a README documenting the endpoints"],
 c: `// routes/notes.js
import { Router } from "express";
import { listNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/notesController.js";

const router = Router();
router.get("/", listNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
export default router;

// index.js
import notesRouter from "./routes/notes.js";
app.use("/api/notes", notesRouter);

// unknown routes
app.use((req, res) => res.status(404).json({ error: "Route not found" }));`,
 q: [["What is express.Router used for?", "Creating modular, mountable groups of routes, so each resource's routes live in their own file and are mounted at a base path like /api/notes."],
     ["What is the MVC pattern?", "Model-View-Controller: models handle data, views handle presentation, and controllers handle request logic. In an Express API, routes map URLs to controllers, and controllers use models."]],
 x: ["Everything in one 400-line index.js", "Forgetting the leading / in router paths"],
 d: "Your Notes API has full CRUD, validation and organised routes, and it's on GitHub with documented endpoints.",
 min: 180
},

/* ---------- Week 11: MongoDB ---------- */
"w11-1": {
 m: "Without a database, your app has amnesia. Every restart wipes its memory.",
 e: "A database is a super-organised filing cabinet that keeps data safe even when the server restarts. SQL databases (like MySQL or PostgreSQL) are like spreadsheets: strict tables with fixed columns, and every row has the same shape. NoSQL databases like MongoDB are like folders of documents: each record is a JSON-like object, and documents can have different fields. MongoDB feels natural for JavaScript developers because its documents look just like JavaScript objects.",
 k: ["MongoDB structure: database → collections (like tables) → documents (like rows, but JSON-like)", "Every document gets a unique _id automatically", "Documents can contain arrays and nested objects", "SQL: fixed schema, tables and joins. NoSQL: flexible schema, documents, often nested data", "Neither is \"better\": choose based on the data and the team"],
 t: ["Write out how a notes app's data would look as a SQL table (columns) and as MongoDB documents (JSON)", "Do the same for a user with multiple addresses: how does each approach store the addresses?", "Read MongoDB's \"What is MongoDB?\" introduction", "List 3 apps you use and guess which kind of database suits each one", "Learn the vocabulary: database, collection, document, field, _id"],
 c: `// A MongoDB document in the "users" collection
{
  "_id": "665f1c2e9b1e8a3f4c2d1a7b",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "addresses": [
    { "label": "Home", "city": "Pune", "pincode": "411001" },
    { "label": "Office", "city": "Mumbai", "pincode": "400051" }
  ],
  "createdAt": "2026-10-19T10:30:00Z"
}

-- The same data in SQL needs two tables:
-- users(id, name, email, created_at)
-- addresses(id, user_id, label, city, pincode)`,
 q: [["What is the difference between SQL and NoSQL databases?", "SQL databases store data in tables with a fixed schema and use SQL with joins, with strong consistency. NoSQL databases like MongoDB store flexible documents, scale horizontally easily, and often nest related data instead of joining."],
     ["What is a document in MongoDB?", "A record stored in BSON (binary JSON) format: a set of field-value pairs that can include arrays and nested documents, with a unique _id."],
     ["When would you choose MongoDB?", "When data is document-shaped or changes often, the schema needs flexibility, you want fast iteration with JavaScript, or you need to scale horizontally. Highly relational data with complex transactions often suits SQL better."]],
 x: ["Thinking \"schemaless\" means you don't need to plan your data. You still do", "Treating MongoDB exactly like SQL tables"],
 d: "You can explain collections, documents and _id, and when you'd pick SQL or MongoDB.",
 min: 45
},
"w11-2": {
 m: "A real database in the cloud, free, in about 10 minutes.",
 e: "MongoDB Atlas is MongoDB's cloud service: they run the database on their servers and you connect to it over the internet. The free tier (M0) is plenty for learning and portfolio projects. You'll create a cluster (your database server), a database user (a username and password for your app), allow your IP address through the firewall, and get a connection string: the address your app uses to connect.",
 k: ["Cluster = the database server. M0 is the free tier", "Database user ≠ your Atlas login: it's the username and password your app uses", "Network access: allow your IP (or 0.0.0.0/0 for learning, meaning anywhere)", "Connection string: mongodb+srv://user:password@cluster.xxxx.mongodb.net/notesdb", "MongoDB Compass is a free desktop app to browse your data visually"],
 t: ["Sign up at mongodb.com/atlas and create a free M0 cluster in a region near you (like Mumbai)", "Create a database user with a strong password, and save it somewhere safe", "Under Network Access, add your current IP address", "Click Connect → Drivers and copy the connection string", "Install MongoDB Compass and connect using the same string", "In Compass, create a database notesdb with a collection notes, and insert a document by hand"],
 c: `# Your connection string looks like this (never commit the real one!)
mongodb+srv://notesapp:<password>@cluster0.ab12c.mongodb.net/notesdb?retryWrites=true&w=majority

# Replace <password> with your database user's password.
# If the password contains special characters like @ or #, URL-encode them.
# notesdb is the database name: it's created automatically on first insert.`,
 q: [["What is MongoDB Atlas?", "MongoDB's fully managed cloud database service. It handles hosting, backups, scaling and security, with a free tier for development."],
     ["Why does Atlas need IP access rules?", "It's a firewall: only allowed IP addresses can reach the database, which reduces the attack surface. In production you allow only your server's IP."]],
 x: ["Using your Atlas account password instead of the database user's password", "Forgetting to whitelist your IP, which gives a timeout error", "Pasting the connection string into code you push to GitHub"],
 d: "You have a free Atlas cluster and can see your notesdb database in Compass.",
 min: 45
},
"w11-3": {
 m: "Create, Read, Update, Delete: four operations, and they power almost every app you've ever used.",
 e: "CRUD is what apps do with data: Create (insertOne), Read (find), Update (updateOne) and Delete (deleteOne). A filter is how you say which documents you mean, written as an object: { title: \"Learn React\" } means \"documents whose title is Learn React\". Operators start with $: { price: { $lt: 500 } } means price less than 500. Practise in mongosh, the MongoDB shell built into Compass.",
 k: ["insertOne({...}), insertMany([...])", "find() for all, find({ pinned: true }) to filter, findOne() for the first match", "updateOne(filter, { $set: { field: value } }). Always use $set, or you replace the whole document", "deleteOne(filter), deleteMany(filter)", "Operators: $gt, $lt, $in, $regex. Sorting and limiting: .sort({ createdAt: -1 }).limit(5)"],
 t: ["Open the mongosh shell inside Compass (bottom of the window)", "Run use notesdb and insert 5 notes with insertMany", "Find all notes, then only the pinned ones", "Update one note's title with $set", "Delete one note", "Find notes sorted newest first, limited to 3", "Search titles containing \"react\" with $regex"],
 c: `use notesdb

db.notes.insertMany([
  { title: "Learn React", body: "Hooks and state", pinned: true, tags: ["frontend"] },
  { title: "Learn Express", body: "Routes and middleware", pinned: false, tags: ["backend"] },
  { title: "Learn MongoDB", body: "CRUD", pinned: true, tags: ["backend", "db"] },
])

db.notes.find()
db.notes.find({ pinned: true })
db.notes.find({ tags: "backend" })                    // matches inside arrays
db.notes.find({ title: { $regex: "react", $options: "i" } })

db.notes.updateOne({ title: "Learn React" }, { $set: { pinned: false } })
db.notes.deleteOne({ title: "Learn Express" })

db.notes.find().sort({ _id: -1 }).limit(3)`,
 q: [["What are the CRUD operations in MongoDB?", "Create with insertOne/insertMany, Read with find/findOne, Update with updateOne/updateMany (using operators like $set), and Delete with deleteOne/deleteMany."],
     ["What happens if you call updateOne without $set?", "In mongosh and modern drivers it throws an error (\"Update document requires atomic operators\"). The old update() method silently replaced the whole document. Use $set to change specific fields, and replaceOne when you really mean to replace the document."],
     ["What is an index in MongoDB?", "A data structure that makes queries on certain fields much faster, like a book's index, at the cost of extra storage and slightly slower writes."]],
 x: ["Forgetting $set (modern tools throw an error, older ones replaced the whole document)", "Running deleteMany({}) with an empty filter, which deletes everything", "Typos in field names: MongoDB won't complain, it just finds nothing"],
 d: "You've done all four CRUD operations in mongosh, plus filtering and sorting.",
 min: 60
},
"w11-4": {
 m: "Flexibility is great until a typo saves \"titel\" instead of \"title\". Mongoose adds the rules back.",
 e: "Mongoose is a library that sits between Express and MongoDB. You define a schema, a blueprint describing what a document should look like: title is a required string, pinned is a boolean defaulting to false. From the schema you create a model: a tool with methods like Note.find() and Note.create(). Mongoose checks every document against the blueprint before saving, so bad data gets rejected.",
 k: ["npm install mongoose", "Schema: new mongoose.Schema({ title: { type: String, required: true } })", "Model: const Note = mongoose.model(\"Note\", noteSchema) creates the notes collection", "Built-in validation: required, minlength, maxlength, min, max, enum, default", "{ timestamps: true } adds createdAt and updatedAt automatically"],
 t: ["Install mongoose in your notes-api", "Create models/Note.js with a schema: title (required, max 100), body, pinned (default false), tags (array of strings)", "Turn on timestamps", "Write a small test script that connects, creates a note, and logs it", "Try creating a note without a title and read the validation error", "Find the note in Compass and see createdAt and updatedAt"],
 c: `// models/Note.js
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true, maxlength: 100 },
    body: { type: String, default: "" },
    pinned: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);

// try-it.js
import mongoose from "mongoose";
import Note from "./models/Note.js";

await mongoose.connect(process.env.MONGO_URI);
const note = await Note.create({ title: "Hello Mongoose", tags: ["test"] });
console.log(note);
await mongoose.disconnect();

// run with: node --env-file=.env try-it.js`,
 q: [["What is Mongoose?", "An ODM (Object Data Modeling) library for MongoDB and Node.js. It provides schemas, validation, type casting, middleware hooks, relationship population and a clean query API."],
     ["What is the difference between a schema and a model in Mongoose?", "A schema defines the structure, types, defaults and validation of documents. A model is compiled from a schema and provides the methods to create, query, update and delete documents in a collection."],
     ["Why use Mongoose if MongoDB is schemaless?", "To enforce consistent data structure and validation in the application, catch bugs early, and get helpful features like defaults, timestamps and populate."]],
 x: ["Forgetting await on Mongoose calls and getting a pending Promise", "Naming the model in plural: Mongoose already turns \"Note\" into the notes collection", "Not handling validation errors"],
 d: "Your Note model rejects notes without a title and adds timestamps automatically.",
 min: 60
},
"w11-5": {
 m: "Today the pieces click together: Express routes reading and writing a real database.",
 e: "You'll replace the in-memory notes array with your Mongoose model. Each controller becomes async and awaits a database call: Note.find() instead of returning the array, Note.create(req.body) instead of push. The connection string goes in a .env file so your password never touches GitHub. After today, your data survives server restarts.",
 k: ["Connect once at startup: await mongoose.connect(process.env.MONGO_URI)", "Load .env with node --env-file=.env (built into modern Node) or the dotenv package", "Note.find(), Note.findById(id), Note.create(data), Note.findByIdAndUpdate(id, data, { new: true, runValidators: true }), Note.findByIdAndDelete(id)", "Invalid ids throw a CastError: check with mongoose.isValidObjectId(id)", "Handle errors with try/catch and send proper status codes"],
 t: ["Create a .env file with MONGO_URI and PORT, and make sure .env is in .gitignore", "Write config/db.js that connects to MongoDB and logs success or exits on failure", "Update the dev script to node --watch --env-file=.env index.js", "Rewrite every controller to use the Note model with async/await and try/catch", "Return 400 for invalid ids and validation errors, and 404 for notes that don't exist", "Test everything in Thunder Client, restart the server, and confirm the data is still there"],
 c: `// config/db.js
import mongoose from "mongoose";
export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

// controllers/notesController.js
import mongoose from "mongoose";
import Note from "../models/Note.js";

export async function listNotes(req, res) {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
}

export async function createNote(req, res) {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateNote(req, res) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid id" });
  const note = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
}`,
 q: [["How do you connect an Express app to MongoDB?", "Install Mongoose, keep the connection string in an environment variable, call mongoose.connect() once at startup before listening, and use models inside route handlers."],
     ["What does { new: true } do in findByIdAndUpdate?", "It returns the updated document instead of the original. runValidators: true also makes the schema validation run on updates."],
     ["Why keep the connection string in .env?", "It contains credentials. Keeping it out of the code means it never ends up in Git history, and each environment (development, production) can use its own database."]],
 x: ["Committing .env with your database password", "Forgetting await, so you send a Promise instead of data", "Not checking for invalid ObjectIds, so the server crashes with a CastError"],
 d: "Your Notes API saves to MongoDB Atlas, and the data survives server restarts.",
 min: 75
},
"w11-6": {
 m: "Real data is connected: users have notes, orders have products. Today you link them.",
 e: "Data often belongs to other data: a note belongs to a user, a comment belongs to a post. In MongoDB you have two choices. Embedding puts the related data inside the document (like addresses inside a user), which is great when it's small and always read together. Referencing stores the other document's _id (like note.user = userId), which is better when the related data is big, shared or grows without limit. Mongoose's populate() swaps a stored id for the full document when you read it.",
 k: ["Embed when the data is small, owned by the parent and read together (addresses, line items)", "Reference when the data is large, shared or unbounded (users ↔ notes, posts ↔ comments)", "Reference field: user: { type: mongoose.Schema.Types.ObjectId, ref: \"User\" }", ".populate(\"user\", \"name email\") replaces the id with the user's name and email", "Custom validation: enum for fixed options, match for patterns, and validate for your own rules"],
 t: ["Create a User model with name and a unique email (with a match pattern for valid emails)", "Add a user reference field to the Note model", "Create a user in Thunder Client, then create notes that reference that user's _id", "Add GET /api/notes?user=ID that returns one user's notes", "Use populate to include the author's name in note responses", "Add a category field with enum: [\"work\", \"personal\", \"study\"] and test an invalid value"],
 c: `// models/User.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\\S+@\\S+\\.\\S+$/, "Please enter a valid email"],
  },
}, { timestamps: true });
export default mongoose.model("User", userSchema);

// models/Note.js: add a reference and an enum
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
category: { type: String, enum: ["work", "personal", "study"], default: "personal" },

// controller: populate the author
const notes = await Note.find({ user: req.query.user })
  .populate("user", "name email")
  .sort({ createdAt: -1 });`,
 q: [["When should you embed versus reference in MongoDB?", "Embed small, tightly coupled data that's read together and doesn't grow without limit. Reference data that's large, shared across documents, updated independently, or can grow indefinitely."],
     ["What does populate() do?", "It replaces ObjectId references with the actual documents from the referenced collection, a bit like a join, running an extra query behind the scenes."],
     ["Is unique: true in a Mongoose schema a validator?", "No. It creates a unique index in MongoDB. Duplicates are rejected by the database with error code 11000, not by Mongoose validation, so you handle that error separately."]],
 x: ["Embedding thousands of comments inside a post document (documents have a 16 MB limit)", "Expecting unique to give a friendly validation message"],
 d: "Notes reference their author, populate shows the author's name, and invalid categories are rejected.",
 min: 75
},
"w11-p": {
 m: "A real, persistent backend with related data. This is the foundation of your capstone.",
 e: "Today you finish the Notes API with MongoDB: users, notes that belong to users, filtering, search, pagination and solid error handling. Pagination means sending results in pages (like 10 at a time) instead of everything at once, which every real app needs. Your capstone in week 13 will reuse this structure.",
 k: ["Pagination: ?page=2&limit=10 → .skip((page - 1) * limit).limit(limit)", "Return metadata: { data, page, totalPages, total }", "Search with $regex on title", "Clean structure: config, models, controllers, routes"],
 t: ["Add pagination to GET /api/notes with page and limit query parameters", "Return { data, page, totalPages, total }", "Combine filters: user, category, pinned, and a search term", "Add a seed script that fills the database with 30 sample notes", "Test every endpoint and error case in Thunder Client and export the collection", "Push to GitHub with a README: setup steps, a .env.example file and the endpoint table"],
 c: `export async function listNotes(req, res) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(50, Number(req.query.limit) || 10);
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.pinned) filter.pinned = req.query.pinned === "true";
  if (req.query.search) filter.title = { $regex: req.query.search, $options: "i" };

  const [data, total] = await Promise.all([
    Note.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Note.countDocuments(filter),
  ]);

  res.json({ data, page, totalPages: Math.ceil(total / limit), total });
}

// .env.example (commit this one, with fake values)
// MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/notesdb
// PORT=5000`,
 q: [["How do you implement pagination in an API?", "Accept page and limit query parameters, use skip and limit (or cursor-based pagination for large datasets), and return the results with metadata like total count and total pages."],
     ["What is a .env.example file?", "A committed template listing the environment variables the app needs, with placeholder values, so other developers know what to set up without seeing real secrets."]],
 x: ["Returning thousands of documents in one response", "Not capping the limit, so someone can request ?limit=1000000"],
 d: "Your API paginates, filters and searches notes from MongoDB, and the repo has a README and .env.example.",
 min: 180
},

/* ---------- Week 12: Authentication and security ---------- */
"w12-1": {
 m: "One leaked password in a GitHub repo can cost a company lakhs. Secrets never go in code.",
 e: "Environment variables are settings that live outside your code: database passwords, API keys, the port number. Your code reads them from process.env. Locally they sit in a .env file that Git ignores. In production you type them into your hosting dashboard. It's like keeping your house key in your pocket instead of taped to the front door: the code can be public, the keys never are.",
 k: ["Read with process.env.MONGO_URI", "Load .env with node --env-file=.env (Node 20.6+) or the dotenv package", "Always add .env to .gitignore, and commit a .env.example with fake values", "Bots scan GitHub for leaked keys within minutes. If you leak one, rotate it (make a new one) immediately", "Different values per environment: a development database locally, the production database live"],
 t: ["Check .env is in .gitignore and run git status to make sure it isn't tracked", "Move every secret and setting (MONGO_URI, PORT, later JWT_SECRET) into .env", "Create .env.example with placeholder values", "Make the server refuse to start if a required variable is missing", "Run git log -p and search for your password, to be sure it was never committed. If it was, change it in Atlas"],
 c: `// config/env.js: fail fast if something is missing
const required = ["MONGO_URI", "JWT_SECRET"];
for (const key of required) {
  if (!process.env[key]) {
    console.error(\`❌ Missing environment variable: \${key}\`);
    process.exit(1);
  }
}

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

# .env (never committed)
MONGO_URI=mongodb+srv://notesapp:realPassword@cluster0.ab12c.mongodb.net/notesdb
JWT_SECRET=a-long-random-string-generated-just-for-this-app
PORT=5000`,
 q: [["What are environment variables, and why use them?", "Configuration values supplied by the environment rather than hard-coded. They keep secrets out of source control and let the same code run with different settings in development, testing and production."],
     ["What should you do if you accidentally commit a secret?", "Treat it as compromised: revoke or rotate it immediately, then remove it from the code and history. Deleting the commit isn't enough, because it may already have been scraped."]],
 x: ["Committing .env \"just once\"", "Using the same database for development and production", "Hard-coding fallback secrets like process.env.JWT_SECRET || \"secret\""],
 d: "Every secret lives in .env, .env is not tracked, and the server refuses to start without required variables.",
 min: 45
},
"w12-2": {
 m: "If your database is ever stolen, hashed passwords are the difference between an incident and a disaster.",
 e: "You must never store passwords as plain text. Hashing turns a password into a scrambled fingerprint that can't be turned back. Like a juicer: you can turn oranges into juice, but never juice back into oranges. When someone logs in, you hash what they typed and compare fingerprints. bcrypt also adds a \"salt\" (random extra data) so two people with the same password get different hashes, and it's deliberately slow, which makes guessing billions of passwords impractical.",
 k: ["npm install bcryptjs", "Hash on signup: await bcrypt.hash(password, 10) (10 = salt rounds, the work factor)", "Check on login: await bcrypt.compare(typedPassword, user.password)", "Hashing is one-way. Encryption is two-way (it can be decrypted). Passwords need hashing", "Never send the password hash back in API responses: use select: false in the schema"],
 t: ["Install bcryptjs and add a password field to the User model with select: false and minlength 8", "Add a Mongoose pre(\"save\") hook that hashes the password whenever it changes", "Build POST /api/auth/register that creates a user and returns them without the password", "Register a user, then look in Compass: the password should be a $2a$... hash", "Register two users with the same password and compare their hashes", "Handle a duplicate email (error code 11000) with a friendly 409 response"],
 c: `// models/User.js
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8, select: false },
}, { timestamps: true });

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

// controllers/authController.js
export async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: "Email already registered" });
    res.status(400).json({ error: err.message });
  }
}`,
 q: [["Why do we hash passwords instead of encrypting them?", "Hashing is one-way, so even the server can't recover the password. Encryption can be reversed with the key, so if the key leaks, every password leaks."],
     ["What is a salt, and why is it used?", "Random data added to each password before hashing, so identical passwords produce different hashes. It defeats precomputed rainbow-table attacks."],
     ["Why is bcrypt deliberately slow?", "Its configurable work factor makes each hash take time. That's barely noticeable for one login, but it makes brute-forcing millions of guesses very expensive for an attacker."]],
 x: ["Storing plain-text passwords, ever", "Using fast hashes like MD5 or SHA-256 for passwords", "Returning the password hash in API responses"],
 d: "Registered users have bcrypt-hashed passwords in the database, and duplicate emails get a 409.",
 min: 60
},
"w12-3": {
 m: "Logging in is how an app knows who you are. JWTs are how most modern APIs remember it.",
 e: "When you log in, the server checks your password and hands you a JWT (JSON Web Token): a digital wristband like the one you get at a concert. It says who you are and when it expires, and it's signed with a secret only the server knows, so nobody can forge or edit it. Your app sends the wristband with every request, in the Authorization header, and the server checks the signature instead of asking for your password again.",
 k: ["npm install jsonwebtoken", "Create: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: \"7d\" })", "Verify: jwt.verify(token, process.env.JWT_SECRET) returns the payload or throws", "The client sends: Authorization: Bearer <token>", "A JWT is signed, not encrypted: anyone can read the payload, so never put secrets in it"],
 t: ["Install jsonwebtoken and add a long random JWT_SECRET to .env (generate one with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\")", "Build POST /api/auth/login: find the user by email (with +password), compare passwords, return a token", "Return the same error for wrong email and wrong password: \"Invalid email or password\"", "Log in with Thunder Client and copy the token", "Paste the token into jwt.io and read the payload", "Return a token from register too, so users are logged in straight after signing up"],
 c: `import jwt from "jsonwebtoken";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email },
  });
}`,
 q: [["What is a JWT, and what are its parts?", "A JSON Web Token is a compact, signed token with three base64url parts separated by dots: a header (algorithm), a payload (claims like user id and expiry) and a signature that proves it wasn't tampered with."],
     ["What's the difference between authentication and authorization?", "Authentication checks who you are (logging in). Authorization checks what you're allowed to do (like only editing your own notes, or admin-only routes)."],
     ["Where should a frontend store a JWT?", "Options are memory, localStorage or an httpOnly cookie. httpOnly cookies can't be read by JavaScript, which protects against XSS, but need CSRF protection. localStorage is simpler but readable by any injected script. Many tutorials use localStorage, while production apps often prefer httpOnly cookies."]],
 x: ["Putting passwords or sensitive data in the JWT payload", "Telling attackers which part was wrong (\"email not found\")", "A short, guessable JWT_SECRET like \"secret\""],
 d: "Login returns a signed JWT for correct credentials and a generic 401 for anything wrong.",
 min: 75
},
"w12-4": {
 m: "A login system is pointless if every route is open. Middleware is the bouncer at the door.",
 e: "Auth middleware is a bouncer that stands in front of private routes. It reads the token from the Authorization header, verifies it, looks up the user, and attaches them to req.user, then lets the request through with next(). No token, or a fake or expired one? The bouncer returns 401. Then, inside routes, you check ownership: users can only see and edit their own notes.",
 k: ["Read: req.headers.authorization → \"Bearer eyJ...\" → split off the token", "Verify with jwt.verify, find the user, set req.user", "Protect a route: router.get(\"/me\", protect, getMe) or router.use(protect)", "Ownership: Note.find({ user: req.user._id }) so users only ever see their own data", "Roles: add role: \"user\" | \"admin\" to the User model and an authorize(\"admin\") middleware"],
 t: ["Write middleware/auth.js with a protect function", "Add GET /api/auth/me that returns the logged-in user", "Protect all /api/notes routes", "When creating a note, set user: req.user._id from the token, never from req.body", "Make list, update and delete only touch notes where user equals req.user._id", "Test: no token (401), another user's note id (404), and your own note (200)"],
 c: `// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(id);
    if (!req.user) return res.status(401).json({ error: "User no longer exists" });
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// routes/notes.js
router.use(protect);  // every route below needs a login

// controllers: only the owner's notes
export const listNotes = async (req, res) =>
  res.json(await Note.find({ user: req.user._id }).sort({ createdAt: -1 }));

export async function deleteNote(req, res) {
  const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.status(204).end();
}`,
 q: [["How do you protect routes in Express?", "With authentication middleware that extracts and verifies the token, loads the user and attaches it to req, calling next() if valid and returning 401 if not. Authorization checks, like ownership or roles, then run in the handlers or extra middleware."],
     ["How do you make sure users can only access their own data?", "Always include the authenticated user's id from req.user in the database query, like findOne({ _id, user: req.user._id }). Never trust a user id sent in the request body."],
     ["Why return 404 rather than 403 for another user's resource?", "It avoids revealing that the resource exists, so an attacker can't probe which ids are valid."]],
 x: ["Taking the owner id from req.body, which lets anyone create notes as anyone", "Checking login but forgetting ownership, so any logged-in user can delete any note (this is called IDOR, a very common real-world bug)"],
 d: "Notes routes need a valid token, and users can only see, edit and delete their own notes.",
 min: 75
},
"w12-5": {
 m: "Every route can fail. Handle errors in one place, and check inputs at the door.",
 e: "Instead of writing try/catch with the same error responses in every route, Express lets you write one error-handling middleware at the end. It has four parameters (err, req, res, next), and any error thrown in a route ends up there. Express 5 automatically forwards errors from async routes. Input validation means checking request data before using it: right types, required fields, sensible lengths. Libraries like zod make this tidy.",
 k: ["Error middleware: app.use((err, req, res, next) => { ... }) registered last", "Express 5 catches rejected promises in async handlers automatically", "Create custom errors with a status: class AppError extends Error", "Map known errors: ValidationError → 400, CastError → 400, code 11000 → 409", "Validate inputs with a schema library (zod) and don't leak stack traces in production"],
 t: ["Write middleware/error.js that sends { error: message } with the right status", "Create an AppError class with a statusCode, and throw it from controllers instead of writing responses by hand", "Map Mongoose ValidationError, CastError and duplicate key errors to friendly messages", "Install zod and validate register and login bodies", "Remove the repeated try/catch blocks from your controllers", "Only include err.stack in responses when NODE_ENV is development"],
 c: `// utils/AppError.js
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// middleware/error.js (register after all routes)
export function errorHandler(err, req, res, next) {
  let status = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  if (err.name === "ValidationError") status = 400;
  if (err.name === "CastError") { status = 400; message = "Invalid id"; }
  if (err.code === 11000) { status = 409; message = "That value is already taken"; }

  if (status === 500) console.error(err);
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

// validation with zod
import { z } from "zod";
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ error: result.error.issues[0].message });
  req.body = result.data;
  next();
};
// router.post("/register", validate(registerSchema), register);`,
 q: [["How does error handling middleware work in Express?", "It's middleware with four arguments (err, req, res, next), registered after the routes. Errors passed to next(err) or thrown in handlers (and, in Express 5, rejected promises) are routed to it, so responses are formatted in one place."],
     ["Why validate input on the server when the frontend already validates?", "Frontend validation is for user experience and can be bypassed: anyone can call the API directly. Server validation is the real protection for data integrity and security."]],
 x: ["Sending stack traces to users in production", "Registering the error handler before the routes", "Trusting that frontend validation is enough"],
 d: "Errors are formatted in one place, invalid input gets clear 400 messages, and controllers have no repeated try/catch.",
 min: 75
},
"w12-6": {
 m: "Most hacks aren't genius. They exploit forgotten basics. Today you lock the obvious doors.",
 e: "CORS is a browser rule that blocks a website from calling an API on a different domain unless the API says \"I allow this site\". Your React app (on localhost:5173 or vercel.app) and your API (on localhost:5000 or render.com) are different origins, so you must allow it. Helmet sets security headers that defend against common attacks. Rate limiting stops someone trying thousands of passwords a minute. These three are basics every production API needs.",
 k: ["npm install cors helmet express-rate-limit", "app.use(cors({ origin: process.env.CLIENT_URL })) allows only your frontend", "app.use(helmet()) adds security headers with one line", "Rate-limit login: for example 10 attempts per 15 minutes per IP", "Read the OWASP Top 10: the most common web security risks"],
 t: ["Install cors, helmet and express-rate-limit", "Allow only your frontend origin with CORS (CLIENT_URL in .env)", "Add helmet() at the top of your middleware", "Add a rate limiter to /api/auth routes and test it by sending 11 quick login requests", "Limit JSON body size: express.json({ limit: \"10kb\" })", "Skim the OWASP Top 10 and write one sentence on how your app handles Broken Access Control and Injection"],
 c: `import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "10kb" }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  limit: 10,                 // 10 requests per IP per window
  message: { error: "Too many attempts. Try again in 15 minutes." },
});
app.use("/api/auth", authLimiter, authRouter);

# .env
CLIENT_URL=http://localhost:5173`,
 q: [["What is CORS?", "Cross-Origin Resource Sharing: a browser mechanism that blocks web pages from calling APIs on a different origin (protocol, domain or port) unless the server sends headers allowing that origin."],
     ["Name three ways to secure an Express API.", "Hash passwords with bcrypt, authenticate with JWT and check ownership, validate all input, use helmet for security headers, restrict CORS to known origins, rate-limit sensitive routes, keep secrets in environment variables, and use HTTPS."],
     ["What is the OWASP Top 10?", "A widely used list of the most critical web application security risks, such as broken access control, injection, cryptographic failures and security misconfiguration."]],
 x: ["Using cors() with no options in production, which allows every site", "Thinking CORS protects your API. It only restricts browsers, while tools like curl ignore it, so you still need authentication", "No rate limit on login"],
 d: "Your API allows only your frontend's origin, sends security headers, and rate-limits login attempts.",
 min: 60
},
"w12-p": {
 m: "Secure login is the feature every real app needs. After today, you can build it from scratch.",
 e: "You'll finish a production-style auth API: register, login, a protected \"my profile\" route, a route to update your name, and notes that belong to the logged-in user. It includes password hashing, JWTs, validation, central error handling, CORS, helmet and rate limiting. This is the exact backend your capstone frontend will connect to next week.",
 k: ["Endpoints: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me, PATCH /api/auth/me", "All /api/notes routes protected and scoped to req.user", "Consistent { error } responses and correct status codes", "Security middleware on, secrets in .env"],
 t: ["Finish all auth endpoints with validation", "Add PATCH /api/auth/me to update the user's name (not email or password)", "Make sure every notes route is protected and ownership-scoped", "Write a Thunder Client test flow: register → login → create note → list notes → try another user's note → delete", "Review against a checklist: hashed passwords, no secrets in Git, CORS restricted, rate limit on auth, generic login errors", "Update the README with an auth section and push to GitHub"],
 c: `notes-api/
├── config/db.js
├── controllers/authController.js
├── controllers/notesController.js
├── middleware/auth.js          # protect
├── middleware/error.js         # errorHandler
├── middleware/validate.js      # zod
├── models/User.js
├── models/Note.js
├── routes/auth.js
├── routes/notes.js
├── utils/AppError.js
├── .env.example
└── index.js`,
 q: [["Walk me through how authentication works in your app.", "On register, the password is validated and hashed with bcrypt, and the user is saved. On login, I find the user, compare the hash, and return a signed JWT with an expiry. The client sends it as a Bearer token, my protect middleware verifies it and attaches req.user, and every query is scoped to that user."],
     ["How would you handle logout with JWTs?", "With stateless JWTs, the client deletes the token. For server-side invalidation you can keep tokens short-lived with refresh tokens, keep a deny-list of revoked tokens, or store a token version on the user that's checked on each request."]],
 x: ["Skipping the security checklist because \"it's only a portfolio project\". Interviewers ask about exactly this", "No README explaining how to run the API"],
 d: "Your auth API passes the full Thunder Client flow and the security checklist, and it's on GitHub.",
 min: 240
}
};
