import React, { useEffect } from 'react';
import { InputNumber } from 'antd';
import './CartItem.css';
import { API_BASE_URL } from '../../../config';
import { useCart } from '../../../Context/CartProvider';

function CartItem({cart_item, setOpen}) {
  const [Qty, setQty] = React.useState(cart_item?.quantity);
  const [subTotal, setSubTotal] = React.useState(cart_item?.product.price * Qty+cart_item?.product.delivery_price);
  const{cart,setCart,setRefreshes}=useCart()
  const changeQty = async (value) => {
    setQty(value);
    try {
      const request = await fetch(`${API_BASE_URL}/cart_items?id=${cart_item?.id}`, {
        method: 'PUT',                    
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify({quantity: value }),
      });
      const repance = await request.json();
      if (!repance.success) {
        throw new Error(repance.message);
      }
      else{
      setRefreshes((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
    setSubTotal(cart_item?.product.price * value+cart_item?.product.delivery_price);
  };
  const removeFromCart = async () => {
    try {
      const request = await fetch(`${API_BASE_URL}/cart_items?id=${cart_item?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application-json',
          'Authorization': localStorage.getItem('token'),
        },
      });
      const repance = await request.json();
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
  };
 const addToWishlist = () => {
    const list = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!list.some((item) => item.id === cart_item?.product.id)) {
      list.push({ id: cart_item?.product.id });
      localStorage.setItem('wishlist', JSON.stringify(list));
      window.dispatchEvent(new Event('storageChange'));
      setOpen('wishlist');
    }
    else{
      setOpen('Wish');
    }
  };
 const  addToCompare = () => {
    const list = JSON.parse(localStorage.getItem('compare')) || [];
    if (!list.some((item) => item.id === cart_item?.product.id)) {
      list.push({ id: cart_item?.product.id });
      localStorage.setItem('compare', JSON.stringify(list));
      window.dispatchEvent(new Event('storageChange'));
      setOpen('compare');
    }
    else{
      setOpen('Compare');
    }
  };


  // Ensure other functions like addToWishlist, addToCompare are implemented as needed

  return (
    <div className='CartItem56888'>
      <img src={cart_item?.product.media ?cart_item?.product.media[0] :'https://m.media-amazon.com/images/I/71SHhAkNLgL._AC_SX569_PIbundle-8,TopRight,0,0_SH20_.jpg' || 'default_image_url'} alt='product' />
      <div className='detalis'>
        <div className='price'> 
          <h3 onClick={()=>{window.location.href=`/Swiftcart/product/${cart_item?.product.id}`}}>{cart_item?.product.name}</h3>
          <p>Price: {cart_item?.product.price.toFixed(3)} TND</p>
        </div>       
        <p>Subtotal: {subTotal.toFixed(3)} TND</p>
        <p>Delivery: {cart_item?.product.delivery_price.toFixed(3)} TND</p>
        {cart_item?.product.stock > 0 ? <p className='inStoke'>In Stock</p> : <p className='outStock'>Out of Stock</p>}
        <div className='quantity'>
          <p className='qtyLabel'>Qty</p> 
          <InputNumber min={1} max={cart_item?.product.stock} value={Qty} onChange={changeQty} />
        </div>
        <div className='djiiejzoij'>
          <button onClick={removeFromCart}>Remove</button> 
          <button onClick={addToWishlist}>Add to Wishlist</button> 
          <button onClick={addToCompare}>Add to Compare</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
