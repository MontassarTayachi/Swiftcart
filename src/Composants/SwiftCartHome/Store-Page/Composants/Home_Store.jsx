import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../config';
import'./Home_Store.css'
import { useStore } from '../StorePage';
import Scroll_Horizontal from '../../Product-View/Scroll_Horizontal/Scroll_Horizontal';
function Home_Store() {
  const { store,filters,setFilters  } = useStore();
  const [categories, setCategories] = useState([]);
  const [new_products, setNew_Products] = useState([]);
  const[popularity_products,setPopularity_Products]=useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API_BASE_URL}/product_categories?super_category_id=${store?.category_id}`);
      const data = await response.json();
      setCategories(data.product_categories);
    };
    const fetchNewProducts = async () => {
      const response = await fetch(`${API_BASE_URL}/search?store_id=${store?.id}&sort=date_added&product_from_index=2&product_to_index=10&store_from_index=1&store_to_index=1`);
      const data = await response.json();
      setNew_Products(data.products);
    };
    const fetchPopularityProducts = async () => {
      const response = await fetch(`${API_BASE_URL}/search?store_id=${store?.id}&sort=popularity&product_from_index=2&product_to_index=10&store_from_index=1&store_to_index=1`);
      const data = await response.json();
      setPopularity_Products(data.products);
    };
  
    fetchCategories();
    fetchNewProducts();
    fetchPopularityProducts();
  }, []);
  
  const handleClick = (category) => {
    setFilters({
      ...filters,
      selectedCategories: [category],
    });
    navigate(`/Swiftcart/StorePage/${store.id}/search?Categories=${category}`);
  }
  return (
    <>
    <div  className='Home_Store8487778487'> 
      <div className='header'> 
      <img src={store?.cover_image} alt={store?.name} />
      <div className='bady'>
        <h1>Shop with Us</h1>
        <p>Shop for your favorite products</p>
        <div>
          <button onClick={()=>{navigate(  `/Swiftcart/StorePage/${store.id}/products`  )}}>Shop Now</button>
        </div>
      </div>
 
      </div>
      <div className='ShopByCategory'><h2>Shop By Category</h2></div>
     
   
    <div  className='Home_Store87787'>
    
      {
        categories && categories.map((category) => (
          <div className='images' onClick={()=>handleClick(category.name)} key={category.id}>
           <img src={category.image} alt={category.name} />
           <div className='category'>
           <h1> {category.name}</h1>
            <div className='border2'></div>
             <p>Shop Now</p>
            </div>
          </div>
        ))
      }
    </div>
    </div>
    {
      new_products.length>0&&
      <Scroll_Horizontal
      products={new_products}
      style={{
        margin:'0',
        fontFamily: 'monospace',
        fontSize:'1em',
      }}
      name='New Products'
      navigateClick={`/Swiftcart/StorePage/${store.id}/products`}
      />
    }
    {
      popularity_products.length>0&&
      <Scroll_Horizontal
      style={{
        fontSize:'1em',
        margin:'0',
        fontFamily: 'monospace',
      }}
      products={popularity_products}
      name='Popular products'
      navigateClick={`/Swiftcart/StorePage/${store.id}/products`}
      />
    }
    </>
  )
}

export default Home_Store