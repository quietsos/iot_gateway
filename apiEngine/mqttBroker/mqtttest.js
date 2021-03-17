var mqtt = require('mqtt')
var client = mqtt.connect("mqtt://test.mosquitto.org", {clientId:'sohan1'});
console.log("Connected flag: " + client.connected);

