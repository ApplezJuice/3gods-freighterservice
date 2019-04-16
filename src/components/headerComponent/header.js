import React, { Component } from 'react';
import {
    Link
  } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
<header className="site-header">
  <nav className="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
    <div className="container">
      <Link to="/" className="navbar-brand mr-4">3Gods</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarToggle">
        <div className="navbar-nav mr-auto">
          <Link to="/" className="nav-item nav-link">Home</Link>
          <Link to="/about" className="nav-item nav-link">About</Link>
          <Link to="/freightservice" className="nav-item nav-link">Freight Service</Link>
        </div>

        <div className="navbar-nav">
          <a className="nav-item nav-link" href="/login">Login</a>
          <a className="nav-item nav-link" href="/register">Register</a>
        </div>
      </div>
    </div>
  </nav>
</header>
    );
  }
}

export default Header;
