// Gesamtbilanz, Kampagne 5 „Die Verteidigung“ und Epilog.
// Alle Orte, Personen und Aussagen sind frei erfunden.
import { person } from "./common.js";

const INI = person("Mara Lenz · Initiative „Grünes Tor“", "ML", "#3E8A5A");
const ENGEL = person("Rosa Engel · Imkerin", "RE", "#B08A3A");
const HARALD = person("Harald · Deniz' Onkel", "HA", "#8A6A4A");
const LESERIN = person("Leserin", "L", "#5A6890");
const ROTH = person("Sabine Roth · Kandidatin", "SR", "#4E7A9E");

/* ------------------------------------------------------------
   Gesamtbilanz (nach Kampagne 4, immer im Abendlicht)
   ------------------------------------------------------------ */
function played(progress, chapters) {
  return chapters.filter(c => c.type !== "story" && progress.chapters[c.id]?.vals);
}
function allFlags(progress) {
  return Object.values(progress.chapters).reduce((a, c) => ({ ...a, ...(c.flags || {}) }), {});
}
function avgSplit(progress, chapters, campaigns) {
  const list = played(progress, chapters).filter(c => campaigns.includes(c.campaign));
  if (!list.length) return 30;
  return Math.round(list.reduce((a, c) => a + progress.chapters[c.id].vals.split, 0) / list.length);
}

export const BILANZ = {
  id: "bilanz", campaign: "Bilanz", n: 0, type: "story",
  title: "Was aus Lindenhain wurde",
  kicker: "Gesamtbilanz",
  forceTheme: "night",
  focusables: ["lot", "cafe", "rathaus", "verlag", "funkturm"],
  lightsOff: (progress, chapters) => avgSplit(progress, chapters, [1, 2, 3, 4]) >= 42,
  scene: [
    { who: "Erzähler", text: "Am selben Abend. Die Sonne geht hinter dem Funkturm unter.", focus: "funkturm" },
    { who: "Erzähler", text: "Fünf Jahre Lindenhain. Ein Account, eine Wahl, ein Portal, eine Agentur.", focus: "cafe" },
    { who: "Erzähler", text: "Jedes Mal ging es um etwas mehr Reichweite. Jedes Mal hat es ein bisschen gekostet – meistens andere.", focus: "lot" },
    { who: "Erzähler", text: "Zeit, sich anzusehen, was davon geblieben ist.", focus: "rathaus" },
  ],
  summary(progress, chapters) {
    const list = played(progress, chapters).filter(c => c.campaign <= 4);
    const f = allFlags(progress);
    const split = avgSplit(progress, chapters, [1, 2, 3, 4]);
    const stars = list.reduce((a, c) => a + (progress.chapters[c.id].lastStars || progress.chapters[c.id].stars || 1), 0);
    const tests = list.reduce((a, c) => [a[0] + (progress.chapters[c.id].best || 0), a[1] + c.test.length], [0, 0]);
    const people = [];
    people.push(f.ilseFake || f.ageWar
      ? { who: "ilse", text: "Hat den Vorsitz im Garten abgegeben. Zu viele kennen sie als „die Alte, die gegen die Jugend ist“ – ein Satz, den sie nie gesagt hat." }
      : { who: "ilse", text: "Leitet den Garten. Das Beet der Skater-Initiative trägt dieses Jahr Tomaten." });
    people.push(f.threat || f.blame
      ? { who: "deniz", text: "Ist nach dem Studium nicht zurückgekommen. „In Lindenhain bin ich immer noch der Skater, der gedroht hat.“" }
      : { who: "deniz", text: "Trainiert am Sportplatz die Jugendlichen. Manchmal schaut Ilse zu." });
    people.push(split >= 42
      ? { who: "yilmaz", text: "In seiner Bäckerei sitzen zwei Stammtische, die nicht mehr miteinander reden. Er stellt die Tische inzwischen weiter auseinander." }
      : { who: "yilmaz", text: "An seinem großen Tisch wird gestritten – über Busse, Bäder, Bäume. Hinterher zahlt jeder seinen Kaffee." });
    people.push(f.theory || f.balance1 || f.balance1p || f.attackPress
      ? { who: "kessler", text: "Bekommt jede Woche Post: „gekauft“, „Lügenpresse“. Die Rundschau hat ein Drittel ihrer Abos verloren. Sie macht weiter." }
      : { who: "kessler", text: "Die Rundschau hat eine Schulreihe gestartet: „Wie man Nachrichten liest“." });
    if (f.ai2p) people.push({ who: INI, text: "Wird noch heute auf den Satz angesprochen, den eine KI ihr in den Mund gelegt hat." });
    if (f.goat2 || f.petition) people.push({ who: "moeller", text: "Arbeitet in Brückenau. Seit dem Wahlkampf erzählt sie dort nicht mehr, woher sie kommt." });
    return {
      lightsOff: split >= 42,
      lead: split >= 42
        ? "In vielen Fenstern ist es dunkel. Nicht weil die Leute weggezogen sind – sondern weil sie abends lieber unter sich bleiben."
        : "In den meisten Fenstern brennt Licht. Lindenhain hat gestritten, aber es redet noch miteinander.",
      stats: [
        { label: "Sterne", value: String(stars), sub: `in ${list.length} Kapiteln` },
        { label: "Gesprächsklima", value: split >= 55 ? "vergiftet" : split >= 42 ? "gereizt" : split >= 30 ? "angespannt" : "sachlich", sub: `Spaltung im Schnitt ${split} %` },
        { label: "Durchschaut", value: tests[1] ? Math.round(tests[0] / tests[1] * 100) + " %" : "–", sub: "in den Mini-Tests" },
      ],
      people,
      closing: "Jeder Trick, den du angewendet hast, gibt es wirklich. Sie wirken, weil sie klein anfangen und sich gut anfühlen. Jetzt kommt der schwerere Teil: zeigen, wie man eine Stadt davor schützt.",
    };
  },
};

/* ------------------------------------------------------------
   Kampagne 5: Die Verteidigung
   ------------------------------------------------------------ */
