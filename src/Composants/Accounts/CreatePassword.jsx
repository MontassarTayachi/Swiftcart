import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import Backdrop from '@mui/material/Backdrop';
import { MdReportGmailerrorred } from "react-icons/md"; 
import { TextField, IconButton } from '@mui/material';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import './Style/EditPassword.css';
import {API_BASE_URL} from '../../config';
function CreatePassword({ open1, onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, seterror] = useState('');
  const [errornewPassword, seterrornewPassword] = useState('');
  const [errorconfirmPassword, seterrorconfirmPassword] = useState('');
 

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    let isValid = true;
    if (newPassword.length < 6) {
        seterrornewPassword('Invalid password length less than 6 characters');
        isValid = false;
    } else {
        seterrornewPassword('');
    }
    if (newPassword !== confirmPassword) {
        seterrorconfirmPassword('Passwords do not match.');
        isValid = false;
    } else {
        seterrorconfirmPassword('');
    }


    return isValid;
};
  const handleSubmit = (e) => {
  e.preventDefault();
    if (!validate()) {
      
     
      return;
    }
    try {
      const repance = fetch(API_BASE_URL+'/credentials/set_password', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          password: newPassword
        })
      });
      console.log(repance);
     window.location.reload();
    } catch (error) {
      seterror(error.response.data.message);
      console.error('Error:', error);
    }
  };

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open1}>
      <div className='EditPassword'>
        <div className='header'>
          <h1>Create Password</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
        {error.trim()&&<div className="erreur">
            <p><MdReportGmailerrorred />{error}</p>
          </div>}
          <form onSubmit={handleSubmit}>
           
           <div className='Input'>
            <label>New Password</label>
           <TextField
              variant="outlined"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              error={!!errornewPassword} // Afficher l'état d'erreur visuellement
              helperText={errornewPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                  fontSize: '15px',
                  padding: '10px'
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={toggleNewPasswordVisibility}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
           </div>
            <div className='Input'>
            <label>Confirm New Password</label>
            <TextField 
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              error={!!errorconfirmPassword} // Afficher l'état d'erreur visuellement
              helperText={errorconfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                  fontSize: '15px',
                  padding: '10px'
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            </div>
            <div className="button">
              <button type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </Backdrop>
  );
}

export default CreatePassword;
