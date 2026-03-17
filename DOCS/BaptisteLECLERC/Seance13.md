# Séance du 17/03/2026

## 🎯 Objectifs de la séance
* Poursuivre l'intégration des composants visuels dans Grafana.
* Sécuriser le code des panneaux personnalisés.
* Définir le cahier des charges et la répartition des tâches pour la conception du PCB.

---

## 🛠️ Réalisations 

### Optimisation et Versioning du Dashboard
* **Ajustements UI/UX :** Poursuite de l'intégration des éléments graphiques conçus par Ibadete. J'ai dû intervenir sur le code source de certains panneaux pour corriger des défauts d'affichage et assurer une bonne compatibilité avec nos flux de données.
* **Mise en place d'une sauvegarde (GitHub) :** Afin de prévenir toute perte de travail liée aux instabilités matérielles, j'ai exporté et sauvegardé les scripts `.js` des panneaux personnalisés sur le dépôt : [PolySource/Dashboard_Grafana](./PolySource/Dashboard_Grafana/). J'essaye de le faire régulièrement pour avoir un historique des modifications et pouvoir revenir à une version stable en cas de besoin.

### Incident Matériel : Analyse d'un nouveau crash système
La séance a été interrompue par une défaillance critique de la Raspberry Pi :

* **Symptômes :** Ralentissement extrême du système en cours de modification du dashboard, suivi d'une corruption de l'interface graphique (fond d'écran blanc, disparition de la barre des tâches) après redémarrage.
* **Diagnostic technique :** La cause probable est une **surchauffe thermique** du processeur. Le boîtier actuel semble limiter la dissipation de chaleur, ce qui finit par provoquer des erreurs d'écriture et une **corruption du système de fichiers** sur la carte SD. 
* **État actuel :** La carte SD est corrompue et le système ne boot plus. Une nouvelle opération de restauration sera nécessaire. J'ai ajouté un dissipateur thermique sur le processeur pour tenter de limiter les risques de surchauffe à l'avenir. Si cela n'améliore pas la situation, nous devrons envisager une solution de refroidissement plus robuste ou un boîtier avec une meilleure ventilation.

J'ai donc reconfiguré le raspberry pi à la maison pour éviter de perdre à nouveau du temps avec cette étape chronophage.

---

## ➡️ Prochaine séance

* **Répartition des tâches PCB :** Organiser la phase de conception du circuit imprimé.
* **Finalisation Dashboard :** Reprendre les derniers réglages graphiques.