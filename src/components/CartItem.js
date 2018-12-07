import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCart} from '../ducks/reducer'
import 'font-awesome/css/font-awesome.min.css';

class CartItem extends Component {

    updateQuantity = (update) => {
        let {id, quantity} = this.props.cartItem
        if(update === 'up') {
            quantity++
        } else if (update === 'down') {
         quantity--   
        }
        axios.put(`/api/cart/${id}?quantity=${quantity}`).then(results => {
            this.props.getCart(results.data)
        })
    }

    deleteItem = () => {
        axios.delete(`/api/cart/${this.props.cartItem.id}`).then(results => {
            this.props.getCart(results.data)
        })
    }

    render() {
        let {brand, price, quantity, img_url, model, color, frame, lens } = this.props.cartItem
        return (
            <div className="cart-items">
                <div className="board_description">
                    <img width="150" src={img_url} alt=""/>
                    <p>
                        
                        <p>{brand}</p>
                        <p>{model}</p>
                        <p>{color}</p>
                        {brand === 'Electric' ?
                            <p>frame: {frame}<br></br>
                                lens: {lens}</p>
                            :
                            <div></div>
                        }
                        <p>${price}</p>
                    </p>
                </div>
    
                <div className="quantity-button">
                    <h3>Quantity: {quantity}</h3>
                    <i class="fa fa-plus-square" onClick={() => this.updateQuantity('up')}></i>
                    <i class="fa fa-minus-square" onClick={() => this.updateQuantity('down')}></i>
                    
                </div>
                <br></br>
                <button className="cart-button" onClick={this.deleteItem}>Remove</button>
            </div>
        )
    }
}

export default connect(null, {getCart})(CartItem)