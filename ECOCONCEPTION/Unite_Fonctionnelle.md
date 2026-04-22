# Définition de l'Unité Fonctionnelle

Ce document définit l'unité fonctionnelle utilisée comme base de référence pour l'Analyse du Cycle de Vie du système de surveillance de bassin.

## 1. L'Unité Fonctionnelle

L'unité fonctionnelle retenue pour ce projet est :

> **"Assurer la surveillance automatisée d'un bassin de haute montagne en mesurant le niveau d'eau et le débit de débordement, puis en transmettant ces données via le réseau mobile (4G/MQTT) à une fréquence de [24 fois par jour], avec une autonomie énergétique totale, sur une durée de vie de [5 ans]."**

## 2. Analyse des flux et critères de performance

Pour être valide, cette unité fonctionnelle répond aux quatre dimensions de l'éco-conception :

| Dimension | Description | Valeur de référence |
| :--- | :--- | :--- |
| **Quoi (Fonction)** | Mesurer les paramètres physiques d'une source (niveau, débit, état de débordement) et l'état du système (batterie), puis transmettre les données. | 1 payload JSON contenant 7 variables (ID, lieu, timestamp, niveau en cm, débit en L/min, % batterie, alerte débordement). |
| **Combien (Quantité)** | Nombre de cycles complets d'exécution (Acquisition capteurs + formatage JSON + envoi MQTT). | [1 cycle par heure] |
| **Combien de temps (Durée)** | Durée de maintien du service de surveillance en conditions réelles d'exploitation (haute montagne). | [5 ans] |
| **Qualité (Performance)** | Continuité de service en zone isolée incluant l'auto-diagnostic énergétique (suivi du %). | Réseau 4G / Alimentation sur batterie avec monitoring intégré. |

## 3. Justification du choix

Le choix de cette unité fonctionnelle permet de comparer l'impact environnemental de notre solution avec des alternatives potentielles (par exemple : une surveillance humaine physique ou un système filaire classique). 

* **Fréquence :** Une mesure horaire est jugée suffisante pour une surveillance de débordement en haute montagne tout en préservant la batterie.
* **Durée de vie :** Une période de 5 ans est l'objectif de conception pour l'électronique exposée aux cycles gel/dégel, avant maintenance majeure ou remplacement.
* **Flux de référence :** Pour remplir cette unité fonctionnelle, le système nécessite l'utilisation d'un microcontrôleur ESP32, de deux capteurs, d'un modem 4G et d'un système de stockage d'énergie (batterie).
