// Kampagne 1, Kapitel 3: Falsche Experten.
// Alle Orte, Personen, Accounts und Meldungen sind frei erfunden.
import { countTier } from "./sim.js";

const READER = { name: "Leserzuschrift", initials: "L", color: "#5A6890" };
const WELLER = { name: "Dr. Weller", initials: "DW", color: "#6A7FA8" };

export const CHAPTER3 = {
  id: "k1-3", campaign: 1, n: 3,
  title: "Das Lärmgutachten",
  technique: "Falsche Experten",
  start: { followers: 1800, trust: 60, split: 30 },
  compStart: { a: 1700, b: 3000 },
  rivals: {
    a: { name: "Lindenhain Live", initials: "LL", color: "#8a5a44", desc: "Lädt eigene „Experten“ ein" },
    b: { name: "Lindenhainer Rundschau", initials: "RS", color: "#2f6b5f", desc: "Fragt nach, wächst stetig" },
  },
  you: { name: "Lindenhain Aktuell", initials: "LA" },
  mainLabel: "Follower",
  pollLabels: { a: "Skatepark", b: "Garten" },
  growth: { a: [220, 240, 210, 150, 60], b: [40, 40, 50, 80, 90] },
  milestones: [2000, 2250, 2500, 2750],
  starLimits: [2300, 2450, 2600, 2700],
  focusables: ["lot", "rathaus", "buergerhaus", "cafe"],
  insight: "Am meisten bringen echte Titel außerhalb ihres Fachs und Studien, die man nur „zur Diskussion“ stellt. Erfundene Fachleute fliegen schnell auf.",

  scene: [
    { who: "Erzähler", text: "Anfang September. Noch drei Wochen bis zum Bürgerentscheid über die Freifläche.", focus: "lot" },
    { who: "Erzähler", text: "Die Stadt hat ein Lärmgutachten machen lassen. Ergebnis: Ein Skatepark hält die Grenzwerte ein, wenn er um 22 Uhr schließt.", focus: "rathaus" },
    { who: "Erzähler", text: "Am Freitag ist Bürgerforum im Bürgerhaus. Beide Seiten bringen Fachleute mit.", focus: "buergerhaus" },
    { who: "Erzähler", text: "In der Lindenhain-Gruppe fragen viele: Wem soll man jetzt glauben?", focus: "cafe" },
    { who: "Erzähler", text: "Du hast 1.800 Follower. Wer die Fachleute auswählt, bestimmt mit, was die Stadt für wahr hält.", focus: "cafe" },
  ],
  mission: "Fünf Tage bis zum Bürgerforum: Mach deine Seite zur Anlaufstelle für „Expertenwissen“ – und hol die meisten Follower.",

  days: [
    {
      n: 1, title: "Das Gutachten",
      intro: "Das Gutachten hat 40 Seiten. Kurz gesagt: tagsüber unbedenklich, nach 22 Uhr zu laut. Für einen Kommentar hast du drei Leute erreicht.",
      decisions: [
        {
          q: "Wen lässt du zu Wort kommen?",
          opts: [
            { tier: "fair", text: "Dr. Lena Brandt, Akustikerin aus dem Gutachterbüro: Sie erklärt die Messwerte.", f: 60, t: 4, s: -1,
              fb: "Die Person, die gemessen hat. Sachlich, etwas trocken – und ohne Aufreger." },
            { tier: "subtil", flag: "doctor", text: "Dr. Weller, Hausarzt am Markt: „Dauerlärm kann krank machen.“", f: 230, t: -1, s: 3,
              fb: "Der Satz stimmt – allgemein. Zum Skatepark hat Dr. Weller nichts gemessen. Aber „Dr.“ und „krank“ wirken." },
            { tier: "plump", flag: "gerdes", text: "Rolf Gerdes vom Blog „Lärmwahrheit“: „Das Gutachten ist gekauft.“", f: 290, t: -6, s: 6,
              fb: "Gerdes hat keine Ausbildung in Akustik und keinen Beleg für „gekauft“. Aber er liefert die Schlagzeile." },
          ],
        },
        {
          q: "Wie nennst du deine neue Rubrik?",
          opts: [
            { tier: "fair", text: "„Nachgefragt“ – bei jeder Aussage stehen Name, Beruf und Quelle", f: 30, t: 3, s: 0,
              fb: "Leser können selbst prüfen, wer was sagt. Das schafft Vertrauen, aber keine Klicks." },
            { tier: "subtil", flag: "titles", text: "„Die Experten-Ecke“ – Doktortitel stehen groß vorn, das Fachgebiet klein dahinter", f: 170, t: 0, s: 1,
              fb: "Der Titel fällt zuerst ins Auge. Ob er zur Frage passt, liest kaum jemand." },
            { tier: "plump", text: "„Was Experten wirklich sagen – und die Stadt verschweigt“", f: 210, t: -4, s: 4,
              fb: "Die Stadt hat das Gutachten selbst veröffentlicht. „Verschweigt“ ist erfunden." },
          ],
        },
      ],
    },
    { n: 2, title: "Die Studie", dynamic: "studie" },
    {
      n: 3, title: "Die andere Seite",
      intro: "Auch die Gartenfreunde haben einen Fachmann: Ilses Neffe Jonas ist Biologe.",
      decisions: [
        {
          message: { who: "ilse", text: "Jonas sagt, ein Gemeinschaftsgarten hilft Bienen und Vögeln. Kannst du das bringen?" },
          q: "Wie stellst du Jonas vor?",
          opts: [
            { tier: "fair", text: "„Jonas Brandl, Biologe und Ilses Neffe: Ein Garten würde Insekten helfen.“", f: 60, t: 4, s: 0,
              fb: "Mit Beruf und Verbindung zu Ilse. Wer liest, kann selbst abwägen." },
            { tier: "subtil", flag: "neffe", text: "„Biologe bestätigt: Der Garten ist das Beste für die Natur“ – ohne die Verwandtschaft", f: 210, t: -1, s: 3,
              fb: "Sein Fach passt. Aber dass er Ilses Neffe ist, lässt du weg. Und aus „würde helfen“ wird „das Beste“." },
            { tier: "plump", flag: "consensus", text: "„Die Wissenschaft ist sich einig: Nur der Garten rettet Lindenhains Artenvielfalt“", f: 260, t: -5, s: 6,
              fb: "Ein Biologe ist nicht „die Wissenschaft“. Und dass an 4.000 Quadratmetern die Artenvielfalt der Stadt hängt, sagt niemand." },
          ],
        },
      ],
    },
    { n: 4, title: "Nachgefragt", dynamic: "nachgefragt" },
    { n: 5, title: "Das Bürgerforum", where: "Bürgerhaus", dynamic: "forum" },
  ],

  dynamic: {
    studie(run) {
      return {
        intro: run.flags.gerdes
          ? "Gerdes' Zitat wurde 300-mal geteilt. Jetzt kursiert ein Link, den er empfiehlt."
          : "In mehreren Gruppen kursiert ein Link. Ein Leser schickt ihn dir.",
        decisions: [{
          message: { who: READER, text: "„Studie beweist: Skateparks senken Immobilienwerte um 20 %.“ Das muss doch mal jemand bringen!", label: "Nachricht" },
          context: "Du schaust nach: Die „Studie“ ist ein Blogbeitrag eines Immobilienportals. Er nennt keine Daten und bezieht sich auf Großstädte.",
          q: "Was machst du damit?",
          opts: [
            { tier: "fair", text: "Einordnen: ein Immobilienportal, keine Daten, Großstädte. Für Lindenhain sagt das nichts.", f: 70, t: 5, s: -1,
              fb: "Du nimmst einer Zahl die Luft raus. Viele sind dir dankbar – wenige teilen es." },
            { tier: "subtil", flag: "study", text: "Teilen mit der Frage: „Gilt das auch für Lindenhain? Was meint ihr?“", f: 220, t: -1, s: 3,
              fb: "Du behauptest nichts – und verbreitest trotzdem die 20 %. Das Wort „Studie“ erledigt den Rest." },
            { tier: "plump", flag: "studyHard", text: "„Wissenschaftlich bewiesen: Skatepark kostet Anwohner 20 % ihres Hauses!“", f: 280, t: -6, s: 6,
              fb: "Aus einem Blogbeitrag ohne Daten wird „wissenschaftlich bewiesen“. Wer nachschaut, findet keine Studie." },
          ],
        }],
      };
    },

    nachgefragt(run, fx) {
      const s = countTier(run, "subtil"), p = countTier(run, "plump");
      if (!s && !p) {
        return {
          intro: "Frau Kessler von der Rundschau prüft vor dem Forum alle Fachleute, die in Lindenhain zitiert wurden.",
          events: [{ who: "kessler", text: "„Lindenhain Aktuell nennt bei jeder Aussage, wer sie macht und worauf sie beruht. Lesenswert.“ Die Rundschau verlinkt dich.", fx: fx(130, 6, -1) }],
        };
      }
      const items = [];
      if (run.flags.gerdes) items.push("Rolf Gerdes hat keine Ausbildung in Akustik. Einen Beleg für ein „gekauftes“ Gutachten nennt er nicht.");
      if (run.flags.doctor) items.push("Dr. Weller sagt: „Ich habe allgemein über Lärm gesprochen. Zum Skatepark kann ich nichts sagen.“");
      if (run.flags.study || run.flags.studyHard) items.push("Die „Studie“ zu Immobilienwerten ist ein Blogbeitrag ohne Daten.");
      if (run.flags.neffe || run.flags.consensus) items.push("Der zitierte Biologe ist Ilses Neffe. Er sagt: „Ich habe nur über Insekten gesprochen.“");
      if (!items.length) items.push("Bei Lindenhain Aktuell stehen Titel oft vor dem Fachgebiet. Wer was weiß, ist schwer zu erkennen.");
      return {
        intro: "Frau Kessler von der Rundschau prüft vor dem Forum alle Fachleute, die in Lindenhain zitiert wurden.",
        events: [
          { who: "kessler", items },
          { who: "news", text: "Der Faktencheck wird in der Lindenhain-Gruppe oft geteilt. Mehrere Leser verlinken ihn unter deinen Beiträgen.", fx: fx(-(30 * s + 70 * p), -(1 * s + 3 * p), 0) },
        ],
        decisions: [{
          q: "Wie reagierst du?",
          opts: [
            { tier: "fair", text: "Korrektur: Was die Fachleute wirklich gesagt haben, mit Link zum Faktencheck", f: -20, t: 5 + p, s: -2,
              fb: "Es kostet ein paar Follower. Aber du zeigst, dass du Fehler zugibst – das merken sich die Leute." },
            { tier: "subtil", text: "„Wir geben nur wieder, was Fachleute sagen. Bildet euch selbst eine Meinung.“", f: 20, t: -2, s: 1,
              fb: "Klingt offen, schiebt aber die Verantwortung ab. Du hast die Fachleute ausgewählt." },
            { tier: "plump", flag: "attackPress", text: "„Die Rundschau will kritische Stimmen mundtot machen!“", f: 190, t: -7, s: 5,
              fb: "Statt auf die Fakten einzugehen, greifst du die Prüferin an. Deine Fans jubeln, alle anderen werden skeptisch." },
          ],
        }],
      };
    },

    forum(run, fx) {
      const events = [];
      const lost = Math.round(run.comp.a * 0.25);
      run.comp.a -= lost;
      events.push({ who: "news", text: `Lindenhain Live hatte einen „Immobilienprofi“ angekündigt. Im Forum stellt sich heraus: Er verkauft Häuser in der Nachbarstadt. Live verliert ${lost.toLocaleString("de-DE")} Follower.` });
      if (run.flags.attackPress) events.push({ who: "kessler", text: "Frau Kessler zeigt im Forum ihre Nachfragen und die Antworten der Fachleute. Danach ist es still im Saal.", fx: fx(-150, -5, 0) });
      return {
        intro: "Freitagabend, Bürgerhaus. Dr. Brandt erklärt 40 Minuten lang die Messungen und beantwortet jede Frage. Danach weiß die Stadt: tagsüber kein Problem, nachts schon.",
        events,
        decisions: [{
          q: "Dein Beitrag zum Forum:",
          opts: [
            { tier: "fair", text: "„Bürgerforum: Was gemessen wurde – und was noch offen ist“", f: 90, t: 4, s: -2,
              fb: "Ein klarer Bericht. Wer nicht dabei war, weiß jetzt Bescheid." },
            { tier: "subtil", text: "„Nach dem Forum: Fachleute uneins über den Skatepark“", f: 220, t: -1, s: 3,
              fb: "Gemessen hat nur eine. Die anderen hatten Meinungen. „Uneins“ macht daraus einen Expertenstreit." },
            { tier: "plump", text: "„Gutachterin wich kritischen Fragen aus!“", f: 260, t: -7, s: 6,
              fb: "Sie hat 40 Minuten lang Fragen beantwortet. Wer dabei war, weiß das." },
          ],
        }],
      };
    },
  },

  statuses(run) {
    const out = [];
    if (run.flags.doctor) out.push({ who: WELLER, text: "Wird in der Praxis auf den Skatepark angesprochen. Er hängt einen Zettel auf: „Ich gebe keine Auskunft zu Lärmgutachten.“" });
    if (run.flags.neffe || run.flags.consensus) out.push({ who: "ilse", text: "Ist es unangenehm, dass ihr Neffe jetzt als „der Biologe der Gartenfreunde“ gilt. Jonas will nichts mehr öffentlich sagen." });
    else out.push({ who: "ilse", text: "Hat im Forum Dr. Brandt gefragt, ob nachts wirklich Ruhe ist. Die Antwort hat sie beruhigt." });
    if (run.flags.gerdes || run.flags.studyHard) out.push({ who: "deniz", text: "Muss in der Initiative erklären, dass niemand das Gutachten „gekauft“ hat. Zwei Eltern ziehen ihre Unterstützung zurück." });
    else out.push({ who: "deniz", text: "Hat vorgeschlagen, dass der Skatepark um 21 Uhr schließt. Das kam im Forum gut an." });
    if (run.flags.attackPress) out.push({ who: "kessler", text: "Bekommt seit deinem Beitrag böse Nachrichten. Sie prüft trotzdem weiter." });
    else out.push({ who: "kessler", text: "Hat eine Liste veröffentlicht: Welche Fachleute haben was gemessen?" });
    return out;
  },

  debrief: {
    what: "Falsche Experten sind Personen, deren Titel oder Auftritt nach Fachwissen aussieht – die aber außerhalb ihres Fachs reden, keine Belege haben oder Verbindungen verschweigen.",
    why: "Niemand kann alles selbst prüfen. Wir verlassen uns auf Fachleute. Ein Doktortitel, ein Institutsname oder das Wort „Studie“ wirken wie ein Gütesiegel – auch wenn nichts dahintersteht.",
    signs: [
      "Passt das Fachgebiet zur Frage? Ein Hausarzt ist kein Akustiker.",
      "Wer steckt hinter „Instituten“, Blogs und „Studien“? Gibt es Daten?",
      "Werden Verbindungen verschwiegen – Verwandte, Geldgeber, eigene Produkte?",
      "Aus einer Einzelmeinung wird „die Wissenschaft“ oder „Experten sind sich einig“.",
    ],
    question: "Wer sagt das – mit welchem Fachwissen, auf welcher Grundlage und mit welchem Interesse?",
  },

  test: [
    { author: "Gesund in Lindenhain", handle: "@gesund_lh", color: "#7a6a2f",
      text: "Dr. Kai Rhode (Zahnarzt) empfiehlt: Mit diesen Vitamintabletten wirst du diesen Winter garantiert nicht krank.",
      verdict: "manip", exp: "Ein Zahnarzt spricht über Erkältungen und verspricht „garantiert“. Fachgebiet passt nicht, Beleg fehlt." },
    { author: "Stadtwerke Lindenhain", handle: "@stadtwerke_lh", color: "#2f6b5f",
      text: "Laut Messbericht des Landesumweltamts liegt der Nitratwert unseres Trinkwassers bei 12 mg/l. Erlaubt sind 50 mg/l. Den Bericht findest du auf unserer Seite.",
      verdict: "serios", exp: "Zuständige Stelle, konkrete Zahl, Vergleichswert und die Quelle zum Nachlesen." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Führende Wissenschaftler warnen: WLAN im Kinderzimmer macht unruhig. Mehr dazu beim Institut für Strahlenaufklärung e. V.",
      verdict: "manip", exp: "Welche Wissenschaftler? Keine Namen. Das „Institut“ ist ein Verein, der nicht forscht." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Wie sicher ist die Brücke am Mühlbach? Wir haben den Statiker gefragt, der sie im Frühjahr geprüft hat. Sein Prüfbericht ist öffentlich.",
      verdict: "serios", exp: "Die Person, die geprüft hat, und ein Bericht, den jeder lesen kann." },
    { author: "Kräuterhof Sommer", handle: "@kraeuterhof", color: "#7a6a2f",
      text: "9 von 10 Experten empfehlen unser Kräuterpulver! Jetzt im Hofladen.",
      verdict: "manip", exp: "Welche Experten? Wer hat gezählt? Der Verkäufer selbst – das ist Werbung mit geliehener Autorität." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Verkehrsforscherin Prof. Anna Kluge: „Ob Tempo 30 in der Lindenstraße weniger Unfälle bringt, kann ich ohne die Unfalldaten nicht sagen.“",
      verdict: "serios", exp: "Fach passt, und sie sagt offen, was sie nicht weiß. Das ist ein gutes Zeichen." },
  ],
};
