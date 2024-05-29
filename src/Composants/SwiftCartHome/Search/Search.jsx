import React, { useEffect, useState } from 'react'
import Result from './result/Result'
import Nav from './nav/Nav'
import Filter from './filter/Filter'
import './Search.css'
import {API_BASE_URL} from '../../../config'
import{Search as ss} from '../../../Context/SerachBar'
function Search() {
  const [open, setOpen] = React.useState(false);
  const params = new URLSearchParams(window.location.search);
  const{search, setSearch} = ss();
  const [filters, setFilters] = useState({
    sortBy:params.get('sort') ? params.get('sort') : 'popularity',
    page: params.get('page') ? Number(params.get('page')) : 1,
    selectedMerchants: params.getAll('merchants'),
    selectedGenres: params.getAll('genres'),
    price: {
        min: params.get('min') ? Number(params.get('min')) : 0,
        max: params.get('max') ? Number(params.get('max')) : 99000,
    },});

const[index,setIndex]=useState(1)
const[indexTo,setIndexTo]=useState(15)
const[products_count,setProducts_count]=useState(0)
const[stores_count,setStores_count]=useState(0)
useEffect(() => {
    const params = new URLSearchParams();
    filters.sortBy && params.append('sort', filters.sortBy);
    filters.page && params.append('page', filters.page);
    filters.selectedMerchants.forEach(merchant => params.append('merchants', merchant));
    filters.selectedGenres.forEach(genre => params.append('genres', genre));
    if (filters.price.min !== 0) params.append('min', filters.price.min);
    if (filters.price.max !== 99000) params.append('max', filters.price.max);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
}, [filters]);

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
const handDeleteSearch = (filterType, filterValue) => {
  setSearch(prevSearch => {
      const newSearch = { ...prevSearch };
      newSearch[filterType] = prevSearch[filterType].filter(value => value !== filterValue);
      return newSearch;
  })};
const handleCancelFilter = () => {
  setIndex(1);setIndexTo(15);
  setFilters(prevFilters => ({
      ...prevFilters,
      page: 1,
      sortBy: 'popularity',
      selectedMerchants: [],
      selectedGenres: [],
      price: { min: 0, max: 99000 }
  }));
  setSearch(
    prevSearch => ({
      ...prevSearch,
      supcategories: [],
      selectedCategories: [],
  })
  )
};
const[Stores,setStores]=useState([])
const [products, setProducts] = React.useState([])
useEffect(() => {
  const  fetchData = async () => {
    try {
      console.log(search.selectedCategories.join(','))
      const response = await fetch(API_BASE_URL+`/Search?${filters.price.min ? `min_price=${filters.price.min}` : ''}${filters.price.max ? `&max_price=${filters.price.max}` : ''}${search.selectedCategories.length ? `&subcategories=${search.selectedCategories.join(',')}` : ''}${filters.selectedMerchants.length ? `&stores=${filters.selectedMerchants.join(',')}` : ''}${filters.selectedGenres.length ? `&genres=${filters.selectedGenres.join(',')}` : ''}${search.supcategories.length ? `&categories=${search.supcategories.join(',')}` : ''}${search.txt.length ? `&search=${search.txt.join(',')}` : ''}&product_from_index=${index}&product_to_index=${indexTo}&sort=${filters.sortBy}`)
         const data = await response.json()
          setProducts(data.products)
          setProducts_count(data.products_count)
          setStores_count(data.stores_count)
    setStores(data.stores)
   
    } catch (error) {
      console.log(error)
    }
    
  }
  fetchData()
  }, [filters,search,index,indexTo])
  

  return (
   <>
   <div className='search'>
        <div className='navduhziu'>
        <Nav search={search} setSearch={setSearch}/>
        </div>
        <div className='filtersdcsd'>

        <Filter search={search} setSearch={setSearch} onClose={()=>{setOpen(false)}} filters={filters} setFilters={setFilters} open={open}/>
        </div> 
        <div className='result'>
          <Result  setFilters={setFilters} stores_count={stores_count} index={index}indexTo={indexTo} setIndex={setIndex} setIndexTo={setIndexTo} products_count={products_count} Stores={Stores} search={search} products={products}handDeleteSearch={handDeleteSearch} handleCancelFilter={handleCancelFilter} onDeleteFilter={handleDeleteFilter}  filters={filters}   Open={()=>{setOpen(true)}}/>
         </div>      
   </div>
   </>
  )
}

export default Search