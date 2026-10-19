/* Zero to Ethical Hacker: 12 weeks, 84 days. Legal, defensive, labs-only.
   The rule throughout: only ever test systems you own or are given written
   permission to test. Unauthorised access to any system is a crime. */
export const PHASES=[
 {n:1,name:"Foundations, Ethics & Your Lab",c:"#D1453B",w:[1,2],goal:"Understand the law and the hacker mindset, and build a safe, legal lab on your own computer where you can practise everything that follows."},
 {n:2,name:"Networking & Linux",c:"#D4760A",w:[3,4],goal:"Learn how networks and the Linux command line really work, the two things every security skill is built on."},
 {n:3,name:"Reconnaissance & Scanning",c:"#B38A00",w:[5,6],goal:"Map a target you own or are authorised to test: find hosts, open ports, services and public information, the legal way."},
 {n:4,name:"Web Application Security",c:"#0A8CB0",w:[7,8],goal:"Find and understand the most common web vulnerabilities (the OWASP Top 10) using only official training labs."},
 {n:5,name:"Exploitation & Privilege Escalation",c:"#5C9A12",w:[9,10],goal:"Practise gaining and elevating access on deliberately vulnerable machines you run yourself, and learn how each attack is prevented."},
 {n:6,name:"Defensive Security & Blue Team",c:"#2F68E0",w:[11,11],goal:"See the other side: detect attacks, read logs, use a SIEM, and respond to incidents. Most security jobs are defensive."},
 {n:7,name:"Capstone, Certifications & Career",c:"#7648E0",w:[12,12],goal:"Tie it together with a full lab pentest and report, then plan your certifications, CTFs, in-scope bug bounties and job search."}
];

export const R={
 itact:["India IT Act, 2000 (know the law)","https://www.meity.gov.in/content/information-technology-act-2000"],
 cfaa:["US Computer Fraud and Abuse Act (overview)","https://www.justice.gov/criminal/criminal-ccips"],
 eccouncil:["EC-Council: Code of Ethics","https://www.eccouncil.org/code-of-ethics/"],
 thm:["TryHackMe (guided, legal labs)","https://tryhackme.com/"],
 thmIntro:["TryHackMe: Complete Beginner path","https://tryhackme.com/path/outline/beginner"],
 thmPreSec:["TryHackMe: Pre Security path","https://tryhackme.com/path/outline/presecurity"],
 thmJr:["TryHackMe: Jr Penetration Tester path","https://tryhackme.com/path/outline/jrpenetrationtester"],
 thmSoc:["TryHackMe: SOC Level 1 path","https://tryhackme.com/path/outline/soclevel1"],
 htb:["Hack The Box (legal labs)","https://www.hackthebox.com/"],
 htbAcademy:["Hack The Box Academy (free modules)","https://academy.hackthebox.com/"],
 portswigger:["PortSwigger Web Security Academy (free)","https://portswigger.net/web-security"],
 owasp:["OWASP Top 10","https://owasp.org/www-project-top-ten/"],
 owaspApi:["OWASP API Security Top 10","https://owasp.org/API-Security/"],
 owaspWstg:["OWASP Web Security Testing Guide","https://owasp.org/www-project-web-security-testing-guide/"],
 juiceshop:["OWASP Juice Shop (vulnerable app to run yourself)","https://owasp.org/www-project-juice-shop/"],
 dvwa:["DVWA: Damn Vulnerable Web App","https://github.com/digininja/DVWA"],
 vulnhub:["VulnHub (vulnerable VMs to run offline)","https://www.vulnhub.com/"],
 metasploitable:["Metasploitable 2 (practice VM)","https://docs.rapid7.com/metasploit/metasploitable-2/"],
 kali:["Kali Linux docs","https://www.kali.org/docs/"],
 virtualbox:["VirtualBox manual","https://www.virtualbox.org/manual/"],
 linuxjourney:["Linux Journey (free)","https://linuxjourney.com/"],
 overthewire:["OverTheWire: Bandit (Linux/SSH wargame)","https://overthewire.org/wargames/bandit/"],
 nmap:["Nmap reference guide","https://nmap.org/book/man.html"],
 wireshark:["Wireshark User's Guide","https://www.wireshark.org/docs/wsug_html_chunked/"],
 burp:["Burp Suite documentation","https://portswigger.net/burp/documentation"],
 cyberchef:["CyberChef (data tool)","https://gchq.github.io/CyberChef/"],
 hashcat:["Hashcat wiki","https://hashcat.net/wiki/"],
 gtfobins:["GTFOBins (Linux privesc reference)","https://gtfobins.github.io/"],
 lolbas:["LOLBAS (Windows living-off-the-land reference)","https://lolbas-project.github.io/"],
 mitre:["MITRE ATT&CK","https://attack.mitre.org/"],
 nistir:["NIST Computer Security Incident Handling Guide (SP 800-61)","https://csrc.nist.gov/pubs/sp/800/61/r2/final"],
 cyberdefenders:["CyberDefenders (blue-team labs)","https://cyberdefenders.org/"],
 letsdefend:["LetsDefend (SOC practice)","https://letsdefend.io/"],
 hackerone:["HackerOne: Hacktivity & programs (in-scope only)","https://www.hackerone.com/"],
 bugcrowd:["Bugcrowd: programs & VRT","https://www.bugcrowd.com/"],
 disclose:["disclose.io: safe-harbour & scope","https://disclose.io/"],
 picoctf:["picoCTF (beginner CTF)","https://picoctf.org/"],
 ctftime:["CTFtime (find CTF events)","https://ctftime.org/"],
 securityplus:["CompTIA Security+ objectives","https://www.comptia.org/certifications/security"],
 ejpt:["INE / eJPT (entry pentest cert)","https://security.ine.com/certifications/ejpt-certification/"],
 pnpt:["TCM Security / PNPT","https://certifications.tcm-sec.com/pnpt/"],
 oscp:["OffSec OSCP (PEN-200)","https://www.offsec.com/courses/pen-200/"],
 tcmLinux:["TCM Security: Linux Privilege Escalation","https://academy.tcm-sec.com/"],
 hausec:["HackTricks (pentest reference wiki)","https://book.hacktricks.xyz/"]
};

