import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react'
import Grid_Product from '../../Product-View/Grid/Grid';
import { API_BASE_URL } from '../../../../config';
import Filter from './Filtre';
import { Chip } from '@mui/material';
import { useStore } from '../StorePage';
import noproductsfound from'../../../../assets/images/no_products_found.gif'
function Search_In_Store() {
    const { store,filters,setFilters  } = useStore();
    console.log(store)
    const [allProducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const[index,setIndex]=useState(1)
    const[indexTo,setIndexTo]=useState(15)
    const[products_count,setProducts_count]=useState(0)
   
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    
    const onChangePage = (page,pageSize) => {
      setIndex((page-1)*pageSize+1)
      setIndexTo(page*pageSize)
      window.scrollTo(350,350);
      setCurrentPage(page);
    };

    

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/Search?store_id=${store.id}&product_from_index=${index}&product_to_index=${indexTo}${filters.price.min ? `&min_price=${filters.price.min}` : ''}${filters.price.max ? `&max_price=${filters.price.max}` : ''}${filters.selectedCategories.length ? `&subcategories=${filters.selectedCategories.join(',')}` : ''}${filters.selectedGenres.length ? `&genres=${filters.selectedGenres.join(',')}` : ''}${filters.search.length ? `&search=${filters.search}` : ''}&store_from_index=1&store_to_index=1`);
            const data = await response.json();
            setAllProducts(data.products);
            setProducts_count(data.products_count);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [filters, index, indexTo,store]);
  

  const handleDeleteFilter = (filterType, filterValue) => {
    setFilters(prevFilters => {
        const newFilters = { ...prevFilters };
        if (filterType === 'price') {
            newFilters.price = { min: 0, max: 99000 };
        } else {
            newFilters[filterType] = prevFilters[filterType].filter(value => value !== filterValue);
        }
        return newFilters;
    });
  };
  const handleCancelFilter = () => {
    setFilters(prevFilters => ({
        ...prevFilters,
        selectedCategories: [],
        selectedRating: [],
        selectedGenres: [],
        price: { min: 0, max: 99000 }
    }));
  };
    return (
        <div style={{display:'flex',background:'white'}}>
          {store &&  <Filter  filters={filters} setFilters={setFilters}  supcategories={store.category_id}/>} 
             <div style={{width:"100%"}}>
         <div style={{paddingTop:'1em'}}>
         {filters & filters.selectedCategories.length > 0 || filters.selectedGenres.length > 0 || filters.price.min !== 0 || filters.price.max !== 99000 ? <Chip color='secondary' variant='outlined' onDelete={handleCancelFilter} label={'Clear all'}/>: null}
              
         {filters && Object.keys(filters).map(key => {
                    if (key === 'price') {
                        if (filters[key].min === 0 && filters[key].max === 99000) {
                            return null;
                        }
                        return <Chip key={key} onDelete={() => handleDeleteFilter(key)} label={`Price: ${filters[key].min} - ${filters[key].max}`} />;
                    }
                    if (key==='search') {
                        return null;
                    }
                    return  filters[key].map((value, index) => (
                        <Chip 
                            key={`${key}-${value}-${index}`}
                            label={`${value}`}
                            onDelete={() => handleDeleteFilter(key, value)}
                        />
                    ));
                })}
              {
                allProducts.length>0?
                <Grid_Product products={allProducts}/>:
                
                <div className='no_products_found' style={{width:'100%',height:'400px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img style={{width:'auto',height:'70%',}} src={noproductsfound} alt='no_products_found'/>
              </div>
              }
                 
          </div>     
       
        <div style={{width:'100%',display:'flex',alignItems:"center",justifyContent:'center' ,padding:'1em '}}>
            <Pagination
             showSizeChanger={false} 
              current={currentPage}
              onChange={onChangePage}
              pageSize={15}
              total={products_count}
            />
        </div>
      </div>
        </div>
     
    );
  }
  
  export default Search_In_Store;
  