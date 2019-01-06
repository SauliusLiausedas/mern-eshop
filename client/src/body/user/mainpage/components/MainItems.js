import React, { Component } from 'react';
import itemActions from "../../../../services/itemActions";
import helperfunctions from "../../../../services/helperfunctions";
import MainPageItemView from "./MainPageItemView";
import LoadingPage from "../../../other/LoadingPage";

class MainItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            itemCount: 0,
            itemsInLine: 4,
            itemsToShow: [],
            noMoreItems: false
        }
    }

    componentDidMount() {
        this.loadItems(this.state.itemsInLine*2, this.state.itemCount);
    }

    async loadItems(limit, offset) {
        this.setState({isLoading: true});
        let itemsShowing = helperfunctions.arrayClone(this.state.itemsToShow);
        let loadedItems = await itemActions.getSomeItems(limit, offset);
        const itemCount = limit + offset;
        if(typeof(loadedItems) !== 'string') {
            let itemsToShow = itemsShowing.concat(loadedItems);
            if(this.state.itemCount > 11) {
                itemsToShow.splice(0, 4);
            }
            if(itemsToShow) {
                this.setState({itemsToShow: itemsToShow, itemCount: itemCount, isLoading: false});
                if(loadedItems.length < limit) {
                    this.setState({noMoreItems: true})
                }
            }
        } else {
            this.setState({noMoreItems: true, isLoading: false})
        }
    }

    render() {
        const { itemsToShow, itemsInLine, itemCount, isLoading } = this.state;
        return (
            <div>
                <h2 className={'itemsHeader'}>Visos prekės</h2>
                <MainPageItemView items={itemsToShow}/>
                <div className={'mainItemsBtn'}>
                    {isLoading ? <LoadingPage page={'mainItems'}/> : ''}
                    {this.state.noMoreItems ? <h3>Peržiūrėjote visas prekes</h3>
                        : <button className={'btn loadMoreBtn'}
                                  onClick={() => this.loadItems(itemsInLine, itemCount)}>Rodyti daugiau</button>}
                </div>
            </div>
        )
    }
}

export default MainItems