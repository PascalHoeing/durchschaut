import { resolveTheme } from "./daylight.js";
import { townSVG } from "./town.js";
import { face, photo, chart, initials, setArtTheme } from "./art.js";
import { CAMPAIGNS, PEOPLE, TECHNIQUES } from "./content.js";
import { CHAPTERS } from "./chapters.js";
import { newRun, startDay, applyOption, endDay, ranking, stars, poll, countTier } from "./sim.js";

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
  setArtTheme(theme);
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
let CH = CHAPTERS[0];
let confirmReset = false;

const fmt = n => Math.round(n).toLocaleString("de-DE");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const TIER_DEFAULT = { fair: "fair", subtil: "subtil zugespitzt", plump: "plump" };
const tierLabel = t => (CH.tierLabels || TIER_DEFAULT)[t];
const PLACE = { 1: "cafe", 2: "rathaus", 3: "verlag", 4: "funkturm", 5: "buergerhaus" };

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

function logo() {
  return `<div class="logo"><h1>Durchschaut</h1><p>Willkommen in Lindenhain</p></div>`;
}

function themeLabel() {
  const m = store.settings.theme;
  const now = theme === "day" ? "Tag" : "Abend";
  return m === "auto" ? `Automatisch · ${now}` : now;
}

function hud(v, prev) {
  const d = k => {
    if (!prev) return "";
    const x = v[k] - prev[k];
    if (!x) return "";
    const cls = k === "split" ? (x > 0 ? "down" : "up") : (x > 0 ? "up" : "down");
    return `<span class="delta ${cls}">${x > 0 ? "+" : "−"}${fmt(Math.abs(x))}</span>`;
  };
  const scale = CH.milestones ? CH.milestones[CH.milestones.length - 1] : 1500;
  return `<div class="hud" aria-label="Deine Werte">
    <div class="m"><span class="t">${CH.mainLabel || "Follower"}</span><span class="n">${fmt(v.followers)}${d("followers")}</span><div class="bar"><i style="width:${clamp(v.followers / scale * 100, 2, 100)}%"></i></div></div>
    <div class="m"><span class="t">Glaubwürdigkeit</span><span class="n">${fmt(v.trust)} %${d("trust")}</span><div class="bar"><i style="width:${v.trust}%"></i></div></div>
    <div class="m split"><span class="t">Spaltung</span><span class="n">${fmt(v.split)} %${d("split")}</span><div class="bar"><i style="width:${v.split}%"></i></div></div>
  </div>`;
}

function deltaChips(o) {
  const chip = (val, name, kind) => {
    if (!val) return `<span class="chip zero">±0 ${name}</span>`;
    const cls = kind === "split" ? (val > 0 ? "down" : "up") : (val > 0 ? "up" : "down");
    return `<span class="chip ${cls}">${val > 0 ? "+" : "−"}${fmt(Math.abs(val))} ${name}</span>`;
  };
  return `<div class="chips">${chip(o.f, CH.mainLabel || "Follower", "f")}${chip(o.t, "Glaubwürdigkeit", "t")}${chip(o.s, "Spaltung", "split")}</div>`;
}

function chapterTop(label) {
  return `<div class="row between">
    <button class="pill" data-a="leave" aria-label="Zurück zum Menü">${icon("back", 16)}Menü</button>
    <span class="tiny muted">${esc(label)}</span>
  </div>`;
}

// Wer spricht? Personen aus Lindenhain, die Rivalen des Kapitels, du selbst oder eine Figur mit eigenem Namen.
function speaker(who, size = 36) {
  if (typeof who === "object" && who) return { av: initials(who.initials, who.color, size), name: who.name };
  if (PEOPLE[who]) return { av: face(who, size), name: PEOPLE[who].name };
  if (who === "a" || who === "b") { const r = CH.rivals[who]; return { av: initials(r.initials, r.color, size), name: r.name }; }
  if (who === "you") return { av: initials(CH.you.initials, "var(--warn)", size), name: CH.you.name };
  return null;
}

function bubble(who, text, label) {
  const sp = speaker(who);
  if (!sp) return `<div class="card small">${esc(text)}</div>`;
  return `<div class="comment">${sp.av}<div class="bubble"><b>${esc(sp.name)}${label ? ` · ${esc(label)}` : ""}</b>${esc(text)}</div></div>`;
}

