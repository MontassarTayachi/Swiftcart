import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from '../Composants/LogIn&signUp/LogIn';
import EmailVerification from '../Composants/LogIn&signUp/EmailVerification';
import SignUp from '../Composants/LogIn&signUp/SignUp';
import ForgotPassword from '../Composants/LogIn&signUp/ForgotPassword';
import ResetPassword from '../Composants/LogIn&signUp/ResetPassword';
import Oauth from '../Composants/LogIn&signUp/Oauth';

function AuthenticationRoute() {
  return (
   <Routes>
     <Route path="/Swiftcart/oauth" element={<Oauth />} />
     <Route path="/Swiftcart/logIn" element={<LogIn />} />
     <Route path="/Swiftcart/EmailVerification/:token" element={<EmailVerification />} />
     <Route path="/Swiftcart/SignUp" element={<SignUp />} />
     <Route path="/Swiftcart/ForgotPassword" element={<ForgotPassword />} />
     <Route path="/Swiftcart/ResetPassword/:token" element={<ResetPassword />} />
   </Routes>
  )
}

export default AuthenticationRoute