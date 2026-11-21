import { resolveTheme } from "./daylight.js";
import { townSVG } from "./town.js";
import { CAMPAIGNS, PEOPLE, COMPETITORS, TECHNIQUES } from "./content.js";
import { CHAPTERS, PLANNED } from "./chapters.js";
import { newRun, startDay, applyOption, endDay, ranking, stars, poll } from "./sim.js";

let CH = CHAPTERS[0]; // aktuell gespieltes Kapitel

/* ============================================================
   Speicher (nur auf diesem Gerät)
   ============================================================ */
const KEY = "durchschaut-v2";
const DEFAULT = { settings: { theme: "auto" }, progress: { chapters: {}, learned: [] } };
let store = structuredClone(DEFAULT);
try {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    const s = JSON.parse(raw);
    store = { settings: { ...DEFAULT.settings, ...s.settings }, progress: { ...DEFAULT.progress, ...s.progress } };
  }
} catch (e) { /* ohne Speicher weiterspielen */ }
function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { /* ignorieren */ } }

/* ============================================================
   Tag und Nacht
   ============================================================ */
let theme = "night";
function applyTheme() {
  theme = resolveTheme(store.settings.theme);
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "day" ? "#EEF3F8" : "#141B2D");
}
applyTheme();
setInterval(() => {
  const before = theme;
  applyTheme();
  if (before !== theme && S.view === "menu") render();
}, 60000);

/* ============================================================
   Zustand
   ============================================================ */
let S = { view: "menu", tab: "play" };
let confirmReset = false;

const fmt = n => Math.round(n).toLocaleString("de-DE");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

/* ============================================================
   Bausteine
   ============================================================ */
