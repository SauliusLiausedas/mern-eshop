import React, { Component } from 'react';
import itemActions from "../../../../services/itemActions";
import LoadingPage from "../../../other/LoadingPage";
import Offline from "../../../other/handleErrors/Offline";
import MainPageItemView from "./MainPageItemView";


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
                    <MainPageItemView items={this.state.items}/>
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