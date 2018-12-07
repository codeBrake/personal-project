import React, { Component } from 'react';
import './App.css';
import Cart from './components/Cart'
import Landing from './components/Landing'
import 'font-awesome/css/font-awesome.min.css';
import {Switch, Route} from 'react-router-dom'
import Details from './components/Details'
import Boards from './components/Boards'
import Login from './components/Login'
import Policy from './components/Policy'
import Warranty from './components/Warranty'
import Register from './components/Register'
import SearchedFor from './components/SearchedFor';
import Boots from './components/Boots'
import Bindings from './components/Bindings'
import Goggles from './components/Goggles'
import CheckOut from './components/CheckOut'
import axios from 'axios';
import {connect} from 'react-redux'
import {userLoggedIn} from './ducks/reducer'
import {HashRouter} from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements';



class App extends Component {
  constructor(){
    super()

    this.state = {
      isLoading: true
    }
  }

  componentDidMount(){
    axios.get('/auth/currentUser').then(response => {
      if(response.data){
        this.props.userLoggedIn(response.data)
      }

      this.setState({
        isLoading: false
      })
    })
  }



  render() {
    return this.state.isLoading ?
      <div></div>
      :
      <StripeProvider apiKey="pk_test_Z3o07dTKcGwrnzwNnWDLQtlF">
        <HashRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/cart" component={Cart}/>
              <Route path="/boards" component={Boards}/>
              <Route path="/details/:id" component={Details}/>
              <Route path="/login" component={Login}/>
              <Route path="/policy" component={Policy}/>
              <Route path="/warranty" component={Warranty}/>
              <Route path="/register" component={Register}/>
              <Route path="/search" component={SearchedFor}/>
              <Route path="/32boots" component={Boots}/>
              <Route path="/bindings" component={Bindings}/>
              <Route path="/goggles" component={Goggles}/>
              <Elements>
                <Route path="/checkout" component={CheckOut}/>
              </Elements>
            </Switch>
          </div>
        </HashRouter>
      </StripeProvider>
      
      
  } 
}

export default connect(null, {userLoggedIn})(App);

