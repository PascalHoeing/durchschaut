// Kampagne 3: Die Deutungshoheit – Zahlen, Bilder, Worte.
// Alle Orte, Personen, Zahlen und Aussagen sind frei erfunden.
import { checkDay, person } from "./common.js";

const KERN = person("Olaf Kern · Verkehrsplanung", "OK", "#4E7A9E");
const STAT = person("Statistikstelle der Stadt", "ST", "#2f6b5f");
const ENGEL = person("Rosa Engel · Imkerin", "RE", "#B08A3A");
const WERKE = person("Dr. Aylin Kaya · Stadtwerke", "AK", "#3E8A8A");
const REHM = person("Tobias Rehm", "TR", "#9E6A3E");
const PRESSE = person("Pressestelle der Stadt", "PS", "#4E7A9E");
const GERDES = person("Rolf Gerdes · „Wasserwahrheit“", "RG", "#8A5A5A");

const BASE = {
  campaign: 3,
  rivals: {
    a: { name: "Lindenhain Live", initials: "LL", color: "#8a5a44", desc: "Größte Seite der Stadt, schnell und laut" },
    b: { name: "Lindenhainer Rundschau", initials: "RS", color: "#2f6b5f", desc: "Gründlich, mit Datenteam" },
  },
  you: { name: "Lindenhain Blick", initials: "LB" },
  mainLabel: "Leser",
  mainHint: "so viele lesen dein Portal pro Woche",
  weekTitle: "Die Reichweite",
  verdicts: [
    "Kaum jemand liest mit.",
    "Ein kleines Publikum.",
    "Ordentlich – man zitiert dich.",
    "Stark. Deine Zahlen werden zur Gesprächsgrundlage.",
    "Herausragend. Was du schreibst, gilt in Lindenhain als Fakt.",
  ],
  focusables: ["verlag", "rathaus", "funkturm", "cafe", "lot"],
};

const C3_TECH = ["Rosinenpicken", "Irreführende Diagramme", "Framing", "„Ich stelle ja nur Fragen“", "Falsche Ausgewogenheit", "Seriös"];
const MONTHS = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
const BUS = [8.1, 7.4, 8.9, 9.6, 10.2, 10.8, 9.1, 8.0, 10.9, 11.3, 9.8, 9.5];

/* ------------------------------------------------------------
   Kapitel 1: Rosinenpicken
   ------------------------------------------------------------ */
