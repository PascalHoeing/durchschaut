import { resolveTheme } from "./daylight.js";
import { townSVG } from "./town.js";
import { CAMPAIGNS, PEOPLE, TIES, START, CHAPTER1 as CH } from "./content.js";

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
  if (kind === "pot") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Nahaufnahme eines zerbrochenen Blumenkübels mit verstreuter Erde"><rect width="320" height="170" fill="#2A2420"/>`
      + `<rect y="110" width="320" height="60" fill="#4A3F36"/><ellipse cx="160" cy="132" rx="120" ry="24" fill="#3B2A1E"/>`
      + `<path d="M110 70 L150 64 L146 118 L104 112Z" fill="#B85C38"/><path d="M152 66 L190 62 L200 116 L150 120Z" fill="#A04E2F"/>`
      + `<path d="M196 92 L226 98 L218 124 L198 118Z" fill="#B85C38"/><path d="M84 110 L104 104 L110 126 L88 128Z" fill="#A04E2F"/>`
      + `<circle cx="70" cy="136" r="6" fill="#3B2A1E"/><circle cx="246" cy="132" r="7" fill="#3B2A1E"/><circle cx="228" cy="146" r="4" fill="#3B2A1E"/>`
      + `<path d="M150 64 C140 40 128 34 118 30 M150 64 C156 42 166 34 178 28" stroke="#5E8F4E" stroke-width="4" fill="none" stroke-linecap="round"/>`
      + `<ellipse cx="116" cy="30" rx="10" ry="5" fill="#E07A9A"/><ellipse cx="180" cy="28" rx="10" ry="5" fill="#E07A9A"/>`
      + `<rect width="320" height="170" fill="url(#vig)"/><defs><radialGradient id="vig" cx="50%" cy="55%" r="65%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.65"/></radialGradient></defs></svg>`;
  }
  // gemeinsam aufräumen
  return `<svg viewBox="0 0 320 170" role="img" aria-label="Deniz und Ilse räumen gemeinsam im Bürgerhaus auf"><rect width="320" height="170" fill="#E9E2D3"/>`
    + `<rect y="118" width="320" height="52" fill="#C9B79A"/><rect x="24" y="26" width="70" height="46" rx="4" fill="#BFDDF2"/><rect x="226" y="26" width="70" height="46" rx="4" fill="#BFDDF2"/>`
    + `<path d="M142 104 L178 104 L174 134 L146 134Z" fill="#B85C38"/><path d="M160 104 C154 86 148 82 142 78 M160 104 C164 86 172 82 180 78" stroke="#5E8F4E" stroke-width="4" fill="none" stroke-linecap="round"/>`
    + `<circle cx="96" cy="64" r="16" fill="#F0C8A8"/><path d="M80 62 C80 48 88 44 96 44 C104 44 112 48 112 62 C108 54 102 52 96 52 C90 52 84 54 80 62Z" fill="#C9CCD4"/>`
    + `<path d="M72 140 C72 104 84 86 96 86 C108 86 120 104 120 140Z" fill="#5E9A7A"/><path d="M120 108 L138 130" stroke="#6B5A4A" stroke-width="4" stroke-linecap="round"/>`
    + `<circle cx="226" cy="70" r="16" fill="#C68E6A"/><path d="M210 66 C210 54 218 50 226 50 C234 50 242 54 242 66Z" fill="#E7A93B"/><path d="M240 64 L254 66 L242 69Z" fill="#E7A93B"/>`
    + `<path d="M200 140 C200 108 212 92 226 92 C240 92 252 108 252 140Z" fill="#D9604A"/><path d="M206 118 L190 130" stroke="#6B5A4A" stroke-width="4" stroke-linecap="round"/><path d="M176 128 h20 v10 h-24z" fill="#4C6496"/>`
    + `<path d="M90 70 Q96 74 102 70 M220 76 Q226 80 232 76" stroke="#16181D" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
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

function vPlay() {
  const c1 = store.progress.chapters[CH.id];
  const doneCount = Object.values(store.progress.chapters).filter(x => x.done).length;
  const pins = [
    { id: "cafe", n: 1, state: "active" }, { id: "rathaus", n: 2 }, { id: "verlag", n: 3 }, { id: "funkturm", n: 4 }, { id: "buergerhaus", n: 5 },
  ];
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
        <div class="row between"><span class="kicker">Kampagne 1 · Frühjahr</span><span class="tiny muted" style="white-space:nowrap">Kapitel 1 von 5</span></div>
        <h2 class="head" style="font-size:24px">Der Account</h2>
        <p class="muted small">Kapitel 1: ${CH.title}. ${CAMPAIGNS[0].teaser}</p>
        <div class="bar"><i style="width:${doneCount * 20}%"></i></div>
        <button class="btn" data-a="startChapter">${icon("play", 18, true)}${c1?.done ? "Kapitel 1 nochmal spielen" : "Spielen"}</button>
        ${c1?.done ? `<p class="tiny muted">Kapitel 2 kommt mit der nächsten Version.</p>` : ""}
      </div>
    </section>
    <section class="stack" style="gap:6px">
      <h2 class="label">Die Geschichte von Lindenhain</h2>
      <div>${timeline}</div>
    </section>`;
}

