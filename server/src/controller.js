const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://192.168.1.112");

var garageState = "";
var connected = false;

client.on('connect', ()=>{
    client.subscribe('garage/connected');
    client.subscribe('garage/state');
})

client.on('message', (topic,message)=>{
    // if(topic == 'garage/connected'){
    //     connected = (message.toString() == 'ture')
    // }
    
    switch(topic){
        case 'garage/connected':
            return handleGarageConnected(message);
        case 'garage/state':
            return handleGarageState(message);
    }

    console.log('No handler for topic %s', topic);

})



function handleGarageConnected(message){
    console.log('garage connected status %s', message)
    connected = (message.toString() == 'true');
}


function handleGarageState(message){
    garageState = message;
    console.log('garage state update to %s', message);
}


