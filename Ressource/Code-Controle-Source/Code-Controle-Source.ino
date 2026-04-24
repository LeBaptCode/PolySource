#include <ArduinoJson.h>
#include <time.h>
//Code de mesure du debit + sonar
//On déclare les variables 

#define MODEM_TX_PIN 13
#define MODEM_RX_PIN 12
#define MODEM_BAUD_RATE 115200

//------- Variable pour sonar
#define TRIG 35
#define ECHO 34
#define SONAR_TIMEOUT_US 500000

//seuil d'activation
#define DISTANCE_ALERTE 10 // Seuil d'alerte à 10 cm que l'on peut ajuster selon 
#define  MARGE_HYSTERESIS 2


//-------Variable pour debitmétre
#define FLOW_PIN 23 // Input du débit mètre
volatile int flow_freq; // Cette variable va stocker la fréquence de rotation du débit mètre
float debit = 0.0; // VALEUR à RELEVER 

unsigned long currentTime = 0.0; // Pour stocker temps actuelle
unsigned long refTime = 0.0; // stocke le temps

float lecture_echo = 0.0;
float distance = 0.0; // VALEUR à RELEVER
bool alerteNiveauHaut = false;

//---valeur envoie json
unsigned long previousMillis = 0;    // Stocke le temps du dernier envoi
const long interval = 2000; // Intervalle d'envoie
float timestamp = 0.0;

void Flow ()
{
   flow_freq++;
}

void sendData() {
    //On créer l'objet JSON à transmettre
    JsonDocument data;

    //Ajout des données 
    data["device_id"] = "source01";
    data["location"] = "spring_A";
    data["timestamp"] = getUnixTimestampGSM();
    data["water_level_cm"] = distance;
    data["flow_rate_l_min"] = debit;
    data["battery_percent"] = 88;
    data["overflow"] = alerteNiveauHaut;

    serializeJson(data, Serial); // On converti l'objet JSON en chaine de caractère
    Serial.println(" ");
}

long getUnixTimestampGSM() {
  Serial2.println("AT+CCLK?");
  delay(100);
  
  String res = "";
  while (Serial2.available()) res += (char)Serial2.read();

  // Format attendu : +CCLK: "26/04/10,10:45:30+04"
  int start = res.indexOf('"');
  if (start == -1) return 0;

  // Extraction des segments (YY,MM,DD,hh,mm,ss)
  int year  = res.substring(start + 1, start + 3).toInt() + 2000;
  int month = res.substring(start + 4, start + 6).toInt();
  int day   = res.substring(start + 7, start + 9).toInt();
  int hour  = res.substring(start + 10, start + 12).toInt();
  int min   = res.substring(start + 13, start + 15).toInt();
  int sec   = res.substring(start + 16, start + 18).toInt();

  struct tm t;
  t.tm_year = year - 1970; // Années depuis 1970
  t.tm_mon = month - 1;    // 0-11
  t.tm_mday = day;
  t.tm_hour = hour;
  t.tm_min = min;
  t.tm_sec = sec;
  t.tm_isdst = -1;
  return mktime(&t); // Convertit en timestamp Unix
}

void setup()
{
   //Initialisation des ports pour débitmétre
   pinMode(FLOW_PIN, INPUT);
   digitalWrite(FLOW_PIN, HIGH); // On initialise la valeur du port

   //Initialisation des ports pour sonar
   pinMode(TRIG,OUTPUT);
   pinMode(ECHO,INPUT);

   //Ouverture du port série
   Serial.begin(MODEM_BAUD_RATE);

   // Communication avec le modem USR-DR154
   Serial2.begin(MODEM_BAUD_RATE, SERIAL_8N1, MODEM_RX_PIN, MODEM_TX_PIN);

   //configuration de l'interruption pour débitmétre
   attachInterrupt(digitalPinToInterrupt(FLOW_PIN), Flow, RISING); // On met en place l'interruption
   refTime = millis();// On initialise le temps de mesure2.0
}


void loop ()
{  

    digitalWrite(TRIG, LOW);           // >>> FIX SONAR
    delayMicroseconds(5);              // >>> FIX SONAR

   //Génération impulsions pour mesure de la distance 
   digitalWrite(TRIG, HIGH); // génération de l'impulsion Trig de 10 μs
   delayMicroseconds(10);
   digitalWrite(TRIG, LOW);
   delayMicroseconds(60);

   lecture_echo = pulseIn(ECHO, HIGH, SONAR_TIMEOUT_US);

   if (lecture_echo > 0) {
        distance = (lecture_echo / 2.0) * 0.034;
        if (distance <= DISTANCE_ALERTE) {
            alerteNiveauHaut = true;
            //Serial.println("!!! ATTENTION : NIVEAU D'EAU CRITIQUE !!!");
        } else if (distance > (DISTANCE_ALERTE + MARGE_HYSTERESIS)) {
              alerteNiveauHaut = false;
              //Serial.println("Info : Niveau d'eau revenu à la normale.");
        }
    } else {
        distance = -1.0; // Erreur de lecture
    }

   // --- LOGIQUE D'ALERTE NIVEAU HAUT ---
   // Si la distance devient inférieure au seuil, le niveau est trop haut
   //if (distance > 0 && distance <= DISTANCE_ALERTE) {
   //     if (!alerteNiveauHaut) {
   //         Serial.println("!!! ATTENTION : NIVEAU D'EAU CRITIQUE !!!");
   //         alerteNiveauHaut = true;
   //     }
   //} 
   // On réinitialise l'alerte uniquement si l'eau redescend sous le seuil + marge
   //else if (distance > (DISTANCE_ALERTE + MARGE_HYSTERESIS)) {
   //     if (alerteNiveauHaut) {
   //         Serial.println("Info : Niveau d'eau revenu à la normale.");
   //         alerteNiveauHaut = false;
   //     }
   // }

    delay(50); 
    currentTime = millis();
   // toutes les secondes on mesure la fréquence
    if(currentTime >= (refTime + 1000))
    {
        refTime = currentTime; // On met à jour le temps de référence 
        if(flow_freq != 0){
      //Serial.println("Entrer dans boucle");
      // On sait que  F=5.5 * Q (L / Min). Donc Q = F/5.5 
            debit = ( (float) flow_freq / 5.5);

            flow_freq = 0; // on remet à zéro le compteur
      //Serial.print("Debit : ");
      //Serial.print(debit, 2 ); // On affiche le débit avec 2 décimal
      //Serial.println(" L/min");
    }
    else {
      //Serial.println(" Debit = 0 L/min ");
      debit = 0.0;
    }
   }

    unsigned long currentMillis = millis();
   // Vérifier si la différence est supérieure à l'intervalle
    if (currentMillis - previousMillis >= interval) {
    // On met à jour le marqueur de temps immédiatement
        previousMillis = currentMillis;

    // --- Action à exécuter toutes les 10 secondes ---
        sendData();
  }
}
