import React, { useEffect } from 'react'
import Promotion from '../Product-View/Promotion/Promotion'
import Scroll_Horizontal from '../Product-View/Scroll_Horizontal/Scroll_Horizontal'
import Navigate from '../NavBar/Navigate'
import {API_BASE_URL} from '../../../config'
import RecentlyViewedArticles from '../Recently_viewed_articles/Recently_viewed_articles'

function Homeproduct() {
  const [products, setProducts] = React.useState([])
  const[stores,setStores]=React.useState([])
  const[products2,setProducts2]=React.useState([])
  const[products3,setProducts3]=React.useState([])  
  useEffect(() => {
  const  fetchData = async () => {
    try {
      const response = await fetch(API_BASE_URL+'/Search?product_from_index=1&product_to_index=15&store_from_index=1&store_to_index=5&sort=popularity')
    const data = await response.json()
    setProducts(data.products)
    setStores(data.stores)
    const response2 = await fetch(API_BASE_URL+'/Search?product_from_index=1&product_to_index=70&store_from_index=1&store_to_index=1&sort=most_selled')
    const data2 = await response2.json()
    setProducts2(data2.products)
    const response3 = await fetch(API_BASE_URL+'/Search?product_from_index=1&product_to_index=70&store_from_index=1&store_to_index=1&sort=views')
    const data3 = await response3.json()
    setProducts3(data3.products)
    } catch (error) {
      console.log(error)
    }
    
  }
  fetchData()
  }, [])
  
  return (
    <>
    <Navigate number={1} ></Navigate>
   {products.length>0 && <Promotion stores={stores} product={products}></Promotion>}
   {products.length>0 &&<Scroll_Horizontal navigateClick={`/Swiftcart/search?sort=popularity`} products={products}  name={'Popular products'}/>}
   {products2.length>0 &&  <Scroll_Horizontal navigateClick={`/Swiftcart/search?sort=most_selled`}  products={products2}  name={'Best sale'}/>}
   {products3.length>0 && <Scroll_Horizontal navigateClick={`/Swiftcart/search?sort=popularity`} products={products3} name={'Most viewed products'}/>}
    <RecentlyViewedArticles/>
    <div>
  

    </div>
    </>
  )
}

export default Homeproduct