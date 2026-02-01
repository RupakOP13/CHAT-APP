import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
const {setAuthUser}=useAuthContext();
     const signup = async ({fullName,username,password,confirmPassword,gender}) => {
       const success= handleInputError({fullName,username,password,confirmPassword,gender});
         if(!success) return;
setLoading(true);
         try{
            const res=await fetch('/api/auth/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({fullName,username,password,confirmPassword,gender}),
            });
            const data=await res.json();
            
            if(!res.ok){    // means response status is not in 200-299
                throw new Error(data.message || 'Something went wrong');
            }
            toast.success('Account created successfully');

            //localstorage
            localStorage.setItem('authUser',JSON.stringify(data));

            setAuthUser(data);

         } catch(err){
            toast.error(err.message);
           
         }
            finally{
            setLoading(false);

}
}
    return {signup,loading};
};

export default useSignup;


function handleInputError({fullName,username,password,confirmPassword,gender}){
  if(!fullName || !username || !password || !confirmPassword || !gender){
    toast.error("Please fill all the fields");
    return false;
  }
  if(password!==confirmPassword){
    toast.error("Passwords do not match");
    return false;
  }
  if(password.length<6){
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;


}

