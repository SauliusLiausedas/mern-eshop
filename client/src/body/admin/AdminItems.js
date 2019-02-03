import React, { Component } from 'react';
import Navigation from "../user/Navigation/UserNavigation";
import '../../stylesheets/sass/AdminItems.css';
import LoadingPage from "../other/LoadingPage";
import AdminNavigation from "./components/AdminNavigation";
import itemActions from "../../services/itemActions";
import ItemsTable from "./components/ItemsTable";
import help from "../../services/helperfunctions";
import AddNewItem from "./components/AddNewItem";

class AdminItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            items: '',
            addItem: false
        }
    }

    componentWillMount() {
        this.setState({isLoading: true});
        help.verification()
            .then((verified) => {
                if (verified) {
                    this.getItems();
                }
            })
    }

    removeItem(id) {
        const token = localStorage.getItem('token');
        itemActions.deleteItem(id, token)
            .then(() => this.getItems())
            .catch(err => console.log(err))
    }

    async getItems() {
        this.setState({isLoading: true});
        const items = await itemActions.getItems();
        console.log(items);
        this.setState({isLoading: false, items: items})
    }

    render() {
        const {isLoading, items, addItem} = this.state;
        return (
            <div>
                <Navigation/>
                <AdminNavigation/>
                <div className={'tableDiv ' + help.addClass(addItem, 'short')}>
                    {isLoading ? <LoadingPage page={'adminUsers'}/> : <ItemsTable items={items} removeItem={(e) => this.removeItem(e)} />}
                </div>
                <button className='btn newUserBtn' onClick={() => this.setState({addItem: !addItem})}>{!addItem ? 'Pridėti naują' : 'Atšaukti'}</button>
                {addItem ? <AddNewItem added={() => this.userAdded()}/> : ''}
            </div>
        )
    }
}

export default AdminItems