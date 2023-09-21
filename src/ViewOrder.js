import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from 'react-router-dom';

function ViewOrder() {
  const [orderData, setOrderData] = useState([]);
  const [showDelivered, setShowDelivered] = useState(false);
  const [showNotDelivered, setShowNotDelivered] = useState(false);
  const [subscriptionOrders, setSubscriptionOrders] = useState([]);
  const [showSubscriptionOrders, setShowSubscriptionOrders] = useState(false);
  const [timeInterval, setTimeInterval] = useState('all');
  const { LoginId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:9000/vieworder`, { LoginId });
        let filteredOrders = response.data;

        if (showDelivered && !showNotDelivered) {
          filteredOrders = filteredOrders.filter((order) => order.OrderStatus === 'Delivered');
        } else if (!showDelivered && showNotDelivered) {
          filteredOrders = filteredOrders.filter((order) => order.OrderStatus === 'Not delivered');
        }

        filteredOrders = filterOrdersByInterval(filteredOrders, timeInterval);

        setOrderData(filteredOrders);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchData();
  }, [LoginId, showDelivered, showNotDelivered, timeInterval]);

  const handleDeliveredCheckboxChange = (event) => {
    setShowDelivered(event.target.checked);
  };

  const handleNotDeliveredCheckboxChange = (event) => {
    setShowNotDelivered(event.target.checked);
  };

  const handleTimeIntervalChange = (event) => {
    setTimeInterval(event.target.value);
  };

  const handleCancelOrder = async (OrderId) => {
    try {
      const response = await axios.post('http://localhost:9000/deleteorder', {
        OrderId: OrderId
      });
      alert('Order canceled');
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  const handleFetchSubscriptionOrders = async () => {
    if (!showSubscriptionOrders) {
      try {
        const response = await axios.post('http://localhost:9000/suborders', {
          LoginId: LoginId,
        });

        setSubscriptionOrders(response.data);
        setShowSubscriptionOrders(true);
      } catch (error) {
        console.error('Error fetching subscription orders:', error);
      }
    } else {
      setShowSubscriptionOrders(false);
      setSubscriptionOrders([]);
    }
  };

  const filterOrdersByInterval = (orders, interval) => {
    const currentDate = new Date();

    switch (interval) {
      case '15days':
        return orders.filter((order) => {
          const orderDate = new Date(order.OrderDate);
          const daysDifference = Math.floor((currentDate - orderDate) / (1000 * 3600 * 24));
          return daysDifference <= 15;
        });

      case '1month':
        return orders.filter((order) => {
          const orderDate = new Date(order.OrderDate);
          const monthsDifference = (currentDate.getFullYear() - orderDate.getFullYear()) * 12 +
            (currentDate.getMonth() - orderDate.getMonth());
          return monthsDifference <= 1;
        });

      case '2months':
        return orders.filter((order) => {
          const orderDate = new Date(order.OrderDate);
          const monthsDifference = (currentDate.getFullYear() - orderDate.getFullYear()) * 12 +
            (currentDate.getMonth() - orderDate.getMonth());
          return monthsDifference <= 2;
        });

      default:
        return orders;
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">View Order</h2>
      <div className="form-group">
        {!showSubscriptionOrders && (
          <>
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
            &nbsp;&nbsp; &nbsp;&nbsp;
            <label>Orders: </label>
            &nbsp;
            <select
              className="custom-select-sm"
              value={timeInterval}
              onChange={handleTimeIntervalChange}
            >
              <option value="all">All</option>
              <option value="15days">15 Days Old</option>
              <option value="1month">1 Month Old</option>
              <option value="2months">2 Months Old</option>
            </select>
            &nbsp;&nbsp; &nbsp;&nbsp;
            &nbsp;&nbsp; &nbsp;&nbsp;
          </>
        )}
        <button className="btn btn-dark btn-sm" onClick={handleFetchSubscriptionOrders}>
          {showSubscriptionOrders ? 'View Regular Orders' : 'View Subscribed Orders'}
        </button>
      </div>
      {showSubscriptionOrders ? (
        <>
          <h3>Subscription Orders</h3>
          <table className="table">
            <thead>
              <th>OrderId</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
            </thead>
            <tbody>
              {subscriptionOrders.map((subscriptionOrder) => (
                <tr key={subscriptionOrder.OrderId}>
                  <td>{subscriptionOrder.OrderId}</td>
                  <td>{subscriptionOrder.startDate}</td>
                  <td>{subscriptionOrder.endDate}</td>
                  <td>Rs. {subscriptionOrder.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order Id</th>
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
                <td>{order.OrderType}</td>
                <td>{order.itemQuantity}</td>
                <td>Rs {order.totalPrice.toFixed(2)}</td>
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
      )}
    </div>
  );
}

export default ViewOrder;
