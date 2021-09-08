#include<ESP8266WiFi.h>
#include<PubSubClient.h>



const char* ssid = "Innovation Lab";
const char* password = "be_innovative_#";
const char* mqttServer = "192.168.0.117";
const int port = 1883;


#define ledPin D5
#define fanPin D6


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
      client.subscribe("light");
      client.subscribe("fan");
    }
    else{
      Serial.print("Failled, rc = ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}





void callback(char* topic, byte* payload, unsigned int length){
  Serial.print("Message arrived on topic: ");
  Serial.println(topic);


  Serial.print("Length is: ");
  Serial.println(length);

  String msg="" ;

  Serial.print("Data received from broker: ");
  for(int i=0; i<length; i++){
    
    msg += ((char)payload[i]);
    Serial.println(msg);
  }
  
  

  if(String(topic) == "fan"){

    if(msg == "ON"){
      
    digitalWrite(fanPin,HIGH);
    Serial.println("fan on");      
    }

    else{
      digitalWrite(fanPin,LOW);
      Serial.println("fan off");
    }
    
     Serial.print("Final msg = ");
     Serial.println(msg);

  }

  if(String(topic) == "light"){
    if(msg == "ON"){
      digitalWrite(ledPin,HIGH);
      Serial.println("Light on");
      
    }
    else{
      digitalWrite(ledPin,LOW);
      Serial.println("Light Off");
    }
    
     Serial.print("Final msg = ");
     Serial.println(msg);
    
  }

  
  Serial.println();
  Serial.println("__________________");
  Serial.println();

 
  
  

}







void setup(){

  
  Serial.begin(9600);
  pinMode(ledPin,OUTPUT); 
  pinMode(fanPin,OUTPUT);
  digitalWrite(ledPin,LOW);
  digitalWrite(fanPin,LOW);
 
  
  
  setup_wifi();
  client.setServer(mqttServer,port);
  client.setCallback(callback);
  

  
}

void loop(){

  if(!client.connected()){
    reconnect();
  }
  client.loop();

  delay(2000);

 

  
  
}
