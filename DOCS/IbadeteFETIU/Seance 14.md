# Rapport de séance du 03/04/2026  
## Analyse des limitations du système et étude de la stabilité thermique de la Raspberry Pi

---

## 1. Objectif de la séance

L’objectif de cette séance était de poursuivre le travail sur la partie supervision du projet tout en analysant les problèmes de stabilité rencontrés sur la Raspberry Pi, notamment liés aux performances et à la gestion thermique du système.

---

## 2. Observation des problèmes de stabilité

Lors de l’utilisation du dashboard Grafana, plusieurs dysfonctionnements ont été observés :

- ralentissements importants lors de la configuration des panels  
- latence élevée dans l’interface  
- instabilité globale du système  

Ces problèmes apparaissent principalement lors de l’utilisation intensive de Grafana, ce qui a orienté l’analyse vers une limitation des ressources de la Raspberry Pi.

---

## 3. Analyse du comportement du système

Une observation du comportement global du système a permis de mettre en évidence une corrélation entre :

- l’utilisation du dashboard Grafana  
- l’augmentation de la charge processeur  
- l’apparition de ralentissements  

À l’inverse, l’utilisation d’autres services comme InfluxDB ou le broker MQTT ne semblait pas provoquer les mêmes effets, ce qui suggère que **le rendu graphique de Grafana constitue une charge importante pour le système**.

Cette analyse met en évidence un possible **goulot d’étranglement (bottleneck)** au niveau du CPU.

---

## 4. Réflexion sur les contraintes thermiques

Les ralentissements observés peuvent être liés à une élévation de la température du processeur de la Raspberry Pi.

Dans ce contexte, plusieurs hypothèses ont été considérées :

- limitation des performances due à un phénomène de **thermal throttling**  
- impact de la stack Docker sur la consommation CPU  
- insuffisance du système de dissipation thermique actuel  

Cette réflexion souligne l’importance de prendre en compte les contraintes physiques du matériel dans un système embarqué.

---

## 5. Étude des pistes d’optimisation

Plusieurs pistes d’amélioration ont été envisagées afin de réduire la charge système et améliorer la stabilité :

### Optimisation logicielle
- réduction de la fréquence de rafraîchissement des panels Grafana  
- simplification des visualisations les plus complexes  
- limitation du nombre de panels affichés simultanément  

### Optimisation système
- analyse de la consommation des ressources (CPU, RAM)  
- identification des processus les plus consommateurs  

### Gestion thermique
- amélioration du refroidissement du système  
- adaptation de l’environnement matériel  

Ces pistes n’ont pas toutes été implémentées durant la séance, mais constituent des axes de travail importants pour la suite du projet.

---

## 6. Réflexion sur la fiabilité du système

Au-delà des performances, cette séance a permis d’aborder la question de la fiabilité du système, notamment concernant :

- les risques de corruption de la carte SD en cas de surchauffe  
- la stabilité du système en fonctionnement continu  
- l’adaptation du prototype à une utilisation réelle  

Ces éléments sont critiques dans un projet de monitoring, où la continuité de service est essentielle.

---

## 7. Résultats obtenus

À l’issue de cette séance :

- les causes possibles des ralentissements ont été identifiées  
- le rôle de Grafana comme charge principale du système a été mis en évidence  
- les contraintes thermiques ont été prises en compte dans l’analyse  
- plusieurs pistes d’optimisation ont été définies  

---

## 8. Conclusion et perspectives

Cette séance a permis de mieux comprendre les limites du système actuel, en particulier en termes de performances et de gestion thermique.

Elle met en évidence l’importance d’une approche globale intégrant à la fois :

- le logiciel (optimisation des traitements)  
- le matériel (refroidissement, stockage)  

Pour la suite du projet, les actions suivantes sont envisagées :

- mise en place d’outils de monitoring des ressources (CPU, RAM)  
- optimisation du dashboard Grafana  
- amélioration des conditions de fonctionnement thermique  

Ces améliorations permettront de garantir un fonctionnement plus stable et fiable du système dans des conditions réelles.
