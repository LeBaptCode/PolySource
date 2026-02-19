Si AT+SOCKALK? renvoie "Connected", c'est une super nouvelle : ça veut dire que ton modem a bien ouvert le tuyau TCP vers HiveMQ. Le problème ne vient plus du réseau, mais de ce qui se passe dans le tuyau.

Si ça boucle à l'infini malgré le "Connected", c'est que la couche SSL de l'ESP32 n'arrive pas à faire la "poignée de main" (handshake) avec HiveMQ à travers le modem.
