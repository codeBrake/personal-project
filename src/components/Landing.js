import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'
import CompanyInfo from './CompanyInfo'
import Footer from './Footer'
import 'font-awesome/css/font-awesome.min.css';
import Snowboards from '../Snowboards.png'
import Boots from '../32-boots-landing.png'
import Bindings from '../union-binding-land.png'
import Goggles from '../Goggles.png'



class Landing extends Component {

    render() {
      return (
        <div className="App">
          
          <Header {...this.props}/>
            
           
          
          <CompanyInfo/>
          <div className="social-div">
            <div className="social-cont">
              <h1> . . .  </h1>
              <hr className="line-under"></hr>
              <div className="icon-div">
                <span className="social-links"><i className="fa fa-instagram"></i></span>
                <span className="social-links"><i className="fa fa-facebook"></i></span>
                <span className="social-links"><i className="fa fa-twitter"></i></span>
              </div>
            </div>
          </div>
          
          <div className="boards-landing">
            
            
            <Link to="/boards" className="board-link"><img className="boards-img-link" src={Snowboards} alt=""/></Link>
            <Link to="/bindings" className="board-link"><img className="boards-img-link" src={Bindings} alt=""/></Link>
            <Link to="goggles" className="board-link"><img className="boards-img-link" src={Goggles} alt=""/></Link>
            <Link to="/32boots" className="board-link"><img className="boards-img-link" src={Boots} alt=""/></Link> 
          </div>
          
          
          <Footer/> 
  
        </div>
      ); 
    } 
  }
  
  export default Landing;