import { BiChevronRight } from "react-icons/bi"; 
import { BiRightArrowAlt } from "react-icons/bi"; 
import { AiOutlineArrowRight } from "react-icons/ai"; 
import React from 'react'
import { Link } from 'react-router-dom'
import './StoreItem.css'
import { Rate } from 'antd';
function StoreItem2({store}) {
  return (
    <div className='StoreItemsqxplapl '>
        <img src={store.profile_image} alt={store.name} />
        <h3>{store.name}</h3>
        <Rate allowHalf defaultValue={store.rating} disabled />
        <Link  className="linkazer rounded" to={`/Swiftcart/StorePage/${store.id}`}><h2 className="text-green"> <BiChevronRight className="diddzdekz"/><BiRightArrowAlt className="dzuhucxzjçxj" />View store</h2></Link>

    </div>
  )
}

export default StoreItem2