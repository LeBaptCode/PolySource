
# Rapport de Séance — Semaine 12 / W14

**Date :** 03/04/2026  
**Objectif fixé lors de la séance précédente :** Approfondir la connexion via FT232RL et tester la communication MQTT sur broker public (port 1883)

## Réception des modules de conversion RS485

Nous avons reçu les deux modules de conversion RS485 :

**USB → RS485** : utilisé pour la configuration de l'USR-DR154 depuis le PC
 **RS232 → RS485** : utilisé pour faire le lien entre l'ESP32 et le module GSM (l'ESP32 ne supportant pas nativement le RS485)

Une fois les branchements effectués, on a une communication stable entre le PC et le module GSM via les commandes AT.

![RS232-RS485](https://github.com/user-attachments/assets/be8347e1-0848-4b21-9269-72035dfb47fc)

![USB-RS485](https://github.com/user-attachments/assets/e030b11c-efe8-4f1b-9e91-e8a0bbad7a33)

## Toujours bloqués sur la configuration MQTT

Malgré la liaison série opérationnelle, le module GSM USR-DR154 refuse toujours de se connecter au broker MQTT. On a tenté plusieurs combinaisons de commandes AT sans succès.

En fouillant la documentation, on a trouvé la commande `AT+SSLCFG` qui permettrait de configurer les paramètres de sécurité pour la connexion MQTt
Probleme : le firmware ne la reconnaît pas.

Pour être honnête, on commence vraiment à arriver au bout de la patience sur ce module. Ce qui devrait être du quasi plug-and-play — une connexion MQTT basique — nous bloque depuis plusieurs séances. On tâtonne, on essaie des méthodes dans tous les sens, et on stagne sur des détails qui ne devraient pas en être. 
On tente de contacter le support technique du fabricant pour demander une mise à jour du firmware incluant la prise en charge de `AT+SSLCFG`.

## Mise à jour du code ESP32 pour JSON

En parallèle, le code a été mis à jour pour que l'ESP32 puisse convertir les données reçues du débitmètre/sonar en format JSON avant de les envoyer au broker MQTT.

On a utilisé la bibliothèque ArduinoJson.

## Objectif pour la prochaine séance

- Continuer le développement du code ESP32 pour la sérialisation JSON puisque  nous sommes arrivés au bout de nos compétences et de nos recherches concernant la comm mqtt
