import { AiOutlineHome } from "react-icons/ai"; 
import { AiOutlinePhone } from "react-icons/ai"; 
import { AiOutlineMail } from "react-icons/ai"; 
import { CgClose } from "react-icons/cg"; 
import { Backdrop} from '@mui/material'
import React from 'react'
import './OrderItem.css'
import ValidateurChaine from '../../../../../function/ValiderChaine';
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../../../config';
import { InputNumber } from "antd";
function OrderItem({order, setOpen}) {
    const [Qty, setQty] = React.useState(order.quantity);
    const changeQty = async (value) => {
        setQty(value);
        try {
            const request = await fetch(`${API_BASE_URL}/orders?id=${order?.id}&quantity=${value}&quantity_is_true=true`, {
              method: 'put',
              headers: {
                'Content-Type': 'application-json',
                'Authorization': localStorage.getItem('token'),
              },
            });
            const repance = await request.json();
            if (!repance.success) {
              throw new Error(repance.message);
            }
          } catch (error) {
            console.error(error);
          }
    };

    const date = new Date(order.created_at);
        const dateString = date.toLocaleString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC',
        });
    
    const ChangerStaus=async (status)=>{
      let query=`${API_BASE_URL}/orders?id=${order.id}&status=${status}`;
      if(status=='Delivered'&&order.payment_method=='en_deliver'){
        query=`${API_BASE_URL}/orders?id=${order.id}&status=${status}&payment_method=cash`;
      }
        try {
          const reapance =await fetch(query,
          {method: 'PUT',
            headers: {  
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({status:status})
          });
          const rep=await reapance.json();
          if(rep.success){
            setOpen(false);
          }
        } catch (error) {
        }
      }
        const handConfirm=async (status)=>{
            try {
              const reapance =await fetch(`${API_BASE_URL}/orders?id=${order.id}`,
              {method: 'PUT',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${localStorage.getItem('token')}`,
                  },
               body: JSON.stringify({status:status})    
                  });
               const rep=await reapance.json();
               if(rep.success){
                setOpen(false);
               }   
            } catch (error) {
              
            }
        
        
        
          }     
  return (
    <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <div className='OrderItem878777'>
           <div className="order">
                <div className='OrderItemHeader'>
                    <p> </p>
                    <p>Order #{order.id}</p>
                    <button onClick={() => setOpen(false)}><CgClose /></button>
                </div>
                <div className="info">
                  
                    <div className="OrderInfo">
                        <h2>Status</h2>
                        <p>{dateString}</p>
                        <p>{order.status}</p>
                    </div>
                    <div className="CustomerInfo">
                        <h2>Customer Info</h2>
                        <h3>{order.buyer.first_name} {order.buyer.last_name}</h3>
                        <p><AiOutlineMail />  {order.buyer.email}</p>
                        <p><AiOutlinePhone /> {order.phone_number}</p>
                        <p><AiOutlineHome />  {order.address}</p>

                    </div>
                </div>
                
           </div>
           <div className="userMessage">
                <h2>Customer message</h2>
                <p>{ValidateurChaine.reduireEtValiderChaine(order.message,1000)}</p>
           </div>
           <div className="OrderItems">
            <h2>{order.quantity} Items in order</h2>
            <h2>  Total: {order.total} TND</h2>
            </div>
            <div className="productsInfo">
                    <div className="img"><img src={order.product_image}></img></div>
                    <div className="productInfo">
                        <h3>{order.product_name} <Link to={'/Swiftcart/Dashboard/Product/edit/'+order.product_id} className="viewproduct">view Product</Link></h3>
                        <p>{order.product_price} TND</p>
                        <p>Quantity: </p><InputNumber min={1} disabled={order.status!='Pending'} value={Qty} onChange={changeQty} />
                     </div>
            </div> 
                  {
                  order.status === 'Pending' && (
                    <div className="OrderActions">
                      <button onClick={() => ChangerStaus('Canceled')}>Cancel Order</button>
                      <button onClick={() => ChangerStaus('Accepted')}>Confirm Order</button>
                    </div>
                  )
                  }
                  {
                  order.status === 'Accepted' && (
                    <div className="OrderActions">
                      <button onClick={() => setOpen(false)}>Cancel</button>
                      <button onClick={() => handConfirm('On_delivery')}>Proceed to delivery</button>
                    </div>
                  )
                  }
                  {
                  order.status === 'On_delivery' && (
                    <div className="OrderActions">
                      <button onClick={() => setOpen(false)}>Cancel</button>
                      <button onClick={() => ChangerStaus('Delivered')}> Delivered</button>
                    </div>
                  )
                  }
                     { order.status === 'Delivered' && (
                    <div className="OrderActions">
                      <button onClick={() => setOpen(false)}>Cancel</button>
                    </div>
                  )
                  }
                  {
                  order.status === 'Canceled' && (
                    <div className="OrderActions">
                      <button onClick={() => ChangerStaus('Confirmed')}>Confirm Order</button>
                    </div>
                  )
                  }        
                    
        </div>
    </Backdrop>
   
  )
}

export default OrderItem