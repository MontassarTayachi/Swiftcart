import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import axios from 'axios'; 

function EmailModification() {
    const { token } = useParams();
    const navigate = useNavigate();
    const tokenFromStorage = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.put(`${API_BASE_URL}/credentials/change_email`, {
                    token, // Assuming the API expects a token in the body
                }, { 
                    headers: { 'Authorization': tokenFromStorage },
                });     
                navigate('/Swiftcart/Accounts/General');
            } catch (error) {
                console.error(error);
                // Optionally navigate to login or show an error message
                // navigate('/Swiftcart/logIn');
            }
        };
        fetchData();      
    }, [token, navigate]);

    return null;
}

export default EmailModification;
