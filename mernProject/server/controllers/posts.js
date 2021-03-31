import postMessage from '../models/postMessage.js';


export const getPosts = async (req,res) =>{
    try{
        const PostMessage = await postMessage.find();

        // console.log(PostMessage);

        res.status(200).json(PostMessage); 
    }catch(error){
        res.status(404).json({ message: error.message });

    }
}

export const createPost = (req,res) =>{

    res.send("Post Creation.");
}





