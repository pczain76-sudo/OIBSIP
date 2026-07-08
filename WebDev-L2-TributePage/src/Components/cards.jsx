import React from 'react'

function Cards({date , para , src}) {
    return (
        <>
        <div className='bg-amber-200'>
        <div className='bg-amber-100 m-4 p-2 rounded-2xl    flex flex-col justify-center items-center border-2 border-black'>

<h2 className='text-2xl text-black font-bold font-sans '>{date}</h2>
<p>{para}</p>
<img src={src} alt="pic" className='rounded-xl' />


        </div>
        </div>
        
        
        
        
        </>
        
    )
}

export default Cards
