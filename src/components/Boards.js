import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import {getCart} from '../ducks/reducer'
import {connect} from 'react-redux'
import Footer from './Footer';


class Boards extends Component {
    constructor(){
        super()

        this.state = {
            products: []
        }
    }
    componentDidMount(){
        axios.get('/api/products').then(response => {
            console.log(11111111111, response)
            this.setState({
                products: response.data 
            })
        })
    }
    addToCart = (id) => {
        axios.post(`/api/cart/${id}`).then(results => {
            console.log(11111, results)
            this.props.getCart(results.data)
        })
    }

    render(){ 
        
        let products = this.state.products.map((product, index) => {
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
                                <p>{product.size}cm</p>
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
                    <h1>Boards</h1>
                    {this.props.isAuthenticated ?
                    
                    <div></div>

                    :

                    <h2><Link to="/login">Login</Link> to add to cart</h2>

                    }

                </div>
                
                    <div className="merch">
                            {products}
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

export default connect(mapStateToProps, {getCart})(Boards)