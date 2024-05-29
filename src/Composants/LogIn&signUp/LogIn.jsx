import React, { useState,useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './Style/login.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios'; 
import Backdrop from '@mui/material/Backdrop';
import Alert from 'react-bootstrap/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Alerte from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import swiftcart from '../../assets/images/swiftcart/swiftcart2.png'
function LogIn() {

  ////////////////AlertData/////////////////////
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



  ///////// Déclaration des états pour gérer l'affichage du mot de passe, l'email, le mot de passe///////
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => { setEmail(e.target.value);};
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handlePasswordChange = (e) => {setPassword(e.target.value);};

  ///////////////l'erreur d'email, l'erreur générale //////////////////
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  /////////////// l'affichage du backdrop pour le chargement///////////////////
  const [open, setOpen] = React.useState(false);
  const [errorAlert, setErrorAlert] = useState('');
  ////////////// // Fonction pour soumettre le formulaire de connexion////////////////////
  const validate = () => {
    let isValid = true;

    if (!validateEmail(email)) {
        setEmailError(true);
        isValid = false;
    } else {
        setEmailError(false);
    }

    if (password.length < 6) {
        setpasswordError(true);
        isValid = false;
    } else {
        setpasswordError(false);
    }

    return isValid;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorAlert('');
    if(!validate()){
      return;
    }
    setOpen(true)
   
      try {
       
        const response = await axios.post(API_BASE_URL+'/authentication/login', { email, password }); // Envoyer les informations d'identification à l'API     
        localStorage.setItem("token",response.data.token)
        window.location.href='/Swiftcart';
      } catch (error) {
        setErrorAlert(error.response.data.message);
        console.error('Login error:', error.response);
      }
      setOpen(false)
    
    
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

  return (<>
    { errorAlert.trim() && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <Alert className='alert' variant="danger" onClose={() => {setErrorAlert('');}} dismissible>
        <Alert.Heading>The connection failed.</Alert.Heading>
        <p>
      {errorAlert}
         </p>
      </Alert>
       
      </Backdrop>}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop> 
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showAlert}
        onClick={()=>{setShowAlert(false)}}
      >
         <Alerte severity="warning"  >
         <AlertTitle>{data.data1}</AlertTitle>
          {data.data2}</Alerte>
      </Backdrop> 
      
      
    <div className='login'>
      <form >
        <div className='header'><img src={swiftcart} ></img></div>
          <div className='page' elevation={3}>
            <h1>LogIn</h1> 
            <div className='input'>
              <label>Email</label>
              <FormControl sx={{ width: '100%' }}>
                <TextField
                  className='TextField'
                  placeholder="Enter your e-mail adress"
                  id='input-with-icon-textfield'        
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError} // Ajouter la prop error
                  helperText={emailError ? "Enter a valid email address." : ""} // Afficher le texte d'aide en fonction de l'erreu
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
            <p></p>
            <label>Password</label>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  id='outlined-multiline-flexible'
                  
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder='Enter your password'
                  className='TextField'
                  error={passwordError}
                  helperText={passwordError && "Password must contain at least 6 characters."}
                
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                      fontSize: '15px',
                      padding: '0.8rem 1rem'
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </div>
            <button type='button' onClick={handleSubmit} className='button'>           
              LogIn
            </button>
            <Link className='LinkForPassWordOublie' to={"/Swiftcart/ForgotPassword"}>Forgot your password ?</Link>
            <p className='text'>Or log in with</p>
            <div className='reseauxsociaux'>
              <button onClick={(e)=>{     e.preventDefault();window.location.href=getFacebookOAuthURL();console.log(getFacebookOAuthURL())}} className='facebook'>
                <FaFacebookSquare size={30} /> Facebook
              </button>
              <button onClick={(e)=>{ e.preventDefault();window.location.href=getGoogleOAuthURL();}} className='google'>
                <FcGoogle size={30} /> Google
              </button>
            </div>

            <div className='Signuip'>
              <p>Not a member?</p>
              <Link className='link' to={"/Swiftcart/SignUp"}>Register now</Link>
            </div>
          </div>
      </form>
    </div>
    </>
  );
}

export default LogIn;
