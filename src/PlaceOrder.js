import React, { useState } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import { isFuture } from 'date-fns';

import './PlaceOrder.css';
import axios from 'axios';
function PlaceOrder(){
    const currentDate = new Date();
    const { LoginId } = useParams();
    
    const [orderType, setOrderType] = useState('Soya Milk');
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemPrice] = useState(60);
    const [totalPrice, setTotalPrice] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(''); 
    const [orderDate, setOrderDate] = useState('');
    const [daysDifference, setDaysDifference] = useState(0); 
    const [isSubscriptionOrder, setIsSubscriptionOrder] = useState(false); 

    const handleOrderTypeChange = (e) => {
        setOrderType(e.target.value);
      };
    
      const handleItemQuantityChange = (e) => {
        const quantity = parseInt(e.target.value, 10);
        setItemQuantity(quantity);
        setTotalPrice(itemPrice * quantity);
      };
      const handleOrderDateChange = (e) => {
        setOrderDate(e.target.value);
      };
    
      const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        calculateDaysDifference();
      };
    
      const calculateDaysDifference = () => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const timeDifference = endDateObj - startDateObj;
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24) + 1);
        setDaysDifference(daysDifference);
        setTotalPrice(itemQuantity * itemPrice * daysDifference);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (
          !orderType ||
          itemQuantity <= 0 ||
          (!isSubscriptionOrder && currentDate > orderDate) ||
          (isSubscriptionOrder && currentDate > startDate && currentDate < endDate)
        ) {
          alert('Please fill in all required fields with valid information.');
          return;
        }
        try{
            const response = await axios.post('http://localhost:9000/getcustomer', {
                LoginId:LoginId
              });

              if (response.status === 200) {
                // Login successful, user data is available in response.data.user
                const CustomerId  = response.data.user.CustomerId;
                //alert(CustomerId);
                const orderData = {
                    CustomerId,
                    orderType,
                    itemQuantity,
                    totalPrice,
                    startDate,
                    endDate,
                    daysDifference,
                  };
              if (itemQuantity === 0) {
                    alert('No items Selected');
                  } 
        const res = await fetch('http://localhost:9000/order', {
                method: 'POST',
                 headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ CustomerId, orderType, itemQuantity, totalPrice, startDate, endDate, daysDifference,isSubscriptionOrder, orderData }),
                 });

                 if (res.ok) { 
          
                   //alert("Order Placed");
                   window.location.href = `/place-order/${LoginId}/confirmation`;
                    
                  }
               
                
              } else {
               
                alert('Placeorder failed');
              }

        }catch(error){
            console.error('An error occurred during login:', error);
        }
      };
    
    
    return(
        <div>
       
        <div className="center-container">
    <div className="place-order-container">
      <h2 className="place-order-heading">Place Your Order</h2>
      <form className="place-order-form">
        <div className="form-group">
          <label htmlFor="orderType">Order Type </label>&nbsp;&nbsp;
          <select id="orderType" value={orderType} onChange={handleOrderTypeChange}>
            <option value="Soya Milk">Soya Milk</option>
            <option value="Almond Milk">Almond Milk</option>
            <option value="Coconut Milk">Coconut Milk</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="itemQuantity">No of Items </label>&nbsp;&nbsp;
          <input
            type="number"
            id="itemQuantity"
            value={itemQuantity}
            onChange={handleItemQuantityChange}
            placeholder="required"
          />
        </div>

        <div className="form-group">
         
          
          {!isSubscriptionOrder && (
            <>
            <div className="form-group">
              <label htmlFor="startDate">Order Date </label>&nbsp;&nbsp;
              <input
                type="date"
                id="orderDate"
                value={orderDate}
                onChange={handleOrderDateChange}
              />
            </div>
            </>
          )}
          <input
            type="checkbox"
            id="subscriptionOrder"
            checked={isSubscriptionOrder}
            onChange={(e) => setIsSubscriptionOrder(e.target.checked)}
          />&nbsp;&nbsp;
           <label>Subscription Order</label>
        </div>

        {isSubscriptionOrder && (
          <>
          <div className="subscription-container">
            <div className="form-group">
              <label htmlFor="startDate">Start Date </label>&nbsp;&nbsp;
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>&nbsp;&nbsp;
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
                onBlur={calculateDaysDifference} // Calculate days difference when focus is lost from end date input
              />
            </div>

            <div className="form-group">
              <label>Subscription Days </label>&nbsp;&nbsp;
              <span>{daysDifference} days</span>
            </div>
            </div>
          </>
        )}
        <div className="form-group">
          <hr className="horizontal-line" />
        </div>

        <div className="form-group total-price-container">
          <label className="total-price-label">Total Price: </label>
          <span className="total-price-value">Rs. {totalPrice}</span>
        </div>

        <div className="form-group button-group">
            <button type="button" className="cancel-button">
              Cancel
          </button>
            <button type="submit" className="place-order-button" onClick={handleSubmit}>
            Place Order
          </button>
      </div>
      </form>
    </div>
    </div>
    </div>
    )
    
}
export default PlaceOrder;