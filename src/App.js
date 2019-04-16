import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// components

import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/homepage';
import Aboutpage from './components/pages/about';
import Freightservice from './components/pages/freightservice';

import './Assets/css/default.min.css';

//var EVEoj = require("EVEoj");
//var SDD = EVEoj.SDD.Create("json", {path: "https://cf.eve-oj.com/sdd/201611140"});


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      
        <Header />
        
        <Route exact path='/' component={Homepage} />
        <Route exact path='/about' component={Aboutpage} />
        <Route exact path='/freightservice' component={Freightservice} />

        <Footer />
        
      </div>
      </Router>
      
    );
  }
}

export default App;
