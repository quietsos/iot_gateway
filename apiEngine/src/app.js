const express = require('express');
const app = express();
const port = process.env.PORT || 8000;


app.get('/', (req,res) =>{

    res.send("Hello, i am from the server side");
})


app.listen(port,()=>{

    console.log(`Connected to the port: ${port}`);

})
