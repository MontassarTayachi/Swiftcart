import { GrValidate } from "react-icons/gr"; 
import React, { useEffect } from 'react';
import { API_BASE_URL } from '../../../config';
import "./Success.css";
import { Link } from "react-router-dom";
function Success() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const address = params.get('address');
        const phone_number = params.get('phone_number');
        const email = params.get('email');
        const message = params.get('message');
        const app_token = params.get('app_token');
        const app_secret = params.get('app_secret');
        const cart_items_ids = params.get('cart_items_ids');
        const payment_id = params.get('payment_id');
        const cartItemsIdsArray = cart_items_ids ? cart_items_ids.split(',').map(item => parseInt(item.trim(), 10)) : [];
        const paymentOnline = async () => {
            try {
                const response=  await fetch(`${API_BASE_URL}/payment/verify?payment_id=${payment_id}&app_token=${app_token}&app_secret=${app_secret}&cart_items_ids=${cartItemsIdsArray.join(',')}
                &address=${address}&phone_number=${phone_number}&email=${email}&message=${message}
                `, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                });
                const responseData = await response.json();
              if(responseData.success){
                console.log("Payment Success");
                }
                else{
                   window.location.href = '/payment/fail';
                }
            } catch (error) {
                console.log(error);
            }
        };
        paymentOnline();

    }, []);

    return (
        <div className="succespayment">
            <GrValidate className="icon" />
            <h1>Payment Success</h1>
            <Link className="link" to="/Swiftcart">Back to Home</Link>
        </div>
    );
}

export default Success;
