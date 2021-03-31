const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//mqtt settings

const mqtt = require('mqtt');
var options={
    username: 'quiet',
    password: '1234',
    port : 1883,
    keepalive: 60,
    reschedulePings: true,
    reconnectPeriod: 1000

};


// database settings

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const topicId = "ID_Data";
const topicDis = "dist";
var dataFlag = [-1];
var userId;


// app.use(express.static(__dirname +'/public'));




    const mqtt_client = mqtt.connect(("mqtt://192.168.0.110", options));

    mqtt_client.on("connect", () =>{

        console.log("Connected");


        console.log("Subscribe to : ", topicId);
        console.log("Subscribe to : " , topicDis);

        mqtt_client.subscribe(topicId, {qos:2});
        mqtt_client.subscribe(topicDis,{qos:2});


    });

    // console.log("New client connected: "+ socket.id);


    //function to get most recent data by id
    // function getDistData(){
    //     mongo.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true},
    //         function(err,db){
    //             var dbo= db.db('bioBase');
    //             if(err){
    //                 throw err;
    //             };

    //             dbo.collection('bioItems').aggregate([
    //                 { $sort: {time: -1}},
    //                 { $group: {_id: '$userId',
    //                     meas: {$first: '$$ROOT'},
    //                     meas_ids: {$push: '$_id'}}}]).toArray((err, docs) =>{
    //                         io.socket.emit("get_data", docs);
    //                     })
    //         });
    // }

    mqtt_client.on('message', (topic,message) =>{

        //received id through mqtt

        if(topic == "id_data"){
            userId = message.toString();
            console.log("User id is:" + userId);
        }

        //received distance

        if(topic == "dist"){
            dataFlag[0] = message.toString();
            console.log("Distance is :" + dataFlag[0]);
        }


        //add received data to  database bioBase

        if(dataFlag[0] != -1){
            console.log("Received distance.");

            mongo.connect(url, {useNewUrlParser: true, useUnifiedTopology:true}, function(err,db){
                if(err) throw err;

                var dbo = db.db("bioBase");
                var dist = dataFlag[0];


                //create new timestamp for the current data

                var date_ob = new Date();
                let date = ("0" + date_ob.getDate()).slice(-2);
                let month = ("0" + date_ob.getMonth()).slice(-2);
                let year = date_ob.getFullYear();
                let hours = ("0" + date_ob.getHours()).slice(-2);
                let minutes = ("0" + date_ob.getMinutes()).slice(-2);
                let seconds = ("0" + date_ob.getSeconds()).slice(-2);
                let nTime = year + "-" + month + "-" + date + "-" + hours + ":" + minutes + ":" + seconds;
  
                dbo.collection('bioBase', function(err, collection){
                    collection.insertOne({userId: userId, dist: dist, time: nTime})
                })

                dataFlag[0] = -1;
                // getDistData();

            });
        };

    });


    //clear whole database

    // socket.on("clear_db", ()=>{
    //     mongo.connect(urs, {useNewUrlParser:true, useUnifiedTopology:true},
    //        function(err,db) {
    //            if(err) throw err;

    //            var dbo = db.db("bioBase");
    //            dbo.collection("bioItems", function(err, collection){
    //                collection.drop();
    //            });
    //        });     
    // });

    // // clear 













app.use(express.static("build"));
app.use("/", express.static("build"));
server.listen(port,()=>{
    console.log(`Listening to the port: ${port}`);
});


