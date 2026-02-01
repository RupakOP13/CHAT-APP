import path from "path";
import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import {app,server} from "./socket/socket.js";
   


dotenv.config();
const PORT=process.env.PORT||5000;
 const __dirname=path.resolve();



app.use(express.json());  //middleware to parse json body
app.use(cookieParser()); //middleware to parse cookies

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
app.use(express.static(path.join(__dirname,'frontend/latest/dist')));
app.get(/.*/, (req,res)=>{
    res.sendFile(path.join(__dirname,'frontend/latest/dist','index.html'));
})











server.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`)
})