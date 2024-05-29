import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './Context/UserProvider';
import {StoreCategories} from './Context/StoreCategories';
import {SerachBar} from './Context/SerachBar';
import {FollowedProvider } from './Context/Followed';
import{CartProvider} from './Context/CartProvider';
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <FollowedProvider>
    <StoreCategories>
    <UserProvider>
    <SerachBar>
    <CartProvider>
      <App />
    </CartProvider>
    </SerachBar>
    </UserProvider>
    </StoreCategories>
    </FollowedProvider>
);
reportWebVitals();