const ICONS = {
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7",
  gear: "M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  lock: "M6 11h12v10H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  moon: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
  sun: "M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5",
  play: "M8 5v14l11-7z",
  pause: "M8 5v14M16 5v14",
  next: "M6 5v14l9-7zM18 5v14",
  user: "M12 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8zM4 21a8 8 0 0 1 16 0",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  sound: "M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11",
  mute: "M4 9v6h4l5 4V5L8 9zM16 9l5 6M21 9l-5 6",
  text: "M4 6h16M4 11h16M4 16h10",
  back: "M15 5l-7 7 7 7",
  comment: "M4 5h16v11H8l-4 4z",
  share: "M7 7h11l-3-3M17 17H6l3 3",
  shield: "M12 3l8 4v5c0 4.4-3.4 8.4-8 9-4.6-.6-8-4.6-8-9V7z",
  check: "M5 12l5 5L20 7",
};
function icon(name, size = 22, filled = false) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" style="flex:none"><path d="${ICONS[name]}" fill="${filled ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

let faceId = 0;
function face(id, size = 44) {
  const day = theme === "day";
  const bg = day ? "#DCE9F4" : "#22304F";
  const feat = "#16181D";
  const c = {
    ilse: { cl: day ? "#5E9A7A" : "#4F7A66", skin: "#F0C8A8", hair: day ? "#C9CCD4" : "#B9BDC8" },
    deniz: { cl: day ? "#D9604A" : "#B0503C", skin: "#C68E6A", hair: "#2B2421", cap: day ? "#E7A93B" : "#F2B84B" },
    yilmaz: { cl: day ? "#8A6A4A" : "#7A5C40", skin: "#D9A47E", hair: "#3A2E2A", apron: "#F3EEE4" },
    kessler: { cl: day ? "#4C6496" : "#3E5285", skin: "#F3D2B8", hair: "#3A2E2A" },
    moeller: { cl: day ? "#9A6BB0" : "#7E5A92", skin: "#E9C09E", hair: "#B5772E" },
  }[id];
  let g = "";
  if (id === "ilse") {
    g = `<path d="M22 140 C22 110 40 98 60 98 C80 98 98 110 98 140Z" fill="${c.cl}"/><rect x="52" y="82" width="16" height="18" fill="${c.skin}"/><circle cx="60" cy="62" r="24" fill="${c.skin}"/>`
      + `<path d="M36 62 C34 42 46 34 60 34 C74 34 86 42 84 62 C80 50 70 45 60 45 C50 45 40 50 36 62Z" fill="${c.hair}"/><circle cx="60" cy="29" r="9" fill="${c.hair}"/>`
      + `<circle cx="51" cy="64" r="6" fill="none" stroke="${feat}" stroke-width="2"/><circle cx="69" cy="64" r="6" fill="none" stroke="${feat}" stroke-width="2"/><line x1="57" y1="64" x2="63" y2="64" stroke="${feat}" stroke-width="2"/>`
      + `<path d="M53 75 Q60 80 67 75" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (id === "deniz") {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><rect x="52" y="80" width="16" height="18" fill="${c.skin}"/><circle cx="60" cy="62" r="23" fill="${c.skin}"/>`
      + `<path d="M37 56 C37 38 48 32 60 32 C72 32 83 38 83 56Z" fill="${c.cap}"/><path d="M80 54 L98 56 L82 60Z" fill="${c.cap}"/>`
      + `<circle cx="52" cy="65" r="2.5" fill="${feat}"/><circle cx="68" cy="65" r="2.5" fill="${feat}"/><path d="M54 75 H66" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (id === "yilmaz") {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><path d="M42 140 V104 H78 V140Z" fill="${c.apron}"/><rect x="52" y="80" width="16" height="18" fill="${c.skin}"/><circle cx="60" cy="62" r="23" fill="${c.skin}"/>`
      + `<path d="M38 58 C38 40 48 36 60 36 C72 36 82 40 82 58 C76 48 66 46 60 46 C54 46 44 48 38 58Z" fill="${c.hair}"/><path d="M50 74 Q60 70 70 74" fill="none" stroke="${c.hair}" stroke-width="5" stroke-linecap="round"/>`
      + `<circle cx="52" cy="62" r="2.5" fill="${feat}"/><circle cx="68" cy="62" r="2.5" fill="${feat}"/><path d="M54 80 Q60 84 66 80" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (id === "moeller") {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><rect x="52" y="82" width="16" height="16" fill="${c.skin}"/>`
      + `<path d="M36 66 C34 42 46 34 60 34 C76 34 86 44 84 66 C90 76 92 88 88 96 C80 90 82 76 80 66Z" fill="${c.hair}"/><circle cx="60" cy="62" r="21" fill="${c.skin}"/>`
      + `<path d="M39 58 C42 44 52 40 62 40 C72 40 80 46 81 58 C70 50 52 50 39 58Z" fill="${c.hair}"/><circle cx="52" cy="64" r="2.5" fill="${feat}"/><circle cx="68" cy="64" r="2.5" fill="${feat}"/>`
      + `<path d="M54 74 Q60 72 66 74" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><path d="M50 96 L60 120 L70 96Z" fill="#FFFFFF"/><rect x="52" y="82" width="16" height="16" fill="${c.skin}"/>`
      + `<path d="M34 72 C32 44 44 36 60 36 C76 36 88 44 86 72 L80 84 L40 84Z" fill="${c.hair}"/><circle cx="60" cy="62" r="21" fill="${c.skin}"/>`
      + `<path d="M40 56 C44 42 54 40 62 40 C72 40 80 46 80 56 C72 50 58 50 40 56Z" fill="${c.hair}"/><circle cx="52" cy="64" r="2.5" fill="${feat}"/><circle cx="68" cy="64" r="2.5" fill="${feat}"/>`
      + `<path d="M54 74 Q60 77 66 74" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  }
  const cid = "fc" + (++faceId);
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true" style="flex:none;display:block"><defs><clipPath id="${cid}"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#${cid})"><rect width="120" height="120" fill="${bg}"/><g transform="translate(0 -6)">${g}</g></g></svg>`;
}

function photo(kind) {
  if (kind === "ilse") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Ilse in Nahaufnahme, nachdenklich"><rect width="320" height="170" fill="#C9C2B4"/>`
      + `<rect width="320" height="170" fill="#8D8678" opacity="0.35"/>`
      + `<path d="M90 170 C90 130 120 112 160 112 C200 112 230 130 230 170Z" fill="#5E7A6A"/><rect x="146" y="92" width="28" height="26" fill="#E8BFA0"/>`
      + `<circle cx="160" cy="70" r="38" fill="#EFC6A6"/><path d="M122 70 C118 36 140 24 160 24 C180 24 202 36 198 70 C192 50 176 42 160 42 C144 42 128 50 122 70Z" fill="#CFCFD4"/><circle cx="160" cy="20" r="13" fill="#CFCFD4"/>`
      + `<circle cx="146" cy="74" r="9" fill="none" stroke="#2A2A2A" stroke-width="2.5"/><circle cx="174" cy="74" r="9" fill="none" stroke="#2A2A2A" stroke-width="2.5"/><line x1="155" y1="74" x2="165" y2="74" stroke="#2A2A2A" stroke-width="2.5"/>`
      + `<path d="M140 64 Q146 61 152 64 M168 64 Q174 61 180 64" stroke="#7A6A5A" stroke-width="2" fill="none" stroke-linecap="round"/>`
      + `<path d="M150 92 Q160 88 170 92" fill="none" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>`
      + `<path d="M196 120 C206 104 214 98 222 100 C226 112 218 124 206 132Z" fill="#E8BFA0"/></svg>`;
  }
  if (kind === "map") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Plan der Freifläche mit markierter Ecke"><rect width="320" height="170" fill="#F3EEE4"/>`
      + `<rect x="40" y="24" width="240" height="122" fill="#DCE8D2" stroke="#8796B0" stroke-width="2"/>`
      + `<path d="M40 24 h240 v122 h-240z" fill="none" stroke="#8796B0" stroke-width="2" stroke-dasharray="2 0"/>`
      + `<rect x="236" y="108" width="44" height="38" fill="#D9604A" opacity="0.35" stroke="#D9604A" stroke-width="2" stroke-dasharray="5 4"/>`
      + `<text x="160" y="90" font-size="13" font-weight="700" font-family="Inter, sans-serif" fill="#4A5878" text-anchor="middle">Freifläche · 4.000 m²</text>`
      + `<text x="258" y="131" font-size="9" font-weight="700" font-family="Inter, sans-serif" fill="#8F2E1E" text-anchor="middle">betroffen</text>`
      + `<path d="M30 160 h40" stroke="#4A5878" stroke-width="2"/><text x="76" y="164" font-size="9" font-family="Inter, sans-serif" fill="#4A5878">20 m</text></svg>`;
  }
  if (kind === "glove") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Hand im Schutzhandschuh hält eine Bodenprobe"><rect width="320" height="170" fill="#D8DEE4"/>`
      + `<rect y="120" width="320" height="50" fill="#B9C2CC"/>`
      + `<path d="M80 170 C90 120 120 96 150 92 L190 90 C206 90 214 100 206 108 L172 112 C200 116 214 124 208 132 L160 138 C130 150 110 160 100 170Z" fill="#3E8EB8"/>`
      + `<rect x="168" y="44" width="34" height="64" rx="6" fill="#F3F6F9" stroke="#8796B0" stroke-width="2"/>`
      + `<rect x="170" y="76" width="30" height="30" rx="4" fill="#6B5A4A"/><rect x="166" y="38" width="38" height="10" rx="3" fill="#D9604A"/>`
      + `<rect x="174" y="56" width="22" height="10" fill="#FFFFFF" stroke="#8796B0"/><text x="185" y="64" font-size="6" font-family="Inter, sans-serif" fill="#4A5878" text-anchor="middle">P-07</text></svg>`;
  }
  if (kind === "skull") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Symbolbild: Warnschild mit Totenkopf"><rect width="320" height="170" fill="#1E1E1E"/>`
      + `<polygon points="160,18 248,150 72,150" fill="#F2C230" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`
      + `<circle cx="160" cy="92" r="24" fill="#111"/><rect x="146" y="108" width="28" height="16" rx="3" fill="#111"/>`
      + `<circle cx="151" cy="90" r="6" fill="#F2C230"/><circle cx="169" cy="90" r="6" fill="#F2C230"/>`
      + `<path d="M118 132 L202 140 M118 140 L202 132" stroke="#111" stroke-width="7" stroke-linecap="round"/></svg>`;
  }
  if (kind === "tunnel") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Symbolbild: dunkle Unterführung mit Graffiti"><rect width="320" height="170" fill="#15171C"/>`
      + `<path d="M40 170 L110 50 H210 L280 170Z" fill="#262A31"/><path d="M110 50 H210 V120 H110Z" fill="#0C0D10"/>`
      + `<ellipse cx="160" cy="100" rx="22" ry="16" fill="#C9B26A" opacity="0.55"/>`
      + `<path d="M48 150 L82 92 L86 150Z" fill="#3A3F48"/><path d="M58 128 q12 -16 22 0 q-8 10 -22 0z" fill="#8A3B3B" opacity="0.8"/>`
      + `<path d="M236 92 L270 150 L232 150Z" fill="#3A3F48"/><path d="M240 120 h22 M242 130 h18" stroke="#3B6A8A" stroke-width="5" stroke-linecap="round" opacity="0.8"/>`
      + `<rect width="320" height="170" fill="url(#vgt)"/><defs><radialGradient id="vgt" cx="50%" cy="55%" r="70%"><stop offset="45%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.7"/></radialGradient></defs></svg>`;
  }
  // voller Saal im Bürgerhaus
  let heads = "";
  for (let i = 0; i < 26; i++) {
    const x = 18 + (i % 13) * 24 + (i >= 13 ? 12 : 0), y = i >= 13 ? 132 : 110;
    const hair = ["#3A2E2A", "#C9CCD4", "#8A6A4A", "#2B2421", "#B07E5C"][i % 5];
    const coat = ["#4C6496", "#5E9A7A", "#D9604A", "#8A7A6A", "#E7A93B"][(i * 3) % 5];
    heads += `<rect x="${x - 10}" y="${y + 6}" width="20" height="40" rx="8" fill="${coat}"/><circle cx="${x}" cy="${y}" r="8" fill="${hair}"/>`;
  }
  return `<svg viewBox="0 0 320 170" role="img" aria-label="Voller Saal beim Infoabend im Bürgerhaus"><rect width="320" height="170" fill="#E9E2D3"/>`
    + `<rect x="100" y="18" width="120" height="56" rx="4" fill="#FFFFFF" stroke="#C9B79A" stroke-width="2"/><text x="160" y="42" font-size="11" font-weight="700" font-family="Inter, sans-serif" fill="#16213A" text-anchor="middle">Infoabend</text><text x="160" y="58" font-size="10" font-family="Inter, sans-serif" fill="#4A5878" text-anchor="middle">Die Freifläche</text>`
    + `<rect x="236" y="56" width="18" height="40" rx="6" fill="#4C6496"/><circle cx="245" cy="50" r="7" fill="#3A2E2A"/>`
    + heads + `</svg>`;
}

