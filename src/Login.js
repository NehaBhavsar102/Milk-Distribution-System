import React, { useState,Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
class LoginPage extends Component {
  
  constructor() {
   
    super();
    this.state = {
      activeTab: 'login',
      loginEmail: '',
      loginPassword: '',
      signupName: '',
      signupEmail: '',
      signupPassword: '',
      signupPhoneNumber: '',
      signupAddress: '',
      signupLandmark : '',
      signupCity: '',
      selectedField: '', 
    };
  }

  handleTabClick = (tabName) => {
    this.setState({ activeTab: tabName });
  };

  handleFieldSelect = (fieldName) => {
    this.setState({ selectedField: fieldName });
  };

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword } = this.state;
  
    try {
      const response = await axios.post('http://localhost:9000/login', {
        email: loginEmail,
        password: loginPassword,
      });
  
      if (response.status === 200) {
        
        const LoginId  = response.data.user.LoginId;
       
        
        window.location.href = `/home/${LoginId}`;
        
      } else {
       
        alert('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };
  

  handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { signupName,signupAddress,signupLandmark,signupCity } = this.state;
    const { signupState,signupPhoneNumber} = this.state;
    const { signupEmail,signupPassword}=this.state;
    const response = await axios.post('http://localhost:9000/customer', {
        customerName: signupName,
        street: signupAddress,
        landmark:signupLandmark,
        city:signupCity,
        state:signupState,
        phoneNumber:signupPhoneNumber,
        zipCode:411051,
        email:signupEmail,
        password:signupPassword
      });
      alert("Sign Up Successful,Please Login");
      this.setState({
        signupName: '',
        signupAddress: '',
        signupLandmark: '',
        signupCity: '',
        signupState: '',
        signupPhoneNumber: '',
        signupEmail: '',
        signupPassword: '',
        selectedField: '',
        activeTab: 'login'
      });
      
     
        
      
  };

  render() {
    const { activeTab, selectedField } = this.state;
    const statesOfIndia = ['Maharashtra'];
    const cityofMH = ['Pune', 'PMC'];
    
    return (
      <div className="container mt-5">
        
        <div className=" col-sm-180 ">
          <div className="card"> 
            <div className="card-header">
              
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className={`btn btn-lg btn-block ${activeTab === 'login' ? 'btn-warning' : 'btn-light'}`}
                  onClick={() => this.handleTabClick('login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`btn  btn-lg btn-block ${activeTab === 'signup' ? 'btn-warning' : 'btn-light'}`}
                  onClick={() => this.handleTabClick('signup')}
                >
                  Signup
                </button>
              </div>

            
              <div className="mt-3">
                {activeTab === 'login' ? (
                  <form onSubmit={this.handleLoginSubmit}>
                    &nbsp;
                    <div className={`center mb-2 ${selectedField === 'loginEmail' ? 'selected-field' : ''}`}>
                   <label>Email Address</label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email Address"
                      required
                      value={this.state.loginEmail}
                      onChange={(e) => this.setState({ loginEmail: e.target.value })}
                      onClick={() => this.handleFieldSelect('loginEmail')}
                    />
                   </div>
                   <div className={`mb-3 ${selectedField === 'loginPassword' ? 'selected-field' : ''}`}>
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={this.state.loginPassword}
                      onChange={(e) => this.setState({ loginPassword: e.target.value })}
                      onClick={() => this.handleFieldSelect('loginPassword')}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Login
                  </button>
                  </form>
                ) : (
                  <form onSubmit={this.handleSignupSubmit}>
                   <div className={`mb-3 ${selectedField === 'signupName' ? 'selected-field' : ''}`}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      required
                      value={this.state.signupName}
                      onChange={(e) => this.setState({ signupName: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupName')}
                    />
                  </div>
                  {/* Email Address */}
                  <div className={`mb-3 ${selectedField === 'signupEmail' ? 'selected-field' : ''}`}>
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      required
                      value={this.state.signupEmail}
                      onChange={(e) => this.setState({ signupEmail: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupEmail')}
                    />
                  </div>
                  
                  <div className={`mb-3 ${selectedField === 'signupPassword' ? 'selected-field' : ''}`}>
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={this.state.signupPassword}
                      onChange={(e) => this.setState({ signupPassword: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupPassword')}
                    />
                  </div>
                 
                  <div className={`mb-3 ${selectedField === 'signupPhoneNumber' ? 'selected-field' : ''}`}>
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                      value={this.state.signupPhoneNumber}
                      onChange={(e) => this.setState({ signupPhoneNumber: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupPhoneNumber')}
                    />
                  </div>
                 
                  <div className={`mb-3 ${selectedField === 'signupAddress' ? 'selected-field' : ''}`}>
                    <label>Street</label>
                    <textarea
                      className="form-control"
                      placeholder="Street"
                      required
                      value={this.state.signupAddress}
                      onChange={(e) => this.setState({ signupAddress: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupAddress')}
                    />
                  </div>
                  <div className={`mb-3 ${selectedField === 'signupLandmark' ? 'selected-field' : ''}`}>
                    <label>Landmark</label>
                    <textarea
                      className="form-control"
                      placeholder="Landmark"
                      required
                      value={this.state.signupLandmark}
                      onChange={(e) => this.setState({ signupLandmark: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupLandmark')}
                      
                    />
                  </div>
                  <div className={`mb-3 ${selectedField === 'signupState' ? 'selected-field' : ''}`}>
                    <label>State</label>
                    <select
                      
                      class="form-control"
                      placeholder="State"
                      required
                      value={this.state.signupState}
                      onChange={(e) => this.setState({ signupState: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupState')}
                      
                    >
                      <option value="">Select State</option>
                      {statesOfIndia.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
              </div>

              <div className={`mb-3 ${selectedField === 'signupCity' ? 'selected-field' : ''}`}>
                    <label>City</label>
                    <select
                      
                      class="form-control"
                      placeholder="City"
                      required
                      value={this.state.signupCity}
                      onChange={(e) => this.setState({ signupCity: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupCity')}
                      
                    >
                      <option value="">Select City</option>
                      {cityofMH.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
              </div>
                  <button type="submit" className="btn btn-dark" >
                    Signup
                  </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
