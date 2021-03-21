const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://192.168.1.112");

var garageState = "";
var connected = false;

client.on('connect', ()=>{
    client.subscribe('garage/connected');
    client.subscribe('garage/state');
})

client.on('message', (topic,message)=>{
    if(topic == 'garage/connected'){
        connected = (message.toString() == 'ture')
    }

})