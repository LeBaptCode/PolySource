#!/bin/bash

# Vérification des droits administrateur
if [ "$EUID" -ne 0 ]; then
  echo "Veuillez exécuter ce script avec sudo (ex: sudo ./setup.sh)"
  exit 1
fi

echo "=== 1. Mise à jour du système Raspberry Pi ==="
apt-get update -y && apt-get upgrade -y

echo "=== 2. Installation de Docker ==="
if ! command -v docker &> /dev/null; then
    echo "Installation de Docker en cours..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    
    # Ajout de l'utilisateur ayant lancé sudo au groupe docker
    if [ -n "$SUDO_USER" ]; then
        usermod -aG docker $SUDO_USER
        echo "L'utilisateur $SUDO_USER a été ajouté au groupe docker."
    fi
else
    echo "Docker est déjà installé sur cette machine."
fi

echo "=== 3. Préparation du répertoire de déploiement ==="
DEST_DIR="/opt/tig_stack"

# Création du dossier cible
mkdir -p $DEST_DIR
echo "Copie de la configuration actuelle vers $DEST_DIR..."

# Copie de tous les fichiers du dossier courant vers /opt/tig_stack
cp -a ./. $DEST_DIR/

# Ajustement des permissions pour éviter les problèmes de droits avec les volumes Docker
if [ -n "$SUDO_USER" ]; then
    chown -R $SUDO_USER:$SUDO_USER $DEST_DIR
fi

echo "=== 4. Gestion des données InfluxDB ==="
# On vérifie si le dossier existe ET s'il contient des fichiers
if [ -d "$DEST_DIR/influxdb_data" ] && [ "$(ls -A $DEST_DIR/influxdb_data 2>/dev/null)" ]; then
    echo "✔️  Une base de données InfluxDB existante a été détectée."
    echo "   -> Opération ignorée : vos données et votre historique sont conservés."
else
    echo "Première installation détectée : préparation du dossier pour l'auto-configuration..."
    rm -rf $DEST_DIR/influxdb_data/* 2>/dev/null
fi

echo "=== 5. Démarrage de la stack TIG ==="
cd $DEST_DIR

mkdir -p $DEST_DIR/grafana_data
chown -R 472:472 $DEST_DIR/grafana_data

# Utilisation de docker compose (plugin V2)
docker compose up -d

IP_LOCAL=$(hostname -I | awk '{print $1}')

echo "====================================================="
echo "✅ Déploiement terminé avec succès !"
echo "Grafana sera disponible sur : http://$IP_LOCAL:3000"
echo "InfluxDB sera disponible sur : http://$IP_LOCAL:8086"
echo "⚠️ Note: Si c'est la première installation de Docker, vous devrez vous déconnecter/reconnecter de la session SSH pour utiliser 'docker' sans sudo."
echo "====================================================="
