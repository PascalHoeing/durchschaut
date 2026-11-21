// Spielmechanik der Kapitel – ohne Oberfläche, damit sie sich auch prüfen lässt.

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// Glaubwürdigkeit wirkt als Reichweiten-Faktor: Wem man nicht glaubt, den teilt man seltener.
export function reachFactor(trust) {
  return 0.2 + trust * 0.0135;
}

export function newRun(ch) {
  return {
    ch: ch.id,
    followers: ch.start.followers, trust: ch.start.trust, split: ch.start.split,
    flags: {}, picks: [],
    comp: { live: ch.compStart.live, rundschau: ch.compStart.rundschau },
    milestoneList: ch.milestones, milestones: [],
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
  const reached = run.milestoneList.filter(m => before < m && run.followers >= m && !run.milestones.includes(m));
  run.milestones.push(...reached);
  return { df: run.followers - before, dt: run.trust - tb, ds: run.split - sb, reached };
}

export function applyOption(run, day, o) {
  if (o.flag) run.flags[o.flag] = true;
  run.picks.push({ day, tier: o.tier, text: o.text });
  return applyEffect(run, o.f, o.t, o.s);
}

// Baut einen Tag auf: Ereignisse (mit sofortiger Wirkung) und die Entscheidungen des Tages.
export function startDay(run, ch, idx) {
  const day = ch.days[idx];
  if (day.dynamic) {
    const r = ch.dynamic[day.dynamic](run, (f, t, s) => applyEffect(run, f, t, s));
    return { day, intro: r.intro || "", events: r.events || [], decisions: r.decisions || [] };
  }
  return { day, intro: day.intro || "", events: [], decisions: day.decisions || [] };
}

export function endDay(run, ch, idx) {
  run.comp.live += ch.growth.live[idx] || 0;
  run.comp.rundschau += ch.growth.rundschau[idx] || 0;
}

export function ranking(run) {
  return [
    { id: "you", name: "Lindenhain Aktuell", followers: run.followers },
    { id: "live", name: "Lindenhain Live", followers: run.comp.live },
    { id: "rundschau", name: "Lindenhainer Rundschau", followers: run.comp.rundschau },
  ].sort((a, b) => b.followers - a.followers);
}

export function stars(ch, followers) {
  return 1 + ch.starLimits.filter(l => followers >= l).length;
}

// Stimmung in der Stadt: Mit wachsender Spaltung verschwinden die Unentschiedenen.
export function poll(split) {
  const undecided = Math.round(clamp(40 - (split - 10) * 0.75, 6, 40));
  const decided = 100 - undecided;
  const garden = Math.round(decided * clamp(0.48 + (split - 10) * 0.004, 0.48, 0.66));
  return { undecided, garden, skate: decided - garden };
}
