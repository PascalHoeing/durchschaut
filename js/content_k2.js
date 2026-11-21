// Kampagne 1, Kapitel 2: Clickbait und Neugierlücke.
// Alle Orte, Personen, Accounts und Meldungen sind frei erfunden.

const baitScore = run => run.picks.reduce((a, p) => a + (p.tier === "subtil" ? 1 : p.tier === "plump" ? 2 : 0), 0);

export const CHAPTER2 = {
  id: "k1-2", campaign: 1, n: 2,
  title: "Das Bodengutachten",
  technique: "Clickbait",
  start: { followers: 800, trust: 60, split: 25 },
  compStart: { live: 1200, rundschau: 2700 },
  compDesc: { live: "Reißerisch, will dieselben Klicks", rundschau: "Neu mit Bezahlschranke, wächst langsam" },
  growth: { live: [170, 190, 180, 150, 160, 40], rundschau: [30, 30, 40, 30, 40, 60] },
  milestones: [1000, 1500, 2000, 2500],
  starLimits: [1350, 1550, 1700, 1850],
  focusables: ["lot", "rathaus", "verlag", "cafe"],
  insight: "Am meisten bringen Überschriften, die neugierig machen, aber im Text halbwegs eingelöst werden. Wer ständig mehr verspricht, als drinsteht, verliert seine Leser.",

  scene: [
    { who: "Erzähler", text: "Zwei Wochen später. Der Bürgerentscheid über die Freifläche steht fest: Mitte September stimmt Lindenhain ab.", focus: "lot" },
    { who: "Erzähler", text: "Das Bauamt hat Bodenproben genommen. An einer Ecke sind die Bleiwerte leicht erhöht – vermutlich von einer Schlosserei, die dort vor 60 Jahren stand.", focus: "lot" },
    { who: "Erzähler", text: "Das Umweltamt sagt: Die Ecke wird vor jedem Bau abgetragen, das kostet etwa 15.000 Euro. Für Anwohner besteht keine Gefahr.", focus: "rathaus" },
    { who: "Erzähler", text: "Die Rundschau hat eine Bezahlschranke eingeführt. Viele ihrer Artikel lesen nur noch Abonnenten.", focus: "verlag" },
    { who: "Erzähler", text: "Und du? 800 Follower nach deiner ersten Woche. Jetzt geht es um Klicks.", focus: "cafe" },
  ],
  mission: "Eine Woche rund um das Bodengutachten: Hol die meisten Klicks und Follower. Lindenhain Live will dasselbe.",

  days: [
    {
      n: 1, title: "Das Gutachten",
      intro: "Das Bodengutachten ist öffentlich. Alle Zahlen stehen auf der Seite der Stadt – gelesen hat es kaum jemand.",
      decisions: [
        {
          q: "Welche Überschrift wählst du?",
          opts: [
            { tier: "fair", text: "Bodenproben auf der Freifläche: Werte an einer Ecke leicht erhöht, keine Gefahr", f: 50, t: 4, s: 0,
              fb: "Alles Wichtige steht schon in der Überschrift. Wer sie liest, muss nicht mehr klicken – und tut es auch nicht." },
            { tier: "subtil", flag: "cliffHead", text: "Bodenproben auf der Freifläche: Das Ergebnis überrascht", f: 260, t: 0, s: 2,
              fb: "Die Überschrift verrät nichts, also muss man klicken. Im Text steht die harmlose Wahrheit – die viele nie lesen." },
            { tier: "plump", flag: "gift", text: "Gift im Boden?! Was die Stadt über die Freifläche verschweigt 😱", f: 340, t: -7, s: 6,
              fb: "Fragezeichen, Emoji, „verschweigt“. Dabei hat die Stadt das Gutachten selbst veröffentlicht. Viele werden sich getäuscht fühlen." },
          ],
        },
        {
          q: "Welches Vorschaubild nimmst du?",
          photo: true,
          opts: [
            { tier: "fair", img: "map", text: "Plan der Freifläche, die betroffene Ecke markiert", f: 20, t: 2, s: 0,
              fb: "Zeigt sofort: Es geht um eine kleine Ecke. Klar – und wenig spannend." },
            { tier: "subtil", img: "glove", text: "Hand im Schutzhandschuh hält eine Bodenprobe", f: 170, t: 0, s: 2,
              fb: "Ein echtes Foto aus dem Labor. Es wirkt dramatischer, als der Befund ist." },
            { tier: "plump", flag: "skull", img: "skull", text: "Symbolbild: Warnschild mit Totenkopf", f: 210, t: -5, s: 4,
              fb: "Weckt Angst auf den ersten Blick. Ein solches Schild steht nirgends in Lindenhain." },
          ],
        },
      ],
    },
    { n: 2, title: "Die Klicks", dynamic: "klicks" },
    {
      n: 3, title: "Die Frage einer Mutter",
      intro: "Das Umweltamt hat inzwischen eine Karte veröffentlicht: Am Zaun der Freifläche ist der Boden unbelastet. Unter deinem Beitrag meldet sich eine Leserin.",
      decisions: [
        {
          message: { who: "moeller", text: "Meine Kinder spielen jeden Tag am Zaun der Freifläche. Ist das gefährlich?", label: "Kommentar" },
          q: "Wie gehst du mit der Frage um?",
          opts: [
            { tier: "fair", text: "Antworten: Laut Umweltamt ist der Boden am Zaun unbelastet. Dazu der Link zur Karte.", f: 40, t: 5, s: -2,
              fb: "Frage beantwortet, Sorge genommen. Die Diskussion ist damit vorbei – und mit ihr die Klicks." },
            { tier: "subtil", flag: "keepOpen", text: "„Gute Frage! Wir haken beim Umweltamt nach – bleibt dran.“", f: 170, t: -1, s: 2,
              fb: "Die Antwort gibt es längst. Du hältst die Frage offen, weil offene Fragen Leser halten." },
            { tier: "plump", flag: "mother", text: "Neuer Beitrag: „Mütter in Sorge: Spielen unsere Kinder auf Gift?“", f: 270, t: -5, s: 5,
              fb: "Aus einer Frage wird eine Schlagzeile, aus einer Mutter „die Mütter“. Frau Möller wurde nicht gefragt, ob du sie zitieren darfst." },
          ],
        },
      ],
    },
    {
      n: 4, title: "Hinter der Bezahlschranke",
      intro: "Die Rundschau veröffentlicht: „Bodengutachten: Was die Werte wirklich bedeuten.“ Frei lesbar sind nur Überschrift und erster Satz: „An einer Stelle der Freifläche wurden erhöhte Bleiwerte gemessen.“ Der Rest steht hinter der Bezahlschranke.",
      decisions: [
        {
          q: "Was machst du daraus?",
          opts: [
            { tier: "fair", text: "Zusammenfassen, was du aus dem Gutachten weißt, und die Rundschau als Quelle nennen", f: 80, t: 5, s: -1,
              fb: "Hilfreich für alle ohne Abo. Kein Aufreger, aber Leser merken sich, wo es verlässliche Infos gibt." },
            { tier: "subtil", flag: "paywallHead", text: "Nur den freien Satz zitieren: „Rundschau bestätigt: erhöhte Bleiwerte auf der Freifläche“", f: 210, t: -2, s: 3,
              fb: "Das Zitat stimmt wörtlich. Die Einordnung, die danach kommt, liest bei dir niemand." },
            { tier: "plump", flag: "paywallBait", text: "„Was die Rundschau dir nur gegen Geld verrät!“", f: 230, t: -6, s: 3,
              fb: "Neugier plus Ärger über die Bezahlschranke. Hinter deinem Link steht dann: nichts Neues." },
          ],
        },
      ],
    },
    { n: 5, title: "Die Enttäuschung", dynamic: "enttaeuschung" },
    { n: 6, title: "Die Ratssitzung", dynamic: "rat" },
  ],

  dynamic: {
    klicks(run) {
      let intro;
      if (run.flags.gift) intro = "Dein Beitrag wurde 4.000-mal geklickt. Darunter fragen viele: „Wo steht denn jetzt das mit dem Gift?“";
      else if (run.flags.cliffHead) intro = "Dein Beitrag wurde 3.200-mal geklickt. Die meisten lesen aber nur Überschrift und Bild.";
      else intro = "Dein Beitrag wurde 900-mal geklickt. Wer ihn liest, weiß danach Bescheid.";
      return {
        intro,
        decisions: [{
          q: "Wie machst du weiter?",
          opts: [
            { tier: "fair", text: "Kurze Zusammenfassung: was gefunden wurde, was es kostet, was jetzt passiert", f: 60, t: 3, s: -1,
              fb: "Sauber und vollständig. Wer es liest, ist informiert. Viele sind es nicht." },
            { tier: "subtil", flag: "cliff", text: "„Teil 2 morgen: Wer wusste schon länger davon?“", f: 220, t: -1, s: 3,
              fb: "Ein Cliffhanger hält die Leute bei dir. Die Frage unterstellt, dass jemand etwas verheimlicht hat – belegt ist das nicht." },
            { tier: "plump", flag: "list", text: "„7 Dinge, die du über die Freifläche wissen musst – Nr. 5 macht sprachlos“", f: 240, t: -4, s: 2,
              fb: "Listen klicken gut. Nr. 5 lautet: „Die Fläche ist 4.000 Quadratmeter groß.“ Sprachlos macht das niemanden." },
          ],
        }],
      };
    },
    enttaeuschung(run, fx) {
      const score = baitScore(run);
      if (!score) {
        return {
          intro: "Eine Leserin lobt dich in der Lindenhain-Gruppe.",
          events: [{ who: "news", text: "„Bei Lindenhain Aktuell steht drin, was draufsteht.“ Der Beitrag wird oft geteilt.", fx: fx(120, 6, -1) }],
        };
      }
      return {
        intro: "Eine Leserin schreibt einen Kommentar, der in der Lindenhain-Gruppe oft geteilt wird.",
        events: [{ who: "news", text: "„Ich klicke nicht mehr auf Lindenhain Aktuell. Die Überschriften versprechen immer mehr, als drinsteht.“", fx: fx(-25 * score, -2 * score, 0) }],
        decisions: [{
          q: "Wie reagierst du?",
          opts: [
            { tier: "fair", text: "„Ihr habt recht. Ab jetzt hält jede Überschrift, was sie verspricht.“", f: -20, t: 6 + score, s: -1,
              fb: "Ein ehrliches Eingeständnis. Es kostet ein paar Klicks, bringt dir aber Vertrauen zurück." },
            { tier: "subtil", text: "„Wir wollen doch nur, dass ihr gut informiert seid!“", f: 0, t: -2, s: 0,
              fb: "Klingt freundlich, geht aber nicht auf die Kritik ein. Die Leserin fühlt sich nicht ernst genommen." },
            { tier: "plump", flag: "teaseAgain", text: "Nachlegen: „Morgen enthüllen wir, wer hinter dem Gutachten steckt.“", f: 170, t: -7, s: 3,
              fb: "Die nächste Neugierlücke. Nur: Hinter dem Gutachten steckt das Bauamt. Was willst du morgen enthüllen?" },
          ],
        }],
      };
    },
    rat(run, fx) {
      const events = [];
      const lost = Math.round(run.comp.live * 0.2);
      run.comp.live -= lost;
      events.push({ who: "news", text: `Lindenhain Live hatte gepostet: „Freifläche verseucht – Abstimmung muss abgesagt werden!“ Nach der Sitzung ist klar: Das stimmt nicht. Live verliert ${lost.toLocaleString("de-DE")} Follower.` });
      if (run.flags.teaseAgain) events.push({ who: "you", text: "Deine angekündigte Enthüllung bleibt aus. In den Kommentaren fragen Leser, wo sie bleibt.", fx: fx(-120, -6, 0) });
      return {
        intro: "Ratssitzung: Das Umweltamt erklärt das Gutachten eine Stunde lang öffentlich. Die Ecke wird abgetragen, der Bürgerentscheid findet wie geplant statt.",
        events,
        decisions: [{
          q: "Dein letzter Beitrag der Woche:",
          opts: [
            { tier: "fair", text: "„Ratssitzung: Ecke wird saniert, Bürgerentscheid findet statt. Die wichtigsten Punkte.“", f: 90, t: 4, s: -2,
              fb: "Ein klarer Abschluss. Wer dir folgt, weiß jetzt alles Wichtige." },
            { tier: "subtil", text: "„Nach der Ratssitzung: Diese eine Frage bleibt offen“", f: 210, t: -1, s: 2,
              fb: "Die offene Frage ist der Zeitplan für die Bagger – harmlos. Die Überschrift klingt nach mehr." },
            { tier: "plump", text: "„Skandal-Sitzung: Stadt zahlt für Gift und schweigt!“", f: 260, t: -7, s: 6,
              fb: "Die Stadt hat eine Stunde lang öffentlich erklärt. Wer die Sitzung verfolgt hat, glaubt dir nichts mehr." },
          ],
        }],
      };
    },
  },

  statuses(run) {
    const out = [];
    if (run.flags.mother) out.push({ who: "moeller", text: "Ihre Frage wurde zur Schlagzeile. Seitdem fragen andere Eltern, ob die Kita umziehen muss. Sie bereut ihren Kommentar." });
    else if (run.flags.keepOpen) out.push({ who: "moeller", text: "Hat die Antwort schließlich selbst beim Umweltamt gefunden. Deine Seite liest sie nicht mehr." });
    else out.push({ who: "moeller", text: "Ist beruhigt und hat den Link zur Karte in der Elterngruppe geteilt." });

    if (run.flags.gift || run.flags.skull || run.flags.mother) out.push({ who: "deniz", text: "Muss erklären, dass der Skatepark nicht „auf Gift“ gebaut wird. Die Initiative druckt Flyer mit den Messwerten." });
    else out.push({ who: "deniz", text: "Ist froh, dass die Sanierung geklärt ist, und plant weiter." });

    if (run.flags.paywallBait) out.push({ who: "kessler", text: "Hat durchgesetzt, dass der Artikel frei lesbar wird – „damit niemand mehr damit Stimmung macht“." });
    else if (run.flags.paywallHead) out.push({ who: "kessler", text: "Ärgert sich, dass ihr erster Satz ohne Einordnung zitiert wurde." });
    else out.push({ who: "kessler", text: "Verlinkt deine Zusammenfassung für alle ohne Abo." });

    if (baitScore(run) >= 6) out.push({ who: "yilmaz", text: "Fragt Kunden an der Theke, ob sie mehr als die Überschrift gelesen haben." });
    else out.push({ who: "yilmaz", text: "Hat das Gutachten ausgedruckt und neben die Kasse gelegt." });
    return out;
  },

  debrief: {
    what: "Clickbait sind Überschriften und Vorschaubilder, die mehr versprechen, als der Inhalt hält. Sie öffnen eine Neugierlücke: Man muss klicken, um sie zu schließen.",
    why: "Eine offene Frage lässt uns nicht los. Und viele lesen nur die Überschrift – die bleibt dann als „Wissen“ hängen, auch wenn der Text etwas anderes sagt.",
    signs: [
      "Die Überschrift verrät nichts Konkretes: „Das Ergebnis überrascht“, „Was dann geschah …“",
      "Andeutungen, Fragen und Fortsetzungen: „Wer wusste davon?“, „Teil 2 morgen“",
      "Das Vorschaubild ist dramatischer als der Inhalt",
      "Listen mit Versprechen wie „Nr. 5 macht sprachlos“",
    ],
    question: "Was weiß ich nach der Überschrift wirklich – und steht im Text, was sie verspricht?",
  },

  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Was dieser Lindenhainer Bäcker jeden Morgen um 4 Uhr macht, wirst du nicht glauben! 😳",
      verdict: "manip", exp: "Reine Neugierlücke. Die Auflösung: Er backt Brötchen." },
    { author: "Stadtwerke Lindenhain", handle: "@stadtwerke_lh", color: "#2f6b5f",
      text: "Am Dienstag zwischen 9 und 12 Uhr gibt es in der Lindenstraße kein Wasser. Grund sind Arbeiten an einer Leitung.",
      verdict: "serios", exp: "Alles steht in der Meldung: wann, wo, warum. Niemand muss klicken, um es zu erfahren." },
    { author: "Gesund in Lindenhain", handle: "@gesund_lh", color: "#7a6a2f",
      text: "Neue Studie: Dieses Lebensmittel solltest du ab sofort meiden (Nr. 3 isst fast jeder)",
      verdict: "manip", exp: "Welche Studie? Welches Lebensmittel? Die Überschrift hält alles zurück, damit du klickst." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Bürgerentscheid zur Freifläche: Wo du abstimmen kannst und welche Unterlagen du brauchst – die Übersicht.",
      verdict: "serios", exp: "Die Überschrift sagt genau, was drinsteht. Neugier ja, aber keine leere Versprechung." },
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Freibad Lindenhain: Ist das das Ende? 😢",
      verdict: "manip", exp: "Im Text steht: Das Freibad schließt wie jedes Jahr im September für den Winter. Die Frage soll Angst und Neugier wecken." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Freibad schließt am 15. September für die Wintersaison. Ab Mai ist es wieder geöffnet.",
      verdict: "serios", exp: "Dieselbe Nachricht wie eben – nur ehrlich formuliert. So sieht es ohne Clickbait aus." },
  ],
};
