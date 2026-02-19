# Compte Rendu Semaine 9 / W8 (19/02/2026)

## Correction code ESP-32 pour MQTT

Puisque le code ne marchait pas, on a essayé de désactiver le mode écho du GSM pour que les données reçues soient au bon format. En effet, avec le mode écho, le GSM renvoie la commande tapée en plus de la réponse, ce qui fausse les résultats. Pour illustrer le propos, voici un exemple : écho.
Avec l'écho activé (ATE1), si vous envoyez AT+CSQ, le modem répond :
AT+CSQ (l'écho)
+CSQ: 26,99 (la vraie réponse)
OK

Avec l'écho désactivé (ATE0), il répond juste :
+CSQ: 26,99
OK

On utilise alors la commande **AT+E=OFF** pour désactiver le mode.
Malgré ces efforts, il restait impossible de connecter le GSM au serveur MQTT, j'ai donc vérifié si l'ESP-32 recevait bien des données via le port série. Après vérification, l'ESP-32 et le module GSM n'arrivaient pas à communiquer entre eux, ce qui a été frustrant.
Après cet échec, il a été décidé d'essayer d'utiliser le module GSM USR-DR154, notre deuxième module. En regardant sa documentation, on s'est rendu compte que comparé au WH-LTE-7S1-E, des commandes **AT** dédiées au MQTT étaient présentes dans la bibliothèque, on va donc essayer de configurer celui-ci au lieu du premier.

## USR-DR154

Pour se connecter au port série, il a fallu réinstaller les drivers  PL2303TA pour Windows 11 et trouver une alimentation plus correcte que le port USB du PC. On a utilisé l'alimentation du WH-LTE-7S1-E qui est parfaitement adaptée.

## Prochaine séance

Configurer le nouveau GSM.
