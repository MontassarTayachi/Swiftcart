import React, { useEffect } from 'react'
import './About_Us.css'
import { useStore } from '../StorePage';
import about_as from '../../../../assets/images/About Us.png'
function About_Us() {
   const { store,filters,setFilters  } = useStore();
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
  <div className='about-page'>
    
   <div className='image'>
   <img src={about_as} alt="map" />  
   </div>
    <div className='saz'> 
      <h1>About Us</h1>
      <p>
       {store?.description}
       </p>
    </div>
  </div>
  )
}

export default About_Us