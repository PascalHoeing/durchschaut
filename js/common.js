// Bausteine, die viele Kapitel teilen.
import { countTier } from "./sim.js";

// Prüftag: Jemand vergleicht deine Beiträge mit den Fakten.
// cfg: { intro, who, praise, items: string[], crowd, reply: [fair, subtil, plump] }
export function checkDay(run, fx, cfg) {
  const s = countTier(run, "subtil"), p = countTier(run, "plump");
  if (!s && !p) {
    return { intro: cfg.intro, events: [{ who: cfg.who, text: cfg.praise, fx: fx(130, 6, -1) }] };
  }
  const items = cfg.items.length ? cfg.items : [cfg.fallback || "Mehrere deiner Aussagen halten einer Prüfung nicht stand."];
  return {
    intro: cfg.intro,
    events: [
      { who: cfg.who, items },
      { who: "news", text: cfg.crowd, fx: fx(-(30 * s + 120 * p), -(1 * s + 4 * p), 0) },
    ],
    decisions: [{
      q: cfg.q || "Wie reagierst du?",
      opts: [
        { tier: "fair", f: -20, t: 5 + p, s: -2, ...cfg.reply[0] },
        { tier: "subtil", f: 20, t: -2, s: 1, ...cfg.reply[1] },
        { tier: "plump", flag: "doubleDown", f: 150, t: -7, s: 5, ...cfg.reply[2] },
      ],
    }],
  };
}

export const person = (name, initials, color) => ({ name, initials, color });
