
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";



export const sendMessage=async(req,res)=>{
    try{
     const {message}=req.body;
     const {id:receiverId}=req.params; //receiverId
     const senderId=req.user._id;

     let conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]},
     });

     if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId],
            
        });
     }
     const newMessage=await Message.create({
        senderId,
        receiverId,
        message,
     });
    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
    await conversation.save();
    res.status(201).json({message:"Message sent successfully", newMessage});

}

    catch(err){
        console.log("Error in sendMessage controller:", err.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};

export const getMessages=async(req,res)=>{
    try{
        const {id:otherUserId}=req.params;
        const senderId=req.user._id;
        const  conversation=await Conversation.findOne({
            participants:{$all:[senderId,otherUserId]},
        }).populate("messages"); //NOT REFERENCE BUT ACTUAL MESSAGES
        res.status(200).json({messages:conversation?.messages || []});

    }catch(err){
        console.log("Error in getMessages controller:", err.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};