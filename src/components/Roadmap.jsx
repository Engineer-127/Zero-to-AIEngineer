import { pad } from "../lib/track.js";

export function Ring({ done, total, color }) {
  const r = 13, c = 2 * Math.PI * r, f = total ? done / total : 0;
  return (
    <svg className="ring" viewBox="0 0 34 34" aria-hidden="true">
      <circle className="bgc" cx="17" cy="17" r={r} />
      <circle className="fg" cx="17" cy="17" r={r} strokeDasharray={`${(c * f).toFixed(2)} ${c.toFixed(2)}`} transform="rotate(-90 17 17)" style={{ stroke: color }} />
      <text x="17" y="20.5" textAnchor="middle">{done}</text>
    </svg>
  );
}

export function ResList({ track, keys }) {
  return (
    <ul className="res">
      {keys.map((k) => {
        const r = track.R[k];
        return r ? (
          <li key={k}><a href={r[1]} target="_blank" rel="noopener noreferrer"><span>{r[0]}</span></a></li>
        ) : null;
      })}
    </ul>
  );
}

function TaskRow({ track, id, text, isProj, progress, onLesson }) {
  const lesson = track.LESSONS[id];
  const n = track.day[id];
  return (
    <li className={`task${isProj ? " proj" : ""}`}>
      <label>
        <input type="checkbox" checked={progress.isDone(id)} onChange={(e) => progress.setDone(id, e.target.checked)} />
        <span>
          {isProj && <span className="tag">Build</span>}
          {text}
          <em className="daytag">Day {n}{lesson?.min ? ` · ~${lesson.min} min` : ""}</em>
        </span>
      </label>
      {lesson && (
        <button className="lesson-btn" type="button" onClick={() => onLesson(id)} aria-label={`Open lesson for day ${n}`}>Lesson</button>
      )}
    </li>
  );
}

function Week({ track, w, isCurrent, isOpen, onToggle, progress, onLesson }) {
  const d = w.ids.filter(progress.isDone).length, t = w.ids.length;
  const pid = w.ids[w.ids.length - 1];
  return (
    <article className={`week${isCurrent ? " current" : ""}`} id={`week-${w.n}`} style={{ "--pc": w.p.c }}>
      <button className="wk-head" type="button" aria-expanded={isOpen} aria-controls={`wb-${w.n}`} id={`wh-${w.n}`} onClick={onToggle}>
        <span className="wk-code">W{pad(w.n)}</span>
        <span className="wk-title">
          <b>{w.t}</b>
          <span>Days {track.day[w.ids[0]]}–{track.day[pid]} · {w.tasks.length} topics + project · ~{w.h} hrs</span>
        </span>
        <span className="wk-meta">
          {d === t ? <span className="badge done">Done</span> : isCurrent ? <span className="badge" style={{ background: w.p.c }}>Up next</span> : null}
          <Ring done={d} total={t} color={w.p.c} />
        </span>
      </button>
      {isOpen && (
        <div className="wk-body" id={`wb-${w.n}`}>
          <p className="goal">{w.goal}</p>
          <ul className="tasks">
            {w.tasks.map((txt, j) => (
              <TaskRow key={w.ids[j]} track={track} id={w.ids[j]} text={txt} progress={progress} onLesson={onLesson} />
            ))}
            <TaskRow track={track} id={pid} text={w.proj} isProj progress={progress} onLesson={onLesson} />
          </ul>
          <div className="aside">
            <div><h4>Learn from</h4><ResList track={track} keys={w.res} /></div>
            <div><h4>Skills</h4><div className="chips">{w.skills.map((s) => <span className="chip" key={s}>{s}</span>)}</div></div>
            <div className="wk-actions">
              <button className="btn" type="button" onClick={() => progress.setMany(w.ids, d !== t)}>{d === t ? "Clear week" : "Mark week done"}</button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export function Tabs({ track, view, setView, progress }) {
  const pct = (ids) => Math.round((ids.filter(progress.isDone).length / ids.length) * 100);
  const phaseIds = (p) => track.weeks.filter((w) => w.p === p).flatMap((w) => w.ids);
  return (
    <div className="tabs" role="tablist" aria-label="Phases">
      <button className="tab" role="tab" type="button" aria-selected={view === "all"} onClick={() => setView("all")}>
        <span className="dot" style={{ "--pc": "var(--ink)" }} />All phases<span className="pct">{pct(track.allIds)}%</span>
      </button>
      {track.PHASES.map((p) => (
        <button key={p.n} className="tab" role="tab" type="button" aria-selected={view === p.n} style={{ "--pc": p.c }} onClick={() => setView(p.n)}>
          <span className="dot" />P{p.n} {p.name}<span className="pct">{pct(phaseIds(p))}%</span>
        </button>
      ))}
    </div>
  );
}

export function Phases({ track, view, openWeeks, toggleWeek, currentWeek, progress, onLesson }) {
  const list = view === "all" ? track.PHASES : track.PHASES.filter((p) => p.n === view);
  return (
    <div>
      {list.map((p) => (
        <section className="phase" key={p.n} style={{ "--pc": p.c }}>
          <div className="phase-head">
            <span className="phase-num">P{pad(p.n)}</span>
            <h2>{p.name}</h2>
            <span className="range">{p.w[0] === p.w[1] ? `W${pad(p.w[0])}` : `W${pad(p.w[0])}–W${pad(p.w[1])}`}</span>
            <p>{p.goal}</p>
          </div>
          {track.weeks.filter((w) => w.p === p).map((w) => (
            <Week
              key={w.n}
              track={track}
              w={w}
              isCurrent={currentWeek?.n === w.n}
              isOpen={openWeeks.has(w.n)}
              onToggle={() => toggleWeek(w.n)}
              progress={progress}
              onLesson={onLesson}
            />
          ))}
        </section>
      ))}
    </div>
  );
}
