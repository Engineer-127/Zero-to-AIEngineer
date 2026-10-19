/* MERN Phase 3: React (Weeks 7-9)
   Code samples use normal template literals: backticks and ${ inside code are escaped. */
export default {

/* ---------- Week 7: React basics ---------- */
"w7-1": {
 m: "Instagram, Netflix, Airbnb and Swiggy's web apps use React. Today you start using the same tool.",
 e: "In your to-do app, you had to update the page by hand every time the data changed: clear the list, rebuild it, attach listeners. React does that for you. You describe what the page should look like for the current data, and when the data changes, React updates the screen automatically. Vite is a tool that creates a ready-to-go React project in seconds and refreshes your browser instantly as you code. To use it you need Node.js installed, which also gives you npm, a free app store for code.",
 k: ["React is a JavaScript library for building user interfaces from components", "Declarative: you say what you want, React works out how to update the page", "Node.js lets JavaScript run outside the browser. npm installs packages (other people's code)", "npm create vite@latest makes a new project. npm run dev starts it", "Your code lives in src/. main.jsx starts the app, App.jsx is your first component"],
 t: ["Install the LTS version of Node.js from nodejs.org, then check with node -v and npm -v in the terminal", "In your code folder run: npm create vite@latest my-react-app -- --template react", "cd my-react-app, npm install, npm run dev, and open the link it shows", "Open src/App.jsx, change the heading text, save, and watch the browser update instantly", "Delete the starter content in App.jsx and make it show just your name in an <h1>", "Look at the folder: package.json, node_modules, src, index.html. What does each do?"],
 c: `# terminal
node -v
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev

// src/App.jsx
function App() {
  return (
    <div>
      <h1>Hello, I'm Priya 👋</h1>
      <p>This is my first React app.</p>
    </div>
  );
}

export default App;`,
 q: [["What is React and why is it popular?", "A JavaScript library from Meta for building user interfaces out of reusable components. It's popular because of its declarative style, component reuse, a huge ecosystem, and efficient updates through the virtual DOM."],
     ["What is the virtual DOM?", "A lightweight JavaScript copy of the real DOM. When state changes, React builds a new virtual tree, compares it to the previous one (diffing), and updates only the parts of the real DOM that changed."],
     ["Is React a framework or a library?", "A library: it focuses on the view layer. You add other libraries for routing, data fetching and so on, or use a framework built on React like Next.js."]],
 x: ["Running npm commands in the wrong folder (always cd into the project first)", "Committing node_modules to Git. It's huge, and Vite's .gitignore already excludes it", "Trying to open index.html directly instead of using npm run dev"],
 d: "Your own React app runs locally and shows your name, and it updates when you save.",
 min: 60
},
"w7-2": {
 m: "JSX looks like HTML, but it's JavaScript wearing an HTML costume, and that gives you superpowers.",
 e: "JSX lets you write HTML-like code inside JavaScript. Under the hood, every tag becomes a JavaScript function call. The superpower is curly braces { }: anything inside them is real JavaScript, so you can put variables, maths or function calls right in your markup. There are a few small differences from HTML, because JSX is JavaScript.",
 k: ["{ } inside JSX runs JavaScript: <p>{user.name}</p>, <p>{2 + 2}</p>", "class becomes className (class is a reserved word in JS)", "Every tag must close: <img />, <br />, <input />", "A component must return one parent element. Use <> </> (a fragment) to group without an extra div", "Inline styles are objects: style={{ color: \"red\", fontSize: 20 }}"],
 t: ["In App.jsx create variables name, city and skills (an array)", "Show them in JSX using { }", "Show the number of skills with {skills.length}", "Add an image with className and alt", "Use a fragment <> </> to return two sibling elements", "Show today's date with {new Date().toDateString()}"],
 c: `function App() {
  const name = "Priya";
  const city = "Hyderabad";
  const skills = ["HTML", "CSS", "JavaScript", "React"];

  return (
    <>
      <header className="header">
        <h1>{name}</h1>
        <p>Based in {city} · {skills.length} skills</p>
      </header>
      <img src="/me.jpg" alt={\`Photo of \${name}\`} className="avatar" />
      <p style={{ color: "gray" }}>Today is {new Date().toDateString()}</p>
    </>
  );
}

export default App;`,
 q: [["What is JSX?", "A syntax extension that lets you write HTML-like markup in JavaScript. Build tools compile it into React.createElement calls (or the newer JSX runtime) that create React elements."],
     ["Why is it className instead of class in JSX?", "JSX is JavaScript, and class is a reserved keyword there, so React uses className, matching the DOM property name."],
     ["What is a React Fragment?", "<> </> or <React.Fragment> lets a component return several elements without adding an extra wrapper element to the DOM."]],
 x: ["Writing class instead of className (React warns in the Console)", "Unclosed tags like <img> without the slash", "Putting if statements inside { } (use expressions like ternaries instead)"],
 d: "Your App component shows variables, a calculation and an image using JSX.",
 min: 60
},
"w7-3": {
 m: "Components are Lego blocks. Build small pieces once, then snap them together into anything.",
 e: "A component is a JavaScript function that returns some JSX: a reusable piece of the screen, like a button, a product card or a navbar. Props (short for properties) are how you pass information into a component, like arguments to a function. One ProductCard component can show a thousand different products, because each one gets different props. Props flow one way: parent to child.",
 k: ["Component names start with a Capital letter: ProductCard, not productCard", "Use it like a tag: <ProductCard name=\"Mouse\" price={699} />", "Receive props by destructuring: function ProductCard({ name, price }) { }", "Strings in quotes, anything else in braces: price={699}, inStock={true}", "Props are read-only: a component never changes its own props", "children is a special prop: whatever you put between the opening and closing tags"],
 t: ["Create src/components/ProfileCard.jsx that takes name, role and image props", "Use it 3 times in App with different people", "Create a Button component that receives a label prop", "Create a Card component that uses children, and wrap a ProfileCard inside it", "Give one prop a default value: function Button({ label = \"Click me\" })", "Draw your portfolio site as a tree of components on paper"],
 c: `// src/components/ProfileCard.jsx
export default function ProfileCard({ name, role, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} width="80" />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

// src/App.jsx
import ProfileCard from "./components/ProfileCard";

export default function App() {
  return (
    <div className="grid">
      <ProfileCard name="Priya" role="Frontend dev" image="https://i.pravatar.cc/80?img=5" />
      <ProfileCard name="Ravi" role="Backend dev" image="https://i.pravatar.cc/80?img=12" />
      <ProfileCard name="Asha" role="Designer" image="https://i.pravatar.cc/80?img=9" />
    </div>
  );
}`,
 q: [["What are props in React?", "Inputs passed from a parent component to a child, like function arguments. They let one component render different data. Props are read-only inside the child."],
     ["What is the children prop?", "A special prop holding whatever is nested between a component's opening and closing tags. It's useful for wrappers like Card, Modal or Layout."],
     ["Why must component names start with a capital letter?", "JSX treats lowercase tags as built-in HTML elements (div, span) and capitalised tags as custom components."]],
 x: ["Lowercase component names, which React treats as unknown HTML tags", "Passing numbers as strings: price=\"699\" instead of price={699}", "Trying to change a prop inside the child"],
 d: "You render the same ProfileCard component three times with different props.",
 min: 60
},
"w7-4": {
 m: "State is a component's memory. It's what makes React apps interactive.",
 e: "A normal variable inside a component forgets its value every time the component redraws. State is memory that React keeps for you, and, crucially, when you change state, React automatically redraws the component with the new value. useState gives you two things: the current value and a function to update it. Think of a scoreboard: the score is the state, and the person who flips the numbers is the setter function.",
 k: ["const [count, setCount] = useState(0): 0 is the starting value", "Always update with the setter: setCount(count + 1). Never write count = count + 1", "Changing state re-renders the component", "Hooks (functions starting with use) must be called at the top of the component, never inside ifs or loops", "For arrays and objects, create a new copy: setItems([...items, newItem])"],
 t: ["Build a counter with + and − buttons using useState", "Add a Reset button", "Stop the counter going below 0", "Build a \"like\" button that toggles between 🤍 and ❤️ with a boolean state", "Build a show/hide password toggle", "Keep an array in state and add an item to it on button click"],
 c: `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [fruits, setFruits] = useState(["Mango"]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count - 1)} disabled={count === 0}>−</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <button onClick={() => setLiked(!liked)}>{liked ? "❤️" : "🤍"}</button>

      <button onClick={() => setFruits([...fruits, "Banana"])}>Add banana</button>
      <p>{fruits.join(", ")}</p>
    </div>
  );
}`,
 q: [["What is state in React?", "Data a component remembers between renders. When state changes through its setter, React re-renders the component to reflect the new value."],
     ["What is the difference between props and state?", "Props are passed in from the parent and are read-only. State is owned and managed by the component itself and can change over time."],
     ["Why shouldn't you mutate state directly?", "React compares the old and new values to decide whether to re-render. Mutating (like arr.push) keeps the same reference, so React may not notice the change. Always create new arrays or objects."]],
 x: ["Changing state directly: count++ or fruits.push()", "Expecting the state value to change immediately after calling the setter on the same line", "Calling useState inside an if"],
 d: "Your counter, like button and growing list all update the screen through state.",
 min: 75
},
"w7-5": {
 m: "Apps react to people. Events capture what users do, and conditional rendering decides what they see.",
 e: "React events look like HTML attributes but in camelCase: onClick, onChange, onSubmit. You pass them a function (not a function call). Conditional rendering means showing different things depending on the state, like showing \"Log in\" to guests and \"Log out\" to members. You use normal JavaScript for it: the ternary operator (condition ? this : that) or && (show this only if true).",
 k: ["onClick={handleClick}, not onClick={handleClick()}, which would run it immediately", "Pass arguments with an arrow: onClick={() => remove(id)}", "Ternary: {isLoggedIn ? <Dashboard /> : <Login />}", "&& for show-or-nothing: {cart.length > 0 && <CheckoutButton />}", "You can also return early: if (!user) return <p>Please log in</p>;"],
 t: ["Build a login/logout toggle that shows \"Welcome back!\" or \"Please log in\"", "Show a \"Your cart is empty\" message when an array is empty, and the items otherwise", "Build an FAQ item: clicking the question shows or hides the answer", "Write a handler function separately (function handleClick() {}) and pass it to onClick", "Show a red warning when a counter goes above 10"],
 c: `import { useState } from "react";

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq">
      <button onClick={() => setOpen(!open)}>
        {open ? "▾" : "▸"} {question}
      </button>
      {open && <p>{answer}</p>}
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? <h2>Welcome back! 👋</h2> : <h2>Please log in</h2>}
      <button onClick={() => setLoggedIn(!loggedIn)}>
        {loggedIn ? "Log out" : "Log in"}
      </button>
      <FaqItem question="Is this free?" answer="Yes, completely free." />
    </div>
  );
}`,
 q: [["How do you handle events in React?", "Pass a function to a camelCase event prop like onClick or onChange. React gives the handler a synthetic event object that works the same across browsers."],
     ["What are the ways to render conditionally in React?", "if statements with early returns, the ternary operator for either/or, logical && for show-or-nothing, and variables that hold JSX."],
     ["What's the gotcha with && in conditional rendering?", "If the left side is 0, React renders the 0. Use {items.length > 0 && ...} instead of {items.length && ...}."]],
 x: ["onClick={doSomething()} running on every render instead of on click", "{count && <p>...</p>} showing a stray 0 on the screen"],
 d: "Your FAQ items open and close, and your login toggle swaps the message and button.",
 min: 60
},
"w7-6": {
 m: "Feeds, product grids, comment threads: lists are everywhere, and map() plus a key is how React draws them.",
 e: "To show a list in React, you take an array of data and use map() to turn each item into JSX. React needs a key on each item: a unique, stable id so it can track which item is which when the list changes, like name tags at a conference. Without keys, React might mix items up when you add or delete them.",
 k: ["{products.map((p) => <ProductCard key={p.id} {...p} />)}", "key must be unique among siblings and stable: use an id from your data", "Avoid using the array index as a key when items can be added, removed or reordered", "Filter before mapping: products.filter(p => p.inStock).map(...)", "The key goes on the outermost element returned from map"],
 t: ["Create an array of 6 product objects with id, name, price and category", "Render them as ProductCard components with map and a key", "Add a search box (state) that filters the products by name as you type", "Add category buttons (All, Electronics, Books) that filter the list", "Add a delete button on each card that removes it from state", "Show \"No products found\" when the filtered list is empty"],
 c: `import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Mouse", price: 699, category: "Electronics" },
  { id: 2, name: "Atomic Habits", price: 399, category: "Books" },
  { id: 3, name: "Keyboard", price: 1499, category: "Electronics" },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const visible = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
      {visible.length === 0 && <p>No products found</p>}
      <ul>
        {visible.map((p) => (
          <li key={p.id}>
            {p.name}: ₹{p.price}
            <button onClick={() => setProducts(products.filter((x) => x.id !== p.id))}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
 q: [["Why does React need keys in lists?", "Keys let React identify which items changed, were added or were removed between renders, so it can update the DOM efficiently and keep each item's state attached to the right element."],
     ["Why is using the index as a key a problem?", "If items are inserted, deleted or reordered, indexes shift. React then matches the wrong elements, which can cause bugs like inputs keeping the wrong values."]],
 x: ["Forgetting the key, which shows a warning in the Console", "Using Math.random() as a key, which creates a new key every render and defeats the purpose", "Keeping a separate \"filteredProducts\" state that gets out of sync. Calculate it from state instead"],
 d: "Your product list renders from data, filters as you type, and deletes items correctly.",
 min: 75
},
"w7-p": {
 m: "Your first React app from scratch. After this, you're officially a React beginner, not a total beginner.",
 e: "You'll build a flashcard study app: a deck of question-and-answer cards. Click a card to flip it and reveal the answer, move to the next card, mark cards as \"known\", and add new cards with a simple form. It uses components, props, state, events, conditional rendering and lists: the whole week in one app.",
 k: ["Plan components first: App, Flashcard, CardForm, ProgressBar", "Keep the cards array in App's state and pass data down as props", "Pass functions as props so children can ask the parent to change state", "Save cards to localStorage so they survive a refresh"],
 t: ["Sketch the screens and list the components", "Store cards as [{ id, question, answer, known }] in App state", "Build Flashcard: shows the question, flips to the answer on click", "Add Previous / Next buttons and a \"3 of 10\" counter", "Add a \"Got it\" button that marks a card known, and show progress", "Build CardForm to add new cards", "Save to localStorage, deploy with Vercel or GitHub Pages, and add it to your portfolio"],
 c: `function Flashcard({ card, onKnown }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flashcard" onClick={() => setFlipped(!flipped)}>
      <p>{flipped ? card.answer : card.question}</p>
      <small>{flipped ? "Answer" : "Click to reveal"}</small>
      {flipped && (
        <button onClick={(e) => { e.stopPropagation(); onKnown(card.id); }}>
          ✅ Got it
        </button>
      )}
    </div>
  );
}`,
 q: [["How do child components update the parent's state?", "The parent passes a callback function as a prop. The child calls it, for example onKnown(id), and the parent updates its own state, which flows back down as new props."],
     ["How did you decide where state should live?", "In the closest common parent of every component that needs it. The cards array lives in App because the card, the progress bar and the form all need it."]],
 x: ["Putting every piece of state in every component", "Building everything in one 300-line App.jsx file"],
 d: "Your flashcard app flips, navigates, tracks progress, adds cards, remembers them, and is live.",
 min: 240
},

/* ---------- Week 8: React in depth ---------- */
"w8-1": {
 m: "Signup, checkout, search: every important action in an app goes through a form.",
 e: "In React, the usual way to build forms is \"controlled inputs\": the input's value comes from state, and every keystroke updates the state through onChange. React becomes the single source of truth, a bit like a teacher writing on the board everything a student says out loud. This makes it easy to validate as the user types, clear the form, or show the value somewhere else.",
 k: ["value={email} plus onChange={(e) => setEmail(e.target.value)} = a controlled input", "One state object for the whole form: const [form, setForm] = useState({ name: \"\", email: \"\" })", "Generic handler: setForm({ ...form, [e.target.name]: e.target.value })", "onSubmit on the <form> with e.preventDefault()", "Checkboxes use checked and e.target.checked instead of value"],
 t: ["Build a signup form with name, email, password and an \"I agree\" checkbox", "Use one form state object and one handleChange function", "Show validation errors: email must contain @, password at least 8 characters", "Disable the submit button until the form is valid", "On submit, show a success message and clear the form", "Show a live password-strength label as the user types"],
 c: `import { useState } from "react";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });
  const [done, setDone] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  const errors = {};
  if (form.email && !form.email.includes("@")) errors.email = "Enter a valid email";
  if (form.password && form.password.length < 8) errors.password = "At least 8 characters";
  const valid = form.name && form.email && form.password && form.agree && !Object.keys(errors).length;

  function handleSubmit(e) {
    e.preventDefault();
    setDone(true);
    setForm({ name: "", email: "", password: "", agree: false });
  }

  if (done) return <p>🎉 Account created!</p>;
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      {errors.email && <small>{errors.email}</small>}
      <input name="password" type="password" value={form.password} onChange={handleChange} />
      {errors.password && <small>{errors.password}</small>}
      <label><input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} /> I agree</label>
      <button disabled={!valid}>Sign up</button>
    </form>
  );
}`,
 q: [["What is a controlled component?", "A form input whose value is driven by React state, updated through onChange. React state is the single source of truth for the input's value."],
     ["Controlled vs uncontrolled inputs?", "Controlled inputs keep their value in state. Uncontrolled inputs keep it in the DOM, and you read it with a ref when needed. Controlled is the default choice for validation and dynamic UIs."],
     ["How do you handle many inputs with one change handler?", "Give each input a name that matches a key in a form state object, and update with setForm({ ...form, [e.target.name]: e.target.value })."]],
 x: ["value without onChange, which makes the input read-only", "Forgetting preventDefault, so the page reloads", "Overwriting the whole form object instead of spreading the old values"],
 d: "Your signup form validates as the user types and only submits valid data.",
 min: 75
},
"w8-2": {
 m: "useEffect is how your components reach outside React: loading data, starting timers, talking to the world.",
 e: "Rendering should only calculate what to show. Anything else, like fetching data from an API, is a \"side effect\". useEffect runs your side effect after React has put things on the screen. The dependency array (the [ ] at the end) tells React when to run it again: [] means only once when the component first appears, [city] means again whenever city changes.",
 k: ["useEffect(() => { ... }, []): run once after the first render", "useEffect(() => { ... }, [query]): run again whenever query changes", "You can't make the effect function itself async: define an async function inside and call it", "Return a cleanup function to stop timers or ignore stale responses", "Most effects in beginner apps are for fetching data. Keep three states: data, loading, error"],
 t: ["Fetch users from jsonplaceholder in useEffect with [] and show them", "Add loading and error states", "Add a user-id input and fetch that user's posts whenever it changes (dependency array)", "Build a clock with setInterval in useEffect, and clear it in the cleanup", "Add console.log inside an effect to see when it runs", "Notice that in development React runs effects twice on purpose (Strict Mode), to help you find bugs"],
 c: `import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to load");
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []); // [] = run once

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
 q: [["What is useEffect used for?", "Running side effects after render: fetching data, subscriptions, timers, or syncing with external systems. The dependency array controls when it re-runs, and the returned function handles cleanup."],
     ["What happens if you leave out the dependency array?", "The effect runs after every render. If it also sets state, that can cause an infinite loop."],
     ["Why can't you pass an async function directly to useEffect?", "An async function returns a Promise, but useEffect expects either nothing or a cleanup function. Define an async function inside the effect and call it."]],
 x: ["Setting state in an effect with no dependency array, which loops forever", "Missing a dependency, so the effect uses an old value", "Forgetting to clear intervals, so they pile up"],
 d: "Your component loads data with loading and error states, and re-fetches when an input changes.",
 min: 75
},
"w8-3": {
 m: "Good React apps aren't about clever code. They're about putting state in the right place.",
 e: "When two components need the same data, like a search box and a results list, the state can't live in either one. You \"lift it up\" to their closest shared parent, which passes the value down to one and an updater function to the other. React's official guide calls this process \"Thinking in React\": break the design into components, find the minimal state, decide where it lives, and pass data down.",
 k: ["Data flows down through props. Requests to change flow up through callback props", "Lift state to the closest common parent of the components that need it", "Keep state minimal: don't store what you can calculate (like a filtered list or a total)", "A component should do one job. If it's getting long, split it", "Name callback props onSomething: onSearch, onAdd, onDelete"],
 t: ["Read \"Thinking in React\" on react.dev (link in resources)", "Build a SearchBar component and a ProductList component as siblings", "Lift the search state into App, pass search and setSearch to SearchBar, and the filtered list to ProductList", "Add a CartSummary sibling that shows the total of items added from ProductList", "Remove any state that could be calculated instead", "Draw the component tree and mark where each piece of state lives"],
 c: `function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const visible = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  const total = cart.reduce((sum, item) => sum + item.price, 0); // calculated, not stored

  return (
    <>
      <SearchBar value={search} onSearch={setSearch} />
      <ProductList products={visible} onAdd={(p) => setCart([...cart, p])} />
      <CartSummary count={cart.length} total={total} />
    </>
  );
}

function SearchBar({ value, onSearch }) {
  return <input value={value} onChange={(e) => onSearch(e.target.value)} placeholder="Search" />;
}`,
 q: [["What does \"lifting state up\" mean?", "Moving shared state to the closest common ancestor of the components that need it, then passing the value and updater functions down as props."],
     ["What is prop drilling, and how do you avoid it?", "Passing props through many layers of components that don't use them, just to reach a deep child. It can be avoided with component composition or the Context API."],
     ["What is derived state, and why avoid storing it?", "Values you can calculate from existing state or props, like totals or filtered lists. Storing them separately risks them getting out of sync, so calculate them during render."]],
 x: ["Storing filteredProducts in its own state", "Huge components that do everything"],
 d: "Your search bar, product list and cart summary share state through their parent and stay in sync.",
 min: 60
},
"w8-4": {
 m: "Real apps have many pages. React Router lets your single-page app feel like a full website.",
 e: "A React app is technically one HTML page. React Router swaps components based on the URL, so /about shows the About component and /products/5 shows product 5, without reloading the browser. It's like a TV remote: changing channels without turning the TV off and on. URL parameters (:id) let one page component show any item.",
 k: ["npm install react-router-dom", "<BrowserRouter> wraps the app. <Routes> and <Route path=\"/about\" element={<About />} /> define pages", "<Link to=\"/about\"> instead of <a href>, so the page doesn't reload", "Dynamic routes: path=\"/products/:id\", then const { id } = useParams()", "useNavigate() to go to a page from code, for example after a form submit. path=\"*\" for a 404 page"],
 t: ["Install react-router-dom in a new Vite project", "Create Home, About and Products pages and a Navbar with Links", "Add a ProductDetail page at /products/:id that reads the id with useParams", "Link each product in the list to its detail page", "Add a 404 Not Found page", "Use useNavigate to go back to the home page after a button click"],
 c: `// main.jsx
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <BrowserRouter><App /></BrowserRouter>
);

// App.jsx
import { Routes, Route, Link, useParams } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> <Link to="/products">Products</Link> <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </>
  );
}

function ProductDetail() {
  const { id } = useParams();
  return <h2>Product #{id}</h2>;
}`,
 q: [["What is client-side routing?", "Changing the view based on the URL in JavaScript, without asking the server for a new HTML page. It makes navigation instant, and it's what makes a single-page application (SPA) feel like a multi-page site."],
     ["Why use <Link> instead of <a>?", "An <a> tag triggers a full page reload, losing app state. <Link> updates the URL and renders the new route instantly."],
     ["How do you read URL parameters in React Router?", "Define the route with a placeholder like /products/:id, then call useParams() in the component to get { id }."]],
 x: ["Using <a href> and losing all state on every click", "Forgetting to wrap the app in BrowserRouter", "404 errors when refreshing a deployed SPA (you'll fix that with a rewrite rule when you deploy)"],
 d: "Your app has 4 pages, a working navbar, a dynamic product page and a 404 page.",
 min: 75
},
"w8-5": {
 m: "Tailwind lets you style as fast as you can think, and many job listings ask for it.",
 e: "Tailwind CSS is a big set of tiny ready-made CSS classes, each doing one thing: p-4 adds padding, text-xl makes text bigger, bg-blue-500 sets a background colour, flex turns on Flexbox. Instead of writing CSS files, you combine these classes right in your JSX. It looks messy at first, but you never have to invent class names or jump between files, and everything stays consistent.",
 k: ["Utility classes: p-4 (padding), m-2 (margin), text-lg, font-bold, rounded-xl, shadow", "Layout: flex, items-center, justify-between, gap-4, grid, grid-cols-3", "Responsive prefixes: md:grid-cols-3 means \"3 columns on medium screens and up\" (mobile-first, like you learned in week 2)", "State prefixes: hover:bg-blue-600, focus:ring", "Install the Tailwind CSS IntelliSense extension in VS Code for autocomplete"],
 t: ["Add Tailwind to a Vite project following the official Vite guide (npm install tailwindcss @tailwindcss/vite, add the plugin, @import \"tailwindcss\" in your CSS)", "Restyle your ProfileCard using only Tailwind classes", "Build a responsive product grid: 1 column on phones, 2 on tablets, 3 on desktops", "Style a button with hover and focus states", "Build a navbar with your logo on the left and links on the right", "Compare: how long did it take versus writing CSS by hand?"],
 c: `// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({ plugins: [react(), tailwindcss()] });

// src/index.css
// @import "tailwindcss";

// a product card with Tailwind
function ProductCard({ name, price }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-gray-500">₹{price}</p>
      <button className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
        Add to cart
      </button>
    </div>
  );
}

// responsive grid
// <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">...</div>`,
 q: [["What is Tailwind CSS?", "A utility-first CSS framework that provides small single-purpose classes you combine in your markup. It speeds up styling, keeps designs consistent, and removes unused classes from the production build."],
     ["What are the pros and cons of utility-first CSS?", "Pros: fast development, consistency, no naming, small production CSS. Cons: long class lists, a learning curve, and markup that can look cluttered. Extracting repeated patterns into components helps."]],
 x: ["Skipping CSS basics because Tailwind exists. You still need to understand Flexbox, Grid and the box model", "Building class names dynamically like bg-\${color}-500, which Tailwind can't detect"],
 d: "Your product grid is fully styled with Tailwind and changes column count across screen sizes.",
 min: 75
},
"w8-6": {
 m: "When you copy the same logic into three components, it's time for a custom hook.",
 e: "A custom hook is a function whose name starts with use, and which uses other hooks inside it. It's like writing your own kitchen gadget: if you keep doing the same chopping-and-mixing steps for every recipe, you build a machine that does it in one go. A useFetch hook can handle loading, errors and data for any URL, so each component just says const { data, loading } = useFetch(url).",
 k: ["Custom hooks share logic, not state: each component that uses one gets its own copy", "Name must start with use so React can check the rules of hooks", "Return whatever is useful: a value, an array like useState, or an object", "Common examples: useFetch, useLocalStorage, useDebounce, useToggle"],
 t: ["Write useToggle(initial) that returns [value, toggle]", "Write useLocalStorage(key, initial) that works like useState but saves to localStorage", "Write useFetch(url) that returns { data, loading, error }", "Replace the fetch logic in your Users component with useFetch", "Use useLocalStorage to remember a dark-mode setting"],
 c: `// src/hooks/useFetch.js
import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;           // ignore old responses if url changes
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then((json) => { if (!ignore) setData(json); })
      .catch((err) => { if (!ignore) setError(err.message); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [url]);

  return { data, loading, error };
}

// src/hooks/useLocalStorage.js
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) ?? initial);
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}`,
 q: [["What is a custom hook?", "A JavaScript function starting with use that calls other hooks, so stateful logic can be reused across components. Each component calling it gets its own independent state."],
     ["What are the rules of hooks?", "Only call hooks at the top level of a component or custom hook, never inside loops, conditions or nested functions, and only call them from React functions. This keeps the order of hooks the same on every render."]],
 x: ["Naming it fetchData instead of useFetch", "Expecting two components using the same hook to share state (they don't. Use Context for that)"],
 d: "useFetch and useLocalStorage work and are used in at least two components.",
 min: 60
},
"w8-p": {
 m: "A multi-page, data-driven, styled React app. This is what junior React job tasks look like.",
 e: "You'll build a movie search app using a free movie API (TMDB or OMDb, both free with a sign-up key). Users search for a movie, see results as a grid of posters, click one to open a details page, and save favourites. It brings together forms, useEffect, React Router, Tailwind and custom hooks.",
 k: ["Routes: / (search), /movie/:id (details), /favourites", "Debounce the search: wait until the user stops typing for 400ms before fetching", "Favourites saved with your useLocalStorage hook", "Store the API key in a .env file as VITE_TMDB_KEY and read it with import.meta.env.VITE_TMDB_KEY"],
 t: ["Sign up for a free API key at themoviedb.org or omdbapi.com", "Create the project with Vite, Tailwind and React Router", "Build the search page with a controlled input and a poster grid", "Build the details page that reads :id with useParams and fetches full details", "Add favourites with a ❤️ button and a Favourites page", "Handle loading, empty and error states everywhere", "Deploy to Vercel (add the API key in Vercel's environment variables) and add it to your portfolio"],
 c: `// .env  (add .env to .gitignore!)
// VITE_TMDB_KEY=your_key_here

const KEY = import.meta.env.VITE_TMDB_KEY;

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const q = useDebounce(query);
  const url = \`https://api.themoviedb.org/3/search/movie?api_key=\${KEY}&query=\${encodeURIComponent(q)}\`;
  const { data, loading } = useFetch(url);
  // render input + grid of <Link to={\`/movie/\${m.id}\`}> posters
}`,
 q: [["What is debouncing and why use it in search?", "Debouncing waits until the user has stopped typing for a short time before running an action. It avoids sending a request on every keystroke, which saves API calls and avoids flickering results."],
     ["Are environment variables in a Vite frontend secret?", "No. Anything with the VITE_ prefix is bundled into the JavaScript and visible to anyone. They keep keys out of your Git repo, but truly secret keys must live on a backend."]],
 x: ["Fetching on every keystroke", "Committing .env to GitHub", "No empty state when a search finds nothing"],
 d: "Your movie app searches, shows details, saves favourites, and is live on Vercel.",
 min: 240
},

