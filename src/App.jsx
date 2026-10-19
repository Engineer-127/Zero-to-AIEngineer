import { useCallback, useEffect, useState } from "react";
import { buildTrack, readPref, useProgress, writePref } from "./lib/track.js";
import { Phases, Tabs } from "./components/Roadmap.jsx";
import LessonModal from "./components/LessonModal.jsx";
import { Bank, Glossary, Library, Rules, SectionHead, Summary } from "./components/Sections.jsx";

// MERN comes first in the switch and is the default track.
// Each track's lessons are a separate chunk, loaded the first time the track is opened.
const TRACKS = [
  { id: "mern", label: "MERN Developer", sub: "91 days · beginner friendly", title: "Zero to MERN Developer", load: () => import("./tracks/mern/index.jsx") },
  { id: "ai", label: "AI Engineer", sub: "54 weeks · 338 days", title: "Zero to AI Engineer", load: () => import("./tracks/ai/index.jsx") },
  { id: "cyber", label: "Cyber Security", sub: "84 days · ethical & legal", title: "Zero to Ethical Hacker", load: () => import("./tracks/cyber/index.jsx") },
];
const BY_ID = Object.fromEntries(TRACKS.map((t) => [t.id, t]));
const PREF_KEY = "zero-to-x-track";
const loaded = {};

/* Hash routes: #mern/day-5, #ai/day-42. Plain #day-N is the old AI link format. */
function parseHash() {
  const m = location.hash.match(/^#(?:(mern|ai|cyber)\/)?day-(\d+)$/);
  if (!m) return null;
  return { track: m[1] || "ai", day: +m[2] };
}

export default function App() {
  const [route, setRoute] = useState(() => {
    const h = parseHash();
    const fromPref = readPref(PREF_KEY, "mern");
    return { track: h?.track || (BY_ID[fromPref] ? fromPref : "mern"), day: h?.day || null };
  });
  const meta = BY_ID[route.track];
  const [track, setTrack] = useState(() => loaded[route.track] || null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.track = meta.id;
    document.title = meta.title;
    writePref(PREF_KEY, meta.id);
    if (loaded[meta.id]) { setTrack(loaded[meta.id]); return; }
    let live = true;
    setLoadError(false);
    meta.load()
      .then((m) => { loaded[meta.id] = buildTrack(m.default); if (live) setTrack(loaded[meta.id]); })
      .catch(() => live && setLoadError(true));
    return () => { live = false; };
  }, [meta]);

  useEffect(() => {
    const onHash = () => {
      const h = parseHash();
      if (h) setRoute({ track: h.track, day: h.day });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function switchTrack(id) {
    if (id === meta.id) return;
    try { history.replaceState(null, "", location.pathname + location.search); } catch { /* ignore */ }
    setRoute({ track: id, day: null });
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      <div className="trackbar">
        <div className="trackbar-inner">
          <div className="brand"><span className="brand-mark" aria-hidden="true">→</span>Zero to…</div>
          <div className="switch" role="tablist" aria-label="Choose your path">
            {TRACKS.map((t) => (
              <button key={t.id} role="tab" type="button" aria-selected={t.id === meta.id} onClick={() => switchTrack(t.id)}>
                <b>{t.label}</b>
                <span>{t.sub}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {track?.id === meta.id ? (
        <TrackView key={track.id} track={track} requestedDay={route.day} />
      ) : (
        <div className="wrap"><p className="empty" role="status">
          {loadError ? <>Couldn't load this path. <button className="btn" type="button" onClick={() => location.reload()}>Reload</button></> : "Loading…"}
        </p></div>
      )}
    </>
  );
}

function TrackView({ track, requestedDay }) {
  const progress = useProgress(track.storageKey);
  const currentWeek = track.weeks.find((w) => !w.ids.every(progress.isDone)) || null;
  const [view, setView] = useState(() => (currentWeek ? currentWeek.p.n : "all"));
  const [openWeeks, setOpenWeeks] = useState(() => new Set(currentWeek ? [currentWeek.n] : []));
  const [lessonId, setLessonId] = useState(null);

  const openLesson = useCallback((id) => {
    if (!track.LESSONS[id]) return;
    setLessonId(id);
    try { history.replaceState(null, "", `#${track.id}/day-${track.day[id]}`); } catch { /* ignore */ }
  }, [track]);

  const closeLesson = useCallback(() => {
    setLessonId(null);
    try { history.replaceState(null, "", location.pathname + location.search); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const id = requestedDay && track.allIds[requestedDay - 1];
    if (id) openLesson(id);
  }, [requestedDay, track, openLesson]);

  const toggleWeek = (n) => setOpenWeeks((s) => { const x = new Set(s); x.has(n) ? x.delete(n) : x.add(n); return x; });

  function gotoWeek(w) {
    setView(w.p.n);
    setOpenWeeks((s) => new Set(s).add(w.n));
    requestAnimationFrame(() => {
      document.getElementById(`week-${w.n}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById(`wh-${w.n}`)?.focus({ preventScroll: true });
    });
  }

  const [confirmReset, setConfirmReset] = useState(false);
  const isMern = track.id === "mern";
  const TrackMap = track.Map;

  return (
    <div className="wrap">
      <header>
        <div className="eyebrow">
          {track.total} daily lessons · {track.questionCount} interview questions · {isMern ? "about 90 days" : `${track.weeks.length} weeks`} · {track.PHASES.length} phases
          {isMern && " · no coding background needed"}
        </div>
        <h1>{track.title} <span className="arrow">→</span></h1>
        <p className="lede">{track.lede}</p>
        {track.banner && (
          <div className="legal-banner" role="note">
            <b>⚖ Ethical &amp; legal only.</b> {track.banner}
          </div>
        )}
        {track.pace && (
          <div className="pace" aria-label="Choose your pace">
            {track.pace.map(([name, len, how]) => (
              <div key={name}><b>{name}: <em>{len}</em></b>{how}</div>
            ))}
          </div>
        )}
      </header>

      <Summary track={track} progress={progress} onLesson={openLesson} onGotoWeek={gotoWeek} />

      <section aria-labelledby="map-h" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SectionHead id="map-h" title={track.mapTitle}>{track.mapIntro}</SectionHead>
        <TrackMap />
      </section>

      <section aria-labelledby="road-h" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <SectionHead id="road-h" title="The roadmap">
          Open a week, work through the daily lessons, finish the project. Already know something? Use "Mark week done" to skip ahead.
        </SectionHead>
        <Tabs track={track} view={view} setView={setView} progress={progress} />
        <Phases track={track} view={view} openWeeks={openWeeks} toggleWeek={toggleWeek} currentWeek={currentWeek} progress={progress} onLesson={openLesson} />
      </section>

      {track.glossary && <Glossary items={track.glossary} />}

      <Bank track={track} onLesson={openLesson} />

      <Rules rules={track.rules} />

      <Library lib={track.LIB} />

      <footer>
        <span>Progress is saved in this browser only, separately for each path.</span>
        <div>
          {confirmReset ? (
            <span className="confirm">
              Clear all ticks for {track.label}?
              <button className="btn" type="button" onClick={() => { progress.reset(); setConfirmReset(false); }}>Yes, reset</button>
              <button className="btn" type="button" onClick={() => setConfirmReset(false)}>Cancel</button>
            </span>
          ) : (
            <button className="btn" type="button" onClick={() => setConfirmReset(true)}>Reset progress</button>
          )}
        </div>
      </footer>

      {lessonId && <LessonModal track={track} id={lessonId} progress={progress} onOpen={openLesson} onClose={closeLesson} />}
    </div>
  );
}
