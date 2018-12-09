import React, {Component} from 'react';
import axios from 'axios';
import Header from '../components/Header'
import Footer from '../components/Footer'
import {connect} from 'react-redux'
import {getCart} from '../ducks/reducer'
import {Link} from 'react-router-dom'


class Details extends Component {
    constructor(){
        super()

        this.state = {
            item: []
            
        }
    }
    componentDidMount(){
        axios.get(`/api/products/${this.props.match.params.id}`).then(response => {
            console.log(1111111, response)
            this.setState({
                item: response.data
            })
        })
    }
    
    addToCart = (id) => {
        axios.post(`/api/cart`, { product_id: id }).then(results => {
            this.props.getCart(results.data)
        })
    }
    goBack = () => {
        window.history.back()
    }
    render(){
        
        let itemToDisplay = this.state.item.map(item => {
            let {id} = item
            return (
                <section className="detail-section">
                    <div className="product-profile">
                        
                        <div className="profile-container">
                            <div className="product">
                                <div>
                                    
                                    <img className="mobile-product" src={`${item.img_url}`} style={{height: 500, width: 450}} alt=""/> 
                                </div>
                                <div className="board-info">
                                    <h1>{item.brand}</h1>
                                    <h1>{item.model}</h1>
                                    <h1>{item.lens}</h1>
                                    <h1>{item.frame}</h1>
                                    <h1>{item.color}</h1>
                                    <h1>${item.price}</h1>

                                    {this.props.isAuthenticated ? 
                                
                                    <button className="cart-button" onClick={() => this.addToCart(id)}>Add to Cart</button>
                                    :
                                    <Link to="/login"><button className="cart-button">Add to Cart</button></Link>

                                    }
                                </div>
                                
                            </div>
                            {
                                item.category === 'boards' ?
                                <div className="rider-profile">
                                    
                                                <iframe className="youtube" id="boards-youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                            <div className="boards-bio">
                                                <h1>{item.rider_name}</h1>
                                                <p id="bio-none">{item.bio}</p>

                                            </div>
                                            <img className="profile-img" src={`${item.profile_img_url}`} style={{height: 400, width: 450}} alt=""/>
                                        
                                </div>
                                : item.category === 'boots' ?
                                    <div className="rider-profile">
                                        <iframe className="youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        <p>{item.bio}</p>

                                    </div>
                                :
                                item.category === 'goggles' ?
                                    <div className="rider-profile">
                                        <iframe className="youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        <p>{item.bio}</p>

                                    </div>
                                :
                                item.category === 'bindings' ?
                                    <div className="rider-profile">
                                        <iframe className="youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        <p>{item.bio}</p>


                                    </div>
                                :
                                (null)
                            }
                        </div>
                            

                    </div>
                        
                </section>
            )
        })
        return(
            <div>
                <Header {...this.props}/>
                <div className="details-div">
                    {itemToDisplay}
                    <button className="back-button" onClick={this.goBack}>Back</button>
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
export default connect(mapStateToProps, {getCart})(Details)