/* ---------- Week 9: React for real apps ---------- */
"w9-1": {
 m: "Some data, like the logged-in user, the theme or the cart, is needed everywhere. Context delivers it without the relay race.",
 e: "Passing props through five layers of components that don't need them (prop drilling) is like passing a note across a classroom through every desk. Context is a noticeboard on the wall: you pin the data up once at the top of your app (the Provider), and any component, however deep, can read it with useContext. It's perfect for things the whole app needs: the current user, the theme, the language, the shopping cart.",
 k: ["const CartContext = createContext()", "Wrap the app: <CartContext.Provider value={{ cart, addToCart }}>", "Read anywhere: const { cart } = useContext(CartContext)", "Common pattern: a CartProvider component plus a useCart() custom hook", "Don't put everything in Context: only data that many distant components need"],
 t: ["Create a ThemeContext with light and dark, and a toggle button deep in the tree", "Create CartContext with cart, addToCart and removeFromCart", "Write a CartProvider component and a useCart hook", "Show the cart count in the Navbar and add items from a ProductCard without passing props through App", "Remove the old prop drilling from last week's code"],
 c: `// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => setCart((c) => [...c, product]);
  const removeFromCart = (id) => setCart((c) => c.filter((p) => p.id !== id));
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

// main.jsx:  <CartProvider><App /></CartProvider>
// Navbar.jsx: const { cart } = useCart();  →  🛒 {cart.length}`,
 q: [["What is the Context API?", "A built-in React feature for sharing values across the component tree without passing props through every level. A Provider supplies the value, and useContext reads it."],
     ["When should you use Context versus props?", "Props for data used by a component and its near children. Context for truly global data used by many distant components, like auth, theme or locale."],
     ["What are the downsides of Context?", "Every component using a context re-renders when its value changes, and overusing it makes data flow harder to follow. For complex or frequently changing global state, libraries like Redux Toolkit or Zustand can help."]],
 x: ["Forgetting to wrap the app in the Provider, so useContext returns null", "Putting all app state into one giant context"],
 d: "Your Navbar shows the cart count, and ProductCards add to the cart with no prop drilling.",
 min: 75
},
"w9-2": {
 m: "When state changes in many different ways, a reducer turns chaos into a clear list of rules.",
 e: "useReducer is like useState, but for state with many kinds of changes. Instead of calling setCart directly from ten places, components send \"actions\" (messages like { type: \"add\", product }) to one reducer function. The reducer is a rulebook: given the current state and an action, it returns the new state. It's like a bank: you don't change your balance yourself, you submit a deposit or withdrawal slip and the bank applies the rules.",
 k: ["const [state, dispatch] = useReducer(reducer, initialState)", "dispatch({ type: \"add\", payload: product }) sends an action", "The reducer is a pure function: (state, action) => newState, using a switch on action.type", "Never mutate state in the reducer: return new arrays and objects", "This is the same idea Redux is built on"],
 t: ["Rewrite your cart with useReducer: add, remove, increase quantity, decrease quantity, clear", "Store items as { id, name, price, qty } so adding the same product increases qty", "Calculate the total and item count from the state", "Combine it with Context: put state and dispatch in CartContext", "Write down each action type and what it does: this is your cart's \"API\""],
 c: `function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((i) => (i.id === existing.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "decrease":
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.id !== action.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

const [cart, dispatch] = useReducer(cartReducer, []);
dispatch({ type: "add", payload: { id: 1, name: "Mouse", price: 699 } });`,
 q: [["When would you use useReducer instead of useState?", "When state has several related values or many different update types, or when the next state depends on complex logic. It centralises the update rules in one testable function."],
     ["What is a pure function, and why must reducers be pure?", "A function that always returns the same output for the same inputs and has no side effects. Reducers must be pure so state changes are predictable, testable and work with React's rendering."]],
 x: ["Mutating state inside the reducer with push or direct assignment", "Forgetting the default case", "Doing API calls inside the reducer"],
 d: "Your cart supports add, decrease, remove and clear through one reducer, with correct quantities.",
 min: 75
},
"w9-3": {
 m: "Users forgive slow. They don't forgive confusing. Good loading, error and empty states make an app feel professional.",
 e: "Every piece of data in an app is in one of four states: still loading, failed, loaded but empty, or loaded with content. Beginners only design the last one. Professionals design all four: a skeleton or spinner while loading, a clear message with a \"Try again\" button on failure, a friendly prompt when there's nothing yet (\"No orders yet. Start shopping!\"), and the real content. This is UX, user experience.",
 k: ["Loading: skeletons (grey placeholder shapes) feel faster than spinners", "Error: say what happened in plain words and offer a retry", "Empty: explain why it's empty and what to do next", "Disable buttons during submits so users can't double-click", "Toast notifications for quick feedback: \"Added to cart ✓\""],
 t: ["Build a reusable <Spinner /> and a <Skeleton /> card component", "Build an <ErrorMessage message onRetry /> component with a Try again button", "Build an <EmptyState /> component with an icon, a message and an action button", "Use all three in your movie or product app", "Add a simple toast that appears for 2 seconds when an item is added to the cart", "Throttle to Slow 4G in DevTools and check every screen"],
 c: `function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
      <p>😕 {message}</p>
      {onRetry && <button onClick={onRetry} className="mt-2 underline">Try again</button>}
    </div>
  );
}

function EmptyState({ title, action }) {
  return (
    <div className="py-12 text-center text-gray-500">
      <p className="text-4xl">🛒</p>
      <p className="mt-2">{title}</p>
      {action}
    </div>
  );
}

// usage
if (loading) return <SkeletonGrid count={6} />;
if (error) return <ErrorMessage message="Couldn't load products." onRetry={reload} />;
if (!items.length) return <EmptyState title="Your cart is empty" action={<Link to="/">Start shopping</Link>} />;`,
 q: [["How do you handle loading and error states in React?", "Track loading, error and data in state (or use a data-fetching library). Render a skeleton or spinner while loading, an error message with retry on failure, an empty state when there's no data, and the content otherwise."],
     ["What is a skeleton screen?", "A placeholder that mimics the layout of content while it loads. It reduces perceived waiting time and avoids layout jumps compared to a blank screen or a spinner."]],
 x: ["A blank white screen while loading", "Error messages like \"undefined\" or raw stack traces", "No empty state, so a new user sees nothing and doesn't know what to do"],
 d: "Every data screen in your app has a designed loading, error and empty state.",
 min: 60
},
"w9-4": {
 m: "Code is read far more often than it's written. Clean structure is a gift to your future self and your teammates.",
 e: "As apps grow, a messy folder becomes a maze. A clear project structure is like a well-organised kitchen: everyone knows where the spoons are. ESLint is a spell-checker for code that catches bugs and bad patterns. Prettier formats your code automatically so it always looks the same. Together they make your code look like a professional's, and recruiters reading your GitHub will notice.",
 k: ["A common structure: src/components, src/pages, src/hooks, src/context, src/services (API calls), src/utils", "One component per file, named the same as the component: ProductCard.jsx", "ESLint finds problems (unused variables, missing hook dependencies). Prettier formats", "Keep API calls out of components: put them in services/api.js", "Meaningful names: handleAddToCart, isLoading, products, not x, data2, temp"],
 t: ["Reorganise your movie or cart app into components, pages, hooks, context and services folders", "Move all fetch calls into src/services/api.js", "Run npm run lint (Vite projects include ESLint) and fix every warning", "Add Prettier with a .prettierrc file and format the whole project", "Rename any unclear variables and functions", "Write a clear README: features, screenshots, how to run, tech stack"],
 c: `src/
├── components/        # reusable UI: Button, ProductCard, Navbar
├── pages/             # one per route: Home, ProductDetail, Cart
├── hooks/             # useFetch, useLocalStorage, useDebounce
├── context/           # CartContext, AuthContext
├── services/          # api.js: every fetch call lives here
├── utils/             # formatPrice, helpers
├── App.jsx
└── main.jsx

// src/services/api.js
const BASE = "https://fakestoreapi.com";
export async function getProducts() {
  const res = await fetch(\`\${BASE}/products\`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

// .prettierrc
// { "semi": true, "singleQuote": false, "printWidth": 100 }`,
 q: [["How do you structure a React project?", "Group by type for small apps (components, pages, hooks, context, services) or by feature for larger ones (features/cart, features/auth). Keep components small, API calls in a service layer, and shared helpers in utils."],
     ["What is the difference between ESLint and Prettier?", "ESLint analyses code for possible bugs and bad practices, like unused variables or broken hook rules. Prettier only formats code style, like spacing, quotes and line length."]],
 x: ["One giant components folder with 40 files", "Fetch calls scattered across many components", "Ignoring lint warnings until there are 200 of them"],
 d: "Your project is organised into clear folders, passes ESLint with no warnings and is formatted with Prettier.",
 min: 60
},
"w9-5": {
 m: "Fast apps feel better and rank better. Learn the basics of why React re-renders and how to measure it.",
 e: "A component re-renders when its state changes, its parent re-renders, or a context it uses changes. Usually that's fine: React is fast. But if a slow calculation runs on every render, the app can feel sluggish. useMemo remembers the result of a calculation until its inputs change, like writing an answer on a sticky note instead of solving the sum again. The rule: measure first with React DevTools, then optimise.",
 k: ["Re-render triggers: own state change, parent re-render, context change", "useMemo(() => expensiveCalc(items), [items]) caches a calculated value", "React.memo(Component) skips re-rendering if props haven't changed", "useCallback caches a function so memoised children don't re-render", "Don't optimise by default: measure with the React DevTools Profiler first. Lazy-load big pages with React.lazy"],
 t: ["Install the React Developer Tools browser extension", "Turn on \"Highlight updates when components render\" and click around your app", "Use the Profiler tab to record an interaction and find the slowest component", "Wrap an expensive filter or sort in useMemo", "Lazy-load one page with React.lazy and Suspense and see it load as a separate file in the Network tab", "Run Lighthouse on the production build (npm run build, then npm run preview)"],
 c: `import { useMemo, lazy, Suspense } from "react";

function ProductList({ products, search, sortBy }) {
  // only recalculates when products, search or sortBy change
  const visible = useMemo(() => {
    return products
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name)));
  }, [products, search, sortBy]);

  return visible.map((p) => <ProductCard key={p.id} {...p} />);
}

// lazy-load a heavy page: it downloads only when visited
const Admin = lazy(() => import("./pages/Admin"));

<Suspense fallback={<p>Loading...</p>}>
  <Admin />
</Suspense>`,
 q: [["What causes a React component to re-render?", "A change in its own state, its parent re-rendering, or a change in a context it consumes. Changing props come from the parent re-rendering."],
     ["What is the difference between useMemo and useCallback?", "useMemo caches the result of a calculation. useCallback caches the function itself. useCallback(fn, deps) is the same as useMemo(() => fn, deps)."],
     ["What is code splitting?", "Splitting the JavaScript bundle into smaller chunks loaded on demand, for example with React.lazy and dynamic import(), so the first page loads faster."]],
 x: ["Wrapping everything in useMemo and useCallback \"just in case\", which adds complexity for no gain", "Optimising without measuring", "Judging performance in dev mode, which is slower than production"],
 d: "You've profiled your app, memoised one expensive calculation and lazy-loaded one page.",
 min: 60
},
"w9-6": {
 m: "Your React app deserves a real URL. Vercel deploys it in minutes, free, and updates on every push.",
 e: "npm run build turns your React code into a small set of optimised HTML, CSS and JavaScript files in a dist folder: the version real users get. Vercel is a hosting platform that connects to your GitHub repo, runs the build for you, and gives you a live URL. Every time you push to GitHub, Vercel redeploys automatically. That's called continuous deployment.",
 k: ["npm run build creates the production files in dist/. npm run preview tests them locally", "Vercel: import your GitHub repo, it detects Vite, and you click Deploy", "Environment variables (VITE_...) are added in Vercel's project settings, not committed", "SPA routing on refresh needs a rewrite rule so every URL serves index.html", "Every push to main redeploys, and pull requests get preview URLs"],
 t: ["Run npm run build and look inside dist/", "Run npm run preview and test the production version", "Sign up at vercel.com with your GitHub account", "Import your movie app repo and deploy it", "Add your API key as an environment variable in Vercel and redeploy", "Add a vercel.json rewrite so refreshing /movie/123 works", "Push a small change and watch it go live automatically"],
 c: `# build locally to check for errors
npm run build
npm run preview

// vercel.json (in the project root): makes React Router URLs work on refresh
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`,
 q: [["What happens when you run npm run build?", "The bundler (Vite) compiles JSX, bundles and minifies the JavaScript and CSS, splits code into chunks, adds content hashes to file names for caching, and writes static files into dist/."],
     ["Why do SPAs need a rewrite rule when deployed?", "The server only has index.html. Refreshing /products/5 asks the server for that path, which doesn't exist, so it returns 404. The rewrite serves index.html for every path and lets React Router handle it."],
     ["What is CI/CD?", "Continuous integration and continuous deployment: automatically building and testing code on every push, and deploying it when it passes."]],
 x: ["The build failing because of an ESLint error or a wrong import case (Mac is forgiving about file name case, Linux servers aren't)", "Forgetting to add environment variables in Vercel", "404s on refresh because there's no rewrite"],
 d: "Your app is live on Vercel, routes work on refresh, and pushes deploy automatically.",
 min: 60
},
"w9-p": {
 m: "End of Phase 3: a polished, deployed React app you'd be proud to show in an interview.",
 e: "You'll build a shopping cart app using the free Fake Store API (fakestoreapi.com). Users browse products by category, search, view product details, add items to a cart with quantities, see the total, and \"check out\". It uses Context + useReducer for the cart, React Router for pages, Tailwind for styling, custom hooks, and good loading, error and empty states. Then you deploy it.",
 k: ["Pages: Home (product grid), Product detail, Cart, Checkout success", "CartContext with a reducer: add, decrease, remove, clear", "Persist the cart in localStorage", "Clean structure: components, pages, hooks, context, services"],
 t: ["Plan the pages, components and cart actions on paper", "Build the services layer: getProducts, getProduct(id), getCategories", "Build the product grid with category filter and search", "Build the product detail page with an Add to cart button", "Build the cart page: quantities, remove, total and a Checkout button that clears the cart and shows a success page", "Add loading skeletons, error retry and an empty-cart state", "Persist the cart, deploy to Vercel, write a README with screenshots, and add it to your portfolio", "Post on LinkedIn: Phase 3 complete"],
 c: `// cart total and count, calculated from state
const { cart } = useCart();
const count = cart.reduce((n, item) => n + item.qty, 0);
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

// formatting money properly
const formatPrice = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);

formatPrice(1499.5); // "₹1,499.50"`,
 q: [["How did you manage cart state in your app?", "With useReducer for predictable updates (add, decrease, remove, clear), exposed through a CartContext so any component can read or dispatch, and synced to localStorage in a useEffect so the cart survives a refresh."],
     ["What would you add to make this production-ready?", "A real backend for products and orders, user accounts, payment integration (like Razorpay or Stripe), server-side validation of prices, tests, and analytics."]],
 x: ["Calculating the total in several places instead of one", "No README or screenshots", "Leaving console errors and warnings in the deployed app"],
 d: "Your shopping cart app is live, polished, has a README with screenshots, and is in your portfolio.",
 min: 240
}
};
