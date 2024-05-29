import React, { useEffect, useState } from 'react'
import Navigate from '../NavBar/Navigate'
import './Product_page.css'
import ProductInfo from "./ProductInfo";
import BoutiqueInfo from "./BoutiqueInfo";
import Product_Details from "./Product_Details";
import { useLocation, useParams } from 'react-router-dom';
import{API_BASE_URL}from '../../../config'
import ProduitImages from './ProduitImages';
import RecentlyViewedArticles from '../Recently_viewed_articles/Recently_viewed_articles';
import Customer_Reviews from './Customer_Reviews';
import Similar_products from './Similar_products';
function Product_page() {
    const Recently_viewed_articles=JSON.parse(localStorage.getItem('Recently_viewed_articles'))||[]

      const id=useParams()
      const[product,setProduct]=useState({})

      const[store,setStore]=useState({})
      const[category,setCategory]=useState()
      
  useEffect(() => {
    const fetchProduct = async () => {
   try {
    const response = await fetch(API_BASE_URL+`/products/all?id=${id.id}`)
    const data = await response.json()
    setProduct(data.products[0])
    setCategory(data.products[0].subcategory.name)
    if(!Recently_viewed_articles?.includes(data.products[0].id)){
        Recently_viewed_articles.push(data.products[0].id)
    }
    localStorage.setItem('Recently_viewed_articles',JSON.stringify(Recently_viewed_articles))
    const response2 = await fetch(API_BASE_URL+`/Stores/All?id=${data.products[0].store_id}`)
    const data2 = await response2.json()
    setStore(data2.stores[0])
   } catch (error) {
    
   }
    }
  
    fetchProduct()
  }, [id])

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
     <Navigate number={1}></Navigate>
     <BoutiqueInfo store={store}/>

     <div className='Product_page_658589'>
       <ProduitImages product={product}/>
        <ProductInfo  category={category} store={store} product={product}/>   
   </div>
   {category&&<Similar_products  category={category} />}
   <Product_Details product={product}/>
  { category&&<Similar_products Popular={true} category={category} />}
   {Object.keys(product).length !== 0
   &&<Customer_Reviews product={product}  />}
 {Recently_viewed_articles.length>0 && <RecentlyViewedArticles style={{margin:'0'}} />} 
    </>
  )
}

export default Product_page