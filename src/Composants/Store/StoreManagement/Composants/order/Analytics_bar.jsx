import React from 'react'
import './Analytics_bar.css'
import { LinearProgress } from '@mui/material'
import { API_BASE_URL } from '../../../../../config';
function Analytics_bar(open) {
    const [ Analytics_bar, setAnalytics_bar] = React.useState([]);
    const [TotalOrders, setTotalOrders] = React.useState(0);
    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch(`${API_BASE_URL}/orders/store/order_Analytics_bar?store_id=${JSON.parse(localStorage.getItem('store')).id}`,
            {method: 'GET',
             headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
                },
                });
            const data = await response.json();
            if(data.success){
                setAnalytics_bar(data.result);
                setTotalOrders(data.result.allOrers);
            }  
             else{
             
            throw new Error(data.message);
             }
        
            } catch (error) {
             console.log( error.message);
             setAnalytics_bar([]);
            }
            };
            fetchProducts();
        }, [open]);
  return (
    <div className='order_Analytics_bar'>
        <div className='item'>
            <div className='sss'>
            <h1>Total Order</h1>
           <div className='ss'>
            <h2>{Analytics_bar?.allOrers}</h2>
            <LinearProgress  className='LinearProgress' variant="determinate" value={100} />
           </div>
            </div>
           
        </div>
        
        <div  className='item'>
        <div className='sss'>
            <h1>Order Completed</h1>
           <div  className='ss'>
            <h2>{Analytics_bar?.Order_Completed_count}</h2>
            <LinearProgress className='LinearProgress' variant="determinate" value={(Analytics_bar?.Order_Completed_count/TotalOrders)*100} />
           </div>
            </div>
        </div>
         
        <div  className='item'>
        <div className='sss'>
            <h1>Order Pending</h1>
           <div  className='ss'>
            <h2>{Analytics_bar?.Order_Pending_count}</h2>
            <LinearProgress className='LinearProgress' variant="determinate"value={(Analytics_bar?.Order_Pending_count/TotalOrders)*100} />
           </div>
            </div>
        </div>
        <div  className='item'>
        <div className='sss'>
            <h1>Payment With flouci</h1>
           <div  className='ss'>
            <h2>{Analytics_bar?.payment_flouci}</h2>
            <LinearProgress className='LinearProgress' variant="determinate" value={(Analytics_bar?.payment_flouci/TotalOrders)*100} />
           </div>
            </div>
        </div>   
        <div  className='item'>
        <div className='sss'>
            <h1>Payment on delivrey</h1>
           <div  className='ss'>
            <h2>{Analytics_bar?.payment_cash}</h2>
            <LinearProgress className='LinearProgress' variant="determinate" value={(Analytics_bar?.payment_cash/TotalOrders)*100} />
           </div>
            </div>
        </div>     

        <div  className='item'>
        <div className='sss'>
            <h1>Order Processing</h1>
           <div  className='ss'>
            <h2>{Analytics_bar?.OrderProcessing}</h2>
            <LinearProgress className='LinearProgress' variant="determinate" value={(Analytics_bar?.OrderProcessing/TotalOrders)*100} />
           </div>
            </div>
        </div> 
        
                           
    </div>
  )
}

export default Analytics_bar