/* Cyber Phase 12: Wireless, Mobile & Social Engineering (Week 22)
   The remaining attack surface, and the number-one breach cause: people. Consent and ownership only. */
export default {

/* ---------- Week 22: Wireless, mobile and the human layer ---------- */
"w22-1": {
 m: "Wi-Fi is a door into the network that travels through walls. Securing it (and testing only your own) matters.",
 e: "Wireless networks extend the network into the air, which means attacks don't need physical access to a cable. Modern Wi-Fi security (WPA2/WPA3) protects traffic with strong encryption, but weak passphrases, old protocols (WEP/WPA), and misconfigured guest or enterprise setups create risk. You'll learn how Wi-Fi security works and its common weaknesses, testing only your own network, and focus on the defensive takeaways: strong WPA3/WPA2 configuration, strong passphrases, and network segmentation.",
 k: ["Wi-Fi security evolved WEP (broken) -> WPA/WPA2 -> WPA3 (current best)", "WPA2/WPA3 encrypt traffic; weak passphrases and old protocols undermine them", "Enterprise Wi-Fi (802.1X) authenticates per-user, stronger than a shared password", "Risks: weak passphrases, WEP/WPA, rogue access points, open guest networks", "Defences: WPA3/WPA2 with strong passphrases, segmentation, disable legacy protocols"],
 t: ["Explain the evolution from WEP to WPA3 and why WEP is broken", "Describe how a weak passphrase undermines strong encryption", "Explain the difference between personal (PSK) and enterprise (802.1X) Wi-Fi", "List Wi-Fi defences for a home and an office", "Note why you only ever test your own wireless network"],
 note: "Test wireless security only on networks you own. Capturing, deauthenticating or cracking Wi-Fi you don't own is unlawful interception and unauthorised access.",
 q: [["Why is WEP considered broken?", "Its design has fundamental cryptographic weaknesses (weak IVs and key handling) that allow the key to be recovered quickly from captured traffic, so it provides no real protection and must never be used."],
     ["What's the difference between WPA2/WPA3 Personal and Enterprise?", "Personal uses a single shared passphrase (PSK) for everyone; Enterprise (802.1X) authenticates each user individually against a server, giving per-user credentials, revocation and stronger access control."]],
 x: ["Testing Wi-Fi networks you don't own", "Relying on a weak passphrase with strong encryption"],
 d: "You can explain Wi-Fi security, its common weaknesses, and the defences, on your own network only.",
 min: 50
},
"w22-2": {
 m: "Attacking Wi-Fi hands-on teaches you how weak keys fall, do it only on the network in your own home.",
 e: "On your own Wi-Fi, you can see why strong passphrases matter: capturing the WPA handshake and attempting to crack it offline (with Aircrack-ng and a wordlist) shows that a weak passphrase falls quickly while a strong one resists. The lesson is defensive: length and unpredictability of the passphrase decide everything, and WPA3 strengthens this further. You'll run this only against your own access point, understanding both the technique and exactly why a strong passphrase defeats it.",
 k: ["The WPA handshake can be captured and cracked offline with a wordlist", "A weak/common passphrase falls fast; a long random one is infeasible to crack", "WPA3 adds protection against offline cracking of the handshake", "Aircrack-ng is the standard toolkit (use only on your own network)", "Defence: long, random passphrases; WPA3; and per-user enterprise auth where possible"],
 t: ["On your OWN Wi-Fi, capture the WPA handshake with the appropriate tools", "Attempt to crack it with a wordlist and observe the result", "Explain why a long, random passphrase defeats this attack", "Note how WPA3 improves resistance to offline cracking", "Write the passphrase/config guidance you'd give a home or small office"],
 c: `# ONLY against your OWN access point, with your own consent
# (conceptual workflow with Aircrack-ng)
# 1. capture the WPA handshake on your network
# 2. attempt offline crack with a wordlist:
aircrack-ng -w wordlist.txt -b <YOUR_AP_BSSID> capture.cap
# lesson: a long random passphrase makes this computationally infeasible`,
 note: "Only ever capture or crack the Wi-Fi handshake of a network you own. Doing this to any other network is a crime.",
 q: [["How does offline WPA cracking work, and what defeats it?", "An attacker captures the WPA handshake and tries passphrase guesses offline against it. A long, random passphrase makes the search space infeasible, and WPA3 further hardens the handshake against offline guessing."],
     ["Why is Wi-Fi testing strictly limited to your own network?", "Capturing or attacking the Wi-Fi of networks you don't own is unauthorised interception and access, a criminal offence, regardless of intent."]],
 x: ["Testing any Wi-Fi other than your own", "Concluding weak passphrases are fine because 'it took a while'"],
 d: "You can explain and (on your own network) demonstrate WPA cracking, and why a strong passphrase defeats it.",
 min: 50
},
"w22-3": {
 m: "Your phone is a computer full of secrets. Mobile app security is where a lot of that data leaks.",
 e: "Mobile apps handle sensitive data and run on devices people carry everywhere, so their security matters. OWASP's Mobile Application Security project (MASVS/MASTG) catalogues the key risks: insecure data storage, weak transport security, poor authentication, and platform misuse. You'll learn the common mobile weaknesses and their defences at a conceptual and testing level, focusing on how data should be stored and transmitted, essential for anyone assessing or building the apps that increasingly front government and banking services.",
 k: ["Mobile risks (OWASP MASVS): insecure storage, weak transport, poor auth, platform misuse", "Insecure storage: secrets or PII saved unprotected on the device", "Transport: all traffic must use TLS; beware certificate issues", "Platform misuse: misusing permissions, insecure IPC, exposed components", "Defence: encrypt sensitive storage, enforce TLS, least-privilege permissions"],
 t: ["List OWASP's main mobile risk categories", "Explain why insecure local storage is dangerous on a lost/stolen device", "Describe why mobile apps must enforce TLS for all traffic", "Explain 'platform misuse' with a permissions example", "Note how you'd test a mobile app you own for these issues"],
 note: "Test mobile apps only if you own them or are authorised to test them, on devices/emulators you control.",
 q: [["What are common mobile application security risks?", "Insecure data storage (unprotected secrets/PII on the device), insecure transport (missing or weak TLS), weak authentication/session handling, and platform misuse (excess permissions, insecure inter-process communication), as catalogued by OWASP MASVS."],
     ["Why is insecure local storage especially risky on mobile?", "Phones are easily lost or stolen and may be examined; if sensitive data or secrets are stored unencrypted, anyone with the device (or malware on it) can read them, so sensitive data must be encrypted and minimised."]],
 x: ["Assuming mobile apps are safe because they run in a sandbox", "Testing apps you don't own"],
 d: "You can describe the main mobile security risks and their defences.",
 min: 50
},
"w22-4": {
 m: "The most reliable way into any organisation isn't a zero-day. It's an email that fools a person.",
 e: "Social engineering manipulates people into granting access or revealing information: phishing (deceptive emails/links), pretexting (a convincing false story), vishing (phone), and more. It's behind a huge share of real breaches because it bypasses technical controls entirely. Understanding how these attacks work, ethically and conceptually, is essential to defending against them. The emphasis here is defensive: recognising the techniques so you can build awareness and controls, never to deceive real people without authorisation.",
 k: ["Social engineering exploits trust, urgency, authority and helpfulness", "Phishing (email/link), spear-phishing (targeted), pretexting, vishing, smishing", "It bypasses technical defences by targeting people directly", "It causes a large share of real-world breaches", "Study it to defend: recognise, train against, and build controls"],
 t: ["List the main social-engineering techniques and the emotion each exploits", "Explain why social engineering bypasses technical controls", "Describe the signs that help someone spot a phishing email", "Note the difference between studying this to defend vs to deceive", "Explain why authorisation is required to run any real phishing test"],
 note: "Never run social-engineering attacks against real people without explicit authorisation. Study the techniques to defend, and only simulate phishing against your own accounts or with documented consent.",
 q: [["Why is social engineering so effective?", "It targets human psychology, trust, urgency, authority, fear, helpfulness, bypassing technical controls entirely. People, not systems, are manipulated into granting access or revealing information."],
     ["What defends against phishing?", "A combination: user awareness training, email filtering and authentication (SPF/DKIM/DMARC), MFA (so stolen passwords alone fail), clear reporting channels, and least privilege to limit the impact of a successful lure."]],
 x: ["Running phishing or pretexting against real people without authorisation", "Thinking technical controls alone stop social engineering"],
 d: "You can explain social-engineering techniques and the defences, with the ethics of testing them.",
 min: 50
},
"w22-5": {
 m: "You can't patch people, but you can prepare them. Awareness is the control that stops social engineering.",
 e: "Since people are the target, the defence is building a security-aware culture: realistic training, safe phishing simulations (only with consent/authorisation), clear reporting so staff flag suspicious messages, and policies that reduce the damage of a slip (MFA, least privilege). Phishing simulation tools like Gophish let organisations test and train their own staff ethically. You'll learn to design an awareness program that actually changes behaviour, measured by reporting rates and resilience, not by blaming people.",
 k: ["Awareness training + safe, authorised phishing simulation + easy reporting", "Gophish simulates phishing for your OWN organisation (with consent)", "Measure resilience (report rate), don't just shame click rates", "Back it with controls: MFA, least privilege, email authentication", "Culture over blame: make it safe and quick to report mistakes"],
 t: ["Outline a security-awareness program (training, simulation, reporting, policy)", "Explain why phishing simulation needs authorisation/consent", "Describe the metrics that show a program is working (reporting, resilience)", "Explain why blaming users is counterproductive", "Note the technical controls that back up awareness (MFA, least privilege)"],
 note: "Run phishing simulations only against your own organisation/accounts with documented authorisation and consent. Never target individuals without it.",
 q: [["What makes a security-awareness program effective?", "Realistic, regular training, authorised phishing simulations, easy reporting channels, measurement by resilience (reporting rates) rather than blame, and backing controls like MFA and least privilege, building a culture where reporting is safe and expected."],
     ["Why must phishing simulations be authorised?", "Sending deceptive messages to people without authorisation is unethical and potentially illegal; legitimate simulations are run with organisational authorisation and consent, as a training and measurement exercise, not a trap."]],
 x: ["Shaming users instead of improving culture and controls", "Running simulations without authorisation"],
 d: "You can design an ethical, authorised awareness program measured by resilience, not blame.",
 min: 45
},
"w22-6": {
 m: "Physical and human security are real attack surfaces too. Defending them rounds out your protection.",
 e: "Attackers don't only come through the network: tailgating into a building, plugging in a dropped USB, shoulder-surfing a password, or impersonating staff are all real. These physical and human vectors are part of a complete security picture, especially for protecting facilities and critical infrastructure. You'll study these conceptually and their defences (access control, visitor policies, device controls, a clean-desk culture), rounding out the human-layer week and reinforcing that security is about people and places, not just packets.",
 k: ["Physical vectors: tailgating, dropped-USB, shoulder-surfing, impersonation", "A dropped USB can bridge the air gap if someone plugs it in", "Defences: access control, visitor/badge policies, device control, clean desk", "Physical security is vital for facilities and critical infrastructure", "Security spans people, places and processes, not just technology"],
 t: ["List physical/human attack vectors and a defence for each", "Explain the dropped-USB risk and how device control mitigates it", "Describe access-control and visitor-policy basics", "Explain why physical security matters for critical infrastructure", "Summarise the full human-layer defence picture"],
 note: "Never attempt physical intrusion, tailgating or device-drop tests without explicit written authorisation. Study these concepts to defend, not to trespass.",
 q: [["How can a dropped USB drive compromise an organisation?", "A curious employee plugs it in, and it can auto-run or trick them into executing malware, bridging even isolated networks. Defences include disabling autorun, device-control policies, user awareness, and endpoint protection."]
     ,["Why is physical security part of cybersecurity?", "Physical access often defeats technical controls, plugging into a network, stealing a device, or entering a facility, so protecting people and places (access control, policies, awareness) is essential to overall security, especially for critical infrastructure."]],
 x: ["Attempting physical intrusion tests without authorisation", "Treating cyber as purely digital and ignoring physical/human vectors"],
 d: "You can describe physical and human attack vectors and their defences as part of a complete security picture.",
 min: 45
},
"w22-p": {
 m: "Defend the human layer for real: run an authorised phishing simulation or design an awareness program.",
 e: "Your project (choose based on what you can do ethically): run a Gophish phishing simulation against your own test accounts or your own organisation with documented consent, OR design a complete security-awareness program. Either way you'll analyse results or expected outcomes and write the defences, demonstrating that you can protect the human layer, the number-one real-world breach vector, ethically and effectively.",
 k: ["An authorised phishing simulation OR a full awareness-program design", "Analysis of results (or expected outcomes) and the lessons", "Defences: training, reporting, MFA, least privilege, email authentication", "Strict consent/authorisation throughout"],
 t: ["Choose: a consented Gophish simulation on your own accounts, or an awareness-program design", "If simulating: run it ethically and record report/click outcomes", "If designing: build training, simulation, reporting and policy components", "Write the defences and metrics that show success", "Produce a short report with recommendations"],
 note: "Only simulate phishing against your own accounts or with explicit documented organisational authorisation and consent. Never target individuals without it.",
 q: [["How would you run an ethical phishing simulation?", "With explicit organisational authorisation and a clear purpose; use a tool like Gophish, craft realistic but non-harmful lures, measure reporting and click rates, debrief constructively (no blame), and use results to improve training and controls."],
     ["What metrics show a human-layer defence is improving?", "Rising reporting rates of suspicious messages, falling susceptibility over time, faster reporting, and resilience when lures do land, rather than click rate alone, which can encourage blame."]],
 x: ["Any simulation without authorisation/consent", "Measuring only click rate and blaming users"],
 d: "You've run an authorised simulation or designed a full awareness program, with analysis and defences.",
 min: 120
}
};
