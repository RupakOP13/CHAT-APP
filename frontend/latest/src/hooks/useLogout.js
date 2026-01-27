import {usestate,useContext} from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const useLogout = () => {
const [loading,setLoading]=usestate(false);
const {setAuthUser}=useContext(AuthContext);
const logout=async()=>{
setLoading(true);
    try{
        const res=await fetch('/api/auth/logout',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
        });
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
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