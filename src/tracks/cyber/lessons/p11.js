/* Cyber Phase 11: Cloud, Containers & Critical Infrastructure (Weeks 20-21)
   Secure modern platforms and the vital systems that run a nation. Labs/own accounts only. */
export default {

/* ---------- Week 20: Cloud and container security ---------- */
"w20-1": {
 m: "Almost everything runs in the cloud now, including government services. Securing it is a top-demand skill.",
 e: "The cloud is someone else's computers you rent and configure (compute, storage, databases, networking) through a provider like AWS, Azure or GCP. Security works differently here: the provider secures the underlying infrastructure, but you are responsible for securing what you put on it, your configuration, data and access. This 'shared responsibility model' is the single most important cloud-security concept, because most cloud breaches come from the customer's side: misconfiguration, not the provider failing.",
 k: ["Cloud = on-demand compute, storage, networking you configure and are responsible for", "Shared responsibility: provider secures the cloud; you secure what's in it", "Most cloud breaches are customer-side misconfiguration, not provider failure", "Core services to understand: compute, storage (buckets), databases, networking, identity", "The big three: AWS, Azure, GCP, same concepts, different names"],
 t: ["Explain the shared responsibility model with a concrete example", "List what the provider secures vs what the customer secures", "Note why misconfiguration (not provider breach) causes most cloud incidents", "Identify the core cloud service categories", "Create a free-tier account (your own) to explore safely later"],
 note: "Use only your own cloud account or an authorised one. Never test or access cloud resources you don't own.",
 q: [["What is the cloud shared-responsibility model?", "A division where the provider secures the underlying infrastructure (hardware, hypervisor, physical security) and the customer secures their configuration, data, access and applications. The exact line shifts by service type (IaaS vs PaaS vs SaaS)."],
     ["Why are most cloud breaches the customer's fault?", "Because the provider secures the infrastructure well, but customers frequently misconfigure access and resources, public storage, over-broad permissions, exposed keys, which is where the responsibility, and most incidents, lie."]],
 x: ["Assuming 'the cloud is secure' means your config is secure", "Not knowing where the responsibility line sits for each service"],
 d: "You can explain the shared-responsibility model and why cloud misconfiguration is the main risk.",
 min: 50
},
"w20-2": {
 m: "In the cloud, identity is the perimeter. Get IAM wrong and nothing else matters.",
 e: "Cloud Identity and Access Management (IAM) controls who (users, roles, services) can do what to which resources. It's the heart of cloud security: over-broad permissions and exposed credentials are the leading cause of cloud breaches. The principle is least privilege, grant the minimum needed, prefer short-lived roles over long-lived keys, and never embed credentials in code. You'll study IAM concepts and common failures, and learn to reason about 'who can do what' as the core cloud-security question.",
 k: ["IAM governs identities (users, roles, services) and their permissions (policies)", "Least privilege: grant only what's needed; deny by default", "Prefer roles/short-lived credentials over long-lived access keys", "Exposed or over-privileged keys are a top breach cause (don't commit keys!)", "Review 'who can do what' and remove excess permissions regularly"],
 t: ["Explain the difference between a user, a role and a policy in cloud IAM", "Describe least privilege in a cloud context with an example", "Explain why long-lived access keys are riskier than short-lived roles", "List how credentials get exposed (committed to git, hardcoded, logged)", "Note how you'd audit for over-broad permissions"],
 note: "Practise IAM concepts only in your own cloud account or an authorised lab.",
 q: [["Why is IAM called the perimeter of the cloud?", "Because access to cloud resources is governed by identity and permissions rather than network location; if IAM is misconfigured (over-broad permissions or leaked credentials), attackers can reach resources regardless of network controls."],
     ["How should cloud credentials be handled?", "Use least-privilege roles with short-lived credentials instead of long-lived keys, never embed credentials in code or commit them, rotate and monitor them, and prefer managed identity services."]],
 x: ["Granting broad admin permissions 'to make it work'", "Committing or hardcoding access keys"],
 d: "You can reason about cloud IAM, least privilege, and why credential/permission errors cause breaches.",
 min: 50
},
"w20-3": {
 m: "The classic cloud breach is embarrassingly simple: a storage bucket left open to the world.",
 e: "Cloud misconfigurations are the most common real-world cloud weakness: public storage buckets exposing data, security groups/firewalls open to the internet, databases without authentication, over-broad IAM, and exposed secrets. These are rarely exotic, they're defaults left unchanged or convenience choices. Learning to spot and fix them is high-impact, practical security. You'll catalogue the common misconfigurations, understand why each is dangerous, and learn the correct secure configuration, reinforced by a legal cloud lab next.",
 k: ["Public storage buckets are a classic, high-impact data exposure", "Over-permissive security groups/firewalls expose services to the internet", "Unauthenticated databases and exposed management interfaces", "Over-broad IAM and exposed secrets/keys", "Fixes: private by default, least privilege, encryption, and config scanning"],
 t: ["List the top cloud misconfigurations and why each is dangerous", "Explain why 'public by accident' storage is so common and so damaging", "Describe the correct secure default for storage and network access", "Note tools/approaches that scan for cloud misconfiguration", "Map each misconfiguration to its fix"],
 note: "Look for and fix misconfigurations only in your own cloud account or an authorised lab.",
 q: [["What are the most common cloud misconfigurations?", "Publicly accessible storage buckets, over-permissive network security groups, unauthenticated or exposed databases and management interfaces, over-broad IAM permissions, and exposed secrets/keys, mostly defaults left unchanged or convenience choices."],
     ["How do you prevent cloud misconfiguration?", "Make resources private and least-privilege by default, encrypt data, remove public access and exposed secrets, and continuously scan configuration with automated tools (CSPM) against benchmarks like CIS."]],
 x: ["Leaving storage or databases public for convenience", "Relying on manual checks instead of automated config scanning"],
 d: "You can list the common cloud misconfigurations and state the secure configuration for each.",
 min: 50
},
"w20-4": {
 m: "Containers package apps to run anywhere, and if you're careless, they package vulnerabilities to run anywhere too.",
 e: "Containers (Docker) bundle an app with its dependencies so it runs consistently everywhere; they're everywhere in modern infrastructure. Their security concerns: vulnerable or untrusted base images, secrets baked into images, running as root, and over-broad container privileges that can let an attacker escape to the host. The defences are concrete: use minimal trusted images, scan them, keep secrets out of images, run as non-root, and limit capabilities. You'll study the container attack surface and its hardening.",
 k: ["Containers package an app + dependencies for consistent, portable runs", "Risks: vulnerable/untrusted images, baked-in secrets, running as root, container escape", "Scan images for known vulnerabilities before use", "Keep secrets out of images; inject them at runtime securely", "Harden: minimal base images, non-root user, drop unnecessary capabilities"],
 t: ["Explain what a container is and how it differs from a VM", "List the main container security risks", "Explain why baking secrets into images is dangerous", "Describe how to harden a container (non-root, minimal image, scan)", "Note what container escape means and why privileges matter"],
 note: "Build and test containers only on systems you own or are authorised to use.",
 q: [["How do containers differ from virtual machines, security-wise?", "VMs virtualise hardware with strong isolation; containers share the host kernel, so isolation is weaker and a container escape or misconfiguration can reach the host. Container security emphasises image hygiene, least privilege and limiting host access."],
     ["Name key container hardening practices.", "Use minimal, trusted, scanned base images; keep secrets out of images (inject at runtime); run as a non-root user; drop unnecessary Linux capabilities; and keep images and the runtime patched."]],
 x: ["Running containers as root with full privileges", "Baking secrets or using untrusted base images"],
 d: "You can describe the container attack surface and the practices that harden it.",
 min: 50
},
"w20-5": {
 m: "Kubernetes orchestrates containers at scale, and its defaults are not your security.",
 e: "Kubernetes (K8s) runs and manages containers across many machines; it's the backbone of large modern (and government) platforms. Its security rests on a few pillars: RBAC (who can do what in the cluster), network policies (which pods can talk to which), secrets management, and pod security (limiting what containers can do). Defaults are often permissive, so hardening is essential. You'll learn the K8s security model at a conceptual level, enough to reason about and assess a cluster's posture.",
 k: ["Kubernetes orchestrates containers across a cluster of nodes", "RBAC controls who/what can perform actions in the cluster (least privilege)", "Network policies restrict pod-to-pod traffic (default-deny is safer)", "Secrets management: don't store secrets in plain manifests/images", "Pod security: restrict privileges, host access and capabilities"],
 t: ["Explain the pieces of a cluster (nodes, pods, control plane) at a high level", "Describe what RBAC controls and why least privilege matters in K8s", "Explain how network policies limit lateral movement between pods", "Note how secrets should and shouldn't be handled", "List pod-security restrictions that reduce risk"],
 note: "Experiment with Kubernetes only in your own cluster or an authorised lab.",
 q: [["What are the main pillars of Kubernetes security?", "RBAC (least-privilege access to cluster actions), network policies (restricting pod-to-pod traffic), secrets management, pod security (limiting container privileges and host access), and keeping the cluster and images patched."],
     ["Why are default Kubernetes configurations often insecure?", "Defaults favour ease of use, e.g. permissive networking (any pod can talk to any pod) and broad permissions, so deliberate hardening (network policies, RBAC, pod security) is required for a secure posture."]],
 x: ["Assuming default K8s settings are secure", "Storing secrets in plain manifests"],
 d: "You can explain the Kubernetes security model and how to reason about a cluster's posture.",
 min: 50
},
"w20-6": {
 m: "The best way to learn cloud security is to break a cloud you're allowed to break, then fix it.",
 e: "Legal cloud-security labs let you practise safely. flAWS.cloud is a free, guided challenge that walks you through real AWS misconfigurations. CloudGoat deploys deliberately vulnerable scenarios into your own AWS account for you to exploit and then fix. Working through these cements the misconfiguration and IAM lessons in a hands-on way, exactly as you'd assess a real cloud environment, but entirely within authorised, intended-to-be-attacked targets.",
 k: ["flAWS.cloud: a free, guided AWS security challenge (authorised by design)", "CloudGoat: deliberately vulnerable scenarios you deploy in your OWN account", "You exploit, understand, then fix each misconfiguration", "These map to real cloud assessment skills", "Always use your own account or the provided legal challenge"],
 t: ["Work through flAWS.cloud, noting each misconfiguration and lesson", "Deploy a CloudGoat scenario in your own AWS account", "Exploit it, then write the fix for each weakness", "Map the issues to the misconfiguration categories you learned", "Tear down lab resources afterwards to avoid cost/exposure"],
 note: "Use flAWS.cloud or CloudGoat in your own account only. Never test cloud resources you don't own.",
 q: [["Why use labs like flAWS.cloud or CloudGoat?", "They provide legal, intentionally vulnerable cloud environments to practise finding and fixing real misconfigurations and IAM issues safely, flAWS as a guided challenge and CloudGoat deployed in your own account."],
     ["Why tear down cloud lab resources afterwards?", "To avoid ongoing charges and to remove any deliberately vulnerable resources so they can't be discovered and abused; cleanup is part of responsible cloud use."]],
 x: ["Deploying vulnerable labs and leaving them running/exposed", "Testing any cloud resource you don't own"],
 d: "You've worked a legal cloud-security lab, exploited and fixed the issues, and cleaned up.",
 min: 55
},
"w20-p": {
 m: "Assess a cloud environment the way a professional does: find the misconfigurations, then harden it.",
 e: "Your project is a cloud-security assessment on an authorised target: work through flAWS.cloud and/or deploy CloudGoat in your own account, exploit the misconfigurations, then write a hardening report mapping each finding to the secure configuration (least-privilege IAM, private storage, network restrictions) and to a benchmark like CIS. This mirrors real cloud-security work, now in huge demand including for government and critical services.",
 k: ["A cloud assessment on an authorised lab/your own account", "Findings exploited and understood, then fixed", "Hardening mapped to secure config and CIS benchmarks", "Resources cleaned up afterwards"],
 t: ["Complete flAWS.cloud and/or a CloudGoat scenario in your own account", "Document each misconfiguration/IAM issue and its impact", "Write the secure configuration that fixes each", "Map the hardening to CIS benchmark items", "Produce a cloud-security report and tear down the lab"],
 note: "Assess only your own account or the provided legal challenges.",
 q: [["Walk me through a cloud security assessment.", "Enumerate the environment's identities, permissions, storage, network and exposed services; identify misconfigurations and over-privileged access; demonstrate impact in scope; then report each finding with the secure configuration, mapped to benchmarks like CIS, and least-privilege IAM throughout."],
     ["Why is cloud security a priority for national and critical services?", "Because governments and critical services increasingly run on the cloud; a single misconfiguration (public data, over-broad access) can expose sensitive systems at scale, so securing configuration and identity is essential."]],
 x: ["Findings without concrete secure-configuration fixes", "Leaving deliberately vulnerable cloud resources running"],
 d: "You've completed a cloud-security assessment with exploited findings, benchmark-mapped hardening, and cleanup.",
 min: 150
},

/* ---------- Week 21: OT/ICS and critical-infrastructure protection ---------- */
"w21-1": {
 m: "The power grid, water, trains and factories run on computers too, and defending them is national security itself.",
 e: "Operational Technology (OT) is the computing that runs physical processes: power generation, water treatment, manufacturing, transport. Industrial Control Systems (ICS), including SCADA and PLCs, are its building blocks. Attacks here can cause physical harm, blackouts, contaminated water, halted factories, which is why critical-infrastructure protection is the sharp end of national security. This week introduces OT/ICS, how it differs from IT, and why defending it demands a different mindset: safety and availability above all.",
 k: ["OT runs physical processes; ICS/SCADA/PLCs are its components", "OT priorities invert IT: availability and safety first, then integrity, then confidentiality", "Consequences can be physical: blackouts, unsafe water, stopped production", "Many OT systems are legacy, long-lived and can't be easily patched or rebooted", "Protecting critical infrastructure is core national-security work"],
 t: ["Define OT, ICS, SCADA and PLC in your own words", "Explain how OT security priorities differ from IT (availability/safety first)", "Give examples of critical sectors that rely on OT", "Explain why OT systems are hard to patch or take offline", "Note the real-world consequences of OT attacks"],
 q: [["How do OT/ICS security priorities differ from IT?", "IT typically prioritises confidentiality; OT prioritises availability and safety first, because downtime or malfunction can cause physical harm. This changes acceptable controls, patching windows and testing dramatically."],
     ["What are SCADA and PLCs?", "SCADA systems supervise and control industrial processes, and PLCs (Programmable Logic Controllers) are the rugged computers that directly control physical equipment like valves, motors and breakers."]],
 x: ["Applying IT security methods (reboots, aggressive scans) blindly to fragile OT", "Underestimating the physical/safety consequences of OT attacks"],
 d: "You can explain OT/ICS, how its priorities differ from IT, and why it's a national-security concern.",
 min: 50
},
"w21-2": {
 m: "OT's biggest weakness is its history: built for isolation and safety, now connected and exposed.",
 e: "Many ICS protocols (like Modbus and DNP3) were designed decades ago for isolated, trusted networks, so they often lack authentication or encryption. As OT connected to IT and the internet for efficiency, that trust became a liability. Combined with legacy systems that can't be patched and long lifecycles, OT presents a large, fragile attack surface. Understanding these weaknesses, carefully and from documentation, is the basis for defending them with compensating controls rather than risky direct fixes.",
 k: ["Legacy ICS protocols often lack authentication and encryption by design", "IT/OT convergence connected once-isolated systems, exposing them", "Legacy, unpatchable, long-lived devices can't be secured like modern IT", "You rarely 'fix' OT directly; you add compensating controls around it", "Study OT weaknesses carefully, from documentation, not by poking live systems"],
 t: ["Name common ICS protocols and their security weaknesses", "Explain why IT/OT convergence increased OT risk", "Describe why patching OT is often impractical", "Explain what 'compensating controls' means for OT", "Note why you never experiment on live OT systems"],
 note: "Never scan, probe or test live OT/ICS systems. These are safety-critical; even benign tools can cause harm. Study only through documentation, simulations, or explicitly authorised, isolated test environments.",
 q: [["Why are many ICS protocols insecure by modern standards?", "They were designed for isolated, trusted networks and prioritised reliability and simplicity, so they often lack authentication and encryption. Connecting them to wider networks exposed these inherent weaknesses."],
     ["Why can't you secure OT the way you secure IT?", "OT systems are often legacy, unpatchable, safety-critical and must stay available, so you can't freely patch, reboot or scan them. Instead you use compensating controls like segmentation and monitoring around them."]],
 x: ["Suggesting you scan or patch live OT like IT", "Ignoring the safety-critical nature of these systems"],
 d: "You can explain OT's inherent weaknesses and why it needs compensating controls, not IT-style fixes.",
 min: 50
},
"w21-3": {
 m: "Adversaries targeting infrastructure have their own playbook. MITRE ATT&CK for ICS maps it.",
 e: "Just as ATT&CK catalogues enterprise techniques, MITRE ATT&CK for ICS catalogues the tactics and techniques adversaries use against industrial systems, from initial access to impairing process control. It gives defenders of critical infrastructure a shared language to understand threats and plan detection. You'll explore the ICS matrix, see how infrastructure attacks differ from enterprise ones (they aim at physical processes), and map defences to the techniques, exactly how national infrastructure defenders think.",
 k: ["ATT&CK for ICS catalogues adversary techniques against industrial systems", "ICS attacks aim to disrupt or damage physical processes, not just data", "Tactics include impairing process control and inhibiting safety responses", "It gives infrastructure defenders a shared language and detection map", "Map compensating controls and monitoring to ICS techniques"],
 t: ["Explore the MITRE ATT&CK for ICS matrix and note its tactics", "Contrast an ICS technique with its enterprise equivalent", "Explain why 'impact' in ICS can mean physical consequences", "Pick a technique and map a defensive control to it", "Note how this informs critical-infrastructure defence planning"],
 q: [["What is MITRE ATT&CK for ICS?", "A knowledge base of adversary tactics and techniques specific to industrial control systems, used by defenders of critical infrastructure to understand threats and plan detection and mitigation."],
     ["How do ICS attacks differ from enterprise attacks in their goals?", "Enterprise attacks usually target data and systems; ICS attacks often aim to disrupt, manipulate or damage physical processes, with potential safety and real-world consequences, so impact techniques are central."]],
 x: ["Assuming enterprise ATT&CK fully covers OT (ICS has its own matrix)", "Overlooking the physical-impact goals of ICS adversaries"],
 d: "You can use ATT&CK for ICS to describe infrastructure threats and map defences to them.",
 min: 50
},
"w21-4": {
 m: "You can't patch much in OT, so you wall it off and watch it. Segmentation is the master defence.",
 e: "Because OT often can't be patched, the primary defences are architectural: strong network segmentation to separate OT from IT and the internet, and careful monitoring. The Purdue model is a layered reference architecture that organises industrial networks into levels with controlled boundaries, so a compromise in IT can't reach the control systems. Combined with passive monitoring (which doesn't disturb fragile devices) and strict change control, this keeps critical processes safe. You'll learn to design OT defence around containment and visibility.",
 k: ["Segmentation is the master OT control: separate OT from IT and the internet", "The Purdue model: layered levels with controlled boundaries between them", "Use passive monitoring that won't disturb fragile OT devices", "Strict change control and access management around OT", "Demilitarised zones (DMZs) broker necessary IT/OT data exchange safely"],
 t: ["Explain the idea of the Purdue model and its layered levels", "Describe how segmentation protects control systems from an IT breach", "Explain why monitoring OT must often be passive", "Note the role of an IT/OT DMZ for necessary data exchange", "Sketch a segmented OT architecture at a high level"],
 q: [["What is the Purdue model and why does it matter for OT?", "A reference architecture organising industrial networks into layered levels (from enterprise IT down to physical process control) with controlled boundaries, so segmentation limits how far a compromise can spread toward safety-critical systems."],
     ["Why is monitoring OT often passive?", "Active scanning or probing can disrupt or crash fragile, safety-critical OT devices, so defenders prefer passive monitoring (observing traffic) that provides visibility without interfering with the process."]],
 x: ["Flat IT/OT networks where an office breach reaches control systems", "Active scanning of fragile OT devices"],
 d: "You can design OT defence around segmentation (Purdue model), passive monitoring and change control.",
 min: 50
},
"w21-5": {
 m: "Nations organise to defend their infrastructure. Knowing the frameworks and bodies is part of the job.",
 e: "Protecting critical infrastructure isn't just technical; it's organised nationally. In India, CERT-In is the national incident-response body and NCIIPC protects Critical Information Infrastructure (power, banking, telecom, transport, government). Internationally, the NIST Cybersecurity Framework and standards like ISO 27001 structure how organisations manage risk. Understanding this landscape, who coordinates, what sectors count as critical, and how frameworks guide defence, is essential context for anyone aiming at national-security cyber roles.",
 k: ["CERT-In: India's national computer emergency response team", "NCIIPC: protects India's Critical Information Infrastructure sectors", "NIST CSF: a widely used framework to identify, protect, detect, respond, recover", "ISO 27001: an international standard for information-security management", "Critical sectors: power, water, telecom, banking, transport, healthcare, government"],
 t: ["Explain the roles of CERT-In and NCIIPC", "List the core functions of the NIST Cybersecurity Framework", "Name sectors typically classed as critical infrastructure", "Explain how a framework like NIST CSF guides an organisation's defence", "Note how national CERTs coordinate incident response"],
 q: [["What do CERT-In and NCIIPC do?", "CERT-In is India's national incident-response agency, coordinating responses to cyber incidents and issuing advisories; NCIIPC is responsible for protecting the nation's Critical Information Infrastructure across sectors like power, banking and telecom."],
     ["What are the core functions of the NIST Cybersecurity Framework?", "Identify, Protect, Detect, Respond and Recover (with Govern added in CSF 2.0), a structured way for organisations to manage and communicate cybersecurity risk."]],
 x: ["Thinking national security is purely technical and ignoring the organisational frameworks", "Not knowing which sectors are classed as critical"],
 d: "You can describe the key national bodies (CERT-In, NCIIPC) and frameworks (NIST CSF, ISO 27001).",
 min: 45
},
"w21-6": {
 m: "Critical infrastructure is a prime target precisely because the consequences are physical and public.",
 e: "Understanding why OT/ICS is attacked, and what's at stake, sharpens how you defend it. Adversaries target infrastructure for disruption, coercion or sabotage, and the consequences aren't lost data but blackouts, unsafe water, halted transport or damaged equipment, sometimes endangering lives. Publicly documented incidents against power grids and industrial plants show this is real, not theoretical. This is why critical-infrastructure defence sits at the heart of national security, and why it attracts the most capable, persistent adversaries. Studying these cases (from public reporting) teaches what defenders must prepare for.",
 k: ["Motives: disruption, coercion, sabotage, espionage, sometimes by well-resourced actors", "Impact is physical and public: outages, safety hazards, equipment damage", "Documented real-world incidents prove the threat is genuine", "High stakes attract the most capable, persistent adversaries", "This is why infrastructure defence is central to national security"],
 t: ["List why adversaries target critical infrastructure", "Contrast the impact of an OT attack with a typical IT data breach", "Read a public summary of a documented infrastructure incident and note the lessons", "Explain why these targets attract highly capable adversaries", "Note what defenders must prepare for given these stakes"],
 note: "Study incidents only through public reporting. Never probe, access or test any real OT/ICS system.",
 q: [["Why is critical infrastructure an attractive target?", "Because disrupting it causes outsized physical and public harm, outages, safety hazards, economic and societal disruption, making it valuable for coercion, sabotage or strategic advantage, which is why capable, persistent adversaries pursue it."],
     ["How does the impact of an OT attack differ from an IT breach?", "IT breaches usually affect data and systems; OT attacks can cause physical consequences, power loss, unsafe water, stopped transport, damaged equipment, with potential danger to life, so the stakes and defensive priorities differ fundamentally."]],
 x: ["Treating OT attacks as abstract when consequences are physical", "Attempting to study incidents by touching real systems"],
 d: "You can explain why critical infrastructure is targeted and what makes its defence a national-security priority.",
 min: 45
},
"w21-p": {
 m: "Tie it together: given a critical system, how would you actually defend it? That's the national-security question.",
 e: "Your project applies everything to defend an OT/ICS environment: assess the risks (using ATT&CK for ICS), design segmentation (Purdue model), add passive monitoring, and plan incident response suited to safety-critical systems, all mapped to a framework. You'll produce a defensive assessment of a simulated or documented ICS environment. This is the reasoning that protects a nation's infrastructure, and a standout way to show you can think at that level.",
 k: ["Risk assessment mapped to ATT&CK for ICS", "Segmentation design (Purdue model) and an IT/OT DMZ", "Passive monitoring and detection suited to OT", "Incident response adapted for safety-critical systems", "Everything mapped to a framework (NIST CSF / sector guidance)"],
 t: ["Choose a simulated or documented ICS environment (e.g. a water/power scenario)", "Assess its risks and map threats to ATT&CK for ICS", "Design a segmentation (Purdue) and monitoring plan", "Outline an OT-appropriate incident response plan", "Map your recommendations to NIST CSF functions"],
 note: "Base this on simulated or documented environments only. Never assess or test a real OT/ICS system without explicit authorisation and safety oversight.",
 q: [["How would you defend a critical OT/ICS environment?", "Assess risks against ATT&CK for ICS, segment aggressively (Purdue model) to separate OT from IT and the internet with a DMZ for necessary data exchange, add passive monitoring, enforce strict access and change control, and prepare an OT-appropriate incident response plan, mapped to a framework."],
     ["Why must incident response differ for OT systems?", "Because availability and safety come first: you can't simply isolate or power off safety-critical processes, so IR plans must weigh physical consequences, coordinate with engineers, and prioritise safe, continuous operation."]],
 x: ["Proposing IT-style IR (shut it down) for safety-critical OT", "An assessment with no framework mapping or segmentation plan"],
 d: "You've produced a defensive assessment of an ICS environment with segmentation, monitoring and OT-appropriate IR, framework-mapped.",
 min: 150
}
};
