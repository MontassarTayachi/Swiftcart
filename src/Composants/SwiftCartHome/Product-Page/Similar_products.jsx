import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../config'
import Scroll_Horizontal from '../Product-View/Scroll_Horizontal/Scroll_Horizontal'

function Similar_products({category,Popular}) {
    const [products,setProduct]=useState([])
     useEffect(() => {
        const fetchProduct = async () => {
       try {
        const response = await fetch(API_BASE_URL+`/Search?subcategories=${category}&product_from_index=${1}&product_to_index=${15}${Popular?'&sort=popularity':''}`)
        const data = await response.json()
        setProduct(data.products)
       } catch (error) {
        
       }
        }
        fetchProduct()
      },[category])
    return (
    <div>
       {products.length>1  &&  <Scroll_Horizontal style={{margin:'0'}} navigateClick={`/Swiftcart/search?categories=${category}`} products={products}  name={Popular ?`Popular products in ${category}`:' Similar Products'}/>} 

    </div>
  )
}

export default Similar_products