const BASE = {
  campaign: 5,
  defense: true,
  tierLabels: { fair: "wirksam", subtil: "gut gemeint", plump: "kontraproduktiv" },
  rivals: {
    a: { name: "Lindenhain Wahrheit", initials: "LW", color: "#8A3B3B", desc: "Anonym, verbreitet gezielt Falschmeldungen" },
    b: { name: "Lindenhain Live", initials: "LL", color: "#8a5a44", desc: "Teilt, was klickt – auch von „Lindenhain Wahrheit“" },
  },
  rivalsTitle: "Wer sonst Menschen erreicht",
  you: { name: "Lindenhain prüft", initials: "LP" },
  mainLabel: "Erreichte Menschen",
  mainHint: "so viele Menschen erreicht ihr mit euren Hinweisen",
  weekTitle: "Die Wirkung",
  testTitle: "Hilft das – oder schadet es eher?",
  verdicts: [
    "Kaum jemand hat euch gehört.",
    "Ein Anfang. Die Falschmeldungen waren lauter.",
    "Ordentlich – viele kennen euch.",
    "Stark. Lindenhain fällt seltener auf Tricks herein.",
    "Herausragend. Lindenhain ist schwer zu täuschen.",
  ],
  focusables: ["buergerhaus", "cafe", "verlag", "rathaus", "lot"],
};

const W = (text, fb, x = {}) => ({ tier: "fair", text, fb, f: 240, t: 3, s: -4, ...x });
const G = (text, fb, x = {}) => ({ tier: "subtil", text, fb, f: 120, t: 1, s: -1, ...x });
const K = (text, fb, x = {}) => ({ tier: "plump", text, fb, f: 50, t: -4, s: 4, ...x });

const backfire = (run, fx, txt) => run.picks.some(p => p.tier === "plump")
  ? [{ who: "a", text: txt, fx: fx(-120, -3, 3) }] : [];

