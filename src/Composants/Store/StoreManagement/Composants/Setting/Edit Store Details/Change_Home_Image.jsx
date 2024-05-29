import React,{useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';
import { CgClose } from "react-icons/cg";
import { MdReportGmailerrorred } from "react-icons/md";
import {  CircularProgress, TextField } from '@mui/material'; 
import { AiOutlineClose } from "react-icons/ai"; 
import {API_BASE_URL} from '../../../../../../config';
function Change_Home_Image({onClose,store}) {
    const [cover_image, setCover_image] = React.useState(store.cover_image);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
      if (cover_image !== store.cover_image) {
        setOpen(true);
      }
      else{
        setOpen(false);
      }
    }, [cover_image]);
    const saveChanges = async (e) => {
       e.preventDefault();
          setLoading(true);
        try {
          const formdata=new FormData();
          formdata.append('store_cover',cover_image);
          const reponce = await fetch(`${API_BASE_URL}/stores?id=${JSON.parse(localStorage.getItem('store')).id}`, {
            method: 'PUT',
            headers: {
              'contentType': 'multipart/form-data',
              'Authorization': `${localStorage.getItem('token')}`
            },
            body: formdata
          });
         const res= await reponce.json();
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
        <div className='EditProfile'>
        <div className='header'>
          <h1>Describe your store</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
        {error.trim() && <div className="erreur">
        <button onClick={()=>setError('')}><AiOutlineClose /></button> 
            <p><MdReportGmailerrorred />{error}</p>
          </div> }
          <h5>Tell your customers about your store. This cover_image will appear on your website.</h5>
            <img
            
            style={{width:'100%',aspectRatio:'4269/1406'}}
            src={cover_image === store.cover_image ? cover_image :URL.createObjectURL(cover_image) } alt='store cover_image'/>
            <input type="file" id="file" name="file" 
            accept='image/*'
            style={{display:'none'  } }

            onChange={(e)=>{setCover_image(e.target.files[0])}}/>
            <label
            style={{cursor:'pointer',
            color:'#fff',
            background:'#ff9900',
            padding:'10px',
            borderRadius:'5px',
            marginTop:'10px',
            }}
            htmlFor="file" className='upload'>Upload Image</label>


         <div className="button"> <button onClick={()=>{onClose()}} className='Cancel'>Cancel</button> {open ? <button className='save' onClick={saveChanges}>Save Changes</button>:<button className='save' style={{cursor:'not-allowed',background:'#d6d6d683',border:'none'}}>Save Changes</button>}</div>
       
        </div>
      </div>
    </Backdrop>
    </>
  )
}

export default Change_Home_Image