function logo(center = false) {
  return `<div class="logo" style="text-align:${center ? "center" : "left"}"><h1>Durchschaut</h1><p>Willkommen in Lindenhain</p></div>`;
}

function themeLabel() {
  const m = store.settings.theme;
  const now = theme === "day" ? "Tag" : "Abend";
  return m === "auto" ? `Automatisch · ${now}` : now;
}

function hud(v, prev) {
  const d = (k) => {
    if (!prev) return "";
    const x = v[k] - prev[k];
    if (!x) return "";
    const cls = k === "split" ? (x > 0 ? "down" : "up") : (k === "trust" ? (x > 0 ? "up" : "down") : (x > 0 ? "up" : "down"));
    return `<span class="delta ${cls}">${x > 0 ? "+" : "−"}${fmt(Math.abs(x))}</span>`;
  };
  return `<div class="hud" aria-label="Deine Werte">
    <div class="m"><span class="t">Follower</span><span class="n">${fmt(v.followers)}${d("followers")}</span><div class="bar"><i style="width:${clamp(v.followers / 15, 2, 100)}%"></i></div></div>
    <div class="m"><span class="t">Glaubwürdigkeit</span><span class="n">${fmt(v.trust)} %${d("trust")}</span><div class="bar"><i style="width:${v.trust}%"></i></div></div>
    <div class="m split"><span class="t">Spaltung</span><span class="n">${fmt(v.split)} %${d("split")}</span><div class="bar"><i style="width:${v.split}%"></i></div></div>
  </div>`;
}

function deltaChips(o) {
  const chip = (val, name, kind) => {
    if (!val) return `<span class="chip zero">±0 ${name}</span>`;
    let cls;
    if (kind === "split") cls = val > 0 ? "down" : "up";
    else cls = val > 0 ? "up" : "down";
    return `<span class="chip ${cls}">${val > 0 ? "+" : "−"}${fmt(Math.abs(val))} ${name}</span>`;
  };
  return `<div class="chips">${chip(o.f, "Follower", "f")}${chip(o.t, "Glaubwürdigkeit", "t")}${chip(o.s, "Spaltung", "split")}</div>`;
}

function chapterTop(label) {
  return `<div class="row between">
    <button class="pill" data-a="leave" aria-label="Zurück zum Menü">${icon("back", 16)}Menü</button>
    <span class="tiny muted">${esc(label)}</span>
  </div>`;
}

/* ============================================================
   Menü
   ============================================================ */
function vMenu() {
  const tabs = [["play", "play", "Spielen"], ["wissen", "book", "Wissen"], ["fortschritt", "user", "Fortschritt"], ["settings", "gear", "Einstellungen"]];
  const body = { play: vPlay, wissen: vWissen, fortschritt: vFortschritt, settings: vSettings }[S.tab]();
  return `<main class="screen with-tabs fade">${body}</main>
  <nav class="tabs" aria-label="Hauptnavigation"><div class="inner">
    ${tabs.map(([id, ic, label]) => `<button data-a="tab" data-v="${id}" ${S.tab === id ? 'aria-current="page"' : ""}>${icon(ic, 22, S.tab === id && id === "play")}${label}</button>`).join("")}
  </div></nav>`;
}

