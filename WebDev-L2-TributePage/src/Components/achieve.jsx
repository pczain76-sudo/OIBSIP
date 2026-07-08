import React from 'react'
import Cards from './cards'

function Achieve() {
    return (
        <>
          <h1 className='text-black text-3xl font-bold font-serif  underline underline-offset-3 flex justify-center bg-amber-200 '>Achievements</h1>
        
        <div className='lg:flex lg:flex-row lg:justify-center lg:items-center grid grid-cols-1  '>
          
        <Cards date={1951} para={'Started helping poor patients.'} src={'help.jpg'}/>
         <Cards date={1965} para={'Opened first Edhi dispensary.'} src={'help.jpg'}/>
          <Cards date={1980} para={'Expanded ambulance service.'} src={'help.jpg'}/>
        </div>
        </>
        
    )
}

export default Achieve
