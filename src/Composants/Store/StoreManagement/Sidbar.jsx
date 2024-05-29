import { TbTruckDelivery } from "react-icons/tb"; 
import { AiFillSetting } from "react-icons/ai"; 
import { BsPersonFillExclamation } from "react-icons/bs"; 
import { MdOutlineInventory } from "react-icons/md"; 
import { MdLocalOffer } from "react-icons/md"; 
import { HiHome } from "react-icons/hi"; 
import React from "react";
import { IoIosClose } from "react-icons/io";
import './Style/Sidbar.css';
import SwiftCart from '../../../assets/images/swiftcart/swiftcart2.png';
import { FaShoppingBag}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
function Sidbar({setToggle}){
    
    const ProductItem=[
        {
            path:"Overview",
            name:"Home",
            icon:<HiHome />
        },
        {
            path:"Order",
            name:"Orders",
            icon:<MdOutlineInventory />
        },
      
        {
            path:"Product",
            name:"Product",
            icon:<MdLocalOffer />
        },
       
        {
            path:"Setting",
            name:"Setting",
            icon:<AiFillSetting />
        },
       
    ]
    return(<>
    <div className="SidbarAdmin">
        <div className="header">
           
       <button className="close" onClick={setToggle}><IoIosClose size={25}/></button>
        </div>
        <div className="body">
           {
                   ProductItem.map((item, index)=>(
                    <NavLink activeClassName="active"to={item.path} key={index} className="link" >
                           <div className="icon">{item.icon}</div>
                           <div className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }


        </div>
        <div className="footer">

        </div>

    </div>
    </>)
}
export default Sidbar;