function starsHTML(n, size = 30) {
  let s = "";
  for (let i = 1; i <= 5; i++) {
    const on = i <= n;
    s += `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="${on ? "var(--accent)" : "none"}" stroke="${on ? "var(--accent)" : "var(--track-strong)"}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
  }
  return `<div class="stars" role="img" aria-label="${n} von 5 Sternen">${s}</div>`;
}

/* ============================================================
   Fortschritt und Freischaltung
   ============================================================ */
const chapterState = ch => store.progress.chapters[ch.id];
const isDone = ch => !!chapterState(ch)?.done;
const isUnlocked = i => i === 0 || isDone(CHAPTERS[i - 1]);
function nextChapterIndex() {
  const i = CHAPTERS.findIndex((c, k) => isUnlocked(k) && !isDone(c));
  return i >= 0 ? i : CHAPTERS.length - 1;
}
const chaptersOf = n => CHAPTERS.filter(c => c.campaign === n);
const campaignDone = n => chaptersOf(n).length > 0 && chaptersOf(n).every(isDone);
const campaignOpen = n => { const f = chaptersOf(n)[0]; return f && isUnlocked(CHAPTERS.indexOf(f)); };

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
  const ni = nextChapterIndex();
  const next = CHAPTERS[ni];
  const allDone = CHAPTERS.every(isDone);
  const view = S.viewCampaign ?? next.campaign;
  const camp = CAMPAIGNS.find(c => c.n === view);
  const list = chaptersOf(view);
  const doneHere = list.filter(isDone).length;
  const pins = [1, 2, 3, 4, 5].map(n => ({ id: PLACE[n], n, state: n === view ? "active" : "" }));

  const rows = list.map(c => {
    const i = CHAPTERS.indexOf(c);
    const st = chapterState(c);
    const open = isUnlocked(i);
    const right = st?.done ? (c.type === "story" ? icon("check", 16) : starsHTML(st.stars || 1, 14)) : open ? `<span class="tiny" style="color:var(--accent-text)">neu</span>` : icon("lock", 16);
    return `<button class="ch-row" data-a="startChapter" data-v="${c.id}" ${open ? "" : "disabled"}>
      <span class="ch-n">${c.type === "story" ? "★" : c.n}</span><span class="ch-t"><b>${esc(c.title)}</b><span class="tiny muted">${esc(c.technique || "Szene")}</span></span>${right}</button>`;
  }).join("");

  const mainBtn = view === next.campaign
    ? `<button class="btn" data-a="startChapter" data-v="${next.id}">${icon("play", 18, true)}${allDone ? "Nochmal spielen: " + esc(next.title) : (next.type === "story" ? "Ansehen" : "Spielen")}</button>`
    : `<button class="btn ghost" data-a="viewCampaign" data-v="${next.campaign}">Zur aktuellen Kampagne</button>`;

  const timeline = CAMPAIGNS.map((c, i) => {
    const last = i === CAMPAIGNS.length - 1;
    const done = campaignDone(c.n);
    const open = campaignOpen(c.n);
    const cur = c.n === view;
    const dot = c.bilanz ? `<span class="dia"></span>` : `<span class="dot ${cur ? "on" : ""}"></span>`;
    const kicker = c.bilanz ? `<span class="kicker" style="color:var(--warn)">Bilanz</span>` : `<span class="${cur ? "kicker" : "label"}">Kampagne ${c.n}</span>`;
    const right = done ? `<span class="tiny" style="color:var(--good)">${icon("check", 16)}</span>` : open ? `<span class="tiny muted">${chaptersOf(c.n).filter(isDone).length} von ${chaptersOf(c.n).length}</span>` : icon("lock", 18);
    const cls = `tl-card ${c.bilanz ? "bilanz" : ""} ${open ? "" : "locked"}`;
    const inner = `<div class="stack" style="gap:2px">${kicker}<span style="font-weight:600">${c.title}</span></div>${right}`;
    const card = open
      ? `<button class="${cls}" data-a="viewCampaign" data-v="${c.n}" style="width:100%;text-align:left;${cur ? "border-color:var(--accent)" : ""}">${inner}</button>`
      : `<div class="${cls}">${inner}</div>`;
    return `<div class="tl-item"><div class="tl-rail">${dot}${last ? "" : '<span class="rail"></span>'}</div><div class="tl-body"><span class="tl-when">${c.when}</span>${card}</div></div>`;
  }).join("");

  return `<header class="row between">${logo()}
      <button class="pill" data-a="cycleTheme" aria-label="Tageszeit wechseln, aktuell ${themeLabel()}">${icon(theme === "day" ? "sun" : "moon", 16)}${themeLabel()}</button>
    </header>
    <section class="card" style="padding:0;overflow:hidden">
      <div style="height:200px">${townSVG({ theme, pins, animate: true })}</div>
      <div class="stack" style="padding:16px 18px 18px">
        <div class="row between"><span class="kicker">${camp.bilanz ? "Bilanz" : "Kampagne " + camp.n} · ${esc(camp.title)}</span><span class="tiny muted" style="white-space:nowrap">${doneHere} von ${list.length}</span></div>
        <h2 class="head" style="font-size:22px">${view === next.campaign ? esc(next.type === "story" ? next.title : "Kapitel " + next.n + ": " + next.title) : esc(camp.title)}</h2>
        <div class="bar"><i style="width:${list.length ? doneHere / list.length * 100 : 0}%"></i></div>
        ${mainBtn}
        ${allDone ? `<p class="tiny muted">Du hast alle Kapitel gespielt. Spiel in ein paar Wochen eine Runde zur Auffrischung.</p>` : ""}
        <div class="stack" style="gap:6px;margin-top:6px">${rows}</div>
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
        <div class="row between"><h3 class="head" style="font-size:19px">${esc(t)}</h3><span class="tiny row" style="color:var(--good);gap:4px">${icon("check", 16)}durchschaut</span></div>
        <p class="small">${ch.debrief.what}</p>
        <ul class="signs small">${ch.debrief.signs.map(s => `<li>${s}</li>`).join("")}</ul>
        <p class="q small">${ch.debrief.question}</p></article>`;
    }
    return `<div class="tl-card locked"><span style="font-weight:600">${esc(t)}</span>${icon("lock", 16)}</div>`;
  };
  const count = TECHNIQUES.reduce((a, g) => a + g.list.length, 0);
  const have = TECHNIQUES.reduce((a, g) => a + g.list.filter(t => learned.includes(t)).length, 0);
  return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Wissen</h1><p class="muted small">${have} von ${count} durchschaut. Jede Technik landet hier – mit den Erkennungszeichen für den Alltag.</p></header>
    ${TECHNIQUES.map(g => `<section class="stack"><h2 class="label">${g.title || "Kampagne " + g.campaign}</h2>${g.list.map(card).join("")}</section>`).join("")}`;
}

function vFortschritt() {
  const played = CHAPTERS.filter(c => isDone(c) && c.type !== "story");
  if (!played.length) {
    return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Fortschritt</h1></header>
      <div class="card stack"><p>Noch nichts gespielt.</p><p class="muted small">Starte Kampagne 1, dann siehst du hier deine Sterne und Testergebnisse.</p>
      <button class="btn" data-a="startChapter" data-v="${CHAPTERS[0].id}">${icon("play", 18, true)}Kapitel 1 spielen</button></div>`;
  }
  const playable = CHAPTERS.filter(c => c.type !== "story");
  const totalStars = played.reduce((a, c) => a + (chapterState(c).stars || 1), 0);
  const tests = played.reduce((a, c) => [a[0] + chapterState(c).best, a[1] + c.test.length], [0, 0]);
  const groups = CAMPAIGNS.filter(c => !c.bilanz).map(c => {
    const items = played.filter(x => x.campaign === c.n);
    if (!items.length) return "";
    return `<section class="stack"><h2 class="label">Kampagne ${c.n} · ${esc(c.title)}</h2>
      ${items.map(x => { const st = chapterState(x); return `<div class="card stack" style="gap:8px">
        <div class="row between"><b class="small">${x.n}. ${esc(x.title)}</b>${starsHTML(st.stars || 1, 14)}</div>
        <div class="row between tiny"><span class="muted">${esc(x.technique)}</span><span>Test ${st.best}/${x.test.length}</span></div></div>`; }).join("")}</section>`;
  }).join("");
  return `<header class="stack" style="gap:4px"><h1 class="head" style="font-size:26px">Fortschritt</h1><p class="muted small">${played.length} von ${playable.length} Kapiteln gespielt</p></header>
    <div class="two">
      <div class="card stack" style="align-items:center;text-align:center;gap:4px"><span class="label">Sterne</span><div class="big" style="font-size:30px">${totalStars}</div><span class="tiny muted">von ${playable.length * 5}</span></div>
      <div class="card stack" style="align-items:center;text-align:center;gap:4px"><span class="label">Erkannt</span><div class="big" style="font-size:30px">${tests[1] ? Math.round(tests[0] / tests[1] * 100) : 0} %</div><span class="tiny muted">in den Mini-Tests</span></div>
    </div>
    ${groups}
    <p class="muted small">Die Sterne zeigen, wie gut du die Tricks angewendet hast. Worauf es im Alltag ankommt, ist die Erkennungsquote.</p>`;
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
    <section class="card stack"><h2 class="label">Rechtliches</h2><a class="small" href="rechtliches.html">Impressum und Datenschutz</a></section>
    <div style="text-align:center"><button class="linkbtn" data-a="reset">${confirmReset ? "Wirklich alles zurücksetzen?" : "Fortschritt zurücksetzen"}</button></div>`;
}

/* ============================================================
   Kapitel
   ============================================================ */
function startChapter(id) {
  CH = CHAPTERS.find(c => c.id === id) || CHAPTERS[0];
  S = { view: "chapter", phase: "scene", line: 0, run: CH.type === "story" ? null : newRun(CH), day: 0, dec: 0, dayState: null, picked: null, fx: null, prev: null, t: 0, ans: null, score: 0 };
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
    case "story": return vStory();
  }
  return "";
}

function sceneTheme() { return CH.forceTheme || theme; }

function vScene() {
  const l = CH.scene[S.line];
  const last = S.line === CH.scene.length - 1;
  const dots = CH.scene.map((_, i) => `<i class="${i <= S.line ? "on" : ""}"></i>`).join("");
  const label = CH.type === "story" ? CH.title : `Kampagne ${CH.campaign} · Kapitel ${CH.n}`;
  return `<main class="screen ${S.line === 0 ? "fade" : ""}">
    ${chapterTop(label)}
    <div class="town-frame scene-town">${townSVG({ theme: sceneTheme(), animate: S.line === 0, focusables: CH.focusables || [], lightsOff: CH.lightsOff && CH.lightsOff(store.progress), label: "Lindenhain: Szene" })}</div>
    <div class="card subtitle" aria-live="polite">
      <span class="who">${esc(l.who)}</span>
      <p class="line">${esc(l.text)}</p>
    </div>
    <div class="row between"><div class="dots" aria-label="Zeile ${S.line + 1} von ${CH.scene.length}">${dots}</div>
      ${last ? "" : `<button class="linkbtn" data-a="skipScene">Szene überspringen</button>`}</div>
    <div class="row">
      <button class="btn ghost" style="flex:1" data-a="prevLine" ${S.line === 0 ? "disabled" : ""}>Zurück</button>
      <button class="btn" style="flex:2" data-a="nextLine">${last ? (CH.type === "story" ? "Weiter" : "Zum Auftrag") : "Weiter"}</button>
    </div>
  </main>`;
}

function markFocus() {
  const l = CH.scene && CH.scene[S.line];
  document.querySelectorAll(".town .focus").forEach(e => e.classList.toggle("on", !!l && e.dataset.focus === l.focus));
}

function rivalAvatar(id, size = 40) {
  if (id === "you") return initials(CH.you.initials, "var(--warn)", size);
  const r = CH.rivals[id];
  return initials(r.initials, r.color, size);
}

function rankingHTML(run, title = "Rangliste") {
  const list = ranking(run, CH);
  const max = Math.max(...list.map(x => x.followers));
  return `<div class="card stack rank"><h2 class="label">${title}</h2>
    ${list.map((x, i) => `<div class="rank-row ${x.id === "you" ? "me" : ""}">
      <span class="pos">${i + 1}.</span>${rivalAvatar(x.id, 32)}
      <div class="stack" style="gap:4px;flex:1;min-width:0">
        <div class="row between"><span class="nm">${esc(x.name)}</span><b class="num">${fmt(x.followers)}</b></div>
        <div class="bar"><i style="width:${Math.max(3, x.followers / max * 100)}%;${x.id === "you" ? "" : "background:var(--track-strong)"}"></i></div>
      </div></div>`).join("")}
  </div>`;
}

function vMission() {
  const run = S.run;
  return `<main class="screen fade">
    ${chapterTop(`Kampagne ${CH.campaign} · Kapitel ${CH.n}`)}
    <div class="stack" style="gap:4px"><span class="kicker">Kapitel ${CH.n} · ${esc(CH.technique)}</span><h1 class="head" style="font-size:28px">${esc(CH.title)}</h1></div>
    <section class="card accent stack"><span class="kicker">Dein Auftrag</span><p style="font-size:18px">${esc(CH.mission)}</p></section>
    <section class="stack"><h2 class="label">${esc(CH.rivalsTitle || "Die Konkurrenz")}</h2>
      ${["a", "b"].map(id => `<div class="card row">${rivalAvatar(id)}<div class="stack" style="gap:0;flex:1"><b>${esc(CH.rivals[id].name)}</b><span class="tiny muted">${esc(CH.rivals[id].desc)}</span></div><b class="num">${fmt(CH.compStart[id])}</b></div>`).join("")}
      <div class="card row">${rivalAvatar("you")}<div class="stack" style="gap:0;flex:1"><b>${esc(CH.you.name)}</b><span class="tiny muted">Das bist du</span></div><b class="num">${fmt(run.followers)}</b></div>
    </section>
    <section class="stack"><h2 class="label">Deine drei Werte</h2>${hud(run)}
      <ul class="signs small">
        <li><b>${CH.mainLabel}</b>: ${esc(CH.mainHint || "dein Ziel")}. Zwischenziele: ${CH.milestones.map(fmt).join(", ")}.</li>
        <li><b>Glaubwürdigkeit</b> bestimmt, wie stark deine Beiträge wirken. Wer beim Übertreiben erwischt wird, verliert Wirkung.</li>
        <li><b>Spaltung</b> zeigt, was dein Vorgehen mit der Stadt macht.</li>
      </ul>
      <p class="tiny muted">Am Ende bekommst du bis zu fünf Sterne.</p></section>
    <button class="btn" data-a="toDay">Tag 1 beginnen</button>
  </main>`;
}

function fxChips(fx) { return deltaChips({ f: fx.df, t: fx.dt, s: fx.ds }); }

function eventHTML(ev) {
  if (ev.items) {
    const sp = speaker(ev.who);
    return `<div class="comment">${sp.av}<div class="bubble"><b>${esc(sp.name)}</b>
      <ul class="signs small" style="margin-top:6px">${ev.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div>`;
  }
  const head = speaker(ev.who) ? bubble(ev.who, ev.text, ev.label) : `<div class="card small">${esc(ev.text)}</div>`;
  return `<div class="stack" style="gap:8px">${head}${ev.fx ? fxChips(ev.fx) : ""}</div>`;
}

function optionHTML(dec, o, i) {
  let pic = "";
  if (dec.photo && o.img) pic = `<div class="photo">${photo(o.img)}</div>`;
  if (o.chart) pic = `<div class="photo">${chart(o.chart)}</div>`;
  return `<button class="opt ${S.picked === i ? "chosen" : ""}" data-a="pick" data-v="${i}" ${S.picked != null ? "disabled" : ""}>${pic}${esc(o.text)}</button>`;
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
    top = `${st.intro ? `<section class="card stack"><p>${esc(st.intro)}</p></section>` : ""}${st.events.map(eventHTML).join("")}`;
  }

  let decisionHTML = "";
  if (dec) {
    let fb = "";
    if (S.picked != null) {
      const o = dec.opts[S.picked];
      fb = `<div class="fb ${o.tier === "fair" ? "good" : o.tier === "plump" ? "bad" : ""}" role="status">${fxChips(S.fx)}<p>${esc(o.fb)}</p></div>`;
      if (!lastDec) fb += `<button class="btn" data-a="nextDec">Weiter</button>`;
    }
    const msg = dec.message ? bubble(dec.message.who, dec.message.text, dec.message.label) : "";
    const img = dec.image ? `<div class="photo">${photo(dec.image)}</div>` : "";
    const ctx = dec.context ? `<div class="card small muted">${esc(dec.context)}</div>` : "";
    decisionHTML = `${msg}${img}${ctx}<div class="stack" style="gap:4px">${first ? "" : `<span class="kicker">Tag ${day.n} · ${esc(day.title)}</span>`}<h2 class="head" style="font-size:21px;line-height:1.3">${esc(dec.q)}</h2></div>
      <div class="stack">${dec.opts.map((o, i) => optionHTML(dec, o, i)).join("")}</div>${fb}`;
  }

  let end = "";
  if (dayDone) {
    const lastDay = S.day === CH.days.length - 1;
    end = `<section class="stack day-end">
      <h2 class="label">Ende von Tag ${day.n}</h2>
      ${rankingHTML(run, "Stand nach Tag " + day.n)}
      <button class="btn" data-a="endDay">${lastDay ? "Zur Bilanz" : `Weiter zu Tag ${day.n + 1}`}</button>
    </section>`;
  }

  return `<main class="screen ${S.picked == null ? "fade" : ""}">
    ${chapterTop(`Tag ${day.n} von ${CH.days.length}`)}
    ${hud(run, S.prev)}
    ${first || !dec ? `<div class="stack" style="gap:2px"><span class="kicker">Tag ${day.n}${day.where ? " · " + esc(day.where) : ""}</span><h1 class="head" style="font-size:26px">${esc(day.title)}</h1></div>${top}` : ""}
    ${decisionHTML}
    ${end}
  </main>`;
}

