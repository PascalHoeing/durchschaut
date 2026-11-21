// Zeichnungen: Gesichter, Fotos, Diagramme – alles als SVG, ohne externe Dateien.
let artTheme = "night";
export function setArtTheme(t) { artTheme = t; }

let faceId = 0;
export function face(id, size = 44) {
  const day = artTheme === "day";
  const bg = day ? "#DCE9F4" : "#22304F";
  const feat = "#16181D";
  const c = {
    ilse: { cl: day ? "#5E9A7A" : "#4F7A66", skin: "#F0C8A8", hair: day ? "#C9CCD4" : "#B9BDC8" },
    deniz: { cl: day ? "#D9604A" : "#B0503C", skin: "#C68E6A", hair: "#2B2421", cap: day ? "#E7A93B" : "#F2B84B" },
    yilmaz: { cl: day ? "#8A6A4A" : "#7A5C40", skin: "#D9A47E", hair: "#3A2E2A", apron: "#F3EEE4" },
    kessler: { cl: day ? "#4C6496" : "#3E5285", skin: "#F3D2B8", hair: "#3A2E2A" },
    moeller: { cl: day ? "#9A6BB0" : "#7E5A92", skin: "#E9C09E", hair: "#B5772E" },
  }[id];
  let g = "";
  if (id === "ilse") {
    g = `<path d="M22 140 C22 110 40 98 60 98 C80 98 98 110 98 140Z" fill="${c.cl}"/><rect x="52" y="82" width="16" height="18" fill="${c.skin}"/><circle cx="60" cy="62" r="24" fill="${c.skin}"/>`
      + `<path d="M36 62 C34 42 46 34 60 34 C74 34 86 42 84 62 C80 50 70 45 60 45 C50 45 40 50 36 62Z" fill="${c.hair}"/><circle cx="60" cy="29" r="9" fill="${c.hair}"/>`
      + `<circle cx="51" cy="64" r="6" fill="none" stroke="${feat}" stroke-width="2"/><circle cx="69" cy="64" r="6" fill="none" stroke="${feat}" stroke-width="2"/><line x1="57" y1="64" x2="63" y2="64" stroke="${feat}" stroke-width="2"/>`
      + `<path d="M53 75 Q60 80 67 75" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (id === "deniz") {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><rect x="52" y="80" width="16" height="18" fill="${c.skin}"/><circle cx="60" cy="62" r="23" fill="${c.skin}"/>`
      + `<path d="M37 56 C37 38 48 32 60 32 C72 32 83 38 83 56Z" fill="${c.cap}"/><path d="M80 54 L98 56 L82 60Z" fill="${c.cap}"/>`
      + `<circle cx="52" cy="65" r="2.5" fill="${feat}"/><circle cx="68" cy="65" r="2.5" fill="${feat}"/><path d="M54 75 H66" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (id === "yilmaz") {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><path d="M42 140 V104 H78 V140Z" fill="${c.apron}"/><rect x="52" y="80" width="16" height="18" fill="${c.skin}"/><circle cx="60" cy="62" r="23" fill="${c.skin}"/>`
      + `<path d="M38 58 C38 40 48 36 60 36 C72 36 82 40 82 58 C76 48 66 46 60 46 C54 46 44 48 38 58Z" fill="${c.hair}"/><path d="M50 74 Q60 70 70 74" fill="none" stroke="${c.hair}" stroke-width="5" stroke-linecap="round"/>`
      + `<circle cx="52" cy="62" r="2.5" fill="${feat}"/><circle cx="68" cy="62" r="2.5" fill="${feat}"/><path d="M54 80 Q60 84 66 80" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else if (id === "moeller") {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><rect x="52" y="82" width="16" height="16" fill="${c.skin}"/>`
      + `<path d="M36 66 C34 42 46 34 60 34 C76 34 86 44 84 66 C90 76 92 88 88 96 C80 90 82 76 80 66Z" fill="${c.hair}"/><circle cx="60" cy="62" r="21" fill="${c.skin}"/>`
      + `<path d="M39 58 C42 44 52 40 62 40 C72 40 80 46 81 58 C70 50 52 50 39 58Z" fill="${c.hair}"/><circle cx="52" cy="64" r="2.5" fill="${feat}"/><circle cx="68" cy="64" r="2.5" fill="${feat}"/>`
      + `<path d="M54 74 Q60 72 66 74" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  } else {
    g = `<path d="M20 140 C20 108 38 96 60 96 C82 96 100 108 100 140Z" fill="${c.cl}"/><path d="M50 96 L60 120 L70 96Z" fill="#FFFFFF"/><rect x="52" y="82" width="16" height="16" fill="${c.skin}"/>`
      + `<path d="M34 72 C32 44 44 36 60 36 C76 36 88 44 86 72 L80 84 L40 84Z" fill="${c.hair}"/><circle cx="60" cy="62" r="21" fill="${c.skin}"/>`
      + `<path d="M40 56 C44 42 54 40 62 40 C72 40 80 46 80 56 C72 50 58 50 40 56Z" fill="${c.hair}"/><circle cx="52" cy="64" r="2.5" fill="${feat}"/><circle cx="68" cy="64" r="2.5" fill="${feat}"/>`
      + `<path d="M54 74 Q60 77 66 74" fill="none" stroke="${feat}" stroke-width="2" stroke-linecap="round"/>`;
  }
  const cid = "fc" + (++faceId);
  return `<svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true" style="flex:none;display:block"><defs><clipPath id="${cid}"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#${cid})"><rect width="120" height="120" fill="${bg}"/><g transform="translate(0 -6)">${g}</g></g></svg>`;
}

export function photo(kind) {
  if (kind === "ilse") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Ilse in Nahaufnahme, nachdenklich"><rect width="320" height="170" fill="#C9C2B4"/>`
      + `<rect width="320" height="170" fill="#8D8678" opacity="0.35"/>`
      + `<path d="M90 170 C90 130 120 112 160 112 C200 112 230 130 230 170Z" fill="#5E7A6A"/><rect x="146" y="92" width="28" height="26" fill="#E8BFA0"/>`
      + `<circle cx="160" cy="70" r="38" fill="#EFC6A6"/><path d="M122 70 C118 36 140 24 160 24 C180 24 202 36 198 70 C192 50 176 42 160 42 C144 42 128 50 122 70Z" fill="#CFCFD4"/><circle cx="160" cy="20" r="13" fill="#CFCFD4"/>`
      + `<circle cx="146" cy="74" r="9" fill="none" stroke="#2A2A2A" stroke-width="2.5"/><circle cx="174" cy="74" r="9" fill="none" stroke="#2A2A2A" stroke-width="2.5"/><line x1="155" y1="74" x2="165" y2="74" stroke="#2A2A2A" stroke-width="2.5"/>`
      + `<path d="M140 64 Q146 61 152 64 M168 64 Q174 61 180 64" stroke="#7A6A5A" stroke-width="2" fill="none" stroke-linecap="round"/>`
      + `<path d="M150 92 Q160 88 170 92" fill="none" stroke="#2A2A2A" stroke-width="2.5" stroke-linecap="round"/>`
      + `<path d="M196 120 C206 104 214 98 222 100 C226 112 218 124 206 132Z" fill="#E8BFA0"/></svg>`;
  }
  if (kind === "map") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Plan der Freifläche mit markierter Ecke"><rect width="320" height="170" fill="#F3EEE4"/>`
      + `<rect x="40" y="24" width="240" height="122" fill="#DCE8D2" stroke="#8796B0" stroke-width="2"/>`
      + `<path d="M40 24 h240 v122 h-240z" fill="none" stroke="#8796B0" stroke-width="2" stroke-dasharray="2 0"/>`
      + `<rect x="236" y="108" width="44" height="38" fill="#D9604A" opacity="0.35" stroke="#D9604A" stroke-width="2" stroke-dasharray="5 4"/>`
      + `<text x="160" y="90" font-size="13" font-weight="700" font-family="Inter, sans-serif" fill="#4A5878" text-anchor="middle">Freifläche · 4.000 m²</text>`
      + `<text x="258" y="131" font-size="9" font-weight="700" font-family="Inter, sans-serif" fill="#8F2E1E" text-anchor="middle">betroffen</text>`
      + `<path d="M30 160 h40" stroke="#4A5878" stroke-width="2"/><text x="76" y="164" font-size="9" font-family="Inter, sans-serif" fill="#4A5878">20 m</text></svg>`;
  }
  if (kind === "glove") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Hand im Schutzhandschuh hält eine Bodenprobe"><rect width="320" height="170" fill="#D8DEE4"/>`
      + `<rect y="120" width="320" height="50" fill="#B9C2CC"/>`
      + `<path d="M80 170 C90 120 120 96 150 92 L190 90 C206 90 214 100 206 108 L172 112 C200 116 214 124 208 132 L160 138 C130 150 110 160 100 170Z" fill="#3E8EB8"/>`
      + `<rect x="168" y="44" width="34" height="64" rx="6" fill="#F3F6F9" stroke="#8796B0" stroke-width="2"/>`
      + `<rect x="170" y="76" width="30" height="30" rx="4" fill="#6B5A4A"/><rect x="166" y="38" width="38" height="10" rx="3" fill="#D9604A"/>`
      + `<rect x="174" y="56" width="22" height="10" fill="#FFFFFF" stroke="#8796B0"/><text x="185" y="64" font-size="6" font-family="Inter, sans-serif" fill="#4A5878" text-anchor="middle">P-07</text></svg>`;
  }
  if (kind === "skull") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Symbolbild: Warnschild mit Totenkopf"><rect width="320" height="170" fill="#1E1E1E"/>`
      + `<polygon points="160,18 248,150 72,150" fill="#F2C230" stroke="#111" stroke-width="6" stroke-linejoin="round"/>`
      + `<circle cx="160" cy="92" r="24" fill="#111"/><rect x="146" y="108" width="28" height="16" rx="3" fill="#111"/>`
      + `<circle cx="151" cy="90" r="6" fill="#F2C230"/><circle cx="169" cy="90" r="6" fill="#F2C230"/>`
      + `<path d="M118 132 L202 140 M118 140 L202 132" stroke="#111" stroke-width="7" stroke-linecap="round"/></svg>`;
  }
  if (kind === "tunnel") {
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Symbolbild: dunkle Unterführung mit Graffiti"><rect width="320" height="170" fill="#15171C"/>`
      + `<path d="M40 170 L110 50 H210 L280 170Z" fill="#262A31"/><path d="M110 50 H210 V120 H110Z" fill="#0C0D10"/>`
      + `<ellipse cx="160" cy="100" rx="22" ry="16" fill="#C9B26A" opacity="0.55"/>`
      + `<path d="M48 150 L82 92 L86 150Z" fill="#3A3F48"/><path d="M58 128 q12 -16 22 0 q-8 10 -22 0z" fill="#8A3B3B" opacity="0.8"/>`
      + `<path d="M236 92 L270 150 L232 150Z" fill="#3A3F48"/><path d="M240 120 h22 M242 130 h18" stroke="#3B6A8A" stroke-width="5" stroke-linecap="round" opacity="0.8"/>`
      + `<rect width="320" height="170" fill="url(#vgt)"/><defs><radialGradient id="vgt" cx="50%" cy="55%" r="70%"><stop offset="45%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.7"/></radialGradient></defs></svg>`;
  }
  if (kind === "hallgreen") {
    // enger Ausschnitt: nur die Reihe mit den Garten-Schildern
    let g = "";
    for (let i = 0; i < 7; i++) {
      const x = 30 + i * 44, y = 96;
      g += `<rect x="${x - 15}" y="${y + 10}" width="30" height="62" rx="12" fill="${["#5E9A7A", "#8A7A6A", "#4C6496"][i % 3]}"/><circle cx="${x}" cy="${y}" r="12" fill="${["#C9CCD4", "#3A2E2A", "#8A6A4A"][i % 3]}"/>`;
      if (i % 2 === 0) g += `<rect x="${x - 4}" y="${y - 52}" width="4" height="40" fill="#8A6A4A"/><rect x="${x - 22}" y="${y - 72}" width="40" height="26" rx="3" fill="#7FD1A8"/><text x="${x - 2}" y="${y - 55}" font-size="10" font-weight="700" font-family="Inter, sans-serif" fill="#16213A" text-anchor="middle">Garten</text>`;
    }
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Bildausschnitt: Reihe mit Garten-Schildern"><rect width="320" height="170" fill="#E9E2D3"/>${g}</svg>`;
  }
  if (kind === "hallempty") {
    let g = "";
    for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) {
      const x = 24 + i * 34 + r * 6, y = 70 + r * 32;
      g += `<rect x="${x - 10}" y="${y}" width="22" height="18" rx="3" fill="#9AA3B5"/><rect x="${x - 10}" y="${y - 14}" width="22" height="16" rx="3" fill="#B3BAC8"/>`;
    }
    g += `<rect x="102" y="84" width="20" height="36" rx="8" fill="#4C6496"/><circle cx="112" cy="78" r="8" fill="#C9CCD4"/>`;
    g += `<rect x="218" y="116" width="20" height="36" rx="8" fill="#8A7A6A"/><circle cx="228" cy="110" r="8" fill="#3A2E2A"/>`;
    return `<svg viewBox="0 0 320 170" role="img" aria-label="Fast leerer Saal mit Stuhlreihen"><rect width="320" height="170" fill="#D9D3C6"/><rect x="0" y="0" width="320" height="40" fill="#C9C1B0"/>${g}</svg>`;
  }
  // voller Saal im Bürgerhaus
  let heads = "";
  for (let i = 0; i < 26; i++) {
    const x = 18 + (i % 13) * 24 + (i >= 13 ? 12 : 0), y = i >= 13 ? 132 : 110;
    const hair = ["#3A2E2A", "#C9CCD4", "#8A6A4A", "#2B2421", "#B07E5C"][i % 5];
    const coat = ["#4C6496", "#5E9A7A", "#D9604A", "#8A7A6A", "#E7A93B"][(i * 3) % 5];
    heads += `<rect x="${x - 10}" y="${y + 6}" width="20" height="40" rx="8" fill="${coat}"/><circle cx="${x}" cy="${y}" r="8" fill="${hair}"/>`;
  }
  return `<svg viewBox="0 0 320 170" role="img" aria-label="Voller Saal beim Infoabend im Bürgerhaus"><rect width="320" height="170" fill="#E9E2D3"/>`
    + `<rect x="100" y="18" width="120" height="56" rx="4" fill="#FFFFFF" stroke="#C9B79A" stroke-width="2"/><text x="160" y="42" font-size="11" font-weight="700" font-family="Inter, sans-serif" fill="#16213A" text-anchor="middle">Infoabend</text><text x="160" y="58" font-size="10" font-family="Inter, sans-serif" fill="#4A5878" text-anchor="middle">Die Freifläche</text>`
    + `<rect x="236" y="56" width="18" height="40" rx="6" fill="#4C6496"/><circle cx="245" cy="50" r="7" fill="#3A2E2A"/>`
    + heads + `</svg>`;
}


