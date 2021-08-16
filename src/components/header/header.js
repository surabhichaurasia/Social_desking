import React from "react";
import logo from "../login/logo.png";
import '../../styles/header.css';

class Header extends React.Component {

    render(){
    return (
      <div className="header navbar-fixed">
        <nav className="navbar">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">
              <img src={logo} className="header-logo" alt="logo" />
            </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down greeting-div">
              <li>
                <h5>Hello</h5>
              </li>
              <li className="user-name">
               <h5>{this.props.username}</h5>
              </li>
            </ul>
          </div>
        </nav>
        
      </div>
    );
    }
  }

export default Header;