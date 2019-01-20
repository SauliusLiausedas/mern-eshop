import React, { Component } from 'react';
import itemActions from "../../../services/itemActions";
import TopLine from "../TopLine";
import UserNavigation from "../Navigation/UserNavigation";
import LoadingPage from "../../other/LoadingPage";
import '../../../stylesheets/sass/selectedItem.css';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {actions, testFetch} from "../../../actions/actions";
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
            itemShortage: false
        }
    }

    componentWillMount() {
        const id = (this.props && this.props.location && this.props.location.state && this.props.location.state.id) || '';
        if(id) {
            this.loadItem(id);
        }
    }

    setQuantity() {
        let storageCartItems;
        storageCartItems = JSON.parse(localStorage.getItem('cartItems'));
        let sameItem = 0;
        if(storageCartItems && storageCartItems.length > 0) {
            storageCartItems.forEach(item => {
                if (item._id === this.state.item._id) {
                    sameItem += 1;
                }
            });
        }
        const item = helperfunctions.arrayClone(this.state.item);
        item.quantity = item.quantity - sameItem;
        this.setState({item: item});
    }

    async loadItem (id) {
        this.setState({isLoading: true});
        itemActions.increaseClickPoint(id);
        const item = await itemActions.getItemById(id);
        testFetch(this.props.dispatch, id);
        if(!item) {
            this.setState({isLoading: false, error: true})
        } else {
            this.setState({item: item[0], isLoading: false});
            this.setQuantity();
        }
    }

    addToCart() {
        let storageCartItems;
        storageCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if(storageCartItems) {
            const noShortage = this.checkQuantities();
            if(noShortage) {
                this.setQuantityAddToCart();
                for (let i = 0; i < this.state.itemsToBuy; i++) {
                    storageCartItems.push(this.state.item);
                }
                localStorage.setItem('cartItems', JSON.stringify(storageCartItems));
                this.props.setCartItemsCount(storageCartItems.length);
                this.props.addCartItem(storageCartItems);
            } else {
                this.setState({itemShortage: true})
            }
        } else {
            const noShortage = this.checkQuantities();
            if (noShortage) {
                this.setState({itemShortage: false});
                const cartArrayToStorage = [];
                for (let i = 0; i < this.state.itemsToBuy; i++) {
                    cartArrayToStorage.push(this.state.item);
                }
                localStorage.setItem('cartItems', JSON.stringify(cartArrayToStorage));
                this.props.setCartItemsCount(this.state.itemsToBuy);
                this.setQuantityAddToCart();
            } else {
                this.setState({itemShortage: true});
                this.setQuantityAddToCart();
            }
        }
    }

    setQuantityAddToCart() {
        const item = helperfunctions.arrayClone(this.state.item);
        item.quantity = this.state.item.quantity - this.state.itemsToBuy;
        this.setState({item: item});
    }

    checkQuantities() {
        return this.state.item.quantity - this.state.itemsToBuy >= 0;
    }


    render() {
        const { item, isLoading, itemsToBuy, itemShortage } = this.state;
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
                            <img alt={item.name} className={'selectedItemPicture'} src={item.picture} />
                            <h4> Svoris: {item.properties.weight}kg</h4>
                        </div>
                        <div className={'itemCol2'}>
                            <h3> Aprašymas </h3>
                            <p>{item.properties.description}</p>
                            <h3>Kaina: <br/>{item.price} &euro;</h3>
                            <pre>Prekių sandėlyje: {item.quantity}</pre>
                            <div className={'buySection'}>
                                <div className={'quantitySelect'}>
                                    <label> Pasirinkite kiekį </label><br/>
                                    <input type={'number'} value={ itemsToBuy } className={'itemQuantity'} onChange={(e) => this.setState({itemsToBuy: e.target.value})} min={1} max={item.quantity}/>
                                </div>
                                <button className={'btn buyBtn'} onClick={() => this.addToCart()}> Dėti į krepšelį </button>
                                <button className={'btn'}> Pirkti dabar </button>
                            </div><br/><br/>
                            {itemShortage ? <p> Sandėlyje nėra pakankamai prekių, atsiprašome :( </p> : ''}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators(actions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(SelectedItem);