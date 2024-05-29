import { AiOutlineClose } from "react-icons/ai"; 
import React, { useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop';
import { CgClose } from "react-icons/cg";
import {  CircularProgress} from '@mui/material'; 
import profile from '../../../../../../assets/images/profile.png';
import { MdReportGmailerrorred } from "react-icons/md";
import{API_BASE_URL}from '../../../../../../config'
import './Style/EditImage.css';
function EditImage({onClose,profile_image}) {
    const fileInputRef = React.useRef(null);
    const [image, setImage] = React.useState(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
      };   
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState('');
const [open, setOpen] = React.useState(false);

useEffect(() => {
  if (image ) {
    setOpen(true);
  }
  else{
    setOpen(false);
  }
}, [image]);

const  handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
   
    try {
      const formdata=new FormData();
      formdata.append('store_profile', image);

      const reponce = await fetch(`${API_BASE_URL}/stores?id=${JSON.parse(localStorage.getItem('store')).id}`, {
        method: 'PUT',
        headers: {
          'contentType': 'multipart/form-data',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: formdata
      });
     const res= await reponce.json();
     console.log(res);
      if (res.success) {
        setLoading(false);
        localStorage.setItem('store',JSON.stringify(res.updated_stores[0]));
        onClose();
      }
      else {
        setLoading(false);
        console.log(res);
        // setError(res.message);
        // throw new Error();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    }

  return (
    <>
     {loading && <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}>
        <CircularProgress color="inherit" />
      </Backdrop>}
    <Backdrop open={true}sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div className='EditImage'>
        <div className='header'>
          <h1>Edit your image store</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
        {error.trim() && <div className="erreur">
          <button onClick={()=>setError('')}><AiOutlineClose /></button> 
            <p><MdReportGmailerrorred />{error}</p>
          </div> }
           <div className="image-container">
            <img  src={image ? URL.createObjectURL(image) : profile_image || profile} alt="cover" />
            
            <button onClick={handleButtonClick}>Upload image</button>
            <input
              id="jnxjsnjxn"
              accept="image/*"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
              }}
              ref={fileInputRef}
              style={{display:'none'}}
            />
            
          </div> 
          <h6>HEIC, WEBP, SVG, PNG, or JPG. Minimum 512x512 pixels recommended.</h6>  
    
          <div className="button"> <button className="Cancel" onClick={onClose}>Cancel</button> {open ? <button onClick={handleSave}>Save Changes</button>:<button style={{cursor:'not-allowed',background:'#d6d6d683',border:'none'}}>Save Changes</button>}</div>
       
        </div>
      </div>
    </Backdrop>
    </>
  )
}

export default EditImage;