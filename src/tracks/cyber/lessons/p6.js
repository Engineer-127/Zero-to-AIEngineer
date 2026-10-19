/* Cyber Phase 6: Defensive Security & Blue Team (Week 11)
   Most security jobs are defensive. Detect and respond to the attacks you learned to run. */
export default {

/* ---------- Week 11: Blue team - detection and response ---------- */
"w11-1": {
 m: "Most cybersecurity jobs are defensive. The blue team is where the roles, and the hiring, actually are.",
 e: "Red team (offence) gets the attention, but the majority of security work is blue team: defending, detecting and responding. A Security Operations Centre (SOC) is where analysts monitor for threats, triage alerts, investigate suspicious activity and escalate real incidents. Having learned how attacks work, you're now perfectly placed to detect them, which is exactly what makes attack knowledge valuable defensively. This phase, and roles like SOC Analyst, is where many careers start.",
 k: ["Red team = offence; blue team = defence, detection and response (most jobs)", "A SOC monitors, triages alerts, investigates and escalates incidents", "SOC tiers: Tier 1 triage, Tier 2 investigation, Tier 3 threat hunting/IR", "Knowing attacks makes you better at detecting them", "SOC Analyst is a common, accessible entry-level security role"],
 t: ["Write what a SOC does and the difference between red and blue team", "Describe the responsibilities at each SOC tier", "Explain why offensive knowledge helps a defender", "Look up a SOC Analyst job description and list the skills it wants", "Start the TryHackMe SOC Level 1 path's intro room"],
 q: [["What is a SOC and what do its analysts do?", "A Security Operations Centre is the team and facility that monitors an organisation's environment for threats, triaging alerts, investigating suspicious activity, and escalating and responding to genuine incidents, often organised in tiers from triage to threat hunting."],
     ["Why is understanding offensive techniques useful for defence?", "Because detecting and stopping an attack requires knowing how it works, what it looks like in logs and on hosts, so offensive knowledge directly improves detection, alerting and response."]],
 x: ["Assuming offence is the only 'real' security work", "Overlooking that most hiring is for defensive roles"],
 d: "You can describe what a SOC does and why your offensive knowledge helps you defend.",
 min: 45
},
"w11-2": {
 m: "Attacks leave traces in logs. Learning to read them is the core blue-team skill.",
 e: "Nearly everything a system does is logged somewhere: authentication logs (who logged in, and failed attempts), web server logs (every request), firewall logs (connections), and system logs (service activity). The attacks you practised, scanning, brute force, exploitation, all leave characteristic footprints in these logs. Learning where logs live and how to read them is the foundation of detection: you can't catch what you can't see. Today you read real logs from your own lab activity.",
 k: ["Key logs: auth (logins/failures), web access, firewall, system/service", "Linux logs often in /var/log; Windows in the Event Log", "Attacks leave patterns: many failed logins, scan traffic, unusual requests", "Centralising logs (a log server/SIEM) is how organisations watch everything", "You can only detect what you actually log and review"],
 t: ["Find and read the auth log on your lab machine after a login", "Generate failed logins and spot the pattern in the log", "Read a web server's access log and identify request patterns", "Correlate a scan you ran earlier with what appears in the target's logs", "List which log would reveal each attack you've practised"],
 c: `# reading logs on YOUR OWN lab machine
tail -f /var/log/auth.log                 # watch logins and failures live
grep "Failed password" /var/log/auth.log  # brute-force attempts
cat /var/log/apache2/access.log | grep "404" | wc -l   # scanning often spikes 404s`,
 note: "Review logs only on systems you own or are authorised to monitor.",
 q: [["Which logs would show a brute-force login attempt?", "Authentication logs (e.g. /var/log/auth.log on Linux or the Security event log on Windows), which record repeated failed login attempts from a source in a short time."],
     ["Why do organisations centralise their logs?", "So activity across many systems can be collected, correlated and searched in one place (a SIEM), enabling detection of attacks that span multiple hosts and preserving logs even if a host is compromised."]],
 x: ["Not knowing where logs live on each system", "Assuming an attack is invisible when it's clearly logged"],
 d: "You can locate and read key logs and match the attacks you ran to their log traces.",
 min: 50
},
"w11-3": {
 m: "MITRE ATT&CK gives defenders and attackers a shared language. It's the map the whole industry uses.",
 e: "MITRE ATT&CK is a freely available knowledge base of real adversary tactics (the goals: initial access, persistence, exfiltration) and techniques (how they achieve them). Defenders use it to describe what they can and can't detect, map their monitoring to real behaviour, and find gaps. Because it's a common language, understanding ATT&CK lets you communicate precisely with any security team. You'll map the attacks you practised to ATT&CK techniques and see their suggested detections.",
 k: ["ATT&CK tactics = attacker goals; techniques = how they're achieved", "It's based on observed, real-world adversary behaviour", "Defenders map detections/controls to ATT&CK to find coverage gaps", "It's a shared language across red, blue and threat-intel teams", "Each technique lists detection and mitigation guidance"],
 t: ["Browse the ATT&CK matrix and note the tactic columns", "Map 5 attacks you practised to their ATT&CK techniques", "For each, read ATT&CK's detection and mitigation suggestions", "Explain how a defender would use ATT&CK to find gaps", "Add ATT&CK technique IDs to your attack notes"],
 q: [["What's the difference between a tactic and a technique in MITRE ATT&CK?", "A tactic is the attacker's goal or objective (like persistence or exfiltration); a technique is a specific method used to achieve that goal. Techniques are grouped under the tactics they serve."],
     ["How do defenders use ATT&CK?", "To describe adversary behaviour in a common language, map their detections and controls to real techniques, measure coverage, find and prioritise gaps, and drive threat hunting and detection engineering."]],
 x: ["Treating ATT&CK as a checklist rather than a mapping tool", "Confusing tactics (goals) with techniques (methods)"],
 d: "You can map attacks you've run to ATT&CK techniques and explain how defenders use the framework.",
 min: 50
},
"w11-4": {
 m: "A SIEM collects the logs and lets you write the rule that catches the attack. This is detection engineering.",
 e: "A SIEM (Security Information and Event Management) system gathers logs from across an environment, lets analysts search them, and raises alerts when activity matches a detection rule. Writing a good rule, say, 'alert on 10 failed logins then a success from one IP', is detection engineering, a core and growing skill. You'll practise the idea in a lab SIEM or a SOC training platform: run an attack, find it in the logs, and write a detection that would have caught it. This closes the loop between offence and defence.",
 k: ["A SIEM centralises logs, enables search, and alerts on detection rules", "Detection rule: a pattern of activity that indicates an attack", "Reduce false positives: too many alerts and real ones get missed", "Map detections to ATT&CK techniques for coverage", "Examples: SIEMs like the ELK stack, Splunk, Wazuh (many have free/community options)"],
 t: ["Use a lab SIEM or a SOC training platform (LetsDefend/TryHackMe SOC)", "Ingest logs from your lab and search them", "Run an attack (e.g. brute force) and find it in the SIEM", "Write a detection rule that would alert on that attack", "Note how you'd tune it to reduce false positives"],
 note: "Ingest and analyse logs only from systems you own or are authorised to monitor, or from the sample data a training platform provides.",
 q: [["What is a SIEM?", "Security Information and Event Management: a system that centralises logs from across an environment, lets analysts search and correlate them, and generates alerts when activity matches detection rules."],
     ["What makes a good detection rule?", "It reliably catches the malicious behaviour (true positives) while minimising false positives, is mapped to a real technique, and is tuned so analysts aren't overwhelmed, because alert fatigue causes real incidents to be missed."]],
 x: ["Writing rules so broad they drown analysts in false positives", "Analysing logs from systems you aren't authorised to monitor"],
 d: "You've run an attack, found it in a SIEM, and written a detection rule that would catch it.",
 min: 55
},
"w11-5": {
 m: "When an attack succeeds, a calm, practised process limits the damage. That process is incident response.",
 e: "Incident response (IR) is the structured way organisations handle a breach. The widely used NIST lifecycle is: preparation, detection and analysis, containment, eradication and recovery, and post-incident (lessons learned). The goal is to stop the bleeding, remove the attacker, restore operations, and learn, calmly and in order, rather than panicking. You'll learn the phases and practise writing a short incident report for an attack you detected, which is exactly what a SOC analyst produces.",
 k: ["NIST IR lifecycle: prepare, detect & analyse, contain, eradicate & recover, post-incident", "Containment stops the spread before you clean up", "Eradication removes the attacker's access and artefacts; recovery restores service", "Post-incident review turns an incident into lessons and better defences", "An incident report documents what happened, impact, response and improvements"],
 t: ["Write out the NIST IR phases and what each accomplishes", "Explain why containment comes before eradication", "For an attack you detected, outline the response at each phase", "Draft a short incident report (summary, timeline, impact, actions, lessons)", "Note what 'preparation' includes (plans, logging, backups, contacts)"],
 q: [["What are the phases of the NIST incident response lifecycle?", "Preparation; detection and analysis; containment, eradication and recovery; and post-incident activity (lessons learned). The cycle feeds back so each incident improves preparation."],
     ["Why contain an incident before eradicating it?", "Containment stops the attacker spreading or causing more damage while you investigate; trying to eradicate first can tip off the attacker, lose evidence, or let the compromise widen before it's controlled."]],
 x: ["Jumping to eradication without containment or evidence preservation", "Skipping the lessons-learned step that prevents repeat incidents"],
 d: "You can describe the IR lifecycle and write a short incident report for a detected attack.",
 min: 50
},
"w11-6": {
 m: "The best incident is the one that never happens. Hardening and defence in depth prevent most attacks outright.",
 e: "Detection and response matter, but prevention matters more. Defence in depth layers controls so no single failure is fatal: patching (closing known holes), MFA (defeating password attacks), network segmentation (limiting spread), least privilege (limiting damage), backups (surviving ransomware), and secure configuration (removing weaknesses). Reviewing everything you've learned to attack, you'll see that this short list of fundamentals would have prevented or blunted most of it. That's the core message of the whole track.",
 k: ["Defence in depth: multiple independent layers of control", "Patching closes known vulnerabilities before they're exploited", "MFA defeats the majority of credential attacks", "Segmentation limits lateral movement; least privilege limits damage", "Backups (tested, offline) are the key defence against ransomware"],
 t: ["Write a defence-in-depth checklist from everything you've learned", "For each major attack in this course, note the control that prevents it", "Explain why backups are critical and why they must be tested", "Describe how segmentation and least privilege limit a breach", "Summarise the 6 fundamentals that stop most attacks"],
 q: [["What is defence in depth?", "Layering multiple independent security controls so that if one fails, others still protect the asset, rather than relying on a single barrier."],
     ["Name the fundamentals that prevent or limit most attacks.", "Patching, MFA, network segmentation, least privilege, secure configuration/hardening, tested backups, logging and monitoring, and user awareness. Together they prevent, limit and detect the majority of real-world attacks."]],
 x: ["Focusing on fancy tools while neglecting patching, MFA and backups", "Having backups but never testing that they restore"],
 d: "You can produce a defence-in-depth checklist and map each major attack to its preventive control.",
 min: 45
},
"w11-p": {
 m: "Close the loop: run an attack, catch it, and write the incident report, playing both sides.",
 e: "Your project is to run one of your lab attacks, then switch to defender: detect it from the logs or your lab SIEM, and write a short incident report mapped to MITRE ATT&CK, covering what happened, how you detected it, the impact, and the response and prevention. Playing both red and blue on your own lab cements the most valuable insight in security: offence and defence are two views of the same system.",
 k: ["Run an attack on your lab, then detect and respond to it", "Detection from logs or a lab SIEM", "Incident report mapped to ATT&CK, with response and prevention", "Demonstrates the full offence-to-defence loop on an authorised target"],
 t: ["Run a clear attack (e.g. brute force or an exploit) on your lab target", "Detect it from the logs or your SIEM and note the indicators", "Map the activity to ATT&CK techniques", "Write an incident report: summary, timeline, detection, impact, response, prevention", "List the controls that would have prevented or caught it earlier"],
 note: "Run the attack and all monitoring only on your own lab, which you own and control.",
 q: [["Walk me through detecting and responding to an attack you simulated.", "Run the attack, identify its indicators in logs or the SIEM, map the behaviour to ATT&CK techniques, then follow the IR lifecycle: analyse, contain, eradicate and recover, and document it in an incident report with prevention recommendations."],
     ["Why is practising both attack and defence valuable?", "It shows that detection and response depend on understanding attacks, and reveals exactly which controls and log sources catch each technique, making you more effective on either side."]],
 x: ["Only doing the attack and skipping detection/response", "An incident report with no prevention recommendations"],
 d: "You've run an attack on your lab, detected it, and written an ATT&CK-mapped incident report with prevention steps.",
 min: 120
}
};
