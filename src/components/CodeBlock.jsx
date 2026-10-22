import { useRef, useState } from "react";

export function CodeBlock({ code }) {
  const [label, setLabel] = useState("Copy");
  const ref = useRef(null);
  function copy() {
    const ok = () => { setLabel("Copied"); setTimeout(() => setLabel("Copy"), 1500); };
    (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject())
      .then(ok)
      .catch(() => {
        const r = document.createRange();
        r.selectNodeContents(ref.current);
        const s = getSelection();
        s.removeAllRanges();
        s.addRange(r);
        setLabel("Press Ctrl/Cmd+C");
      });
  }
  return (
    <div className="code-wrap">
      <button className="btn copy" type="button" onClick={copy}>{label}</button>
      <pre><code ref={ref}>{code}</code></pre>
    </div>
  );
}
