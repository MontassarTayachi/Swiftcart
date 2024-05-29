import React,{useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';
import { CgClose } from "react-icons/cg";
import { MdReportGmailerrorred } from "react-icons/md";
import {  CircularProgress, TextField } from '@mui/material'; 
import { AiOutlineClose } from "react-icons/ai"; 
import {API_BASE_URL} from '../../../../../../config';
function Describe_your_store({onClose,store}) {
    const [description, setDescription] = React.useState(store.description);
    const [storedescriptionError, setStoreEmailError] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const validate = () => {
        let isValid = true;
        if (!description) {
            setStoreEmailError('Store description is required');
            isValid = false;
        } else {
            setStoreEmailError('');
        }
        return isValid;
    }
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
      if (description !== store.description) {
        setOpen(true);
      }
      else{
        setOpen(false);
      }
    }, [description]);
    const saveChanges = async () => {
        if (!validate()) {
          return; 
          }
          setLoading(true);
        try {
          const formdata=new FormData();
          formdata.append('description',description);
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
          <h5>Tell your customers about your store. This description will appear on your website.</h5>
            <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            error={storedescriptionError.trim() ? true : false}
            helperText={storedescriptionError}
            variant="outlined"
            sx={{width:'100%'}}
            />
         <div className="button"> <button onClick={()=>{onClose()}} className='Cancel'>Cancel</button> {open ? <button className='save' onClick={saveChanges}>Save Changes</button>:<button className='save' style={{cursor:'not-allowed',background:'#d6d6d683',border:'none'}}>Save Changes</button>}</div>
       
        </div>
      </div>
    </Backdrop>
    </>
  )
}

export default Describe_your_store