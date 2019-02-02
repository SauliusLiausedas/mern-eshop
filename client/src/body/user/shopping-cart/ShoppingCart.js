import React, { Component } from 'react';
import '../../../stylesheets/sass/shoppingCart.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartItems from "./CartItems";
import {connect} from "react-redux";
import {actions} from "../../../actions/actions";
library.add(faShoppingCart);

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCartItems: false
        }
    }

    componentWillMount() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if(cartItems) {
            this.props.setCartItems(cartItems);
            this.props.setCartItemsCount(cartItems.length);
        }
    }

    showCartItems(e) {
        if(e.target.id === 'shoppingCart' || e.target.id === 'shoppingCartIcon' || e.target.id === 'shoppingCartNotification' || e.target.tagName === 'path') {
            this.setState({showCartItems: !this.state.showCartItems})
        }
    }

    setCartSameItemsCount(e) {
        this.props.setCartItemsCount(e);
    }

    render() {
        const { showCartItems } = this.state;
        return(
                <div id={`shoppingCart`} className={`${showCartItems}`} onClick={(e) => this.showCartItems(e)}>
                    <FontAwesomeIcon id={'shoppingCartIcon'} icon="shopping-cart"/>
                    {this.props.cartItemsCount > 0 ? <div id={'shoppingCartNotification'}>{this.props.cartItemsCount}</div> : ''}
                    {showCartItems > 0 ? <CartItems buyCount={(e) => this.setCartSameItemsCount(e)} cartItems={this.props.cartItems}/> : ''}
                </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, actions)(ShoppingCart);