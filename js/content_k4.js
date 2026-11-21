// Kampagne 1, Kapitel 4: Aus dem Zusammenhang gerissen.
// Alle Orte, Personen, Accounts und Meldungen sind frei erfunden.
import { countTier } from "./sim.js";

const READER = { name: "Leserzuschrift", initials: "L", color: "#5A6890" };

export const CHAPTER4 = {
  id: "k1-4", campaign: 1, n: 4,
  title: "Die Aufzeichnung",
  technique: "Aus dem Zusammenhang",
  start: { followers: 2500, trust: 60, split: 34 },
  compStart: { a: 2100, b: 3200 },
  rivals: {
    a: { name: "Lindenhain Live", initials: "LL", color: "#8a5a44", desc: "Schneidet Videos auf 15 Sekunden" },
    b: { name: "Lindenhainer Rundschau", initials: "RS", color: "#2f6b5f", desc: "Verlinkt die ganze Aufzeichnung" },
  },
  you: { name: "Lindenhain Aktuell", initials: "LA" },
  mainLabel: "Follower",
  pollLabels: { a: "Skatepark", b: "Garten" },
  growth: { a: [260, 260, 240, 120, 180], b: [40, 50, 40, 90, 60] },
  milestones: [2700, 2900, 3100, 3300],
  starLimits: [2850, 3050, 3180, 3280],
  focusables: ["buergerhaus", "cafe", "verlag"],
  insight: "Am meisten bringen echte Worte und echte Bilder, denen nur ein Stück fehlt. Wer selbst etwas hinzudichtet, wird schnell widerlegt.",

  scene: [
    { who: "Erzähler", text: "Mitte September. Die Stadt hat die Aufzeichnung des Bürgerforums online gestellt: 90 Minuten.", focus: "buergerhaus" },
    { who: "Erzähler", text: "Kaum jemand schaut 90 Minuten. Aber fast jeder schaut 15 Sekunden.", focus: "cafe" },
    { who: "Erzähler", text: "Deniz hat am Mikrofon gesprochen, Ilse gab der Rundschau ein Interview. Und es gibt Fotos.", focus: "verlag" },
    { who: "Erzähler", text: "Du hast jetzt 2.500 Follower. Diese Woche zählt jeder Ausschnitt.", focus: "cafe" },
  ],
  mission: "Fünf Tage, eine Aufzeichnung, ein Stapel Fotos: Mach daraus die Beiträge, über die Lindenhain spricht.",

  days: [
    {
      n: 1, title: "Minute 47",
      intro: "In Minute 47 spricht Deniz. Wörtlich: „Wir wollen einen Ort, an dem wir niemanden stören. Wenn es den nicht gibt, hängen wir halt wieder am Bahnhof rum – und darüber beschweren sich dann auch alle.“",
      decisions: [{
        q: "Welchen Ausschnitt schneidest du?",
        opts: [
          { tier: "fair", text: "Den ganzen Satz, 20 Sekunden", f: 50, t: 4, s: -1,
            fb: "Man versteht, was Deniz meint: Die Jugendlichen brauchen einen Ort. Kein Aufreger." },
          { tier: "subtil", flag: "clip", text: "Ab „hängen wir halt wieder am Bahnhof rum“ – 6 Sekunden", f: 240, t: -1, s: 4,
            fb: "Jedes Wort ist echt. Ohne den Anfang klingt es wie eine Drohung." },
          { tier: "plump", flag: "threat", text: "Der kurze Ausschnitt mit dem Titel: „Skater drohen der Stadt!“", f: 300, t: -6, s: 7,
            fb: "Ausschnitt plus Deutung. Deniz hat niemandem gedroht – aber so bleibt es hängen." },
        ],
      }],
    },
    {
      n: 2, title: "Das Leserfoto",
      intro: "Ein Leser schickt dir ein Foto. Es wird gerade in mehreren Gruppen geteilt.",
      decisions: [{
        message: { who: READER, text: "So sieht's an Skateplätzen aus! Hab ich in einer Gruppe gefunden.", label: "Nachricht" },
        image: "tunnel",
        context: "Eine Bildersuche zeigt: Das Foto stammt aus einer Unterführung in Brückenau, aufgenommen vor sieben Jahren. Dort gab es nie einen Skatepark.",
        q: "Was machst du mit dem Foto?",
        opts: [
          { tier: "fair", text: "Nicht posten – und dem Leser schreiben, woher das Foto stammt", f: 20, t: 3, s: -1,
            fb: "Ein irreführendes Foto weniger im Umlauf. Davon erfährt niemand, aber es ist richtig." },
          { tier: "subtil", flag: "photoVague", text: "Posten mit: „Wie sieht es an Skateplätzen eigentlich aus? Eure Meinung!“", f: 220, t: -1, s: 4,
            fb: "Du sagst nicht, dass es Lindenhain ist. Du sagst aber auch nicht, dass das Foto nichts mit Skateparks zu tun hat." },
          { tier: "plump", flag: "photoFake", text: "Posten mit: „So sieht es bald auf unserer Freifläche aus!“", f: 280, t: -6, s: 7,
            fb: "Ein Foto aus einer anderen Stadt, einem anderen Jahr, ohne Skatepark – als Zukunft Lindenhains." },
        ],
      }],
    },
    {
      n: 3, title: "Das Interview",
      intro: "Die Rundschau hat Ilse interviewt. Ein Satz daraus: „Ich habe nichts gegen die Jugendlichen. Aber nach zehn Uhr abends möchte ich meine Ruhe.“",
      decisions: [{
        q: "Wie zitierst du Ilse?",
        opts: [
          { tier: "fair", text: "Den ganzen Satz – mit Link zum Interview", f: 40, t: 4, s: -1,
            fb: "Ilses Anliegen wird klar: Nachtruhe, nicht gegen die Jugend. Das ist fast ein Kompromissangebot." },
          { tier: "subtil", flag: "ilseCut", text: "„Ilse (71): ‚Ich möchte meine Ruhe.‘“ als Überschrift über einem Skatepark-Beitrag", f: 210, t: -1, s: 4,
            fb: "Gekürzt, aber wörtlich. Aus „nach zehn Uhr“ wird „überhaupt“ – und Ilse wirkt, als wolle sie keine Jugendlichen in der Nähe." },
          { tier: "plump", flag: "ilseFake", text: "„Ilse: ‚Ich habe was gegen die Jugendlichen‘“ – das „nichts“ fällt beim Kürzen weg", f: 260, t: -8, s: 7,
            fb: "Das ist kein Ausschnitt mehr, das ist eine Fälschung. Sie hat das Gegenteil gesagt." },
        ],
      }],
    },
    { n: 4, title: "Das ganze Video", dynamic: "ganz" },
    { n: 5, title: "Das Foto vom Forum", dynamic: "foto" },
  ],

  dynamic: {
    ganz(run, fx) {
      const s = countTier(run, "subtil"), p = countTier(run, "plump");
      if (!s && !p) {
        return {
          intro: "In der Lindenhain-Gruppe kursieren viele Ausschnitte. Die Rundschau vergleicht sie mit den Originalen.",
          events: [{ who: "kessler", text: "„Bei Lindenhain Aktuell stimmen die Zitate mit dem Original überein. Bei anderen leider nicht.“", fx: fx(130, 6, -1) }],
        };
      }
      const items = [];
      if (run.flags.clip || run.flags.threat) items.push("Deniz hat die vollen 20 Sekunden aus Minute 47 gepostet. Darunter: „Hört euch den ganzen Satz an.“");
      if (run.flags.photoVague || run.flags.photoFake) items.push("Das Foto mit der Unterführung stammt aus Brückenau, sieben Jahre alt. Dort gab es nie einen Skatepark.");
      if (run.flags.ilseCut) items.push("Ilse hat der Rundschau gesagt: „Ich habe über die Nachtruhe gesprochen, nicht über die Jugendlichen.“");
      if (run.flags.ilseFake) items.push("Ilse hat in der Redaktion angerufen: „Das habe ich nie gesagt. Ich habe das Gegenteil gesagt.“");
      if (!items.length) items.push("Mehrere Beiträge von Lindenhain Aktuell zeigen nur Teile des Originals.");
      return {
        intro: "In der Lindenhain-Gruppe kursieren viele Ausschnitte. Die Rundschau vergleicht sie mit den Originalen.",
        events: [
          { who: "kessler", items },
          { who: "news", text: "Unter deinen Beiträgen posten Leser die Originale. Viele schreiben: „Schaut euch erst das Ganze an.“", fx: fx(-(30 * s + 75 * p), -(1 * s + 3 * p), 0) },
        ],
        decisions: [{
          q: "Wie reagierst du?",
          opts: [
            { tier: "fair", text: "Die Originale verlinken und schreiben, was in deinen Ausschnitten fehlte", f: -20, t: 5 + p, s: -2,
              fb: "Es kostet Follower. Aber Deniz und Ilse sehen, dass du es richtigstellst." },
            { tier: "subtil", text: "„Jeder kann sich ja das ganze Video ansehen.“", f: 20, t: -2, s: 1,
              fb: "Stimmt. Nur tut es kaum jemand – das weißt du." },
            { tier: "plump", flag: "doubleDown", text: "„Mein Ausschnitt zeigt, worauf es ankommt. Der Rest ist Gerede.“", f: 190, t: -7, s: 5,
              fb: "Du verteidigst den Schnitt. Deine Fans nicken, alle anderen haben das Original gesehen." },
          ],
        }],
      };
    },

    foto(run, fx) {
      const events = [];
      if (run.flags.doubleDown) events.push({ who: "deniz", text: "Deniz hat ein Video gemacht: links dein Ausschnitt, rechts das Original. Es wird tausendfach geteilt.", fx: fx(-160, -5, 0) });
      return {
        intro: "Vom Bürgerforum gibt es ein Foto: der volle Saal, Garten-Schilder links, Skatepark-Schilder rechts. Du hast außerdem noch ein Bild vom Infoabend vor einem Jahr.",
        events,
        decisions: [{
          q: "Welches Bild nimmst du für deinen Wochenrückblick?",
          photo: true,
          opts: [
            { tier: "fair", img: "hall", text: "Das ganze Foto: voller Saal, beide Seiten", f: 80, t: 4, s: -2,
              fb: "Zeigt, was war: Viele Leute, beide Seiten, alle da." },
            { tier: "subtil", img: "hallgreen", text: "Ausschnitt mit den Garten-Schildern: „Lindenhain hat sich entschieden“", f: 220, t: -1, s: 4,
              fb: "Der Ausschnitt ist echt. Die Hälfte des Saals fehlt – und damit die Hälfte der Stadt." },
            { tier: "plump", img: "hallempty", text: "Das alte Bild mit leeren Stühlen: „Kaum Interesse am Skatepark“", f: 250, t: -7, s: 6,
              fb: "Das Bild ist ein Jahr alt und zeigt einen anderen Abend. Wer beim Forum war, weiß es besser." },
          ],
        }],
      };
    },
  },

  statuses(run) {
    const out = [];
    if (run.flags.threat) out.push({ who: "deniz", text: "Wurde am Bahnhof auf „die Drohung“ angesprochen. Er hat das ganze Video seitdem immer auf dem Handy." });
    else if (run.flags.clip) out.push({ who: "deniz", text: "Ärgert sich über den Ausschnitt. Er überlegt, ob er im Forum überhaupt noch etwas sagt." });
    else out.push({ who: "deniz", text: "Hat viel Zuspruch für seinen Satz bekommen – auch von Gartenfreunden." });
    if (run.flags.ilseFake) out.push({ who: "ilse", text: "Wurde im Supermarkt von einem Jugendlichen angesprochen: „Was haben Sie gegen uns?“ Sie war den Tränen nahe." });
    else if (run.flags.ilseCut) out.push({ who: "ilse", text: "Muss ihren Satz ständig zu Ende sagen: „…nach zehn Uhr. Nach zehn Uhr!“" });
    else out.push({ who: "ilse", text: "Hat Deniz nach dem Forum gesagt: „Um zehn ist Schluss, dann habe ich nichts dagegen.“" });
    if (run.flags.photoVague || run.flags.photoFake) out.push({ who: "yilmaz", text: "Hat das Unterführungsfoto in drei Kundengesprächen gesehen. Er zeigt jedes Mal die Bildersuche." });
    else out.push({ who: "yilmaz", text: "Hat das Forum ganz gesehen und hängt den Link in der Bäckerei aus." });
    return out;
  },

  debrief: {
    what: "Aus dem Zusammenhang gerissen heißt: Ein echtes Zitat, Video oder Foto wird so gekürzt oder neu beschriftet, dass es etwas anderes zu sagen scheint.",
    why: "Wir trauen dem, was wir mit eigenen Augen sehen und Wort für Wort hören. Der Ausschnitt ist ja echt – nur das, was fehlt, sehen wir nicht.",
    signs: [
      "Sehr kurze Ausschnitte: Ein Satz fängt mitten drin an oder hört plötzlich auf.",
      "Fotos ohne Ort und Datum – oft hilft eine Bildersuche.",
      "Die Beschriftung deutet mehr, als das Bild zeigt.",
      "Ein Ausschnitt einer Menge („die Hälfte des Saals“) steht für das Ganze.",
    ],
    question: "Was kam davor und danach – und wo und wann ist das entstanden?",
  },

  test: [
    { author: "Lindenhain Live", handle: "@lindenhain_live", color: "#8a5a44",
      text: "Bürgermeisterin Albers im Rat: „Das Freibad schließen wir.“ 🎬 (Video, 4 Sekunden)",
      verdict: "manip", exp: "Der ganze Satz lautete: „Das Freibad schließen wir am 15. September für den Winter.“ Vier Sekunden reichen für eine falsche Meldung." },
    { author: "Stadt Lindenhain", handle: "@stadt_lindenhain", color: "#2f6b5f",
      text: "Die ganze Ratssitzung als Video – mit Zeitmarken zu jedem Tagesordnungspunkt.",
      verdict: "serios", exp: "Das Original, leicht zu durchsuchen. So kann jeder Ausschnitte selbst prüfen." },
    { author: "Lindenhain hilft", handle: "@lh_hilft", color: "#7a6a2f",
      text: "Heute Morgen in der Lindenstraße!! 🌊 Alles unter Wasser! Teilt das!",
      verdict: "manip", exp: "Kein Fotograf, kein Datum. Solche Bilder stammen oft von früher oder anderswo – eine Bildersuche zeigt es meist in Sekunden." },
    { author: "Lindenhainer Rundschau", handle: "@rundschau_lh", color: "#2f6b5f",
      text: "„Wir brauchen mehr Busse, aber nicht um jeden Preis“, sagt Verkehrsplaner Olaf Kern. Das ganze Interview findest du hier.",
      verdict: "serios", exp: "Der ganze Satz mit Einschränkung – und ein Link zum vollständigen Interview." },
    { author: "Klartext Lindenhain", handle: "@klartext_lh", color: "#8a5a44",
      text: "Schulleiter der Lindenschule gibt zu: „Die Kinder lernen hier nichts.“",
      verdict: "manip", exp: "Er sagte: „Ohne neue Bücher lernen die Kinder hier nichts – darum danken wir für die Spende.“ Ein Dank wurde zum Geständnis." },
    { author: "Stadtarchiv Lindenhain", handle: "@stadtarchiv_lh", color: "#2f6b5f",
      text: "So sah der Marktplatz 1965 aus (Foto: Stadtarchiv). Am Samstag eröffnet die Ausstellung im Rathaus.",
      verdict: "serios", exp: "Ein altes Foto – aber mit Jahr und Quelle beschriftet. Niemand wird getäuscht." },
  ],
};
