import { BiErrorCircle } from "react-icons/bi"; 
import { IoIosArrowBack } from "react-icons/io"; 
import React, { useState } from 'react'
import './Style/Three.css'
import { GrFormNext } from 'react-icons/gr'
import Autocomplete from '@mui/material/Autocomplete';
import{Categories} from '../../../Context/StoreCategories';
import { TextField } from "@mui/material";

function Stepthree({openPage2,openPage4,function1,Storecategory}) {
    const [firstNameError,setFirstNameError]=useState(false);
    const [category, setcategory] = useState(Storecategory);
    const {storeCategories} = Categories();
    console.log(storeCategories);
   
    const validname=()=>{
      if(category==''||category==null){
        setFirstNameError(true);
      }
      else{
        setFirstNameError(false);
        openPage4();
        function1(category);
      }
     }
    
   
  return (
    <div className='three'>
    <div className='header'>    
    <h1>Choose your store category:</h1>

    <h2>Select the category that best describes your store's products or services. </h2>
  </div>
  <div className='main'>
  <Autocomplete
     className="TextField"
     value={category}
     options={storeCategories}
     getOptionLabel={(option) => option.name} 
     renderInput={(params) => <TextField {...params}error={firstNameError}  
                helperText={firstNameError ? "Category is required." : ""}
                placeholder="Choose a Category"/>}
     onChange={(event, newValue) => {
       setcategory(newValue);
     }}
/>

      </div>
    
      <div className='footer'>
    <button onClick={openPage2} className="back"><IoIosArrowBack className="IoIosArrowBack"/>Back</button>
    <div className='ss'>
    <button o className='skip'>  
        Skip
    </button>
    <button onClick={validname} className='next'>  
        Next<GrFormNext className="GrFormNext" />
    </button>
    </div>
  </div>
</div>
  )
}

export default Stepthree
