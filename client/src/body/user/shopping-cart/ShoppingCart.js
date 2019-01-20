import React, { Component } from 'react';
import Draggable from 'react-draggable';
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
            showCartItems: false,
            itemsInCart: []
        }
    }

    componentWillMount() {
        const itemsInCart = JSON.parse(localStorage.getItem('cartItems'));
        if(itemsInCart) {
            this.setState({itemsInCart: itemsInCart});
            this.props.setCartItemsCount(itemsInCart.length);
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
        const { itemsInCart, showCartItems } = this.state;
        return(
            <Draggable
                axis="both"
                handle="#shoppingCart"
                defaultPosition={{x: 0, y: 30}}
                position={null}
                grid={[10, 10]}
                scale={1}
                bounds={{top: 0, bottom: 1000, left: -2000, right: 0}}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div id={`shoppingCart`} title={'Double click to view your items'} className={`${showCartItems}`} onDoubleClick={(e) => this.showCartItems(e)}>
                    <FontAwesomeIcon id={'shoppingCartIcon'} icon="shopping-cart"/>
                    {this.props.cartItemsCount > 0 ? <div id={'shoppingCartNotification'}>{this.props.cartItemsCount}</div> : ''}
                    {showCartItems > 0 ? <CartItems buyCount={(e) => this.setCartSameItemsCount(e)} items={itemsInCart}/> : ''}
                </div>
            </Draggable>

        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, actions)(ShoppingCart);