// Inhalte – alle Orte, Personen, Accounts und Meldungen sind frei erfunden.

export const CAMPAIGNS = [
  { n: 1, title: "Der Account", when: "Frühjahr", place: "cafe", teaser: "Du baust einen Account auf und jagst nach Reichweite.", chapters: 5 },
  { n: 2, title: "Die Kandidatur", when: "Zwei Jahre später", place: "rathaus", chapters: 5 },
  { n: 3, title: "Die Deutungshoheit", when: "Ein Jahr später", place: "verlag", chapters: 5 },
  { n: 4, title: "Der unsichtbare Einfluss", when: "Im Herbst darauf", place: "funkturm", chapters: 5 },
  { n: "Bilanz", title: "Was aus Lindenhain wurde", when: "Am selben Abend", bilanz: true },
  { n: 5, title: "Die Verteidigung", when: "Ein neuer Morgen", place: "buergerhaus", chapters: 5 },
];

export const PEOPLE = {
  ilse: { name: "Ilse", age: 71, role: "Gartenverein" },
  deniz: { name: "Deniz", age: 24, role: "Skatepark-Initiative" },
  yilmaz: { name: "Herr Yılmaz", role: "Bäckerei am Markt" },
  kessler: { name: "Frau Kessler", role: "Lindenhainer Rundschau" },
};

// Beziehungen im Dorf: reißen, wenn der Spaltungsindex eine Schwelle überschreitet
export const TIES = [
  { a: "ilse", b: "deniz", label: "Nachbarn", breaksAt: 25, broken: "Grüßen sich nicht mehr" },
  { a: "ilse", b: "yilmaz", label: "Stammkundin", breaksAt: 40, broken: "Kauft jetzt woanders" },
  { a: "deniz", b: "yilmaz", label: "Aushilfe am Samstag", breaksAt: 60, broken: "Hat gekündigt" },
];

export const START = { followers: 120, trust: 60, split: 10 };

