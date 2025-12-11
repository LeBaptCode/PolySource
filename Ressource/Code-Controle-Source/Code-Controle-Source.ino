//Code de mesure du debit + sonar
//On déclare les variables 
//-------Variable pour debitmétre
const int flowPin = 23; // Input du débit mètre
volatile int flow_freq; // Cette variable va stocker la fréquence de rotation du débit mètre
float debit; 

unsigned long currentTime; // Pour stocker temps actuelle
unsigned long refTime; // stocke le temps la mesure

//------- Variable pour sonar
const int trig=35;
const int echo=34;
float lecture_echo=0;
float distance=0;

void Flow ()
{
   flow_freq++;
}

void setup()
{
   //Initialisation des ports pour débitmétre
   pinMode(flowPin, INPUT);
   digitalWrite(flowPin, HIGH); // On initialise la valeur du port

   //Initialisation des ports pour sonar
   pinMode(trig,OUTPUT);
   pinMode(echo,INPUT);

   //Ouverture du port série
   Serial.begin(115200);

   //configuration de l'interruption pour débitmétre
   attachInterrupt(digitalPinToInterrupt(flowPin), Flow, RISING); // On met en place l'interruption
   currentTime = millis();// On capture le temp actuelle
   refTime = currentTime;// On initialise le temps de mesure 
}


void loop ()
{  
   //Génération impulsions pour mesure de la distance 
   digitalWrite(trig, HIGH); // génération de l'impulsion Trig de 10 μs
   delayMicroseconds(10);
   digitalWrite(trig, LOW);
   delayMicroseconds(60);
   lecture_echo = pulseIn(echo, HIGH); // lecture de la longueur temporelle de l'impulsion Echo
   distance=(lecture_echo/2)*0.034; // calcule de la distance

   delay(1000);
   Serial.print("La distance est de = ");
   Serial.println(distance);
   Serial.print(" cm \n");

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
      Serial.print("Debit : ");
      Serial.print(debit, 2 ); // On affiche le débit avec 2 décimal
      Serial.println(" L/min");
    }
    else {
      Serial.println(" Debit = 0 L/min ");
    }
   }
}