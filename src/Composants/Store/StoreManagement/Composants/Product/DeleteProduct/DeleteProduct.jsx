import { AiFillDelete } from "react-icons/ai"; 
import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import { MdReportGmailerrorred } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import {API_BASE_URL} from '../../../../../../config';
import './DeleteProduct.css'
function DeleteProduct({onClose,id}) {
    const handDeleteProduct = () => {
        fetch(`${API_BASE_URL}/products?store_id=${JSON.parse(localStorage.getItem('store')).id}&&id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                onClose('Snackbar');
                
            }
            console.log(data)
        })
    }
  return (
   <>
   <Backdrop className="backdrop"  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
    <div className="delete-product">
        <div className="delete-product-header">
            <h1>Delete Product</h1>
          <button onClick={()=>{onClose('')}}><AiOutlineClose /></button>
        </div>
        <div className="delete-product-body">
            <MdReportGmailerrorred className="icon" />
            <p>Are you sure you want to delete this product?</p>
        </div>
        <div className="delete-product-footer">
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="delete"onClick={handDeleteProduct}><AiFillDelete className="icon" /> Delete</button>
        </div>
    </div>
    </Backdrop>

   </>
  )
}

export default DeleteProduct