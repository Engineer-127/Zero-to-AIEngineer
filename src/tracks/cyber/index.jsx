import { PHASES, R, WEEKS, LIB } from "./roadmap.js";
import p1 from "./lessons/p1.js";
import p2 from "./lessons/p2.js";
import p3 from "./lessons/p3.js";
import p4 from "./lessons/p4.js";
import p5 from "./lessons/p5.js";
import p6 from "./lessons/p6.js";
import p7 from "./lessons/p7.js";

const STEPS = [
  { name: "Recon", desc: "Learn what the target reveals publicly (OSINT), on an authorised scope.", phase: "Phase 3", c: "#B38A00" },
  { name: "Scanning", desc: "Map hosts, ports and services on a machine you own.", phase: "Phase 3", c: "#B38A00" },
  { name: "Web & Exploitation", desc: "Find and understand flaws on labs built for learning.", phase: "Phase 4–5", c: "#0A8CB0" },
  { name: "Privilege escalation", desc: "Turn a foothold into full control, on your own VMs.", phase: "Phase 5", c: "#5C9A12" },
  { name: "Report & remediate", desc: "Write findings and the fix for every weakness.", phase: "Phase 7", c: "#7648E0" },
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
        <b>And always the other side: Blue Team</b>
        <span>Detect and respond to every attack you learn (Phase 6). Foundations: law &amp; ethics, a safe lab, networking &amp; Linux (Phases 1–2).</span>
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
];

export default {
  id: "cyber",
  label: "Ethical Hacking & Cyber Security",
  shortLabel: "Cyber Security",
  title: "Zero to Ethical Hacker",
  storageKey: "zero-to-ethical-hacker-v1",
  lede: "A 12-week, 84-day path into ethical hacking and cyber security, taught the legal way. You build a safe lab on your own computer, then learn reconnaissance, networking, web hacking, exploitation, privilege escalation and, just as importantly, defence, all on machines you own or official training labs. Every attack is paired with its fix. The rule throughout: only ever test systems you own or have written permission to test.",
  banner: "This path is strictly ethical and legal. You only ever practise on systems you own (your own lab VMs), on official training platforms (TryHackMe, Hack The Box, PortSwigger), or on in-scope bug-bounty targets. Accessing, scanning or attacking any other system without written permission is a crime, including under India's IT Act, 2000 and the US CFAA. This roadmap will not help you attack systems you are not authorised to test.",
  pace: [
    ["Steady", "84 days", "about 1.5 hours a day, one lesson a day"],
    ["Deep", "16 weeks", "add extra lab machines and CTFs to each week"],
  ],
  mapTitle: "How an ethical hacker works",
  mapIntro: "A real assessment follows a lifecycle, always inside an authorised scope, and a professional learns the defence for every attack. You'll build each stage in order, then learn to detect it all.",
  Map: CyberMap,
  glossary: GLOSSARY,
  bankHint: 'Every interview question from every lesson, with model answers. Filter by phase or search a topic like "IDOR", "privilege escalation" or "MITRE".',
  doneMessage: "Keep practising legally: CTFs, your certification, and in-scope bug bounties. Stay in scope, always.",
  rules: [
    ["Authorisation first, always.", "Only ever test systems you own or have written permission to test. This is the whole job, and the law."],
    ["Learn the fix, not just the flaw.", "For every attack, write the defence. A hacker who can also harden is worth far more."],
    ["Build and break your own lab.", "Your VMs are unlimited legal targets. Snapshot, break, restore, repeat."],
    ["Document everything.", "Reproducible notes become reports and prove you stayed in scope."],
    ["Most jobs are defensive.", "Blue-team skills, logs, SIEM, incident response, are where the hiring is. Don't skip Phase 6."],
    ["Stay in scope on real targets.", "On bug-bounty programs, test only in-scope assets under their rules. Out-of-scope is a crime."],
  ],
  PHASES,
  WEEKS,
  R,
  LIB,
  LESSONS: { ...p1, ...p2, ...p3, ...p4, ...p5, ...p6, ...p7 },
};