export const WEEKS=[
/* Phase 1: Foundations, Ethics & Your Lab */
{t:"The law, ethics and the hacker mindset",h:8,goal:"Before any tool, understand what is legal, what is not, and how an ethical hacker actually thinks.",
 tasks:["Authorisation first: the one rule that separates a security professional from a criminal","The law where you live: India's IT Act 2000 (and the US CFAA) in plain terms","White-hat, grey-hat, black-hat: why only written permission makes you a white-hat","Scope, rules of engagement and safe harbour: what a signed authorisation actually says","The hacker mindset: curiosity, patience and thinking about how systems can go wrong","CIA triad (Confidentiality, Integrity, Availability) and the vocabulary of security"],
 proj:"Write your own one-page 'Rules of Engagement' template and a personal ethics pledge you'll follow for the whole course",res:["itact","cfaa","eccouncil","thmPreSec"],skills:["Cyber law basics","Ethics","Scope & authorisation","CIA triad"]},
{t:"Build your legal practice lab",h:9,goal:"Create an isolated lab on your own machine so you can practise everything safely and legally, offline.",
 tasks:["Why a lab: you may only attack machines you own or are authorised to test, so you build your own targets","Install VirtualBox (or VMware) and learn snapshots: instant undo for broken machines","Set up Kali Linux as your attacker VM","Add a deliberately vulnerable target VM you own (Metasploitable 2 or an OWASP Juice Shop container)","Host-only / NAT networking: keep the lab isolated from your home network and the internet","Create accounts on TryHackMe and Hack The Box: legal, sandboxed labs you don't have to build"],
 proj:"A working home lab: Kali plus one vulnerable VM on an isolated network, with clean snapshots, and your first TryHackMe room completed",res:["virtualbox","kali","metasploitable","juiceshop","thm","htb"],skills:["Virtualisation","Kali Linux","Lab isolation","Snapshots"]},
/* Phase 2: Networking & Linux */
{t:"How networks work",h:9,goal:"Understand the plumbing of the internet: without this, every scan and exploit is just magic words.",
 tasks:["The OSI and TCP/IP models: how data is wrapped in layers to travel the network","IP addresses, subnets and MAC addresses: how machines are found and identified","Ports and the common services behind them (80/443 web, 22 SSH, 53 DNS, 445 SMB)","TCP vs UDP, and the three-way handshake that scanners rely on","DNS, HTTP/HTTPS and how a web request really travels","Capture real traffic in Wireshark on your own lab network and read a packet"],
 proj:"Use Wireshark to capture and annotate a full web request and a TCP handshake between your own lab machines",res:["thmPreSec","wireshark","linuxjourney"],skills:["TCP/IP","Ports & protocols","DNS/HTTP","Wireshark"]},
{t:"Linux for security",h:10,goal:"Live on the Linux command line, where almost all security tooling runs.",
 tasks:["The filesystem, navigation and the shell: pwd, ls, cd, cat, less","Users, groups, sudo and file permissions (the rwx bits) that privilege escalation abuses","Finding things: find, grep, pipes and redirection to chain commands","Processes, services and networking commands: ps, ss, systemctl, ip","Bash scripting basics: automate a repetitive task","SSH: connect to machines securely, and key-based auth"],
 proj:"Finish OverTheWire's Bandit wargame up to at least level 15, keeping notes on each command you learn",res:["linuxjourney","overthewire","kali","htbAcademy"],skills:["Linux CLI","Permissions","Bash","SSH","grep/find"]},
/* Phase 3: Reconnaissance & Scanning */
{t:"Passive reconnaissance (OSINT)",h:8,goal:"Learn what a target reveals publicly, using only information that is already open, on a target you're authorised to assess.",
 tasks:["Passive vs active recon: why passive touches nothing of the target directly","OSINT from public sources: WHOIS, DNS records, certificate transparency logs","Google dorking: advanced search operators to find exposed information","Finding subdomains and employee/email patterns from public data","How your own online footprint looks to an attacker (do this on yourself first)","Document findings cleanly: screenshots, sources and timestamps"],
 proj:"Run an OSINT assessment on a domain you own (or your own name), and write up what a stranger could learn and how to reduce it",res:["thmJr","owaspWstg","hausec"],skills:["OSINT","WHOIS/DNS","Google dorking","Footprinting"]},
{t:"Active scanning and enumeration",h:10,goal:"Map hosts, ports and services on machines in your own lab or an authorised scope.",
 tasks:["Host discovery: which machines are alive on the lab network","Port scanning with Nmap: TCP connect, SYN scans and when to use each","Service and version detection, and the Nmap Scripting Engine (NSE)","Enumerating common services: web, SMB, SSH, FTP, DNS","Why noisy scanning is detectable, and why scope and rate limits matter","Turn scan output into an organised list of findings to investigate"],
 proj:"Fully enumerate your Metasploitable 2 VM with Nmap and produce a tidy host/port/service inventory",res:["nmap","thmJr","metasploitable","hausec"],skills:["Nmap","Port scanning","Service enumeration","NSE"]},
/* Phase 4: Web Application Security */
{t:"Web hacking foundations and the OWASP Top 10",h:10,goal:"Understand the most common web vulnerabilities and practise them only on official training labs.",
 tasks:["How web apps work: requests, responses, cookies, sessions and the same-origin idea","Set up Burp Suite as an intercepting proxy against your own lab app","The OWASP Top 10: a tour of the ten most common risk categories","Broken access control and IDOR: the single most common real-world bug","Authentication and session flaws: weak logins, session fixation","Work the first PortSwigger Academy labs (access control, authentication)"],
 proj:"Complete a set of PortSwigger access-control and authentication labs and write up how each is fixed",res:["portswigger","owasp","burp","juiceshop"],skills:["Burp Suite","OWASP Top 10","Access control","Auth testing"]},
{t:"Injection, XSS and web exploitation practice",h:10,goal:"Go deeper on injection-style bugs, always on labs built for learning, and learn the defence for each.",
 tasks:["SQL injection: how it works, and why parameterised queries stop it","Cross-site scripting (XSS): reflected, stored and DOM, and how output encoding stops it","CSRF and SSRF in concept, with the defences (tokens, allow-lists)","File upload and path traversal issues, and safe handling","Chaining small bugs into a bigger impact (on the lab app)","For every bug: write the vulnerable code and the fixed code side by side"],
 proj:"Reach a milestone in OWASP Juice Shop (e.g. a score tier) and document each flaw with its root cause and fix",res:["portswigger","juiceshop","dvwa","owaspWstg"],skills:["SQLi","XSS","CSRF/SSRF","Secure coding"]},
/* Phase 5: Exploitation & Privilege Escalation */
{t:"Exploitation on vulnerable machines you own",h:10,goal:"Practise the full attack chain on deliberately vulnerable VMs you run yourself, and understand each defence.",
 tasks:["From a finding to a foothold: matching a service version to a known vulnerability (CVEs)","Using Metasploit responsibly against your own Metasploitable VM","Reverse vs bind shells: how a shell connects back, and how firewalls stop it","Default and weak credentials: why they're still the number-one way in","Password attacks in the lab: hashing, cracking with Hashcat, and why strong hashing + MFA defeats it","Note-taking and evidence: a repeatable methodology"],
 proj:"Compromise a beginner VulnHub/TryHackMe machine end to end in your lab, and write the steps plus the fix for each weakness",res:["metasploitable","vulnhub","thmJr","hashcat","hausec"],skills:["Exploitation workflow","Metasploit","Shells","Password cracking"]},
{t:"Privilege escalation and post-exploitation",h:10,goal:"Learn how low-level access becomes full control, and, crucially, how defenders prevent it.",
 tasks:["Linux privilege escalation: SUID binaries, sudo misconfigs, cron jobs (use GTFOBins)","Windows privilege escalation concepts: services, tokens, unquoted paths (use LOLBAS)","Enumeration scripts and how to read their output","Why least privilege, patching and hardening shut these paths down","Lateral movement and persistence in concept, and how they're detected","Clean up your lab: restore snapshots and document everything"],
 proj:"Escalate to root/admin on a lab machine using two different techniques, then write the hardening steps that would have blocked each",res:["gtfobins","lolbas","tcmLinux","thmJr","hausec"],skills:["Linux privesc","Windows privesc","Hardening","Least privilege"]},
/* Phase 6: Defensive Security & Blue Team */
{t:"Blue team: detection and response",h:10,goal:"Switch sides. Learn to detect the very attacks you practised, which is where most security jobs are.",
 tasks:["Security operations (SOC) basics: what analysts actually do all day","Logs everywhere: system, web, firewall and auth logs, and how to read them","MITRE ATT&CK: a shared language for attacker techniques and detections","SIEM basics: collecting logs and writing a detection for an attack you ran","Incident response lifecycle (NIST): prepare, detect, contain, eradicate, recover","Hardening and defence-in-depth: patching, MFA, segmentation, backups"],
 proj:"Run one of your lab attacks, then detect it from the logs/SIEM and write a short incident report mapped to ATT&CK",res:["thmSoc","mitre","nistir","cyberdefenders","letsdefend"],skills:["SOC analysis","Log analysis","MITRE ATT&CK","SIEM","Incident response"]},
/* Phase 7: Capstone, Certifications & Career */
{t:"Capstone, certifications and career",h:12,goal:"Prove your skills end to end, then plan your certs, CTFs, legal bug-bounty practice and job search.",
 tasks:["Capstone: a full assessment of a lab target, from recon to report, in your own environment","Write a professional pentest report: executive summary, findings, risk ratings, remediation","Certification roadmap: Security+, eJPT, PNPT, then OSCP, and which fits your goal","Capture the Flag: sharpen skills legally on picoCTF and CTFtime events","Bug bounty the right way: reading scope, safe harbour, and only in-scope targets","Build your profile: GitHub write-ups, a home-lab blog, LinkedIn and a resume"],
 proj:"A complete capstone pentest report on a lab you own, published as a portfolio write-up, plus a dated study plan for your chosen certification",res:["securityplus","ejpt","pnpt","oscp","picoctf","ctftime","hackerone","disclose"],skills:["Pentest methodology","Report writing","CTFs","Bug-bounty scope","Career"]}
];

