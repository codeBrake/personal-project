import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import {getCart} from '../ducks/reducer'
import {connect} from 'react-redux'
import Footer from './Footer';


class Bindings extends Component {
    constructor(){
        super()

        this.state = {
            bindings: []
        }
    }
    componentDidMount(){
        axios.get('/api/bindings').then(response => {
            console.log(11111111111, response)
            this.setState({
                bindings: response.data 
            })
        })
    }
    addToCart = (id) => {
        axios.post(`/api/cart`, { product_id: id }).then(results => {
            this.props.getCart(results.data)
        })
    }
    render(){

        let bindings = this.state.bindings.map((product, index) => {
            let {id} = product
            if(product.img_url) {
                return(
                    
                    <div className="boards-product">
                        
                        <Link key={index} to={`/details/${product.id}`}>
                            <img className="boards-img-grow" src={product.img_url} alt=""/>
                        </Link>
                        
                            <div className="boards-description">
                                <p id="mobile-p">{product.brand}</p>
                                <p id="mobile-p">{product.model}</p>
                                
                                <p id="mobile-p">color: {product.color}</p>
                                <p id="mobile-p">${product.price}</p>
                                {this.props.isAuthenticated ? 
                                
                                <button className="cart-button" onClick={() => this.addToCart(id)}>Add to Cart</button>
                                :
                                <Link to="/login"><button className="cart-button">Add to Cart</button></Link>

                                }
                            </div>
                    </div>
                )
            }
        })


        return(
            <div>
                <div>
                    <Header {...this.props}/>

                </div>
                <div className="boards-margin">
                    <h1>Union Binding Co.</h1>
                    

                </div>
                
                    <div className="merch">
                            {bindings}
                    </div>
                <div>
                    
                </div>
               
                <Footer/>
            </div>
        )
    }




}
    function mapStateToProps(state){
        let {isAuthenticated} = state
        return{
            isAuthenticated
        }
    }
    
    export default connect(mapStateToProps, {getCart})(Bindings)