import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const UserContext = createContext();

// Renamed for clarity and convention adherence
export const ProductCategoriesProvider = ({ children }) => {
  const [productCategories, setProductCategories] = useState([]);
  const store = JSON.parse(localStorage.getItem('store'));
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        // Safely parsing the localStorage item
        const store = JSON.parse(localStorage.getItem('store'));
        if (!store || !store.category_id) {
          console.error('Store information is not available');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/product_categories?super_category_id=${store.category_id}`);
        const categories = await response.json();
        if (categories.success) {
          setProductCategories(categories.product_categories);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchCategoriesData();
  }, [store.category_id]);

  return (
    <UserContext.Provider value={{ productCategories, setProductCategories }}>
      {children}
    </UserContext.Provider>
  );
};

// Renamed for clarity and convention adherence
export const useProductCategories = () => useContext(UserContext);
