import React ,{Component } from 'react';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import PlaceOrder from './PlaceOrder';
import OrderSuccessful from './OrderSuccessful';
import ViewOrder from './ViewOrder';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

callAPI() {
    fetch("http://localhost:9000/TestAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}
    render(){
      return (
        <Router>
          <div>
              
            <Routes>
              <Route path="/" element={<Login />} />
              
              <Route path="/home/:LoginId" element={<Home />} />
              <Route path="/place-order/:LoginId" element={<PlaceOrder/>} />
              <Route path="/view-order/:LoginId" element={<ViewOrder/>} />
              <Route path="/place-order/:LoginId/confirmation" element={<OrderSuccessful/>}/>
            </Routes>
          </div>
        </Router>
      );
    }
    
    
  
}

export default App;
