# Unité Fonctionnelle

---

## 1. Définition

L’unité fonctionnelle du système est définie comme suit :

**"Assurer la mesure et la transmission à distance du niveau d’eau et du débit de débordement d’un bassin, avec une fréquence d’acquisition de 1 mesure par minute, et permettre la visualisation en temps réel des données, sur une durée de fonctionnement de 1 an."**

---

## 2. Justification

Cette unité fonctionnelle permet de représenter précisément le service rendu par le système, indépendamment de sa réalisation technique.

Elle intègre :

- la fonction de **mesure** (niveau et débit)  
- la fonction de **traitement et transmission** des données  
- la fonction de **visualisation à distance**  

Le choix d’une durée de **1 an** permet de prendre en compte :

- la consommation énergétique sur une période significative  
- la durée de vie des composants  
- les impacts liés à l’utilisation continue du système  

La fréquence de **1 mesure par minute** correspond à un compromis réaliste entre précision du suivi et consommation énergétique.

---

## 3. Fonctions couvertes

### Fonction principale
- Mesurer le niveau d’eau et le débit de débordement d’un bassin

### Fonctions associées
- Traiter les données issues des capteurs  
- Transmettre les données via un réseau mobile  
- Stocker les données sous forme de séries temporelles  
- Permettre leur visualisation à distance  

---

## 4. Frontières du système

### Inclus dans l’étude

- Capteurs (niveau et débit)  
- Microcontrôleur (ESP32)  
- Module de communication GSM  
- Système de traitement et visualisation (Raspberry Pi)  
- Système d’alimentation (batterie et régulation)  

### Exclus de l’étude

- Infrastructure réseau globale (antennes, internet)  
- Serveurs cloud distants (broker MQTT, hébergement externe)  
- Phase d’utilisation de l’interface par l’utilisateur final  

---

## 5. Flux associés à l’unité fonctionnelle

Pour une durée de 1 an :

- Nombre de mesures :  
  ≈ 525 600 mesures (1 mesure/minute)

- Transmission des données :  
  ≈ 525 600 envois de messages MQTT

Ces flux sont essentiels pour l’évaluation des impacts environnementaux liés :

- à la consommation énergétique  
- à la transmission des données  

---

## 6. Paramètres influents

Les principaux paramètres impactant l’ACV sont :

- fréquence de mesure  
- consommation énergétique des composants  
- technologie de communication utilisée  
- durée de vie des composants  
- volume de données transmis  

---

## 7. Limites

- la précision des capteurs peut varier selon les conditions environnementales  
- la consommation réelle dépend des conditions d’utilisation  
- certaines infrastructures (réseau, cloud) ne sont pas prises en compte  

---

## 8. Perspectives de comparaison

Cette unité fonctionnelle permet de comparer différentes architectures du système, par exemple :

- avec ou sans Raspberry Pi  
- communication GSM vs WiFi  
- optimisation énergétique (mode veille, réduction fréquence)

---

## Conclusion

L’unité fonctionnelle définie permet de représenter de manière précise et quantifiable le service rendu par le système.

Elle constitue une base robuste pour l’analyse du cycle de vie et la comparaison de différentes solutions techniques dans une démarche d’écoconception.
