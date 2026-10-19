/* Everything is route-based, driven by the URL hash. Hash shapes:
   #<track>            -> that track's roadmap
   #<track>/day-N      -> that track's day N as a full page
   #day-N              -> legacy AI link, kept working
   The hashchange handler in App is the single source of truth for the current route. */
export function parseHash() {
  const h = location.hash;
  let m = h.match(/^#([a-z]+)(?:\/day-(\d+))?$/);
  if (m) return { track: m[1], day: m[2] ? +m[2] : null };
  m = h.match(/^#day-(\d+)$/);
  if (m) return { track: "ai", day: +m[1] };
  return null;
}

/* Navigate by changing the URL hash (a real route change, no dialogs). */
export function go(track, day) {
  location.hash = day ? `#${track}/day-${day}` : `#${track}`;
}
