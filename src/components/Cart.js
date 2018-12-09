import React, {Component} from 'react'
import CartItem from './CartItem'
import axios from 'axios'
import {getCart} from '../ducks/reducer'
import {connect} from 'react-redux'
import Header from './Header'
import Footer from './Footer';
import {Link} from 'react-router-dom'


class Cart extends Component {

    componentDidMount() {
        axios.get('/api/cart/').then(results => {
            this.props.getCart(results.data)
        })
    }
    // checkout = () => {
    //     if(this.props.cart.length) {
    //         axios.delete('/api/cart/checkout').then(results => {
    //             alert('Thank you for your purchase!')
    //             this.props.getCart(results.data)
    //         })
    //     } else {
    //         alert("Please add items to your cart to checkout")
    //     }
    // }
    render() {
        let boardsTotal = 0
        let bindingsTotal = 0
        let bootsTotal = 0
        let gogglesTotal = 0
        let cartTotal = boardsTotal + bindingsTotal + bootsTotal + gogglesTotal

        let cart = this.props.cart.map(e => {
            cartTotal += e.price * e.quantity
            return (
                <CartItem cartItem={e} key={e.id}/>
            )
        })
        let boards = this.props.cart.filter(e => {
            boardsTotal += e.price * e.quantity
            return(
                e.category === 'boards'
            )
        })
        let boardsToDisplay = boards.map(e => {
            return(
                <CartItem cartItem={e} key={e.id}/>
            )
        })
        let bindings = this.props.cart.filter(e => {
            bindingsTotal += e.price * e.quantity
            return(
                e.category === 'bindings'
            )
        })
        let bindingsToDisplay = bindings.map(e => {
            return(
                <CartItem cartItem={e} key={e.id}/>
            )
        })
        let goggles = this.props.cart.filter(e => {
            gogglesTotal += e.price * e.quantity
            return(
                e.category === 'goggles'
            )
        }).map(e => {
            return(
                <CartItem cartItem={e} key={e.id}/>
            )
        })
        let boots = this.props.cart.filter(e => {
            bootsTotal += e.price * e.quantity
            return(
                e.category === 'boots'
            )
        }).map(e => {
            return(
                <CartItem cartItem={e} key={e.id}/>
            )
        })
        
        return (
            
            <div>
                    <Header {...this.props}/>
                    
                    <div className="cart-page">

                        <div className="cart-margin">
                            
                            {cart.length === 0 ? 
                            <div>
                                <h2>Your cart is empty..</h2>
                                <Link to="/">Continue shopping</Link>
                                <br></br>
                                <br></br>
                                <br></br>
                                <iframe className="giphy" src="https://giphy.com/embed/fAhOtxIzrTxyE" width="480" height="250" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                            </div>
                            :
                            <div>
                                <h1>Cart</h1>
                                <h2 className="grand-total">Grand Total: ${Math.floor(cartTotal * 100) / 100}</h2>
                                {
                                    boardsToDisplay.length === 0 ?
                                    (null)
                                    :
                                    <div className="cart-container">
                                        <h1>
                                            Snowboards:
                                        </h1>
                                        {boardsToDisplay}
                                    </div>
                                }
                                {
                                    bindingsToDisplay.length === 0 ?
                                    (null)
                                    :
                                    <div className="cart-container">
                                        <h1>
                                            Bindings:
                                        </h1>
                                        {bindingsToDisplay}
                                    </div>
                                }
                                {
                                    boots.length === 0 ?
                                    (null)
                                    :
                                    <div className="cart-container">
                                        <h1>
                                            Boots:
                                        </h1>
                                        {boots}
                                    </div>
                                }
                                {
                                    goggles.length === 0 ?
                                    (null)
                                    :
                                    <div className="cart-container">
                                        <h1>
                                            Goggles:
                                        </h1>
        
                                        {goggles}
                                    </div>
                                }
                                
                                <h2 className="grand-total">Grand Total: ${Math.floor(cartTotal * 100) / 100}</h2>

                                <Link to="/checkout"><button className="checkout-button">Checkout</button></Link>
                                <Link to="/"><button className="checkout-button">Home</button></Link>
                            </div>
                            }
                        </div>

                    </div>

                    <div id="footer">
                        <Footer/>

                    </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    
    return {
        cart: state.cart

    }
}

export default connect(mapStateToProps, {getCart})(Cart)