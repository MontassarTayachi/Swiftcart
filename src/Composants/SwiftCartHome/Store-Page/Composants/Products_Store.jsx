import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../../config';
import Grid_Product from '../../Product-View/Grid/Grid';
import { Pagination } from 'antd'; // Importez le composant Pagination d'Ant Design
import './Products_Store.css';
import { useStore } from '../StorePage';
import noproductsfound from'../../../../assets/images/no_products_found.gif'
function Products_Store() {
  const { store } = useStore();
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Vous pouvez ajuster ce nombre selon vos besoins
  const[index,setIndex]=useState(1)
  const[indexTo,setIndexTo]=useState(15)
  const[products_count,setProducts_count]=useState(0)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Search?store_id=${store.id}&product_from_index=${index}&product_to_index=${indexTo}&store_from_index=1&store_to_index=1`);
        const data = await response.json();
        setAllProducts(data.products);
        setProducts_count(data.products_count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [store,index,indexTo,currentPage]);

  // Calculer les produits à afficher pour la page actuelle
  
  // Fonction pour changer de page
  const onChangePage = (page,pageSize) => {
    setIndex((page-1)*pageSize+1)
    setIndexTo(page*pageSize)
    window.scrollTo(350,350);
    setCurrentPage(page);

  };

  return (
    <div className='Products_Store778778'>
      <h1>Our products</h1>
    {
      allProducts.length>0?
      <Grid_Product products={allProducts} />
      :
      <div className='no_products_found' style={{width:'100%',height:'400px',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <img style={{width:'auto',height:'70%',}} src={noproductsfound} alt='no_products_found'/>
      </div>
    }
      {
        products_count>15?
        <div style={{display:'flex',justifyContent:'center',width:'100%'}}> 
        <Pagination
        current={currentPage}
        total={products_count}
        pageSize={15}
        onChange={onChangePage}
        showSizeChanger={false}
        hideOnSinglePage={true}
        />
        </div>
        :
        null
    }
    </div>
  );
}

export default Products_Store;
