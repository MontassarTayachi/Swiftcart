import { AiOutlineCaretDown } from "react-icons/ai"; 
import React,{useContext, useEffect, useState} from "react";
import './Style/Navbar.css';
import { VscMenu } from "react-icons/vsc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import image2 from '../../../assets/images/swiftcart/swiftcart01.png'
import image from '../../../assets/images/profile.png';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import ValidateurChaine from '../../../function/ValiderChaine'
function Navbar({setToggle}) {
    const navigate = useNavigate();  
    const [store,setStore]=useState(JSON.parse(localStorage.getItem('store')));
    const handleImageError2 = (e) => {
        e.target.src = image; // Utilisation de l'image de remplacement
    };
    useEffect(() => {
        setStore(JSON.parse(localStorage.getItem('store')));
    }, []);
    return(
        <>
        <div className="nav">
        <div className="navleft" > <button onClick={setToggle}><VscMenu/> </button>
        <img src={image2}></img>
        </div>
        <div className="navright" >
             <Dropdown className="userDropdown" >
             <Dropdown.Toggle className="user" >
                <p><AiOutlineCaretDown style={{color:'white',padding:'0',marginRight:'0.5em'}} />{ValidateurChaine.reduireEtValiderChaine(store.name,15)}</p> <img src={store.profile_image || image}  /> 
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{navigate('/Swiftcart/')}} >Home</Dropdown.Item>
                <Dropdown.Item onClick={()=>{navigate('/Swiftcart/MyStores')}}>My stores</Dropdown.Item>
                <Dropdown.Item onClick={()=>{navigate('Setting')}}>Store Setting </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={()=>{navigate('/Swiftcart/Accounts')}}>Account Setting</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
        </div>
        
        </>
    )
}
export default Navbar;