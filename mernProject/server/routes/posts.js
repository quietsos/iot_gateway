import express from 'express';

import {getPosts,createPost} from '../controller/posts.js'
const router = express.Router();

//https://localhsot:5000/posts


// router.get('/', (req,res)=>{
//     res.send("This work");

     
// });

router.get('/', getPosts);
router.get('/',createPost);

export default router;