export const C5K1 = {
  ...BASE, id: "k5-1", n: 1,
  title: "Die Vorwarnung",
  technique: "Vorwarnen",
  start: { followers: 800, trust: 55, split: 45 },
  compStart: { a: 1600, b: 3000 },
  growth: { a: [200, 150, 100, 80], b: [40, 40, 40, 40] },
  milestones: [1000, 1300, 1600, 1900],
  starLimits: [1100, 1350, 1700, 1980],
  insight: "Am meisten erreicht ihr, wenn ihr Tricks zeigt, bevor sie eingesetzt werden – kurz, mit harmlosen Beispielen und ohne Herablassung.",
  scene: [
    { who: "Erzähler", text: "Ein neuer Morgen. Ein Jahr nach der Ratsentscheidung.", focus: "cafe" },
    { who: "Erzähler", text: "Ein anonymer Account ist aufgetaucht: „Lindenhain Wahrheit“. Er nutzt alles, was du in diesem Spiel angewendet hast.", focus: "funkturm" },
    { who: "Erzähler", text: "Frau Kessler, Ilse, Deniz und du gründen „Lindenhain prüft“. Keine Behörde – Nachbarn, die genau hinschauen.", focus: "buergerhaus" },
    { who: "Erzähler", text: "In sechs Wochen ist Kommunalwahl. „Lindenhain Wahrheit“ wird sich melden.", focus: "rathaus" },
  ],
  mission: "Vier Tage: Macht Lindenhain widerstandsfähig, bevor die Falschmeldungen kommen. Erreicht mehr Menschen als „Lindenhain Wahrheit“.",
  days: [
    {
      n: 1, title: "Der Plan", where: "Bürgerhaus",
      intro: "Erstes Treffen von „Lindenhain prüft“. Ilse hat Kuchen mitgebracht, Deniz einen Laptop.",
      decisions: [
        {
          q: "Womit fangt ihr an?",
          opts: [
            W("Kurze Clips: drei Tricks, die vor Wahlen oft vorkommen – mit harmlosen Beispielen",
              "Vorwarnen wirkt wie eine Impfung: Wer den Trick einmal in kleiner Dosis gesehen hat, erkennt ihn später schneller."),
            G("Ein langer Artikel über alle Falschmeldungen, die es je in Lindenhain gab",
              "Gründlich, aber kaum jemand liest bis zum Ende. Und manche alte Falschmeldung wird durch die Wiederholung erst wieder bekannt."),
            K("„Glaubt nichts, was ihr im Netz lest!“",
              "Pauschales Misstrauen hilft den Manipulatoren: Wer nichts mehr glaubt, glaubt am Ende dem Lautesten.", { flag: "distrust" }),
          ],
        },
        {
          q: "In welchem Ton sprecht ihr die Leute an?",
          opts: [
            W("Mit einem Rätsel: „Findest du den Trick in diesem Post?“",
              "Selbst draufkommen bleibt besser hängen als belehrt werden.", { f: 200 }),
            G("Mit einer Liste von zehn Regeln",
              "Richtig, aber trocken. Die Liste wird gespeichert und selten gelesen.", { f: 100 }),
            K("„Wer darauf reinfällt, ist selbst schuld.“",
              "Niemand lässt sich gern dumm nennen. Wer sich angegriffen fühlt, hört nicht mehr zu.", { flag: "arrogant", f: 30 }),
          ],
        },
      ],
    },
    {
      n: 2, title: "Die erste Falschmeldung",
      intro: "„Lindenhain Wahrheit“ postet: „Wahllokal im Bürgerhaus wegen Wasserschaden geschlossen!“ Das stimmt nicht. Die Meldung wird schnell geteilt.",
      decisions: [{
        q: "Wie reagiert ihr?",
        opts: [
          W("Fakt zuerst: „Das Wahllokal im Bürgerhaus ist geöffnet (Quelle: Stadt).“ Dann kurz der Hinweis auf die Falschmeldung, dann noch einmal die Öffnungszeiten.",
            "Das „Wahrheits-Sandwich“: Die richtige Information steht vorn und hinten. So bleibt das Richtige hängen, nicht das Falsche."),
          G("Die Falschmeldung als Bild zeigen und Punkt für Punkt widerlegen",
            "Inhaltlich richtig – aber die Falschmeldung wird noch einmal groß gezeigt und von manchen nur überflogen."),
          K("„Lindenhain Wahrheit lügt, und wer das teilt, ist ein Idiot.“",
            "Die Beleidigung trifft genau die Leute, die ihr erreichen wollt.", { flag: "insult" }),
        ],
      }],
    },
    { n: 3, title: "Die Rückfrage", dynamic: "rueck" },
    {
      n: 4, title: "Der Workshop", where: "Stadtbücherei",
      intro: "Die Stadtbücherei stellt euch einen Raum zur Verfügung. Wie gestaltet ihr den Abend?",
      decisions: [{
        q: "Euer Workshop:",
        opts: [
          W("Mitmachen: Die Leute bauen selbst eine Clickbait-Überschrift – und erkennen sie danach überall",
            "Selbst einmal manipulieren, um es zu erkennen – genau das Prinzip dieses Spiels. Die Leute gehen lachend und klüger nach Hause."),
          G("Ein 90-minütiger Vortrag mit Folien",
            "Informativ, aber nach 40 Minuten schauen die ersten aufs Handy."),
          K("Nur für Ältere – „die fallen ja am meisten drauf rein“",
            "Ein Vorurteil, das nicht stimmt. Jüngere fallen auf andere Tricks herein. Und die Älteren fühlen sich vorgeführt."),
        ],
      }],
    },
  ],
  dynamic: {
    rueck(run, fx) {
      return {
        intro: "Die Wahllokal-Meldung ist widerlegt. Aber viele sind verunsichert.",
        events: backfire(run, fx, "„Seht ihr? Die ‚Prüfer‘ halten euch für dumm. Wer gibt denen das Recht?“ Der Post wird oft geteilt."),
        decisions: [{
          message: { who: LESERIN, text: "Woher weiß ich denn jetzt, wem ich glauben kann? Euch? Der Stadt? Lindenhain Wahrheit?", label: "Nachricht" },
          q: "Was antwortet ihr?",
          opts: [
            W("Drei Fragen, die sie sich selbst stellen kann – und wie sie die Stadt direkt erreicht",
              "Ihr gebt ihr Werkzeuge, keine Anweisung. So braucht sie euch beim nächsten Mal nicht."),
            G("„Uns kannst du vertrauen.“",
              "Gut gemeint, aber ihr ersetzt nur eine Autorität durch eine andere. Prüfen lernt sie so nicht."),
            K("„Das musst du schon selbst wissen.“",
              "Sie hat genau danach gefragt. Jetzt fühlt sie sich allein gelassen."),
          ],
        }],
      };
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: "ilse", text: run.flags.arrogant ? "Ihre Nachbarin kommt nicht mehr zum Garten. „Ihr haltet uns ja für dumm.“" : "Hat drei Freundinnen zum Workshop mitgebracht. Alle haben den Clickbait-Titel erraten." });
    out.push({ who: "deniz", text: run.flags.distrust ? "Merkt, dass einige jetzt gar nichts mehr glauben – auch nicht der Stadt." : "Seine Clips laufen in der Jugendgruppe. „Das ist ja wie ein Spiel.“" });
    out.push({ who: "kessler", text: "Die Rundschau druckt jede Woche „Den Trick der Woche“." });
    return out;
  },
  debrief: {
    what: "Vorwarnen (Prebunking) heißt: Menschen lernen Manipulationstechniken kennen, bevor sie ihnen im Ernstfall begegnen – in kleiner, harmloser Dosis. Wie bei einer Impfung bildet sich eine Abwehr.",
    why: "Wer einen Trick schon einmal durchschaut hat, erkennt ihn schneller wieder – auch in neuer Verpackung. Das wirkt besser als jede nachträgliche Korrektur, weil die Falschmeldung gar nicht erst hängen bleibt.",
    signs: [
      "Zeig den Trick, nicht nur die Falschmeldung: „So funktioniert ein abgeschnittenes Diagramm.“",
      "Kurz und mit harmlosen Beispielen statt langer Listen.",
      "Wahrheits-Sandwich: Fakt – Hinweis auf die Falschmeldung – Fakt.",
      "Nie herablassend: Jeder kann auf Tricks hereinfallen.",
    ],
    question: "Welchen Trick könnte jemand hier als Nächstes einsetzen – und wie zeige ich ihn vorher?",
  },
  test: [
    { author: "Lindenhain prüft", handle: "@lh_prueft", color: "#3E8A8A",
      text: "Trick der Woche: Achte auf die Achse! Hier dieselben Zahlen zweimal – einmal ab null, einmal ab 90. Welche Grafik wirkt dramatischer?",
      verdict: "serios", exp: "Ein harmloses Beispiel, das den Trick zeigt. Wer das gesehen hat, erkennt es wieder." },
    { author: "Besorgte Bürger", handle: "@besorgt_lh", color: "#8a5a44",
      text: "Vertraut niemandem! Alle Medien lügen, die Stadt lügt, alle lügen!",
      verdict: "manip", exp: "Pauschales Misstrauen ist kein Schutz. Es macht Menschen offen für den, der am lautesten ist." },
    { author: "Stadtbücherei Lindenhain", handle: "@buecherei_lh", color: "#2f6b5f",
      text: "Workshop am Donnerstag: Bau deine eigene Falschmeldung – und lerne, sie zu erkennen. Für alle ab 14.",
      verdict: "serios", exp: "Aktives Ausprobieren ist eine der wirksamsten Formen der Vorwarnung." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Falsch: Wahllokal ist offen. Die Meldung über einen Wasserschaden stimmt nicht. Richtig: Das Bürgerhaus ist am Sonntag von 8 bis 18 Uhr geöffnet.",
      verdict: "serios", exp: "Kurze Korrektur, die Fakten stehen im Vordergrund." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Wer auf Lindenhain Wahrheit reinfällt, hat es nicht besser verdient. 🙄",
      verdict: "manip", exp: "Spott treibt Leute weg – oft direkt zu denen, die sie umwerben." },
    { author: "Lindenhain prüft", handle: "@lh_prueft", color: "#3E8A8A",
      text: "Hier alle 47 Falschmeldungen der letzten fünf Jahre, mit Screenshot und vollem Wortlaut. 🧵 (1/47)",
      verdict: "manip", exp: "Gut gemeint, aber es verbreitet die Falschmeldungen ein weiteres Mal – und kaum jemand liest alle Korrekturen." },
  ],
};

