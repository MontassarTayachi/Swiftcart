import { BsChevronRight } from "react-icons/bs"; 
import { BsCart } from "react-icons/bs"; 
import { AiOutlineClockCircle } from "react-icons/ai"; 
import { AiOutlineStar } from "react-icons/ai"; 
import { MdOutlineFavoriteBorder } from "react-icons/md"; 
import { Avatar, Badge } from 'antd'
import React from 'react'
import { useUser } from '../../../Context/UserProvider';
import './Overview.css'
import { Galleria } from 'primereact/galleria';
import { Link, useNavigate } from "react-router-dom";
import image_Waiting_for_evaluation from '../../../assets/images/Orders/Waiting for evaluation.png'
import Shipped from '../../../assets/images/Orders/Shipped.png'
import image_En_attente_de_shipment from '../../../assets/images/Orders/Waiting for shipment.png'
import rejected from '../../../assets/images/Orders/rejected.png'
import { API_BASE_URL } from "../../../config";
import RecentlyViewedArticles from'../../SwiftCartHome/Recently_viewed_articles/Recently_viewed_articles'
import no_oreder from '../../../assets/images/no-orders.webp'
function Overview() {
    const { userInfo, setUserInfo } = useUser();
    const [orders, setOrders] = React.useState([]);
   const navigate=useNavigate();

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/orders/user`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                console.log(data);
                setOrders(data.orders);
            } catch (error) {
                console.error(error);

            }}
                fetchOrders();
                console.log(orders);
                }, []); 
    const orderTemplate=(item)=>{
            return(
                <div className="orderItems787778">
                    <div className="header">
                    <h1>{item.status.replace(/_/g, ' ').charAt(0).toUpperCase() + item.status.slice(1).replace(/_/g, ' ')}</h1>
                    </div>
                     <div className="orderItems">
                    <img src={item.product_image} />
                    <div className="details">
                        <h3 onClick={()=>{window.location.href=`/Swiftcart/product/${item?.product_id}`}}>{item.product_name}</h3>
                        <h4>Price: {item.product_price?.toFixed(3)} TND  X {item.quantity}</h4>
                        <h5>Shipping: {item.product_delivery_price?.toFixed(3)} TND</h5>
                        <h5>Total: {(item.product_price * item.quantity + item.product_delivery_price).toFixed(3)} TND</h5>
                        <h5>Order Date: {item.created_at}</h5>
                    </div>
                       </div>
                </div>
               
            )
        }
    
    
  return (
<>
<div className='overwiew7787'>
    <div className="user">
        <Avatar  className="avatar"  icon={<img src={userInfo.image} alt='avatar'/>} />
        <h1>{userInfo.first_name} {userInfo.last_name}</h1>
    </div>
    <div className="items">
        <div className='item' onClick={()=>{navigate('/Swiftcart/wishlist')}}>
            <MdOutlineFavoriteBorder className="icon" />
             My favourites
        </div>  
        <div className='item' onClick={()=>{navigate('Following')}}>
            <AiOutlineStar className="icon" /> 
             Following
        </div>  
        <div className='item' onClick={()=>{navigate('/Swiftcart/Browsing History')}}>
            <AiOutlineClockCircle className="icon"/> 
             Viewed
        </div>  
        <div className='item' onClick={()=>{navigate('/Swiftcart/Cart')}}>
        < Badge color="green" count={(JSON.parse(localStorage.getItem('cart')) || []).length} >
            <BsCart className="icon" />
        </Badge>
             Cart
        </div>     
    </div>


</div>
<div className='overwiew77878778'>
    <div className="Orders"><h1>Orders</h1><Link to='/Swiftcart/Accounts/Orders' className="Link">See Everything <BsChevronRight /></Link></div>
    <div className="items">
   
        <div className="item" onClick={()=>{navigate('/Swiftcart/Accounts/Orders?tab=1')}}>
            <Badge color="green" count={orders.filter(order=>order.status=='Pending').length} >
            <img src={image_En_attente_de_shipment} alt='Waiting for evaluation'/>
            <h3>Pending</h3>
            </Badge>
        </div>
        <div className="item" onClick={()=>{navigate('/Swiftcart/Accounts/Orders?tab=3')}}>
            <Badge color="green" count={orders.filter(order=>order.status=='On_delivery').length} >
            <img src={Shipped} alt='Waiting for shipment'/>
            <h3>On delivery</h3>
            </Badge>
        </div>
        <div className="item">
       < Badge color="green" count={orders.filter(order=>order.status=='Delivered').length} onClick={()=>{navigate('/Swiftcart/Accounts/Orders?tab=4')}} >
        <img src={image_Waiting_for_evaluation} alt='Waiting for evaluation'/></Badge> 
            <h3>Waiting for evaluation</h3>
        </div>
        <div className="item" onClick={()=>{navigate('/Swiftcart/Accounts/Orders?tab=5')}}>
       < Badge color="red"count={orders.filter(order=>order.status=='Canceled').length}  >
        <img src={rejected} alt='Waiting for evaluation'/></Badge> 
            <h3>
                Rejected
            </h3>
        </div>
        
       

    </div>
    {orders.length>0?<div className="Ordersdetails">
        <Galleria value={orders}  
        autoPlay transitionInterval={2000}
                className='Galleria'   showThumbnails={false} showItemNavigators circular item={orderTemplate}  />
    </div>:
    <div className="noproducts48948978487"  style={{flexDirection:'column'}}>
    <img src={no_oreder} alt="no-orders" />
    <h1 style={{marginTop:'2em',fontSize:'1em'}}>No orders yet</h1>
    </div>}
</div>
<div className="overwiew7787">
<RecentlyViewedArticles style={{margin:'0',fontSize:'0.7em'}} />
</div>
</>
  )
}

export default Overview