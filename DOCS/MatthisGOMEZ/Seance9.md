## Contourner le problème

Nous avons eu une idée pour contourner le problème de communication MQTT.
En effet, si le stack MQTT du modem nous bloque depuis 2 séances, laisser l'ESP32 gérer la couche réseau c'est beaucoup plus souple.
Pour que cela soit possible, on passe le modem en mode "Transparent" (ou mode Bridge/PPP). 
On transforme le module GSM en simple "tuyau" internet pour l'ESP32.

Donc,
On utilise une bibliothèque comme TinyGSM sur ton ESP32.
On règle le modem sur un USR-CAT1. L'ESP32 va envoyer les commandes AT pour établir la connexion GPRS/LTE,
puis il va récupérer une interface réseau complète.

On utilise aussi la bibliothèque PubSubClient standard sur l'ESP32, exactement comme si on était en Wi-Fi.
C'est l'ESP qui gère le protocole MQTT, pas le modem.

Le câblage :
On garde bien le TX/RX entre l'ESP et le modem, et on vérifie que les niveaux logiques sont bons. 

Pourquoi est-ce que cela va nous aider pour la fameuseerreur 53?
L'erreur 53 du modem, c'est souvent la pile TCP/IP interne qui plante ou qui refuse le port 1883. 
En passant par l'ESP32 pour le MQTT, on contourne cette logique. L'ESP envoie des paquets TCP bruts à travers le modem,
et ça passe beaucoup mieux.

Coté code, on met l'APN "free" via l'ESP (TinyGSM s'en occupe), puis on crée un TinyGsmClient et on passe ce client à PubSubClient.

On est en train de travailler le code, mais le socket A est connecté au broker ce qui est un bon début.

## Prochaine Séance
