import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../../config';
import'./Stores_Following.css'
import ValidateurChaine from '../../../function/ValiderChaine';
function Stores_Following({store}) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${API_BASE_URL}/products/all?store_id=${store.id}`);
            const data = await response.json();
            setProducts(data.products);
        };
        fetchProducts();
    }, [store.id]);

  return (
    <div className='Stores_Following'>
        <div className='store'>
            <h2>{store.name}</h2>
            <img src={store?.profile_image}></img>
            <Link to={`/Swiftcart/StorePage/${store.id}`} > Visit the store</Link>
        </div>
       <div className='ree'>
        <div className='header'>    <h3>new product</h3> <Link to={`/Swiftcart/StorePage/${store.id}/products`}>View All </Link></div>
        <div className='products'>
            {products.length>0&& products.splice(1,4).map((product) => (
            <div className='product' key={product.id}>
                <img src={product.media[0]}></img>
                <h3 onClick={()=>{window.location.href='/Swiftcart/product/'+product.id}}>{ValidateurChaine.reduireEtValiderChaine(product.name,20)}</h3>
                <p>TND {product.price}</p>
            </div>
            ))}

        </div>
       </div>
    </div>
  )
}

export default Stores_Following