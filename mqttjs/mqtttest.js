var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://localhost', "Room")
 
client.on('connect', function () {
  client.subscribe('sohan', function (err) {
    if (!err) {
      // client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})