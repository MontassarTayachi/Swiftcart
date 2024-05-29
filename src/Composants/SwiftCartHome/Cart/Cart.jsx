import React, { useEffect, useState } from 'react'
import { AiOutlineRight, AiOutlineHome } from "react-icons/ai"; 
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import CartItem from './CartItem';
import { API_BASE_URL } from '../../../config';
import { Alert, Snackbar } from '@mui/material';
import Pay from './Pay';
import { useCart } from '../../../Context/CartProvider';
import emptycart from '../../../assets/images/empty cart.gif'
function Cart() {
    const navigate = useNavigate();
    const[open,setOpen]=useState('')
    const{cart,setCart,setRefreshes}=useCart()
    const [storeSelected, setStoreSelected] = useState({});
    const[totalPrice,setTotalPrice]=useState(0)
    const CalculTotal=(item)=>{
        let total=0
          item.cart_items.map((cart_item)=>total+=(cart_item.product.price*cart_item.quantity)+cart_item.product.delivery_price)
        return total
    }
  const totalItems=(item)=>{
    let total=0
    item.cart_items.map((cart_item)=>total+=cart_item.quantity)
    return total
  }

  const removeFromCart = async (items) => {
    const ids=items.cart_items.map(cart_item=>cart_item.id).join(',')
    try {
      const request = await fetch(`${API_BASE_URL}/cart_items?id=${ids}&id_is_array=true`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application-json',
          'Authorization': localStorage.getItem('token'),
        },
      });
      const repance = await request.json();
      console.log(repance)
      if (!repance.success) {
        throw new Error(repance.message);
      }
      else{
      setRefreshes((prev) => prev + 1);
      }
      window.dispatchEvent(new Event('storageChange'));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <> 
    {(open === 'Pay') && <Pay totalPrice={totalPrice} setOpen={setOpen} store={storeSelected} /> }
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
    {(open === 'Wish' || open === 'Compare') &&
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
            {`Product already existed in the ${open} List  .`} 
           </Alert>
    </Snackbar>}
    {
      
    }
    <div className='Carte5498289'>
    <div className='navsksisi55'>
                <AiOutlineHome style={{ cursor: 'pointer', fontSize: '1.8em', marginRight: '0.2em' }} onClick={() => navigate('/Swiftcart')} />
                <AiOutlineRight style={{ fontSize: '1.5em' }} />
                Shopping Cart
            </div>
            { cart.length >0 ? cart.map((item) => (
        <div className='main' >
        <div className='ShoppingCart'>
            <h1>Shopping Cart for {item?.name}</h1>
           <button onClick={()=>{removeFromCart(item)}}>Deselect all items</button>
           <div className='price'><p>Price</p></div>
           {  item?.cart_items.map((cart_item) => (
                <CartItem key={cart_item.id} setOpen={setOpen} cart_item={cart_item} />
              ))
           }
           <div className='totale'><h1>Subtotal ({totalItems(item)} items): {CalculTotal(item).toFixed(3)} TND</h1></div>
        </div>
        <div  className='checkout'>
          <h1>Subtotal ( items): {CalculTotal(item).toFixed(3)} TND</h1>
          <button onClick={
            ()=>{setOpen('Pay')
            setTotalPrice(CalculTotal(item))
            setStoreSelected(item)}
          }>Proceed to checkout</button>
        </div>
        
        </div>)):
        <div className='emptycart877878787878'>
          <img src={emptycart} alt='emptycart'/>
        </div>
        }
    </div>
    </>
  )
}

export default Cart