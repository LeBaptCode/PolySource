// --------------------------------------------
// 1. Récupérer les points (temps + hauteur) et vmax
// --------------------------------------------
let points = [];
let vmax = 0;

if (context.panel && context.panel.data && context.panel.data.series.length > 0) {
  const series = context.panel.data.series[0];

  const timeField = series.fields.find(f => f.type === 'time');
  const valueField = series.fields.find(f => f.name === '_value' || f.type === 'number');

  if (timeField && valueField) {
    const tVals = timeField.values;
    const vVals = valueField.values;
    const len = tVals.length ?? tVals.buffer?.length ?? 0;

    for (let i = 0; i < len; i++) {
      // ← .get() ou accès direct selon la version Grafana
      const t = tVals.get ? tVals.get(i) : tVals[i];
      const raw = vVals.get ? vVals.get(i) : vVals[i];

      if (raw === null || raw === undefined) continue;

      // ← données en cm, on convertit en mètres
      const val = Number(raw) / 100;
      points.push([t, val]);

      if (Math.abs(val) > vmax) vmax = Math.abs(val);
    }
  }
}

// --------------------------------------------
// 2. Intensité (0→1, max = 1 m)
// --------------------------------------------
const seuil = 1;
let intensity = Math.min(1, Math.max(0, vmax / seuil));

const lineColor = `rgba(24, 90, 157, ${0.4 + 0.6 * intensity})`;
const topFill = `rgba(24, 90, 157, ${0.6 + 0.3 * intensity})`;
const midFill = `rgba(77, 161, 214, ${0.4 + 0.2 * intensity})`;
const bottomFill = `rgba(227, 247, 255, 0.12)`;

// --------------------------------------------
// 3. Reflet miroir
// --------------------------------------------
const mirrorPoints = points.map(p => [p[0], -p[1] * 0.6]);

// --------------------------------------------
// 4. Config ECharts
// --------------------------------------------
return {
  backgroundColor: 'transparent',

  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'line' },
    valueFormatter: (val) =>
      val && val.toFixed ? val.toFixed(2) + ' m' : val + ' m'
  },

  grid: {
    left: '6%',
    right: '4%',
    top: '8%',
    bottom: '18%'
  },

  xAxis: {
    type: 'time',
    boundaryGap: false,
    axisLine: { lineStyle: { color: '#4fc3f7' } },
    axisLabel: {
      color: '#4f5b6e',
      fontFamily: 'Poppins, sans-serif',
      fontSize: 11
    },
    splitLine: {
      show: true,
      lineStyle: { color: 'rgba(200,210,230,0.15)' }
    }
  },

  yAxis: {
    type: 'value',
    min: 0,
    max: 1,
    name: 'Hauteur (m)',
    nameTextStyle: {
      color: '#4f5b6e',
      fontFamily: 'Poppins, sans-serif',
      fontSize: 13,
      fontWeight: '600'
    },
    axisLine: { lineStyle: { color: '#4fc3f7' } },
    axisLabel: {
      color: '#4f5b6e',
      fontFamily: 'Poppins, sans-serif',
      fontSize: 11,
      formatter: v => v < 0 ? '' : v.toFixed(2) + ' m'
    },
    splitLine: {
      show: true,
      lineStyle: { color: 'rgba(200,210,230,0.22)' }
    }
  },

  dataZoom: [
    { type: 'inside', realtime: true },
    {
      type: 'slider',
      height: 18,
      bottom: 4,
      textStyle: {
        color: '#4f5b6e',
        fontFamily: 'Poppins, sans-serif'
      }
    }
  ],

  series: [
    {
      name: "Hauteur d'eau",
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: points,
      lineStyle: { width: 3, color: lineColor },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: topFill },
            { offset: 0.4, color: midFill },
            { offset: 1, color: bottomFill }
          ]
        }
      },
      shadowColor: `rgba(15, 54, 90, ${0.4 + 0.3 * intensity})`,
      shadowBlur: 12 + intensity * 10,
      shadowOffsetY: 6 + intensity * 6,
      z: 10,
      emphasis: { focus: 'series' }
    },
    {
      name: 'Reflet',
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: mirrorPoints,
      lineStyle: { width: 0 },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 1, x2: 0, y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(227,247,255,0.00)' },
            { offset: 0.6, color: 'rgba(77,161,214,0.10)' },
            { offset: 1, color: 'rgba(24,90,157,0.25)' }
          ]
        }
      },
      shadowColor: 'rgba(24,90,157,0.25)',
      shadowBlur: 8,
      shadowOffsetY: -4,
      z: 1
    }
  ]
};