function chapterState(ch) { return store.progress.chapters[ch.id]; }
function isUnlocked(i) { return i === 0 || !!chapterState(CHAPTERS[i - 1])?.done; }
function nextChapterIndex() {
  const i = CHAPTERS.findIndex((c, k) => isUnlocked(k) && !chapterState(c)?.done);
  return i >= 0 ? i : CHAPTERS.length - 1;
}

function vPlay() {
  const doneCount = CHAPTERS.filter(c => chapterState(c)?.done).length;
  const ni = nextChapterIndex();
  const next = CHAPTERS[ni];
  const nextDone = !!chapterState(next)?.done;
  const pins = [
    { id: "cafe", n: 1, state: "active" }, { id: "rathaus", n: 2 }, { id: "verlag", n: 3 }, { id: "funkturm", n: 4 }, { id: "buergerhaus", n: 5 },
  ];
  const chapterRows = [...CHAPTERS.map((c, i) => {
    const st = chapterState(c);
    const open = isUnlocked(i);
    const right = st?.done ? starsHTML(st.stars || 1, 14) : open ? `<span class="tiny" style="color:var(--accent-text)">neu</span>` : icon("lock", 16);
    return `<button class="ch-row" data-a="startChapter" data-v="${c.id}" ${open ? "" : "disabled"}>
      <span class="ch-n">${c.n}</span><span class="ch-t"><b>${esc(c.title)}</b><span class="tiny muted">${esc(c.technique)}</span></span>${right}</button>`;
  }), ...PLANNED.map(p => `<div class="ch-row locked"><span class="ch-n">${p.n}</span><span class="ch-t"><b>${esc(p.title)}</b><span class="tiny muted">in Arbeit</span></span>${icon("lock", 16)}</div>`)].join("");

  const timeline = CAMPAIGNS.map((c, i) => {
    const last = i === CAMPAIGNS.length - 1;
    const active = c.n === 1;
    let dot, card;
    if (c.bilanz) {
      dot = `<span class="dia"></span>`;
      card = `<div class="tl-card bilanz"><div class="stack" style="gap:2px"><span class="kicker" style="color:var(--warn)">Bilanz</span><span style="font-weight:600" class="muted">${c.title}</span></div></div>`;
    } else if (active) {
      dot = `<span class="dot on"></span>`;
      card = `<div class="tl-card" style="border-color:var(--accent)"><div class="stack" style="gap:2px"><span class="kicker">Kampagne 1</span><span class="head" style="font-size:18px">${c.title}</span></div><span class="tiny muted">${doneCount} von ${c.chapters}</span></div>`;
    } else {
      dot = `<span class="dot"></span>`;
      card = `<div class="tl-card locked"><div class="stack" style="gap:2px"><span class="label">Kampagne ${c.n}</span><span style="font-weight:600">${c.title}</span></div>${icon("lock", 18)}</div>`;
    }
    return `<div class="tl-item"><div class="tl-rail">${dot}${last ? "" : '<span class="rail"></span>'}</div><div class="tl-body"><span class="tl-when">${c.when}</span>${card}</div></div>`;
  }).join("");

  return `<header class="row between">${logo()}
      <button class="pill" data-a="cycleTheme" aria-label="Tageszeit wechseln, aktuell ${themeLabel()}">${icon(theme === "day" ? "sun" : "moon", 16)}${themeLabel()}</button>
    </header>
    <section class="card" style="padding:0;overflow:hidden">
      <div style="height:200px">${townSVG({ theme, pins, animate: true })}</div>
      <div class="stack" style="padding:16px 18px 18px">
        <div class="row between"><span class="kicker">Kampagne 1 · Der Account</span><span class="tiny muted" style="white-space:nowrap">${doneCount} von 5 Kapiteln</span></div>
        <h2 class="head" style="font-size:22px">Kapitel ${next.n}: ${esc(next.title)}</h2>
        <div class="bar"><i style="width:${doneCount * 20}%"></i></div>
        <button class="btn" data-a="startChapter" data-v="${next.id}">${icon("play", 18, true)}${nextDone ? "Nochmal spielen" : "Spielen"}</button>
        ${nextDone && ni === CHAPTERS.length - 1 ? `<p class="tiny muted">Kapitel ${next.n + 1} kommt mit der nächsten Version.</p>` : ""}
        <div class="stack" style="gap:6px;margin-top:6px">${chapterRows}</div>
      </div>
    </section>
    <section class="stack" style="gap:6px">
      <h2 class="label">Die Geschichte von Lindenhain</h2>
      <div>${timeline}</div>
    </section>`;
}

