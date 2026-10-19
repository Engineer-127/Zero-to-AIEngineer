import { useEffect, useRef, useState } from "react";
import { ResList } from "./Roadmap.jsx";

function CodeBlock({ code }) {
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

function Sec({ label, className = "", children }) {
  return <section className={`l-sec ${className}`}><h3>{label}</h3>{children}</section>;
}

export default function LessonModal({ track, id, progress, onOpen, onClose }) {
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const nextRef = useRef(null);
  const [justDone, setJustDone] = useState(false);

  const les = track.LESSONS[id];
  const w = track.weekOf(id);
  const n = track.day[id];
  const isProj = id.endsWith("-p");
  const done = progress.isDone(id);
  const prev = track.allIds[n - 2];
  const next = track.allIds[n];

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  useEffect(() => {
    setJustDone(false);
    if (overlayRef.current) overlayRef.current.scrollTop = 0;
    panelRef.current?.querySelector("#l-close")?.focus({ preventScroll: true });
  }, [id]);

  useEffect(() => {
    if (justDone) nextRef.current?.focus();
  }, [justDone]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") return onClose();
      if (e.target.closest?.("input,textarea,select")) return;
      if (e.key === "ArrowRight" && next) onOpen(next);
      if (e.key === "ArrowLeft" && prev) onOpen(prev);
      if (e.key === "Tab") {
        const f = [...panelRef.current.querySelectorAll("button:not([disabled]), a, summary")];
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [next, prev, onOpen, onClose]);

  function toggleDone() {
    const val = !done;
    progress.setDone(id, val);
    setJustDone(val && !!next);
  }

  return (
    <div className="lesson-overlay" ref={overlayRef} onClick={(e) => e.target === overlayRef.current && onClose()}>
      <div className="lesson-panel" ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="l-title">
        <header className="l-head" style={{ "--pc": w.p.c }}>
          <div className="l-top">
            <span className="l-eyebrow">Day {n} of {track.total} · Week {w.n} · Phase {w.p.n}: {w.p.name}</span>
            <button className="l-close" type="button" id="l-close" onClick={onClose} aria-label="Close lesson">Close</button>
          </div>
          <h2 id="l-title">{isProj && <span className="tag">Build day</span>}{track.titleOf(id)}</h2>
          <div className="l-meta">
            {les.min && <span className="chip">~{les.min} min</span>}
            <span className="chip">{w.t}</span>
            {done && <span className="chip done">Completed</span>}
          </div>
        </header>
        <div className="l-body">
          <Sec label="Motto: why learn this" className="l-motto"><p className="motto">{les.m}</p></Sec>
          {les.note && <Sec label="⚠ Stay legal" className="l-note"><p>{les.note}</p></Sec>}
          <Sec label="In simple words"><p>{les.e}</p></Sec>
          {les.k?.length > 0 && <Sec label="Key concepts"><ul className="l-list">{les.k.map((x, i) => <li key={i}>{x}</li>)}</ul></Sec>}
          <Sec label={isProj ? "Build it: step by step" : "Hands-on task"} className="l-task">
            <ol className="l-steps">{les.t.map((x, i) => <li key={i}>{x}</li>)}</ol>
          </Sec>
          {les.c && <Sec label="Starter code"><CodeBlock code={les.c} /></Sec>}
          <Sec label={<>Interview questions <small>tap to see a model answer</small></>} className="l-qa">
            {les.q.map((q, i) => (
              <details className="qa" key={`${id}-${i}`} style={{ "--pc": w.p.c }}>
                <summary><span className="qn">Q{i + 1}</span><span>{q[0]}</span></summary>
                <p>{q[1]}</p>
              </details>
            ))}
          </Sec>
          {les.x?.length > 0 && <Sec label="Common mistakes"><ul className="l-list warn">{les.x.map((x, i) => <li key={i}>{x}</li>)}</ul></Sec>}
          <Sec label="You're done when"><p className="done-when">{les.d}</p></Sec>
          <Sec label="Learn from"><ResList track={track} keys={w.res} /></Sec>
        </div>
        <footer className="l-foot">
          <button className="btn" type="button" disabled={!prev} onClick={() => prev && onOpen(prev)}>← Day {prev ? n - 1 : ""}</button>
          <button className={`btn${done ? "" : " primary"}`} type="button" id="l-done" onClick={toggleDone}>
            {done ? "Mark as not done" : `Mark day ${n} complete`}
          </button>
          <button ref={nextRef} className={`btn${justDone ? " primary" : ""}`} type="button" disabled={!next} onClick={() => next && onOpen(next)}>
            Day {next ? n + 1 : ""} →
          </button>
        </footer>
      </div>
    </div>
  );
}