const TECHNIQUES = ["Emotionalisierung", "Polarisierung", "Clickbait", "Falsche Experten", "Aus dem Zusammenhang"];
function vWissen() {
  const learned = store.progress.learned;
  const items = TECHNIQUES.map(t => {
    if (learned.includes(t) && t === "Emotionalisierung") {
      return `<article class="card stack">
        <div class="row between"><h3 class="head" style="font-size:19px">${t}</h3><span class="tiny" style="color:var(--good)">${icon("check", 16)} durchschaut</span></div>
        <p class="small">${CH.debrief.what}</p>
        <ul class="signs small">${CH.debrief.signs.map(s => `<li>${s}</li>`).join("")}</ul>
        <p class="q small">${CH.debrief.question}</p></article>`;
    }
    return `<div class="tl-card locked"><span style="font-weight:600">${t}</span><span class="row tiny">${icon("lock", 16)}Kampagne 1</span></div>`;
  }).join("");
  return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Wissen</h1><p class="muted small">Jede Technik, die du durchschaut hast, landet hier – mit den Erkennungszeichen für den Alltag.</p></header>
    <section class="stack">${items}</section>`;
}

function vFortschritt() {
  const c1 = store.progress.chapters[CH.id];
  if (!c1) {
    return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Fortschritt</h1></header>
      <div class="card stack"><p>Noch nichts gespielt.</p><p class="muted small">Starte Kampagne 1, dann siehst du hier deine Werte und Testergebnisse.</p>
      <button class="btn" data-a="startChapter">${icon("play", 18, true)}Kapitel 1 spielen</button></div>`;
  }
  return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Fortschritt</h1><p class="muted small">Kampagne 1 · Der Account</p></header>
    <section class="card stack">
      <div class="row between"><span>Kapitel abgeschlossen</span><b>1 von 5</b></div>
      <div class="bar"><i style="width:20%"></i></div>
      <div class="row between"><span>Bester Mini-Test</span><b>${c1.best} von ${CH.test.length}</b></div>
    </section>
    <section class="stack"><h2 class="label">Deine Werte nach Kapitel 1</h2>${hud(c1.vals)}</section>
    <p class="muted small">Hohe Reichweite bei hoher Spaltung heißt: Du hast die Techniken gut angewendet. Im Alltag erkennst du sie jetzt schneller.</p>`;
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
function startChapter() {
  S = {
    view: "chapter", phase: "scene", line: 0,
    d: 0, picks: [], picked: null, vals: { ...START }, prev: null, t: 0, ans: null, score: 0,
  };
}

function vChapter() {
  switch (S.phase) {
    case "scene": return vScene();
    case "mission": return vMission();
    case "decide": return vDecide();
    case "reaction": return vReaction();
    case "debrief": return vDebrief();
    case "test": return vTest();
    case "epilogue": return vEpilogue();
  }
  return "";
}

function vScene() {
  const l = CH.scene[S.line];
  const last = S.line === CH.scene.length - 1;
  const dots = CH.scene.map((_, i) => `<i class="${i <= S.line ? "on" : ""}"></i>`).join("");
  return `<main class="screen ${S.line === 0 ? "fade" : ""}">
    ${chapterTop("Kampagne 1 · Kapitel 1")}
    <div class="town-frame scene-town">${townSVG({ theme, animate: S.line === 0, focusables: ["lot", "buergerhaus", "cafe"], label: "Lindenhain: Szene zum Kapitelbeginn" })}</div>
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

