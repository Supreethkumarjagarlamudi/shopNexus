
const NewsLetter = () => {

    const submitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div className='w-full flex flex-col items-center justify-center gap-3 py-10 text-lg'>
        <div className='flex flex-col items-center justify-center gap-3'>
            <div className='text-2xl font-bold'>
                Subscribe now & get 20% off
            </div>
            <div className='text-center text-gray-500'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </div>
        </div>
        <div className='flex w-full'>
            <form onSubmit={submitHandler} className='flex items-center border-1 w-full sm:w-1/2 gap-3 mx-auto'>
                <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none pl-5' />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default NewsLetter