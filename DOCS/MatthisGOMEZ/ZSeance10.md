## Seance 10

## Echec de communication via l'ESP32
Même si la commande AT+SOCKALK? nous renvoyait enfin un état "Connected" (prouvant que le modem ouvrait bien le tuyau TCP vers HiveMQ), nous sommes restés bloqués sur la phase SSL.

L’ESP32 n'arrivait pas à finaliser la connexion sécurisée à travers le GSM. On a identifié un problème : une instabilité dans la communication série entre l'ESP32 et le module GSM lors de l'envoi de gros paquets de données.
Après 4 séances bloqués concernant la communication MQTT, et pour éviter de paralyser le projet plus longtemps, nous avons pris la décision de mettre cette partie en stand-by.

## Modem USR-DR154
L'idée est de repartir sur une base propre avec le second modem à notre disposition : le USR-DR154.

Config : On utilise le logiciel DTUset v1.3.4. C’est pratiquement le même environnement que pour l'USR-CAT1, ce qui nous a permis d'être opérationnel très vite.

Donc on vérifie si ce module gère mieux le mode transparent et si la communication série est plus stable pour laisser passer le flux SSL de l'ESP32. Pour se connecter au port série, il a fallu réinstaller les drivers PL2303TA pour Windows 11 et trouver une alimentation plus correcte que le port USB du PC. On a utilisé l'alimentation du WH-LTE-7S1-E qui est parfaitement adaptée.

En regardant sa documentation, on s'est rendu compte que comparé au WH-LTE-7S1-E, des commandes AT dédiées au MQTT étaient présentes dans la bibliothèque, on va donc essayer de configurer celui-ci au lieu du premier.

## Objectifs Prochaine séance
Configurer le nouveau GSM, pourquoi pas enfin avoir une communication mqtt.
