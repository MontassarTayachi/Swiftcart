import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../config';
import GridProduct from '../Product-View/Grid/Grid';
import { useNavigate } from 'react-router-dom';
import { AiOutlineRight, AiOutlineHome } from "react-icons/ai"; 
import { PickList } from 'primereact/picklist';
import ProductItemPlus from '../Product-View/Product-Card/ProductItemPlus';
import './Compare.css';
import { Alert, Snackbar } from '@mui/material';
import noProducts from '../../../assets/images/no_products_found.gif';
function Compare() {
    const [open, setOpen] = useState('');
    const [products, setProducts] = useState([]);
    const compareId = JSON.parse(localStorage.getItem('compare')) || [];
    const [target, setTarget] = useState([]);
    const onChange = (event) => {
        setProducts(event.source);
      setTarget(event.target);
  };
  
    useEffect(() => {
        const fetchProducts = async () => {
            const ids = compareId.map(item => item.id);
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
    }, [compareId,products]); // This might need refinement based on how wishlistIds is updated.

    const navigate = useNavigate();
    const itemTemplate = (item) => {
        return (
            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                   <ProductItemPlus setOpen={setOpen} product={item}/>
            </div>
         
            )
    }
    return (
       <>
          {(open === 'cart') &&
         <Snackbar
                open={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={() => setOpen('')}
            >
                 <Alert
                    onClose={() => setOpen('')}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                 {`Product added to ${open} successfully.`} 
                </Alert>
         </Snackbar>}
         {(open === 'existe') &&
         <Snackbar
                open={true}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={() => setOpen('')}
            >
                 <Alert
                    onClose={() => setOpen('')}
                    severity="warning"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                 {`Product already existed in the cart .`} 
                </Alert>
         </Snackbar>}
        <div className='comparetemadi'>
            <div className='navsksisi55'>
                <AiOutlineHome style={{ cursor: 'pointer', fontSize: '1.8em', marginRight: '0.2em' }} onClick={() => navigate('/Swiftcart')} />
                <AiOutlineRight style={{ fontSize: '1.5em' }} />
                Compare
            </div>
            {products.length >0 &&  <div className='reset'><button
            onClick={
                () => {
                    localStorage.removeItem('compare');
                    window.dispatchEvent(new Event('storageChange'));
                }
            
            }>
                
                Reset comparison list</button></div>}

            {products.length > 0 ? (
                <div style={{padding:'1em'}}>
                    <PickList dataKey="id" source={products} target={target} onChange={onChange} itemTemplate={itemTemplate} breakpoint="500px"
                sourceHeader="Product" targetHeader="Compare"filter filterBy="name"  sourceStyle={{ height: 'auto' }} targetStyle={{ height: '100rem' }} />
   
                </div>
            ) : (
                <div className='noproducts48948978487'>
                 <img src={noProducts} alt='No products found' className='noProducts' />
                </div>
            )}
                 </div></>
    );
}

export default Compare;
