# Séance du 24/04/2026

## 🎯 Objectifs de la séance
* **Automatisation de la configuration :** Développement d'un script de déploiement automatique pour l'installation des dépendances système.
* **Industrialisation :** Finalisation du fichier `docker-compose.yml` et de la structure de fichiers pour un déploiement "en un clic" de la stack T.I.G. .

---

## 🛠️ Réalisations 

### Gestion d'incident et résilience du système
Malgré une extinction correcte et une surveillance thermique lors de la séance précédente, la carte SD a subi une défaillance critique irréversible : elle n'est désormais plus détectée par aucun système.

Face à cette instabilité récurrente du support physique, j'ai pris la décision de consacrer cette dernière séance à **l'automatisation complète de l'environnement**. L'objectif est de rendre le projet indépendant du matériel : en cas de panne, le système peut désormais être reconstruit intégralement sur une carte neuve en quelques minutes.

### Architecture de déploiement "Zero-Configuration"
J'ai structuré le projet de manière professionnelle afin de séparer la logique de déploiement, les fichiers de configuration et les données sensibles.

**Arborescence technique du projet :**
```text
PolySource/
├── .env                 # Variables d'environnement (secrets, mots de passe) - IGNORET PAR GIT
├── .gitignore           # Protection des données sensibles
├── docker-compose.yml   # Orchestration des services (Docker)
├── setup.sh             # Script Bash d'installation automatique du système
├── telegraf/
│   └── telegraf.conf    # Configuration de la collecte de données
└── grafana/
    └── provisioning/    # Auto-configuration des sources et dashboards
        ├── datasources/
        │   └── datasource.yml 
        └── dashboards/
            ├── dashboard.yml
            └── Dashboard_Grafana.json
```

### Points clés de l'implémentation

* **Script `setup.sh` :** Ce script automatise la mise à jour du système, l'installation de Docker, de Docker-Compose et la configuration des permissions nécessaires.
* **Sécurisation via `.env` :** Centralisation des identifiants (tokens InfluxDB, mots de passe) dans un fichier unique. L'utilisation du `.gitignore` garantit que ces secrets ne sont jamais exposés sur le dépôt public.
* **Provisioning Grafana :** J'ai configuré le "provisioning" automatique. Cela signifie qu'à l'installation, Grafana détecte automatiquement la base InfluxDB et charge le tableau de bord sans aucune intervention manuelle dans l'interface web.



