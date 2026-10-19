/* Cyber Phase 5: Exploitation & Privilege Escalation (Weeks 9-10)
   Deliberately vulnerable VMs you own, or authorised labs. Every attack paired with its defence. */
export default {

/* ---------- Week 9: Exploitation on vulnerable machines you own ---------- */
"w9-1": {
 m: "A vulnerability becomes an exploit when a specific weakness meets a known way to abuse it. Matching the two is the skill.",
 e: "Exploitation turns a finding into access. The common path: your enumeration found a service and version; you check whether that version has a known vulnerability (a CVE, catalogued publicly); if so, there may be a tested exploit for it. This is methodical, not magical: identify, verify, and only then attempt, on a machine you own. Crucially, you study the matching defence for each: patching the version, removing the service, or configuring it safely would have closed the door.",
 k: ["A CVE is a public identifier for a specific known vulnerability", "Exploitation chain: service + version -> known vuln (CVE) -> tested exploit", "Verify applicability before attempting; many exploits are version-specific", "Primary defence: patching and removing unnecessary services", "Only ever run exploits against machines you own or are authorised to test"],
 t: ["Take a service+version from your Metasploitable enumeration", "Look up whether that version has known vulnerabilities (CVE databases)", "Note what the vulnerability allows and its severity", "Write the defence that would close it (patch/remove/configure)", "Record this as a finding: service, version, CVE, impact, fix"],
 note: "Research and attempt exploits only against your own lab VMs or an authorised scope. Running exploits against systems you don't own is a serious crime.",
 q: [["What is a CVE?", "A Common Vulnerabilities and Exposures identifier: a unique public reference for a specific known vulnerability, used to track it across databases, advisories and tools."],
     ["What's the most important defence against known-vulnerability exploitation?", "Patch management: keeping software updated and removing unnecessary services, so known vulnerabilities are fixed before attackers can use them, backed by an inventory so you know what you run."]],
 x: ["Firing exploits without verifying they match the target version", "Researching exploits with the intent to use them outside an authorised scope"],
 d: "You can match a service version to a known vulnerability and state the defence, on a target you own.",
 min: 50
},
"w9-2": {
 m: "Metasploit automates a lot of exploitation. Used on your own VM, it teaches the whole workflow quickly.",
 e: "Metasploit is a framework that packages exploits, payloads and helpers behind a consistent interface. Against your own Metasploitable VM, it's an excellent teacher: you search for a module matching a found service, set options (target, payload), and run it, seeing the full flow from vulnerability to access. The goal is understanding, not button-pushing: know what each module does, what a payload is, and what the equivalent defence would be. Then write that defence down.",
 k: ["Metasploit modules: exploits, payloads, auxiliary (scanners), post", "Workflow: search -> use module -> set options (RHOSTS, payload) -> run", "A payload is what runs after the exploit succeeds (often a shell)", "Understand each step; don't treat it as a magic button", "Defence: patch the vuln; IDS/EDR often detect common Metasploit payloads"],
 t: ["In your lab, use Metasploit against a known Metasploitable service", "Search for a module matching the service and read its description", "Set the target and payload options and explain each", "Run it against your own VM and observe the result", "Write the defence and note how a defender might detect this activity"],
 c: `# Metasploit against YOUR OWN Metasploitable VM only
msfconsole
search vsftpd
use exploit/unix/ftp/vsftpd_234_backdoor
set RHOSTS 192.168.56.101
run
# then: understand the vuln, and write the fix (patch/remove the service)`,
 note: "Use Metasploit only against your own lab VMs or an authorised engagement. It's a powerful offensive tool and unauthorised use is unlawful.",
 q: [["What are the main module types in Metasploit?", "Exploits (abuse a vulnerability), payloads (what runs on success, like a shell), auxiliary (scanners and other helpers), and post modules (post-exploitation tasks). Encoders and nops also exist to shape payloads."],
     ["How can defenders detect common Metasploit usage?", "Through IDS/IPS signatures, endpoint detection (EDR) recognising common payloads and behaviours, and logs/network anomalies, which is why real red teams often avoid default payloads and why patching the underlying vuln is the real fix."]],
 x: ["Running modules without understanding what they do", "Any use outside your own lab or an authorised scope"],
 d: "You can run a Metasploit module against your own VM, explain each step, and write the defence.",
 min: 55
},
"w9-3": {
 m: "A shell is interactive access to a machine. Understanding reverse vs bind shells demystifies 'getting in'.",
 e: "After an exploit, you often get a shell, a command line on the target. A bind shell has the target listen for your connection; a reverse shell has the target connect back to you, which is what usually works because outbound connections pass through firewalls more easily. Understanding this explains both how access is gained and how it's blocked: egress filtering and network segmentation stop reverse shells, and that's the defensive lesson you pair with the practice on your own VM.",
 k: ["Shell = interactive command access on the target", "Bind shell: target listens, attacker connects (often blocked by inbound firewall)", "Reverse shell: target connects out to the attacker (bypasses inbound rules)", "This is why reverse shells are common: outbound is often allowed", "Defence: egress filtering, segmentation, and EDR catching shell behaviour"],
 t: ["Explain the difference between a bind and a reverse shell in your own words", "On your lab, catch a reverse shell from the target to Kali (e.g. with a listener)", "Explain why reverse shells get past inbound firewalls", "Write the defences: egress filtering and segmentation", "Note how EDR/monitoring can detect shell activity"],
 note: "Create shells only between machines you own in your lab, or within an authorised engagement.",
 q: [["What's the difference between a bind shell and a reverse shell?", "A bind shell has the target open a listening port for the attacker to connect to; a reverse shell has the target initiate an outbound connection back to the attacker's listener. Reverse shells are common because outbound traffic is often less restricted."],
     ["How do defenders stop reverse shells?", "Egress (outbound) filtering to block unexpected connections, network segmentation to limit where a host can reach, and endpoint detection that recognises shell-spawning behaviour, plus fixing the vulnerability that allowed code execution."]],
 x: ["Thinking inbound firewall rules stop reverse shells (they don't; egress rules do)", "Testing shells across networks you don't own"],
 d: "You can explain and demonstrate a reverse shell in your lab and state how egress filtering blocks it.",
 min: 50
},
"w9-4": {
 m: "The number-one way attackers get in is still the simplest: default and weak credentials.",
 e: "Despite all the sophisticated attacks, weak and default passwords remain a leading cause of real breaches. Routers, databases and admin panels shipped with admin/admin, reused passwords, and no MFA give attackers an easy front door. On your lab you'll see how default creds grant access, and the defences are correspondingly simple and powerful: change defaults, enforce strong unique passwords, require MFA, and limit login attempts. This is low-glamour, high-impact security.",
 k: ["Default credentials on devices/services are a top real-world entry point", "Reused and weak passwords enable credential stuffing and guessing", "MFA defeats most password-only attacks even when a password leaks", "Defences: change defaults, strong unique passwords, MFA, lockout/rate-limiting", "Password managers make strong unique passwords practical for everyone"],
 t: ["Identify a default-credential service on your Metasploitable VM and log in", "List 5 common default credential pairs and why they persist", "Explain how MFA stops an attacker who has the password", "Write the full defensive checklist for credentials", "Note why rate-limiting/lockout matters alongside strong passwords"],
 note: "Test default/weak credentials only on your own lab or an authorised scope. Trying credentials on systems you don't own is unauthorised access.",
 q: [["Why are default credentials such a common breach cause?", "Many devices and services ship with well-known default logins that administrators forget to change, so attackers simply try the documented defaults and gain access with no exploit needed."],
     ["How does MFA protect against password attacks?", "It requires a second factor beyond the password, so even a leaked or guessed password isn't enough to log in, defeating credential stuffing, phishing of passwords alone, and brute force."]],
 x: ["Dismissing weak-password issues as 'not real hacking' despite their huge impact", "Testing credentials outside an authorised scope"],
 d: "You can demonstrate default-credential access on your lab and list the credential defences.",
 min: 45
},
"w9-5": {
 m: "Passwords are usually stored as hashes. Understanding cracking, in the lab, teaches you why strong hashing and MFA win.",
 e: "Systems should store passwords as salted hashes, not plaintext. If an attacker obtains the hashes (from a database they're authorised to assess, or lab data), they may try to crack them offline by hashing guesses and comparing. Tools like Hashcat do this fast. The defensive lessons are the whole point: use slow, salted hashing (bcrypt/argon2), which makes cracking impractical, plus strong passwords and MFA. You practise only on hashes from your own lab or sample data.",
 k: ["Passwords should be stored as salted hashes, never plaintext or reversible encryption", "Cracking = hashing guesses and comparing, offline, against obtained hashes", "Salting defeats precomputed (rainbow-table) attacks", "Slow hashes (bcrypt, argon2, scrypt) make large-scale cracking impractical", "MFA means a cracked password still isn't enough to log in"],
 t: ["Explain the difference between hashing and encryption for passwords", "Crack a few sample/lab hashes with Hashcat using a wordlist", "Explain how salting and slow hashes defeat cracking", "Compare a fast hash (MD5) vs a slow one (bcrypt) for password storage", "Write the password-storage defensive standard"],
 c: `# crack SAMPLE/LAB hashes only (never real credentials you aren't authorised for)
hashcat -m 0 lab_hashes.txt rockyou.txt      # MD5 example, lab data
# defence (how passwords SHOULD be stored):
#   bcrypt / argon2 with a per-user salt and a high work factor
#   plus strong password policy and MFA`,
 note: "Crack only hashes from your own lab, sample files, or an authorised engagement. Cracking credentials you aren't authorised to possess is unlawful.",
 q: [["Why should passwords be stored with a slow, salted hash like bcrypt?", "Salting makes each hash unique so precomputed tables don't work, and a slow hash with a tunable work factor makes brute-forcing each password computationally expensive, so even a stolen database resists mass cracking."],
     ["What's the difference between hashing and encrypting passwords?", "Hashing is one-way: you can't recover the password, only compare hashes. Encryption is reversible with a key, so if the key leaks the passwords are exposed. Passwords should be hashed, not encrypted."]],
 x: ["Using fast hashes (MD5/SHA-1) or no salt for password storage", "Handling credentials/hashes you aren't authorised to possess"],
 d: "You can crack sample hashes in the lab and specify secure password-storage defences.",
 min: 55
},
"w9-6": {
 m: "A repeatable methodology and good evidence turn lucky hacks into professional work.",
 e: "The difference between a hobbyist and a professional is method and documentation. A repeatable methodology, recon, enumerate, identify, exploit (in scope), document, means you find more and miss less. Evidence, commands run, screenshots, timestamps, lets you reproduce findings and write a credible report. You'll formalise your own methodology and evidence standard now, because the exploitation and privesc work only counts if it's documented well enough to act on and to prove you stayed in scope.",
 k: ["A written methodology makes your testing thorough and repeatable", "Evidence: exact commands, outputs, screenshots, timestamps", "Reproducibility is what makes a finding credible and fixable", "Good notes prove you stayed within the authorised scope", "This directly becomes your pentest report in the capstone"],
 t: ["Write your end-to-end methodology as ordered phases", "Define your evidence standard (what to capture for every finding)", "Re-document one exploit from this week to that standard", "Structure your notes so they can become a report", "Note how your evidence also demonstrates you stayed in scope"],
 q: [["Why is a repeatable methodology important in penetration testing?", "It ensures coverage and consistency so you don't miss steps, makes results comparable over time, and lets others follow and verify your work, which is essential for professional, reportable testing."],
     ["What evidence should you capture for each finding?", "The exact commands or requests, the resulting output or response, screenshots where helpful, timestamps, and the affected target, enough for someone else to reproduce and remediate it, and to confirm it was in scope."]],
 x: ["Improvising each engagement instead of following a methodology", "Thin evidence that can't reproduce or justify a finding"],
 d: "You have a written methodology and evidence standard, and one exploit documented to it.",
 min: 45
},
"w9-p": {
 m: "Compromise a beginner machine end to end, in your lab, and document every weakness with its fix.",
 e: "Your project is to take one beginner-level machine, from VulnHub (run in your lab) or a TryHackMe room (sandboxed), from enumeration to initial access, following your methodology and documenting each step. Crucially, for every weakness you used, you write the defence that would have blocked it. This is a full offensive exercise on an authorised target, producing a report-ready write-up and proving you can chain the skills from Phases 3–5.",
 k: ["One beginner box compromised end to end on an authorised target", "Full methodology: recon -> enumerate -> identify -> initial access", "Each weakness paired with its defence/fix", "A reproducible, report-ready write-up"],
 t: ["Pick a beginner VulnHub VM (in your lab) or TryHackMe room (sandboxed)", "Enumerate thoroughly and identify the way in", "Gain initial access following your methodology, documenting each step", "For every weakness used, write the hardening/fix that blocks it", "Produce a clean write-up with evidence and remediation"],
 note: "Use only a VulnHub VM you run yourself or a sandboxed TryHackMe room. These are authorised by design; the techniques never apply to systems you don't own.",
 q: [["Describe your process for compromising a machine in a lab.", "Enumerate thoroughly to map services and versions, identify a weakness (vulnerable version, misconfiguration or weak credentials), verify and exploit it in scope to gain access, and document every step with evidence and the corresponding defensive fix."],
     ["Why document the fix for every weakness you exploit?", "Because the value of an assessment is improving security; pairing each exploited weakness with its remediation turns an attack narrative into actionable hardening for the owner."]],
 x: ["Getting access but not documenting the path or the fixes", "Using a target you don't own or aren't authorised for"],
 d: "You've compromised a beginner box on an authorised target and documented each weakness with its defence.",
 min: 150
},

/* ---------- Week 10: Privilege escalation and post-exploitation ---------- */
"w10-1": {
 m: "Initial access is rarely the end. Privilege escalation is how a foothold becomes full control, and how defenders stop it.",
 e: "After getting a low-privileged shell, attackers look to become root (Linux) or administrator (Windows). Privilege escalation exploits local misconfigurations: a program running with too many rights, a writable file used by a privileged process, a scheduled task you can edit. You'll learn the common Linux paths on your own lab, and, just as important, the defences: least privilege, patching, and careful configuration remove these paths. Understanding both sides is what makes you useful to a defensive team.",
 k: ["Privilege escalation: low-privileged access -> root/admin via local misconfig", "Linux vectors: SUID binaries, sudo misconfigurations, writable cron jobs, PATH issues", "Enumeration first: find the misconfiguration before exploiting it", "GTFOBins catalogues how specific binaries can be abused (and so, what to restrict)", "Defence: least privilege, patching, removing unnecessary SUID, careful sudo rules"],
 t: ["Enumerate your lab target for SUID binaries and sudo rights", "Pick one misconfiguration and look it up on GTFOBins", "Escalate to root using it, in your lab", "Write exactly why it worked and the configuration that would prevent it", "Note how least privilege removes most of these vectors"],
 c: `# Linux privesc enumeration on YOUR OWN lab target
sudo -l                                  # what can this user run as root?
find / -perm -4000 -type f 2>/dev/null   # SUID binaries
# look the binary up on GTFOBins for abuse + the corresponding hardening
# defence: remove unnecessary SUID, tighten sudoers, patch, least privilege`,
 note: "Perform privilege escalation only on machines you own in your lab or within an authorised engagement.",
 q: [["What is privilege escalation?", "Gaining higher privileges than you initially had on a system, typically moving from a low-privileged user to root or administrator by abusing local misconfigurations or vulnerabilities."],
     ["Name common Linux privilege-escalation vectors and their defence.", "Misconfigured sudo rights, abusable SUID binaries, writable cron jobs or scripts run by root, and PATH/library issues. Defences include least privilege, removing unnecessary SUID, strict sudoers, and patching."]],
 x: ["Attempting escalation before enumerating the host for misconfigurations", "Running privesc on systems you don't own"],
 d: "You can escalate to root on your lab via one technique and explain the configuration that prevents it.",
 min: 55
},
"w10-2": {
 m: "Windows is everywhere in organisations, and its privilege-escalation paths are worth understanding in concept.",
 e: "Windows privilege escalation has its own common paths: services running as SYSTEM with weak permissions, unquoted service paths, misconfigured scheduled tasks, and abusable privileges/tokens. You'll study these conceptually (and practise on a Windows lab if you have one), focusing on recognising the misconfiguration and knowing the fix. LOLBAS catalogues legitimate Windows binaries that can be abused, which also tells defenders what to monitor. As always, the defensive takeaway, least privilege, correct service config, patching, is the real deliverable.",
 k: ["Windows vectors: weak service permissions, unquoted service paths, scheduled tasks, token/privilege abuse", "SYSTEM is the Windows equivalent of root", "LOLBAS: legitimate binaries abused for malicious ends (and what defenders watch)", "Enumeration tools surface these misconfigurations", "Defence: least privilege, correct service/ACL config, patching, monitoring"],
 t: ["List the common Windows privesc vectors and what each abuses", "Explain an unquoted service path issue in your own words", "Look up one technique on LOLBAS and note the defence", "If you have a Windows lab, enumerate it for one vector", "Write the hardening steps that close each vector"],
 note: "Practise Windows privilege escalation only on a Windows VM you own or an authorised lab.",
 q: [["Name common Windows privilege-escalation vectors.", "Services running as SYSTEM with weak file or registry permissions, unquoted service paths, writable scheduled tasks, and abusable privileges or tokens. Enumeration tools help find these misconfigurations."],
     ["What is LOLBAS and why does it matter to defenders?", "Living Off the Land Binaries And Scripts: a catalogue of legitimate Windows tools that can be abused for malicious actions. It matters because defenders must monitor for suspicious use of trusted binaries, not just unknown malware."]],
 x: ["Assuming privesc is only a Linux topic", "Testing on Windows systems you don't own"],
 d: "You can describe the main Windows privesc vectors and their defences, and try one on a lab if available.",
 min: 50
},
"w10-3": {
 m: "Enumeration scripts speed up finding privesc paths, but only if you can read what they tell you.",
 e: "Tools like LinPEAS/WinPEAS automate privilege-escalation enumeration, highlighting likely misconfigurations. They're a huge time-saver, but they produce a lot of output, and the skill is interpreting it: knowing which highlighted item is actually exploitable and why. You'll run one on your lab target and practise reading the output critically, then, as always, write the defence. Relying on a script without understanding makes you helpless when it misses something.",
 k: ["LinPEAS/WinPEAS automate privesc enumeration and flag likely issues", "The skill is interpreting output, not just running the tool", "Verify flagged items; not every highlight is exploitable", "Understand each finding so you can explain and fix it", "Defence: these tools also show defenders what to harden"],
 t: ["Run a privesc enumeration script on your lab target", "Pick the top 3 flagged items and assess which are actually exploitable", "Verify one by hand to confirm the script's finding", "Write the fix for each confirmed item", "Note the risk of trusting a tool's output without verification"],
 note: "Run enumeration scripts only on machines you own or an authorised scope.",
 q: [["What do privilege-escalation enumeration scripts do, and what's their limitation?", "They automatically gather and highlight local misconfigurations and potential escalation paths, saving time. Their limitation is noisy output and false positives, so results must be interpreted and verified by someone who understands the underlying techniques."],
     ["Why verify a tool's finding by hand?", "Automated tools produce false positives and can miss context; manually confirming ensures the finding is real and exploitable before you report it or rely on it, and deepens your understanding."]],
 x: ["Treating script output as ground truth without verification", "Running the tools outside an authorised scope"],
 d: "You can run and critically interpret a privesc enumeration script on your lab and verify a finding.",
 min: 50
},
"w10-4": {
 m: "Every escalation path has a prevention. Learning the defence is what makes this knowledge employable.",
 e: "This is the defensive heart of the phase. Almost every privilege-escalation path is closed by the same handful of practices: least privilege (users and services get only what they need), timely patching, system hardening (removing unnecessary SUID, correct permissions, strict sudo/service config), and monitoring. For each technique you've learned, you'll write the specific control that blocks it. A tester who can also tell a client how to fix the problems is worth far more than one who only breaks in.",
 k: ["Least privilege closes the majority of escalation paths", "Patching removes known local-privilege-escalation vulnerabilities", "Hardening: remove unnecessary SUID, fix permissions, tighten sudo/services", "Monitoring/EDR detects escalation attempts and abuse of trusted binaries", "Map each attack technique to a concrete preventive control"],
 t: ["Make a table: each privesc technique you learned and its specific fix", "Write a short Linux hardening checklist from what you've seen", "Explain how least privilege alone would have blocked several paths", "Note which techniques monitoring would catch even if prevention failed", "Add remediation sections to your privesc notes"],
 q: [["What single principle prevents the most privilege-escalation paths?", "Least privilege: giving users, services and processes only the permissions they genuinely need, which removes the excess rights and misconfigurations that most escalation techniques abuse."],
     ["Besides prevention, how do defenders handle privilege escalation?", "Detection and response: monitoring and EDR to spot escalation attempts and abuse of trusted binaries, plus patching and hardening, so that even if one control fails, the activity is caught and contained."]],
 x: ["Learning attacks without the matching defences", "Treating hardening as optional in a report"],
 d: "You can map each privilege-escalation technique you've learned to a specific preventive control.",
 min: 50
},
"w10-5": {
 m: "What attackers do after gaining access, and how it's detected, matters as much as the break-in.",
 e: "Post-exploitation covers what happens after access: looking around, moving to other systems (lateral movement), and maintaining access (persistence). You'll study these in concept, because the key learning is how defenders detect them, through logging, anomaly detection, and frameworks like MITRE ATT&CK that catalogue these techniques. You won't deploy real malware or persistence outside your lab; the goal is to understand the attacker's later stages well enough to detect and disrupt them, which is the blue-team phase next.",
 k: ["Post-exploitation: situational awareness, lateral movement, persistence (in concept)", "Lateral movement: using one compromised host to reach others", "Persistence: mechanisms to keep access (which defenders hunt for)", "MITRE ATT&CK catalogues these techniques and their detections", "Defence: segmentation, monitoring, least privilege, and detecting persistence"],
 t: ["Define lateral movement and persistence in your own words", "Find these techniques in the MITRE ATT&CK matrix and read their detections", "Explain how network segmentation limits lateral movement", "Note what logs/signals reveal persistence attempts", "Write the defensive controls for each stage"],
 note: "Study post-exploitation conceptually and practise only within your own isolated lab. Deploying persistence or moving laterally on systems you don't own is unlawful.",
 q: [["What is lateral movement, and how is it limited?", "Using an initial foothold to reach and compromise other systems in the network. It's limited by network segmentation, least privilege, strong internal authentication (and MFA), and monitoring that detects unusual internal connections."],
     ["How does MITRE ATT&CK help defenders?", "It provides a shared catalogue of attacker tactics and techniques with detection and mitigation guidance, so defenders can map their monitoring and controls to real adversary behaviour and find gaps."]],
 x: ["Deploying persistence/lateral movement outside an isolated lab", "Ignoring the detection side, which is where the career value is"],
 d: "You can explain lateral movement and persistence conceptually and map them to ATT&CK detections.",
 min: 50
},
"w10-6": {
 m: "A professional cleans up and documents. Leaving a lab, or a client system, in a known state is part of the job.",
 e: "After testing, you restore your lab to a clean state (snapshots) and ensure your documentation is complete: what you did, what you found, and the fixes. In a real engagement, you'd also remove any artefacts you created and hand over a clear report. Treating cleanup and documentation as part of the work, not an afterthought, is a mark of professionalism and keeps your lab reliable for the next exercise. Today you make it routine.",
 k: ["Restore lab VMs from snapshots to a clean baseline after testing", "In real engagements, remove test artefacts and tools you deployed", "Complete documentation: actions, findings, evidence, remediation", "A clean, known state makes future tests reliable and comparable", "Cleanup and reporting are deliverables, not afterthoughts"],
 t: ["Restore your lab target VMs to clean snapshots", "Verify your notes cover every action and finding from the phase", "List what you'd remove after a real engagement (artefacts, accounts, tools)", "Organise your Phase 5 findings into report-ready form", "Confirm your lab is back to a known-good baseline"],
 q: [["Why is cleanup important after a penetration test?", "To restore systems to their original state, remove any artefacts, test accounts or tools you introduced, and avoid leaving new weaknesses or instability, so the environment is exactly as it was plus a clear report."],
     ["What should your documentation contain by the end of an engagement?", "Every action taken with evidence and timestamps, each finding with impact and reproduction, remediation guidance, and confirmation that work stayed within scope, enough to produce the final report."]],
 x: ["Leaving test tools, accounts or artefacts behind", "Finishing without complete, report-ready documentation"],
 d: "Your lab is restored to clean snapshots and your Phase 5 findings are complete and report-ready.",
 min: 40
},
"w10-p": {
 m: "Go the full distance: initial access to root, two ways, and write the hardening that blocks each.",
 e: "Your project is to escalate to root/administrator on a lab machine using two different techniques, then write the specific hardening steps that would have blocked each. Doing it two ways proves you understand the category, not just one trick, and the paired defences make the write-up genuinely useful. This completes your offensive skill set on authorised targets and feeds directly into both the capstone and the defensive phase.",
 k: ["Two distinct privesc techniques on a lab machine you own/are authorised for", "Each paired with the specific control that prevents it", "A reproducible write-up with evidence", "Lab restored to clean snapshots afterwards"],
 t: ["Choose a lab machine and gain a low-privileged foothold", "Escalate to root/admin using one technique and document it", "Escalate again using a different technique", "Write the precise hardening step that blocks each", "Produce a write-up with evidence and remediation, then restore snapshots"],
 note: "Use only lab machines you own or sandboxed, authorised training rooms.",
 q: [["Why demonstrate two different privilege-escalation techniques?", "To show you understand privilege escalation as a category and can find multiple paths, rather than relying on a single memorised trick, which is what real assessment and defence require."],
     ["How would you present privesc findings to a system owner?", "Describe each exploited misconfiguration, its impact (full system control), how to reproduce it, and the specific hardening (least privilege, config fix, patch) that closes it, prioritised by ease and effectiveness."]],
 x: ["Using the same technique twice", "Omitting the hardening steps that make the finding actionable"],
 d: "You've escalated to root two different ways on an authorised target, each with its documented hardening.",
 min: 150
}
};
