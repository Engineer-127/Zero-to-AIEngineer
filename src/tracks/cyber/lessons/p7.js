/* Cyber Phase 7: Capstone, Certifications & Career (Week 12)
   Prove the whole chain on a lab you own, then plan certs, CTFs, in-scope bug bounties and the job search. */
export default {

/* ---------- Week 12: Capstone, certifications and career ---------- */
"w12-1": {
 m: "Time to do the whole thing yourself: a full assessment of a lab target, recon to access, no hand-holding.",
 e: "Your capstone begins today: a complete penetration test of a machine you own or an authorised lab box, applying everything from Phases 3–6 in order, recon, enumeration, exploitation, privilege escalation, and detection, following your own methodology and documenting as you go. This is the single best proof of skill you can show an employer, because it demonstrates the full process, not isolated tricks, all on a legal target.",
 k: ["A full, end-to-end assessment on an authorised target", "Apply your methodology: recon -> enumerate -> exploit -> escalate -> document", "Document continuously; the report is the deliverable", "Pair every finding with its remediation", "Scope it to a machine you own or a sandboxed training box"],
 t: ["Choose a capstone target you own or an authorised lab box", "Fill in your rules-of-engagement template for it", "Work the full methodology, documenting each phase with evidence", "Record every finding with impact and remediation", "Keep raw evidence organised for the report"],
 note: "Run the capstone only against a machine you own or a sandboxed, authorised training box. This is the same legal boundary as the whole course.",
 q: [["Why is a full end-to-end assessment the best proof of skill?", "It shows you can run the complete process, scope, recon, enumeration, exploitation, escalation and reporting, with methodology and documentation, rather than just performing isolated techniques."],
     ["What should you confirm before starting any assessment?", "That you have explicit authorisation and a clear scope (which here means a target you own or a sandboxed lab), and rules of engagement, so everything you do is legal and in bounds."]],
 x: ["Starting the capstone without defining scope and authorisation", "Leaving documentation until the end and losing detail"],
 d: "You've begun a full, documented assessment of an authorised target following your methodology.",
 min: 90
},
"w12-2": {
 m: "The report is the product. Clients and employers judge you on how clearly you communicate findings and fixes.",
 e: "A professional penetration-test report has a predictable structure: an executive summary (plain-language risk for leadership), a methodology/scope section, detailed findings each with severity, impact, reproduction and remediation, and an appendix of evidence. Writing well matters as much as hacking well; a brilliant finding nobody can understand or fix is worthless. You'll turn your capstone work into a proper report, which becomes a centrepiece of your portfolio.",
 k: ["Structure: executive summary, scope/methodology, findings, remediation, appendix/evidence", "Executive summary: business risk in plain language for non-technical readers", "Each finding: severity, impact, reproduction steps, remediation", "Risk ratings (e.g. CVSS) communicate severity consistently", "Clear, actionable remediation is the most valued part"],
 t: ["Write an executive summary of your capstone in plain language", "Document each finding with severity, impact, reproduction and fix", "Assign risk ratings and justify them", "Add an evidence appendix (screenshots, command output)", "Review the whole report as if you were the client receiving it"],
 q: [["What sections does a penetration-test report typically contain?", "An executive summary, scope and methodology, detailed findings (each with severity, impact, reproduction and remediation), and appendices with evidence. The summary targets leadership; the findings target the technical team."],
     ["Why is the executive summary important?", "It communicates the overall risk and business impact in plain language to decision-makers who won't read the technical detail but decide on funding and priorities for fixes."]],
 x: ["Writing only technical detail with no executive summary", "Findings without clear, actionable remediation"],
 d: "You've produced a complete, well-structured pentest report from your capstone.",
 min: 90
},
"w12-3": {
 m: "Certifications open doors and structure your learning. Pick the right one for where you're going.",
 e: "Certifications prove a baseline to employers and give you a study path. For beginners, CompTIA Security+ covers broad fundamentals (often wanted for defensive/entry roles). For hands-on pentesting, entry certs like eJPT and practical ones like PNPT are well regarded, and OSCP is the respected (hard, hands-on) standard for offensive roles. The right choice depends on your goal: defensive/SOC roles lean toward Security+ and blue-team paths; offensive roles toward eJPT → PNPT → OSCP. You'll make a dated plan today.",
 k: ["Security+: broad fundamentals, strong for entry and defensive roles", "eJPT: beginner-friendly, hands-on pentest cert", "PNPT: practical pentest exam with a real report requirement", "OSCP: hard, hands-on, highly respected for offensive roles", "Blue-team paths (e.g. SOC analyst certs) suit defensive careers"],
 t: ["Decide your direction: offensive, defensive, or still exploring", "Research the certs that fit that direction and their prerequisites", "Pick your first cert and read its official objectives", "Make a dated study plan with milestones to the exam", "Note the free/cheap resources that map to that cert"],
 q: [["Which certification suits a beginner aiming for a SOC/defensive role?", "CompTIA Security+ for broad fundamentals, complemented by blue-team practice (e.g. SOC analyst paths), since defensive roles value fundamentals, log analysis and incident-response skills."],
     ["What is the OSCP known for?", "A challenging, fully hands-on offensive-security certification requiring you to compromise machines in an exam lab and write a professional report, widely respected as evidence of practical pentesting skill."]],
 x: ["Chasing OSCP first with no fundamentals", "Collecting certs with no hands-on practice behind them"],
 d: "You've chosen a first certification aligned to your goal and written a dated study plan.",
 min: 50
},
"w12-4": {
 m: "CTFs are legal playgrounds that sharpen skills fast and look great on a profile.",
 e: "Capture the Flag competitions are legal, gamified challenges where you solve security puzzles to find 'flags'. They're a superb way to practise, stay sharp, and demonstrate skill, beginners can start with picoCTF, and CTFtime lists ongoing events. Because the challenges are designed to be solved, there's no authorisation issue. Doing CTFs regularly, and publishing write-ups, builds both ability and a visible track record employers notice.",
 k: ["CTFs are legal, designed-to-be-solved security challenges", "Categories: web, crypto, forensics, reverse engineering, pwn, OSINT", "picoCTF is beginner-friendly; CTFtime lists events and teams", "Write-ups of solved challenges build your public profile", "Regular practice keeps skills sharp between bigger projects"],
 t: ["Create a picoCTF account and solve a few beginner challenges", "Pick a favourite category and solve 3 challenges in it", "Write up one challenge (approach, not just the answer)", "Find an upcoming beginner-friendly event on CTFtime", "Add your CTF write-ups to your portfolio"],
 note: "CTF challenges are authorised by design. Solve only the challenges the platform provides.",
 q: [["What is a CTF and why is it valuable for learning?", "A Capture the Flag is a legal competition of security puzzles across categories like web, crypto and forensics. It builds and sharpens practical skills safely, and write-ups demonstrate ability to employers."],
     ["Why are CTFs free of authorisation concerns?", "The challenges are purpose-built to be solved by participants, so engaging with them is the intended, authorised use, unlike testing real systems."]],
 x: ["Only reading write-ups instead of solving challenges", "Not publishing write-ups that would showcase your skill"],
 d: "You've solved beginner CTF challenges and published at least one write-up.",
 min: 55
},
"w12-5": {
 m: "Bug bounties let you test real systems legally, but only if you respect scope and safe harbour.",
 e: "Bug-bounty programs invite researchers to find vulnerabilities in specified systems, legally, within published rules. This is the one place you test real, third-party systems, and it's legal only because the program authorises in-scope testing under its safe-harbour terms. The discipline you've built all course, reading scope carefully and never straying, is exactly what keeps bug hunting legal. You'll learn to read a program's scope and safe harbour before ever testing anything.",
 k: ["Bug bounties authorise testing only of explicitly in-scope assets, under their rules", "Safe harbour: a promise not to pursue good-faith, in-scope research", "Out-of-scope assets are NOT authorised: testing them is a crime", "Read scope, rules and reporting process before touching anything", "Start on beginner-friendly programs and report clearly and responsibly"],
 t: ["Read 3 real bug-bounty program policies and identify scope, out-of-scope and safe harbour", "Explain why testing an out-of-scope subdomain is still illegal", "Study a published disclosure to see how a good report reads", "Write your personal pre-test checklist (confirm scope every time)", "Note which beginner-friendly programs you might start with"],
 note: "On bug-bounty platforms you are authorised ONLY for assets listed as in-scope, under that program's rules and safe harbour. Testing anything out of scope is unauthorised access and a crime, regardless of the platform.",
 q: [["What is safe harbour in bug bounties, and what are its limits?", "A commitment not to pursue legal action against researchers acting in good faith within the published scope and rules. It does not cover out-of-scope assets or rule violations, which remain unauthorised and potentially criminal."],
     ["What must you check before testing a bug-bounty target?", "The program's in-scope and out-of-scope assets, the allowed and forbidden techniques, the safe-harbour terms, and the reporting process, confirming the specific asset is in scope before any testing."]],
 x: ["Testing an asset because it belongs to the company, without checking it's in scope", "Ignoring forbidden techniques listed in the program rules"],
 d: "You can read a bug-bounty policy and correctly identify exactly what you are and aren't authorised to test.",
 min: 50
},
"w12-6": {
 m: "Skills get you the interview; a visible track record gets you noticed. Build your security profile.",
 e: "Employers want evidence. Your write-ups (CTFs, labs, your capstone report), a home-lab blog, a tidy GitHub, a focused LinkedIn and a clear resume turn your three months of work into something recruiters can see. Coming from any background, this body of public work is your strongest asset. You'll assemble it today, and write your story: why security, what you've built, and where you're headed. This is how you convert learning into opportunities, the right way.",
 k: ["Publish write-ups: CTFs, lab machines, and your capstone report", "A home-lab blog or GitHub shows consistent, hands-on work", "LinkedIn: a clear security headline and your projects featured", "Resume: skills, projects with specifics, and your target role", "Your story: why security, what you've done, where you're going"],
 t: ["Collect your course write-ups and publish them (GitHub/blog)", "Write a GitHub profile README summarising your security skills and projects", "Update LinkedIn with a security headline and featured write-ups", "Draft a one-page resume with your capstone and key projects", "Rehearse a 60-second introduction of your security journey"],
 q: [["How do you demonstrate security skills without professional experience?", "Through a visible body of work: published CTF and lab write-ups, a documented capstone pentest report, a home-lab blog, a tidy GitHub and relevant certifications, which together prove hands-on, practical ability."],
     ["What belongs on an entry-level security resume?", "Relevant skills and tools, concrete projects (especially your capstone with specifics), any certifications and CTF/lab achievements, and a clear target role, prioritising evidence of hands-on work."]],
 x: ["Doing great work but never publishing it", "A generic resume with no projects or specifics"],
 d: "Your write-ups, GitHub, LinkedIn and resume are updated, and you can give a 60-second introduction.",
 min: 60
},
"w12-p": {
 m: "Day 84. You started with the law and a lab; now you finish with a full pentest report and a plan for what's next.",
 e: "Your capstone project is a complete penetration-test report on a lab you own or an authorised box, from scope and recon through exploitation and privilege escalation to detection and remediation, published as a portfolio write-up, plus a dated study plan for your chosen certification. This single deliverable proves the whole journey and gives you something concrete to show employers. Then you keep going: more CTFs, your cert, in-scope bug bounties, and applications.",
 k: ["A complete, published pentest report on an authorised target", "Covers the full chain with findings, evidence and remediation", "A dated certification study plan", "A clear next-steps roadmap: CTFs, cert, in-scope bounties, applications"],
 t: ["Finish and polish your capstone pentest report (exec summary to appendix)", "Publish it as a portfolio write-up (redacting anything sensitive)", "Finalise your dated study plan for your first certification", "List your next 3 months: CTFs, cert milestones, in-scope bug-bounty practice", "Share your journey publicly (e.g. a post) with your report linked", "Re-read your ethics pledge, now as a working professional"],
 note: "The capstone targets only a machine you own or a sandboxed, authorised box. Everything you do next, CTFs, bug bounties, must stay within authorised scope, for your whole career.",
 q: [["Walk me through your capstone penetration test.", "Define scope on an authorised target, perform recon and enumeration, identify and exploit weaknesses, escalate privileges, show how the activity could be detected, and deliver a report with an executive summary, detailed findings, evidence and prioritised remediation, all within scope."],
     ["What are your next steps after finishing this roadmap?", "Keep practising (CTFs and lab machines), earn a certification aligned to my goal, practise responsibly on in-scope bug-bounty programs, publish write-ups, and apply for entry roles like SOC analyst or junior pentester, while always staying within authorisation."]],
 x: ["A capstone with no report, or one that's only technical with no exec summary", "Treating day 84 as the finish line rather than the start of a career"],
 d: "Your capstone pentest report is published, your certification plan is dated, and you have a clear next-steps roadmap. You've completed the path.",
 min: 240
}
};
