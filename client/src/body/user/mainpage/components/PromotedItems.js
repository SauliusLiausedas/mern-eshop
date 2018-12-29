import React, { Component } from 'react';
import itemActions from "../../../../services/itemActions";
import LoadingPage from "../../../other/LoadingPage";

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
        itemActions.pickPromotedItems(5)
            .then((items) => this.setState({items: items, isLoading: false}))
    }

    render() {
        const { items, isLoading } = this.state;
        if(isLoading) {
            return(
                <LoadingPage page={'pageCenter'}/>
            )
        } else {
            return(
                <div>
                    {items.map((item, i) => {
                        return(
                            <ul key={i}>
                                <li>{item.name}</li>
                                <li>{item.quantity}</li>
                                <li>{item.clickPoints}</li>
                            </ul>
                        )
                    })}
                </div>
            )
        }
    }
}

export default PromotedItems