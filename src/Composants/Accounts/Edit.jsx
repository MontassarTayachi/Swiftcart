import { MdReportGmailerrorred } from "react-icons/md"; 
import { AiOutlineCamera } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react';
import { CgClose } from "react-icons/cg";
import Backdrop from '@mui/material/Backdrop';
import { Input, TextField } from '@mui/material';
import {API_BASE_URL} from '../../config';
import './Style/EditName.css';
import profile from '../../assets/images/profile.png';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from 'react-bootstrap/Alert';
function Edit({ open1,open2,open3,onClose,Email,LastName,FirstName,open4,image }) {
  const [firstNameChange, setFirstNameChange] = useState(FirstName);
  const [lastNameChange, setLastNameChange] = useState(LastName);
  const [emailChange, setEmailChange] = useState(Email);
  const [imageChange,setImageChange] = useState(null);
  const [imageper,setimageper] = useState(null);
  const[error,setError] = useState('');
  
  const [openCircularProgress, setOpenCircularProgress] = useState(false);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);

  const token = localStorage.getItem('token');
  const fileInputRef = React.useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  const handFirstNameChange = (e) => {setFirstNameChange(e.target.value);};
  const handLastNameChange = (e) => {setLastNameChange(e.target.value);};
  const handEmailChange = (e) => {setEmailChange(e.target.value);};
 
  const[openbutton,setOpenButton]=useState(false);

  const handleImageChange = (e) => {
  
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setImageChange(file);
      setimageper(newImageURL); 

    }
  };
 
  const controleButton = () => {
    const changesMade = firstNameChange !== FirstName || lastNameChange !== LastName || emailChange !== Email || imageChange !== null;
    setOpenButton(changesMade);
  };
  useEffect(()=>{
    setFirstNameChange(FirstName);
    setLastNameChange(LastName);
    setEmailChange(Email);
  },[FirstName,LastName,Email])

  useEffect(()=>{
   
    controleButton(); 
    },[firstNameChange,lastNameChange,emailChange,imageChange] );