function vWissen() {
  const learned = store.progress.learned;
  const card = t => {
    const ch = CHAPTERS.find(c => c.technique === t);
    if (learned.includes(t) && ch) {
      return `<article class="card stack">
        <div class="row between"><h3 class="head" style="font-size:19px">${t}</h3><span class="tiny row" style="color:var(--good);gap:4px">${icon("check", 16)}durchschaut</span></div>
        <p class="small">${ch.debrief.what}</p>
        <ul class="signs small">${ch.debrief.signs.map(s => `<li>${s}</li>`).join("")}</ul>
        <p class="q small">${ch.debrief.question}</p></article>`;
    }
    return `<div class="tl-card locked"><span style="font-weight:600">${t}</span>${icon("lock", 16)}</div>`;
  };
  const count = TECHNIQUES.reduce((a, g) => a + g.list.length, 0);
  return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Wissen</h1><p class="muted small">${learned.length} von ${count} Techniken durchschaut. Jede landet hier – mit den Erkennungszeichen für den Alltag.</p></header>
    ${TECHNIQUES.map(g => `<section class="stack"><h2 class="label">Kampagne ${g.campaign}</h2>${g.list.map(card).join("")}</section>`).join("")}`;
}

function vFortschritt() {
  const played = CHAPTERS.filter(c => chapterState(c)?.done);
  if (!played.length) {
    return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Fortschritt</h1></header>
      <div class="card stack"><p>Noch nichts gespielt.</p><p class="muted small">Starte Kampagne 1, dann siehst du hier deine Sterne und Testergebnisse.</p>
      <button class="btn" data-a="startChapter" data-v="${CHAPTERS[0].id}">${icon("play", 18, true)}Kapitel 1 spielen</button></div>`;
  }
  return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Fortschritt</h1><p class="muted small">Kampagne 1 · Der Account · ${played.length} von 5 Kapiteln</p></header>
    <div class="bar"><i style="width:${played.length * 20}%"></i></div>
    ${played.map(c => { const st = chapterState(c); return `<section class="card stack">
      <div class="row between"><b>Kapitel ${c.n}: ${esc(c.title)}</b>${starsHTML(st.stars || 1, 16)}</div>
      <div class="row between small"><span class="muted">Follower am Ende</span><b class="num">${fmt(st.vals.followers)}</b></div>
      <div class="row between small"><span class="muted">Bester Mini-Test</span><b>${st.best} von ${c.test.length}</b></div></section>`; }).join("")}
    <p class="muted small">Viele Sterne heißen: Du hast die Technik gut angewendet. Wer sie selbst benutzt hat, erkennt sie im Alltag schneller.</p>`;
}

function vSettings() {
  const m = store.settings.theme;
  const seg = [["auto", "Automatisch"], ["day", "Tag"], ["night", "Nacht"]].map(([k, l]) => `<button data-a="setTheme" data-v="${k}" aria-pressed="${m === k}">${l}</button>`).join("");
  return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Einstellungen</h1></header>
    <section class="card stack">
      <h2 class="label">Tageszeit</h2>
      <div class="seg" role="group" aria-label="Tageszeit">${seg}</div>
      <p class="tiny muted">Automatisch richtet sich nach der Uhrzeit auf deinem Gerät: tagsüber hell, nach Sonnenuntergang das Abendlicht.</p>
    </section>
    <section class="card stack">
      <div class="row">${icon("heart", 20)}<span style="font-weight:600">Unterstützen</span></div>
      <p class="tiny muted">Durchschaut ist kostenlos. Die Möglichkeit für ein freiwilliges Trinkgeld kommt mit der Store-Version.</p>
    </section>
    <section class="card stack">
      <h2 class="label">Über Durchschaut</h2>
      <p class="small">Ein Lernspiel gegen Desinformation. Du wendest Manipulationstechniken selbst an, um sie im Alltag schneller zu erkennen.</p>
      <p class="tiny muted">Alle Orte, Personen, Accounts und Meldungen sind frei erfunden. Kein Konto, kein Server: Dein Fortschritt bleibt auf diesem Gerät.</p>
    </section>
    <div style="text-align:center"><button class="linkbtn" data-a="reset">${confirmReset ? "Wirklich alles zurücksetzen?" : "Fortschritt zurücksetzen"}</button></div>`;
}

/* ============================================================
   Kapitel
   ============================================================ */
function startChapter(id) {
  CH = CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
  S = { view: "chapter", phase: "scene", line: 0, run: newRun(CH), day: 0, dec: 0, dayState: null, picked: null, fx: null, prev: null, t: 0, ans: null, score: 0 };
}

function vChapter() {
  switch (S.phase) {
    case "scene": return vScene();
    case "mission": return vMission();
    case "day": return vDay();
    case "week": return vWeek();
    case "debrief": return vDebrief();
    case "test": return vTest();
    case "final": return vFinal();
  }
  return "";
}

function vScene() {
  const l = CH.scene[S.line];
  const last = S.line === CH.scene.length - 1;
  const dots = CH.scene.map((_, i) => `<i class="${i <= S.line ? "on" : ""}"></i>`).join("");
  return `<main class="screen ${S.line === 0 ? "fade" : ""}">
    ${chapterTop(`Kampagne ${CH.campaign} · Kapitel ${CH.n}`)}
    <div class="town-frame scene-town">${townSVG({ theme, animate: S.line === 0, focusables: CH.focusables, label: "Lindenhain: Szene zum Kapitelbeginn" })}</div>
    <div class="card subtitle" aria-live="polite">
      <span class="who">${esc(l.who)}</span>
      <p class="line">${esc(l.text)}</p>
    </div>
    <div class="row between"><div class="dots" aria-label="Zeile ${S.line + 1} von ${CH.scene.length}">${dots}</div>
      ${last ? "" : `<button class="linkbtn" data-a="skipScene">Szene überspringen</button>`}</div>
    <div class="row">
      <button class="btn ghost" style="flex:1" data-a="prevLine" ${S.line === 0 ? "disabled" : ""}>Zurück</button>
      <button class="btn" style="flex:2" data-a="nextLine">${last ? "Zum Auftrag" : "Weiter"}</button>
    </div>
  </main>`;
}

function markFocus() {
  const l = CH.scene[S.line];
  document.querySelectorAll(".town .focus").forEach(e => e.classList.toggle("on", !!l && e.dataset.focus === l.focus));
}

function compAvatar(id, size = 40) {
  if (id === "you") return `<div class="avatar" style="width:${size}px;height:${size}px;background:var(--warn);font-size:${size * 0.33}px">LA</div>`;
  const c = COMPETITORS[id];
  const ini = id === "live" ? "LL" : "RS";
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:${c.color};font-size:${size * 0.33}px">${ini}</div>`;
}

function rankingHTML(run, title = "Rangliste") {
  const list = ranking(run);
  const max = Math.max(...list.map(x => x.followers));
  return `<div class="card stack rank"><h2 class="label">${title}</h2>
    ${list.map((x, i) => `<div class="rank-row ${x.id === "you" ? "me" : ""}">
      <span class="pos">${i + 1}.</span>${compAvatar(x.id, 32)}
      <div class="stack" style="gap:4px;flex:1;min-width:0">
        <div class="row between"><span class="nm">${esc(x.name)}</span><b class="num">${fmt(x.followers)}</b></div>
        <div class="bar"><i style="width:${Math.max(3, x.followers / max * 100)}%;${x.id === "you" ? "" : "background:var(--track-strong)"}"></i></div>
      </div></div>`).join("")}
  </div>`;
}

