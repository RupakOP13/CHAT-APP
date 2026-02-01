import { useSocketContext } from "../context/SocketContext";
import useConversation from '../zustand/useConversation';
import { useEffect } from "react";
import notificationSound from '../assets/sounds/sound.mp3';


const useListenMessages = () => {
    const {socket}=useSocketContext();
    const {messages,setMessages}=useConversation();

    useEffect(() => {
        
        
        socket?.on("newMessage" ,(newMessage) => { // Listen for new messages from the server
            console.log("New message received:", newMessage);
            newMessage.shouldShake = true;
            const sound=new Audio(notificationSound);
            sound.play().catch(err => console.log("Sound play error:", err));
            setMessages([...messages, newMessage]);
        });
        return () => socket?.off("newMessage");   
    }, [socket, messages, setMessages]);
};

export default useListenMessages;