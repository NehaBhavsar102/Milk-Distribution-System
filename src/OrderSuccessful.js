import React from 'react';
import './OrderSuccessful.css';
import { useLocation,useParams } from 'react-router-dom';
function OrderSuccessful() {
    const { LoginId } = useParams();
    function handleButtonClick() {
        window.location.href = `/home/${LoginId}`;
      }
  return (
    <div>
        <div className="order-successful">
        <h1>Order is being placed,Thank You!</h1>
        <br>
        </br>
        <br></br>
        <br>
        </br>
        <br></br>

        <button type="submit" class="btn btn-primary" onClick={handleButtonClick}>Home</button>
        </div>
    </div>
    
  );
}

export default OrderSuccessful;
