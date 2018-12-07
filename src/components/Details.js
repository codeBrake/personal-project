import React, {Component} from 'react';
import axios from 'axios';
import Header from '../components/Header'
import Footer from '../components/Footer'
import {connect} from 'react-redux'
import {getCart} from '../ducks/reducer'


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
    render(){
        
        let itemToDisplay = this.state.item.map(item => {
            let {id} = item
            return (
                <section className="detail-section">
                    <div className="product-profile">
                        
                        <div className="profile-container">
                            <div className="product">
                                <div>
                                    
                                    <img src={`${item.img_url}`} style={{height: 400, width: 400}} alt=""/> 
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
                                    <div></div>
                                    }
                                </div>
                            </div>
                            {
                                item.category === 'boards' ?
                                <div className="rider-profile">
                                    
                                        <div >
                                            <h1>{item.rider_name}</h1>
                                            <img id="profile-img" src={`${item.profile_img_url}`} style={{height: 300, width: 400}} alt=""/>
                                                <p>{item.bio}</p>
                                                <iframe className="youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                        </div>
                                </div>
                                : item.category === 'boots' ?
                                    <div className="rider-profile">
                                        <p>{item.bio}</p>
                                        <iframe className="youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                                    </div>
                                :
                                item.category === 'goggles' ?
                                    <div className="rider-profile">
                                        <p>{item.bio}</p>
                                        <iframe className="youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                                    </div>
                                :
                                item.category === 'bindings' ?
                                    <div className="rider-profile">
                                        <p>{item.bio}</p>
                                        <iframe className="youtube" width="800" height="500" src={item.video_url} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


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
                <div>
                    {itemToDisplay}
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
