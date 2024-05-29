import { BiRightArrowAlt } from "react-icons/bi"; 
import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './Order.css';
import { API_BASE_URL } from '../../../../../config';
import OrderItem from "./OrderItem";
import Analytics_bar from "./Analytics_bar";
const Order = () => {
  const[orders, setOrders] = useState([]);
  const[open, setOpen] = useState(false);
  const[order, setOrder] = useState({});
  const [statusArray, setStatusArray] = useState(['Pending', 'Accepted', 'On_delivery']);
  useEffect(() => {
    const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/store?store_id=${JSON.parse(localStorage.getItem('store')).id}&status=${statusArray.join(',')}&status_is_array=true`,
      {method: 'GET',
       headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
          },
          });
      const data = await response.json();
      if(data.success){
        const processedOrders = data.orders.map(order => ({
          ...order,
          total: order.quantity * order.product_price +order.product_delivery_price // Add a total field
        }));
        setOrders(processedOrders);}  
     else{
     
      throw new Error(data.message);
     }

    } catch (error) {
     console.log( error.message);
     setOrders([]);
    }
    };
    fetchProducts();
  }, [open, statusArray]);

  const columns = [
    {
      field:'id',
      width:50,
      headerName:'Id',
      renderCell: (params) => (
        <p className='alinejjjsjjs777'>#{params.value}</p>
        )

    },
    {
      field: 'buyer',
      headerName: 'Customer',
      width:200,
      renderCell: (params) => (
       <div className='buyer'>
        <img src={params.value.image}></img>
        <p>{params.value.first_name +'  ' + params.value.last_name}</p>
       </div>   ),
    }, 
    {
      field:'phone_number',
      width:140,
      headerName:'Phone Number',
      renderCell: (params) => (
        <p className='alinejjjsjjs777'>{params.value}</p>
        )
    },  
    {
      field:"created_at",
      headerName:'Date',
      width:150,
      renderCell: (params) => {
        const date = new Date(params.value);
        const dateString = date.toLocaleString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC',
        });
        return (
        <p className='alinejjjsjjs777'>{dateString}</p>
        )}
           
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <p className={`status8984984 ${params.value}`} >{params.value}</p>
      ),
    },
    {
      field:'payment_method',
      width:150,
      headerName:'Payment Method',
      renderCell: (params) => (
        <p className='alinejjjsjjs777'>{params.value}</p>
        )
    },
      {
        field: 'total',
        headerName: 'Total',
        width: 130,
        renderCell: (params) => (
          <p className='alinejjjsjjs777'>{params.value} TND</p>
        )
      },
  
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      renderCell: (params) => (
        <div className="consuler888887-79">
          <button  className='edit-MyProduct-0489'
          onClick={(event) => {
            event.stopPropagation();
            setOpen(true);
            setOrder(params.row);
          }
          }
          >
            <BiRightArrowAlt />
          </button>
          
        </div>
      ),
    },
  ];

  const CustomToolbar = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <GridToolbar />
         <div className='css-1knaqv7-MuiButtonBase-root-MuiButton-root' >
          <select  value={statusArray} name="Sort By" className='select77878' onChange={(e) => { const value = e.target.value; if(value === 'all'){setStatusArray(['Pending', 'Accepted', 'On_delivery']);} else{ setStatusArray([value]);} }}>   
            <option className="select" value='all'><div className="select-options">Order Processing</div></option>
            <option  className="select" value='Delivered'><div className="select-options">Orders delivered</div></option>
            <option  className="select" value='Canceled'> <div className="select-options">Denied orders</div> </option>
          </select>
        </div>
      </div>
    );
  };
 

  return (
    <>
     {open && <OrderItem setOpen={setOpen} order={order}/>}
    <div className="MyProduct">
      <div className="header">
        <h2>My Orders</h2>
      </div>
      <Analytics_bar open={open}/>
      <div className="card" style={{ height: 500 }}>
        <DataGrid
          rows={orders}
          columns={columns}
          components={{
            Toolbar: () => <CustomToolbar/>,
          }}
          checkboxSelection
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div></>
  );
};

export default Order;





