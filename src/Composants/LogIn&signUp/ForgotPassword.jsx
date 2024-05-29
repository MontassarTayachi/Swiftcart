import { IoMdArrowRoundBack } from "react-icons/io"; 
import React,{useState} from 'react'
import { FcOk } from 'react-icons/fc';
import './Style/ForgotPassword.css';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Alert from 'react-bootstrap/Alert';
import { API_BASE_URL } from '../../config';
import axios from 'axios'; // Importer axios
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';
function ForgotPassword() {
  const  navigate =useNavigate();
    
    const [valider, setvalider] = useState(false);
    const [Erroremail, setErroremail] = useState(false);

    const [email, setemail] = useState('');
    const handleemailChange = (e) => { setemail(e.target.value); };  

    const [error, setError] = useState('');
    const [open, setOpen] = React.useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const validateemail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
      };

    const valide =()=>{
       let isValid=true;
        if(!validateemail(email)){
            setErroremail(true); 
            isValid=false;
        }
        else {  isValid=true; setErroremail(false);}
      return isValid;

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!valide()){   
            return;
        }
        try {
            setOpen(true);
            const response = await axios.post(API_BASE_URL+'/authentication/forgot_password', {email});
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
        <Alert.Heading>Account reset failed due to {error}. </Alert.Heading>
      
        <p> Please check the information provided and try again. If you think this is an error, please contact us for assistance. We apologize for any inconvenience this may cause.</p> </Alert>
       
        </Backdrop>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
        </Backdrop> 
    
   <div className='ForgotPassword'>
   
        <div className='page'>
        <button className='button' onClick={()=>{navigate('/Swiftcart/LogIn')}}><IoMdArrowRoundBack /></button>
        {valider ? 
            <div className='validate'>
                <div><FcOk  size={50}/></div>
                <p>
                A password reset link has been sent to your registered email address. Please check your inbox and your junk or spam folder. Please note that this link expires in 4 minutes. Thank you for your attention. </p> 
            </div>:
            <div className='main'>  
              <form onSubmit={handleSubmit}>
                <h1>Forgot your password</h1>
                  <div className='EmailInpute'>
                    <label>Email</label>
                    <TextField
                               error={Erroremail} // Ajouter la prop error
                               helperText={Erroremail ? "Please enter a valid email address.": ""} // Afficher le texte d'aide en fonction de l'erreu
                                    className='TextField'
                                    placeholder="Enter your e-mail adress"
                                    value={email}
                                    onChange={handleemailChange}
                                    InputProps={{
                                        endAdornment: Erroremail && (
                                          <InputAdornment position='end'>
                                            <IconButton aria-label='error' edge='end'>
                                              <ErrorOutlineIcon color='error' />
                                            </IconButton>
                                          </InputAdornment>
                                        ),
                                      }}
                                />
                  </div>
                  <button className='button' type='submit'>Reset password</button>  
              </form>
            </div>}
        </div>
    </div>
   
   </>
  )
}

export default ForgotPassword