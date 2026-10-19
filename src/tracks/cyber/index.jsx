import { PHASES, R, WEEKS, LIB } from "./roadmap.js";
import p1 from "./lessons/p1.js";
import p2 from "./lessons/p2.js";
import p3 from "./lessons/p3.js";
import p4 from "./lessons/p4.js";
import p5 from "./lessons/p5.js";
import p6 from "./lessons/p6.js";
import p7 from "./lessons/p7.js";
import p8 from "./lessons/p8.js";
import p9 from "./lessons/p9.js";
import p10 from "./lessons/p10.js";
import p11 from "./lessons/p11.js";
import p12 from "./lessons/p12.js";
import p13 from "./lessons/p13.js";

const STEPS = [
  { name: "Attack", desc: "Recon, scanning, web, exploitation, privesc, Active Directory, on labs you own.", phase: "Phases 3–6", c: "#B38A00" },
  { name: "Detect", desc: "SOC, SIEM, detection engineering and threat hunting.", phase: "Phase 7", c: "#0E9468" },
  { name: "Investigate", desc: "DFIR, malware analysis and threat intelligence.", phase: "Phases 8–9", c: "#0A8CB0" },
  { name: "Defend at scale", desc: "Network defense, cryptography, cloud and critical infrastructure.", phase: "Phases 9–11", c: "#2F68E0" },
  { name: "Report & grow", desc: "Capstone, reporting, certifications and a national-security career.", phase: "Phase 13", c: "#C13584" },
];

