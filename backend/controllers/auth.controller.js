import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenandSetCookie from "../utils/generateToken.js";


export const signup=async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;

        if(password!==confirmPassword){
            return res.status(400).json({message:"Password and Confirm Password do not match"});
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const boyProfilePic=`https://randomuser.me/api/portraits/men/${Math.floor(Math.random()*100)}.jpg`;
        const girlProfilePic=`https://randomuser.me/api/portraits/women/${Math.floor(Math.random()*100)}.jpg`;

        const newUser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender==="male"?boyProfilePic:girlProfilePic
        });

        if(newUser){
            await generateTokenandSetCookie(newUser._id,res);
            await newUser.save();
        
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic,
        })
    }else{
        res.status(400).json({message:"Error creating user"});

    }}catch(err){
        console.log("Error in signup controller:", err.message);
        res.status(500).json({error: "Internal Server Error"})
    }

};
export const login=async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await User.findOne({username});
        const isPasswordCorrect=await bcrypt.compare(password,user?.password ||"");
        
        if(!user || !isPasswordCorrect){
            return  res.status(400).json({message:"Invalid username or password"});
        }
        generateTokenandSetCookie(user._id,res);
    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic,
    });
    }catch(err){
        console.log("Error in login controller:", err.message);
        res.status(500).json({error: "Internal Server Error"})
    }
    
    

};
export const  logout=async(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0})   //delete cookie by setting maxAge to 0
        res.status(200).json({message:"Logged out successfully"});

    }
    catch(err){
        console.log("Error in logout controller:", err.message);
        res.status(500).json({error: "Internal Server Error"})
    }
    

};





