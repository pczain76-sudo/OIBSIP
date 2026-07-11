import React, { useState } from 'react'
import {  Link , useNavigate  } from 'react-router-dom'


function Login() {

    const [error , setError]= useState('')


    const [formData, setformData]= useState({
        email:'',
        password:''
    })
 
const navigate = useNavigate()
    const handleChange=(e)=>{
       const name= e.target.name
       const value = e.target.value


       setformData(
        {
            ...formData , [name]:value
        }
       )
    }

    const handleSubmit =(e)=>{
        

        e.preventDefault()
        console.log(formData)

        if(formData.email.trim()==='' || formData.password.trim()==='' ){
            setError('Please required all fields')
            return
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
const existuser = users.find((user)=>user.email===formData.email)

 if(!existuser){
    setError('User Not Found')
    return
 }
 
        if( formData.password===existuser.password){
               localStorage.setItem(
    "loggedInUser",
    JSON.stringify(existuser)
)
          navigate('/dashboard')
          
        }
        else{
            setError('Email and Password is incorrect')
        }

     
        
    }

    return (
        <>
      <div className='my-20'>
        <form onSubmit={handleSubmit}>
        <div className='bg-gray-400 flex flex-col justify-center items-center p-10 m-auto w-full max-w-md rounded-2xl border-amber-300 border-2'>
            <h1 className='text-white underline underline-offset-9 text-2xl mb-5  '>Please Login</h1>
            <input type='email'  name='email' placeholder='Enter your Email' className='bg-white border-none outline-none  rounded-sm indent-1 p-1 mb-2 lg:w-70' onChange={handleChange} value={formData.email}/>
            <input type='password'  name='password' placeholder='Enter your Password'  className='bg-white border-none outline-none  rounded-sm indent-1 p-1 mb-2 lg:w-70' onChange={handleChange} value={formData.password}/>
            <button className='text-white bg-green-600 hover:bg-green-700 transition p-2 w-40 rounded-sm mb-2 cursor-pointer active:translate-y-1' type='submit'>Login
            </button>
            <span className='text-red-500 cursor-pointer text-sm active:translate-y-1 mt-1  ' >Don't have an account?    <Link to="/register" className='text-blue-700 hover:underline '>
Register
</Link> </span>
<p className='text-sm text-red-500 mt-2 p-1 text-center rounded-sm border-none outline-none   '>{error}</p>
        </div>
        </form>
        </div>
        </>
    )
}

export default Login
