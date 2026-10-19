import { useCallback, useState } from "react";

export const pad = (n) => String(n).padStart(2, "0");

/* Derive week numbers, task ids, day numbers and phase links from a track definition. */
export function buildTrack(def) {
  const weeks = def.WEEKS.map((w, i) => {
    const n = i + 1;
    const ids = w.tasks.map((_, j) => `w${n}-${j + 1}`);
    ids.push(`w${n}-p`);
    return { ...w, n, ids, p: def.PHASES.find((p) => n >= p.w[0] && n <= p.w[1]) };
  });
  const allIds = weeks.flatMap((w) => w.ids);
  const day = {};
  allIds.forEach((id, i) => (day[id] = i + 1));
  const weekOf = (id) => weeks[+id.slice(1).split("-")[0] - 1];
  const titleOf = (id) => {
    const w = weekOf(id);
    return id.endsWith("-p") ? w.proj : w.tasks[+id.split("-")[1] - 1];
  };
  const questionCount = allIds.reduce((n, id) => n + (def.LESSONS[id]?.q?.length || 0), 0);
  return { ...def, weeks, allIds, day, total: allIds.length, weekOf, titleOf, questionCount };
}

/* Progress for one track, persisted in localStorage under the track's own key. */
export function useProgress(storageKey) {
  const read = () => {
    try {
      const v = JSON.parse(localStorage.getItem(storageKey) || "null");
      return v && typeof v.done === "object" ? { ...v.done } : {};
    } catch {
      return {};
    }
  };
  // The track view is keyed by track id, so this hook mounts fresh per track.
  const [done, setDoneMap] = useState(read);

  const persist = useCallback(
    (next) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify({ done: next }));
      } catch {
        /* storage unavailable: progress lives for this session only */
      }
      return next;
    },
    [storageKey]
  );

  const setMany = useCallback(
    (ids, val) =>
      setDoneMap((prev) => {
        const next = { ...prev };
        ids.forEach((id) => (val ? (next[id] = 1) : delete next[id]));
        return persist(next);
      }),
    [persist]
  );

  const reset = useCallback(() => setDoneMap(persist({})), [persist]);

  return { done, isDone: (id) => !!done[id], setDone: (id, val) => setMany([id], val), setMany, reset };
}

export function readPref(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}
