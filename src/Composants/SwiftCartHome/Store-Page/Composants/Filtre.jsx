import { CgClose } from "react-icons/cg"; 
import React, { useEffect, useState } from 'react'
import { InputNumber } from 'primereact/inputnumber';
import './Filter.css'
import { Backdrop, Checkbox, FormControlLabel } from '@mui/material';
import {API_BASE_URL} from "../../../../config"
import ValidateurChaine from "../../../../function/ValiderChaine"
function Filter({supcategories,filters,setFilters}) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
     try {
      const response = await fetch(API_BASE_URL + `/store_categories?include_subcategories=true&id=${supcategories}`);
      const data = await response.json();
      setCategories(data.store_categories);    
     } catch (error) {
      console.log("Fetch data error", error);
     }
    };
    fetchData();
  }, []);
    const {selectedGenres, price ,selectedCategories,selectedRating} =filters;
    const [min, setMin] = useState(price.min);
    const [max, setMax] = useState(price.max);
    const handleCategoryChange = (e, categoryId) => {
      if (e.target.checked) {
        setFilters(prevFilters => ({
              ...prevFilters,
              selectedCategories: [...prevFilters.selectedCategories, categoryId],
          }));
      } else {
        setFilters(prevFilters => ({
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
            name={subCategory.name} 
            value={subCategory.name} 
            onChange={(e) => handleCategoryChange(e, subCategory.name)}
            checked={selectedCategories.includes(subCategory.name)}

             // Assurez-vous que la case est cochée si elle est dans les catégories sélectionnées
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
               <button className='xoia' 
                onClick={handleApplyFilter} >Filter</button> 
               <button onClick={handleCancelFilter}className='zoi'>Cancel</button> 
            </div>
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
                  onChange={(e) => handleGenreChange(e, genre)}
                  checked={selectedGenres.includes(genre)}
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


   </>
  )
}

export default Filter