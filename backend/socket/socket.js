import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap={};    //{userId:socketId}
io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);
    const userId = socket.handshake.query.userId;
    userSocketMap[userId] = socket.id;
    //socket.on() is used to listen to events from client
    //socket.emit() is used to send events to client
    io.emit("onlineUsers", Object.keys(userSocketMap));// tell client who is online
    socket.on("disconnect", () => {
        console.log("User disconnected: " + socket.id);
        delete userSocketMap[userId];
        io.emit("onlineUsers", Object.keys(userSocketMap));
    });
});

export {app, io, server};