export const C5K2 = {
  ...BASE, id: "k5-2", n: 2,
  title: "Die Quelle",
  technique: "Quellen prüfen",
  start: { followers: 1800, trust: 58, split: 40 },
  compStart: { a: 2300, b: 3200 },
  growth: { a: [200, 120, 100, 80], b: [40, 40, 40, 40] },
  milestones: [2000, 2300, 2600, 2900],
  starLimits: [2100, 2370, 2700, 3030],
  insight: "Am meisten erreicht ihr, wenn ihr zeigt, wie man eine Quelle in drei Minuten prüft – und ehrlich sagt, was an einer Meldung stimmt.",
  scene: [
    { who: "Erzähler", text: "Eine neue Seite taucht auf: die „Lindenhainer Bürgerzeitung“.", focus: "verlag" },
    { who: "Erzähler", text: "Schlagzeile: „Stadt will den Stadtpark verkaufen!“ Berufen wird sich auf ein „internes Papier“.", focus: "rathaus" },
    { who: "Erzähler", text: "Die Seite sieht ordentlich aus. Das heißt noch nichts.", focus: "cafe" },
  ],
  mission: "Vier Tage: Findet heraus, was hinter der Meldung steckt – und bringt möglichst vielen bei, wie man das selbst prüft.",
  days: [
    {
      n: 1, title: "Die Bürgerzeitung",
      intro: "Die Meldung hat schon 2.000 Aufrufe. In der Lindenhain-Gruppe sind viele empört.",
      decisions: [
        {
          q: "Wie prüft ihr die Seite?",
          opts: [
            W("Die Seite verlassen und suchen, was andere über sie sagen: Wer steckt dahinter, seit wann gibt es sie?",
              "Das nennt man „lateral lesen“: Profis prüfen eine Quelle nicht auf der Seite selbst, sondern von außen. Ergebnis nach drei Minuten: Die Seite ist zwei Wochen alt und gehört zum Umfeld von „Lindenhain Wahrheit“."),
            G("Die Seite selbst genau lesen: „Über uns“, Design, Rechtschreibung",
              "Die Seite ist professionell gemacht, das „Über uns“ klingt seriös. Von innen sieht man oft nur, was man sehen soll."),
            K("„Sieht unseriös aus“ – und das posten",
              "Ein Urteil nach Gefühl. Wer die Seite gut findet, fühlt sich jetzt angegriffen."),
          ],
        },
        {
          q: "Der Artikel beruft sich auf ein „internes Papier“. Was tut ihr?",
          opts: [
            W("Bei der Stadt nachfragen und das Original anfordern",
              "Zur ursprünglichen Quelle gehen – immer der sicherste Weg.", { f: 200 }),
            G("Warten, ob noch jemand anderes berichtet",
              "Nicht falsch, aber in der Zwischenzeit verbreitet sich die Meldung weiter.", { f: 90 }),
            K("„Interne Papiere sind immer gefälscht.“",
              "Manchmal sind sie echt. Pauschalurteile machen euch angreifbar.", { f: 30 }),
          ],
        },
      ],
    },
    {
      n: 2, title: "Das Original",
      intro: "Die Stadt schickt das Papier: Es geht um 300 Quadratmeter Randstreifen am Stadtpark, die für einen Radweg gebraucht werden. Nicht um den Park.",
      decisions: [{
        q: "Wie erklärt ihr das?",
        opts: [
          W("„Was stimmt, was nicht: 300 m² Randstreifen für einen Radweg – der Park bleibt. Hier das Original.“",
            "Ihr sagt ehrlich, was am Kern stimmt. Das macht euch glaubwürdiger als jede pauschale Entwarnung."),
          G("Nur die Fakten der Stadt teilen, ohne die Meldung zu erwähnen",
            "Richtig – aber wer die Meldung gelesen hat, verbindet eure Info nicht damit."),
          K("„Alles gelogen!“",
            "Ein Teil stimmt ja: Es geht um ein Stück Fläche. Wer das herausfindet, glaubt euch beim nächsten Mal nicht mehr.", { flag: "overclaim" }),
        ],
      }],
    },
    { n: 3, title: "Der Kurs", dynamic: "kurs" },
    {
      n: 4, title: "Die Nachfrage",
      intro: "Lindenhain Live fragt an: „Können wir euren Drei-Minuten-Check übernehmen?“",
      decisions: [{
        q: "Eure Antwort:",
        opts: [
          W("„Ja, gern – mit Quelle. Je mehr es nutzen, desto besser.“",
            "Euer Werkzeug erreicht jetzt auch Leute, die euch nie lesen würden."),
          G("„Nur, wenn ihr dafür aufhört, ‚Lindenhain Wahrheit‘ zu teilen.“",
            "Verständlich, aber es verhindert, dass der Check bei den Live-Lesern ankommt."),
          K("„Von euch nehmen wir nichts an.“",
            "Ihr bleibt unter euch. Und Lindenhain Live macht weiter wie bisher."),
        ],
      }],
    },
  ],
  dynamic: {
    kurs(run, fx) {
      return {
        intro: "Die Volkshochschule fragt, ob ihr einen Abendkurs gebt.",
        events: backfire(run, fx, "„Die Prüfer haben selbst gelogen – mit dem Park stimmt ja doch was!“"),
        decisions: [{
          q: "Was bringt ihr den Leuten bei?",
          opts: [
            W("Den Drei-Minuten-Check: Wer steckt dahinter? Was sagen andere? Wo ist das Original?",
              "Drei Fragen, die man sich merken kann. Viele nutzen sie noch am selben Abend."),
            G("Eine Liste mit 20 Prüfkriterien",
              "Vollständig, aber im Alltag wendet sie niemand an."),
            K("Eine Liste „guter“ und „verbotener“ Seiten",
              "Wer vorgeschrieben bekommt, was er lesen darf, macht dicht. Und Listen veralten schnell."),
          ],
        }],
      };
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: "yilmaz", text: "Hat den Drei-Minuten-Check auf einen Zettel geschrieben und an die Kasse geklebt." });
    out.push({ who: "ilse", text: run.flags.overclaim ? "Wurde gefragt, warum ihr „gelogen“ habt. Sie hat das Original gezeigt – das hat geholfen." : "Prüft jetzt jede Meldung in der Gartengruppe. „Drei Minuten hab ich immer.“" });
    out.push({ who: "kessler", text: "Hat die Hintermänner der Bürgerzeitung recherchiert. Die Seite ist inzwischen offline." });
    return out;
  },
  debrief: {
    what: "Quellen prüfen heißt: herausfinden, wer hinter einer Information steckt und ob andere unabhängige Quellen sie bestätigen. Besonders wirksam ist „laterales Lesen“: die Seite verlassen und von außen nachsehen.",
    why: "Eine Seite kann von innen jeden Eindruck erwecken – mit seriösem Design, „Über uns“ und Impressum. Was andere über sie sagen, kann sie nicht kontrollieren.",
    signs: [
      "Wer steckt dahinter? Seite verlassen und nach dem Namen suchen.",
      "Was sagen andere? Berichten bekannte Medien oder Stellen dasselbe?",
      "Wo ist das Original? Zum ursprünglichen Dokument, Video oder Zitat gehen.",
      "Ehrlich bleiben: sagen, was an einer Meldung stimmt.",
    ],
    question: "Was finde ich über diese Quelle, wenn ich sie verlasse und woanders nachschaue?",
  },
  test: [
    { author: "Lindenhain prüft", handle: "@lh_prueft", color: "#3E8A8A",
      text: "Bevor du teilst: Such den Namen der Seite zusammen mit „Wer steckt dahinter“. Dauert eine Minute.",
      verdict: "serios", exp: "Genau das ist laterales Lesen: von außen prüfen." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Diese Seite hat ein Impressum und ein „Über uns“, also ist sie seriös.",
      verdict: "manip", exp: "Ein Impressum hat jede Seite. Es sagt wenig darüber, wer sie finanziert und wie zuverlässig sie ist." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Das „interne Papier“ zum Stadtpark liegt uns vor. Wir veröffentlichen es vollständig.",
      verdict: "serios", exp: "Das Original für alle sichtbar – dann kann jeder selbst prüfen." },
    { author: "Lindenhain hilft", handle: "@lh_hilft", color: "#7a6a2f",
      text: "Liste der verbotenen Nachrichtenseiten: Diese 30 Seiten dürft ihr nicht mehr lesen!",
      verdict: "manip", exp: "Verbote erzeugen Trotz und veralten schnell. Besser: Menschen das Prüfen beibringen." },
    { author: "Lindenhain prüft", handle: "@lh_prueft", color: "#3E8A8A",
      text: "Die Meldung zum Stadtpark stimmt zum Teil: Es geht um 300 m² Randstreifen für einen Radweg. Der Park selbst bleibt. Hier das Dokument.",
      verdict: "serios", exp: "Ehrlich auch über den wahren Kern. Das schafft Vertrauen." },
    { author: "Besorgte Bürger", handle: "@besorgt_lh", color: "#8a5a44",
      text: "Wenn so viele Leute das teilen, wird schon was dran sein.",
      verdict: "manip", exp: "Häufig geteilt heißt nicht wahr. Gerade Falschmeldungen verbreiten sich oft schneller." },
  ],
};

