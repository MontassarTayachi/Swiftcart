import { GrFormNext } from "react-icons/gr"; 
import { GrFormNextLink } from "react-icons/gr"; 
import React, { useState } from 'react';
import './Style/one.css';
import Radio from '@mui/joy/Radio'; // Correction: '@mui/joy/Radio' à '@mui/material/Radio'
import RadioGroup from '@mui/joy/RadioGroup'; // Correction: '@mui/joy/RadioGroup' à '@mui/material/RadioGroup'
import List from '@mui/joy/List'; // Correction: '@mui/joy/List' à '@mui/material/List'
import ListItem from '@mui/joy/ListItem'; // Correction: '@mui/joy/ListItem' à '@mui/material/ListItem'
import { useNavigate } from "react-router-dom";

function Stepone({openPage2,businesneed,function1}) {
  const [businesneeds, setBusinesneeds] = useState(businesneed);
  const navigate = useNavigate();

  const handlebusinesneedslChange = (e) => {
    setBusinesneeds(e.target.value);
  };
const validate=()=>{
  function1(businesneeds);
  openPage2();
}
  return (
    <div className='one'>
      <div className='header'>
        <h1>Let’s get started. Which of these best describes you?</h1>
        <h2>We’ll help you get set up based on your business needs.</h2>
      </div>
      <div className='main'>
        <RadioGroup sx={{ width: '100%' }} value={businesneeds} onChange={handlebusinesneedslChange}>
          <List
            className='list-group'
            sx={{
              minWidth: 240,
              '--ListItem-paddingY': '1rem',
              '--ListItem-radius': '8px',
              '--ListItemDecorator-size': '32px',
            }}
          >
            <ListItem className='item' variant='outlined' sx={{ boxShadow: 'sm' }}>
              <Radio
                overlay
                value='fasle' 
                label={`Only online store`}
                sx={{ flexGrow: 1 }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        border: '2px solid',
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>

            <ListItem className='item' variant='outlined' sx={{ boxShadow: 'sm' }}>
              <Radio
                overlay
                value='true' // Correction: Définir la valeur pour cet élément Radio
                label={`I'have a real store`}
                sx={{ flexGrow: 1 }}
                slotProps={{
                  action: ({ checked }) => ({
                    sx: (theme) => ({
                      ...(checked && {
                        border: '2px solid',
                        borderColor: theme.vars.palette.primary[500],
                      }),
                    }),
                  }),
                }}
              />
            </ListItem>
          </List>
        </RadioGroup>
      </div>
      <div className='footer'>
        <button onClick={()=>{navigate('/Swiftcart/MyStores')}} className='skip'>Cancel</button>
        <div className="uyxgzaiuhxiu">
        <button onClick={openPage2} className='skip'>  
            Skip
        </button>
        <button onClick={validate} className='next'>  
            Next<GrFormNext className="GrFormNext" />
        </button> 
        </div>
      </div>
    </div>
  );
}

export default Stepone;
