// Isometrische Stadt Lindenhain als SVG, in Tag- und Nachtvariante.

const PAL = {
  night: {
    sky: "#141B2D", plane: "#1E2A44", river: "#22406A", riverHi: "#6FA8DC",
    top: "#3E5285", left: "#2E3D63", right: "#24324F", on: "#F2B84B", off: "#3A4A70",
    leaf: "#2F6B5A", trunk: "#4B3A2E", lot: "#F08A78", accent: "#F2B84B", pinBg: "#1C2540", pinLine: "#5A6890", pinText: "#AEB8D0", ink: "#E8ECF6",
  },
  day: {
    sky: "#BFDDF2", plane: "#9CC98A", river: "#5C9FD6", riverHi: "#CFE6F7",
    top: "#F3EEE4", left: "#DCCFB8", right: "#C4B496", on: "#8DB4DA", off: "#5D7FA6",
    leaf: "#3E8E5A", trunk: "#6B5A4A", lot: "#D9604A", accent: "#D9604A", pinBg: "#FFFFFF", pinLine: "#8796B0", pinText: "#4A5878", ink: "#16213A",
  },
};

// Gebäude: id, X, Y (linke Ecke der Grundfläche), Höhe, Breite, Fenstermuster
export const BUILDINGS = [
  { id: "funkturm", x: 186, y: 122, h: 100, w: 22, lit: "10" },
  { id: "verlag", x: 118, y: 158, h: 58, w: 44, lit: "1011" },
  { id: "rathaus", x: 230, y: 158, h: 78, w: 46, lit: "1101" },
  { id: "wohn1", x: 76, y: 188, h: 40, w: 40, lit: "0110" },
  { id: "wohn2", x: 290, y: 188, h: 50, w: 40, lit: "1001" },
  { id: "cafe", x: 148, y: 204, h: 34, w: 44, lit: "1110" },
  { id: "buergerhaus", x: 214, y: 214, h: 42, w: 48, lit: "1011" },
  { id: "wohn4", x: 250, y: 244, h: 32, w: 40, lit: "1100" },
];

export const PLACES = {
  cafe: "Café am Markt", rathaus: "Rathaus", verlag: "Verlag", funkturm: "Funkturm", buergerhaus: "Bürgerhaus",
};

function cube(b, p, lightsOff, idx) {
  const { x, y, h, w } = b;
  const half = w / 2, d = half * 0.567;
  const parts = [];
  parts.push(`<polygon points="0,${-h} ${half},${-h + d} ${half},${d} 0,0" fill="${p.left}"/>`);
  parts.push(`<polygon points="${half},${-h + d} ${w},${-h} ${w},0 ${half},${d}" fill="${p.right}"/>`);
  parts.push(`<polygon points="0,${-h} ${half},${-h - d} ${w},${-h} ${half},${-h + d}" fill="${p.top}"/>`);
  // Fenster
  const ww = Math.max(4, w * 0.12), wh = 7;
  const rows = [];
  for (let r = -h + 9; r < -9; r += 14) rows.push(r);
  const cols = w > 30 ? [half * 0.22, half * 0.6] : [half * 0.35];
  let k = 0, L = "", R = "";
  const skew = Math.atan(0.567) * 180 / Math.PI;
  rows.forEach(r => {
    cols.forEach(c => {
      const lit = b.lit[k % b.lit.length] === "1" && !(lightsOff && (k + idx) % 3 !== 0);
      L += `<rect class="win" x="${c.toFixed(1)}" y="${r}" width="${ww.toFixed(1)}" height="${wh}" fill="${lit ? p.on : p.off}"/>`;
      k++;
      const lit2 = b.lit[k % b.lit.length] === "1" && !(lightsOff && (k + idx) % 3 !== 0);
      R += `<rect class="win" x="${(c + 1).toFixed(1)}" y="${r}" width="${ww.toFixed(1)}" height="${wh}" fill="${lit2 ? p.on : p.off}"/>`;
      k++;
    });
  });
  return `<g transform="translate(${x} ${y})">${parts.join("")}</g>`
    + `<g transform="translate(${x} ${y}) skewY(${skew.toFixed(2)})">${L}</g>`
    + `<g transform="translate(${x + half} ${y + d}) skewY(${(-skew).toFixed(2)})">${R}</g>`;
}

function tree(x, y, p) {
  return `<rect x="${x - 1.5}" y="${y - 7}" width="3" height="7" fill="${p.trunk}"/><circle cx="${x}" cy="${y - 11}" r="6" fill="${p.leaf}"/>`;
}

/**
 * opts: theme ("day"|"night"), animate (bool), pins ([{id, n, state:"active"|"locked"}]),
 *       highlight (Gebäude-id), lightsOff (bool), label (aria-label)
 */
