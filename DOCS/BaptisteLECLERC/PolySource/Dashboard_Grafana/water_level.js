// Récupérer les valeurs numériques depuis Grafana

let values = [];

if (context.panel && context.panel.data && context.panel.data.series.length > 0) {

  const s = context.panel.data.series[0];
  const numField = s.fields.find(
    f => f.type === 'number' || f.name === '_value'
  );

  if (numField) {
    const vals = numField.values;
    for (let i = 0; i < vals.length; i++) {
      values.push(vals.get(i));
    }
  }
}

// Dernière valeur reçue
let height = values.length > 0 ? values[values.length - 1] : 0;

// Hauteur max sonar
const dmax = 100;

// Conversion en fraction eau (inversion sonar)
let fraction = 1 - (height / dmax);
if (fraction > 1) fraction = 1;
if (fraction < 0) fraction = 0;

// Configuration Liquid Fill
return {
  backgroundColor: 'transparent',
  series: [
    {
      type: 'liquidFill',
      radius: '90%',
      center: ['50%', '50%'],
      data: [
        fraction,
        Math.max(fraction - 0.05, 0),
        Math.max(fraction - 0.10, 0)
      ],
      color: [
        '#0a3d5c',   // vague sombre
        '#4fc3f7',   // vague claire
        '#bfeaff'    // vague légère
      ],
      itemStyle: {
        opacity: 0.8
      },
      backgroundStyle: {
        color: '#ffffff'
      },
      outline: {
        borderDistance: 4,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#0a3d5c'
        }
      },
      waveAnimation: true,
      animationDuration: 1500,
      animationDurationUpdate: 800,
      label: {
        show: true,
        formatter: () => height.toFixed(2) + ' cm',
        fontSize: 52,
        fontWeight: 'bold',
        color: '#0a3d5c'
      }
    }
  ]
};
