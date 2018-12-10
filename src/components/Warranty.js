import React, {Component} from 'react'
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'

export default class Warranty extends Component{
    render(){
        return(
            <div>
                <Header/>

                <div className="receipt">
                    <h1>Warranty and Return Policy</h1>
                    Manufacturers warranty applies and a 48 hour return policy through our local shop<br></br>
                    <Link to="/">Home</Link>
                </div>
            </div>
        )
    }
}