# Séance du 03/04/2026

## 🎯 Objectifs de la séance
* Poursuivre l'intégration visuelle du Dashboard Grafana.
* Résoudre les problèmes de surchauffe critique du Raspberry Pi impactant la stabilité de la carte SD.

---

## 🛠️ Réalisations 

### Gestion thermique : Diagnostic et interventions matérielles
Suite aux crashs répétés constatés lors de la configuration du Dashboard, j'ai identifié que le dissipateur passif actuel est insuffisant pour dissiper la chaleur générée par la stack Docker (T.I.G), entraînant des ralentissements et des risques de corruption de données.

* **Solution Hardware :** Sur les conseils de M. PETER, j'ai conçu un système de refroidissement actif temporaire. 
    * **Soudure et adaptation :** J'ai rallongé les câbles d'un micro-ventilateur 5V et attaché des fiches bananes pour permettre une alimentation stable via une alimentation de laboratoire.
    * **Flux d'air :** Le ventilateur a été positionné de manière à maximiser le flux d'air direct sur le dissipateur thermique du processeur. 


### Analyse de la charge système et pistes d'optimisation
J'ai observé une corrélation directe entre l'utilisation de l'interface Grafana pour la configuration des différents panels et l'apparition des ralentissements, alors que la navigation sur InfluxDB ou HiveMQ Cloud ne semble pas en provoquer.

* **Analyse logicielle :** Le rendu graphique de Grafana semble constituer le principal "bottleneck" thermique. Avant d'envisager des mesures matérielles permanentes, plusieurs pistes sont à l'étude :
    1. **Optimisation logicielle :** Limiter la fréquence de rafraîchissement des panels.
    2. **Underclocking :** Selon la [documentation officielle Raspberry Pi](https://pip.raspberrypi.com/categories/685-app-notes-guides-whitepapers/documents/RP-003608-WP/Cooling-a-Raspberry-Pi-device.pdf), réduire la fréquence d'horloge permettrait de diminuer la production de chaleur, au risque d'impacter les performances globales.


* **Veille technologique :** 

    * **Refroidissement :** En m'appuyant sur les préconisations de la documentation technique officielle concernant la gestion thermique, il est mentionné une Cooling Case (dissipation passive intégrale) ou le [Raspberry Pi Active Cooler](https://www.raspberrypi.com/products/active-cooler/) (refroidissement actif régulé) comme les solutions les plus robustes pour garantir la pérennité du matériel.
    * **Stockage :** Le volume d'écritures de la stack T.I.G pose la question de la durée de vie de la carte SD. Bien qu'un passage sur un **SSD NVMe** (via un HAT) ou une carte SD **High Endurance** (industrielle) soit une solution classique pour limiter les risques de corruption, j'estime que pour l'usage actuel du prototype, une carte SD de bonne qualité reste suffisante si la température est maîtrisée.

---

## ➡️ Prochaine séance

* **Profiling des ressources :** Utiliser des outils de monitoring (`htop`, `docker stats`) pour identifier précisément les processus consommant le plus de CPU/RAM.
* **Optimisation Grafana :** Ajuster les paramètres de rendu pour alléger la charge processeur.
* **Intégration finale :** Reprendre l'ajout des composants visuels sur un système thermiquement stabilisé.