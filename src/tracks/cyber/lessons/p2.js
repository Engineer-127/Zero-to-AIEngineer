/* Cyber Phase 2: Networking & Linux (Weeks 3-4)
   Legal, defensive, labs-only. Code samples use normal template literals. */
export default {

/* ---------- Week 3: How networks work ---------- */
"w3-1": {
 m: "Every scan, every exploit, every defence happens over a network. Understand the pipes and nothing later is magic.",
 e: "When two computers talk, the data is wrapped in layers, like a letter inside an envelope inside a mailbag. The TCP/IP model has four layers (Link, Internet, Transport, Application); the OSI model splits it into seven for teaching. Each layer adds its own header: the application makes the message, TCP/UDP adds ports, IP adds addresses, and the link layer adds hardware (MAC) addresses. Tools like Nmap and Wireshark make sense only once you can picture this wrapping and unwrapping.",
 k: ["OSI (7 layers) is the teaching model; TCP/IP (4 layers) is what's actually used", "Encapsulation: each layer wraps the one above with its own header", "Application (HTTP), Transport (TCP/UDP ports), Internet (IP addresses), Link (MAC)", "A 'packet' at the IP layer, a 'frame' at the link layer, a 'segment' at TCP: same data, different wrappers", "Knowing the layer of a problem tells you which tool to reach for"],
 t: ["Draw the TCP/IP layers and write one protocol that lives at each", "Map the OSI 7 layers onto the TCP/IP 4 and note what each adds", "Trace, on paper, what headers get added as a web request goes down the stack", "Match tools to layers: Wireshark (all), Nmap (transport/internet), a browser (application)", "Explain encapsulation to someone using the envelope analogy"],
 q: [["What is the OSI model and how does it relate to TCP/IP?", "The OSI model is a 7-layer conceptual framework (physical to application) for how network communication works. TCP/IP is the 4-layer model actually implemented; OSI layers map onto it and are useful for teaching and troubleshooting."],
     ["What is encapsulation in networking?", "The process where each layer wraps the data from the layer above with its own header (and sometimes trailer), so the application message gains transport, internet and link information as it travels down the stack."],
     ["At which layer do ports operate, and which layer handles IP addresses?", "Ports are at the transport layer (TCP/UDP); IP addresses are at the internet/network layer."]],
 x: ["Memorising OSI layer names without understanding what each does", "Confusing MAC addresses (link layer, local) with IP addresses (internet layer, routable)"],
 d: "You can sketch the TCP/IP stack and say what each layer adds to a web request.",
 min: 50
},
"w3-2": {
 m: "To find a machine, you need its address. To know what it offers, you need its ports.",
 e: "An IP address identifies a machine on a network (192.168.1.10). A subnet mask (or /24 notation) says which part is the network and which is the host, so devices know who's local. A MAC address is a hardware ID used only on the local network. Private IP ranges (like 192.168.x.x, 10.x.x.x) are used inside home and lab networks and aren't routable on the internet, which is exactly why your lab uses them.",
 k: ["IPv4 looks like 192.168.1.10; IPv6 is longer and hexadecimal", "Subnet / CIDR (/24) splits an address into network and host parts", "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 (used in labs and homes)", "MAC addresses are local-only hardware identifiers", "Gateway, DNS server and DHCP: how a device gets configured and reaches the outside"],
 t: ["Run ip a (Linux) / ipconfig (Windows) and identify your lab IP, mask and gateway", "Work out the network range of your lab from its IP and /24 mask", "List the IPs of every VM in your lab network", "Explain why your lab's private IPs can't be reached from the internet", "Find each VM's MAC address and note it's only meaningful on the local network"],
 q: [["What does a /24 subnet mean?", "The first 24 bits are the network portion and the remaining 8 bits identify hosts, giving 256 addresses (254 usable) on that network, e.g. 192.168.1.0–192.168.1.255."],
     ["Why are private IP ranges used in home and lab networks?", "They're reserved for internal use and aren't routable on the public internet, so many devices can share them behind a router doing NAT, which also keeps internal machines from being directly reachable from outside."],
     ["What's the difference between an IP address and a MAC address?", "An IP address is a logical, routable address at the network layer that can change; a MAC address is a fixed hardware identifier used only within the local network segment."]],
 x: ["Thinking a MAC address can be used to reach a machine across the internet", "Confusing the network address, broadcast address and usable host range"],
 d: "You can identify your lab's IP range and explain why its addresses aren't internet-routable.",
 min: 50
},
"w3-3": {
 m: "A port is a numbered door into a machine. Knowing which doors exist tells you what the machine does.",
 e: "A single IP can run many services at once, each listening on a numbered port. Web servers usually listen on 80 (HTTP) and 443 (HTTPS), SSH on 22, DNS on 53, SMB file sharing on 445. When you scan a target, you're knocking on these doors to see which are open and what's behind them. Learning the common ports and their services means a scan result immediately tells you a story about the machine.",
 k: ["Ports 0–65535; well-known services sit on 0–1023", "22 SSH, 80 HTTP, 443 HTTPS, 53 DNS, 25 SMTP, 445 SMB, 3389 RDP, 3306 MySQL", "An open port means a service is listening and might be attackable or misconfigured", "The service and its version matter more than the port number alone", "Closed/filtered ports: no service, or a firewall blocking the knock"],
 t: ["Memorise 10 common ports and their services", "On your target VM, list which services you expect to be running", "Explain why finding port 445 open suggests Windows/Samba file sharing", "Note the difference between a port being open, closed and filtered", "Make a quick-reference port cheat sheet in your notebook"],
 q: [["What does it mean when a port is 'open'?", "A service is actively listening on that port and will respond to connections, which means it's a potential entry point to enumerate and assess."],
     ["What's the difference between a closed and a filtered port?", "Closed means the host responded but nothing is listening on that port; filtered means a firewall or filter dropped or blocked the probe, so the state is undetermined."],
     ["Name the default ports for HTTP, HTTPS, SSH and DNS.", "HTTP 80, HTTPS 443, SSH 22, DNS 53."]],
 x: ["Assuming a service by port alone (services can run on non-standard ports)", "Ignoring version information, which is where real vulnerabilities are identified"],
 d: "You can name the common ports and explain what an open port implies about a target.",
 min: 45
},
"w3-4": {
 m: "TCP's handshake is the knock-knock that most scanning is built on. Learn it and scans stop being mysterious.",
 e: "TCP is reliable and connection-based: before sending data, two machines do a three-way handshake (SYN, SYN-ACK, ACK), like 'can you hear me? / yes, can you hear me? / yes'. UDP is fire-and-forget with no handshake, faster but unreliable, used for DNS and video. Port scanners exploit the handshake: a full connection confirms a port is open, while a half-open (SYN) scan starts the handshake and listens for the reply without completing it.",
 k: ["TCP: reliable, ordered, connection-based, uses the 3-way handshake (SYN, SYN-ACK, ACK)", "UDP: connectionless, fast, no guarantee of delivery (DNS, DHCP, streaming)", "The handshake is why a SYN reply reveals an open port", "Connection teardown uses FIN/RST", "Choosing TCP vs UDP scans depends on the service you expect"],
 t: ["Draw the three-way handshake with the flags at each step", "Explain why UDP services are harder to scan reliably", "List 3 services that use UDP and 3 that use TCP", "Describe how a SYN (half-open) scan differs from a full connect scan", "Predict what Wireshark will show when Kali connects to the target's web port"],
 q: [["Describe the TCP three-way handshake.", "The client sends SYN, the server replies SYN-ACK, and the client sends ACK. After this exchange the connection is established and data can flow reliably."],
     ["How do TCP and UDP differ?", "TCP is connection-oriented, reliable and ordered with handshakes and retransmission; UDP is connectionless and unreliable but lower-overhead, suited to DNS, DHCP and real-time media."],
     ["Why is a SYN scan called 'half-open'?", "It sends SYN and reads the SYN-ACK to infer an open port, then sends RST instead of completing the handshake, so a full connection is never established."]],
 x: ["Thinking UDP has a handshake", "Confusing RST (reset) with FIN (graceful close)"],
 d: "You can diagram the TCP handshake and explain how scanners use it to detect open ports.",
 min: 50
},
"w3-5": {
 m: "DNS and HTTP are the two conversations the web runs on. Watch them once and the web stops being a black box.",
 e: "When you visit a site, DNS first turns the name (example.com) into an IP address, like looking up a phone number. Then your browser makes an HTTP(S) request to that IP: a method (GET), a path, and headers; the server replies with a status code and content. HTTPS is the same conversation wrapped in TLS encryption. Understanding this flow is the foundation of the whole web-security phase later.",
 k: ["DNS resolves names to IPs (A, AAAA, CNAME, MX, TXT records)", "HTTP request: method + path + headers (+ body); response: status code + headers + body", "Status codes: 2xx ok, 3xx redirect, 4xx client error, 5xx server error", "HTTPS = HTTP over TLS, which encrypts the conversation in transit", "Cookies and headers carry session and security information"],
 t: ["Use dig/nslookup to resolve a domain you own and read the records returned", "Describe each step from typing a URL to seeing the page", "List the parts of an HTTP request and response", "Explain what TLS adds and why HTTPS matters for confidentiality and integrity", "Open your browser's dev tools network tab and inspect one real request's headers"],
 q: [["What happens, step by step, when you load a web page?", "DNS resolves the domain to an IP, the browser opens a TCP (and TLS for HTTPS) connection, sends an HTTP request, the server returns a response with a status code and content, and the browser renders it, fetching further resources as needed."],
     ["What does HTTPS add over HTTP?", "TLS encryption, which provides confidentiality and integrity in transit and authenticates the server via its certificate, preventing eavesdropping and tampering."],
     ["What are DNS A and CNAME records?", "An A record maps a name to an IPv4 address; a CNAME maps a name to another name (an alias) that is then resolved."]],
 x: ["Thinking HTTPS hides the domain or the fact a request happened (it protects content, not everything)", "Confusing DNS resolution with the HTTP request itself"],
 d: "You can explain DNS resolution and the HTTP request/response cycle, and read request headers in dev tools.",
 min: 50
},
"w3-6": {
 m: "Wireshark lets you see the actual conversation on the wire. On your own network, it's the best teacher there is.",
 e: "Wireshark captures and displays network packets so you can see exactly what's being sent. Used on traffic you're authorised to capture (your own lab, your own machine), it turns abstract theory into something you can watch: the TCP handshake, a DNS lookup, an HTTP request. You'll filter the noise to find the packets you care about and read their layered headers, confirming everything you learned this week.",
 k: ["Wireshark shows packets with their layered headers, newest tools make this visual", "Capture filters limit what's recorded; display filters narrow what's shown (e.g. http, tcp.port==80)", "Follow a TCP stream to see a whole conversation reassembled", "Only capture traffic you're authorised to (your own lab/host)", "Unencrypted protocols reveal their content; this is a strong argument for encryption"],
 t: ["Capture traffic on your lab interface while loading the target's web page", "Apply a display filter to show only the HTTP traffic", "Find and identify the TCP three-way handshake in the capture", "Follow the TCP stream of one HTTP request and read it", "Note how an HTTP (plain) request exposes data that HTTPS would encrypt"],
 note: "Only capture network traffic on systems and networks you own or are authorised to monitor. Capturing others' traffic without permission is unlawful interception.",
 q: [["What is the difference between a capture filter and a display filter in Wireshark?", "A capture filter decides which packets are recorded at capture time; a display filter narrows which already-captured packets are shown, without discarding the rest."],
     ["Why can capturing traffic reveal credentials on some protocols?", "Protocols without encryption (like plain HTTP, FTP or Telnet) send data, including credentials, in cleartext, so anyone capturing the traffic can read it, which is why encrypted equivalents are used."]],
 x: ["Capturing on a network you don't own or aren't authorised to monitor", "Being overwhelmed by unfiltered captures instead of using display filters"],
 d: "You've captured and identified a TCP handshake and an HTTP request on your own lab network.",
 min: 55
},
"w3-p": {
 m: "Turn a week of theory into one artefact: an annotated capture that proves you understand the plumbing.",
 e: "Your project is to capture a full web request between your own lab machines in Wireshark and annotate it: the DNS lookup (if any), the TCP three-way handshake, the HTTP request and response, and the teardown. Explaining each packet in your own words cements the networking foundation you'll rely on for scanning and web security.",
 k: ["One clean capture of a complete web request on your isolated lab", "Annotations identifying each phase: resolution, handshake, request, response, close", "A short written explanation a beginner could follow", "Everything on your own network only"],
 t: ["Capture a web request from Kali to your target VM's web server", "Mark the TCP handshake packets and label the flags", "Mark the HTTP request and response and note the method and status code", "Note where encryption would change what you can see", "Write a one-page explanation and save the annotated capture with your notes"],
 note: "Capture only on your own lab network between machines you own.",
 q: [["Walk me through the packets of a simple web request.", "Optionally a DNS query/response to resolve the name, then the TCP SYN / SYN-ACK / ACK handshake, the HTTP GET request, the server's HTTP response with a status code and body, and finally FIN/ACK packets closing the connection."],
     ["How would this capture differ over HTTPS?", "The handshake and a TLS negotiation would be visible, but the HTTP request and response contents would be encrypted, so you'd see encrypted application data rather than readable method, headers and body."]],
 x: ["Capturing a messy trace without filtering to the relevant conversation", "Not labelling the handshake, the most important part to demonstrate"],
 d: "You have an annotated Wireshark capture of a full web request, with each phase explained.",
 min: 90
},

/* ---------- Week 4: Linux for security ---------- */
"w4-1": {
 m: "Almost every security tool runs on the Linux command line. Get comfortable here and everything speeds up.",
 e: "The shell is a text interface to the operating system: you type a command, it runs, you read the output. The filesystem is a tree starting at / (root), with everything, files, devices, settings, somewhere inside it. The handful of navigation commands you learn today (pwd, ls, cd, cat, less) are the ones you'll type thousands of times. Don't memorise flags; learn to read a command's help and man page.",
 k: ["Everything is a file in Linux, under a single tree starting at /", "pwd (where am I), ls (list), cd (change dir), cat/less (read files)", "Absolute paths start at /, relative paths from where you are", "Tab completes names; the up arrow repeats commands; --help and man explain anything", "Hidden files start with a dot (.bashrc); ls -la shows them"],
 t: ["On Kali, navigate from / into several directories and back using cd and pwd", "List files with ls -la and read what the columns mean", "Read a config file with cat and a long file with less (q to quit)", "Use man ls and --help to find a flag you didn't know", "Create, move, copy and delete a practice file (touch, mv, cp, rm) carefully"],
 q: [["What does 'everything is a file' mean in Linux?", "Most resources, including devices, processes and some kernel data, are represented as file-like objects you can read and write through the filesystem, which gives a consistent interface."],
     ["What's the difference between an absolute and a relative path?", "An absolute path starts from the root / and is unambiguous; a relative path is interpreted from your current working directory."]],
 x: ["Running rm with wildcards carelessly and deleting the wrong files", "Memorising commands without learning to read man pages"],
 d: "You can navigate the filesystem, read files, and look up any command's options.",
 min: 55
},
"w4-2": {
 m: "Permissions decide who can do what. Misconfigured permissions are one of the most common ways attackers escalate.",
 e: "Every Linux file has an owner, a group, and permission bits: read (r), write (w), execute (x) for the owner, the group and everyone else. Users can act as the all-powerful root via sudo. Many privilege-escalation techniques you'll learn later exploit mistakes here: a file that shouldn't be world-writable, or a program that runs as root when it shouldn't. Understanding permissions is therefore both a defensive and an offensive foundation.",
 k: ["rwx for owner/group/others, shown by ls -l as e.g. -rwxr-xr--", "chmod changes permissions; chown changes ownership", "root (uid 0) can do anything; sudo grants temporary root for specific commands", "SUID bit: a program runs with its owner's privileges, a classic privesc target", "Least privilege: give the minimum access needed, the core defensive principle"],
 t: ["Read the permission string of several files with ls -l and decode each bit", "Change a practice file's permissions with chmod and observe the effect", "Explain what the SUID bit does and why it's security-relevant", "List which commands your user can run with sudo (sudo -l)", "Write, in your own words, why 'least privilege' prevents many attacks"],
 q: [["How do you read a permission string like -rwxr-xr--?", "The first character is the type (- file, d directory), then three groups of rwx for owner, group and others. Here the owner can read/write/execute, the group can read/execute, and others can only read."],
     ["What is the SUID bit and why does it matter for security?", "SUID makes an executable run with the privileges of its owner (often root) rather than the user running it. If a SUID-root program can be abused, it can lead to privilege escalation, so it's a common target and a hardening concern."],
     ["What does the principle of least privilege mean?", "Granting each user, process or service only the minimum permissions needed to do its job, limiting the damage if it's compromised."]],
 x: ["Running everything as root instead of using sudo for specific commands", "Setting permissions to 777 to 'make it work', creating a vulnerability"],
 d: "You can decode and change file permissions and explain why SUID and least privilege matter.",
 min: 55
},
"w4-3": {
 m: "The real power of the command line is chaining small tools together. grep, pipes and find do most of the work.",
 e: "Linux tools each do one thing, and you connect them with pipes (|) so one tool's output becomes the next tool's input. grep searches text, find locates files, and redirection (>, >>) saves output to a file. In security work you're constantly sifting large outputs, scan results, logs, wordlists, for the one line that matters, and these tools are how you do it fast.",
 k: ["Pipe | sends one command's output into another", "grep searches for text/patterns; grep -r searches recursively", "find locates files by name, permission, owner or time", "Redirect with > (overwrite) and >> (append); read with cat/less", "Combine them: find ... | grep ... | sort | uniq to refine results"],
 t: ["Use grep to find a word inside a file, then recursively in a directory", "Use find to locate all files owned by a user, or with a certain permission", "Pipe ls or a scan output through grep to filter it", "Save a command's output to a file with >, then search it with grep", "Build one chained command that finds and filters something useful on your target"],
 c: `# search a file and a whole directory tree
grep "password" config.php
grep -ri "api_key" /var/www/

# find files by permission or owner (useful for privesc enumeration later)
find / -perm -4000 -type f 2>/dev/null   # SUID files
find /home -user www-data 2>/dev/null

# chain tools with pipes and save output
cat access.log | grep "POST" | sort | uniq -c | sort -nr > top_posts.txt`,
 q: [["What does a pipe (|) do in the shell?", "It connects the standard output of one command to the standard input of the next, letting you chain small tools into a processing pipeline."],
     ["How would you find all SUID files on a system?", "find / -perm -4000 -type f 2>/dev/null lists files with the SUID bit set, discarding permission-denied errors; this is a common privilege-escalation enumeration step."]],
 x: ["Forgetting 2>/dev/null and drowning in permission-denied errors", "Overwriting a file with > when you meant to append with >>"],
 d: "You can chain grep, find, pipes and redirection to extract specific information from large output.",
 min: 55
},
"w4-4": {
 m: "To understand a machine, you look at what's running and what's listening. These commands tell you.",
 e: "A running program is a process; a service is a program that runs in the background (like a web server). ps and top show processes, ss (or netstat) shows which ports are listening and what's connected, systemctl manages services, and ip shows network configuration. On a target you're enumerating, these reveal the attack surface; on a system you defend, they reveal what's exposed and what might be malicious.",
 k: ["ps aux / top: see running processes and who owns them", "ss -tulpn: list listening TCP/UDP ports and their programs", "systemctl status/start/stop: manage background services", "ip a / ip route: view addresses and routing", "Unexpected processes or open ports are red flags for a defender"],
 t: ["List running processes with ps aux and identify a few by name", "Show listening ports with ss -tulpn and match them to services", "Check the status of a service with systemctl", "View your VM's IP configuration and routing table with ip", "On your target VM, note which ports are listening and compare to your earlier port scan"],
 q: [["How do you list listening ports and the processes behind them on Linux?", "ss -tulpn (or netstat -tulpn) shows listening TCP/UDP ports along with the owning process, revealing what services are exposed."],
     ["Why would a defender care about unexpected running processes or open ports?", "They can indicate malware, backdoors or misconfigured services, each an unnecessary part of the attack surface or a sign of compromise to investigate."]],
 x: ["Confusing a listening port (a service accepting connections) with an established connection", "Killing processes you don't understand on a system you need"],
 d: "You can list processes and listening ports and relate them to a machine's attack surface.",
 min: 50
},
"w4-5": {
 m: "When you catch yourself typing the same thing twice, script it. Bash turns tedious steps into one command.",
 e: "A Bash script is a text file of commands the shell runs top to bottom, with variables, loops and conditions. In security you script repetitive enumeration: loop over a list of ports or hosts, run a command on each, collect results. You don't need to be a programmer; a few lines that save an hour are a win. Scripts also make your work reproducible, which matters for reports.",
 k: ["A script starts with #!/bin/bash and is made executable with chmod +x", "Variables: name=value, used as $name; command output with $(command)", "Loops: for item in list; do ...; done", "Conditions: if [ ... ]; then ...; fi", "Read input, loop over a wordlist or host list, and save output"],
 t: ["Write a script that pings each host in a list and reports which are up", "Add a loop over a small list of ports and print each", "Use a variable for the target so the script is reusable", "Make the script executable and run it against your lab", "Save the script in your toolkit folder with a comment explaining it"],
 c: `#!/bin/bash
# quick lab host sweep (use ONLY on your own lab network)
network="192.168.56"
for i in $(seq 1 20); do
  host="$network.$i"
  if ping -c1 -W1 "$host" >/dev/null 2>&1; then
    echo "[+] $host is up"
  fi
done`,
 note: "Run enumeration scripts only against your own lab or an authorised scope. Sweeping networks you don't own is unauthorised scanning.",
 q: [["What does the shebang (#!/bin/bash) do?", "It tells the system which interpreter should run the script file, so executing the file runs its contents with Bash."],
     ["How do you capture a command's output into a variable in Bash?", "With command substitution: variable=$(command), which runs the command and stores its output."]],
 x: ["Forgetting to make the script executable or add the shebang", "Running a sweep script against networks you don't own"],
 d: "You've written and run a small Bash script that automates a repetitive lab task.",
 min: 55
},
"w4-6": {
 m: "SSH is how you reach machines remotely and securely. It's also a service you'll meet on nearly every target.",
 e: "SSH (Secure Shell) gives an encrypted terminal on a remote machine over port 22. You authenticate with a password or, better, a key pair: a private key you keep and a public key on the server. SSH comes up constantly, both as the way you connect to lab machines and as a service you enumerate on targets. Understanding key-based auth also teaches you why it's far stronger than passwords, a defensive lesson too.",
 k: ["ssh user@host connects; port 22 by default", "Key pairs (ssh-keygen) are stronger than passwords and resist brute force", "The public key goes on the server (authorized_keys); the private key stays with you and is secret", "Host keys let you detect if a server you're connecting to has changed", "Hardening SSH: disable password login, disable root login, use keys"],
 t: ["Generate an SSH key pair with ssh-keygen and look at both files", "Connect from Kali to a lab machine over SSH", "Set up key-based login to that machine and confirm it works", "Note why the private key must never be shared", "List 3 ways to harden an SSH server and why each helps"],
 note: "Only connect to machines you own or are authorised to access. Attempting SSH logins against systems without permission is unauthorised access.",
 q: [["Why is SSH key-based authentication more secure than passwords?", "Keys are long and effectively impossible to brute-force, aren't transmitted to the server, and can be protected with a passphrase; disabling password login removes a whole class of guessing attacks."],
     ["In an SSH key pair, which key goes where?", "The public key is placed on the server in authorized_keys; the private key stays secret on the client and is never shared."]],
 x: ["Sharing or committing a private key", "Leaving password and root login enabled on an SSH server"],
 d: "You can connect over SSH with a key pair and explain how to harden an SSH server.",
 min: 50
},
"w4-p": {
 m: "Prove your Linux and command-line skills on a wargame that only rewards real understanding.",
 e: "Your project is OverTheWire's Bandit, a legal, SSH-based wargame that teaches Linux and command-line security step by step: each level hides a password you find using the skills from this week (navigation, permissions, grep/find, pipes, SSH). Reaching level 15+ means you can genuinely operate on the command line, the prerequisite for everything ahead.",
 k: ["Bandit is a legal, sandboxed wargame designed to be solved", "Each level teaches a real command-line or Linux concept", "You connect over SSH, reinforcing today's lesson", "Keep notes on the command that solved each level"],
 t: ["Start OverTheWire Bandit and connect to level 0 over SSH", "Work through the levels, noting the key command for each", "Reach at least level 15, using man pages when stuck", "Write up the 5 most useful commands you learned", "Add these commands to your toolkit cheat sheet"],
 note: "Bandit is an authorised, sandboxed wargame. Use the credentials and servers it gives you, and nothing else.",
 q: [["What kinds of skills does a wargame like Bandit build?", "Practical command-line fluency: navigating the filesystem, reading and transforming files, using grep/find and pipes, handling permissions and connecting over SSH, all under gentle puzzle pressure."],
     ["Why practise on a wargame rather than just reading commands?", "Hands-on problem-solving builds durable skill and the habit of figuring things out from man pages and experimentation, which is what the job actually requires."]],
 x: ["Copying solutions instead of understanding the command", "Skipping notes, then forgetting the technique"],
 d: "You've reached at least Bandit level 15 and documented the key commands you used.",
 min: 120
}
};
