import React, { useEffect, useState } from 'react'
import { useFollowed } from '../../../Context/Followed';
import { API_BASE_URL } from '../../../config';
import Stores_Following from './Stores_Following';

function Following() {
   const  { followed, setFollowed, refreshes, setRefreshes, loading, error } = useFollowed();
   const [stores, setStores] = useState([]);
   useEffect(() => {
    if (loading) {
      return;
    }
    if (error) {
      return;
    }
    if (!followed) {
      return;
    }
    const fetchStores = async () => {
      const stores = await Promise.all(
        followed.map(async (follow) => {
          const response = await fetch(`${API_BASE_URL}/stores/all?id=${follow.store_id}`);
          const data = await response.json();
          return data.stores[0];
        })
      );
      setStores(stores);
      console.log(stores);
    };
    fetchStores();
    }
    , [followed]);

  return (
    <div >
        <h5 style={{margin:'1em'}}>Following</h5>
        <div>
            {stores.length>0&& stores.map((store) => (
            <Stores_Following store={store}/>
            ))}
        </div>

    </div>
  )
}

export default Following