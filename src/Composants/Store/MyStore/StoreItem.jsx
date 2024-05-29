import React from 'react'
// import image from '../../../assets/images/Boutique.jpg';
import Rating from '@mui/material/Rating'
import { SlArrowRight } from 'react-icons/sl'
import './Style/StoreItem.css'
import { useNavigate } from 'react-router-dom'
function StoreItem({ store }) {
    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.setItem('store', JSON.stringify(store))
        navigate('/Swiftcart/Dashboard/')
    }

    return (
        <div onClick={handleClick} className='StoreItem'>
            <img src={store.profile_image} alt='store image' />
            <div className='detailes'>
                <div>
                    <h1>{store.name || 'name'}</h1>
                    <Rating className='Rating' name='disabled' value={store.rating} disabled />
                </div>
                <SlArrowRight className='sl1' />
            </div>
        </div>
    )
}

export default StoreItem
