import { BsEnvelopeSlash } from "react-icons/bs"; 
import { GoVerified } from "react-icons/go"; 
import { MdOutlineNavigateNext } from "react-icons/md"; 
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {API_BASE_URL} from '../../config';
import './Style/EmailVerification.css';
import axios from 'axios'; 
function EmailVerification() {
    let { token } = useParams();
    let navigate = useNavigate();
    const[open1,setOpen1]=React.useState(false);
    const[open2,setOpen2]=React.useState(false);
    const[open3,setOpen3]=React.useState(false);
    const[first_name,setFirst_name]=React.useState('');
    const decodePayload = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(API_BASE_URL + '/authentication/verify_email', { token });
                localStorage.setItem("token", response.data.token);
                const payload = decodePayload(localStorage.getItem("token"));
                setFirst_name(payload.user.first_name)
                console.log(response);
                setOpen1(true);
            } catch (error) {
                if(error.response.status === 401){
                    setOpen3(true)
                }
                else if( error.response.status === 400){
                    setOpen2(true)
                }
                else{
                    console.log(error.response.data.message);
                    const data ={
                        data1:`A server problem has occurred.`,
                        data2:`Please retry later."`
                    }  
                 navigate('/Swiftcart/logIn',{ state: { data: data } });

                }
            }
        };
        fetchData();  
   
    }, [token, navigate]);
    
   
    return (<>
    {open1 && <div className="EmailVerification">
        
    <div className="card">
    <div className='cardheader'><h1>Hi {first_name},<br></br>Welcome to Swiftcart</h1>
           </div>
           <GoVerified className="verified" />
            <p>Congratulations! Your account has now been activated. Welcome to SwiftCart, where shopping is made swift and easy.</p>
            <button onClick={()=>(window.location.href='/Swiftcart')}>Let's start <MdOutlineNavigateNext className="flech" /> </button>
    </div>

    </div>}
    {open2 &&<div className="EmailVerification">
        
    <div className="card">
    <div className='cardheader'><h1>Hi  {first_name},</h1>
           </div>
           <GoVerified className="verified" />
            <p>Your account has been successfully activated. Please log in to access your account</p>
            <button onClick={()=>navigate('/Swiftcart/Login')}> LogIn <MdOutlineNavigateNext className="flech" /> </button>
    </div>

    </div>}
    {open3&&<div className="EmailVerification">
        
        <div className="card">
    
               <BsEnvelopeSlash  className="error" />
                <p>Your account activation code has expired. Please register again to create a new account.</p>
                <button onClick={()=>navigate('/Swiftcart/SignUp')}> SignUp <MdOutlineNavigateNext className="flech" /> </button>
        </div>
    
    </div>}
    </>);
}

export default EmailVerification;
