#define MODEM_TX_PIN 13
#define MODEM_RX_PIN 12
#define MODEM_BAUD_RATE 115200

// --- Configuration des seuils ---
const float DISTANCE_ALERTE = 10.0; // Seuil d'alerte à 10 cm que l'on peut ajuster selon 
const float MARGE_HYSTERESIS = 2.0; // On crée une marge de 2 cm pour éviter les alertes intempestives selon les perturbations de l'eau dans la cuve.

// --- Broches capteurs ---
const int flowPin = 23;
const int trig = 35;
const int echo = 34;

// --- Variables globales ---
volatile int flow_freq = 0;
float debit = 0.0;
float distance = 0.0;
unsigned long refTime = 0;
bool alerteNiveauHaut = false; // Booléen qui représente l'état de l'alerte
const unsigned long SONAR_TIMEOUT_US = 500000;

// --- Interruption débitmètre ---
void IRAM_ATTR Flow() {
    flow_freq++;
}

void setup() {
    Serial.begin(115200);
    // Communication avec le modem WH-LTE-7S1
    Serial2.begin(MODEM_BAUD_RATE, SERIAL_8N1, MODEM_RX_PIN, MODEM_TX_PIN);

    pinMode(flowPin, INPUT_PULLUP); 
    attachInterrupt(digitalPinToInterrupt(flowPin), Flow, RISING);
    
    pinMode(trig, OUTPUT);
    pinMode(echo, INPUT);

    refTime = millis();
    
    // Test initial du modem
    Serial.println("Initialisation...");
    Serial2.println("AT"); 
}

void loop() {
    // 1. MESURE SONAR (à chaque cycle pour plus de réactivité)
    digitalWrite(trig, LOW);
    delayMicroseconds(2);
    digitalWrite(trig, HIGH);
    delayMicroseconds(10);
    digitalWrite(trig, LOW);

    long lecture_echo = pulseIn(echo, HIGH, SONAR_TIMEOUT_US);
    
    if (lecture_echo > 0) {
        distance = (lecture_echo / 2.0) * 0.034;
    } else {
        distance = -1.0; // Erreur de lecture
    }

    // --- LOGIQUE D'ALERTE NIVEAU HAUT ---
    // Si la distance devient inférieure au seuil, le niveau est trop haut
    if (distance > 0 && distance <= DISTANCE_ALERTE) {
        if (!alerteNiveauHaut) {
            Serial.println("!!! ATTENTION : NIVEAU D'EAU CRITIQUE !!!");
            // Optionnel : Envoyer une commande spécifique au modem ici
            // Serial2.println("AT+SEND_SMS=0612345678,Niveau critique atteint");
            alerteNiveauHaut = true;
        }
    } 
    // On réinitialise l'alerte uniquement si l'eau redescend sous le seuil + marge
    else if (distance > (DISTANCE_ALERTE + MARGE_HYSTERESIS)) {
        if (alerteNiveauHaut) {
            Serial.println("Info : Niveau d'eau revenu à la normale.");
            alerteNiveauHaut = false;
        }
    }

    // 2. TRAITEMENT ET ENVOI RÉGULIER (Toutes les 1 seconde)
    if (millis() - refTime >= 1000) {
        
        // Calcul du débit (basé sur ta formule /5.5)
        if (flow_freq != 0) {
            debit = (float)flow_freq / 5.5;
            flow_freq = 0; // Remise à zéro pour la seconde suivante
        } else {
            debit = 0.0;
        }

        // Construction du JSON à la main
        String json = "{";
        json += "\"dist\":" + String(distance, 1);
        json += ",\"flow\":" + String(debit, 2);
        json += ",\"alert\":" + String(alerteNiveauHaut ? 1 : 0);
        json += "}";

        // Envoi moniteur Série (PC) et Modem (LTE)
        Serial.println(json);
        Serial2.println(json);

        refTime = millis();
    }

    // Relais des réponses du modem vers le PC
    while (Serial2.available()) {
        Serial.write(Serial2.read());
    }
}