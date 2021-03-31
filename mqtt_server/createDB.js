var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/bioBase";


MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology:true}, function(err, db){
    if(err) throw err;
    console.log("BioBase created");
    db.close();
});


