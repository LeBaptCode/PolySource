# Compte Rendu Semaine 9 / W8 (17/02/2026)

## Exploration et usage des nouvelles bibliothèques

Comme trouvé lors de la séance dernière, il a été décidé d'essayer une autre façon de transmettre nos requêtes MQTT via le module WH-LTE-7S1-E. En effet, puisque nos essais de transmission via le logiciel propriétaire échouaient, il a été décidé d'essayer de transmettre les données avec l'ESP-32.
Le but de cette manoeuvre est d'utiliser la puissance de calcul de l'ESP-32 afin d'encrypter les données à envoyer à l'aide du certificat SSL fourni par HiveMQ. On pense que le GSM n'arrive pas à encrypter les données pour se connecter au serveur.
Dans cette configuration, l'ESP-32 a le rôle de cerveau et le GSM de transmetteur
Voyons le rôle de chaque Bibliothèque :
-La bibliothèque TinyGSM devrait nous aider à utiliser le mode transparent du WH-LTE-7S1-E pour envoyer les données
-La bibliothèque SSLClient permet de crypter les données à envoyer 
-La bibliothèque PubSubClient permet de sauvegarder les caractéristiques de connexion vers le serveur MQTT et d'envoyer les données sur le bon topic

Après avoir écrit le code qui utilise ces bibliothèques, des erreurs surviennent.
En effet, on a eu une erreur au niveau des fichiers TrustAcnhors, des fichiers utiles pour SSLClient qui servent à sauvegarder le certificat de HiveMQ. On utilise le root certificate de HiveMQ, le ISRG Root X1.

De plus, cela ne marchait pas non plus car la bibliothèque gère une sélection de GSM dont le nôtre ne fait pas partie. On a alors sélectionné le SIM7600 car il a un comportement générique qui permet au plus de chance de fonctionner avec notre module.

Après quelques essais, on a compris que le buffer de l'esp-32 n'était pas assez grand pour transmettre le certificat, on a donc augmenté la taille du buffer.

## Prochaine séance

Continuer d'exploiter cette piste.
