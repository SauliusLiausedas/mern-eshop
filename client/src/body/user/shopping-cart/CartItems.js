import React, { Component } from 'react';
import {connect} from "react-redux";
import {actions} from "../../../actions/actions";

class CartItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsQuantities: []
        }
    }

    componentWillMount() {
        console.log(this.props.items);
    }

    getCartItemCount() {
        if(this.props.items.length === 0) {
            return (
                <p className={'noMargin cartItemCount'}> Jūsų krepšelis tuščias </p>
            )
        } else if (this.props.items.length > 9 && this.props.items.length < 21) {
            return (
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.items.length} prekių </p>
            )
        } else if (this.props.items.length % 10 === 1) {
            return(
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.items.length} prekė </p>
            )
        } else if (this.props.items.length % 10 === 0) {
            return(
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.items.length} prekių </p>
            )
        } else {
            return(
                <p className={'noMargin cartItemCount'}> Krepšelyje {this.props.items.length} prekės </p>
            )
        }
    }

    render() {
        const { items } = this.props;
        let totalPrice = 0;
        const sameItems = [];
        items.forEach(item => {
            sameItems.push(items.filter((checkItem) => {
                return checkItem._id === item._id
            }))
        });
        //TODO filter items so there would not be two same items in cart
        console.log(sameItems);
        return (
            <div className={'cartItems'}>
                {this.getCartItemCount()}
                {items.length > 0 ?
                    items.map((item, i) => {
                        totalPrice += item.price;
                        return(
                            <ul key={i}>
                                <li>
                                    <div className={'listGrid'}>
                                        <img className={'cartItemImg'}
                                             src={item.picture} alt={item.name}/>
                                        <h3> {item.name} </h3><br/>
                                        <p> {item.properties.description}</p>
                                        <div><p>Kiekis: </p><input type={'number'} min={0} onChange={(e) => this.setBuyCount(e)} max={item.quantity}/><p
                                            className={'right'}> Kaina: {item.price} &euro;</p></div>
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