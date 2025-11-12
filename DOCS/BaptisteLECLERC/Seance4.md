# Séance du 12/11/2025

## 🎯 Objectif de la séance

* L'objectif initial était de poursuivre la configuration de la stack Firebase. Cependant, je me suis rappelé de l'existance de **Grafana**, un outil de visualisation open-source standard de l'industrie, a révélé qu'il était bien plus adapté à nos besoins.
* L'objectif de la séance est donc devenu de **valider le changement de stack** vers une architecture basée sur Grafana et d'identifier les composants nécessaires.

---

## 🛠️ Réalisations / Décisions

### Répartition des tâches

La répartition globale des rôles (Backend/Frontend) est maintenue, mais les outils changent :

* **Frontend (Ibadete) :** L'exploration de Vue.js est mise en pause au profit de la maîtrise de **Grafana** pour la création et la configuration des dashboards.
* **Backend (Moi) :** Le travail se concentre sur la mise en place d'une base de données compatible car Firebase n'est pas supporté nativement par Grafana.

### Architecture de la Stack de Monitoring IoT

Pour ce projet, nous avons opté pour une architecture à la fois fiable, légère et efficace. Elle repose sur une architecture standard de l'IoT, souvent appelée la **stack TIG** (pour **T**elegraf, **I**nfluxDB, **G**rafana), à laquelle nous ajoutons un broker MQTT (Mosquitto) pour la collecte.

*Un exemple de projet utilisant cette stack peut être consulté ici : [Lien vers l'article Medium](https://medium.com/@farell.alvaro/seamless-data-transmission-from-esp32-to-grafana-a-docker-powered-containers-with-mqtt-node-red-90c3fbe64f8f)*

**1. Le Point d'Entrée : Broker MQTT (Mosquitto)**

Pour assurer une transmission fiable et légère des données depuis l'ESP32 (surtout avec une connexion GSM potentiellement instable), nous utiliserons le protocole **MQTT**. L'outil choisi est **Mosquitto**, un broker MQTT open-source réputé pour sa légèreté. L'ESP32 "publiera" ses mesures sur un "topic" (un canal) spécifique sur le serveur Mosquitto.

**2. Le Connecteur : Agent de Collecte (Telegraf)**

Une fois la donnée arrivée chez Mosquitto, elle doit être déplacée vers notre base de données. C'est le rôle de **Telegraf**. C'est un agent de collecte "sans état" (stateless) très efficace. Nous le configurons pour "s'abonner" au topic MQTT de Mosquitto. Dès qu'un message est publié, Telegraf le récupère et l'insère dans la base de données.

**3. Le Stockage : Base de Données (InfluxDB)**

Une base de données SQL classique n'est pas optimale car elle est conçue pour des relations complexes et devient très lente pour ingérer un flux constant de données horodatées. Nous utilisons **InfluxDB**, une **Base de Données de Séries Temporelles (TSDB)**. Elle est spécifiquement conçue pour stocker et interroger massivement ces données horodatées, la rendant idéale pour le monitoring.

**4. L'Affichage : Visualisation (Grafana)**

Enfin, pour l'interface utilisateur, nous utilisons **Grafana**. Grafana n'est pas une base de données, c'est un outil de **visualisation** pur. Nous le connectons à notre "source de données" (**InfluxDB**) et il se charge de lire les données pour les transformer en graphiques et jauges interactifs.

---

*Figure 1 : Schéma du flux de données de l'architecture choisie.*
---

### Hébergement : Le défi du Raspberry Pi

Plutôt que d'utiliser les versions cloud "freemium" (souvent limitées), nous souhaitons **auto-héberger** la stack open-source complète sur un **Raspberry Pi**.

Cependant, le Raspberry Pi 1B mis à notre disposition s'avère **incompatible**. Son processeur (ARMv6) et sa RAM (512 Mo) sont insuffisants pour les outils modernes.

**Prérequis Matériels :**

* **Grafana :** Recommande un **Pi 4/5 avec au moins 2 Go de RAM**.
    * *[Source](https://www.sunfounder.com/blogs/news/raspberry-pi-grafana-complete-installation-setup-and-dashboard-guide)*
* **InfluxDB v2 :** Requiert un **Pi 4+** et un **système d'exploitation 64-bit**.
    * *[Source](https://docs.influxdata.com/influxdb/v2/install/?section=influxdb%2Fv2%2Finstall&t=Raspberry+Pi)*
* **Mosquitto et Telegraf :** Sont très légers et pourraient fonctionner, mais sont inutiles sans la base de données et le dashboard.

### Méthode de Déploiement : Docker

Pour gérer ces quatre services de manière propre et isolée sur le Raspberry Pi, nous utiliserons **Docker**. Chaque service tournera dans son propre conteneur, ce qui simplifiera grandement l'installation, les mises à jour et la maintenance.

![Fonctionnement de la Stack TIG](https://cristianpb.github.io/assets/img/grafana-dashboard/main.jpg)
*Figure 1 : Fonctionnement de la Stack TIG. Source : [Cristian Brokate, "Creating parametrisable dashboards using Grafana"](https://cristianpb.github.io/blog/grafana-dashboard).*

---

## ➡️ Prochaine séance

* Valider l'obtention d'un **Raspberry Pi 4 (ou 5)** pour débloquer la situation.
* **Si nouveau matériel disponible :** Commencer la mise en place de la stack complète via Docker Compose.
* **Si matériel non disponible :** Trouver des alternatives pour l'auto-hebergement sur la Raspberry Pi 1B.