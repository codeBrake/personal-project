import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Footer extends Component {
    render(){
        return(
            <div className="footer">
                <Link className="footer-links" to="/policy"><p>Privacy Policy</p></Link>
                <Link className="footer-links" to="/warranty"><p>Warranties and Returns</p></Link>
                <p className="footer-links">DANG Snowboard LLC © 2018</p>
                <p className="footer-links">Questions? Call us at the shop.. (801)555-1234</p>

            </div>
        )
    }
}