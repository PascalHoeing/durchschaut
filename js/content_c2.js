// Kampagne 2: Die Kandidatur – Scheinargumente im Wahlkampf.
// Alle Orte, Personen, Gruppen und Aussagen sind frei erfunden. Keine echten Parteien.
import { checkDay, person } from "./common.js";

const JANA = person("Jana Wolff · Lokalsender", "JW", "#7A5FA8");
const MAX = person("Max Ebert · Podcast", "ME", "#3E8A8A");
const HOLL = person("Kämmerer Hollmann", "KH", "#6A7FA8");
const ELTERN = person("Elternbeirat Kita Lindenweg", "EB", "#B0705A");

const BASE = {
  campaign: 2,
  rivals: {
    a: { name: "Petra Albers", initials: "PA", color: "#4E7A9E", desc: "Amtsinhaberin, parteilos, ruhig und bekannt" },
    b: { name: "Tobias Rehm", initials: "TR", color: "#9E6A3E", desc: "Freie Wählergemeinschaft, angriffslustig" },
  },
  rivalsTitle: "Die Mitbewerber",
  you: { name: "Du (parteilos)", initials: "Du" },
  mainLabel: "Stimmen",
  mainHint: "so viele würden dich laut Umfrage wählen",
  weekTitle: "Die Umfrage",
  verdicts: [
    "Wenig Zuspruch.",
    "Mäßiger Zuspruch – viele sind skeptisch.",
    "Ordentlich – man nimmt dich ernst.",
    "Stark. Viele trauen dir das Amt zu.",
    "Herausragend. Du bestimmst den Wahlkampf.",
  ],
  focusables: ["rathaus", "funkturm", "verlag", "cafe", "buergerhaus"],
};

const C2_TECH = ["Strohmann", "Whataboutism", "Falsches Dilemma", "Angriff auf die Person", "Sündenbock", "Seriös"];

/* ------------------------------------------------------------
   Kapitel 1: Strohmann
   ------------------------------------------------------------ */
