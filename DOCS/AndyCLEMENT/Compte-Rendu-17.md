# Compte Rendu Semaine 14 / W17 (24/04/2026)

## Concevoir le tuto pour la configuration du module GSM USR-DR154

Puisqu'aujourd'hui, est la dernère séance de l'année, nous avons décidé de concevoir un tutoriel pour expliquer comment configurer le module GSM USR-DR154 pour que le groupe suivant puisse continuer le projet et avancer plus vite. Le tutoriel explique comment configurer le module GSM pour qu'il puisse se connecter au broker MQTT HiveMQ Cloud et envoyer des données. Le tutoriel est disponible sur le dépôt GitHub du projet, dans le dossier Ressource/tuto.

## Intégration du format JSON dans l'ESP32

Une autre tâche effctué et la mise à jour du code pour que l'ESP32 puisse convertir les donées reçues du débitmètre/sonar en format JSON et les envoyer au broker MQTT. Nous avons utilisé la bibliothèque ArduinoJson by Benoit Blanchon pour la convertion. Cependant. Avec des exemples sur internet, j'ai réussi à comprendre comment utiliser la bibliothèque pour créer un objet JSON, y ajouter des données et le convertir en chaîne de caractères pour l'envoyer au broker MQTT. 
Pour que les données s'affiche bien dans le moniteur web, il faut que la trame JSON contionne le timestamp. Cependant l'ESP32 ne possède pas de RTC (Real Time Clock) intégré. Pour relever le Timestamp il existe plusieurs solutions, comme utiliser un module RTC externe, un serveur NTP (Network Time Protocol) mais cela nécessite une connexion internet. La solution choisie est d'utiliser la commande AT+CCLK? du module USR-DR154 pour récupérer l'heure actuelle du module, qui est synchronisée avec le réseau GSM. Puis d'utiliser la fonction millis() de l'ESP32 pour calculer le timestamp en millisecondes depuis le démarrage de l'ESP32. En combinant ces deux informations, nous pouvons obtenir un timestamp précis pour les données envoyées au broker MQTT.

Le code mise à jour est disponible sur le dépôt GitHub du projet, dans le dossier Ressource/code.

## Problème avec le module Sonar

Avec l'implémentation du code pour envoyer les données au broker MQTT, nous avons rencontré un problème avec le module Sonar. En effet, le module Sonar ne fonctionne pas correctement et ne renvoie pas de données fiables. Nous avons essayé de résoudre ce problème en vérifiant les connexions, en testant le module avec un autre microcontrôleur et en consultant la documentation du module, mais nous n'avons pas réussi à trouver une solution.

## Prochaine séance

Continuer à travaille sur le code et régler le problème avec le module Sonar.