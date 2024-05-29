import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../../config'
import Scroll_Horizontal from '../Product-View/Scroll_Horizontal/Scroll_Horizontal'
function RecentlyViewedArticles({ style }) {
    const [product, setProduct] = useState([])
    const Recently_viewed_articles = JSON.parse(localStorage.getItem('Recently_viewed_articles')) || []
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(API_BASE_URL + `/products/all?id=${Recently_viewed_articles.join(',')}&&id_is_array=true`)
                const data = await response.json()
                if (data.products.length > 0) {
                    setProduct(data.products)
                } else {
                    setProduct([])
                }
            } catch (error) {}
        }
        fetchProduct()
    }, [])

    return (
        <>
            {Recently_viewed_articles.length > 0 && product.length > 0 && (
                <div style={{ background: 'white', margin: '0' }}>
                    {' '}
                    <Scroll_Horizontal style={style} navigateClick={'/Swiftcart/Browsing History'} products={product} card={true} name={' Your Browsing History'} />
                </div>
            )}
        </>
    )
}

export default RecentlyViewedArticles
