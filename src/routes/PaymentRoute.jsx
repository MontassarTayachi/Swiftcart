import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Success from '../Composants/SwiftCartHome/payment/Success';
import Fail from '../Composants/SwiftCartHome/payment/Fail';

function PaymentRoute() {
  return (
   <Routes>
        <Route path="/payment/success" element={<Success />}></Route>
        <Route path="/payment/fail" element={<Fail />} />
    </Routes>    
  )
}

export default PaymentRoute