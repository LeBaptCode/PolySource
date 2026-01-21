# Compte Rendu Semaine 3 / W50 (11/12)

## creation de Slide

## Modif du code pour boolean

Modification du code pour l'ajout d'un Booléen

Les deux derniers champs sont requis pour accéder au serveur 
Pour communiquer entre eux, le serveur et les périphériques doivent écrire leur message sur un topic défini.Chaque appareil qui a accès à un topic peut lire les messages qui y sont transcrits. On a aussi des topics d'écriture.
On doit alors aussi configurer les bons topics. Pour le projet, nous avons configuré le topic "polysource/monitoring".

![MQTT-Config](./Images/MQTT6Config.png)

Après avoir configuré le GSM avec les informations, nous n'avons pas réussi à établir une communication entre le GSM et le serveur MQTT. On ne sait pas d'où peut venir ce problème car nous avons essayé d'envoyer un message sur un topic via un autre appareil ( ordinateur) et nous avons réussi à communiquer

### 21/01

## Test de la carte avec alim externe
Après presentation, test d'alim de l'esp32 avec alim externe. Usage du cable USB-serier TC = fil blanc . ça marche


AT+CSQ


+CSQ: 18,99 doit être entre 15 et 31

connexion non réeussi
configuration nouveau brocker
analyse IP ( mauvaise commande) 
AT+CIP ( ne marche âs)


AT+CGACT? : Pour voir si le contexte data est activé (doit répondre 1,1).

AT+CGACT?

+CGACT: 0, 0

La réponse +CGACT: 0, 0 est la clé de votre problème : elle signifie que votre contexte de données n'est pas activé. En d'autres termes, votre module est bien allumé, mais il n'a pas ouvert de "tunnel" vers Internet. Tant que vous avez 0, 0, aucune connexion MQTT vers HiveMQ ne pourra réussir (d'où les erreurs 58 et 50).

Les commandes ne marche pas, il n'arrive pas à ce connecter: AT+CGATT=1 : Attache le module au réseau GPRS/LTE.

AT+CGACT=1,1 : Active le contexte numéro 1.

essaie de la commande AT+SYSINFO

+SYSINFO:0,LTE

OK

or d'après fichier commande 
0：No service
2：GPRS/GSM
4：LTE

donc pas de réseau

Configuration APN AT+APN 

AT+APN

+APN:CMNET,,,0

OK

or carte sim free donc AT+APN=free


Déplacemen vers le foyer ( salle avec de la connexion 4G) et le code est 2 ( ON CAPTE!!)

AT+CSQ On a 26 donc très bonne réception



## Brocker cloud (HiveMQ) Reconfiguration

On a décidé d'utiliser la solution du brocker HiveMQ  qui est une solution MQTT fiable et reconnue pour la communication entre machines via MQTT. Dans un premier temps, mon collègue Baptiste a configuré de son côté le brouillon MQTT de HiveMQ pour notre projet. Après cela, j'ai configuré la connexion MQTT avec le GSM.



## Prochaine séance

Essayer de régler le problème de connexion.
