# 🚀 Stack IoT PolySource (TIG + HiveMQ)

Ce projet déploie une infrastructure complète de collecte, de stockage et de visualisation de données IoT sur **Raspberry Pi 5** via Docker.

## 🏗 Structure du Projet

```bash
/PolySource
├── docker-compose.yml     # Orchestration des services
├── telegraf/
│   └── telegraf.conf      # Configuration du collecteur (MQTT -> InfluxDB)
├── influxdb/              # Données persistantes de la base (Volume)
├── grafana/               # Dashboards et réglages (Volume)
└── hivemq/                # Broker MQTT (Données et Logs)
```

## 🛠 Accès aux Services

| Service | Port | Interface Web / API |
| --- | --- | --- |
| **HiveMQ** | 1883 / 8080 | `http://<IP_DU_PI>:8080` |
| **InfluxDB** | 8086 | `http://<IP_DU_PI>:8086` |
| **Grafana** | 3000 | `http://<IP_DU_PI>:3000` |

## ⚙️ Paramètres InfluxDB 2.x

Pour lier les services, utilisez les paramètres suivants :

* **Organisation :** `PolySource`
* **Bucket :** `polysource_data`
* **Token :** *Générer un "All Access Token" dans InfluxDB > Data > Tokens.*

## 🚀 Commandes de Gestion

### Lancer la stack

```bash
docker compose up -d

```

### Vérifier l'état des containers

```bash
docker ps

```

### Consulter les logs de Telegraf (Débogage)

```bash
docker logs -f telegraf

```
