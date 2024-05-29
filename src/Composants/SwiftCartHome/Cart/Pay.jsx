import { AiOutlineRight } from "react-icons/ai"; 
import { IoMdClose } from "react-icons/io"; 
import React from 'react';
import { useUser } from '../../../Context/UserProvider';
import './Pay.css';
import { MuiTelInput } from 'mui-tel-input';
import TextField from '@mui/material/TextField';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { Backdrop } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config";
function Pay({setOpen,store,totalPrice}) {
  const { userInfo } = useUser();
  const [formData, setFormData] = React.useState({
    email: userInfo.email,
    phone: '',
    address: '',
    message: ''
  });
  const [error, setError] = React.useState({
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const[openProgress,setOpenProgress]=React.useState(false)
  const validate = () => {
    let isValid = true;
    let errors = { email: '', phone: '', address: '', message: '' };

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = 'Phone is required';
      isValid = false;
    } else if (!isValidPhoneNumber(formData.phone)) {
      errors.phone = 'Invalid phone number';
      isValid = false;
    }

    if (!formData.address) {
      errors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.message) {
      errors.message = 'Message is required';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };
  const[status,setStatus]=React.useState('Form')
 
  const paymentOnline=async()=>{
  
    const cart_items=[]

      store.cart_items.forEach(cart_item => {
        cart_items.push(cart_item)
      });
    try {
      setOpenProgress(true)
      const cart_items_ids=[]
      store.cart_items.forEach(cart_item => {
        cart_items_ids.push(cart_item.id)
      });
      const respance=  await fetch(`${API_BASE_URL}/orders?store_id=${store.id}&cart_items_ids=`+cart_items_ids.join(','), {
        method: 'POST',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
         
        },  
        body: JSON.stringify(
          {
            phone_number:formData.phone,
            email:formData.email,
            address:formData.address,
            message:formData.message,
            payment_method:'FLOUCI',
            order_items:cart_items, 
            totalPrice:totalPrice,
          }
        )
      
      });
      const repanse=await respance.json();
      console.log(repanse)
      if(repanse.result.success){
       window.location.href=repanse.result.link
      }
      else{
        throw new Error(repanse.message) 
      }
    } catch (error) {
      console.log(error)
      // setStatus('Error')
      
    }
    setOpenProgress(false)
  }
  const payonDelivery=async()=>{
    try {
      const cart_items_ids=[]

      store.cart_items.forEach(cart_item => {
        cart_items_ids.push(cart_item)
      });
      setOpenProgress(true)
      const respance=  await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
         
        },  
        body: JSON.stringify(
          {
            phone_number:formData.phone,
            email:formData.email,
            address:formData.address,
            message:formData.message,
            payment_method:'ON DELIVERY',
            order_items:cart_items_ids
           
          }
        )
      
      });
      const repanse=await respance.json();
      if(repanse.success){
       console.log(repanse)
        setStatus('Success')
      }
      else{
        throw new Error(repanse.message) 
      }
    } catch (error) {
      setStatus('Error')
      
    }
    setOpenProgress(false)
  }

  return (
    <>
   {openProgress&& <Backdrop open={true} style={{zIndex: 1002}} >
    <CircularProgress color="inherit" />
    </Backdrop>}

    <div className='ssmsoa578'>
      <div className='pay1898'>
      <div className="navsssssss"> <h1 style={{opacity:`${status==='Form' ? '1':'0'}`}}>Confirmation</h1>
        <button onClick={()=>setOpen('')}><IoMdClose /></button>
        </div>
     {status==='Form'&&  <>
      
        <h2>You are logged in as {userInfo.first_name}</h2>

        <p>Fill the form below to complete your order</p>
        
          <label>Put your Mail here </label>
        <TextField
          required={false}
          error={!!error.email}
          helperText={error.email}
          name='email'
          value={formData.email}
          onChange={handleChange}
          fullWidth
          placeholder='Put your email'
          variant="outlined"
          type='email'
        />
        <label>Put your phone here </label>
        <MuiTelInput
          error={!!error.phone}
          helperText={error.phone}
          name='phone'
          value={formData.phone}
          onChange={
            (value) => {
              setFormData(prevState => ({
                ...prevState,
                phone: value
              }));
            }
          }
          defaultCountry='TN'
          fullWidth
          placeholder='Put your phone'
        />
        <label>Put your address here </label>
        <TextField
          error={!!error.address}
          helperText={error.address}
          variant="outlined"
          name='address'
          value={formData.address}
          onChange={handleChange}
          fullWidth
          placeholder='Put your address'
        />
        <label>Put your message here </label>
        <TextField
          error={!!error.message}
          helperText={error.message}
          multiline
          variant="outlined"
          name='message'
          value={formData.message}
          onChange={handleChange}
          fullWidth
          placeholder='Put your message'
          rows={3}
         
        />

       <div className="button"><button className='next' onClick={()=>{
        if(!validate())return;
        setStatus('paymentMethod')}}
        >Next</button></div>
      </>}
      {status==='paymentMethod'&&<div className="paymentMethod487481554547">
        <h1>Choose your payment method</h1>
        <div className="items">
            
          {  store?.payment_on_delivery&&<div  onClick={()=>{payonDelivery()}}className="item">
                <h3>Pay on delivery</h3>
                <AiOutlineRight />
            </div>}

             {store?.payment_online&&<div className="item" onClick={()=>{paymentOnline()}}>
              <h3>Pay With Flouci</h3>
              <AiOutlineRight />
             </div>}
             {
              !store?.payment_online&&!store?.payment_on_delivery&&
              <div className="nopayment">
                <h3>There is no payment method available</h3>
                <a href={`/Swiftcart/StorePage/${store?.id}/contact`} target="_blank" rel="noreferrer" >Go to Contact us to ask for more information</a>
              </div>
             }
 
        </div>
      <button className='back' onClick={()=>setStatus('Form')} >Go Back</button>
      </div>
      
    
        }
      {status==='Success'&&<div className="success">
        <h1>Order successfully registered</h1>
        <p>
        We are pleased to inform you that your order has been successfully
        registered in our system. At this time, we are awaiting confirmation from the relevant stores
        to proceed with the preparation of your selected items. This step is crucial to ensure that all 
        products meet our quality standards before being shipped to you.
        We will keep you informed</p>
        <Link to='/Swiftcart'><button>Back to Home</button></Link>
        </div>}
      {status==='Error'&&<div className="error"><h1>Something went wrong. Please try again later</h1>
      <p>
      We are currently experiencing technical difficulties. Please try again later. Thank you for your understanding.
      </p>
      <button onClick={()=>setStatus('Form')}>Try again</button>
      </div>}
       </div>
    </div>
    </>
  );
}

export default Pay;
