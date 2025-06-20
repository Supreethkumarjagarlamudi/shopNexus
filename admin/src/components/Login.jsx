import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      const response = await axios.post(backendUrl+"/api/user/admin",{email, password});
      if(response.data.success){
        setToken(response.data.token);
      }else{
        toast.error(response.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen w-full'>
      <form onSubmit={onSubmitHandler}>
      <div className='max-w-md rounded-md border-1 border-black p-3'>
        <div className='text-2xl font-semibold flex justify-center align-center'> 
          <p>Admin Panel</p>
        </div>
        <div>
          <div className='mb-3 min-w-72'>
            <p className='text-md mb-2'>Email</p>
            <input onChange={(e) => {setEmail(e.target.value)}} value={email}type="email" placeholder='Enter Your Email' className='rounded-sm border-1 border-black p-2 w-full  outline-none' required/>
          </div>
          <div className='mb-3 min-w-72'>
            <p className='text-md mb-2'>Password</p>
            <input onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" placeholder='Enter Your Password' className='rounded-sm border-1 border-black p-2 w-full outline-none' required/>
          </div>
          <div className='min-w-72 mb-3'>
            <button type="submit" className='mt-3 bg-black flex items-center justify-center w-full text-white p-2 text-xl rounded-md'>Login</button>
          </div>
        </div>
      </div>
      </form>
    </div>
  )
}

export default Login