const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://192.168.1.112");


var state = 'closed';



client.on('connect', ()=>{

    //update garage to connect call
    client.subscribe('garage/open');
    client.subscribe('garage/close');

    client.publish('garage/connected', 'true'); //inform the controller that garage is connected
    sendStateUpdate();

})


function sendStateUpdate(){
    console.log('Sending state %s', state);
    client.publish('garate/state',state);
}


client.on('connect', (topic,message) =>{
    console.log('receive message %s %s', topic,message);
    
})