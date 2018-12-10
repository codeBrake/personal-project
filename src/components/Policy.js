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
                        Privacy Policy
                    </h1>

                    Your privacy is our policy!<br></br>
                    <Link to="/">Home</Link>
                </div>

            </div>
        )
    }
}