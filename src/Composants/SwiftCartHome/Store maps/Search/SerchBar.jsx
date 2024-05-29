import React, { useState } from 'react'
import { AutoComplete, Input } from 'antd'
import {SearchOutlined } from '@mui/icons-material';
import { API_BASE_URL } from '../../../../config';
function SerchBar({setStoreSearch,setOpen1}) {
 
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleSearch = (value) => {
         setStoreSearch(value);
        if(window.innerWidth<800){
          setOpen1(false)
        }
      };

    const searchProducts = async (searchText) => {
        if (!searchText) {
          setOptions([]);
          return;
        }
        setIsLoading(true);
        try {
          const response = await fetch(`${API_BASE_URL}/Search?search=${encodeURIComponent(searchText)}&product_to_index=1&product_from_index=1`);
          const data = await response.json();
          const searchOptions = data.stores.map((store) => ({
            value: [store.latitude, store.longitude],
            label: (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >

               <img src={store.profile_image} alt={store.name} style={{ width: '40px', height: '40px',borderRadius:'5px',objectFit:'cover' }} /> {store.name} 

              </div>
            ),
          }));
          setOptions([{ label: 'Stores', options: searchOptions }]);
        } catch (error) {
          console.error('Failed to fetch products', error);
        }
        setIsLoading(false);
      };
  return (
    <div style={{display:'flex',alignItems:'center',width:'100%'}}>
    <AutoComplete
    dropdownClassName="certain-category-search-dropdown"
    dropdownStyle={{zIndex:7000}}
    style={{width:'90%',position:'block',margin:'auto'}}
    options={options}
    notFoundContent={isLoading ? 'Loading...' : null}
    onSearch={searchProducts}
    onSelect={handleSearch}>
    <Input prefix={<SearchOutlined />} size="large" placeholder=" Find a store" enterButton />
</AutoComplete></div>
  )
}

export default SerchBar