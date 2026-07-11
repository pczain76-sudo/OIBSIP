import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate()

    const [error , setError]=useState('')

const [formData , setformData]=useState({
    username:'',
    email: '',
    password:''
})

const handlechange =
(e)=>{

    const name=  e.target.name
    const value = e.target.value
   
     setformData(
        {...formData , [name]:value
        }
     )
    

}

const handleSubmit=(e)=>{

    e.preventDefault();

    console.log(formData)
    if(formData.password.trim()==='' || formData.email.trim()==='' || formData.username.trim()===''){
         setError('Please fill all fields')
         return
    }

    if(formData.password.length<8){
      setError('password must be at least 8 characters')
      return
    }
    if(!/\d/.test(formData.password)){
        setError('password must be included at least one digit')
        return
    }

    const users = JSON.parse(localStorage.getItem('users'))||[]
    console.log('users are',users)

   

    const existUser = users.find((user)=>user.email===formData.email)

    if(existUser){
        setError("User Already Exists! Please Login")
        return
    }
 users.push(formData)
    localStorage.setItem('users',
        JSON.stringify(users)
    )

    setError('Sucessfully Registered')
    navigate('/login')
    setformData('')


}

    return (
        <>

    <div className='my-20'>
        <form onSubmit={handleSubmit}>
        <div className='bg-gray-400 flex flex-col justify-center items-center p-10 m-auto w-full max-w-md rounded-2xl border-amber-300 border-2'>
            <h1 className='text-white underline underline-offset-9 lg:text-2xl mb-5  '>Please Register</h1>
            <input type='text'  name='username' placeholder='Enter your username' className='bg-white border-none outline-none  rounded-sm indent-1 p-1 mb-2 lg:w-70' onChange={handlechange} value={formData.username}/>
            <input type='email'  name='email' placeholder='Enter your Email' className='bg-white border-none outline-none  rounded-sm indent-1 p-1 mb-2 lg:w-70' onChange={handlechange} value={formData.email}/>
            <input type='password'  name='password' placeholder='Enter your Password'  className='bg-white border-none outline-none  rounded-sm indent-1 p-1 mb-2 lg:w-70'onChange={handlechange} value={formData.password}/>
            <button className='text-white bg-green-600 hover:bg-green-700 transition p-2 w-40 rounded-sm mb-2 cursor-pointer active:translate-y-1' type='submit'>Register
            </button>
           <span className='text-red-500 cursor-pointer text-sm active:translate-y-1 mt-1  ' >Already have an account?    <Link to="/login" className='text-blue-700 hover:underline ' >
          Login
          </Link> </span>
          <p className='text-sm text-red-500 mt-2 p-1 text-center rounded-sm border-none outline-none   '>{error}</p>
        </div>
        </form>
        </div>
        </>
    )
}

export default Register
