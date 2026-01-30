import {createContext,useState,useEffect} from "react";
 import {io} from "socket.io-client";
import {useAuthContext} from "./AuthContext";


export const SocketContext=createContext();

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const {authUser}=useAuthContext();


    useEffect(()=>{
        if(authUser){
            const newSocket=io("http://localhost:8000");
            setSocket(newSocket);
            return()=>{newSocket.close()};
  
            }   else{
            if(socket){
                socket.disconnect();
                setSocket(null);
            }


            
        }
    },[authUser]);
    return<SocketContext.Provider value={{socket,onlineUsers}}>
        {children}
    </SocketContext.Provider>



}



