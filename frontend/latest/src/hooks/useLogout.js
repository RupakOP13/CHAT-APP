import {useState} from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
const [loading,setLoading]=useState(false);
const {setAuthUser}=useAuthContext();
const logout=async()=>{
setLoading(true);
    try{
        const res=await fetch('/api/auth/logout',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
        });
        
        if(!res.ok){
            const data=await res.json();
            throw new Error(data.error || 'Logout failed');
        }

        localStorage.removeItem('authUser');
        setAuthUser(null);

    }
    catch(err){
        toast.error(err.message);
    }
    finally{
        setLoading(false);
    }

}
return {logout,loading};
}

export default useLogout;