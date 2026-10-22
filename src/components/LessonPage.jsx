import { useEffect } from "react";
import { ResList } from "./Roadmap.jsx";
import { CodeBlock } from "./CodeBlock.jsx";
import { LessonDrills } from "./Drills.jsx";
import { go } from "../lib/router.js";

function Sec({ label, className = "", children }) {
  return <section className={`l-sec ${className}`}><h3>{label}</h3>{children}</section>;
}

/* A lesson is a full page reached by its own route (#track/day-N), not a dialog. */
export default function LessonPage({ track, id, progress }) {
  const les = track.LESSONS[id];
  const w = track.weekOf(id);
  const n = track.day[id];
  const isProj = id.endsWith("-p");
  const done = progress.isDone(id);
  const prevId = track.allIds[n - 2];
  const nextId = track.allIds[n];
  const prevDay = prevId ? n - 1 : null;
  const nextDay = nextId ? n + 1 : null;

  const toRoadmap = () => go(track.id);
  const gotoDay = (d) => go(track.id, d);

  // Left/right arrows move between days, the way a reader expects on a routed page.
  useEffect(() => {
    function onKey(e) {
      if (e.target.closest?.("input,textarea,select,button,a,summary")) return;
      if (e.key === "ArrowRight" && nextDay) gotoDay(nextDay);
      if (e.key === "ArrowLeft" && prevDay) gotoDay(prevDay);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prevDay, nextDay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="wrap lesson-wrap">
      <nav className="lesson-nav" aria-label="Lesson navigation">
        <a href={`#${track.id}`} className="back-link" onClick={(e) => { e.preventDefault(); toRoadmap(); }}>← All {track.PHASES.length} phases</a>
        <span className="lesson-crumb">{track.title}</span>
      </nav>

      <article className="lesson-page" style={{ "--pc": w.p.c }}>
        <header className="l-head">
          <div className="l-top">
            <span className="l-eyebrow">Day {n} of {track.total} · Week {w.n} · Phase {w.p.n}: {w.p.name}</span>
          </div>
          <h1 className="l-title">{isProj && <span className="tag">Build day</span>}{track.titleOf(id)}</h1>
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
          {les.p?.length > 0 && (
            <Sec label={<>Syntax drills <small>try each one yourself first, then compare with the solutions</small></>} className="l-qa">
              <LessonDrills drills={les.p} color={w.p.c} />
            </Sec>
          )}
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
          <button className="btn" type="button" disabled={!prevDay} onClick={() => prevDay && gotoDay(prevDay)}>← Day {prevDay || ""}</button>
          <button className={`btn${done ? "" : " primary"}`} type="button" onClick={() => progress.setDone(id, !done)}>
            {done ? "Mark as not done" : `Mark day ${n} complete`}
          </button>
          <button className={`btn${done && nextDay ? " primary" : ""}`} type="button" disabled={!nextDay} onClick={() => nextDay && gotoDay(nextDay)}>
            Day {nextDay || ""} →
          </button>
        </footer>
      </article>

      <p className="lesson-foot-link">
        <a href={`#${track.id}`} onClick={(e) => { e.preventDefault(); toRoadmap(); }}>← Back to the roadmap</a>
      </p>
    </div>
  );
}
