Rapport de séance 
Amélioration des visualisations et enrichissement fonctionnel du dashboard Grafana
1. Objectif de la séance

L’objectif de cette séance était de faire évoluer le dashboard existant, précédemment fonctionnel, vers une version plus lisible, esthétique et expressive, en particulier pour des données liées à l’eau.

La séance s’est concentrée sur :

l’amélioration graphique des courbes d’évolution,

la mise en valeur visuelle de l’information (ombrage, dégradés, reflets),

l’ajout de logique métier plus réaliste (sens physique des données, état de trop-plein),

l’homogénéisation du style graphique du dashboard.

2. Travail sur le graphique d’évolution de la hauteur d’eau
2.1 Amélioration du rendu visuel

Le graphique d’évolution de la hauteur d’eau a été enrichi afin de mieux évoquer un comportement hydraulique.

Les améliorations apportées sont les suivantes :

activation du lissage de la courbe (smooth: true),

ajout d’un remplissage sous la courbe (area chart),

utilisation d’un dégradé vertical :

sombre au niveau de la courbe,

de plus en plus clair en se rapprochant de l’axe des abscisses.

Ce choix permet de donner une impression de profondeur et de masse d’eau.

2.2 Variation dynamique de l’intensité graphique

Afin de renforcer la lisibilité de l’information, l’intensité visuelle de la courbe a été rendue dépendante de la valeur mesurée.

Le principe retenu est le suivant :

plus la hauteur d’eau s’éloigne de 0,

plus la courbe devient foncée et l’ombre marquée.

Cela permet, sans lire les valeurs numériques, d’identifier visuellement les phases de forte hauteur d’eau.
Cette logique a été implémentée directement dans le code JavaScript du panel ECharts, en calculant une intensité normalisée à partir de la valeur maximale visible.

2.3 Harmonisation typographique

La police Poppins a été choisie pour :

les labels des axes,

le nom des grandeurs physiques.

Ce choix permet :

une meilleure lisibilité,

une cohérence visuelle avec les autres panels,

un rendu plus moderne et professionnel.

3. Ajout d’un effet miroir (reflet de l’eau)

Afin de renforcer l’analogie avec un environnement aquatique, un effet miroir a été ajouté sous la courbe principale.

3.1 Principe de fonctionnement

Le reflet est obtenu par :

la création d’une seconde série ECharts,

l’inversion des valeurs de la courbe principale,

une opacité réduite,

un dégradé inversé (clair vers sombre).

Ce reflet reste volontairement discret afin de ne pas nuire à la lisibilité du graphe principal.

3.2 Intérêt de l’effet miroir

Cet effet n’apporte pas d’information supplémentaire, mais :

améliore la perception visuelle,

renforce la thématique “eau”,

donne un aspect plus abouti et professionnel au dashboard.
<img width="986" height="467" alt="image" src="https://github.com/user-attachments/assets/62cfdf79-2e9b-4694-bbb5-96ab0d1efdfb" />


J'ai fait la même chose pour le débit:

<img width="978" height="488" alt="image" src="https://github.com/user-attachments/assets/89183ad6-6e29-443c-8545-0b4ccce003c8" />

4. Travail sur la détection de trop-plein
4.1 Clarification de la logique métier

Lors de cette séance, la logique de détection du trop-plein a été clarifiée.

Contrairement à une simple comparaison hauteur / seuil, le trop-plein est désormais considéré comme :

un état booléen (ouvert / fermé),

provenant directement du système physique.

Cela permet une modélisation plus réaliste du fonctionnement réel d’une installation hydraulique.

4.2 Conception d’un panel dédié

Un panel spécifique a été conçu pour représenter cet état :

représentation sous forme de carte visuelle,

codes couleurs inspirés de l’eau :

bleu lorsque le trop-plein est fermé,

transition vers des teintes plus chaudes lorsqu’il est ouvert,

présence d’éléments graphiques évoquant un niveau d’eau (barre ou vague stylisée).

Ce panel permet une lecture immédiate de l’état du système, sans interprétation complexe.

5. Exploitation avancée du plugin VolkovLabs ECharts

Cette séance a permis une prise en main plus approfondie du plugin ECharts :

utilisation conjointe de plusieurs séries sur un même panel,

exploitation des objets graphic pour le texte et les formes,

calculs dynamiques côté client (JavaScript),

séparation claire entre logique de données et logique d’affichage.

Cette approche offre une grande liberté de design tout en restant intégrée à Grafana.

6. Bilan de la séance

À l’issue de cette séance :

les graphiques sont plus lisibles et expressifs,

le dashboard adopte une identité visuelle cohérente autour de l’eau,

la logique métier est mieux représentée (sens des mesures, état booléen),

les possibilités avancées d’ECharts sont maîtrisées,

le dashboard se rapproche d’un outil exploitable en contexte réel.

Voici les photos de la hauteur d'eau actuelle et du niveau de batterie:

<img width="525" height="292" alt="image" src="https://github.com/user-attachments/assets/446e97cf-4346-4baa-a14c-424060c99000" />


<img width="452" height="258" alt="image" src="https://github.com/user-attachments/assets/1da00185-d528-4b4f-80a1-292ac44b1648" />

7. Perspectives pour la prochaine séance

Les prochaines étapes envisagées sont :

finalisation du panel batterie (capacité et tension),

ajout d’animations légères pour renforcer la perception dynamique,

mise en place d’alertes Grafana natives,

préparation de l’intégration avec des capteurs physiques réels.
