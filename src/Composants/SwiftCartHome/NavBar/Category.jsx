import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Menu } from 'antd';
import {API_BASE_URL} from '../../../config';
import './Style/SearchBar.css';
import {Search}from '../../../Context/SerachBar';
import { useNavigate } from 'react-router-dom';
import ValidateurChaine from '../../../function/ValiderChaine';
// Assuming the icon imports are somewhere above

function MyMegaMenu() {
  const [categories, setCategories] = useState([]);
  const{search,setSearch}=Search();
  const navigate=useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_BASE_URL + "/store_categories?include_subcategories=true");
      const data = await response.json();
      setCategories(data.store_categories);
    };
    fetchData();
  }, []);

  const getItem = (label, key, icon, children, type,) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };

 
  // Click event handler
  const onClick = (e) => {
    console.log(e);
    const keyParts = e.key.split('-'); 
    const label = keyParts.slice(1).join('-'); 
    const keyPath=e.keyPath[1]
    const subcategories =keyPath.split('-')[1] ;
    setMenuOpen(false);
    setSearch({...search,supcategories:[subcategories],
      selectedCategories: [label]
    
    });
  navigate(`/Swiftcart/search?supcategories=${subcategories}&categories=${label}`);
        };
  const items = categories.map((category) => 
  getItem(category.name, 'cat-' + category.name, null, [
    getItem(category.name, 'group-' + category.name, null, category.sub_categories.map((fils) => 
      getItem(fils.name, 'sub-' + fils.name)
    ), 'group'),
  ])
);


  return (
    <Dropdown show={menuOpen} onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)} className="Dropdownsqqsx">
      <Dropdown.Toggle className="nav-text">
      {search?.supcategories.length>0? ValidateurChaine.reduireEtValiderChaine(search?.supcategories[0],15):'Categories'}
       </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          categories.map((category,index) => 
         <div onClick={()=>{  
          setSearch({...search,supcategories:[category.name]});
         
          navigate(`/Swiftcart/search?supcategories=${category.name}`);
          setMenuOpen(false);
        }}>
           <Menu
          onClick={onClick}
          style={{ width: 256 }}
          mode="vertical"
          items={[items[index]]}/>
         </div>
          )
        }
      
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyMegaMenu;
