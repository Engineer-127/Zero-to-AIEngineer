/* Cyber Phase 13: Capstone, Certifications & National-Security Career (Weeks 23-24)
   Prove mastery end to end, then plan a legal, defensive career protecting organisations and nations. */
export default {

/* ---------- Week 23: Full-scope capstone engagement and reporting ---------- */
"w23-1": {
 m: "Twenty-two weeks in, you do the whole thing yourself: scope, attack, defend, report. This is the job.",
 e: "Your capstone is a complete engagement on an authorised lab (ideally the Active Directory lab you built, which mimics a real organisation). Today you plan it like a professional: define the scope and objectives, write the rules of engagement and authorisation (yes, even for your own lab, to cement the habit), set up your note-taking and evidence workflow, and establish the methodology you'll follow. A well-planned engagement is half the battle and the mark of a professional.",
 k: ["Define scope, objectives and rules of engagement before any testing", "Even on your own lab, write the authorisation, the habit is the point", "Set up structured note-taking and an evidence workflow up front", "Follow a methodology: recon, enumerate, exploit, escalate, pivot, document", "Plan how you'll show both the attack and its detection/prevention"],
 t: ["Choose your capstone target (ideally your AD lab) and define its scope", "Write the rules of engagement and authorisation", "Set up your evidence and note-taking workflow", "State the methodology and objectives for the engagement", "Plan to capture, for each finding, both the attack and the defence"],
 note: "Run the capstone only on a lab you own or a sandboxed, authorised environment. Define scope and authorisation before you start.",
 q: [["Why define scope and rules of engagement even for your own lab?", "To build the professional reflex of never testing without clear authorisation and boundaries, so that on real engagements it's automatic and you never stray out of scope, the behaviour that keeps testing legal."],
     ["What does good engagement planning include?", "Defined scope and objectives, rules of engagement and authorisation, an evidence and note-taking workflow, a methodology to follow, and a plan to document both attack paths and their remediation/detection."]],
 x: ["Diving into testing with no scope, plan or evidence workflow", "Testing anything outside your own lab or an authorised environment"],
 d: "You have a planned capstone: scope, authorisation, methodology and evidence workflow ready.",
 min: 60
},
"w23-2": {
 m: "Now execute the full attack chain you've trained for, methodically, on your authorised lab.",
 e: "Today you run the engagement: reconnaissance and enumeration, finding and exploiting a weakness for initial access, escalating privileges, and (in an AD lab) moving toward domain compromise, documenting every step with evidence as you go. This brings together Phases 3 through 6 into one coherent attack narrative. The discipline, enumerate thoroughly, verify before exploiting, record everything, is exactly what separates a professional engagement from random poking.",
 k: ["Execute methodically: recon, enumerate, exploit, escalate, pivot", "Document each step with evidence (commands, output, screenshots) in real time", "Verify before exploiting; stay within your defined scope", "In an AD lab, chain toward domain compromise as a realistic goal", "The output is a clear, reproducible attack narrative"],
 t: ["Run recon and thorough enumeration of your capstone target", "Gain initial access through a verified weakness, documenting it", "Escalate privileges and (in AD) pivot toward domain control", "Capture evidence at every step", "Keep your notes organised into a reproducible narrative"],
 note: "Execute only within your authorised lab scope.",
 q: [["What does a professional attack narrative look like?", "A clear, reproducible, evidence-backed sequence from initial access through escalation and pivoting to the objective, each step justified and documented, so a reader could follow or repeat it and understand the impact."],
     ["Why document in real time during an engagement?", "Because details are lost quickly; real-time evidence capture ensures accuracy, reproducibility, scope compliance, and a complete record for the report, rather than reconstructing from memory later."]],
 x: ["Rushing to exploit before thorough enumeration", "Poor real-time documentation, leading to gaps in the report"],
 d: "You've executed the engagement's attack chain on your lab with full, evidence-backed documentation.",
 min: 120
},
"w23-3": {
 m: "A great engagement shows both sides: here's how I got in, and here's exactly how you'd have stopped me.",
 e: "What makes you valuable isn't just breaking in, it's turning the engagement into defence. Today you go back through each step of your attack and document how it could have been detected (which log, which SIEM rule, which ATT&CK technique) and prevented (which control, config or patch). This dual view, offence paired with defence, is what organisations and national-security teams actually need, and it's the difference between a report that impresses and one that just lists problems.",
 k: ["For each attack step: how would it be detected, and how prevented?", "Detection: the log source, the signal, the ATT&CK technique, the rule", "Prevention: the control, configuration, patch or design change", "This dual view is the real value of an engagement", "It directly maps your offensive findings to defensive action"],
 t: ["List every step of your attack chain", "For each, write how a defender would detect it (source + technique)", "For each, write the specific prevention/control", "Map the steps to MITRE ATT&CK techniques", "Prioritise the defences by impact (which breaks the chain)"],
 q: [["Why pair every finding with both detection and prevention?", "Because the goal of an assessment is to improve security; showing how each step is detected and prevented turns an attack story into an actionable defensive roadmap, which is what clients and employers value most."],
     ["How do you prioritise remediation from an engagement?", "By impact and by what breaks the attack chain earliest or most broadly, fixing the step that most reduces risk first, while also addressing quick wins and defence-in-depth measures."]],
 x: ["A report that lists attacks but no detections or prevention", "Treating detection and prevention as optional extras"],
 d: "You've mapped each attack step to its detection and prevention, prioritised by impact.",
 min: 90
},
"w23-4": {
 m: "The report is the product you deliver. Clear communication is as important as the hacking itself.",
 e: "You now write the professional penetration-test report: an executive summary (business risk in plain language for leadership), scope and methodology, detailed findings each with severity, impact, reproduction and remediation, and an evidence appendix. Mapping findings to a framework (NIST CSF or MITRE ATT&CK) adds credibility. A brilliant engagement that nobody can understand or act on is wasted; the report is where your work becomes impact.",
 k: ["Report structure: exec summary, scope/methodology, findings, remediation, appendix", "Executive summary: risk and business impact in plain language", "Each finding: severity, impact, reproduction, remediation", "Map findings to NIST CSF / ATT&CK for credibility and clarity", "Write for two audiences: leadership and the technical team"],
 t: ["Write the executive summary of your capstone in plain language", "Document each finding with severity, impact, reproduction and fix", "Assign and justify risk ratings", "Map findings to a framework (NIST CSF / ATT&CK)", "Assemble the full report with an evidence appendix"],
 q: [["What sections does a penetration-test report contain?", "An executive summary for leadership, scope and methodology, detailed findings (each with severity, impact, reproduction and remediation), and appendices with evidence, often mapped to a framework like NIST CSF or ATT&CK."],
     ["Why is the executive summary so important?", "It communicates overall risk and business impact to decision-makers who won't read the technical detail but control priorities and budget for remediation."]],
 x: ["Only technical detail, no executive summary", "Findings without justified severity or actionable remediation"],
 d: "You've written a complete, framework-mapped penetration-test report from your capstone.",
 min: 120
},
"w23-5": {
 m: "Polish and publish. A capstone nobody sees can't open a door; a polished one opens many.",
 e: "Today you refine the report and publish it as a portfolio piece: proofread, make the findings and visuals clear, redact anything that shouldn't be public, and present it where employers will see it (a blog, GitHub, or a write-up site). A well-presented capstone, especially one on an AD lab with detection and prevention mapped, is concrete proof of end-to-end skill and a standout in applications, including for government and defence roles that value demonstrated capability.",
 k: ["Proofread and polish; clarity and professionalism matter", "Redact anything sensitive before publishing", "Publish where employers look: blog, GitHub, write-up platforms", "A capstone with attack + detection + prevention stands out", "This is portfolio gold for serious security roles"],
 t: ["Proofread and polish the report for clarity and professionalism", "Redact anything that shouldn't be public", "Add clear visuals (diagrams, attack-path graph) where helpful", "Publish it as a portfolio write-up", "Write a short summary post linking to it"],
 q: [["What makes a capstone report stand out to employers?", "End-to-end execution on a realistic target, clear writing with an executive summary, findings paired with detection and prevention, framework mapping, and professional presentation, demonstrating both technical skill and communication."],
     ["Why publish your security work?", "Visible, well-presented work is concrete proof of capability that employers, including government and defence, weigh heavily, especially for candidates without prior formal experience."]],
 x: ["Leaving a great report unpublished", "Publishing sensitive details without redaction"],
 d: "Your capstone report is polished, redacted and published as a portfolio piece.",
 min: 60
},
"w23-6": {
 m: "Step back and see how far you've come, and turn the whole journey into a single, powerful story.",
 e: "You've covered the full spectrum: foundations, offence, Windows/AD, SOC and detection, DFIR and malware, threat intelligence and network defense, cryptography, cloud and critical infrastructure, and the human layer. Today you consolidate: review what you've built, identify your strengths, and craft the story you'll tell in interviews, who you are, what you can do (with your capstone as proof), and where you're going. This narrative, backed by real work, is what converts skill into opportunity.",
 k: ["You've spanned offence and defence across the whole security landscape", "Consolidate your portfolio: capstone, write-ups, detections, lab work", "Identify your strengths and the specialisation that excites you", "Craft your interview story: background, proof, direction", "Real work beats claims, your artefacts are the evidence"],
 t: ["Review and list everything you've built across the course", "Identify your strongest areas and what you enjoyed most", "Draft your 90-second 'tell me about yourself' for security roles", "Note your proof points (capstone, detections, DFIR case, etc.)", "Pick the specialisation you'll pursue next week's planning around"],
 q: [["Tell me about your path into cybersecurity.", "A structured, hands-on journey from fundamentals through offence and defence, SOC/detection, DFIR, threat intel, cloud and critical infrastructure, proven by concrete artefacts (a full capstone report, detections, a DFIR case), aimed at a defensive/specialist role."],
     ["How do you demonstrate skill without prior job experience?", "With a visible body of real work: a capstone penetration-test report, detection engineering, DFIR and threat-intel write-ups, lab builds and CTFs, plus relevant certifications, concrete evidence of capability."]],
 x: ["Underselling the breadth and depth you've actually built", "A story with no concrete proof points"],
 d: "You've consolidated your portfolio and can tell a compelling, evidence-backed security story.",
 min: 60
},
"w23-p": {
 m: "Deliver the masterpiece: a complete, published engagement report that proves you can do the whole job.",
 e: "Your capstone deliverable is the finished, published penetration-test report on your authorised lab (ideally your AD environment): scope to remediation, every finding paired with detection and prevention, mapped to a framework, professionally written and presented. This single artefact demonstrates the full arc of the masterclass, offence understood deeply, defence built from it, and the ability to communicate, and is the centrepiece of your security portfolio.",
 k: ["A complete, published engagement report on an authorised lab", "Full chain: recon to objective, with evidence", "Every finding paired with detection and prevention, framework-mapped", "Professional writing and presentation", "The centrepiece of your portfolio"],
 t: ["Finalise the full report (exec summary to appendix)", "Confirm every finding has detection + prevention + framework mapping", "Ensure the attack narrative is clear and reproducible", "Publish it (redacted) as your portfolio centrepiece", "Share it with a short summary of what it demonstrates"],
 note: "The capstone targets only a lab you own or an authorised environment.",
 q: [["Walk me through your capstone engagement.", "I scoped and authorised the engagement, performed recon and enumeration, gained initial access, escalated privileges and pivoted toward the objective (e.g. domain compromise in my AD lab), documenting with evidence; then I mapped each step to its detection and prevention and a framework, and delivered a professional report with an executive summary and prioritised remediation."],
     ["What does this capstone prove about you?", "That I can run an engagement end to end, think as both attacker and defender, map findings to detection, prevention and frameworks, and communicate clearly to technical and non-technical audiences, the full professional skill set."]],
 x: ["An incomplete report or one without detection/prevention", "Not publishing the finished work"],
 d: "Your complete, published capstone engagement report is live as your portfolio centrepiece.",
 min: 180
},

/* ---------- Week 24: Certifications, specialisation and a career in national security ---------- */
"w24-1": {
 m: "You've tasted every area. Now choose where to go deep, because specialists are what the field needs.",
 e: "The masterclass deliberately spanned the whole field so you could feel the thrill of each area and discover what fits you. Real careers specialise: red team (offence), blue team/SOC and detection engineering, DFIR, threat intelligence, cloud security, OT/ICS, or governance/risk/compliance (GRC). Each is in demand, including for national security. Today you choose a primary specialisation (and perhaps a secondary) based on what you enjoyed and are good at, and that choice shapes your certification and job plan.",
 k: ["Specialisations: red team, blue/SOC & detection, DFIR, threat intel, cloud, OT/ICS, GRC", "All are in demand; national-security work skews defensive (blue, DFIR, intel, OT)", "Choose based on what energised you and your strengths", "A primary focus with a secondary breadth is a strong combination", "Specialisation drives your certification and job targeting"],
 t: ["Review which phases you most enjoyed and excelled at", "Pick a primary specialisation and optionally a secondary", "Note which national-security roles align with it", "List the skills you already have for it and the gaps", "Write why this specialisation fits you"],
 q: [["What are the main cybersecurity specialisations?", "Offensive (red team/pentest), defensive (blue team/SOC, detection engineering), DFIR, threat intelligence, cloud security, OT/ICS security, and governance/risk/compliance (GRC). Most national-security work is defensive."],
     ["How should you choose a specialisation?", "Based on what you genuinely enjoy and do well, combined with demand and your target roles; a deep primary focus plus some breadth makes you both skilled and adaptable."]],
 x: ["Trying to stay equally expert in everything forever", "Choosing a specialisation you dislike because it 'pays'"],
 d: "You've chosen a specialisation that fits your strengths and interests, with its aligned roles noted.",
 min: 45
},
"w24-2": {
 m: "Certifications prove a baseline and structure your learning. Pick the ones that match your path.",
 e: "Certifications open doors and give you a study path. Foundational: CompTIA Security+ (broad, often required). Offensive: eJPT (entry), PNPT (practical with a report), then OSCP (the respected hands-on standard). Defensive/DFIR: GIAC certs like GSEC, GCIH (incident handling) and GCFA (forensics) are highly regarded. Choose based on your specialisation, and make a dated plan. Certs complement, not replace, the hands-on portfolio you've built.",
 k: ["Foundational: CompTIA Security+ (broad, entry-friendly)", "Offensive path: eJPT -> PNPT -> OSCP", "Defensive/DFIR path: GSEC, GCIH, GCFA (GIAC) and blue-team-focused certs", "Match certs to your specialisation; don't collect them aimlessly", "Certs complement your hands-on portfolio, they don't replace it"],
 t: ["Based on your specialisation, choose your first certification", "Map a 1–2 cert path for the next year", "Read your first cert's official objectives", "Make a dated study plan with milestones to the exam", "List free/cheap resources that map to it"],
 q: [["Which certifications suit a defensive/national-security path?", "CompTIA Security+ for fundamentals, then GIAC certifications like GCIH (incident handling) and GCFA (forensics), and blue-team/SOC-focused paths, matching detection, DFIR and defensive roles."],
     ["Do certifications replace hands-on experience?", "No, they prove a baseline and structure learning, but employers also want demonstrated skill. They work best combined with a hands-on portfolio like the one built in this course."]],
 x: ["Chasing OSCP with no fundamentals or defensive grounding", "Collecting certs with no hands-on work behind them"],
 d: "You've chosen a certification path aligned to your specialisation with a dated study plan.",
 min: 45
},
"w24-3": {
 m: "Defending a nation's systems is a real career. Here's what that path actually looks like.",
 e: "National-security cyber work is largely defensive and happens in several places: government CERTs (like CERT-In), defence and intelligence organisations, agencies protecting critical infrastructure (like NCIIPC's sectors), public-sector SOCs, and the private companies and contractors that serve them. These roles value defensive depth, DFIR, threat intelligence and OT knowledge, exactly what this masterclass built. Many require background checks or security clearances and strict adherence to law and ethics. Understanding this landscape helps you target your applications and conduct yourself accordingly.",
 k: ["Where: government CERTs, defence/intelligence, critical-infra bodies, public-sector SOCs, contractors", "Valued skills: defensive depth, DFIR, threat intel, OT/ICS, strong ethics", "Many roles require background checks or security clearances", "A clean record and demonstrable integrity matter enormously here", "Legal, ethical conduct throughout your journey is itself a qualification"],
 t: ["List the types of organisations doing national-security cyber work", "Note which skills from this course map to those roles", "Research what clearance/vetting such roles typically require", "Explain why your ethical track record matters for these roles", "Identify 5 organisations or role types to target"],
 q: [["Where does national-security cybersecurity work happen?", "In government CERTs, defence and intelligence organisations, bodies protecting critical infrastructure, public-sector SOCs, and private firms/contractors serving them, mostly defensive, DFIR, intel and OT-focused work."],
     ["Why does ethical conduct matter especially for national-security roles?", "These roles involve trust and often clearances; a clean record and demonstrable integrity are frequently prerequisites, so the legal, ethical approach taken throughout this course is itself a career qualification."]],
 x: ["Assuming national-security cyber is all offence (it's largely defensive)", "Underestimating how much integrity and a clean record matter"],
 d: "You understand the national-security cyber landscape, its valued skills, and why ethics/clearance matter.",
 min: 45
},
"w24-4": {
 m: "Skills decay without use. CTFs, in-scope bug bounties and lab research keep you sharp, legally.",
 e: "After the course, you stay sharp through legal, ongoing practice: Capture the Flag competitions (picoCTF and events on CTFtime) sharpen offensive and analytical skills; in-scope bug-bounty programs let you test real systems legally within published scope and safe harbour; and continued home-lab research keeps you current. The discipline you built, always within authorisation, is what lets you keep practising for a lifetime without ever crossing the line. You'll set up a sustainable practice routine.",
 k: ["CTFs (picoCTF, CTFtime events) keep skills sharp and are legal by design", "Bug bounties: test real systems legally, but only in-scope under program rules", "Home-lab research keeps you current with new techniques and defences", "Always within authorisation, this is how you practise for a lifetime", "A sustainable routine beats bursts of effort"],
 t: ["Pick a CTF platform/event and schedule regular participation", "Read 2 bug-bounty program scopes and confirm what's in/out of scope", "Plan ongoing home-lab topics to keep learning", "Write your sustainable weekly practice routine", "Reaffirm the authorisation rule for all of it"],
 note: "Bug-bounty testing is authorised ONLY for explicitly in-scope assets under the program's rules and safe harbour. Out-of-scope testing is a crime. CTFs and your own lab are authorised by design.",
 q: [["How do you keep cybersecurity skills sharp legally?", "Through CTF competitions (authorised by design), in-scope bug-bounty programs (legal within published scope and safe harbour), and continued home-lab research, always staying within authorisation."],
     ["What must you verify before testing any bug-bounty target?", "That the specific asset is explicitly in-scope, and the program's rules and safe-harbour terms, confirming authorisation before any testing; out-of-scope testing remains unauthorised and illegal."]],
 x: ["Letting skills decay after the course", "Testing out-of-scope assets on bug-bounty platforms"],
 d: "You have a sustainable, legal practice routine (CTFs, in-scope bounties, lab research).",
 min: 45
},
"w24-5": {
 m: "Your public profile is your proof. Make it easy for the right people to see what you can do.",
 e: "Turn your work into a profile employers can find: publish your write-ups (capstone, detections, DFIR, threat intel) on a blog or GitHub, keep a tidy GitHub, write a focused LinkedIn with your specialisation and featured projects, and craft a one-page resume that leads with projects and skills. For national-security and defensive roles, demonstrated, documented capability plus a clean, professional presence is exactly what gets you noticed, especially coming without prior formal experience.",
 k: ["Publish write-ups: capstone, detections, DFIR case, threat profile", "GitHub and a blog show consistent, real, hands-on work", "LinkedIn: a clear specialisation headline and featured projects", "Resume: one page, projects and skills first, target role clear", "Documented capability + professionalism = noticed, even without experience"],
 t: ["Collect and publish your course write-ups (blog/GitHub)", "Write a GitHub profile README summarising your skills and projects", "Update LinkedIn with a specialisation headline and featured work", "Draft a one-page resume leading with projects and skills", "Rehearse your 90-second introduction tailored to your target roles"],
 q: [["How do you build a cybersecurity profile that gets noticed?", "Publish real write-ups (capstone, detections, DFIR, threat intel), keep a tidy GitHub and blog, present a focused LinkedIn with your specialisation and featured projects, and a concise projects-first resume, demonstrated capability plus professionalism."],
     ["What should a security resume lead with for a career-changer?", "Projects and skills, your capstone and specialised work, above formal experience, because demonstrated, documented capability is the strongest evidence when prior job experience is limited."]],
 x: ["Great work that's never published or findable", "A generic resume with no projects or specialisation"],
 d: "Your write-ups, GitHub, LinkedIn and resume are published and aligned to your specialisation.",
 min: 55
},
"w24-6": {
 m: "Mastery isn't a finish line, it's a direction. Set your plan, and keep going, legally, for a career.",
 e: "You've completed a 24-week journey across the whole of ethical hacking and cyber security, built a portfolio, and found your specialisation. The final step is a concrete 12-month plan: your certification milestones, your specialisation deepening, your ongoing legal practice, and your application targets, with dates. Security is a field of continuous learning; the habits you've built, hands-on practice, documentation, and unwavering ethics, are what will carry you through a long, impactful career defending organisations and, potentially, your nation.",
 k: ["A dated 12-month plan: certification, specialisation, practice, applications", "Continuous learning is the nature of the field", "Keep the habits: hands-on practice, documentation, ethics", "Target roles aligned to your specialisation and national-security interest", "The journey continues; you now have the foundation to go anywhere"],
 t: ["Write a dated 12-month plan (cert, specialisation, practice, applications)", "Set 3 concrete milestones for the next 3 months", "List your target roles/organisations and start applying", "Schedule your ongoing legal practice (CTFs, bounties, lab)", "Re-read your original ethics pledge, now as a practising professional"],
 note: "Everything from here, applications, bug bounties, research, stays within authorisation and the law. That discipline is the foundation of a national-security career.",
 q: [["What's your plan after completing this masterclass?", "A dated 12-month plan: earn a specialisation-aligned certification, deepen my chosen area, keep practising legally (CTFs, in-scope bounties, lab research), publish ongoing write-ups, and apply for roles, defensive or national-security focused, while always staying within authorisation."],
     ["Why is continuous learning essential in cybersecurity?", "The field changes constantly, new attacks, defences, platforms and threats, so staying effective requires ongoing hands-on practice and study; the habits of practice, documentation and ethics sustain a long career."]],
 x: ["Treating course completion as the end of learning", "Abandoning the legal/ethical discipline once 'qualified'"],
 d: "You have a dated 12-month plan and have begun applying. You've completed the masterclass, go build a career defending what matters.",
 min: 60
},
"w24-p": {
 m: "Set your course: publish, plan, and launch your career, with your ethics as the foundation of all of it.",
 e: "Your final project ties the masterclass into a launch: ensure your full portfolio (capstone, write-ups, detections, DFIR, threat intel) is published, write and commit to a dated 12-month plan (specialisation, certification, legal practice, applications), set up your professional profile, and begin applying. You finish not just with knowledge, but with proof, a plan, and a profile, ready to defend organisations and national infrastructure, legally and for the long term.",
 k: ["A published, complete portfolio spanning offence and defence", "A dated 12-month plan (specialisation + certification + practice + applications)", "A professional, specialisation-aligned public profile", "First applications submitted", "Ethics and legality as the foundation of the whole career"],
 t: ["Confirm your whole portfolio is published and findable", "Finalise and commit to your dated 12-month plan", "Complete your professional profile (GitHub, LinkedIn, resume)", "Apply to at least 3 roles or set up for in-scope bug-bounty practice", "Write a reflection on your journey and share it, ethics front and centre"],
 note: "Your whole future practice, applications, bounties, research, stays within authorisation and the law.",
 q: [["What do you finish this masterclass with?", "Mastery across the field, a published portfolio proving it (capstone, detections, DFIR, threat intel), a chosen specialisation, a dated career plan, a professional profile, and an unwavering ethical, legal foundation, ready for defensive or national-security roles."],
     ["What single principle underpins your entire career?", "Only ever test systems you own or are authorised to test. Everything, skills, portfolio, and career, is built on that legal, ethical foundation, which is also what national-security roles require."]],
 x: ["Finishing with knowledge but no published proof or plan", "Letting the ethical discipline lapse once the course is done"],
 d: "Your portfolio is published, your 12-month plan is set, your profile is live, and you've started applying. You've mastered the path, legally and for good.",
 min: 150
}
};
