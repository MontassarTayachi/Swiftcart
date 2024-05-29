import React, { useEffect, useState } from 'react'
import Mapcontainer from './Maps/MapContainer'
import Navigate from '../NavBar/Navigate'
import Search from './Search/Search'
import './Storemaps.css'
import { API_BASE_URL } from '../../../config'
function Storemaps() {
  const [open,setOpen]=useState(true);
  const[storeSearch,setStoreSearch]=useState([])
  const [stores, setStores] = useState([]);

  const[categorie,setCategorie]=useState([])
  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch(`${API_BASE_URL}/stores/all?${categorie.length>0?`category_id=${categorie.join(',')}&category_id_is_array=true`:''}`);
      
      const data = await response.json();
      console.log(data)
      setStores(data.stores);
    };
      fetchStores();
 }, [categorie]);
  return(
    <div>
        <Navigate number={4}/> 
        <div className='Storemaps98595'>
            <Search   setStoreSearch={setStoreSearch} setCategorie={setCategorie} open={[open,setOpen]}/>
            <Mapcontainer storeSearch={storeSearch} stores={stores} setStoreSearch={setStoreSearch} open={[open,setOpen]}/>
        
          
                   
        </div>

    </div>
  )
}

export default Storemaps