function CyberMap() {
  return (
    <div className="mern-map">
      <div className="lab-note" role="note">
        <b>⚖ The one rule, on every step:</b> only ever test systems you own or are given written permission to test.
        Everything in this path happens on your own lab VMs, official training labs (TryHackMe, Hack The Box, PortSwigger),
        or in-scope bug-bounty targets. Unauthorised access to any other system is a crime.
      </div>
      <div className="flow flow5" role="list" aria-label="The ethical hacking lifecycle">
        {STEPS.map((s, i) => (
          <div className="flow-step" role="listitem" key={s.name} style={{ "--pc": s.c }}>
            <div className="flow-card">
              <span className="flow-letter" aria-hidden="true">{i + 1}</span>
              <div className="flow-text">
                <b>{s.name}</b>
                <span>{s.desc}</span>
                <em>{s.phase}</em>
              </div>
            </div>
            {i < STEPS.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="foundation">
        <b>Offence and defence, every step</b>
        <span>You learn to attack, then to detect and prevent each attack. Foundations: law &amp; ethics, a safe lab, networking &amp; Linux (Phases 1–2), building to a full capstone and a career.</span>
      </div>
    </div>
  );
}

const GLOSSARY = [
  ["Ethical hacker", "Someone who tests systems for weaknesses with the owner's written permission, to help fix them."],
  ["Authorisation", "Written permission from the owner to test a system. Without it, testing is a crime."],
  ["Scope", "The exact systems you're allowed to test. Everything else is off-limits."],
  ["Red team", "The offensive side: simulating attacks to find weaknesses (with permission)."],
  ["Blue team", "The defensive side: detecting, preventing and responding to attacks. Most jobs are here."],
  ["Vulnerability", "A weakness in a system that could be exploited."],
  ["Exploit", "Code or steps that take advantage of a vulnerability."],
  ["Payload", "What an exploit delivers or runs after it succeeds, often a shell."],
  ["CVE", "A public identifier for a specific known vulnerability."],
  ["CIA triad", "Confidentiality, Integrity, Availability: the three core goals of security."],
  ["Lab / VM", "Virtual machines on your own computer that you own and may freely attack."],
  ["Kali Linux", "A Linux system preloaded with security tools, used as the attacker machine."],
  ["Reconnaissance", "Gathering information about a target before testing it."],
  ["OSINT", "Open-Source Intelligence: information gathered from public sources."],
  ["Enumeration", "Investigating a service in depth to find what it exposes."],
  ["Port", "A numbered 'door' on a machine where a service listens (80 = web, 22 = SSH)."],
  ["Nmap", "The standard tool for scanning hosts, ports and services."],
  ["OWASP Top 10", "The industry's list of the most common web application security risks."],
  ["SQL injection", "Tricking a database by injecting input that changes a query's meaning."],
  ["XSS", "Cross-site scripting: injecting script that runs in another user's browser."],
  ["IDOR", "Accessing other users' data by changing an id, when the server doesn't check ownership."],
  ["Privilege escalation", "Turning low-level access into full admin/root control."],
  ["Shell", "Interactive command-line access to a machine."],
  ["Hash", "A one-way scramble of data; passwords should be stored as salted hashes."],
  ["MFA", "Multi-factor authentication: a second factor beyond a password."],
  ["Least privilege", "Giving each user or program only the access it needs. A core defence."],
  ["SIEM", "A system that collects logs and alerts on suspicious activity."],
  ["MITRE ATT&CK", "A shared catalogue of attacker techniques and how to detect them."],
  ["Incident response", "The structured process of handling a security breach."],
  ["Bug bounty", "A program that authorises testing of specified (in-scope) systems for rewards."],
  ["Safe harbour", "A promise not to take legal action against good-faith, in-scope researchers."],
  ["CTF", "Capture the Flag: a legal security puzzle competition for practice."],
  ["Active Directory", "Microsoft's system for managing users and computers across an organisation. The backbone of most enterprise and government networks."],
  ["Detection engineering", "Writing and tuning the rules that turn logs into alerts."],
  ["Threat hunting", "Proactively searching for attackers that no alert has caught."],
  ["DFIR", "Digital Forensics and Incident Response: investigating and recovering from breaches."],
  ["Forensics", "Collecting and analysing digital evidence soundly enough to be trusted."],
  ["Malware analysis", "Safely studying malicious software (in isolation) to detect and defend against it."],
  ["IOC", "Indicator of Compromise: an artefact (like a hash or IP) that signals a possible breach."],
  ["Threat intelligence", "Evidence-based knowledge about attackers, used to focus defences."],
  ["TTPs", "Tactics, Techniques and Procedures: how an adversary operates (harder to change than IOCs)."],
  ["Segmentation", "Dividing a network into zones so a breach in one can't reach the others."],
  ["Cryptography", "The maths that keeps data secret (encryption) and tamper-evident (hashing, signatures)."],
  ["PKI", "Public Key Infrastructure: certificates and authorities that let your browser trust a website."],
  ["Cloud security", "Securing what you run on rented infrastructure; most breaches are misconfiguration."],
  ["OT / ICS", "Operational Technology / Industrial Control Systems: the computers that run power, water and factories."],
  ["Social engineering", "Tricking people (e.g. phishing) into granting access. The top cause of real breaches."],
  ["CERT-In", "India's national computer emergency response team."],
  ["NIST CSF", "A widely used framework for managing cybersecurity risk (Identify, Protect, Detect, Respond, Recover)."],
];

export default {
  id: "cyber",
  label: "Ethical Hacking & Cyber Security",
  shortLabel: "Cyber Security",
  title: "Zero to Ethical Hacker",
  storageKey: "zero-to-ethical-hacker-v1",
  lede: "A 24-week, 168-day masterclass that takes you from your first legal lab to defending organisations and national infrastructure. You learn the whole field, and feel the thrill of real ethical hacking at every step: foundations, networking and Linux, recon, web hacking, exploitation, Windows and Active Directory, then the defensive heart of the job, SOC and detection engineering, DFIR and malware analysis, threat intelligence and network defense, cryptography, cloud and critical-infrastructure (OT/ICS) security, the human layer, and a full capstone and career plan. Every attack is paired with its defence. The rule throughout: only ever test systems you own or have written permission to test.",
  banner: "This path is strictly ethical and legal. You only ever practise on systems you own (your own lab VMs), on official training platforms (TryHackMe, Hack The Box, PortSwigger, CyberDefenders), or on in-scope bug-bounty targets, and malware only inside an isolated lab. Accessing, scanning or attacking any other system without written permission is a crime, including under India's IT Act, 2000 and the US CFAA. This roadmap builds defenders; it will not help anyone attack systems they are not authorised to test.",
  pace: [
    ["Steady", "168 days", "about 1.5 hours a day, one lesson a day"],
    ["Deep", "~32 weeks", "add extra lab machines, CTFs and a certification alongside"],
  ],
  mapTitle: "The arc of the masterclass",
  mapIntro: "You learn to attack like a professional, then to detect, investigate and prevent every attack, always inside an authorised scope, building toward a full capstone engagement and a career defending what matters.",
  Map: CyberMap,
  glossary: GLOSSARY,
  bankHint: 'Every interview question from every lesson, with model answers. Filter by phase or search a topic like "IDOR", "Kerberoasting", "MITRE", "SIEM" or "OT/ICS".',
  doneMessage: "Keep practising legally: CTFs, your certification, and in-scope bug bounties. Stay in scope, always, for your whole career.",
  rules: [
    ["Authorisation first, always.", "Only ever test systems you own or have written permission to test. This is the whole job, the law, and a national-security qualification."],
    ["Learn the fix, not just the flaw.", "For every attack, write the detection and the prevention. A hacker who can also defend is worth far more."],
    ["Build and break your own lab.", "Your VMs (and your own AD domain) are unlimited legal targets. Snapshot, break, restore, repeat."],
    ["Document everything.", "Reproducible notes become reports and prove you stayed in scope."],
    ["Most jobs, and most national-security work, are defensive.", "SOC, detection, DFIR, threat intel and OT defence are where the impact and hiring are. Don't skip the blue-team phases."],
    ["Stay in scope on real targets.", "On bug-bounty programs, test only in-scope assets under their rules. Out-of-scope is a crime."],
  ],
  PHASES,
  WEEKS,
  R,
  LIB,
  LESSONS: { ...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7, ...p8, ...p9, ...p10, ...p11, ...p12, ...p13 },
};
