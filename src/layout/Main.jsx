import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Form from '../components/Form'


const Main = () => {
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Form/>
        <Footer/>
        
    </div>
  )
}

export default Main