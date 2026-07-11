import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Dashboard() {

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    
    const navigate = useNavigate()
    const handleOut =()=>{
   
       
        localStorage.removeItem('loggedInUser')
         navigate('/login')
    }

   useEffect(
    ()=>{

        if(!loggedInUser){
            navigate('/login')
        }

    },[loggedInUser,navigate]
   )
  
    
    return (
        <>
        
        {loggedInUser && (
         <h1>Welcome {loggedInUser.username}</h1> )}
         <button className='bg-red-500 text-white text-2xl text-center p-2 m-2 rounded-sm active:translate-y-1' onClick={handleOut}>Logout</button>
 
        
        </>
    )
}

export default Dashboard
