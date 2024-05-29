import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState(null);

  const decodePayload = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };
  
  const fetchUserData = async () => {
    if (token) {
      const payload = decodePayload(token);
     
      try {
        const response = await fetch(API_BASE_URL + "/users?id=" + payload.user.id);
        const userData = await response.json();
       
        setUserInfo(prevState => ({ ...prevState, ...userData.users[0] }));
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Ajouter une dépendance vide pour éviter une boucle infinie

  useEffect(() => {
    fetchUserData();
  }, [token]); // Appeler fetchUserData uniquement lorsque le token change

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
