// Sprachausgabe über die im Gerät eingebaute Stimme (Prototyp).
// Später ersetzt durch vorab erzeugte Audiodateien. Untertitel laufen immer mit.

const synth = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
let germanVoice = null;

function pickVoice() {
  if (!synth) return null;
  const voices = synth.getVoices();
  return voices.find(v => v.lang === "de-DE" && /google|premium|enhanced/i.test(v.name))
    || voices.find(v => v.lang === "de-DE")
    || voices.find(v => v.lang && v.lang.toLowerCase().startsWith("de"))
    || null;
}
if (synth) {
  germanVoice = pickVoice();
  try { synth.addEventListener("voiceschanged", () => { germanVoice = pickVoice(); }); } catch (e) { /* ältere Browser */ }
}

export const speechSupported = !!synth;

// Lesezeit für Untertitel ohne Ton
export function readingTime(text) {
  return Math.max(2400, text.length * 62 + 1000);
}

let current = null; // Abschluss der laufenden Zeile

export function stopSpeech() {
  if (synth) { try { synth.cancel(); } catch (e) { /* ignorieren */ } }
  if (current) { const c = current; current = null; c(false); }
}

// Spricht eine Zeile. Das Promise endet mit true, wenn sie fertig ist,
// oder mit false, wenn sie abgebrochen wurde.
export function speak(text, { enabled = true, pitch = 1, rate = 1 } = {}) {
  stopSpeech();
  return new Promise(resolve => {
    let settled = false;
    const finish = ok => {
      if (settled) return;
      settled = true;
      if (current === finish) current = null;
      resolve(ok);
    };
    current = finish;

    if (!enabled || !synth) {
      setTimeout(() => finish(true), readingTime(text));
      return;
    }
    const t0 = Date.now();
    const minDur = Math.max(1800, text.length * 45);
    const later = () => setTimeout(() => finish(true), Math.max(350, minDur - (Date.now() - t0)));
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE";
      if (germanVoice) u.voice = germanVoice;
      u.pitch = pitch;
      u.rate = rate;
      u.onend = later;
      u.onerror = later;
      synth.speak(u);
      // Sicherheitsnetz, falls ein Gerät das Ende nicht meldet
      setTimeout(() => finish(true), text.length * 95 + 4000);
    } catch (e) {
      setTimeout(() => finish(true), readingTime(text));
    }
  });
}
