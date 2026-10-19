/* Cyber Phase 6: Windows & Active Directory (Weeks 11-12)
   The environment most organisations and government networks run on. Labs you own only. */
export default {

/* ---------- Week 11: Windows internals, PowerShell and local security ---------- */
"w11-1": {
 m: "Most of the world's organisations and government networks run on Windows. Master it and you can both attack and defend where it matters.",
 e: "You've worked mostly in Linux; now you meet Windows properly. Under the hood Windows is organised around processes and services (running programs), the registry (a giant settings database), and the event log (its record of everything that happens). A security person needs to read all three: to spot what's running that shouldn't be, what a program changed, and what the logs reveal. This is the foundation for everything in this phase, and for most real-world defensive work.",
 k: ["Processes and services: what's running, and what starts automatically in the background", "The registry: a hierarchical database of settings (HKLM, HKCU) that malware loves to abuse for persistence", "The Windows Event Log: Security, System and Application logs, the defender's primary record", "Task Manager and Resource Monitor for a first look; deeper tools come next", "Windows versions matter: client (10/11) vs Server, which runs most enterprise services"],
 t: ["Set up a Windows lab VM (a free evaluation image) and snapshot it clean", "Open Task Manager and Services, and identify 5 running services and what they do", "Open the Event Viewer and find the Security log; note a logon event", "Open regedit and find a common autostart location (Run key)", "Write down how Windows differs from Linux in processes, settings and logging"],
 note: "Use a Windows VM you set up yourself. Only ever explore, enumerate or test Windows systems you own or are authorised to test.",
 q: [["What is the Windows registry?", "A hierarchical database storing configuration for the OS, users and applications, organised into hives like HKLM (machine) and HKCU (current user). It's central to how Windows is configured, and a common place attackers establish persistence."],
     ["Why is the Windows Event Log important to a defender?", "It records authentication, process, service and system events, so it's the primary source for detecting and investigating malicious activity on a host."]],
 x: ["Treating Windows like Linux and missing where its settings and logs live", "Testing a Windows system you don't own"],
 d: "You have a Windows lab VM and can navigate its processes, services, registry and event log.",
 min: 55
},
"w11-2": {
 m: "PowerShell is Windows' power tool. Attackers and defenders both live in it, so you must too.",
 e: "PowerShell is a command shell and scripting language built into Windows. Unlike older shells, it works with objects, not just text, so you can query the system precisely: list processes, read the registry, inspect services and users, all programmatically. Defenders use it to gather and harden; attackers use it to enumerate and act (which is why PowerShell logging is a key detection source). Learning it is non-negotiable for Windows security work.",
 k: ["PowerShell commands are 'cmdlets' in Verb-Noun form: Get-Process, Get-Service", "It passes objects down the pipeline, so you can filter and select properties precisely", "Get-Help and Get-Member reveal what any cmdlet and object can do", "It can read the registry, event log, users, services, network, almost everything", "Defenders enable PowerShell script-block logging because attackers use it heavily"],
 t: ["In your Windows VM, run Get-Process and Get-Service and pipe them to filter/sort", "Use Get-LocalUser and Get-LocalGroup to enumerate accounts", "Read a registry key and recent Security event-log entries with PowerShell", "Use Get-Help and Get-Member on a cmdlet to explore it", "Write a one-line command that lists the auto-start services"],
 c: `# PowerShell on YOUR OWN Windows VM
Get-Process | Sort-Object CPU -Descending | Select-Object -First 5
Get-Service | Where-Object Status -eq 'Running'
Get-LocalUser
Get-LocalGroupMember -Group 'Administrators'
Get-WinEvent -LogName Security -MaxEvents 20`,
 note: "Run PowerShell enumeration only on Windows systems you own or are authorised to assess.",
 q: [["What makes PowerShell different from a traditional shell?", "It is object-oriented: cmdlets emit .NET objects rather than plain text, so you can filter, sort and select by properties reliably through the pipeline, instead of parsing strings."],
     ["Why do defenders log PowerShell activity?", "Because attackers use PowerShell extensively for enumeration and execution (living off the land). Script-block and module logging capture what was run, which is vital for detection and investigation."]],
 x: ["Parsing text instead of using object properties", "Forgetting Get-Help/Get-Member when unsure how a cmdlet works"],
 d: "You can enumerate processes, services, users and logs on your Windows VM with PowerShell.",
 min: 55
},
"w11-3": {
 m: "How Windows proves who you are, and where it keeps the proof, is the key to both attacking and defending it.",
 e: "Windows authentication revolves around accounts, groups and the secrets that prove identity. When you log in, Windows stores credential material in memory (in the LSASS process) and uses hashes, not plaintext, for network authentication. Understanding local vs domain accounts, privileged groups like Administrators, User Account Control (UAC), and where credentials live explains both the common attacks (stealing hashes or tokens) and the defences (least privilege, Credential Guard, not reusing admin accounts).",
 k: ["Local accounts live on one machine; domain accounts (next week) are managed centrally", "Privileged groups: Administrators, and the all-powerful SYSTEM context", "UAC separates standard and administrative actions, prompting for elevation", "Credentials in memory: LSASS holds secrets; hashes (NTLM) are used for network auth", "Defences: least privilege, separate admin accounts, Credential Guard, LAPS for local admin passwords"],
 t: ["List local accounts and group memberships on your VM", "Explain the difference between a standard user, a local admin, and SYSTEM", "Describe what UAC does and why 'run as administrator' matters", "Explain in your own words why credentials in memory are a target", "Write the defences that protect Windows credentials"],
 note: "Explore credential and account concepts only on your own Windows VM. Extracting credentials from systems you don't own is unlawful.",
 q: [["What is LSASS and why is it security-relevant?", "The Local Security Authority Subsystem Service handles authentication and holds credential material in memory. It's a target for credential theft, which is why protections like Credential Guard and least privilege matter."],
     ["What is UAC?", "User Account Control: a Windows feature that runs most actions with standard privileges and prompts for consent/elevation before administrative actions, reducing the impact of malware and mistakes."],
     ["How does LAPS improve security?", "The Local Administrator Password Solution randomises and rotates each machine's local admin password and stores it securely, preventing one shared local-admin password from enabling lateral movement across many machines."]],
 x: ["Using a privileged account for everyday tasks", "Assuming hashes are harmless because they aren't the plaintext password"],
 d: "You can explain Windows accounts, privilege levels, UAC and where credentials live, with their defences.",
 min: 55
},
"w11-4": {
 m: "Who can read and change what is decided by permissions. On Windows that means NTFS ACLs, and they're often the way in.",
 e: "Windows controls access with ACLs (Access Control Lists) on files, folders, shares and registry keys: lists of who may do what. Misconfigured permissions, a service binary a normal user can overwrite, a share open to everyone, are a classic local privilege-escalation and lateral-movement path. Reading ACLs and spotting weak ones is both an attacker's enumeration step and a defender's hardening task. You practise on your own VM, pairing each weakness with the correct, least-privilege permission.",
 k: ["ACLs on files, folders, shares and registry keys define allowed actions per user/group", "Weak permissions (world-writable service binaries, loose shares) enable privesc/lateral movement", "icacls and PowerShell (Get-Acl) read and set permissions", "Shares (SMB) extend permissions across the network, so misconfigs spread", "Defence: least privilege, remove 'Everyone' access, protect service and startup paths"],
 t: ["Use Get-Acl / icacls to read permissions on a folder and a service path", "Identify what 'Everyone' or 'Authenticated Users' can do on a share you created", "Explain how a writable service binary leads to privilege escalation", "Tighten one over-permissive ACL to least privilege", "List SMB share hardening steps"],
 c: `# inspect permissions on YOUR OWN Windows VM
Get-Acl 'C:\\Program Files\\SomeApp' | Format-List
icacls 'C:\\Program Files\\SomeApp\\service.exe'
Get-SmbShare; Get-SmbShareAccess -Name 'Data'`,
 note: "Review and change ACLs only on systems you own or are authorised to administer.",
 q: [["How can weak file permissions lead to privilege escalation on Windows?", "If a service runs as SYSTEM but a low-privileged user can overwrite its executable (or a path it loads), that user can replace it with their own code, which then runs as SYSTEM. Least-privilege ACLs prevent this."],
     ["Why are SMB share permissions a common risk?", "Shares expose files across the network, so an over-permissive share (e.g. Everyone: Full Control) lets any user read or modify data and can enable lateral movement. Shares should grant least privilege to specific groups."]],
 x: ["Granting 'Everyone' access to make something 'just work'", "Ignoring permissions on service and startup paths"],
 d: "You can read and harden NTFS/share permissions on your VM and explain how weak ones enable attacks.",
 min: 55
},
"w11-5": {
 m: "To defend a Windows host you must see what's really running on it. Sysinternals gives you X-ray vision.",
 e: "The Sysinternals suite (from Microsoft) is a set of free tools that reveal what Windows hides: Process Explorer shows every process, its parent, and what it loaded; Autoruns shows everything configured to start automatically (a favourite malware persistence spot); TCPView shows network connections. These are indispensable for incident response and for spotting malware. You'll use them on your own VM to build the habit of verifying what's running rather than trusting it.",
 k: ["Process Explorer: processes, parent-child relationships, signatures, loaded modules", "Autoruns: every autostart location (Run keys, services, scheduled tasks), where persistence hides", "TCPView: live network connections per process", "Check digital signatures and parent processes to spot suspicious programs", "These are core incident-response and malware-triage tools"],
 t: ["Run Process Explorer and find an unsigned or unexpected process (there usually isn't one on a clean VM, so note what 'normal' looks like)", "Run Autoruns and review the autostart entries; note the common persistence locations", "Use TCPView to see which processes have network connections", "Explain how a defender uses parent-child process relationships to spot attacks", "Write how you'd triage a 'is this process malicious?' question with these tools"],
 note: "Use Sysinternals on systems you own or are authorised to administer.",
 q: [["What does Autoruns show, and why does it matter?", "Every location Windows uses to start programs automatically: Run keys, services, scheduled tasks, drivers and more. It matters because attackers establish persistence there, so reviewing it is key to finding malware."],
     ["How do parent-child process relationships help detect attacks?", "Many attacks spawn unusual child processes (e.g. a Word document launching PowerShell). Seeing the process tree reveals these suspicious chains that a flat process list would hide."]],
 x: ["Trusting a process by name alone instead of checking signature and parent", "Overlooking scheduled tasks and services as persistence spots"],
 d: "You can use Process Explorer, Autoruns and TCPView to triage what's running on a Windows host.",
 min: 50
},
"w11-6": {
 m: "Windows logs almost everything. Knowing the key events turns that firehose into detection.",
 e: "The Windows Security event log records authentication and privileged activity, and a handful of event IDs power most detection: 4624 (logon), 4625 (failed logon), 4672 (admin logon), 4688 (process creation), 4720 (account created). Learning which events reveal which behaviour lets you spot brute force, suspicious logons and malware execution. This is the bridge into the full blue-team phase: you'll feed these logs into a SIEM and write detections for them.",
 k: ["4624 successful logon, 4625 failed logon, 4634 logoff", "4672 special privileges (admin logon), 4688 process creation (enable it for great visibility)", "4720 user account created, 4728/4732 added to a privileged group", "Logon types tell you how someone logged in (interactive, network, remote)", "Enabling command-line logging with 4688 dramatically improves detection"],
 t: ["Generate failed and successful logons on your VM and find 4625/4624", "Create a local user and find the 4720 event", "Enable process-creation (4688) auditing and generate an event", "Map 3 attacks you've learned to the Windows events that would reveal them", "Make a cheat sheet of the key security event IDs"],
 c: `# query key security events on YOUR OWN VM
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 10  # failed logons
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4624} -MaxEvents 10  # successful logons
Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688} -MaxEvents 10  # process creation`,
 q: [["Which Windows event IDs indicate logon activity?", "4624 is a successful logon, 4625 a failed logon, 4634 a logoff, and 4672 indicates a logon with administrative privileges. Patterns in these reveal brute force and suspicious access."],
     ["Why enable process-creation auditing (event 4688)?", "It records each new process and, when configured, its command line, giving defenders visibility into execution, which is essential for detecting malware and living-off-the-land attacks."]],
 x: ["Not enabling 4688/command-line auditing and missing execution visibility", "Ignoring logon types, which change the meaning of an event"],
 d: "You can find and interpret the key Windows security events and map attacks to them.",
 min: 50
},
"w11-p": {
 m: "Prove you can read a Windows host like a professional: enumerate it, understand it, and note what to harden.",
 e: "Your project is a full security enumeration of your Windows lab VM using PowerShell and Sysinternals: accounts and groups, services and autostarts, permissions on key paths, network connections, and the logging configuration. You'll document what's there, flag anything weak, and write the hardening steps, exactly the baseline review a defender performs on a real host. This sets you up for the Active Directory week.",
 k: ["A documented enumeration of users, services, autostarts, ACLs, connections and logging", "Flag weak permissions, risky autostarts and missing auditing", "Write concrete hardening steps for each", "All on a VM you own"],
 t: ["Enumerate accounts, groups, services and autostarts with PowerShell/Sysinternals", "Review permissions on service paths and any shares", "Check which security auditing is enabled and what's missing", "Flag every weakness and write its fix", "Produce a one-page Windows host review with findings and hardening"],
 note: "Perform this review only on your own Windows VM.",
 q: [["What would you check in a baseline security review of a Windows host?", "Local accounts and privileged group membership, running services and autostart entries, permissions on service/startup paths and shares, network connections, patch level, and the audit/logging configuration, flagging weaknesses and recommending hardening."],
     ["Name three quick Windows hardening wins.", "Use least privilege with separate admin accounts (and LAPS for local admin), enable process-creation/command-line auditing, and remove unnecessary services, shares and over-permissive ACLs."]],
 x: ["Listing findings with no hardening recommendations", "Reviewing a host you don't own"],
 d: "You've produced a documented security review of your Windows VM with findings and hardening steps.",
 min: 120
},

/* ---------- Week 12: Active Directory - attacks and defences ---------- */
"w12-1": {
 m: "Active Directory runs the identity of almost every enterprise and government network. Understand it and you understand the real battleground.",
 e: "Active Directory (AD) is Microsoft's system for managing users, computers and permissions across a whole organisation from central servers called domain controllers. Instead of logging into one machine, you log into a domain, and AD decides what you can access everywhere. It's organised into domains and forests, with Organisational Units (OUs) and Group Policy (GPOs) applying settings at scale, and uses the Kerberos protocol for authentication. Because AD controls everything, it's the prime target in real intrusions, and the prime thing to defend.",
 k: ["Domain controllers (DCs) hold the directory and authenticate the whole domain", "Domains, trees and forests: how organisations are structured and linked", "OUs organise objects; Group Policy (GPOs) applies settings/security at scale", "Kerberos is the main authentication protocol (tickets, not passwords, on the wire)", "Compromising AD (especially a Domain Admin or the DC) usually means owning the network"],
 t: ["Read how domains, forests, OUs and GPOs fit together", "Explain in your own words why the domain controller is the crown jewel", "Describe at a high level how Kerberos authentication works (tickets)", "List what a Domain Admin can do, and why that account must be protected", "Sketch a simple org as an AD structure (domain, OUs, groups)"],
 q: [["What is Active Directory and why is it a high-value target?", "A directory service that centrally manages users, computers and access across an organisation via domain controllers. Because it governs authentication and authorisation everywhere, compromising it (especially Domain Admin or a DC) typically grants control of the entire network."],
     ["What is the role of a domain controller?", "A server that stores the AD database and authenticates users and computers in the domain, enforcing policies. Its compromise is effectively a full domain compromise."],
     ["What is Group Policy?", "A mechanism to apply configuration and security settings to users and computers across the domain centrally, from password policies to software restrictions."]],
 x: ["Thinking AD is just 'user accounts' rather than the control plane of the network", "Underestimating how one over-privileged account endangers everything"],
 d: "You can explain AD's structure, the role of domain controllers and Kerberos, and why AD is the key target.",
 min: 55
},
"w12-2": {
 m: "You can't practise AD safely on someone else's network. So you build your own tiny domain, and own it.",
 e: "To learn AD attacks and defences legally, you build a small lab domain you fully own: a domain controller VM and a joined workstation. This mirrors a real (if tiny) enterprise and lets you enumerate, attack and defend with zero authorisation worries. Setting it up also teaches you how AD is actually deployed, which is valuable for defensive and administrative roles. Snapshot everything so you can reset after each experiment.",
 k: ["A lab domain = a domain controller VM + at least one joined workstation, all isolated", "Promoting a server to a DC creates the domain; then you join a client to it", "Create a few users and groups, including a privileged one, to practise with", "Keep it isolated (host-only/internal) and snapshot each VM", "You own it, so every attack and defence is legal"],
 t: ["Build a Windows Server VM and promote it to a domain controller (create a lab domain)", "Join a Windows client VM to the domain", "Create several users and a couple of groups, including a privileged account", "Isolate the lab network and snapshot all VMs clean", "Log in as a domain user from the client to confirm it works"],
 note: "Build and attack only your own lab domain. Never touch an organisation's real Active Directory without written authorisation.",
 q: [["Why build your own AD lab to learn AD security?", "Because practising AD attacks requires a domain you're authorised to test; a personal lab domain you own gives unlimited legal practice that also teaches real deployment and defence."],
     ["What are the minimum components of an AD lab?", "At least one domain controller (holding the directory and authenticating the domain) and one domain-joined client, on an isolated network, ideally with a few users and groups to experiment with."]],
 x: ["Exposing the lab domain to a real network", "Not snapshotting before experiments, making cleanup painful"],
 d: "You have an isolated lab AD domain (DC + joined client) with users, groups and clean snapshots.",
 min: 90
},
"w12-3": {
 m: "In AD, the fastest path to the crown jewels is rarely an exploit, it's a chain of permissions. Attack paths reveal it.",
 e: "Attackers rarely brute-force AD; they enumerate it and follow relationships, who is an admin where, which account can reset whose password, which machine a privileged user logs into. BloodHound is a tool that maps these relationships into attack paths, showing the shortest route from a normal user to Domain Admin. Run against your own lab, it's an eye-opener and, crucially, a defensive tool: it shows you the paths to cut. Defenders increasingly use it to find and remove dangerous permissions before attackers do.",
 k: ["AD attacks follow relationships and permissions, not just vulnerabilities", "BloodHound collects AD data and graphs attack paths to privileged accounts", "Common dangerous relationships: nested group membership, excessive ACLs, admins logged into many hosts", "Defenders use BloodHound to find and remove these paths (attack-path management)", "Least privilege and tiered administration shrink the graph dramatically"],
 t: ["Run BloodHound's collector against your own lab domain", "Explore the graph and find a path from a low-privileged user toward Domain Admin", "Identify the single relationship that, if removed, breaks the path", "Explain how nested groups and excessive ACLs create these paths", "Write the defensive changes that would shorten the attack graph"],
 note: "Run BloodHound and all AD enumeration only against your own lab domain or an authorised engagement.",
 q: [["What does BloodHound do?", "It collects Active Directory objects and relationships and graphs them to reveal attack paths, the chains of group memberships, permissions and sessions that lead from a low-privileged account to high-privilege targets like Domain Admin."],
     ["How do defenders use attack-path mapping?", "To find and remove the dangerous relationships (excessive ACLs, nested privileged groups, admins exposed on many hosts) before attackers can follow them, implementing least privilege and tiered administration."]],
 x: ["Treating BloodHound as only an attacker tool and missing its defensive value", "Running collectors on domains you don't own"],
 d: "You can map and interpret an AD attack path in your lab and identify the change that breaks it.",
 min: 60
},
"w12-4": {
 m: "A few classic AD attacks come up again and again. Understand them, and their defences, and you understand enterprise security.",
 e: "Several well-known AD techniques exploit how authentication works, and you'll study them on your own lab, each paired with its defence. Kerberoasting requests service tickets and cracks them offline to recover service-account passwords (defence: strong, long service passwords and gMSAs). AS-REP roasting targets accounts with pre-auth disabled (defence: require pre-auth). Pass-the-hash reuses a stolen NTLM hash without the password (defence: least privilege, Credential Guard, no shared local admin). The point is not tricks but the pattern: protect privileged credentials and configuration.",
 k: ["Kerberoasting: crack service-account tickets offline; defend with strong passwords / gMSAs", "AS-REP roasting: abuse accounts without Kerberos pre-auth; defend by requiring pre-auth", "Pass-the-hash: reuse an NTLM hash to authenticate; defend with least privilege and Credential Guard", "A theme: privileged and service accounts are the targets, so protect them hardest", "Monitoring (e.g. abnormal ticket requests, logons) detects these even when prevention lapses"],
 t: ["On your lab, demonstrate Kerberoasting against a service account you created", "Explain exactly why strong service passwords or gMSAs defeat it", "Describe AS-REP roasting and the one setting that prevents it", "Explain pass-the-hash and the defences that stop lateral movement", "For each attack, write both the prevention and the detection"],
 note: "Perform these techniques only inside your own lab domain. Running them against any real domain without written authorisation is a serious crime.",
 q: [["What is Kerberoasting and how is it prevented?", "An attacker requests Kerberos service tickets for service accounts and cracks them offline to recover the account passwords. It's prevented with long, random service passwords or group Managed Service Accounts (gMSAs), and detected by monitoring abnormal service-ticket requests."],
     ["What is pass-the-hash?", "Authenticating with a stolen NTLM password hash instead of the plaintext password, enabling lateral movement. Defences include least privilege, not reusing local admin passwords (LAPS), and Credential Guard."]],
 x: ["Memorising the attacks without their defences", "Running any of this outside your own lab"],
 d: "You can demonstrate one classic AD attack in your lab and state both its prevention and its detection.",
 min: 60
},
"w12-5": {
 m: "If attackers love AD, defenders must love it more. Hardening AD is some of the highest-impact security work there is.",
 e: "Defending AD is a discipline of its own and a core national-security skill, because government and critical-infrastructure networks run on it. The big levers: a tiered administration model (separate accounts for workstations, servers and domain control, never reused), least privilege (shrinking those attack graphs), protecting and monitoring the domain controllers, LAPS for local admin passwords, strong Kerberos configuration, and detection for the classic attacks. You'll take your lab findings and write a concrete AD hardening plan mapped to Microsoft's guidance.",
 k: ["Tiered admin model: Tier 0 (domain control) accounts never log into lower tiers", "Least privilege: remove excessive group memberships and ACLs (shrink the BloodHound graph)", "Protect domain controllers: patch, restrict access, monitor closely", "LAPS for unique local admin passwords; gMSAs for service accounts", "Detection: alert on suspicious ticket requests, privileged logons and group changes"],
 t: ["Write a tiered-administration plan for your lab domain", "List the excessive permissions/memberships you'd remove and why", "Describe how you'd protect and monitor the domain controller", "Map each classic attack from yesterday to a prevention and a detection", "Produce an AD hardening checklist aligned to Microsoft's guidance"],
 q: [["What is the tiered administration model in AD?", "A model that separates administrative accounts by tier, Tier 0 for domain controllers/AD, Tier 1 for servers, Tier 2 for workstations, and forbids using higher-tier credentials on lower-tier systems, so a compromised workstation can't expose domain-admin credentials."],
     ["Name three high-impact AD hardening measures.", "Implement tiered administration with least privilege, protect and monitor domain controllers, and use LAPS (unique local admin passwords) and gMSAs (managed service accounts), backed by detection for privileged logons and abnormal Kerberos activity."]],
 x: ["Reusing domain-admin credentials on ordinary workstations", "Hardening without also building detection for when prevention fails"],
 d: "You can write an AD hardening plan (tiering, least privilege, DC protection, detection) for your lab.",
 min: 55
},
"w12-6": {
 m: "AD attack and defence come alive when you watch an attack happen and then catch it in the logs.",
 e: "To tie the week together, you'll run an AD attack in your lab and then find it from the defender's side: the Windows security events and domain-controller logs it generates. This is the exact offence-to-defence loop that defines modern security work. Seeing which event IDs and patterns reveal Kerberoasting, suspicious logons or group changes prepares you directly for the SOC and detection-engineering phase that follows.",
 k: ["Every AD attack leaves traces in Windows/DC logs if auditing is configured", "Kerberoasting shows as unusual service-ticket (4769) requests", "Suspicious logons (4624/4625/4672) and privileged group changes (4728/4732) are red flags", "Centralising DC logs is how real orgs watch the domain", "This is the bridge to SIEM and detection engineering next phase"],
 t: ["Run an AD attack from your lab (e.g. Kerberoasting) and capture it", "Find the relevant events on the domain controller", "Identify the pattern that distinguishes the attack from normal activity", "Write a plain-English detection idea for it", "Note which auditing settings must be on for this to be visible"],
 note: "Run the attack and inspect logs only within your own lab domain.",
 q: [["Which log activity can reveal Kerberoasting?", "A spike or unusual pattern of Kerberos service-ticket requests (event 4769), especially for many service accounts or with weak encryption types, from a single source, distinguishes it from normal activity."],
     ["Why is centralising domain-controller logs important?", "DCs authenticate the whole domain, so their logs reveal domain-wide attacks; centralising them into a SIEM lets defenders correlate and detect activity that no single host would show, and preserves evidence if a DC is compromised."]],
 x: ["Attempting detection without the necessary auditing enabled", "Doing any of this outside your own lab"],
 d: "You've run an AD attack in your lab and identified the logs and pattern that detect it.",
 min: 55
},
"w12-p": {
 m: "Deliver the real thing: an AD attack-path assessment of your own domain, with Microsoft-aligned defences.",
 e: "Your project is an Active Directory security assessment of your lab domain: map attack paths with BloodHound, demonstrate one classic attack, and write a report that pairs every finding with its specific, Microsoft-recommended defence and a detection idea. This is precisely the work that protects enterprises and national networks, and it's a standout portfolio piece that shows you understand the most important environment in enterprise security.",
 k: ["Attack-path mapping + one demonstrated attack, all in your own lab domain", "Each finding paired with prevention AND detection", "Defences aligned to Microsoft/industry guidance (tiering, least privilege, LAPS, gMSAs)", "A professional report suitable for your portfolio"],
 t: ["Map your lab domain's attack paths with BloodHound and pick the key findings", "Demonstrate one classic AD attack safely in the lab", "For each finding, write the specific defence and a detection", "Summarise an AD hardening plan (tiering, least privilege, DC protection)", "Write it up as a professional AD security assessment report"],
 note: "Assess only your own lab domain. These techniques never apply to a real organisation's AD without written authorisation.",
 q: [["Walk me through an Active Directory security assessment.", "Enumerate the domain and map attack paths (e.g. with BloodHound), identify dangerous permissions and exposures, demonstrate representative attacks in scope, then report each finding with a specific defence (tiering, least privilege, LAPS/gMSAs, DC protection) and a detection, mapped to industry guidance."],
     ["Why is Active Directory expertise valuable for national-security roles?", "Because government, defence and critical-infrastructure networks overwhelmingly run on AD; being able to find and close its attack paths, and detect attacks against it, directly protects the most important systems."]],
 x: ["Findings without paired defences and detections", "Assessing a real domain instead of your own lab"],
 d: "You've produced an AD attack-path assessment report on your lab domain with a defence and detection for each finding.",
 min: 150
}
};
