import React, {Component} from 'react'
import Header from './Header'

import {Link} from 'react-router-dom'

export default class Policy extends Component{
    
   
    render(){
        return(
            
            <div>
                <Header/>
                <div className="receipt">
                    <h1>
                        Thank you for your purchase, a confirmation has been sent to your email.<br></br> Please allow 3-5 business days for your order to arrive. 
                        <br></br>
                        <br></br>
                        Thank you for choosing Dang!
                    </h1>
                    <br></br>
                    <Link to="/">Home Page</Link>
                </div>

               
            </div>
        )
    }
}