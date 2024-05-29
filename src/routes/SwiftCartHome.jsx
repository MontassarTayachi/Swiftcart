import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Search from '../Composants/SwiftCartHome/Search/Search';
import Swiftcart from '../Composants/SwiftCartHome/Swiftcart';
import All_Stores from '../Composants/SwiftCartHome/All-Stores/All_Stores';
import Wishlist from '../Composants/SwiftCartHome/wishlist/Wishlist';
import Compare from '../Composants/SwiftCartHome/Compare/Compare';
import Cart from '../Composants/SwiftCartHome/Cart/Cart';
import Product_page from '../Composants/SwiftCartHome/Product-Page/Product-page';
import StorePage from '../Composants/SwiftCartHome/Store-Page/StorePage';
import Home_Store from '../Composants/SwiftCartHome/Store-Page/Composants/Home_Store';
import Contact_Us from '../Composants/SwiftCartHome/Store-Page/Composants/Contact_Us';
import Products_Store from '../Composants/SwiftCartHome/Store-Page/Composants/Products_Store';
import About_Us from '../Composants/SwiftCartHome/Store-Page/Composants/About_Us';
import Search_In_Store from '../Composants/SwiftCartHome/Store-Page/Composants/Search';
import Recently_viewed_articles_Grid from '../Composants/SwiftCartHome/Recently_viewed_articles/Recently_viewed_articles_Grid';
import Storemaps from '../Composants/SwiftCartHome/Store maps/Storemaps';
import Loadable from '../Composants/Store/StoreManagement/Composants/dashboard/Loadable';
import { lazy } from 'react';
const Homeproduct = Loadable(lazy(() => import('../Composants/SwiftCartHome/Home-product/Home')));

function SwiftCartHome() {
  return (
    <Routes>
      <Route path="/Swiftcart/" element={<Swiftcart />}>       
      <Route index element={<Homeproduct />} />
      <Route path="Home" element={<Homeproduct/>} ></Route>
      <Route path="All-Stores" element={<All_Stores/>} />
      <Route path="Storemaps" element={<Storemaps/>} />
      <Route path="Wishlist" element={<Wishlist />} />
      <Route path="Compare" element={<Compare />} />
      <Route path="Search" element={<Search />} />
      <Route path='Cart' element={<Cart />} />
      <Route path="Browsing History" element={<Recently_viewed_articles_Grid/>}/>
      <Route path="StorePage/:id" element={<StorePage/>}>
        <Route index element={<Home_Store/>} />
        <Route path="Home" element={<Home_Store/>} />
        <Route path="products" element={<Products_Store/>}/>
        <Route path="contact" element={<Contact_Us />}/>
        <Route path="About Us" element={<About_Us/>}/>
        <Route path="Search" element={<Search_In_Store/>}/>
      


      </Route>
      
      <Route path="product/:id" element={<Product_page/>}/>
      </Route>
    </Routes>
  )
}

export default SwiftCartHome