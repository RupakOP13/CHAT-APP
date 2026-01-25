import mongoose from "mongoose";



 const connectToMongoDb=async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB successfully");
}
    catch(err){
        console.log("Error connecting to MongoDB:",err.message);
    }
};
export default connectToMongoDb;


