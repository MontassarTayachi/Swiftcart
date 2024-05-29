import React from 'react'
import Grid_store from '../Store-View/Store-Grid/Grid'
import Navigate from '../NavBar/Navigate'
import './All_Stores.css'
function All_Stores() {
  return (
  <div className='All_Stores' >
    <Navigate number={2}></Navigate>
   
    <h1> All partners</h1>
    <Grid_store/>
    </div>
  )
}

export default All_Stores