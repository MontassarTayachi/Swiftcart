import React from 'react'
import './ProduitItem3.css'
import ValidateurChaine from "../../../../function/ValiderChaine";
import { useNavigate } from 'react-router-dom';
function ProduitItem3({product}) {
    const navigate=useNavigate();
  return (
   
   <div className='productItem23235' onClick={()=>{window.location.href=`/Swiftcart/product/${product.id}`}}>
           <img src={`${product.media && product.media[0]}`} alt="image" />
    </div>
 
  )
}

export default ProduitItem3