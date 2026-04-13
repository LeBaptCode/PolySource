# Rapport de Séance 12

**Date :** 17/03/2026  
**Objectif fixé lors de la séance précédente :** Simplification via le port 1883 (broker public, sans chiffrement SSL)

Suite à l'impossibilité technique d'activer le SSL/SNI sur le firmware V1.3.25 du module GSM (confirmé lors de la séance précédente), nous avons décidé de simplifier la chaîne de communication pour valider l'envoi de données MQTT.

1. Configurer le module GSM sur le broker public en port 1883
2. Réussir une premiere comm simple, une premiere publication "Hello World" via les commandes AT vers le webclient HiveMQ
3. Réintégrer le code de pilotage dans l'ESP32 une fois la communication AT validée

## En pratique

En début de seance avons montré au professuer que le **WH-LTE-7S1** est correctement configuré pour la communication SMS en mode transparent :

- Le numéro de destination est enregistré dans la configuration
- Les APN (Free) sont correctement renseignés
- La connexion GSM est confirmée (LED NET allumée)
- En mode transparent, les SMS peuvent être envoyés et reçus sans passer par les commandes AT

### Essai avec le module FT232RL (USB vers port série)

Nous avons testé un nouveau module conçu pour assurer la conversion de signal entre RS232/TTL et USB, dans le but de simplifier la connexion entre le PC et le module GSM USR-DR154

![FT232RL](https://github.com/user-attachments/assets/53b13957-c9f7-4218-a123-d92749b8e003)

**Problème identifié :** Le module USR-DR154 utilise un port série **RS485**, incompatible avec le FT232RL qui gère du RS232/TTL. Sans module de conversion RS485 vers TTL, la connexion directe est impossible.

Il nous faut donc un module de conversion


Les tests de connexion sécurisée ont confirmé les limitations du firmware :

```
AT+MQSSL?
→ +CME ERROR:58

AT+MQTLS=1,1
→ +CME ERROR:58

AT+VER
→ +VER:V1.3.25.000000.0000
```

La commande `AT+SOCKA` retourne bien la configuration vers HiveMQ Cloud (`port 8883`), mais la couche TLS reste inaccessible. Le port 8883 (SSL) est donc définitivement écarté pour ce firmware.

### Initiation à Eagle et Conception PCB

Nous avons installé Eagle pour débuter la conception de la carte PCB qui intégrera les différents composants du projet.

Prise en main de l'outil , ajout des connecteurs pour les composants principaux : module GSM, ESP32, module HC-05, débitmètre et réflexion quant à la disposition des composants pour optimiser l'espace et les connexions


## Objectif pour la prochaine séance

- Approfondir la piste de connexion via **FT232RL** dès réception du module de conversion **RS485/TTL**
- Reprendre les tests de publish MQTT sur broker public (port 1883) une fois la liaison série établie
