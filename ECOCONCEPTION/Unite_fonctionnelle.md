# Unité Fonctionnelle

---

## 1. Besoin et contexte du projet

Le projet répond à un besoin de **surveillance à distance d’un bassin d’eau situé dans un environnement isolé**, typiquement en haute montagne.

### 🔹 Problématique

| Élément | Description |
|--------|------------|
| Accès au site | Difficile (zone isolée, peu accessible) |
| Réseau | Pas de WiFi / Ethernet |
| Alimentation | Pas de réseau électrique |
| Maintenance | Limitée |

### 🔹 Besoin utilisateur

| Besoin | Description |
|--------|------------|
| Surveillance | Connaître l’état du bassin à distance |
| Sécurité | Détecter un débordement |
| Suivi | Observer l’évolution du niveau et du débit |
| Autonomie | Fonctionnement sans intervention humaine |

---

## 2. Cadre de fonctionnement du système

### 🔹 Conditions d’utilisation

| Paramètre | Valeur |
|----------|--------|
| Environnement | Extérieur (montagne) |
| Température | Variable |
| Accès | Limité |
| Durée de fonctionnement | Continu |
| Alimentation | Batterie |
| Communication | Réseau mobile 4G |

---

## 3. Définition de l’unité fonctionnelle

**Assurer la surveillance à distance d’un bassin d’eau isolé en mesurant le niveau d’eau et le débit de débordement, en transmettant ces données via le réseau mobile 4G (protocole MQTT) et en permettant leur visualisation sur une interface web, avec une acquisition toutes les 60 secondes, pour un fonctionnement continu pendant 1 an en environnement extérieur autonome.**

---

## 4. Décomposition technique du service

### 🔹 Chaîne fonctionnelle

| Étape | Technologie utilisée | Fonction |
|------|--------------------|--------|
| Mesure niveau | HC-SR04 | Distance → niveau d’eau |
| Mesure débit | DIGITEN G3/4 | Impulsions → débit |
| Traitement | ESP32 | Calcul + format JSON |
| Transmission | USR-DR154 (4G) | Envoi MQTT |
| Broker | HiveMQ Cloud | Réception des données |
| Traitement data | Telegraf | Parsing |
| Stockage | InfluxDB | Base temporelle |
| Visualisation | Grafana | Dashboard |
| Hébergement | Raspberry Pi | Exécution stack |

---

## 5. Quantification du service rendu

### 🔹 Hypothèses

| Paramètre | Valeur |
|----------|--------|
| Fréquence de mesure | 1 mesure / minute |
| Durée | 1 an |
| Heures/an | 8760 h |

---

### 🔹 Flux générés

| Type de flux | Quantité annuelle |
|-------------|------------------|
| Mesures capteurs | 525 600 |
| Traitements ESP32 | 525 600 |
| Messages MQTT | 525 600 |
| Écritures InfluxDB | 525 600 |
| Rafraîchissements Grafana | Variable |

---

## 6. Flot de référence

| Élément | Description |
|--------|------------|
| Flot de référence | 1 système complet |
| Composition | ESP32 + capteurs + GSM + Raspberry Pi + batterie |
| Durée | 1 an |
| Fonction | Réaliser 525 600 cycles de surveillance |

---

## 7. Frontières du système

### 🔹 Inclus dans l’ACV

| Élément |
|--------|
| Capteurs |
| ESP32 |
| Module GSM |
| Raspberry Pi |
| Batterie |
| Logiciels (MQTT, Telegraf, InfluxDB, Grafana) |
| Transmission de données |

---

### 🔹 Exclus

| Élément |
|--------|
| Antennes 4G |
| Infrastructure internet globale |
| Serveurs cloud physiques |
| Appareils utilisateur |
| Installation terrain |

---

## 8. Paramètres influents (ACV)

| Paramètre | Impact |
|----------|-------|
| Fréquence de mesure | Volume de données / énergie |
| GSM 4G | Consommation énergétique élevée |
| Raspberry Pi | Consommation continue |
| Batterie | Durée de vie |
| Température | Fiabilité et performance |

---

## 9. Domaine d’application

### 🔹 Cas d’usage

| Application | Description |
|------------|------------|
| Haute montagne | Surveillance bassin isolé |
| Gestion eau | Monitoring ressources |
| Industrie | Cuves / réservoirs |
| Environnement | Suivi écologique |

---

### Limites

| Limite | Impact |
|-------|-------|
| Dépendance réseau 4G | Risque de perte de données |
| Autonomie batterie | Durée limitée |
| Capteurs | Précision variable |
| Conditions météo | Fiabilité |

---

## 10. Conclusion

Cette unité fonctionnelle décrit un **service complet de monitoring à distance**, intégrant :

- le besoin utilisateur  
- les conditions réelles d’utilisation  
- la chaîne technique complète  
- une quantification précise  

Elle constitue une base pertinente pour une **analyse du cycle de vie (ACV)** et permet de comparer différentes architectures du système.
