import { BsCardImage } from "react-icons/bs"; 
import { MdOutlineDescription } from "react-icons/md"; 
import { SiZcash } from "react-icons/si"; 
import { AiFillCaretDown } from "react-icons/ai"; 
import { MdPayment } from "react-icons/md"; 
import { AiFillCaretRight } from "react-icons/ai"; 
import { FaMapMarkerAlt } from "react-icons/fa"; 
import { HiOutlinePencil } from "react-icons/hi"; 
import { MdModeEdit } from "react-icons/md"; 
import { AiOutlineMail } from "react-icons/ai"; 
import { BsTelephone } from "react-icons/bs";  
import { MdOutlineStorefront } from "react-icons/md";
import Rating from '@mui/material/Rating'; 
import React from 'react';
import './Setting.css';
import EditProfile from "./edit/EditProfile";
import EditImage from "./edit/EditImage";
import Address_Setting from "./Address/Address_Setting";
import { Alert, Snackbar, Switch } from "@mui/material";
import { API_BASE_URL } from "../../../../../config";
import FlouciAccount from "./FlouciAcount/FlouciAccount";
import Describe_your_store from "./Edit Store Details/Describe_your_store";
import Change_Home_Image from "./Edit Store Details/Change_Home_Image";
const Setting = () => {
    const store=JSON.parse(localStorage.getItem('store'));
    const[EditOpen,setEditOpen]=React.useState('');
    const[payment_on_delivery,setPayment_on_delivery]=React.useState(store.payment_on_delivery);
    const[payment_online,setPayment_online]=React.useState(store.payment_online);
    const changePayment=async (e,payment)=>{
        const formData = new FormData();
        if (payment === 'payment_online')
        if(store.flouci_app_id!==null || store.flouci_public_token!==null||store.flouci_private_token!==null)
        formData.append('payment_online', e.target.checked);
        else{
            setEditOpen('error');
            return;
        }
        else
        formData.append('payment_on_delivery', e.target.checked);
        try {
            const respance=await fetch(`${API_BASE_URL}/stores?id=${store.id}`,{
                method: 'PUT',
                    headers: {
                      'contentType': 'multipart/form-data',
                      'Authorization': `${localStorage.getItem('token')}`
                    },
                    body: formData
              });
                const data=await respance.json();
                console.log(data);
                if(data.success){
                    setPayment_on_delivery(data.updated_stores[0].payment_on_delivery);
                    setPayment_online(data.updated_stores[0].payment_online);
                  localStorage.setItem('store',JSON.stringify(data.updated_stores[0]));
                }
                else{
                    throw new Error(data.message);
                }
        } catch (error) {
            console.log(error);
            
        }
    
    }
    return (
        <>
        {EditOpen==='error'&&
         <Snackbar
                
         open={true}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         autoHideDuration={10000}
         onClose={() => setEditOpen('')}
     >
          <Alert
             onClose={() => setEditOpen('')}
             severity="warning"
             variant="filled"
             sx={{ width: '100%' }}>
          {`You must set your flouci account before enabling this payment method`} 
         </Alert>
        </Snackbar>}
        {EditOpen==='Change_Home_Image' && <Change_Home_Image store={store} onClose={()=>{setEditOpen('')}}/>}
        {EditOpen==='Describe_your_store' && <Describe_your_store store={store} onClose={()=>{setEditOpen('')}}/>}
        {EditOpen==='EditImage' && <EditImage profile_image={store.profile_image}  onClose={()=>{setEditOpen('')}}/>}
        {EditOpen==='EditProfile' && <EditProfile store={store} onClose={()=>{setEditOpen('')}}/>}
        {EditOpen==='Address_Setting' && <Address_Setting store={store} onClose={()=>{setEditOpen('')}}/>}
        {EditOpen==='Paymentflouci' && <FlouciAccount onClose={()=>{setEditOpen('')}}/>}
        <div className='setting'>
            <div className='setting-title '><h2>Store details</h2></div>
            <div className='setting-content'>
            <div className="settingimage">
                <div className="storeimage"> <img  src={store.profile_image} alt="Store image"></img> <button onClick={()=>{setEditOpen('EditImage')}}><HiOutlinePencil /></button></div> 
                <div className="titre"><h1>{store.name}</h1> <Rating name="read-only" style={{fontSize:'1em'}} value={store.rating} readOnly /></div>
            </div>
                <div className='Profile'>
                    <div className="ProfileHeader"><h2>Profile</h2><button onClick={()=>{setEditOpen('EditProfile')}}><MdModeEdit /></button></div>
                    <div className="storename">
                     <div>  <MdOutlineStorefront className="uhucuchzeiuceiu"/></div>
                        <div>
                            <h2>
                            Store name
                            </h2>
                            <h1>{store.name}</h1>
                        </div>
                    </div>
                    <div className="storename">
                       <div> <BsTelephone className="uhucuchzeiuceiu" /></div>
                        <div>
                            <h2>
                            Store phone
                            </h2>
                            <h1>{store.phone || 'no phone'} </h1>
                        </div>
                    </div>
                    <div style={{border:'none'}} className="storename">
                        <div><AiOutlineMail className="uhucuchzeiuceiu" /> </div>
                        <div>
                            <h2>
                            Store Email
                            </h2>
                            <h1>{store.email} </h1>
                        </div>
                    </div>
                </div>
         <div className='Autofile'>
                <div className="ProfileHeader"><h2>Autofile</h2></div>
                <div style={{width:'100%',padding:"0.5em 2em"}}>
                <div onClick={()=>setEditOpen('Address_Setting')} className="parmetre">
                   <div ><FaMapMarkerAlt /> Address and More </div> <AiFillCaretRight /> 
                </div>
                { EditOpen!=='Payment' ? 
                <div onClick={()=>setEditOpen('Payment')} className="parmetre">
                   <div><MdPayment />Payment Setting </div> <AiFillCaretRight />
                </div>:
                <div onClick={()=>setEditOpen('')} className="parmetre">
                   <div><MdPayment />Payment Setting </div>  <AiFillCaretDown />
                </div>}
                { EditOpen==='Payment'&&
                <div className="payment">
                    <div className="item"> <span> Payment on delivery</span> <Switch onChange={(e)=>changePayment(e,'payment_on_delivery')}inputProps={{ 'aria-label': 'controlled' }}  checked={payment_on_delivery} /></div>
                    <div className="item"> <span> Payment with Flouci </span> <Switch onChange={(e)=>changePayment(e,'payment_online')} inputProps={{ 'aria-label': 'controlled' }}  checked={payment_online}/></div> </div>}
                    
                    <div onClick={()=>setEditOpen('Paymentflouci')} className="parmetre">
                   <div ><SiZcash /> Payment flouci </div> <AiFillCaretRight /> 
                </div>
                </div>
               
                
         </div>
         <div className='Autofile'>
                <div className="ProfileHeader"><h2>Edit Store Details</h2></div>
                <div style={{width:'100%',padding:"0.5em 2em"}}>
                <div onClick={()=>setEditOpen('Describe_your_store')} className="parmetre">
                   <div ><MdOutlineDescription /> Describe your store</div> <AiFillCaretRight /> 
                </div>
                <div onClick={()=>setEditOpen('Change_Home_Image')} className="parmetre">
                   <div ><BsCardImage /> Change Home Image</div> <AiFillCaretRight /> 
                </div>
                </div>
              
                
         </div>

            </div>
        </div>
        </>
    );
};

export default Setting;
