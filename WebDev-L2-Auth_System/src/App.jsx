import { useState } from 'react'
import {  Routes , Route,  Link  } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import { Navigate } from "react-router-dom";


function App() {
  

  return (
    <>
  
    
    

    <Routes>
       <Route path='/' element={<Navigate to="/login" />}  />
       <Route path="/login" element={<Login />} />
       <Route path='/register' element={<Register/>} />
       <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    
 
    
     
    </>
  )
}

export default App
