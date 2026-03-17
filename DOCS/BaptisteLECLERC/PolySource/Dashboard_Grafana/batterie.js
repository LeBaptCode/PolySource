const series = (context?.data?.series) || (context?.panel?.data?.series) || [];

function lastValue(fieldName) {
  for (const s of series) {
    const f = (s.fields || []).find(x => x.name === fieldName);
    if (f?.values?.length > 0) {
      const i = f.values.length - 1;
      const v = f.values.get ? f.values.get(i) : f.values[i];
      return (v === null || v === undefined) ? null : Number(v);
    }
  }
  return null;
}

const percentRaw = lastValue("battery_percent");
const p = (percentRaw === null || Number.isNaN(percentRaw))
  ? 0 : Math.max(0, Math.min(100, percentRaw));

// Couleurs Liquid Glass (vibrantes sur fond sombre)
let colorA, colorB, glowA;
if (p >= 60) {
  colorA = "#48C774"; colorB = "#2a9a55"; glowA = "rgba(72,199,116,0.35)";
} else if (p >= 20) {
  colorA = "#FFB832"; colorB = "#c97f10"; glowA = "rgba(255,184,50,0.35)";
} else {
  colorA = "#FF5252"; colorB = "#c42020"; glowA = "rgba(255,82,82,0.35)";
}

// --- Géométrie ---
const bX = 10, bY = 15, bW = 300, bH = 100, bR = 24;
const lineW = 2;
const capW = 14, capH = 40;
const capX = bX + bW + 5;
const capY = bY + (bH - capH) / 2;

const pad = 7;
const fX = bX + pad, fY = bY + pad;
const fWmax = bW - pad * 2, fH = bH - pad * 2;
const fR = bR - pad + 2;
const fillW = fWmax * (p / 100);
const fRr = p >= 99 ? fR : 5;

// Centre pour le texte
const tX = bX + bW / 2;
const tY = bY + bH / 2;

return {
  backgroundColor: "transparent",
  animation: true,
  animationDuration: 900,
  animationEasing: "cubicOut",

  graphic: [    

    // 1. Fond verre sombre (body background)
    {
      type: "rect",
      shape: { x: bX + 1, y: bY + 1, width: bW - 2, height: bH - 2, r: bR - 1 },
      style: {
        fill: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,255,255,0.10)" },
            { offset: 0.5, color: "rgba(255,255,255,0.04)" },
            { offset: 1, color: "rgba(255,255,255,0.08)" }
          ]
        },
        stroke: "none"
      },
      z: 1
    },

    // 2. Remplissage couleur (base)
    p > 0 && {
      type: "rect",
      shape: { x: fX, y: fY, width: fillW, height: fH, r: [fR, fRr, fRr, fR] },
      style: {
        fill: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: colorA + "d9" },  // ~85% opacité
            { offset: 0.5, color: colorA + "b3" },  // ~70%
            { offset: 1, color: colorB + "cc" }   // ~80%
          ]
        },
        stroke: "none"
      },
      z: 2
    },

    // 3. Specular highlight (reflet haut du fill — effet verre)
    p > 0 && {
      type: "rect",
      shape: { x: fX, y: fY, width: fillW, height: fH * 0.46, r: [fR, fRr, 0, 0] },
      style: {
        fill: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,255,255,0.50)" },
            { offset: 0.35, color: "rgba(255,255,255,0.20)" },
            { offset: 1, color: "rgba(255,255,255,0.00)" }
          ]
        },
        stroke: "none"
      },
      z: 3
    },

    // 4. Reflection bas du fill (reflet inférieur)
    p > 0 && {
      type: "rect",
      shape: { x: fX, y: fY + fH * 0.72, width: fillW, height: fH * 0.28, r: [0, 0, fRr, fR] },
      style: {
        fill: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,255,255,0.00)" },
            { offset: 1, color: "rgba(255,255,255,0.12)" }
          ]
        },
        stroke: "none"
      },
      z: 4
    },

    // 5. Bordure extérieure sombre (depth ring)
    {
      type: "rect",
      shape: { x: bX, y: bY, width: bW, height: bH, r: bR },
      style: {
        fill: "none",
        stroke: "rgba(0,0,0,0.45)",
        lineWidth: 3
      },
      z: 5
    },

    // 6. Bordure verre principale (dégradé top→bottom)
    {
      type: "rect",
      shape: { x: bX + 1.5, y: bY + 1.5, width: bW - 3, height: bH - 3, r: bR - 1 },
      style: {
        fill: "none",
        stroke: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,255,255,0.55)" },
            { offset: 0.5, color: "rgba(255,255,255,0.18)" },
            { offset: 1, color: "rgba(255,255,255,0.38)" }
          ]
        },
        lineWidth: 1.5
      },
      z: 6
    },

    // 7. Rim light (ligne supérieure fine)
    {
      type: "line",
      shape: { x1: bX + bR, y1: bY + 2.5, x2: bX + bW - bR, y2: bY + 2.5 },
      style: {
        stroke: "rgba(255,255,255,0.28)",
        lineWidth: 1
      },
      z: 7
    },

    // 8. Cap (pill translucide)
    {
      type: "rect",
      shape: { x: capX, y: capY, width: capW, height: capH, r: 7 },
      style: {
        fill: {
          type: "linear", x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(255,255,255,0.55)" },
            { offset: 0.4, color: "rgba(255,255,255,0.28)" },
            { offset: 1, color: "rgba(255,255,255,0.40)" }
          ]
        },
        stroke: "rgba(255,255,255,0.20)",
        lineWidth: 1
      },
      z: 8
    },

    // 9. Texte centré
    {
      type: "text",
      x: tX,
      y: tY,
      style: {
        text: `${Math.round(p)}%`,
        fontSize: 46,
        fontWeight: "700",
        fontFamily: "-apple-system, 'SF Pro Display', system-ui, sans-serif",
        fill: "rgba(255,255,255,0.95)",
        textAlign: "center",
        textVerticalAlign: "middle",
        shadowBlur: 14,
        shadowColor: "rgba(0,0,0,0.65)",
        shadowOffsetY: 2
      },
      z: 10
    }

  ].filter(Boolean)
};
