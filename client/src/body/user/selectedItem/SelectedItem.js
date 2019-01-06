import React, { Component } from 'react';
import itemActions from "../../../services/itemActions";
import TopLine from "../TopLine";
import UserNavigation from "../Navigation/UserNavigation";
import LoadingPage from "../../other/LoadingPage";
import '../../../stylesheets/sass/selectedItem.css';

class SelectedItem extends Component {
    constructor(props) {
        super(props);
        this.state=  {
            item: '',
            isLoading: false,
            error: false
        }
    }

    componentWillMount() {
        const id = (this.props && this.props.location && this.props.location.state && this.props.location.state.id) || '';
        if(id) {
            this.loadItem(id)
        }
    }

    async loadItem (id) {
        this.setState({isLoading: true});
        itemActions.increaseClickPoint(id);
        const item = await itemActions.getItemById(id);
        if(!item) {
            this.setState({isLoading: false, error: true})
        }
        this.setState({item: item[0], isLoading: false});
    }

    render() {
        const { item, isLoading } = this.state;
        return (
            <div>
                <TopLine/>
                <UserNavigation/>
                {isLoading ?
                    <LoadingPage/> :
                    <div className={'selectedItemGrid'}>
                        <div className={'itemCol1'}>
                            <h1>{item.name}</h1>
                            <h3>{item.category}</h3>
                            <img alt={item.name} className={'selectedItemPicture'} src={item.picture} />
                            <h4> Svoris: {item.properties.weight}kg</h4>
                        </div>
                        <div className={'itemCol2'}>
                            <h3> Aprašymas </h3>
                            <p>{item.properties.description}</p>
                            <h3>Kaina: <br/>{item.price} &euro;</h3>
                            <pre>Prekių sandėlyje: {item.quantity}</pre>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default SelectedItem