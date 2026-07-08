import React from 'react'

function Hero() {
    return (
        <>
        <div className='flex flex-col text-center justify-center items-center gap-2 mx-auto  bg-amber-200'>
        <h1 className='text-black text-3xl font-bold font-serif mt-10 underline underline-offset-3' >Abdul Sattar Edhi</h1>
        <p className='font-sans'>A life devoted to humanity, compassion, and selfless service.</p>
        <img className='h-60 w-50 rounded-2xl '  src='edhi.jpg'/>

        </div>
        </>
    )
}

export default Hero
