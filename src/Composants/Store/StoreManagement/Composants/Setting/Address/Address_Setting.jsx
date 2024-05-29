import { CgClose } from "react-icons/cg"; 
import React from 'react'
import { Backdrop, TextField } from "@mui/material";
import './Address_Setting.css'
import Put_addrees_to_map from "./Put_addrees_to_map";
import { API_BASE_URL } from "../../../../../../config";
function Address_Setting({onClose,store}) {
  const [openMap,setOpenMap]=React.useState(false);
  const [error_address,setError_address]=React.useState(false);
  const [error_city,setError_city]=React.useState(false);
  const [error_postal_code,setError_postal_code]=React.useState(false);
  const [error,setError]=React.useState('');
  const[formData,setFormData]=React.useState({
    address:store.address||'',
    city:store.city||'',
    postal_code:store.postal_code||'',
    appartement:store.appartement||'',
    longitude: store.longitude||null,
    latitude:store.latitude||null
  })
  const Validate=()=>{
    const isValid= formData.address!=='' && formData.city!=='' && formData.postal_code!=='';
    if(formData.address===''){
      setError_address(true)
    }
    else{
      setError_address(false)
    }
    if(formData.city===''){
      setError_city(true)
    }
    else{
      setError_city(false)
    }
    if(formData.postal_code===''){
      setError_postal_code(true)
    }
    else{
      setError_postal_code(false)
    }
    return isValid;
  }
  const SaveChanges=async ()=>{
    if(!Validate()){
     return;
    }
    try {
      const data=new FormData();
      data.append('address',formData.address);
      data.append('city',formData.city);
      data.append('postal_code',formData.postal_code);
      data.append('appartement',formData.appartement);
      data.append('longitude',formData.longitude);
      data.append('latitude',formData.latitude);
      const respanse= await fetch(`${API_BASE_URL}/stores?id=${store.id}`,
      {
        method:'PUT',
        headers:{
          'contentType': 'multipart/form-data',
          'Authorization':`${localStorage.getItem('token')}`
        },
        body:data
      })
      const res= await respanse.json();
      console.log(res)
      if(res.success){
        localStorage.setItem('store',JSON.stringify(res.updated_stores[0]));
        onClose();
      }
      else{ 
        throw new Error(res.message || 'An error occurred while updating store information.');
     
      }

    } catch (error) {setError(error.message || 'An error occurred. Please try again later.');}
    }
  return (
   
   <Backdrop open={true} style={{zIndex:1000}}>
     <div className='Setting_address'>
        <div className='header'>
            <h2>Address and More</h2>
            <button onClick={onClose}><CgClose /></button>
        </div>
        <div className='content'>
        <p>Please enter the address details of your store below. If you're unsure about any field, hover over the question mark for more information.</p>
        
            <div className='parmetre'>
                 <h3>Address</h3>
                 <TextField value={formData.address} required={true} onChange={(e)=>setFormData({...formData,address:e.target.value})}  placeholder="1234 Main St"
              error={error_address}
              helperText={error_address?
                "The street address of your store is required."
              :"The street address of your store."} className='input' variant="outlined" />
            </div>
           
            <div className='parmetre'>
             <h3>Apartment, suite, etc.</h3> 
                <TextField value={formData.appartement} required={false}
                helperText={"Additional details like apartment number, suite, etc."}
                onChange={(e)=> {setFormData({...formData,appartement:e.target.value})}} placeholder="Apartment, suite, etc. (optional)"
                className="input" variant="outlined"  />
           
            </div>
            <div className="liopk">
           <div className='parmetre margin'>
                <h3>City </h3>
                <TextField required={true} value={formData.city} onChange={(e)=> {setFormData({...formData,city:e.target.value})} }  placeholder="Anytown"
                error={error_city}
                helperText={error_city?
                  "The city where your store is located is required."
                :"The city where your store is located."} className="input"  variant="outlined"  />
            </div>
            <div style={{width:'1em'}}></div>
            <div className='parmetre margin'>
                <h3>Postal code</h3>
                <TextField  placeholder="7030"
                required={true} value={formData.postal_code} onChange={(e)=> {setFormData({...formData,postal_code:e.target.value})} }
                error={error_postal_code}
                helperText={error_postal_code?
                  "The postal code of your store is required."
                :"The postal code of your store."}
                className="input"  variant="outlined"  />
            </div>
            </div>
            <div className="mapp"> 
            <h6 >Add an address to the map  {openMap ? <p style={{color:'red'}}onClick={()=>setOpenMap(false)}>  (Click here to close the map)</p> :<p style={{color:'green'}} onClick={()=>setOpenMap(true)}> (Click here to open the map)</p>}</h6>
           {openMap && 
           <Put_addrees_to_map formData={formData} setFormData={setFormData}/>
           } 

            </div>
          </div>
           {
              formData.latitude && formData.longitude &&
              <div className='map0245894'>
            <h3>Position on the map</h3>
           <p>{formData.latitude } | {formData.longitude}</p> 
           <button onClick={()=>{setFormData({...formData,latitude:null,longitude:null})}}>Delete</button>
           </div>
           }

          <div className="button"> <button onClick={()=>{onClose()}} className='Cancel'>Cancel</button> <button className='save'  onClick={SaveChanges}>Save Changes</button></div>
       
           {
              error && <div style={{padding:'0.2em 1em'}}><p style={{color:'red',fontWeight:'500'}}>{error}</p></div>
           }
    </div>
    </Backdrop>
  )
}

export default Address_Setting