function starsHTML(n, size = 30) {
  let s = "";
  for (let i = 1; i <= 5; i++) {
    const on = i <= n;
    s += `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="${on ? "var(--accent)" : "none"}" stroke="${on ? "var(--accent)" : "var(--track-strong)"}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  return `<div class="stars" role="img" aria-label="${n} von 5 Sternen">${s}</div>`;
}

function vMission() {
  const run = S.run;
  return `<main class="screen fade">
    ${chapterTop(`Kampagne ${CH.campaign} · Kapitel ${CH.n}`)}
    <div class="stack" style="gap:4px"><span class="kicker">Kapitel ${CH.n}</span><h1 class="head" style="font-size:28px">${CH.title}</h1></div>
    <section class="card accent stack"><span class="kicker">Dein Auftrag</span><p style="font-size:18px">${CH.mission}</p></section>
    <section class="stack"><h2 class="label">Die Konkurrenz</h2>
      ${["live", "rundschau"].map(id => `<div class="card row">${compAvatar(id)}<div class="stack" style="gap:0;flex:1"><b>${COMPETITORS[id].name}</b><span class="tiny muted">${CH.compDesc[id]}</span></div><b class="num">${fmt(CH.compStart[id])}</b></div>`).join("")}
      <div class="card row">${compAvatar("you")}<div class="stack" style="gap:0;flex:1"><b>Lindenhain Aktuell</b><span class="tiny muted">Das bist du</span></div><b class="num">${fmt(run.followers)}</b></div>
    </section>
    <section class="stack"><h2 class="label">Deine drei Werte</h2>${hud(run)}
      <ul class="signs small">
        <li><b>Follower</b> sind dein Ziel. Zwischenziele: ${CH.milestones.map(fmt).join(", ")}.</li>
        <li><b>Glaubwürdigkeit</b> bestimmt, wie oft man dich teilt. Wer beim Übertreiben erwischt wird, verliert Reichweite.</li>
        <li><b>Spaltung</b> zeigt, was deine Beiträge mit der Stadt machen.</li>
      </ul>
      <p class="tiny muted">Am Ende der Woche bekommst du bis zu fünf Sterne für deine Reichweite.</p></section>
    <button class="btn" data-a="toDay">Tag 1 beginnen</button>
  </main>`;
}

function fxChips(fx) {
  return deltaChips({ f: fx.df, t: fx.dt, s: fx.ds });
}

function eventHTML(ev) {
  if (ev.items) {
    return `<div class="comment">${face("kessler", 36)}<div class="bubble"><b>Frau Kessler · Lindenhainer Rundschau</b>
      <ul class="signs small" style="margin-top:6px">${ev.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>`;
  }
  let head = "";
  if (ev.who === "kessler" || ev.who === "ilse") head = `<div class="comment">${face(ev.who, 36)}<div class="bubble"><b>${PEOPLE[ev.who].name}</b>${esc(ev.text)}</div></div>`;
  else head = `<div class="card small">${esc(ev.text)}</div>`;
  return `<div class="stack" style="gap:8px">${head}${ev.fx ? fxChips(ev.fx) : ""}</div>`;
}

function vDay() {
  const run = S.run;
  const st = S.dayState;
  const day = st.day;
  const dec = st.decisions[S.dec];
  const first = S.dec === 0;
  const lastDec = !dec || S.dec === st.decisions.length - 1;
  const dayDone = !dec || (S.picked != null && lastDec);

  let top = "";
  if (first) {
    top = `<section class="card stack">${esc(st.intro) ? `<p>${esc(st.intro)}</p>` : ""}</section>
      ${st.events.map(eventHTML).join("")}`;
  }

  let decisionHTML = "";
  if (dec) {
    const opts = dec.opts.map((o, i) => {
      const pic = dec.photo ? `<div class="photo">${photo(o.img)}</div>` : "";
      return `<button class="opt ${S.picked === i ? "chosen" : ""}" data-a="pick" data-v="${i}" ${S.picked != null ? "disabled" : ""}>${pic}${esc(o.text)}</button>`;
    }).join("");
    let fb = "";
    if (S.picked != null) {
      const o = dec.opts[S.picked];
      fb = `<div class="fb ${o.tier === "fair" ? "good" : o.tier === "plump" ? "bad" : ""}" role="status">${fxChips(S.fx)}<p>${esc(o.fb)}</p></div>`;
      if (!lastDec) fb += `<button class="btn" data-a="nextDec">Weiter</button>`;
    }
    const msg = dec.message ? `<div class="comment">${face(dec.message.who, 36)}<div class="bubble"><b>${PEOPLE[dec.message.who].name} · ${dec.message.label || "private Nachricht"}</b>${esc(dec.message.text)}</div></div>` : "";
    decisionHTML = `${msg}<div class="stack" style="gap:4px">${first ? "" : `<span class="kicker">Tag ${day.n} · ${esc(day.title)}</span>`}<h2 class="head" style="font-size:21px;line-height:1.3">${esc(dec.q)}</h2></div>
      <div class="stack">${opts}</div>${fb}`;
  }

  let end = "";
  if (dayDone) {
    const lastDay = S.day === CH.days.length - 1;
    end = `<section class="stack day-end">
      <h2 class="label">Ende von Tag ${day.n}</h2>
      ${rankingHTML(run, "Rangliste nach Tag " + day.n)}
      <button class="btn" data-a="endDay">${lastDay ? "Zur Wochenbilanz" : `Weiter zu Tag ${day.n + 1}`}</button>
    </section>`;
  }

  return `<main class="screen ${S.picked == null ? "fade" : ""}">
    ${chapterTop(`Tag ${day.n} von ${CH.days.length}`)}
    ${hud(run, S.prev)}
    ${first || !dec ? `<div class="stack" style="gap:2px"><span class="kicker">Tag ${day.n}</span><h1 class="head" style="font-size:26px">${esc(day.title)}</h1></div>${top}` : ""}
    ${decisionHTML}
    ${end}
  </main>`;
}

function pollBar(p, label) {
  return `<div class="stack" style="gap:6px"><span class="tiny muted">${label}</span>
    <div class="poll" role="img" aria-label="Skatepark ${p.skate} %, unentschieden ${p.undecided} %, Seniorengarten ${p.garden} %">
      <i style="width:${p.skate}%;background:var(--c-skate)"></i><i style="width:${p.undecided}%;background:var(--track)"></i><i style="width:${p.garden}%;background:var(--c-garden)"></i></div>
    <div class="row between tiny" style="white-space:nowrap"><span>Skatepark ${p.skate} %</span><span class="muted">offen ${p.undecided} %</span><span>Garten ${p.garden} %</span></div></div>`;
}

function verdictText(n) {
  return ["Kaum jemand hat dich bemerkt.", "Ein Anfang, aber die Stadt redet über andere.", "Ordentliche Reichweite für eine Woche.", "Starke Woche. Man kennt dich in Lindenhain.", "Herausragend. Lindenhain liest dich."][n - 1];
}

function vWeek() {
  const run = S.run;
  const n = stars(CH, run.followers);
  const rank = ranking(run).findIndex(x => x.id === "you") + 1;
  const next = CH.starLimits.find(l => run.followers < l);
  return `<main class="screen fade">
    ${chapterTop("Wochenbilanz")}
    <div class="stack" style="gap:2px"><span class="kicker">Tag 7</span><h1 class="head" style="font-size:28px">Wochenbilanz</h1></div>
    <section class="card accent stack" style="align-items:center;text-align:center">
      <span class="label">Dein Auftrag: Reichweite</span>
      ${starsHTML(n, 36)}
      <div class="big">${fmt(run.followers)}</div><span class="muted small">Follower · Platz ${rank} von 3</span>
      <p>${verdictText(n)}</p>
      ${next ? `<p class="tiny muted">Für den nächsten Stern hätten ${fmt(next)} Follower gereicht.</p>` : ""}
    </section>
    <section class="stack"><h2 class="label">Zwischenziele</h2>
      <div class="chips">${CH.milestones.map(m => `<span class="chip ${run.milestones.includes(m) ? "up" : "zero"}">${run.milestones.includes(m) ? "✓" : "○"} ${fmt(m)}</span>`).join("")}</div></section>
    ${rankingHTML(run, "Endstand")}
    <section class="card stack"><h2 class="label">Stimmung in Lindenhain</h2>
      ${pollBar(poll(CH.start.split), "Vor einer Woche")}${pollBar(poll(run.split), "Heute")}
      <p class="tiny muted">${poll(CH.start.split).undecided - poll(run.split).undecided >= 10 ? "Die Unentschiedenen sind deutlich weniger geworden. Wer jetzt eine feste Meinung hat, hat sie oft aus deinem Feed." : "Viele sind noch unentschieden und wollen mehr wissen."}</p>
    </section>
    <section class="card stack"><h2 class="label">Was die Woche verändert hat</h2>
      ${CH.statuses(run).map(s => `<div class="row" style="align-items:flex-start">${face(s.who, 36)}<div class="stack" style="gap:0"><b class="small">${PEOPLE[s.who].name}</b><span class="small">${esc(s.text)}</span></div></div>`).join("")}
    </section>
    <button class="btn" data-a="toDebrief">Was steckt dahinter?</button>
  </main>`;
}

const TIER = { fair: ["fair", "up"], subtil: ["subtil zugespitzt", "mid"], plump: ["plump", "down"] };

function vDebrief() {
  const e = CH.debrief;
  const run = S.run;
  const mine = run.picks.map(p => `<div class="stack" style="gap:4px"><span class="tiny muted">Tag ${p.day}</span><span class="small">${esc(p.text)}</span><span class="chip ${TIER[p.tier][1]}" style="align-self:flex-start">${TIER[p.tier][0]}</span></div>`).join("");
  const cnt = t => run.picks.filter(p => p.tier === t).length;
  return `<main class="screen fade">
    ${chapterTop("Die Technik")}
    <div class="stack" style="gap:4px"><span class="kicker">Durchschaut</span><h1 class="head" style="font-size:28px">${CH.technique}</h1></div>
    <p>${e.what}</p>
    <section class="card stack"><h2 class="label">Warum es wirkt</h2><p class="muted">${e.why}</p></section>
    <section class="card stack"><h2 class="label">So erkennst du es</h2><ul class="signs">${e.signs.map(s => `<li>${s}</li>`).join("")}</ul></section>
    <section class="card accent stack"><h2 class="label">Deine Gegenfrage</h2><p class="q">${e.question}</p></section>
    <section class="card stack"><h2 class="label">Deine Woche</h2>
      <p class="small">${cnt("subtil")}× subtil, ${cnt("plump")}× plump, ${cnt("fair")}× fair.</p>
      <p class="small muted">${CH.insight}</p>
      ${mine}</section>
    <button class="btn" data-a="toTest">Zum Mini-Test</button>
  </main>`;
}

function testPost(it) {
  const ini = it.author.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return `<article class="post"><div class="headrow"><div class="avatar" style="background:${it.color}">${esc(ini)}</div>
    <div class="stack" style="gap:0"><span class="name">${esc(it.author)}</span><span class="handle">${esc(it.handle)} · vor 2 Std.</span></div></div>
    <p class="text">${esc(it.text)}</p></article>`;
}

function vTest() {
  const it = CH.test[S.t];
  const a = S.ans;
  const btn = (v, label) => {
    let cls = "";
    if (a != null) { if (v === it.verdict) cls = "right"; else if (v === a) cls = "wrong"; }
    return `<button class="choice ${cls}" data-a="answer" data-v="${v}" ${a != null ? "disabled" : ""}>${label}</button>`;
  };
  let fb = "";
  if (a != null) {
    const ok = a === it.verdict;
    fb = `<div class="fb ${ok ? "good" : "bad"}" role="status"><b>${ok ? "Richtig erkannt." : "Nicht ganz."}</b><p>${esc(it.exp)}</p></div>
      <button class="btn" data-a="nextTest">${S.t < CH.test.length - 1 ? "Nächstes Beispiel" : "Zum Ergebnis"}</button>`;
  }
  return `<main class="screen fade">
    ${chapterTop(`Mini-Test · ${S.t + 1} von ${CH.test.length}`)}
    <h1 class="head" style="font-size:22px">Seriös oder manipulativ?</h1>
    ${testPost(it)}
    <div class="two">${btn("serios", "Eher seriös")}${btn("manip", "Manipulativ")}</div>
    ${fb}
  </main>`;
}

function vFinal() {
  const run = S.run;
  const n = stars(CH, run.followers);
  return `<main class="screen fade">
    ${chapterTop(`Kapitel ${CH.n} geschafft`)}
    <div class="town-frame" style="height:210px">${townSVG({ theme, lightsOff: run.split >= 40, label: "Lindenhain am Ende der Woche" })}</div>
    <section class="two">
      <div class="card stack" style="align-items:center;text-align:center;gap:6px"><span class="label">Auftrag</span>${starsHTML(n, 20)}<span class="small">${fmt(run.followers)} Follower</span></div>
      <div class="card stack" style="align-items:center;text-align:center;gap:6px"><span class="label">Durchschaut</span><div class="big" style="font-size:30px">${S.score}/${CH.test.length}</div><span class="small">im Mini-Test</span></div>
    </section>
    <p class="small muted">Die Sterne zeigen, wie gut du manipuliert hast. Worauf es im Alltag ankommt, ist die rechte Zahl.</p>
    <div class="card row">${icon("book", 20)}<span class="small">Neu im Wissen: <b>${CH.technique}</b></span></div>
    ${(() => { const i = CHAPTERS.indexOf(CH); const nx = CHAPTERS[i + 1]; return nx ? `<button class="btn" data-a="startChapter" data-v="${nx.id}">Weiter zu Kapitel ${nx.n}: ${esc(nx.title)}</button><button class="btn ghost" data-a="leave">Zurück nach Lindenhain</button>` : `<button class="btn" data-a="leave">Zurück nach Lindenhain</button>`; })()}
    <button class="btn ghost" data-a="startChapter" data-v="${CH.id}">Kapitel nochmal spielen</button>
  </main>`;
}

/* ============================================================
   Rendern und Steuerung
   ============================================================ */
function render(scrollTop = true) {
  const app = document.getElementById("app");
  app.innerHTML = S.view === "menu" ? vMenu() : vChapter();
  if (scrollTop) window.scrollTo({ top: 0 });
}

function scrollToEl(sel) {
  const el = document.querySelector(sel);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

let toastTimer = null;
function toast(milestones) {
  if (!milestones || !milestones.length) return;
  let el = document.getElementById("toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  const m = milestones[milestones.length - 1];
  el.innerHTML = `${icon("check", 18)}<span>Zwischenziel erreicht: <b>${fmt(m)} Follower</b></span>`;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

function beginDay(idx) {
  S.day = idx; S.dec = 0; S.picked = null; S.fx = null;
  S.prev = { followers: S.run.followers, trust: S.run.trust, split: S.run.split };
  S.dayState = startDay(S.run, CH, idx);
  const t = document.getElementById("toast"); if (t) t.classList.remove("show");
  render();
  toast(S.dayState.events.flatMap(e => (e.fx && e.fx.reached) || []));
}

const actions = {
  tab(v) { S.tab = v; confirmReset = false; render(); },
  cycleTheme() {
    const order = ["auto", "day", "night"];
    store.settings.theme = order[(order.indexOf(store.settings.theme) + 1) % 3];
    save(); applyTheme(); render(false);
  },
  setTheme(v) { store.settings.theme = v; save(); applyTheme(); render(false); },
  reset() {
    if (!confirmReset) { confirmReset = true; render(false); return; }
    store.progress = structuredClone(DEFAULT.progress); save(); confirmReset = false; render();
  },
  startChapter(v) { startChapter(v); render(); markFocus(); },
  leave() { const t = document.getElementById("toast"); if (t) t.classList.remove("show"); S = { view: "menu", tab: "play" }; render(); },
  nextLine() {
    if (S.line < CH.scene.length - 1) { S.line++; render(false); markFocus(); }
    else { S.phase = "mission"; render(); }
  },
  prevLine() { if (S.line > 0) { S.line--; render(false); markFocus(); } },
  skipScene() { S.phase = "mission"; render(); },
  toDay() { S.phase = "day"; beginDay(0); },
  pick(v) {
    if (S.picked != null) return;
    const o = S.dayState.decisions[S.dec].opts[+v];
    S.prev = { followers: S.run.followers, trust: S.run.trust, split: S.run.split };
    S.picked = +v;
    S.fx = applyOption(S.run, S.dayState.day.n, o);
    render(false);
    scrollToEl(".fb");
    toast(S.fx.reached);
  },
  nextDec() { S.dec++; S.picked = null; S.fx = null; render(); },
  endDay() {
    endDay(S.run, CH, S.day);
    if (S.day < CH.days.length - 1) beginDay(S.day + 1);
    else { S.phase = "week"; render(); }
  },
  toDebrief() { S.phase = "debrief"; render(); },
  toTest() { S.phase = "test"; S.t = 0; S.ans = null; render(); },
  answer(v) {
    if (S.ans != null) return;
    S.ans = v; if (v === CH.test[S.t].verdict) S.score++;
    render(false); scrollToEl(".fb");
  },
  nextTest() {
    S.ans = null;
    if (S.t < CH.test.length - 1) { S.t++; render(); return; }
    const prev = store.progress.chapters[CH.id] || {};
    store.progress.chapters[CH.id] = {
      done: true,
      vals: { followers: S.run.followers, trust: S.run.trust, split: S.run.split },
      stars: Math.max(prev.stars || 0, stars(CH, S.run.followers)),
      best: Math.max(prev.best || 0, S.score),
    };
    if (!store.progress.learned.includes(CH.technique)) store.progress.learned.push(CH.technique);
    save();
    S.phase = "final"; render();
  },
};

document.addEventListener("click", e => {
  const b = e.target.closest("[data-a]");
  if (!b || b.disabled) return;
  const fn = actions[b.dataset.a];
  if (fn) fn(b.dataset.v);
});

render();