function pollBar(p, label) {
  const L = CH.pollLabels || { a: "Dafür", b: "Dagegen" };
  return `<div class="stack" style="gap:6px"><span class="tiny muted">${label}</span>
    <div class="poll" role="img" aria-label="${L.a} ${p.sideA} %, offen ${p.undecided} %, ${L.b} ${p.sideB} %">
      <i style="width:${p.sideA}%;background:var(--c-skate)"></i><i style="width:${p.undecided}%;background:var(--track)"></i><i style="width:${p.sideB}%;background:var(--c-garden)"></i></div>
    <div class="row between tiny" style="white-space:nowrap"><span>${L.a} ${p.sideA} %</span><span class="muted">offen ${p.undecided} %</span><span>${L.b} ${p.sideB} %</span></div></div>`;
}

// Gesprächsklima statt Umfrage – für Kampagnen ohne Abstimmungsfrage
function climateCard(before, now) {
  const word = v => v < 25 ? "sachlich" : v < 40 ? "angespannt" : v < 55 ? "gereizt" : "vergiftet";
  const bar = (v, l) => `<div class="stack" style="gap:6px"><div class="row between tiny"><span class="muted">${l}</span><span>${word(v)}</span></div><div class="bar"><i style="width:${v}%;background:var(--warn)"></i></div></div>`;
  return `<section class="card stack"><h2 class="label">Gesprächsklima in Lindenhain</h2>${bar(before, "Vorher")}${bar(now, "Jetzt")}
    <p class="tiny muted">${now - before >= 12 ? "Man redet übereinander statt miteinander. Das bleibt, auch wenn dieser Wahlkampf vorbei ist." : now <= before ? "Es wird hart gestritten – aber über Sachen." : "Der Ton ist rauer geworden."}</p></section>`;
}

