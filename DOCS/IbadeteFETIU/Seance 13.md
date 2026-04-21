# Rapport de séance du 17/03/2026  
## Prise en main de l’outil de conception PCB et préparation de l’architecture matérielle

---

## 1. Objectif de la séance

L’objectif de cette séance était de débuter la transition vers la conception matérielle du projet, en se concentrant sur la prise en main du logiciel de conception PCB ainsi que sur la compréhension des contraintes liées à l’intégration des différents composants sur une carte unique.

---

## 2. Prise en main du logiciel Eagle

Lors de cette séance, le travail s’est principalement concentré sur la découverte et la prise en main du logiciel de conception de PCB Eagle.

Cette phase était nécessaire afin de comprendre :

- la structure d’un projet électronique (schéma vs PCB)  
- la création et l’organisation des composants  
- les règles de connexion entre les différents éléments  

Plusieurs manipulations ont été réalisées afin de se familiariser avec l’outil :

- navigation dans les bibliothèques de composants  
- ajout de composants standards (connecteurs, modules)  
- compréhension des liens entre schéma électrique et routage PCB  

Cette étape a permis d’acquérir les bases nécessaires pour pouvoir participer efficacement à la conception du circuit lors des prochaines séances.

---

## 3. Analyse des besoins pour le PCB

En parallèle de la prise en main de l’outil, une réflexion a été menée sur les besoins du futur circuit imprimé.

Le système devant intégrer plusieurs éléments (ESP32, capteurs, alimentation, communication), il est nécessaire d’anticiper :

- le nombre de connexions nécessaires  
- les interfaces de communication (UART, alimentation, signaux analogiques)  
- la disposition des composants pour limiter les interférences et simplifier le routage  

Cette phase de réflexion permet d’éviter des erreurs de conception lors des étapes suivantes.

---

## 4. Première réflexion sur l’implantation des composants

Une première approche de placement des composants a été envisagée, même si elle reste préliminaire.

L’objectif était de comprendre :

- comment organiser les blocs fonctionnels sur une carte  
- comment limiter la longueur des connexions critiques  
- comment anticiper les contraintes mécaniques (taille, connecteurs, accès)

Cette réflexion a mis en évidence l’importance de structurer le PCB en zones fonctionnelles (alimentation, traitement, capteurs).

---

## 5. Difficultés rencontrées

La prise en main d’un logiciel de conception PCB représente une étape complexe, notamment en raison :

- du nombre important de fonctionnalités  
- de la nécessité de comprendre les règles de conception électronique  
- des différences entre schéma logique et implémentation physique  

Certaines notions, comme la gestion des connexions ou la correspondance entre schéma et carte, ont nécessité un temps d’adaptation.

---

## 6. Résultats obtenus

À l’issue de cette séance :

- les bases du logiciel Eagle ont été comprises  
- les premières manipulations de composants ont été réalisées  
- une réflexion sur l’architecture du PCB a été initiée  
- les contraintes principales d’intégration ont été identifiées  

---

## 7. Conclusion et perspectives

Cette séance a permis de poser les bases nécessaires à la conception matérielle du projet, en se concentrant sur la prise en main de l’outil et la compréhension des enjeux liés au PCB.

Même si aucun schéma complet n’a été finalisé, cette étape est essentielle pour garantir une conception cohérente par la suite.

Les prochaines étapes consisteront à :

- approfondir l’utilisation du logiciel Eagle  
- commencer la réalisation du schéma électrique  
- participer à la définition précise de l’architecture matérielle  
- intégrer progressivement les différents composants du système  

Cette progression permettra de contribuer activement à la conception du circuit imprimé lors des prochaines séances.
