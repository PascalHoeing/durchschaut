// Kampagne 1, Kapitel 5: Polarisierung – die Woche vor dem Bürgerentscheid.
// Alle Orte, Personen, Accounts und Meldungen sind frei erfunden.
import { countTier } from "./sim.js";

const K1_TECH = ["Emotionalisierung", "Clickbait", "Falsche Experten", "Aus dem Zusammenhang", "Polarisierung", "Seriös"];

export const CHAPTER5 = {
  id: "k1-5", campaign: 1, n: 5,
  title: "Die letzte Woche",
  technique: "Polarisierung",
  start: { followers: 3200, trust: 60, split: 38 },
  compStart: { a: 2900, b: 3500 },
  rivals: {
    a: { name: "Lindenhain Live", initials: "LL", color: "#8a5a44", desc: "Setzt voll auf „wir gegen die“" },
    b: { name: "Lindenhainer Rundschau", initials: "RS", color: "#2f6b5f", desc: "Organisiert Gespräche" },
  },
  you: { name: "Lindenhain Aktuell", initials: "LA" },
  mainLabel: "Follower",
  pollLabels: { a: "Skatepark", b: "Garten" },
  pollTopic: "Freifläche",
  growth: { a: [280, 260, 280, 100, 60], b: [40, 50, 40, 120, 80] },
  milestones: [3400, 3700, 4000, 4300],
  starLimits: [3600, 3950, 4150, 4260],
  focusables: ["lot", "cafe", "verlag", "rathaus"],
  insight: "Am meisten bringen Lager mit Etiketten und Andeutungen gegen „die anderen“. Wer offen eine Gruppe beschuldigt, wird widerlegt – aber die Gräben bleiben.",

  scene: [
    { who: "Erzähler", text: "Noch fünf Tage bis zum Bürgerentscheid über die Freifläche.", focus: "lot" },
    { who: "Erzähler", text: "Fast alle in Lindenhain haben jetzt eine Meinung. Viele reden nur noch mit Leuten, die dieselbe haben.", focus: "cafe" },
    { who: "Erzähler", text: "Herr Yılmaz hat in der Bäckerei einen Zettel aufgehängt: „Hier wird nicht über die Freifläche gestritten.“", focus: "cafe" },
    { who: "Erzähler", text: "Am Sonntag stimmt die Stadt ab. Und du hast mehr Reichweite als je zuvor.", focus: "rathaus" },
  ],
  mission: "Die letzte Woche vor dem Bürgerentscheid: Werde die größte Seite der Stadt.",

  days: [
    {
      n: 1, title: "Zwei Lager",
      intro: "Die Stadt hat die Abstimmungsunterlagen verschickt. Die Frage: Soll auf der Freifläche ein Gemeinschaftsgarten entstehen – ja oder nein? Bei Nein plant die Stadt den Skatepark.",
      decisions: [
        {
          q: "Wie beschreibst du die Abstimmung?",
          opts: [
            { tier: "fair", text: "„Garten oder Skatepark: Was jede Variante bedeutet – Kosten, Lärm, Öffnungszeiten“", f: 60, t: 4, s: -2,
              fb: "Hilfreich für alle, die noch abwägen. Für Aufregung sorgt es nicht." },
            { tier: "subtil", flag: "camps", text: "„Ruhe oder Leben? Lindenhain muss sich entscheiden“", f: 240, t: -1, s: 5,
              fb: "Kein falsches Wort – aber zwei Lager mit Etikett. Wer für den Garten ist, ist jetzt „gegen Leben“, und umgekehrt." },
            { tier: "plump", flag: "ageWar", text: "„Alt gegen Jung: Wem gehört Lindenhain?“", f: 300, t: -5, s: 9,
              fb: "Aus einer Frage über eine Fläche wird ein Kampf der Generationen. Ilse und Deniz sind jetzt Gegner, ob sie wollen oder nicht." },
          ],
        },
        {
          q: "Welche Kommentare hebst du hervor?",
          opts: [
            { tier: "fair", text: "Die drei Kommentare mit den meisten Fragen – egal von welcher Seite", f: 30, t: 3, s: -1,
              fb: "Fragen statt Parolen. Die Diskussion bleibt ruhig." },
            { tier: "subtil", flag: "pinSharp", text: "Die schärfsten Kommentare beider Seiten nebeneinander", f: 190, t: 0, s: 4,
              fb: "Wirkt ausgewogen. Aber wer nur die lautesten Stimmen sieht, hält alle anderen für genauso." },
            { tier: "plump", text: "Nur Kommentare deiner Leser gegen „die anderen“", f: 220, t: -4, s: 6,
              fb: "Deine Leser fühlen sich bestätigt. Die anderen gehen." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Der Vorschlag",
      intro: "In der Bäckerei hängt ein neuer Zettel.",
      decisions: [{
        message: { who: "yilmaz", text: "Warum nicht beides? Ein Garten – und am Sportplatz eine kleine Skatefläche. Der Rat prüft das gerade.", label: "Zettel in der Bäckerei" },
        q: "Was machst du daraus?",
        opts: [
          { tier: "fair", flag: "compromise", text: "Den Vorschlag vorstellen: was er kosten würde und was der Rat prüft", f: 60, t: 4, s: -3,
            fb: "Viele lesen zum ersten Mal, dass es nicht nur entweder–oder gibt." },
          { tier: "subtil", text: "„Fauler Kompromiss? Am Ende ist keiner zufrieden“", f: 210, t: -1, s: 4,
            fb: "Eine Frage mit eingebauter Antwort. Wer den Vorschlag mochte, traut sich jetzt nicht mehr, es zu sagen." },
          { tier: "plump", text: "„Wer jetzt einknickt, hat schon verloren!“", f: 240, t: -5, s: 7,
            fb: "Kompromiss wird zu Verrat. Damit hat der Vorschlag keine Chance mehr." },
        ],
      }],
    },
    {
      n: 3, title: "Die Plakate",
      intro: "In der Nacht wurden an der Freifläche Plakate der Gartenfreunde heruntergerissen. Wer oder was dahintersteckt, weiß niemand.",
      decisions: [{
        q: "Wie berichtest du?",
        opts: [
          { tier: "fair", text: "„Plakate an der Freifläche beschädigt – Ursache unklar“", f: 50, t: 3, s: -1,
            fb: "Du schreibst, was man weiß. Und was man nicht weiß." },
          { tier: "subtil", flag: "hint", text: "„Plakate beschädigt – nicht weit vom Treffpunkt der Skater“", f: 230, t: -2, s: 6,
            fb: "Der Ort stimmt. Die Andeutung macht den Rest – ohne dass du jemanden beschuldigst." },
          { tier: "plump", flag: "blame", text: "„Skater zerstören Garten-Plakate!“", f: 290, t: -7, s: 9,
            fb: "Es gibt keinen Hinweis auf die Skater. Du machst eine ganze Gruppe für etwas verantwortlich, das niemand gesehen hat." },
        ],
      }],
    },
    { n: 4, title: "Das Gespräch", where: "Bäckerei", dynamic: "gespraech" },
    { n: 5, title: "Der Bürgerentscheid", where: "Rathaus", dynamic: "entscheid" },
  ],

  dynamic: {
    gespraech(run, fx) {
      const s = countTier(run, "subtil"), p = countTier(run, "plump");
      const events = [];
      events.push({ who: "news", text: "Ein Anwohner hat die Nacht gefilmt: Der Sturm hat die Plakate von den Bauzäunen gerissen." });
      if (run.flags.blame || run.flags.hint) events.push({ who: "deniz", text: "„Wir wurden zwei Tage lang beschuldigt. Für einen Sturm.“ Sein Beitrag wird oft geteilt.", fx: fx(run.flags.blame ? -200 : -80, run.flags.blame ? -7 : -3, 0) });
      if (s + p >= 3) events.push({ who: "news", text: "Mehrere Leser schreiben, deine Seite mache die Stimmung in der Stadt schlechter. Einige entfolgen.", fx: fx(-(15 * s + 40 * p), -2, 0) });
      return {
        intro: "Die Rundschau hat Ilse und Deniz an einen Tisch gesetzt – in der Bäckerei von Herrn Yılmaz. Eine Stunde reden sie. Sie sind sich in mehr einig, als beide dachten: Nachtruhe ab 22 Uhr, ein Platz für die Jugendlichen.",
        events,
        decisions: [{
          q: "Was machst du aus dem Gespräch?",
          opts: [
            { tier: "fair", text: "Teilen: „Ilse und Deniz sind sich in mehr einig, als man denkt“", f: 80, t: 5, s: -4,
              fb: "Viele sehen zum ersten Mal: Die „Gegner“ verstehen sich." },
            { tier: "subtil", text: "Nur den Moment teilen, in dem die beiden sich widersprechen", f: 200, t: -2, s: 4,
              fb: "Der Moment war echt, er dauerte 30 Sekunden. Die restlichen 59 Minuten fehlen." },
            { tier: "plump", text: "„Inszeniertes Kuschelgespräch – die Rundschau will euch einlullen“", f: 230, t: -6, s: 6,
              fb: "Du erklärst eine Verständigung zur Täuschung. Damit bleiben die Lager unter sich." },
          ],
        }],
      };
    },

    entscheid(run, fx) {
      let mood;
      if (run.split >= 60) mood = "Am Rathaus wird gebuht. In der Gruppe der Initiative ist von „Rentnersieg“ die Rede, in der Gartengruppe von „Krawallmachern“. Den Vorschlag einer Skatefläche am Sportplatz erwähnt niemand mehr.";
      else if (run.split >= 42) mood = "Die Stimmung ist angespannt. Beide Seiten bleiben unter sich. Der Vorschlag einer Skatefläche am Sportplatz liegt im Rat – ohne große Unterstützung.";
      else mood = "Ilse und Deniz geben vor dem Rathaus ein gemeinsames Statement: Der Garten kommt, und beide setzen sich im Rat für die Skatefläche am Sportplatz ein.";
      return {
        intro: "Sonntagabend. Ergebnis des Bürgerentscheids: 54 % stimmen für den Gemeinschaftsgarten, 46 % dagegen. Beteiligung: 61 %.",
        events: [{ who: "news", text: mood }],
        decisions: [{
          q: "Dein Beitrag zum Ergebnis:",
          opts: [
            { tier: "fair", text: "„Der Garten kommt. Wie es jetzt weitergeht – auch für die Skater“", f: 90, t: 4, s: -4,
              fb: "Ein Ergebnis, kein Sieg. Du zeigst, was als Nächstes kommt." },
            { tier: "subtil", text: "„Lindenhain ist gespalten wie nie“", f: 200, t: -1, s: 5,
              fb: "Eine Beschreibung, die sich selbst erfüllt. Wer das liest, glaubt, dass es keine Brücken mehr gibt." },
            { tier: "plump", text: "„Die Alten haben gewonnen. Die Jugend zählt in Lindenhain nichts.“", f: 250, t: -6, s: 9,
              fb: "54 zu 46, über alle Altersgruppen verteilt. Aber das Bild „Alt gegen Jung“ bleibt jetzt in vielen Köpfen." },
          ],
        }],
      };
    },
  },

  statuses(run) {
    const out = [];
    if (run.split >= 60) {
      out.push({ who: "deniz", text: "Die Initiative hat sich aufgelöst. Die Jugendlichen treffen sich wieder am Bahnhof." });
      out.push({ who: "ilse", text: "Freut sich über den Garten. Aber wenn Jugendliche vorbeigehen, schaut sie weg – und die schauen zurück." });
    } else if (run.split >= 42) {
      out.push({ who: "deniz", text: "Kämpft im Rat für die Skatefläche am Sportplatz. Es geht langsam voran." });
      out.push({ who: "ilse", text: "Grüßt Deniz, wenn sie ihn sieht. Mehr nicht." });
    } else {
      out.push({ who: "deniz", text: "Hat mit Ilse einen Antrag für die Skatefläche am Sportplatz geschrieben. Der Rat stimmt im Herbst ab." });
      out.push({ who: "ilse", text: "Hat Deniz eingeladen, im Garten ein Beet für die Initiative anzulegen." });
    }
    if (run.flags.blame) out.push({ who: "yilmaz", text: "Hat den Zettel in der Bäckerei ausgetauscht: „Erst nachdenken, dann posten.“" });
    else out.push({ who: "yilmaz", text: "Hat seinen Zettel abgenommen. „Jetzt darf hier wieder geredet werden.“" });
    return out;
  },

  debrief: {
    what: "Polarisierung macht aus Meinungsverschiedenheiten zwei feste Lager: wir gegen die. Zwischentöne und Kompromisse verschwinden.",
    why: "Zugehörigkeit fühlt sich gut an, und ein gemeinsamer Gegner schweißt zusammen. Wer erst in einem Lager steht, glaubt den eigenen Leuten mehr – und den anderen fast nichts.",
    signs: [
      "Etiketten für Gruppen: „die Alten“, „die Krawallmacher“, „die da oben“.",
      "Nur zwei Möglichkeiten, Kompromisse gelten als Schwäche oder Verrat.",
      "Die lautesten Stimmen stehen für alle.",
      "Andeutungen gegen „die anderen“, ohne Beleg.",
    ],
    question: "Gibt es hier wirklich nur zwei Seiten – und kenne ich jemanden von der anderen?",
  },

  // Kampagnen-Abschlusstest: Welche Technik steckt dahinter?
  test: [
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Autofahrer gegen Radfahrer: In Lindenhain gibt es nur noch zwei Sorten Menschen. Auf welcher Seite stehst du?",
      choices: K1_TECH, answer: "Polarisierung", exp: "Zwei Lager, eine Aufforderung, sich einzuordnen. Die meisten fahren mal Rad, mal Auto." },
    { author: "Lindenhain hilft", handle: "@lh_hilft", color: "#7a6a2f",
      text: "Dieses Bild bricht einem das Herz 💔 Die alte Kastanie am Markt soll weg. Teilt, wenn ihr noch ein Herz habt!",
      choices: K1_TECH, answer: "Emotionalisierung", exp: "Gefühl statt Information. Warum der Baum weg soll – er ist innen hohl und kann umstürzen – steht nirgends." },
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Was gestern im Rathaus passiert ist, wird dich sprachlos machen 😳",
      choices: K1_TECH, answer: "Clickbait", exp: "Eine Neugierlücke ohne jeden Inhalt. Passiert ist: eine neue Parkordnung." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Tuning-Profi Marco (80.000 Follower) erklärt, warum die neue Kläranlage unser Wasser verschlechtert.",
      choices: K1_TECH, answer: "Falsche Experten", exp: "Viele Follower, aber kein Fachwissen über Abwasser. Reichweite ist keine Fachkenntnis." },
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Feuerwehrchef gibt zu: „Wir sind nicht vorbereitet.“ 😨",
      choices: K1_TECH, answer: "Aus dem Zusammenhang", exp: "Der ganze Satz: „Auf so wenige Einsätze wie dieses Jahr sind wir nicht vorbereitet – wir haben zu viel Zeit zum Üben.“ Ein Scherz wurde zum Geständnis." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Ergebnis des Bürgerentscheids: 54 % für den Gemeinschaftsgarten, 46 % dagegen, Beteiligung 61 %. Alle Zahlen nach Stimmbezirken auf unserer Seite.",
      choices: K1_TECH, answer: "Seriös", exp: "Zahlen, Quelle, Details zum Nachprüfen. Keine Wertung, kein Lager." },
  ],
};