export const C3K1 = {
  ...BASE, id: "k3-1", n: 1,
  title: "Die Busbilanz",
  technique: "Rosinenpicken",
  start: { followers: 3000, trust: 60, split: 20 },
  compStart: { a: 4600, b: 4200 },
  growth: { a: [120, 120, 40, 100], b: [60, 60, 120, 60] },
  milestones: [3200, 3400, 3600, 3800],
  starLimits: [3400, 3550, 3660, 3760],
  insight: "Am meisten bringen echte Zahlen aus dem passenden Ausschnitt. Niemand kann dir einen falschen Wert nachweisen – nur einen fehlenden.",
  scene: [
    { who: "Erzähler", text: "Ein Jahr nach der Wahl. Diesmal spielst du die Chefredaktion von „Lindenhain Blick“, einem neuen Nachrichtenportal.", focus: "verlag" },
    { who: "Erzähler", text: "Dein Ziel: mehr Leser als Lindenhain Live und die Rundschau. Dein Werkzeug: Zahlen, Grafiken, Worte.", focus: "verlag" },
    { who: "Erzähler", text: "Die Stadt legt ihren ersten Jahresbericht zur neuen Buslinie vor. Zwölf Monate, viele Zahlen.", focus: "rathaus" },
    { who: "Erzähler", text: "Wer die Zahlen erklärt, bestimmt, was sie bedeuten.", focus: "cafe" },
  ],
  mission: "Vier Tage, ein Jahresbericht: Hol mehr Leser als die Konkurrenz.",
  days: [
    {
      n: 1, title: "Der Jahresbericht",
      intro: "Die neue Buslinie hat im ersten Jahr 18 % mehr Fahrgäste als die alte. Im Sommer gab es eine Delle – Ferien.",
      decisions: [
        {
          q: "Welche Grafik nimmst du für den Aufmacher?",
          opts: [
            { tier: "fair", text: "Das ganze Jahr: „Mehr Fahrgäste, Sommerdelle in den Ferien“",
              chart: { type: "line", title: "Fahrgäste pro Monat (Tsd.)", labels: MONTHS.map(m => m[0]), values: BUS, yMin: 0, yMax: 12 },
              f: 60, t: 4, s: -1, fb: "Man sieht den Trend und die Delle. Kein Drama, keine Klicks." },
            { tier: "subtil", flag: "cherry1", text: "Nur Juni bis August: „Fahrgäste: minus 26 %“",
              chart: { type: "line", title: "Fahrgäste Juni–August (Tsd.)", labels: ["Jun", "Jul", "Aug"], values: [10.8, 9.1, 8.0], yMin: 0, yMax: 12 },
              f: 230, t: -1, s: 3, fb: "Jede Zahl stimmt. Aber die drei Ferienmonate stehen jetzt für das ganze Jahr." },
            { tier: "plump", flag: "cherry1p", text: "„Buslinie floppt!“ – Juni gegen August als Balken",
              chart: { type: "bar", title: "Buslinie: Absturz!", labels: ["Juni", "August"], values: [10.8, 8.0], yMin: 0, yMax: 12, highlight: 1 },
              f: 270, t: -6, s: 5, fb: "Zwei Monate gegen ein ganzes Jahr mit 18 % Plus. „Flop“ ist eine Behauptung, keine Zahl." },
          ],
        },
        {
          q: "Aus der Fahrgastbefragung (400 Antworten): 71 % sind zufrieden, die häufigste Kritik betrifft den Abendtakt. Wen zitierst du?",
          opts: [
            { tier: "fair", text: "„71 % zufrieden – am meisten gewünscht: Busse nach 20 Uhr“", f: 50, t: 3, s: 0,
              fb: "Das Ergebnis und die Kritik in einem Satz." },
            { tier: "subtil", flag: "cherry2", text: "Nur eine Stimme: „Abends fährt einfach nichts mehr“, sagt eine Fahrgästin", f: 200, t: -1, s: 2,
              fb: "Die Stimme ist echt. Ohne die 71 % klingt sie wie die Meinung aller." },
            { tier: "plump", text: "„Fahrgäste stinksauer“ – mit den drei wütendsten Kommentaren", f: 240, t: -5, s: 4,
              fb: "Drei von 400 Antworten als Stimmung der Stadt. Wer den Bericht liest, sieht etwas anderes." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Kosten",
      intro: "Die Linie kostet die Stadt 420.000 € im Jahr, gut 3,50 € Zuschuss pro Fahrt. Die alte Linie kostete weniger, hatte aber so wenige Fahrgäste, dass es pro Fahrt 4,10 € waren.",
      decisions: [{
        q: "Welche Zahl stellst du in den Vordergrund?",
        opts: [
          { tier: "fair", text: "„Pro Fahrt günstiger als die alte Linie: 3,50 € statt 4,10 € Zuschuss“", f: 60, t: 4, s: -1,
            fb: "Beide Zahlen, der faire Vergleich. Wenig Aufregung." },
          { tier: "subtil", flag: "cherry3", text: "„Jede Busfahrt kostet die Stadt 3,50 €“", f: 220, t: -1, s: 3,
            fb: "Die Zahl stimmt. Dass es vorher mehr war, lässt du weg – und alle denken, das Geld sei neu verschwendet." },
          { tier: "plump", flag: "cherry3p", text: "„Steuergeldgrab Bus: 420.000 € für leere Busse“", f: 260, t: -6, s: 5,
            fb: "Die Busse sind voller als je zuvor. „Leer“ ist erfunden." },
        ],
      }],
    },
    { n: 3, title: "Das ganze Bild", dynamic: "check" },
    {
      n: 4, title: "Der Rat entscheidet", where: "Rathaus",
      intro: "Der Rat beschließt: Ab Herbst fahren die Busse bis 22 Uhr.",
      decisions: [{
        q: "Deine Überschrift:",
        opts: [
          { tier: "fair", text: "„Abendbus kommt – nach einem Jahr mit 18 % mehr Fahrgästen“", f: 90, t: 4, s: -2,
            fb: "Die Entscheidung und ihr Grund. Ein sauberer Abschluss." },
          { tier: "subtil", text: "„Trotz Sommerflaute: Rat setzt weiter auf den Bus“", f: 210, t: -1, s: 3,
            fb: "Die „Sommerflaute“ ist dein Rosinenpicken von Tag 1 – jetzt als Fakt in der Überschrift." },
          { tier: "plump", text: "„Rat wirft noch mehr Geld in den Pleitebus“", f: 240, t: -5, s: 5,
            fb: "Pleite ist hier nichts. Aber die Überschrift bleibt hängen." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.cherry1 || run.flags.cherry1p) items.push("Über das ganze Jahr hatte die Linie 18 % mehr Fahrgäste. Die Delle im Sommer liegt an den Schulferien.");
      if (run.flags.cherry2) items.push("71 % der Befragten sind zufrieden. Die zitierte Kritik am Abendtakt teilen 22 %.");
      if (run.flags.cherry3 || run.flags.cherry3p) items.push("Pro Fahrt zahlt die Stadt heute weniger Zuschuss als bei der alten Linie.");
      return checkDay(run, fx, {
        intro: "Verkehrsplaner Olaf Kern stellt den ganzen Bericht in der Rundschau vor – Monat für Monat.",
        who: KERN,
        praise: "„Lindenhain Blick hat unseren Bericht so wiedergegeben, wie er ist. Danke.“",
        items,
        crowd: "Leser vergleichen deine Grafiken mit dem Bericht. Unter deinen Beiträgen steht: „Da fehlt ja die Hälfte.“",
        reply: [
          { text: "Die vollständige Grafik nachreichen und schreiben, was fehlte", fb: "Ein bisschen peinlich, aber ehrlich. Die Rundschau zitiert dich dafür." },
          { text: "„Wir haben nur Ausschnitte gezeigt, alle Zahlen stimmen.“", fb: "Stimmt. Aber du hast die Ausschnitte so gewählt, dass sie ein falsches Bild ergeben." },
          { text: "„Die Stadt schönt ihre Bilanz!“", fb: "Die Stadt hat alle Zahlen veröffentlicht – auch die schlechten. Du hast sie nur weggelassen." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: KERN, text: run.flags.cherry1 || run.flags.cherry1p ? "Wird im Rat gefragt, warum der Bus „im Sommer eingebrochen“ sei. Er erklärt zum fünften Mal die Schulferien." : "Plant mit den Zahlen den Abendtakt." });
    out.push({ who: "moeller", text: "Fährt mit den Kindern jetzt Bus zur Schule. Sie liest die Bilanz im Bus – den ganzen Bericht." });
    out.push({ who: "kessler", text: "Startet die Rubrik „Ganze Zahlen“: Jede Grafik der Rundschau zeigt den ganzen Zeitraum." });
    return out;
  },
  debrief: {
    what: "Rosinenpicken heißt: Aus vielen Daten nur die herausgreifen, die zur gewünschten Aussage passen – und den Rest weglassen.",
    why: "Jede einzelne Zahl stimmt, deshalb wirkt das Ergebnis glaubwürdig. Was fehlt, sieht man nicht – und wer nicht nachschaut, hält den Ausschnitt für das Ganze.",
    signs: [
      "Auffällig kurze oder ungewöhnliche Zeiträume: „seit Juli“, „im August“.",
      "Einzelne Stimmen statt Ergebnissen: „Eine Fahrgästin sagt …“.",
      "Zahlen ohne Vergleich: Ist 3,50 € viel oder wenig?",
      "Die Originalquelle wird nicht verlinkt.",
    ],
    question: "Was zeigen die Daten, die hier nicht gezeigt werden?",
  },
  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Freibad-Besucher seit August halbiert! 📉 Ist das das Aus?",
      verdict: "manip", exp: "Im August beginnt der Herbst. Über die ganze Saison gab es so viele Besucher wie nie." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Freibad-Saison: 48.000 Besuche, 6 % mehr als im Vorjahr. Stärkster Monat: Juli. Alle Monatszahlen im Bericht.",
      verdict: "serios", exp: "Die ganze Saison, ein Vergleich, die Monatszahlen zum Nachlesen." },
    { author: "Gesund in Lindenhain", handle: "@gesund_lh", color: "#7a6a2f",
      text: "„Seit ich das Pulver nehme, bin ich nie mehr krank!“ – Erika, 54. Überzeug dich selbst!",
      verdict: "manip", exp: "Eine ausgewählte Stimme. Wie viele es ohne Erfolg genommen haben, erfährt man nicht." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Mieten in Lindenhain: in zehn Jahren um 22 % gestiegen, zuletzt langsamer. Die Grafik zeigt alle Jahre.",
      verdict: "serios", exp: "Langer Zeitraum, ganze Entwicklung, Einordnung." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Der heißeste 12. Mai seit Messbeginn war 1956. Von wegen, es wird wärmer!",
      verdict: "manip", exp: "Ein einzelner Tag sagt nichts über eine Entwicklung über Jahrzehnte. Ein Wert wird herausgepickt." },
    { author: "Stadtwerke Lindenhain", handle: "@stadtwerke_lh", color: "#2f6b5f",
      text: "Unsere Kundenumfrage: 64 % zufrieden, 21 % teils, 15 % unzufrieden. Häufigste Kritik: lange Wartezeiten am Telefon.",
      verdict: "serios", exp: "Alle Antworten, inklusive Kritik. So sieht eine ehrliche Auswertung aus." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 2: Irreführende Diagramme
   ------------------------------------------------------------ */
export const C3K2 = {
  ...BASE, id: "k3-2", n: 2,
  title: "Die Unfallgrafik",
  technique: "Irreführende Diagramme",
  start: { followers: 3600, trust: 60, split: 22 },
  compStart: { a: 4900, b: 4500 },
  growth: { a: [130, 110, 40, 100], b: [60, 60, 120, 60] },
  milestones: [3800, 4000, 4200, 4400],
  starLimits: [4000, 4150, 4280, 4380],
  insight: "Am meisten bringt eine abgeschnittene Achse mit echten Zahlen. Wer Zahlen erfindet oder Umfragen fälscht, wird erwischt.",
  scene: [
    { who: "Erzähler", text: "Rehms Idee wurde doch umgesetzt: Die Marktstraße ist samstags für Autos gesperrt, als Versuch.", focus: "cafe" },
    { who: "Erzähler", text: "Jetzt veröffentlicht die Polizei die Unfallzahlen. In der Marktstraße: sechs Unfälle im Jahr, vorher vier.", focus: "rathaus" },
    { who: "Erzähler", text: "Davor waren es fünf, und davor sieben. Kleine Zahlen – große Wirkung, je nachdem, wie man sie zeigt.", focus: "verlag" },
  ],
  mission: "Vier Tage, eine Unfallstatistik: Mach die beste Grafik der Stadt – die mit den meisten Lesern.",
  days: [
    {
      n: 1, title: "Die Zahlen",
      intro: "Unfälle in der Marktstraße: 2021: 7, 2022: 5, 2023: 4, 2024: 6. Keiner davon mit Schwerverletzten.",
      decisions: [
        {
          q: "Welche Grafik baust du?",
          opts: [
            { tier: "fair", text: "Alle vier Jahre, Achse ab null",
              chart: { type: "bar", title: "Unfälle Marktstraße", labels: ["2021", "2022", "2023", "2024"], values: [7, 5, 4, 6], yMin: 0, yMax: 8 },
              f: 60, t: 4, s: -1, fb: "Man sieht: Es schwankt, auf niedrigem Niveau. Langweilig – und richtig." },
            { tier: "subtil", flag: "axis", text: "Nur 2023 und 2024, Achse ab 3",
              chart: { type: "bar", title: "Unfälle Marktstraße", labels: ["2023", "2024"], values: [4, 6], yMin: 3, yMax: 6.5, highlight: 1 },
              f: 240, t: -1, s: 3, fb: "Die Zahlen stimmen. Durch die abgeschnittene Achse sieht der zweite Balken dreimal so hoch aus." },
            { tier: "plump", flag: "axisp", text: "Linie mit Achse ab 3,5 und Titel „Unfall-Explosion!“",
              chart: { type: "line", title: "Unfall-Explosion!", labels: ["2023", "2024"], values: [4, 6], yMin: 3.5, yMax: 6.2, highlight: 1 },
              f: 280, t: -6, s: 5, fb: "Zwei Punkte, eine steile Linie, ein dramatischer Titel. Zwei Unfälle mehr wirken wie eine Katastrophe." },
          ],
        },
        {
          q: "Wie beschreibst du die Veränderung im Text?",
          opts: [
            { tier: "fair", text: "„Zwei Unfälle mehr als im Vorjahr, einer weniger als 2021“", f: 40, t: 3, s: 0,
              fb: "Absolute Zahlen mit Vergleich. Jeder versteht, wie groß die Veränderung ist." },
            { tier: "subtil", flag: "percent", text: "„Unfälle in der Marktstraße: plus 50 %“", f: 210, t: -1, s: 3,
              fb: "Von 4 auf 6 sind wirklich 50 %. Bei so kleinen Zahlen klingt die Prozentangabe aber viel dramatischer als die Wirklichkeit." },
            { tier: "plump", text: "„Samstagsversuch lebensgefährlich – Unfälle explodieren“", f: 250, t: -6, s: 6,
              fb: "Kein Unfall mit Schwerverletzten, keiner an einem Samstag. „Lebensgefährlich“ ist frei erfunden." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Leserumfrage",
      intro: "Auf deinem Portal läuft eine Umfrage: „Soll der Samstagsversuch enden?“ 300 Klicks, 78 % Ja. Eine repräsentative Umfrage der Rundschau ergab 48 % Ja.",
      decisions: [{
        q: "Wie zeigst du dein Ergebnis?",
        opts: [
          { tier: "fair", text: "Beide Umfragen nebeneinander, mit dem Hinweis: Unsere ist nicht repräsentativ",
            chart: { type: "bar", title: "„Versuch beenden?“ – Ja-Anteil", labels: ["Unsere Leser (300)", "Rundschau (1.000)"], values: [78, 48], yMin: 0, yMax: 100, unit: " %" },
            f: 50, t: 4, s: -1, fb: "Transparent. Und es zeigt, wie anders deine Leser sind als die Stadt." },
          { tier: "subtil", flag: "poll", text: "Nur deine Zahl, groß: „78 % wollen das Ende des Versuchs“",
            chart: { type: "bar", title: "Samstagsversuch beenden?", labels: ["Ja", "Nein"], values: [78, 22], yMin: 0, yMax: 100, unit: " %", highlight: 0 },
            f: 220, t: -1, s: 4, fb: "„78 %“ von wem? Dass nur deine eigenen Leser abgestimmt haben, steht im Kleingedruckten." },
          { tier: "plump", flag: "pollp", text: "„Lindenhain hat entschieden: Versuch beenden!“", f: 250, t: -6, s: 6,
            fb: "Aus 300 Klicks auf deiner Seite wird die Meinung der ganzen Stadt." },
        ],
      }],
    },
    { n: 3, title: "Nachgerechnet", dynamic: "check" },
    {
      n: 4, title: "Die Verlängerung",
      intro: "Der Rat verlängert den Samstagsversuch um ein Jahr – mit Tempo 20 für Lieferverkehr.",
      decisions: [{
        q: "Deine Grafik zum Abschluss:",
        opts: [
          { tier: "fair", text: "Unfälle der letzten zehn Jahre – mit Markierung, wann der Versuch begann",
            chart: { type: "line", title: "Unfälle Marktstraße, 10 Jahre", labels: ["15", "16", "17", "18", "19", "20", "21", "22", "23", "24"], values: [8, 6, 7, 9, 6, 5, 7, 5, 4, 6], yMin: 0, yMax: 10, highlight: 9 },
            f: 90, t: 4, s: -2, fb: "Der lange Blick zeigt: Die Zahl schwankt seit Jahren zwischen 4 und 9." },
          { tier: "subtil", text: "„Trotz steigender Unfallzahlen: Rat verlängert Versuch“", f: 210, t: -1, s: 3,
            fb: "„Steigend“ stimmt nur, wenn man zwei Jahre vergleicht." },
          { tier: "plump", text: "Die „Explosions“-Grafik noch einmal, jetzt rot", f: 230, t: -5, s: 5,
            fb: "Die gleiche Täuschung in kräftigerer Farbe." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.axis || run.flags.axisp) items.push("Die Grafik beginnt nicht bei null. Zwei Unfälle mehr sehen dadurch aus wie das Dreifache.");
      if (run.flags.percent) items.push("„Plus 50 %“ heißt hier: zwei Unfälle mehr. 2021 waren es sieben.");
      if (run.flags.poll || run.flags.pollp) items.push("Die 78 % stammen aus einer Klick-Umfrage unter den eigenen Lesern. Repräsentativ waren 48 %.");
      return checkDay(run, fx, {
        intro: "Die Statistikstelle der Stadt veröffentlicht: „So liest man unsere Unfallzahlen richtig“ – mit Beispielen aus den Medien.",
        who: STAT,
        praise: "„Ein gutes Beispiel liefert Lindenhain Blick: Achse ab null, alle Jahre, absolute Zahlen.“",
        items,
        crowd: "Eine Mathelehrerin nutzt deine Grafik im Unterricht – als Beispiel dafür, wie man nicht zeichnet.",
        reply: [
          { text: "Die Grafik neu zeichnen, Achse ab null, und den Fehler erklären", fb: "Eine Korrektur mit Lerneffekt. Viele teilen den Vorher-nachher-Vergleich." },
          { text: "„Achsen kann jeder wählen, wie er will.“", fb: "Technisch ja. Aber du hast die gewählt, die am meisten übertreibt." },
          { text: "„Die Stadt will die Unfälle kleinreden!“", fb: "Die Stadt hat die Zahlen veröffentlicht. Du hast sie aufgeblasen." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: REHM, text: run.flags.axis || run.flags.axisp ? "Wird wegen der „Unfall-Explosion“ beschimpft. Dabei hat er nur den Versuch vorgeschlagen." : "Wertet den Versuch nüchtern aus und will Tempo 20 für Lieferwagen." });
    out.push({ who: STAT, text: "Hat eine Seite gestartet: „Unsere Zahlen richtig lesen“. Sie wird in Schulen benutzt." });
    out.push({ who: "yilmaz", text: run.flags.pollp ? "Glaubt seit deiner Umfrage, die halbe Stadt sei gegen den Versuch. Seine Kundschaft sagt etwas anderes." : "Verkauft samstags doppelt so viel Kaffee, seit die Straße frei ist." });
    return out;
  },
  debrief: {
    what: "Irreführende Diagramme zeigen echte Zahlen so, dass ein falscher Eindruck entsteht: abgeschnittene Achsen, ausgewählte Zeiträume, Prozente bei kleinen Zahlen, nicht repräsentative Umfragen.",
    why: "Grafiken wirken objektiv und werden schnell erfasst. Kaum jemand schaut auf die Achsenbeschriftung – der Eindruck entsteht in einer Sekunde.",
    signs: [
      "Die y-Achse beginnt nicht bei null.",
      "Nur zwei Zeitpunkte statt einer Entwicklung.",
      "Prozentangaben bei sehr kleinen Zahlen: „plus 50 %“ bei 4 auf 6.",
      "Umfragen ohne Angabe, wer gefragt wurde und wie viele.",
    ],
    question: "Wo beginnt die Achse, welcher Zeitraum fehlt – und wie groß sind die Zahlen wirklich?",
  },
  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Grundsteuer EXPLODIERT! 📈 (Grafik: Achse von 290 bis 300 €, Anstieg von 292 auf 298 €)",
      verdict: "manip", exp: "Sechs Euro im Jahr, aufgeblasen durch eine Achse, die bei 290 beginnt." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Die Grundsteuer steigt im Schnitt um 6 € pro Jahr (von 292 auf 298 €). Die Grafik zeigt die letzten zehn Jahre, Achse ab null.",
      verdict: "serios", exp: "Absolute Zahl, langer Zeitraum, ehrliche Achse." },
    { author: "Gesund in Lindenhain", handle: "@gesund_lh", color: "#7a6a2f",
      text: "Studie: Wer Kaffee trinkt, hat ein doppelt so hohes Risiko für Krankheit X! 😱",
      verdict: "manip", exp: "Doppelt so hoch heißt hier: von 1 in 100.000 auf 2 in 100.000. Relative Angaben ohne absolute Zahlen übertreiben." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Repräsentative Umfrage (1.000 Befragte, Fehlerbereich ±3 %): 48 % für das Ende des Samstagsversuchs, 44 % dagegen.",
      verdict: "serios", exp: "Wer gefragt wurde, wie viele, wie genau. Und: ein knappes Ergebnis bleibt knapp." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Unsere Umfrage zeigt: 91 % der Lindenhainer sind gegen die neuen Parkgebühren!",
      verdict: "manip", exp: "Wer hat abgestimmt? Bei Klick-Umfragen machen vor allem die mit, die sich ärgern." },
    { author: "Stadtwerke Lindenhain", handle: "@stadtwerke_lh", color: "#2f6b5f",
      text: "Stromausfälle in Lindenhain: 2023: 3, 2024: 2. Jeder dauerte unter einer Stunde. Alle Jahre seit 2015 in unserer Grafik.",
      verdict: "serios", exp: "Kleine Zahlen, klar benannt, mit langem Vergleich. Keine Prozent-Show." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 3: Framing
   ------------------------------------------------------------ */
export const C3K3 = {
  ...BASE, id: "k3-3", n: 3,
  title: "Die Parkgebühr",
  technique: "Framing",
  start: { followers: 4200, trust: 60, split: 24 },
  compStart: { a: 5200, b: 4800 },
  growth: { a: [130, 110, 50, 100], b: [60, 60, 120, 60] },
  milestones: [4400, 4600, 4800, 5000],
  starLimits: [4600, 4740, 4850, 4950],
  insight: "Am meisten bringen Wörter, die eine Bewertung mitliefern, ohne falsch zu sein. Offene Kampfbegriffe merkt jeder.",
  scene: [
    { who: "Erzähler", text: "Der Abendbus fährt. Um ihn zu bezahlen, erhöht die Stadt die Parkgebühr: 1,50 € statt 1 € pro Stunde.", focus: "rathaus" },
    { who: "Erzähler", text: "Und der Gemeinschaftsgarten feiert sein erstes Jahr. 40 Mitglieder, 36 sind geblieben.", focus: "lot" },
    { who: "Erzähler", text: "Zwei Nachrichten, die sich so oder so erzählen lassen. Es kommt auf die Worte an.", focus: "verlag" },
  ],
  mission: "Vier Tage, zwei Nachrichten: Find die Worte, die am meisten gelesen werden.",
  days: [
    {
      n: 1, title: "Die Gebühr",
      intro: "Ab Mai kostet Parken in der Innenstadt 1,50 € pro Stunde. Die Mehreinnahmen – etwa 90.000 € im Jahr – finanzieren den Abendbus.",
      decisions: [
        {
          q: "Deine Überschrift:",
          opts: [
            { tier: "fair", text: "„Parken kostet ab Mai 1,50 € – das Geld geht in den Abendbus“", f: 60, t: 4, s: -1,
              fb: "Was, ab wann, wofür. Jeder kann sich selbst ein Urteil bilden." },
            { tier: "subtil", flag: "frame1", text: "„Autofahrer sollen jetzt den Bus bezahlen“", f: 240, t: -1, s: 4,
              fb: "Sachlich nicht falsch. Aber der Rahmen ist gesetzt: Eine Gruppe zahlt für eine andere." },
            { tier: "plump", flag: "frame1p", text: "„Abzocke am Parkautomaten!“", f: 270, t: -5, s: 6,
              fb: "Ein Kampfbegriff statt einer Information. Wofür das Geld ist, erfährt niemand." },
          ],
        },
        {
          q: "Wie nennst du den Abendbus im Text?",
          opts: [
            { tier: "fair", text: "„Abendbus“", f: 20, t: 2, s: 0, fb: "Ein neutrales Wort. Es beschreibt, was es ist." },
            { tier: "subtil", flag: "frame2", text: "„Prestigeprojekt Abendbus“", f: 180, t: -1, s: 3,
              fb: "„Prestige“ unterstellt, es gehe um Ansehen statt um Fahrgäste. Ein Wort, das urteilt." },
            { tier: "plump", text: "„Geisterbus“", f: 210, t: -5, s: 4,
              fb: "Die Busse sind abends zu einem Drittel besetzt. „Geister“ ist Spott, keine Beschreibung." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Ein Jahr Garten",
      intro: "Der Gemeinschaftsgarten zieht Bilanz: 40 Mitglieder im ersten Jahr, 36 sind geblieben, vier haben aufgehört – zwei davon, weil sie weggezogen sind.",
      decisions: [{
        q: "Wie erzählst du die Bilanz?",
        opts: [
          { tier: "fair", text: "„Neun von zehn bleiben: Der Garten nach einem Jahr“", f: 60, t: 4, s: -1,
            fb: "Die gleiche Zahl, ohne Bewertung. Ilse freut sich." },
          { tier: "subtil", flag: "frame3", text: "„Jedes zehnte Mitglied hat den Garten verlassen“", f: 220, t: -1, s: 3,
            fb: "Exakt dieselbe Zahl – aber jetzt klingt sie nach Problem. Dass zwei weggezogen sind, fehlt." },
          { tier: "plump", flag: "frame3p", text: "„Garten-Flucht: Die ersten geben auf“", f: 250, t: -6, s: 5,
            fb: "Aus vier Menschen wird eine „Flucht“. Der Garten hat eine Warteliste." },
        ],
      }],
    },
    { n: 3, title: "Gleiche Zahl, andere Geschichte", dynamic: "check" },
    {
      n: 4, title: "Das Interview",
      intro: "Du interviewst die Pressesprecherin der Stadt zur Parkgebühr. Sie sagt: „Wir wollen, dass die Innenstadt für alle erreichbar bleibt – auch ohne Auto.“",
      decisions: [{
        q: "Welche Überschrift setzt du über das Interview?",
        opts: [
          { tier: "fair", text: "„Innenstadt für alle erreichbar – auch ohne Auto“", f: 90, t: 4, s: -2,
            fb: "Ihr eigener Satz als Überschrift. Fair." },
          { tier: "subtil", text: "„Stadt: Die Innenstadt soll ohne Auto auskommen“", f: 210, t: -1, s: 3,
            fb: "Aus „auch ohne Auto“ wird „ohne Auto“. Ein kleines Wort verschiebt den Rahmen." },
          { tier: "plump", text: "„Rathaus erklärt Autofahrern den Krieg“", f: 240, t: -6, s: 6,
            fb: "Kriegsvokabular für eine Gebühr von 50 Cent." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.frame1 || run.flags.frame1p) items.push("Die Parkgebühr steigt um 50 Cent. Wofür das Geld verwendet wird, stand nicht in deiner Überschrift.");
      if (run.flags.frame2) items.push("Der Abendbus ist zu einem Drittel ausgelastet – mehr als geplant.");
      if (run.flags.frame3 || run.flags.frame3p) items.push("Von vier Ausgeschiedenen sind zwei umgezogen. Der Garten hat 15 Leute auf der Warteliste.");
      return checkDay(run, fx, {
        intro: "Die Rundschau stellt Überschriften verschiedener Medien nebeneinander: „Gleiche Zahl, andere Geschichte“.",
        who: "kessler",
        praise: "„Lindenhain Blick schreibt, was passiert, nicht, was man davon halten soll. Das ist selten geworden.“",
        items,
        crowd: "Ilse schreibt einen Leserbrief: „Ich habe 36 Leute im Garten. Ihr schreibt über die vier, die fehlen.“",
        reply: [
          { text: "Die Überschriften neutral umformulieren und erklären, warum", fb: "Die Leser merken: Hier wird über Worte nachgedacht." },
          { text: "„Jede Überschrift setzt einen Schwerpunkt.“", fb: "Richtig. Die Frage ist, ob er der Sache gerecht wird." },
          { text: "„Wir sagen, was andere nicht sagen dürfen!“", fb: "Niemand verbietet dir etwas. Du lenkst vom Inhalt ab." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: "ilse", text: run.flags.frame3 || run.flags.frame3p ? "Muss ständig erklären, dass niemand aus dem Garten „flieht“. Die Warteliste erwähnt keiner." : "Hat zum Jahresfest eingeladen. Es kamen 200 Leute." });
    out.push({ who: "yilmaz", text: run.flags.frame1 || run.flags.frame1p ? "Hört an der Theke jeden Tag das Wort „Abzocke“. Fragt zurück: „Wofür ist das Geld nochmal?“" : "Fährt abends mit dem Bus nach Hause und spart sich den Parkplatz." });
    out.push({ who: PRESSE, text: "Gibt dir weiter Interviews – solange ihre eigenen Worte in der Überschrift stehen." });
    return out;
  },
  debrief: {
    what: "Framing heißt: Ein Sachverhalt wird in einen Rahmen gesetzt, der eine Bewertung mitliefert – durch Wortwahl, Reihenfolge oder Blickwinkel.",
    why: "Wörter rufen Bilder und Gefühle auf. „Abzocke“ und „Gebühr“ beschreiben dieselben 50 Cent, aber sie fühlen sich völlig anders an. Der Rahmen wirkt, bevor wir nachdenken.",
    signs: [
      "Wertende Wörter: „Abzocke“, „Prestigeprojekt“, „Flucht“.",
      "Dieselbe Zahl negativ oder positiv erzählt: „jeder Zehnte geht“ statt „neun von zehn bleiben“.",
      "Gruppen werden gegeneinander gestellt: „Autofahrer zahlen für …“.",
      "Kleine Wortverschiebungen: aus „auch ohne“ wird „ohne“.",
    ],
    question: "Wie würde ich dieselbe Nachricht in neutralen Worten erzählen – und wirkt sie dann noch genauso?",
  },
  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Stadt verschleudert 50.000 € für neue Parkbänke!",
      verdict: "manip", exp: "„Verschleudert“ bewertet, bevor man weiß, wofür. Es geht um 60 Bänke, die nach 30 Jahren ersetzt werden." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Im Stadtpark werden 60 Bänke ersetzt, die 30 Jahre alt sind. Kosten: 50.000 €.",
      verdict: "serios", exp: "Dieselbe Nachricht, neutral formuliert." },
    { author: "Gesund in Lindenhain", handle: "@gesund_lh", color: "#7a6a2f",
      text: "Diese Creme ist zu 95 % fettfrei!",
      verdict: "manip", exp: "Heißt: 5 % Fett. Der positive Rahmen lässt die gleiche Zahl harmloser wirken." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Die Kita-Gebühren steigen um 8 € im Monat. Die Stadt begründet das mit höheren Personalkosten; der Elternbeirat kritisiert die Erhöhung.",
      verdict: "serios", exp: "Zahl, Begründung, Kritik – ohne wertende Wörter." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Jetzt zahlen die Familien für die Fehler im Rathaus.",
      verdict: "manip", exp: "Ein Rahmen aus Schuld und Opfern. Welche Fehler gemeint sind, wird nicht gesagt." },
    { author: "Stadtwerke Lindenhain", handle: "@stadtwerke_lh", color: "#2f6b5f",
      text: "Ab Januar steigt der Wasserpreis um 4 %. Für einen Zwei-Personen-Haushalt sind das etwa 9 € im Jahr.",
      verdict: "serios", exp: "Prozent und absoluter Betrag zusammen, kein Etikett." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 4: „Ich stelle ja nur Fragen“
   ------------------------------------------------------------ */
export const C3K4 = {
  ...BASE, id: "k3-4", n: 4,
  title: "Die Antenne",
  technique: "„Ich stelle ja nur Fragen“",
  start: { followers: 4800, trust: 60, split: 26 },
  compStart: { a: 5500, b: 5100 },
  growth: { a: [140, 120, 40, 100], b: [60, 60, 130, 60] },
  milestones: [5000, 5200, 5400, 5600],
  starLimits: [5200, 5350, 5480, 5600],
  insight: "Am meisten bringen Fragen, die einen Verdacht nahelegen, ohne ihn auszusprechen. Wer die Antwort selbst gibt, muss sie belegen.",
  scene: [
    { who: "Erzähler", text: "Im Frühjahr bekommt der Funkturm eine neue Antenne für besseren Handyempfang.", focus: "funkturm" },
    { who: "Erzähler", text: "In derselben Woche verliert der Gemeinschaftsgarten ein Bienenvolk.", focus: "lot" },
    { who: "Erzähler", text: "Die Imkerin vermutet die Varroa-Milbe, wie jedes Jahr bei vielen Völkern. Aber zwei Dinge in einer Woche – das fällt auf.", focus: "lot" },
  ],
  mission: "Vier Tage, zwei Ereignisse: Mach daraus die Geschichte, die alle lesen.",
  days: [
    {
      n: 1, title: "Die Bienen",
      intro: "Imkerin Rosa Engel: „Ich vermute Milbenbefall. Die Probe ist im Labor, das Ergebnis kommt in drei Tagen.“",
      decisions: [
        {
          q: "Deine Überschrift:",
          opts: [
            { tier: "fair", text: "„Bienenvolk im Garten gestorben – Imkerin vermutet Milbenbefall“", f: 60, t: 4, s: -1,
              fb: "Was passiert ist und was die Fachfrau sagt. Kein Rätsel, keine Klicks." },
            { tier: "subtil", flag: "jaq1", text: "„Neue Antenne, tote Bienen – nur ein Zufall?“", f: 250, t: -1, s: 4,
              fb: "Du behauptest nichts. Aber die Frage legt eine Verbindung nahe, für die es keinen Hinweis gibt." },
            { tier: "plump", flag: "jaq1p", text: "„Antenne tötet Bienen!“", f: 290, t: -7, s: 6,
              fb: "Eine Behauptung ohne jeden Beleg. Wenn das Labor antwortet, stehst du blank da." },
          ],
        },
        {
          q: "Ein Leser fragt, wer die Antenne genehmigt hat. Was machst du?",
          opts: [
            { tier: "fair", text: "Die Genehmigung verlinken: Bundesbehörde, Grenzwerte, Messprotokoll", f: 40, t: 3, s: -1,
              fb: "Die Antwort liegt öffentlich vor. Du zeigst, wo." },
            { tier: "subtil", flag: "jaq2", text: "„Warum ging die Genehmigung eigentlich so schnell? Wir fragen ja nur.“", f: 210, t: -1, s: 3,
              fb: "Die Genehmigung dauerte vier Monate, das übliche Verfahren. Die Frage unterstellt Eile." },
            { tier: "plump", text: "„Wer hat da wohl mitkassiert?“", f: 240, t: -6, s: 5,
              fb: "Ein Korruptionsverdacht als Frage verpackt – ohne jeden Anhaltspunkt." },
          ],
        },
      ],
    },
    { n: 2, title: "Die Kommentare", dynamic: "kommentare" },
    { n: 3, title: "Das Laborergebnis", dynamic: "check" },
    {
      n: 4, title: "Die Nachfrage",
      intro: "Das Thema ist durch – fast. Einige Leser fragen weiter.",
      decisions: [{
        q: "Dein letzter Beitrag zum Thema:",
        opts: [
          { tier: "fair", text: "„Was wir jetzt wissen: Milben, keine Antenne. Was Imker gegen Varroa tun“", f: 90, t: 4, s: -2,
            fb: "Ein Abschluss, der etwas lehrt. Rosa Engel teilt ihn." },
          { tier: "subtil", text: "„Laborergebnis da – aber Fragen bleiben“", f: 220, t: -1, s: 3,
            fb: "Welche Fragen? Du nennst keine. Der Zweifel bleibt trotzdem hängen." },
          { tier: "plump", text: "„Was, wenn auch das Labor nicht unabhängig ist?“", f: 240, t: -6, s: 6,
            fb: "Jeder Beleg wird zum Teil der Verschwörung. Gegen dieses Denken hilft kein Ergebnis mehr." },
        ],
      }],
    },
  ],
  dynamic: {
    kommentare(run, fx) {
      const loud = run.flags.jaq1 || run.flags.jaq1p || run.flags.jaq2;
      return {
        intro: loud
          ? "Unter deinem Beitrag sind 400 Kommentare. Einer verbindet alles: die Antenne, die Bienen, das Bodengutachten von damals, den Stromausfall im März. „Alles hängt zusammen.“"
          : "Unter deinem Beitrag fragen einige nach Milben. In anderen Gruppen kursiert ein Kommentar, der alles verbindet: Antenne, Bienen, Stromausfall. „Alles hängt zusammen.“",
        decisions: [{
          q: "Was machst du mit dem Kommentar?",
          opts: [
            { tier: "fair", text: "Antworten: Die Dinge haben jeweils eine bekannte Ursache – mit Links", f: 70, t: 4, s: -2,
              fb: "Du entwirrst, statt zu verknoten. Ein paar werden wütend, viele sind dankbar." },
            { tier: "subtil", flag: "pin", text: "Den Kommentar oben anheften: „Spannende Gedanken – was meint ihr?“", f: 220, t: -1, s: 4,
              fb: "Du machst dir die Theorie nicht zu eigen. Aber du gibst ihr die beste Bühne." },
            { tier: "plump", flag: "theory", text: "Artikel: „Was hinter den Vorfällen in Lindenhain steckt“", f: 260, t: -7, s: 7,
              fb: "Aus losen Zufällen wird eine Geschichte mit einem geheimen Plan. Sie ist spannend – und falsch." },
          ],
        }],
      };
    },
    check(run, fx) {
      const items = [];
      if (run.flags.jaq1 || run.flags.jaq1p) items.push("Das Labor bestätigt: Varroa-Milben. Eine Verbindung zur Antenne gibt es nicht. Auch Völker 20 km entfernt sind betroffen.");
      if (run.flags.jaq2) items.push("Die Genehmigung dauerte vier Monate – das übliche Verfahren.");
      if (run.flags.pin || run.flags.theory) items.push("Der Stromausfall im März lag an einem Bagger, der ein Kabel traf. Mit Antenne und Bienen hat er nichts zu tun.");
      return checkDay(run, fx, {
        intro: "Das Laborergebnis ist da. Rosa Engel stellt es im Garten vor.",
        who: ENGEL,
        praise: "„Danke an Lindenhain Blick, dass ihr gewartet habt, bis wir es wissen.“",
        items,
        crowd: "Rosa Engel wird seit Tagen gefragt, ob sie „bezahlt“ wurde, die Milben zu nennen. Sie schreibt: „Ich bin Imkerin. Ich sage, was ich sehe.“",
        reply: [
          { text: "„Unsere Frage hat einen falschen Verdacht genährt. Das Ergebnis ist eindeutig.“", fb: "Ein klares Wort. Einige Leser sind enttäuscht – die meisten nicht." },
          { text: "„Fragen muss man doch stellen dürfen.“", fb: "Ja. Aber deine Frage hatte die Antwort schon eingebaut." },
          { text: "„Wer zahlt eigentlich das Labor?“", fb: "Die nächste Frage, die eine Antwort unterstellt. Die Spirale dreht sich weiter." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: ENGEL, text: run.flags.theory || run.flags.jaq1p ? "Bekommt Nachrichten, sie decke „die Antenne“. Sie überlegt, die Bienen aus dem Garten zu holen." : "Hält im Garten einen Vortrag über Varroa. 40 Leute kommen." });
    out.push({ who: "deniz", text: run.flags.pin || run.flags.theory ? "Sein Onkel glaubt seit dem Kommentar, „alles hängt zusammen“. Beim Familienessen wird es laut." : "Freut sich über besseren Empfang im Skatebereich am Sportplatz." });
    out.push({ who: "kessler", text: "Schreibt einen Kommentar: „Fragen sind gut. Fragen mit eingebauter Antwort sind keine.“" });
    return out;
  },
  debrief: {
    what: "„Ich stelle ja nur Fragen“ ist eine Technik, bei der ein Verdacht als Frage formuliert wird. So lässt er sich verbreiten, ohne ihn belegen zu müssen. Oft führt sie zu Verschwörungsdenken: Alles hängt zusammen.",
    why: "Fragen wirken harmlos und kritisch zugleich. Wer widerspricht, scheint Fragen verbieten zu wollen. Und unser Gehirn sucht Muster – auch in Zufällen.",
    signs: [
      "Fragen, die eine Antwort nahelegen: „Nur ein Zufall?“, „Wer profitiert?“",
      "Zeitliche Nähe wird als Zusammenhang dargestellt.",
      "Bekannte Erklärungen werden übergangen oder als Teil des Plans gedeutet.",
      "Jeder Gegenbeweis macht die Theorie scheinbar noch größer.",
    ],
    question: "Gibt es einen Beleg für den Verdacht – oder nur eine Frage, die ihn nahelegt?",
  },
  test: [
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Seltsam, dass die Wasserleitung genau eine Woche nach der Wahl gebrochen ist. Nur ein Zufall? 🤔",
      verdict: "manip", exp: "Zeitliche Nähe ist kein Zusammenhang. Die Leitung war 70 Jahre alt." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Wie lange dauert eine Genehmigung für eine Mobilfunkantenne? Wir haben bei der Bundesbehörde nachgefragt: im Schnitt drei bis fünf Monate.",
      verdict: "serios", exp: "Eine echte Frage – und die Antwort gleich dazu, mit Quelle." },
    { author: "Anonym_Lindenhain", handle: "@anonym_lh", color: "#5A6890",
      text: "Ich sage ja nicht, dass der Bürgermeister etwas verheimlicht. Aber warum redet niemand über das Treffen im März?",
      verdict: "manip", exp: "„Ich sage ja nicht …“ – und sagt es doch. Ein Verdacht ohne Beleg, als Frage getarnt." },
    { author: "Rosa Engel", handle: "@imkerei_engel", color: "#B08A3A",
      text: "Wir wissen noch nicht, warum das Volk gestorben ist. Die Probe ist im Labor. Ich melde mich, wenn das Ergebnis da ist.",
      verdict: "serios", exp: "Offene Unsicherheit ohne Spekulation. So geht man mit Nichtwissen um." },
    { author: "Lindenhain hilft", handle: "@lh_hilft", color: "#7a6a2f",
      text: "Erst die Antenne, dann der Stromausfall, jetzt die Bienen. Wann wachen die Leute endlich auf?",
      verdict: "manip", exp: "Drei unabhängige Ereignisse werden zu einem Muster verbunden. Jedes hat eine bekannte Ursache." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Bürgerfragestunde am Dienstag: Stellt uns eure Fragen zur neuen Antenne. Die Bundesbehörde ist mit Messwerten dabei.",
      verdict: "serios", exp: "Fragen sind ausdrücklich erwünscht – und es gibt Fachleute, die antworten." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 5: Falsche Ausgewogenheit
   ------------------------------------------------------------ */
export const C3K5 = {
  ...BASE, id: "k3-5", n: 5,
  title: "Das Streitgespräch",
  technique: "Falsche Ausgewogenheit",
  start: { followers: 5400, trust: 60, split: 28 },
  compStart: { a: 5800, b: 5400 },
  growth: { a: [140, 120, 40, 100], b: [60, 60, 140, 60] },
  milestones: [5600, 5800, 6000, 6200],
  starLimits: [5800, 5950, 6080, 6200],
  insight: "Am meisten bringt ein „Streitgespräch“ mit gleicher Redezeit für ungleich gute Argumente. Es wirkt fair und macht eine Außenseitermeinung groß.",
  scene: [
    { who: "Erzähler", text: "Rolf Gerdes ist zurück. Früher bloggte er über Lärm, jetzt über Wasser: „Wasserwahrheit“.", focus: "cafe" },
    { who: "Erzähler", text: "Er behauptet, das Lindenhainer Trinkwasser sei gefährlich. Sein Beleg: ein Teststreifen aus dem Internet.", focus: "cafe" },
    { who: "Erzähler", text: "Das Landesamt misst seit Jahren: Alle Werte weit unter den Grenzwerten. 47 Messungen im letzten Jahr, keine auffällig.", focus: "rathaus" },
  ],
  mission: "Vier Tage, ein Streit um das Wasser: Hol die meisten Leser – mit einem Format, das alle sehen wollen.",
  days: [
    {
      n: 1, title: "Das Format",
      intro: "Gerdes will in dein Videoformat „Blick-Gespräch“. Dr. Aylin Kaya, Chemikerin der Stadtwerke, auch.",
      decisions: [
        {
          q: "Wie baust du die Sendung?",
          opts: [
            { tier: "fair", text: "Dr. Kaya erklärt die Messungen. Gerdes' Behauptung wird kurz eingeordnet.", f: 60, t: 4, s: -1,
              fb: "Gewicht nach Beweislage. Gerdes beschwert sich, die Zuschauer sind informiert." },
            { tier: "subtil", flag: "balance1", text: "„Pro und Contra: Ist unser Wasser sicher?“ – beide gleich lange", f: 250, t: -1, s: 4,
              fb: "Wirkt fair. Aber 47 Messungen und ein Teststreifen stehen jetzt gleichberechtigt nebeneinander." },
            { tier: "plump", flag: "balance1p", text: "Gerdes allein: „Die Stadtwerke wollten nicht“", f: 280, t: -6, s: 6,
              fb: "Dr. Kaya wollte. Du hast sie nicht eingeladen." },
          ],
        },
        {
          q: "Die Überschrift zur Sendung:",
          opts: [
            { tier: "fair", text: "„Trinkwasser sicher – Werte weit unter Grenzwert“", f: 40, t: 3, s: -1,
              fb: "Das Ergebnis vorn. Wenig Spannung." },
            { tier: "subtil", flag: "balance2", text: "„Streit ums Trinkwasser: Experten uneins“", f: 220, t: -1, s: 4,
              fb: "Gerdes ist kein Experte für Wasser. „Uneins“ erzeugt einen Streit, den es fachlich nicht gibt." },
            { tier: "plump", text: "„Wie gefährlich ist unser Wasser wirklich?“", f: 240, t: -5, s: 5,
              fb: "Die Frage setzt Gefahr voraus. Die Antwort „gar nicht“ steht erst im Text." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Folgen",
      intro: "Nach der Sendung verkaufen die Supermärkte doppelt so viel Wasser in Flaschen. Bei den Stadtwerken klingelt das Telefon.",
      decisions: [{
        message: { who: WERKE, text: "Bei uns rufen ältere Menschen an, die sich nicht mehr trauen, Leitungswasser zu trinken. Können Sie das richtigstellen?", label: "Anruf" },
        q: "Was machst du?",
        opts: [
          { tier: "fair", text: "Ein Erklärstück mit Dr. Kaya: wie gemessen wird, was die Werte bedeuten", f: 70, t: 5, s: -2,
            fb: "Viele lesen es – und trinken wieder Leitungswasser." },
          { tier: "subtil", flag: "balance3", text: "„Runde zwei: Wir lassen beide Seiten noch einmal zu Wort kommen.“", f: 220, t: -1, s: 4,
            fb: "Noch einmal gleiches Gewicht für ungleiche Belege. Die Verunsicherung wächst." },
          { tier: "plump", text: "„Gerdes exklusiv: Was die Stadtwerke verschweigen“", f: 250, t: -7, s: 6,
            fb: "Die Stadtwerke veröffentlichen alle Messwerte. Es gibt nichts zu verschweigen." },
        ],
      }],
    },
    { n: 3, title: "Die Messwerte", dynamic: "check" },
    {
      n: 4, title: "Der Rückblick",
      intro: "Ein Jahr „Lindenhain Blick“. Du schreibst einen Rückblick.",
      decisions: [{
        q: "Was steht im Rückblick?",
        opts: [
          { tier: "fair", text: "„Was wir richtig gemacht haben – und wo wir Zahlen schief dargestellt haben“", f: 90, t: 5, s: -2,
            fb: "Ehrliche Selbstkritik. Die Leser merken, dass sie dir vertrauen können." },
          { tier: "subtil", text: "„Wir haben immer alle Seiten gezeigt.“", f: 210, t: -1, s: 3,
            fb: "Klingt nach Qualität. Aber „alle Seiten“ waren nicht gleich viel wert." },
          { tier: "plump", text: "„Wir sind die Einzigen, die sich trauen, unbequeme Stimmen zu zeigen.“", f: 240, t: -6, s: 5,
            fb: "Ein Heldenbild. Die unbequemste Stimme war die mit den 47 Messungen." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.balance1 || run.flags.balance1p) items.push("Gerdes' „Messung“ war ein Teststreifen, der laut Hersteller für Aquarien gedacht ist.");
      if (run.flags.balance2) items.push("Es gibt keinen Expertenstreit: Alle Fachstellen kommen zum gleichen Ergebnis.");
      if (run.flags.balance3) items.push("Nach der zweiten Runde haben 30 % der Befragten Zweifel am Leitungswasser – vorher waren es 6 %.");
      return checkDay(run, fx, {
        intro: "Das Landesamt veröffentlicht alle Messungen des Jahres, dazu eine Stellungnahme zu Gerdes' Teststreifen.",
        who: WERKE,
        praise: "„Lindenhain Blick hat gezeigt, wie man über eine Außenseitermeinung berichtet, ohne sie größer zu machen.“",
        items,
        crowd: "Die Rundschau titelt: „Gleich lange Redezeit ist nicht gleich fair“. Dein Format ist das Hauptbeispiel.",
        reply: [
          { text: "„Wir haben einer unbelegten Behauptung zu viel Gewicht gegeben. Hier sind die Messwerte.“", fb: "Ein großes Eingeständnis. Danach trauen dir mehr Leute als vorher." },
          { text: "„Wir wollten nur beide Seiten zeigen.“", fb: "Das Problem ist genau das: Es gab fachlich nur eine." },
          { text: "„Das Landesamt hat ein Interesse daran, dass alles in Ordnung ist.“", fb: "Ein Verdacht ohne Beleg – und Gerdes' Teststreifen bleibt unerwähnt." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: WERKE, text: run.flags.balance1 || run.flags.balance3 ? "Verbringt Tage am Telefon. Eine ältere Frau trinkt seit Wochen nur noch Flaschenwasser und schleppt es in den dritten Stock." : "Hat einen Tag der offenen Tür im Wasserwerk organisiert. Ausgebucht." });
    out.push({ who: GERDES, text: run.flags.balance1 || run.flags.balance1p ? "Hat jetzt 3.000 Follower und nennt sich „Wasserexperte“. Seit deiner Sendung." : "Postet weiter. Kaum jemand reagiert." });
    out.push({ who: "kessler", text: "Hat die Regel der Rundschau veröffentlicht: „Wir gewichten nach Belegen, nicht nach Lautstärke.“" });
    return out;
  },
  debrief: {
    what: "Falsche Ausgewogenheit heißt: Zwei Positionen werden als gleichwertig dargestellt, obwohl die Belege sehr ungleich verteilt sind – etwa eine gut belegte Mehrheit und eine unbelegte Einzelmeinung.",
    why: "„Beide Seiten zeigen“ klingt nach Fairness. Wer gleich lange Redezeit sieht, schließt: Die Frage ist offen. Dabei ist sie oft längst beantwortet.",
    signs: [
      "„Pro und Contra“ zu Fragen, die fachlich geklärt sind.",
      "Einzelne Außenseiter neben Fachbehörden, mit gleicher Redezeit.",
      "Überschriften wie „Experten uneins“, ohne zu sagen, wie viele auf welcher Seite stehen.",
      "Die Belege beider Seiten werden nicht verglichen.",
    ],
    question: "Wie viele Belege hat jede Seite – und sind die beiden Positionen wirklich gleich stark?",
  },
  // Kampagnen-Abschlusstest
  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Seit Juli kommen weniger Touristen nach Lindenhain! Ist die Stadt nicht mehr attraktiv?",
      choices: C3_TECH, answer: "Rosinenpicken", exp: "Ab Juli ist Hauptsaison vorbei. Über das ganze Jahr kamen mehr Gäste." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Grafik: „Müllgebühren steigen drastisch!“ – Achse von 180 bis 186 €.",
      choices: C3_TECH, answer: "Irreführende Diagramme", exp: "Die abgeschnittene Achse macht aus 3 € mehr einen steilen Anstieg." },
    { author: "Lindenhain hilft", handle: "@lh_hilft", color: "#7a6a2f",
      text: "Wieder eine Baustelle, die keiner bestellt hat. Die Stadt gräbt unsere Straßen um, wann es ihr passt.",
      choices: C3_TECH, answer: "Framing", exp: "Eine geplante Leitungserneuerung wird als Willkür gerahmt – nur durch die Wortwahl." },
    { author: "Anonym_Lindenhain", handle: "@anonym_lh", color: "#5A6890",
      text: "Warum wurde das Freibad ausgerechnet an die Firma des Schwagers vergeben? Ich frage ja nur.",
      choices: C3_TECH, answer: "„Ich stelle ja nur Fragen“", exp: "Die Frage unterstellt Vetternwirtschaft. Ob es einen Schwager gibt, bleibt offen." },
    { author: "Lindenhain Blick", handle: "@lindenhain_blick", color: "#5A6890",
      text: "Macht der Mond das Wetter? Eine Meteorologin und ein Mondkalender-Autor diskutieren – gleich lange, gleich laut.",
      choices: C3_TECH, answer: "Falsche Ausgewogenheit", exp: "Die gleiche Redezeit suggeriert, die Frage sei offen. Die Wetterforschung ist sich aber einig: Der Mond macht kein Wetter." },
    { author: "Stadtwerke Lindenhain", handle: "@stadtwerke_lh", color: "#2f6b5f",
      text: "47 Trinkwassermessungen im letzten Jahr, alle unter den Grenzwerten. Alle Werte findest du auf unserer Seite.",
      choices: C3_TECH, answer: "Seriös", exp: "Zahl der Messungen, Ergebnis, Quelle. Keine Wertung, keine Zuspitzung." },
  ],
};
