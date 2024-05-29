import React,{useEffect, useState} from 'react';
import './Style/Security.css';
import Devices from './Devices';
import EditPassword from './EditPassword';
import CreatePassword from './CreatePassword';
import {useUser} from '../../Context/UserProvider';
import {API_BASE_URL} from '../../config'
function Security() {
  const { userInfo, setUserInfo } = useUser(); 
  const [Password, setPassword] = useState(userInfo.password===null?true:false);
  const[open,setOpen]=useState(false);
  const[open2,setOpen2]=useState(false);
  const [devices, setDevices] = useState({});
  
  const fetchDevices = async () => {
    try {
      const response = await fetch(API_BASE_URL+'/device_map', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem("token")}`
        }
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      console.log(responseData.devices )
      setDevices(prevState => (responseData.devices ));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchDevices(); 
  }, []);
   console.log(devices)

  return (
    <>

    {open &&<EditPassword open1={open} onClose={()=>{setOpen(false)}} ></EditPassword>}
    {open2 &&<CreatePassword open1={open2} onClose={()=>{setOpen2(false)}} ></CreatePassword>}
    <div className='Security'>
      <div className='Titel'><h1>Security</h1></div>
      <div className='ChangePassword'>
        <h1 > Password</h1>
       
       {Password?<div className='password'>
          <h1>
          You have not set a password on your account.
          </h1>
          <button onClick={()=>{setOpen2(true)}} >Create Password</button>

        </div>:
       <div className='password'>
           <h1>
           Change your password account.
          </h1>
          <button onClick={()=>{setOpen(true)}}>Change Password</button>
          </div>}
        
      </div>
      
        <div className='Devices'>
       
       <div className='Title'>
       <h1 > Devices </h1>   
       <p>You're currently logged in to Shopify on these devices. If you don't recognize a device, log out to keep your account secure.</p>
       </div>
       
       <div className='Loggedin'>
        <h2>Logged in</h2>
        {devices.length > 0 ? devices.map((device, key) => (
              <Devices key={key} device={device} />
            )) : <h1>No devices</h1>}
          </div>
        
        </div>
    
    </div>
    </>
  )
}

export default Security