// Diagramm als SVG. spec: { type: "bar"|"line", title, labels[], values[], yMin, yMax, unit, highlight }
// yMin > 0 erzeugt bewusst eine abgeschnittene Achse – genau darum geht es in Kampagne 3.
export function chart(spec) {
  const W = 320, H = 170, L = 44, R = 12, T = 30, B = 26;
  const vals = spec.values;
  const yMin = spec.yMin ?? 0;
  const yMax = spec.yMax ?? Math.max(...vals) * 1.1;
  const ink = "#16213A", muted = "#4A5878", grid = "#D3DCE8";
  const y = v => T + (H - T - B) * (1 - (v - yMin) / (yMax - yMin));
  const n = vals.length, slot = (W - L - R) / n;
  const fmtv = v => v.toLocaleString("de-DE", { maximumFractionDigits: 1 });
  let g = `<rect width="${W}" height="${H}" fill="#FFFFFF"/>`;
  g += `<text x="${L}" y="18" font-size="11.5" font-weight="700" font-family="Inter, sans-serif" fill="${ink}">${spec.title}</text>`;
  // Achse und Hilfslinien
  const ticks = [yMin, (yMin + yMax) / 2, yMax].map(v => Math.round(v * 10) / 10);
  ticks.forEach(v => {
    g += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="${grid}"/>`;
    g += `<text x="${L - 6}" y="${y(v) + 3.5}" font-size="9.5" font-family="Inter, sans-serif" fill="${muted}" text-anchor="end">${fmtv(v)}</text>`;
  });
  g += `<line x1="${L}" x2="${L}" y1="${T}" y2="${H - B}" stroke="${muted}"/>`;
  if (spec.type === "line") {
    const pts = vals.map((v, i) => `${L + slot * (i + 0.5)},${y(v)}`).join(" ");
    g += `<polyline points="${pts}" fill="none" stroke="#3E78B8" stroke-width="2.5" stroke-linejoin="round"/>`;
    vals.forEach((v, i) => {
      const hl = spec.highlight === i;
      g += `<circle cx="${L + slot * (i + 0.5)}" cy="${y(v)}" r="${hl ? 4.5 : 3}" fill="${hl ? "#D9604A" : "#3E78B8"}"/>`;
    });
  } else {
    vals.forEach((v, i) => {
      const x = L + slot * i + slot * 0.18, w = slot * 0.64;
      const hl = spec.highlight === i;
      g += `<rect x="${x}" y="${y(v)}" width="${w}" height="${H - B - y(v)}" fill="${hl ? "#D9604A" : "#3E78B8"}"/>`;
      g += `<text x="${x + w / 2}" y="${y(v) - 4}" font-size="9.5" font-weight="700" font-family="Inter, sans-serif" fill="${ink}" text-anchor="middle">${fmtv(v)}${spec.unit || ""}</text>`;
    });
  }
  spec.labels.forEach((l, i) => {
    g += `<text x="${L + slot * (i + 0.5)}" y="${H - 9}" font-size="9.5" font-family="Inter, sans-serif" fill="${muted}" text-anchor="middle">${l}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Diagramm: ${spec.title}">${g}</svg>`;
}

// Runder Avatar mit Initialen für Personen ohne gezeichnetes Gesicht
export function initials(text, color, size = 40) {
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:${color};font-size:${Math.round(size * 0.33)}px">${text}</div>`;
}
