/* Cyber Phase 3: Reconnaissance & Scanning (Weeks 5-6)
   Legal, defensive, labs-only. Code samples use normal template literals. */
export default {

/* ---------- Week 5: Passive reconnaissance (OSINT) ---------- */
"w5-1": {
 m: "Before touching a target, see how much it gives away for free. Passive recon reads only what's already public.",
 e: "Reconnaissance is the information-gathering phase, and it comes in two flavours. Passive recon collects data from public sources without ever interacting with the target's systems, like reading a company's public filings and social media. Active recon actually probes the target (scanning), which touches their systems and needs authorisation. Passive first, because it's low-risk, often legal to do on public data, and surprisingly revealing. Even so, you only assess targets you own or are authorised to assess.",
 k: ["Passive recon: public sources only, no direct interaction with the target's systems", "Active recon: direct probing (scanning), which touches the target and needs authorisation", "Public data: search engines, DNS, certificate logs, social media, job posts", "The goal is to map the organisation and its attack surface from the outside", "Even passive OSINT should be done on targets you own or are authorised to assess"],
 t: ["Write the difference between passive and active recon in one line each", "List 6 public sources you could learn about an organisation from", "For your own domain or name, brainstorm what's publicly discoverable", "Explain why passive recon is lower risk than scanning", "Note where passive recon ends and authorisation becomes essential (any active probing)"],
 note: "Passive recon reads public data, but you still scope it to targets you own or are authorised to assess. Never move from passive recon to active scanning without authorisation.",
 q: [["What's the difference between passive and active reconnaissance?", "Passive recon gathers information from public sources without interacting with the target's systems; active recon directly probes the target (e.g. scanning), which touches their infrastructure and requires authorisation."],
     ["Why start with passive reconnaissance?", "It's low-risk and non-intrusive, often reveals a lot about the attack surface, and helps focus later authorised active testing without alerting the target."]],
 x: ["Treating 'passive' as permission to do anything (active probing still needs authorisation)", "Underestimating how much public data reveals"],
 d: "You can distinguish passive from active recon and list public sources of information.",
 min: 45
},
"w5-2": {
 m: "Domains, DNS and certificates quietly publish a map of an organisation's internet presence.",
 e: "Several public records describe an organisation's online footprint. WHOIS shows domain registration details. DNS records (A, MX, TXT, NS) reveal servers, mail providers and sometimes internal hints. Certificate Transparency logs are public lists of every TLS certificate issued, which often expose subdomains an organisation didn't mean to advertise. None of this touches the target directly; it's all public infrastructure data, ideal for passive recon on an authorised scope.",
 k: ["WHOIS: registrar, registration dates, sometimes contacts (often redacted now)", "DNS records: A/AAAA (hosts), MX (mail), NS (nameservers), TXT (SPF/verification)", "Certificate Transparency (crt.sh): public certs reveal subdomains", "Reverse DNS and IP ranges can map an organisation's hosting", "All public, all passive, when done via these third-party records"],
 t: ["Run whois on a domain you own and read the fields", "Query its DNS records (dig/nslookup) for A, MX, NS and TXT", "Search certificate transparency logs for your domain's subdomains", "Note which of these touched the target vs a third-party record", "Summarise your domain's externally visible footprint"],
 note: "Query public records and your own domains. Enumerating another organisation's infrastructure in depth can shade into active recon and should stay within an authorised scope.",
 q: [["What is Certificate Transparency and why is it useful for recon?", "A public, append-only log of issued TLS certificates. Because certificates often cover specific subdomains, searching these logs reveals hostnames an organisation may not have otherwise exposed."],
     ["What can DNS records reveal during reconnaissance?", "Hosts (A/AAAA), mail infrastructure (MX), nameservers (NS) and verification/policy data (TXT), which together help map an organisation's services and providers."]],
 x: ["Assuming WHOIS always shows personal contacts (often privacy-protected now)", "Confusing querying public logs with probing the target itself"],
 d: "You can enumerate a domain's public footprint via WHOIS, DNS and certificate logs.",
 min: 50
},
"w5-3": {
 m: "Search engines already indexed the internet. Dorking just asks them precise questions.",
 e: "Google dorking (or search-engine dorking) uses advanced operators to find specific things search engines have already indexed: a file type on a site, pages with a keyword, login portals. It's pure passive recon, you're querying the search engine, not the target, and it famously surfaces things organisations accidentally exposed. The same technique helps defenders find their own leaks. You practise it on your own domain first.",
 k: ["Operators: site:, filetype:, intitle:, inurl:, and quotes for exact phrases", "Example intent: find indexed documents or admin pages on a domain", "Still passive: you query the search engine, not the target", "Great for finding your own accidental exposures (do this defensively)", "The Google Hacking Database catalogues useful dork patterns"],
 t: ["Use site: to list indexed pages of your own domain", "Combine site: with filetype: to find documents on your domain", "Try intitle: and inurl: to find specific page types", "Note anything exposed you didn't expect (and how you'd remove it)", "Write 5 dorks you'd use defensively to audit your own site"],
 c: `# run these against your OWN domain to audit your exposure
site:example.com
site:example.com filetype:pdf
site:example.com inurl:admin
site:example.com intitle:"index of"      # accidental directory listings
site:example.com "internal use only"`,
 note: "Use dorking to audit domains you own or are authorised to assess. Accessing anything sensitive you discover on a third party's site without authorisation is still unauthorised access.",
 q: [["Why is Google dorking considered passive reconnaissance?", "Because you query the search engine's existing index rather than interacting with the target's servers, so the target isn't directly touched."],
     ["How can dorking help defenders?", "By revealing what an organisation has accidentally exposed and indexed, such as documents, config files or admin pages, so they can remove or protect them."]],
 x: ["Accessing exposed sensitive data on systems you're not authorised for", "Thinking dorking is 'hacking' rather than searching public indexes"],
 d: "You can use search operators to audit a domain's indexed exposure.",
 min: 45
},
"w5-4": {
 m: "People are part of the attack surface. Public profiles and patterns reveal usernames, emails and tech.",
 e: "Organisations expose a lot through people and side-channels: employee names on LinkedIn, email formats (first.last@company.com), technologies named in job posts, developer accounts and leaked credentials in past breaches. Attackers assemble this for phishing and password guessing; defenders assemble it to understand their own exposure. This is where OSINT gets powerful and where ethics matter most: you gather only public data, only within an authorised scope, and you never harass individuals.",
 k: ["Email/username patterns can often be inferred from a few known examples", "Job posts reveal the tech stack (frameworks, cloud, security tools)", "Breach-exposure checks (e.g. Have I Been Pwned) show if an address appeared in a breach", "People are targeted by phishing, so this feeds security-awareness defence too", "Collect public data only, within scope, and never harass or dox anyone"],
 t: ["Infer the likely email format for an organisation from a couple of public examples", "Find what technologies a company mentions in its public job posts", "Check whether your own email appears in known breaches", "Note how this information would feed a phishing-awareness program (defence)", "Write the ethical limits you'll hold to when OSINTing people"],
 note: "Gather only public information, only within an authorised scope, and never target or harass individuals. Building profiles of people outside an authorised engagement is both unethical and often unlawful.",
 q: [["How might an attacker discover an organisation's email format?", "By finding a few known addresses (from public pages, press releases or breaches) and inferring the pattern, such as first.last@company.com, then generating likely addresses for other employees."],
     ["How does people-focused OSINT support defence?", "It shows what attackers can learn for phishing and password attacks, letting defenders run awareness training, enforce MFA and reduce unnecessary public exposure."]],
 x: ["Crossing from public data into harassment, stalking or doxxing", "Collecting personal data outside the authorised scope"],
 d: "You can responsibly map an organisation's public people/tech footprint and explain its defensive use.",
 min: 50
},
"w5-5": {
 m: "Do recon on yourself first. It's the safest target and the most useful wake-up call.",
 e: "The best way to learn OSINT ethically is to point it at yourself and your own domain. You'll see what a stranger could learn, your accounts, exposed data, email patterns, old breaches, and it's completely legal because it's you. This doubles as a defensive exercise: everything you find, you can then reduce. It builds the habit of thinking about exposure from the outside in, which is exactly how a defender should think.",
 k: ["Self-OSINT is legal, revealing, and teaches the attacker's-eye view", "Catalogue: accounts, emails, photos, addresses, breach appearances", "For each finding, note a reduction: privacy settings, removal, stronger auth", "This is the same process you'd run on an authorised client, on yourself", "Thinking outside-in is the core of reducing attack surface"],
 t: ["Run the full passive toolkit (search, DNS, certs, breach check) on yourself/your domain", "Catalogue every finding with its source", "For each, write a concrete step to reduce the exposure", "Tighten the privacy settings or remove one thing you found", "Note which findings would matter most to an attacker and why"],
 q: [["Why is doing OSINT on yourself a good exercise?", "It's legal, shows you exactly what an attacker could gather, and lets you immediately reduce your own exposure, building the outside-in mindset defenders need."],
     ["Name three ways to reduce your personal OSINT footprint.", "Tighten social-media privacy settings, remove or request takedown of exposed documents and data, and reduce reuse of emails/usernames while enabling MFA on important accounts."]],
 x: ["Only thinking about attack and never about reducing exposure", "Ignoring old accounts and breaches that still expose you"],
 d: "You've produced a catalogue of your own public exposure with a reduction step for each item.",
 min: 50
},
"w5-6": {
 m: "Findings are only useful if they're recorded clearly. Good documentation is what separates a pro from a hobbyist.",
 e: "Every recon finding should be captured so it's reproducible and reportable: what you found, where (the source), when, and why it matters. Clear documentation lets you build a report, retrace your steps, and prove you stayed in scope. This habit, started in recon, carries through every phase and is a big part of what clients and employers actually pay for. Screenshots with timestamps and sources beat vague memory every time.",
 k: ["Record: finding, source, timestamp, and relevance/impact", "Screenshots and raw output beat paraphrasing from memory", "Organise by target and by category (DNS, people, exposures)", "Reproducibility: someone else should be able to confirm your finding", "This feeds directly into the final report and keeps you provably in scope"],
 t: ["Design a simple recon finding template (finding, source, date, impact, fix)", "Re-record your self-OSINT findings using the template", "Add screenshots or raw command output as evidence", "Organise your notes by category so they're report-ready", "Write a 3-sentence summary of your overall exposure, as an executive would read it"],
 q: [["What should a recon finding record include?", "The finding itself, its source, a timestamp, why it matters (impact), and ideally evidence like a screenshot or raw output, so it's reproducible and report-ready."],
     ["Why is documentation a professional skill, not an afterthought?", "Reports are the deliverable clients pay for; clear, reproducible notes prove what was done, keep you demonstrably in scope, and let findings be verified and remediated."]],
 x: ["Relying on memory instead of evidence", "Disorganised notes that can't become a report"],
 d: "You have a reusable recon finding template and report-ready notes with evidence.",
 min: 45
},
"w5-p": {
 m: "Run a real passive assessment, on yourself or a domain you own, and write it up like a professional.",
 e: "Your project is an OSINT assessment of a domain you own (or your own identity): gather public information passively, document each finding with its source and impact, and write a short report explaining what a stranger could learn and how to reduce it. This mirrors the recon phase of a real engagement, done entirely on an authorised target, and produces your first portfolio-ready write-up.",
 k: ["A passive-only assessment of a target you own or are authorised to assess", "Findings documented with source, timestamp and impact", "A short report with an executive summary and reduction recommendations", "Zero active probing of systems you don't own"],
 t: ["Choose a target you own (a domain or your own identity)", "Gather public info: search, DNS, certificates, people/tech, breach exposure", "Document each finding with evidence and impact", "Write recommendations to reduce each exposure", "Produce a 1–2 page report with an executive summary and publish it as a write-up (redacting anything sensitive)"],
 note: "Assess only a domain or identity you own or are authorised to assess, using passive, public sources only.",
 q: [["Walk me through an OSINT assessment.", "Define the authorised target, gather public information passively (WHOIS/DNS, certificate logs, search dorking, people/tech, breach exposure), document each finding with source and impact, then report what's exposed and how to reduce it, without touching the target's systems."],
     ["How would you present OSINT findings to a non-technical owner?", "An executive summary of overall exposure and risk in plain language, followed by specific findings with evidence and clear, prioritised steps to reduce each one."]],
 x: ["Drifting into active scanning during a passive assessment", "Publishing sensitive findings without redaction"],
 d: "You've produced a documented, passive OSINT report on an authorised target with reduction recommendations.",
 min: 120
},

/* ---------- Week 6: Active scanning and enumeration ---------- */
"w6-1": {
 m: "Now you touch the target, only one you own or are authorised for, to find which machines are alive.",
 e: "Active scanning interacts with the target, so it needs authorisation; in this course that means your own lab. Host discovery is the first step: finding which IPs on a network are live, usually with ping sweeps or ARP on a local network. It's the active equivalent of knocking to see who's home. You'll run this against your own isolated lab network, turning a range of addresses into a list of real machines to investigate.",
 k: ["Active scanning interacts with the target and requires authorisation", "Host discovery finds live machines before deeper scanning", "Ping sweeps (ICMP) and ARP scans (local network) are common methods", "Some hosts block ping, so absence of a reply isn't proof of absence", "Start narrow and in-scope; broad scanning is noisy and detectable"],
 t: ["Identify your lab's network range from your VM IPs", "Run a host-discovery scan (e.g. nmap -sn) across the lab range", "List the live hosts found and match them to your known VMs", "Note why a firewalled host might not answer a ping", "Record discovered hosts in your notes as the targets for port scanning"],
 c: `# host discovery on YOUR OWN lab range only
nmap -sn 192.168.56.0/24          # ping sweep, no port scan
# list just the live hosts
nmap -sn 192.168.56.0/24 -oG - | awk '/Up/{print $2}'`,
 note: "Run host discovery only on your own lab network or an authorised scope. Scanning address ranges you don't own is unauthorised and often illegal.",
 q: [["What is host discovery and why is it the first scanning step?", "It identifies which addresses in a range have live hosts, so subsequent, heavier scanning is focused only on machines that actually exist, saving time and noise."],
     ["Why might a live host not respond to a ping sweep?", "Firewalls or host settings may block ICMP, so the host appears down even though it's up; other discovery methods (ARP locally, or probing common ports) can confirm it."]],
 x: ["Scanning ranges outside your lab or authorised scope", "Assuming a non-responding host is definitely offline"],
 d: "You can discover live hosts on your own lab network and explain why some hosts may hide.",
 min: 50
},
"w6-2": {
 m: "Nmap is the scanner. Learning its core scans tells you which doors are open on a machine you may test.",
 e: "Nmap is the standard port scanner. A TCP connect scan completes the handshake (reliable, but noisy and needs no special privileges); a SYN scan sends SYN and reads the reply without completing (faster, stealthier, needs root). You'll run these against your lab targets to list open ports, the first real picture of a machine's attack surface. Nmap is powerful, so you keep it strictly in scope and understand that heavy scanning is easily detected by defenders.",
 k: ["nmap <target> does a default scan of common ports", "-sT connect scan (full handshake); -sS SYN scan (half-open, needs root)", "-p specifies ports (-p- for all 65535); -T controls speed/noise", "Open ports map the attack surface; this is the heart of enumeration", "Scanning is detectable: in real engagements, timing and scope are agreed"],
 t: ["Run a default Nmap scan against your Metasploitable target", "Compare a SYN scan (-sS) and a connect scan (-sT) and note the difference", "Scan all ports (-p-) and see what the default scan missed", "Record every open port you find", "Note how scan speed (-T) trades stealth for speed"],
 c: `# scan YOUR OWN lab target only
nmap 192.168.56.101                 # default: top 1000 TCP ports
sudo nmap -sS 192.168.56.101        # SYN (half-open) scan, needs root
nmap -sT 192.168.56.101             # TCP connect scan, no root needed
nmap -p- 192.168.56.101             # all 65535 ports`,
 note: "Scan only your own lab targets or an authorised scope. Port scanning systems you don't own can be unlawful and is always unauthorised without permission.",
 q: [["What's the difference between an Nmap SYN scan and a connect scan?", "A SYN scan (-sS) sends SYN and reads the SYN-ACK without completing the handshake (faster, stealthier, needs root); a connect scan (-sT) completes the full TCP handshake (works without privileges but is noisier and more logged)."],
     ["Why does scanning all ports matter?", "Services can run on non-standard ports; a default scan only checks common ones, so -p- ensures you don't miss an exposed service hiding on an unusual port."]],
 x: ["Only scanning default ports and missing services on unusual ports", "Running aggressive scans outside your authorised scope"],
 d: "You can run and explain SYN and connect scans and list a lab target's open ports.",
 min: 55
},
"w6-3": {
 m: "An open port is a hint. The service and its version behind it are the real information.",
 e: "Knowing port 80 is open tells you little; knowing it runs 'Apache 2.4.49' tells you a lot, because specific versions have specific known weaknesses. Nmap's service/version detection (-sV) probes open ports to identify the software and version, and the Nmap Scripting Engine (NSE) runs small scripts for deeper, safe enumeration. This turns a port list into a detailed profile of the machine, the basis for finding (and fixing) vulnerabilities.",
 k: ["-sV detects the service and version on each open port", "-O attempts OS detection; -A combines version, OS, scripts and traceroute", "NSE (--script) runs enumeration/vuln scripts; default scripts (-sC) are safe", "Version + service = the key to matching known vulnerabilities later", "Some NSE scripts are intrusive, so use safe categories in scope"],
 t: ["Run nmap -sV against your target and record service versions", "Add default scripts with -sC and read the extra information", "Try -A for a fuller profile and note what it adds", "List one NSE script category and what it enumerates", "Build a per-host profile: port, service, version, notes"],
 c: `# enrich your lab scan with versions and safe scripts
nmap -sV 192.168.56.101             # service/version detection
nmap -sC -sV 192.168.56.101         # + default (safe) NSE scripts
nmap -A 192.168.56.101              # aggressive: version, OS, scripts, traceroute
nmap --script "http-enum" 192.168.56.101   # a specific enumeration script`,
 note: "Run version detection and NSE scripts only against your own lab or an authorised scope; some scripts are intrusive, so prefer safe categories within the agreed rules.",
 q: [["Why is service version detection important?", "Because vulnerabilities are tied to specific software versions. Knowing the exact service and version lets you identify known issues (CVEs) and assess real risk, rather than guessing from the port alone."],
     ["What is the Nmap Scripting Engine (NSE)?", "A framework of scripts Nmap can run against targets for tasks like detailed enumeration, misconfiguration checks and (with care) vulnerability detection; default scripts are relatively safe, others are intrusive."]],
 x: ["Running intrusive NSE scripts on production or out-of-scope systems", "Recording ports without the all-important version information"],
 d: "You can detect service versions and run safe NSE scripts to profile a lab host.",
 min: 55
},
"w6-4": {
 m: "Each open service is its own little world. Enumerating them deeply is where the real findings come from.",
 e: "After the scan, you investigate each service in depth. A web server: what pages, directories and technologies does it run? SMB (445): what shares and users are exposed? SSH, FTP, DNS: what versions, what's allowed anonymously? This service-by-service enumeration, on your own lab, is where most vulnerabilities actually surface. The mindset: for every open port, ask 'what can this service tell me, and what might be misconfigured?'",
 k: ["Web: directory/content discovery, technologies, default pages", "SMB (445): shares, users, versions, anonymous access", "FTP (21): anonymous login, readable/writable files", "DNS (53): zone info, record types", "Deep enumeration of each service beats rushing to exploit"],
 t: ["For each open port on your target, write what you'd enumerate next", "Enumerate the target's web service: directories and technologies", "Enumerate SMB shares/users on the target (if present)", "Check for anonymous FTP access on the target (if present)", "Add each finding to your per-host profile with its impact"],
 note: "Enumerate only services on your own lab targets or an authorised scope.",
 q: [["What does it mean to enumerate a service?", "To probe it for detailed information, like a web server's directories and technologies, or an SMB server's shares and users, to understand what it exposes and where it might be misconfigured or vulnerable."],
     ["Why is enumeration often more valuable than jumping to exploitation?", "Most vulnerabilities are found by understanding the target thoroughly; deep enumeration reveals misconfigurations, exposed data and version-specific weaknesses that point directly to the way in."]],
 x: ["Scanning once and rushing to exploit without enumerating services", "Ignoring 'boring' services like FTP or SMB that often hold easy wins"],
 d: "You can enumerate the individual services on a lab host and record what each exposes.",
 min: 55
},
"w6-5": {
 m: "Loud scanning gets caught. Understanding detection makes you both a better tester and a better defender.",
 e: "Scanning is noisy: it generates traffic and log entries that defences (firewalls, IDS/IPS, SIEMs) can spot. In a real, authorised engagement, scan timing and intensity are agreed precisely because they're detectable and can disrupt services. Knowing how scans look to a defender teaches you to scope carefully, and, flipping sides, how to detect an attacker's scan in logs, which you'll use in the blue-team phase. This is where offence and defence meet.",
 k: ["Scans create traffic and logs that IDS/IPS and SIEMs can detect", "Faster scans are noisier; timing (-T) trades stealth for speed", "Rate limits and scope exist to protect production systems", "Defenders detect scans by patterns (many ports, many hosts, fast)", "Thinking like a defender here sets up the blue-team phase"],
 t: ["Watch your own scan in Wireshark or the target's logs to see what it looks like", "Note which scan settings make the traffic more or less obvious", "List how a defender could detect a port scan", "Explain why DoS-style or ultra-fast scanning is usually out of scope", "Write how you'd keep an authorised scan safe for production"],
 note: "Observe scan noise on your own lab only. In real engagements, scan timing and intensity must stay within the agreed rules of engagement to avoid disrupting services.",
 q: [["How can defenders detect a port scan?", "By spotting patterns in logs and network data: a single source touching many ports or many hosts in a short time, incomplete handshakes (SYN without follow-up), and IDS/IPS signatures for scanning tools."],
     ["Why are scan timing and intensity agreed in an engagement?", "Because scanning is detectable and heavy scanning can degrade or crash fragile production systems, so the rules of engagement set safe timing and scope."]],
 x: ["Assuming scanning is invisible", "Using aggressive timing against fragile or production systems"],
 d: "You can describe how scans are detected and why timing and scope keep authorised scanning safe.",
 min: 45
},
"w6-6": {
 m: "A pile of scan output isn't findings. Turning it into an organised inventory is the real skill.",
 e: "Scanning produces a lot of raw output; the value is in organising it into a clear inventory: per host, the open ports, services, versions, and the things worth investigating. This inventory drives the rest of the engagement and feeds the report. You'll learn to save Nmap output in useful formats and distil it into a tidy table, so a finding never gets lost and your work is reproducible.",
 k: ["Save Nmap output: -oN (normal), -oG (greppable), -oX (XML), -oA (all)", "Distil raw output into a per-host table: port, service, version, notes", "Flag items worth investigating (old versions, risky services)", "An organised inventory drives enumeration and the final report", "Reproducibility: keep the raw output alongside the summary"],
 t: ["Re-run your key scan saving all output formats with -oA", "Build a per-host inventory table from the output", "Flag the 3 most interesting findings and why", "Keep the raw output files with your notes", "Write a short 'next steps' list of what to enumerate/investigate further"],
 c: `# save scan output in all formats for your records
nmap -sC -sV -oA scans/metasploitable 192.168.56.101
# -oA writes .nmap (normal), .gnmap (greppable), .xml`,
 q: [["Why save scan output in multiple formats?", "Normal output is readable, greppable output is easy to filter with command-line tools, and XML feeds other tools and reports. Keeping all three preserves both readability and machine-processability."],
     ["How do you turn raw scan output into useful findings?", "By distilling it into a per-host inventory (port, service, version, notes), flagging risky or outdated items for investigation, and keeping the raw output for reproducibility and reporting."]],
 x: ["Leaving findings scattered in terminal scrollback", "Not keeping raw output, so results can't be reproduced or reported"],
 d: "You can produce a clean, per-host scan inventory and keep reproducible raw output.",
 min: 45
},
"w6-p": {
 m: "Produce a complete, organised enumeration of a machine you own, the deliverable a real engagement starts from.",
 e: "Your project is a full enumeration of your Metasploitable 2 VM: host discovery, port scanning, service/version detection, service-by-service enumeration, all saved and distilled into a tidy host/port/service inventory with flagged findings. This is exactly the artefact that drives the exploitation phase, and it proves you can turn scanning into organised intelligence, on a target you own.",
 k: ["End-to-end scanning of a target you own, documented and reproducible", "A per-host inventory: ports, services, versions, and flagged issues", "Raw output kept alongside the summary", "A short 'investigate next' list for the exploitation phase"],
 t: ["Run host discovery, then full port and version scans on your Metasploitable VM", "Enumerate each interesting service in more depth", "Save all raw output and build the inventory table", "Flag the findings most likely to be exploitable and why", "Write a one-page enumeration summary that a teammate could act on"],
 note: "Perform this enumeration only against your own Metasploitable VM or another target you own or are authorised to test.",
 q: [["What should a good enumeration report contain?", "A per-host inventory of open ports, services and versions, deeper notes per service, flagged risky findings with reasoning, the raw scan evidence, and a prioritised list of what to investigate next."],
     ["How does enumeration feed the exploitation phase?", "It identifies specific services, versions and misconfigurations, letting you match them to known vulnerabilities and focus testing on the most promising, in-scope targets."]],
 x: ["Submitting raw scan dumps instead of an organised inventory", "Enumerating a target you don't own"],
 d: "You have a complete, organised enumeration inventory of your own Metasploitable VM with flagged next steps.",
 min: 120
}
};
