

const Title = (props) => {
  return (
    <div>
        <div className='w-full flex flex-col items-center justify-center gap-3 py-10 text-lg'>
            <div className='w-full flex items-center justify-center gap-3 text-2xl'>
                <div className='flex items-center justify-center gap-2'>
                    {props.title1}
                    <span className='font-bold'>{props.title2}</span>
                </div>
                <h1 className='w-16 md:w-20 h-[3px] bg-[#414141]'></h1>
            </div>
            <div>
                <h3 className='flex justify-center items-center text-center text-xs md:text-md'>{props.subtitle}</h3>
            </div>
        </div>
    </div>
  )
}

export default Title