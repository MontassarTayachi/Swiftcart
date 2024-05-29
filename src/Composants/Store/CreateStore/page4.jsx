import { IoIosArrowBack } from "react-icons/io"; 
import React, { useState } from 'react'
import './Style/Four.css'
import { GrFormNext } from 'react-icons/gr'
import Checkbox from '@mui/joy/Checkbox';
function Stepfour({openPage3,openPage5,function1,paymentMethods}) {

    
      const handleChange = (event) => {
        function1({ ...paymentMethods, [event.target.name]: event.target.checked });
       
      };
      const submit=()=>{
        openPage5();
       
      }
   
  return (
<div className='four'>
  <div className='header'>    
    <h1>Choose your payment method:</h1>
    <h2>Choose your payment method through our secure options for a hassle-free living experience.</h2>
  </div>
  <div className='main'>
     
     <Checkbox   className={`Checkbox ${paymentMethods.delivery? ' do':''}`} label="Payment on delivery"name="delivery" checked={paymentMethods.delivery} onChange={handleChange} /> 
     <Checkbox    className={`Checkbox ${paymentMethods.cash? 'do':''}`} label="Species" name="cash" checked={paymentMethods.cash} onChange={handleChange}/>       
     <Checkbox   className={`Checkbox ${paymentMethods.bankTransfer? 'do':''}`} label="Bank transfer" name="bankTransfer" checked={paymentMethods.bankTransfer} onChange={handleChange}/>
     <Checkbox   className={`Checkbox ${paymentMethods.onlinePayment? 'do':''}`} label="Online payment" name="onlinePayment" checked={paymentMethods.onlinePayment} onChange={handleChange} />
  
        
     
     
        
  </div>
  <div className='footer'>
    <button  onClick={openPage3} className="back"><IoIosArrowBack className="IoIosArrowBack"/>Back</button>
    <div className='ss'>
    <button onClick={openPage5} className='skip'>  
        Skip
    </button>
    <button onClick={submit} className='next'>  
        Next<GrFormNext className="GrFormNext" />
    </button>
    </div>
  </div>
</div>
  )
}

export default Stepfour