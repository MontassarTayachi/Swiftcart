import React from 'react'
import { Categories } from '../../../../Context/StoreCategories'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
function SearchCategory({setCategorie,setOpen1}) {
    const {storeCategories} = Categories();
    return (
    <div className='select_by_category '>
      <h2>Select by category </h2>
       {storeCategories.map((category) => (
        <div>
            <FormControlLabel  control={<Checkbox name={category.name} value={category.id} 
            onChange={(e) => {
                if(e.target.checked){
                  setCategorie((prev)=>[...prev,category.id])
                  if(window.innerWidth<800){
                    setOpen1(false)
                  }

                }else{
                  setCategorie((prev)=>prev.filter((id)=>id!==category.id))
                  if(window.innerWidth<800){
                    setOpen1(false) }
                }
             
              }}
            
            />} label={category.name}/>
        </div>
    ))} 
    </div>
  )
}

export default SearchCategory