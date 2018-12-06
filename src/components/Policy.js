import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'

export default class Policy extends Component{
    render(){
        return(
            
            <div>
                <h1>
                    Privacy Policy
                </h1>

                Your privacy is our policy!<br></br>
                <Link to="/">Home</Link>
            </div>
        )
    }
}