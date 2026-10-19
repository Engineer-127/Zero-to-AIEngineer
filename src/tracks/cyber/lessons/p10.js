/* Cyber Phase 10: Cryptography & PKI (Week 19)
   The maths that protects everything: how it works, how it fails, how to use it right. */
export default {

/* ---------- Week 19: Applied cryptography and PKI ---------- */
"w19-1": {
 m: "Crypto is the invisible armour behind HTTPS, passwords and secure messaging. Understand it and you understand modern security.",
 e: "Cryptography provides the guarantees security depends on: confidentiality (keeping data secret), integrity (detecting tampering) and authenticity (proving who sent something). You don't need to invent algorithms, you need to understand what each primitive does, choose the right one, and avoid the misuse that breaks it. This week gives you the practical mental model: hashing, symmetric encryption, public-key crypto, and the PKI/TLS that ties them together to secure the web.",
 k: ["Crypto delivers confidentiality, integrity and authenticity", "Primitives: hash functions, symmetric ciphers, public-key crypto, signatures, MACs", "Never roll your own crypto; use vetted libraries and standard algorithms", "Most real failures are misuse (bad modes, weak keys, poor randomness), not broken maths", "Kerckhoffs's principle: security rests in the key, not in hiding the algorithm"],
 t: ["Define confidentiality, integrity and authenticity with an example of each", "List the main crypto primitives and what each provides", "Explain why you should never invent your own crypto", "State Kerckhoffs's principle in your own words", "Note that most breaks are misuse, not broken algorithms"],
 q: [["What security properties does cryptography provide?", "Confidentiality (data stays secret), integrity (tampering is detectable), and authenticity/non-repudiation (you can verify who produced or sent something), achieved with different primitives for each."],
     ["Why should you never 'roll your own' cryptography?", "Secure crypto is extremely hard to design and implement correctly; subtle flaws break it. Vetted, widely reviewed libraries and standard algorithms avoid pitfalls that custom code almost always contains."]],
 x: ["Confusing encryption (confidentiality) with hashing (integrity/identification)", "Believing a secret algorithm is more secure than a secret key"],
 d: "You can explain what cryptography provides and the main primitives, and why misuse causes most failures.",
 min: 50
},
"w19-2": {
 m: "Hashing is the one-way fingerprint behind password storage, integrity checks and digital signatures.",
 e: "A cryptographic hash turns any input into a fixed-size fingerprint that's practically impossible to reverse or forge a collision for. It's used for integrity (has this file changed?) and, with care, for password storage. Passwords need special, deliberately slow hashes (bcrypt, argon2, scrypt) plus a unique salt, so stolen hashes resist cracking. General-purpose fast hashes (SHA-256) are right for integrity but wrong for passwords. You'll contrast the two and connect this to the password attacks you studied earlier.",
 k: ["A hash is one-way and fixed-size; good hashes resist collisions", "Integrity: compare a file's hash to a known-good value", "Passwords: use slow, salted hashes (bcrypt/argon2/scrypt), never fast ones or plaintext", "Salt makes identical passwords hash differently, defeating rainbow tables", "SHA-256 for integrity; argon2/bcrypt for passwords, two different jobs"],
 t: ["Hash a file and verify its integrity against a known value", "Explain why passwords need slow, salted hashes", "Contrast SHA-256 (integrity) with bcrypt/argon2 (passwords)", "Explain how salting defeats precomputed attacks", "Connect this to the Hashcat cracking you did earlier and the defence"],
 c: `# integrity check (fast hash is correct here)
sha256sum installer.iso          # compare to the publisher's value

# password storage (slow, salted hash is correct here)
# store argon2/bcrypt hashes, never SHA-256(password) and never plaintext`,
 q: [["Why shouldn't you store passwords with a fast hash like SHA-256?", "Fast hashes let attackers try billions of guesses per second against stolen hashes. Passwords need slow, salted, memory-hard hashes (argon2, bcrypt, scrypt) so cracking is computationally expensive."],
     ["What problem does salting solve?", "It makes identical passwords produce different hashes by adding unique random data per password, defeating precomputed rainbow-table attacks and preventing attackers from spotting repeated passwords."]],
 x: ["Using SHA-256 (or worse, MD5) to store passwords", "Reusing a static salt or no salt"],
 d: "You can choose the right hash for integrity vs passwords and explain salting.",
 min: 50
},
"w19-3": {
 m: "Symmetric encryption keeps data secret with a shared key, and the mode you choose can make or break it.",
 e: "Symmetric encryption (same key to encrypt and decrypt) is fast and protects bulk data, with AES the standard. But the cipher alone isn't enough: the 'mode' of operation matters enormously. Weak modes (like ECB) leak patterns; proper authenticated modes (like AES-GCM) provide both confidentiality and integrity. Key management, generating, storing and rotating keys safely, is where symmetric crypto usually fails in practice. You'll see why mode and key handling, not the cipher name, decide real-world security.",
 k: ["Symmetric = one shared key; AES is the standard cipher", "Mode matters: avoid ECB (leaks patterns); prefer authenticated modes like AES-GCM", "Authenticated encryption gives confidentiality AND integrity together", "Keys need strong generation, secure storage, and rotation", "A good cipher with a bad mode or leaked key is still insecure"],
 t: ["Explain why ECB mode leaks patterns (the classic 'encrypted penguin')", "Describe what authenticated encryption (e.g. AES-GCM) adds", "List the key-management problems: generation, storage, rotation", "Explain why the cipher name alone doesn't guarantee security", "Note where symmetric crypto protects data you use daily"],
 q: [["Why is ECB mode insecure?", "Electronic Code Book encrypts identical plaintext blocks to identical ciphertext blocks, so patterns in the data remain visible. Secure modes use an IV/nonce and chaining so identical plaintext yields different ciphertext."],
     ["What is authenticated encryption and why prefer it?", "Modes like AES-GCM provide both confidentiality and integrity/authenticity, detecting tampering as well as hiding data, so you don't need to bolt on a separate MAC and risk getting it wrong."]],
 x: ["Using ECB mode in real systems", "Focusing on the cipher while ignoring mode and key management"],
 d: "You can explain why mode and key management, not just the cipher, determine symmetric encryption's security.",
 min: 50
},
"w19-4": {
 m: "Public-key crypto solves the impossible-sounding problem: agreeing a secret with someone you've never met.",
 e: "Public-key (asymmetric) cryptography uses a key pair, public and private, so anyone can encrypt to you or verify your signature using your public key, while only you, with the private key, can decrypt or sign. This enables secure key exchange over open networks and digital signatures (proving authenticity and integrity). RSA and elliptic-curve (ECC) are the common families. It's slower than symmetric crypto, so in practice it's used to exchange a symmetric key, exactly what happens when you connect to an HTTPS site.",
 k: ["Key pair: public (shareable) and private (secret)", "Encrypt with the public key, decrypt with the private; sign with private, verify with public", "Enables key exchange over open channels and digital signatures", "RSA and ECC are the common algorithm families", "Usually used to exchange a symmetric key (hybrid encryption), as in TLS"],
 t: ["Explain how a key pair enables encryption to someone and signature verification", "Describe how two parties agree a secret over an open network", "Explain the difference between encrypting and signing", "Note why public-key crypto is used to exchange a symmetric key", "Connect this to what happens when you open an HTTPS site"],
 q: [["How does public-key cryptography let strangers communicate securely?", "Each party has a public and private key. You encrypt to someone with their public key (only their private key decrypts), and you can agree a shared symmetric key over an open channel, so no pre-shared secret is needed."],
     ["What is a digital signature?", "Data signed with a sender's private key that anyone can verify with the corresponding public key, proving the message's authenticity (who sent it) and integrity (it wasn't altered)."]],
 x: ["Confusing encryption (public key) with signing (private key)", "Thinking public-key crypto encrypts bulk data directly (it's used for key exchange)"],
 d: "You can explain key pairs, key exchange and signatures, and how HTTPS uses them.",
 min: 50
},
"w19-5": {
 m: "TLS and PKI are how your browser trusts a website it's never seen. Understand the trust, and how it breaks.",
 e: "TLS secures web traffic by combining the primitives: a handshake uses public-key crypto to agree a symmetric key, then symmetric crypto protects the data. But how do you trust the server's public key? Public Key Infrastructure (PKI): certificates issued by Certificate Authorities (CAs) your browser already trusts, forming a chain of trust. You'll learn how certificates, chains and CAs work, how trust can fail (expired/invalid certs, rogue or compromised CAs), and how to audit a site's TLS configuration.",
 k: ["TLS handshake: public-key exchange of a symmetric key, then symmetric encryption", "Certificates bind a public key to an identity, signed by a CA", "Chain of trust: server cert -> intermediate CA -> trusted root CA", "Trust fails via expired/invalid certs, misissuance, or compromised CAs", "Audit TLS config (protocols, ciphers, cert) with tools like SSL Labs"],
 t: ["Describe the TLS handshake at a high level (exchange then bulk encryption)", "Explain how a certificate chain establishes trust up to a root CA", "List ways TLS trust can break (expired, invalid, rogue CA)", "Run SSL Labs against a site you own and read the grade and findings", "Note what a good modern TLS configuration looks like"],
 note: "Test TLS configuration only on sites you own or are authorised to test.",
 q: [["How does PKI let a browser trust a website's certificate?", "The certificate is signed by a Certificate Authority, forming a chain up to a root CA the browser already trusts. The browser validates the chain, the certificate's validity and the hostname, establishing trust in the server's public key."],
     ["How can TLS trust break?", "Through expired, self-signed or hostname-mismatched certificates, weak protocols/ciphers, or a compromised or rogue CA that misissues certificates, any of which can enable interception or warnings."]],
 x: ["Thinking HTTPS alone guarantees a site is trustworthy (it guarantees transport, not intent)", "Ignoring weak protocol/cipher configuration"],
 d: "You can explain TLS and PKI, how trust is established and breaks, and audit a site's TLS.",
 min: 55
},
"w19-6": {
 m: "Crypto rarely breaks because the maths fails. It breaks because someone used it wrong. Learn the wrong ways.",
 e: "Real-world crypto failures are almost always misuse: weak or deprecated algorithms (MD5, SHA-1, DES), predictable randomness (weak keys/IVs), hardcoded or reused keys, missing authentication (encryption without integrity), and padding or nonce mistakes. Recognising these patterns lets you both avoid them in your own systems and spot them when assessing others'. The legal Cryptopals challenges teach many of these hands-on. You'll catalogue the common pitfalls and their correct practice.",
 k: ["Deprecated algorithms (MD5/SHA-1/DES/RC4) must be retired", "Bad randomness yields predictable keys/IVs/nonces, breaking everything", "Hardcoded, reused or poorly stored keys are a top failure", "Encryption without integrity (no authentication) invites tampering attacks", "Nonce/IV reuse and padding mistakes break otherwise-sound crypto"],
 t: ["List deprecated algorithms and their modern replacements", "Explain why predictable randomness is catastrophic", "Describe the risk of hardcoded or reused keys", "Explain why encryption needs integrity (authentication) too", "Try a Cryptopals challenge that demonstrates a misuse"],
 note: "Practise crypto attacks only on the Cryptopals challenges or your own systems.",
 q: [["What are the most common real-world cryptography failures?", "Misuse rather than broken maths: deprecated algorithms, weak randomness, hardcoded or reused keys, missing integrity/authentication, and nonce/IV or padding mistakes."],
     ["Why is good randomness critical in cryptography?", "Keys, IVs and nonces must be unpredictable; weak or reused randomness lets attackers predict or recover them, which can completely break confidentiality and integrity regardless of the algorithm's strength."]],
 x: ["Still using MD5/SHA-1/DES in new systems", "Encrypting without authenticating (no integrity protection)"],
 d: "You can identify the common crypto misuse patterns and state the correct practice for each.",
 min: 50
},
"w19-p": {
 m: "Prove you can both break weak crypto (legally, on challenges) and audit real crypto in use.",
 e: "Your project has two parts, both legal: solve a set of Cryptopals challenges to experience how misused crypto breaks, and audit the TLS configuration of a site you own (with SSL Labs and manual checks), writing up the findings and fixes. Together they show you understand cryptography from both the attacker's and defender's side, essential for assessing and building secure systems.",
 k: ["Hands-on crypto breaking via the legal Cryptopals challenges", "A real TLS/crypto audit of a site you own, with findings and fixes", "Clear write-ups of both", "Everything on challenges or systems you own"],
 t: ["Solve a set of early Cryptopals challenges and note the lesson of each", "Audit the TLS configuration of a site you own (SSL Labs + manual review)", "Document weak protocols, ciphers or certificate issues found", "Write the remediation for each finding", "Produce a short write-up covering both parts"],
 note: "Use Cryptopals (legal challenges) and only audit TLS on sites you own or are authorised to test.",
 q: [["Walk me through auditing a site's TLS configuration.", "Check supported protocol versions (disable old SSL/TLS), cipher suites (remove weak ones), certificate validity and chain, key strength, and features like HSTS, using a tool like SSL Labs plus manual review, then recommend fixes for each weakness."],
     ["What did breaking weak crypto in challenges teach you about building secure systems?", "That security depends on correct usage, strong modern algorithms, authenticated encryption, good randomness, proper key management, since most breaks come from misuse, not the underlying maths."]],
 x: ["Auditing TLS on a site you don't own", "Solving challenges without noting the defensive lesson"],
 d: "You've solved Cryptopals challenges and audited a site's TLS, with documented findings and fixes.",
 min: 120
}
};
