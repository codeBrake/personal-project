import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import {getCart} from '../ducks/reducer'
import {connect} from 'react-redux'
import Footer from './Footer';



class SearchedFor extends Component {
    
    addToCart = (id) => {
        axios.post(`/api/cart/${id}`).then(results => {
            this.props.getCart(results.data)
        })
    }

    render(){ 
        
        let searchProducts = this.props.searchProducts.map((product, index) => {
            let {id} = product
            if(product.img_url) {
                return(
                    
                    <div className="boards-product">
                        <Link key={index} to={`/details/${product.id}`}>
                            <img className="boards-img-grow" src={product.img_url} alt=""/>
                        </Link>
                            <div className="boards-description">
                                <p>{product.year}</p>
                                <p>{product.brand}</p>
                                <p>{product.model}</p>
                                
                                {   product.brand === 'Electric' ?
                                    <p>frame: {product.frame}<br></br>
                                        lens: {product.lens}</p>
                                    :
                                    <div></div>
                                }
                                
                                <p>{product.size}</p>
                                <p>${product.price}</p>
                                {this.props.isAuthenticated ? 
                                
                                <button className="cart-button" onClick={() => this.addToCart(id)}>Add to Cart</button>
                                :
                                <div></div>
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
                    <h1>Searched</h1>
                    {this.props.isAuthenticated ?
                    
                    <div></div>
                    
                    :
                    
                    <h2><Link to="/login">Login</Link> to add to cart</h2>
                    
                    }
                    

                </div>
                
                <div>
                        <div className="merch">
                                {searchProducts}
                        </div>
                    
                </div>
                <div id="footer">
                    <Footer/>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    let {isAuthenticated, searchProducts} = state

    return{
        isAuthenticated,
        searchProducts
    }
}

export default connect(mapStateToProps, {getCart})(SearchedFor)