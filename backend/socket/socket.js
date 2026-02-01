import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);   // Create HTTP server using Express app
const io = new Server(server, {         // Create Socket.IO server
    cors: {
        origin: "*",  // Allow all origins for simplicity; adjust in production
        methods: ["GET", "POST"]     // Allow GET and POST methods
    }
});

export const getReceiverSocketId=(receiverId)=>{  // Get socket ID for a given user ID
    return userSocketMap[receiverId];
}

const userSocketMap={};    //{userId:socketId}
io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
    const userId = socket.handshake.query.userId;
    
    if(userId && userId !== "undefined" && userId !== "null"){
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} mapped to socket ${socket.id}`);
        //socket.on() is used to listen to events from client
        //socket.emit() is used to send events to client
        io.emit("getOnlineUsers", Object.keys(userSocketMap));// tell client who is online
    }
    
    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
        if(userId && userId !== "undefined" && userId !== "null"){
            delete userSocketMap[userId];
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
        }
    });
});

export {app, io, server};