export function townSVG(opts = {}) {
  const theme = opts.theme === "day" ? "day" : "night";
  const p = PAL[theme];
  const anim = opts.animate ? " town-anim" : "";
  let sky = "";
  if (theme === "night") {
    for (let i = 1; i < 22; i++) sky += `<circle cx="${(i * 71) % 390}" cy="${(i * 37) % 70 + 6}" r="${1 + (i % 2) * 0.5}" fill="#E8ECF6" opacity="0.55"/>`;
    sky += `<circle cx="340" cy="38" r="16" fill="#F2E6C8"/><circle cx="347" cy="33" r="15" fill="${p.sky}"/>`;
  } else {
    sky += `<circle cx="340" cy="40" r="18" fill="#F7D56E"/>`;
    sky += `<ellipse cx="90" cy="40" rx="34" ry="10" fill="#FFFFFF"/><ellipse cx="112" cy="33" rx="20" ry="10" fill="#FFFFFF"/>`;
    sky += `<ellipse cx="250" cy="62" rx="26" ry="8" fill="#FFFFFF"/>`;
  }
  const sorted = [...BUILDINGS].sort((a, b) => (a.y - b.y) || (a.x - b.x));
  let body = "";
  sorted.forEach((b, i) => {
    const hl = opts.highlight === b.id;
    const glow = hl ? `<ellipse class="glow" cx="${b.x + b.w / 2}" cy="${b.y}" rx="${b.w * 0.85}" ry="${b.w * 0.42}" fill="${p.accent}" opacity="0.35"/>` : "";
    body += `<g class="bld" style="animation-delay:${i * 90}ms">${glow}${cube(b, p, opts.lightsOff, i)}</g>`;
  });
  let focus = "";
  (opts.focusables || []).forEach(id => {
    if (id === "lot") {
      focus += `<ellipse class="focus" data-focus="lot" cx="306" cy="214" rx="30" ry="15" fill="${p.accent}"/>`;
      return;
    }
    const b = BUILDINGS.find(x => x.id === id);
    if (b) focus += `<ellipse class="focus" data-focus="${id}" cx="${b.x + b.w / 2}" cy="${b.y}" rx="${b.w * 0.9}" ry="${b.w * 0.45}" fill="${p.accent}"/>`;
  });
  let pins = "";
  (opts.pins || []).forEach(pin => {
    const b = BUILDINGS.find(x => x.id === pin.id);
    if (!b) return;
    const cx = b.x + b.w / 2, cy = Math.max(48, b.y - b.h - b.w * 0.28 - 16);
    if (pin.state === "active") {
      const name = PLACES[pin.id] || "";
      const pw = name.length * 6.6 + 22;
      pins += `<g class="pin">`
        + `<circle cx="${cx}" cy="${cy}" r="17" fill="${p.accent}" opacity="0.25"/>`
        + `<circle cx="${cx}" cy="${cy}" r="12" fill="${p.accent}"/>`
        + `<text x="${cx}" y="${cy + 4.5}" font-size="13" font-weight="700" font-family="Space Grotesk, Inter, sans-serif" fill="${theme === "night" ? "#141B2D" : "#FFFFFF"}" text-anchor="middle">${pin.n}</text>`
        + `<rect x="${cx - pw / 2}" y="${cy - 42}" width="${pw}" height="22" rx="11" fill="${p.pinBg}" stroke="${p.accent}" stroke-width="1.5"/>`
        + `<text x="${cx}" y="${cy - 27}" font-size="11.5" font-weight="600" font-family="Inter, sans-serif" fill="${p.ink}" text-anchor="middle">${name}</text></g>`;
    } else {
      pins += `<g><circle cx="${cx}" cy="${cy}" r="11" fill="${p.pinBg}" stroke="${p.pinLine}" stroke-width="1.5"/>`
        + `<text x="${cx}" y="${cy + 4}" font-size="11.5" font-weight="700" font-family="Space Grotesk, Inter, sans-serif" fill="${p.pinText}" text-anchor="middle">${pin.n}</text></g>`;
    }
  });
  const label = opts.label || (theme === "night" ? "Lindenhain am Abend" : "Lindenhain bei Tag");
  return `<svg class="town${anim}" viewBox="0 0 390 300" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid slice">`
    + `<rect width="390" height="300" fill="${p.sky}"/>${sky}`
    + `<polygon points="195,92 375,194 195,296 15,194" fill="${p.plane}"/>`
    + `<polygon points="30,206 170,286 182,279 42,199" fill="${p.river}"/>`
    + `<polygon points="42,199 182,279 179,281 39,201" fill="${p.riverHi}" opacity="0.6"/>`
    + tree(60, 205, p) + tree(90, 222, p) + tree(330, 228, p) + tree(176, 266, p)
    + `<polygon points="286,214 306,203 326,214 306,225" fill="${p.lot}" fill-opacity="0.18" stroke="${p.lot}" stroke-width="1.5" stroke-dasharray="4 3"/>`
    + focus + body + pins + `</svg>`;
}
