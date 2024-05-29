import { IoIosArrowBack } from "react-icons/io"; 
import React, { useState } from 'react'
import './Style/Two.css'
import { GrFormNext } from 'react-icons/gr'
import { IconButton, InputAdornment } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { TextField } from '@mui/material';
function Steptwo({openPage3,openPage1,function1,Storename}) {
    const [firstNameError,setFirstNameError]=useState(false);
    const [name, setName] = useState(Storename);
    const validname=()=>{
      if(name===''){
        setFirstNameError(true);
      }
      else{
        setFirstNameError(false);
        openPage3();
        function1(name);
      }
     }
    const handnameChange=(e)=>{setName(e.target.value);} ;
  return (
<div className='two'>
  <div className='header'>    
    <h1>Please enter the name of your store:</h1>
    <h2>Choose a name that reflects your brand and is easy for your customers .</h2>
  </div>
  <div className='main'>
        <TextField
            error={firstNameError} // Ajouter la prop error
            helperText={firstNameError ? "Please enter the name of your store:" : ""}                
            onChange={handnameChange}    
            className='TextField'
            placeholder="Enter the name of your store "
            value={name}
            InputProps={{
            endAdornment: firstNameError && (
            <InputAdornment position='end'>
                <IconButton aria-label='error' edge='end'>
                    <ErrorOutlineIcon color='error' />
                </IconButton>
            </InputAdornment>),}}/>
    
  </div>
  <div className='footer'>
    <button onClick={openPage1} className="back"><IoIosArrowBack className="IoIosArrowBack"/>Back</button>
    <div className='ss'>
    <button className='skip'>  
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

export default Steptwo