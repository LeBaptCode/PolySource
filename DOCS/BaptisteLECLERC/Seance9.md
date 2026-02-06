# Séance du 03/02/2026

## 🎯 Objectif de la séance
* Configurer la connexion entre le broker **HiveMQ Cloud** et la **stack T.I.G.** sur le Raspberry Pi.
* Établir la connexion entre l'ESP32 et le Raspberry Pi via le protocole **MQTT**.

---

## 🛠️ Réalisations 

### Connexion de InfluxDB à HiveMQ Cloud
* **Configuration technique :** J'ai modifié le paramétrage de la stack (Telegraf/InfluxDB) afin de rediriger la collecte de données vers le broker distant **HiveMQ Cloud**, remplaçant ainsi l'ancienne configuration locale.
* **Sécurisation (SSL/TLS) :** La mise en place a nécessité la résolution de plusieurs erreurs de configuration liées aux protocoles de sécurité **SSL/TLS**. La connexion sécurisée entre le Raspberry Pi et le broker est désormais stable.

### Tests et validation de la chaîne de communication
J'ai utilisé les utilitaires `mosquitto_pub` et `mosquitto_sub` pour valider l'intégrité du flux de données de bout en bout :

* **Test de réception (Subscriber) :** Les messages publiés depuis le Web Client de HiveMQ Cloud sont correctement réceptionnés par le Raspberry Pi sur le topic `source/mesures`.
* **Test d'envoi (Publisher) :** L'émission de messages depuis le Raspberry Pi est bien visible en temps réel sur la console Cloud de HiveMQ.
* **Vérification du stockage et de l'affichage :**
    * **InfluxDB :** Les données entrantes sont bien enregistrées en base (vérification effectuée via des requêtes en console).
    * **Grafana :** Les tableaux de bord se mettent à jour, confirmant que le lien entre InfluxDB et Grafana est opérationnel.

---

## ➡️ Prochaine séance
* **Liaison ESP32 :** Poursuivre les tests pour établir la connexion entre l'ESP32 (client distant) et le broker HiveMQ Cloud.
* **Dossier de conception PCB :** Lister les contraintes techniques pour la réalisation de la carte électronique :
    * Intégration des différents composants sur un circuit unique.
    * Définition d'un boîtier adapté aux contraintes de l'environnement final.