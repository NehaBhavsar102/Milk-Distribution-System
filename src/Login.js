import React, { Component } from 'react';
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
        // Login successful, user data is available in response.data.user
        const LoginId  = response.data.user.LoginId;
       // alert('Login Successful');
        
        window.location.href = `/home/${LoginId}`;
        
      } else {
       
        alert('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };
  

  handleSignupSubmit = (e) => {
    e.preventDefault();
    // TODO: Add your signup logic here
  };

  render() {
    const { activeTab, selectedField } = this.state;

    return (
      <div className="container mt-5">
        {/* Center content */}
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
                  {/* Password */}
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
                  {/* Phone Number */}
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
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      placeholder="Address"
                      required
                      value={this.state.signupAddress}
                      onChange={(e) => this.setState({ signupAddress: e.target.value })}
                      onClick={() => this.handleFieldSelect('signupAddress')}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
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
