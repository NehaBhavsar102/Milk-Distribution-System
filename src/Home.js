import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import './App.css'

import './Home.css';
import ImageCarousel from './ImageCarousel';

function Home() {
  const [showPlaceOrder, setShowPlaceOrder] = useState(false);
  const { LoginId }=useParams();
 

  return (
    <div>
    <nav className="navbar">
      &nbsp;
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-box2-heart-fill"
        viewBox="0 0 16 16"
      >
        <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1v3ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
      </svg>
      &nbsp;&nbsp;
      <h5>MilkyNest</h5>
      <div className="navbar-items">
        <div className="navbar-right a">
        <Link to={`/place-order/${LoginId}`}>Place Order</Link>
        <Link to={`/view-order/${LoginId}`}>View Order</Link>
          <a href="#about">About Us</a>
          &nbsp;
          <a href="#contact"> Contact Us</a>
          &nbsp;&nbsp;

        </div>
      </div>
    </nav>
    <ImageCarousel />
    <div id="about" className="about-section">
      At MilkyNest, we're on a mission to bring health, sustainability, and deliciousness to every household in Pune. As a dedicated plant-based milk distributor, we're committed to providing the finest selection of dairy-free alternatives that cater to diverse preferences and lifestyles.
      </div>
      <div className="info-section">
        <h4>Our Vision</h4>
        We envision a Pune where everyone can enjoy nourishing and planet-friendly beverages without compromise. By promoting the benefits of plant-based milk, we aim to contribute to a healthier community, a happier environment, and a more compassionate world.
      </div>
      <div className="info-section">
        <h4>Our Mission</h4>
        Our mission is to make the transition to plant-based living seamless and enjoyable. We strive to be Pune's go-to source for high-quality, flavorful, and nutritious plant-based milk options. We're here to offer choices that align with individual dietary needs, ethical considerations, and environmental consciousness.
      </div>
      <div className="info-section">
        <h4>What Sets Us Apart</h4>
        What sets us apart is the cornerstone of our identity: an unwavering focus on quality that ensures every drop of plant-based milk we offer embodies excellence. We are devoted to your holistic wellness, going beyond just being a distributor to become a partner in your journey towards a healthier lifestyle. Our eco-conscious approach underscores our responsibility to the environment, as we strive to minimize our footprint and promote sustainable practices throughout our operations. Beyond being a business, we are a thriving community where passion for plant-based living unites. Through workshops, events, and resources, we foster a sense of togetherness that uplifts and empowers. Moreover, our commitment to providing a seamless customer experience reflects our dedication to making your switch to plant-based milk effortless and enjoyable. So, when you choose MilkyNest, you're not only choosing a beverage – you're opting for a greener, tastier, and more nourishing future.
      </div>
      <div id="contact" className="contact-section">
        <br></br>
        <h4> Contact Us</h4>
        <br></br>
        <div>
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="7.086 7.087 1277.149 924.008" id="gmail"><path fill="none" d="M1138.734 931.095h.283M1139.017 931.095h-.283"></path><path fill="#e75a4d" d="M1179.439 7.087c57.543 0 104.627 47.083 104.627 104.626v30.331l-145.36 103.833-494.873 340.894L148.96 242.419v688.676h-37.247c-57.543 0-104.627-47.082-104.627-104.625V111.742C7.086 54.198 54.17 7.115 111.713 7.115l532.12 394.525L1179.41 7.115l.029-.028z"></path><linearGradient id="a" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#a)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><path fill="#e7e4d7" d="M148.96 242.419v688.676h989.774V245.877L643.833 586.771z"></path><path fill="#b8b7ae" d="M148.96 931.095l494.873-344.324-2.24-1.586L148.96 923.527z"></path><path fill="#b7b6ad" d="M1138.734 245.877l.283 685.218-495.184-344.324z"></path><path fill="#b2392f" d="M1284.066 142.044l.17 684.51c-2.494 76.082-35.461 103.238-145.219 104.514l-.283-685.219 145.36-103.833-.028.028z"></path><linearGradient id="b" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#b)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><linearGradient id="c" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#c)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><linearGradient id="d" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#d)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><linearGradient id="e" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#e)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><linearGradient id="f" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#f)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><linearGradient id="g" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#g)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><linearGradient id="h" x1="1959.712" x2="26066.213" y1="737.107" y2="737.107" gradientTransform="matrix(.0283 0 0 -.0283 248.36 225.244)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f8f6ef"></stop><stop offset="1" stop-color="#e7e4d6"></stop></linearGradient><path fill="url(#h)" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path><path fill="#f7f5ed" d="M111.713 7.087l532.12 394.525L1179.439 7.087z"></path></svg>
        &nbsp; Email : 1032212195@mitwpu.edu.in
        <br></br><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
</svg> &nbsp; 123456789
       <br></br>
       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
<path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
</svg> &nbsp; https://www.linkedin.com/in/neha-bhavsar10
        </div>
        
        

      </div>
    </div>
  );
}

export default Home;
