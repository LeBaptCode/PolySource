# Séances des 20 et 21 janvier 2026  
## Reconstruction de l’environnement Grafana et reprise du dashboard

Lors de ces séances, l’objectif initial était de poursuivre l’amélioration du tableau de bord de supervision développé sous **Grafana**, afin d’obtenir une visualisation claire et exploitable des données issues du système de mesure, notamment la hauteur d’eau, le débit, l’état de la batterie et la détection d’un éventuel débordement.

Cependant, ces séances ont finalement été fortement perturbées par un incident technique majeur ayant entraîné la perte involontaire de l’environnement de travail précédemment configuré.

---

## Incident initial

Au début de la séance, je souhaitais simplement relancer les conteneurs Docker utilisés lors des séances précédentes afin de poursuivre le développement des panneaux de visualisation.

Lors de différentes manipulations destinées à relancer les services, nettoyer des conteneurs arrêtés et corriger des problèmes de redémarrage, j’ai supprimé involontairement certains conteneurs ainsi que des volumes associés à la base de données InfluxDB. À ce moment-là, je ne pensais pas que cette suppression aurait un impact important, mais il est rapidement apparu que certaines données nécessaires au fonctionnement du projet avaient disparu.

---

## Conséquences observées

Suite à cette suppression, la base de données ne démarrait plus correctement. Les conteneurs se lançaient puis s’arrêtaient immédiatement, affichant des erreurs liées à des fichiers de configuration manquants ou corrompus. Grafana, de son côté, ne parvenait plus à accéder aux données précédemment stockées, rendant les dashboards inutilisables.

Une partie importante de ces séances a donc été consacrée à analyser les erreurs, comprendre l’origine du problème et tenter de restaurer l’environnement existant. Malgré plusieurs tentatives de relance et de réparation, certaines données se sont révélées définitivement perdues, notamment les configurations des dashboards Grafana ainsi que les données générées pour les tests.

---

## Décision de reconstruction complète

Face à cette situation, la seule solution viable a été de repartir d’un environnement totalement propre. Cette décision a impliqué la suppression complète des conteneurs restants, le nettoyage des configurations incohérentes, puis la reconstruction intégrale de l’architecture du projet.

---

## Reconstruction de l’environnement Docker

La première étape a consisté à remettre en place correctement l’environnement Docker en utilisant le fichier `docker-compose` du projet afin de relancer simultanément les services Grafana et InfluxDB de manière cohérente.

Une attention particulière a été portée à la gestion des volumes de données afin d’éviter que ce type d’incident ne se reproduise. Une fois les services relancés, il a fallu reconfigurer InfluxDB, recréer les organisations, les buckets de stockage ainsi que les tokens d’accès nécessaires pour permettre à Grafana d’interroger correctement la base de données.

---

## Réinjection des données simulées

L’ensemble des données précédentes ayant été perdu, il a été nécessaire de relancer le script de génération de données simulées afin de recréer un historique de mesures exploitable pour le tableau de bord. Cette étape était indispensable pour pouvoir reconstruire les visualisations et tester le bon fonctionnement des panneaux.

---

## Reconstruction du dashboard Grafana

Une fois la base de données opérationnelle, la reconstruction du dashboard Grafana a pu commencer. Cette étape a demandé un travail conséquent puisque tous les panneaux précédemment réalisés avaient disparu. Chaque visualisation a donc été recréée manuellement :

- reconfiguration de la courbe représentant l’évolution de la hauteur d’eau ;
- reconstruction du panneau affichant le débit mesuré ;
- mise en place de l’affichage du niveau de batterie ;
- recréation de la visualisation indiquant la hauteur actuelle via un effet de remplissage ;
- ajout d’un indicateur de débordement permettant de visualiser rapidement l’état du système.

---

## Ajustements graphiques et ergonomiques

La reconstruction du tableau de bord a également été l’occasion d’améliorer certains aspects graphiques et ergonomiques. Plusieurs problèmes rencontrés précédemment ont été corrigés, notamment des erreurs liées à des champs de données mal interprétés ou à des scripts ne gérant pas correctement l’absence de données.

Une part non négligeable du travail a aussi été consacrée à l’ajustement de l’ergonomie des panneaux, au centrage des éléments graphiques, à l’amélioration de la lisibilité des informations et à l’harmonisation du style visuel de l’ensemble du dashboard. Plusieurs tests ont été réalisés afin de s’assurer que les visualisations restent cohérentes et lisibles, quelle que soit la taille des panneaux.

---

## Avancement sur la présentation du projet

Parallèlement à la reconstruction technique, j’ai également profité de ces séances pour avancer sur la préparation de la présentation du projet. J’ai commencé à structurer le contenu de la présentation, réfléchir à l’organisation des différentes parties et identifier les éléments techniques et visuels importants à mettre en avant. Ce travail préparatoire facilitera la réalisation des supports de présentation et la restitution finale du projet.

---

## Bilan de la séance

Malgré la frustration initiale liée à la perte de l’environnement précédent, ces séances ont permis de consolider la compréhension globale du fonctionnement de Docker, de la gestion des conteneurs et des volumes de données, ainsi que des interactions entre Grafana et InfluxDB. Cette reconstruction complète a également permis de repartir sur une architecture plus propre et mieux organisée.

Cette expérience met en évidence l’importance de sauvegarder régulièrement les configurations et de documenter précisément les étapes de mise en place afin de pouvoir restaurer rapidement un environnement en cas de problème. Pour les prochaines séances, la mise en place d’une procédure de sauvegarde des dashboards Grafana est prévue afin d’éviter toute perte de travail similaire.

---

## Conclusion

Bien que ces séances aient été fortement perturbées par un incident technique entraînant la suppression accidentelle d’une partie de l’environnement, elles ont permis de reconstruire entièrement le système et d’aboutir à un tableau de bord fonctionnel. Cette reconstruction a renforcé la compréhension technique des outils utilisés et contribuera à améliorer la robustesse du projet pour la suite.
