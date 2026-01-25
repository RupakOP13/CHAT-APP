import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";

const app=express();
dotenv.config();
const PORT=process.env.PORT||5000;



app.use(express.json());  //middleware to parse json body
app.use(cookieParser()); //middleware to parse cookies

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);









app.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`)
})