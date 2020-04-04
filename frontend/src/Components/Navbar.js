import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const NavigationBar = () => {
    return (
      <div className="navigation-bar">
        <Link to="/">
          <h1>CSC 667 HW3</h1>
        </Link>
        <Link to="/Login">
          <div className="Login">Login</div>
        </Link>
        <Link to="/SignUp">
                <div className="SignUp">SignUp</div>
        </Link>
        
      </div>
    );
}

export default NavigationBar;
