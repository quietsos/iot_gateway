const mqtt = require('mqtt');
const client = mqtt.connect("mqtt://192.168.0.104");


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


client.on('message', (topic,message) =>{
    console.log('receive message: %s, %s', topic,message);
    
    switch(topic){
        case 'garage/open':
            return handleOpenRequest(message);
        case 'garage/close':
            return handleCloseRequest(message);
    }

})


function handleOpenRequest(message){

    if(state != 'open' && state != 'opening'){
        console.log("Opening garage door");
        state= 'opening';
        sendStateUpdate();


        // simulate door open after 2 seconds 

        setTimeout(()=>{
            state= 'open';
            sendStateUpdate();
        },2000)
    }
}




function handleCloseRequest(message){
    if(state != 'closed' && state!= "closing"){
        state= 'closing';
        sendStateUpdate();

        //simulate door closed after 5 seconds

        setTimeout(()=>{
            state = 'closed';
            sendStateUpdate();
        },2000)
    }
}










