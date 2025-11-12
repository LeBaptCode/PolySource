# Compte Rendu Semaine 3 / W46

## Branchement WH-LTE-7S1-E

Lors de la séance dernière, on a essayé de configurer le WH-LTE-7S1-E, or il nous manquait l'alimentation pour alimenter la carte de test. Notre professeur nous a alors proposé de brancher directement le WH-LTE-7S1-E avec les broches (pins) correspondantes, sans utiliser la carte fournie, pour pouvoir l'alimenter par USB. On effectue alors les câblages en s'aidant de la *datasheet* du GSM. En branchant le GSM à mon ordinateur, j'ai commencé à vouloir le configurer. Cependant, le port COM semblait déjà utilisé. J'ai donc installé un logiciel qui me montre quel logiciel utilise le port COM que je veux utiliser. Le logiciel utilisé est Process Explorer. En analysant les résultats, aucun autre logiciel utilise le port COM, c'est un problème de drivers. Après plusieurs essais et plusieurs drivers installés, le GSM n'est toujours pas détecté. Le problème est un problème de communication entre le GSM et l'ordinateur.
![SIM-Card Adaptator](./Images/Work-WH-LTE-7S1-E.JPG)

## Résolution du problème
 
 Après plusieurs essais et plusieurs drivers installés, le problème était que les drivers étaient incompatibles avec ma version windows actuelle (Windows 11). Il a fallu installer les drivers sur le PC de Matthis qui tourne sous Windows 10. Grâce à ça, on a pu voir les options disponibles pour la transmission. De plus, Matthis a réussi à communiquer en série avec le GSM et l'ESP-32.
Pour la transmission des données, on a plusieurs modes : HTTP, MQTT, SMS, Transparent. Puisque nous voulons envoyer nos données à un appareil tier, la solution MQTT nous semble la plus cohérente et la plus formatrice. D'après le manuel Utilisateur du constructeur du GSM, on peut utiliser AWS pour la connexion entre les Appareils. Il faudra se pencher dessus.

## Envoi des données du sonar vers le GSM 

Maintenant, on essaie d'envoyer les données du sonar sur le GSM. Pour cela, Matthis a eu des soucis au niveau de l'alimentation.

## Création d'un adaptateur SIM

Notre GSM utilise un format de SIM standard (utilisé dans les années 2000), or la carte SIM que l'on nous a fournie est une NANO-SIM. C'est pourquoi nous allons chercher un fichier 3D qui modélise un tel adaptateur. J'ai trouvé [celui-ci] ( https://makerworld.com/fr/models/662271-3d-printable-sim-card-adapter-nano-micro-mini#profileId-589458).
Je l'ai imprimé au FabLab du campus 
![SIM-Card Adaptator](./Images/SIM-Card.JPG)
![SIM-Card Adaptator work](./Images/SIM-Card-work.JPG)

## Prochaine séance
 Réussir à transmettre les données grâce à la connexion réseau (SIM) et configurer la connexion MQTT