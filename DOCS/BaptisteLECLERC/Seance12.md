# Séance du 05/03/2026

## 🎯 Objectifs de la séance
* Intégrer les éléments visuels du dashboard développés par l'équipe.
* Établir la liaison dynamique entre les widgets Grafana et la base de données InfluxDB.

---

## 🛠️ Réalisations 

### Intégration et Finalisation du Dashboard Grafana
Cette séance a été consacrée à la mise en service opérationnelle de l'interface de visualisation sur la Raspberry Pi :

* **Fusion des travaux collaboratifs :** Implémentation des composants graphiques conçus par Ibadete au sein de notre instance Grafana locale.
* **Configuration des Data Sources :** Paramétrage des connecteurs pour lier les panneaux d'affichage au bucket spécifique d'InfluxDB.
* **Mapping des données :** Configuration des requêtes (*queries*) pour faire correspondre les widgets aux clés des données JSON (`water_level_cm`, `flow_rate_l_min`, `battery_percent`, `overflow`).
* **Optimisation visuelle en cours :** Bien que la chaîne de données soit fonctionnelle, certains éléments graphiques nécessitant encore des ajustements esthétiques pour garantir une expérience utilisateur optimale.

---

## ➡️ Prochaine séance

* **Finitions Dashboard :** Procéder aux dernières corrections graphiques pour finaliser l'interface de monitoring.
* **Cahier des charges PCB :** Lister les contraintes techniques pour la conception de la carte électronique :
    * Schéma d'intégration des composants (ESP32, capteurs, régulateurs).
    * Définition des dimensions et du boîtier pour garantir l'étanchéité et la protection en milieu extérieur.