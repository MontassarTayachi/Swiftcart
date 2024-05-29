import React from 'react';
import './Style/Five.css';
import { IoIosArrowBack } from "react-icons/io"; 
import { GrFormNext } from 'react-icons/gr';
import{API_BASE_URL} from "../../../config"
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { AiOutlineClose } from "react-icons/ai"; 
import {useUser} from '../../../Context/UserProvider'
function Stepfive({openPage4,Storecategory,Storename,paymentMethod,businesneeds}) {
 const { userInfo, setUserInfo } = useUser();
 const navigate=useNavigate();
 const[error,setError]=React.useState('');
 const [open, setOpen] = React.useState(false);
  const handSave = async () => {
    setOpen(true);
    try {
      const reponse= await (await fetch(API_BASE_URL + "/stores", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          name: Storename,
          category_id: Storecategory.id,
          payment_on_delivery: paymentMethod.delivery,
          payment_online: paymentMethod.onlinePayment,
          payment_with_cash: paymentMethod.cash, 
          payment_with_bank_transfer : paymentMethod.bankTransfer,
          has_local : businesneeds==='true'?true:false,
          email: userInfo.email
        }),
      })).json();
      if (reponse.success) {
       localStorage.setItem('store', JSON.stringify(reponse.inserted_store));
       navigate(`/swiftcart/Dashboard/`);
       setOpen(false);    
      }
      else { 
        setError(reponse.message);
       }
    } catch (error) {
      console.log(error);
      setError('An error occured, please try again later');    
    }
    setOpen(false);
  }

  return (
 <>   
 <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop> 
 
 <div className='five'>
{!error.trim()&& <div className='header'>    
   <h1>Confirmation of the creation of your store:</h1>
   <h2>These details may be changed later after confirmation. Once your store is created, you will be able to update this information at any time from your dashboard.</h2>
 </div>}
 <div className='main'>
    {error.trim() &&
    <div className='error'>
      <button onClick={()=>setError('')}><AiOutlineClose /></button>
      
      <p>
      {error}
      </p>
    </div>

    }
          
 </div>
 <div className='footer'>
   <button onClick={openPage4} className="back"><IoIosArrowBack className="IoIosArrowBack"/>Back</button>
   <div className='ss'>
   {error.trim()?
   <button className='next' onClick={()=>{navigate('/swiftcart/MyStores')}}>  
  Cancel <GrFormNext className="GrFormNext" />
</button>
:   <button className='next' onClick={handSave}>  
       Save<GrFormNext className="GrFormNext" />
   </button>}
   </div>
 </div>
</div></>
  )
}

export default Stepfive