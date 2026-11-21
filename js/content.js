// Inhalte – alle Orte, Personen, Accounts und Meldungen sind frei erfunden.
// Optionen haben eine Stufe: "fair", "subtil" (zugespitzt, aber auf Fakten gebaut) oder "plump".

export const CAMPAIGNS = [
  { n: 1, title: "Der Account", when: "Frühjahr", place: "cafe", teaser: "Eine Woche, ein Streitthema, zwei Konkurrenten.", chapters: 5 },
  { n: 2, title: "Die Kandidatur", when: "Zwei Jahre später", place: "rathaus", chapters: 5 },
  { n: 3, title: "Die Deutungshoheit", when: "Ein Jahr später", place: "verlag", chapters: 5 },
  { n: 4, title: "Der unsichtbare Einfluss", when: "Im Herbst darauf", place: "funkturm", chapters: 5 },
  { n: "Bilanz", title: "Was aus Lindenhain wurde", when: "Am selben Abend", bilanz: true },
  { n: 5, title: "Die Verteidigung", when: "Ein neuer Morgen", place: "buergerhaus", chapters: 5 },
];

export const PEOPLE = {
  ilse: { name: "Ilse", role: "71, Gartenverein" },
  deniz: { name: "Deniz", role: "24, Skatepark-Initiative" },
  yilmaz: { name: "Herr Yılmaz", role: "Bäckerei am Markt" },
  kessler: { name: "Frau Kessler", role: "Lindenhainer Rundschau" },
  moeller: { name: "Frau Möller", role: "Mutter von zwei Kindern" },
};

export const COMPETITORS = {
  live: { name: "Lindenhain Live", short: "Live", color: "#8a5a44" },
  rundschau: { name: "Lindenhainer Rundschau", short: "Rundschau", color: "#2f6b5f" },
};

// Alle Techniken des Spiels, nach Kampagnen (für die Wissenskarte)
export const TECHNIQUES = [
  { campaign: 1, list: ["Emotionalisierung", "Clickbait", "Falsche Experten", "Aus dem Zusammenhang", "Polarisierung"] },
  { campaign: 2, list: ["Strohmann", "Whataboutism", "Falsches Dilemma", "Angriff auf die Person", "Sündenbock"] },
  { campaign: 3, list: ["Rosinenpicken", "Irreführende Diagramme", "Framing", "„Ich stelle ja nur Fragen“", "Falsche Ausgewogenheit"] },
  { campaign: 4, list: ["Vorgetäuschte Bürgerbewegung", "Fake-Accounts", "Scheinbar unabhängige Nachrichtenseiten", "KI-Fälschungen"] },
];

