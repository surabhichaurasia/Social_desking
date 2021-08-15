import React, { Component } from 'react';
import logo from "./logo.png";
import '../styles/login.css';

class Login extends Component {

    constructor() {
        super()
        this.state = {
          "email_id": ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }

    handleChange(e) {
        this.setState({
          email_id: e.target.value,
        });
       
      }

      handleLogin(e) {
        e.preventDefault();
        const customEvent = new CustomEvent('login', {detail: this.state.email_id} );
        document.dispatchEvent(customEvent);
        this.props.history.push('/booking');
      }
  render(){
  return (
    <div className="login-container">
      <div className="row container">
        <div className="card login-card">
          <div className="col">
          <img src={logo} className="logo" alt="logo" />
            <h3>
             Social Desking
            </h3>
            <h6>In the light of our "NEW REALITY" induced by the Corona pandemic new ways to work and save costs arises.</h6>
          </div>
          <div className="col">
            <div className="row">
              <h5>Login to Your Account</h5>
            </div>
            
            <div className="input-field">
              <input onChange={this.handleChange} id="email" type="email" className="validate" />
              <label htmlFor="email">Email ID</label>
            </div>
            <div className="btn1">
                <button className="local-btn" onClick={(e) => this.handleLogin(e)}>Sign In</button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default Login;