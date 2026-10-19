/* Cyber Phase 7: Blue Team - SOC & Detection Engineering (Weeks 13-14)
   Most security (and national-security) work is defensive. Detect the attacks you learned to run. */
export default {

/* ---------- Week 13: The SOC, logs and SIEM in depth ---------- */
"w13-1": {
 m: "Most cyber jobs, and most national-security cyber work, are defensive. The SOC is where that work happens.",
 e: "A Security Operations Centre (SOC) is the team that watches an organisation around the clock, detecting and responding to threats. Analysts triage alerts, investigate suspicious activity, and escalate real incidents. Having learned how attacks work, you're ideally placed to detect them, which is exactly why offensive knowledge makes a strong defender. SOC roles (and their government equivalents in national CERTs and defence) are the most common entry point into a serious security career.",
 k: ["A SOC monitors, triages, investigates and responds, often 24/7", "Tiers: Tier 1 triage, Tier 2 investigation, Tier 3 hunting/engineering/IR", "The analyst's day: alert queues, triage decisions, escalation, documentation", "Government CERTs and defence SOCs do this work for national infrastructure", "Knowing offence directly improves detection and investigation"],
 t: ["Describe what each SOC tier does and how an alert flows between them", "List the qualities of a good SOC analyst (curiosity, rigour, communication)", "Explain why your offensive knowledge is a defensive advantage", "Look up a SOC analyst and a national-CERT role and compare the skills", "Start the TryHackMe SOC Level 1 intro"],
 q: [["What are the tiers of a typical SOC?", "Tier 1 triages and validates alerts, Tier 2 investigates confirmed incidents in depth, and Tier 3 handles threat hunting, detection engineering and complex incident response. Alerts escalate up the tiers as needed."],
     ["Why does offensive knowledge help a SOC analyst?", "Detecting an attack requires understanding how it works and what it leaves behind, so knowing how to run attacks tells you precisely what to look for in logs and on hosts."]],
 x: ["Thinking defence is less skilled than offence (it's where most impact and hiring are)", "Treating alerts as noise to clear rather than signals to understand"],
 d: "You can describe how a SOC operates and why your attacker knowledge makes you a stronger defender.",
 min: 45
},
"w13-2": {
 m: "You can only detect what you can see. Logs are the SOC's eyes, so you learn where they live and what they say.",
 e: "Detection starts with telemetry: the logs and events systems produce. The sources that matter most are authentication (logons and failures), endpoint/process activity, web and proxy logs, firewall and network logs, DNS, and increasingly cloud logs. Each attack you practised leaves a footprint in one or more of these. A SOC's effectiveness depends on collecting the right logs with the right detail; you'll learn which source reveals which behaviour so you can build real detections next.",
 k: ["Key sources: auth, endpoint/process, web/proxy, firewall/network, DNS, cloud", "Windows (Event Log) and Linux (/var/log, auditd) emit different but mappable events", "Endpoint detail (process creation + command line) is the richest single source", "No telemetry = no detection: visibility gaps are the SOC's biggest risk", "Log retention matters: you can't investigate what was never kept"],
 t: ["Map each attack you've learned to the log source that would reveal it", "On your lab VMs, locate the auth, process and network logs", "Explain why endpoint process/command-line logging is so valuable", "Identify one visibility gap in your lab and how you'd close it", "List the minimum log sources a small org should collect"],
 q: [["Which log sources are most important for detection?", "Authentication, endpoint/process (with command lines), web/proxy, firewall/network, DNS and cloud logs. Rich endpoint telemetry is often the single most valuable source because it captures what actually executed."],
     ["What is a visibility gap and why does it matter?", "A part of the environment that isn't logged or monitored. It matters because attacks there are invisible to the SOC, so identifying and closing gaps is a core defensive task."]],
 x: ["Assuming attacks are invisible when they're simply not being logged", "Collecting logs but with too little detail (e.g. no command lines)"],
 d: "You can map attacks to their log sources and identify a visibility gap in your lab.",
 min: 50
},
"w13-3": {
 m: "Scattered logs are useless. A SIEM brings them together so one analyst can watch everything.",
 e: "A SIEM (Security Information and Event Management) system collects logs from across the environment, parses and normalises them, and lets analysts search and correlate events, raising alerts when activity matches a rule. It's the SOC's primary workbench. You'll stand one up in your lab (Splunk free, Elastic or Wazuh are all approachable), point your VMs' logs at it, and get comfortable searching, because fluent searching is the core daily skill of a SOC analyst.",
 k: ["A SIEM collects, parses, normalises, correlates and alerts on logs", "Normalisation lets you query many sources with one language", "Correlation ties related events across sources into one picture", "Common choices: Splunk (free tier), Elastic Security, Wazuh (open source)", "Searching logs quickly and precisely is the SOC analyst's core skill"],
 t: ["Install a SIEM in your lab (Splunk free, Elastic or Wazuh)", "Forward logs from your Windows and Linux VMs into it", "Run searches: failed logons, new processes, network connections", "Correlate a multi-step action across two log sources", "Save a useful search you'd reuse during triage"],
 note: "Collect and analyse logs only from systems you own or are authorised to monitor.",
 q: [["What does a SIEM do?", "It centralises logs from many sources, parses and normalises them into a common format, lets analysts search and correlate events, and generates alerts when activity matches detection rules."],
     ["Why is log normalisation important?", "It maps fields from different sources into a consistent schema, so one query or rule can work across many log types instead of needing a different parser and syntax for each."]],
 x: ["Ingesting logs but never tuning parsing, so fields are unusable", "Analysing logs from systems you aren't authorised to monitor"],
 d: "You have a working lab SIEM ingesting logs from your VMs and can search and correlate them.",
 min: 55
},
"w13-4": {
 m: "Triage is the SOC's heartbeat: deciding, fast and correctly, what's an attack and what's noise.",
 e: "Most of a SOC analyst's day is triage: an alert fires, and you decide whether it's benign, suspicious or malicious, and what to do next. Good triage follows a repeatable process: understand what the alert means, gather context (who, what, when, from where), compare against normal, and make a call with evidence. You'll practise end-to-end triage on a SOC platform, learning to separate the many false positives from the few real threats, and to write a clear triage note that the next analyst can act on.",
 k: ["Triage: validate the alert, gather context, compare to baseline, decide and document", "False positives are the norm; the skill is finding the real threat efficiently", "Context questions: who, what, when, where-from, and is this expected?", "Escalate with evidence, not hunches; write notes the next analyst can use", "Alert fatigue is dangerous: too many alerts means real ones get missed"],
 t: ["Work several alerts on LetsDefend or a TryHackMe SOC room end to end", "For each, gather context and decide benign/suspicious/malicious with reasons", "Write a triage note (what, evidence, verdict, next step) for one alert", "Identify what made the false positives false", "Describe how you'd reduce alert fatigue for a noisy rule"],
 note: "Practise triage on training platforms or your own lab data only.",
 q: [["Walk me through triaging a security alert.", "Understand what the alert detects, gather context (user, host, time, source, process), compare to normal behaviour, determine whether it's benign, suspicious or malicious with supporting evidence, then document the verdict and escalate or close accordingly."],
     ["Why is alert fatigue a security risk?", "When analysts are flooded with low-value or false-positive alerts, genuine threats get overlooked or dismissed. Tuning detections to reduce noise is essential so real incidents aren't missed."]],
 x: ["Closing alerts without gathering context", "Escalating on a hunch with no evidence"],
 d: "You can triage alerts end to end and write a clear, evidence-based triage note.",
 min: 55
},
"w13-5": {
 m: "Endpoints are where attacks actually execute. Endpoint detection is the richest view a defender has.",
 e: "Endpoint telemetry, process creation, command lines, parent-child process trees, network connections, file and registry changes, captures attacks at the moment they run. Tools like Sysmon (free, on Windows) and EDR platforms generate exactly this data, and it's where modern detection shines: a Word document spawning PowerShell that connects out is obvious in endpoint data and invisible almost everywhere else. You'll enrich your lab with Sysmon and see your own earlier attacks light up.",
 k: ["Endpoint telemetry: process creation, command lines, process trees, network, file/registry", "Sysmon (free) massively improves Windows endpoint visibility", "EDR extends this with detection, response and correlation", "Suspicious patterns: unusual parent-child chains, living-off-the-land binaries, encoded commands", "This data is the backbone of detection engineering and threat hunting"],
 t: ["Install and configure Sysmon on your Windows VM (use a good config)", "Run an earlier attack and observe the Sysmon events it generates", "Identify the process tree and command line that reveal the attack", "Explain why endpoint data beats network data for seeing execution", "Forward Sysmon logs into your SIEM"],
 c: `# enrich YOUR OWN Windows VM with Sysmon, then review in the SIEM
# install Sysmon with a community config, then query process creation:
Get-WinEvent -LogName 'Microsoft-Windows-Sysmon/Operational' -MaxEvents 20 |
  Where-Object Id -eq 1 | Select-Object TimeCreated, Message   # Id 1 = process create`,
 note: "Deploy endpoint logging only on systems you own or are authorised to administer.",
 q: [["Why is endpoint telemetry so valuable for detection?", "It captures what actually executes, process creation, command lines, process ancestry, network and file activity, so it reveals attacks (like a document spawning a shell) that network or perimeter logs can't see."],
     ["What does Sysmon add to Windows logging?", "Detailed, configurable endpoint events, process creation with command lines and hashes, network connections, image loads and more, far richer than default logging, which greatly improves detection and hunting."]],
 x: ["Relying on default Windows logs that lack command lines", "Collecting endpoint data but not tuning the config to what matters"],
 d: "Your Windows VM produces rich endpoint telemetry (Sysmon) in your SIEM, and you can spot an attack in it.",
 min: 55
},
"w13-6": {
 m: "A SOC runs on process, not heroics. Playbooks turn knowledge into consistent, fast response.",
 e: "Mature SOCs document how to handle common alerts as playbooks: step-by-step procedures for triage and response, so every analyst handles a phishing report or a brute-force alert the same correct way. Alongside playbooks, SOCs track metrics (like time-to-detect and time-to-respond) to improve. Writing a playbook for an attack you understand deeply cements both the detection and the response, and it's a genuine artefact you'd produce on the job.",
 k: ["A playbook: the standard steps to triage and respond to a specific alert type", "Consistency and speed: every analyst handles the same alert correctly", "Metrics: MTTD (time to detect) and MTTR (time to respond) drive improvement", "Playbooks link to the IR lifecycle and to detections (ATT&CK techniques)", "Living documents: updated after each incident's lessons learned"],
 t: ["Pick one alert type (e.g. brute force or suspicious PowerShell) and write its playbook", "Include triage steps, decision points, containment and escalation", "Note the evidence to collect and where", "Define the metrics you'd track for this alert type", "Map the playbook to the ATT&CK technique it addresses"],
 q: [["What is a SOC playbook?", "A documented, repeatable procedure for triaging and responding to a specific type of alert or incident, ensuring analysts act consistently, correctly and quickly."],
     ["What do MTTD and MTTR measure?", "Mean Time To Detect (how long until an incident is noticed) and Mean Time To Respond (how long until it's contained/resolved). Lowering both is a core goal of SOC improvement."]],
 x: ["Relying on individual memory instead of documented playbooks", "Never updating playbooks after incidents"],
 d: "You've written a triage-and-response playbook for one alert type, mapped to an ATT&CK technique.",
 min: 50
},
"w13-p": {
 m: "Build a real detection pipeline: attack your lab, catch it in the SIEM, and prove it end to end.",
 e: "Your project is to stand up a working detection pipeline in your lab: logs from your Windows/Linux VMs (with Sysmon) flowing into a SIEM, then run several attacks from your Kali/AD work and detect each one, documenting the data source, the search, and a triage note. This is the core SOC capability, and doing it yourself, offence then defence, is the most convincing proof you can build and operate detection.",
 k: ["A SIEM ingesting rich logs (including Sysmon) from your lab VMs", "Several attacks run, then detected, with the search that found each", "A triage note per detection", "Everything on your own lab"],
 t: ["Confirm logs (auth, Sysmon, network) from all lab VMs reach the SIEM", "Run 3+ attacks (e.g. brute force, suspicious PowerShell, a Kerberoast)", "Find each in the SIEM and record the search and the revealing fields", "Write a triage note for each detection", "Summarise your pipeline and any visibility gaps you found"],
 note: "Run attacks and monitoring only within your own lab.",
 q: [["Describe a detection pipeline you've built.", "Lab endpoints and servers forward logs (including rich endpoint telemetry like Sysmon) to a SIEM; I run representative attacks, locate each in the SIEM with targeted searches, confirm the revealing fields, and document a triage note and any visibility gaps."],
     ["How do you validate that a detection works?", "Run the attack it's meant to catch and confirm the SIEM surfaces it with the expected fields; also test benign activity to ensure it doesn't fire falsely, tuning until it reliably distinguishes the two."]],
 x: ["Claiming detection without actually running the attack to validate it", "Ignoring visibility gaps the exercise reveals"],
 d: "You've built a lab detection pipeline and detected several of your own attacks, each with a search and triage note.",
 min: 120
},

/* ---------- Week 14: Detection engineering and threat hunting ---------- */
"w14-1": {
 m: "Reading alerts is Tier 1. Writing the detections, and hunting what has no alert, is where defenders get powerful.",
 e: "Detection engineering is the craft of building and maintaining the rules that turn telemetry into alerts. Threat hunting is the proactive sibling: assuming something slipped past the rules and searching for it. Together they move a SOC from reactive to proactive. This week you'll write detections for the very attacks you ran, tune them to avoid noise, and hunt for activity that no rule would catch, mapping everything to MITRE ATT&CK so you can measure and communicate your coverage.",
 k: ["Detection engineering: designing, writing, testing and tuning detection rules", "Threat hunting: hypothesis-driven searching for threats that evaded detection", "Detections map to ATT&CK techniques so coverage can be measured", "Detection-as-code: rules in version control, tested like software", "The goal: catch behaviour (hard to change) not just indicators (easy to change)"],
 t: ["Define detection engineering vs threat hunting in your own words", "Pick 3 techniques you performed and describe what behaviour each leaves", "Explain why detecting behaviour (TTPs) beats detecting indicators (hashes/IPs)", "Describe how you'd manage detections as code", "Map your planned detections to ATT&CK technique IDs"],
 q: [["What's the difference between detection engineering and threat hunting?", "Detection engineering builds and maintains automated rules that alert on known malicious behaviour; threat hunting proactively searches the data for threats that no rule caught, often generating new detections from what it finds."],
     ["Why detect behaviour (TTPs) rather than indicators?", "Indicators like hashes and IPs are trivial for attackers to change; behaviours and techniques are harder to alter, so detections built on TTPs are more durable (the Pyramid of Pain concept)."]],
 x: ["Only writing indicator-based rules that attackers easily evade", "Hunting with no hypothesis, just aimless searching"],
 d: "You can explain detection engineering and hunting and map your attacks to ATT&CK behaviours.",
 min: 50
},
"w14-2": {
 m: "A good detection is portable and precise. Sigma lets you write it once and run it anywhere.",
 e: "Sigma is a generic, YAML-based format for SIEM detection rules, think of it as the Snort/YARA equivalent for logs. You describe the suspicious log pattern once in Sigma, and it converts to Splunk, Elastic, and other query languages. Writing detections in Sigma makes them portable, shareable and reviewable. You'll write Sigma rules for attacks you performed, test them against your lab data, and learn the discipline of precise, well-documented detections.",
 k: ["Sigma is a vendor-neutral YAML format for log-based detections", "A rule describes the log source and the pattern (selection + condition)", "It converts to many SIEM query languages, so detections are portable", "Good rules include a title, description, ATT&CK tags, and false-positive notes", "Community Sigma repos are a library to learn from and contribute to"],
 t: ["Read a few existing Sigma rules to learn the structure", "Write a Sigma rule for an attack you ran (e.g. suspicious PowerShell or failed-logon burst)", "Include metadata: description, ATT&CK tag, level, false positives", "Convert/translate it to your SIEM's query and test it against your data", "Refine it until it catches the attack without obvious false positives"],
 c: `title: Many failed logons then a success from one source
description: Possible successful brute force
logsource: { product: windows, service: security }
detection:
  failed: { EventID: 4625 }
  success: { EventID: 4624 }
  condition: failed | count() by IpAddress > 10 and success
level: high
tags: [attack.credential_access, attack.t1110]`,
 q: [["What is Sigma and why use it?", "A generic, YAML-based rule format for SIEM detections. You write the rule once and convert it to different SIEM query languages, making detections portable, shareable, reviewable and version-controllable."],
     ["What metadata should a good detection rule include?", "A clear title and description, the log source, the detection logic, a severity level, mapped ATT&CK technique(s), and known false positives so analysts can triage alerts from it effectively."]],
 x: ["Writing rules with no false-positive notes or ATT&CK mapping", "Rules so broad they alert on normal activity"],
 d: "You've written and tested a Sigma detection for one of your attacks, with proper metadata.",
 min: 55
},
"w14-3": {
 m: "The hardest part of detection isn't catching attacks, it's not drowning in false alarms.",
 e: "A detection that fires on normal activity is worse than none: it trains analysts to ignore alerts. Tuning is the craft of making a rule fire on the attack and stay quiet otherwise, by adding context, excluding known-good behaviour, and setting sensible thresholds. You'll take a noisy rule and tune it, measuring true vs false positives, and learn to balance sensitivity (catching the attack) against precision (few false alarms). This is what separates a usable detection from a nuisance.",
 k: ["False positives cause alert fatigue, which causes missed real threats", "Tune by adding context, excluding known-good, and setting thresholds", "Trade-off: sensitivity (catch more) vs precision (fewer false alarms)", "Baseline normal behaviour so 'abnormal' is meaningful", "Document expected false positives so analysts can triage fast"],
 t: ["Take a rule that's too noisy in your lab and identify why it false-positives", "Tune it: add exclusions, context or a threshold", "Measure the before/after true vs false positives", "Explain the sensitivity vs precision trade-off you chose", "Document the remaining expected false positives"],
 q: [["How do you reduce false positives in a detection?", "Baseline normal activity, add context and exclusions for known-good behaviour, set sensible thresholds, and iterate while measuring true vs false positives, balancing catching the attack against not flooding analysts."],
     ["Why is a noisy detection sometimes worse than no detection?", "Because it causes alert fatigue: analysts start ignoring or auto-closing its alerts, so when a real one fires it's missed, and trust in the whole alerting system erodes."]],
 x: ["Chasing 100% detection at the cost of unusable noise", "Tuning by gut feel instead of measuring the effect"],
 d: "You've tuned a noisy detection and can justify the sensitivity/precision trade-off with before/after numbers.",
 min: 50
},
"w14-4": {
 m: "Assume they got in. Threat hunting is the discipline of looking before an alert ever fires.",
 e: "Threat hunting starts from a hypothesis, 'if an attacker were using technique X, I'd expect to see Y', and searches the data for it, rather than waiting for an alert. It's how defenders catch stealthy intrusions and discover gaps in their detections. You'll run a structured hunt in your lab: form a hypothesis based on an ATT&CK technique, search your telemetry, confirm or refute it, and turn anything you learn into a new detection. Hunting is where SOC analysts grow into senior defenders.",
 k: ["Hunting is hypothesis-driven, not alert-driven", "Base hypotheses on ATT&CK techniques relevant to your environment", "Search telemetry for the expected evidence; confirm or refute", "Findings become new detections (hunting feeds detection engineering)", "Even 'nothing found' is valuable: it reveals coverage and visibility"],
 t: ["Write a hunt hypothesis based on an ATT&CK technique", "Search your lab telemetry for the expected evidence", "Document the hunt: hypothesis, data, queries, result", "Turn any finding (or gap) into a new detection or visibility improvement", "Reflect on what the hunt told you about your coverage"],
 q: [["What is threat hunting and how does it start?", "Proactively searching data for threats that evaded detection, starting from a hypothesis, typically based on an ATT&CK technique, about what an attacker would be doing and what evidence it would leave, then searching for that evidence."],
     ["How does hunting improve a SOC over time?", "Hunts confirm or refute threats, reveal visibility and detection gaps, and turn findings into new automated detections, steadily moving the SOC from reactive to proactive."]],
 x: ["Hunting without a clear hypothesis", "Not converting hunt findings into lasting detections"],
 d: "You've run a documented, hypothesis-driven hunt in your lab and produced a new detection or visibility fix.",
 min: 55
},
"w14-5": {
 m: "A SOC without a map wanders. ATT&CK is the map that shows what you can, and can't, detect.",
 e: "MITRE ATT&CK lets a SOC measure itself: for each adversary technique, do we have a detection, a data source, both, or nothing? Building an ATT&CK coverage map turns a vague sense of security into a concrete picture of strengths and gaps, which drives where to invest next. It's also the shared language that lets your team, leadership and partners (including national CERTs) communicate precisely about threats. You'll map your lab's detections to ATT&CK and identify your top gaps.",
 k: ["ATT&CK coverage: per technique, do we detect it, have the data, or neither?", "The ATT&CK Navigator visualises coverage as a heatmap", "Gaps drive prioritisation: where to add telemetry or detections next", "ATT&CK is a shared language across teams, vendors and national CERTs", "Coverage is about meaningful detection, not just 'a rule exists'"],
 t: ["List the ATT&CK techniques your current detections cover", "Mark each as detected, data-only, or a gap", "Visualise it (even a simple table or the ATT&CK Navigator)", "Identify your top 3 gaps and what would close them", "Write how you'd present this coverage to a manager"],
 q: [["What is an ATT&CK coverage map?", "A mapping of your detections and data sources against MITRE ATT&CK techniques, showing which techniques you can detect, which you only have data for, and which are gaps, used to prioritise improvements."],
     ["Why is ATT&CK useful as a common language?", "It gives teams, vendors, leadership and national CERTs a precise, shared vocabulary for adversary behaviour, so detections, intelligence and gaps can be communicated and compared consistently."]],
 x: ["Counting 'a rule exists' as coverage without checking it actually detects", "Mapping everything and then not acting on the gaps"],
 d: "You have an ATT&CK coverage map of your lab detections with prioritised gaps.",
 min: 50
},
"w14-6": {
 m: "Detections are software. Treat them like code and your defence gets reliable and reviewable.",
 e: "Mature detection teams manage rules the way engineers manage software: in version control, with descriptions and tests, reviewed before deployment, and validated automatically. This 'detection-as-code' approach makes defence reproducible, auditable and continuously improving, exactly what large organisations and national infrastructure require. You'll organise your lab detections into a small repository with documentation and a test for each, building the professional habit that scales from a home lab to a national SOC.",
 k: ["Detection-as-code: rules in version control, documented, reviewed, tested", "Each rule: purpose, data source, ATT&CK mapping, test, and known false positives", "Testing: prove the rule fires on the attack and not on benign activity", "Review and change history make detection auditable and improvable", "This scales from a lab to enterprise and national-scale SOCs"],
 t: ["Put your Sigma/SIEM detections into a small git repo", "Document each rule (purpose, source, ATT&CK, false positives)", "Write a simple test (the input that should and shouldn't fire it)", "Explain how review would catch a bad rule before deployment", "Reflect on how this scales to a large organisation"],
 q: [["What is detection-as-code?", "Managing detection rules like software: stored in version control, documented, peer-reviewed, and automatically tested so changes are auditable, reproducible and reliable at scale."],
     ["How do you test a detection rule?", "Provide data representing the attack and confirm the rule fires, and provide benign data and confirm it doesn't, so you validate both sensitivity (catches the attack) and precision (no false alarms) before deployment."]],
 x: ["Editing live rules with no history or review", "Deploying rules without testing both the attack and benign cases"],
 d: "Your detections live in a documented, tested repository, managed as code.",
 min: 45
},
"w14-p": {
 m: "Become a detection engineer: take real attacks, write tested detections, and prove your coverage.",
 e: "Your project: pick several attacks you ran in earlier phases, write a detection for each (ideally in Sigma, tested against your lab data), tune them to avoid false positives, map them to MITRE ATT&CK with a coverage note, and organise them as detection-as-code. This is exactly the deliverable of a detection engineer, and a strong, specialised portfolio piece pointing straight at defensive and national-security SOC roles.",
 k: ["Several tested detections for attacks you performed", "Each tuned, documented, and mapped to ATT&CK", "An ATT&CK coverage note with remaining gaps", "Organised as detection-as-code in a repo"],
 t: ["Choose 3–5 attacks you ran and write a detection for each", "Test each against your lab (fires on attack, quiet on benign)", "Tune to reduce false positives and document them", "Map all detections to ATT&CK and note the coverage and gaps", "Publish them as a documented detection-as-code repo"],
 note: "Generate attacks and detections only within your own lab.",
 q: [["Walk me through building a detection from an attack.", "Run the attack and study the telemetry it produces, identify the distinguishing behaviour, write a rule (e.g. in Sigma) with metadata and ATT&CK mapping, test that it fires on the attack and not on benign activity, tune it, and manage it as code with tests and review."],
     ["How do you communicate detection coverage to leadership?", "With an ATT&CK-based coverage map showing which techniques are detected, which have data only, and which are gaps, plus a prioritised plan and the business risk of the top gaps, in plain language."]],
 x: ["Untested rules that may not actually fire", "No ATT&CK mapping, so coverage can't be shown"],
 d: "You've produced a tested, ATT&CK-mapped set of detections for your own attacks, managed as code.",
 min: 120
}
};