export const CHAPTER1 = {
  id: "k1-1", campaign: 1, n: 1,
  start: { followers: 120, trust: 60, split: 10 },
  compStart: { a: 800, b: 2400 },
  rivals: {
    a: { name: "Lindenhain Live", initials: "LL", color: "#8a5a44", desc: "Reißerisch, wächst schnell" },
    b: { name: "Lindenhainer Rundschau", initials: "RS", color: "#2f6b5f", desc: "Lokalzeitung, wächst stetig" },
  },
  you: { name: "Lindenhain Aktuell", initials: "LA" },
  mainLabel: "Follower",
  pollLabels: { a: "Skatepark", b: "Garten" },
  // Zuwachs der Konkurrenten je Tag (Tag 1 bis 6)
  growth: { a: [190, 210, 200, 170, 280, 30], b: [40, 50, 60, 110, 50, 90] },
  milestones: [250, 500, 1000, 2000],
  starLimits: [500, 800, 1100, 1400], // ab hier 2, 3, 4, 5 Sterne
  focusables: ["lot", "buergerhaus", "cafe"],
  insight: "Die meisten Follower bringen die subtilen Varianten: Sie wirken, ohne aufzufallen. Genau deshalb sind sie im Alltag am schwersten zu erkennen.",
  title: "Eine Woche in Lindenhain",
  technique: "Emotionalisierung",
  scene: [
    { who: "Erzähler", text: "Lindenhain, im Frühjahr. 14.000 Einwohner, ein Marktplatz und eine Bäckerei, die jeder kennt.", focus: null },
    { who: "Erzähler", text: "Auf der letzten freien Fläche soll etwas Neues entstehen: ein Skatepark oder ein Seniorengarten. Im Herbst entscheiden die Bürger.", focus: "lot" },
    { who: "Erzähler", text: "Gestern Abend war im Bürgerhaus der erste Infoabend. Rund 80 Leute kamen. Die Stimmung war lebhaft, aber freundlich.", focus: "buergerhaus" },
    { who: "Erzähler", text: "Die Fakten: Der Skatepark kostet 180.000 Euro, der Garten 95.000. Laut Lärmgutachten werden die Grenzwerte eingehalten. Geöffnet wäre bis 22 Uhr.", focus: "lot" },
    { who: "Ilse, 71", text: "„Ich habe ehrlich gesagt Angst, dass es abends laut wird.“", focus: "buergerhaus" },
    { who: "Deniz, 24", text: "„Wir haben sonst nirgends einen Ort, an dem wir sein dürfen.“", focus: "buergerhaus" },
    { who: "Erzähler", text: "Und du? Du hast gerade den Account „Lindenhain Aktuell“ gestartet. 120 Follower. Zwei andere Seiten berichten auch über Lindenhain.", focus: "cafe" },
  ],
  mission: "Bis zur Ratssitzung in einer Woche: Hol so viele Follower wie möglich und lass die Konkurrenz hinter dir.",

  days: [
    {
      n: 1, title: "Der erste Beitrag",
      intro: "Dein erster Beitrag über den Infoabend. In Lindenhain reden heute alle darüber.",
      decisions: [
        {
          q: "Was stellst du in den Mittelpunkt?",
          opts: [
            { tier: "fair", text: "Infoabend zur Freifläche: Das sagen beide Seiten", f: 40, t: 4, s: 0,
              fb: "Ausgewogen und korrekt. Wer sich informieren will, ist hier richtig – viele sind es nicht." },
            { tier: "subtil", flag: "quote", text: "„Ich habe Angst, dass es abends laut wird“ – Lindenhainer Seniorin zum Skatepark", f: 260, t: 0, s: 5,
              fb: "Das Zitat ist echt. Aber du zeigst nur eine Seite und machst eine Sorge zur Schlagzeile. Angst klickt." },
            { tier: "plump", flag: "parties", text: "Angst in Lindenhain: Senioren fürchten nächtliche Skater-Partys!", f: 320, t: -7, s: 9,
              fb: "Viel Reichweite. Aber von „Partys“ war nie die Rede, und aus einer Seniorin werden „die Senioren“. Das lässt sich nachprüfen." },
          ],
        },
        {
          q: "Welches Bild kommt dazu?",
          photo: true,
          opts: [
            { tier: "fair", img: "hall", text: "Foto vom vollen Saal im Bürgerhaus", f: 20, t: 2, s: 0,
              fb: "Zeigt, was war: ein gut besuchter Abend. Unaufgeregt." },
            { tier: "subtil", flag: "ilsePhoto", img: "ilse", text: "Ilse in Nahaufnahme, nachdenklich", f: 170, t: 0, s: 3,
              fb: "Ein Gesicht mit Sorge berührt mehr als jeder Text. Das Foto ist echt – die Stimmung im Saal zeigt es nicht." },
            { tier: "plump", flag: "symbol", img: "tunnel", text: "Symbolbild: dunkle Unterführung mit Graffiti", f: 190, t: -5, s: 5,
              fb: "Erzeugt sofort Unbehagen. Nur: Das Bild ist nicht aus Lindenhain, und das steht nirgends dabei." },
          ],
        },
      ],
    },
    {
      n: 2, title: "Die Kommentare",
      intro: "Unter deinem Beitrag stehen 46 Kommentare. Die meisten sind sachlich, einige wütend. Du kannst einen anheften und eine Umfrage starten.",
      decisions: [
        {
          q: "Welchen Kommentar heftest du oben an?",
          opts: [
            { tier: "fair", text: "„Beide Seiten haben gute Argumente. Gibt es keinen Kompromiss?“", f: 20, t: 3, s: -2,
              fb: "Lädt zum Nachdenken ein. Für die Diskussion gut, für die Reichweite kaum." },
            { tier: "subtil", text: "„Mein Vater traut sich abends jetzt schon kaum noch raus.“", f: 150, t: 0, s: 4,
              fb: "Eine echte Sorge, persönlich erzählt. Sie hat mit dem Skatepark nichts zu tun – wirkt aber so." },
            { tier: "plump", text: "„Diese Skater haben doch vor gar nichts mehr Respekt!!“", f: 160, t: -6, s: 7,
              fb: "Wut heizt an. Aber eine Pauschalverurteilung oben anzuheften, fällt vielen negativ auf." },
          ],
        },
        {
          q: "Welche Umfrage startest du?",
          opts: [
            { tier: "fair", text: "„Skatepark, Seniorengarten oder beides – was meint ihr?“", f: 60, t: 2, s: -2,
              fb: "Offen gefragt, mit drei Möglichkeiten. Fair, aber wenig aufregend." },
            { tier: "subtil", text: "„Was ist euch wichtiger: Ruhe für die Älteren oder Spaß für die Jungen?“", f: 200, t: -1, s: 5,
              fb: "Klingt neutral, zwingt aber zur Wahl zwischen zwei Gruppen. Den Kompromiss gibt es in deiner Frage nicht." },
            { tier: "plump", text: "„Würdet ihr euch abends noch in den Park trauen?“", f: 200, t: -5, s: 7,
              fb: "Die Frage setzt Gefahr einfach voraus. Viele merken die Absicht." },
          ],
        },
      ],
    },
    {
      n: 3, title: "Die Kosten",
      intro: "Im Ratsdokument stehen die Zahlen: Skatepark 180.000 €, Seniorengarten 95.000 €. Beim Skatepark übernimmt das Land 60 %. Die Stadt zahlt dafür also 72.000 €.",
      decisions: [
        {
          q: "Wie berichtest du über die Kosten?",
          opts: [
            { tier: "fair", text: "„Skatepark 180.000 €, Garten 95.000 €. Das Land fördert den Skatepark mit 60 % – für die Stadt ist er damit günstiger.“", f: 60, t: 5, s: 0,
              fb: "Vollständig und überraschend. Gute Information – aber sie bestätigt niemandes Wut." },
            { tier: "subtil", flag: "costOmit", text: "„180.000 € für einen Skatepark – fast doppelt so viel wie der Garten.“", f: 230, t: -1, s: 4,
              fb: "Jede Zahl stimmt. Du lässt nur die Förderung weg. So entsteht ein falscher Eindruck, ohne dass du lügst." },
            { tier: "plump", flag: "costBlatant", text: "„180.000 € für Skater – während in der Grundschule die Heizung ausfällt!“", f: 250, t: -6, s: 7,
              fb: "Empörung durch Vergleich: Das eine hat mit dem anderen nichts zu tun. Und die Förderung fehlt auch." },
          ],
        },
      ],
    },
    { n: 4, title: "Der Faktencheck", dynamic: "factcheck" },
    {
      n: 5, title: "Die Konkurrenz",
      intro: "Lindenhain Live postet: „EILT: Skater sollen eine Rentnerin am Stadtpark angepöbelt haben! Polizei ermittelt!“ Eine Quelle nennt der Beitrag nicht. Er wurde in einer Stunde 300-mal geteilt.",
      decisions: [
        {
          q: "Was machst du?",
          opts: [
            { tier: "plump", flag: "sharedFake", text: "Teilen: „Unfassbar, wenn das stimmt!“", f: 260, t: -8, s: 7,
              fb: "„Wenn das stimmt“ klingt vorsichtig, verbreitet die Behauptung aber trotzdem. Kurzfristig bringt das viel." },
            { tier: "fair", text: "Abwarten und nichts posten", f: 0, t: 1, s: 0,
              fb: "Vorsichtig. Du verpasst die Welle – aber auch das Risiko." },
            { tier: "fair", flag: "verified", text: "Bei der Polizei nachfragen und dann berichten", f: 140, t: 6, s: -3,
              fb: "Die Pressestelle sagt: Es liegt keine Anzeige vor. Du bist die Erste, die das meldet – auch das bringt Reichweite." },
          ],
        },
      ],
    },
    { n: 6, title: "Eine Nachricht", dynamic: "ilse" },
  ],

  debrief: {
    what: "Eine Nachricht wird so gestaltet, dass sie starke Gefühle wie Angst, Wut oder Empörung auslöst. Das geht mit offener Übertreibung – aber am wirksamsten mit echten Fakten, die geschickt ausgewählt und zugespitzt werden.",
    why: "Beiträge mit starken Gefühlen werden häufiger geteilt. Wer sich ängstigt oder ärgert, prüft seltener, was fehlt.",
    signs: [
      "Eine Sorge oder ein Einzelfall wird zur Schlagzeile, die andere Seite fehlt",
      "Bilder zeigen Gefühl statt Zusammenhang, zum Beispiel ein Symbolbild ohne Hinweis",
      "Zahlen stimmen, aber Wichtiges fehlt, oder es wird mit etwas Unpassendem verglichen",
      "Fragen setzen Gefahr oder einen Gegensatz einfach voraus",
    ],
    question: "Welches Gefühl soll ich gerade haben – und was fehlt mir, um mir ein eigenes Bild zu machen?",
  },

  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Mieten in Lindenhain explodieren! 😱 Bald kann sich hier niemand mehr eine Wohnung leisten!",
      verdict: "manip", exp: "Starkes Gefühl, keine einzige Zahl. Um wie viel sind die Mieten gestiegen, und im Vergleich zu wann?" },
    { author: "Kino am Markt", handle: "@kino_am_markt", color: "#2f6b5f",
      text: "Schweren Herzens: Unser Kino schließt Ende März. Grund sind gestiegene Mietkosten. Am 28. März feiern wir mit euch Abschied.",
      verdict: "serios", exp: "Ein trauriges Thema, aber sachlich: Grund, Datum, Absender. Gefühl allein ist noch keine Manipulation." },
    { author: "Bürgerblick LH", handle: "@buergerblick_lh", color: "#6b4c7a",
      text: "Die neue Ampel an der Hauptstraße kostet 85.000 €. Zum Vergleich: Davon könnte man zwei Erzieherinnen ein Jahr lang bezahlen.",
      verdict: "manip", exp: "Die Zahl mag stimmen, aber der Vergleich soll empören. Ob die Ampel nötig ist, sagt der Beitrag nicht – und das Geld stammt aus ganz anderen Töpfen." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Die Grundschule Am Mühlbach bleibt wegen eines Heizungsdefekts bis Freitag geschlossen. Eine Notbetreuung ist im Gemeindehaus eingerichtet.",
      verdict: "serios", exp: "Klare Fakten: Ort, Zeitraum, Grund und eine Lösung. Keine Wertung." },
    { author: "Nachbarschaft Nord", handle: "@nachbarschaft_nord", color: "#7a6a2f",
      text: "„Ich lasse meine Kinder nicht mehr allein zur Schule gehen.“ Eine Mutter aus der Nordstadt über den neuen Radweg.",
      verdict: "manip", exp: "Ein echtes, bewegendes Zitat – aber nur eine Stimme und kein einziger Fakt zum Radweg. Gefühl ersetzt die Einordnung." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "Freibad: Die Sanierung wird 400.000 € teurer als geplant. Die Stadt nennt gestiegene Baukosten; der Rat entscheidet am Dienstag, ob sie trotzdem kommt.",
      verdict: "serios", exp: "Eine unangenehme Nachricht, aber mit Zahl, Grund und dem nächsten Schritt. So sieht Information aus." },
  ],
};

