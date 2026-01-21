# Séance du 20/01/2026 & 21/01/2026

## 🎯 Objectif de la séance
* Établir la connexion entre l'ESP32 et le Raspberry Pi via le protocole **MQTT**.

---

## 🛠️ Réalisations 

### Reconfiguration du Raspberry Pi
* **Diagnostic matériel :** Lors du redémarrage, la Raspberry Pi est restée bloquée sur l'écran de démarrage avec une **LED verte fixe**. Ce symptôme indique généralement que l'OS n'est pas détecté ou que la carte SD présente un défaut de flashage.
* **Réinstallation :** J'ai dû procéder à une réinstallation complète du système d'exploitation, entraînant la perte des configurations précédentes.
* **Optimisation du processus :** La remise en état a été grandement simplifiée grâce à ma prise de notes lors des étapes initiales. Le fait d'avoir conservé les fichiers de configuration m'a permis de gagner du temps.
* **Configuration logicielle :** En raison d'un partage de connexion instable sur place, j'ai finalisé l'installation des outils et des dépendances à domicile pour garantir un environnement sain et fonctionnel.

### Passage des soutenances et veille
* **Découverte des projets :** La session de soutenances a été l'opportunité d'observer les approches techniques de nos pairs. Cela a permis d'enrichir notre vision du projet en comparant différentes solutions face à des problématiques similaires.

### Tests de connexion MQTT & Diagnostic GSM
* **Problématique réseau :** Nous avons tenté d'établir la liaison entre l'ESP32 et le broker **HiveMQ Cloud**. 
* **Identification du blocage :** Nous avons identifié que la mauvaise couverture GSM à l'intérieur de la salle empêchait le module de s'enregistrer sur le réseau. Un changement d'emplacement a validé ce diagnostic et permis au module de capter le signal.
* **Statut actuel :** Malgré une connexion GSM désormais fonctionnelle, la liaison logicielle MQTT avec le broker n'est pas encore établie. Le débuggage est en cours pour identifier la source du problème.

---

## ➡️ Prochaine séance
* **MQTT :** Poursuivre les tests de connexion entre l'ESP32 (client) et HiveMQ.
* **Débuggage :** Déterminer la cause de l'échec de la liaison MQTT.