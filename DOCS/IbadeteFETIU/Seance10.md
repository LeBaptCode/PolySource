# Rapport de séance 03/02/2026 — 
## Reconstruction des panneaux Grafana sur la Raspberry Pi et finalisation de l’indicateur de débordement

Lors de cette séance, mon travail s’est concentré sur la remise en place complète de l’interface de supervision Grafana sur la Raspberry Pi utilisée dans le projet. L’environnement Docker ayant déjà été installé et configuré auparavant par mon collègue, je n’ai pas eu à intervenir sur cette partie. Mon travail a donc porté uniquement sur la partie visualisation et configuration des dashboards.

En début de séance, j’ai constaté que l’instance Grafana présente sur la Raspberry Pi ne contenait plus les panneaux développés précédemment sur mon environnement de travail local. Il a donc été nécessaire de recréer l’ensemble des visualisations directement sur la Raspberry Pi afin de retrouver un tableau de bord fonctionnel.

La première action réalisée a été la réinstallation du plugin ECharts dans Grafana. Ce plugin est indispensable car il permet d’utiliser des scripts personnalisés pour générer les graphiques avancés utilisés dans le projet. Sans ce plugin, les panneaux précédemment développés ne pouvaient pas fonctionner. Une fois le plugin installé et Grafana redémarré, j’ai pu recommencer la création des panneaux.

J’ai ensuite recréé un par un les panneaux nécessaires au dashboard en recopiant et en adaptant les scripts développés lors des séances précédentes. Cela a impliqué de reconfigurer les requêtes vers la base de données afin que chaque panneau récupère correctement les données correspondantes. Les panneaux suivants ont été recréés :

- le graphique représentant l’évolution de la hauteur d’eau au cours du temps ;
- le graphique d’évolution du débit ;
- l’affichage de la hauteur actuelle sous forme de visualisation dynamique ;
- le panneau affichant le niveau de batterie ;
- et enfin le panneau indiquant la présence ou non d’un débordement.

La recréation de ces panneaux a demandé plusieurs ajustements car certains éléments graphiques ne s’affichaient pas correctement lors des premiers essais. J’ai dû corriger différents problèmes, notamment la lecture des valeurs retournées par InfluxDB, des erreurs dans les scripts lorsque certaines données étaient absentes, ainsi que des problèmes d’alignement ou de dimensionnement des éléments graphiques.

La fin de la séance a été consacrée à la finalisation du panneau de débordement. Ce panneau fonctionne comme un indicateur visuel permettant de savoir immédiatement si le système détecte un débordement. J’ai terminé le développement du bouton d’état associé, qui affiche désormais clairement si le système est en fonctionnement normal ou en situation d’overflow. Plusieurs corrections ont été nécessaires pour obtenir un bouton correctement centré dans le panneau et lisible quelle que soit la taille de la fenêtre. Cette étape a permis d’obtenir un indicateur visuel propre et fonctionnel.

<p align="center">
  <img src="images/Screenshot 2026-02-03 at 16.10.35.png" width="650">
</p>

<p align="center">
  <em>Figure – Indicateur visuel de débordement affiché dans le dashboard Grafana.</em>
</p>

À la fin de la séance, l’ensemble des panneaux nécessaires au suivi du système était de nouveau opérationnel sur la Raspberry Pi. Le tableau de bord peut désormais être utilisé directement sur la plateforme cible sans dépendre de l’environnement de développement local.

En conclusion, cette séance a permis de réinstaller les outils nécessaires dans Grafana, de recréer entièrement les panneaux de visualisation sur la Raspberry Pi et de finaliser l’indicateur de débordement, permettant ainsi de retrouver une interface de supervision fonctionnelle sur le système embarqué.
