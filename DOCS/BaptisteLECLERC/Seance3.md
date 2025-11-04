# Séance du 04/11/2025

## 🎯 Objectif de la séance
* Définir clairement les tâches entre Ibadete et moi.
* Continuer la mise en place des outils.

---

## 🛠️ Réalisations / Décisions

### Répartition des tâches
* **Répartition des tâches :** Ayant un peu d'expérience avec le développement front-end, j'ai choisi de prendre en charge la partie **Backend** du projet, tandis qu'Ibadete se concentrera sur le **Frontend**.
* **Mon rôle (Backend) :** Je serai responsable de la **réception** et du **stockage** des données. Concrètement, je vais mettre en place la logique (via les *Cloud Functions* Firebase) pour que l'ESP32 puisse nous envoyer ses mesures (sonar, débit, etc.) et qu'elles soient écrites dans la base de données puis les rendres accessibles au frontend.
* **Rôle d'Ibadete (Frontend) :** Elle sera responsable de l'interface web (le dashboard). Sa tâche sera d'**afficher** les données accessibles grâce aux fonctions backend (graphiques, indicateurs de batterie, etc.).

### Recherches backend (Firebase)
* **Recherches backend :** J'ai continué l'exploration de **Firebase**. J'ai créé notre projet sur la plateforme **Console Firebase**.
* J'ai réussi à connecter notre application web au projet **Firebase**, ce qui est une étape nécessaire pour les deux parties (le Frontend pour lire, le Backend pour configurer). Je n'ai pas encore commencé le développement spécifique de la fonction de réception des données.

### Arbitrage protocole : HTTP vs MQTT
* J'avais le choix entre utiliser le protocole **HTTP** (Hypertext Transfer Protocol) ou **MQTT** (Message Queuing Telemetry Transport). J'ai déjà eu l'occasion de faire des projets avec le protocole **HTTP**, mais pas avec **MQTT**.
* Donc j'ai souhaité utiliser **MQTT** afin de découvrir ce protocole qui est parfaitement adapté pour des projets IoT.
* En revanche j'ai rapidement lu que **Firebase** ne supporte pas nativement ce protocole. Cela implique d'avoir un serveur **MQTT** (broker) intermédiaire et cela complique beaucoup la tâche.
* J'ai donc décidé de revenir au protocole **HTTP**. Ma principale préoccupation étant la carte sim et le coût que cela peut engendrer.

### Analyse de la consommation de données
* Comme indiqué [sur ce site](https://hereket.com/posts/http-header-body-size/), l'estimation est la suivante :
    > "But averaging most popular websites we can have a rough estimate of 1-2KB for regular HTTP header."
* Étant donné que nous allons envoyer très peu de données (heure, sonar, hauteur, débit, batterie, overflow), la requête **HTTP** ne devrait pas être très lourde, mais il ne faut pas oublier le **Header** qui contient différentes informations (authentification, type de contenu, user-agent, etc...).
* Ainsi en partant sur une **estimation très haute de 2KB par requête HTTP**, et une **fréquence d'envoi des données toutes les 15 minutes**, on obtient :
    * **Nombre de requêtes par jour :** 24 heures / 0.25 heure = 96 requêtes
    * **Volume de données par jour :** 96 requêtes * 2KB = 192KB
    * **Volume de données par mois :** 192KB * 30 jours = 5760KB = **5.76MB**
* Il me semble que le forfait de la carte SIM offre **50MB** de données par mois, donc nous serons largement en dessous de cette limite avec une utilisation normale.

### Exploration des Cloud Functions
* J'ai commencé à lire la documentation **Firebase** pour comprendre comment envoyer des requêtes HTTP depuis une application web vers **Firebase** afin de stocker les données dans la base de données.
* **Firebase** propose des **Cloud Functions** qui permettent de créer des fonctions backend déclenchées par des événements HTTP. Il faut donc que j'approfondisse cette partie pour bien comprendre comment cela fonctionne et comment l'implémenter dans notre projet.

---

## ➡️ Prochaine séance
* Continuer à me familiariser avec **Firebase** et les **Cloud Functions**.
* Mettre en place une fonction simple qui reçoit des données via une requête HTTP et les stocke dans la base de données **Firebase**.
* Définir clairement avec l'équipe qui s'occupe d'envoyer les données depuis l'ESP32 quelle **structure de données** sera utilisée pour que tout soit cohérent.
