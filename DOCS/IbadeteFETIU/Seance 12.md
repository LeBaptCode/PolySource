# Rapport de séance du 05/03/2026  
## Reconstruction du dashboard Grafana et amélioration de la supervision du système

---

## 1. Objectif de la séance

L’objectif de cette séance était de remettre en place une interface de supervision pleinement fonctionnelle sur la Raspberry Pi, tout en améliorant certains aspects de la visualisation et de la robustesse du dashboard Grafana.

En parallèle, une réflexion a été initiée sur l’amélioration de la gestion des données et des alertes du système.

---

## 2. Reconstruction de l’environnement de visualisation

L’environnement Docker étant déjà opérationnel, le travail s’est concentré sur la partie Grafana. Il a été constaté que les dashboards développés localement n’étaient pas présents sur la Raspberry Pi, ce qui a nécessité une reconstruction complète de l’interface.

Après réinstallation du plugin ECharts, indispensable pour les visualisations avancées, les panneaux ont été recréés à partir des scripts existants, en les adaptant à l’environnement embarqué.

Contrairement au développement local, cette étape a permis de valider le fonctionnement du système dans des conditions plus proches de l’utilisation finale, notamment en termes de performance et de stabilité.

---

## 3. Amélioration de la gestion des données

Lors de la reconstruction, une attention particulière a été portée à la gestion des données issues d’InfluxDB, notamment dans les cas où certaines mesures ne sont pas disponibles.

Plusieurs améliorations ont été apportées :

- mise en place de conditions pour éviter les erreurs lorsque les données sont nulles ou absentes  
- filtrage des valeurs incohérentes afin d’éviter des affichages erratiques  
- adaptation des requêtes pour garantir une meilleure continuité des courbes  

Ces modifications permettent d’obtenir un affichage plus fiable, en particulier dans un contexte réel où les capteurs peuvent produire des données irrégulières.

---

## 4. Optimisation des visualisations

Au-delà de la simple reconstruction des panneaux, un travail d’optimisation a été réalisé afin d’améliorer la lisibilité du dashboard :

- ajustement des échelles pour une meilleure interprétation des variations  
- homogénéisation des unités affichées  
- amélioration de la disposition des panneaux pour une lecture plus intuitive  

Ces modifications visent à rendre l’interface exploitable rapidement, sans nécessiter d’analyse approfondie de la part de l’utilisateur.

---

## 5. Finalisation de l’indicateur de débordement

Le panneau de détection de débordement a été finalisé en mettant en place un indicateur visuel clair et immédiatement compréhensible.

L’indicateur permet désormais :

- une identification rapide de l’état du système (normal / overflow)  
- un affichage stable, indépendant de la taille de la fenêtre  
- une meilleure visibilité grâce à un contraste renforcé  

Ce composant constitue un élément critique du dashboard, car il permet de détecter rapidement une situation anormale.

---

## 6. Exploration d’une gestion d’alertes (travail partiel)

En complément des tâches principales, une réflexion a été engagée sur la mise en place d’un système d’alertes automatiques basé sur les données collectées.

L’objectif était de pouvoir :

- déclencher une alerte en cas de dépassement de seuil (niveau d’eau ou débit)  
- notifier l’utilisateur via une interface distante  
- anticiper les situations critiques (débordement, batterie faible)  

Une première approche a été envisagée en utilisant les fonctionnalités d’alerting de Grafana. Toutefois, cette implémentation n’a pas été finalisée durant la séance, notamment en raison du temps nécessaire à la configuration et aux tests.

Ce travail reste une piste d’amélioration pertinente pour les prochaines étapes du projet.

---

## 7. Résultats obtenus

À l’issue de cette séance :

- le dashboard Grafana est entièrement fonctionnel sur la Raspberry Pi  
- les données sont correctement récupérées et affichées  
- la robustesse de l’affichage a été améliorée  
- l’indicateur de débordement est finalisé et opérationnel  

De plus, une première réflexion sur les mécanismes d’alerte a été initiée.

---

## 8. Conclusion et perspectives

Cette séance a permis de consolider la partie supervision du projet en garantissant une interface stable et directement utilisable sur la plateforme embarquée.

Les améliorations apportées ne se limitent pas à la reconstruction des panneaux, mais contribuent également à rendre le système plus robuste et exploitable en conditions réelles.

Pour la suite du projet, plusieurs axes d’amélioration sont identifiés :

- mise en place d’un système d’alertes fonctionnel  
- intégration complète sur un PCB dédié  
- optimisation de la consommation énergétique  

Ces évolutions permettront de faire évoluer le système vers une solution plus autonome et industrialisable.
