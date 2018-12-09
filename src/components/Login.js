import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {userLoggedIn} from '../ducks/reducer'
import {Link} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    constructor(){
        super()

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    handleUsernameChange(email){
        this.setState({
            email
        })
    }

    handlePasswordChange(password){
        this.setState({
            password
        })
    }

    handleKeyPress = (event) => {
        if( event.key==="Enter" ){
            axios.post('/auth/login', this.state).then(response => {
                let user = response.data
                this.props.userLoggedIn(user)
                toast.success('Successfully logged in')
            }).catch(error => {
                console.log(error.response)
                
            })
        }  
    }

    handleLogin = () => {
        if( !this.state.email[0] || !this.state.password[0]){
            toast.error('Incorrect email or password')
        }else{
            axios.post('/auth/login', this.state).then(response => {
                let user = response.data
                this.props.userLoggedIn(user)
                toast.success('Successfully logged in')
            }).catch(error => {
                console.log(error.response)
                toast.error('The email or password you entered is incorrect')
            })

        }
    }
    // guestLogin = () => {
    //     this.setState({
    //         email: 'guest@email.com',
    //         password: '1234'
    //     })
    // }

    
    render(){
        return this.props.isAuthenticated ?
            <Redirect to="/"/> : 
            <div className="login-component">
                <Header {...this.props}/>
                <div className="cart-margin">
                    <h1 style={{color: "#282c34"}}>Login</h1>
                </div>

                <section className="login-container">
                    <div className="user-pass">
                        <div className="group">
                            <input onChange={ (e) => this.handleUsernameChange( e.target.value ) } onKeyPress={this.handleKeyPress} type="text" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>E-mail</label>
                        </div>

                        <div className="group">
                            <input onChange={ (e) => this.handlePasswordChange( e.target.value ) } onKeyPress={this.handleKeyPress} type="password" required/>
                            <span className="highlight"></span>
                            <span className="bar"></span>
                            <label>Password</label>
                        </div>
                        
                    </div>

                    <div className="login-buttons">
                        <button className="cart-button" onClick={ this.handleLogin }>Login</button>
                        <Link to="/register"><button className="cart-button">Register</button></Link>
                        
                    </div>
                   
                </section>

                <div className="wipe-out">

                </div>

                <div id="footer">
                    <Footer/>
                </div>
                
            </div>
        
    }
}

function mapStateToProps(state){
    let {isAuthenticated, user} = state
    return{
        isAuthenticated,
        user
    }
}


export default connect(mapStateToProps, {userLoggedIn})(Login)