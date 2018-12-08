import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userLoggedOut, searchProducts} from '../ducks/reducer'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Header extends Component {
    constructor(){
        super()
        this.state = {
            showMenu: false,
            showSearch: false,
            query: '',
            results: [],
            errorMessage: '',
            slide: 0, //how much it slides down
            lastScrollY: 0,  //current position in state
            userName: ''
        }
    }

    componentWillMount(){
        window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll = () => {
        const { lastScrollY } = this.state
        const currentScrollY = window.scrollY

        if(currentScrollY > lastScrollY){
            this.setState({ slide: '-80px' })
        }else {
            this.setState({ slide: '0px' })
        }
        this.setState({ lastScrollY: currentScrollY })
    }

    showMenu = () => {
        this.setState({
          showMenu: !this.state.showMenu
        })
    }

    showSearch = () => {
        this.setState({
            showSearch: !this.state.showSearch
        })
    }

    handleLogout = () => {
        axios.get('/auth/logout').then(response => {
            this.props.userLoggedOut()
            toast.success('Successfully logged out')
        })
      
    }
    handleInputChange = (e) => {
        
        this.setState({
           query: e.target.value
        })
    }

    handleKeyPress = (event) => {
        if(event.key === "Enter"){
            axios.get(`/api/products/search?search=${this.state.query}`).then(response => {
                if( response.data.length === 0){
                    toast.error("search not found")
                }else{
                this.props.searchProducts( response.data )
                if(this.props.location.pathname !== '/search' ){
                    this.props.history.push('/search')
                }
                }
            }).catch(error => {
                // this.props.history.push('/search', error)
                toast.error('search not found')
            })
        }
    }
    render(){

        return(
                <header className="navbar navbar-mobile" style={{transform: `translate(0, ${this.state.slide})`, transition: 'transform 300ms linear'}}>
                        {
                            this.state.showMenu ? ( 
                                <div className="drop-menu" onMouseLeave={this.showMenu}>
                                    {
                                        this.props.isAuthenticated ?
                                        <Link to="/" className="menu-button-user">Logged in as {this.props.user.name}</Link>
                                        : (null)
                                    }
                                   <Link to="/" className="menu-button">Home</Link>
                                   <Link to="/boards" className="menu-button">Snowboards</Link>
                                   <Link to="/32boots" className="menu-button">Thirty-Two Boots</Link>
                                   <Link to="/bindings" className="menu-button">Union Bindings</Link>
                                   <Link to="/goggles" className="menu-button">Electric Goggles</Link>
                                  
                                   {this.props.isAuthenticated ?
                        
                                    <Link to="/cart" className="menu-button">Cart</Link>
                                    
                                    :
                                    
                                    <Link to="/login" className="menu-button">Cart</Link>
                                    
                                
                                    } 
                                    {   this.props.isAuthenticated ?

                                        (null)

                                        :

                                        <Link to="/login" className="menu-button">Login</Link>
                                    }
                                    {
                                        this.props.isAuthenticated ?
                                        
                                        <Link to="/" className="menu-button" onClick={this.handleLogout}>Logout</Link>
                                        :
                                        (null)
                                    }
                                    {
                                        this.props.isAuthenticated ?
                                        (null)
                                        :

                                        <Link to="/register" className="menu-button">Register</Link>

                                    }
                                    
                                </div>
                            ) : (null)
                        }
                        <Link to="/" className="company-name">DANG</Link>
                            
                        <ToastContainer
                            position="top-left"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnVisibilityChange
                            draggable
                            pauseOnHover
                           
                            
                        />
                         
                        {
                            this.state.showSearch ? (
                                <form>
                                    <input 
                                    onBlur={this.showSearch} 
                                    onKeyPress={this.handleKeyPress} 
                                    onChange={this.handleInputChange} 
                                    
                                    placeholder="search" 
                                    className="search-bar"
                                    />
                                </form>
                                
                            ) : (null)
                        }  
                    
                    <div className="links">
                        
                        <span className="nav-link"><i className="fa fa-search" onClick={this.showSearch}></i></span>
                        
                        <span className="nav-link"><i className="fa fa-bars" onClick={this.showMenu} transition={10000} ></i></span>

                        {this.props.isAuthenticated ?
                        
                        <Link to="/cart" className="nav-link"><i className="fa fa-shopping-cart"></i></Link>
                        
                        :
                        
                        <Link to="/login" className="nav-link"><i className="fa fa-shopping-cart"></i></Link>
                        
                        
                        }
                    </div>
                     
                </header>
           
        )
    }
}
function mapStateToProps(state){
    let {isAuthenticated, user} = state
    return{
        isAuthenticated,
        user
    }
}

export default connect(mapStateToProps, {searchProducts, userLoggedOut})(Header)