// Tag 4: Faktencheck. Was die Rundschau findet, hängt von deinen Beiträgen ab.
export function factcheckFindings(flags) {
  const f = [];
  if (flags.parties) f.push("Von „Partys“ war beim Infoabend keine Rede. Das Gutachten sieht Öffnungszeiten bis 22 Uhr vor.");
  if (flags.symbol) f.push("Das Foto zeigt nicht Lindenhain. Es ist ein Symbolbild ohne Hinweis.");
  if (flags.costOmit || flags.costBlatant) f.push("Das Land übernimmt 60 % des Skateparks. Für die Stadt kostet er 72.000 € – weniger als der Garten.");
  return f;
}

export function factcheckDecision(n) {
  return {
    q: "Wie reagierst du auf den Faktencheck?",
    opts: [
      { tier: "fair", text: "„Danke für die Hinweise, ich korrigiere das.“", f: -30 * n, t: 4 + 3 * n, s: -3,
        fb: "Ein paar Follower springen ab. Aber wer korrigiert, gewinnt Vertrauen – und Vertrauen bringt später Reichweite." },
      { tier: "fair", text: "Nicht reagieren", f: -90 * n, t: -5 * n, s: 2,
        fb: "Der Faktencheck wird geteilt, dein Schweigen fällt auf. Du verlierst Follower und Glaubwürdigkeit." },
      { tier: "plump", flag: "attacked", text: "„Die Rundschau will doch nur den Skatepark durchdrücken.“", f: 60, t: -14, s: 5,
        fb: "Deine Fans halten zu dir. Alle anderen sehen: Du gehst auf die Überbringerin los, statt auf die Fakten einzugehen." },
    ],
  };
}

