import React, { useEffect, useState } from 'react'
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import { Carousel } from 'primereact/carousel';
import './Scroll_Horizontal.css'
import StoreItem2 from '../Store-item/StoreItem2';
function Scroll_Horizontal({name,stores}) {
    

    const productTemplate = (product) => {
        return (
          
            <StoreItem2 store={product}/>
           
           
        );
    };
  return (
    <div className='llslslszp'>
        <h1>{name}</h1>
    <Carousel value={stores} numVisible={4} showIndicators={false}  itemTemplate={productTemplate} />
    </div>
  )
}

export default Scroll_Horizontal