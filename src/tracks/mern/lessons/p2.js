/* MERN Phase 2: JavaScript (Weeks 4-6)
   Code samples use normal template literals: backticks and ${ inside code are escaped. */
export default {

/* ---------- Week 4: JavaScript fundamentals ---------- */
"w4-1": {
 m: "HTML is the body, CSS is the clothes, JavaScript is the brain. This week your pages start thinking.",
 e: "JavaScript (JS) is a real programming language that runs in every browser. It's what makes a page respond: menus that open, likes that count up, forms that check your input. It's also the only language in the MERN stack: React, Node and Express are all JavaScript. console.log() is how JavaScript talks back to you: it prints a message to the Console in DevTools, like a note to yourself.",
 k: ["JavaScript has nothing to do with Java: the name was a 1995 marketing trick", "Add JS to a page with <script src=\"app.js\"></script> just before </body>", "console.log(\"hello\") prints to the DevTools Console", "Lines usually end with a semicolon ;", "// starts a comment: a note for humans that the computer ignores"],
 t: ["Create a folder js-practice with index.html and app.js", "Link app.js with a <script> tag just before </body>", "In app.js write console.log(\"Hello from JavaScript!\"), open the page with Live Server and check the Console", "Log your name, your age, and the result of 365 * 24", "Try typing JavaScript directly into the Console: 10 + 5, \"Hi \" + \"there\"", "Make a deliberate mistake (remove a quote) and read the red error message"],
 c: `// app.js
console.log("Hello from JavaScript!");
console.log("My name is Priya");
console.log(365 * 24);          // hours in a year
console.log("2" + "2");         // "22": text joins, it doesn't add!
console.log(2 + 2);             // 4`,
 q: [["What is JavaScript?", "A high-level, dynamically typed programming language that runs in every web browser and, through Node.js, on servers. It makes web pages interactive."],
     ["Where can JavaScript run?", "In browsers (frontend), on servers with Node.js (backend), in mobile apps (React Native), desktop apps (Electron) and more."],
     ["Why put the script tag at the end of the body?", "So the HTML loads and displays first, and the elements exist when the script runs. The modern alternative is <script defer> in the head."]],
 x: ["Linking the script before the HTML it needs exists", "Not opening the Console, so you never see your output or your errors"],
 d: "You've printed messages to the Console from your own app.js file and read your first error message.",
 min: 45
},
"w4-2": {
 m: "Every app is just data being stored and changed. Variables are where you keep that data.",
 e: "A variable is a labelled jar. You put a value inside and give the jar a name so you can find it later. const makes a sealed jar: the value can't be swapped. let makes a jar you can refill. Values come in types: strings (text, in quotes), numbers, and booleans (true or false, like a light switch). There's also undefined (an empty jar) and null (a jar you deliberately emptied).",
 k: ["const for values that won't change (use it by default), let for values that will", "Avoid var: it's the old way and has confusing rules", "Strings: \"Hello\" or 'Hello' or \`Hello \${name}\` (template literal, lets you insert values)", "Numbers: 42, 3.14. Booleans: true, false", "typeof value tells you the type. Names use camelCase: firstName, totalPrice"],
 t: ["Create const variables for your name and city, and a let variable for your age", "Log a sentence using a template literal: \`I'm Priya from Hyderabad\`", "Change age with age = age + 1 and log it", "Try changing a const and read the error", "Use typeof on a string, a number and a boolean", "Make a shopping calculator: price, quantity, total = price * quantity, then log it with a ₹ symbol"],
 c: `const name = "Priya";
const city = "Hyderabad";
let age = 24;

console.log(\`I'm \${name} from \${city}, age \${age}\`);

age = age + 1;          // happy birthday!
console.log(age);       // 25

const price = 249;
const quantity = 3;
const total = price * quantity;
console.log(\`Total: ₹\${total}\`);   // Total: ₹747

console.log(typeof name);    // "string"
console.log(typeof total);   // "number"
console.log(typeof true);    // "boolean"`,
 q: [["What is the difference between let, const and var?", "const and let are block-scoped. const can't be reassigned, let can. var is function-scoped, can be redeclared and is hoisted with undefined, which causes bugs, so modern code uses const by default and let when needed."],
     ["What are JavaScript's primitive data types?", "string, number, boolean, undefined, null, bigint and symbol. Everything else, like arrays, objects and functions, is an object."],
     ["What's the difference between null and undefined?", "undefined means a variable has been declared but not given a value. null is a value you assign on purpose to mean \"nothing\"."]],
 x: ["Forgetting quotes around text: name = Priya looks for a variable called Priya", "Using a template literal with normal quotes: \"Hi \${name}\" doesn't work, it needs backticks", "Adding a number and a string: \"5\" + 3 gives \"53\""],
 d: "Your shopping calculator logs a correct total using variables and a template literal.",
 min: 60
},
"w4-3": {
 m: "Every app makes decisions: logged in or not, in stock or not, pass or fail. Today you teach your code to decide.",
 e: "Operators do maths (+ - * /) and comparisons (is this bigger? equal?). A comparison gives back true or false. An if statement is a fork in the road: if the condition is true, go this way, else go that way. It's exactly how you think: \"if it's raining, take an umbrella, otherwise wear sunglasses\".",
 k: ["Comparisons: > < >= <= and === (equal) !== (not equal)", "Always use === not ==, because == does surprising type conversions", "&& means AND (both must be true), || means OR (at least one), ! means NOT", "if / else if / else chains check conditions top to bottom and run the first match", "% gives the remainder: 10 % 3 is 1. Handy for checking even and odd numbers"],
 t: ["Write a check: if age >= 18 log \"You can vote\", else log \"Not yet\"", "Make a grade checker: 90+ is A, 75+ is B, 50+ is C, else Fail", "Check whether a number is even with num % 2 === 0", "Free delivery rule: if total >= 499 OR the user is a member, delivery is free", "Try 5 == \"5\" and 5 === \"5\" in the Console and see the difference"],
 c: `const marks = 82;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 75) {
  console.log("Grade B");
} else if (marks >= 50) {
  console.log("Grade C");
} else {
  console.log("Fail");
}

const cartTotal = 350;
const isMember = true;

if (cartTotal >= 499 || isMember) {
  console.log("Free delivery 🎉");
} else {
  console.log(\`Add ₹\${499 - cartTotal} more for free delivery\`);
}`,
 q: [["What is the difference between == and ===?", "== compares values after converting types, so 5 == \"5\" is true. === checks value and type without conversion, so 5 === \"5\" is false. Always prefer ===."],
     ["What are truthy and falsy values?", "Values that behave like true or false in a condition. Falsy values are false, 0, \"\" (empty string), null, undefined and NaN. Everything else is truthy, including \"0\" and empty arrays."],
     ["What does the ternary operator do?", "It's a one-line if/else: condition ? valueIfTrue : valueIfFalse, for example const label = age >= 18 ? \"adult\" : \"minor\"."]],
 x: ["Using = (assign) instead of === (compare) inside an if", "Putting conditions in the wrong order, like checking >= 50 before >= 90", "Forgetting curly braces and getting confused about which lines belong to the if"],
 d: "Your grade checker gives the right grade for 95, 80, 60 and 30.",
 min: 60
},
"w4-4": {
 m: "Computers never get bored. Loops let you do something a thousand times with three lines of code.",
 e: "A loop repeats a block of code. A for loop is like \"do 10 push-ups\": you know how many times. A while loop is like \"keep stirring until the sugar dissolves\": you repeat until a condition changes. Loops are how apps show every product in a list, every message in a chat, every row in a table.",
 k: ["for (let i = 1; i <= 10; i++) { } : start at 1, keep going while i <= 10, add 1 each time", "while (condition) { }: repeat while the condition is true", "for (const item of list) { }: go through each item in a list (the one you'll use most)", "break stops a loop early, continue skips to the next round", "An infinite loop (a condition that never becomes false) freezes your tab. Close the tab and fix it"],
 t: ["Print numbers 1 to 10 with a for loop", "Print the 7 times table: 7 x 1 = 7 up to 7 x 10 = 70", "Add up all the numbers from 1 to 100 using a loop (answer: 5050)", "FizzBuzz: for 1–30, print \"Fizz\" for multiples of 3, \"Buzz\" for 5, \"FizzBuzz\" for both, otherwise the number", "Use a while loop to count down from 5 to 1 then print \"Lift off! 🚀\""],
 c: `// times table
for (let i = 1; i <= 10; i++) {
  console.log(\`7 x \${i} = \${7 * i}\`);
}

// sum 1..100
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum = sum + i;
}
console.log(sum);  // 5050

// FizzBuzz, the most famous beginner interview question
for (let n = 1; n <= 30; n++) {
  if (n % 15 === 0) console.log("FizzBuzz");
  else if (n % 3 === 0) console.log("Fizz");
  else if (n % 5 === 0) console.log("Buzz");
  else console.log(n);
}`,
 q: [["Write FizzBuzz.", "Loop 1 to n. Check divisible by 15 first (print FizzBuzz), then 3 (Fizz), then 5 (Buzz), else print the number. Checking 15 first matters, because otherwise multiples of 15 print Fizz."],
     ["What is the difference between for and while loops?", "Use for when you know how many times to repeat or are counting. Use while when you repeat until a condition changes and don't know the count in advance."],
     ["What is an infinite loop?", "A loop whose condition never becomes false, so it runs forever and freezes the program, often because the counter is never updated."]],
 x: ["Off-by-one errors: i < 10 runs 10 times from 0, but i <= 10 runs 11 times", "Forgetting i++ in a while loop and freezing the browser"],
 d: "Your FizzBuzz prints the correct output for 1 to 30 without looking at the solution.",
 min: 60
},
"w4-5": {
 m: "Don't repeat yourself. Write it once as a function, use it a hundred times.",
 e: "A function is a recipe with a name. You write the steps once, then \"cook\" it whenever you want by calling its name. Parameters are the ingredients you hand it (like flour and sugar), and return is the dish it hands back. A function to calculate GST takes a price and returns the price with tax. You can use it for every product in your shop.",
 k: ["Declare: function add(a, b) { return a + b; }", "Call: add(2, 3) gives 5", "Parameters are placeholders, arguments are the real values you pass", "return sends a value back and ends the function. Without return you get undefined", "Arrow function (modern, short): const add = (a, b) => a + b;"],
 t: ["Write greet(name) that returns \`Hello, \${name}!\` and log greet(\"Asha\")", "Write addGST(price) that returns price plus 18%", "Write isEven(n) that returns true or false", "Write celsiusToFahrenheit(c) using F = C × 9/5 + 32", "Rewrite one of them as an arrow function", "Write a function that uses another function (for example, a bill total that calls addGST)"],
 c: `function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("Asha"));   // Hello, Asha!

function addGST(price) {
  return price + price * 0.18;
}
console.log(addGST(1000));   // 1180

// arrow function: the same idea, shorter
const isEven = (n) => n % 2 === 0;
console.log(isEven(4));      // true

const billTotal = (price, qty) => addGST(price * qty);
console.log(billTotal(250, 2));  // 590`,
 q: [["What is a function and why use one?", "A reusable block of code that performs a task, can take inputs (parameters) and can return an output. Functions avoid repetition, organise code and make it easier to test."],
     ["What is the difference between a parameter and an argument?", "A parameter is the variable name in the function definition. An argument is the actual value passed in when you call the function."],
     ["How are arrow functions different from regular functions?", "They're shorter, can return a value without the return keyword in one-liners, and don't have their own this, which makes them handy for callbacks."]],
 x: ["Forgetting return and getting undefined", "Logging inside the function instead of returning the value, so you can't reuse the result", "Calling a function without the brackets: greet instead of greet()"],
 d: "You've written 5 working functions, including one arrow function and one that calls another function.",
 min: 60
},
"w4-6": {
 m: "Shopping carts, chat messages, search results: almost everything in an app is a list.",
 e: "An array is an ordered list kept in one variable, written with square brackets: [\"milk\", \"bread\", \"eggs\"]. Each item has a position number called an index, and counting starts from 0 (not 1). So the first item is list[0]. Arrays have built-in methods to add, remove and find items, like a to-do list you can edit.",
 k: ["const fruits = [\"apple\", \"mango\", \"banana\"]", "fruits[0] is \"apple\", fruits.length is 3", "push() adds to the end, pop() removes from the end", "includes(\"mango\") checks if an item exists, indexOf() finds its position", "Loop through: for (const fruit of fruits) { console.log(fruit) }"],
 t: ["Create an array of 5 of your favourite movies", "Log the first and last item (hint: arr[arr.length - 1])", "Add a movie with push and remove one with pop", "Loop through and print \"1. Movie name\" with a number", "Write a function that takes an array of numbers and returns the biggest one", "Write a function that returns the total of an array of prices"],
 c: `const movies = ["RRR", "3 Idiots", "Dangal"];

console.log(movies[0]);                  // "RRR"
console.log(movies[movies.length - 1]);  // "Dangal"

movies.push("Lagaan");       // add to end
console.log(movies.length);  // 4
console.log(movies.includes("RRR"));  // true

movies.forEach((movie, i) => {
  console.log(\`\${i + 1}. \${movie}\`);
});

function biggest(numbers) {
  let max = numbers[0];
  for (const n of numbers) {
    if (n > max) max = n;
  }
  return max;
}
console.log(biggest([4, 19, 7, 2]));  // 19`,
 q: [["Why do arrays start at index 0?", "The index is the distance from the start of the array, so the first item is 0 steps away. Most programming languages use zero-based indexing."],
     ["How do you find the largest number in an array?", "Loop through, keeping track of the biggest so far, or use Math.max(...arr) with the spread operator."],
     ["What is the difference between push/pop and shift/unshift?", "push and pop add or remove at the end. unshift and shift add or remove at the beginning."]],
 x: ["Trying to get the first item with arr[1]", "Reading arr[arr.length], which is one past the end and gives undefined"],
 d: "Your biggest() and total() functions work on any array of numbers you give them.",
 min: 60
},
"w4-p": {
 m: "Your first real programs. Small, yes, but they make decisions, loop and use functions, which is all programming is.",
 e: "Today you combine variables, conditions, loops, functions and arrays into two small programs. They'll run in the browser using prompt() (a popup that asks for input) and alert() or console.log() for output. They're simple on purpose: the logic is what matters.",
 k: ["prompt() always returns text, so convert with Number()", "Break each program into functions", "Test edge cases: empty input, negative numbers, letters instead of numbers", "Math.random() gives a random decimal from 0 to 1. Math.floor() rounds down"],
 t: ["Program 1, grade calculator: ask for 5 subject marks, store them in an array, calculate the average with a function, and show the grade", "Handle bad input: if someone types letters, ask again or show a message", "Program 2, number guessing: the computer picks a number from 1 to 100, you guess, it says \"higher\" or \"lower\" until you get it, then shows how many tries it took", "Write pseudocode first for both programs", "Push both to a new GitHub repo called js-basics with a README"],
 c: `// number guessing game
const secret = Math.floor(Math.random() * 100) + 1;
let tries = 0;
let guess;

while (guess !== secret) {
  guess = Number(prompt("Guess a number from 1 to 100"));
  tries++;

  if (Number.isNaN(guess)) {
    alert("That's not a number!");
  } else if (guess < secret) {
    alert("Higher ⬆️");
  } else if (guess > secret) {
    alert("Lower ⬇️");
  }
}
alert(\`Correct! You got it in \${tries} tries.\`);`,
 q: [["How do you generate a random integer between 1 and 100 in JavaScript?", "Math.floor(Math.random() * 100) + 1. Math.random() gives 0 to just under 1; multiplying by 100 and flooring gives 0–99; adding 1 gives 1–100."],
     ["How do you convert a string to a number?", "Number(\"42\"), parseInt(\"42\", 10) or parseFloat(\"3.14\"). Check the result with Number.isNaN() in case the input wasn't numeric."]],
 x: ["Comparing the prompt result (text) to a number without converting", "Not handling Cancel on prompt, which returns null"],
 d: "Both games work, handle silly input, and are on GitHub.",
 min: 180
},

/* ---------- Week 5: Objects and the DOM ---------- */
"w5-1": {
 m: "A user, a product, an order: real things have many properties. Objects keep them together.",
 e: "An object is like an ID card: it groups related details under labels. Instead of separate variables for name, age and city, you have one user object with name, age and city inside. Each label is a key and its information is the value. Real apps are full of objects, and the data your MERN app sends and saves will be objects too.",
 k: ["const user = { name: \"Ravi\", age: 28, city: \"Pune\" }", "Read with dot notation: user.name, or brackets: user[\"name\"]", "Add or change: user.email = \"ravi@mail.com\"", "Values can be anything: numbers, arrays, other objects, even functions (called methods)", "An array of objects is the most common data shape on the web: [{...}, {...}]"],
 t: ["Create a product object with name, price, inStock and a tags array", "Log the price, then change it, then add a new discount property", "Create an array of 4 product objects", "Loop through the array and log \"Name - ₹Price\" for each one", "Add a method to an object: describe() that returns a sentence about it", "Use Object.keys(product) to list all its keys"],
 c: `const product = {
  name: "Wireless Mouse",
  price: 799,
  inStock: true,
  tags: ["electronics", "computer"],
};

console.log(product.name);      // "Wireless Mouse"
product.price = 699;            // update
product.discount = 10;          // add new key

const cart = [
  { name: "Mouse", price: 699, qty: 1 },
  { name: "Keyboard", price: 1499, qty: 1 },
  { name: "USB cable", price: 199, qty: 3 },
];

for (const item of cart) {
  console.log(\`\${item.name} x\${item.qty} - ₹\${item.price * item.qty}\`);
}`,
 q: [["What is an object in JavaScript?", "A collection of key-value pairs used to group related data and behaviour. Keys are strings (or symbols) and values can be any type, including functions, called methods."],
     ["What is the difference between dot notation and bracket notation?", "Dot notation (obj.key) is simpler. Bracket notation (obj[\"key\"]) is needed when the key is stored in a variable or contains spaces or special characters."],
     ["What is JSON and how is it related to objects?", "JSON (JavaScript Object Notation) is a text format based on object syntax, used to send data between servers and browsers. Keys must be in double quotes and it can't contain functions."]],
 x: ["Forgetting commas between properties", "Confusing arrays (ordered lists, [ ]) with objects (labelled data, { })"],
 d: "You can loop through an array of product objects and print a formatted cart.",
 min: 60
},
"w5-2": {
 m: "These four methods do 80% of the data work in every React app. Learn them well.",
 e: "Array methods are power tools for lists. Instead of writing a loop every time, you describe what you want. map turns every item into something new (like converting prices to dollars). filter keeps only items that pass a test (only in-stock products). find gets the first match (the user with id 5). reduce boils a list down to one value (the cart total). Each one takes a small function telling it what to do with each item.",
 k: ["map: same number of items, each transformed. Returns a new array", "filter: fewer (or equal) items, only the ones where your function returns true", "find: returns the first matching item, or undefined", "reduce: combines everything into one value, like a sum", "They don't change the original array. That matters a lot in React"],
 t: ["Start with an array of 6 product objects with name, price and category", "Use map to make an array of just the names", "Use filter to get products under ₹1000", "Use find to get the product named \"Keyboard\"", "Use reduce to calculate the total price of all products", "Chain them: total price of all electronics under ₹2000"],
 c: `const products = [
  { name: "Mouse", price: 699, category: "electronics" },
  { name: "Notebook", price: 120, category: "stationery" },
  { name: "Keyboard", price: 1499, category: "electronics" },
  { name: "Pen set", price: 250, category: "stationery" },
];

const names = products.map((p) => p.name);
// ["Mouse", "Notebook", "Keyboard", "Pen set"]

const cheap = products.filter((p) => p.price < 1000);

const keyboard = products.find((p) => p.name === "Keyboard");

const total = products.reduce((sum, p) => sum + p.price, 0);
// 2568

const electronicsTotal = products
  .filter((p) => p.category === "electronics")
  .reduce((sum, p) => sum + p.price, 0);`,
 q: [["What is the difference between map and forEach?", "map returns a new array of transformed values. forEach just runs a function for each item and returns undefined. Use map when you need the result, as in React when rendering lists."],
     ["Explain reduce with an example.", "reduce runs a function on each item, carrying an accumulator. For a sum: arr.reduce((acc, n) => acc + n, 0) starts acc at 0 and adds each number to it."],
     ["What does filter return if nothing matches?", "An empty array [], never undefined. find returns undefined when nothing matches."]],
 x: ["Forgetting to return inside a multi-line arrow function: (p) => { p.price * 2 } returns undefined", "Forgetting reduce's starting value (the 0)"],
 d: "You can answer 4 different questions about a product list using map, filter, find and reduce.",
 min: 75
},
"w5-3": {
 m: "Today is the day JavaScript reaches out and changes what's on the screen.",
 e: "When the browser loads your HTML, it builds a family tree of every element, called the DOM (Document Object Model). JavaScript can walk that tree: find an element, change its text, change its style, add new elements or remove old ones. It's like having a remote control for your web page.",
 k: ["document.querySelector(\".card\") finds the first element matching a CSS selector", "querySelectorAll finds all matches", "element.textContent = \"new text\" changes text", "element.classList.add(\"active\") / remove / toggle changes classes (better than changing styles directly)", "document.createElement(\"li\") + parent.append(li) adds new elements"],
 t: ["Make a page with an <h1 id=\"title\">, a <p class=\"message\"> and an empty <ul id=\"list\">", "Use querySelector to change the h1 text from JavaScript", "Add a CSS class .highlight and apply it to the paragraph with classList.add", "Loop over an array of 5 fruits and create an <li> for each, adding them to the list", "Remove the second list item using JavaScript", "Open DevTools Elements and watch the HTML change"],
 c: `const title = document.querySelector("#title");
title.textContent = "Hello from JavaScript!";

const message = document.querySelector(".message");
message.classList.add("highlight");

const fruits = ["Mango", "Apple", "Banana", "Guava"];
const list = document.querySelector("#list");

fruits.forEach((fruit) => {
  const li = document.createElement("li");
  li.textContent = fruit;
  list.append(li);
});`,
 q: [["What is the DOM?", "The Document Object Model: a tree of objects the browser builds from HTML. JavaScript uses it to read and change the page's content, structure and style."],
     ["What's the difference between textContent and innerHTML?", "textContent sets plain text and is safe. innerHTML parses a string as HTML. It's powerful, but inserting user input with it can allow XSS attacks."],
     ["querySelector vs getElementById?", "getElementById finds one element by id only. querySelector accepts any CSS selector and returns the first match. querySelectorAll returns all matches."]],
 x: ["querySelector returning null because the script runs before the HTML exists", "Using innerHTML with text typed by users (a security risk)", "Forgetting the # or . in the selector"],
 d: "Your page builds a list from a JavaScript array, and you can see the new elements in DevTools.",
 min: 60
},
"w5-4": {
 m: "A page that responds when you click is the moment a website becomes an app.",
 e: "Events are things that happen on the page: a click, a key press, a form submit, the mouse moving. You tell an element \"when this happens, run this function\" using addEventListener. It's like a doorbell: you install it once, and every time someone presses it, the bell rings (your function runs).",
 k: ["button.addEventListener(\"click\", () => { ... })", "Common events: click, input (every keystroke), submit, keydown, change", "The event object (e) has details: e.target is the element that fired it", "e.preventDefault() stops the browser's default action, like reloading the page on form submit", "Event delegation: one listener on a parent handles clicks on all its children"],
 t: ["Build a counter: a number and + and − buttons that change it", "Add a Reset button", "Make a dark-mode toggle button that toggles a .dark class on the body", "Add a text input that shows a live character count as you type (the input event)", "Show a message when someone presses the Enter key in the input"],
 c: `let count = 0;
const display = document.querySelector("#count");

document.querySelector("#plus").addEventListener("click", () => {
  count++;
  display.textContent = count;
});

document.querySelector("#minus").addEventListener("click", () => {
  count--;
  display.textContent = count;
});

document.querySelector("#theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

const input = document.querySelector("#bio");
input.addEventListener("input", (e) => {
  document.querySelector("#chars").textContent = \`\${e.target.value.length}/160\`;
});`,
 q: [["What is an event listener?", "A function registered on an element that runs whenever a specific event, like click or submit, happens on that element."],
     ["What is event bubbling?", "When an event fires on an element, it then bubbles up through its parents. That's what makes event delegation possible: one listener on a parent can handle events from many children."],
     ["What does preventDefault do?", "It stops the browser's default behaviour for that event, like following a link or reloading the page when a form is submitted."]],
 x: ["Writing addEventListener(\"click\", doThing()) with brackets, which runs it immediately instead of on click", "Forgetting preventDefault on a form and losing everything to a page reload"],
 d: "Your counter, theme toggle and live character count all work.",
 min: 60
},
"w5-5": {
 m: "An app that forgets everything on refresh is a toy. Today your app gets a memory.",
 e: "Forms are how users give you data. In JavaScript you listen for the submit event, stop the page reloading, then read each input's value. localStorage is a small notebook the browser keeps for your website: you can write data in and read it back even after the page is refreshed or the browser restarts. It only stores text, so you turn objects into text with JSON.stringify and back with JSON.parse.",
 k: ["form.addEventListener(\"submit\", (e) => { e.preventDefault(); ... })", "input.value gives what the user typed", "localStorage.setItem(\"key\", \"value\") saves, getItem(\"key\") reads", "JSON.stringify(obj) turns an object or array into text, JSON.parse(text) turns it back", "localStorage is per browser and per site, and limited to about 5 MB. Never store passwords in it"],
 t: ["Make a form with a name input and a Save button", "On submit, prevent the reload, read the name and show \"Welcome, name!\"", "Save the name in localStorage and show the welcome message on page load if a name is saved", "Save an array: keep a list of favourite foods, add to it from a form, and save it with JSON.stringify", "Refresh the page: the list should still be there", "Look at the saved data in DevTools → Application → Local Storage"],
 c: `const form = document.querySelector("#food-form");
const input = document.querySelector("#food");
const list = document.querySelector("#foods");

// load saved foods, or start with an empty list
let foods = JSON.parse(localStorage.getItem("foods")) || [];

function render() {
  list.innerHTML = "";
  foods.forEach((food) => {
    const li = document.createElement("li");
    li.textContent = food;
    list.append(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  foods.push(value);
  localStorage.setItem("foods", JSON.stringify(foods));
  input.value = "";
  render();
});

render();`,
 q: [["What is localStorage and what are its limits?", "A key-value store in the browser that persists across reloads and restarts. It stores only strings, about 5 MB per site, is synchronous, and can be read by any script on the page, so it's not for secrets."],
     ["What is the difference between localStorage, sessionStorage and cookies?", "localStorage persists until cleared. sessionStorage is cleared when the tab closes. Cookies are small, can have expiry dates, and are sent to the server with every request."],
     ["Why use JSON.stringify with localStorage?", "localStorage only stores strings. stringify turns objects and arrays into a JSON string, and JSON.parse turns it back when reading."]],
 x: ["Saving an array without stringify, which stores \"[object Object]\"", "Not handling the first visit, when getItem returns null", "Storing sensitive data like passwords"],
 d: "Your favourite foods list survives a page refresh.",
 min: 75
},
"w5-6": {
 m: "Every developer writes bugs every day. The skill isn't avoiding bugs, it's finding them calmly.",
 e: "A bug is code doing something you didn't expect. Debugging is detective work: read the clue (the error message), find where it happened (file and line number), and test your theory. console.log is your magnifying glass: print values to see what's really happening. Breakpoints in DevTools let you freeze time and step through your code one line at a time.",
 k: ["Read the whole error: the type (TypeError, ReferenceError), the message and the line number", "ReferenceError: x is not defined → typo or variable not created yet", "TypeError: cannot read properties of undefined → something you thought existed doesn't", "console.log the values right before the line that breaks", "DevTools → Sources → click a line number to set a breakpoint, then step through"],
 t: ["Copy the buggy code below into a file and fix all 3 bugs using only the error messages and console.log", "Set a breakpoint inside a loop in DevTools and step through it, watching the variables change", "Write the word debugger; in your code, reload with DevTools open and see it pause", "Explain your bug to a rubber duck (or a pillow) out loud: this really works", "Start a bugs.md file: every time you fix a bug, write one line about what caused it"],
 c: `// This code has 3 bugs. Find them using the Console.
const prices = [100, 250, 400];

function total(list) {
  let sum = 0;
  for (let i = 0; i <= list.length; i++) {   // bug 1
    sum += list[i];
  }
  return sum;
}

console.log(totl(prices));                     // bug 2

const user = { name: "Asha" };
console.log(user.address.city);                // bug 3`,
 q: [["How do you debug JavaScript?", "Read the error message and stack trace, reproduce the bug, add console.log or breakpoints to inspect values, narrow down where the expected and actual behaviour differ, fix it, then test that it's fixed and nothing else broke."],
     ["What is the difference between a syntax error and a logic error?", "A syntax error breaks the language rules, like a missing bracket, so the code won't run at all. A logic error runs fine but gives the wrong result."],
     ["What does \"cannot read properties of undefined\" mean?", "You tried to access a property on a value that is undefined, for example user.address.city when user.address doesn't exist. Optional chaining (user.address?.city) avoids the crash."]],
 x: ["Changing random things hoping it works", "Ignoring the line number in the error", "Leaving dozens of console.logs in finished code"],
 d: "You found all 3 bugs in the sample code and can set a breakpoint in DevTools.",
 min: 60
},
"w5-p": {
 m: "The to-do app is the \"hello world\" of real apps. Every feature you'll build later is a bigger version of this.",
 e: "Today you build a complete to-do list in plain HTML, CSS and JavaScript. Users can add tasks, mark them done, delete them, and everything is saved in localStorage. You'll use objects, arrays, array methods, the DOM, events and localStorage together: everything from weeks 4 and 5.",
 k: ["Store tasks as an array of objects: { id, text, done }", "One render() function draws the whole list from the array", "Every change: update the array → save to localStorage → call render()", "Date.now() gives a quick unique id"],
 t: ["Build the HTML: a form with an input and Add button, and an empty <ul>", "Store tasks as an array of objects and write render()", "Add tasks on submit (ignore empty input)", "Click a task to toggle done (show it crossed out with a CSS class)", "Add a delete button on each task (filter it out of the array)", "Save to localStorage on every change and load on start", "Bonus: show \"3 tasks left\" and add All / Active / Done filter buttons", "Deploy to GitHub Pages and add it to your portfolio projects grid"],
 c: `let todos = JSON.parse(localStorage.getItem("todos")) || [];

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.done) li.classList.add("done");
    li.addEventListener("click", () => toggle(todo.id));

    const del = document.createElement("button");
    del.textContent = "✕";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      remove(todo.id);
    });
    li.append(del);
    list.append(li);
  });
}

function add(text) {
  todos.push({ id: Date.now(), text, done: false });
  save(); render();
}
function toggle(id) {
  todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  save(); render();
}
function remove(id) {
  todos = todos.filter((t) => t.id !== id);
  save(); render();
}`,
 q: [["How would you structure a to-do app's data?", "An array of objects, each with a unique id, text and done flag. State lives in one place, the UI is rendered from it, and every change updates the state, saves it and re-renders."],
     ["Why use an id instead of the array index to identify tasks?", "Indexes change when items are added, removed or filtered, so you might delete the wrong item. A stable unique id always points to the same task. React keys work the same way."]],
 x: ["Changing the DOM directly in many places instead of re-rendering from the data", "Using the index as the id"],
 d: "Your to-do app adds, completes, deletes and remembers tasks, and it's live and linked from your portfolio.",
 min: 240
},

/* ---------- Week 6: Modern JavaScript and APIs ---------- */
"w6-1": {
 m: "React code is full of modern JavaScript shortcuts. Learn them now and React will look familiar instead of alien.",
 e: "Since 2015, JavaScript has added shortcuts that make code shorter and clearer, and React uses all of them. Destructuring unpacks values from objects and arrays into variables in one line, like unpacking a lunchbox. The spread operator (...) copies everything out of an array or object, like pouring one box into another. Template literals let you put variables inside text with backticks and \${}.",
 k: ["Arrow functions: const double = (n) => n * 2", "Object destructuring: const { name, age } = user", "Array destructuring: const [first, second] = list (React's useState uses this!)", "Spread: const copy = [...arr, 4] and const updated = { ...user, age: 30 }", "Optional chaining user?.address?.city and default values: function greet(name = \"friend\")"],
 t: ["Rewrite 3 old functions from week 4 as arrow functions", "Destructure name and price from a product object", "Destructure the first two items from an array", "Use spread to copy an array and add an item without changing the original", "Use spread to create an updated copy of a user object with a new city", "Use optional chaining to safely read a property that might not exist"],
 c: `const user = { name: "Ravi", age: 28, address: { city: "Pune" } };

// destructuring
const { name, age } = user;
const [first, second] = ["chai", "coffee", "juice"];

// spread: copy without changing the original
const nums = [1, 2, 3];
const more = [...nums, 4];               // [1, 2, 3, 4]
const older = { ...user, age: 29 };      // user is unchanged

// optional chaining and defaults
console.log(user.job?.title);            // undefined, no crash
const greet = (who = "friend") => \`Hi, \${who}!\`;

// destructuring in function parameters (very common in React)
const card = ({ title, price }) => \`\${title}: ₹\${price}\`;
console.log(card({ title: "Mouse", price: 699 }));`,
 q: [["What is destructuring?", "A syntax to unpack values from arrays or properties from objects into separate variables, for example const { name } = user or const [a, b] = arr."],
     ["What does the spread operator do?", "It expands an array or object into its individual elements. It's used to copy, merge, or add items without changing the original, which is essential for updating state in React."],
     ["What is the difference between spread and rest?", "Same ... syntax, opposite jobs. Spread expands values out ([...arr]). Rest collects many values into one (function f(...args) or const { a, ...others } = obj)."]],
 x: ["Thinking spread makes a deep copy. Nested objects are still shared", "Destructuring a property that doesn't exist and getting undefined silently"],
 d: "You can read and write arrow functions, destructuring and spread without looking them up.",
 min: 60
},
"w6-2": {
 m: "Real apps have hundreds of files. Modules are how you keep them organised.",
 e: "A module is just a JavaScript file that shares some of its code with other files. You mark what to share with export, and other files bring it in with import. It's like a kitchen with separate drawers: utensils in one, spices in another, and you take out what you need. Every React and Node project is built this way.",
 k: ["Named export: export const add = ... → import { add } from \"./math.js\"", "Default export (one per file): export default function App() → import App from \"./App.js\"", "In the browser: <script type=\"module\" src=\"main.js\">", "Paths start with ./ for your own files", "Modules keep variables private unless exported, so no name clashes"],
 t: ["Create math.js exporting add, subtract and a default multiply function", "Create main.js that imports them and logs the results", "Load main.js with type=\"module\" in index.html", "Split your to-do app into storage.js (save/load) and main.js", "Notice: modules need a server, which is why you're using Live Server instead of double-clicking the file"],
 c: `// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) {
  return a * b;
}

// main.js
import multiply, { add, subtract } from "./math.js";
console.log(add(2, 3), subtract(9, 4), multiply(3, 4));

// index.html
// <script type="module" src="main.js"></script>`,
 q: [["What is the difference between named and default exports?", "A file can have many named exports, imported with matching names in braces. It can have only one default export, imported without braces under any name you choose."],
     ["What is the difference between ES modules and CommonJS?", "ES modules use import/export and are the modern standard in browsers and Node. CommonJS uses require() and module.exports and is the older Node.js system you'll still see in many tutorials."]],
 x: ["Forgetting type=\"module\" in the script tag", "Forgetting the .js extension in browser imports", "Opening the file directly (file://), where modules are blocked"],
 d: "Your to-do app is split into at least two module files and still works.",
 min: 45
},
"w6-3": {
 m: "The internet is slow compared to your code. Async JavaScript is how you wait without freezing everything.",
 e: "Some tasks take time: loading data from a server, reading a file, waiting for a timer. JavaScript doesn't stop and wait (the page would freeze). Instead it's like ordering at a food court: you place your order, get a buzzer, and go sit down. When the food is ready, the buzzer goes off. A Promise is that buzzer: a placeholder for a value that will arrive later, or an error if the kitchen burns your order.",
 k: ["Synchronous = one thing at a time, in order. Asynchronous = start it now, finish later", "setTimeout(fn, 1000) runs fn after about 1 second, without blocking", "A Promise is pending, then either fulfilled (success) or rejected (error)", ".then() runs on success, .catch() runs on failure", "Callbacks were the old way, and nesting them created \"callback hell\""],
 t: ["Run console.log(\"1\"), setTimeout(() => console.log(\"2\"), 0), console.log(\"3\"). Why is the order 1, 3, 2?", "Write a function wait(ms) that returns a Promise resolving after ms milliseconds", "Use wait(2000).then(() => console.log(\"2 seconds later\"))", "Make a fake orderFood() promise that randomly succeeds or fails, and handle both with .then and .catch", "Draw the food-court buzzer analogy on paper with your own labels"],
 c: `console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// prints 1, 3, 2: the timer waits until the current code finishes

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
wait(2000).then(() => console.log("2 seconds later"));

function orderFood() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) resolve("🍕 Pizza ready");
      else reject(new Error("Kitchen ran out of cheese"));
    }, 1500);
  });
}

orderFood()
  .then((food) => console.log(food))
  .catch((err) => console.log("Sorry:", err.message));`,
 q: [["What is a Promise?", "An object representing the eventual result of an asynchronous operation. It's pending at first, then fulfilled with a value or rejected with an error. You handle it with .then/.catch or async/await."],
     ["Is JavaScript single-threaded? How does it handle async work?", "Yes, it runs one piece of code at a time. Slow tasks like timers and network requests are handed off to the browser or Node, and their callbacks are queued and run by the event loop when the call stack is empty."],
     ["What is callback hell?", "Deeply nested callbacks for sequential async steps, which make code hard to read and handle errors in. Promises and async/await solve it."]],
 x: ["Expecting async code to finish before the next line runs", "Forgetting .catch, so errors disappear silently"],
 d: "You can explain why setTimeout with 0ms still runs last, and you've handled both outcomes of a promise.",
 min: 60
},
"w6-4": {
 m: "fetch() is how your React app will talk to your Express server. Master it here, use it everywhere.",
 e: "fetch(url) asks a server for data and returns a Promise. async/await is a nicer way to write promise code that reads top to bottom like normal instructions. You mark a function async, then put await in front of anything that takes time, meaning \"wait here until this is ready\". Behind the scenes it's still the food-court buzzer, it just reads like a recipe.",
 k: ["async function load() { const res = await fetch(url); const data = await res.json(); }", "fetch gives you a Response. res.json() reads the body as JSON (it's async too)", "await only works inside async functions (or at the top level of modules)", "Check res.ok: fetch doesn't throw for 404 or 500 errors", "Wrap awaits in try/catch to handle network errors"],
 t: ["Fetch a random joke: https://official-joke-api.appspot.com/random_joke and log it", "Show the joke's setup and punchline on the page", "Add a \"New joke\" button that fetches another one", "Fetch users from https://jsonplaceholder.typicode.com/users and display their names in a list", "Open DevTools → Network and watch your requests happen"],
 c: `async function getJoke() {
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const joke = await res.json();
  document.querySelector("#setup").textContent = joke.setup;
  document.querySelector("#punchline").textContent = joke.punchline;
}

document.querySelector("#new-joke").addEventListener("click", getJoke);
getJoke();

async function loadUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  const list = document.querySelector("#users");
  list.innerHTML = users.map((u) => \`<li>\${u.name} (\${u.email})</li>\`).join("");
}
loadUsers();`,
 q: [["What does async/await do?", "It's syntax on top of Promises. An async function always returns a Promise, and await pauses that function until a Promise settles, so async code reads like synchronous code."],
     ["Does fetch reject on a 404 error?", "No. fetch only rejects on network failures. For HTTP errors like 404 or 500, you must check res.ok or res.status and handle them yourself."],
     ["What is the difference between res.json() and JSON.parse()?", "res.json() reads the response body stream and parses it as JSON, returning a Promise. JSON.parse() synchronously parses a string you already have."]],
 x: ["Forgetting await, so you get a Promise object instead of data", "Forgetting that res.json() also needs await", "Using await outside an async function"],
 d: "Your page shows a fresh joke on every click and lists users fetched from an API.",
 min: 75
},
"w6-5": {
 m: "APIs are how apps share superpowers. Weather, maps, payments: someone has built it, and you just ask.",
 e: "An API (Application Programming Interface) is a waiter between your app and someone else's kitchen. You don't go into the kitchen, you ask the waiter for a menu item (make a request to a URL) and they bring back the dish (data, usually in JSON). Each API has documentation: the menu, telling you what you can ask for and how. Some need an API key, a membership card that identifies you.",
 k: ["JSON looks like JS objects, but keys need double quotes and there are no functions", "An endpoint is a specific URL that gives specific data, like /users/5", "Query parameters customise the request: ?city=Delhi&units=metric", "API keys identify you. Keep them out of public code (you'll learn how in week 12)", "Read the docs: what URL, what parameters, what the response looks like"],
 t: ["Visit https://jsonplaceholder.typicode.com/posts/1 in your browser: that's raw JSON", "Install the \"JSON Viewer\" Chrome extension or use Firefox to see JSON nicely", "Read the Open-Meteo docs (free, no key): https://open-meteo.com/en/docs", "Fetch today's temperature for your city using its latitude and longitude", "Try the REST Countries API: fetch info about India and show the capital, population and flag", "Write down 3 APIs you'd like to use in a future project"],
 c: `// Open-Meteo needs no API key
const lat = 17.385, lon = 78.4867;  // Hyderabad
const url = \`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current=temperature_2m,wind_speed_10m\`;

const res = await fetch(url);
const data = await res.json();
console.log(data.current.temperature_2m, "°C");

// REST Countries
const country = await (await fetch("https://restcountries.com/v3.1/name/india")).json();
console.log(country[0].capital[0], country[0].population);`,
 q: [["What is an API?", "A defined way for programs to talk to each other. A web API exposes URLs (endpoints) that accept requests and return data, usually JSON, so a frontend can use a server's data and features."],
     ["What is a REST API?", "An API that follows REST conventions: resources identified by URLs, standard HTTP methods (GET, POST, PUT, DELETE), stateless requests and JSON responses."],
     ["What is an API key?", "A secret token that identifies the app making requests, used for access control, usage limits and billing. It should never be committed to public code."]],
 x: ["Not reading the docs and guessing the URL", "Assuming the shape of the data. Log it first and look", "Committing API keys to GitHub"],
 d: "You've fetched real data from two different public APIs and displayed it on a page.",
 min: 60
},
"w6-6": {
 m: "Networks fail, servers go down, users type nonsense. Good apps expect it.",
 e: "try/catch is a safety net. You put risky code in the try block, and if anything goes wrong, JavaScript jumps to the catch block instead of crashing. Good apps also show the user what's happening: a \"Loading...\" message while waiting, a friendly error if something fails, and the data when it arrives. These three states (loading, error, success) will come up in every React app you build.",
 k: ["try { risky code } catch (err) { handle it } finally { always runs }", "throw new Error(\"message\") creates your own error", "With fetch: if (!res.ok) throw new Error(\`HTTP \${res.status}\`)", "Three UI states: loading, error, success. Always handle all three", "Show human messages (\"Couldn't load weather. Try again.\"), log technical details to the console"],
 t: ["Wrap your joke fetch in try/catch", "Break the URL on purpose and show a friendly error message on the page", "Show \"Loading...\" before fetching and hide it when done (use finally)", "Throw an error when res.ok is false, and test with https://jsonplaceholder.typicode.com/nope", "Disable the button while loading so users can't spam clicks", "In DevTools → Network, set throttling to \"Slow 4G\" to see your loading state"],
 c: `async function loadJoke() {
  const status = document.querySelector("#status");
  const btn = document.querySelector("#new-joke");
  status.textContent = "Loading...";
  btn.disabled = true;

  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    const joke = await res.json();
    status.textContent = \`\${joke.setup} ... \${joke.punchline}\`;
  } catch (err) {
    console.error(err);
    status.textContent = "😕 Couldn't load a joke. Check your connection and try again.";
  } finally {
    btn.disabled = false;
  }
}`,
 q: [["How do you handle errors in async/await code?", "Wrap the awaits in try/catch. For fetch, also check res.ok and throw on HTTP errors, then show a user-friendly message and log details for debugging."],
     ["What does finally do?", "It runs after try and catch whether or not an error happened. It's useful for cleanup, like hiding a loading spinner or re-enabling a button."]],
 x: ["An empty catch block that silently swallows errors", "Showing raw error messages like \"TypeError: Failed to fetch\" to users", "Forgetting to turn off the loading state after an error"],
 d: "Your app shows a loading message, then the data or a friendly error, and you've tested all three cases.",
 min: 60
},
"w6-p": {
 m: "A real app, using real live data from the internet. This one goes straight into your portfolio.",
 e: "You'll build a weather app: type a city, press search, and see the current temperature, wind and a 5-day forecast. You'll use Open-Meteo's free geocoding API to turn a city name into coordinates, then its forecast API to get the weather. It uses everything from Phase 2: functions, arrays, objects, DOM, events, async/await, error handling and modules.",
 k: ["Two API calls in a row: city name → coordinates → weather", "Handle all three states: loading, error (city not found), success", "Save the last searched city in localStorage", "Split code into api.js (fetching) and ui.js (showing)"],
 t: ["Build the HTML: a search form, a results card and a status message", "Write getCoordinates(city) using https://geocoding-api.open-meteo.com/v1/search?name=CITY&count=1", "Write getWeather(lat, lon) using the forecast API with current and daily values", "Show the city name, current temperature, wind speed and a 5-day min/max forecast", "Show \"City not found\" if the geocoding results are empty", "Remember the last city in localStorage and load it on start", "Style it nicely, make it responsive, deploy it, and add it to your portfolio"],
 c: `// api.js
export async function getCoordinates(city) {
  const res = await fetch(
    \`https://geocoding-api.open-meteo.com/v1/search?name=\${encodeURIComponent(city)}&count=1\`
  );
  const data = await res.json();
  if (!data.results?.length) throw new Error("City not found");
  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

export async function getWeather(lat, lon) {
  const url = \`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}\` +
    "&current=temperature_2m,wind_speed_10m" +
    "&daily=temperature_2m_max,temperature_2m_min&timezone=auto";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather service unavailable");
  return res.json();
}`,
 q: [["Walk me through how your weather app works.", "The user submits a city. I call a geocoding API to get coordinates, then a forecast API with those coordinates. I show a loading state, handle \"city not found\" and network errors, render the current and daily data, and cache the last city in localStorage."],
     ["Why use encodeURIComponent?", "City names can contain spaces or special characters (like São Paulo). encodeURIComponent makes them safe to put in a URL."]],
 x: ["Not handling a city that doesn't exist", "Putting all the code in one giant file", "Forgetting to show units (°C, km/h)"],
 d: "Your weather app works for any city, handles errors gracefully, and is live and in your portfolio.",
 min: 240
}
};