// Hebt den Ort der aktuellen Zeile in der Stadt hervor
function markFocus() {
  const l = CH.scene[S.line];
  document.querySelectorAll(".town .focus").forEach(e => e.classList.toggle("on", !!l && e.dataset.focus === l.focus));
}

function vMission() {
  return `<main class="screen fade">
    ${chapterTop("Kampagne 1 · Kapitel 1")}
    <div class="stack"><span class="kicker">Kapitel 1</span><h1 class="head" style="font-size:28px">${CH.title}</h1></div>
    <div class="card row"><div class="avatar" style="background:var(--warn)">LA</div>
      <div class="stack" style="gap:0"><b>Lindenhain Aktuell</b><span class="tiny muted">Dein Account · ${fmt(START.followers)} Follower</span></div></div>
    <section class="card accent stack"><span class="kicker">Dein Auftrag</span><p style="font-size:18px">${CH.mission}</p></section>
    <section class="stack"><h2 class="label">Deine drei Werte</h2>${hud(S.vals)}
      <ul class="signs small">
        <li><b>Follower</b> – dein Ziel. Wer aufregt, wird geteilt.</li>
        <li><b>Glaubwürdigkeit</b> – sinkt, wenn dich jemand beim Übertreiben erwischt.</li>
        <li><b>Spaltung</b> – zeigt, was deine Beiträge mit der Stadt machen.</li>
      </ul></section>
    <button class="btn" data-a="toDecide">Auftrag annehmen</button>
  </main>`;
}

function postHTML(opts = {}) {
  const head = CH.decisions[0].opts[S.picks[0]]?.text || "";
  const img = CH.decisions[1].opts[S.picks[1]]?.img;
  const fixed = S.picks[2] === 0 ? "\n\nUpdate: Laut Veranstalter war es ein Versehen. Der Kübel wurde ersetzt." : "";
  const gained = Math.max(0, S.vals.followers - START.followers);
  const st = opts.stats ? `<div class="stats">
      <span>${icon("comment", 16)}<b data-count="${Math.round(gained * 0.3) + 4}">0</b></span>
      <span>${icon("share", 16)}<b data-count="${Math.round(gained * 0.8) + 2}">0</b></span>
      <span>${icon("heart", 16)}<b data-count="${Math.round(gained * 2.2) + 11}">0</b></span></div>` : "";
  return `<article class="post">
    <div class="headrow"><div class="avatar" style="background:var(--warn)">LA</div><div class="stack" style="gap:0"><span class="name">Lindenhain Aktuell</span><span class="handle">@lindenhain_aktuell · ${opts.when || "gerade eben"}</span></div></div>
    <p class="text">${esc(head + fixed)}</p>
    ${img ? `<div class="photo">${photo(img)}</div>` : ""}
    ${st}
  </article>`;
}

function commentHTML(whoId, text, nameOverride) {
  const known = PEOPLE[whoId];
  const av = known ? face(whoId, 36) : nameOverride === "Lindenhain Aktuell" ? `<div class="avatar" style="width:36px;height:36px;background:var(--warn);font-size:12px">LA</div>` : `<div class="avatar" style="width:36px;height:36px;background:#5A6890;font-size:12px">${esc((nameOverride || "?").replace("@", "").slice(0, 2).toUpperCase())}</div>`;
  const name = nameOverride || (known ? known.name + (known.role ? ` · ${known.role}` : "") : whoId);
  return `<div class="comment">${av}<div class="bubble"><b>${esc(name)}</b>${esc(text)}</div></div>`;
}