const VERDICT = ["Kaum jemand hat dich bemerkt.", "Ein Anfang, aber die Stadt schaut auf andere.", "Ordentlich für eine Woche.", "Stark. Man kennt dich in Lindenhain.", "Herausragend. Ganz Lindenhain redet über dich."];

function vWeek() {
  const run = S.run;
  const n = stars(CH, run.followers);
  const rank = ranking(run, CH).findIndex(x => x.id === "you") + 1;
  const next = CH.starLimits.find(l => run.followers < l);
  const before = poll(CH.start.split), now = poll(run.split);
  return `<main class="screen fade">
    ${chapterTop("Bilanz")}
    <div class="stack" style="gap:2px"><span class="kicker">Kapitel ${CH.n}</span><h1 class="head" style="font-size:28px">${esc(CH.weekTitle || "Wochenbilanz")}</h1></div>
    <section class="card accent stack" style="align-items:center;text-align:center">
      <span class="label">Dein Auftrag</span>
      ${starsHTML(n, 36)}
      <div class="big">${fmt(run.followers)}</div><span class="muted small">${esc(CH.mainLabel)} · Platz ${rank} von 3</span>
      <p>${(CH.verdicts || VERDICT)[n - 1]}</p>
      ${next ? `<p class="tiny muted">Für den nächsten Stern hätten ${fmt(next)} gereicht.</p>` : ""}
    </section>
    <section class="stack"><h2 class="label">Zwischenziele</h2>
      <div class="chips">${CH.milestones.map(m => `<span class="chip ${run.milestones.includes(m) ? "up" : "zero"}">${run.milestones.includes(m) ? "✓" : "○"} ${fmt(m)}</span>`).join("")}</div></section>
    ${rankingHTML(run, "Endstand")}
    ${CH.pollLabels ? `<section class="card stack"><h2 class="label">Stimmung in Lindenhain${CH.pollTopic ? " · " + esc(CH.pollTopic) : ""}</h2>
      ${pollBar(before, "Vorher")}${pollBar(now, "Jetzt")}
      <p class="tiny muted">${before.undecided - now.undecided >= 10 ? "Die Unentschiedenen sind deutlich weniger geworden. Wer jetzt eine feste Meinung hat, hat sie oft von dir." : "Viele sind noch unentschieden und wollen mehr wissen."}</p>
    </section>` : climateCard(CH.start.split, run.split)}
    <section class="card stack"><h2 class="label">Was sich verändert hat</h2>
      ${CH.statuses(run).map(s => { const sp = speaker(s.who); return `<div class="row" style="align-items:flex-start">${sp.av}<div class="stack" style="gap:0"><b class="small">${esc(sp.name)}</b><span class="small">${esc(s.text)}</span></div></div>`; }).join("")}
    </section>
    <button class="btn" data-a="toDebrief">Was steckt dahinter?</button>
  </main>`;
}