export const CHAPTER1 = {
  id: "k1-1",
  campaign: 1,
  title: "Der erste Beitrag",
  technique: "Emotionalisierung",
  scene: [
    { who: "Erzähler", text: "Lindenhain, im Frühjahr. Eine Kleinstadt wie viele andere." , focus: null },
    { who: "Erzähler", text: "Auf der letzten freien Fläche soll etwas Neues entstehen: ein Skatepark oder ein Seniorengarten.", focus: "lot" },
    { who: "Erzähler", text: "Im Herbst entscheiden die Bürger. Heute Abend war im Bürgerhaus der erste Infoabend.", focus: "buergerhaus" },
    { who: "Erzähler", text: "Dabei fiel ein Blumenkübel um. Deniz hat sich entschuldigt und mit Ilse zusammen aufgeräumt.", focus: "buergerhaus" },
    { who: "Erzähler", text: "Und du? Du hast gerade einen Account gestartet: Lindenhain Aktuell. Noch kennt dich kaum jemand.", focus: "cafe" },
  ],
  mission: "Mach aus dem Infoabend deinen ersten Beitrag – und sammle Follower.",
  decisions: [
    {
      q: "Wähle eine Überschrift.",
      opts: [
        { text: "Infoabend zur Freifläche: rund 80 Gäste, viele Fragen", f: 30, t: 5, s: 0, fb: "Sachlich und korrekt. Nur interessiert es kaum jemanden." },
        { text: "Kübel umgestoßen beim Infoabend – Skater hilft beim Aufräumen", f: 70, t: 5, s: 0, fb: "Ehrlich und mit einem kleinen Aufhänger. Solide, aber kein Aufreger." },
        { text: "SCHOCK beim Infoabend: Skater verwüsten Seniorengarten!", f: 480, t: -8, s: 12, manip: true, fb: "Volltreffer. Aus einem Missgeschick wird ein Skandal. Wut verbreitet sich schneller als Fakten." },
      ],
    },
    {
      q: "Welches Foto nimmst du?",
      photo: true,
      opts: [
        { img: "together", text: "Deniz und Ilse räumen gemeinsam auf", f: 20, t: 5, s: -3, fb: "Zeigt, was wirklich passiert ist. Freundlich – und für dein Ziel zu harmlos." },
        { img: "pot", text: "Nahaufnahme: zerbrochener Kübel, Erde auf dem Boden", f: 320, t: -4, s: 8, manip: true, fb: "Das Bild ist echt, aber der Ausschnitt erzählt nur den dramatischen Teil. Gefühl schlägt Zusammenhang." },
        { img: null, text: "Kein Foto", f: 0, t: 0, s: 0, fb: "Ohne Bild bleibt der Beitrag blass." },
      ],
    },
    {
      q: "Frau Kessler von der Rundschau kommentiert deinen Beitrag. Wie reagierst du?",
      comment: { who: "kessler", text: "Zur Einordnung: Laut Veranstalter war es ein Versehen. Der junge Mann hat sich entschuldigt und den Kübel ersetzt." },
      opts: [
        { text: "Danke, ich ergänze das im Beitrag.", f: -60, t: 15, s: -8, fb: "Fair. Ein paar Follower springen ab, aber deine Glaubwürdigkeit steigt deutlich." },
        { text: "Kommentar ignorieren", f: 0, t: -6, s: 2, fb: "Schweigen wirkt, als hättest du etwas zu verbergen. Die Stimmung bleibt aufgeheizt." },
        { text: "„Typisch, die Presse redet es wieder klein. Wir wissen, was wir gesehen haben.“", f: 380, t: -12, s: 10, manip: true, fb: "Die Wut richtet sich jetzt auch gegen die Zeitung. Deine Follower halten zu dir – alle anderen glauben dir weniger." },
      ],
    },
  ],
  comments: {
    // erscheinen in der Reaktion abhängig vom Spaltungsindex
    high: [
      { who: "@wutbuerger_lh", text: "Unfassbar! Diese Skater machen alles kaputt!" },
      { who: "Deniz", text: "Ich hab mich doch entschuldigt und den Kübel bezahlt?!" },
      { who: "Ilse", text: "Ich war dabei. Es war ein Versehen. Jetzt schauen mich alle so an." },
    ],
    low: [
      { who: "Herr Yılmaz", text: "Gut, dass ihr aufgeräumt habt. Bei mir gibt’s morgen Kuchen für beide!" },
      { who: "Ilse", text: "Halb so wild. Der Junge war sehr höflich." },
    ],
  },
  debrief: {
    what: "Eine Nachricht wird so formuliert, dass sie starke Gefühle wie Wut, Angst oder Empörung auslöst. Das Nachdenken rückt in den Hintergrund.",
    why: "Beiträge mit starken Gefühlen werden deutlich häufiger geteilt. Wer wütend ist, prüft seltener, ob etwas stimmt.",
    signs: [
      "Großbuchstaben, Ausrufezeichen, Wörter wie „Schock“ oder „Skandal“",
      "Dramatische Bilder ohne den Zusammenhang drumherum",
      "Wut auf Gruppen oder „die Presse“ statt Fakten und Gründe",
    ],
    question: "Was genau ist passiert – und was davon ist nur Gefühl?",
  },
  test: [
    { author: "Bürgerstimme LH", handle: "@buergerstimme_lh", color: "#8a5a44",
      text: "UNFASSBAR!!! Die Stadt lässt unsere Kinder im Winter frieren! 😢 Teilt das, bevor es wieder alle vergessen!",
      verdict: "manip", exp: "Kein einziger Fakt, dafür Großbuchstaben, Kinder als Opfer und ein Aufruf zum Teilen." },
    { author: "Kino am Markt", handle: "@kino_am_markt", color: "#2f6b5f",
      text: "Schweren Herzens: Unser Kino schließt Ende März. Grund sind gestiegene Mietkosten. Am 28. März feiern wir mit euch Abschied.",
      verdict: "serios", exp: "Ein trauriges Thema, aber sachlich berichtet: Grund, Datum, Absender. Gefühl allein ist noch keine Manipulation." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#6b4c7a",
      text: "Die neuen Müllgebühren sind ein Schlag ins Gesicht für jeden, der hart arbeitet. Wie viel sollen wir eigentlich noch ertragen?!",
      verdict: "manip", exp: "Starke Bilder („Schlag ins Gesicht“), aber keine Zahl und kein Vergleich. Das Gefühl ersetzt die Information." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Die Grundschule Am Mühlbach bleibt wegen eines Heizungsdefekts bis Freitag geschlossen. Eine Notbetreuung ist im Gemeindehaus eingerichtet.",
      verdict: "serios", exp: "Klare Fakten: Ort, Zeitraum, Grund und eine Lösung. Keine Wertung." },
  ],
  epilogue: {
    high: "Am Abend geht Ilse einen Umweg, um nicht an Deniz vorbeizumüssen. Deniz hat seinen Kommentar wieder gelöscht. Keiner von beiden hat etwas falsch gemacht.",
    mid: "Am Abend nicken sich Ilse und Deniz beim Bäcker kurz zu. Herzlich ist es nicht mehr. Ein paar Leute tuscheln.",
    low: "Am Abend lachen Ilse und Deniz beim Bäcker über den Kübel. Dein Beitrag war kein Hit – aber er war fair.",
  },
};