function vDecide() {
  const dec = CH.decisions[S.d];
  const picked = S.picked;
  const opts = dec.opts.map((o, i) => {
    const pic = dec.photo ? (o.img ? `<div class="photo">${photo(o.img)}</div>` : "") : "";
    return `<button class="opt ${picked === i ? "chosen" : ""}" data-a="pick" data-v="${i}" ${picked != null ? "disabled" : ""}>${pic}${esc(o.text)}</button>`;
  }).join("");
  let fb = "";
  if (picked != null) {
    const o = dec.opts[picked];
    const best = Math.max(...dec.opts.map(x => x.f));
    fb = `<div class="fb ${o.manip ? "" : "good"}" role="status">${deltaChips(o)}<p>${esc(o.fb)}</p>
      ${o.f < best ? `<p class="tiny muted">Eine andere Wahl hätte dir mehr Follower gebracht.</p>` : ""}</div>
      <button class="btn" data-a="nextDecision">${S.d < CH.decisions.length - 1 ? "Weiter" : "Beitrag veröffentlichen"}</button>`;
  }
  const context = dec.comment
    ? `<section class="stack"><h2 class="label">Dein Beitrag</h2>${postHTML({ when: "vor 20 Min." })}${commentHTML(dec.comment.who, dec.comment.text)}</section>` : "";
  return `<main class="screen fade">
    ${chapterTop(`Entscheidung ${S.d + 1} von ${CH.decisions.length}`)}
    ${hud(S.vals, S.prev)}
    ${context}
    <div class="stack" style="gap:4px"><span class="kicker">Kapitel 1 · ${CH.title}</span><h2 class="head" style="font-size:22px">${esc(dec.q)}</h2></div>
    <div class="stack">${opts}</div>
    ${fb}
  </main>`;
}

function tiesSVG(split) {
  const pos = { ilse: [60, 150], deniz: [260, 150], yilmaz: [160, 62] };
  const good = theme === "day" ? "#1F7A4D" : "#7FD1A8";
  const warn = theme === "day" ? "#B23A24" : "#F08A78";
  let lines = "";
  TIES.forEach(t => {
    const [x1, y1] = pos[t.a], [x2, y2] = pos[t.b];
    const broken = split >= t.breaksAt;
    if (broken) {
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const ux = (x2 - x1) / Math.hypot(x2 - x1, y2 - y1), uy = (y2 - y1) / Math.hypot(x2 - x1, y2 - y1);
      lines += `<line x1="${x1}" y1="${y1}" x2="${mx - ux * 12}" y2="${my - uy * 12}" stroke="${warn}" stroke-width="2.5" stroke-dasharray="5 5"/>`
        + `<line x1="${mx + ux * 12}" y1="${my + uy * 12}" x2="${x2}" y2="${y2}" stroke="${warn}" stroke-width="2.5" stroke-dasharray="5 5"/>`
        + `<path d="M${mx - 6} ${my - 6} L${mx + 6} ${my + 6} M${mx + 6} ${my - 6} L${mx - 6} ${my + 6}" stroke="${warn}" stroke-width="2.5" stroke-linecap="round"/>`;
    } else {
      lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${good}" stroke-width="2.5"/>`;
    }
  });
  const node = (id) => {
    const [x, y] = pos[id];
    return `<g transform="translate(${x - 26} ${y - 26})">${face(id, 52)}</g>`
      + `<text x="${x}" y="${id === "yilmaz" ? y - 34 : y + 44}" text-anchor="middle" font-size="13" font-weight="600" fill="currentColor" font-family="Inter, sans-serif">${PEOPLE[id].name}</text>`;
  };
  return `<svg viewBox="0 0 320 210" role="img" style="color:var(--ink)" aria-label="Beziehungen zwischen Ilse, Deniz und Herrn Yılmaz">${lines}${node("ilse")}${node("deniz")}${node("yilmaz")}</svg>`;
}