export const C2K1 = {
  ...BASE, id: "k2-1", n: 1,
  title: "Die Talkshow",
  technique: "Strohmann",
  start: { followers: 2000, trust: 60, split: 20 },
  compStart: { a: 3800, b: 2800 },
  growth: { a: [60, 60, 40, 60], b: [150, 160, 60, 120] },
  milestones: [2200, 2400, 2600, 2800],
  starLimits: [2400, 2500, 2620, 2720],
  insight: "Am meisten bringt es, die Position der anderen nur ein Stück zu verschieben – so, dass sie noch wiedererkennbar ist. Völlig erfundene Positionen fallen auf.",
  scene: [
    { who: "Erzähler", text: "Zwei Jahre später. Im Herbst wählt Lindenhain eine neue Bürgermeisterin oder einen neuen Bürgermeister.", focus: "rathaus" },
    { who: "Erzähler", text: "Petra Albers ist seit acht Jahren im Amt, parteilos. Tobias Rehm tritt für die Freie Wählergemeinschaft an.", focus: "rathaus" },
    { who: "Erzähler", text: "Und du: Deine Seite hat dich bekannt gemacht. Jetzt kandidierst du – ohne Partei.", focus: "cafe" },
    { who: "Erzähler", text: "Erster Termin: die Talkshow „Lindenhain im Gespräch“ im Lokalsender. Alle drei an einem Tisch.", focus: "funkturm" },
  ],
  mission: "Vier Tage bis zur ersten Umfrage: Hol so viele Stimmen wie möglich – gegen eine Amtsinhaberin und einen Herausforderer.",
  days: [
    {
      n: 1, title: "Die Talkshow", where: "Lokalsender",
      intro: "Moderatorin Jana Wolff fragt nach der Innenstadt.",
      decisions: [
        {
          message: { who: "b", text: "Ich will die Marktstraße samstags für Autos sperren. Als Versuch, ein Jahr lang. Dann sehen wir, ob es dem Handel hilft.", label: "in der Talkshow" },
          q: "Wie antwortest du?",
          opts: [
            { tier: "fair", text: "„Ein Versuch ist eine Idee. Ich frage mich, wo dann die Lieferwagen halten.“", f: 60, t: 4, s: -1,
              fb: "Du gehst auf seinen echten Vorschlag ein und stellst eine berechtigte Frage. Sachlich, aber unspektakulär." },
            { tier: "subtil", flag: "straw1", text: "„Herr Rehm will also die Autos aus der Innenstadt verbannen. Wie kommen dann Ältere zum Arzt?“", f: 230, t: -1, s: 3,
              fb: "Rehm sprach von Samstagen und einem Versuch. Du antwortest auf eine viel radikalere Forderung – die sich leichter angreifen lässt." },
            { tier: "plump", flag: "straw1p", text: "„Rehm will Lindenhain autofrei machen und den Handel ruinieren!“", f: 280, t: -6, s: 6,
              fb: "Davon hat er nichts gesagt. Wer die Sendung gesehen hat, merkt das sofort." },
          ],
        },
        {
          message: { who: "a", text: "Das Hallenbad sanieren wir in drei Schritten bis 2030: erst das Dach, dann die Becken, dann die Technik.", label: "in der Talkshow" },
          q: "Und dazu?",
          opts: [
            { tier: "fair", text: "„Drei Schritte klingen vernünftig. Bleibt das Bad währenddessen offen?“", f: 50, t: 3, s: 0,
              fb: "Eine echte Nachfrage. Albers muss sie beantworten – das ist gut für die Zuschauer." },
            { tier: "subtil", flag: "straw2", text: "„Frau Albers findet also, dass das Bad noch sechs Jahre warten kann.“", f: 210, t: -1, s: 3,
              fb: "Sie hat einen Plan vorgestellt. Du machst daraus Untätigkeit." },
            { tier: "plump", flag: "straw2p", text: "„Frau Albers lässt das Bad verfallen!“", f: 250, t: -5, s: 5,
              fb: "Ein Satz, der zu ihrem Plan in keiner Weise passt. Sie lächelt nur." },
          ],
        },
      ],
    },
    { n: 2, title: "Die Ausschnitte", dynamic: "clips" },
    { n: 3, title: "Was sie wirklich sagten", dynamic: "check" },
    {
      n: 4, title: "Der Flyer",
      intro: "Morgen erscheint die erste Umfrage. Heute gehen deine Flyer in den Druck.",
      decisions: [{
        q: "Was steht in großen Buchstaben auf dem Flyer?",
        opts: [
          { tier: "fair", text: "„Drei Ideen für die Innenstadt – und was sie kosten“", f: 90, t: 4, s: -2,
            fb: "Du wirbst mit deinen Ideen, nicht mit den Fehlern anderer." },
          { tier: "subtil", text: "„Während andere Autos verbannen wollen, kümmere ich mich um euch.“", f: 220, t: -1, s: 3,
            fb: "Der Strohmann ist jetzt gedruckt. Viele, die die Sendung nicht gesehen haben, halten ihn für Rehms Position." },
          { tier: "plump", text: "„Stoppt die Autohasser!“", f: 260, t: -6, s: 6,
            fb: "Aus einem Versuch an Samstagen wird ein Feindbild. Rehms Wähler fühlen sich beleidigt." },
        ],
      }],
    },
  ],
  dynamic: {
    clips(run, fx) {
      return {
        intro: "Der Lokalsender stellt Ausschnitte online. Auch Rehm hat etwas über dich gesagt.",
        events: [{ who: "b", text: "„Mein Gegenüber will offenbar, dass in Lindenhain alles so bleibt, wie es ist.“", label: "Ausschnitt", fx: fx(-40, 0, 2) }],
        decisions: [{
          q: "Rehm verzerrt deine Position. Wie reagierst du?",
          opts: [
            { tier: "fair", text: "Klarstellen, was du wirklich gesagt hast – mit dem Ausschnitt", f: 90, t: 4, s: -1,
              fb: "Du zeigst den Strohmann auf, ohne selbst einen zu bauen. Das kommt bei vielen gut an." },
            { tier: "subtil", flag: "escalate", text: "Kontern: „Herr Rehm hält jeden für rückständig, der ein Auto braucht.“", f: 200, t: -1, s: 3,
              fb: "Strohmann gegen Strohmann. Jetzt streiten zwei Kandidaten über Positionen, die keiner vertritt." },
            { tier: "plump", text: "„Rehm lügt. Wie immer.“", f: 220, t: -6, s: 5,
              fb: "Kein Argument, nur ein Vorwurf. Deine Fans teilen es, alle anderen wenden sich ab." },
          ],
        }],
      };
    },
    check(run, fx) {
      const items = [];
      if (run.flags.straw1 || run.flags.straw1p) items.push("Rehm hat keine autofreie Innenstadt gefordert, sondern einen Versuch: Marktstraße an Samstagen, ein Jahr.");
      if (run.flags.straw2 || run.flags.straw2p) items.push("Albers hat einen Zeitplan zur Sanierung des Bades vorgestellt, mit dem ersten Schritt im nächsten Jahr.");
      if (run.flags.escalate) items.push("Rehm hat nie gesagt, Autofahrer seien rückständig.");
      return checkDay(run, fx, {
        intro: "Jana Wolff zeigt in ihrer Sendung „Was sie wirklich sagten“ die Originalaussagen neben den Zitaten aus dem Wahlkampf.",
        who: JANA,
        praise: "„Wer wissen will, was die anderen wirklich vorschlagen, kann sich auf deine Zusammenfassungen verlassen.“",
        items,
        crowd: "Der Beitrag wird viel geteilt. Unter deinen Posts verlinken Leute die Originalstellen.",
        reply: [
          { text: "„Ich habe Herrn Rehm und Frau Albers verkürzt wiedergegeben. Hier ihre echten Vorschläge.“", fb: "Ein seltener Satz im Wahlkampf. Er kostet dich etwas – und bringt dir Respekt." },
          { text: "„Im Wahlkampf spitzt eben jeder zu.“", fb: "Stimmt sogar. Aber es beantwortet nicht, ob deine Zuspitzung fair war." },
          { text: "„Der Sender macht Wahlkampf für die anderen!“", fb: "Statt dich mit deinen Aussagen auseinanderzusetzen, greifst du den Sender an." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push(run.flags.straw1 || run.flags.straw1p
      ? { who: "b", text: "Muss in jedem Gespräch erklären, dass er keine Autos verbieten will. Sein Versuch an Samstagen ist kaum noch Thema." }
      : { who: "b", text: "Diskutiert seinen Samstagsversuch mit den Händlern. Einige sind dafür, einige dagegen." });
    out.push(run.flags.straw2 || run.flags.straw2p
      ? { who: "a", text: "Wird beim Bäcker gefragt, warum sie das Bad „verfallen lässt“. Sie zeigt den Zeitplan – aber der ist lang." }
      : { who: "a", text: "Hat ihren Zeitplan für das Bad ins Netz gestellt. Viele haben ihn gelesen." });
    out.push({ who: JANA, text: run.flags.doubleDown ? "Hat Beschwerden bekommen, sie sei parteiisch. Sie zeigt in der nächsten Sendung einfach wieder die Originale." : "Plant eine zweite Runde – diesmal mit Fragen aus dem Publikum." });
    return out;
  },
  debrief: {
    what: "Ein Strohmann ist eine verzerrte, meist übertriebene Version der Position des Gegenübers. Man widerlegt dann diese Version – nicht das, was wirklich gesagt wurde.",
    why: "Die echte Position ist oft vernünftig und schwer anzugreifen. Die verzerrte Version ist leicht zu widerlegen. Und wer das Original nicht kennt, hält den Strohmann für echt.",
    signs: [
      "Einleitungen wie „Sie wollen also …“ oder „Im Klartext heißt das …“.",
      "Aus einem Teil wird das Ganze: aus „samstags“ wird „immer“, aus „Versuch“ wird „Verbot“.",
      "Die widerlegte Position klingt so absurd, dass sie kaum jemand ernsthaft vertreten würde.",
      "Das Original wird nicht zitiert oder verlinkt.",
    ],
    question: "Hat die Person das wirklich so gesagt – und wie lautet ihr Vorschlag im Original?",
  },
  test: [
    { author: "Bürgerforum Lindenhain", handle: "@buergerforum_lh", color: "#8a5a44",
      text: "Die Stadträtin will mehr Radwege. Offenbar sollen wir alle unsere Autos verkaufen.",
      verdict: "manip", exp: "Mehr Radwege heißt nicht: keine Autos. Die Forderung wird ins Absurde verzerrt." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Rehm schlägt vor, die Marktstraße samstags ein Jahr lang zu sperren. Händler fürchten weniger Kundschaft, Anwohner hoffen auf Ruhe.",
      verdict: "serios", exp: "Der Vorschlag wird korrekt wiedergegeben, beide Reaktionen stehen daneben." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Wer gegen die neue Umgehungsstraße ist, will offenbar, dass unsere Kinder weiter im Lärm aufwachsen.",
      verdict: "manip", exp: "Gegner der Straße haben andere Gründe – Kosten, Natur, Alternativen. Ihnen wird ein Ziel unterstellt, das niemand hat." },
    { author: "Petra Albers", handle: "@albers_lh", color: "#4E7A9E",
      text: "Wenn ich Herrn Rehm richtig verstehe: Er will ein Jahr testen, ob weniger Autos am Samstag dem Handel helfen. Ich habe Zweifel – aus drei Gründen.",
      verdict: "serios", exp: "Sie gibt die Gegenposition fair wieder, bevor sie widerspricht. So sieht ein ehrlicher Streit aus." },
    { author: "Hundefreunde Lindenhain", handle: "@hundefreunde_lh", color: "#7a6a2f",
      text: "Der Naturschutzverein will Hunde aus dem Stadtpark verbannen! Als Nächstes verbieten sie wohl alle Haustiere.",
      verdict: "manip", exp: "Gefordert war eine Leinenpflicht von April bis Juli, wegen brütender Vögel. Daraus wird ein Verbot – und dann ein noch größeres." },
    { author: "Naturschutzverein Lindenhain", handle: "@natur_lh", color: "#2f6b5f",
      text: "Wir bitten um eine Leinenpflicht im Stadtpark von April bis Juli. In dieser Zeit brüten dort Vögel am Boden.",
      verdict: "serios", exp: "Die eigentliche Forderung: klar begrenzt und begründet." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 2: Whataboutism
   ------------------------------------------------------------ */
export const C2K2 = {
  ...BASE, id: "k2-2", n: 2,
  title: "Der Podcast",
  technique: "Whataboutism",
  start: { followers: 2700, trust: 58, split: 26 },
  compStart: { a: 4000, b: 3300 },
  growth: { a: [50, 40, 40, 50], b: [140, 130, 60, 100] },
  milestones: [2900, 3100, 3300, 3500],
  starLimits: [3150, 3210, 3320, 3420],
  insight: "Am meisten bringt ein Gegenvorwurf, der selbst stimmt. Dann redet niemand mehr über deine Frage – und dir kann keiner etwas Falsches nachweisen.",
  scene: [
    { who: "Erzähler", text: "Drei Wochen vor der Wahl. Der Podcast „Lindenhain hört zu“ lädt alle drei ein – einzeln.", focus: "verlag" },
    { who: "Erzähler", text: "Moderator Max Ebert ist gründlich. Er hat sich alte Beiträge und Ratsprotokolle angesehen.", focus: "verlag" },
    { who: "Erzähler", text: "Auch deine.", focus: "cafe" },
  ],
  mission: "Vier Tage, drei Podcastfolgen: Geh mit möglichst vielen Stimmen aus der Woche.",
  days: [
    {
      n: 1, title: "Deine Folge", where: "Podcast-Studio",
      intro: "Max Ebert hat seine Fragen vorbereitet.",
      decisions: [
        {
          message: { who: MAX, text: "Vor zwei Jahren hat Ihre Seite Beiträge veröffentlicht, die sich als falsch herausgestellt haben. Wie stehen Sie heute dazu?", label: "Frage" },
          q: "Was antwortest du?",
          opts: [
            { tier: "fair", text: "„Da habe ich Fehler gemacht. Heute prüfe ich gründlicher – und sage es, wenn ich falschliege.“", f: 70, t: 5, s: -1,
              fb: "Ein ehrliches Eingeständnis. Es ist kein schöner Moment, aber viele Hörer rechnen es dir an." },
            { tier: "subtil", flag: "what1", text: "„Berechtigte Frage. Aber reden wir auch über die Bahnhofsbaustelle, die unter Frau Albers zwei Jahre länger gedauert hat?“", f: 230, t: -1, s: 3,
              fb: "Die Baustelle hat wirklich länger gedauert. Mit der Frage hat sie nichts zu tun – aber jetzt redet niemand mehr über deine Beiträge." },
            { tier: "plump", flag: "what1p", text: "„Und was ist mit den Lügen der anderen? Darüber redet keiner!“", f: 270, t: -6, s: 6,
              fb: "Welche Lügen? Du nennst keine. Ebert fragt nach – du hast keine Antwort." },
          ],
        },
        {
          message: { who: MAX, text: "Sie versprechen ein neues Hallenbad. Woher kommt das Geld?", label: "Frage" },
          q: "Und hier?",
          opts: [
            { tier: "fair", text: "Die Rechnung offenlegen: Kredit, Fördermittel – und eine Lücke von zwei Millionen, die du noch nicht schließen kannst", f: 50, t: 5, s: 0,
              fb: "Ehrlich bis zur Lücke. Das ist unbequem, aber überprüfbar." },
            { tier: "subtil", flag: "what2", text: "„Frau Albers hat in acht Jahren gar kein Bad gebaut. Fragen Sie sie das auch?“", f: 210, t: -1, s: 3,
              fb: "Ein Gegenvorwurf statt einer Antwort. Die Frage nach dem Geld bleibt offen – aber das merkt kaum jemand." },
            { tier: "plump", text: "„Rehms Leute haben doch selbst Schulden gemacht! Warum fragt das niemand?“", f: 250, t: -5, s: 5,
              fb: "Rehm war nie im Rat. Der Vorwurf ist nicht nur ausweichend, sondern falsch." },
          ],
        },
      ],
    },
    { n: 2, title: "Die anderen Folgen", dynamic: "andere" },
    { n: 3, title: "Die Hörerfragen", dynamic: "check" },
    {
      n: 4, title: "Das Schlusswort",
      intro: "Max Ebert bittet alle drei um ein kurzes Schlusswort für die Sonderfolge.",
      decisions: [{
        q: "Dein Schlusswort:",
        opts: [
          { tier: "fair", text: "„Eine Sache, die ich anders machen würde – und drei, die ich besser machen will.“", f: 90, t: 4, s: -2,
            fb: "Selbstkritik und Plan. Die Hörer haben das Gefühl, mit dir reden zu können." },
          { tier: "subtil", text: "„Jeder hat Fehler gemacht. Meine waren die kleinsten.“", f: 210, t: -1, s: 3,
            fb: "Du gibst etwas zu und lenkst sofort auf die anderen. Das klingt bescheiden und ist doch ein Ausweichen." },
          { tier: "plump", text: "„Bevor ihr mich fragt, fragt die anderen!“", f: 240, t: -6, s: 5,
            fb: "Whataboutism als Programm. Wer sich nichts vorwerfen lassen will, wirkt, als hätte er etwas zu verbergen." },
        ],
      }],
    },
  ],
  dynamic: {
    andere(run, fx) {
      return {
        intro: "Die Folgen der anderen sind online. Auch Albers weicht aus.",
        events: [
          { who: MAX, text: "Frau Albers, die Bahnhofsbaustelle wurde 400.000 Euro teurer. Warum?", label: "Frage" },
          { who: "a", text: "„Fragen Sie mal Herrn Rehm, was seine Pläne kosten würden. Das Dreifache!“", label: "Antwort" },
        ],
        decisions: [{
          q: "Wie kommentierst du ihre Antwort?",
          opts: [
            { tier: "fair", text: "„Frau Albers ist der Frage ausgewichen. Die Mehrkosten sollte sie erklären.“", f: 80, t: 4, s: -1,
              fb: "Du benennst das Ausweichen, ohne selbst auszuweichen. Das ist ein starkes Argument." },
            { tier: "subtil", flag: "what3", text: "„Typisch Rathaus: immer auf andere zeigen.“", f: 190, t: -1, s: 3,
              fb: "Aus einer Antwort wird ein Muster für alle im Rathaus. Die konkreten 400.000 Euro geraten in den Hintergrund." },
            { tier: "plump", text: "„Albers und Rehm – einer schlimmer als der andere. Nur ich sage die Wahrheit.“", f: 220, t: -5, s: 5,
              fb: "Ein Satz, den jeder Kandidat sagen könnte. Er erklärt nichts." },
          ],
        }],
      };
    },
    check(run, fx) {
      const items = [];
      if (run.flags.what1 || run.flags.what1p) items.push("Auf die Frage nach den falschen Beiträgen kam von dir keine Antwort – nur ein Hinweis auf andere.");
      if (run.flags.what2) items.push("Wie das neue Bad bezahlt werden soll, hast du nicht gesagt.");
      if (run.flags.what3) items.push("„Typisch Rathaus“ ist kein Argument zu den Mehrkosten am Bahnhof.");
      return checkDay(run, fx, {
        intro: "In der Hörerfragen-Folge liest Max Ebert vor, was viele schreiben: „Warum hat keiner von euch auf die eigentliche Frage geantwortet?“",
        who: MAX,
        praise: "„Eine Kandidatur hat auf jede Frage geantwortet, auch auf die unangenehmen: deine.“",
        items,
        crowd: "Die Folge wird oft geteilt. „Ausweichen statt antworten“ wird zum geflügelten Wort im Wahlkampf.",
        reply: [
          { text: "Die offenen Fragen nachträglich beantworten – schriftlich, mit Zahlen", fb: "Spät, aber vollständig. Das bringt dir Glaubwürdigkeit zurück." },
          { text: "„Die anderen sind noch viel mehr ausgewichen.“", fb: "Ein Whataboutism über Whataboutism. Den hat jeder bemerkt." },
          { text: "„Der Podcast ist doch längst parteiisch!“", fb: "Du greifst den Moderator an statt die Fragen zu beantworten." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: MAX, text: run.picks.filter(p => p.tier !== "fair").length >= 3 ? "Hat eine Folge gemacht: „Wie man auf Fragen nicht antwortet“. Du kommst oft vor." : "Lobt die Offenheit der Kandidaten – bei dir am meisten." });
    out.push({ who: "a", text: run.flags.what1 || run.flags.what2 ? "Muss die Bahnhofsbaustelle in jeder Veranstaltung erklären. Über ihre Pläne redet kaum noch jemand." : "Hat die Mehrkosten am Bahnhof in einem Brief an alle Haushalte erklärt." });
    out.push({ who: "yilmaz", text: "Hat an der Theke ein Schild: „Erst antworten, dann fragen.“" });
    return out;
  },
  debrief: {
    what: "Whataboutism ist die Antwort auf Kritik mit einem Gegenvorwurf: „Und was ist mit …?“ Die eigentliche Frage bleibt unbeantwortet.",
    why: "Der Gegenvorwurf stimmt oft sogar. Er lenkt die Aufmerksamkeit um – und wer zuhört, beschäftigt sich mit dem neuen Thema statt mit dem alten.",
    signs: [
      "Auf eine Frage folgt „Und was ist mit …?“ oder „Fragen Sie mal die anderen.“",
      "Die Antwort hat mit der Frage nichts zu tun, klingt aber empört.",
      "Am Ende weißt du über die ursprüngliche Frage nicht mehr als vorher.",
      "Fehler werden mit den Fehlern anderer verrechnet.",
    ],
    question: "Ist meine Frage beantwortet – oder geht es plötzlich um etwas anderes?",
  },
  test: [
    { author: "Tobias Rehm", handle: "@rehm_lh", color: "#9E6A3E",
      text: "Mir wird vorgeworfen, meine Zahlen seien zu optimistisch. Was ist denn mit den Zahlen der Stadt beim Bahnhof?",
      verdict: "manip", exp: "Ob seine Zahlen stimmen, beantwortet er nicht. Er zeigt auf andere." },
    { author: "Petra Albers", handle: "@albers_lh", color: "#4E7A9E",
      text: "Die Bahnhofsbaustelle wurde 400.000 € teurer: Der Boden war schlechter als gedacht, die Stahlpreise stiegen. Das hätten wir früher sagen müssen.",
      verdict: "serios", exp: "Gründe, Zahl und ein eigenes Versäumnis. Kein Gegenvorwurf." },
    { author: "Sportverein Lindenhain", handle: "@sv_lh", color: "#7a6a2f",
      text: "Ja, unser Vereinsheim war im Sommer zu laut. Aber habt ihr mal gehört, wie laut der Schützenverein ist?",
      verdict: "manip", exp: "Der eigene Lärm wird mit fremdem Lärm verrechnet. Den Nachbarn hilft das nicht." },
    { author: "Stadtwerke Lindenhain", handle: "@stadtwerke_lh", color: "#2f6b5f",
      text: "Die Wasserrechnungen kamen zwei Wochen zu spät – ein Fehler in unserem System. Mahngebühren werden nicht erhoben.",
      verdict: "serios", exp: "Fehler benannt, Folge geregelt. So sieht eine Antwort aus." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Jetzt regen sich alle über unseren Beitrag auf. Wo war die Empörung, als die Rundschau sich verrechnet hat?",
      verdict: "manip", exp: "Ob der eigene Beitrag stimmte, bleibt offen. Stattdessen ein Fehler der anderen." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Korrektur: In unserem Artikel zum Haushalt stand 6 statt 8 Millionen. Wir haben das korrigiert und bitten um Entschuldigung.",
      verdict: "serios", exp: "Eine Korrektur ohne „aber die anderen“. Genau so geht man mit Fehlern um." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 3: Falsches Dilemma
   ------------------------------------------------------------ */
export const C2K3 = {
  ...BASE, id: "k2-3", n: 3,
  title: "Bad oder Kita",
  technique: "Falsches Dilemma",
  start: { followers: 3300, trust: 58, split: 30 },
  compStart: { a: 4200, b: 3800 },
  growth: { a: [40, 50, 120, 60], b: [130, 120, 40, 90] },
  milestones: [3500, 3700, 3900, 4100],
  starLimits: [3700, 3800, 3940, 4040],
  insight: "Am meisten bringt eine Entweder-oder-Frage, die sich wie gesunder Menschenverstand anhört. Wer die Alternativen verschweigt, muss sie nicht widerlegen.",
  scene: [
    { who: "Erzähler", text: "Zwei Wochen vor der Wahl. Der Kämmerer stellt den Haushalt für die nächsten fünf Jahre vor.", focus: "rathaus" },
    { who: "Erzähler", text: "Sechs Millionen Euro für Investitionen. Auf der Liste: Hallenbad, Kita-Erweiterung, Radwege, Feuerwehrhaus.", focus: "rathaus" },
    { who: "Erzähler", text: "Alles auf einmal geht nicht. Nacheinander schon – zumindest teilweise.", focus: "buergerhaus" },
  ],
  mission: "Vier Tage bis zum Podium: Mach aus dem Haushalt dein Wahlkampfthema – und hol Stimmen.",
  days: [
    {
      n: 1, title: "Der Haushalt",
      intro: "Kämmerer Hollmann erklärt: Bad und Kita gleichzeitig – das wird eng. Mit zwei Jahren Abstand geht beides.",
      decisions: [
        {
          q: "Wie fasst du die Lage zusammen?",
          opts: [
            { tier: "fair", text: "„Sechs Millionen, vier Projekte. Was geht gleichzeitig, was nacheinander?“", f: 60, t: 4, s: -1,
              fb: "Eine ehrliche Frage, die die Lage beschreibt. Klickt mäßig, informiert gut." },
            { tier: "subtil", flag: "dil1", text: "„Hallenbad oder Kita – Lindenhain muss sich entscheiden“", f: 230, t: -1, s: 4,
              fb: "Der Kämmerer hat gesagt: nacheinander geht beides. Du machst daraus ein Entweder-oder." },
            { tier: "plump", flag: "dil1p", text: "„Wer das Bad will, nimmt Kindern die Kitaplätze weg!“", f: 280, t: -6, s: 7,
              fb: "Du spielst Familien gegen Schwimmer aus – mit einem Vorwurf, der so nicht stimmt." },
          ],
        },
        {
          q: "Auf deinem Wahlstand liegt eine Umfragekarte. Welche Antworten bietest du an?",
          opts: [
            { tier: "fair", text: "Vier Möglichkeiten: Bad zuerst, Kita zuerst, beides gestreckt, etwas anderes", f: 40, t: 3, s: -1,
              fb: "Die Ergebnisse sind gemischt. Das ist ehrlich – und schlecht für eine Schlagzeile." },
            { tier: "subtil", flag: "poll2", text: "Zwei Kästchen: „Bad jetzt“ oder „Bad auf Jahre verschoben“", f: 190, t: -1, s: 3,
              fb: "„Gestreckt“ fehlt. 80 % kreuzen „Bad jetzt“ an – ein Ergebnis, das du gebaut hast." },
            { tier: "plump", text: "Eine Frage: „Bist du für Lindenhain oder gegen das Bad?“", f: 220, t: -5, s: 5,
              fb: "Wer das Bad nicht sofort will, ist „gegen Lindenhain“. Viele legen die Karte wieder hin." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Der Vorschlag aus Brückenau",
      intro: "Rehm stellt eine Idee vor: Lindenhain und das Nachbarstädtchen Brückenau bauen gemeinsam ein Bad – an der Stadtgrenze, 15 Minuten von beiden Zentren.",
      decisions: [{
        q: "Wie reagierst du?",
        opts: [
          { tier: "fair", text: "„Prüfenswert. Ich will wissen, was das für Schulen und den Bus bedeutet.“", f: 60, t: 4, s: -1,
            fb: "Ein ernster Vorschlag, ernst genommen. Sachlich – und für Rehm ein kleiner Punkt." },
          { tier: "subtil", flag: "dil2", text: "„Ein Bad in Brückenau heißt: Lindenhain gibt auf. Eigenes Bad oder gar keins?“", f: 220, t: -1, s: 4,
            fb: "Ein gemeinsames Bad ist eine dritte Möglichkeit. Du tust so, als gäbe es nur zwei." },
          { tier: "plump", flag: "dil2p", text: "„Rehm will unser Bad nach Brückenau verschenken!“", f: 260, t: -6, s: 6,
            fb: "Aus einem gemeinsamen Bad wird ein Geschenk an die Nachbarn. Das stimmt nicht." },
        ],
      }],
    },
    { n: 3, title: "Die Elternversammlung", dynamic: "check" },
    {
      n: 4, title: "Das Podium", where: "Bürgerhaus",
      intro: "Abschlusspodium im Bürgerhaus. Die Moderatorin fragt: „Was passiert zuerst – Bad oder Kita?“",
      decisions: [{
        q: "Deine Antwort:",
        opts: [
          { tier: "fair", text: "„Kita zuerst, dann das Bad – mit Zeitplan. Und ich prüfe Rehms Idee mit Brückenau.“", f: 100, t: 4, s: -2,
            fb: "Eine klare Reihenfolge und eine offene Tür. Das traut man einem Bürgermeister zu." },
          { tier: "subtil", text: "„Wer jetzt zögert, verliert beides.“", f: 220, t: -1, s: 3,
            fb: "Klingt entschlossen. Dass es Zwischenwege gibt, verschweigst du wieder." },
          { tier: "plump", text: "„Jetzt oder nie! Wer heute nicht für das Bad ist, wird es nie bekommen.“", f: 250, t: -5, s: 6,
            fb: "„Jetzt oder nie“ – nach einem Abend, an dem drei Zeitpläne vorgestellt wurden. Viele schütteln den Kopf." },
        ],
      }],
    },
  ],
  dynamic: {
    check(run, fx) {
      const items = [];
      if (run.flags.dil1 || run.flags.dil1p) items.push("Der Kämmerer hat nie gesagt „Bad oder Kita“, sondern: „Mit zwei Jahren Abstand geht beides.“");
      if (run.flags.poll2) items.push("Deine Umfragekarte bot nur zwei Antworten. Die häufigste Meinung im Saal – „beides, nacheinander“ – kam nicht vor.");
      if (run.flags.dil2 || run.flags.dil2p) items.push("Ein gemeinsames Bad mit Brückenau wäre eine dritte Möglichkeit, kein Aufgeben.");
      return checkDay(run, fx, {
        intro: "Der Elternbeirat der Kita Lindenweg lädt alle Kandidaten ein. Der Kämmerer erklärt noch einmal die Zahlen.",
        who: ELTERN,
        praise: "„Danke, dass Sie uns nicht gegen die Schwimmer ausgespielt haben. Wir wollen nämlich beides.“",
        items,
        crowd: "Die Eltern schreiben einen offenen Brief: „Wir lassen uns nicht gegen den Schwimmverein ausspielen.“ Er wird viel geteilt.",
        reply: [
          { text: "„Ich habe das zu einfach dargestellt. Es geht nacheinander – hier mein Zeitplan.“", fb: "Ein Rückzieher mit Plan. Die Eltern nicken." },
          { text: "„Am Ende muss man sich eben entscheiden.“", fb: "Ja – aber nicht zwischen zwei Möglichkeiten, wenn es vier gibt." },
          { text: "„Die Eltern werden von der Verwaltung vorgeschickt!“", fb: "Ein Vorwurf ohne Beleg. Die Eltern sind empört." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: ELTERN, text: run.flags.dil1p ? "Hat sich mit dem Schwimmverein zusammengesetzt: „Wir sind keine Gegner.“ Dich laden sie nicht mehr ein." : "Hat eine Liste mit Fragen an alle Kandidaten veröffentlicht." });
    out.push({ who: "b", text: run.flags.dil2 || run.flags.dil2p ? "Seine Brückenau-Idee gilt jetzt als „Aufgeben“. Er hält trotzdem daran fest." : "Spricht mit dem Bürgermeister von Brückenau über ein gemeinsames Bad." });
    out.push({ who: HOLL, text: "Hat eine Grafik veröffentlicht: Welche Projekte in welchem Jahr möglich sind. Sie hat drei Varianten." });
    return out;
  },
  debrief: {
    what: "Ein falsches Dilemma stellt nur zwei Möglichkeiten zur Wahl, obwohl es mehr gibt: Zwischenwege, Reihenfolgen, ganz andere Lösungen.",
    why: "Zwei Möglichkeiten sind leicht zu verstehen und erzeugen Druck. Wer die eine ablehnt, scheint automatisch für die andere zu sein.",
    signs: [
      "„Entweder … oder …“, „Wer nicht für X ist, ist für Y“.",
      "Zwischenlösungen, Reihenfolgen oder Kompromisse kommen nicht vor.",
      "Zeitdruck: „Jetzt oder nie.“",
      "Umfragen oder Fragen mit nur zwei Antworten.",
    ],
    question: "Gibt es wirklich nur diese zwei Möglichkeiten – oder fehlen welche?",
  },
  test: [
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Entweder wir bauen die Umgehungsstraße, oder die Innenstadt erstickt im Verkehr. Etwas anderes gibt es nicht.",
      verdict: "manip", exp: "Es gibt mehr Wege: Busse, Lieferzeiten, Tempo 30. Das Dilemma blendet sie aus." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Für die Verkehrsplanung prüfen wir vier Varianten – von einer Umgehungsstraße bis zu besseren Busverbindungen. Die Vor- und Nachteile stellen wir am 12. Mai vor.",
      verdict: "serios", exp: "Mehrere Varianten, offen vorgestellt. Kein künstliches Entweder-oder." },
    { author: "Gesund in Lindenhain", handle: "@gesund_lh", color: "#7a6a2f",
      text: "Du kannst weiter krank sein – oder endlich unser Kräuterpulver probieren. Deine Wahl!",
      verdict: "manip", exp: "Als gäbe es nur das Produkt oder Krankheit. Ärzte, Ruhe, andere Mittel kommen nicht vor." },
    { author: "Tobias Rehm", handle: "@rehm_lh", color: "#9E6A3E",
      text: "Wer für die Marktsperrung am Samstag ist, ist gegen unsere Händler.",
      verdict: "manip", exp: "Man kann für den Versuch sein und trotzdem die Händler unterstützen. Viele Händler sind sogar selbst dafür." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Bad oder Kita? Der Kämmerer sagt: beides, wenn die Projekte zwei Jahre auseinanderliegen. Eine Übersicht über die Varianten.",
      verdict: "serios", exp: "Die Überschrift stellt die Frage, der Text löst sie auf und zeigt die Möglichkeiten." },
    { author: "Feuerwehr Lindenhain", handle: "@feuerwehr_lh", color: "#2f6b5f",
      text: "Unser Haus ist 50 Jahre alt. Wir brauchen bis 2030 einen Neubau oder eine Sanierung – welche Lösung günstiger ist, prüft die Stadt.",
      verdict: "serios", exp: "Hier gibt es wirklich zwei Wege – und beide werden geprüft. Nicht jedes Entweder-oder ist falsch." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 4: Angriff auf die Person
   ------------------------------------------------------------ */
export const C2K4 = {
  ...BASE, id: "k2-4", n: 4,
  title: "Das Podium",
  technique: "Angriff auf die Person",
  start: { followers: 3900, trust: 57, split: 33 },
  compStart: { a: 4400, b: 4200 },
  growth: { a: [40, 60, 100, 50], b: [120, 100, 40, 80] },
  milestones: [4100, 4300, 4500, 4700],
  starLimits: [4200, 4290, 4420, 4520],
  insight: "Am meisten bringt eine persönliche Spitze, die wahr ist und nach Sachkritik klingt. Gerüchte und Beleidigungen schlagen zurück.",
  scene: [
    { who: "Erzähler", text: "Zehn Tage vor der Wahl. Die Umfragen zeigen: Es wird knapp zwischen allen dreien.", focus: "rathaus" },
    { who: "Erzähler", text: "Der Ton wird rauer. Heute Abend ist Podium der Rundschau im Verlagshaus.", focus: "verlag" },
    { who: "Erzähler", text: "Rehm hat einen durchgerechneten Plan für das neue Feuerwehrhaus mitgebracht. Er ist gut.", focus: "verlag" },
  ],
  mission: "Vier Tage, ein knappes Rennen: Hol die Stimmen, die dir fehlen.",
  days: [
    {
      n: 1, title: "Rehms Plan", where: "Verlagshaus",
      intro: "Rehm erklärt seinen Plan für das Feuerwehrhaus: günstiger als der Neubau, mit Fördergeld vom Land. Der Saal hört aufmerksam zu.",
      decisions: [
        {
          q: "Wie antwortest du?",
          opts: [
            { tier: "fair", text: "„Der Plan ist durchdacht. Ich zweifle nur an der Bauzeit – zwei Jahre sind sehr knapp.“", f: 60, t: 4, s: -1,
              fb: "Du erkennst an, was gut ist, und kritisierst, was du für falsch hältst. Das ist Debatte." },
            { tier: "subtil", flag: "ad1", text: "„Interessant, dass ausgerechnet jemand, dessen Firma pleiteging, uns Haushaltspläne erklärt.“", f: 240, t: -1, s: 4,
              fb: "Seine Firma ging vor zehn Jahren pleite – das stimmt. Mit dem Feuerwehrhaus hat es nichts zu tun. Aber jetzt denkt der Saal an die Pleite statt an den Plan." },
            { tier: "plump", flag: "ad1p", text: "„Ein Pleitier will unser Geld verwalten? Lächerlich.“", f: 280, t: -6, s: 7,
              fb: "Eine Beleidigung statt eines Arguments. Einige lachen, viele sind peinlich berührt." },
          ],
        },
        {
          message: { who: "a", text: "Die Verwaltung hat Herrn Rehms Zahlen gegengerechnet. Sie sind im Großen und Ganzen plausibel.", label: "auf dem Podium" },
          q: "Albers stützt Rehms Zahlen. Und jetzt?",
          opts: [
            { tier: "fair", text: "„Dann sollten wir über die Bauzeit reden, nicht über die Kosten.“", f: 50, t: 3, s: -1,
              fb: "Du nimmst die Prüfung ernst und gehst zum nächsten Punkt." },
            { tier: "subtil", flag: "ad2", text: "„Die Verwaltung, die Sie seit acht Jahren führen – natürlich rechnet die, wie es Ihnen passt.“", f: 200, t: -1, s: 3,
              fb: "Statt die Rechnung zu prüfen, stellst du die Rechnenden infrage. Belege hast du keine." },
            { tier: "plump", text: "„Frau Albers ist mit 63 einfach zu alt für Neues.“", f: 230, t: -6, s: 6,
              fb: "Ihr Alter sagt nichts über ihre Zahlen. Viele im Saal sind über 60 – und fühlen sich mitgemeint." },
          ],
        },
      ],
    },
    { n: 2, title: "Das Gerücht", dynamic: "geruecht" },
    { n: 3, title: "Die Rundschau fragt nach", dynamic: "check" },
    {
      n: 4, title: "Die letzte Debatte",
      intro: "Letzte Fernsehdebatte vor der Wahl. Jana Wolff fragt: „Was halten Sie von Ihren Mitbewerbern?“",
      decisions: [{
        q: "Deine Antwort:",
        opts: [
          { tier: "fair", text: "„Beide meinen es ernst mit der Stadt. Wir sind uns nur über den Weg uneinig – und zwar so: …“", f: 100, t: 4, s: -3,
            fb: "Respekt vor den Personen, Streit über die Sache. Viele Zuschauer atmen auf." },
          { tier: "subtil", text: "„Ich sage nichts über Personen. Aber jeder weiß, wer hier schon gescheitert ist.“", f: 220, t: -1, s: 4,
            fb: "Du kündigst an, nicht persönlich zu werden – und wirst es im selben Satz." },
          { tier: "plump", text: "„Eine, die zu alt ist, und einer, der pleite war. Das ist die Wahl.“", f: 250, t: -6, s: 7,
            fb: "Beide Personen auf ein Etikett reduziert. Über ihre Pläne sagt das nichts." },
        ],
      }],
    },
  ],
  dynamic: {
    geruecht(run, fx) {
      return {
        intro: "Ein anonymer Account behauptet, du hättest mit deiner früheren Seite „viel Geld mit Lügen“ verdient. Belege: keine. Das Gerücht verbreitet sich.",
        events: [{ who: "news", text: "Wer hinter dem Account steckt, ist unklar. In der Lindenhain-Gruppe wird darüber gestritten.", fx: fx(-90, -2, 3) }],
        decisions: [{
          q: "Wie reagierst du?",
          opts: [
            { tier: "fair", text: "Sachlich antworten: Was die Seite eingenommen hat, wofür – und die Zahlen offenlegen", f: 110, t: 5, s: -2,
              fb: "Transparenz gegen ein Gerücht. Es ist nicht sofort weg, aber es verliert Kraft." },
            { tier: "subtil", flag: "rumor1", text: "Ablenken: „Übrigens wohnt Herr Rehm gar nicht in Lindenhain, sondern knapp hinter der Grenze.“", f: 200, t: -1, s: 4,
              fb: "Es stimmt – er wohnt 300 Meter hinter der Stadtgrenze. Für die Wahl ist es egal. Aber das Thema ist gewechselt." },
            { tier: "plump", flag: "rumor2", text: "Zurückschlagen: andeuten, Albers' Mann habe Aufträge der Stadt bekommen", f: 240, t: -8, s: 7,
              fb: "Dafür gibt es keinen Beleg. Du machst genau das, was der anonyme Account mit dir gemacht hat." },
          ],
        }],
      };
    },
    check(run, fx) {
      const items = [];
      if (run.flags.ad1 || run.flags.ad1p) items.push("Rehms Firmenpleite liegt zehn Jahre zurück. Seine Zahlen zum Feuerwehrhaus hat die Verwaltung als plausibel bestätigt.");
      if (run.flags.ad2) items.push("Für eine geschönte Rechnung der Verwaltung gibt es keinen Hinweis.");
      if (run.flags.rumor1) items.push("Rehm wohnt 300 Meter hinter der Stadtgrenze. Kandidieren darf er trotzdem.");
      if (run.flags.rumor2) items.push("Albers' Mann hat nie einen Auftrag der Stadt bekommen. Das Gerücht ist falsch.");
      return checkDay(run, fx, {
        intro: "Frau Kessler von der Rundschau schreibt: „Persönlich statt sachlich – ein Wahlkampf ohne Themen?“",
        who: "kessler",
        praise: "„Ein Kandidat bleibt bei den Themen, auch als es persönlich gegen ihn ging. Das sollte Schule machen.“",
        items,
        crowd: "Der Artikel wird zum Gesprächsthema. Viele schreiben: „Ich will wissen, was ihr vorhabt, nicht, was ihr voneinander haltet.“",
        reply: [
          { text: "„Ich bin persönlich geworden. Das war falsch. Zurück zu den Themen.“", fb: "Eine Entschuldigung kostet. Aber sie zeigt Größe – das merken sich die Leute." },
          { text: "„Persönliche Eigenschaften gehören auch zur Wahl.“", fb: "Manchmal ja. Aber die Pleite vor zehn Jahren sagt nichts über ein Feuerwehrhaus." },
          { text: "„Die Rundschau steckt mit Albers unter einer Decke!“", fb: "Noch ein Angriff auf Personen statt auf Argumente." },
        ],
      });
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: "b", text: run.flags.ad1 || run.flags.ad1p ? "Wird auf der Straße auf seine Pleite angesprochen. Sein Feuerwehrplan steht in keinem Bericht mehr." : "Sein Feuerwehrplan wird im Rat diskutiert, egal wer gewinnt." });
    out.push({ who: "a", text: run.flags.rumor2 ? "Hat Anzeige gegen Unbekannt erstattet. Ihr Mann geht nicht mehr zum Stammtisch." : "Sagt im Interview: „Ich habe mit beiden Mitbewerbern hart gestritten. Das gehört dazu.“" });
    out.push({ who: "kessler", text: "Hat eine Serie gestartet: „Die Pläne der Kandidaten – ohne die Kandidaten“." });
    return out;
  },
  debrief: {
    what: "Beim Angriff auf die Person wird nicht das Argument kritisiert, sondern der Mensch, der es vorbringt: seine Vergangenheit, sein Alter, sein Wohnort, sein Charakter.",
    why: "Personen sind leichter anzugreifen als gute Argumente. Wer einer Person misstraut, misstraut auch ihren Argumenten – selbst wenn sie stimmen.",
    signs: [
      "Die Antwort handelt von der Person, nicht vom Vorschlag.",
      "Wahre, aber unpassende Fakten: alte Fehler, Herkunft, Alter, Familie.",
      "Gerüchte ohne Beleg, oft von anonymen Accounts.",
      "„Ich sage ja nichts, aber …“ – und dann folgt doch etwas Persönliches.",
    ],
    question: "Wäre das Argument falsch, wenn es jemand anderes gesagt hätte?",
  },
  test: [
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Die Ärztin warnt vor zu viel Feinstaub an der Hauptstraße. Aber fährt sie nicht selbst einen großen Geländewagen?",
      verdict: "manip", exp: "Ihr Auto ändert nichts an den Messwerten. Kritisiert wird die Person, nicht die Warnung." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Rehms Plan für das Feuerwehrhaus: Die Verwaltung hält die Kosten für plausibel, die Bauzeit für zu knapp. Eine Analyse.",
      verdict: "serios", exp: "Der Plan wird geprüft – nicht die Person." },
    { author: "Bürgerforum Lindenhain", handle: "@buergerforum_lh", color: "#8a5a44",
      text: "Warum sollten wir auf eine Schülerin hören, die noch nie Steuern gezahlt hat? Ihr Vorschlag für mehr Busse ist naiv.",
      verdict: "manip", exp: "Ihr Alter sagt nichts darüber, ob mehr Busse sinnvoll sind. Das Argument wird gar nicht geprüft." },
    { author: "Petra Albers", handle: "@albers_lh", color: "#4E7A9E",
      text: "Herr Rehm hat zehn Jahre Erfahrung im Bau. Bei der Bauzeit für das Feuerwehrhaus glaube ich trotzdem, dass er sich irrt – hier ist warum.",
      verdict: "serios", exp: "Sie erkennt die Person an und streitet über die Sache." },
    { author: "Anonym_Lindenhain", handle: "@anonym_lh", color: "#5A6890",
      text: "Schon gewusst, mit wem der Kandidat befreundet ist? 👀 Fragt euch mal, warum.",
      verdict: "manip", exp: "Andeutung ohne Inhalt, von einem anonymen Account. Ziel ist Misstrauen gegen die Person." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Der Kandidat hat in seinem Programm angegeben, Bauingenieur zu sein. Er hat das Studium nicht abgeschlossen. Wir haben ihn um Stellungnahme gebeten.",
      verdict: "serios", exp: "Hier ist die Person das Thema – weil sie selbst etwas Falsches über sich angegeben hat. Das ist relevant und belegt." },
  ],
};

/* ------------------------------------------------------------
   Kapitel 5: Sündenbock – und die Wahl
   ------------------------------------------------------------ */
export const C2K5 = {
  ...BASE, id: "k2-5", n: 5,
  title: "Der Wahlabend",
  technique: "Sündenbock",
  weekTitle: "Das Wahlergebnis",
  start: { followers: 4500, trust: 57, split: 36 },
  compStart: { a: 4600, b: 4500 },
  growth: { a: [60, 40, 120, 0], b: [80, 80, 40, 0] },
  milestones: [4700, 4850, 5000, 5150],
  starLimits: [4800, 4880, 4960, 5020],
  insight: "Am meisten bringt ein Schuldiger, der ein kleines Stück Verantwortung trägt – dann klingt die Schuldzuweisung berechtigt. Wer offen eine Gruppe beschuldigt, trifft Menschen.",
  scene: [
    { who: "Erzähler", text: "Vier Tage vor der Wahl. Der Kämmerer meldet ein Loch im Haushalt: 800.000 Euro.", focus: "rathaus" },
    { who: "Erzähler", text: "Gründe: höhere Energiepreise, teurere Baustellen, weniger Gewerbesteuer. Keiner davon ist schnell erklärt.", focus: "rathaus" },
    { who: "Erzähler", text: "Die Stadt will wissen: Wer ist schuld? Und am Sonntag wird gewählt.", focus: "cafe" },
  ],
  mission: "Die letzten vier Tage: Gewinn die Wahl.",
  days: [
    {
      n: 1, title: "Das Loch",
      intro: "Kämmerer Hollmann legt die Zahlen vor: Energie +350.000 €, Baustellen +250.000 €, Gewerbesteuer −200.000 €.",
      decisions: [
        {
          q: "Wen machst du verantwortlich?",
          opts: [
            { tier: "fair", text: "Die Gründe nennen wie der Kämmerer – und sagen, wo du sparen würdest", f: 60, t: 4, s: -1,
              fb: "Drei Gründe, keiner davon spannend. Aber jeder kann es nachprüfen." },
            { tier: "subtil", flag: "goat1", text: "„Die Verwaltung hat das Loch viel zu spät bemerkt.“", f: 230, t: -1, s: 4,
              fb: "Die Meldung kam spät, das stimmt. Aber Energiepreise und Baukosten hat die Verwaltung nicht gemacht. Ein Teil wird zur ganzen Schuld." },
            { tier: "plump", flag: "goat2", text: "„Die Pendler aus Brückenau nutzen unsere Straßen und zahlen nichts – deshalb fehlt das Geld!“", f: 290, t: -6, s: 8,
              fb: "Die Pendler kommen in der Rechnung gar nicht vor. Du machst Menschen zu Schuldigen, die nichts damit zu tun haben." },
          ],
        },
        {
          message: { who: HOLL, text: "Der Radweg am Mühlbach wurde 120.000 € teurer, weil der Boden nachgebessert werden musste.", label: "Zahlen" },
          q: "Und der Radweg?",
          opts: [
            { tier: "fair", text: "„Mehrkosten durch den Boden – wie bei vielen Baustellen. Kein Grund für Ärger auf Radfahrer.“", f: 40, t: 3, s: -2,
              fb: "Du nimmst dem Thema die Spitze, bevor jemand sie benutzt." },
            { tier: "subtil", flag: "goat3", text: "„120.000 € mehr für Radfahrer – während das Bad verfällt.“", f: 200, t: -1, s: 4,
              fb: "Die Zahl stimmt. Aber jetzt sind die Radfahrer schuld – an einem Boden, den sie nicht gemacht haben." },
            { tier: "plump", flag: "goat4", text: "„Die Radfahrer-Lobby frisst unseren Haushalt!“", f: 250, t: -6, s: 7,
              fb: "Eine „Lobby“, die es nicht gibt, und ein Haushalt, den 120.000 € nicht „fressen“. Aber ein Feindbild ist geboren." },
          ],
        },
      ],
    },
    { n: 2, title: "Die Stimmung", dynamic: "stimmung" },
    { n: 3, title: "Die Rechnung", dynamic: "check" },
    { n: 4, title: "Der Wahlabend", where: "Rathaus", dynamic: "wahl" },
  ],
  dynamic: {
    stimmung(run, fx) {
      const events = [];
      if (run.flags.goat2) events.push({ who: "news", text: "An Autos mit Brückenauer Kennzeichen kleben Zettel: „Zahlt erst mal für unsere Straßen!“", fx: fx(0, -2, 4) });
      if (run.flags.goat3 || run.flags.goat4) events.push({ who: "news", text: "Am Mühlbach wird eine Radfahrerin angepöbelt: „Wegen euch gibt's kein Bad!“", fx: fx(0, -2, 4) });
      if (run.flags.goat1) events.push({ who: HOLL, text: "„Meine Leute werden auf der Straße beschimpft. Dabei haben sie das Loch gefunden.“" });
      return {
        intro: "Zwei Tage vor der Wahl. Der Haushalt ist das Thema in jeder Gruppe.",
        events,
        decisions: [{
          q: "Was postest du heute?",
          opts: [
            { tier: "fair", text: "„Niemand in Lindenhain ist schuld an Energiepreisen. Lasst uns über Lösungen reden.“", f: 90, t: 5, s: -4,
              fb: "Ein Satz, der die Luft rauslässt. Viele teilen ihn – auch Albers' Unterstützer." },
            { tier: "subtil", text: "„Ich sage nur, was viele denken.“", f: 200, t: -2, s: 4,
              fb: "Du übernimmst keine Verantwortung und befeuerst trotzdem den Ärger." },
            { tier: "plump", flag: "petition", text: "Unterschriftenliste starten: „Pendler sollen zahlen!“", f: 240, t: -6, s: 7,
              fb: "Aus einer Schuldzuweisung wird eine Kampagne gegen Nachbarn." },
          ],
        }],
      };
    },
    check(run, fx) {
      const items = [];
      if (run.flags.goat1) items.push("Die Verwaltung hat das Loch im Quartalsbericht gemeldet – wie vorgeschrieben. Verursacht hat sie es nicht.");
      if (run.flags.goat2 || run.flags.petition) items.push("Pendler aus Brückenau kaufen in Lindenhain ein. Die Gewerbesteuer der Läden am Markt hängt zu einem Viertel an ihnen.");
      if (run.flags.goat3 || run.flags.goat4) items.push("Die 120.000 € Mehrkosten am Radweg sind 15 % der Lücke. Grund war der Boden, nicht die Radfahrer.");
      return checkDay(run, fx, {
        intro: "Einen Tag vor der Wahl veröffentlichen Kämmerer und Rundschau gemeinsam die ganze Rechnung.",
        who: HOLL,
        praise: "„Es gab einen Kandidaten, der die Zahlen erklärt hat, statt Schuldige zu suchen. Das hat uns die Arbeit leichter gemacht.“",
        items,
        crowd: "Händler am Markt hängen ein Schild auf: „Wir leben auch von Brückenau.“ Es wird tausendfach geteilt.",
        reply: [
          { text: "„Ich habe Schuldige gesucht, wo es keine gibt. Entschuldigung an alle, die das abbekommen haben.“", fb: "Kurz vor der Wahl ein großer Schritt. Er kostet Stimmen – und bringt dir Respekt." },
          { text: "„Man wird ja wohl noch Fragen stellen dürfen.“", fb: "Du hast keine Fragen gestellt, sondern Schuldige benannt." },
          { text: "„Jetzt sollen wir auch noch dankbar sein? Die Pendler zahlen nichts!“", fb: "Du verteidigst die Schuldzuweisung gegen die Zahlen." },
        ],
      });
    },
    wahl(run, fx) {
      const all = [
        { id: "you", name: "Du", v: run.followers },
        { id: "a", name: "Petra Albers", v: run.comp.a },
        { id: "b", name: "Tobias Rehm", v: run.comp.b },
      ];
      const sum = all.reduce((x, y) => x + y.v, 0);
      all.forEach(x => { x.p = Math.round(x.v / sum * 100); });
      all.sort((x, y) => y.v - x.v);
      const youWin = all[0].id === "you";
      run.flags.won = youWin;
      const res = all.map(x => `${x.name} ${x.p} %`).join(", ");
      const text = youWin
        ? `Ergebnis: ${res}. In der Stichwahl zwei Wochen später gewinnst du knapp. Du wirst Stadtoberhaupt${run.split >= 50 ? " – in einer Stadt, in der viele kaum noch miteinander reden." : "."}`
        : `Ergebnis: ${res}. In der Stichwahl zwei Wochen später gewinnt ${all[0].name}. Du ziehst in den Stadtrat ein.`;
      return {
        intro: "Sonntagabend im Rathaus. Die Stimmen werden ausgezählt.",
        events: [{ who: "news", text }],
        decisions: [{
          q: youWin ? "Deine Rede am Wahlabend:" : "Dein Statement am Wahlabend:",
          opts: [
            { tier: "fair", text: "„Danke an alle – auch an Petra Albers und Tobias Rehm. Ich werde mit beiden zusammenarbeiten.“", f: 0, t: 5, s: -4,
              fb: "Eine Rede für die ganze Stadt. Sie entscheidet nicht die Wahl, aber den Ton danach." },
            { tier: "subtil", text: "„Lindenhain hat gegen das Weiter-so im Rathaus gestimmt.“", f: 0, t: -1, s: 3,
              fb: "Die Verwaltung muss auch nach der Wahl arbeiten. Sie hört jetzt, dass sie das Problem war." },
            { tier: "plump", text: "„Ohne die Pendler und die Radlobby wäre Lindenhain längst schuldenfrei!“", f: 0, t: -5, s: 7,
              fb: "Der Wahlkampf ist vorbei, das Feindbild bleibt." },
          ],
        }],
      };
    },
  },
  statuses(run) {
    const out = [];
    out.push({ who: run.flags.won ? "a" : "b", text: run.flags.won ? "Gratuliert dir und bietet an, dich einzuarbeiten." : "Sitzt mit dir im Stadtrat. Ihr grüßt euch." });
    out.push({ who: HOLL, text: run.flags.goat1 ? "Hat sich versetzen lassen. „Ich wollte nicht mehr der Sündenbock sein.“" : "Legt den Nachtragshaushalt vor. Er ist langweilig und ausgeglichen." });
    out.push({ who: "yilmaz", text: run.flags.goat2 || run.flags.petition ? "Ein Drittel seiner Kunden kommt aus Brückenau. Einige kommen nicht mehr." : "Verkauft samstags „Brückenauer Brötchen“ – als Gruß an die Nachbarn." });
    return out;
  },
  debrief: {
    what: "Ein Sündenbock ist eine Person oder Gruppe, die für ein Problem verantwortlich gemacht wird, das andere oder viele Ursachen hat.",
    why: "Komplizierte Probleme sind schwer auszuhalten. Ein Schuldiger macht es einfach – und gibt dem Ärger ein Ziel. Oft trifft es Gruppen, die sich schlecht wehren können.",
    signs: [
      "Ein Problem mit vielen Ursachen bekommt einen einzigen Schuldigen.",
      "Gruppen werden pauschal beschuldigt: „die Pendler“, „die Radfahrer“, „die Verwaltung“.",
      "Ein kleiner Anteil wird als Hauptursache dargestellt.",
      "Ärger richtet sich gegen Menschen, nicht gegen das Problem.",
    ],
    question: "Wie viel des Problems geht wirklich auf diese Gruppe zurück – und was sind die anderen Ursachen?",
  },
  // Kampagnen-Abschlusstest
  test: [
    { author: "Bürgerforum Lindenhain", handle: "@buergerforum_lh", color: "#8a5a44",
      text: "Die Busse sind ständig zu spät – wegen der vielen Schüler, die beim Einsteigen trödeln.",
      choices: C2_TECH, answer: "Sündenbock", exp: "Verspätungen haben viele Gründe: Baustellen, Fahrplan, Verkehr. Eine Gruppe wird pauschal verantwortlich gemacht." },
    { author: "Tobias Rehm", handle: "@rehm_lh", color: "#9E6A3E",
      text: "Frau Albers will also, dass die Innenstadt so leer bleibt, wie sie ist.",
      choices: C2_TECH, answer: "Strohmann", exp: "Albers hat andere Pläne für die Innenstadt. Ihr wird eine Position untergeschoben, die leicht zu kritisieren ist." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Entweder wir kürzen bei den Vereinen, oder die Grundsteuer steigt. Ihr habt die Wahl.",
      choices: C2_TECH, answer: "Falsches Dilemma", exp: "Es gibt weitere Wege: andere Ausgaben verschieben, Fördermittel, Gebühren. Nur zwei werden genannt." },
    { author: "Petra Albers", handle: "@albers_lh", color: "#4E7A9E",
      text: "Mir wird vorgeworfen, der Bahnhof sei zu teuer geworden. Und Herr Rehm? Hat er je eine Baustelle geleitet?",
      choices: C2_TECH, answer: "Whataboutism", exp: "Die Frage nach den Kosten bleibt offen. Stattdessen ein Gegenvorwurf." },
    { author: "Anonym_Lindenhain", handle: "@anonym_lh", color: "#5A6890",
      text: "Was der Kandidat über Schulen sagt, kann man vergessen. Der hat ja selbst keine Kinder.",
      choices: C2_TECH, answer: "Angriff auf die Person", exp: "Ob seine Vorschläge gut sind, hängt nicht davon ab, ob er Kinder hat." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Das Haushaltsloch von 800.000 € hat drei Ursachen: Energie (350.000 €), Baustellen (250.000 €), weniger Gewerbesteuer (200.000 €). Die Details stehen im Bericht.",
      choices: C2_TECH, answer: "Seriös", exp: "Alle Ursachen mit Anteilen, Quelle zum Nachlesen. Kein Schuldiger, kein Gegner." },
  ],
};
