#include<ESP8266WiFi.h>
#include<PubSubClient.h>


const char* ssid = "Innovation Lab";
const char* password = "be_innovative_#";
const char* mqttServer = "192.168.0.105";
const int port = 1883;
const char* mqttUser = "rango";
const char* mqttPassword = "rangoisback";


#define trigPin D3
#define echoPin D4
long duration;
int distance;


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
  pinMode(echoPin,INPUT);
  pinMode(trigPin,OUTPUT);
  
  setup_wifi();
  client.setServer(mqttServer,port);
}


int distanceMeasure(){
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculating the distance
  distance= duration*0.034/2;
  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
  return distance;
  
}



void loop(){

  if(!client.connected()){
    reconnect();
  }
  client.loop();

  int  val = distanceMeasure();
  client.publish("distance",String(val).c_str());
  delay(2000);

  if(client.connect("light")){
    Serial.print("Connected to subscribe");
    
  }

  
  

  
}
