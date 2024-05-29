import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import React from 'react'
import { API_BASE_URL } from '../../../config';
import See from './See';
import './Orders.css';
function Orders() {
    const [orders, setOrders] = React.useState([]);
     const params = new URLSearchParams(window.location.search);

    const tab=params.get('tab') ? Number(params.get('tab')) : 0;

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

         const CalculeAmount = (orders) => {
            let amount = 0;
            orders.forEach(order => {
                if (order.payment_method === 'en_deliver'&&order.status!=='Canceled')
                         amount +=order.product_delivery_price+order.product_price*order.quantity ;
            });
            return amount;
        };       
                
  return (
   <>
        <div className='orders97984'>
            <h1 className='orders'>Orders</h1>
            <div className='items'>
            <div className='item'>
                <h3>Total orders</h3>
                <p>{orders.length} Items</p>
            </div>
              
            <div className='item'>
                <h3>Pending</h3>
                <p>{orders.filter(order => order.status === 'Pending').length} Items</p>
            </div>
            <div className='item'>
                <h3>On shipping</h3>
                <p>{orders.filter(order => order.status === 'On_delivery').length} Items</p>
            </div>         
            <div className='item'>
                <h3>Amount to be paid</h3>
                <p>{CalculeAmount(orders)} TND</p>
            </div>   
            </div>              
        </div>             
    
        <div id='orders' className='orders24984894'>   
        <Tabs  style={{background:'transparent', color: 'white'}} defaultValue={tab}>
            <TabList>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600',textAlign:'center'}}>See all</b></Tab>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600',textAlign:'center'}}>Pending</b></Tab>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600',textAlign:'center'}}>Accepted</b></Tab>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600',textAlign:'center'}}>On delivery</b></Tab>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600',textAlign:'center'}}>Waiting for evaluation</b></Tab>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600',textAlign:'center'}}>Rejected</b></Tab>
            </TabList>
            <TabPanel className='ActiveStores' value={0}>
                <See orders={orders.filter(order => order.status !== 'Canceled')} />
            </TabPanel>
            <TabPanel className='ActiveStores' value={1}>
                 <See orders={orders.filter(order => order.status == 'Pending') }/>
            </TabPanel>
            <TabPanel className='ActiveStores' value={2}>
                <See orders={orders.filter(order => order.status == 'Accepted') } />
            </TabPanel>
            <TabPanel className='ActiveStores' value={3}>
                <See orders={orders.filter(order=>order.status=='On_delivery')} />
            </TabPanel>
            <TabPanel className='ActiveStores' value={4}>
                <See orders={orders.filter(order=>order.status=='Delivered')} />
            </TabPanel>            
            <TabPanel className='ActiveStores' value={5}>
                <See orders={orders.filter(order=>order.status=='Canceled')} />
            </TabPanel>
           </Tabs>  
        </div>
    </>
  )
}

export default Orders