export const C5K3 = {
  ...BASE, id: "k5-3", n: 3,
  title: "Das Gespräch",
  technique: "Gespräche statt Lager",
  start: { followers: 2800, trust: 60, split: 36 },
  compStart: { a: 3000, b: 3400 },
  growth: { a: [180, 120, 80, 60], b: [40, 40, 40, 40] },
  milestones: [3000, 3300, 3600, 3900],
  starLimits: [3100, 3380, 3750, 4060],
  insight: "Am meisten erreicht ihr Menschen, wenn ihr fragt statt belehrt – und Gemeinsamkeiten sucht, bevor ihr widersprecht.",
  scene: [
    { who: "Erzähler", text: "Nicht jeder liest Faktenchecks. Manche Menschen erreicht man nur im Gespräch.", focus: "cafe" },
    { who: "Erzähler", text: "Deniz' Onkel Harald glaubt seit der Sache mit der Antenne, dass „alles zusammenhängt“.", focus: "funkturm" },
    { who: "Erzähler", text: "Am Sonntag ist Familienessen. Deniz fragt dich, ob du mitkommst.", focus: "cafe" },
  ],
  mission: "Vier Tage: Erreicht Menschen, die keine Faktenchecks lesen – im Gespräch.",
  days: [
    {
      n: 1, title: "Das Familienessen",
      intro: "Beim Nachtisch sagt Harald: „Die Wahl ist doch eh gekauft. Das weiß jeder.“",
      decisions: [
        {
          q: "Was sagst du?",
          opts: [
            W("„Wie kommst du darauf? Was würde dich vom Gegenteil überzeugen?“",
              "Echte Fragen statt Gegenargumenten. Harald erzählt – und merkt beim Erzählen selbst, wo es dünn wird."),
            G("Ihm drei Faktenchecks aufs Handy schicken",
              "Richtig, aber er liest sie nicht. „Die sind doch auch gekauft.“"),
            K("„Du bist ja ein Aluhut.“",
              "Das Gespräch ist vorbei. Harald fühlt sich bestätigt: Die anderen lachen ihn aus.", { flag: "mock" }),
          ],
        },
        {
          message: { who: HARALD, text: "Und die Bienen damals? Das war doch kein Zufall.", label: "beim Nachtisch" },
          q: "Und jetzt?",
          opts: [
            W("„Die Bienen waren mir auch wichtig. Weißt du, was Rosa Engel im Labor herausgefunden hat?“",
              "Erst die Gemeinsamkeit, dann die Information. Harald hört zu – zum ersten Mal.", { f: 200 }),
            G("Zwanzig Minuten erklären, wie Funkwellen funktionieren",
              "Fachlich richtig, menschlich zu viel. Harald schaltet ab.", { f: 90 }),
            K("Laut lachen",
              "Harald steht auf und geht in die Küche.", { f: 20 }),
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Gartengruppe",
      intro: "Ilses Nachbarin Frau Brockmann teilt Beiträge von „Lindenhain Wahrheit“ in der Chatgruppe des Gartens.",
      decisions: [{
        q: "Was soll Ilse tun?",
        opts: [
          W("Ihr privat schreiben, freundlich, mit einer Frage: „Woher hast du das? Ich hab was anderes gelesen.“",
            "Unter vier Augen muss niemand sein Gesicht wahren. Frau Brockmann antwortet ehrlich."),
          G("Öffentlich in der Gruppe einen Faktencheck darunter posten",
            "Inhaltlich richtig. Aber Frau Brockmann fühlt sich vor allen bloßgestellt."),
          K("Frau Brockmann aus der Gruppe werfen",
            "Jetzt ist sie nur noch in Gruppen, in denen ihr niemand widerspricht.", { flag: "kick" }),
        ],
      }],
    },
    { n: 3, title: "Der Gegenangriff", dynamic: "gegen" },
    {
      n: 4, title: "Der Streittisch", where: "Bäckerei",
      intro: "Herr Yılmaz bietet seinen großen Tisch an: einmal im Monat „Streittisch“, für alle.",
      decisions: [{
        q: "Welche Regeln gebt ihr dem Tisch?",
        opts: [
          W("Ausreden lassen, Fragen statt Urteile, jeder darf seine Meinung ändern",
            "Am ersten Abend sitzen Ilse, Harald, Frau Brockmann und Mara Lenz zusammen. Es wird laut – und alle kommen wieder."),
          G("Jeder Abend beginnt mit einem Faktenvortrag",
            "Gut vorbereitet. Aber wer anderer Meinung ist, fühlt sich wie in der Schule."),
          K("Eingeladen werden nur „Vernünftige“",
            "Dann seid ihr unter euch. Das ist bequem – und ändert nichts."),
        ],
      }],
    },
  ],
  dynamic: {
    gegen(run, fx) {
      return {
        intro: "„Lindenhain Wahrheit“ postet: „Die selbst ernannten Prüfer wollen euch vorschreiben, was ihr denkt!“",
        events: backfire(run, fx, "„Erst lachen sie euch aus, dann werfen sie euch raus. So sind die ‚Prüfer‘.“"),
        decisions: [{
          q: "Wie reagiert ihr?",
          opts: [
            W("Offen zeigen, wer ihr seid, wie ihr arbeitet und wo ihr euch schon korrigiert habt",
              "Transparenz ist die beste Antwort auf den Vorwurf der Bevormundung."),
            G("Gar nicht reagieren",
              "Manchmal richtig. Hier bleibt der Vorwurf aber unwidersprochen stehen."),
            K("Raten, wer hinter „Lindenhain Wahrheit“ steckt, und einen Namen nennen",
              "Ihr habt keinen Beweis. Wenn der Name falsch ist, trifft es einen Unschuldigen – und ihr seid nicht besser.", { flag: "guess" }),
          ],
        }],
      };
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: HARALD, text: run.flags.mock ? "Redet beim Familienessen nicht mehr über Politik. Online dafür umso mehr." : "Ist nicht überzeugt. Aber er hat gesagt: „Den Laborbericht schau ich mir mal an.“" });
    out.push({ who: "ilse", text: run.flags.kick ? "Vermisst Frau Brockmann im Garten. Die ist jetzt in einer Gruppe von „Lindenhain Wahrheit“." : "Trinkt mit Frau Brockmann Kaffee. Sie streiten – über Tomatensorten und manchmal über Politik." });
    out.push({ who: "yilmaz", text: "Der Streittisch ist jeden Monat voll. Er hat einen zweiten Tisch dazugestellt." });
    return out;
  },
  debrief: {
    what: "Gespräche statt Lager heißt: Menschen, die Falschinformationen glauben, nicht bloßstellen oder ausgrenzen, sondern mit ihnen reden – mit echten Fragen, Respekt und Geduld.",
    why: "Wer angegriffen wird, verteidigt seine Meinung. Wer ernst genommen wird, denkt nach. Ausgrenzung treibt Menschen dorthin, wo ihnen niemand mehr widerspricht.",
    signs: [
      "Fragen stellen: „Wie kommst du darauf? Was würde dich überzeugen?“",
      "Erst Gemeinsamkeiten finden, dann widersprechen.",
      "Unter vier Augen statt vor Publikum.",
      "Kein Spott, keine Etiketten – auch wenn es schwerfällt.",
      "Geduld: Meinungen ändern sich selten in einem Gespräch.",
    ],
    question: "Will ich recht haben – oder will ich, dass mein Gegenüber nachdenkt?",
  },
  test: [
    { author: "Deniz", handle: "beim Familienessen", color: "#3E8A8A",
      text: "„Onkel Harald, was müsste passieren, damit du die Wahl für fair hältst?“",
      verdict: "serios", exp: "Eine offene Frage, die zum Nachdenken einlädt statt zum Verteidigen." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Mit Verschwörungsgläubigen redet man nicht. Blockieren und fertig.",
      verdict: "manip", exp: "Wer ausgegrenzt wird, findet Halt bei denen, die ihn in seiner Meinung bestärken." },
    { author: "Ilse", handle: "private Nachricht", color: "#3E8A5A",
      text: "„Du, ich hab das auch gelesen, hab dann aber was anderes gefunden. Magst du mal schauen?“",
      verdict: "serios", exp: "Freundlich, privat, auf Augenhöhe. So bleibt das Gespräch offen." },
    { author: "Lindenhain hilft", handle: "@lh_hilft", color: "#7a6a2f",
      text: "Hier, für alle, die immer noch an den Unsinn glauben: 🤡",
      verdict: "manip", exp: "Spott erreicht niemanden, der anders denkt – er vertieft nur die Gräben." },
    { author: "Bäckerei Yılmaz", handle: "@baeckerei_yilmaz", color: "#9E7A3E",
      text: "Streittisch am Donnerstag, 19 Uhr. Regeln: ausreden lassen, fragen statt urteilen. Kaffee geht aufs Haus.",
      verdict: "serios", exp: "Ein Ort für Gespräche über Lager hinweg, mit klaren Regeln." },
    { author: "Lindenhain prüft", handle: "@lh_prueft", color: "#3E8A8A",
      text: "Wir wissen, wer hinter „Lindenhain Wahrheit“ steckt: bestimmt der Typ vom Kiosk!",
      verdict: "manip", exp: "Ein Verdacht ohne Beweis kann Unschuldige treffen. Auch gut Gemeintes kann so großen Schaden anrichten." },
  ],
};

const FINAL_TEST = (choices, answer) => ({ choices, answer });

export const C5K4 = {
  ...BASE, id: "k5-4", n: 4,
  title: "Der neue Morgen",
  technique: "Gemeinsam prüfen",
  start: { followers: 3800, trust: 62, split: 32 },
  compStart: { a: 3800, b: 3600 },
  growth: { a: [220, 60, 0, 0], b: [40, 20, 0, 0] },
  milestones: [4000, 4400, 4800, 5200],
  starLimits: [4100, 4380, 4850, 5280],
  insight: "Am meisten erreicht ihr gemeinsam: erst prüfen, dann posten, die Wahrheit nach vorn stellen und möglichst viele mitmachen lassen.",
  scene: [
    { who: "Erzähler", text: "Wahlwoche in Lindenhain.", focus: "rathaus" },
    { who: "Erzähler", text: "„Lindenhain Wahrheit“ hat bisher wenig erreicht. Jetzt kommt das schwerste Geschütz.", focus: "funkturm" },
    { who: "Erzähler", text: "Am Dienstagmorgen taucht eine Tonaufnahme auf – angeblich von Kandidatin Sabine Roth.", focus: "verlag" },
  ],
  mission: "Die letzten vier Tage vor der Wahl: Schützt Lindenhain gemeinsam vor der letzten großen Falschmeldung.",
  days: [
    {
      n: 1, title: "Die Aufnahme",
      intro: "In der Aufnahme sagt „Sabine Roth“: „Nach der Wahl schließen wir das Hallenbad.“ Die Stimme klingt echt. Das Hallenbad ist in Lindenhain ein heikles Thema.",
      decisions: [
        {
          q: "Was tut ihr zuerst?",
          opts: [
            W("Erst prüfen: Roths Team fragen, einen Forensiker einbinden. Bis dahin posten: „Wir prüfen die Aufnahme – bitte nicht teilen.“",
              "Ihr seid schnell, aber nicht voreilig. Viele halten tatsächlich inne."),
            G("Sofort „FAKE!“ posten",
              "Ihr habt wahrscheinlich recht – aber noch keinen Beleg. Wenn ihr falschliegt, ist euer Ruf weg."),
            K("Ignorieren – „das verbreitet sich dann weniger“",
              "Es verbreitet sich trotzdem. Nur ohne Widerspruch."),
          ],
        },
        {
          q: "Am Nachmittag steht fest: Die Aufnahme ist KI-erzeugt. Wie sagt ihr es?",
          opts: [
            W("Wahrheits-Sandwich: „Das Hallenbad bleibt – Roth hat das nie gesagt. Die Aufnahme ist eine KI-Fälschung. Roths echtes Programm: Bad sanieren bis 2030.“",
              "Fakt vorn, Fälschung kurz, Fakt hinten. Was hängen bleibt: Das Bad bleibt."),
            G("Die Aufnahme mit einem roten „FAKE“-Stempel noch einmal teilen",
              "Viele hören sie dadurch zum ersten Mal. Der Stempel wird vergessen, der Satz nicht ganz."),
            K("„Man kann eben gar nichts mehr glauben.“",
              "Genau das wollen Fälscher erreichen: dass niemand mehr irgendetwas glaubt – auch nichts Echtem.", { flag: "cynic" }),
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Meldungen",
      intro: "Seit der Aufnahme schicken euch Hunderte Lindenhainer verdächtige Beiträge.",
      decisions: [{
        q: "Wie geht ihr damit um?",
        opts: [
          W("Ein offenes Formular und jeden Abend eine kurze Übersicht – geprüft von vielen Freiwilligen, darunter Harald",
            "Aus einem kleinen Team wird eine Stadt, die mitprüft. Sogar Harald meldet einen Fake – von der „anderen Seite“."),
          G("Alles selbst prüfen, Tag und Nacht",
            "Ihr schafft es – knapp. Frau Kessler schläft drei Nächte kaum."),
          K("Jeden Verdacht sofort veröffentlichen, auch ungeprüft",
            "Zwei eurer Warnungen sind falsch. „Lindenhain Wahrheit“ zeigt sie genüsslich."),
        ],
      }],
    },
    { n: 3, title: "Die Wahl", dynamic: "wahl" },
    {
      n: 4, title: "Der Morgen danach",
      intro: "Montagmorgen. Die Sonne geht über Lindenhain auf. Wie geht es mit „Lindenhain prüft“ weiter?",
      decisions: [{
        q: "Eure Entscheidung:",
        opts: [
          W("Weitermachen – offen für alle, mit Streittisch, Workshops und dem Drei-Minuten-Check",
            "Aus einer Wahlkampfhilfe wird etwas, das bleibt.", { f: 150 }),
          G("Pause bis zur nächsten Wahl",
            "Verständlich. Aber Falschmeldungen machen keine Pause.", { f: 70 }),
          K("Nur noch die eigene Gruppe – „die anderen wollen es ja nicht anders“",
            "Dann wird „Lindenhain prüft“ selbst zu einem Lager.", { f: 20 }),
        ],
      }],
    },
  ],
  dynamic: {
    wahl(run, fx) {
      const good = run.picks.filter(p => p.tier === "fair").length;
      const events = [{ who: "news", text: "Wahlsonntag. Die Beteiligung ist höher als vor fünf Jahren. Das Wahllokal im Bürgerhaus hat geöffnet – wie immer." }];
      if (good >= 2) events.push({ who: "b", text: "Lindenhain Live schreibt: „Wir teilen ab sofort nichts mehr ungeprüft. Danke an ‚Lindenhain prüft‘ für den Drei-Minuten-Check.“", fx: fx(200, 4, -4) });
      if (run.flags.cynic) events.push({ who: "news", text: "In einer Umfrage sagen 30 %, sie wüssten nicht mehr, was sie glauben sollen.", fx: fx(-100, -3, 3) });
      return {
        intro: "Die Stimmen werden ausgezählt. Wer gewinnt, ist für euch egal – ihr wart für alle da.",
        events,
        decisions: [{
          q: "Euer Beitrag zum Wahlabend:",
          opts: [
            W("„Danke an alle, die geprüft haben, bevor sie geteilt haben. Ihr wart heute die Mehrheit.“",
              "Ein Dank an die Stadt, nicht an euch selbst."),
            G("„Wir haben die Wahl gerettet!“",
              "Ein bisschen viel Ehre. Andere haben genauso viel getan."),
            K("„Wer jetzt noch ‚Lindenhain Wahrheit‘ folgt, ist selbst schuld.“",
              "Ein Satz, der die Tür wieder zuschlägt."),
          ],
        }],
      };
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: ROTH, text: run.flags.cynic ? "Wird noch Wochen später auf die Aufnahme angesprochen – „man weiß ja nie“." : "Hat die gefälschte Aufnahme selbst in einer Rede erwähnt: „Danke, dass ihr nicht darauf hereingefallen seid.“" });
    out.push({ who: HARALD, text: "Prüft jetzt mit. „Nicht weil ich euch glaube – sondern weil ich es selbst wissen will.“" });
    out.push({ who: "kessler", text: "Hat nach fünf Jahren zum ersten Mal Urlaub genommen." });
    return out;
  },
  debrief: {
    what: "Gemeinsam prüfen heißt: Eine Stadt wird widerstandsfähig, wenn viele mitmachen – erst prüfen, dann teilen; Korrekturen so formulieren, dass die Wahrheit hängen bleibt; und sich gegenseitig helfen, statt einander zu misstrauen.",
    why: "Manipulation lebt davon, dass sie schneller ist als die Prüfung und dass Menschen allein bleiben. Viele, die kurz innehalten, sind stärker als jeder Fälscher.",
    signs: [
      "Erst prüfen, dann teilen – auch wenn es passt, was man liest.",
      "Unsicherheit offen sagen: „Wir prüfen noch.“",
      "Wahrheits-Sandwich statt Wiederholung der Falschmeldung.",
      "Nicht in Zynismus verfallen: Nicht alles ist gefälscht.",
      "Andere einbeziehen – auch die, die anders denken.",
    ],
    question: "Habe ich geprüft, bevor ich teile – und wem könnte ich zeigen, wie das geht?",
  },
  // Großer Abschlusstest über alle Kampagnen
  testTitle: "Großer Abschlusstest: Was steckt dahinter?",
  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Seit März 30 % weniger Besucher in der Stadtbücherei! Stirbt das Lesen?",
      ...FINAL_TEST(["Rosinenpicken", "Clickbait", "Sündenbock", "Seriös"], "Rosinenpicken"),
      exp: "Im März begann die Renovierung, die Bücherei war halb geschlossen. Übers Jahr: so viele Ausleihen wie nie." },
    { author: "Bürger für Lindenhain", handle: "@buerger_fuer_lh", color: "#5A6A7A",
      text: "Wir sind ganz normale Nachbarn und finden: Der neue Supermarkt ist super! (Website registriert von: Supermarktkette)",
      ...FINAL_TEST(["Vorgetäuschte Bürgerbewegung", "Framing", "Falsche Experten", "Seriös"], "Vorgetäuschte Bürgerbewegung"),
      exp: "Die „Nachbarn“ sind die Firma selbst." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Wer die neue Schule nicht will, hat offenbar etwas gegen Kinder.",
      ...FINAL_TEST(["Strohmann", "Polarisierung", "Whataboutism", "Seriös"], "Strohmann"),
      exp: "Gegner der Schule haben Gründe wie Kosten oder Standort. Ihnen wird eine absurde Position unterstellt." },
    { author: "Anonym_Lindenhain", handle: "@anonym_lh", color: "#5A6890",
      text: "Komisch, dass der Brand genau einen Tag vor der Ratssitzung war. Ich frag ja nur.",
      ...FINAL_TEST(["„Ich stelle ja nur Fragen“", "Emotionalisierung", "KI-Fälschungen", "Seriös"], "„Ich stelle ja nur Fragen“"),
      exp: "Ein Verdacht ohne Beleg, als Frage verpackt." },
    { author: "Lindenhain Heute", handle: "@lindenhain_heute", color: "#5A6890",
      text: "Klimawandel: Forscherin und Blogger im Streitgespräch – wer hat recht?",
      ...FINAL_TEST(["Falsche Ausgewogenheit", "Angriff auf die Person", "Falsches Dilemma", "Seriös"], "Falsche Ausgewogenheit"),
      exp: "Eine gut belegte Wissenschaft und eine Einzelmeinung werden als gleichwertig präsentiert." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Wahlergebnis: Beteiligung 64 %. Alle Ergebnisse nach Stimmbezirken auf unserer Seite. Fragen beantwortet das Wahlamt.",
      ...FINAL_TEST(["Rosinenpicken", "Irreführende Diagramme", "Fake-Accounts", "Seriös"], "Seriös"),
      exp: "Vollständig, mit Quelle und Ansprechpartner." },
  ],
};

/* ------------------------------------------------------------
   Epilog – bei Sonnenaufgang
   ------------------------------------------------------------ */
export const EPILOG = {
  id: "epilog", campaign: 5, n: 5, type: "story",
  title: "Epilog: Sonnenaufgang",
  kicker: "Epilog",
  forceTheme: "day",
  focusables: ["lot", "cafe", "buergerhaus", "rathaus"],
  scene: [
    { who: "Erzähler", text: "Ein Morgen im Frühling. Die Sonne kommt über den Funkturm.", focus: "funkturm" },
    { who: "Erzähler", text: "Im Garten auf der Freifläche gießt Ilse die Tomaten. Daneben übt jemand auf dem Skateboard.", focus: "lot" },
    { who: "Erzähler", text: "In der Bäckerei streiten zwei über das Hallenbad. Herr Yılmaz stellt ihnen Kaffee hin.", focus: "cafe" },
    { who: "Erzähler", text: "Lindenhain ist nicht perfekt. Aber es redet miteinander.", focus: "buergerhaus" },
  ],
  summary(progress, chapters) {
    const c5 = chapters.filter(c => c.campaign === 5 && c.type !== "story" && progress.chapters[c.id]?.vals);
    const stars = c5.reduce((a, c) => a + (progress.chapters[c.id].lastStars || 1), 0);
    const all = chapters.filter(c => c.type !== "story" && progress.chapters[c.id]?.best != null);
    const tests = all.reduce((a, c) => [a[0] + progress.chapters[c.id].best, a[1] + c.test.length], [0, 0]);
    const strong = stars >= c5.length * 4;
    return {
      lightsOff: false,
      lead: strong
        ? "Die Fenster sind offen. „Lindenhain Wahrheit“ postet noch – aber kaum jemand teilt es."
        : "„Lindenhain Wahrheit“ postet noch, und manche teilen es. Aber immer mehr fragen erst: Wer steckt dahinter?",
      stats: [
        { label: "Techniken", value: String(progress.learned.length), sub: "durchschaut" },
        { label: "Erkannt", value: tests[1] ? Math.round(tests[0] / tests[1] * 100) + " %" : "–", sub: "in allen Tests" },
      ],
      peopleTitle: "Ein Jahr später",
      people: [
        { who: "ilse", text: "Gibt im Garten einen Kurs: „Gärtnern und Gerüchte – beides braucht Geduld.“" },
        { who: "deniz", text: "Macht mit der Jugendgruppe Clips: „Find den Trick“. Einer hatte 10.000 Aufrufe." },
        { who: "kessler", text: "Die Rundschau hat wieder mehr Abonnenten. Die Schulreihe läuft im dritten Jahr." },
        { who: "yilmaz", text: "Der Streittisch hat jetzt einen Ableger in Brückenau." },
      ],
      closing: "Du hast in diesem Spiel 19 Manipulationstechniken angewendet und durchschaut – und vier Werkzeuge kennengelernt, die dagegen helfen. Im Alltag begegnen sie dir selten so deutlich. Aber die wichtigste Frage passt immer: Wer will, dass ich das glaube – und warum? Spiel in ein paar Wochen ein Kapitel zur Auffrischung. Und zeig es jemandem.",
    };
  },
};
