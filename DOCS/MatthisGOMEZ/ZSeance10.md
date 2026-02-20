## Seance 10

## Echec de communication via l'ESP32
Même si la commande AT+SOCKALK? nous renvoyait enfin un état "Connected" (prouvant que le modem ouvrait bien le tuyau TCP vers HiveMQ), nous sommes restés bloqués sur la phase SSL.

L’ESP32 n'arrivait pas à finaliser la connexion sécurisée à travers le GSM. On a identifié un problème : une instabilité dans la communication série entre l'ESP32 et le module GSM lors de l'envoi de gros paquets de données.
Après 4 séances bloqués concernant la communication MQTT, et pour éviter de paralyser le projet plus longtemps, nous avons pris la décision de mettre cette partie en stand-by.

## Modem USR-DR154
L'idée est de repartir sur une base propre avec le second modem à notre disposition : le USR-DR154.

Configuration : Pour le paramétrer, on utilise le logiciel DTUset v1.3.4. C’est pratiquement le même environnement que pour l'USR-CAT1, ce qui nous a permis d'être opérationnel très vite.

Donc on vérifie si ce module gère mieux le mode transparent et si la communication série est plus stable pour laisser passer le flux SSL de l'ESP32.

3. Conclusion et perspectives
Le but de la prochaine séance est de répliquer la config APN Free et les paramètres du broker HiveMQ sur ce nouveau module. Si on arrive à choper le "Connected" et à faire passer le SSL ici, on saura que le premier module avait un défaut ou une limitation sur la pile TCP/IP.
