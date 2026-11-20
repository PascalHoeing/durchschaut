// Spielmechanik von Kapitel 1 – ohne Oberfläche, damit sie sich auch prüfen lässt.
import {
  START, COMPETITORS, COMP_GROWTH, LIVE_DEBUNK_LOSS, MILESTONES, STAR_LIMITS,
  CHAPTER1, factcheckFindings, factcheckDecision, ILSE_DECISION,
} from "./content.js";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Glaubwürdigkeit wirkt als Reichweiten-Faktor: Wem man nicht glaubt, den teilt man seltener.
export function reachFactor(trust) {
  return 0.2 + trust * 0.0135;
}

export function newRun() {
  return {
    followers: START.followers, trust: START.trust, split: START.split,
    flags: {}, picks: [],
    comp: { live: COMPETITORS.live.start, rundschau: COMPETITORS.rundschau.start },
    milestones: [],
  };
}

// Wendet Zuwächse an; positive Follower-Zuwächse werden mit der aktuellen Glaubwürdigkeit gewichtet.
export function applyEffect(run, f, t, s) {
  const before = run.followers;
  const df = f > 0 ? Math.round(f * reachFactor(run.trust)) : f;
  run.followers = Math.max(0, run.followers + df);
  const tb = run.trust, sb = run.split;
  run.trust = clamp(run.trust + t, 0, 100);
  run.split = clamp(run.split + s, 0, 100);
  const reached = MILESTONES.filter(m => before < m && run.followers >= m && !run.milestones.includes(m));
  run.milestones.push(...reached);
  return { df: run.followers - before, dt: run.trust - tb, ds: run.split - sb, reached };
}

export function applyOption(run, day, o) {
  if (o.flag) run.flags[o.flag] = true;
  run.picks.push({ day, tier: o.tier, text: o.text });
  return applyEffect(run, o.f, o.t, o.s);
}

// Baut einen Tag auf: Ereignisse (mit sofortiger Wirkung) und die Entscheidungen des Tages.
export function startDay(run, idx) {
  const day = CHAPTER1.days[idx];
  const events = [];
  let decisions = day.decisions ? day.decisions : [];
  let intro = day.intro || "";

  if (day.dynamic === "factcheck") {
    const found = factcheckFindings(run.flags);
    if (found.length) {
      intro = "Frau Kessler von der Rundschau hat deine Beiträge geprüft und schreibt öffentlich:";
      events.push({ who: "kessler", items: found });
      decisions = [factcheckDecision(found.length)];
    } else {
      intro = "Frau Kessler von der Rundschau hat deine Beiträge geprüft.";
      const fx = applyEffect(run, 100, 6, -1);
      events.push({ who: "kessler", text: "„Lindenhain Aktuell berichtet fair über die Freifläche. Lesenswert.“ Die Rundschau verlinkt dich.", fx });
      decisions = [];
    }
  }

  if (day.dynamic === "ilse") {
    intro = "Die Polizei stellt klar: Es gibt keine Anzeige, der Vorfall ist nicht bekannt. Lindenhain Live löscht den Beitrag kommentarlos.";
    const lost = Math.round(run.comp.live * LIVE_DEBUNK_LOSS);
    run.comp.live -= lost;
    events.push({ who: "news", text: `Lindenhain Live verliert ${lost.toLocaleString("de-DE")} Follower.` });
    if (run.flags.sharedFake) {
      const fx = applyEffect(run, -200, -10, 0);
      events.push({ who: "you", text: "Du hattest die Meldung geteilt. Viele werfen dir vor, ein Gerücht verbreitet zu haben.", fx });
    } else if (run.flags.verified) {
      const fx = applyEffect(run, 90, 3, -1);
      events.push({ who: "you", text: "Deine Meldung von gestern wird jetzt überall zitiert: Du hattest zuerst nachgefragt.", fx });
    }
    if (run.flags.quote || run.flags.ilsePhoto) {
      decisions = [ILSE_DECISION];
    } else {
      const fx = applyEffect(run, 30, 2, 0);
      events.push({ who: "ilse", text: "Ilse kommentiert unter deinem Beitrag: „Endlich mal jemand, der beide Seiten zeigt.“", fx });
      decisions = [];
    }
  }
  return { day, intro, events, decisions };
}

export function endDay(run, idx) {
  run.comp.live += COMP_GROWTH.live[idx] || 0;
  run.comp.rundschau += COMP_GROWTH.rundschau[idx] || 0;
}

export function ranking(run) {
  return [
    { id: "you", name: "Lindenhain Aktuell", followers: run.followers },
    { id: "live", name: COMPETITORS.live.name, followers: run.comp.live },
    { id: "rundschau", name: COMPETITORS.rundschau.name, followers: run.comp.rundschau },
  ].sort((a, b) => b.followers - a.followers);
}

export function stars(followers) {
  return 1 + STAR_LIMITS.filter(l => followers >= l).length;
}

// Stimmung in der Stadt: Mit wachsender Spaltung verschwinden die Unentschiedenen.
export function poll(split) {
  const undecided = Math.round(clamp(40 - (split - 10) * 0.75, 6, 40));
  const decided = 100 - undecided;
  const garden = Math.round(decided * clamp(0.48 + (split - 10) * 0.004, 0.48, 0.66));
  return { undecided, garden, skate: decided - garden };
}

// Was die Woche mit den Menschen gemacht hat – bewusst realistisch und leise.
export function statuses(run) {
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
}