function vReaction() {
  const split = S.vals.split;
  const manip = S.picks.some((p, i) => CH.decisions[i].opts[p].manip);
  const comments = (split >= 25 ? CH.comments.high : CH.comments.low).map((c, i) => {
    const id = Object.keys(PEOPLE).find(k => PEOPLE[k].name === c.who);
    return `<div style="animation-delay:${0.6 + i * 0.7}s" class="fade">${commentHTML(id || c.who, c.text, id ? null : c.who)}</div>`;
  }).join("");
  const kessler = commentHTML("kessler", CH.decisions[2].comment.text);
  const reply = S.picks[2] === 2 ? commentHTML("lindenhain", CH.decisions[2].opts[2].text.replace(/[„“]/g, ""), "Lindenhain Aktuell") : "";
  const ties = TIES.map(t => {
    const broken = split >= t.breaksAt;
    return `<div class="row between"><span>${PEOPLE[t.a].name} und ${PEOPLE[t.b].name}</span><span class="${broken ? "broken" : "muted"}">${broken ? t.broken : t.label}</span></div>`;
  }).join("");
  const status = manip
    ? `<div class="notice">${icon("shield", 18)}Frau Kessler beobachtet deinen Account jetzt genauer.</div>`
    : `<div class="notice" style="color:var(--good)">${icon("shield", 18)}Die Rundschau zitiert deinen Beitrag als Quelle.</div>`;
  return `<main class="screen fade">
    ${chapterTop("Lindenhain reagiert")}
    ${hud(S.vals)}
    <section class="stack"><h2 class="label">Dein Beitrag ist online</h2>${postHTML({ stats: true })}
      ${kessler}${reply}${comments}</section>
    <section class="card stack ties"><h2 class="label">In der Nachbarschaft</h2>${tiesSVG(split)}<div class="tie-list">${ties}</div></section>
    ${status}
    <button class="btn" data-a="toDebrief">Was steckt dahinter?</button>
  </main>`;
}

function vDebrief() {
  const e = CH.debrief;
  const mine = S.picks.map((p, i) => {
    const o = CH.decisions[i].opts[p];
    const tag = o.manip ? `<span class="chip down">emotionalisierend</span>` : (o.t < 0 ? `<span class="chip zero">ausweichend</span>` : `<span class="chip up">fair</span>`);
    return `<div class="stack" style="gap:4px"><span class="small">${esc(o.text)}</span>${tag}</div>`;
  }).join("");
  return `<main class="screen fade">
    ${chapterTop("Die Technik")}
    <div class="stack" style="gap:4px"><span class="kicker">Durchschaut</span><h1 class="head" style="font-size:28px">${CH.technique}</h1></div>
    <p>${e.what}</p>
    <section class="card stack"><h2 class="label">Warum es wirkt</h2><p class="muted">${e.why}</p></section>
    <section class="card stack"><h2 class="label">So erkennst du es</h2><ul class="signs">${e.signs.map(s => `<li>${s}</li>`).join("")}</ul></section>
    <section class="card accent stack"><h2 class="label">Deine Gegenfrage</h2><p class="q">${e.question}</p></section>
    <section class="card stack"><h2 class="label">Deine Entscheidungen</h2>${mine}</section>
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
      <button class="btn" data-a="nextTest">${S.t < CH.test.length - 1 ? "Nächstes Beispiel" : "Zum Abend in Lindenhain"}</button>`;
  }
  return `<main class="screen fade">
    ${chapterTop(`Mini-Test · ${S.t + 1} von ${CH.test.length}`)}
    <h1 class="head" style="font-size:22px">Seriös oder manipulativ?</h1>
    ${testPost(it)}
    <div class="two">${btn("serios", "Eher seriös")}${btn("manip", "Manipulativ")}</div>
    ${fb}
  </main>`;
}

