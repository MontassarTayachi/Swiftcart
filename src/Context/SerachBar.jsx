import React, { createContext, useContext, useEffect, useState } from 'react'
const SerachBarContext = createContext();

export const SerachBar=({children})=> {
    const params = new URLSearchParams(window.location.search);
    
   
  const [search, setSearch] = useState({
    selectedCategories: params.getAll('categories'),
    supcategories: params.getAll('supcategories'),
    txt: params.getAll('txt'),
  });
 
  useEffect(() => {
    const params = new URLSearchParams();
    search.selectedCategories.forEach(category => params.append('categories', category));
    search.supcategories.forEach(subcategory => params.append('supcategories', subcategory));
    search.txt.forEach(txt => params.append('txt', txt));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [search]);

  return (
    <SerachBarContext.Provider value={{search,setSearch}}>
        {children}
    </SerachBarContext.Provider>
  )
}


export const Search = () => useContext(SerachBarContext);