import React, { useState,useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './Style/SignUp.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Alert from 'react-bootstrap/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios'; // Importer axios
import Alerte from '@mui/material/Alert';
import { useLocation } from 'react-router-dom';
import AlertTitle from '@mui/material/AlertTitle';
import { FcOk } from "react-icons/fc";
import swiftcart from '../../assets/images/swiftcart/swiftcart2.png';
function SignUp() {
    
    /////////////////////////
    const location = useLocation();
    const [data, setdata] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
      if(location.state !== null){
        setdata(location.state.data )
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);}
    }, []);

    /////////////////

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [valider, setvalider] = useState(false);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    
    const [error, setError] = useState('');

    const [open, setOpen] = React.useState(false);
    const [errorAlert, setErrorAlert] = useState(false);

    const handleEmailChange = (e) => { setEmail(e.target.value); };
    const handlePasswordChange = (e) => { setPassword(e.target.value); };
    const handleConfirmPasswordChange = (e) => { setConfirmPassword(e.target.value); };
    const handleFirstNameChange = (e) => { setFirstName(e.target.value); };
    const handleLastNameChange = (e) => { setLastName(e.target.value); };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };
    const validate = () => {
        let isValid = true;

        if (firstName.trim() === '') {
            setFirstNameError(true);
            isValid = false;
        } else {
            setFirstNameError(false);
        }

        if (lastName.trim() === '') {
            setLastNameError(true);
            isValid = false;
        } else {
            setLastNameError(false);
        }

        if (!validateEmail(email)) {
            setEmailError(true);
            isValid = false;
        } else {
            setEmailError(false);
        }

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
        if (!validate()) {
            return;
        }

        try {
          setOpen(true);
          const first_name =firstName;
          const last_name = lastName;
          const response = await axios.post(API_BASE_URL+'/authentication/register', { first_name, last_name, email, password });
          console.log('Registration successful:', response);
          setvalider(true);
      } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
              setError(error.response.data.message);
          } else {
              setError('An error occurred during registration.');
          }
          console.error('Registration error:', error);
          setErrorAlert(true);
      } finally {
          setOpen(false); // Close backdrop regardless of success or error
      }
      
        setOpen(false);
    };
    function getFacebookOAuthURL() {
      const rootURL = 'https://www.facebook.com/v12.0/dialog/oauth'
      const qs = new URLSearchParams({
          redirect_uri: 'http://localhost:4000/authentication/oauth/facebook',
          client_id: '3373600499598258',
          response_type: 'code',
          scope: ['email', 'public_profile'].join(',')
      })
  
      return `${rootURL}?${qs.toString()}`
  }
  function getGoogleOAuthURL() {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'
    const qs = new URLSearchParams({
        redirect_uri: 'http://localhost:4000/authentication/oauth/google',
        client_id: '142008973084-vab462ki27nrk2bf72iij6kj228bgueu.apps.googleusercontent.com',
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(' ')
    })
    return `${rootURL}?${qs.toString()}`
  }
  
    return (
        <>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showAlert}
        onClick={()=>{setShowAlert(false)}}
      >
         <Alerte severity="warning" >
         <AlertTitle>{data.data1}</AlertTitle>
          {data.data2}</Alerte>
        </Backdrop> 
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={errorAlert}
      >
        <Alert className='alert' variant="danger" onClose={() => setErrorAlert(false)} dismissible>
        <Alert.Heading>Account creation failed.</Alert.Heading>
        <p>{error}</p>
      </Alert>
       
        </Backdrop>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
         </Backdrop> 
         <div className='SignUp'>
            <form onSubmit={handleSubmit} >
            <div className='header'><img src={swiftcart} ></img></div>
            {valider ? 
            <div className='validate'>
                <div><FcOk  size={50}/></div>
                <p>
               Congratulations ! Your account has been successfully created. Please check your inbox to confirm your email address and activate your account.  </p>
            </div>:
            <div className='page'>                    
                    <h1>  Register</h1>
                    <div className='input'>
                            <div className='IputeName'>
                                
                              <div className='titre'>
                              <label>First name</label>
                              <TextField
                               error={firstNameError} // Ajouter la prop error
                               helperText={firstNameError ? "Please enter your first name." : ""} // Afficher le texte d'aide en fonction de l'erreu
                             
                            
                                    className='TextField'
                                    placeholder="Enter your first name "
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    InputProps={{
                                        endAdornment: firstNameError && (
                                          <InputAdornment position='end'>
                                            <IconButton aria-label='error' edge='end'>
                                              <ErrorOutlineIcon color='error' />
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                              </div>

                               <div className='titre'>
                               <label> Last Name</label>
                               <TextField
                                    className='TextField'
                                    placeholder="Enter your Last Name "
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    error={lastNameError}
                                    helperText={lastNameError && "Please enter your last name."}
                                    InputProps={{
                                        endAdornment: lastNameError && (
                                          <InputAdornment position='end'>
                                            <IconButton aria-label='error' edge='end'>
                                              <ErrorOutlineIcon color='error' />
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                               </div>
                            </div>

                                <div className='Email'>
                                <label>Email</label>
                                <TextField
                                 error={emailError}
                                 helperText={emailError && "Please enter a valid email address."}                          
                                placeholder='Enter your e-mail adress'
                                type='email'
                                className='TextFieldMail'
                                value={email}
                                onChange={handleEmailChange}
                                
                                InputProps={{
                                    endAdornment: emailError && (
                                      <InputAdornment position='end'>
                                        <IconButton aria-label='error' edge='end'>
                                          <ErrorOutlineIcon color='error' />
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                  }}
                               
                            />
                                </div>
                           
                              <div className='IputeName'>
                              <div className='titre'>
                               <label>Password</label>
                               <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    id='outlined-multiline-flexible'
                                    placeholder='Enter your password'
                                    onChange={handlePasswordChange}
                                    className='TextField'
                                    error={passwordError}
                                    helperText={passwordError && "The password must contain at least 6 characters."}
                                   
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
                                        fontSize: '1rem',
                                        padding: '0.8rem 1.5rem'
                                      },
                                    }}
                                />
                               </div>

                                <div className='titre'>
                                <label>Confirm Your Password</label>
                                <TextField
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id='outlined-multiline-flexible'
                                    placeholder="Confirm your password " 
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    className='TextField'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton aria-label='toggle password visibility' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                      '& .MuiInputBase-input': {
                                        fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                                        fontSize: '1rem',
                                        padding: '0.8rem 1.5rem'
                                      },
                                    }}
                                    error={confirmPasswordError}
                                        helperText={confirmPasswordError && "Passwords do not match."}                                       

                                />
                                </div>
                              </div>
                           
                    </div>
                    <button type='submit' className='button' > 
                    Register
                    </button>
                    <p className='text'>Or register with</p>
                    <div className='reseauxsociaux'>
                    <button type='button' onClick={(e)=>{     e.preventDefault();window.location.href=getFacebookOAuthURL();console.log(getFacebookOAuthURL())}} className='facebook'>
             
                            <FaFacebookSquare size={30} /> Facebook
                        </button>
                        <button type='button' onClick={(e)=>{ e.preventDefault();window.location.href=getGoogleOAuthURL();}} className='google'>
                            <FcGoogle size={30} /> Google
                        </button>
                    </div>

                    <div className='Signuip'>
                        <p>Already have an account?</p>
                        <Link className='link' to='/Swiftcart/logIn'>Log in now</Link>
                    </div>
            </div>}
            </form>
         </div>

        
        
        </>    );
}

export default SignUp;
