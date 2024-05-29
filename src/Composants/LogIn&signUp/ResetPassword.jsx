import React,{useState} from 'react'
import './Style/ForgotPassword.css';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'; // Importer axios
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import './Style/ResetPassword.css';
import { API_BASE_URL } from '../../config';

function ResetPassword() {

    let { token } = useParams();
    let navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    
    const handlePasswordChange = (e) => { setPassword(e.target.value); };
    const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value); };
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    const [open, setOpen] = React.useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

        const validate = () => {
            let isValid = true;
    
    
            if (password.trim() === '') {
                setPasswordError(true);
                isValid = false;
            } else {
                setPasswordError(false);
            }
    
            if (password !== confirmPassword) {
                setConfirmPasswordError(true);
                isValid = false;
            } else {
                setConfirmPasswordError(false);
            }
    
            return isValid;
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            if(!validate()){
                return;
            }
            try {
                setOpen(true);
                const response = await axios.put(API_BASE_URL+'/authentication/forgot_password', {token,password});
                console.log('Registration successful:', response);
                localStorage.setItem("token", response.data.token);
                window.location.href = '/Swiftcart';
               
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('An error occurred during registration.');
                }
                console.error('Registration error:', error);
                setErrorAlert(true);
            } finally {
                setOpen(false); 
            }
        }
    

    return (
    <>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={errorAlert}
      >
        <Alert className='alert' variant="danger" onClose={() => setErrorAlert(false)} dismissible>
        <Alert.Heading>Password reset failed. </Alert.Heading>
        <p> Please check your reset link or try again later. If the problem persists, please contact us for assistance. We apologize for any inconvenience this may cause.</p> </Alert>  
        </Backdrop>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={successAlert}
      >
        <Alert className='alert' variant="success" onClose={() => setSuccessAlert(false)} dismissible>
        <Alert.Heading>Your password has been successfully reset.</Alert.Heading>
        <p>You can now log in to your account using your new password. If you have any questions or concerns, please do not hesitate to contact us for assistance. Thank you for your understanding and patience.</p>
      </Alert>
      
       
        </Backdrop>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
        </Backdrop> 
        <div className='ResetPassword'>
        <div className='page'> 
                <div className='main'>
                    <form onSubmit={handleSubmit}>
                        <h1>Reset password</h1>
                        <div className='EmailInpute'>
                        <label>Password</label>
                                    <TextField
                                            type={showPassword ? 'text' : 'password'}
                                            id='outlined-multiline-flexible'
                                            placeholder='Enter your password'
                                            onChange={handlePasswordChange}
                                            className='TextField'
                                            error={passwordError}
                                            helperText={passwordError && "The password must contain at least 6 characters."}
                                            value={password}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                  fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                                 
                                                  padding: '0.8rem 1rem'
                                                },
                                              }}
                                        />
                                    
                                        <label>Confirm Your Password</label>
                                        <TextField
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            id='outlined-multiline-flexible'
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <IconButton aria-label='toggle password visibility' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            error={confirmPasswordError}
                                                helperText={confirmPasswordError && "The passwords do not match."}
                                                
                                                sx={{
                                                    '& .MuiInputBase-input': {
                                                      fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                                     
                                                      padding: '0.8rem 1rem'
                                                    },
                                                  }}

                                        />  
                                        
                        </div>             
                        <button className='button' type='submit'>Reset password</button> 
                    </form>
                </div>
        </div>
        
        </div></>
  )
}

export default ResetPassword