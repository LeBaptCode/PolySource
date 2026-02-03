Etant absent à la dernière séance, je commence par me renseigner vis-à-vis de mes camarades quant aux progrès réalisés.

Après notre présentation orale, nous avons commencé par régler le problème d'intégration comme nous l'a suggeré monsieur Peter.
En effet lorsque l'esp32 était alimenté via un cable USB relié au pc, avec debitmètre et sonar, nous avions un problème d'alim 
(au moins un des composants étaient inactif).

Nous avons alors utilisé une alimentation externe 5V 3A, pour plus de courant et de stabilité.
Résultat : nous avons une intégration fonctionnelle, nous arrivons à lire les mesures de manière convaincante.

Attention car même en utilisant un lissage moyenne glissante pour le sonar, on a tout de même un grand nombre
de valeurs absurdes qui retournent un serial print "erreur/ sonar hros de porté" le temps d'avoir un nombre suffisant de valeurs stables,
nous pensons que plus tard avec un setup plus rigide (car à l'heure actuelle nous tenons le sonar à la main et donc cela engende beaucoup
de tremblements) on aura un résultat bien plus préçis.

La prochaine étape est de convertir notre data en format json, alors j'ai simplement fait de la concaténation de chaine (pas besoin de 
library étant donné que le format json est assez simple à coder : {"dist":VALEUR,"flow":VALEUR}).

j'upload le code arduino sur notre git.

Prochaine étape, suivre nos pistes concernant la communication gsm, notamment en SMS
Andy a identifié un problème concernant l'APN pour pouvoir se connecter à une antenne, on va voir prochaine séance, car 
l'APN fait le pont entre l'appareil et les services du réseau mobile, c'est la prote d'entrée du réseau.




