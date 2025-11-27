# Séance du 27/11/2025

## 🎯 Objectif de la séance

* L'objectif principal de la séance était l'impression d'un boîtier de protection pour le Raspberry Pi, ainsi que l'installation et la configuration complète de la stack logicielle de monitoring.

---

## 🛠️ Réalisations / Décisions

### 1. Impression du boitier du Raspberry Pi

Nous avons choisi d'imprimer un boîtier minimaliste pour le Raspberry Pi 5 afin de le protéger durant les phases de test.
* **Modèle :** [Minimal Raspberry Pi 5 Case sur MakerWorld](https://makerworld.com/fr/models/106015-minimal-raspberry-pi-5-case?from=search#profileId-456882)
* **Matériau :** PETG (réalisé au SoFab).

### 2. Configuration du Raspberry Pi

**Installation de l'OS :**
J'ai choisi d'utiliser **Raspberry Pi OS (64-bit)** via l'installateur officiel [Raspberry Pi Imager](https://www.raspberrypi.com/software/).
* **Choix de la version :** J'ai opté pour la version avec **interface graphique (Desktop)**. Bien qu'elle ne soit pas strictement nécessaire pour un serveur, elle est stratégique vu les contraintes réseaux de l'école. Elle nous permettra de configurer les services et d'afficher les dashboards en local (HDMI) si le réseau fait défaut.

---

### 3. Installation et Configuration des Services (Stack TIG)

Après avoir rencontré des difficultés de connexion sur le réseau de l'école, j'ai finalisé l'installation dans un environnement stable.

**Installation de Docker :**
Nous utilisons Docker pour isoler chaque service.
```bash
curl -fsSL [https://get.docker.com](https://get.docker.com) | sh
sudo usermod -aG docker $USER
```

**Configuration des services :**

J'ai créé un fichier `docker-compose.yml` pour déployer les services nécessaires.

Installation de InflxDB et Grafana via Docker Compose. 

On peut maintenat accéder à Grafana en local via `http://polysource.local:3000` et InfluxDB via `http://polysource.local:8086`.

Une fois configurés, j'ai continué avec Mosquitto et Telegraf.

Fichier de configuration de Mosquitto (`mosquitto.conf`) pour autoriser les connexions anonymes (à changer une fois que la connexion avec l'ESP32 sera fonctionnelle) :

```conf
persistence true
persistence_location /mosquitto/data/
log_dest file /mosquitto/log/mosquitto.log

# Autoriser les connexions de l'extérieur (Telegraf, ESP32)
listener 1883
# Autoriser la connexion sans mot de passe 
allow_anonymous true
```

Fichier de configuration de Telegraf (`telegraf.conf`) pour se connecter à Mosquitto et InfluxDB :

```toml
# Configuration globale
[agent]
  interval = "10s"
  round_interval = true
  metric_batch_size = 1000
  metric_buffer_limit = 10000
  collection_jitter = "0s"
  flush_interval = "10s"
  flush_jitter = "0s"
  precision = ""
  hostname = "telegraf-container"
  omit_hostname = false

[[inputs.mqtt_consumer]]
  servers = ["tcp://mosquitto:1883"]
  topics = ["source/mesures"]
  data_format = "json"

  #Configuration à faire selon le format des données envoyées par l'ESP32
  tag_keys = []

[[outputs.influxdb_v2]]
  urls = ["http://influxdb:8086"]
  token = "<TOKEN_INFLUXDB_MASQUÉ>"
  organization = "PolySource"
  bucket = "polysource_data"
```

Enfin, j'ai mis à jour le fichier `docker-compose.yml` pour inclure Mosquitto et Telegraf :

```yaml
services:
  influxdb:
    image: influxdb:2
    container_name: influxdb
    ports:
      - "8086:8086"
    volumes:
      - influxdb_data:/var/lib/influxdb2
    restart: always

  grafana:
    image: grafana/grafana-oss
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    restart: always

  mosquitto:
    image: eclipse-mosquitto
    container_name: mosquitto
    ports:
      - "1883:1883"     # Port pour l'ESP32 et Telegraf
      - "9001:9001"     # Port Websocket (optionnel)
    volumes:
      - ./mosquitto/config:/mosquitto/config
      - mosquitto_data:/mosquitto/data
      - mosquitto_log:/mosquitto/log
    restart: always

  telegraf:
    image: telegraf
    container_name: telegraf
    volumes:
      - ./telegraf/telegraf.conf:/etc/telegraf/telegraf.conf:ro
    depends_on:
      - influxdb
      - mosquitto
    restart: always

volumes:
  influxdb_data:
  grafana_data:
  mosquitto_data:
  mosquitto_log:
```

La commande qui permet de télécharger et lancer les conteneurs est la suivante :
```bash
docker compose up -d
```
---

### 4. Validation

J'ai testé la chaîne complète en publiant un message MQTT simulé pour vérifier que les données traversaient bien Mosquitto et Telegraf pour arriver dans InfluxDB puis être visualisées dans Grafana.

 ```bash
mosquitto_pub -h polysource.local -t source/mesures -m '{"idCapteur":"test123","valeur":12.5,"unite":"m"}'
 ```
**Résultat :** Le message est bien reçu dans InfluxDB et peut être visualisé dans Grafana.

---

## ➡️ Prochaines séances

**Court terme :**
* Création du dashboard Grafana définitif (visuels, jauges).
* Tests d'intégration avec l'équipe ESP32 (envoi de données réelles).
* Validation définitive du format JSON (Topic et Payload).

**Moyen terme (Améliorations) :**
* Mise en place de sauvegardes automatiques de la base InfluxDB.
* Documentation utilisateur de la solution.
* Étude de l'accès distant sécurisé (hors réseau local).