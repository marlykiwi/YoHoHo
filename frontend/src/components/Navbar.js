import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from '../services/auth';


import "./Navbar.css";
import Logo from "./../images/Logo.png";

const handleLogout = props => {
  logout().then(() => {
    props.setUser(null);
  })
}

export default class Navbar extends Component {
  render() {
    return (
      <nav className='nav-items'>
        <Link to="/">
          <img src={Logo} alt="yohoho" />
        </Link>
        <div className="link-wrapper"> 
        {this.props.user ? 
        <>
        <Link className='nav-Link blue' to='/dashboard'>{this.props.user.name} {this.props.user.lastName}</Link> 
          <Link className='nav-Link red' to='/' onClick={() => handleLogout(this.props)}>Logout</Link> 
        </>
          : 
        <>
          <Link className='nav-Link red' to="/signup">Signup</Link>

          <Link className='nav-Link blue' to="/login">Login</Link>
        </>
        }  
        </div>
      </nav>
    );
  }
}
