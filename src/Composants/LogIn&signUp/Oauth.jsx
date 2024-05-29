import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsEnvelopeSlash } from "react-icons/bs"; 
import { GoVerified } from "react-icons/go"; 
import { MdOutlineNavigateNext } from "react-icons/md"; 
function Oauth() {
    const location = useLocation();
    const navigate = useNavigate(); // Corrigé : Utilisez navigate comme une fonction
    const[open1,setOpen1]=React.useState(false);
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
        
        const queryString = location.search;
        const queryParams = new URLSearchParams(queryString);
        const token = queryParams.get('token');
        

        if (!token) {
            // Redirige vers la page de connexion si le token n'est pas présent
            navigate('/Swiftcart/logIn');
        } else {
            // Sauvegarde le token dans localStorage et redirige
            localStorage.setItem("token", token);
            const payload = decodePayload(localStorage.getItem("token"));
            setFirst_name(payload.user.first_name)
            setOpen1(true);
        }
    }, [location, navigate]); // Ajoutez location et navigate comme dépendances de l'effet

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
    </>); 
}

export default Oauth;
