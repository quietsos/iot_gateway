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



// for nofifying controller that garage is disconnected before shutting down


function handleAppExit(options,err){
    if(err){
        console.log(err.stack);
    }

    if(options.cleanup){
        client.publish('garage/connected','false');
    }

    if(options.exit){
        process.exit();
    }
}


process.on('exit', handleAppExit.bind(null,{
    cleanup:true
}))

process.on('SIGINT', handleAppExit.bind(null,{
    exit:true
}))

process.on('uncaughtException',handleAppExit.bind(null,{
    exit:true
}))





