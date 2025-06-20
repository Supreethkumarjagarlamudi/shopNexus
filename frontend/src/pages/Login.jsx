import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const login = () => {

  const {setToken, token, navigate, backendUrl} = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Login')

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    try{
      event.preventDefault();

      if(currentState == 'Sign-Up'){

        let response = await axios.post(backendUrl + '/api/user/registration', {fullName: name, email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message);
        }
      }else{
        let response = await axios.post(backendUrl + '/api/user/login', {email, password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        }else{
          toast.error(response.data.message);
        }

      }

    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    if(token){
      navigate("/");
    }
  }, [token])
  return (
    <div className='flex flex-col'>
      <div className="w-full flex justify-center items-center gap-3 text-3xl mt-25">
        <div className="flex items-center justify-center gap-2 text-gray-700">
          {currentState}
        </div>
        <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
      </div>
      <div className='w-full flex flex-col items-center'>
        <form onSubmit={onSubmitHandler} className='w-full flex flex-col justify-center items-center gap-3 mt-5'>
        {
          currentState === "Login" ? "" : (
            <input onChange={(e) => {setName(e.target.value)}} value={name} type="text" className='w-full p-2 text-gray-600 border-1 border-gray-400 sm:w-1/3 rounded-sm' placeholder='Full Name' />
          )
        }
        <input onChange={(e) => {setEmail(e.target.value)}} value={email} type="email" className='w-full p-2 text-gray-600 border-1 border-gray-400 sm:w-1/3 rounded-sm' placeholder='Email' />
        <input onChange={(e) => {setPassword(e.target.value)}} value={password} type="password" className='w-full p-2 text-gray-600 border-1 border-gray-400 sm:w-1/3 rounded-sm' placeholder='Password' />
        <div className='w-full sm:w-1/3 flex justify-between text-gray-600 t'>
          <Link to="/forgotPassword">Forgot Your Password?</Link>
          {
            currentState === 'Login' ? (
              <p className="cursor-pointer" onClick={() => {setCurrentState('Sign-Up')}}>Create Account</p>
            ) :
            (
              <p className='cursor-pointer' onClick={() => {setCurrentState('Login')}}>Login here</p>
            )
          }
        </div>
        <button className='p-3 text-white cursor-pointer border-1 border-gray-400 text-xl bg-black rounded-sm'>
          {
            currentState === 'Login' ? 'Sign-In' : 'Sign-Up'
          }
        </button>
        </form>
      </div>
    </div>
  )
}

export default login
