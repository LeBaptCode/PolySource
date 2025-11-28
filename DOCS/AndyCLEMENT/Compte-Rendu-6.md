# Compte Rendu Semaine 5 / W48 (28/11)

## Alimentation

En demandant au prof une alimentation supplémataire ( au lieu de la fabriquer), nous avons pus utiliser la carte de programation fournis avec le GSM , un [USR-7SX-EVK](https://shop.usriot.com/serial-to-2G/3G/4G-module-evaluation-board-7SX-EVK.html). Cette carte permet d'avoir accée à plusieur port pour faire nos tests.
Après avoir branché la carte à l'alimentation et branché le module à la carte. Le module me renvoyait des lignes vides, comme si il avait du mal a communiqué. la cause était que le cable GND de notre cable USB-Serie n'était pas branché à la masse. Ce qui redait la communication impossible.

## Communication avec le module en mode SMS

Après avoir réglé ce probléme un aitre est survenue. Les commandes que je retnrais n'était pas reconnue 
AT+CPMS?
+CME ERROR:58

Cette erreur signifi qu'il y a une erreur de syntaxe, cependant en alphabet litteraire, les commandes étaient identique, cependant en hexadecimal, les codes était différent.
On a également vue que le GSM accpete les commadnes avec une certaine synthaxe. A la fin de toute kes commandes le carract-re 0A 0D était présent. APrès des recrcher cela coorespontt \r \n. On peut activer l'ajour automatique de ces caractères dans le logiciel propriétaire

## Problème d'envoie SMS

Format de num téléphone mauvais, on reçoit rien du tout.
On essaie Configuration MQTT

- ![SMS-Suceed](./Images/SMS-suceed.png)
- ![SMS](./Images/SMS.png)
- ![GSM-Antenna](./Images/GSM-Antenna.JPG)

## Configuration MQTT

La configuration MQTT necssite un environnement réseau stable donc un routeu

## Solution

Rasp PI publique

## Prochaine séance du 28/11

Bien que le fait que les GSM arrivent à recevoir des SMS, il faut qu'ils parviennent à envoyer, c'est pour cela que nous allons tout d'abord construire une alimentation puis essayer de transmettre les données grâce à la méthode MQTT.
