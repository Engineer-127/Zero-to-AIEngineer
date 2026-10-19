import { useDeferredValue, useMemo, useState } from "react";
import { pad } from "../lib/track.js";

export function Summary({ track, progress, onLesson, onGotoWeek }) {
  const doneCount = track.allIds.filter(progress.isDone).length;
  const pct = Math.round((doneCount / track.total) * 100);
  const weekDone = (w) => w.ids.every(progress.isDone);
  const phaseCount = (p) => {
    const ids = track.weeks.filter((w) => w.p === p).flatMap((w) => w.ids);
    return [ids.filter(progress.isDone).length, ids.length];
  };
  const projDone = track.weeks.filter((w) => progress.isDone(w.ids[w.ids.length - 1])).length;
  const phasesDone = track.PHASES.filter((p) => { const [d, t] = phaseCount(p); return d === t; }).length;
  const nid = track.allIds.find((id) => !progress.isDone(id));

  return (
    <section className="summary" aria-label="Progress">
      <div className="panel overall">
        <div className="overall-top">
          <div className="big">{pct}%<small>complete</small></div>
          <div className="status" data-s="local">Saved in this browser</div>
        </div>
        <div>
          <div className="phasebar">
            {track.PHASES.map((p) => {
              const [d, t] = phaseCount(p);
              return <span key={p.n} title={`P${p.n} ${p.name}: ${d}/${t}`} style={{ "--pc": p.c }}><i style={{ width: `${((d / t) * 100).toFixed(1)}%` }} /></span>;
            })}
          </div>
          <div className="phasebar-labels">{track.PHASES.map((p) => <span key={p.n}>P{p.n}</span>)}</div>
        </div>
        <div className="stats">
          <span><b>{doneCount}</b> / {track.total} days</span>
          <span><b>{track.weeks.filter(weekDone).length}</b> / {track.weeks.length} weeks</span>
          <span><b>{projDone}</b> / {track.weeks.length} projects</span>
          <span><b>{phasesDone}</b> / {track.PHASES.length} phases</span>
        </div>
      </div>
      <div className="panel next">
        {nid ? (() => {
          const w = track.weekOf(nid);
          return (
            <>
              <div className="label" style={{ color: w.p.c }}>Today · Day {track.day[nid]} of {track.total} · W{pad(w.n)}</div>
              <h3>{track.titleOf(nid)}</h3>
              {track.LESSONS[nid] && <p>{track.LESSONS[nid].m}</p>}
              <div className="next-actions">
                <button className="btn primary" type="button" onClick={() => onLesson(nid)}>Start today's lesson</button>
                <button className="btn" type="button" onClick={() => onGotoWeek(w)}>Open week {w.n}</button>
              </div>
            </>
          );
        })() : (
          <>
            <div className="label">All done</div>
            <h3>You finished all {track.total} days.</h3>
            <p>{track.doneMessage}</p>
          </>
        )}
      </div>
    </section>
  );
}

export function SectionHead({ id, title, children }) {
  return (
    <div className="section-head">
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Bank({ track, onLesson }) {
  const [phase, setPhase] = useState("all");
  const [query, setQuery] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const rows = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const out = [];
    track.allIds.forEach((id) => {
      const les = track.LESSONS[id];
      if (!les) return;
      const w = track.weekOf(id);
      if (phase !== "all" && w.p.n !== phase) return;
      les.q.forEach((pair, i) => {
        if (q && !`${pair[0]} ${pair[1]} ${track.titleOf(id)}`.toLowerCase().includes(q)) return;
        out.push({ key: `${id}-${i}`, id, w, pair });
      });
    });
    return out;
  }, [track, phase, deferredQuery]);

  return (
    <section aria-labelledby="bank-h" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SectionHead id="bank-h" title="Interview question bank">{track.bankHint}</SectionHead>
      <div className="bank-controls">
        <select aria-label="Filter by phase" value={phase} onChange={(e) => setPhase(e.target.value === "all" ? "all" : +e.target.value)}>
          <option value="all">All phases</option>
          {track.PHASES.map((p) => <option key={p.n} value={p.n}>Phase {p.n}: {p.name}</option>)}
        </select>
        <input type="search" placeholder="Search questions" aria-label="Search questions" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn" type="button" onClick={() => setOpenAll(!openAll)}>{openAll ? "Hide all answers" : "Show all answers"}</button>
        <span id="bank-count">{rows.length} question{rows.length === 1 ? "" : "s"}</span>
      </div>
      <div id="bank-list">
        {rows.length ? rows.map(({ key, id, w, pair }) => (
          <details className="qa bank-item" key={`${key}-${openAll}`} open={openAll} style={{ "--pc": w.p.c }}>
            <summary><span className="qn">P{w.p.n}</span><span>{pair[0]}</span></summary>
            <p>{pair[1]}</p>
            <button className="linkish" type="button" onClick={() => onLesson(id)}>From Day {track.day[id]}: {track.titleOf(id)} →</button>
          </details>
        )) : <p className="empty">No questions match. Try a different word.</p>}
      </div>
    </section>
  );
}

export function Glossary({ items }) {
  const [q, setQ] = useState("");
  const shown = items.filter(([t, d]) => !q || `${t} ${d}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <section aria-labelledby="gl-h" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SectionHead id="gl-h" title="Jargon buster">New to tech? These are the words you'll hear most, in plain English. Come back whenever a lesson uses a word you don't know.</SectionHead>
      <div className="gl-controls">
        <input type="search" placeholder="Look up a word" aria-label="Look up a word" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <dl className="glossary">
        {shown.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
      </dl>
      {!shown.length && <p className="empty">No words match.</p>}
    </section>
  );
}

export function Rules({ rules }) {
  return (
    <section aria-labelledby="rules-h" className="panel" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <h2 id="rules-h" style={{ fontSize: 22 }}>Rules that matter more than any course</h2>
      <ol className="rules">
        {rules.map(([b, t]) => <li key={b}><span><b>{b}</b> {t}</span></li>)}
      </ol>
    </section>
  );
}

export function Library({ lib }) {
  return (
    <section aria-labelledby="lib-h" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SectionHead id="lib-h" title="The library">The best free material, used across the whole path.</SectionHead>
      <div className="lib">
        {lib.map((g) => (
          <div className="panel" key={g.h}>
            <h3>{g.h}</h3>
            <ul className="res">
              {g.items.map((i) => (
                <li key={i[0]}><a href={i[1]} target="_blank" rel="noopener noreferrer"><span>{i[0]}<small>{i[2]}</small></span></a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
