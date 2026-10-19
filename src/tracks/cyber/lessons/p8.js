/* Cyber Phase 8: DFIR & Malware Analysis (Weeks 15-16)
   Investigate breaches like a professional. Malware analysis only in an isolated lab. */
export default {

/* ---------- Week 15: Digital forensics and incident response (DFIR) ---------- */
"w15-1": {
 m: "When an attack succeeds, someone has to find out what happened. That calm, methodical someone is you.",
 e: "DFIR, Digital Forensics and Incident Response, is the discipline of investigating security incidents: what happened, how, what was affected, and how to recover and prevent a repeat. Incident response is the structured process (the NIST lifecycle: prepare, detect & analyse, contain, eradicate & recover, post-incident). Forensics is the evidence side: collecting and analysing data soundly enough to be trusted. This is high-responsibility work at the heart of defending organisations and national infrastructure.",
 k: ["NIST IR lifecycle: prepare, detect & analyse, contain, eradicate & recover, post-incident", "Containment before eradication: stop the bleeding before cleaning up", "Forensics must be sound: reproducible, documented, evidence preserved", "The goal is answers and recovery, done calmly and in order, not panic", "Post-incident lessons feed back into better preparation and detection"],
 t: ["Write out the NIST IR phases and what each accomplishes", "Explain why containment precedes eradication", "Describe the handoff between detection (SOC) and investigation (DFIR)", "List what 'preparation' includes (logging, backups, plans, contacts)", "Note why sound evidence handling matters even outside a courtroom"],
 q: [["What are the phases of the incident response lifecycle?", "Preparation; detection and analysis; containment, eradication and recovery; and post-incident activity (lessons learned), forming a cycle where each incident improves future preparation."],
     ["Why contain before eradicating?", "Containment stops the attacker spreading or doing more damage while you investigate; eradicating first can tip off the attacker, destroy evidence, or let the compromise widen before it's controlled."]],
 x: ["Jumping to clean-up before understanding scope and preserving evidence", "Skipping the lessons-learned phase that prevents recurrence"],
 d: "You can describe the IR lifecycle and explain sound, ordered incident handling.",
 min: 50
},
"w15-2": {
 m: "Evidence is fragile and fleeting. Collect it in the right order, or you lose it, and the truth with it.",
 e: "Digital evidence disappears fast: memory vanishes on shutdown, logs rotate, timestamps change if you're careless. The 'order of volatility' tells you to capture the most fleeting data first (memory, running state) before the durable (disks, backups). 'Chain of custody', a documented record of who handled evidence, when and how, keeps it trustworthy. Even if your case never goes to court, these habits ensure your findings are reliable and reproducible. You'll learn to acquire evidence without altering it.",
 k: ["Order of volatility: capture memory and live state before powering off", "Work on copies/images, never the original, to preserve evidence", "Hash evidence (e.g. SHA-256) to prove it wasn't altered", "Chain of custody: who, what, when, how, documented throughout", "Timestamps and metadata are evidence too, so avoid changing them"],
 t: ["List data sources in order of volatility, most fleeting first", "Explain why you image a disk and work on the copy", "Describe how hashing proves evidence integrity", "Write a simple chain-of-custody record template", "Note the mistakes that silently destroy evidence"],
 note: "Practise acquisition on your own systems or provided lab evidence only. Handle others' data strictly within an authorised investigation and the law.",
 q: [["What is the order of volatility and why does it matter?", "A priority order for collecting evidence from most to least fleeting, memory and live state first, then disk and backups, because volatile data is lost on shutdown or over time, so capturing it first preserves the fullest picture."],
     ["What is chain of custody?", "A documented record of everyone who handled a piece of evidence, when, and how, establishing that it wasn't tampered with, which keeps findings trustworthy and admissible."]],
 x: ["Powering a machine off and losing volatile memory evidence", "Working on original evidence instead of a verified copy"],
 d: "You can explain evidence volatility, imaging, hashing and chain of custody.",
 min: 50
},
"w15-3": {
 m: "A disk holds the story of what happened, including things someone tried to delete. You learn to read it.",
 e: "Disk forensics examines a filesystem image to reconstruct activity: what files existed, what was deleted (often recoverable), what programs ran, and when. Tools like Autopsy (free, open source) parse an image and surface files, timelines, deleted data and known artefacts. You'll work on a provided or self-made image in your lab, learning to navigate a filesystem forensically and to find the traces that matter, without touching the original evidence.",
 k: ["Work from a forensic image (a copy), never the live disk", "Autopsy parses images: files, deleted files, timelines, keyword search", "Deleted doesn't mean gone: data often remains until overwritten", "Filesystem metadata (MACB times) helps build a timeline", "Focus on artefacts tied to your investigative question"],
 t: ["Load a disk image (provided lab case or one you make) into Autopsy", "Browse the filesystem and recover a deleted file", "Use a keyword search to find relevant data", "Read file timestamps and note what they suggest", "Record your findings with their source and significance"],
 note: "Analyse only images you own or lab/case evidence you're authorised to examine.",
 q: [["Why can deleted files often be recovered?", "Deleting a file usually just removes its directory entry and marks its space free; the actual data remains on disk until overwritten, so forensic tools can recover it until that happens."],
     ["What does Autopsy help a forensic analyst do?", "Parse a disk image to browse files, recover deleted data, build timelines from metadata, search by keyword, and surface known artefacts, all without altering the original evidence."]],
 x: ["Analysing the live disk instead of an image", "Chasing every artefact instead of those that answer the question"],
 d: "You can examine a disk image in Autopsy, recover deleted data, and extract relevant findings.",
 min: 55
},
"w15-4": {
 m: "Memory is where the truth lives: running malware, injected code, and secrets that never touch disk.",
 e: "Memory (RAM) forensics analyses a capture of a system's memory to reveal what was actually running: processes (including hidden ones), network connections, injected code, and artefacts that never hit the disk. Volatility is the standard tool. Because modern malware often runs only in memory, this skill is essential for serious investigations. You'll analyse a memory image in your lab, listing processes and connections and spotting anomalies, the kind of work that catches sophisticated intrusions.",
 k: ["Memory holds running processes, connections, injected code and in-memory secrets", "Volatility analyses a memory image to reconstruct this live state", "Fileless/in-memory malware is invisible to disk forensics alone", "Look for hidden processes, odd parent-child chains, and unusual connections", "Capture memory before shutdown (it's the most volatile evidence)"],
 t: ["Load a memory image (lab case) into Volatility", "List processes and spot any that look anomalous", "List network connections at the time of capture", "Look for signs of code injection or a hidden process", "Correlate memory findings with disk/log findings"],
 note: "Analyse only memory images you captured from your own systems or authorised lab/case evidence.",
 q: [["Why is memory forensics important?", "Because much attacker activity, running malware, injected code, network connections and in-memory credentials, exists only in RAM and never touches disk, so memory analysis reveals what disk forensics alone would miss."],
     ["What can Volatility reveal from a memory image?", "Running and hidden processes, their relationships, loaded modules, network connections, injected code and other live-state artefacts captured at the moment of acquisition."]],
 x: ["Shutting down and losing the memory evidence before capture", "Looking only at disk and missing in-memory malware"],
 d: "You can analyse a memory image in Volatility to list processes/connections and flag anomalies.",
 min: 55
},
"w15-5": {
 m: "Windows keeps receipts for everything. Knowing where the artefacts hide lets you reconstruct the whole story.",
 e: "Windows systems are full of forensic artefacts that record user and program activity: the event logs, registry keys (recording USB devices, run programs, user activity), Prefetch (evidence of program execution), browser history, scheduled tasks, and more. Knowing these lets you reconstruct a timeline of what happened on a host. Eric Zimmerman's tools are the go-to for parsing them. You'll practise pulling and reading key artefacts to answer investigative questions.",
 k: ["Event logs, registry, Prefetch, browser history, scheduled tasks, shellbags, and more", "Prefetch and other execution artefacts show what programs ran and when", "Registry records devices, user activity and persistence", "Eric Zimmerman's tools parse these artefacts cleanly", "Combine artefacts into one timeline to tell the story"],
 t: ["List 6 Windows forensic artefacts and what each reveals", "Parse an execution artefact (e.g. Prefetch) and note what ran", "Examine a registry key that records user or device activity", "Build a mini timeline from two or three artefacts", "Explain how artefacts corroborate each other"],
 note: "Examine artefacts only from your own systems or authorised lab/case evidence.",
 q: [["Name Windows artefacts that show program execution.", "Prefetch files, Amcache/Shimcache, UserAssist registry keys and, with auditing, process-creation events, all indicate that specific programs ran and often when."],
     ["How do forensic artefacts help build a timeline?", "Each artefact carries timestamps for specific activity (execution, logon, file access, device insertion); combining them chronologically reconstructs the sequence of events across the investigation."]],
 x: ["Relying on one artefact instead of corroborating several", "Ignoring the registry as a rich evidence source"],
 d: "You can extract and interpret key Windows artefacts and assemble them into a timeline.",
 min: 55
},
"w15-6": {
 m: "An investigation nobody can follow is worthless. The report is the deliverable, and the skill.",
 e: "DFIR work culminates in a report and a timeline that clearly explain what happened, the impact, how it was handled, and how to prevent a repeat, written for both technical responders and decision-makers. A clear incident timeline (what happened when) is often the centrepiece. You'll learn the structure of a professional incident report and write one, the exact artefact produced on real engagements and in national CERTs.",
 k: ["Incident report: summary, timeline, scope/impact, root cause, response, remediation", "A timeline (time, event, source, evidence) is the backbone of the report", "Write for two audiences: technical detail plus an executive summary", "State findings with evidence; separate fact from assessment", "Remediation and lessons learned turn the incident into improvement"],
 t: ["Draft an incident report structure with all key sections", "Build a timeline table from a lab case's evidence", "Write an executive summary of that case in plain language", "Separate confirmed facts from your assessments", "List remediation and lessons-learned items"],
 q: [["What does a good incident report contain?", "An executive summary, a detailed timeline, the scope and impact, the root cause, the response actions taken, and remediation and lessons learned, written for both technical and non-technical readers, with findings backed by evidence."],
     ["Why is the timeline central to an investigation?", "It orders events into a coherent story, when the attacker entered, what they did, and what was affected, which drives scoping, containment, communication and prevention."]],
 x: ["Only technical detail with no executive summary", "Mixing speculation with confirmed facts"],
 d: "You can write a structured incident report with a clear, evidence-backed timeline.",
 min: 50
},
"w15-p": {
 m: "Work a real case: investigate the evidence, reconstruct the attack, and report it like a pro.",
 e: "Your project is a full DFIR lab case (CyberDefenders and similar platforms publish realistic ones): examine disk and/or memory evidence and host artefacts, reconstruct what happened, build a timeline, and write a professional incident report with remediation. This mirrors the work of an incident responder or a national-CERT analyst and produces a strong, specialised portfolio piece.",
 k: ["A realistic DFIR case worked end to end on authorised lab evidence", "Disk/memory/artefact analysis combined into one timeline", "A professional incident report with root cause and remediation", "Findings backed by evidence throughout"],
 t: ["Pick a DFIR lab case (e.g. on CyberDefenders)", "Analyse the provided evidence (disk, memory, artefacts)", "Reconstruct the attack and build a timeline", "Determine root cause and impact", "Write a professional incident report with remediation and publish it"],
 note: "Use authorised lab/case evidence or your own systems only.",
 q: [["Walk me through investigating an incident.", "Preserve and image evidence, analyse memory, disk and host artefacts, correlate findings into a timeline, determine the entry point, actions and impact (root cause and scope), then report it with evidence and recommend containment, eradication and prevention."],
     ["How do you ensure your findings are reliable?", "Work from verified copies, hash and document evidence, corroborate conclusions across multiple artefacts, separate fact from assessment, and keep a clear chain of custody and reproducible method."]],
 x: ["Conclusions from a single artefact without corroboration", "A report that's all detail and no clear narrative or remediation"],
 d: "You've worked a DFIR case end to end and produced an evidence-backed incident report with a timeline.",
 min: 150
},

/* ---------- Week 16: Malware analysis (safe, isolated) ---------- */
"w16-1": {
 m: "To defend against malware you must understand it, and to study it safely you must cage it first.",
 e: "Malware analysis reveals what malicious software does so defenders can detect, contain and remove it. But malware is dangerous, so step one is a properly isolated lab: a dedicated analysis VM (REMnux for Linux, FLARE VM for Windows), with no connection to your real network or the internet, and snapshots to reset after each sample. This week is strictly about understanding and defending; every step happens inside that cage. Getting the isolation right is the most important lesson here.",
 k: ["Isolation first: a dedicated analysis VM, no real-network/internet access, snapshots", "REMnux (Linux) and FLARE VM (Windows) are purpose-built analysis toolkits", "Never run samples on your main machine or outside isolation", "Use known teaching samples (e.g. EICAR) to learn safely", "The goal is understanding and defence: detection, IOCs, removal"],
 t: ["Set up an isolated analysis VM (REMnux or FLARE VM) with snapshots", "Confirm it has no path to your real network or the internet", "Understand the EICAR test file (a safe, standard anti-malware test string)", "Write your malware-lab safety rules", "Explain why isolation and snapshots are non-negotiable"],
 note: "Handle malware only inside a fully isolated lab you control, using safe teaching samples. Never run or distribute real malware outside isolation, and never deploy it against any system.",
 q: [["Why must malware analysis be done in an isolated environment?", "Malware can spread, call home, encrypt data or pivot to other machines. A dedicated, network-isolated VM with snapshots contains it and lets you reset to a clean state after each sample, protecting you and others."],
     ["What is the EICAR file?", "A harmless standard test string that anti-malware products detect as if it were malware, used to safely verify that detection works, without any real malicious behaviour."]],
 x: ["Analysing a sample on your main computer or a networked VM", "Skipping snapshots and contaminating the analysis environment"],
 d: "You have a properly isolated malware-analysis VM with snapshots and written safety rules.",
 min: 55
},
"w16-2": {
 m: "You can learn a lot about a file without ever running it. Static analysis is the safe first look.",
 e: "Static analysis examines a file without executing it: its hash (to check reputation), its type, embedded strings (URLs, commands, messages), and structure. This is safe and fast and often reveals a sample's intent. You'll check a file's hash against VirusTotal (which aggregates many engines), pull strings, and identify the file type, building the habit of learning everything possible before any risky execution.",
 k: ["Hashes (MD5/SHA-256) identify a file and check reputation (e.g. VirusTotal)", "File type and structure hint at what the sample is", "Strings often reveal URLs, IPs, commands, or messages", "Static analysis is safe: no execution, no risk of infection", "VirusTotal shows how many engines flag it and related intel"],
 t: ["Hash a sample and look it up on VirusTotal (reputation only)", "Identify the file type", "Extract and review the strings for URLs, IPs or commands", "Note what the static indicators suggest about intent", "Record the IOCs you found (hash, strings, URLs)"],
 note: "Perform static analysis inside your isolated lab. Upload only samples you're authorised to share, since uploads become visible to the service.",
 q: [["What is static malware analysis?", "Examining a file without executing it, its hash, type, strings and structure, to infer its nature and extract indicators safely, with no risk of infection."],
     ["Why check a file's hash on a service like VirusTotal?", "The hash uniquely identifies the file, so you can see whether it's already known malware, how many engines detect it, and related intelligence, without executing it. (Be mindful that uploading a file shares it.)"]],
 x: ["Executing a sample before exhausting safe static analysis", "Uploading sensitive or unauthorised files to public services"],
 d: "You can statically analyse a sample, extract strings and IOCs, and check its reputation.",
 min: 50
},
"w16-3": {
 m: "Some answers only come from watching malware run, so you let it run, safely caged, and watch everything.",
 e: "Dynamic analysis executes a sample in the isolated lab and observes its behaviour: what processes it spawns, files and registry keys it changes, and network connections it attempts (to a simulated network). This reveals behaviour that static analysis can miss, especially for packed or obfuscated samples. Automated sandboxes (like ANY.RUN) do this and produce a report. You'll observe a safe sample's behaviour and learn to read what it's trying to do, and how a defender would catch it.",
 k: ["Dynamic analysis runs the sample and records its behaviour, in isolation", "Watch: process creation, file/registry changes, network attempts, persistence", "Use a simulated network so the sample 'calls home' to you, not the internet", "Automated sandboxes (ANY.RUN, etc.) produce behaviour reports quickly", "Behaviour maps to detections: persistence, C2, and more"],
 t: ["In your isolated lab, detonate a safe teaching sample and watch process/file/registry/network activity", "Alternatively, read an ANY.RUN report for a known sample", "Identify any persistence and network (C2) behaviour", "Map the behaviours to how a SOC would detect them", "Record the behavioural IOCs observed"],
 note: "Detonate samples only inside a fully isolated lab, with no path to real networks. Use safe teaching samples; never run real malware you can't contain.",
 q: [["What does dynamic analysis reveal that static analysis can't?", "Actual runtime behaviour, processes spawned, files and registry changed, persistence established, and network/C2 attempts, which is especially valuable for packed or obfuscated samples whose intent isn't visible statically."],
     ["Why use a simulated network when detonating malware?", "So the sample's outbound connections are contained and observable (it 'calls home' to your controlled services) without reaching real command-and-control infrastructure or the internet."]],
 x: ["Detonating with a live internet connection", "Trusting a single run; some malware behaves differently by environment"],
 d: "You can observe and interpret a sample's dynamic behaviour safely and record behavioural IOCs.",
 min: 55
},
"w16-4": {
 m: "The output of analysis is intelligence: the indicators and behaviours that let everyone else detect this threat.",
 e: "The point of analysis is to produce something defenders can use. Indicators of Compromise (IOCs), hashes, URLs, IPs, file names, registry keys, let others detect the same threat. Better still are behavioural indicators and ATT&CK techniques, which are harder for attackers to change (the Pyramid of Pain again). You'll take your static and dynamic findings and turn them into a clean IOC set and detection ideas, closing the loop from analysis to defence.",
 k: ["IOCs: hashes, URLs, IPs, filenames, registry keys, mutexes", "Behavioural indicators and ATT&CK techniques are more durable than atomic IOCs", "Share IOCs in usable formats so detections can consume them", "The Pyramid of Pain: behaviours hurt attackers more than hashes", "Analysis feeds detection engineering and threat intel"],
 t: ["Compile the IOCs from your static and dynamic analysis", "Classify each as atomic (hash/IP) or behavioural (technique)", "Map behaviours to ATT&CK techniques", "Write one detection idea per behaviour", "Note which indicators are durable vs easily changed"],
 q: [["What are Indicators of Compromise (IOCs)?", "Observable artefacts that indicate a system may be compromised, such as file hashes, malicious URLs/IPs, filenames, registry keys or mutexes, used to detect the same threat elsewhere."],
     ["Why are behavioural indicators more valuable than hashes?", "Attackers can trivially change hashes, IPs and filenames, but behaviours and techniques are harder to alter, so detections built on them are far more durable, the core idea of the Pyramid of Pain."]],
 x: ["Producing only easily-changed atomic IOCs", "Not mapping behaviours to ATT&CK for durable detection"],
 d: "You can turn analysis findings into a classified IOC set and behaviour-based detection ideas.",
 min: 45
},
"w16-5": {
 m: "Malware has a playbook: get in, stay in, phone home, do damage. Know the plays to catch any of them.",
 e: "Despite endless variety, malware shares common behaviours: establishing persistence (surviving reboot), command-and-control (C2, phoning home for instructions), privilege escalation, lateral movement, and the objective (ransomware, theft, destruction). Recognising these categories lets you understand and detect a sample you've never seen before, because you know what to look for. You'll study each behaviour and the generic detections and defences for it, reinforcing the attacker-to-defender loop.",
 k: ["Persistence: run keys, services, scheduled tasks (detect via autostart monitoring)", "Command-and-control (C2): beaconing out for instructions (detect via network anomalies)", "Common objectives: ransomware, info theft, botnet, destruction", "Defence/detection maps to each behaviour, regardless of the specific sample", "Understanding behaviour categories lets you reason about novel malware"],
 t: ["List common malware behaviour categories and a detection for each", "Explain how C2 beaconing can be spotted in network data", "Describe persistence locations defenders should monitor", "Map malware behaviours to ATT&CK tactics", "Write how understanding categories helps with an unknown sample"],
 q: [["What is command-and-control (C2)?", "The channel malware uses to contact the attacker's infrastructure for instructions or to exfiltrate data, often as periodic 'beaconing'. It's detectable through network monitoring for regular or anomalous outbound connections."],
     ["How do defenders detect persistence?", "By monitoring the places malware installs itself to survive reboots, run keys, services, scheduled tasks and startup folders, and alerting on unexpected changes (e.g. with Autoruns-style checks and event logging)."]],
 x: ["Chasing specific samples instead of understanding behaviour classes", "Ignoring beaconing patterns in network data"],
 d: "You can describe the common malware behaviour categories and a detection for each.",
 min: 50
},
"w16-6": {
 m: "Analysis you can't communicate helps no one. The malware report turns your work into everyone's defence.",
 e: "A malware analysis report summarises what the sample is, what it does (static and dynamic findings), its IOCs and ATT&CK techniques, and detection and removal guidance, for both responders and decision-makers. This is the deliverable a malware analyst or national-CERT researcher produces, and it's how one person's analysis protects a whole organisation or sector. You'll write one for the sample you analysed, with clear detection recommendations.",
 k: ["Report: overview, static findings, dynamic behaviour, IOCs, ATT&CK, detection & removal", "Separate observed facts from assessment/attribution", "Detection guidance is the payoff: how to catch this elsewhere", "Write for responders and for leadership (executive summary)", "Share responsibly and legally"],
 t: ["Structure a malware analysis report with all key sections", "Summarise your sample's static and dynamic findings", "List the IOCs and mapped ATT&CK techniques", "Write clear detection and removal recommendations", "Add an executive summary in plain language"],
 q: [["What does a malware analysis report include?", "An overview of the sample, static and dynamic findings, extracted IOCs and ATT&CK techniques, and actionable detection and removal guidance, with an executive summary, keeping observed facts separate from assessment."],
     ["Why is the detection guidance the most important part?", "Because it lets the wider organisation or community detect and respond to the threat, turning one analyst's deep work into scalable defence."]],
 x: ["A report with findings but no detection guidance", "Presenting assessment/attribution as confirmed fact"],
 d: "You can write a malware analysis report with IOCs, ATT&CK mapping and detection guidance.",
 min: 45
},
"w16-p": {
 m: "Be a malware analyst for a day: cage a sample, dissect it safely, and turn it into defence.",
 e: "Your project is to analyse a safe sample (EICAR or a recognised teaching sample, or a documented sample via a sandbox report) entirely within your isolated lab: perform static and dynamic analysis, extract IOCs, map behaviours to ATT&CK, and write a professional malware analysis report with detection recommendations. This specialised deliverable points directly at malware-analyst and national-CERT research roles.",
 k: ["Full static + dynamic analysis of a safe sample, in isolation", "IOCs extracted and classified; behaviours mapped to ATT&CK", "A professional report with detection and removal guidance", "Strict lab isolation throughout"],
 t: ["In your isolated lab, perform static analysis of a safe sample", "Perform dynamic analysis (or analyse a sandbox report of a known sample)", "Extract and classify IOCs and map behaviours to ATT&CK", "Write detection and removal recommendations", "Produce a professional malware analysis report and publish it (safely)"],
 note: "Use only safe teaching samples inside a fully isolated lab. Never run, share or deploy real malware outside containment.",
 q: [["Walk me through analysing a malware sample.", "First isolate the environment, then do static analysis (hash, type, strings, reputation), then dynamic analysis in a contained network (processes, files, registry, C2), extract and classify IOCs, map behaviours to ATT&CK, and report findings with detection and removal guidance, all inside isolation."],
     ["How do you stay safe while analysing malware?", "Use a dedicated, network-isolated VM with no path to real networks, snapshots to reset, safe teaching samples, and never run samples on your main machine or distribute them."]],
 x: ["Any analysis step outside strict isolation", "A report without IOCs, ATT&CK mapping or detection guidance"],
 d: "You've analysed a safe sample end to end in isolation and produced a report with IOCs and detections.",
 min: 150
}
};
