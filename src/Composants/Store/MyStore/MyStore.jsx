import React from 'react';
import './Style/MyStore.css'
import image from '../../../assets/images/swiftcart/swiftcart02.png';
import { TiPlus } from "react-icons/ti";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import StoreItem from './StoreItem';
import { Link } from 'react-router-dom';
import {useUser} from '../../../Context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import {API_BASE_URL} from '../../../config';
import ValidateurChaine from'../../../function/ValiderChaine'
function MyStore() {
  const {userInfo} = useUser();
  const navigate = useNavigate();
  const [stores, setStores] = useState(null);
  const fetchStores = async () => {
    const response = await fetch(API_BASE_URL+'/stores', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': localStorage.getItem('token')    
      },
    });
    const data = await response.json();
    if(data.success){
      setStores(data.stores);
    }
    else{
      console.log(data.message);
    }
    console.log(data);
  }
  useEffect(() => {
    fetchStores();
  }, []);
  return (
    <div className='MyStore'>
      <div className='card'>
          <div className='header'>
          <img className='a1' onClick={()=>{navigate('/swiftcart')}} src={image}></img>
          <img className='a2' src={userInfo.image}></img>
          </div>
          <div className='WelcomeUser'>
            <h1>Welcome back, {ValidateurChaine.reduireEtValiderChaine(userInfo.first_name,12)}</h1>
            <Link to={'/Swiftcart/CreateStore'} style={{textDecoration:"none"}}><button><TiPlus className='re1'/> Create store</button></Link>
          </div>
          <div className='MyStores'>
            <Tabs  style={{background:'transparent', color: 'white'}} defaultValue={0}>
              <TabList>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600'}}>Active</b></Tab>
                <Tab><b style={{fontSize:'0.8rem',fontWeight:'600'}}>Inactive</b></Tab>
              </TabList>
              <TabPanel className='ActiveStores' value={0}>
                <div >
                 {
                    stores &&stores.map((store,index)=>{
                      return <StoreItem store={store}></StoreItem>
                    })
                 }
                </div>
              </TabPanel>
              <TabPanel className='ActiveStores' value={1}>
                  <div >
                  
                  </div>
              </TabPanel>
            </Tabs>

          </div>
      </div>
    </div>
  )
}

export default MyStore; // And similarly for the other components