function vDebrief() {
  const e = CH.debrief;
  const run = S.run;
  const cls = { fair: "up", subtil: "mid", plump: "down" };
  const mine = run.picks.map(p => `<div class="stack" style="gap:4px"><span class="tiny muted">Tag ${p.day}</span><span class="small">${esc(p.text)}</span><span class="chip ${cls[p.tier]}" style="align-self:flex-start">${tierLabel(p.tier)}</span></div>`).join("");
  return `<main class="screen fade">
    ${chapterTop(CH.defense ? "Das Werkzeug" : "Die Technik")}
    <div class="stack" style="gap:4px"><span class="kicker">Durchschaut</span><h1 class="head" style="font-size:28px">${esc(CH.technique)}</h1></div>
    <p>${e.what}</p>
    <section class="card stack"><h2 class="label">${CH.defense ? "Warum es hilft" : "Warum es wirkt"}</h2><p class="muted">${e.why}</p></section>
    <section class="card stack"><h2 class="label">${CH.defense ? "So gehst du vor" : "So erkennst du es"}</h2><ul class="signs">${e.signs.map(s => `<li>${s}</li>`).join("")}</ul></section>
    <section class="card accent stack"><h2 class="label">Deine Gegenfrage</h2><p class="q">${e.question}</p></section>
    <section class="card stack"><h2 class="label">Dein Kapitel</h2>
      <p class="small">${countTier(run, "subtil")}× ${tierLabel("subtil")}, ${countTier(run, "plump")}× ${tierLabel("plump")}, ${countTier(run, "fair")}× ${tierLabel("fair")}.</p>
      <p class="small muted">${esc(CH.insight)}</p>
      ${mine}</section>
    <button class="btn" data-a="toTest">Zum Mini-Test</button>
  </main>`;
}