// Tag 6: Ilse meldet sich – je nachdem, ob du sie gezeigt oder zitiert hast.
export const ILSE_DECISION = {
  message: { who: "ilse", text: "Ich habe gesagt, dass ich Angst vor Lärm habe. Jetzt schreiben mir Leute, ich sei gegen die Jugend. Bitte nimm mein Zitat und mein Foto raus." },
  q: "Ilse schreibt dir privat. Wie reagierst du?",
  opts: [
    { tier: "fair", flag: "ilseRemoved", text: "Zitat und Foto entfernen und dich entschuldigen", f: -20, t: 5, s: -2,
      fb: "Richtig so. Ilse ist erleichtert. Ein paar Leute fragen, warum der Beitrag geändert wurde." },
    { tier: "subtil", text: "Antworten: „Das hast du doch öffentlich gesagt.“ Alles bleibt.", f: 40, t: -3, s: 2,
      fb: "Formal stimmt das. Aber Ilse wollte ihre Sorge äußern, nicht Gesicht einer Kampagne werden." },
    { tier: "plump", text: "Neuer Beitrag: „Seniorin wird angefeindet, weil sie ihre Meinung sagt!“", f: 110, t: -8, s: 6,
      fb: "Du machst aus ihrer Bitte die nächste Schlagzeile. Das bringt Reichweite – und Ilse noch mehr Aufmerksamkeit, die sie nicht wollte." },
  ],
};

