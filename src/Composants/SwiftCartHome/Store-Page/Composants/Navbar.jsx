import React, { useEffect, useState } from 'react'
import './NavBar.css'
import {NavLink} from 'react-router-dom'
import { AutoComplete, Input } from 'antd'
import { SearchOutlined } from '@mui/icons-material';
import { API_BASE_URL } from '../../../../config';
import { useNavigate, useLocation } from 'react-router-dom'; 
function Navbar({ store,filters,setFilters }) {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const searchProducts = async (searchText) => {
    if (!searchText) {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/Search?search=${encodeURIComponent(searchText)}&store_id=${store.id}&store_from_index=1&store_to_index=1`);
      const data = await response.json();
      const searchOptions = data.products.map((product) => ({
        value: product.name,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {product.name}
          </div>
        ),
      }));
      setOptions([{ label: 'Products', options: searchOptions }]);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
    setIsLoading(false);
  };
  const location = useLocation(); // Use useHistory hook for navigation
  const navigate = useNavigate();
  const handleSearch = (value) => {
    // Check if the current path is not '/search'
    if (location.pathname !== '/search') {
      navigate(`/Swiftcart/StorePage/${store.id}/search`); // Navigate to '/search' using navigate
    }
    // Update the filters state
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: [value], // Assuming 'search' is the correct field in your filters state
    }));
  };
  const handleSearchTxT = () => {
    // Check if the current path is not '/search'
    if (location.pathname !== '/search') {
      navigate(`/Swiftcart/StorePage/${store.id}/search`); // Navigate to '/search' using navigate
    }
    // Update the filters state
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: [textSearch], // Assuming 'search' is the correct field in your filters state
    }));
  };
  const onSelect=(value)=> {
    setTextSearch(value);
  }
  const [isNavbarFixed, setIsNavbarFixed] = useState(false); // Nouvel état pour la fixation de la barre de navigation

  useEffect(() => {
    const handleScroll = () => {
        setIsNavbarFixed(window.scrollY > 60); // Mettre à jour l'état en fonction de la position de défilement
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
}, []);
  return (
    <div >
        <div className={`navbar8994585csfd585 ${isNavbarFixed ? 'navbar-fixed' : ''}`}>
            <div style={{display:'flex',alignItems:"center"}}>
            <img src={store?.profile_image} alt="logo" />
            <div className='titel'>
                <h1> {store? store.name : "ello"}</h1>
                <button>+ Follow</button>
            </div></div>
            <ul>
                <li><NavLink activeClassName='active' to='Home'>Home</NavLink> </li>
                <li><NavLink activeClassName='active'  to='products'>Products</NavLink></li>
                <li><NavLink  activeClassName='active' to='About Us'> About Us</NavLink></li>
                <li><NavLink  activeClassName='active' to='contact'>Contact Us</NavLink></li>
            </ul>
            <AutoComplete
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={250}
                popupMatchSelectWidth={'50%'}
                className='searchbar'
                options={options}
                onSearch={searchProducts}
                notFoundContent={isLoading ? 'Loading...' : null}
                onSelect={onSelect} // Use onSelect for item selection
                onChange={(value) => setTextSearch(value)}
            >
                <Input prefix={<SearchOutlined />} size="large" placeholder="Search products" enterButton onPressEnter={handleSearchTxT} />
            </AutoComplete>
        </div>
    </div>
  )
}

export default Navbar