function testPost(it) {
  const ini = it.author.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return `<article class="post"><div class="headrow">${initials(esc(ini), it.color, 40)}
    <div class="stack" style="gap:0"><span class="name">${esc(it.author)}</span><span class="handle">${esc(it.handle || "")}</span></div></div>
    <p class="text">${esc(it.text)}</p></article>`;
}

function vTest() {
  const it = CH.test[S.t];
  const a = S.ans;
  const multi = !!it.choices;
  const right = multi ? it.answer : it.verdict;
  const btn = (v, label) => {
    let cls = "";
    if (a != null) { if (v === right) cls = "right"; else if (v === a) cls = "wrong"; }
    return `<button class="choice ${cls}" data-a="answer" data-v="${esc(v)}" ${a != null ? "disabled" : ""}>${esc(label)}</button>`;
  };
  const buttons = multi
    ? `<div class="grid-opts">${it.choices.map(c => btn(c, c)).join("")}</div>`
    : `<div class="two">${btn("serios", CH.defense ? "Hilft" : "Eher seriös")}${btn("manip", CH.defense ? "Schadet eher" : "Manipulativ")}</div>`;
  let fb = "";
  if (a != null) {
    const ok = a === right;
    fb = `<div class="fb ${ok ? "good" : "bad"}" role="status"><b>${ok ? "Richtig erkannt." : multi ? "Gesucht war: " + esc(right) : "Nicht ganz."}</b><p>${esc(it.exp)}</p></div>
      <button class="btn" data-a="nextTest">${S.t < CH.test.length - 1 ? "Nächstes Beispiel" : "Zum Ergebnis"}</button>`;
  }
  return `<main class="screen fade">
    ${chapterTop(`Mini-Test · ${S.t + 1} von ${CH.test.length}`)}
    <h1 class="head" style="font-size:22px">${esc(multi ? "Welche Technik steckt dahinter?" : (CH.testTitle || "Seriös oder manipulativ?"))}</h1>
    ${testPost(it)}
    ${buttons}
    ${fb}
  </main>`;
}

