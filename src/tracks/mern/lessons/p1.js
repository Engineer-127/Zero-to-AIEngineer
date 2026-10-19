/* MERN Phase 1: Web Foundations (Weeks 1-3)
   Code samples use normal template literals: backticks and ${ inside code are escaped. */
export default {

/* ---------- Week 1: How the web works and your first HTML page ---------- */
"w1-1": {
 m: "You can't build a house without knowing what a house is. Today you learn what a website actually is, no code needed.",
 e: "Think of the internet as a giant postal system. Your browser (Chrome) is you writing a letter that says \"please send me the page at amazon.in\". The letter travels to a computer somewhere called a server. The server reads it and posts back the page: files written in HTML (the content), CSS (the looks) and JavaScript (the behaviour). Your browser opens the package and shows you the page. A MERN developer builds both sides: the page you see (the frontend) and the server plus its database that answers the letters (the backend).",
 k: ["Client = your browser, the one asking. Server = the computer answering", "A URL is an address: https://www.amazon.in/orders means \"go to amazon.in, open the orders page\"", "DNS is the internet's phonebook: it turns amazon.in into a number address (an IP)", "Every website is built from three languages: HTML (structure), CSS (style), JavaScript (behaviour)", "MERN = MongoDB (database), Express (server framework), React (the page you see), Node.js (runs JavaScript on the server)"],
 t: ["Open any website, right-click and choose \"View page source\". That wall of text is HTML: you'll be able to read it in a week", "On a piece of paper, draw: you → browser → internet → server → database, with arrows going both ways", "Think of your favourite app (Swiggy, Instagram) and write down: what would the frontend show? What would the database need to remember?", "Watch one short \"how the internet works\" video from the resources", "Write 3 sentences in your own words explaining what happens when you type a URL and press Enter"],
 q: [["What happens when you type a URL into a browser and press Enter?", "The browser looks up the domain's IP address using DNS, connects to that server, sends an HTTP request, the server sends back HTML, CSS and JavaScript, and the browser renders the page."],
     ["What is the difference between frontend and backend?", "The frontend is what users see and interact with in the browser. The backend runs on a server: it handles business logic, talks to the database and sends data to the frontend."],
     ["What does MERN stand for?", "MongoDB (database), Express.js (backend web framework), React (frontend library) and Node.js (JavaScript runtime for the server). One language, JavaScript, across the whole stack."]],
 x: ["Thinking you need to be good at maths to build websites. You don't: web development is mostly logic and patience", "Trying to learn everything at once. Today is only about the big picture"],
 d: "You can explain to a friend, without notes, what happens between typing a URL and seeing the page.",
 min: 45
},
"w1-2": {
 m: "A carpenter needs a workbench. Fifteen minutes of setup saves you hours of confusion later.",
 e: "You need three things: a browser to see your work (Chrome, because its developer tools are excellent), a code editor to write it (VS Code: think of it as Microsoft Word, but for code), and one tidy folder where all your projects will live. Extensions are like apps for VS Code that add superpowers, such as auto-refreshing your page when you save.",
 k: ["VS Code is free and used by most web developers", "Live Server extension: opens your page and refreshes it every time you save", "Prettier extension: tidies your code's spacing automatically", "Keep all projects in one folder, like Documents/code, with lowercase names and no spaces (my-first-site)", "Ctrl+S (Cmd+S on Mac) saves. Save often"],
 t: ["Install Google Chrome if you don't have it", "Download and install VS Code from code.visualstudio.com", "In VS Code, open the Extensions panel (the four squares icon) and install: Live Server, Prettier, and Auto Rename Tag", "Create a folder called code in your Documents, and inside it a folder called my-first-site", "In VS Code choose File → Open Folder and open my-first-site", "Turn on auto-save: File → Auto Save. Then open Settings, search \"format on save\" and tick it"],
 x: ["Saving files in Downloads or on the Desktop and losing track of them", "Using spaces or capital letters in folder names: it causes trouble later in the terminal", "Installing ten extensions on day one. Start with three"],
 q: [["What is a code editor, and how is it different from an IDE?", "A code editor (like VS Code) is a text editor made for code, with colouring and extensions. An IDE (Integrated Development Environment) bundles more tools, like debuggers and build tools, out of the box. VS Code sits in between thanks to extensions."],
     ["Why do developers prefer Chrome or Firefox for development?", "Their built-in developer tools let you inspect HTML, debug JavaScript, watch network requests and test mobile layouts."]],
 d: "VS Code is installed with Live Server and Prettier, and your my-first-site folder is open in it.",
 min: 45
},
"w1-3": {
 m: "Every website you've ever visited, from Google to Netflix, starts with the same few lines of HTML you'll write today.",
 e: "HTML is not programming, it's labelling. You wrap text in tags to tell the browser what each piece is: \"this is a heading\", \"this is a paragraph\". A tag looks like <h1>, and most tags come in pairs: an opening <h1> and a closing </h1> with a slash. Whatever sits between them is the content. It's like putting labelled stickers on boxes so the browser knows how to display them.",
 k: ["<!DOCTYPE html> tells the browser \"this is a modern HTML page\"", "<head> holds information about the page (title). <body> holds what you see", "<h1> to <h6> are headings, biggest to smallest. Use one <h1> per page", "<p> is a paragraph, <br> is a line break, <strong> makes text important (bold)", "Indent nested tags so you can see the structure at a glance"],
 t: ["In my-first-site, create a file named index.html (index is the name browsers look for first)", "Type ! and press Tab in VS Code: Emmet writes the basic skeleton for you", "Change the <title> to your name", "Inside <body>, add an <h1> with your name, an <h2> saying \"About me\", and two <p> paragraphs about yourself", "Right-click the file and choose \"Open with Live Server\". Change some text, save, and watch the page update", "Make one word bold with <strong> and one italic with <em>"],
 c: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Priya Sharma</title>
  </head>
  <body>
    <h1>Priya Sharma</h1>
    <h2>About me</h2>
    <p>I'm learning to build websites, starting <strong>today</strong>.</p>
    <p>I live in Hyderabad and I love <em>cricket</em> and cooking.</p>
  </body>
</html>`,
 q: [["What is HTML?", "HyperText Markup Language. It describes the structure and meaning of content on a web page using tags. It's a markup language, not a programming language: it has no logic like loops or conditions."],
     ["What is the difference between a tag and an element?", "A tag is the label itself, like <p> or </p>. An element is the whole thing: opening tag, content and closing tag together."],
     ["What does <!DOCTYPE html> do?", "It tells the browser to render the page in standards mode using modern HTML5 rules, instead of an old compatibility mode."]],
 x: ["Forgetting the closing tag, so the rest of the page turns into a heading", "Using headings to make text big instead of to mark importance (that's CSS's job)", "Naming the file index.html.txt by accident on Windows: turn on file extensions in File Explorer"],
 d: "Your index.html opens in the browser with a heading, a subheading and two paragraphs about you.",
 min: 60
},
"w1-4": {
 m: "Links are what make the web a web. Images and lists make pages people actually want to read.",
 e: "A link (<a>, for \"anchor\") is a door to another page. The href attribute is where the door leads. Attributes are extra settings written inside the opening tag, like name=\"value\". An image (<img>) needs a src (where the picture file is) and alt (a description for people who can't see it). Lists come in two flavours: <ul> for bullet points and <ol> for numbered steps, each item wrapped in <li>.",
 k: ["<a href=\"https://google.com\">Google</a> links to another website", "<a href=\"about.html\">About</a> links to another page in your own folder (a relative path)", "target=\"_blank\" opens the link in a new tab", "<img src=\"photo.jpg\" alt=\"Me at the beach\">: alt text is required for accessibility", "<img> has no closing tag: it's a self-closing (void) element"],
 t: ["Put a photo of yourself (or any picture) in your folder as photo.jpg and show it on your page with alt text", "Add a bulleted <ul> list of 3 hobbies", "Add a numbered <ol> list: \"My learning plan\" with HTML, CSS, JavaScript, React, Node", "Create a second file, hobbies.html, with a heading and a paragraph", "Link index.html to hobbies.html, and hobbies.html back to index.html", "Add a link to your favourite website that opens in a new tab"],
 c: `<img src="photo.jpg" alt="Priya smiling at the camera" width="200">

<h2>My hobbies</h2>
<ul>
  <li>Cricket</li>
  <li>Cooking biryani</li>
  <li>Reading</li>
</ul>

<h2>My learning plan</h2>
<ol>
  <li>HTML and CSS</li>
  <li>JavaScript</li>
  <li>React</li>
  <li>Node, Express and MongoDB</li>
</ol>

<p>
  <a href="hobbies.html">More about my hobbies</a> ·
  <a href="https://developer.mozilla.org" target="_blank">MDN Web Docs</a>
</p>`,
 q: [["What is the purpose of the alt attribute on images?", "It describes the image for screen-reader users and shows if the image fails to load. It also helps search engines understand the image."],
     ["What is the difference between an absolute and a relative URL?", "An absolute URL includes the full address (https://site.com/page). A relative URL is a path from the current file (about.html or images/cat.png), used for pages inside your own site."],
     ["What's the difference between <ul> and <ol>?", "<ul> is an unordered list shown with bullets, for items where order doesn't matter. <ol> is an ordered list shown with numbers, for steps or rankings."]],
 x: ["Image not showing because the file name doesn't match exactly (Photo.JPG vs photo.jpg)", "Writing alt=\"image\": describe what's in it instead", "Putting text directly inside <ul> without <li>"],
 d: "You have two pages linked to each other, with a picture and both kinds of lists.",
 min: 60
},
"w1-5": {
 m: "Every login screen, search bar and checkout page is an HTML form. Learn forms once and you'll use them forever.",
 e: "A form is a paper form, but on screen. <input> boxes are the blank lines you fill in, <label> is the printed question next to each line, and the <button> is \"submit\". The type attribute changes what kind of box you get: text, email, password (shows dots), number, date, checkbox. Tables (<table>) are for grid-shaped data like a timetable or a price list, never for page layout.",
 k: ["<label for=\"email\"> links to <input id=\"email\">: clicking the label focuses the box", "type=\"email\" checks the format, required stops empty submissions", "placeholder shows a hint inside the box, but it's not a replacement for a label", "<select> with <option>s makes a dropdown, <textarea> makes a big text box", "Tables: <table> → <tr> (row) → <th> (header cell) or <td> (data cell)"],
 t: ["Create contact.html with a form: name, email, a dropdown \"How did you hear about me?\", a message textarea, and a Send button", "Give every input a <label> and make name and email required", "Try submitting the form empty and see the browser stop you", "Add a small table with your weekly study timetable: Day, Topic, Hours", "Link the contact page from your home page"],
 c: `<form>
  <label for="name">Your name</label>
  <input id="name" name="name" type="text" required>

  <label for="email">Email</label>
  <input id="email" name="email" type="email" placeholder="you@example.com" required>

  <label for="source">How did you hear about me?</label>
  <select id="source" name="source">
    <option>LinkedIn</option>
    <option>A friend</option>
    <option>Other</option>
  </select>

  <label for="msg">Message</label>
  <textarea id="msg" name="msg" rows="4"></textarea>

  <button type="submit">Send</button>
</form>

<table>
  <tr><th>Day</th><th>Topic</th><th>Hours</th></tr>
  <tr><td>Monday</td><td>HTML forms</td><td>1.5</td></tr>
  <tr><td>Tuesday</td><td>CSS basics</td><td>1.5</td></tr>
</table>`,
 q: [["Why should every input have a label?", "Labels tell screen-reader users what the field is for, and clicking a label focuses its input, which makes small checkboxes easier to hit. Placeholders disappear when you type, so they can't replace labels."],
     ["What does the name attribute on an input do?", "It's the key used when the form data is sent to a server, like name=Priya. Without a name, that field's value isn't submitted."],
     ["When should you use an HTML table?", "Only for tabular data, information with rows and columns. Never for page layout: that's what CSS Flexbox and Grid are for."]],
 x: ["Forgetting name attributes, so the server receives nothing later", "Using tables to position things on the page", "Using placeholder text instead of labels"],
 d: "Your contact form refuses to submit empty, and every field has a working label.",
 min: 60
},
"w1-6": {
 m: "One in six people lives with a disability. Good HTML means your site works for all of them, and Google ranks it higher too.",
 e: "Semantic HTML means choosing tags that describe meaning, not just looks. Instead of wrapping everything in plain <div> boxes, you use <header>, <nav>, <main>, <section>, <article> and <footer>. It's like labelling rooms in a house \"kitchen\" and \"bedroom\" instead of \"room 1\" and \"room 2\". Screen readers (software that reads pages aloud for blind users) and search engines use those labels to understand your page.",
 k: ["<header>: top of the page (logo, title). <nav>: the menu of links", "<main>: the main content, once per page. <footer>: bottom bits like copyright", "<section> groups related content with a heading. <article> is a self-contained piece, like a blog post", "<div> and <span> have no meaning: use them only when nothing else fits", "Accessibility (a11y) basics: alt text, labels, good heading order, and everything usable by keyboard"],
 t: ["Restructure index.html using <header>, <nav>, <main>, <section> and <footer>", "Put links to Home, Hobbies and Contact inside <nav>", "Check your headings go in order (h1 → h2 → h3, no skipping)", "Press Tab repeatedly on your page: can you reach every link and form field without a mouse?", "Run Lighthouse: right-click → Inspect → Lighthouse tab → Accessibility → Analyze. Fix one thing it suggests"],
 c: `<body>
  <header>
    <h1>Priya Sharma</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="hobbies.html">Hobbies</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>About me</h2>
      <p>Future MERN developer from Hyderabad.</p>
    </section>
    <section>
      <h2>Skills I'm learning</h2>
      <ul><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Priya Sharma</p>
  </footer>
</body>`,
 q: [["What is semantic HTML and why does it matter?", "Using elements that describe their meaning, like <nav>, <article> or <button>, instead of generic <div>s. It improves accessibility for screen readers, helps SEO, and makes code easier to read."],
     ["What is web accessibility?", "Designing sites so people with disabilities can use them: screen-reader support, keyboard navigation, enough colour contrast, captions, and text alternatives for images."],
     ["What is the difference between <div> and <span>?", "Both are meaningless containers. <div> is a block element that starts on a new line and takes full width. <span> is inline and sits within text."]],
 x: ["\"Div soup\": a page made only of <div>s", "Making a clickable <div> instead of a real <button> or <a>", "Skipping heading levels just to get a smaller font"],
 d: "Your page uses header, nav, main and footer, and scores 90+ for accessibility in Lighthouse.",
 min: 60
},
"w1-p": {
 m: "Your first build day. Finishing something small teaches you more than starting something big.",
 e: "Today you combine everything from this week into a small, three-page personal website using only HTML. It will look plain (styling comes next week), and that's the point: you're proving you can structure content correctly. Next week you'll give it a makeover with CSS.",
 k: ["Plan before you type: sketch each page on paper first", "Reuse the same <header>/<nav>/<footer> on every page so the site feels connected", "Check every link and image works", "Keep file names lowercase with hyphens: my-projects.html"],
 t: ["Sketch three pages on paper: Home, About (or Hobbies), Contact", "Build index.html with a header, nav, an introduction section, a photo and a list of goals", "Build about.html with a story about why you're learning to code, and a table of your skills", "Build contact.html with your form from Day 5", "Make sure the nav on every page links to all three pages", "Run Lighthouse on each page and fix accessibility warnings", "Show it to a friend or family member and ask them to click every link"],
 c: `my-first-site/
├── index.html      ← home: intro, photo, goals
├── about.html      ← your story, skills table
├── contact.html    ← the form
└── images/
    └── photo.jpg`,
 q: [["How would you structure a simple multi-page static website?", "One HTML file per page, a shared header/nav/footer on each, an images folder for assets, relative links between pages, and index.html as the home page."],
     ["Why is index.html special?", "Web servers serve index.html by default when someone visits a folder, so it acts as the home page without needing the file name in the URL."]],
 x: ["Spending the day trying to make it pretty with HTML attributes. Wait for CSS", "Broken links because of typos in file names"],
 d: "Three linked pages work in the browser, every image has alt text, and a friend can navigate the whole site.",
 min: 180
},

/* ---------- Week 2: Styling with CSS ---------- */
"w2-1": {
 m: "HTML is the skeleton, CSS is the clothes. Today your pages stop looking like 1995.",
 e: "CSS (Cascading Style Sheets) is a list of rules. Each rule says: \"find these elements, and make them look like this\". The \"find these\" part is the selector (like h1, or .card for anything with class=\"card\"). The \"look like this\" part is a list of property: value pairs, like color: navy. You write CSS in a separate file, style.css, and link it from your HTML's <head>.",
 k: ["Selectors: p (all paragraphs), .intro (class=\"intro\"), #logo (id=\"logo\", only one per page)", "Classes are reusable labels: give many elements the same class", "Colours: names (tomato), hex (#1e90ff) or rgb(30, 144, 255)", "Fonts: font-family, font-size (use rem: 1rem ≈ 16px), font-weight, line-height", "Cascade: when two rules clash, the more specific one or the later one wins"],
 t: ["Create style.css and link it with <link rel=\"stylesheet\" href=\"style.css\"> in every page's <head>", "Set the body's font-family, a soft background colour and a comfortable line-height of 1.6", "Style your h1 and h2 with a colour and size", "Add class=\"highlight\" to one paragraph and give .highlight a background colour", "Pick a font from Google Fonts and use it for your headings", "Change one value at a time and watch what happens"],
 c: `/* style.css */
body {
  font-family: "Inter", system-ui, sans-serif;
  background: #f7f7fb;
  color: #1f2937;
  line-height: 1.6;
  margin: 0;
}

h1 {
  color: #4f46e5;
  font-size: 2.5rem;
}

.highlight {
  background: #fef3c7;
  padding: 8px 12px;
  border-radius: 6px;
}`,
 q: [["What are the three ways to add CSS to a page?", "Inline (style attribute on an element), internal (a <style> tag in the head) and external (a linked .css file). External is preferred because it's reusable and keeps HTML clean."],
     ["What is the difference between a class and an id?", "A class can be used on many elements and an element can have several classes. An id must be unique on the page. Classes are preferred for styling, and ids for links or JavaScript lookups."],
     ["What does \"cascading\" mean in CSS?", "When several rules target the same element, the browser decides which wins using importance, specificity (id > class > tag) and source order (later wins)."]],
 x: ["Forgetting the semicolon after a property, which breaks the next line", "Using ids for styling everything, which makes rules hard to override", "Linking the CSS file with the wrong path, so nothing changes"],
 d: "All three pages use one shared style.css with your own fonts and colours.",
 min: 60
},
"w2-2": {
 m: "Every element on a web page is a box. Once you see the boxes, layout stops being magic.",
 e: "Think of each element as a framed photo on a wall. The content is the photo, padding is the white mat between the photo and the frame, the border is the frame itself, and margin is the empty wall space between this frame and the next one. When something is \"too far\" or \"too close\", it's almost always padding or margin.",
 k: ["content → padding → border → margin, from inside out", "box-sizing: border-box makes width include padding and border (always turn it on)", "Block elements (div, p, h1) stack vertically and take full width. Inline elements (span, a) sit inside text", "margin: 0 auto centres a block that has a width", "max-width keeps text readable on big screens (around 65 characters per line)"],
 t: ["Add * { box-sizing: border-box; } to the top of style.css", "Open DevTools (right-click → Inspect), click an element and look at the box diagram in the Styles panel", "Wrap your main content in a container with max-width: 800px and margin: 0 auto", "Turn your sections into \"cards\": white background, padding, a border-radius and a soft shadow", "Use margin to add space between the cards"],
 c: `* { box-sizing: border-box; }

.container {
  max-width: 800px;
  margin: 0 auto;       /* centres the container */
  padding: 0 16px;
}

.card {
  background: white;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}`,
 q: [["Explain the CSS box model.", "Every element is a rectangular box made of content, padding, border and margin. Width and height apply to the content by default, unless box-sizing: border-box is set, in which case they include padding and border."],
     ["What is the difference between margin and padding?", "Padding is space inside the border, between it and the content, and it shows the background colour. Margin is space outside the border, between this element and others, and it's always transparent."],
     ["What is the difference between block and inline elements?", "Block elements start on a new line and fill the available width; you can set their width and height. Inline elements flow within text and ignore width and height."]],
 x: ["Fixing layout problems by guessing numbers instead of inspecting the box in DevTools", "Forgetting box-sizing: border-box and wondering why a 100% wide box overflows"],
 d: "Your content sits in a centred container and each section is a neat card with consistent spacing.",
 min: 60
},
"w2-3": {
 m: "Flexbox solved the most common layout question on the internet: \"how do I put these side by side?\"",
 e: "Flexbox is a way to line up items in a row or a column and control the spacing between them. You put display: flex on the parent box, and its children line up. Picture a bookshelf: justify-content decides how books spread along the shelf (bunched left, centred, evenly spaced), and align-items decides how they sit vertically (top, middle, bottom).",
 k: ["display: flex goes on the parent (container), not the children", "flex-direction: row (default) or column", "justify-content: spacing along the main direction (flex-start, center, space-between)", "align-items: alignment across it (center is the magic vertical-centre)", "gap: space between items. flex-wrap: wrap lets items move to the next line"],
 t: ["Play the first 15 levels of Flexbox Froggy (link in resources)", "Turn your <nav> into a horizontal menu with display: flex and gap", "Make your header put your name on the left and the nav on the right with justify-content: space-between", "Create a row of three skill cards that sit side by side and wrap on small screens", "Perfectly centre something in a box with justify-content and align-items both set to center"],
 c: `header {
  display: flex;
  justify-content: space-between;  /* name left, nav right */
  align-items: center;
  padding: 16px 24px;
}

nav {
  display: flex;
  gap: 20px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.skills .card {
  flex: 1 1 200px;   /* grow, shrink, start at 200px */
}`,
 q: [["What is Flexbox used for?", "One-dimensional layout: arranging items in a single row or column, distributing space and aligning them, like navbars, button groups or card rows."],
     ["What's the difference between justify-content and align-items?", "justify-content aligns items along the main axis (horizontal for a row). align-items aligns them along the cross axis (vertical for a row)."],
     ["How do you centre a div horizontally and vertically?", "On the parent: display: flex; justify-content: center; align-items: center; and give the parent a height."]],
 x: ["Putting display: flex on the children instead of the parent", "Using margins to fake spacing when gap does it cleanly", "Forgetting flex-wrap, so cards squash on phones"],
 d: "Your header is a flex row with name and menu apart, and your skill cards wrap neatly.",
 min: 75
},
"w2-4": {
 m: "Flexbox lines things up. Grid lays out whole pages.",
 e: "CSS Grid divides a box into rows and columns, like a spreadsheet or a chessboard, and lets you place items into the cells. Flexbox is for one direction (a row or a column), Grid is for two directions at once. A photo gallery or a page with a sidebar, header and content is a perfect job for Grid.",
 k: ["display: grid on the parent, then define grid-template-columns", "fr = a fraction of free space: 1fr 2fr means the second column is twice as wide", "repeat(3, 1fr) = three equal columns", "repeat(auto-fit, minmax(220px, 1fr)) = as many columns as fit, each at least 220px: responsive with no media queries", "gap works in grid too"],
 t: ["Play the first 12 levels of Grid Garden (link in resources)", "Build a \"Projects\" section with 6 placeholder cards in a grid of 3 columns", "Change it to repeat(auto-fit, minmax(220px, 1fr)) and resize the window: watch the columns adjust", "Make one card span two columns with grid-column: span 2", "Decide for each part of your site: is this a Flexbox job or a Grid job?"],
 c: `.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.projects .featured {
  grid-column: span 2;
}

/* a classic page layout */
.page {
  display: grid;
  grid-template-columns: 240px 1fr;  /* sidebar + content */
  gap: 24px;
}`,
 q: [["When would you use Grid instead of Flexbox?", "Grid for two-dimensional layouts where rows and columns both matter, like galleries and page layouts. Flexbox for one-dimensional alignment, like a navbar. They're often used together."],
     ["What does the fr unit mean?", "A fraction of the remaining free space in the grid container. 1fr 1fr gives two equal columns."]],
 x: ["Fixed pixel column widths that break on phones", "Trying to do everything with only Flexbox or only Grid"],
 d: "You have a responsive projects grid that changes from 3 columns to 1 as the window shrinks.",
 min: 75
},
"w2-5": {
 m: "More than 70% of Indian internet users browse on phones. If your site breaks on mobile, it's broken.",
 e: "Responsive design means one website that rearranges itself to fit any screen, like water taking the shape of its glass. You use flexible widths (percentages, fr, max-width) and media queries, which are \"if\" statements in CSS: \"if the screen is narrower than 600px, stack these columns\". Mobile-first means you write the phone layout first and add rules for bigger screens.",
 k: ["The viewport meta tag in <head> is required for responsive sites", "@media (min-width: 768px) { ... } applies only on screens 768px and wider", "Mobile-first: base styles for small screens, then min-width media queries for bigger ones", "Use max-width: 100% on images so they never overflow", "Test with DevTools' device toolbar (the phone icon, or Ctrl+Shift+M)"],
 t: ["Check every page has the viewport meta tag", "Add img { max-width: 100%; height: auto; } to style.css", "Open the DevTools device toolbar and view your site as an iPhone and as a small Android phone", "Make the nav stack vertically on small screens and go horizontal at 768px+", "Make the font size of h1 smaller on phones", "Open your site on your real phone (Live Server shows a network address you can use on the same Wi-Fi)"],
 c: `/* mobile first: phone styles by default */
nav { display: flex; flex-direction: column; gap: 8px; }
h1  { font-size: 1.8rem; }
img { max-width: 100%; height: auto; }

/* tablets and up */
@media (min-width: 768px) {
  nav { flex-direction: row; gap: 20px; }
  h1  { font-size: 2.6rem; }
}`,
 q: [["What is responsive web design?", "Designing a site so its layout adapts to different screen sizes using fluid layouts, flexible images and media queries, so one codebase works on phones, tablets and desktops."],
     ["What is mobile-first design?", "Writing base styles for small screens first, then adding min-width media queries to enhance the layout for bigger screens. It keeps phone CSS simple and fast."],
     ["What does the viewport meta tag do?", "It tells mobile browsers to use the device's real width instead of pretending to be a desktop and zooming out, which is what makes media queries work on phones."]],
 x: ["Forgetting the viewport meta tag, so the phone shows a tiny desktop page", "Only testing on your laptop", "Fixed widths like width: 1000px"],
 d: "Your site looks good and has no sideways scrolling on a real phone and on a laptop.",
 min: 75
},
"w2-6": {
 m: "The difference between \"student project\" and \"professional\" is often a handful of small touches.",
 e: "CSS variables let you name a value once (like your brand colour) and reuse it everywhere, so a redesign means changing one line. Pseudo-classes like :hover style things when the mouse is over them. Transitions make changes smooth instead of instant. Together they make your site feel polished and alive.",
 k: ["Define variables on :root: --brand: #4f46e5; then use color: var(--brand)", ":hover, :focus and :active style interactive states", "transition: all 0.2s ease makes changes animate smoothly", "Always style :focus-visible so keyboard users can see where they are", "Consistent spacing (8px, 16px, 24px, 32px) instantly looks more professional"],
 t: ["Move your colours and fonts into CSS variables on :root", "Give links and buttons a :hover style with a transition", "Make cards lift slightly on hover with transform: translateY(-4px)", "Add a visible :focus-visible outline for keyboard users", "Change your --brand variable to a new colour and watch the whole site update"],
 c: `:root {
  --brand: #4f46e5;
  --text: #1f2937;
  --radius: 12px;
}

a { color: var(--brand); }

.btn {
  background: var(--brand);
  color: white;
  padding: 10px 18px;
  border-radius: var(--radius);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.35);
}
.btn:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}`,
 q: [["What are CSS custom properties (variables)?", "Values you name once, like --brand: blue, and reuse with var(--brand). They cascade, can be changed per section or with JavaScript, and make theming like dark mode easy."],
     ["What is a pseudo-class?", "A keyword added to a selector that targets a special state, like :hover, :focus, :first-child or :nth-child(2)."]],
 x: ["Animating everything: keep transitions short (0.15–0.3s) and subtle", "Removing focus outlines without replacing them, which breaks keyboard navigation"],
 d: "Your colours live in variables, and buttons and cards respond smoothly to hover and keyboard focus.",
 min: 60
},
"w2-p": {
 m: "A portfolio site is your shop window. Today you build the first version of yours.",
 e: "You'll turn last week's plain HTML site into a modern, responsive portfolio landing page: a hero section with your name and a one-line pitch, an about section, a skills section, a projects grid (placeholders for now: you'll fill it over the next 12 weeks) and a contact section. This is the site you'll keep improving and eventually send to recruiters.",
 k: ["Hero section: big name, one sentence about you, a call-to-action button", "Use Flexbox for the header/nav and Grid for projects", "Mobile-first, then a media query for larger screens", "CSS variables for colours so the site feels consistent"],
 t: ["Sketch the layout on paper: hero, about, skills, projects, contact, footer", "Build the hero with a big heading, a tagline like \"Aspiring MERN developer\" and a \"Contact me\" button that links to #contact", "Add skills as a row of small badges (Flexbox with wrap)", "Add a projects grid with 3 placeholder cards: title, short description, \"Coming soon\"", "Make it fully responsive and test on your phone", "Run Lighthouse and aim for 90+ in Accessibility and Best Practices"],
 c: `<section class="hero">
  <h1>Hi, I'm Priya 👋</h1>
  <p>Aspiring MERN developer. I build websites that are simple, fast and accessible.</p>
  <a class="btn" href="#contact">Contact me</a>
</section>

<section id="skills">
  <h2>Skills</h2>
  <div class="badges">
    <span>HTML</span><span>CSS</span><span>Flexbox</span><span>Grid</span>
  </div>
</section>`,
 q: [["How do you make a website fast?", "Compress and size images properly, use modern formats like WebP, minimise CSS and JavaScript, avoid unnecessary libraries, and lazy-load images below the fold."],
     ["Walk me through how you built your portfolio.", "Describe the structure (semantic HTML sections), layout (Flexbox for nav, Grid for projects), responsive approach (mobile-first media queries), theming with CSS variables, and how you checked accessibility with Lighthouse."]],
 x: ["Copying a template instead of building it yourself: you learn nothing", "Huge images (5 MB photos) that make the page slow. Resize to under 300 KB"],
 d: "Your portfolio landing page looks good on phone and laptop and scores 90+ for accessibility in Lighthouse.",
 min: 240
},

/* ---------- Week 3: Developer tools ---------- */
"w3-1": {
 m: "The terminal looks scary for about two days. After that it's the fastest way to get things done.",
 e: "The terminal is a text-based way to tell your computer what to do. Instead of double-clicking folders, you type commands. Every developer uses it because tools like Git, npm and Node are run from it. Think of it as texting your computer: you type a short instruction, press Enter, and it replies.",
 k: ["pwd: where am I? (print working directory)", "ls (Mac/Linux) or dir (Windows): what's in this folder?", "cd foldername: go into a folder. cd ..: go up one level", "mkdir name: make a folder. touch name (Mac) / ni name (Windows PowerShell): make a file", "Tab auto-completes names, and the up arrow repeats your last command"],
 t: ["Open the terminal inside VS Code: View → Terminal (or Ctrl+`)", "Run pwd to see where you are, and ls (or dir) to list files", "Use cd to move into your code folder", "Make a new folder called terminal-practice with mkdir and go into it", "Create a file notes.txt from the terminal, then open it in VS Code with: code notes.txt", "Practise for 10 minutes moving around folders using only the terminal"],
 c: `pwd                    # where am I?
ls                     # list files (Windows: dir)
cd Documents/code      # go into a folder
mkdir terminal-practice
cd terminal-practice
touch notes.txt        # Windows PowerShell: ni notes.txt
code .                 # open this folder in VS Code
cd ..                  # go back up one level`,
 q: [["Why do developers use the command line?", "It's faster for many tasks, it can be scripted and automated, and most developer tools (Git, npm, Node, deployment CLIs) are designed to run from it."],
     ["What is the difference between an absolute and a relative path in the terminal?", "An absolute path starts from the root of the drive (/Users/priya/code). A relative path starts from where you are now (../images)."]],
 x: ["Panicking at an error message: read it, it usually tells you exactly what's wrong", "Typing folder names with spaces without quotes. Another reason to avoid spaces"],
 d: "You can create folders, move between them and open a project in VS Code using only the terminal.",
 min: 60
},
"w3-2": {
 m: "Git is a time machine for your code. Break something? Go back to when it worked.",
 e: "Git is like save points in a video game. Every time your project is in a good state, you make a commit: a snapshot with a short message like \"add contact form\". If you mess up later, you can look at or return to any earlier snapshot. Before committing, you choose which changes to include by \"staging\" them with git add, like putting items in a box before sealing it.",
 k: ["git init: start tracking a folder (once per project)", "git status: what has changed? Run it constantly", "git add . : stage all changes. git commit -m \"message\": save the snapshot", "git log --oneline: see your history", "Good messages say what changed: \"add responsive nav\", not \"stuff\""],
 t: ["Install Git from git-scm.com (Mac users can run git --version and accept the install prompt)", "Tell Git who you are: git config --global user.name \"Your Name\" and user.email", "In your portfolio folder, run git init, then git status", "Run git add . then git commit -m \"first version of portfolio\"", "Change your hero text, then run git status and git diff to see what changed", "Commit again, then look at your history with git log --oneline"],
 c: `git config --global user.name "Priya Sharma"
git config --global user.email "priya@example.com"

cd Documents/code/portfolio
git init
git status
git add .
git commit -m "first version of portfolio"

# after making changes
git diff                 # see exactly what changed
git add .
git commit -m "update hero tagline"
git log --oneline        # see history`,
 q: [["What is Git and why is it used?", "Git is a distributed version control system. It tracks changes to files over time, lets you go back to earlier versions, and lets many people work on the same code without overwriting each other."],
     ["What is the difference between git add and git commit?", "git add moves changes into the staging area, choosing what goes in the next snapshot. git commit saves the staged changes as a permanent snapshot with a message."],
     ["What is the difference between Git and GitHub?", "Git is the version control tool that runs on your computer. GitHub is a website that hosts Git repositories online for backup, sharing and collaboration."]],
 x: ["One giant commit at the end of the week instead of small commits as you go", "Commit messages like \"asdf\" or \"final final 2\"", "Running git init in your home folder instead of the project folder"],
 d: "Your portfolio folder has at least 3 commits with clear messages in git log.",
 min: 60
},
"w3-3": {
 m: "Your GitHub profile is your developer CV. Recruiters will look at it before they look at your resume.",
 e: "GitHub is a website that stores copies of your Git projects online. Your computer has the local repository (repo), GitHub has the remote copy. git push uploads your commits to GitHub, and git pull downloads changes from it. It's like Google Drive for code, plus a public profile showing everything you build.",
 k: ["A repository (repo) = one project folder tracked by Git", "origin = the nickname for your GitHub copy", "git push uploads commits. git pull downloads them. git clone copies a repo to your computer", "README.md is the front page of your repo, written in Markdown", "Green squares on your profile show the days you committed"],
 t: ["Create a free account on github.com with a professional username", "Click New repository, name it portfolio, and leave it empty (no README)", "Copy the commands GitHub shows under \"push an existing repository\" and run them in your terminal", "Refresh GitHub: your code is online", "Create README.md describing the project, then commit and push it", "Add a profile picture and a short bio to your GitHub profile"],
 c: `# connect your local repo to GitHub (once)
git remote add origin https://github.com/your-username/portfolio.git
git branch -M main
git push -u origin main

# every time after that
git add .
git commit -m "add projects section"
git push`,
 q: [["What is the difference between git push, git pull and git clone?", "clone copies a remote repository to your computer for the first time. pull fetches and merges new changes from the remote. push uploads your local commits to the remote."],
     ["What is a README and why does it matter?", "A Markdown file shown on the repo's front page. It explains what the project does, how to run it and what it looks like. It's often the first thing a recruiter reads."]],
 x: ["Making the GitHub username something you'd be embarrassed to show an employer", "Pushing passwords or secret keys (you'll learn .env files in week 12)", "Forgetting to push, so the work only exists on your laptop"],
 d: "Your portfolio code is on GitHub with a README, and your profile has a photo and bio.",
 min: 60
},
"w3-4": {
 m: "A website that only runs on your laptop is a secret. Today you make it public, for free.",
 e: "Hosting means putting your files on a computer that's always on and connected to the internet, so anyone can visit. GitHub Pages does this for free for plain HTML/CSS/JS sites: you flip a switch in your repo's settings and get a link like your-username.github.io/portfolio. Every time you push, the live site updates.",
 k: ["Static site = just files (HTML, CSS, JS, images), no server code", "GitHub Pages hosts static sites free from a repo", "Your site's URL: https://username.github.io/repo-name", "Netlify and Vercel are popular alternatives with drag-and-drop deploys", "Changes go live a minute or two after you push"],
 t: ["On GitHub, open your portfolio repo → Settings → Pages", "Under \"Build and deployment\", choose Deploy from a branch → main → / (root) → Save", "Wait 1–2 minutes and open the link GitHub shows", "Open the live link on your phone", "Change something, commit and push, then refresh the live site to see the update", "Add the live link to your README and your repo's About section"],
 q: [["What is the difference between a static and a dynamic website?", "A static site serves the same pre-made files to everyone. A dynamic site generates pages on the server, often using a database, so content can change per user, like a logged-in dashboard."],
     ["What is web hosting?", "A service that stores your website's files on servers that are always online, so anyone can reach your site through its URL."]],
 x: ["Using capitalised file names that work on Windows but break online, where Image.JPG and image.jpg are different files", "Broken image paths that start with C:/Users/... instead of being relative"],
 d: "Your portfolio is live on a public URL, and it updates when you push.",
 min: 45
},
"w3-5": {
 m: "DevTools lets you look inside any website on the internet. It's like having X-ray vision.",
 e: "Chrome DevTools is a toolbox hidden inside your browser. The Elements tab shows a page's HTML and CSS and lets you edit them live (only on your screen, nothing is saved). The Console tab is where JavaScript prints messages and errors. The Network tab shows every file the page downloads. You'll use DevTools every single day as a developer.",
 k: ["Open with F12, Ctrl+Shift+I (Cmd+Option+I on Mac), or right-click → Inspect", "Elements: inspect and live-edit HTML/CSS. Great for experimenting before changing your file", "Console: see errors (in red) and run JavaScript", "Network: see every request, its size and how long it took", "Device toolbar: preview phones and tablets"],
 t: ["Open your favourite news site, inspect the headline and change its text in Elements (only you see it)", "Click an element and change its colour and padding in the Styles panel", "Open the Console tab and type 2 + 2 then press Enter", "Open the Network tab, reload the page, and find the biggest file", "On your own portfolio, use Elements to try 3 design tweaks, then copy the ones you like into style.css"],
 q: [["How do you debug a CSS layout problem?", "Inspect the element in DevTools, check which rules apply and which are crossed out, look at the box model for unexpected margin or padding, and toggle properties live until it looks right."],
     ["What can the Network tab tell you?", "Every request the page makes, its status code, size, timing, headers and response. It's useful for finding slow files, failed API calls and caching problems."]],
 x: ["Editing in DevTools, then refreshing and losing everything. Copy changes back into your files", "Ignoring red errors in the Console"],
 d: "You can inspect any element, change its styles live, and find errors in the Console.",
 min: 45
},
"w3-6": {
 m: "Programming isn't typing code. It's breaking a big problem into small steps a computer can follow.",
 e: "Computers are extremely fast but extremely literal: they do exactly what you say, nothing more. Thinking like a programmer means taking a fuzzy goal like \"make a to-do app\" and breaking it into tiny, precise steps, like a recipe. Writing those steps in plain English first is called pseudocode. AI tools like ChatGPT or Claude are brilliant tutors for this, but if they write all your code, you won't learn.",
 k: ["Decompose: break big problems into smaller ones until each is easy", "Pseudocode: write the steps in plain English before writing code", "Google the exact error message: someone has had it before", "Use AI to explain, review and give hints, not to do your homework", "Being stuck is normal. Try 20 minutes alone, then ask for help with a clear question"],
 t: ["Write pseudocode for making a cup of chai, step by step, as if for a robot that knows nothing", "Write pseudocode for a to-do app: what happens when someone adds a task? Deletes one?", "Ask an AI assistant: \"Explain the CSS box model like I'm 10 years old\". Then ask it to quiz you", "Practise a good question: what you tried, what you expected, what happened, and the error message", "Join one beginner community: freeCodeCamp forum, The Odin Project Discord or r/learnprogramming"],
 c: `PSEUDOCODE: add a task to a to-do list

when the user clicks "Add":
    read the text from the input box
    if the text is empty:
        show a message "Please type a task"
        stop
    create a new list item with that text
    add it to the list on the page
    clear the input box`,
 q: [["How do you approach a problem you've never solved before?", "Make sure I understand the requirement, break it into smaller steps, write pseudocode, solve the simplest version first, test it, then build up. I search docs and errors when stuck and ask for help with a clear description."],
     ["How do you use AI tools in your workflow?", "As a pair programmer and tutor: to explain concepts, suggest approaches, review my code and generate boilerplate. I always read, understand and test the code it gives me, because I'm responsible for it."]],
 x: ["Copy-pasting code you don't understand", "Staying stuck for 3 hours without asking anyone", "Comparing your day 20 to someone else's day 500"],
 d: "You've written pseudocode for a to-do app and know exactly where to ask when you get stuck.",
 min: 45
},
"w3-p": {
 m: "Real developers ship. Today your portfolio becomes a real, public, version-controlled project.",
 e: "You'll finish Phase 1 by polishing your portfolio and working on it the way professionals do: small commits with clear messages, a good README, and a live link you can share. By the end of today you'll have something real to post on LinkedIn.",
 k: ["Commit small and often with clear messages", "README: what it is, a screenshot, the live link, the tech used", "Share your work early: feedback makes you better", "Phase 1 checkpoint: HTML, CSS, terminal, Git, GitHub and deployment"],
 t: ["Make at least 5 small improvements to your portfolio, committing after each one", "Take a screenshot of the site and add it to the README with the live link", "Add a \"Technologies\" section to the README: HTML5, CSS3, Flexbox, Grid", "Ask a friend to open the live link on their phone and tell you one thing that's confusing. Fix it", "Post on LinkedIn: \"Day 21 of my 90-day MERN journey: I built and deployed my first website\" with the link", "Review the Phase 1 lessons and note any topic you want to revisit"],
 c: `# Priya's Portfolio

My personal portfolio, built from scratch while learning web development.

**Live site:** https://priya-sharma.github.io/portfolio

![Screenshot](screenshot.png)

## Built with
- HTML5 (semantic, accessible)
- CSS3: Flexbox, Grid, custom properties
- Responsive, mobile-first design
- Deployed on GitHub Pages`,
 q: [["Tell me about a project you've built.", "Use a short structure: what it is, why you built it, the technologies, one challenge you solved (like making the layout responsive), and what you'd improve next. Always have the live link ready."],
     ["What did you learn from building your first website?", "Be specific: how the box model affects layout, why semantic HTML matters for accessibility, mobile-first thinking, and working with Git commits and deployments."]],
 x: ["Waiting until it's \"perfect\" to share it. It never will be", "No live link in the README"],
 d: "Your portfolio is live, has a README with a screenshot and link, has 10+ commits, and you've shared it publicly.",
 min: 180
}
};
