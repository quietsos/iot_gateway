#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Innovation Lab";                   // wifi ssid
const char* password =  "be_innovative_#";         // wifi password
const char* mqttServer = "192.168.0.107";    // IP adress Raspberry Pi
const int mqttPort = 1883;
//const char* mqttUser = "quiet";      // if you don't have MQTT Username, no need input
//const char* mqttPassword = "1234";  // if you don't have MQTT Password, no need input

#define trigPin D4
#define echoPin D5

long duration;
int distance;
int value;


WiFiClient espClient;
PubSubClient client(espClient);

void setup() {

  Serial.begin(115200);
  
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");

  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");

    if (client.connect("ESP8266Client")) {

      Serial.println("connected");

    } else {

      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);

    }
  }

//  client.publish("esp8266", "Hello Raspberry Pi");
//  client.subscribe("esp8266");

  pinMode(trigPin,OUTPUT);
  pinMode(echoPin,INPUT);

}

void callback(char* topic, byte* payload, unsigned int length) {

  Serial.print("Message arrived in topic: ");
  Serial.println(topic);

  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    Serial.print((int)payload[i]);
  }

  Serial.println();
  Serial.println("-----------------------");

}

void loop() {

    value = disMeasure();
    
    client.publish("esp8266",value);
    client.subscribe("esp8266");
    delay(300);
  client.loop();
}

int disMeasure(){
  digitalWrite(trigPin,LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin,HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin,LOW);

  duration = pulseIn(echoPin,HIGH);

  distance = duration*0.034/2;
  Serial.print("Distance: ");
  Serial.println(distance);
  delay(2000);
}