// Tag 4 und 6 von Kapitel 1 hängen von deinen Entscheidungen ab.
CHAPTER1.dynamic = {
  factcheck(run, fx) {
    const found = factcheckFindings(run.flags);
    if (found.length) {
      return {
        intro: "Frau Kessler von der Rundschau hat deine Beiträge geprüft und schreibt öffentlich:",
        events: [{ who: "kessler", items: found }],
        decisions: [factcheckDecision(found.length)],
      };
    }
    return {
      intro: "Frau Kessler von der Rundschau hat deine Beiträge geprüft.",
      events: [{ who: "kessler", text: "„Lindenhain Aktuell berichtet fair über die Freifläche. Lesenswert.“ Die Rundschau verlinkt dich.", fx: fx(100, 6, -1) }],
      decisions: [],
    };
  },
  ilse(run, fx) {
    const events = [];
    const lost = Math.round(run.comp.a * 0.35);
    run.comp.a -= lost;
    events.push({ who: "news", text: `Lindenhain Live verliert ${lost.toLocaleString("de-DE")} Follower.` });
    if (run.flags.sharedFake) events.push({ who: "you", text: "Du hattest die Meldung geteilt. Viele werfen dir vor, ein Gerücht verbreitet zu haben.", fx: fx(-200, -10, 0) });
    else if (run.flags.verified) events.push({ who: "you", text: "Deine Meldung von gestern wird jetzt überall zitiert: Du hattest zuerst nachgefragt.", fx: fx(90, 3, -1) });
    let decisions = [];
    if (run.flags.quote || run.flags.ilsePhoto) decisions = [ILSE_DECISION];
    else events.push({ who: "ilse", text: "Ilse kommentiert unter deinem Beitrag: „Endlich mal jemand, der beide Seiten zeigt.“", fx: fx(30, 2, 0) });
    return {
      intro: "Die Polizei stellt klar: Es gibt keine Anzeige, der Vorfall ist nicht bekannt. Lindenhain Live löscht den Beitrag kommentarlos.",
      events, decisions,
    };
  },
};

