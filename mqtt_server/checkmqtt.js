
const mqtt = require('mqtt');
var options={
    username: 'quiet',
    password: '1234',
    port : 1883,
    keepalive: 60,
    reschedulePings: true,
    reconnectPeriod: 1000

};



const mqtt_client = mqtt.connect(("mqtt://192.168.0.110", options));

mqtt_client.on("connect", () =>{

    console.log("Connected");

});
