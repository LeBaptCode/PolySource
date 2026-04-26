# Séance du 17/02/2026

## 🎯 Objectifs de la séance
* Définir la structure de données pour l'envoi des mesures.
* Intégrer cette stucture à Grafana
* Poursuivre les tests de communication MQTT.

---

## 🛠️ Réalisations 

### Modélisation et Intégration des données
* **Définition de la structure des données :** J'ai déterminer la structure des messages JSON envoyés par les capteurs. Cette étape permet d'uniformiser la réception des données dans la stack.

Exemple de message avec données simulées :


```JSON
{
    "device_id": "source01",
    "location" : "spring_A",
    "timestamp": 1708185600,
    "water_level_cm" : 45.2, 
    "flow_rate_l_min" : 12.5,
    "battery_percent" : 88,
    "overflow" : 0
}
```

Justification des choix :

* Scalabilité : Les clés `device_id` et `location` permettent de gérer plusieurs stations sans modifier l'architecture.

* Intégrité temporelle : Le `timestamp` (Unix Epoch) assure la précision des mesures, même en cas de retard réseau.

Les autres champs correspondent au cahier des charges.

___


### Validation du pipeline de données
* **Test d'ingestion InfluxDB :** Validation complète du flux de données, de l'envoi à la persistance en base.
    * **Parsing Telegraf :** Vérification de la récupération et du tri automatique des champs (*fields*) et des étiquettes (*tags*).
* **Collaboration Frontend :** Le backend étant validé, la prochaine étape consiste à accompagner Ibadete dans l'adaptation de ses composants d'affichage. L'objectif est de s'assurer que l'interface exploite parfaitement les nouvelles clés du JSON.



### Tests de communication 
* **Test d'envoi (Publisher) :** Confirmation du bon fonctionnement de la liaison entre le Raspberry Pi et **HiveMQ Cloud**. Les messages émis depuis le Pi sont bien visibles en temps réel sur la console du broker.

* **Vérification de la persistance :**
    * **InfluxDB :** Les données simulées via MQTT sont correctement enregistrées en base (vérification par requêtes CLI).
    * **Grafana :** Les graphiques réagissent instantanément aux données entrantes, validant l'interopérabilité de toute la stack logicielle.



---

## ➡️ Prochaine séance

* **Cahier des charges PCB :** Lister les contraintes techniques pour la conception de la carte électronique :
    * Schéma d'intégration des composants (ESP32, capteurs, régulateurs).
    * Définition des dimensions et du boîtier pour garantir l'étanchéité et la protection en milieu extérieur.