function nextChapterButton() {
  const i = CHAPTERS.indexOf(CH);
  const nx = CHAPTERS[i + 1];
  if (!nx) return `<button class="btn" data-a="leave">Zurück nach Lindenhain</button>`;
  const label = nx.type === "story" ? nx.title : `Kapitel ${nx.n}: ${nx.title}`;
  return `<button class="btn" data-a="startChapter" data-v="${nx.id}">Weiter: ${esc(label)}</button><button class="btn ghost" data-a="leave">Zurück nach Lindenhain</button>`;
}

function vFinal() {
  const run = S.run;
  const n = stars(CH, run.followers);
  return `<main class="screen fade">
    ${chapterTop(`Kapitel ${CH.n} geschafft`)}
    <div class="town-frame" style="height:210px">${townSVG({ theme, lightsOff: run.split >= 45, label: "Lindenhain am Ende des Kapitels" })}</div>
    <section class="two">
      <div class="card stack" style="align-items:center;text-align:center;gap:6px"><span class="label">Auftrag</span>${starsHTML(n, 20)}<span class="small">${fmt(run.followers)} ${esc(CH.mainLabel)}</span></div>
      <div class="card stack" style="align-items:center;text-align:center;gap:6px"><span class="label">Durchschaut</span><div class="big" style="font-size:30px">${S.score}/${CH.test.length}</div><span class="small">im Mini-Test</span></div>
    </section>
    <p class="small muted">${CH.defense ? "Die Sterne zeigen, wie gut du Lindenhain geschützt hast." : "Die Sterne zeigen, wie gut du manipuliert hast. Worauf es im Alltag ankommt, ist die rechte Zahl."}</p>
    <div class="card row">${icon("book", 20)}<span class="small">Neu im Wissen: <b>${esc(CH.technique)}</b></span></div>
    ${nextChapterButton()}
    <button class="btn ghost" data-a="startChapter" data-v="${CH.id}">Kapitel nochmal spielen</button>
  </main>`;
}

