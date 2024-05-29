import { CgClose } from "react-icons/cg"; 
import React, { useEffect, useState } from 'react'
import { InputNumber } from 'primereact/inputnumber';
import './Filter.css'
import { Backdrop, Checkbox, FormControlLabel } from '@mui/material';
import {API_BASE_URL} from "../../../../config"
import ValidateurChaine from "../../../../function/ValiderChaine"
function Filter({open,onClose,filters,setFilters,search,setSearch}) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
     try {
      const response = await fetch(API_BASE_URL + `/store_categories?include_subcategories=true&${search.supcategories.length > 0? 'name='+search.supcategories:''}`);
      const data = await response.json();
      setCategories(data.store_categories);
      const response2=await fetch(API_BASE_URL + "/stores/all");
      const data2=await response2.json();
      const marchands=data2.stores.map((store)=>store.name);
      setMarchands(marchands);
     } catch (error) {
      console.log("Fetch data error", error);
     }
    };
    fetchData();
  }, [filters,search]);
   const {  selectedMerchants, selectedGenres, price } = filters;
   const selectedCategories=search.selectedCategories;
   const [min, setMin] = useState(price.min);
  const [max, setMax] = useState(price.max);
   const [marchands, setMarchands] = useState([]);
   


   const handleCategoryChange = (e, categoryId) => {
    if (e.target.checked) {
      setSearch(prevFilters => ({
            ...prevFilters,
            selectedCategories: [...prevFilters.selectedCategories, categoryId],
        }));
    } else {
      setSearch(prevFilters => ({
            ...prevFilters,
            selectedCategories: prevFilters.selectedCategories.filter(id => id !== categoryId),
        }));
    }
};
const handleMerchantChange = (e, merchantName) => {
  if (e.target.checked) {
      setFilters(prevFilters => ({
          ...prevFilters,
          selectedMerchants: [...prevFilters.selectedMerchants, merchantName],
      }));
  } else {
      setFilters(prevFilters => ({
          ...prevFilters,
          selectedMerchants: prevFilters.selectedMerchants.filter(name => name !== merchantName),
      }));
  }
};
const handleGenreChange = (e, genre) => {
  if (e.target.checked) {
      setFilters(prevFilters => ({
          ...prevFilters,
          selectedGenres: [...prevFilters.selectedGenres, genre],
      }));
  } else {
      setFilters(prevFilters => ({
          ...prevFilters,
          selectedGenres: prevFilters.selectedGenres.filter(g => g !== genre),
      }));
  }
};
const handleApplyFilter = () => {
  setFilters(prevFilters => ({
      ...prevFilters,
      price: { min, max }
  }));
};

