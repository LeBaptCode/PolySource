# Compte Rendu Semaine / W43

## Verification du code 

Je me suis rendu compte que le débitmètre renvoyait des données incohérente lorsque j'ai téléverser le code. Le problème était que la carte nous renvoyait des valeurs nulles même lorsqu'il était en rotation en plus d'avoir des faux contact. Des valeurs apparaissaient sans que le débitmètre ne tourne. J'ai donc pensé à un problème de port et j'ai donc consulté la Data-Sheet de l'ESP-32 fourni. D'après la Data-Sheet le port 2 ( que j'utilisais) était utilisé pour l'écran oled intégré et il était donc deconseillé de l'utiliser. J'ai donc utilisé le port 23 à la place. De plus on avait un problème de formatage de donnée avec le calcule de débit qui mettait en relation un volatil int et un float. J'ai donc traduit le volatil int en float Pour régler le problèmes il fallait utiliser un autre 
C'était un problème de software.

## Fusion des codes de pilotes du débitmétre et du sonar

Puisque nous avons nos 2 codes de gestion des modules, nous avons décidé de les mettre en commun dans un seul fichier. Lors du test du code de gestion du sonar nous avons eu des problèmes de transmission dû au port utilisé. En effet on utilisais les ports 25 et 26 qui sont pas adapté. On a donc utilisé les ports 34-35 de la carte.

 ## Gestion de l'alimentation de la carte ESP-32 et intégration des modules

Après avoir vérifié que nos 2 modules fonctionnait ensemble. On a voulu intégrer le GSM à la carte cependant ce dernier fonctionne avec une alimentation de 9V-12V. Il nous faudra une alimentation extérieur qui alimentera la carte et le GSM. Pour cela nous devons avoir une batterie avec une tension assez importante pour assurer la bonne alimentation des composants. On utilisera un diviseur tension pour avoir les bonnes tensions aux bornes du systémes

## Creation d'un discord pour la communication + Ajout de la doc dans le github

Nous avons créé un groupe discord pour faciliter nos communication et centraliser les ressources

## Prochaine séance

Trouver une alim adapter et commencer à l'intégrer. 
