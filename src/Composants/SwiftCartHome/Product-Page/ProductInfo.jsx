import React, { useEffect, useState } from 'react'
import { AiFillTag } from 'react-icons/ai'
import { AiOutlineHeart } from 'react-icons/ai'
import { InputNumber, Rate } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'
import { Alert, Snackbar } from '@mui/material'
import Pay from '../Cart/Pay'
import LogIn_Controls from '../../Controls/LogIn_Controls'
import { API_BASE_URL } from '../../../config'
import { useCart } from '../../../Context/CartProvider'
function ProductInfo({ product, store, category }) {
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [show, setShow] = React.useState(false)
    const addToList = listName => {
        const list = JSON.parse(localStorage.getItem(listName)) || []
        if (!list.some(item => item.id === product.id)) {
            if (listName === 'cart') {
                list.push({ id: product.id, Qty: qty })
                setOpen(listName)
            } else {
                setOpen(listName)
                list.push({ id: product.id })
            }
            localStorage.setItem(listName, JSON.stringify(list))
            window.dispatchEvent(new Event('storageChange'))
        } else {
            setOpen(listName + 'exist')
        }
    }
    const { setRefreshes } = useCart()
    const addToCart = async event => {
        if (!localStorage.getItem('token')) {
            setShow(true)
            return
        }
        event.preventDefault() // Empêche la navigation
        event.stopPropagation()
        try {
            const respance = await fetch(`${API_BASE_URL}/cart_items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ product_id: product.id, quantity: qty })
            })
            const data = await respance.json()
            if (data.success) {
                setOpen('cart')
            } else {
                setOpen('cartexist')
                throw new Error(data.message)
            }
        } catch (error) {
            console.error(error)
        }

        setRefreshes(prev => prev + 1)
        window.dispatchEvent(new Event('storageChange'))
    }
    const addWishlist = () => {
        if (localStorage.getItem('token')) {
            addToList('wishlist')
        } else {
            setShow(true)
        }
    }
    const addCompare = () => {
        if (localStorage.getItem('token')) {
            addToList('compare')
        } else {
            setShow(true)
        }
    }
    const [open, setOpen] = React.useState('')
    const isInlist = listName => {
        const list = JSON.parse(localStorage.getItem(listName)) || []
        return list.some(item => item.id === product.id)
    }

    const [inWishlist, setInWishlist] = React.useState(isInlist('wishlist'))

    const remove = listName => {
        const list = JSON.parse(localStorage.getItem(listName)) || []
        const updatedlist = list.filter(item => item.id !== product.id)
        localStorage.setItem(listName, JSON.stringify(updatedlist))
        window.dispatchEvent(new Event('storageChange'))
        setOpen('ssskkk')
    }
    const removeFromWishlist = () => {
        remove('wishlist')
    }
    useEffect(() => {
        const checkInList = listName => {
            const list = JSON.parse(localStorage.getItem(listName)) || []
            return list.some(item => item.id === product.id)
        }

        setInWishlist(checkInList('wishlist'))
    }, [product.id, open])
    function getSignificantDecimalPart(num) {
        const numStr = num.toString()
        // Vérifiez si le nombre contient un point décimal
        if (numStr.includes('.')) {
            let decimalPart = numStr.split('.')[1] // Récupérez la partie après le point décimal
            decimalPart = decimalPart.replace(/^0+/, '') // Supprimez les zéros de début
            return decimalPart // Retournez la partie significative
        }
        return '0' // Si aucun point décimal, retournez '0'
    }
    return (
        <>
            <LogIn_Controls show={show} setShow={setShow} />
            {open === 'Pay' && <Pay setOpen={setOpen} Products={[{ id: product.id, Qty: qty }]} />}
            {(open === 'wishlist' || open === 'compare' || open === 'cart') && (
                <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={2000} onClose={() => setOpen('')}>
                    <Alert onClose={() => setOpen('')} severity='success' variant='filled' sx={{ width: '100%' }}>
                        {`Product added to ${open} successfully.`}
                    </Alert>
                </Snackbar>
            )}
            {(open === 'wishlistexist' || open === 'compareexist' || open === 'cartexist') && (
                <Snackbar open={true} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} autoHideDuration={2000} onClose={() => setOpen('')}>
                    <Alert onClose={() => setOpen('')} severity='warning' variant='filled' sx={{ width: '100%' }}>
                        {`The item has been exist in the  List .`}
                    </Alert>
                </Snackbar>
            )}
            <div className='cioezj4956'>
                <div className='nkjsq125'>
                    <span>
                        <p>TND</p>
                        <h1>{Math.floor(product?.price)}</h1>
                        <p>.{product.price && getSignificantDecimalPart(product.price.toFixed(2))}</p>{' '}
                    </span>
                    {inWishlist ? <AiFillHeart className='ixozj' onClick={removeFromWishlist} /> : <AiOutlineHeart className='ixozj' onClick={addWishlist} />}
                </div>
                <h3>{product.name} </h3>
                {product.stock > 0 ? <h5 className='InStoke'>In Stoke</h5> : <h5 className='OutStoke'>Out Stoke</h5>}
                <Link to={`/Swiftcart/StorePage/${store.id}`} className='iiodaji'>
                    <h2>Visit the {store.name} Store</h2>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', padding: '0.5em 0' }}>
                    {' '}
                    <div className='category'>
                        <AiFillTag /> {category}{' '}
                    </div>
                </div>
                <div className='uuhzuxhuhhuzpzo'>
                    {' '}
                    <Rate disabled allowHalf={true} defaultValue={4} value={product.rating} className='rate' />{' '}
                    <a style={{ color: 'black', marginRight: '2px' }} href='#Customer_Reviews'>
                        <h3 style={{ color: 'black', margin: 0, padding: 0, fontSize: '1em', fontWeight: 500 }}> ({product?.reviews_count} Reviews </h3>{' '}
                    </a>
                    <h3 style={{ color: 'black', margin: 0, padding: 0, fontSize: '1em', fontWeight: 500 }}> | + {product?.sales} sold )</h3>
                </div>
                <div className='oksaozk'>
                    <div className='djiiejzoij'>
                        <button onClick={addWishlist}>Add to Wishlist</button>
                        <button onClick={addCompare}>Add to Compare</button>
                    </div>
                    <p>{product.stock} Articles</p>
                    <p>Shipping {product.delivery_price?.toFixed(2)} TND</p>
                </div>

                <div className='Quantity'>
                    <h2> Quantity</h2>
                    <div className='sss'>
                        <InputNumber min={1} value={qty} onChange={setQty} max={product.stock} />
                    </div>
                </div>
                <div className='buy'>
                    <button onClick={addToCart}>put in cart</button>
                    <button
                        className='naw'
                        onClick={event => {
                            if (localStorage.getItem('token')) {
                                // setOpen('Pay')
                                addToCart(event)
                                navigate('/Swiftcart/Cart')
                            } else {
                                setShow(true)
                            }
                        }}
                    >
                        pay now
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductInfo
