const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://192.168.1.112");

var state = "closed";

client.on('connect', ()=>{
    client.publish("garage/connected", "true");
    console.log("Connected");
    sendStateUpdate();
})


client.on('message', (topic,message)=>{
    if(topic == 'garage/connected'){
        connected = (message.toString() == 'true');
    }

})

function sendStateUpdate(){
    console.log("Sending state %s", state);
    client.publish('garage/state', state);
}
