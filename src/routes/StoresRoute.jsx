import React from 'react'
import { Routes, Route } from 'react-router-dom';
import MyStore from '../Composants/Store/MyStore/MyStore';
import CreateStore from '../Composants/Store/CreateStore/CreateStore';
import Dashboard from '../Composants/Store/StoreManagement/Dashboard';
import AddProduct from '../Composants/Store/StoreManagement/Composants/Product/AddProduct/AddProduct';
import MyProduct from '../Composants/Store/StoreManagement/Composants/Product/MyProduct/MyProduct';
import Setting from '../Composants/Store/StoreManagement/Composants/Setting/Setting';
import EditProduct from '../Composants/Store/StoreManagement/Composants/Product/EditProduct/EditProduct';
import Order from '../Composants/Store/StoreManagement/Composants/order/order';
import {ProductCategoriesProvider}from '../Context/product_categories';
import Loadable from '../Composants/Store/StoreManagement/Composants/dashboard/Loadable';
import { lazy } from 'react';
 import ThemeCustomization from '../Composants/Store/StoreManagement/Composants/dashboard/themes';
  const DashboardDefault = Loadable(lazy(() => import('../Composants/Store/StoreManagement/Composants/dashboard')));

function StoresRoute() {
  return (
    <Routes>
      <Route path="/Swiftcart/MyStores" element={<MyStore />} />
      <Route path="/Swiftcart/CreateStore" element={<CreateStore />} />
      <Route path="/Swiftcart/Dashboard/" element={<Dashboard />}>
        <Route index element={<ThemeCustomization><DashboardDefault/></ThemeCustomization>} />
        <Route path="Overview"element={<ThemeCustomization><DashboardDefault/></ThemeCustomization>} />
        <Route path="Product/new" element={ <ProductCategoriesProvider><AddProduct/></ProductCategoriesProvider>} />
        <Route path="Product/edit/:id" element={ <ProductCategoriesProvider><EditProduct/></ProductCategoriesProvider>} />
        <Route path="Product" element={<MyProduct/>} />
        <Route path="Setting" element={<Setting/>} />
        <Route path="Order" element={<Order/>} /> 

      </Route>

    </Routes>
  )
}

export default StoresRoute