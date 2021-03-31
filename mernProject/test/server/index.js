import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';



const app = express();

app.use('/posts',postRoutes);
app.use('/contact',postRoutes);


app.use(bodyParser.json({limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

app.use(cors());


//mongodb

 
const CONNECTION_URL = 'mongodb+srv://quietsos:sohan1718021@cluster0.dae95.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=> app.listen( PORT, ()=>{
        console.log(`Server running on the port ${PORT}`);
    }))
    .catch((err) =>{
        console.log(err.message);
    })

mongoose.set('useFindAndModify',false);

