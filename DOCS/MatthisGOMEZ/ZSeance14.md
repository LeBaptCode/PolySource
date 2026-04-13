
# Rapport de Séance

**Date :** 10/04/2026  

## Mise à jour firmware

Le support USRIoT a répondu et la mise à jour du firmware du USR-DR154 a été appliquée.
La commande `AT+SSLCFG` est désormais reconnue, ce qui débloque enfin la configuration MQTT sécurisée.

Séauence de config :

```
AT+WKMOD=MQTT,NOR
AT+MQTTSVR=adresseServeur.hivemq.cloud,8883
AT+MQTTUSER=NomUtilisateurDuBroker
AT+MQTTPSW=MotDePasseDuBroker
AT+MQTTCID=IdentifiantClient
AT+SSLEN=ON
AT+SSLCFG=ON
AT+SSLAUTH=NONE  
```

**Résultat :** connexion au broker HiveMQ Cloud établie. Premier message publié sur le topic `source/mesures`, reçu et confirmé coté webclient.

Après des semaines à galérer sur ce point, c'est un vrai soulagement. La chaine de comm est enfin validée de bout en bout, on peut enfin passer aux choses sérieuses et préparer un test en conditions réelles.

## Intégration du format JSON dans l'ESP32

Le code a été mis à jour pour que l'ESP32 sérialise les données du débitmètre/sonar en JSON.

### timestamp

Le broker MQTT attend un timestamp dans la trame JSON pour afficher les données dans le moniteur web. Or, l'ESP32 ne dispose pas de RTC intégré. 
On s'est renseigné et plusieurs solution possibles: module RTC externe ou serveur NTP.
Mais pour des raisons de complexité ou de dépendance réseau on va plutot opter pour : 
- récupérer l'heure via la commande `AT+CCLK?` du USR-DR154, qui est synchronisée avec le réseau GSM, puis utiliser `millis()` côté ESP32 pour calculer le timestamp en millisecondes depuis le démarrage. La combinaison des deux donne un timestamp suffisamment précis pour nos besoins.

Le code est disponible sur le dépôt GitHub dans `Ressource/code`.

## Probleme sonar HC-SR04

Avec l'intégration du code d'envoi MQTT, on a constaté que le sonar HC-SR04 ne renvoie plus de données fiables. Le soft n'a pas changé et il fonctionnait correctement avant, donc on soupçonne simplement un faux contact ou un problème hardware bénin. Rien d'alarmant, à vérifier en début de prochaine séance.


## Objectif pour la prochaine séance

- régler le problème du sonar HC-SR04
- Se pencher sur un test en conditions réelles avec la chaîne complète : capteurs → ESP32 → USR-DR154 → broker MQTT

