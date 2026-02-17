Dès le début de séance nous avons changé l'APN pour s'attacher au réseau.
Comme l'APN a établi la connexion "Data", il a ouvert le tunnel nécessaire pour que les SMS puissent transiter.

Le fait de renseigner le bon APN permet au modem de récupérer automatiquement
les paramètres de l'opérateur, dont le numéro du SMSC (Centre de Service SMS). Sans ce numéro,
le modem sait écrire le message mais ne sait pas à qui le donner pour qu'il soit distribué.

Résultat : on arrive à communiquer en SMS depuis USR-CAT1 vers le téléphone d'Andy sans problème (dans les deux sens, réception et émission).
Nous avons aussi réalisé un petit test avec le sonar, avec une variable état et une variable représentant la distance d'alerte 
(si la distance entre l'eau et le sonar est trop faible, c'est-à-dire si l'eau monte trop, obn envoie un signal d'alerte à l'utilisateur).

Ce qui nous reste à régler avant un test plus proche des conditions réelles, c'est la communication mqtt qui fera le lien entre
les informations que l'on récolte de notre côté et le serveur géré par Ibadete et Baptiste.

Une fois ceci fait, il ne nous restera qu'à interpréter les résultats et ajuster nos valeurs d'alerte selon la cuve.

Malgré le succès des SMS, la communication MQTT reste le dernier point bloquant pour assurer la liaison avec le serveur (partie gérée par Ibadete et Baptiste).
Nous avons identifié une erreur 53 dans le terminal 
Cette erreur correspond généralement à un problème de "Connection refused" ou de socket non disponible (souvent liée à une mauvaise adresse IP du broker, un port fermé ou une authentification refusée).

Format de données : Nous avons validé l'utilisation du format JSON pour les futures transmissions, afin d'assurer la compatibilité avec l'affichage web.

Prochaines étapes :
Débogage spécifique de l'erreur MQTT 53 (vérification de l'adresse du Broker et des identifiants).

Test d'intégration complet : Envoi des données du sonar vers le serveur en temps réel.

Calibration des seuils d'alerte en fonction des dimensions réelles de la cuve.
