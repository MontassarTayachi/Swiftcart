import { BiMenu } from "react-icons/bi"; 
import React, { useEffect } from 'react';
import SearchCategory from './SearchCategory';
import './Search.css';
import SerchBar from "./SerchBar";

function Search({open,setStoreSearch,setCategorie}) {
  const [open1, setOpen1] = open; // Destructuring the open state and its setter function
  useEffect(() => {
    console.log(open1)
  }, [open1])
  const handleWindowResize = () => {
    if (window.innerWidth < 800) {
      setOpen1(false);
    } else {
      setOpen1(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize); // Corrected the event name here
    handleWindowResize();
    return () => {
      window.removeEventListener('resize', handleWindowResize); // And here
    };
  }, []);
  return (
    <>
      <div style={{display: open1 ? 'block' : 'none',transition:'all 10s ease-in-out !important'}} className='mapSearch7878'>
        <div className="button">
          <h1>Find a store</h1>
          <button onClick={() => setOpen1(!open1)} aria-label="Toggle search" aria-expanded={open1}>
            <BiMenu />
          </button>
        </div>
        <SerchBar setOpen1={setOpen1} setStoreSearch={setStoreSearch}/>
        <div className="SearchCategory">
          <SearchCategory setOpen1={setOpen1} setCategorie={setCategorie}/>
        </div>
      </div>
    </>
  );
}

export default Search;
