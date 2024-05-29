import React, { useEffect, useState } from 'react'
import Grid_Product from '../Product-View/Grid/Grid'
import { API_BASE_URL } from '../../../config'
import Navigate from '../NavBar/Navigate'
import { Pagination } from 'antd'
import './Recently_viewed_articles_Grid.css'
function Recently_viewed_articles_Grid() {
    const [product, setProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [index, setIndex] = useState(1)
    const [indexTo, setIndexTo] = useState(15)
    const [products_count, setProducts_count] = useState(0)
    const Recently_viewed_articles = JSON.parse(localStorage.getItem('Recently_viewed_articles')) || []
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (Recently_viewed_articles.length > 0) {
                    const response = await fetch(API_BASE_URL + `/Search?id=${Recently_viewed_articles.join(',')}&product_from_index=${index}&product_to_index=${indexTo}`)
                    const data = await response.json()
                    setProduct(data.products)
                    setProducts_count(data.products_count)
                }
            } catch (error) {}
        }
        fetchProduct()
    }, [])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])
    const onChangePage = (page, pageSize) => {
        setIndex((page - 1) * pageSize + 1)
        setIndexTo(page * pageSize)
        setCurrentPage(page)
    }
    return (
        <div>
            <Navigate number={1}></Navigate>
            {product.length > 0 && (
                <div className='BrowsingHistory787'>
                    <h1>Your Browsing History</h1>
                    <Grid_Product products={product} />
                    <div className='Pagination'>
                        <Pagination showSizeChanger={false} current={currentPage} onChange={onChangePage} pageSize={15} total={products_count} />
                    </div>
                </div>
            )}{' '}
        </div>
    )
}

export default Recently_viewed_articles_Grid
