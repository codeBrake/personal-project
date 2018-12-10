import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import {getCart} from '../ducks/reducer'
import {connect} from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
        complete: false
    }
    this.submit = this.submit.bind(this);

  }
  

  async submit(ev) {
      try{

      
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let cartTotal = this.props.cart.map(e => {
        let change = (e.quantity * e.price) + ''
        console.log(11111, change)
        
        return Math.ceil(e.quantity * e.price)
        
    }).reduce((acc, cv) => {
        return acc + cv
    }, 0 )
    
    axios.post('/charge', {
        
        headers: {"Content-Type": "text/plain"},
        data: {token: token.id},
        amount: cartTotal
      
    
    }).then(response => {
        if(this.props.cart[0]) {
                    axios.delete('/api/cart/checkout').then(results => {
                        this.props.getCart(results.data)
                        this.props.history.push('/receipt')
                        toast.success('Purchase Complete!')
                    })
                } else{
                    toast.error('Cart is empty')
                    
                }
        console.log(response)
    })
    }catch(err){
        console.log(err.response)
        toast.error('Invalid form of payment, or cart is empty')
    }

    // if (response.ok) console.log("Purchase Complete!")
  }

  render() {
    let cartTotal = this.props.cart.map(e => {
        return e.quantity * e.price
    }).reduce((acc, cv) => {
        return acc + cv
    }, 0 )
      if(this.state.complete) return <h1>Purchase Complete</h1>
    return (
        <div>
            <Header {...this.props}/>
            <div className="checkout-page">

                <div className="checkout">
                    <div>
                        <h3>Please enter valid payment to continue with your purchase</h3>
                        <br></br>
                        <CardElement style={{base: {fontSize: '22px'}}}className="payment"/>
                    </div>
                    <div className="total-purchase">
                        <h4>Total Amount: {Math.floor(cartTotal * 100) /100}</h4>
                        <br></br>
                        <button className="checkout-button" onClick={this.submit}>Purchase</button>
                    </div>
                </div>
            </div>
            <div id="footer">
                <Footer/>

            </div>

        </div>
    );
  }
}
function mapStateToProps(state) {
    
    return {
        cart: state.cart

    }
}


export default connect(mapStateToProps, {getCart})(injectStripe(CheckOut));