export const LIB=[
 {h:"Legal practice labs",items:[["TryHackMe","https://tryhackme.com/","guided rooms, beginner to advanced"],["Hack The Box","https://www.hackthebox.com/","labs and Academy modules"],["PortSwigger Web Security Academy","https://portswigger.net/web-security","free, best web-security labs"],["OWASP Juice Shop","https://owasp.org/www-project-juice-shop/","vulnerable app you run yourself"],["VulnHub","https://www.vulnhub.com/","offline vulnerable VMs"],["picoCTF","https://picoctf.org/","beginner capture-the-flag"],["OverTheWire","https://overthewire.org/wargames/","Linux and security wargames"]]},
 {h:"References & tools",items:[["OWASP Top 10","https://owasp.org/www-project-top-ten/","the core web-risk list"],["MITRE ATT&CK","https://attack.mitre.org/","attacker techniques & detections"],["HackTricks","https://book.hacktricks.xyz/","community pentest wiki"],["GTFOBins","https://gtfobins.github.io/","Linux privesc reference"],["Nmap reference","https://nmap.org/book/man.html","the scanning standard"],["Kali Linux docs","https://www.kali.org/docs/","the tooling distro"],["CyberChef","https://gchq.github.io/CyberChef/","encode/decode/analyse data"]]},
 {h:"Learn & certify",items:[["TryHackMe paths","https://tryhackme.com/paths","structured role paths"],["HTB Academy","https://academy.hackthebox.com/","module-based learning"],["CompTIA Security+","https://www.comptia.org/certifications/security","foundational cert"],["INE eJPT","https://security.ine.com/certifications/ejpt-certification/","entry pentest cert"],["TCM Security PNPT","https://certifications.tcm-sec.com/pnpt/","practical pentest cert"],["OffSec OSCP","https://www.offsec.com/courses/pen-200/","the hands-on standard"],["disclose.io","https://disclose.io/","bug-bounty scope & safe harbour"]]}
];
