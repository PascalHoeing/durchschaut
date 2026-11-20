// Tag/Nacht nach Gerätezeit – ohne Standort, ohne Internet.
// Ungefähre Sonnenauf- und -untergangszeiten für die Mitte Deutschlands,
// je Monat in lokaler Uhrzeit (inklusive Sommerzeit). Genau genug für die Stimmung.
const SUN = [
  // [Aufgang, Untergang] in Minuten nach Mitternacht
  [8 * 60 + 15, 16 * 60 + 45], // Januar
  [7 * 60 + 40, 17 * 60 + 35], // Februar
  [6 * 60 + 50, 18 * 60 + 25], // März
  [6 * 60 + 45, 20 * 60 + 10], // April
  [5 * 60 + 50, 20 * 60 + 55], // Mai
  [5 * 60 + 10, 21 * 60 + 35], // Juni
  [5 * 60 + 25, 21 * 60 + 30], // Juli
  [6 * 60 + 10, 20 * 60 + 45], // August
  [7 * 60 + 0, 19 * 60 + 40], // September
  [7 * 60 + 45, 18 * 60 + 30], // Oktober
  [7 * 60 + 40, 16 * 60 + 45], // November
  [8 * 60 + 15, 16 * 60 + 15], // Dezember
];

export function isDaytime(date = new Date()) {
  const [rise, set] = SUN[date.getMonth()];
  const now = date.getHours() * 60 + date.getMinutes();
  return now >= rise && now < set;
}

// mode: "auto" | "day" | "night"
export function resolveTheme(mode, date = new Date()) {
  if (mode === "day") return "day";
  if (mode === "night") return "night";
  return isDaytime(date) ? "day" : "night";
}
