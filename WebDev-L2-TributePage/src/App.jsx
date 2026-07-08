import { useState } from 'react'

import './App.css'
import Hero from './Components/hero'
import Bio from './Components/bio'
import Achieve from './Components/achieve'
import Quote from './Components/quote'
import Footer from './Components/footer'

function App() {


  return (
    <>
      <Hero/>
      <Bio/>
      <Achieve/>
      <Quote/>
      <Footer/>
    </>
  )
}

export default App
