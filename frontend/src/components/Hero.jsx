import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center border-1 rounded-[10px]'>
        <div className='w-full sm:w-1/2 flex flex-col justify-center items-center py-10 sm:py-0'>
            <div className='flex justify-center items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>Our BestSellers</p>
            </div>
            <h1 className='prata-regular text-3xl lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            <div className='flex justify-center items-center gap-2'>
                <p className='ont-medium text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            </div>
        </div>
        <img className="w-full sm:w-1/2 max-sm:rounded-bl-[10px] sm:rounded-tr-[10px] rounded-br-[10px]" src={assets.hero_img} alt="" />
    </div>
  )
}

export default Hero