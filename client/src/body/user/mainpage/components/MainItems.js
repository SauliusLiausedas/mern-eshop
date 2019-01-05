import React, { Component } from 'react';
import itemActions from "../../../../services/itemActions";

class MainItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            itemCount: 0,
            itemsInLine: 4,
            itemsToShow: []
        }
    }

    componentDidMount() {
        this.getItems(this.state.itemsInLine*2, this.state.itemCount);
    }

    async getItems(limit, offset) {
        let itemsToShow = await itemActions.getSomeItems(limit, offset);
        if(itemsToShow) {
            //TODO implement itemstoshow with .push()
            console.log(itemsToShow);
            this.setState({itemsToShow: itemsToShow})
        }
    }
//TODO item show component
    render() {
        return(
            <div>
                MAIN ITEM
            </div>
        )
    }
}

export default MainItems