import React, { Component } from 'react';
import itemActions from "../../../services/itemActions";
import TopLine from "../TopLine";
import UserNavigation from "../Navigation/UserNavigation";
import LoadingPage from "../../other/LoadingPage";
import '../../../stylesheets/sass/selectedItem.css';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import { actions } from "../../../actions/actions";
import helperfunctions from "../../../services/helperfunctions";
import {bindActionCreators} from 'redux';

class SelectedItem extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            item: '',
            isLoading: false,
            error: false,
            cartItems: [],
            itemsToBuy: 1,
            itemShortage: false,
            itemsInCart: ''
        }
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        if(this.props.match) {
            const id = (this.props && this.props.location && this.props.location.state && this.props.location.state.id) || '';
            if(id) {
                this.loadItem(id);
            }
            let storageCartItems = JSON.parse(localStorage.getItem('cartItems'));
            if(storageCartItems) {
                this.setItemsInCart(storageCartItems);
            }
        }
        let storageCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if(storageCartItems) {
            this.setItemsInCart(storageCartItems);
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.location && nextProps.location.state && nextProps.location.state.id) {
            const id = nextProps.location.state.id;
            this.loadItem(id);
        } else {
            this.setState({error: true})
        }
    }

    setQuantity() {
        let storageCartItems = JSON.parse(localStorage.getItem('cartItems'));
        let sameItem = 0;
        if(storageCartItems && storageCartItems.length > 0) {
            storageCartItems.forEach(item => {
                if (item._id === this.state.item._id) {
                    sameItem += item.count;
                }
            });
        }
        const item = helperfunctions.arrayClone(this.state.item);
        item.quantity = item.quantity - sameItem;
        this.setState({item: item, itemsInCart: sameItem});
    }

    async loadItem (id) {
        itemActions.increaseClickPoint(id);
        const item = await itemActions.getItemById(id);
        if(!item) {
            this.setState({ error: true, isLoading: false })
        } else {
            this.setState({ item: item[0], isLoading: false });
            this.setQuantity();
        }
    }
    removeFromCart() {
        if (this.state.itemShortage) {
            this.setState({itemShortage: false})
        }
        let storageCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storageCartItems && storageCartItems.length > 0) {
            storageCartItems = this.checkIfAlreadyInCart(storageCartItems, false);
            this.setItemsInCart(storageCartItems, false);
            this.setQuantityAddToCart(false);
            if (this.state.itemsInCart === 1) {
                let itemToDelete = storageCartItems.find(item => item._id === this.state.item._id);
                storageCartItems = storageCartItems.filter(item => {
                    if (itemToDelete) {
                        return item._id !== itemToDelete._id;
                    } else {
                        return false;
                    }
                });
            }
            localStorage.setItem('cartItems', JSON.stringify(storageCartItems));
            this.props.setCartItems(storageCartItems);
        }
    }

    addToCart() {
        let storageCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if(storageCartItems && storageCartItems.length > 0) {
            const noShortage = this.checkQuantities(); // Check if there are enough items to sell
            if(noShortage) {
                this.setState({ itemShortage: false });
                this.setQuantityAddToCart(); // Change selectedItem's quantity in page
                storageCartItems = this.checkIfAlreadyInCart(storageCartItems);
                localStorage.setItem('cartItems', JSON.stringify(storageCartItems));
                this.props.setCartItems(storageCartItems);
                this.props.setCartItemsCount(storageCartItems.length);
                this.props.setCartItems(storageCartItems);
                this.setItemsInCart(storageCartItems);
            } else {
                this.setState({ itemShortage: true })
            }
        } else {
            const noShortage = this.checkQuantities();
            if (noShortage) {
                this.setState({ itemShortage: false });
                const itemToBuy = helperfunctions.arrayClone(this.state.item);
                itemToBuy.count = 1;  // Set count to 1 before adding first item to cart
                localStorage.setItem('cartItems', JSON.stringify([itemToBuy]));
                this.props.setCartItems([itemToBuy]);
                this.props.setCartItemsCount([itemToBuy].length);
                this.setQuantityAddToCart();
                this.setItemsInCart([itemToBuy]);
            } else {
                this.setState({ itemShortage: true });
                this.setQuantityAddToCart();
            }
        }
    }

    setItemsInCart(array, add=true) {
        let theItem = array.find(item => item._id === this.state.item._id);
        if (theItem) {
            this.setState({itemsInCart: theItem['count']})
        } else {
            if(add) {
                this.setState({itemsInCart: 1})
            }
        }
    }

    checkIfAlreadyInCart(cartItems, add=true) {
        const result = cartItems.findIndex(item => {
            return(
                item._id === this.state.item._id
            )
        });
        if (result !== -1) {
            if (cartItems[result] && cartItems[result].count) {
                if(add) {
                    cartItems[result].count++;
                } else {
                    cartItems[result].count--;
                }
            } else {
                if(add) {
                    cartItems[result].count = 1;
                }
            }
        } else {
            if(add) {
                let newItem = helperfunctions.arrayClone(this.state.item);
                newItem.count = 1;
                cartItems.push(newItem);
            }
        }
        return cartItems
    }

    setQuantityAddToCart(add=true) {
        const item = helperfunctions.arrayClone(this.state.item);
        if(add) {
            item.quantity = this.state.item.quantity - this.state.itemsToBuy;
        } else {
            if(this.state.itemsInCart > 0) {
                item.quantity = this.state.item.quantity + this.state.itemsToBuy;
            }
        }
        this.setState({item: item});
    }

    checkQuantities() {
        return this.state.item.quantity - this.state.itemsToBuy >= 0;
    }


    render() {
        const { item, isLoading, itemShortage, itemsInCart } = this.state;
        if(item) {
            return (
                <div>
                    <TopLine/>
                    <UserNavigation/>
                    {isLoading ?
                        <LoadingPage/> :
                        <div className={'selectedItemGrid'}>
                            <div className={'itemCol1'}>
                                <h1>{item.name}</h1>
                                <Link to={'/produktai/Medus'}><h3>{item.category}</h3></Link>
                                <img alt={item.name} className={'selectedItemPicture'} src={item.picture}/>
                                <h4> Svoris: {item.properties.weight}kg</h4>
                            </div>
                            <div className={'itemCol2'}>
                                <h3> Aprašymas </h3>
                                <p>{item.properties.description}</p>
                                <h3>Kaina: <br/>{item.price} &euro;</h3>
                                <pre>Prekių sandėlyje: {item.quantity}</pre>
                                <div className={'buySection'}>
                                    <div className={'quantitySelect'}>
                                        <button className={'btn remBtn'} onClick={() => this.removeFromCart()}>-
                                        </button>
                                        <input type={'text'} className={'itemQuantity'} value={itemsInCart} readOnly/>
                                        <button className={'btn addBtn'} onClick={() => this.addToCart()}> +</button>
                                    </div>
                                </div>
                                <br/><br/>
                                {itemShortage ? <p> Sandėlyje nėra pakankamai prekių, atsiprašome :( </p> : ''}
                            </div>
                        </div>
                    }
                </div>
            )
        } else {
            return (
                <LoadingPage/>
            )
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(SelectedItem);