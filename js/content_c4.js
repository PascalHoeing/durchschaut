// Kampagne 4: Der unsichtbare Einfluss – wer spricht hier eigentlich?
// Alle Orte, Personen, Firmen und Aussagen sind frei erfunden.
// Leitplanke: Die Optionen beschreiben, WAS geschieht, nicht WIE man es technisch umsetzt.
import { checkDay, person } from "./common.js";

const NORDLOG = person("Henrik Sand · Nordlog", "HS", "#5A6A7A");
const INI = person("Mara Lenz · Initiative „Grünes Tor“", "ML", "#3E8A5A");
const FORENSIK = person("Prof. Jan Okafor · Medienforensik", "JO", "#6A5FA8");

const BASE = {
  campaign: 4,
  rivals: {
    a: { name: "Initiative „Grünes Tor“", initials: "GT", color: "#3E8A5A", desc: "Anwohner gegen das Logistikzentrum" },
    b: { name: "Gewerbeverein", initials: "GV", color: "#9E7A3E", desc: "Eher dafür, aber mit eigenen Bedingungen" },
  },
  rivalsTitle: "Die anderen Stimmen",
  you: { name: "Agentur Hebel (für Nordlog)", initials: "AH" },
  mainLabel: "Unterstützer",
  mainHint: "so viele Menschen unterstützen öffentlich das Logistikzentrum",
  weekTitle: "Die Stimmung",
  verdicts: [
    "Kaum jemand steht hinter dem Projekt.",
    "Ein paar Unterstützer, mehr nicht.",
    "Ordentlich – das Projekt hat Fürsprecher.",
    "Stark. Es wirkt, als stünde die Stadt dahinter.",
    "Herausragend. Niemand ahnt, wie viel davon gemacht ist.",
  ],
  focusables: ["funkturm", "rathaus", "verlag", "lot", "cafe"],
};

const C4_TECH = ["Vorgetäuschte Bürgerbewegung", "Fake-Accounts", "Scheinbar unabhängige Nachrichtenseiten", "KI-Fälschungen", "Seriös"];

/* ------------------------------------------------------------
   Kapitel 1: Vorgetäuschte Bürgerbewegung
   ------------------------------------------------------------ */
