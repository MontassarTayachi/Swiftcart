import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AuthenticationRoute from './routes/AuthenticationRoute';
import StoresRoute from './routes/StoresRoute';
import AccountsRoute from './routes/AccountsRoute';
import SwiftCartHome from './routes/SwiftCartHome';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import PaymentRoute from './routes/PaymentRoute';
function App() {
  return (
    <BrowserRouter>
      <AuthenticationRoute/>
      <StoresRoute/>
      <AccountsRoute/>
      <SwiftCartHome/>
      <PaymentRoute/>
    </BrowserRouter>
  );
}

export default App;
