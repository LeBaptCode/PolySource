##Séance 11

# Transition vers l'USR-DR154 et tests hardware

Cette séance a été marquée par, une fois n'est pas coutume, un nouveau changement de stratégie matériel. Suite aux difficultés rencontrées avec le mode transparent et la gestion du SSL par l'ESP32, nous avons migré nos tests sur le USR-DR154.

Pour garantir une base de test saine, nous avons remplacé le convertisseur USB-Série par un modèle FT232RL.

# Diagnostic et premières commandes AT
Nous avons commencé par valider l'état du modem. Les commandes de base confirment que le hardware répond correctement et qu'il est bien accroché au réseau :

AT+SYSINFO : Le module est bien en mode LTE (4G).

AT+CSQ : Réception de 14, ce qui est suffisant pour établir une session Data.

AT+APN : Configuration confirmée sur le réseau Free.

Nous avons également tenté de désactiver le mode écho avec la commande ATE0 afin d'éviter que le modem ne renvoie la commande tapée dans sa réponse, un phénomène qui polluait le parsing des données précedemment.

En tentant de configurer la socket de connexion vers HiveMQ Cloud (Port 8883), nous avons rencontré des erreurs critiques (+CME ERROR:58).

Le diagnostic est clair : bien que le modem soit plus récent, l'utilisation du port sécurisé 8883 sur une instance Cloud partagée nécessite deux éléments que le firmware actuel semble REJETER ou ne pas reconnaître via les commandes AT standards :

Le SNI (Server Name Indication) : Indispensable pour que le serveur HiveMQ sache quel certificat présenter.

Le support TLS natif : Les erreurs 58 sur les commandes de configuration SSL indiquent que le module refuse les paramètres de sécurité demandés pour le port 8883.

# Objectif prochaine séance : Simplification via le port 1883
Face à l'impossibilité technique d'activer le SSL/SNI sur ce firmware (malgré une version V1.3.25 récente), nous avons pris la décision de simplifier la chaîne de communication pour valider l'envoi de données.

Nous abandonnons temporairement l'instance HiveMQ Cloud privée au profit d'un broker public de 'tuto' en port 1883. Cela nous permet de supprimer la couche de chiffrement qui bloquait nos sockets, tout en conservant la logique MQTT.
