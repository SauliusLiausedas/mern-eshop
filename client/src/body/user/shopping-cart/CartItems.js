import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../../actions/actions";
import { Link } from 'react-router-dom';
import helperfunctions from "../../../services/helperfunctions";

class CartItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsQuantities: []
        }
    }

    getCartItemCount() {
        if(this.props.cartItems.length === 0) {
            return (
                <p className={'noMargin cartItemCount'}> Jūsų krepšelis tuščias </p>
            )
        } else if (this.props.cartItems.length > 9 && this.props.cartItems.length < 21) {
            return (
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.cartItems.length} prekių </p>
            )
        } else if (this.props.cartItems.length % 10 === 1) {
            return(
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.cartItems.length} prekė </p>
            )
        } else if (this.props.cartItems.length % 10 === 0) {
            return(
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.cartItems.length} prekių </p>
            )
        } else {
            return(
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.cartItems.length} prekės </p>
            )
        }
    }

    changeItemCount(i, plus=true, quantity) {
        let itemArray = helperfunctions.arrayClone(this.props.cartItems);
        if(plus) {
            if(itemArray[i].count < quantity && itemArray[i].count > 0) {
                itemArray[i].count++;
            } else if (itemArray[i].count === 0) {
                itemArray[i].count++;
                this.props.setCartItemsCount(this.props.cartItemsCount + 1);
            }
        }  else {
            if(itemArray[i].count > 1) {
                itemArray[i].count--;
            }
        }
        localStorage.setItem('cartItems', JSON.stringify(itemArray));
        this.props.setCartItems(itemArray);

    }

    removeCartItem(i) {
        let itemArray = helperfunctions.arrayClone(this.props.cartItems);
        itemArray.splice(i, 1);
        localStorage.setItem('cartItems', JSON.stringify(itemArray));
        this.props.setCartItems(itemArray);
        this.props.setCartItemsCount(this.props.cartItemsCount - 1);
    }

    render() {
        const { cartItems } = this.props;
        let totalPrice = 0;
        return (
            <div className={'cartItems'}>
                {this.getCartItemCount()}
                {cartItems.length > 0 ?
                    cartItems.map((item, i) => {
                        totalPrice += item.price * item.count;
                        let href = '/produktai/' + item.category + '/' + item.name.split(' ').join('-') + '-' + item.properties.weight;
                        return(
                            <ul key={i}>
                                <li>
                                    <div className={'listGrid'}>
                                        <img className={'cartItemImg'}
                                             src={item.picture} alt={item.name}/>
                                        <Link to={{
                                            pathname: href,
                                            state: {
                                                id: item._id
                                            }}}><h3> {item.name} </h3></Link><br/>
                                        <p> {item.properties.description}</p>
                                        <div>
                                            <button title={'Nuimti'} className={'btn'} onClick={() => this.changeItemCount(i, false, item.quantity)}>-</button>
                                            <input type={'text'} readOnly
                                                   value={item.count}/>
                                            <button title={'Pridėti'} className={'btn'} onClick={() => this.changeItemCount(i, true, item.quantity)}>+</button>
                                            <p className={'right'}> Kaina: {item.price * item.count} &euro;</p>
                                            <button className={'btn buttonRemove'}
                                                    title={'Išimti iš krepšelio'} onClick={() => this.removeCartItem(i)}> X </button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        )
                    })
                    :
                    <ul>
                        <li>
                            <div className={'listGrid empty'}>
                                <p>Pridėkite prekių į krepšelį! </p>
                            </div>
                        </li>
                    </ul>
                }
                <p className={'noMargin noPadding'}> Bendra kaina: {totalPrice} &euro;</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, actions)(CartItems);