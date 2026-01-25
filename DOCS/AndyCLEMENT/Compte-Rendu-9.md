# Compte Rendu Semaine 7 / W3 (21/01/2026)

## Présentation du projet

La matinée de cette journée était consacrée à la présentation de projet de chaque groupe. Lors de notre passage, nous avons énoncé nos différentes problématiques notamment concernant le fonctionnement de nos 2 modules de mesures (débimètre et capteur de distance). Nos professeurs nous ont suggéré une solution que nous avons immédiatement essayée.

## Test des composants avec une alimentation externe

Dans un précédent rapport, nous avions vu que nos 2 modules ne fonctionnaient pas correctement lorsqu'ils étaient connectés en même temps sur l'ESP-32. Cela venait d'un défaut d'alimentation car lors de ces tests nous alimentions l'ESP-32 via le port USB du PC, ce n'était pas assez stable. Nous avons donc utilisé une alimentation externe de même tension, ainsi nos 2 modules fonctionnaient parfaitement. Pour la communication série, nous avons utilisé l'adaptateur USB-série que l'on utilise avec le GSM et cela marche correctement. Nous en avons profité pour brancher la l'ESP-32 et les 2 capteurs sur une bread-board pour avoir un prototype de PCB.

NB: le TX est le câble blanc

## Communication MQTT 

Après avoir résolu le problème d'alimentation, nous avons voulu continuer de configurer la connexion MQTT avec le GSM mais cela ne marchait toujours pas. J'ai donc utilisé des commandes AT pour tester la réception du réseau LTE dans la salle. Les commandes AT sont utilisées dans la plupart des modules GSM pour communiquer et les configurer, cependant notre module GSM utilise une bibliothèque de commande AT restreinte par le constructeur. On peut retrouver la liste de ces commandes [ici](../../Ressource/Other/4G-CAT1-AT-Command-Manual.pdf).

Après avoir pris connaissance des commandes, j'ai lancé plusieurs tests de réception. L'une des commandes appropriées est la commande **AT+CSQ**.*

La commande **AT+CSQ** permet d'effectuer un test de réception et d'y attribuer une note. Pour que la connexion MQTT soit stable, le score doit être compris entre 15 et 31.
En effectuant le test, le score était de 18,99 (+CSQ : 18,99 ).
Bien que le score soit élevé, la connexion était toujours impossible, il fallait creuser une autre piste.

On a voulu savoir si le GSM arrivait à se connecter à internet et pour cela il fallait utiliser la commande **AT+CGACT?**. Cette commande permet de tester si le contexte date est activé, c'est-à-dire si le GSM est connecté à Internet. Après avoir fait le test, on a alors le résultat suivant:

AT+CGACT?

+CGACT: 0, 0

Si le GSM était connecté à internet, la réponse de la commande aurait dû être +CGACT: 1, 1, or ce n'est pas le cas. On active alors le contexte avec la commande suivante :
AT+CGACT=1,1 mais toujours impossible de se connecter au réseau.

On essaie alors la commande **AT+SYSINFO** qui permet de vérifier la connexion avec les antennes LTE du périmètre. On a alors la réponse suivante:

+SYSINFO:0,LTE

Or, d'après le fichier de commande, nous indique la signification de ce code.
- 0：No service
- 2：GPRS/GSM
- 4：LTE

On n'a donc pas de réseau. 
On décide également de vérifier si l'APN du GSM est bien configuré. L'APN, ou Nom du Point d'Accès, est une passerelle entre le réseau mobile et Internet. On utilise alors la commande **AT+APN** qui vérifie l'APN du GSM. On a la réponse suivante:

+APN:CMNET,,,0

Cela signifie que l'APN n'est pas configuré, il faut donc l'associer à celui de la carte SIM. On a une carte SIM Free donc on utilise l'APN de Free (**AT+APN=free**).
Après toute cette configuration et en retestant la connexion avec **AT+SYSINFO**, le résultat était toujours de 0. On s'est donc déplacé dans une salle différente pour voir si le module captait mieux. Nous sommes allés au Foyer étudiant et avons relancé un test **AT+SYSINFO** et cette fois-ci, le code réponse était 2 et le score de réception était de 26 donc on capte très bien.
Ces problèmes pourraient très bien être la cause du problème d'envoi des SMS via le GSM.
Après avoir compris nos difficultés, les travaux se feront désormais dans la salle de TP mais proche de la fenêtre car c'est à cet endroit que le GSM arrive à capter.

## Format de transmission des données

Nous avons aussi décidé dans quel format les données des capteurs devaient être envoyées. En effet, les services d'affichage web interprétent des formats de données pour leur affichage et les nôtres utilisent des fichiers JSON. Il faut donc retravailler notre code pour que les informations envoyées par l'ESP-32 soient au format JSON.

## Prochaine séance

Réessayer de se connecter au réseau MQTT avec le GSM.
