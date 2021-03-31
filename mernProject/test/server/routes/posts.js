import express from 'express';

import {getContuct, getPosts,createPost} from '../controllers/posts.js';

const router = express.Router();

router.get('/',getPosts);
router.get('/',getContuct);
router.post('/',createPost);

// router.get('/', (req,res)=>{
//     res.send("This works");
// });


export default router;