const handleCancelFilter = () => {
  setFilters(prevFilters => ({
      ...prevFilters,
     
      price: { min: 0, max: 99000 }
  }));
  setMax(99000);
  setMin(0);
};

  return (
   <>
    <div className="aguixjzhzujp">
    <div className="country-item">
              <div className='filter'>
        <div className='Categories'>
            <h1>Categories</h1>
            <div className='CategoriesForm'>
            {categories.map((category) => (
  <div key={category.id}>
    <h2>{category.name}</h2>
    <div className='fils'>
      {category.sub_categories.map((subCategory) => (
        <div key={subCategory.name}>
          <input 
            type="checkbox" 
            id={subCategory.name} 
            onChange={(e) => handleCategoryChange(e, subCategory.name)} 
            name={subCategory.name} 
            value={subCategory.name} 
            checked={selectedCategories.includes(subCategory.name)} // Assurez-vous que la case est cochée si elle est dans les catégories sélectionnées
          />
          <label htmlFor={subCategory.name}>{ValidateurChaine.reduireEtValiderChaine(subCategory.name,20)}</label>
        </div>
      ))}
    </div>
  </div>
))}
            </div>
        </div>

        <div className='price'>
            <h1>Price</h1>   
          <div className='PriceForm'>
          <div className="flex-auto">
                <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Max Price</label>
                <InputNumber style={{ height: "3rem" }} inputId="max-price" value={max} onValueChange={(e) => setMax(e.value)} max={99000} min={0} showButtons buttonLayout="horizontal" step={0.25}
                decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                mode="currency" currency="TND" />
            </div>
            <div className="flex-auto">
                <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Min Price</label>
                <InputNumber style={{height:"3rem"}} inputId="horizontssqal-buttons" value={min} onValueChange={(e) => setMin(e.target.value)} showButtons buttonLayout="horizontal" step={0.25}
                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" max={99000} min={0} incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    mode="currency" currency="TND" />
            </div>
            <div className='button'>
               <button className='xoia' onClick={handleApplyFilter}>Filter</button> 
               <button className='zoi'onClick={handleCancelFilter}>Cancel</button> 
            </div>
          </div>
        </div>
        <div className='Merchants'>
          <h1>Merchants</h1>
          <div className='MarchandsForm'>
          {marchands.map((name) => (
           <div key={name}>
           <input
           type="checkbox" 
           name={name}
           value={name}
           checked={selectedMerchants.includes(name)} 
             onChange={(e) => handleMerchantChange(e, name)}
           />
           <label htmlFor={name}>{ValidateurChaine.reduireEtValiderChaine(name,20)}</label>
     
           </div>
     ))}
          </div>
        </div>
        <div className='Genres'>
              <h1>Genres</h1>
              <div className='GenresForm'>
              {['Homme', 'Femme', 'Autre'].map((genre) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={genre}
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={(e) => handleGenreChange(e, genre)}
                />
              }
              label={genre}
              key={genre}
            />
          ))}

        </div>
        </div>
    </div>
          </div>
    </div>
    <Backdrop open={open}sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <div className='dkdks468zzoedk'>
      <div className='uidehz'>
      <h1>Filter</h1>
      <button onClick={onClose}><CgClose /></button>
      </div>
      <div className="country-item">
      <div className='filter'>
        <div className='Categories'>
            <h1>Categories</h1>
            <div className='CategoriesForm'>
            {categories.map((category) => (
  <div key={category.id}>
    <h2>{category.name}</h2>
    <div className='fils'>
      {category.sub_categories.map((subCategory) => (
        <div key={subCategory.name}>
          <input 
            type="checkbox" 
            id={subCategory.name} 
            onChange={(e) => handleCategoryChange(e, subCategory.name)} 
            name={subCategory.name} 
            value={subCategory.name} 
            checked={selectedCategories.includes(subCategory.name)} // Assurez-vous que la case est cochée si elle est dans les catégories sélectionnées
          />
          <label htmlFor={subCategory.name}>{ValidateurChaine.reduireEtValiderChaine(subCategory.name,20)}</label>
        </div>
      ))}
    </div>
  </div>
))}
            </div>
        </div>

        <div className='price'>
            <h1>Price</h1>   
          <div className='PriceForm'>
          <div className="flex-auto">
                <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Max Price</label>
                <InputNumber style={{ height: "3rem" }} inputId="max-price" value={max} onValueChange={(e) => setMax(e.value)} max={99000} min={0} showButtons buttonLayout="horizontal" step={0.25}
                decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                mode="currency" currency="TND" />
            </div>
            <div className="flex-auto">
                <label htmlFor="horizontal-buttons" className="font-bold block mb-2">Min Price</label>
                <InputNumber style={{height:"3rem"}} inputId="horizontssqal-buttons" value={min} onValueChange={(e) => setMin(e.target.value)} showButtons buttonLayout="horizontal" step={0.25}
                    decrementButtonClassName="p-button-danger" incrementButtonClassName="p-button-success" max={99000} min={0} incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    mode="currency" currency="TND" />
            </div>
            <div className='button'>
               <button className='xoia' onClick={handleApplyFilter}>Filter</button> 
               <button className='zoi'onClick={handleCancelFilter}>Cancel</button> 
            </div>
          </div>
        </div>
        <div className='Merchants'>
          <h1>Merchants</h1>
          <div className='MarchandsForm'>
          {marchands.map((name) => (
           <div key={name}>
           <input
           type="checkbox" 
           name={name}
           value={name}
           checked={selectedMerchants.includes(name)} 
             onChange={(e) => handleMerchantChange(e, name)}
           />
           <label htmlFor={name}>{ValidateurChaine.reduireEtValiderChaine(name,20)}</label>
     
           </div>
     ))}
          </div>
        </div>
        <div className='Genres'>
              <h1>Genres</h1>
              <div className='GenresForm'>
              {['Homme', 'Femme', 'Autre'].map((genre) => (
            <FormControlLabel
              control={
                <Checkbox
                  name={genre}
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={(e) => handleGenreChange(e, genre)}
                />
              }
              label={genre}
              key={genre}
            />
          ))}

        </div>
        </div>
    </div>
           
          </div>
      <div className="button" onClick={onClose}><button className="close">Close</button></div>
   
    </div>

    </Backdrop>

   </>
  )
}

export default Filter