// Story-Kapitel (Gesamtbilanz, Epilog): Szene, dann eine Auswertung über alle bisherigen Kapitel.
function vStory() {
  const sum = CH.summary(store.progress, CHAPTERS);
  return `<main class="screen fade">
    ${chapterTop(CH.title)}
    <div class="stack" style="gap:2px"><span class="kicker">${esc(CH.kicker || "Bilanz")}</span><h1 class="head" style="font-size:28px">${esc(CH.title)}</h1></div>
    <div class="town-frame" style="height:230px">${townSVG({ theme: sceneTheme(), lightsOff: sum.lightsOff, label: "Lindenhain" })}</div>
    ${sum.lead ? `<p style="font-size:18px;line-height:1.5">${esc(sum.lead)}</p>` : ""}
    ${sum.stats ? `<div class="two">${sum.stats.map(s => `<div class="card stack" style="align-items:center;text-align:center;gap:4px"><span class="label">${esc(s.label)}</span><div class="big" style="font-size:28px">${esc(s.value)}</div>${s.sub ? `<span class="tiny muted">${esc(s.sub)}</span>` : ""}</div>`).join("")}</div>` : ""}
    ${sum.people ? `<section class="card stack"><h2 class="label">${esc(sum.peopleTitle || "Die Menschen in Lindenhain")}</h2>
      ${sum.people.map(s => { const sp = speaker(s.who); return `<div class="row" style="align-items:flex-start">${sp.av}<div class="stack" style="gap:0"><b class="small">${esc(sp.name)}</b><span class="small">${esc(s.text)}</span></div></div>`; }).join("")}</section>` : ""}
    ${sum.closing ? `<section class="card accent stack"><p>${esc(sum.closing)}</p></section>` : ""}
    ${nextChapterButton()}
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
function hideToast() { const t = document.getElementById("toast"); if (t) t.classList.remove("show"); }
function toast(milestones) {
  if (!milestones || !milestones.length) return;
  let el = document.getElementById("toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  const m = milestones[milestones.length - 1];
  el.innerHTML = `${icon("check", 18)}<span>Zwischenziel erreicht: <b>${fmt(m)} ${esc(CH.mainLabel)}</b></span>`;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2800);
}

function beginDay(idx) {
  S.day = idx; S.dec = 0; S.picked = null; S.fx = null;
  S.prev = { followers: S.run.followers, trust: S.run.trust, split: S.run.split };
  S.dayState = startDay(S.run, CH, idx);
  hideToast();
  render();
  toast(S.dayState.events.flatMap(e => (e.fx && e.fx.reached) || []));
}

function finishChapter(extra = {}) {
  const prev = store.progress.chapters[CH.id] || {};
  store.progress.chapters[CH.id] = { ...prev, done: true, ...extra };
  if (CH.technique && CH.type !== "story" && !store.progress.learned.includes(CH.technique)) store.progress.learned.push(CH.technique);
  save();
}

const actions = {
  tab(v) { S.tab = v; confirmReset = false; render(); },
  viewCampaign(v) { S.viewCampaign = isNaN(+v) ? v : +v; render(false); },
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
  startChapter(v) { startChapter(v); hideToast(); render(); markFocus(); },
  leave() { hideToast(); S = { view: "menu", tab: "play" }; render(); },
  nextLine() {
    if (S.line < CH.scene.length - 1) { S.line++; render(false); markFocus(); }
    else if (CH.type === "story") { finishChapter(); S.phase = "story"; render(); }
    else { S.phase = "mission"; render(); }
  },
  prevLine() { if (S.line > 0) { S.line--; render(false); markFocus(); } },
  skipScene() {
    if (CH.type === "story") { finishChapter(); S.phase = "story"; }
    else S.phase = "mission";
    render();
  },
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
    const it = CH.test[S.t];
    S.ans = v; if (v === (it.choices ? it.answer : it.verdict)) S.score++;
    render(false); scrollToEl(".fb");
  },
  nextTest() {
    S.ans = null;
    if (S.t < CH.test.length - 1) { S.t++; render(); return; }
    const prev = store.progress.chapters[CH.id] || {};
    finishChapter({
      vals: { followers: S.run.followers, trust: S.run.trust, split: S.run.split },
      stars: Math.max(prev.stars || 0, stars(CH, S.run.followers)),
      best: Math.max(prev.best || 0, S.score),
      lastSplit: S.run.split,
      lastStars: stars(CH, S.run.followers),
      flags: S.run.flags,
    });
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
