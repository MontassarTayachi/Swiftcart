import React, { useEffect, useState } from 'react';
import Grid_Product from '../../Product-View/Grid/Grid';
import { Dropdown } from 'react-bootstrap';
import './Result.css';
import Chip from '@mui/material/Chip';
import { RiFilter3Line } from "react-icons/ri";
import Scroll_Horizontal from '../../Store-View/Scroll_Horizontal/Scroll_Horizontal';
import noproductsfound from '../../../../assets/images/no_products_found.gif';
import { Pagination } from 'antd';
function Result({setFilters,stores_count,Stores,filters, Open,onDeleteFilter,handleCancelFilter,products,search,handDeleteSearch,products_count,index,indexTo,setIndex,setIndexTo}) {
    useEffect(() => {
        setFilters(prevFilters => ({
            ...prevFilters,
            page: 1,
        }));
    }, [filters.selectedMerchants, filters.selectedGenres, filters.price.min, filters.price.max, search.selectedCategories,search.supcategories,search.txt]);
    return (
        <div className='Result'>
            <div className='ResultNav'>
                <div className='navaa'>
                    <p>{products_count>15  && <>{index} - {indexTo} of</>} {products_count} results of Products</p>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {filters.sortBy === 'popularity' ? 'Popularity' : filters.sortBy === 'rating' ? 'Rating' : filters.sortBy === 'ascending_price' ? 'Ascending price' : filters.sortBy === 'descending_price' ? 'Descending price' : filters.sortBy === 'most_selled' ? 'Best seller' : 'Sort by'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{padding:'1em'}}>
                            <Dropdown.Item onClick={() => { setIndex(1);setIndexTo(15);setFilters(prevFilters => ({...prevFilters,sortBy: 'popularity',page:1 }));}}>Popularity</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setIndex(1);setIndexTo(15);setFilters(prevFilters => ({...prevFilters,sortBy: 'rating',page:1 }));}}>Rating</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setIndex(1);setIndexTo(15);setFilters(prevFilters => ({...prevFilters,sortBy: 'ascending_price',page:1 }));}}>Ascending price</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setIndex(1);setIndexTo(15);setFilters(prevFilters => ({...prevFilters,sortBy: 'descending_price',page:1 }));}}>Descending price</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setIndex(1);setIndexTo(15);setFilters(prevFilters => ({...prevFilters,sortBy: 'most_selled',page:1 }));}}>Best seller</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <button className="button" onClick={Open}><RiFilter3Line />Filter</button>
                {search.selectedCategories.length > 0 || filters.selectedMerchants.length > 0 || filters.selectedGenres.length > 0 || filters.price.min !== 0 || filters.price.max !== 99000 ? <Chip color='secondary' variant='outlined' onDelete={handleCancelFilter} label={'Clear all'}/>: null}
                {filters && Object.keys(filters).map(key => {
                    if(key==='sortBy'||key==='page') return null;
                    if (key === 'price') {
                        if (filters[key].min === 0 && filters[key].max === 99000) {
                            return null;
                        }
                        return <Chip key={key} onDelete={() => onDeleteFilter(key)} label={`Price: ${filters[key].min} - ${filters[key].max}`} />;
                    }
                    
                    return filters[key].map((value, index) => (
                        <Chip 
                            key={`${key}-${value}-${index}`}
                            label={`${value}`}
                            onDelete={() => onDeleteFilter(key, value)}
                        />
                    ));
                })}
                {search && Object.keys(search).map(key => {
                    if (key === 'selectedCategories'||key === 'supcategories') {
                        return search[key].map((value, index) => (
                            <Chip 
                                key={`${key}-${value}-${index}`}
                                label={`${value}`}
                                onDelete={() => handDeleteSearch(key, value)}
                            />
                        ));
                    }
                    else
                    return null;


                })}

            </div>
            <div className='ResultFilter'></div>
            <div style={{width:'100%'}}>
                {
                    Stores.length>0 ?  <Scroll_Horizontal stores={Stores} name={`Stores (${stores_count})`}/>:
                    <h1 style={{fontSize:'1.1em',fontWeight:'500',color:'rgb(26, 25, 25)',marginBottom:'1em'}}>No stores found</h1>
                }
          
            </div>
          
             {products.length>0?    <div style={{padding:'0.2em'}}> <h1 style={{fontSize:'1.1em',fontWeight:'500',color:'rgb(26, 25, 25)',marginBottom:'1em'}}>Products</h1>
       <Grid_Product products={products}/>  </div>: 
       <div className='no_products_found' style={{width:'100%',height:'400px',display:'flex',alignItems:'center',justifyContent:'center'}}>
       <img style={{width:'auto',height:'70%',}} src={noproductsfound} alt='no_products_found'/>
     </div>
       }
                <div style={{display:'flex',justifyContent:'center',width:'100%'}}> 
                {
                    products_count>15 && 
                    <Pagination 
                    defaultCurrent={1}
                    showSizeChanger={false} 
                    pageSize={15} 
                    total={products_count} 
                    current={
                        filters.page
                    }
                    onChange={(page, pageSize) => {
                        setIndex((page-1)*pageSize+1)
                        setIndexTo(page*pageSize)
                        window.scrollTo(0, 0);
                        setFilters(prevFilters => ({
                            ...prevFilters,
                            page: page
                        }));
                    }
                    }
                    />
                }
                </div>
          
          
        </div>
    );
}

export default Result;
