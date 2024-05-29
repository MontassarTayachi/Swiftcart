import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import Backdrop from '@mui/material/Backdrop';
import { MdReportGmailerrorred } from "react-icons/md"; 
import { TextField, IconButton } from '@mui/material';
import { Label, Visibility, VisibilityOff } from '@mui/icons-material';
import './Style/EditPassword.css';
import {API_BASE_URL} from '../../config'
function EditPassword({ open1, onClose }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [errornewPassword, seterrornewPassword] = useState('');
  const [errorconfirmPassword, seterrorconfirmPassword] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    let isValid = true;

    if (password.length < 6) {
        setErrorCurrentPassword('Invalid password length less than 6 characters');
        isValid = false;
    } else {
        setErrorCurrentPassword('');
    }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
     
      return;
    }
    const old_password = password;
    const new_password = newPassword;
    try {
      const reponce= await(await fetch(API_BASE_URL+'/credentials/change_password', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ old_password, new_password}),
      
      })).json();
      if(!reponce.success){
      setError('Invalid password');
      return;
      }
      window.location.reload();

    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open1}>
      <div className='EditPassword'>
        <div className='header'>
          <h1>Change Password</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        <div className="body">
        {error.trim()&&<div className="erreur">
            <p><MdReportGmailerrorred />{error}</p>
          </div>}
          <form onSubmit={handleSubmit}>
            <div className='Input'>
            <label>Current Password</label>
            <TextField
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={password}
              error={!!errorCurrentPassword} // Afficher l'état d'erreur visuellement
              helperText={errorCurrentPassword}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                  fontSize: '15px',
                  padding: '10px'
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            </div>
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

export default EditPassword;
