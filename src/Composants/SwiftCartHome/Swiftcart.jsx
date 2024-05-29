import React from 'react'
import NavBar from './NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/footer'

function Swiftcart() {
  return (
   <>
   <NavBar/>
   <div style={{background:'rgb(227, 230, 230)'}}>
   <Outlet></Outlet>
   </div>
   <Footer/>
   
   </>
  )
}

export default Swiftcart