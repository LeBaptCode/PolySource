# Compte Rendu Semaine 6 / W50 (11/12)

## Configuration du serveur MQTT

Pour travailler sur notre serveur, on a decider se rendre dans la salle réseau de l'établissement pour explorer les différentes pistes. P
En recherchant sur le web différentes solution de connection vers un serveur MQTT via l'exterieur ([ici](https://gist.github.com/gyassine/a5eda1c64557baa60cd563f22ac96c0d#bonuses)). Cette solution parle de créer un nom de domaine a dns Dynamique en utilisant une solution tel que DuckDNS. Cette soltuon permet ....
Cependant elle nescescite une connection avec une ip permanante avec le rrouteur ( bow wifi par exemple) Puisqu'on est à l'université on s'est orienté vers uen autre solution, celle d'installer un brocker sur une solution cloud.

## Brockere cloud

On a decidé d'utilise la solution cloud HiveMq, service d'hebergement en ligne gratuit pour heberger notre service mqtt. J'ai donc configurer la connexion mqtt sur le gsm

## Configuration MQTT

On a configurer mais ça marche pas 
![MQTT-Config](./Images/MQTT6Config.png)

Après s'être consulté, on a fait un schéma récapitulatif du projet pour connaître les options possibles et se situer dans le projet.
![Brainstorm](./Images/Brainstorm.JPG)

## Solution

La solution qui a été décidée est celle d'emprunter la salle réseau pour avoir une IP fixe et rendre l'IP du Raspberry PI publique afin qu'on puisse s'y .

## Prochaine séance

L'objectif de cette séance sera de configurer le serveur MQTT pour la liaison.
