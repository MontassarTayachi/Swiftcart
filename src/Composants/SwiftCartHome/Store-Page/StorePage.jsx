import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Composants/Navbar'
import Navigate from '../NavBar/Navigate'
import { Outlet, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../../config'
 
const StoreProvider = createContext();
function StorePage() {

    let idStore = useParams().id
    const [store, setStore] = useState(null);
   
    useEffect(() => {
       const fetchStores = async () => {
         const response = await fetch(`${API_BASE_URL}/stores/all?id=${idStore}`);
         const data = await response.json();
         setStore(data.stores[0]);
       };
         fetchStores();
    }, []);
    useEffect(() => {
      console.log(store)
    }, [store])

    useEffect(() => { 
     window.scrollTo(0, 0)
    }
    , [])

    const params = new URLSearchParams(window.location.search);
    const [filters, setFilters] = useState({
      selectedGenres: params.getAll('genres') || [],
      selectedCategories: params.getAll('Categories') || [],
      selectedRating: params.getAll('rating') || [],
      search: params.get('search') || '',
      price: {
          min: params.get('min') ? Number(params.get('min')) : 0,
          max: params.get('max') ? Number(params.get('max')) : 99000,
      },});
      useEffect(() => {
        const params = new URLSearchParams();
        filters.selectedGenres.forEach(genre => params.append('genres', genre));
        filters.selectedCategories.forEach(subcategory => params.append('Categories', subcategory));
        filters.search && params.append('search', filters.search);
        filters.selectedRating.forEach(rating => params.append('rating', rating));
        if (filters.price.min !== 0) params.append('min', filters.price.min);
        if (filters.price.max !== 99000) params.append('max', filters.price.max);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
    }, [filters]); 
    const [isNavbarFixed, setIsNavbarFixed] = useState(false); // Nouvel état pour la fixation de la barre de navigation

    useEffect(() => {
      const handleScroll = () => {
          setIsNavbarFixed(window.scrollY > 350); // Mettre à jour l'état en fonction de la position de défilement
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  return (
    <StoreProvider.Provider value={{ store, filters, setFilters }}>
    <div>
        <Navigate number={2}></Navigate>
      <Navbar store={store} filters={filters}  setFilters={setFilters}/>
      <div style={{ marginTop: isNavbarFixed ? '5rem' : '0' }}>
      {store&&<Outlet  ></Outlet>}
    </div>
    </div>
    </StoreProvider.Provider>
  )
}
export const useStore = () => React.useContext(StoreProvider);
export default StorePage