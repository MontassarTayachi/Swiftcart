import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../config';
import GridProduct from '../Product-View/Grid/Grid';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRight, AiOutlineHome } from "react-icons/ai"; 
import './Wishlist.css';
import noProducts from '../../../assets/images/no_products_found.gif';

function Wishlist() {
    const [products, setProducts] = useState([]);
    const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    useEffect(() => {
        const fetchProducts = async () => {
            const ids = wishlistIds.map(item => item.id);
            console.log('id:', ids);

            if (ids.length === 0) {
               setProducts([]);
                return;
            }
            
            try {
                const res = await fetch(`${API_BASE_URL}/search?id=${ids.join(',')}`);
                
                if (!res.ok) {
                    throw new Error(`Failed to fetch products: ${res.statusText}`);
                }
                
                const data = await res.json();
                setProducts(data.products);
                console.log('Products:', data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
      
        fetchProducts();
    }, [wishlistIds,products]); // This might need refinement based on how wishlistIds is updated.

    const navigate = useNavigate();

    return (
        <div className='wishlistemadi'>
            <div className='navsksisi55'>
                <AiOutlineHome style={{ cursor: 'pointer', fontSize: '1.8em', marginRight: '0.2em' }} onClick={() => navigate('/Swiftcart')} />
                <AiOutlineRight style={{ fontSize: '1.5em' }} />
                Wishlist
            </div>
         {products.length > 0 &&  <div className='reset'><button
            onClick={
                () => {
                    localStorage.removeItem('wishlist');
                    window.dispatchEvent(new Event('storageChange'));
                }
            
            }>
                
                Reset wish list</button></div>}

            {products.length > 0 ? (
                <GridProduct products={products} />
            ) : (
                <div className='noproducts48948978487'>
                 <img src={noProducts} alt='No products found' className='noProducts' />
                </div>   )}
           
        </div>
    );
}

export default Wishlist;
