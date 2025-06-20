
import { assets } from '../assets/assets'

const features = () => {
  return (
    <div className='flex justify-between items-center gap-10 mt-20 max-md:flex-col text-gray-700'>
        <div className='flex justify-center items-center flex-col items-center w-full'>
            <div>
                <img src={assets.exchange_icon} alt="exchange_icon" />
            </div>
            <div className='flex flex-col items-center justify-center text-md py-5'>
                <p className='font-bold'>Easy Exchange Policy</p>
                <p>We offer hassle free exchange policy</p>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col items-center w-full'>
            <div>
                <img src={assets.quality_icon} alt="exchange_icon" />
            </div>
            <div className='flex flex-col items-center justify-center text-md py-5'>
                <p className='font-bold'>7 Days Return Policy</p>
                <p>We provide 7 days free return policy</p>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col items-center w-full'>
            <div>
                <img src={assets.support_img} alt="exchange_icon" />
            </div>
            <div className='flex flex-col items-center justify-center text-md py-5'>
                <p className='font-bold'>Best customer support</p>
                <p>we provide 24/7 customer support</p>
            </div>
        </div>
    </div>
  )
}

export default features