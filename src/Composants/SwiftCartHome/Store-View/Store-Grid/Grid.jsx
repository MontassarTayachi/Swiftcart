import React, { useEffect, useState } from 'react'
import './Grid.css';
import{API_BASE_URL} from '../../../../config';
import StoreItem from '../Store-item/StoreItem';
import { Pagination } from 'antd';
const pageSize = 15;
function Grid_store() {
    const [stores, setStores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
   
    useEffect(() => {
       const fetchStores = async () => {
         const response = await fetch(`${API_BASE_URL}/stores/all`);
         const data = await response.json();
         const totalProducts = data.stores.length;
         const totalPages = Math.ceil(totalProducts / pageSize);
         setTotalPages(totalPages);
         const startIndex = (currentPage - 1) * pageSize;
         const endIndex = Math.min(startIndex + pageSize, totalProducts);
         const pageProducts = data.stores.slice(startIndex, endIndex);
         setStores(pageProducts);
       };

         fetchStores();
    }, [currentPage]);

    const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo(0, 0);
  };
  return (
    <>
    <div className='Grid_Store'>
    {stores.map((store) => (
        <StoreItem  className='card' store={store}/>
    ))}
    
    </div>
    <div style={{display:'flex',justifyContent:'center',width:'100%',margin:'1em 0'}}> 
    <Pagination
                current={currentPage}
                total={totalPages * pageSize} // Set total to total number of products for client-side pagination
                pageSize={pageSize}
                onChange={handlePageChange}
                showSizeChanger={false}
                hideOnSinglePage={true}

            />
    </div>
    </>
  )
}

export default Grid_store