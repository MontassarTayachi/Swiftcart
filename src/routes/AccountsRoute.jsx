import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Accounts from '../Composants/Accounts/Accounts';
import General from '../Composants/Accounts/General';
import Security from '../Composants/Accounts/Security';
import EmailModification from '../Composants/Accounts/EmailVerification';
import Overview from '../Composants/Accounts/Overview/Overview';
import Orders from '../Composants/Accounts/Orders/Orders';
import Following from '../Composants/Accounts/Following/Following';
function AccountsRoute() {
  return (
   <Routes>
    
     <Route path="/Swiftcart/EmailChange" element={<EmailModification/>} ></Route> 
      <Route path="/Swiftcart/Accounts" element={<Accounts />} >
      <Route index element={<Overview />}/>
      <Route path="General" element={<General />}/>
      <Route path="Security" element={<Security />}/>
      <Route path="Overview" element={<Overview />}/>
      <Route path="Orders" element={<Orders />}/>
      <Route path="Following" element={<Following />}/>
      </Route>
   </Routes>
  )
}

export default AccountsRoute