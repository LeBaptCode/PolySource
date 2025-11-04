# Compte Rendu Semaine 3 / W45

## Recherche tension d'alimentation

Pour alimenter notre esp-32 ainsi que le GSM il faut que nous determinions une tension d'alimentation. En communiquant avec notre le groupe qui s'occupe de la batterie, j'ai appris qu'on aura une alimentation de 6-28V. Notre ESP-32 fonctionne avec une alimentation de 5V et le GSM une alimentation, de 12V. A terme, l'idée sera d'utiliser un regulateur de tension pour injecter les bonnes tensions là ou il faut. Dans notre cas, puisque nous sommes dans une phase d'expérimentation, nous allons alimenter l'ESP-32 avec les ports USB de l'odinateur et le GSM avec une alimentation de labo en 12V. Il faut connecter les différentes masse ensemble pour avoir les mêmes références.

## Vérification des mesures du Sonar
 
 Bien que notre code fonctionne, nous devons vérifier si les données renvoyés sont les bons. En utilisant une régle, nous avons testé les valeurs délivré par le sonar. Le test est concluant, cependant des faux contacts entraîne des fausses valeurs. Il faudra lisser les résulats ou alors changer les câbles.

## Ajout des data-sheet et du code dans le Repo-Git 

Pour regrouper les ressources, j'ai déposé dans le github notre code ainsi que les data-sheet de nos composants

## Lecture Data-Sheet GSM [USR-DR154](https://www.pusr.com/products/Lipstick-Size-4G-Modem.html)

Pour intégrer le GSM USR-DR154, je suis allé sur le site du constructeur pour savoir quel protocole peuvent être utilisé pour communiquer. Le GSM peut communiquer selon le protocle Modbus TCP/IP, un protocol largement utilisé par les sites industriels. Il peut se connecter en 4G. En lisant le guide de demarage, je me suis rendu compte qu'il fallait connecter le GSM via le port série ( adaptateur RS485 vers USB) et le confiogurer via le logiciel propriétaire. Via ce logiciel on peut choisir le mode de connection du GSM et quel type de protocole il utilisera. Malheursement nous n'avons pas un tel adaptateur donc on va essayer de faire fonctionner le deuxiéme GSM que l'on nous a fournis, le [WH-LTE-7S1-E](https://www.pusr.com/products/LTE-Cat-1-module.html)de PUSR. Cette dernière est connecter à une board d'evaluation [USR-7SX-EVK](https://shop.usriot.com/serial-to-2G/3G/4G-module-evaluation-board-7SX-EVK.html) fournis par le constructeur.

## Lecture Data-Sheet /Configuration GSM WH-LTE-7S1-E

Pour configurer notre GSM, il faut installer le logiciel propriétaire via le site du constructeur. Pour communiquer avec la carte, on doit se connecter avec le port Série. Cependant, on a aussi un port USB, on essaiera de se connecter dessus. La carte a besoin d'une alimentation externe de 12V ( disponible dans la salle de TP).

## Incident ESP-32

En testant notre alimentation avec le GSM, nous n'arrivions plus à flasher de code dans notre ESP-32. Après intervention du professeur, l'ESP-32 est H.S

## Prochaine séance

Trouver une alim adapter et commencer à l'intégrer.