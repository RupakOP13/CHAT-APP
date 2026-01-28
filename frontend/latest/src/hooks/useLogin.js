import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
const {setAuthUser}=useAuthContext();
    const login = async ({username,password}) => {
         const success= handleInputError({username,password});
         if(!success) return;

         setLoading(true);
            try{
            const res=await fetch('/api/auth/login',{
                method:'POST',
                headers:{   'Content-Type':'application/json'},
                body:JSON.stringify({username,password}),
            });
            const data=await res.json();


            if(!res.ok){
                throw new Error(data.message || 'Something went wrong');
            }
            toast.success('Login successful');

            //localstorage
            localStorage.setItem('authUser',JSON.stringify(data));

            setAuthUser(data);
            } catch(err){
            toast.error(err.message);
            }
            finally{
            setLoading(false);
            }
    };
    return {login,loading};
};

export default useLogin;

function handleInputError({username,password}){
  if(!username || !password ){
    toast.error("Please fill all the fields");
    return false;
  }
  
  return true;


}




