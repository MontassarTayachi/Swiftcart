import React, {  useEffect, useState } from 'react'
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import { Carousel } from 'primereact/carousel';
import ProductItem from '../Product-Card/ProductItem2';
import './PopularProducts.css';
import { Alert, Snackbar } from '@mui/material';
import ProduitItem3 from '../Product-Card/ProduitItem3';
import { Link } from 'react-router-dom';
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}
function Scroll_Horizontal({name,products,card,navigateClick,style}) {
     const [open, setOpen] = useState('');
    const productTemplate = (product) => {
        return (
          card?<ProduitItem3 product={product}/>:
            <ProductItem open={open} openSnackbar={false} setOpen={setOpen} product={product}/>
           
           
        );
    };
    const [width, height] = useWindowSize();
    const getNumVisible = () => {
      if (width > 1024) return 5; // Grand écran
      if (width > 768) return 3.5; // Écran moyen
      if (width > 600) return 3;
      if (width > 450) return 2.5;
      // Petit écran
      return 2; // Très petit écran
    };

  return (
    <>
      {(open === 'wishlist' || open === 'compare' || open === 'cart') &&
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
         {(open === 'inCart' ) &&
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
                 {`Product already in Cart.`} 
                </Alert>
         </Snackbar>}
         { (open === 'Wish' || open === 'Compare' || open === 'Cart') &&
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
                 {`The item has been removed from ${open} List .`} 
                </Alert>
         </Snackbar>}
    <div style={style} className='carddzcizjoijczjczp'>
       <div className='header'> <h1>{name}</h1> <Link onClick={()=>window.location.href=navigateClick} >See more</Link></div>
        <Carousel  value={products} numVisible={getNumVisible()} numScroll={1} showIndicators={false} itemTemplate={productTemplate} />
     </div>
    </>
  )
}

export default Scroll_Horizontal