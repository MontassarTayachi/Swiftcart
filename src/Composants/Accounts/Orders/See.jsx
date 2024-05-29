import React, { useState } from 'react';
import { Pagination } from 'antd'; // Import the Pagination component from antd
import no_oreder from '../../../assets/images/no-orders.webp';
import Review from './Review';

function See({ orders }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Manage items per page as state
  const [openReview, setOpenReview] = useState(false);
  const [product_id, setProduct_id] = useState();

  // Get the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const onChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {openReview && <Review setOpen={setOpenReview} product_id={product_id} />}
      {orders.length > 0 ? (
        <div>
          {currentItems.map((item, index) => (
            <div key={index} className="orderItems787778">
              <div className="header">
                <h1>{item.status.replace(/_/g, ' ').charAt(0).toUpperCase() + item.status.slice(1).replace(/_/g, ' ')}</h1>
              </div>
              <div className="orderItems">
                <img src={item.product_image} alt={item.product_name} />
                <div className="details">
                  <h3 onClick={() => { window.location.href = `/Swiftcart/product/${item?.product_id}` }}>{item.product_name}</h3>
                  <h4>Price: {item.product_price?.toFixed(3)} TND  X {item.quantity}</h4>
                  <h5>Shipping: {item.product_delivery_price?.toFixed(3)} TND</h5>
                  <h5>Total: {(item.product_price * item.quantity + item.product_delivery_price).toFixed(3)} TND</h5>
                  <h5>Order Date: {item.created_at}</h5>
                  {item.status === 'Delivered' && (
                    <button onClick={() => { setProduct_id(item.product_id); setOpenReview(true); }}>Product Evaluation</button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '1rem',
              width: '100%',
            }}
          >
            <Pagination
              current={currentPage}
              onChange={onChange}
              total={orders.length}
              pageSize={itemsPerPage}
              showSizeChanger={true}
              onShowSizeChange={(current, size) => {
                setCurrentPage(1); // Reset to first page when size changes
                setItemsPerPage(size); // Update the items per page
              }}
            />
          </div>
        </div>
      ) : (
        <div className="noproducts48948978487" style={{ flexDirection: 'column' }}>
          <img src={no_oreder} alt="no-orders" />
          <h1 style={{ marginTop: '2em', fontSize: '1em' }}>No orders yet</h1>
        </div>
      )}
    </>
  );
}

export default See;
