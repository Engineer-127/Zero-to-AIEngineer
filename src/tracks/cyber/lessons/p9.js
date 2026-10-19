/* Cyber Phase 9: Threat Intelligence & Network Defense (Weeks 17-18)
   Know your adversaries, and watch the wire at scale. Legal, open-source intel only. */
export default {

/* ---------- Week 17: Cyber threat intelligence ---------- */
"w17-1": {
 m: "Defending blind is exhausting. Threat intelligence tells you who's coming, how, and what to watch for.",
 e: "Cyber threat intelligence (CTI) is knowledge about adversaries, their motives, methods and infrastructure, turned into decisions and defences. It comes in three levels: strategic (big-picture risk for leadership), operational (campaigns and who's targeting your sector), and tactical (specific IOCs and techniques for the SOC). Good intelligence focuses defence where it matters instead of guarding everything equally. For national-security work especially, understanding adversaries is central, so you'll learn to produce and use intel from legal, open sources.",
 k: ["CTI = evidence-based knowledge about threats that drives decisions", "Strategic (leadership), operational (campaigns/sectors), tactical (IOCs/TTPs)", "Intelligence must be actionable: it should change a decision or a detection", "The intelligence cycle: direction, collection, analysis, dissemination, feedback", "Use only legal, open or authorised sources, and respect privacy and law"],
 t: ["Define the three levels of threat intelligence with an example of each", "Explain the intelligence cycle in your own words", "Describe how tactical intel feeds a SOC's detections", "Note why intel must be actionable to be worth producing", "List legal, open sources of threat intelligence"],
 note: "Gather intelligence only from legal, open, or authorised sources. Do not collect private data on individuals or probe systems to 'gather intel'.",
 q: [["What are the three levels of threat intelligence?", "Strategic (high-level risk and trends for decision-makers), operational (adversary campaigns and who's targeting a sector), and tactical (specific IOCs and techniques the SOC can act on immediately)."],
     ["What makes threat intelligence actionable?", "It must inform a specific decision or defensive action, like a new detection, a patch priority or a leadership risk decision, rather than being interesting but unusable."]],
 x: ["Collecting intel that never changes a decision or detection", "Sourcing 'intel' through illegal access or private-data collection"],
 d: "You can explain the levels and cycle of threat intelligence and what makes it actionable.",
 min: 50
},
"w17-2": {
 m: "Not all indicators are equal. The Pyramid of Pain shows which ones actually hurt an attacker.",
 e: "Intelligence distinguishes IOCs (atomic indicators: hashes, IPs, domains) from TTPs (Tactics, Techniques and Procedures: how an adversary operates). The Pyramid of Pain ranks these by how much it costs an attacker when you detect on them: blocking a hash is trivial for them to bypass, but detecting their techniques forces them to change how they work. Mature defence and intel therefore prioritise TTPs, mapped to MITRE ATT&CK, over throwaway indicators. This idea shapes everything from detection to intel sharing.",
 k: ["IOCs: atomic artefacts (hashes, IPs, domains). TTPs: how the adversary operates", "Pyramid of Pain: hashes (easy to change) up to TTPs (costly to change)", "Detecting on TTPs forces attackers to retool, which is expensive for them", "Map TTPs to MITRE ATT&CK for a shared, durable language", "Prioritise durable intel (behaviour) over perishable intel (indicators)"],
 t: ["Draw the Pyramid of Pain and label each level's cost to the attacker", "Give an example IOC and an example TTP for the same threat", "Explain why TTP-based detection is more durable", "Map a threat's TTPs to ATT&CK technique IDs", "Describe how you'd prioritise indicators by durability"],
 q: [["What is the Pyramid of Pain?", "A model ranking indicator types by how much pain detecting on them causes an attacker, from trivial (hashes, IPs) to very costly (tools and TTPs). It argues for prioritising detection of behaviours over easily changed atomic indicators."],
     ["What's the difference between IOCs and TTPs?", "IOCs are specific observable artefacts (hashes, IPs, domains) that are easy to change; TTPs describe how an adversary operates (tactics, techniques, procedures), which is harder to change and therefore more valuable to detect."]],
 x: ["Building defence only on perishable atomic indicators", "Ignoring ATT&CK mapping that makes TTP intel shareable"],
 d: "You can apply the Pyramid of Pain and prioritise TTP-based intelligence mapped to ATT&CK.",
 min: 50
},
"w17-3": {
 m: "Behind attacks are actors with patterns. Tracking them, carefully, lets defenders anticipate instead of react.",
 e: "Threat actors (criminal groups, hacktivists, state-linked campaigns) have recognisable patterns of techniques, targets and infrastructure. Intelligence teams track these as 'threat actors' or 'campaigns', using ATT&CK to describe their behaviour. Attribution, naming who is behind an attack, is genuinely hard and often uncertain, so professionals express confidence carefully and avoid overclaiming. You'll study how actors are tracked (from public reporting only) and why anticipating a known actor's playbook is powerful for defence.",
 k: ["Actors/campaigns have consistent TTPs, targets and infrastructure patterns", "ATT&CK groups document publicly reported actor behaviours", "Attribution is hard and uncertain; state confidence, avoid overclaiming", "Knowing a relevant actor's playbook lets you pre-position defences", "Use only public, legal reporting, and be careful and ethical"],
 t: ["Read a public ATT&CK 'Group' profile and note its common techniques", "Explain why attribution is difficult and often uncertain", "Describe how knowing an actor's TTPs helps a defender prepare", "Note the ethical and accuracy risks of overclaiming attribution", "Pick an actor relevant to a sector and list defences against its top TTPs"],
 note: "Study actors only through public, legal reporting. Do not attempt to investigate or contact real threat actors or access their infrastructure.",
 q: [["Why is attribution difficult in cyber?", "Attackers use shared tools, borrowed infrastructure, false flags and others' techniques, so evidence is ambiguous. Responsible analysts express attribution with explicit confidence levels rather than certainty."],
     ["How does knowing a threat actor's TTPs help defenders?", "If an actor is likely to target your sector, you can pre-position detections and defences for the specific techniques they favour, anticipating their playbook instead of reacting after the fact."]],
 x: ["Treating attribution as certain", "Attempting to 'investigate' real actors beyond public reporting"],
 d: "You can describe how actors are tracked via TTPs and why attribution demands caution.",
 min: 50
},
"w17-4": {
 m: "Intel at scale needs a system. Platforms like MISP and OpenCTI store, structure and share what you know.",
 e: "Threat-intelligence platforms (TIPs) like MISP and OpenCTI store indicators and relationships, structure them (often with standards like STIX), and let teams share intelligence, with communities and national CERTs. Feeds like AlienVault OTX provide community indicators. A TIP turns scattered notes into queryable, shareable intelligence that can feed detections automatically. You'll explore a TIP's concepts and see how structured intel flows from analysis to the SOC and out to partners.",
 k: ["TIPs (MISP, OpenCTI) store, structure and share indicators and relationships", "STIX/TAXII are common standards for representing and transporting intel", "Feeds (e.g. OTX) supply community indicators to enrich your data", "A TIP can push intel into SIEM detections automatically", "Sharing (with CERTs/communities) multiplies everyone's defence"],
 t: ["Explore MISP or OpenCTI concepts (events, attributes, relationships)", "Explain what STIX and TAXII are for", "Describe how a TIP feeds detections into a SIEM", "Look at an open feed (e.g. OTX) and the indicators it provides", "Note how sharing intel with CERTs strengthens collective defence"],
 q: [["What is a threat-intelligence platform?", "A system like MISP or OpenCTI that stores, structures and correlates threat indicators and relationships, often using standards like STIX, and enables sharing with communities and feeding intel into detection tools."],
     ["What are STIX and TAXII?", "STIX is a standardised format for representing threat intelligence (indicators, actors, relationships); TAXII is a protocol for transporting it between parties, enabling automated, interoperable intel sharing."]],
 x: ["Hoarding intel instead of sharing within legal/community norms", "Treating a TIP as a database dump rather than structured, related intel"],
 d: "You can explain how a threat-intelligence platform structures, shares and operationalises intel.",
 min: 50
},
"w17-5": {
 m: "Raw intel is trivia until it changes a detection or a priority. Operationalising is where it earns its keep.",
 e: "The real value of intelligence is when it drives action: new detections for an actor's TTPs, patch priorities based on actively exploited vulnerabilities, blocking known-bad infrastructure, and briefing leadership on relevant risk. You'll practise taking a piece of intel and turning it into concrete outputs for different audiences: a SOC detection, a prioritised action, and a one-line risk statement for a manager. This closes the loop from knowing to doing, the mark of a useful intel function.",
 k: ["Operationalise intel: detections, patch priorities, blocks, leadership briefings", "Match the output to the audience (tactical for SOC, strategic for leaders)", "Prioritise by relevance to your sector and active exploitation", "Feed TTPs into detection engineering; feed IOCs into blocking/enrichment", "Measure value by decisions and detections changed"],
 t: ["Take one intel item and write a SOC detection it would drive", "Write a patch/action priority it would change", "Write a one-line strategic risk statement for leadership from it", "Explain how you'd decide if the intel is relevant to your org", "Note how you'd measure the intel function's value"],
 q: [["How do you operationalise threat intelligence?", "Turn it into actions matched to the audience: tactical detections and blocks for the SOC, patch and control priorities for operations, and concise risk statements for leadership, prioritised by relevance and active exploitation."],
     ["How do you judge whether intelligence is relevant to your organisation?", "Assess whether the actor/technique targets your sector, geography and technology stack, and whether it's actively exploited, so you focus effort on threats that realistically apply to you."]],
 x: ["Collecting intel that never changes a detection or decision", "Sending tactical indicator dumps to executives"],
 d: "You can turn a piece of intelligence into a detection, a priority and a leadership risk statement.",
 min: 45
},
"w17-6": {
 m: "A threat profile is intel made useful: who, how, and exactly what we'll do about it.",
 e: "A threat profile pulls everything together for one actor or threat relevant to your context: its goals, its TTPs (mapped to ATT&CK), its typical indicators, and, crucially, the detections and defences you'll put in place. Built only from public reporting, it's a genuine CTI deliverable and a strong portfolio piece. You'll assemble one and tie each TTP to a concrete detection, demonstrating the whole intel-to-defence chain.",
 k: ["A threat profile: goals, TTPs (ATT&CK-mapped), indicators, and defences", "Built from public, legal reporting only", "Every TTP tied to a concrete detection or control", "Written for both analysts and decision-makers", "A reusable, updatable intelligence product"],
 t: ["Choose a publicly documented actor/threat relevant to a sector", "Summarise its goals and map its TTPs to ATT&CK", "List its typical indicators and their durability", "For each key TTP, write a detection or control", "Assemble a concise threat profile document"],
 note: "Build the profile from public reporting only. Do not probe, contact or investigate real actors or their infrastructure.",
 q: [["What goes into a threat profile?", "The actor's or threat's objectives, its TTPs mapped to ATT&CK, its typical indicators, and the concrete detections and defences to counter it, built from public reporting and written for both technical and leadership audiences."],
     ["Why tie each TTP to a detection?", "So the profile is actionable: it doesn't just describe the threat but specifies how you'll detect or prevent each technique, turning intelligence directly into defence."]],
 x: ["A profile that describes the threat but prescribes no defences", "Using non-public or illegally obtained information"],
 d: "You've built a public-source threat profile mapping TTPs to ATT&CK with a detection for each.",
 min: 50
},
"w17-p": {
 m: "Produce real intelligence: a threat profile that any SOC could act on tomorrow.",
 e: "Your project is a complete threat-intelligence profile of a publicly documented adversary or threat, built entirely from open sources: goals, TTPs mapped to ATT&CK, indicators classified by durability, and a detection or control for each key technique, plus a short strategic summary. It demonstrates the full CTI workflow and points toward threat-intel and national-CERT analyst roles.",
 k: ["A public-source threat profile for a relevant actor/threat", "TTPs mapped to ATT&CK; indicators classified by durability", "A detection or control per key TTP", "A strategic summary for leadership"],
 t: ["Select a publicly reported actor/threat relevant to a sector you care about", "Research it from open sources and map TTPs to ATT&CK", "Classify its indicators by durability (Pyramid of Pain)", "Write detections/controls for the key TTPs", "Produce the profile with a strategic summary and publish it"],
 note: "Use only public, legal sources; never probe or contact real actors.",
 q: [["Walk me through producing a threat profile.", "Set the requirement (which threat and why it's relevant), collect from open sources, analyse and map TTPs to ATT&CK, classify indicators by durability, derive detections and controls, and disseminate a profile with a strategic summary, all from legal public sources."],
     ["Why is threat intelligence important for national security?", "Because defending critical infrastructure and government networks requires anticipating capable, persistent adversaries; good intelligence focuses limited defensive resources on the most relevant threats and techniques."]],
 x: ["A profile with no actionable detections", "Any use of non-public or illegally gathered information"],
 d: "You've produced an open-source threat profile with ATT&CK-mapped TTPs and a detection per technique.",
 min: 120
},

/* ---------- Week 18: Network security monitoring and defense ---------- */
"w18-1": {
 m: "The network sees everything that moves. Monitoring it well is how you defend infrastructure at scale.",
 e: "Network Security Monitoring (NSM) is watching network traffic to detect and investigate threats. Where endpoint telemetry shows what ran on a host, the network shows what moved between hosts, out to the internet, and across segments, which is vital for catching lateral movement, C2 and exfiltration. NSM combines full packet capture, flow records, and alerts. For defending large organisations and national infrastructure, network visibility is indispensable, because you can't put an agent on everything.",
 k: ["NSM watches traffic to detect, investigate and respond to threats", "Three data types: full packet capture (PCAP), flow/connection logs, and alerts", "Network view catches lateral movement, C2 and exfiltration between hosts", "Complements endpoint telemetry; neither alone is enough", "Essential where you can't install agents (IoT, OT, unmanaged devices)"],
 t: ["Define the three NSM data types and what each is good for", "Explain what network data reveals that endpoint data can't", "Describe how C2 and exfiltration look in network data", "Note why NSM matters for devices you can't put agents on", "Sketch where you'd place sensors in a simple network"],
 q: [["What are the main data types in network security monitoring?", "Full packet capture (complete traffic for deep analysis), flow/connection records (metadata about who talked to whom), and alerts from signatures/analytics. Together they give breadth and depth of network visibility."],
     ["Why is network monitoring essential even with good endpoint telemetry?", "Because not every device can run an agent (IoT, OT, unmanaged systems), and the network reveals cross-host behaviour, lateral movement, C2 and exfiltration, that endpoint data on a single host can't show."]],
 x: ["Relying only on endpoints and missing cross-host activity", "Capturing everything with no plan to analyse it"],
 d: "You can explain NSM, its data types, and what network visibility adds to endpoint telemetry.",
 min: 50
},
"w18-2": {
 m: "An IDS turns known-bad patterns into alerts. Suricata is the open-source engine that does it at scale.",
 e: "An Intrusion Detection/Prevention System (IDS/IPS) inspects traffic against signatures and rules, alerting (IDS) or blocking (IPS) on matches. Suricata is a powerful open-source engine used widely, including in large and government environments. You'll run Suricata in your lab, feed it traffic from your Kali attacks, and watch rules fire, learning how signature-based detection works, where it shines (known threats) and where it's blind (novel behaviour), which motivates combining it with behavioural monitoring.",
 k: ["IDS alerts on matches; IPS can block inline", "Suricata matches traffic against rulesets (signatures)", "Signatures catch known threats well but miss novel behaviour", "Rules describe the pattern, action, and metadata (including ATT&CK refs)", "Combine signatures with behavioural analytics for coverage"],
 t: ["Install Suricata in your lab with a community ruleset", "Generate attack traffic from Kali against a lab target", "Watch which rules fire and read the alerts", "Explain a signature's structure (action, header, options)", "Note what signature-based detection would miss and why"],
 c: `# Suricata on YOUR OWN lab network
# run against a monitored interface, then generate attack traffic from Kali
suricata -i eth0 -c /etc/suricata/suricata.yaml
tail -f /var/log/suricata/fast.log     # watch alerts fire
# a rule's shape: action proto src -> dst (msg; content; sid; metadata)`,
 note: "Run IDS/IPS and generate test traffic only on your own lab network.",
 q: [["What's the difference between an IDS and an IPS?", "An IDS (intrusion detection system) monitors traffic and alerts on matches; an IPS (intrusion prevention system) sits inline and can block the traffic. IPS adds prevention but risks blocking legitimate traffic on false positives."],
     ["What are the limits of signature-based detection?", "It only catches known patterns, so novel or obfuscated attacks with no signature slip through. It's best combined with behavioural/anomaly analytics and rich logging."]],
 x: ["Relying on signatures alone against novel threats", "Running an IPS inline without tuning and blocking good traffic"],
 d: "You can run Suricata on lab traffic, read its alerts, and explain signature detection's strengths and limits.",
 min: 55
},
"w18-3": {
 m: "Zeek doesn't just alert, it turns raw traffic into a rich logbook you can hunt through for anything.",
 e: "Zeek (formerly Bro) is a network analysis framework that transforms traffic into detailed, structured logs, connections, DNS queries, HTTP requests, TLS certificates, files seen, rather than just firing signatures. This makes it a goldmine for threat hunting and investigation: you can ask questions of past traffic that no signature anticipated. You'll run Zeek on lab traffic and explore its logs, seeing how behavioural, log-centric monitoring complements signature-based IDS.",
 k: ["Zeek produces rich, structured logs from traffic (conn, dns, http, ssl, files)", "It enables hunting and investigation, not just signature alerts", "You can ask retrospective questions no signature anticipated", "Zeek scripts can add custom detections and analytics", "Zeek + Suricata together: behaviour logs plus signatures"],
 t: ["Run Zeek against a lab PCAP or live lab traffic", "Explore the conn, dns and http logs it produces", "Find an attack you ran in Zeek's logs (e.g. the connection or DNS it made)", "Explain how Zeek's logs enable hunting that signatures can't", "Note how Zeek and Suricata complement each other"],
 c: `# Zeek on YOUR OWN lab traffic or a lab PCAP
zeek -r capture.pcap            # generates conn.log, dns.log, http.log, ssl.log...
cat conn.log | zeek-cut id.orig_h id.resp_h id.resp_p service duration`,
 note: "Analyse only traffic from your own lab or authorised captures.",
 q: [["How does Zeek differ from a signature-based IDS?", "Zeek turns traffic into rich, structured logs of what happened (connections, DNS, HTTP, TLS, files) rather than only alerting on known-bad signatures, enabling retrospective hunting and investigation across all traffic."],
     ["Why run both Zeek and Suricata?", "Suricata provides signature-based alerts on known threats, while Zeek provides behavioural, log-centric visibility for hunting and investigation; together they cover both known and unknown activity."]],
 x: ["Treating Zeek as just another alerter instead of a logging/hunting tool", "Ignoring the richness of its protocol logs"],
 d: "You can run Zeek, read its logs, and explain how log-centric monitoring complements signatures.",
 min: 50
},
"w18-4": {
 m: "Security Onion bundles the whole monitoring stack into one platform, so you can defend like a real SOC.",
 e: "Security Onion is a free, all-in-one Linux distribution for network security monitoring and log management: it packages Suricata, Zeek, a SIEM-like interface, and hunting tools together. It's used by real SOCs and in training, and it lets you run a credible monitoring stack in your lab. You'll deploy it, feed it lab traffic, and investigate attacks across its combined data, experiencing how a defender pivots from an alert to packets to logs in one place.",
 k: ["Security Onion bundles Suricata, Zeek, log management and hunting UI", "One platform to go from alert to flow to packet to logs", "Used in real SOCs and widely for training", "Deploy in your lab to run a realistic monitoring stack", "Pivoting across data types is the core investigative skill"],
 t: ["Deploy Security Onion in your lab (a dedicated VM)", "Point it at a monitored lab interface or import a PCAP", "Generate attacks from Kali and find them in the interface", "Pivot from an alert to the related Zeek logs and packets", "Document one investigation across the combined data"],
 note: "Deploy and monitor only your own lab network.",
 q: [["What is Security Onion?", "A free, all-in-one network security monitoring and log-management platform bundling tools like Suricata and Zeek with a hunting/SIEM interface, used by SOCs and learners to detect and investigate threats."],
     ["Why is pivoting across data types important in an investigation?", "An alert alone rarely tells the whole story; pivoting to flow records, full packets and host logs lets you confirm, scope and understand an incident, which is why an integrated platform is valuable."]],
 x: ["Looking only at alerts and never pivoting to supporting data", "Monitoring a network you don't own"],
 d: "You can run Security Onion in your lab and investigate an attack across its combined data.",
 min: 55
},
"w18-5": {
 m: "Detection is half the job. The other half is building a network attackers struggle to move through at all.",
 e: "Beyond monitoring, defenders harden the network itself. Segmentation divides it into zones so a breach in one can't freely reach others (limiting lateral movement). Egress filtering controls outbound traffic, strangling C2 and exfiltration. Zero-trust principles assume no implicit trust by location, verifying every access. Firewalls, VLANs and strict rules enforce all this. For national-scale and critical infrastructure, this architecture is foundational. You'll design a segmented, filtered network for your lab and justify each control.",
 k: ["Segmentation: zones that contain a breach and limit lateral movement", "Egress filtering: control outbound traffic to stop C2/exfiltration", "Zero trust: never trust by location; verify every access explicitly", "Firewalls, VLANs and least-privilege rules enforce the design", "Architecture is a control: a well-segmented network resists spread"],
 t: ["Design a segmented network for your lab (zones + rules)", "Explain how segmentation limits lateral movement", "Add egress filtering rules and justify them", "Explain the core idea of zero trust in your own words", "Map each control to the attack it mitigates"],
 q: [["How does network segmentation improve security?", "By dividing the network into zones with controlled paths between them, it contains a breach, limits lateral movement, and reduces the blast radius, so compromising one zone doesn't grant access to all."],
     ["What is egress filtering and why does it matter?", "Controlling and restricting outbound traffic. It matters because it can block command-and-control callbacks and data exfiltration, cutting off an attacker even after they've gained a foothold."]],
 x: ["Flat networks where one breach reaches everything", "Filtering inbound only and ignoring outbound (egress)"],
 d: "You can design a segmented, egress-filtered network and map each control to the attack it stops.",
 min: 55
},
"w18-6": {
 m: "Attacks look like something on the wire. Learn their network fingerprints and you'll catch them live.",
 e: "Scanning, C2 beaconing and exfiltration each leave recognisable network patterns: a scan is one source touching many ports/hosts; beaconing is regular, periodic outbound connections; exfiltration is unusual volumes or destinations of outbound data. Learning these fingerprints lets you detect attacks in network data even without a signature. You'll generate each from your lab and identify it in Zeek/Suricata/Security Onion, tying the whole network-defence week together.",
 k: ["Scanning: one source, many ports/hosts, often incomplete handshakes", "C2 beaconing: regular, periodic outbound connections to the same destination", "Exfiltration: abnormal outbound data volume, timing or destination", "DNS abuse: unusual query volume or long/odd domains (DNS tunnelling)", "These behavioural fingerprints enable detection without signatures"],
 t: ["Generate a scan from Kali and identify its pattern in the monitoring data", "Simulate periodic beaconing and spot its regularity", "Explain how exfiltration stands out in flow data", "Describe how DNS tunnelling looks and why it's abused", "Write a behavioural detection idea for each pattern"],
 note: "Generate all test traffic only on your own lab network.",
 q: [["How does command-and-control beaconing appear in network data?", "As regular, periodic outbound connections to the same destination(s), often with consistent intervals and small sizes; the regularity (even with jitter) distinguishes it from normal human-driven traffic."],
     ["How might you detect data exfiltration on the network?", "By spotting anomalies in outbound traffic, unusually large volumes, transfers to new or rare destinations, odd timing (e.g. off-hours), or data leaving over unexpected protocols like DNS."]],
 x: ["Looking only for signatures and missing behavioural patterns", "Generating test traffic outside your own lab"],
 d: "You can recognise the network fingerprints of scanning, beaconing and exfiltration and detect them in lab data.",
 min: 50
},
"w18-p": {
 m: "Stand up real network defence: monitor your lab, attack it, and catch the attacks on the wire.",
 e: "Your project is to deploy a network-monitoring stack (Security Onion, or Zeek + Suricata) in your lab, generate a range of attacks from your Kali/AD work, and detect and document each from the network side, plus a short network-hardening plan (segmentation and egress filtering). This demonstrates end-to-end network defence, the capability at the core of protecting large organisations and national infrastructure.",
 k: ["A working network-monitoring stack watching your lab", "Several attacks generated and detected from network data", "Each detection documented (data, pattern, verdict)", "A short segmentation + egress-filtering hardening plan"],
 t: ["Deploy Security Onion (or Zeek + Suricata) on your lab network", "Generate multiple attacks (scan, exploit, beaconing-like, exfil-like)", "Detect and document each from the monitoring data", "Write a segmentation and egress-filtering plan for the lab", "Summarise the monitoring design and any visibility gaps"],
 note: "Monitor and attack only your own lab network.",
 q: [["Describe a network-monitoring deployment you've built.", "A stack (e.g. Security Onion with Suricata and Zeek) watching the lab network; I generate representative attacks and detect each from signatures, logs and behavioural patterns, documenting the data and verdict, and I harden the network with segmentation and egress filtering to limit what attacks can achieve."],
     ["How do monitoring and architecture work together in network defence?", "Monitoring detects and investigates activity, while architecture (segmentation, egress filtering, zero trust) limits what an attacker can do; together they both reduce and reveal risk, which is defence in depth."]],
 x: ["Detections claimed without generating the attack to verify", "No hardening plan alongside the monitoring"],
 d: "You've built lab network monitoring, detected several attacks on the wire, and written a hardening plan.",
 min: 150
}
};
