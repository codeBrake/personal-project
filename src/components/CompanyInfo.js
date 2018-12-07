import React, { Component } from 'react';
import AerialShot from '../DSC_3155.jpeg'
import CloseUp from '../DSC_0090.jpg'
import Method from '../DSC_0262.jpg'
export default class CompanyInfo extends Component {
    render(){
        return(
            <div className="info">
                <div className="chowder">

                </div>
                <div className="middle-page">
                    <div className="info-description">
                        <h1 className="info-title">Welcome to DANG</h1>
                        
                        <div className="info-paragraph">
                            DANG Snowboard Co. was established in the earlier 2000's, as two brothers with a passion for snowboarding, Tom and Joe saw the potential to make a change in a community that enjoyed snowboarding as much as they do. 
                        </div>
                    </div>

                    <div className="aerial">
                        <img className="bottom" src={AerialShot} alt=""></img>
                        
                    </div>

                </div>

                <div className="powder">

                </div>

            </div>
        )
    }
}