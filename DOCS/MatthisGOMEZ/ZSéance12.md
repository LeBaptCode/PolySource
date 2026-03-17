



Validation de la chaîne de transmission : Configurer le module sur le broker public broker.hivemq.com en port 1883.

Premier Publish : Réussir l'envoi d'un message "Hello World" depuis le terminal AT vers le webclient HiveMQ.

Réintégration ESP32 : Une fois la communication AT validée, réinjecter le code de pilotage dans l'ESP32 pour automatiser l'envoi.





essaie avec un nouveau module usb vers port serie ft 232 rl





polysource2025@gmail.com
Polytech!2025

Polysource
Polysource2025


id GSM 
4ce3ae5fec044cfbb33a7989f49a7bd6.s1.eu.hivemq.cloud

#17032026


>[Rx<-][14:17:45][asc]
AT+SOCKA

+SOCKA:TCP,4ce3ae5fec044cfbb33a7989f49a7bd6.s1.eu.hivemq.cloud,8883

OK

Operation complete
>[Tx->][14:17:49][asc]
Operation complete
>[Tx->][14:17:08][asc]
AT+MQSSL?

>[Warn][14:17:49][asc]
Operation complete
>[Tx->][14:17:08][asc]
AT+MQSSL?

+CME ERROR:58

Operation complete
>[Tx->][14:20:07][asc]
AT+VER

>[Rx<-][14:20:07][asc]
AT+VER

+VER:V1.3.25.000000.0000

OK
>[Warn][14:24:47][asc]
AT+MQTLS=1,1

+CME ERROR:58