const handleSaveImage = () => {
  const formData = new FormData();
  setOpenCircularProgress(true);
  formData.append('user_image', imageChange);
  fetch(API_BASE_URL+'/credentials/change_user_image', {
    method: 'PUT',
    headers: {'Authorization': `${token}`},
    body: formData
  })
  .then(response => response.json())
  .then(data => {window.location.reload();setOpenCircularProgress(false);})
  .catch((error) => {setError(error.response.data.message);setOpenCircularProgress(false);});
  console.log("Sauvegarde de l'image:", imageChange);
}
  const handleSaveFirstName = () => {
    if (!firstNameChange.trim()) {
      setError("The first name cannot be empty.");
      return;
    }
   setOpenCircularProgress(true);
    const repanse = fetch(API_BASE_URL+'/credentials/change_first_name', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json','Authorization': `${token}`},
    body: JSON.stringify({first_name: firstNameChange})})
    .then(response => response.json())
    .then(data => {
      window.location.reload();
    })
    .catch((error) => {setError(error.response.data.message);setOpenCircularProgress(false);});
    

  };
  const handleSaveLastName = () => {
    if (!lastNameChange.trim()) {
      setError("The Last name cannot be empty.");
      return;
    }
    setOpenCircularProgress(true);
    const repanse = fetch(API_BASE_URL+'/credentials/change_last_name', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json','Authorization': `${token}`},
      body: JSON.stringify({last_name: lastNameChange})})
      .then(response => response.json())
      .then(data => {window.location.reload();})
      .catch((error) => {setError(error.response.data.message);setOpenCircularProgress(false);});
      setError('');
  };
  const handleSaveEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailChange)) {
      setError("Email is invalid.");}
      
    else{
      setOpenCircularProgress(true);
        const repanse = fetch(API_BASE_URL+'/credentials/change_email', {
          method: 'post',
          headers: {'Content-Type': 'application/json','Authorization': `${token}`},
          body: JSON.stringify({email: emailChange})})
          .then(response => response.json() )
          .then(data => {console.log(data);setOpenAlertSuccess(true);onClose(); setOpenCircularProgress(false);})
          .catch((error) => {console.error('Error:', error);setError(error.response.data.message);setOpenCircularProgress(false);});
        
      }
    }
  return (
  <>
   {openCircularProgress && <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 4 }}>
        <CircularProgress color="inherit" />
      </Backdrop>}
      {openAlertSuccess && <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Alert variant="success" onClose={() => setOpenAlertSuccess(false)} dismissible>
          < Alert.Heading>Success</Alert.Heading>
          <p>Email confirmation is sent.</p>
        </Alert>
      </Backdrop>}
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 3 }} open={open1}>
      <div className='EditName'>
        <div className='header'>
          <h1>Edit your First Name</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
        {error.trim()&&<div className="erreur">
            <p><MdReportGmailerrorred />{error}</p>
          </div>}
          <h5>Changes made to your profile First Name here, will be shown anywhere your profile is used.</h5>
          <TextField
            className="input"
            value={firstNameChange}
            onChange={handFirstNameChange}
            error={!!error} // Afficher l'état d'erreur visuellement
            helperText={error} // Afficher le message d'erreur
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                fontSize: '15px',
                padding: '10px'
              },
            }}
          ></TextField>
          {openbutton && <div className="button"><button onClick={handleSaveFirstName}>Save Changes</button></div>}
        </div>
      </div>
    </Backdrop>
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open2}>
      <div className='EditName'>
        <div className='header'>
          <h1>Edit your Last Name</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
        {error.trim()&&<div className="erreur">
            <p><MdReportGmailerrorred />{error}</p>
          </div>}
          <h5>Changes made to your profile Last Name here, will be shown anywhere your profile is used.</h5>
          <TextField
            className="input"
            value={lastNameChange}
            onChange={handLastNameChange}
            error={!!error} // Afficher l'état d'erreur visuellement
            helperText={error} // Afficher le message d'erreur
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                fontSize: '15px',
                padding: '10px'
              },
            }}
          ></TextField>
          {openbutton && <div className="button"><button onClick={handleSaveLastName}>Save Changes</button></div>}
       
        </div>
      </div>
    </Backdrop>
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open3}>
      <div className='EditName'>
        <div className='header'>
          <h1>Edit your Email</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
        {error.trim()&&<div className="erreur">
            <p><MdReportGmailerrorred />{error}</p>
          </div>}
          <h5>Changes made to your profile Email here, will be shown anywhere your profile is used.</h5>
          <TextField
            className="input"
            value={emailChange}
            onChange={handEmailChange}
            error={!!error} // Afficher l'état d'erreur visuellement
            helperText={error} // Afficher le message d'erreur
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                fontSize: '15px',
                padding: '10px'
              },
            }}
          ></TextField>
          {openbutton && <div className="button"><button onClick={handleSaveEmail}>Save Changes</button></div>}
       
        </div>
      </div>
    </Backdrop>
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open4}>
      <div className='EditName'>
        <div className='header'>
          <h1>Edit your Image</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
          {error.trim()&&<div className="erreur">
            <p><MdReportGmailerrorred />{error}</p>
          </div>}
          <h5>Changes made to your profile Image here, will be shown anywhere your profile is used.</h5>
          <div className="image-container">
            <img src={imageper || image ||profile} alt="Profile" />
            <button onClick={handleButtonClick}><AiOutlineCamera/></button>
            <input
              id="jnxjsnjxn"
              
              type="file"
              ref={fileInputRef}
              style={{display:'none'}}
              onChange={handleImageChange}
            />
          </div>
          {openbutton && <div className="button"><button onClick={handleSaveImage}>Save Changes</button></div>}
       
        </div>
      </div>
    </Backdrop>
    </>
  );
}

export default Edit;
