import { AiOutlineRight } from "react-icons/ai"; 
import { AiOutlineHome } from "react-icons/ai"; 
import React from 'react'
import './Nav.css'
import { useNavigate } from "react-router-dom";

function Nav({search,setSearch}) {
  const navigate=useNavigate();
  return (
    <div className='nav8485zaad'><AiOutlineHome style={{cursor:'pointer',fontSize:'1.8em',marginRight:'0.2em'}} onClick={()=>{navigate('/Swiftcart');setSearch(
      prevSearch => ({
        ...prevSearch,
        selectedCategories: [],
        supcategories: [],
        txt: [],
    })
    )}}/>{search.supcategories.length > 0 &&<p><AiOutlineRight  style={{fontSize:'1.5em',marginRight:'0.2em'}}/>{search.supcategories}</p>}<AiOutlineRight  style={{fontSize:'1.5em',marginLeft:'0.2em',marginRight:'0.2em'}} />{search.txt.length >0  ?<p>{search.txt}</p>:<p></p>}</div>
  )
}

export default Nav