import { useDeferredValue, useMemo, useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import { SectionHead } from "./Sections.jsx";

/* One coding drill: the problem, hidden solutions (several ways to write it), and why each works.
   Shape: { q: "problem", s: [{ t: "option label", c: "code", e: "explanation" }] } */
export function Drill({ drill, n, color, footer, open }) {
  return (
    <details className="qa drill" open={open} style={{ "--pc": color }}>
      <summary><span className="qn">{n}</span><span>{drill.q}</span></summary>
      <div className="drill-body">
        {drill.s.map((sol, i) => (
          <div className="drill-opt" key={i}>
            {drill.s.length > 1 && <div className="drill-label">Option {i + 1}{sol.t ? `: ${sol.t}` : ""}</div>}
            {drill.s.length === 1 && sol.t && <div className="drill-label">{sol.t}</div>}
            <CodeBlock code={sol.c} />
            {sol.e && <p className="drill-why">{sol.e}</p>}
          </div>
        ))}
        {footer}
      </div>
    </details>
  );
}

export function LessonDrills({ drills, color }) {
  return drills.map((d, i) => <Drill key={i} drill={d} n={`D${i + 1}`} color={color} />);
}

/* Every drill from every lesson on the roadmap page, searchable, so learners can drill syntax by topic. */
export function DrillBank({ track, onLesson }) {
  const [week, setWeek] = useState("all");
  const [query, setQuery] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const deferredQuery = useDeferredValue(query);

  const drillWeeks = useMemo(
    () => track.weeks.filter((w) => w.ids.some((id) => track.LESSONS[id]?.p?.length)),
    [track]
  );

  const rows = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const out = [];
    drillWeeks.forEach((w) => {
      if (week !== "all" && w.n !== week) return;
      w.ids.forEach((id) => {
        (track.LESSONS[id]?.p || []).forEach((d, i) => {
          const hay = `${d.q} ${track.titleOf(id)} ${d.s.map((s) => `${s.t || ""} ${s.c}`).join(" ")}`.toLowerCase();
          if (q && !hay.includes(q)) return;
          out.push({ key: `${id}-${i}`, id, w, d });
        });
      });
    });
    return out;
  }, [track, drillWeeks, week, deferredQuery]);

  if (!drillWeeks.length) return null;

  return (
    <section aria-labelledby="drill-h" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SectionHead id="drill-h" title={track.drillTitle || "Coding drills"}>{track.drillHint}</SectionHead>
      <div className="bank-controls">
        <select aria-label="Filter by week" value={week} onChange={(e) => setWeek(e.target.value === "all" ? "all" : +e.target.value)}>
          <option value="all">All weeks</option>
          {drillWeeks.map((w) => <option key={w.n} value={w.n}>Week {w.n}: {w.t}</option>)}
        </select>
        <input type="search" placeholder='Search, e.g. "dict"' aria-label="Search drills" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn" type="button" onClick={() => setOpenAll(!openAll)}>{openAll ? "Hide all solutions" : "Show all solutions"}</button>
        <span className="bank-count">{rows.length} drill{rows.length === 1 ? "" : "s"}</span>
      </div>
      <div className="bank-list">
        {rows.length ? rows.map(({ key, id, w, d }) => (
          <Drill
            key={`${key}-${openAll}`}
            drill={d}
            n={`W${w.n}`}
            color={w.p.c}
            open={openAll}
            footer={<button className="linkish" type="button" onClick={() => onLesson(id)}>From Day {track.day[id]}: {track.titleOf(id)} →</button>}
          />
        )) : <p className="empty">No drills match. Try a different word.</p>}
      </div>
    </section>
  );
}
