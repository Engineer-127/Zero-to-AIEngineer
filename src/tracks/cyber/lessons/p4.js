/* Cyber Phase 4: Web Application Security (Weeks 7-8)
   Legal, labs-only: PortSwigger Academy, your own Juice Shop/DVWA. Each flaw paired with its fix. */
export default {

/* ---------- Week 7: Web foundations and the OWASP Top 10 ---------- */
"w7-1": {
 m: "Web apps are the biggest attack surface on the internet. Understanding how they work is step one to securing them.",
 e: "A web app is a conversation: the browser sends HTTP requests, the server responds. State is tracked with cookies and sessions, because HTTP itself forgets you between requests. The browser enforces boundaries like the same-origin policy so one site can't freely read another. Before testing anything, you need this model clear: requests and responses, how a session proves 'it's still me', and where trust boundaries sit. Everything you'll test on the labs maps back to these basics.",
 k: ["HTTP request = method + path + headers (+ body); response = status + headers + body", "Cookies carry a session identifier so the server remembers a logged-in user", "Sessions: the server trusts the session cookie as proof of identity", "Same-origin policy limits how one origin's page can read another's data", "The server must never trust the client; anything from the browser can be forged"],
 t: ["Run OWASP Juice Shop in your lab and browse it with dev tools open", "Identify the request/response for a login and read the headers", "Find the session cookie and explain what it proves to the server", "Note which data comes from the client (and so can't be trusted)", "Explain the same-origin policy in one sentence"],
 note: "Practise web testing only on apps you run yourself (Juice Shop/DVWA) or official training labs (PortSwigger). Never test a website you don't own or aren't authorised to test.",
 q: [["How does a server remember a logged-in user across stateless HTTP requests?", "It issues a session identifier (usually in a cookie) after login; the browser sends it with each request, and the server looks it up to recognise the user. The cookie is effectively proof of identity, so it must be protected."],
     ["What is the same-origin policy?", "A browser security rule that restricts how a document or script from one origin (scheme + host + port) can interact with resources from another, preventing one site from freely reading another's data."],
     ["Why must a server never trust client-side data?", "Anything from the browser, form fields, headers, cookies, hidden values, can be modified by the user, so all validation and authorisation must be enforced on the server."]],
 x: ["Assuming client-side validation provides security", "Confusing authentication (who you are) with session management (staying logged in)"],
 d: "You can describe the request/response cycle, sessions, and why the server can't trust the client.",
 min: 55
},
"w7-2": {
 m: "A proxy that sits between your browser and the app lets you see and modify every request. It's the web hacker's core tool.",
 e: "Burp Suite (and alternatives like OWASP ZAP) is an intercepting proxy: it sits between your browser and the web app so you can inspect, modify and replay every request. This is how you test what the server does with unexpected input, exactly the thing client-side code hides from you. You'll point Burp at your own lab app, learn to intercept a request, edit it, and send it to the Repeater to experiment. Used on authorised targets only, it's indispensable.",
 k: ["An intercepting proxy sees and lets you modify every HTTP request/response", "Burp's Proxy intercepts; Repeater replays and tweaks a single request; Intruder automates", "Point your browser at Burp and install Burp's CA cert to read HTTPS in your lab", "Modifying requests reveals what the server trusts (and shouldn't)", "Use it only against your own lab app or authorised labs like PortSwigger"],
 t: ["Set up Burp (or ZAP) as your browser's proxy against Juice Shop", "Intercept a login request and read every field", "Send it to Repeater and change a value, then resend and observe", "Explain how editing a request bypasses client-side checks", "Note the Burp features (Proxy, Repeater, Intruder) and what each is for"],
 note: "Use an intercepting proxy only against applications you run yourself or official training labs. Intercepting a third party's traffic or app without authorisation is unlawful.",
 q: [["What is an intercepting proxy and why is it essential for web testing?", "A tool like Burp Suite that sits between the browser and the server so you can view, modify and replay HTTP requests. It lets you test the server directly with crafted input, bypassing client-side logic that would otherwise constrain you."],
     ["What's the difference between Burp Repeater and Intruder?", "Repeater lets you manually edit and resend a single request to experiment; Intruder automates sending many requests with varying payloads, for example to test a parameter systematically (within authorised scope)."]],
 x: ["Forgetting to install Burp's CA cert and being unable to read HTTPS in the lab", "Pointing the proxy at systems you aren't authorised to test"],
 d: "You can intercept, modify and replay a request against your own lab app with Burp or ZAP.",
 min: 55
},
"w7-3": {
 m: "The OWASP Top 10 is the industry's shared list of what goes wrong most. Know it and you know where to look.",
 e: "The OWASP Top 10 is a regularly updated list of the most critical web application security risks, broken access control, injection, cryptographic failures, security misconfiguration, vulnerable components, and more. It's not a checklist of exploits but a map of risk categories that both attackers and defenders organise around. Today you tour all ten so the specific labs you do next have a home, and so you can speak the common language used in every security team.",
 k: ["The Top 10 is risk categories, not a step-by-step exploit list", "Broken Access Control sits at the top: users doing things they shouldn't", "Injection (SQL, command, etc.) and XSS are perennial entries", "Security misconfiguration and vulnerable/outdated components are extremely common", "Each category has well-known defences; learn the fix with the flaw"],
 t: ["Read the current OWASP Top 10 list and write a one-line summary of each", "For each category, note one everyday example", "Identify which Top 10 categories you've already touched (recon, misconfig)", "Pick the 3 you most want to practise and why", "Map each category to its primary defence in a table"],
 q: [["What is the OWASP Top 10?", "A periodically updated, community-driven list of the ten most critical web application security risk categories, used industry-wide to prioritise defence and testing. It describes classes of risk rather than specific exploits."],
     ["Why is Broken Access Control considered so important?", "It's one of the most common and impactful categories: it lets users access data or actions they shouldn't (like viewing others' records or admin functions), and it's often easy to exploit and easy to overlook."]],
 x: ["Treating the Top 10 as an exhaustive list of all web vulnerabilities", "Learning the flaw without learning its defence"],
 d: "You can summarise all ten OWASP categories and name a defence for each.",
 min: 50
},
"w7-4": {
 m: "The most common real-world web bug is simple: the app lets you do things you shouldn't be allowed to.",
 e: "Broken access control means the server fails to enforce who can do or see what. The classic form is IDOR (Insecure Direct Object Reference): change an id in a request (/account?id=123 to id=124) and you see someone else's data, because the server checked you were logged in but not that the record is yours. The fix is to enforce authorisation on every request, server-side, tied to the logged-in user. You'll practise this safely on PortSwigger labs built for it.",
 k: ["Access control = enforcing what an authenticated user is allowed to do", "IDOR: predictable references (ids) let you reach other users' objects", "Forced browsing: reaching admin pages/URLs that aren't linked but aren't protected", "Root cause: authorisation checked at the client or not per-object", "Fix: enforce authorisation server-side on every request, scoped to the user"],
 t: ["Do PortSwigger's access-control labs (IDOR and forced browsing)", "For one lab, capture the request and change the object id in Burp", "Observe accessing another user's data, then stop and note the impact", "Write the vulnerable logic and the corrected server-side authorisation check", "List how you'd test your own app for IDOR"],
 c: `# vulnerable: only checks that SOMEONE is logged in
GET /api/account?id=124      ->  returns account 124 regardless of who you are

// fixed (server-side): the record must belong to the logged-in user
app.get("/api/account", requireLogin, (req, res) => {
  const account = db.getAccount(req.query.id);
  if (!account || account.ownerId !== req.user.id) return res.sendStatus(403);
  res.json(account);
});`,
 note: "Practise IDOR and access-control testing only on PortSwigger labs or your own app. Accessing other people's data on a real system without authorisation is a serious offence.",
 q: [["What is IDOR?", "Insecure Direct Object Reference: when an app exposes a reference to an object (like a numeric id) and doesn't verify the requester is authorised for that specific object, so changing the id reveals other users' data or actions."],
     ["How do you fix broken access control?", "Enforce authorisation on the server for every request, denying by default and checking that the authenticated user owns or may access the specific resource, rather than relying on hidden fields or client-side checks."]],
 x: ["Relying on 'the link isn't shown' to protect an admin page", "Checking authentication but not per-object authorisation"],
 d: "You can demonstrate and explain IDOR on a lab and write the correct server-side authorisation fix.",
 min: 55
},
"w7-5": {
 m: "If login and sessions are weak, every other control is moot. Authentication is the front door.",
 e: "Authentication flaws let attackers become someone else: weak or guessable passwords, no rate-limiting on login (enabling brute force), usernames enumerable from error messages, and poor session handling (predictable or non-expiring session tokens, session fixation). The defences are well established: strong password policies, multi-factor authentication, lockout/rate-limiting, generic error messages, and secure, random, expiring session tokens. You'll practise identifying these on PortSwigger's authentication labs and pair each with its fix.",
 k: ["Weak credentials + no rate-limiting = brute force works", "Username enumeration: different responses reveal which accounts exist", "Session flaws: predictable tokens, no expiry, session fixation", "Defences: MFA, rate-limiting/lockout, generic errors, secure random session tokens", "Cookies: set HttpOnly, Secure and SameSite to protect session tokens"],
 t: ["Do PortSwigger's authentication labs (brute force, username enumeration)", "Note how a different error message leaks which usernames exist", "Explain why rate-limiting and MFA defeat password guessing", "Inspect a session cookie and note whether HttpOnly/Secure/SameSite are set", "Write the fix for each flaw you practised"],
 c: `// fixes for common auth flaws
// 1. generic error (prevents username enumeration)
if (!user || !valid) return res.status(401).send("Invalid username or password");
// 2. rate-limit login attempts per account/IP, then lock/slow down
// 3. secure session cookie
res.cookie("sid", token, { httpOnly: true, secure: true, sameSite: "lax" });
// 4. require MFA for sensitive accounts/actions`,
 note: "Test authentication flaws only on PortSwigger labs or an app you own. Brute-forcing logins on real systems is unauthorised access.",
 q: [["What is username enumeration and why does it matter?", "When an app's responses differ for valid vs invalid usernames (via messages, status codes or timing), attackers can compile a list of real accounts to target with password attacks. Generic responses prevent it."],
     ["Name four defences against authentication attacks.", "Multi-factor authentication, rate-limiting/lockout on login attempts, strong password policies, and secure session management (random, expiring tokens with HttpOnly/Secure/SameSite cookies), plus generic error messages."]],
 x: ["Leaking which accounts exist through error messages or timing", "Session tokens that never expire or lack HttpOnly/Secure flags"],
 d: "You can identify authentication/session flaws on a lab and state the defence for each.",
 min: 55
},
"w7-6": {
 m: "Every flaw you find is only half the job. Writing the fix is what makes you valuable.",
 e: "A finding without a remediation is just a complaint. For every vulnerability you practise, you'll write the root cause and the concrete fix, ideally vulnerable code beside corrected code. This habit turns you from someone who 'found a bug' into someone who improves security, which is what employers and clients pay for. It also deepens your understanding: you only truly grasp a vulnerability once you can explain exactly why the fix closes it.",
 k: ["Every finding needs: what, impact, how to reproduce, and how to fix", "Pair vulnerable code with corrected code to show you understand the root cause", "Risk ratings (e.g. CVSS-style) communicate severity to non-experts", "Defence maps to the Top 10 category and its standard mitigations", "Remediation advice is the most valued part of a report"],
 t: ["For each flaw you practised this week, write root cause + fix", "Create a mini finding template: title, severity, impact, steps, remediation", "Write one finding fully, as it would appear in a report", "Assign a severity and justify it in one line", "Explain one fix to a non-technical person in plain language"],
 q: [["What makes a good vulnerability finding in a report?", "A clear title, a severity/risk rating, the impact in business terms, reliable reproduction steps, and specific, actionable remediation, ideally referencing the root cause and standard fixes."],
     ["Why write the fix, not just the flaw?", "Remediation is the value to the client and proves you understand the root cause; a finding without a fix is just a problem statement."]],
 x: ["Reporting flaws with no remediation advice", "Vague severities with no justification"],
 d: "You can write a complete finding, with impact, reproduction and remediation, for a web vulnerability.",
 min: 45
},
"w7-p": {
 m: "Prove the week on real labs: find access-control and authentication flaws, and document the fixes.",
 e: "Your project is to complete a set of PortSwigger Web Security Academy labs on access control and authentication, then write each up with root cause, impact and remediation. PortSwigger's labs are free, legal and designed for exactly this, so you get real practice with zero authorisation worries, and you finish with report-ready write-ups for your portfolio.",
 k: ["PortSwigger Academy labs are legal, free and purpose-built", "Cover access control (IDOR, forced browsing) and authentication", "Each write-up: flaw, impact, reproduction, fix", "Report-ready documentation for your portfolio"],
 t: ["Complete several access-control labs on PortSwigger", "Complete several authentication labs on PortSwigger", "Document each: what it was, how you found it, impact, and the fix", "Group them into a short 'web findings' report", "Publish it as a write-up (the labs are public, so this is shareable)"],
 note: "Use PortSwigger Academy and your own Juice Shop/DVWA only. These are authorised by design; nothing here applies to third-party sites.",
 q: [["Describe a web access-control flaw you practised and its fix.", "For example an IDOR where changing a record id returned another user's data; the fix is a server-side authorisation check confirming the authenticated user owns the requested object, denying by default."],
     ["Why are platforms like PortSwigger Academy ideal for practice?", "They're free, legal and built to be exploited, with guided labs and solutions, so you can practise real techniques safely and then publish your write-ups."]],
 x: ["Copying lab solutions without understanding the root cause", "Omitting remediation from the write-ups"],
 d: "You've completed and documented several access-control and authentication labs with fixes.",
 min: 120
},

/* ---------- Week 8: Injection, XSS and web exploitation practice ---------- */
"w8-1": {
 m: "Injection is decades old and still everywhere: it happens when data gets treated as code.",
 e: "Injection flaws occur when user input is fed into an interpreter, a database, a shell, a template, without proper separation, so part of the input is executed as a command. SQL injection is the classic: input that changes the meaning of a database query. The root cause is always the same (mixing untrusted data with code), and so is the fix: keep data and code separate, with parameterised queries, safe APIs and strict input handling. You'll study it conceptually, then practise on labs.",
 k: ["Injection = untrusted input interpreted as code/commands", "SQL injection manipulates database queries built by string concatenation", "Other injections: OS command, NoSQL, LDAP, template injection", "Root cause: mixing data with code; fix: keep them separate", "Parameterised queries / prepared statements are the primary SQLi defence"],
 t: ["Read how SQL injection changes a query's meaning (conceptually)", "On a lab (DVWA/PortSwigger), observe a vulnerable query responding to input", "Write the vulnerable concatenated query and the parameterised fix side by side", "Explain why input filtering alone is weaker than parameterisation", "List three injection types beyond SQL"],
 c: `// vulnerable: input becomes part of the query (SQL injection)
const q = "SELECT * FROM users WHERE name = '" + input + "'";

// fixed: parameterised query keeps data separate from code
db.query("SELECT * FROM users WHERE name = ?", [input]);`,
 note: "Practise injection only on labs you run (DVWA, Juice Shop) or PortSwigger. Injecting payloads into systems you don't own is a crime.",
 q: [["What is the root cause of injection vulnerabilities?", "Untrusted input being combined with code or queries so that the interpreter executes part of the input as a command, because data and code aren't kept separate."],
     ["What's the primary defence against SQL injection?", "Parameterised queries / prepared statements, which send the query structure and the data separately so input can never change the query's meaning; plus least-privilege database accounts and input validation as defence in depth."]],
 x: ["Relying on blacklist filtering instead of parameterised queries", "Thinking injection only affects SQL"],
 d: "You can explain SQL injection's root cause and write the parameterised fix.",
 min: 55
},
"w8-2": {
 m: "SQL injection can read or alter a whole database. On labs, you see exactly how, and exactly how to stop it.",
 e: "Building on the concept, you'll practise SQL injection on labs: using injected input to bypass a login, extract data, or infer information when the app gives no direct output (blind injection). The point isn't to collect tricks but to understand the mechanism so deeply that the defences, parameterised queries, least-privilege DB accounts, input validation, feel obvious. Every lab you do, you pair with the code change that would have prevented it.",
 k: ["Classic SQLi: alter WHERE clauses to bypass logic or extract data", "Blind SQLi: infer data from true/false or timing when no output is shown", "Impact: data theft, auth bypass, sometimes full takeover", "Defences: parameterised queries, least-privilege DB user, input validation, WAF as a backstop", "Modern ORMs parameterise by default, so prefer them and avoid raw string queries"],
 t: ["Do PortSwigger's SQL injection labs (login bypass, data extraction, blind)", "For one lab, capture the request and craft the input in Burp Repeater", "Note the impact of what you could read", "Write the exact code fix (parameterised query) that closes it", "Explain how a least-privilege DB account limits the damage"],
 note: "SQL injection practice is for PortSwigger labs and your own apps only. Never run injection payloads against systems you don't own or aren't authorised to test.",
 q: [["What is blind SQL injection?", "SQL injection where the application doesn't return query results directly, so the attacker infers data from indirect signals like boolean responses or time delays. It's slower but just as serious."],
     ["Why use a least-privilege database account as well as parameterised queries?", "Defence in depth: if an injection or other flaw occurs, a low-privilege account limits what can be read or changed, reducing impact, while parameterisation prevents the injection in the first place."]],
 x: ["Memorising payloads without understanding the mechanism", "Treating a WAF as a substitute for parameterised queries"],
 d: "You can perform and fully explain SQL injection on a lab and specify the code-level fix.",
 min: 55
},
"w8-3": {
 m: "XSS turns a victim's own browser against them by injecting script into a page they trust.",
 e: "Cross-site scripting (XSS) happens when an app includes untrusted input in a page without proper encoding, so an attacker's script runs in another user's browser, in the context of the trusted site. Reflected XSS bounces input straight back; stored XSS is saved and served to every viewer; DOM-based XSS happens entirely in client-side JavaScript. Impact ranges from stealing session cookies to acting as the victim. The defence is consistent: encode output for its context, validate input, and use a Content-Security-Policy.",
 k: ["XSS = untrusted input rendered as executable script in a page", "Reflected (echoed back), Stored (saved and served), DOM-based (client-side only)", "Impact: session theft, actions as the victim, defacement", "Defence: context-aware output encoding, input validation, CSP", "Frameworks that auto-escape (React, etc.) prevent most XSS when used correctly"],
 t: ["Do PortSwigger's XSS labs: reflected, stored, and DOM-based", "For one lab, identify where input is reflected unescaped", "Note what a malicious script could do in the victim's session", "Write the fix: output encoding for the context, plus a CSP header", "Explain why auto-escaping frameworks prevent most XSS"],
 c: `// vulnerable: input written into the page as HTML
element.innerHTML = userInput;           // script in input will run

// fixed: treat input as text, not HTML
element.textContent = userInput;         // encoded, cannot execute
// plus a defence-in-depth header:
// Content-Security-Policy: default-src 'self'; script-src 'self'`,
 note: "Practise XSS only on PortSwigger labs or your own app. Injecting script into a site you don't own is unauthorised and harms real users.",
 q: [["What are the three main types of XSS?", "Reflected (payload echoed back in the immediate response), stored (payload saved server-side and served to other users), and DOM-based (the flaw is in client-side JavaScript handling of input)."],
     ["How do you prevent XSS?", "Encode output appropriately for its context (HTML, attribute, JS, URL), validate input, avoid sinks like innerHTML, use frameworks that auto-escape, and add a Content-Security-Policy as defence in depth."]],
 x: ["Using innerHTML with untrusted input", "Assuming input filtering alone stops XSS without output encoding"],
 d: "You can demonstrate reflected, stored and DOM XSS on labs and write the correct encoding/CSP fix.",
 min: 55
},
"w8-4": {
 m: "CSRF and SSRF trick a trusted party into acting for the attacker. The defences are specific and worth knowing.",
 e: "CSRF (Cross-Site Request Forgery) tricks a logged-in user's browser into sending an unwanted request to a site they're authenticated on, abusing the automatic sending of cookies; the fix is anti-CSRF tokens and SameSite cookies. SSRF (Server-Side Request Forgery) tricks the server into making requests to places it shouldn't, like internal services or cloud metadata; the fix is strict allow-lists and blocking internal addresses. You'll study both conceptually with their defences, and practise where labs provide them.",
 k: ["CSRF: the victim's browser is tricked into a state-changing request using their session", "CSRF defence: anti-CSRF tokens, SameSite cookies, re-authentication for sensitive actions", "SSRF: the server is tricked into fetching attacker-chosen URLs (internal/metadata)", "SSRF defence: allow-list destinations, block internal/metadata IPs, validate URLs", "Both exploit misplaced trust: in the browser's cookies, or the server's outbound requests"],
 t: ["Explain CSRF with a concrete example (a hidden form submitting to a bank)", "Write the CSRF defences and why SameSite cookies help", "Explain SSRF and why cloud metadata endpoints are a prime target", "Write the SSRF defences (allow-list, block internal ranges)", "Do a PortSwigger CSRF or SSRF lab if available and document it"],
 note: "Practise only on labs or apps you own. SSRF against real infrastructure can reach internal systems and is strictly unauthorised without permission.",
 q: [["What is CSRF and how is it prevented?", "Cross-Site Request Forgery tricks an authenticated user's browser into sending a state-changing request to a site using their session cookie. It's prevented with anti-CSRF tokens, SameSite cookies, and requiring re-authentication for sensitive actions."],
     ["What is SSRF and why is it dangerous?", "Server-Side Request Forgery makes the server send attacker-controlled requests, potentially reaching internal services or cloud metadata endpoints that return credentials. Defences include destination allow-lists and blocking internal/metadata addresses."]],
 x: ["Confusing CSRF (abuses the browser's cookies) with SSRF (abuses the server's requests)", "Forgetting that SSRF often targets cloud metadata endpoints"],
 d: "You can explain CSRF and SSRF with their specific defences and document a lab if available.",
 min: 50
},
"w8-5": {
 m: "File uploads and path traversal are classic ways attackers reach files, or code, they shouldn't.",
 e: "If an app lets users upload files without checking type and handling them safely, an attacker may upload something dangerous or overwrite important files. Path traversal (../../) abuses input used to build file paths, letting an attacker read files outside the intended directory (like /etc/passwd). Both come from trusting user-controlled input about files. The fixes: validate and store uploads safely (no execution, random names, type checks), and never build file paths from raw user input, canonicalise and confine them.",
 k: ["Unsafe uploads: wrong type checks, executable storage, predictable names", "Path traversal: ../ sequences escape the intended directory", "Impact: reading sensitive files, sometimes code execution", "Upload fixes: validate type/size, store outside web root, randomise names, no execute", "Traversal fix: never use raw input in paths; canonicalise and restrict to a base dir"],
 t: ["Do a lab demonstrating path traversal (e.g. reading a file outside the web root)", "Explain how ../ escapes the intended directory", "Write the traversal fix (canonicalise and confine to a base directory)", "List safe file-upload handling rules", "Note why storing uploads outside the web root and disabling execution matters"],
 c: `// path traversal: raw input used to build a path
fs.readFile("uploads/" + req.query.name);   // name="../../etc/passwd" escapes

// fixed: confine to a base directory and reject traversal
const base = path.resolve("uploads");
const target = path.resolve(base, path.basename(req.query.name));
if (!target.startsWith(base + path.sep)) return res.sendStatus(400);`,
 note: "Practise file-upload and traversal testing only on labs or apps you own.",
 q: [["What is path traversal and how is it fixed?", "Using sequences like ../ in input that builds file paths to access files outside the intended directory. It's fixed by never using raw input in paths, canonicalising the resolved path, and confining access to a known base directory."],
     ["How should file uploads be handled securely?", "Validate type and size, store files outside the web root with randomised names, prevent them being executed as code, and scan where appropriate, so a malicious upload can't be served or run."]],
 x: ["Validating upload type by extension only (easily spoofed)", "Building file paths by concatenating user input"],
 d: "You can demonstrate path traversal on a lab and state safe upload and path-handling fixes.",
 min: 50
},
"w8-6": {
 m: "Real impact often comes from chaining small bugs. Seeing the chain, on a lab, is a big step up.",
 e: "Individually minor issues can combine into serious impact: an information leak reveals a username, weak auth lets you in, an IDOR exposes more data, a stored XSS spreads. Learning to chain findings, only on your own lab app or training platforms, teaches you to think like a real assessor and to prioritise findings by what they enable together. You'll also keep pairing each link with its fix, because breaking any link in the chain defends the whole thing.",
 k: ["Chaining: combine low-severity bugs into high-impact outcomes", "Example chain: info leak -> weak auth -> IDOR -> data exposure", "Prioritise findings by what they enable in combination", "Breaking any single link defends the whole chain", "Document the chain clearly; it's compelling in a report"],
 t: ["On Juice Shop, reach a score milestone by combining several flaws", "Document the chain: each step, what it enabled, and the fix", "Rate the combined impact vs the individual bugs", "Identify which single fix would break the chain most effectively", "Write the chain up as a narrative finding"],
 note: "Chain findings only on OWASP Juice Shop, your own apps, or training labs. Never on systems you don't own.",
 q: [["Why is chaining vulnerabilities important in an assessment?", "Because individually low-risk issues can combine into high-impact attacks; assessing the chain shows the real business risk and helps prioritise which fix delivers the most protection."],
     ["How do you defend against an attack chain?", "Break any link: fixing even one step (e.g. closing the IDOR or enforcing auth) can stop the whole chain, so you prioritise the fix that most reduces combined impact, while addressing the others as defence in depth."]],
 x: ["Reporting bugs in isolation and missing the combined impact", "Only testing on systems you lack authorisation for"],
 d: "You can combine multiple lab flaws into a chain, document it, and identify the most effective fix.",
 min: 50
},
"w8-p": {
 m: "A milestone on a deliberately vulnerable app, with every flaw explained and fixed, is a portfolio centrepiece.",
 e: "Your project is to reach a meaningful score tier in OWASP Juice Shop (which you run yourself) and document each flaw you exploited with its root cause and fix. Juice Shop is built to be hacked and tracks your progress, so it's a legal, structured challenge that covers much of the OWASP Top 10. The write-up, flaws, impact, remediation, becomes a strong portfolio piece and proves end-to-end web-security skill.",
 k: ["OWASP Juice Shop is a deliberately vulnerable app you run yourself", "Reach a score tier covering several OWASP categories", "Each flaw: root cause, impact, reproduction, fix", "A polished write-up for your portfolio"],
 t: ["Run Juice Shop locally and work through challenges across categories", "Document each solved challenge with its vulnerability class and fix", "Group findings by OWASP Top 10 category", "Write an executive summary of the app's overall security posture", "Publish the write-up (Juice Shop is public, so it's shareable)"],
 note: "Run Juice Shop yourself in your lab. It's authorised by design; nothing here transfers to third-party sites.",
 q: [["What does completing Juice Shop challenges demonstrate?", "Practical ability to find and exploit a broad range of web vulnerabilities (access control, injection, XSS and more) on a legal target, and to explain each flaw's cause and remediation."],
     ["How would you summarise a web app's security posture for management?", "A short, plain-language overview of the most serious risks, their business impact, and the prioritised fixes, backed by the detailed findings for the technical team."]],
 x: ["Rushing challenges without documenting causes and fixes", "Testing anything other than your own Juice Shop instance"],
 d: "You've reached a Juice Shop score tier and produced a categorised write-up with fixes for each flaw.",
 min: 150
}
};
