
import React, { useRef } from 'react';

import { Carousel } from 'react-bootstrap';
import App from './App';
import './App.css';
function ImageCarousel() {
  return (
    <div>
      <div>
        <img
          className="d-block w-100"
          src="https://www.privatebrandsconsortium.com/images/500_F_190994672_f7WTaLIKeTduPKdSp6nLf1EnscCGdjI9.jpg"
          alt="First slide"
          width="800"
          height="534"
        />
        </div>
         <div className="overlay">
          
          <h1>Why Plant-Based Milk?</h1>
          
          &nbsp; &nbsp;
          <div>
          <p>“Fortified plant-based milks are delicious and contain all the calcium, protein, and vitamin D of dairy products but with 
          none of the cholesterol, lactose, hormones, or cruelty found in cow’s milk.”</p>
          </div>
          
        </div>
      
      
      
    </div>
  );
}

export default ImageCarousel;
