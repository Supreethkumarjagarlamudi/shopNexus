import React from 'react'
import {assets} from "../assets/assets.js"


const navbar = ({setToken}) => {
  return (
    <div className='w-full flex justify-between px-[50px] py-[10px] items-center'>
        <img src={assets.logo} alt="Admin Panel Logo" className='w-[max(10%,80px)]' />
        <button onClick={() => setToken("")} className='p-1.5 hover:scale-110 duration-150 ease-in-out bg-black rounded-md text-white'>
            Logout
        </button>
    </div>
  )
}

export default navbar