export const C4K1 = {
  ...BASE, id: "k4-1", n: 1,
  title: "Die Initiative",
  technique: "Vorgetäuschte Bürgerbewegung",
  start: { followers: 3000, trust: 60, split: 24 },
  compStart: { a: 4300, b: 3700 },
  growth: { a: [120, 120, 60, 100], b: [60, 60, 100, 60] },
  milestones: [3200, 3400, 3600, 3800],
  starLimits: [3400, 3550, 3680, 3790],
  insight: "Am meisten bringt eine Bewegung mit echten Gesichtern, deren Geldgeber nur im Kleingedruckten steht. Völlig erfundene Gruppen fliegen schnell auf.",
  scene: [
    { who: "Erzähler", text: "Im Herbst darauf. Am Stadtrand, am alten Güterbahnhof, soll ein Logistikzentrum entstehen. Bauherr: die Firma Nordlog.", focus: "funkturm" },
    { who: "Erzähler", text: "300 Arbeitsplätze, mehr Gewerbesteuer – aber auch 200 Lkw am Tag. Die Initiative „Grünes Tor“ sammelt Unterschriften dagegen.", focus: "lot" },
    { who: "Erzähler", text: "In drei Monaten entscheidet der Rat. Nordlog will, dass es dann so aussieht, als stünde Lindenhain hinter dem Projekt.", focus: "rathaus" },
    { who: "Erzähler", text: "Diesmal bist du die Agentur, die das möglich machen soll. Unsichtbar.", focus: "verlag" },
  ],
  mission: "Vier Tage: Bring möglichst viele Unterstützer hinter das Logistikzentrum – ohne dass Nordlog im Vordergrund steht.",
  days: [
    {
      n: 1, title: "Der Auftrag",
      intro: "Henrik Sand von Nordlog: „Wenn wir selbst werben, glaubt uns keiner. Es muss aus der Stadt kommen.“",
      decisions: [
        {
          q: "Wie gehst du vor?",
          opts: [
            { tier: "fair", text: "Nordlog wirbt offen als Firma: Infoabend, Pläne, Ansprechpartner", f: 60, t: 4, s: -1,
              fb: "Jeder weiß, wer spricht. Manche sind skeptisch, aber niemand fühlt sich getäuscht." },
            { tier: "subtil", flag: "astro1", text: "Eine „Initiative Arbeit für Lindenhain“ gründen – mit echten Leuten, finanziert von Nordlog, das steht nur im Impressum", f: 240, t: -1, s: 3,
              fb: "Die Gesichter sind echt, die Begeisterung teilweise auch. Wer bezahlt, sieht man erst beim genauen Hinsehen." },
            { tier: "plump", flag: "astro1p", text: "Eine Initiative erfinden: Name, Logo, Fotos von Menschen, die es nicht gibt", f: 280, t: -6, s: 5,
              fb: "Sieht aus wie eine Bürgerbewegung, ist aber eine Kulisse. Sobald jemand die Mitglieder treffen will, wird es eng." },
          ],
        },
        {
          q: "Wer wird das Gesicht der Kampagne?",
          opts: [
            { tier: "fair", text: "Henrik Sand selbst, als Projektleiter von Nordlog", f: 40, t: 3, s: 0,
              fb: "Ein Gesicht mit klarer Rolle. Nicht sympathisch für alle, aber ehrlich." },
            { tier: "subtil", flag: "face", text: "Eine Lagerarbeiterin aus Lindenhain, die bei Nordlog anfangen würde – dass sie bezahlt wird, sagt sie nicht", f: 210, t: -1, s: 2,
              fb: "Ihre Hoffnung auf den Job ist echt. Das Honorar für die Auftritte bleibt unerwähnt." },
            { tier: "plump", text: "Ein Schauspieler als „besorgter Familienvater“", f: 240, t: -5, s: 4,
              fb: "Eine gespielte Rolle. Lindenhain ist klein – irgendwer kennt ihn." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Plakate",
      intro: "Die Initiative „Grünes Tor“ hängt handgemalte Plakate auf. Deine Seite kann drucken lassen, so viel sie will.",
      decisions: [{
        q: "Was hängt bei dir?",
        opts: [
          { tier: "fair", text: "Plakate mit Nordlog-Logo: „300 Jobs für Lindenhain – kommen Sie zum Infoabend“", f: 60, t: 4, s: -1,
            fb: "Klar als Werbung erkennbar. Wirkt weniger, ist aber fair." },
          { tier: "subtil", flag: "astro2", text: "„Lindenhainer sagen Ja“ – mit Fotos echter Unterstützer, ohne Absender", f: 230, t: -1, s: 4,
            fb: "Wer sie sieht, denkt: Viele Nachbarn sind dafür. Dass eine Firma 200 Plakate bezahlt hat, sieht niemand." },
          { tier: "plump", flag: "astro2p", text: "„Schon 5.000 Lindenhainer sind dafür!“ – die Zahl ist ausgedacht", f: 260, t: -6, s: 5,
            fb: "Eine erfundene Mehrheit auf Papier. Wenn jemand nachfragt, gibt es keine Liste." },
        ],
      }],
    },
    { n: 3, title: "Wer steckt dahinter?", dynamic: "check" },
    {
      n: 4, title: "Die Bürgerfragestunde", where: "Rathaus",
      intro: "Im Rat dürfen Bürgerinnen und Bürger Fragen stellen. Die „Grünes Tor“-Leute sind da.",
      decisions: [{
        q: "Wen schickst du ans Mikrofon?",
        opts: [
          { tier: "fair", text: "Henrik Sand: „Ich bin von Nordlog und beantworte Ihre Fragen.“", f: 90, t: 4, s: -2,
            fb: "Die Fragestunde wird zur echten Diskussion. Einige Bedenken kann er ausräumen." },
          { tier: "subtil", text: "Fünf Mitglieder deiner Initiative, jeder „als ganz normaler Bürger“", f: 210, t: -1, s: 3,
            fb: "Es wirkt, als gäbe es viele Befürworter. Dass sie zusammengehören, weiß keiner im Saal." },
          { tier: "plump", text: "Den Schauspieler noch einmal", f: 230, t: -6, s: 5,
            fb: "Eine Ratsfrau erkennt ihn aus der Theatergruppe. Sie sagt nichts – noch nicht." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.astro1 || run.flags.astro1p) items.push(run.flags.astro1p ? "Die Initiative hat keine Mitglieder, die jemand kennt. Die Fotos stammen aus einer Bilddatenbank." : "Laut Impressum wird die „Initiative Arbeit für Lindenhain“ von Nordlog finanziert.");
      if (run.flags.face) items.push("Das Gesicht der Kampagne bekommt ein Honorar von Nordlog.");
      if (run.flags.astro2 || run.flags.astro2p) items.push(run.flags.astro2p ? "Für die „5.000 Unterstützer“ gibt es keine Liste." : "Die 200 „Lindenhainer sagen Ja“-Plakate hat eine Druckerei im Auftrag von Nordlog gedruckt.");
      return checkDay(run, fx, {
        intro: "Frau Kessler von der Rundschau fragt: Wer ist eigentlich die Initiative, die so viele Plakate hat?",
        who: "kessler",
        praise: "„Nordlog wirbt offen für sein Projekt. Man muss es nicht mögen – aber man weiß, mit wem man redet.“",
        items,
        crowd: "Der Artikel heißt „Die Bürgerbewegung, die eine Firma ist“. Er wird in jeder Gruppe geteilt.",
        reply: [
          { text: "Offenlegen: Die Initiative wird von Nordlog finanziert, ab jetzt steht es auf jedem Plakat", fb: "Peinlich, aber jetzt ist es ehrlich. Ein Teil der Unterstützer bleibt." },
          { text: "„Unsere Mitglieder sind echte Lindenhainer mit echter Meinung.“", fb: "Teilweise wahr. Aber die Frage war, wer bezahlt." },
          { text: "„Die Rundschau wird von der Initiative ‚Grünes Tor‘ gesteuert!“", fb: "Ein Gegenvorwurf ohne Beleg. Er macht es schlimmer." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: INI, text: run.flags.astro1 || run.flags.astro1p ? "Fragt sich, ob sie gegen eine Bürgerbewegung kämpft oder gegen eine Firma. Viele Unterstützer sind verunsichert." : "Diskutiert mit Henrik Sand auf dem Infoabend. Sie bleibt dagegen – aber sie weiß jetzt mehr." });
    out.push({ who: NORDLOG, text: run.flags.doubleDown ? "Muss im Rat erklären, warum seine Firma eine Initiative bezahlt hat. Der Rat vertagt sich." : "Hat einen Lkw-Plan vorgelegt: keine Fahrten durch Wohngebiete." });
    out.push({ who: "yilmaz", text: run.flags.astro2 || run.flags.astro2p ? "Hatte ein „Lindenhainer sagen Ja“-Plakat im Fenster. Er hat es abgenommen." : "Hat beide Flyer an der Kasse liegen – „damit jeder selbst entscheidet“." });
    return out;
  },
  debrief: {
    what: "Eine vorgetäuschte Bürgerbewegung (auch „Astroturfing“, nach einem Kunstrasen) wirkt wie eine Graswurzel-Initiative von Bürgern – wird aber von einer Firma, einem Verband oder einer anderen Organisation gesteuert und bezahlt.",
    why: "Wir trauen Nachbarn mehr als Firmen. Wenn „viele Bürger“ für etwas sind, wirkt es breit getragen. Wer bezahlt, ist auf den ersten Blick nicht zu sehen.",
    signs: [
      "Neue Initiativen mit viel Geld: professionelle Plakate, Anzeigen, Website.",
      "Unklare Absender: Wer steht im Impressum, wer finanziert?",
      "Die Ziele der Initiative decken sich genau mit denen einer Firma.",
      "Mitglieder, die niemand persönlich kennt.",
    ],
    question: "Wer steckt hinter dieser Gruppe – und wer bezahlt sie?",
  },
  test: [
    { author: "Bürger für sichere Energie", handle: "@buerger_energie", color: "#5A6A7A",
      text: "Wir sind ganz normale Lindenhainer und sagen: Das neue Gaskraftwerk ist die beste Lösung! (Impressum: Netzwerk Energie GmbH)",
      verdict: "manip", exp: "„Ganz normale Lindenhainer“ – im Impressum steht eine Firma. Die Gruppe wirkt bürgernah, ist es aber nicht." },
    { author: "Nordlog GmbH", handle: "@nordlog", color: "#5A6A7A",
      text: "Wir möchten am Güterbahnhof ein Logistikzentrum bauen. Am Donnerstag stellen wir die Pläne vor und beantworten Ihre Fragen.",
      verdict: "serios", exp: "Die Firma spricht als Firma. Klar, wer was will." },
    { author: "Mütter für Sicherheit", handle: "@muetter_sicher", color: "#B0705A",
      text: "Als besorgte Mütter fordern wir mehr Überwachungskameras! (Die Website wurde von einem Kamerahersteller registriert.)",
      verdict: "manip", exp: "Das Anliegen wirkt persönlich, der Absender ist ein Hersteller, der davon profitiert." },
    { author: "Initiative „Grünes Tor“", handle: "@gruenes_tor", color: "#3E8A5A",
      text: "Wir sind 140 Anwohner vom Güterbahnhof. Treffen jeden Dienstag im Bürgerhaus, jeder ist willkommen. Spendenkonto und Ausgaben stehen auf unserer Seite.",
      verdict: "serios", exp: "Wer, wie viele, wo man sie trifft, wie sie sich finanzieren – alles offen." },
    { author: "Aktion Lindenhain bewegt", handle: "@lh_bewegt", color: "#5A6890",
      text: "Tausende Lindenhainer stehen hinter der neuen Umgehungsstraße! Mach mit! (Gegründet vor 2 Wochen, Mitglieder: nicht angegeben)",
      verdict: "manip", exp: "Neu, groß behauptet, niemand bekannt. Typische Zeichen einer Kulisse." },
    { author: "Gewerbeverein Lindenhain", handle: "@gewerbeverein_lh", color: "#9E7A3E",
      text: "Als Verband der örtlichen Händler unterstützen wir das Logistikzentrum, wenn die Lkw nicht durch die Innenstadt fahren. Unsere Mitgliederliste ist öffentlich.",
      verdict: "serios", exp: "Ein Verband mit eigenem Interesse – aber er sagt, wer er ist und was er will." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 2: Fake-Accounts und Scheinmehrheiten
   ------------------------------------------------------------ */
export const C4K2 = {
  ...BASE, id: "k4-2", n: 2,
  title: "Die Kommentare",
  technique: "Fake-Accounts",
  start: { followers: 3600, trust: 60, split: 26 },
  compStart: { a: 4600, b: 4000 },
  growth: { a: [130, 110, 60, 100], b: [60, 60, 100, 60] },
  milestones: [3800, 4000, 4200, 4400],
  starLimits: [4000, 4150, 4250, 4350],
  insight: "Am meisten bringen echte Menschen, die ungekennzeichnet für dich schreiben. Massen an erfundenen Profilen werden irgendwann entdeckt.",
  scene: [
    { who: "Erzähler", text: "Die Debatte über das Logistikzentrum findet in den Kommentarspalten statt. Lindenhain Live, Rundschau, Lindenhain-Gruppe.", focus: "cafe" },
    { who: "Erzähler", text: "Unter jedem Beitrag: die Initiative „Grünes Tor“, laut und gut organisiert.", focus: "lot" },
    { who: "Erzähler", text: "Nordlog will, dass es dort anders aussieht. Nicht weil sich Meinungen ändern – sondern weil es so wirkt.", focus: "funkturm" },
  ],
  mission: "Vier Tage: Lass es so aussehen, als sei die Mehrheit für das Logistikzentrum.",
  days: [
    {
      n: 1, title: "Die Kommentarspalten",
      intro: "Unter dem Rundschau-Artikel zum Logistikzentrum stehen 180 Kommentare. Drei Viertel sind dagegen.",
      decisions: [
        {
          q: "Wie bringst du mehr Ja-Stimmen in die Kommentare?",
          opts: [
            { tier: "fair", text: "Der offizielle Nordlog-Account antwortet sachlich auf Fragen", f: 60, t: 4, s: -1,
              fb: "Klar als Firma erkennbar. Manche Antworten überzeugen, manche nicht." },
            { tier: "subtil", flag: "sock1", text: "Agentur-Mitarbeiter kommentieren mit privaten Profilen – ohne zu sagen, für wen sie arbeiten", f: 240, t: -1, s: 3,
              fb: "Echte Menschen, echte Profile. Nur dass sie bezahlt schreiben, weiß niemand." },
            { tier: "plump", flag: "sock1p", text: "Dutzende neue Profile mit erfundenen Namen und Bildern", f: 290, t: -6, s: 5,
              fb: "Plötzlich sind viele dafür. Aber die Profile sind alle eine Woche alt und schreiben ähnlich." },
          ],
        },
        {
          q: "Und die Likes?",
          opts: [
            { tier: "fair", text: "Nichts tun – Likes kommen, oder eben nicht", f: 20, t: 2, s: 0,
              fb: "Die Zustimmung ist so groß, wie sie ist." },
            { tier: "subtil", flag: "likes", text: "Die eigenen Mitarbeiter bitten, Pro-Kommentare zu liken", f: 180, t: -1, s: 2,
              fb: "Die Pro-Kommentare stehen jetzt oben. Für Leser sieht es nach Mehrheit aus." },
            { tier: "plump", flag: "likesp", text: "Tausende Likes einkaufen", f: 220, t: -6, s: 4,
              fb: "Ein Kommentar mit 3.000 Likes in einer Stadt mit 24.000 Einwohnern. Das fällt auf." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Umfrage",
      intro: "Lindenhain Live startet eine Online-Abstimmung: „Logistikzentrum – ja oder nein?“",
      decisions: [{
        q: "Was machst du?",
        opts: [
          { tier: "fair", text: "Nichts – und Nordlog sagt offen, dass es auf eine repräsentative Umfrage wartet", f: 60, t: 4, s: -1,
            fb: "Die Abstimmung geht 35:65 aus. Unangenehm, aber ehrlich." },
          { tier: "subtil", flag: "pollpush", text: "Alle Mitarbeiter und deren Familien bitten, abzustimmen", f: 220, t: -1, s: 3,
            fb: "Jede Stimme ist ein echter Mensch – aber gezielt mobilisiert. Das Ergebnis: 52:48 für Ja." },
          { tier: "plump", flag: "pollfake", text: "Die Abstimmung mit automatisierten Stimmen fluten", f: 260, t: -7, s: 5,
            fb: "88 % Ja. Lindenhain Live sieht in den Daten 4.000 Stimmen in einer Stunde." },
        ],
      }],
    },
    { n: 3, title: "Die Profile", dynamic: "check" },
    {
      n: 4, title: "Die Ratssitzung", where: "Rathaus",
      intro: "Der Rat diskutiert. Eine Ratsfrau liest Kommentare vor: „Die Stimmung im Netz ist doch eindeutig.“",
      decisions: [{
        q: "Dein letzter Schritt vor der Sitzung:",
        opts: [
          { tier: "fair", text: "Nordlog veröffentlicht eine repräsentative Umfrage: 46 % dafür, 41 % dagegen", f: 90, t: 4, s: -2,
            fb: "Eine echte Zahl. Knapper als gewünscht, aber belastbar." },
          { tier: "subtil", text: "Deine Leute teilen die Pro-Kommentare in alle Gruppen", f: 210, t: -1, s: 3,
            fb: "Die Ratsfrau hält sie für die Stimme der Stadt." },
          { tier: "plump", text: "Mit den Fake-Profilen die Ratsmitglieder direkt anschreiben", f: 230, t: -6, s: 5,
            fb: "Vierzig Nachrichten von Leuten, die keiner kennt. Ein Ratsherr ruft bei einem an – die Nummer gibt es nicht." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.sock1p) items.push("43 Pro-Profile wurden in derselben Woche angelegt, haben keine Freunde in Lindenhain und benutzen ähnliche Sätze.");
      if (run.flags.sock1) items.push("Mehrere Pro-Kommentatoren arbeiten für die Agentur, die Nordlog betreut. Gesagt haben sie das nicht.");
      if (run.flags.likesp) items.push("Die Likes kamen fast alle aus dem Ausland, innerhalb von zwei Stunden.");
      if (run.flags.likes) items.push("Die meistgelikten Pro-Kommentare wurden von denselben 20 Profilen geliked – alle mit Verbindung zu Nordlog.");
      if (run.flags.pollfake) items.push("Lindenhain Live hat die Abstimmung zurückgezogen: 4.000 Stimmen in einer Stunde, alle automatisiert.");
      if (run.flags.pollpush) items.push("Ein Drittel der Ja-Stimmen in der Abstimmung kam aus Nordlog-Kreisen.");
      return checkDay(run, fx, {
        intro: "Frau Kessler hat sich die Kommentarspalten genau angesehen.",
        who: "kessler",
        praise: "„Nordlog diskutiert offen und mit eigenem Namen. Im Vergleich zu anderen Debatten wohltuend.“",
        items,
        crowd: "Der Artikel „Die Mehrheit, die keine ist“ wird viel geteilt. Unter Pro-Kommentaren fragen Leute jetzt: „Bist du echt?“",
        reply: [
          { text: "Offenlegen, welche Profile zur Agentur gehören, und sie stilllegen", fb: "Ein harter Schritt. Aber die Debatte wird danach ehrlicher." },
          { text: "„Jeder darf seine Meinung sagen, auch unsere Mitarbeiter.“", fb: "Ja – mit Hinweis, für wen sie arbeiten. Der fehlte." },
          { text: "„Auch die Gegner haben Fake-Profile!“", fb: "Belege? Keine. Der Vorwurf lenkt nur ab." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: INI, text: run.flags.sock1p || run.flags.pollfake ? "Fühlt sich bestätigt: „Wenn sie so tricksen müssen, kann das Projekt nicht gut sein.“ Die Initiative wächst." : "Antwortet in den Kommentaren auf Nordlog. Manchmal wird es sogar ein Gespräch." });
    out.push({ who: "deniz", text: run.flags.sock1 || run.flags.sock1p ? "Liest keine Kommentarspalten mehr. „Ich weiß ja nicht, wer da schreibt.“" : "Hat sich im Gewerbeverein informiert und ist unentschieden." });
    out.push({ who: "kessler", text: "Die Rundschau zeigt bei Kommentaren jetzt an, seit wann ein Profil besteht." });
    return out;
  },
  debrief: {
    what: "Fake-Accounts sind Profile, die nicht die Person sind, die sie zu sein vorgeben – erfundene Menschen, bezahlte Schreiber ohne Kennzeichnung oder automatisierte Programme. Zusammen erzeugen sie eine Scheinmehrheit.",
    why: "Wir orientieren uns an anderen: Wenn viele etwas sagen oder liken, halten wir es für die Mehrheitsmeinung. Wer viele Stimmen vortäuscht, verschiebt, was als normal gilt.",
    signs: [
      "Viele neue Profile, die gleichzeitig zum selben Thema schreiben.",
      "Ähnliche Formulierungen in vielen Kommentaren.",
      "Ungewöhnlich viele Likes in kurzer Zeit.",
      "Profile ohne Freunde, ohne Vorgeschichte, ohne Bezug zum Ort.",
    ],
    question: "Wer sind diese Stimmen wirklich – und wie viele sind es?",
  },
  test: [
    { author: "Lena_Lindenhain_84", handle: "@lena84_lh · Profil seit 3 Tagen", color: "#5A6890",
      text: "Endlich Arbeitsplätze! Das Logistikzentrum ist das Beste, was Lindenhain passieren kann! 💪",
      verdict: "manip", exp: "Drei Tage altes Profil, Werbesprache. Eines von vielen ähnlichen am selben Tag – typisch für eine Scheinmehrheit." },
    { author: "Mara Lenz", handle: "@maralenz · Profil seit 2016", color: "#3E8A5A",
      text: "Ich wohne seit 20 Jahren am Güterbahnhof und habe Angst vor dem Lkw-Verkehr. Am Dienstag treffen wir uns im Bürgerhaus.",
      verdict: "serios", exp: "Erkennbare Person, eigene Betroffenheit, offen für Gespräche." },
    { author: "Kommentarspalte", handle: "12 Kommentare in 5 Minuten", color: "#8a5a44",
      text: "„Super Projekt!“ – „Super Projekt für uns alle!“ – „Wirklich ein super Projekt!“ (alle Profile ohne Profilbild)",
      verdict: "manip", exp: "Gleiche Sätze, gleiche Zeit, keine Gesichter. So sieht eine gemachte Welle aus." },
    { author: "Henrik Sand (Nordlog)", handle: "@henrik_sand · Projektleiter Nordlog", color: "#5A6A7A",
      text: "Ich arbeite für Nordlog und finde das Projekt gut, klar. Zu den Lkw: Wir planen eine eigene Zufahrt ohne Wohngebiete.",
      verdict: "serios", exp: "Er sagt, für wen er arbeitet. Dann kann jeder sein Argument einordnen." },
    { author: "Umfrage Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Unsere Abstimmung: 88 % für das Logistikzentrum! (4.200 Stimmen, Lindenhain hat 24.000 Einwohner, abgestimmt wurde in einer Nacht)",
      verdict: "manip", exp: "So viele Stimmen in einer Nacht sind kaum echt. Offene Online-Abstimmungen lassen sich leicht verfälschen." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Repräsentative Umfrage (1.000 Befragte): 46 % für das Logistikzentrum, 41 % dagegen, 13 % unentschieden.",
      verdict: "serios", exp: "Gezielt ausgewählte Befragte, Zahl und Ergebnis offen." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 3: Scheinbar unabhängige Nachrichtenseiten
   ------------------------------------------------------------ */
export const C4K3 = {
  ...BASE, id: "k4-3", n: 3,
  title: "Das Portal",
  technique: "Scheinbar unabhängige Nachrichtenseiten",
  start: { followers: 4200, trust: 60, split: 28 },
  compStart: { a: 4900, b: 4400 },
  growth: { a: [130, 110, 60, 100], b: [60, 60, 100, 60] },
  milestones: [4400, 4600, 4800, 5000],
  starLimits: [4600, 4750, 4870, 4970],
  insight: "Am meisten bringt eine Seite, die wirklich lokale Nachrichten bringt – und beim einen Thema leise die Richtung vorgibt. Wer die Rundschau kopiert, wird erwischt.",
  scene: [
    { who: "Erzähler", text: "Die Rundschau berichtet kritisch über das Logistikzentrum. Lindenhain Live mal so, mal so.", focus: "verlag" },
    { who: "Erzähler", text: "Henrik Sand hat eine Idee: „Was, wenn es eine dritte Zeitung gäbe? Eine, die uns versteht?“", focus: "funkturm" },
    { who: "Erzähler", text: "Eine Nachrichtenseite kostet heute kaum etwas. Und sie sieht aus wie jede andere.", focus: "cafe" },
  ],
  mission: "Vier Tage: Bau eine Nachrichtenseite, der Lindenhain vertraut – und die das Logistikzentrum gut aussehen lässt.",
  days: [
    {
      n: 1, title: "Die Gründung",
      intro: "Nordlog bezahlt. Du baust.",
      decisions: [
        {
          q: "Was für eine Seite wird es?",
          opts: [
            { tier: "fair", text: "Ein klar gekennzeichneter Nordlog-Blog: „Neues vom Projekt Güterbahnhof“", f: 60, t: 4, s: -1,
              fb: "Jeder weiß, was er liest. Die Reichweite bleibt bescheiden." },
            { tier: "subtil", flag: "portal1", text: "„Lindenhain Heute“: echte Lokalnachrichten, Vereine, Wetter – und beim Logistikzentrum die Nordlog-Sicht. Impressum: eine neue GmbH", f: 250, t: -1, s: 3,
              fb: "Wer die Vereinsnachrichten liest, vertraut auch dem Rest. Wer hinter der GmbH steht, steht nirgends." },
            { tier: "plump", flag: "portal1p", text: "„Lindenhainer Rundschau Online“ – Logo und Farben fast wie bei der echten Rundschau", f: 290, t: -7, s: 5,
              fb: "Eine Kopie, die vom Ruf der echten Zeitung lebt. Das ist nicht nur unfair, sondern rechtlich heikel." },
          ],
        },
        {
          q: "Wer schreibt die Artikel zum Logistikzentrum?",
          opts: [
            { tier: "fair", text: "Henrik Sand, mit Namen und Funktion", f: 40, t: 3, s: 0,
              fb: "Klare Absenderin, klare Sicht. Leser können es einordnen." },
            { tier: "subtil", flag: "byline", text: "„Redaktion Lindenhain Heute“ – ohne Namen", f: 200, t: -1, s: 2,
              fb: "Klingt nach Journalismus. Dass die „Redaktion“ von Nordlog bezahlt wird, sieht niemand." },
            { tier: "plump", text: "Eine erfundene Reporterin mit Foto und Lebenslauf", f: 230, t: -6, s: 4,
              fb: "Die Reporterin gibt es nicht. Spätestens beim ersten Anruf fällt das auf." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die erste Schlagzeile",
      intro: "Die Initiative „Grünes Tor“ legt ein Lärmgutachten vor: Nachts wären die Lkw an drei Häusern lauter als erlaubt.",
      decisions: [{
        q: "Was bringt deine Seite?",
        opts: [
          { tier: "fair", text: "Das Gutachten zusammenfassen – und Nordlogs Antwort daneben", f: 70, t: 4, s: -1,
            fb: "Beide Seiten mit ihren Belegen. Das wirkt seriös, weil es seriös ist." },
          { tier: "subtil", flag: "portal2", text: "„Neue Lärmschutzwand geplant: Nordlog hört auf Anwohner“ – das Gutachten nur im letzten Satz", f: 220, t: -1, s: 3,
            fb: "Die Wand ist geplant, das stimmt. Dass sie auf das Gutachten reagiert, das du kaum erwähnst, bleibt unklar." },
          { tier: "plump", flag: "portal2p", text: "„Gefälligkeitsgutachten? Initiative zahlt für gewünschte Ergebnisse“", f: 260, t: -7, s: 6,
            fb: "Ein Vorwurf ohne Beleg – ausgerechnet von einer Seite, die selbst bezahlt wird." },
        ],
      }],
    },
    { n: 3, title: "Das Impressum", dynamic: "check" },
    {
      n: 4, title: "Die Leserbriefe",
      intro: "Leser fragen bei „Lindenhain Heute“, wer die Seite eigentlich betreibt.",
      decisions: [{
        q: "Deine Antwort:",
        opts: [
          { tier: "fair", text: "„Lindenhain Heute wird von Nordlog finanziert. Das hätten wir von Anfang an sagen müssen.“", f: 90, t: 4, s: -2,
            fb: "Ein ehrliches Eingeständnis. Einige Leser bleiben – sie wissen jetzt, was sie lesen." },
          { tier: "subtil", text: "„Wir sind ein unabhängiges Team aus Lindenhain.“", f: 200, t: -1, s: 2,
            fb: "„Unabhängig“ ist das falsche Wort für eine Seite, die eine Firma bezahlt." },
          { tier: "plump", text: "Die Kommentarfunktion abschalten", f: 220, t: -6, s: 4,
            fb: "Keine Fragen, keine Antworten. Das sagt auch etwas." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.portal1) items.push("Die GmbH hinter „Lindenhain Heute“ gehört zu 100 % einer Tochterfirma von Nordlog.");
      if (run.flags.portal1p) items.push("Die echte Rundschau hat Unterlassung verlangt. Die Kopie musste offline.");
      if (run.flags.byline) items.push("Die „Redaktion“ besteht aus zwei Mitarbeitern der Agentur Hebel.");
      if (run.flags.portal2 || run.flags.portal2p) items.push("Das Lärmgutachten der Initiative stammt von einem anerkannten Büro. Nordlog hat die Ergebnisse intern bestätigt.");
      return checkDay(run, fx, {
        intro: "Die Rundschau recherchiert: Wer betreibt eigentlich „Lindenhain Heute“?",
        who: "kessler",
        praise: "„Nordlog hat einen eigenen Blog. Er ist einseitig – aber er sagt, dass er es ist.“",
        items,
        crowd: "Die Recherche wird zum Stadtgespräch. Vereine, deren Nachrichten auf „Lindenhain Heute“ liefen, fühlen sich benutzt.",
        reply: [
          { text: "Die Finanzierung oben auf der Seite offenlegen", fb: "Spät, aber jetzt kann jeder einordnen, was er liest." },
          { text: "„Auch Zeitungen haben Anzeigenkunden.“", fb: "Ja – und sie kennzeichnen Anzeigen. Ihr nicht." },
          { text: "„Die Rundschau hat Angst vor Konkurrenz!“", fb: "Ein Angriff statt einer Erklärung." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: "kessler", text: run.flags.portal1p ? "Hat gegen die Kopie geklagt und gewonnen. Ein paar Leser glauben trotzdem, die Rundschau sei „gekauft“." : "Erklärt in einer Serie, wie man ein Impressum liest." });
    out.push({ who: "ilse", text: run.flags.portal1 || run.flags.portal1p ? "Hat „Lindenhain Heute“ wegen der Gartennachrichten gelesen. Sie ist enttäuscht." : "Liest weiter die Rundschau – und das Nordlog-Blog, „um zu wissen, was die vorhaben“." });
    out.push({ who: INI, text: run.flags.portal2p ? "Wurde als „gekauft“ bezeichnet. Das Gutachterbüro prüft rechtliche Schritte." : "Diskutiert mit Nordlog über die Lärmschutzwand." });
    return out;
  },
  debrief: {
    what: "Scheinbar unabhängige Nachrichtenseiten sehen aus wie normale Lokalzeitungen oder Portale. In Wahrheit werden sie von einer Firma, Partei oder anderen Interessengruppe betrieben, die das verschweigt.",
    why: "Nachrichtenseiten haben einen Vertrauensvorschuss. Wer dort Vereinsnachrichten und Wetter liest, glaubt auch dem Rest – und merkt nicht, dass bei einem Thema jemand die Richtung vorgibt.",
    signs: [
      "Neue Seiten, die schnell viel Lokalnachrichten bringen.",
      "Ein Impressum mit unbekannter Firma oder ganz ohne Namen.",
      "Artikel ohne Autorennamen, vor allem bei heiklen Themen.",
      "Auffällig einseitige Berichterstattung zu einem bestimmten Thema.",
      "Namen oder Designs, die an bekannte Medien erinnern.",
    ],
    question: "Wer betreibt diese Seite – und was steht drin, wenn ich außerhalb der Seite nach ihr suche?",
  },
  test: [
    { author: "Lindenhain Heute", handle: "@lindenhain_heute", color: "#5A6890",
      text: "Logistikzentrum: Warum die Kritik übertrieben ist. (Kein Autor angegeben, Impressum: LH Medien GmbH, gegründet vor 2 Monaten)",
      verdict: "manip", exp: "Kein Autor, unbekannte junge Firma, einseitiges Thema. Hier lohnt eine Suche, wem die GmbH gehört." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Logistikzentrum: Was das Lärmgutachten sagt – und was Nordlog antwortet. Von Sabine Kessler.",
      verdict: "serios", exp: "Bekannte Zeitung, Autorin genannt, beide Seiten." },
    { author: "Lindenhainer Rundschau Online", handle: "@rundschau_online", color: "#2f6b5f",
      text: "EILMELDUNG: Initiative „Grünes Tor“ manipuliert Unterschriften!",
      verdict: "manip", exp: "Der Name klingt wie die echte Zeitung – ist sie aber nicht. Kopien bekannter Medien sind ein typisches Warnzeichen." },
    { author: "Nordlog – Neues vom Projekt", handle: "@nordlog_blog", color: "#5A6A7A",
      text: "Aus unserer Sicht: Die Lärmschutzwand löst das Problem an den drei Häusern. Hier sind unsere Messungen.",
      verdict: "serios", exp: "Einseitig, aber klar gekennzeichnet. Man weiß, dass die Firma spricht." },
    { author: "Stadtnachrichten Lindenhain", handle: "@stadtnachrichten", color: "#7a6a2f",
      text: "Unabhängig. Überparteilich. Aus Lindenhain. – Heute: Warum die Umgehungsstraße alle Probleme löst. (Impressum: Postfach im Ausland)",
      verdict: "manip", exp: "„Unabhängig“ behaupten kann jeder. Ein Postfach im Ausland für eine Lokalseite ist ein deutliches Warnsignal." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Amtsblatt: Die Unterlagen zum Logistikzentrum liegen ab Montag im Rathaus aus und stehen online. Einwände bis 30. November.",
      verdict: "serios", exp: "Die Stadt als Absender, sachliche Information, Verweis auf Originalunterlagen." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 4: KI-Fälschungen
   ------------------------------------------------------------ */
export const C4K4 = {
  ...BASE, id: "k4-4", n: 4,
  title: "Die Aufnahme",
  technique: "KI-Fälschungen",
  start: { followers: 4800, trust: 60, split: 30 },
  compStart: { a: 5300, b: 4800 },
  growth: { a: [140, 120, 60, 0], b: [60, 60, 100, 0] },
  milestones: [4900, 5100, 5300, 5450],
  starLimits: [5100, 5200, 5290, 5360],
  insight: "Am meisten bringen künstliche Bilder, die als „Symbolbild“ durchgehen. Eine gefälschte Stimme einer echten Person ist eine Grenze – und fliegt auf.",
  scene: [
    { who: "Erzähler", text: "Eine Woche bis zur Entscheidung im Rat. Die Initiative „Grünes Tor“ liegt vorn.", focus: "rathaus" },
    { who: "Erzähler", text: "Mit neuen Programmen lassen sich in Minuten Bilder, Stimmen und Videos erzeugen, die echt wirken.", focus: "funkturm" },
    { who: "Erzähler", text: "Henrik Sand fragt: „Was wäre, wenn …?“", focus: "verlag" },
  ],
  mission: "Die letzte Woche: Dreh die Stimmung, bevor der Rat entscheidet.",
  days: [
    {
      n: 1, title: "Die Bilder",
      intro: "Nordlog braucht Bilder vom künftigen Logistikzentrum. Es gibt die Pläne des Architekten.",
      decisions: [
        {
          q: "Welche Bilder nimmst du?",
          opts: [
            { tier: "fair", text: "Die Visualisierung des Architekten, klar beschriftet: „Entwurf“", f: 60, t: 4, s: -1,
              fb: "Eine große Halle, ein paar Bäume. Ehrlich – und nicht besonders schön." },
            { tier: "subtil", flag: "ai1", text: "Ein KI-Bild: Halle mit Gründach, Kinder im Park davor. Klein unten: „Symbolbild“", f: 240, t: -1, s: 3,
              fb: "Gründach und Park sind nicht geplant. „Symbolbild“ liest kaum jemand – das Bild bleibt im Kopf." },
            { tier: "plump", flag: "ai1p", text: "Ein KI-Foto „aus der Partnerstadt“: ein angeblich identisches Zentrum, umgeben von Blumenwiesen", f: 270, t: -6, s: 4,
              fb: "Es gibt keine Partnerstadt mit diesem Zentrum. Das Foto ist komplett erfunden." },
          ],
        },
        {
          q: "Die Initiative hat ein Video gepostet: Mara Lenz spricht vor ihrem Haus. Was machst du?",
          opts: [
            { tier: "fair", text: "Nichts. Es ist ihr Video, ihre Meinung.", f: 20, t: 2, s: 0,
              fb: "Fair bleibt fair – auch wenn es Unterstützer kostet." },
            { tier: "subtil", flag: "ai2", text: "Einen Ausschnitt verbreiten, in dem sie unsicher wirkt – mit KI leicht verlangsamt", f: 200, t: -2, s: 3,
              fb: "Es sind ihre Worte, aber langsamer abgespielt wirkt sie verwirrt. Das ist schon eine Manipulation." },
            { tier: "plump", flag: "ai2p", text: "Eine KI-Stimme von Mara Lenz erzeugen: „Uns geht es nur um unsere Grundstückspreise.“", f: 260, t: -9, s: 7,
              fb: "Diesen Satz hat sie nie gesagt. Eine gefälschte Aufnahme einer echten Person – das ist eine Grenze, die viele Menschen nicht verzeihen." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Verbreitung",
      intro: "Die Bilder und Aufnahmen verbreiten sich. Einige fragen: „Ist das echt?“",
      decisions: [{
        q: "Wie reagierst du auf die Nachfragen?",
        opts: [
          { tier: "fair", text: "Klarstellen: Was ist Entwurf, was ist KI, was ist echt", f: 70, t: 4, s: -1,
            fb: "Ehrlichkeit über die eigenen Bilder. Die Leute schätzen es." },
          { tier: "subtil", text: "Gar nicht reagieren – die Nachfragen gehen unter", f: 200, t: -1, s: 2,
            fb: "Schweigen hilft dir kurzfristig. Aber die Frage bleibt im Raum." },
          { tier: "plump", text: "„Das ist echt. Wer was anderes sagt, verbreitet Fake News!“", f: 230, t: -6, s: 5,
            fb: "Du drehst den Vorwurf um. Für die Fälschung ist das ein gefährlicher Schutzschild." },
        ],
      }],
    },
    { n: 3, title: "Die Analyse", dynamic: "check" },
    { n: 4, title: "Die Entscheidung", where: "Rathaus", dynamic: "rat" },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.ai1) items.push("Das Bild mit Gründach und Park ist KI-erzeugt. Laut Plänen gibt es weder Gründach noch Park.");
      if (run.flags.ai1p) items.push("Die „Partnerstadt“ mit identischem Zentrum gibt es nicht. Das Foto zeigt typische KI-Fehler: Zäune, die ins Nichts laufen, unlesbare Schilder.");
      if (run.flags.ai2) items.push("Das Video von Mara Lenz wurde verlangsamt. Im Original spricht sie flüssig.");
      if (run.flags.ai2p) items.push("Die Aufnahme von Mara Lenz ist künstlich erzeugt. Sie hat den Satz nie gesagt und erstattet Anzeige.");
      return checkDay(run, fx, {
        intro: "Prof. Jan Okafor, Medienforensiker, untersucht für die Rundschau die Bilder und Aufnahmen der letzten Woche.",
        who: FORENSIK,
        praise: "„Nordlogs Bilder sind als Entwurf gekennzeichnet. So sollte es sein.“",
        items,
        crowd: "Die Analyse wird überall geteilt. Viele sind wütend – auch Leute, die eigentlich für das Logistikzentrum waren.",
        reply: [
          { text: "Alles zurückziehen und sich öffentlich bei Mara Lenz entschuldigen", fb: "Es rettet nicht viel. Aber es ist das Mindeste." },
          { text: "„Symbolbilder sind doch üblich.“", fb: "Gekennzeichnet ja. Als Ersatz für die Wirklichkeit nein." },
          { text: "„Die Analyse ist selbst eine Fälschung!“", fb: "Wenn alles gefälscht sein kann, glaubt man am Ende gar nichts mehr. Das ist der größte Schaden." },
        ],
      });
    },
    rat(run, fx) {
      const leadYou = run.followers >= run.comp.a;
      run.flags.approved = leadYou;
      const text = leadYou
        ? "Der Rat stimmt mit knapper Mehrheit für das Logistikzentrum. Viele Ratsmitglieder sagen, sie hätten die Stimmung in der Stadt berücksichtigt."
        : "Der Rat lehnt das Logistikzentrum vorerst ab und verlangt neue Pläne mit Lärmschutz. Nordlog will es überarbeiten.";
      return {
        intro: "Ratssitzung. Der Saal ist voll.",
        events: [{ who: "news", text }],
        decisions: [{
          q: "Dein Abschlussbericht an Nordlog:",
          opts: [
            { tier: "fair", text: "„Was wirklich überzeugt hat: offene Antworten. Was geschadet hat: alles, was versteckt war.“", f: 0, t: 4, s: -2,
              fb: "Ein ehrlicher Bericht. Henrik Sand liest ihn zweimal." },
            { tier: "subtil", text: "„Die Methode funktioniert. Beim nächsten Mal früher anfangen.“", f: 0, t: -1, s: 2,
              fb: "Eine Lehre, die für Lindenhain nichts Gutes heißt." },
            { tier: "plump", text: "„Mit mehr KI und mehr Profilen hätten wir es locker geschafft.“", f: 0, t: -5, s: 4,
              fb: "Die Spirale dreht sich weiter – bei der nächsten Debatte wird jeder jedem misstrauen." },
          ],
        }],
      };
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: INI, text: run.flags.ai2p ? "Erhält Hassnachrichten wegen eines Satzes, den sie nie gesagt hat. Auch nach der Richtigstellung hören sie nicht ganz auf." : "Hat im Rat gesprochen. Hinterher hat sie Henrik Sand die Hand gegeben." });
    out.push({ who: NORDLOG, text: run.flags.approved ? "Baut. Die Lärmschutzwand kommt, das Gründach nicht." : "Überarbeitet die Pläne. „Nächstes Mal ohne Agentur“, sagt er." });
    out.push({ who: "yilmaz", text: run.flags.ai1 || run.flags.ai1p || run.flags.ai2p ? "Sagt an der Theke: „Ich glaube inzwischen keinem Foto mehr.“ Das meint er nicht als Kompliment." : "Hat das Architektenbild ausgedruckt und neben die Kasse gehängt." });
    return out;
  },
  debrief: {
    what: "KI-Fälschungen sind Bilder, Stimmen oder Videos, die mit künstlicher Intelligenz erzeugt oder verändert wurden und als echt ausgegeben werden. Manche zeigen Dinge, die es nie gab, andere legen echten Menschen Worte in den Mund.",
    why: "Wir glauben, was wir sehen und hören. KI-Werkzeuge machen Fälschungen schnell und billig. Und selbst wenn eine Fälschung aufgedeckt wird, bleibt oft ein Zweifel – auch an echten Aufnahmen.",
    signs: [
      "Bilder ohne Quelle, Ort und Datum – besonders, wenn sie sehr perfekt oder sehr empörend wirken.",
      "Kleine Fehler: unlesbare Schrift, verformte Hände, Linien, die ins Nichts laufen.",
      "Aufnahmen, in denen jemand etwas völlig Untypisches sagt.",
      "Die Person selbst oder seriöse Medien bestätigen die Aufnahme nicht.",
    ],
    question: "Woher stammt diese Aufnahme – und bestätigt sie jemand, der dabei war?",
  },
  // Kampagnen-Abschlusstest
  test: [
    { author: "Lindenhain Heute", handle: "@lindenhain_heute", color: "#5A6890",
      text: "Lindenhain spricht sich klar aus! (Unter dem Beitrag: 60 Kommentare von Profilen, die alle diese Woche erstellt wurden)",
      choices: C4_TECH, answer: "Fake-Accounts", exp: "Viele neue Profile, eine Meinung, eine Woche. Eine Scheinmehrheit." },
    { author: "Bürger für Fortschritt", handle: "@buerger_fortschritt", color: "#5A6A7A",
      text: "Wir sind einfache Bürger und fordern den Ausbau der Umgehungsstraße! (Finanziert von: Straßenbau Nord AG)",
      choices: C4_TECH, answer: "Vorgetäuschte Bürgerbewegung", exp: "„Einfache Bürger“, bezahlt von einer Baufirma." },
    { author: "Lindenhainer Abendblatt", handle: "@abendblatt_lh", color: "#2f6b5f",
      text: "Exklusiv: Die Wahrheit über die Initiative! (Seite seit 3 Wochen online, kein Autor, Impressum: Briefkastenfirma)",
      choices: C4_TECH, answer: "Scheinbar unabhängige Nachrichtenseiten", exp: "Sieht aus wie eine Zeitung, ist aber eine junge Seite ohne erkennbare Macher." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Unglaublich! Hier sagt die Bürgermeisterin, was sie wirklich denkt 🎧 (Audio, 12 Sekunden, keine Quelle)",
      choices: C4_TECH, answer: "KI-Fälschungen", exp: "Eine kurze Tonaufnahme ohne Quelle, in der jemand etwas Untypisches sagt – typisch für eine gefälschte Stimme." },
    { author: "Initiative „Grünes Tor“", handle: "@gruenes_tor", color: "#3E8A5A",
      text: "Unser Treffen am Dienstag: 60 Leute, hier die Fotos. Wer uns unterstützen will: Spendenkonto und Kassenbericht auf der Website.",
      choices: C4_TECH, answer: "Seriös", exp: "Erkennbare Gruppe, offene Finanzen, echte Treffen." },
    { author: "Stadtnachrichten Lindenhain", handle: "@stadtnachrichten", color: "#7a6a2f",
      text: "So schön wird das neue Logistikzentrum! (Bild: Halle mit Gründach im Grünen, unten klein: „Symbolbild, KI-generiert“)",
      choices: C4_TECH, answer: "KI-Fälschungen", exp: "Das Bild zeigt nicht die Planung. Der kleine Hinweis ändert nichts am Eindruck." },
  ],
};
