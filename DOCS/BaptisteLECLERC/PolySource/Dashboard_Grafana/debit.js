// --------------------------------------------
// 1. Récupération des points depuis Grafana
// --------------------------------------------
let points = [];
let vmax = 0;

if (context.panel && context.panel.data && context.panel.data.series.length > 0) {
  const series = context.panel.data.series[0];
  const timeField = series.fields.find(f => f.type === 'time');
  const valueField = series.fields.find(f => f.type === 'number' || f.name === '_value');
  if (timeField && valueField) {
    const tVals = timeField.values;
    const vVals = valueField.values;
    for (let i = 0; i < vVals.length; i++) {
      const t = tVals.get ? tVals.get(i) : tVals[i];  // ← robuste
      const val = vVals.get ? vVals.get(i) : vVals[i];  // ← robuste
      if (val === null || val === undefined) continue;
      points.push([t, Number(val)]);
      if (Number(val) > vmax) vmax = Number(val);
    }
  }
}

// --------------------------------------------
// 2. Intensité dynamique (highlight)
// --------------------------------------------
const seuil = 50;
let intensity = Math.min(Math.max(vmax / seuil, 0), 1);
let topDark = `rgba(40, 0, 60, ${0.85 + intensity * 0.15})`;
let midColor = `rgba(103, 58, 183, ${0.40 + intensity * 0.20})`;
let bottomColor = `rgba(233, 220, 255, 0.12)`;
let shadow = `rgba(40, 0, 60, ${0.6 + intensity * 0.25})`;
let blur = 12 + intensity * 12;
let offsetY = 6 + intensity * 8;
// --------------------------------------------
// 3. Configuration ECharts
// --------------------------------------------
return {
  backgroundColor: 'transparent',

  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'line' },
    valueFormatter: (v) =>
      v.toFixed ? v.toFixed(2) + " L/s" : v + " L/s"
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
    axisLine: { lineStyle: { color: '#9575cd' } },
    axisLabel: { color: '#d1c4e9' },
    splitLine: { show: false }
  },
  yAxis: {
    type: 'value',
    min: 0,  // ← pas de zone négative
    name: 'Débit (L/s)',
    nameTextStyle: { color: '#9575cd', fontWeight: 'bold' },
    axisLine: { lineStyle: { color: '#9575cd' } },
    axisLabel: { color: '#d1c4e9' },
    splitLine: {
      show: true,
      lineStyle: { color: 'rgba(209,196,233,0.2)' }
    }
  },
  series: [
    {
      name: 'Débit',
      type: 'line',
      smooth: true,
      showSymbol: false,
      data: points,

      lineStyle: {
        width: 3,
        color: '#7e57c2'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: topDark },
            { offset: 0.35, color: midColor },
            { offset: 1, color: bottomColor }
          ]
        }
      },
      shadowColor: shadow,
      shadowBlur: blur,
      shadowOffsetY: offsetY,
      z: 10,
      emphasis: { focus: 'series' }
    }
  ]
};