// Was die Woche mit den Menschen gemacht hat – bewusst realistisch und leise.
CHAPTER1.statuses = run => {
  const usedIlse = run.flags.quote || run.flags.ilsePhoto;
  const out = [];
  if (usedIlse && !run.flags.ilseRemoved) out.push({ who: "ilse", text: "Bekommt Nachrichten, sie sei gegen die Jugend. Geht zur nächsten Versammlung lieber nicht." });
  else if (usedIlse) out.push({ who: "ilse", text: "Ist erleichtert, dass ihr Zitat raus ist. Zur nächsten Versammlung will sie trotzdem gehen." });
  else if (run.split >= 40) out.push({ who: "ilse", text: "Wird beim Bäcker gefragt, auf welcher Seite sie steht. Sie sagt lieber nichts mehr dazu." });
  else out.push({ who: "ilse", text: "Freut sich auf die nächste Versammlung und hat Ideen für einen Kompromiss." });

  if (run.split >= 40) out.push({ who: "deniz", text: "Unter den Beiträgen der Initiative stehen gehässige Kommentare. Zwei Mitglieder sind ausgestiegen." });
  else if (run.split >= 25) out.push({ who: "deniz", text: "Muss sich in Kommentaren oft rechtfertigen. Die Initiative bleibt aber zusammen." });
  else out.push({ who: "deniz", text: "Sammelt Unterschriften und plant einen Tag der offenen Tür auf der Freifläche." });

  if (run.split >= 40) out.push({ who: "yilmaz", text: "In der Bäckerei wird nur noch über den Park gestritten. Er hat ein Schild aufgehängt: „Bitte keine Politik an der Theke.“" });
  else out.push({ who: "yilmaz", text: "Hört sich beide Seiten an und verkauft Kuchen für beide." });

  if (run.flags.attacked) out.push({ who: "kessler", text: "Hat in einem Kommentar über „Stimmungsmache im Netz“ geschrieben. Dein Account wird darin erwähnt." });
  else if (factcheckFindings(run.flags).length) out.push({ who: "kessler", text: "Prüft deine Beiträge jetzt regelmäßig." });
  else out.push({ who: "kessler", text: "Verlinkt dich gelegentlich als Quelle." });
  return out;
};
