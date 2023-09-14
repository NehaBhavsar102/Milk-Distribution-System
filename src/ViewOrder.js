import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams , setLoading } from 'react-router-dom';

function ViewOrder() {
  const [orderData, setOrderData] = useState([]);
  const [showDelivered, setShowDelivered] = useState(false);
  const [showNotDelivered, setShowNotDelivered] = useState(false);
  const { LoginId } = useParams();

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:9000/vieworder`, { LoginId });
        let filteredOrders = response.data;
        
        if (showDelivered && !showNotDelivered) {
          filteredOrders = filteredOrders.filter((order) => order.OrderStatus === 'Delivered');
        } else if (!showDelivered && showNotDelivered) {
          filteredOrders = filteredOrders.filter((order) => order.OrderStatus !== 'Delivered');
        }

        setOrderData(filteredOrders);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [LoginId, showDelivered, showNotDelivered]);

  const handleDeliveredCheckboxChange = (event) => {
    setShowDelivered(event.target.checked);
  };

  const handleNotDeliveredCheckboxChange = (event) => {
    setShowNotDelivered(event.target.checked);
  };

  
  
  const handleCancelOrder = async (OrderId) => {
    alert(OrderId);
   
    //alert(OrderId);
    try{
      const response = await axios.post('http://localhost:9000/deleteorder', {
        OrderId:OrderId
      });
      
        alert("order cancelled")
      

    }catch(error){
        console.error("In Order");
    }
  };
  
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">View Order</h2>
      <div className="form-group">
        <input
          type="checkbox"
          className="form-check-input small-checkbox"
          checked={showDelivered}
          onChange={handleDeliveredCheckboxChange}
        />
        &nbsp;&nbsp;
        <label>Delivered</label>
        &nbsp;&nbsp;
        <label>
          <input
            type="checkbox"
            className="form-check-input small-checkbox"
            checked={showNotDelivered}
            onChange={handleNotDeliveredCheckboxChange}
          />
          &nbsp; Not Delivered
        </label>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Name</th>
            <th>Order Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.OrderId}>
              <td>{order.OrderId}</td>
              <td>{order.customerName}</td>
              <td>{order.OrderType}</td>
              <td>{order.itemQuantity}</td>
              <td>Rs.{order.totalPrice.toFixed(2)}</td>
              <td>{order.OrderStatus}</td>
              <td>
                {order.OrderStatus === 'Not delivered' && (
                  <>
                    <button className="btn btn-warning btn-sm"
                    onClick={() => handleCancelOrder(order.OrderId)}>Cancel</button>
                    &nbsp;
                    <button type="submit" class="btn btn-outline-dark btn-sm">Edit</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOrder;
