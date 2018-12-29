import React, { Component } from 'react';
import itemActions from "../../../../services/itemActions";
import LoadingPage from "../../../other/LoadingPage";
import ItemDescription from "./ItemDescription";
import Offline from "../../../other/handleErrors/Offline";
import { Link } from 'react-router-dom';

class PromotedItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: []
        }
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        this.setState({isLoading: true});
        itemActions.pickPromotedItems(4)
            .then((items) => {
                this.setState({items: items, isLoading: false})
            })
            .catch((err) => {
                console.log('This error: '+err);
                this.setState({isLoading: false});
            });
    }

    render() {
        const { items, isLoading } = this.state;
        if(isLoading) {
            return(
                <LoadingPage page={'pageCenter'}/>
            )
        } else {
            if(items.length > 0) {
                return (
                    <div className={'promoItems'}>
                        {items.map((item, i) => {
                            const itemPath = `/produktai/${item.category}/${item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ').join('-')}-${item.properties.weight}`;
                            return (
                                <div key={i} className={'promoItem'}>
                                    <h3>{item.name}</h3>
                                    <Link to={{
                                        pathname: itemPath,
                                        state: {
                                            id: item._id
                                        }}}>
                                        <img src={item.picture} alt={item.name} className={'promoItemPicture'}/>
                                    </Link>
                                    <ItemDescription description={item.properties.description}/>
                                </div>
                            )
                        })}
                    </div>
                )
            } else {
                return(
                    <div>
                        <Offline page={'promoted'}/>
                    </div>
                )
            }
        }
    }
}

export default PromotedItems