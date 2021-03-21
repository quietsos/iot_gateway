const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://192.168.1.112");


var state = 'closed';



client.on('connect', ()=>{

    client.publish('garage/connected', 'true'); //inform the controller that garage is connected
    sendStateUpdate();

})


function sendStateUpdate(){
    console.log('Sending state %s', state);
    client.publish('garate/state',state);
}