import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './Style/MyProduct.css';
import { Link, useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { API_BASE_URL } from '../../../../../../config';
import DeleteProduct from '../DeleteProduct/DeleteProduct';
import Snackbar from '@mui/material/Snackbar';
import Rating from '@mui/material/Rating';
import {MdDelete } from "react-icons/md";

const MyProduct = () => {
  const[products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const[open, setOpen] = useState('');
  const[id,setID] = useState('');
  const handleEdit = (row) => {
     navigate(`../Product/edit/${row.id}`, { state: { products: row } });
  };

  const handleDelete = (event,id) => {
    event.stopPropagation();
    setID(id);
   setOpen('delete');
 
  };
  useEffect(() => {
    const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?store_id=${JSON.parse(localStorage.getItem('store')).id}`,
      {method: 'GET',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
          },
          });
      const data = await response.json();
      if(data.success){
      setProducts(data.products)}
     else{
     
      throw new Error(data.message);
     }
    } catch (error) {
     console.log( error.message);
     setProducts([]);
    }
    };
    fetchProducts();
    console.log('products', products);
  }, [open]);

  const columns = [
    {
      field: 'media',
      headerName: 'Image',
      width: 90,
      renderCell: (params) => (
        <img src={params.value? params.value[0]:'https://www.soon7.net/wp-content/uploads/2017/10/placeholder-1.png'} alt="product" style={{ height: 30, borderRadius: '5px' }} />
      ),
    },
    { field: 'name', headerName: 'Name', width: 90 },
    { field: 'rating', headerName: 'Rating', width: 130, renderCell: (params) => (
      <Rating name="read-only" style={{fontSize:'1.1em'}} value={params.value} readOnly />
    )}
    ,
    { field: 'stock', headerName: 'stock', width: 130 }, 
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'delivery_price', headerName: 'delivery_price', width: 130 },
    { field: 'subcategory', headerName: 'Category', width: 130, valueGetter: (params) => {
      return params.value.name;
    }},
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <div className="edit">
          <button onClick={() => handleEdit(params.row)} className='edit-MyProduct-0'>
            <BiEdit />
          </button>
          <button onClick={(event) => handleDelete(event,params.row.id)} className='delete-MyProduct-1'>
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ];
  const handDeleteProducts = () => {

    selectedProducts.map((product) => {
      fetch(`${API_BASE_URL}/products?store_id=${JSON.parse(localStorage.getItem('store')).id}&&id=${product}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            setOpen('Snackbar');
        }})})
}
  const CustomToolbar = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <GridToolbar />
         {selectedProducts.length > 0 && <div onClick={handDeleteProducts}className='css-1knaqv7-MuiButtonBase-root-MuiButton-root' >
            <MdDelete /> Delete Selected
        </div>}
      </div>
    );
  };
  useEffect(() => {
    console.log('products', selectedProducts);
  }, [selectedProducts]);
 

  return (
    <>
      {open==='Snackbar'&&<Snackbar
        open={true}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={5000}
        onClose={()=>{setOpen('')} }
        message="Products delete successfully."
      />}
    {open==='delete' && <DeleteProduct id={id} onClose={setOpen}></DeleteProduct>}
    <div className="MyProduct">
      <div className="header">
        <h2>My product</h2>
        <Link style={{ textDecoration: 'none' }} to={"../Product/new"}>
          <button>
            <MdAdd /> Add Product
          </button>
        </Link>
      </div>
      <div className="card" style={{ height: 500 }}>
        <DataGrid
          rows={products}
          columns={columns}
          components={{
            Toolbar: () => <CustomToolbar/>,
          }}
          onRowSelectionModelChange={(newSelection) => {
            setSelectedProducts(newSelection);
          }
          }
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div></>
  );
};

export default MyProduct;





