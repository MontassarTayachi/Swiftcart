import React from 'react'
import './StorePopular.css'
import { Link } from 'react-router-dom'
import ValidateurChaine from '../../../../function/ValiderChaine'
function StorePopular({store,product}) {
  return (
    <div className="store-popular">
    <h1>{store? 'Shop by store':ValidateurChaine.reduireEtValiderChaine(product.name,20)}</h1>
      <div className="store-popular-image">
        <img src={store?.profile_image||product.media[0]} alt="store" />
        <div className='info'>
            <Link  className='link' to={store?`/Swiftcart/StorePage/${store.id}`:`/Swiftcart/product/${product.id}`}>{store? 'Shop visit':'View the product'}</Link>   
        </div>
        </div>
        <div className='tdgygdegdeyyegyd'>  <Link  to={store?"/Swiftcart/All-Stores":'/Swiftcart/search'}>See more</Link></div>
    </div>
  )
}

export default StorePopular