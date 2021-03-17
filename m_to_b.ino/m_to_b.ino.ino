#include<ESP8266WiFi.h>
#include<PubSubClient.h>


const char* ssid = "Innovation Lab";
const char* password = "be_innovative_#";
const char* mqttServer = "192.168.1.112";
const int port = 1883;


WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi(){

  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(ssid);
  WiFi.begin(ssid,password);

  while (WiFi.status()!=WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}



void reconnect(){

  while(!client.connected()){
    Serial.println("Connecting to MQTT broker...");

    if(client.connect("Room")){
      Serial.println("Connected");
    }
    else{
      Serial.print("Failled, rc = ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}
void setup(){
  Serial.begin(9600);
  setup_wifi();
  client.setServer(mqttServer,port);
}






void loop(){

  if(!client.connected()){
    reconnect();
  }
  client.loop();

//  int val = distanceMeasure();
  client.publish("distance","This is distance");
  delay(2000);

  
}
