
import {assets} from "../assets/assets"

const AboutBox = () => {
  return (
    <div className='w-full flex flex-col'>
      <div className="w-full flex items-center justify-center gap-3 text-2xl py-10">
        <div className="flex items-center justify-center gap-2 text-gray-400">
            ABOUT
        <span className="font-bold text-black">US</span>
        </div>
        <h1 className="w-16 md:w-20 h-[3px] bg-[#414141]"></h1>
      </div>
      <div className='flex  max-md:flex-col'>
        <div className='flex p-5'>
            <img src={assets.about_img} alt="About Image" />
        </div>
        <div className='flex flex-col gap-3 justify-center p-5 text-gray-600'>
            <p>ShopNexus was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
            <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
            <p className='font-bold'>Our Mission</p>
            <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutBox