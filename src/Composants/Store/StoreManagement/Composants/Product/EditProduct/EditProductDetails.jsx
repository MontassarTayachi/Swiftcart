import { MdReportGmailerrorred } from "react-icons/md"; 
import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { CgClose } from "react-icons/cg";
import { TextField } from '@mui/material'; 
import './style/EditProductDetails.css';
import Autocomplete from '@mui/material/Autocomplete';
import {useProductCategories} from '../../../../../../Context/product_categories';
import{API_BASE_URL} from '../../../../../../config';
function EditProductDetails({onClose,product, setOpenSnackbar,setUpdated}) {
    const {productCategories} = useProductCategories();
    const[title, setTitle] = React.useState(product.name);
    const[titleError, setTitleError] = React.useState('');
    const[stock, setStock] = React.useState(product.stock);
    const[deliveryPrice, setDeliveryPrice] = React.useState(product.delivery_price);
    const[price, setPrice] = React.useState(product.price);
    const[category, setCategory] = React.useState( product.subcategory);
    const[categoryError, setCategoryError] = React.useState('');
    const [error, setError] = React.useState('');
    const [openSave, setOpenSave] = React.useState(false);
    const Valide=()=>{
        const isvalid= title.trim() !== '' && category !== null && category.name.trim() !== '' 
        if(title.trim() === ''){
            setTitleError('Title is required');}
        else if(title.length < 3){
            setTitleError('Title must be at least 3 characters');}
        else if(title.length > 20){
            setTitleError('Title must be at most 20 characters');}
        else{
            setTitleError('');
        }
        if(category.name.trim()==''|| category==null){
            setCategoryError('Select Category existed in the list');
        }else{
            setCategoryError('');
        }
       
        return isvalid;
    }

    const handelSave=async (e)=>{
        e.preventDefault();
        if(!Valide())  {return;
        }
        try {   
          const formData = new FormData();
          formData.append('name', title);
          formData.append('stock', stock);
          formData.append('subcategory_id', category.id);
          formData.append('delivery_price', deliveryPrice);
          formData.append('price', price);

          const respance=  await fetch(`${API_BASE_URL}/products?store_id=${JSON.parse(localStorage.getItem('store')).id}&&id=${product.id}`, {
            method: 'PUT',
            headers: {
              contentType: 'multipart/form-data',
              Authorization: `${localStorage.getItem('token')}`
            },  
            body: formData
          });
          const res= await respance.json();
          if(res.success){
            setOpenSnackbar(true);
            setUpdated(JSON.stringify({
              name: title,
              stock: stock || null,
              subcategory_id: category.id,
              delivery_price: deliveryPrice || null,
              price: price || null
            }));
            onClose();
           
          }
          else{
            setError(res.message);
           throw new Error(res.message);
          }
        } catch (error) {
          console.log(error);
          
        }
        
    }

    useEffect(() => {
      if(title!==product.name || stock!=product.stock || category.id!==product.subcategory_id || deliveryPrice!=product.delivery_price || price!=product.price){
        setOpenSave(true);
      }
      else
      {
        setOpenSave(false);
      }
    }, [title,stock,category,deliveryPrice,price]);
    return (
    <>
    
    <Backdrop open={true}sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <div className='EditProductDetails'>
        <div className='header'>
          <h1>Edit your Product details</h1>
          <button onClick={onClose}><CgClose /></button>
        </div>
        {error.trim() && <div className="erreur">
            <p> <MdReportGmailerrorred size={25}/>{error}</p>
          </div> } 
        <div className="body">
        <div className="row">
        <div className='input'>
          <label>Product title</label>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter the product title'
            error={titleError.trim() !== ''}
            helperText={titleError}
            type='text'
          ></TextField>
          </div>
          <div className='input'>
          <label>Product stock</label>
          <TextField
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder='Enter the product stock'          
            type='number'
          ></TextField>
          </div>
        </div>
         <div className="row">
          <div className='input'>
          <label>Product category</label>
          <Autocomplete
                id="category"
                error={categoryError.trim() }
                options={productCategories}
                getOptionLabel={(option) => option.name}
                value={category}
                onChange={(e, value) =>{if(value) {setCategory(value)} else {setCategory(
                  {"id": null,
                  "name": '',
                  "description": null,
                  "super_category_id": null}
                )}}}

                renderInput={(params) => <TextField {...params}error={categoryError.trim() } helperText={categoryError} placeholder="Enter the product category"/>}
                freeSolo
               
              isOptionEqualToValue={(option, value) => option.name === value.name}
                sx={{
                  
                  '& .MuiInputBase-input': {
                    fontFamily: 'Franklin Gothic , Arial Narrow, Arial, sans-serif',
                    padding: "0.35rem 1.5rem !important",
                    fontSize: '0.9rem',
                    fontWeight: 400,
                  },
                }}
              />
          </div>
          <div className='input'>
          <label>Product delivery price</label>
          <TextField
            value={deliveryPrice}
            onChange={(e) => setDeliveryPrice(e.target.value)}
            placeholder='Enter the product delivery price'
            type='number'
          ></TextField>
          </div>
        </div>
        <div className="row">
          <div className='input'>
          <label>Product price</label>
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Enter the product price'
            type='number'
          ></TextField>
          </div>
          </div>
       
            
            
       
        </div>
        <div className="button">{openSave?<button onClick={handelSave}>Save Changes</button>:<button style={{cursor:'not-allowed',background:'#d6d6d683',border:'none'}}>Save Changes</button>}</div>

      </div>
    </Backdrop>
    </>
  )
}

export default EditProductDetails