function vEpilogue() {
  const split = S.vals.split;
  const text = split >= 40 ? CH.epilogue.high : split >= 25 ? CH.epilogue.mid : CH.epilogue.low;
  return `<main class="screen fade">
    ${chapterTop("Kapitel 1 geschafft")}
    <div class="town-frame" style="height:230px">${townSVG({ theme, lightsOff: split >= 40, label: "Lindenhain am Abend nach deinem Beitrag" })}</div>
    <p style="font-size:18px;line-height:1.5">${esc(text)}</p>
    <section class="stack"><h2 class="label">Deine Bilanz</h2>${hud(S.vals)}
      <div class="card row between"><span>Mini-Test</span><b>${S.score} von ${CH.test.length} richtig</b></div></section>
    <div class="card row">${icon("book", 20)}<span class="small">Neu im Wissen: <b>${CH.technique}</b></span></div>
    <button class="btn" data-a="leave">Zurück nach Lindenhain</button>
    <button class="btn ghost" data-a="startChapter">Kapitel nochmal spielen</button>
  </main>`;
}

/* ============================================================
   Rendern und Steuerung
   ============================================================ */
function render(scrollTop = true) {
  const app = document.getElementById("app");
  app.innerHTML = S.view === "menu" ? vMenu() : vChapter();
  if (scrollTop) window.scrollTo({ top: 0 });
  // Zähler im Beitrag hochlaufen lassen
  app.querySelectorAll("[data-count]").forEach(el => {
    const target = +el.dataset.count;
    const t0 = performance.now(), dur = 1400;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function scrollToFeedback() {
  const fb = document.querySelector(".fb");
  if (fb) fb.scrollIntoView({ behavior: "smooth", block: "center" });
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
  startChapter() { startChapter(); render(); markFocus(); },
  leave() { S = { view: "menu", tab: "play" }; render(); },
  nextLine() {
    if (S.line < CH.scene.length - 1) { S.line++; render(false); markFocus(); }
    else { S.phase = "mission"; render(); }
  },
  prevLine() { if (S.line > 0) { S.line--; render(false); markFocus(); } },
  skipScene() { S.phase = "mission"; render(); },
  toDecide() { S.phase = "decide"; S.d = 0; S.picked = null; S.prev = null; render(); },
  pick(v) {
    if (S.picked != null) return;
    const o = CH.decisions[S.d].opts[+v];
    S.picked = +v;
    S.prev = { ...S.vals };
    S.vals = {
      followers: Math.max(0, S.vals.followers + o.f),
      trust: clamp(S.vals.trust + o.t, 0, 100),
      split: clamp(S.vals.split + o.s, 0, 100),
    };
    render(false); scrollToFeedback();
  },
  nextDecision() {
    S.picks.push(S.picked); S.picked = null; S.prev = null;
    if (S.d < CH.decisions.length - 1) { S.d++; render(); }
    else { S.phase = "reaction"; render(); }
  },
  toDebrief() { S.phase = "debrief"; render(); },
  toTest() { S.phase = "test"; S.t = 0; S.ans = null; render(); },
  answer(v) {
    if (S.ans != null) return;
    S.ans = v; if (v === CH.test[S.t].verdict) S.score++;
    render(false); scrollToFeedback();
  },
  nextTest() {
    S.ans = null;
    if (S.t < CH.test.length - 1) { S.t++; render(); return; }
    const prev = store.progress.chapters[CH.id];
    store.progress.chapters[CH.id] = { done: true, vals: S.vals, best: Math.max(prev?.best || 0, S.score) };
    if (!store.progress.learned.includes(CH.technique)) store.progress.learned.push(CH.technique);
    save();
    S.phase = "epilogue"; render();
  },
};

document.addEventListener("click", e => {
  const b = e.target.closest("[data-a]");
  if (!b || b.disabled) return;
  const fn = actions[b.dataset.a];
  if (fn) fn(b.dataset.v);
});

render();
