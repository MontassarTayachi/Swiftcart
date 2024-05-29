import { GrClose } from "react-icons/gr"; 
import React, { useEffect } from 'react'
import './ProductItemPlus.css'
import { Link } from 'react-router-dom'
import { Rate } from 'antd'
import hors_stock from '../../../../assets/images/hors stock.png'
import { API_BASE_URL } from '../../../../config'
import { useCart } from "../../../../Context/CartProvider";

function ProductItemPlus({product,setOpen}) {
  const[storeName,setStoreName]=React.useState('')
  const {setRefreshes}=useCart()
  const getStoredList = async () => { 
    try {
        const response = await fetch(`${API_BASE_URL}/stores/all?id=${product.store_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setStoreName(data.stores[0].name)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
 getStoredList()
  
}, [])
const addToCart = async (event) => {
  event.preventDefault(); // Empêche la navigation
  event.stopPropagation(); 
 try {
  const respance= await fetch(`${API_BASE_URL}/cart_items`,{
      method:'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
      },
      body:JSON.stringify({product_id:product.id,quantity:1})
  })
  const data = await respance.json()
  if(data.success){
      setOpen('cart')
  }
  else{
       setOpen('existe')
      throw new Error(data.message)
  }
}
catch (error) {
     
      console.error(error);
}

setRefreshes(prev => prev + 1);
window.dispatchEvent(new Event('storageChange'));

};
  return (
    <div className='productnezijeiz5qqqq87ezp'>
        <img src={`${product&&product.media ? product.media[0]:hors_stock}`}  alt="table" className="img"/>
        <Link to="/product/1" className="">
        <p className="title">{product.name}</p>
        </Link>
        <Rate disabled defaultValue={4} value={product.rating} className="rate"/>
        <p className="price">{product.price} TND</p>
        <p className="delevery price">{product.delivery_price} TND</p>
        <p className="store">{storeName}</p>
        <button className="add" onClick={addToCart}>Add to cart</button>
    </div>
  )
}

export default ProductItemPlus