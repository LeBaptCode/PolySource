# Stack IoT PolySource (TIG + HiveMQ Cloud)

Ce projet déploie une infrastructure complète de collecte, de stockage et de visualisation de données IoT sur **Raspberry Pi 5** via Docker. 

## Installation et Déploiement

### 1. Préparation
### 1. Préparation
1. Placez le dossier `PolySource` dans `~/Documents/PolySource`.
2. **IMPORTANT :** Créez ou copiez le fichier `.env` à la racine du dossier `~/Documents/PolySource`. Ce fichier est indispensable car il contient tous les identifiants, tokens InfluxDB et mots de passe nécessaires au fonctionnement des services.

### 2. Lancement automatisé
Le script `setup.sh` s'occupe de tout : installation de Docker (si absent), configuration des dossiers système dans `/opt/tig_stack`, gestion des permissions Grafana et **lancement automatique des conteneurs**.

```bash
cd ~/Documents/PolySource
chmod +x setup.sh
sudo ./setup.sh
```

> **Note :** Une fois le script terminé, votre infrastructure est déjà opérationnelle dans le répertoire final `/opt/tig_stack`.

## Structure du Projet

```bash
/PolySource
├── docker-compose.yml     # Orchestration des services
├── .env                   # Variables d'environnement (Tokens, Passwords)
├── setup.sh               # Script d'automatisation des permissions et dossiers
├── telegraf/
│   └── telegraf.conf      # Configuration du collecteur (MQTT Cloud -> InfluxDB)
├── influxdb_data/         # Données de la base (créé par le setup)
├── grafana_data/          # Données de Grafana (créé par le setup)
└── grafana/
    └── provisioning/      # Import automatique des sources et dashboards
        ├── datasources/
        │   └── datasource.yml  # Configuration de la source InfluxDB
        └── dashboards/
            └── dashboard.json   # Dashboard préconfiguré pour les données IoT
            └── dashboard.yml    # Configuration de l'import automatique
```

## Accès aux Services

| Service | Port | URL (Local / Réseau) |
| :--- | :--- | :--- |
| **Grafana** | 3000 | `http://localhost:3000` ou `http://<IP_DU_PI>:3000` |
| **InfluxDB** | 8086 | `http://localhost:8086` ou `http://<IP_DU_PI>:8086` |
| **HiveMQ Cloud** | 8883 (TLS) | [https://console.hivemq.cloud/](https://console.hivemq.cloud/) |

## Arrêt sécurisé de la Raspberry Pi

**ATTENTION :** Ne débranchez jamais la Raspberry Pi sans avoir arrêté les services Docker au préalable. Une coupure brutale peut corrompre la base de données InfluxDB et endommager la carte SD.

Pour éteindre proprement le système, suivez ces étapes :

1. **Se positionner dans le répertoire de la stack :**
   ```bash
   cd /opt/tig_stack
   ```
2. **Arrêter les services Docker :**
   ```bash
   sudo docker compose -f /opt/tig_stack/docker-compose.yml stop
   ```
   > **Note**: L'option -f /opt/tig_stack/docker-compose.yml n'est nécessaire que si vous n'êtes pas déjà dans le dossier.
3. **Éteignez le système :**
   ```bash
   sudo shutdown now
   ```