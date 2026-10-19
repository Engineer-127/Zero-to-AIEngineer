/* Cyber Phase 1: Foundations, Ethics & Your Lab (Weeks 1-2)
   Legal, defensive, labs-only. Code samples use normal template literals. */
export default {

/* ---------- Week 1: Law, ethics and the hacker mindset ---------- */
"w1-1": {
 m: "The only thing separating a security professional from a criminal is permission. Learn this before you learn anything else.",
 e: "An ethical hacker does exactly what an attacker does, but with one difference: written authorisation from the owner of the system. The same port scan is a routine job on a system you're paid to test and a crime on your neighbour's router. Think of a locksmith: hired to test your locks, they're a professional; picking the same lock on a stranger's door, they're a burglar. Everything in this course happens on systems you own or are explicitly allowed to test. That's not a formality, it's the whole job.",
 k: ["Authorisation is the dividing line: no written permission means no testing, full stop", "Owning the target (your own lab) or a signed scope is your permission", "Legal, sandboxed labs (TryHackMe, Hack The Box, PortSwigger) count as authorised by design", "'I was just curious' and 'I didn't change anything' are not legal defences", "Security is a trusted profession: your reputation for staying in scope is your career"],
 t: ["Write, in your own words, the one-sentence rule you'll follow for the whole course", "List 5 systems you are allowed to practise on (your own VMs, your own accounts, the training platforms) and why each is legal", "List 5 tempting-but-illegal targets (a friend's phone, your college Wi-Fi, a company site) and note that these need written permission you don't have", "Read a short news story about someone prosecuted for 'just testing' and summarise what went wrong", "Bookmark the training labs you'll use instead"],
 note: "This course only ever involves systems you own or have explicit written permission to test. Scanning, accessing or attacking anyone else's system without authorisation is a crime, including under India's IT Act, 2000 and the US CFAA, even if nothing is damaged.",
 q: [["What makes hacking ethical rather than criminal?", "Explicit, written authorisation from the system's owner, staying within an agreed scope. Without it, the same actions are illegal regardless of intent or outcome."],
     ["Is port scanning a random public IP illegal?", "It can be, depending on jurisdiction, and it's never acceptable without permission. Practise scanning only on your own lab or authorised scopes."],
     ["If you find a vulnerability by accident on a live site, what should you do?", "Stop, don't probe further, and report it responsibly through the owner's security contact or a bug-bounty program if one exists with safe harbour. Don't exploit or disclose it publicly."]],
 x: ["Thinking a VPN or anonymity makes unauthorised testing legal (it doesn't)", "Assuming 'educational purposes' is a legal defence", "Testing a 'friend's' system on a verbal okay instead of written permission"],
 d: "You can state the authorisation rule from memory and explain why a legal lab is authorised but a stranger's router is not.",
 min: 45
},
"w1-2": {
 m: "Knowing the law isn't optional for a hacker. It's the floor you stand on.",
 e: "Different countries have computer-crime laws, and they're broad. In India, the Information Technology Act, 2000 makes unauthorised access, downloading or damage punishable (sections like 43 and 66). In the US it's the Computer Fraud and Abuse Act. The common thread everywhere: accessing a computer 'without authorisation or exceeding authorised access' is the offence. You don't need to steal anything or cause damage; access itself is enough. This is why scope and permission are the first thing a professional nails down.",
 k: ["India IT Act 2000: unauthorised access, data theft and damage are offences (civil and criminal)", "US CFAA: 'without authorisation or exceeding authorised access' is the key phrase", "'Exceeding authorised access' matters: being allowed on one part doesn't allow all parts", "Penalties are real: fines and prison, plus a record that ends a security career", "When in doubt, you don't have permission. Get it in writing or don't touch it"],
 t: ["Read a plain-language summary of your country's main computer-crime law", "Write down the 3 actions it criminalises that are most relevant to hacking", "Note what 'exceeding authorised access' means with an everyday example (a hotel key that opens your room, not every room)", "Find the responsible-disclosure or security-contact page of one large company and read their rules", "Add 'check the law and scope' as step zero of your personal methodology"],
 note: "Laws vary by country and change over time; this is general education, not legal advice. For any real engagement, rely on a written authorisation and, where relevant, professional legal guidance.",
 q: [["What does 'exceeding authorised access' mean?", "Using legitimate access to reach data or systems you were not permitted to, like an employee opening records unrelated to their job. It's an offence even without breaking in from outside."],
     ["Does causing no damage make unauthorised access legal?", "No. Under laws like the IT Act and CFAA, the unauthorised access itself is the offence; damage can increase the penalty but isn't required for it to be a crime."]],
 x: ["Believing laws only apply to 'real' hackers, not learners", "Confusing responsible disclosure (reporting) with permission to test"],
 d: "You can name your country's main computer-crime law and explain why unauthorised access alone is illegal.",
 min: 45
},
"w1-3": {
 m: "White-hat, grey-hat, black-hat: the colour is decided entirely by permission and intent.",
 e: "Hackers are often grouped by hat colour. A white-hat tests with permission and reports to defend. A black-hat breaks in without permission for personal gain or harm. A grey-hat pokes at systems without permission but claims good intentions, which is still illegal and still risky. This course makes you a white-hat and keeps you one: you'll build the skills of an attacker while always acting with authorisation. The industry runs on trust, and one grey-hat stunt can end a career before it starts.",
 k: ["White-hat: authorised, reports findings, defends. The professional path", "Black-hat: unauthorised, malicious. Criminal", "Grey-hat: unauthorised but 'well-meaning'. Still illegal, still a bad idea", "Penetration tester, red teamer, bug-bounty hunter: white-hat roles with permission built in", "Your value is being someone a company can trust with access"],
 t: ["Write a one-line definition of each hat in your own words", "For 3 real scenarios, decide which hat it is and why (e.g. 'found a bug and emailed the company' vs 'found a bug and tweeted the exploit')", "Research one white-hat job title that appeals to you and what it involves", "Write why grey-hat 'helpfulness' still breaks the law and damages trust", "Add your target role to your course notes as motivation"],
 q: [["What's the difference between a white-hat and a grey-hat?", "Both may have good intentions, but a white-hat always has authorisation and a grey-hat tests without it. Lack of permission makes grey-hat activity illegal regardless of intent."],
     ["Name three legitimate careers that use offensive security skills.", "Penetration tester, red team operator and bug-bounty hunter (on in-scope programs), plus security consultant and application security engineer."]],
 x: ["Romanticising grey-hat behaviour as 'hacktivism' when it's unauthorised access", "Thinking black-hat skills are different skills; they're the same skills used illegally"],
 d: "You can classify a scenario by hat and explain why only white-hat activity is legal and employable.",
 min: 40
},
"w1-4": {
 m: "Professionals don't start by hacking. They start by agreeing exactly what they may touch.",
 e: "Before a real test, the client and tester sign a document covering scope (which systems, IPs and apps), rules of engagement (what techniques are allowed, when, and what's off-limits like denial-of-service), timing, and emergency contacts. 'Safe harbour' is a promise the owner won't sue you for testing within the agreed rules. This paperwork is what keeps the same actions legal. Learning to read and write it is a genuine, employable skill, and it reinforces the habit that keeps you out of jail.",
 k: ["Scope: the exact systems, domains, IP ranges and apps you may test, and those you may not", "Rules of engagement: allowed techniques, testing windows, data handling, who to call if something breaks", "Out-of-scope is as important as in-scope: touching it is unauthorised access", "Safe harbour / authorisation letter: written permission that makes the work legal", "Bug-bounty programs publish their own scope and safe-harbour terms; read them before testing"],
 t: ["Read a real bug-bounty policy (e.g. on HackerOne) and identify its scope, out-of-scope and safe-harbour sections", "List what you'd want in a rules-of-engagement document if you hired a tester for your own site", "Write down 3 techniques that are commonly out of scope (e.g. DoS, social engineering, physical) and why", "Note the difference between a domain being in scope and its subdomains being in scope", "Draft the headings of your own authorisation template (you'll fill it in the project)"],
 note: "On bug-bounty platforms you are authorised only for targets explicitly listed as in-scope, under that program's rules. Testing anything outside the published scope is unauthorised, even on the same company.",
 q: [["What is 'scope' in a penetration test?", "The precise set of systems, networks and applications the client has authorised you to test, with everything else explicitly off-limits. Staying in scope is what keeps testing legal."],
     ["What is safe harbour in a bug-bounty program?", "A commitment by the organisation not to pursue legal action against researchers who test in good faith within the published scope and rules."],
     ["Why are DoS attacks usually out of scope?", "They can take down production systems and harm real users and revenue, so owners rarely authorise them; running one unauthorised also causes real damage and liability."]],
 x: ["Assuming a parent domain being in scope includes every subdomain", "Ignoring testing windows and rules about production data"],
 d: "You can read a scope document and correctly separate what you're authorised to test from what you're not.",
 min: 45
},
"w1-5": {
 m: "Hacking is less about secret tricks and more about a stubborn habit: 'what happens if I do the unexpected?'",
 e: "The attacker mindset is curiosity plus persistence plus thinking about how a system can be misused. Developers ask 'how do I make this work?'; a security person also asks 'how could someone make this misbehave?' You learn to read error messages as clues, to try the input nobody expected, and to keep careful notes so you can reproduce what you found. None of this requires genius; it requires patience and method. The same mindset makes you a better engineer, because you build things that don't break.",
 k: ["Think in terms of trust: what does this system assume, and what if that assumption is false?", "Enumerate first: the more you understand a target, the more weaknesses become obvious", "Errors and odd behaviour are signposts, not dead ends", "Methodology beats cleverness: a repeatable process finds more than lucky guesses", "Take notes constantly: what you tried, what happened, how to reproduce it"],
 t: ["Pick an everyday system (a parking ticket machine, a login form) and list 5 assumptions it makes about users", "For each assumption, ask what happens if a user breaks it", "Start a lab notebook (a plain markdown file) with sections: target, steps tried, results, next ideas", "Read a beginner CTF write-up and notice how much of it is methodical enumeration, not magic", "Write your personal 'methodology' as 5 ordered steps you'll follow on every target"],
 q: [["How does a security mindset differ from a developer mindset?", "A developer focuses on making features work for expected input; a security thinker also looks for how unexpected input or misuse could break assumptions and cause unintended behaviour."],
     ["Why is enumeration considered the most important phase?", "Most vulnerabilities are found by thoroughly understanding the target: its services, versions, users and configuration. Depth of understanding, not exotic exploits, finds the way in."]],
 x: ["Jumping to exploitation before understanding the target", "Not taking notes, then being unable to reproduce or report a finding"],
 d: "You have a personal methodology written down and a lab notebook started.",
 min: 40
},
"w1-6": {
 m: "Every security conversation uses the same few words. Learn them now so nothing later sounds like a foreign language.",
 e: "Security is built on the CIA triad: Confidentiality (only the right people can read data), Integrity (data isn't tampered with), and Availability (the system is up when needed). A vulnerability is a weakness, a threat is who or what might exploit it, and risk is the chance and impact of that happening. An exploit is the thing that takes advantage of a vulnerability, and a payload is what it delivers. Getting this vocabulary straight makes everything else click into place.",
 k: ["CIA triad: Confidentiality, Integrity, Availability. Most attacks harm one of these", "Vulnerability (weakness) vs threat (potential attacker) vs risk (likelihood × impact)", "Exploit: code or steps that abuse a vulnerability. Payload: what the exploit runs", "Asset: anything worth protecting. Attack surface: all the ways in", "Defence in depth: many layers, so one failure isn't game over"],
 t: ["Define each CIA term with a real example (e.g. ransomware attacks availability and confidentiality)", "For 3 recent breaches you've heard of, note which part of the CIA triad was harmed", "Write the difference between a vulnerability, a threat and a risk in one sentence each", "Make a mini-glossary in your notebook of 15 terms you'll keep adding to", "Explain 'defence in depth' with an analogy (a castle with a moat, walls and guards)"],
 q: [["What is the CIA triad?", "Confidentiality, Integrity and Availability: the three core goals of information security. Confidentiality keeps data private, integrity keeps it accurate and untampered, and availability keeps it accessible to authorised users."],
     ["What's the difference between a vulnerability, a threat and a risk?", "A vulnerability is a weakness, a threat is something that could exploit it, and risk is the combination of how likely that is and how bad the impact would be."],
     ["What does 'defence in depth' mean?", "Layering multiple independent controls so that if one fails, others still protect the asset, rather than relying on a single barrier."]],
 x: ["Using 'threat' and 'vulnerability' interchangeably", "Thinking security is only about confidentiality and forgetting availability and integrity"],
 d: "You can explain the CIA triad and the vulnerability/threat/risk distinction without notes.",
 min: 40
},
"w1-p": {
 m: "Your first deliverable isn't an exploit. It's the document that keeps everything you do legal.",
 e: "You'll create two things you'll use for the rest of the course: a one-page Rules of Engagement template (so you always define scope and permission before touching anything) and a personal ethics pledge. These aren't busywork; writing them cements the single most important professional habit. Keep them in your notebook and re-read the pledge before every lab.",
 k: ["A RoE template forces you to answer 'what am I allowed to touch?' every time", "Your pledge is a promise to yourself that protects your future career", "Even for your own lab, practise filling the template, because the habit is the point", "Store these with your lab notebook"],
 t: ["Write a Rules of Engagement template with headings: authorised targets, out-of-scope, allowed techniques, testing window, data handling, emergency contact", "Fill it in for your own home lab (the target VMs you'll build next week)", "Write a 5-point personal ethics pledge in your own words", "Add a line committing to responsible disclosure if you ever find a real-world bug", "Commit both files to a private notes repo, and re-read the pledge aloud"],
 note: "Keep real authorisation documents for any non-lab engagement. For this course, 'authorised targets' means only your own VMs, your own accounts, and the training platforms.",
 q: [["Why write rules of engagement even for your own lab?", "To build the reflex of defining scope and permission before every test, so that when you work on real systems the habit is automatic and you never stray out of scope."],
     ["What belongs in a rules-of-engagement document?", "Authorised targets and out-of-scope systems, allowed and forbidden techniques, testing windows, how sensitive data is handled, and emergency contacts if something breaks."]],
 x: ["Treating the paperwork as optional and skipping it for 'just a quick test'", "Not keeping a copy of your authorisation"],
 d: "You have a reusable RoE template and a written ethics pledge saved with your notes.",
 min: 90
},

/* ---------- Week 2: Build your legal practice lab ---------- */
"w2-1": {
 m: "You can't legally attack other people's machines, so you build your own to attack. That's what a lab is.",
 e: "A security lab is a set of virtual machines (VMs) running on your own computer, on an isolated network, that you fully own and can break freely. Virtualisation lets one physical computer run several pretend computers at once. You'll have an attacker machine (Kali Linux, which comes with the tools) and target machines (deliberately vulnerable ones). Because you own them and they're cut off from the real internet and your home network, everything you do is legal and safe. Snapshots let you undo any mess instantly.",
 k: ["A hypervisor (VirtualBox, VMware) runs virtual machines on your computer", "Attacker VM (Kali) + target VM(s) = a complete, legal practice range", "Snapshots save a VM's exact state so you can roll back after breaking it", "Isolated networking keeps the lab away from your real devices and the internet", "Everything in the lab is yours, so there's no authorisation problem"],
 t: ["Check your computer can spare ~8 GB RAM and ~60 GB disk for VMs (or use cloud labs if not)", "Install VirtualBox and read how snapshots work", "Watch a short 'build a hacking lab' walkthrough to see the end goal", "Write down your lab's design: which VMs, how much RAM each, which network", "Note that if your machine can't handle VMs, TryHackMe/HTB give you the same labs in the browser"],
 q: [["Why do ethical hackers build a lab?", "Because they may only legally test systems they own or are authorised to test. A personal lab of VMs gives unlimited, legal, safe targets to practise on."],
     ["What is a hypervisor?", "Software like VirtualBox or VMware that runs one or more virtual machines on a single physical computer, each behaving like a separate system."],
     ["What is a VM snapshot used for?", "Saving a virtual machine's exact state so you can restore it instantly after an exploit, a misconfiguration or a malware test breaks it."]],
 x: ["Building a lab on the same network as your real devices", "Not taking a snapshot before making big changes"],
 d: "You have VirtualBox installed and a written plan for your lab, or a cloud-lab account if your hardware is limited.",
 min: 60
},
"w2-2": {
 m: "Kali Linux is the attacker's toolbox, pre-packed. Today you set up your workbench.",
 e: "Kali Linux is a Linux distribution built for security testing, with hundreds of tools already installed (Nmap, Burp Suite, Wireshark, Metasploit and more). You'll run it as a VM. Don't worry about learning every tool now; you'll meet them as you need them. The point today is a clean, working Kali VM with a snapshot, so you always have a known-good starting point.",
 k: ["Kali is just Linux with security tools pre-installed; the OS skills transfer everywhere", "Use the official Kali VM image to save setup time", "Update it once (apt update && apt upgrade) so tools are current", "Take a 'clean install' snapshot immediately", "Never run random exploit code from the internet on your main computer; that's what the VM is for"],
 t: ["Download the official Kali VirtualBox image and import it", "Log in, open a terminal, and run the system update", "Change the default password and take a snapshot named 'clean-updated'", "Explore the menu to see categories of tools (information gathering, web, etc.)", "Set the VM's network to host-only or NAT for now (you'll design the lab network next)"],
 note: "Download Kali and all tooling only from official sources. Use the tools exclusively against your own lab VMs or authorised scopes.",
 q: [["What is Kali Linux?", "A Debian-based Linux distribution preloaded with security and penetration-testing tools, used as the attacker machine in a lab. The underlying Linux skills apply to any distribution."],
     ["Why run security tools inside a VM rather than your main OS?", "Isolation and safety: exploits, malware samples and misconfigurations stay contained, and snapshots let you reset to a clean state."]],
 x: ["Keeping the default kali/kali password", "Forgetting to snapshot after setup, then having to reinstall"],
 d: "You have an updated Kali VM with a clean snapshot and can open a terminal.",
 min: 60
},
"w2-3": {
 m: "A lab with only an attacker is a gym with no equipment. Now you add something to practise on.",
 e: "A target VM is a machine built to be broken into, for learning. Metasploitable 2 is a classic deliberately-vulnerable Linux machine; OWASP Juice Shop is a deliberately-vulnerable web app you can run as a container. You own these, so attacking them is legal. The key safety rule: these machines are full of holes, so they must never be reachable from the internet or your home network, only from your attacker VM on an isolated lab network.",
 k: ["Metasploitable 2: a vulnerable Linux VM for practising enumeration and exploitation", "OWASP Juice Shop: a modern vulnerable web app for the web-security phases", "Vulnerable VMs are dangerous if exposed, so keep them isolated", "You own them, so they're legal targets", "Snapshot targets too, so you can reset them between attempts"],
 t: ["Download and import Metasploitable 2 into VirtualBox", "Set its network adapter to the same isolated (host-only/internal) network as Kali", "Confirm it is NOT reachable from your real network or the internet", "Run OWASP Juice Shop (via Docker or the provided package) for later web labs", "Snapshot both targets in their fresh state"],
 note: "Deliberately vulnerable machines must stay on an isolated network. Exposing them to the internet can get your own network compromised and used to attack others.",
 q: [["What is Metasploitable?", "A deliberately vulnerable Linux virtual machine published for practice, so learners can safely enumerate and exploit it in their own lab."],
     ["Why must vulnerable VMs be network-isolated?", "They contain real exploitable flaws; if reachable from the internet or your home network, attackers (or malware) could compromise them and pivot to other devices."]],
 x: ["Bridging a vulnerable VM onto your home network", "Not snapshotting the target, so you can't retry cleanly"],
 d: "You have at least one vulnerable target VM running on an isolated network, snapshotted.",
 min: 60
},
"w2-4": {
 m: "The single most important lab setting is the one that keeps your practice from leaking into the real world.",
 e: "VirtualBox offers several network modes. For a lab you want the attacker and targets to see each other but not the internet or your home LAN. 'Host-only' or 'Internal network' modes create a private network just for your VMs. NAT lets a VM reach the internet (useful for updating Kali) but hides it from your LAN. The design most people use: a private lab network for attacker-to-target traffic, and NAT only when a machine genuinely needs an update. Getting this right is what makes the whole lab safe.",
 k: ["Host-only: VMs talk to each other and the host, not the internet", "Internal network: VMs talk only to each other, fully isolated", "NAT: the VM can reach the internet but isn't exposed to your LAN", "Bridged: the VM joins your real network, which you avoid for vulnerable targets", "Give each VM a static-ish lab IP so you always know addresses"],
 t: ["Put Kali and your target(s) on the same host-only or internal network", "From Kali, ping the target to confirm they can see each other", "Confirm the target cannot reach the internet", "Note each VM's IP address in your lab notebook", "Draw your lab network diagram: attacker, target(s), network mode, no internet to targets"],
 note: "Never place a deliberately vulnerable VM in bridged mode on your home network. Keep targets on host-only or internal networks only.",
 q: [["What's the difference between host-only and bridged networking for VMs?", "Host-only creates a private network between the host and its VMs with no access to the wider LAN or internet. Bridged puts the VM directly on your real network as if it were a physical device."],
     ["Why use NAT only for updates?", "NAT lets a VM reach the internet to update without exposing it to your LAN; vulnerable targets should otherwise stay fully isolated to prevent them being compromised or used to attack others."]],
 x: ["Leaving a vulnerable VM in bridged mode", "Not recording lab IP addresses and wasting time rediscovering them"],
 d: "Your attacker and target VMs can reach each other on an isolated network, and the targets cannot reach the internet.",
 min: 60
},
"w2-5": {
 m: "You don't have to build every target. Guided legal labs give you a world of them in the browser.",
 e: "Platforms like TryHackMe and Hack The Box host legal, sandboxed machines and step-by-step rooms. They're authorised by design: the whole point is that you attack their lab machines, so you never have a permission problem. TryHackMe is the gentlest start, with guided rooms that teach as you go. Hack The Box and its Academy go deeper. Using these alongside your home lab gives you structure, hints and a community, which matters a lot when you're stuck.",
 k: ["TryHackMe and Hack The Box provide legal, isolated targets and guided learning", "They connect via a VPN or a browser-based machine, keeping everything sandboxed", "Guided rooms teach the concept, then let you practise it", "These are authorised targets: attacking their lab boxes is the intended use", "A community and write-ups help you learn when you're stuck (don't just copy answers)"],
 t: ["Create free accounts on TryHackMe and Hack The Box", "Complete TryHackMe's intro/'Tutorial' room to learn how connecting works", "Start the 'Pre Security' or 'Complete Beginner' path", "Finish one full beginner room end to end and write notes in your own words", "Bookmark the Jr Penetration Tester and SOC Level 1 paths for later phases"],
 note: "Only attack the lab machines these platforms assign to you. The authorisation covers their sandboxed targets, not any other system.",
 q: [["Why are platforms like TryHackMe legal to attack?", "They provide isolated lab machines specifically for learners to test; using them that way is the authorised, intended purpose, so there's no permission problem."],
     ["How should you use write-ups when stuck on a room?", "As a last resort for a hint, then understand and reproduce the step yourself. Copying answers without understanding teaches nothing and won't help in an interview or on the job."]],
 x: ["Treating lab platforms as permission to test anything outside their sandbox", "Rushing rooms by copying write-ups instead of learning"],
 d: "You've completed at least one guided beginner room and understand how the sandbox connection works.",
 min: 60
},
"w2-6": {
 m: "A lab you can't reset is a lab you'll be scared to break. Snapshots make you fearless.",
 e: "Snapshots capture a VM's entire state at a moment in time. Before you try something risky, snapshot; if it breaks, restore in seconds. This changes how you learn: you can be bold, try destructive things, and always get back to a clean machine. Pair snapshots with good notes and you have a professional workflow: known-good starting point, document what you do, reset, repeat. Today you make snapshotting a reflex.",
 k: ["Snapshot before any risky action; restore to undo instantly", "Keep a 'clean' snapshot per VM as your baseline", "Snapshots aren't backups; they live with the VM, so export important VMs too", "Combine snapshots with notes so each attempt is reproducible", "Reset targets between attempts so results aren't polluted by earlier changes"],
 t: ["Take named snapshots of every VM in a known-good state", "Deliberately break something small on the target, then restore the snapshot", "Practise the full loop: snapshot, attack, document, restore", "Set up a simple folder/notebook structure: one note per target", "Write your lab's 'standard operating procedure' in 5 steps"],
 q: [["What's the difference between a snapshot and a backup?", "A snapshot records a VM's state within the hypervisor for quick rollback but depends on the VM and host. A backup is a separate, exportable copy you can restore even if the host or VM is lost."],
     ["Why reset a target VM between exploitation attempts?", "So earlier changes don't affect your results. A clean baseline makes each test reproducible and your notes reliable."]],
 x: ["Relying on snapshots as your only backup", "Never resetting, so the target's state drifts and results become inconsistent"],
 d: "You can snapshot, break and restore a VM confidently, and have a written lab SOP.",
 min: 45
},
"w2-p": {
 m: "Prove the lab works by doing the whole loop once, legally, end to end.",
 e: "Your week-2 project is a fully working lab plus your first real practice. You'll confirm your attacker and target can see each other on an isolated network, snapshot everything, and complete one TryHackMe room, documenting it in your notebook with your methodology. This is the foundation every later phase builds on, so get it solid and tidy now.",
 k: ["A complete lab: attacker VM + target VM(s), isolated network, clean snapshots", "A documented first exercise following your own methodology", "Notes that a stranger could read and reproduce", "Everything legal: your own VMs plus an authorised training platform"],
 t: ["Verify Kali reaches your target VM and the target can't reach the internet", "Confirm every VM has a current clean snapshot", "Complete one TryHackMe beginner room end to end", "Write it up in your notebook: target, steps, what you found, how you'd fix it", "Save a network diagram of your lab", "Re-read your ethics pledge before you start"],
 note: "This project uses only your own lab VMs and sandboxed training-platform machines, which are authorised by design.",
 q: [["Describe your lab setup.", "An attacker VM (Kali) and one or more deliberately vulnerable target VMs on an isolated host-only/internal network with no internet access to the targets, each with clean snapshots, plus accounts on sandboxed training platforms."],
     ["Why document everything from day one?", "Because reproducible notes are the core of professional testing: they let you retrace steps, write reports, and prove exactly what you did and found."]],
 x: ["Declaring the lab 'done' without testing connectivity and isolation", "Skipping documentation on the first room"],
 d: "Your isolated lab is verified and snapshotted, and you've documented one completed TryHackMe room following your methodology.",
 min: 120
}
};
