import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const  useGetConversations = () => {
    const[loading,setLoading]=useState(false);
    const [conversations,setConversations]=useState([]);

    useEffect(()=>{
        const getConversations=async()=>{
            setLoading(true);
            try{
                const res=await fetch('/api/users');
                const data=await res.json();
                if(!res.ok){
                    throw new Error(data.message || 'Failed to fetch conversations');
                }
                setConversations(data.users);

            }catch(err){
                toast.error(err.message);
            }
            finally{
                setLoading(false);
            }
        };
        getConversations();


},[]);
    return {conversations,loading};
}


export default useGetConversations;