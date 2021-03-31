
import PostMessage from '../models/PostMessage.js';


// export const getPosts = (req,res) =>{
//     res.send("This is working");
// }

export const getPosts = async (req,res) =>{
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({message: error.message});
        
    }
}

export const getContuct = (req,res) =>{
    res.send("This is contact page.");
}


export const createPost = async (req,res) =>{
    // res.send("Post creation");
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save(newPost);

        res.status(201).json(newPost);

        
    } catch (error) {
        res.status(409).json({message: error.message});

    }
}