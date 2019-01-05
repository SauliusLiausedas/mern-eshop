import React, { Component } from 'react';
import userActions from '../../services/userActions';
import '../../stylesheets/sass/users.css';
import UserNavigation from '../user/Navigation/UserNavigation';
import AdminNavigation from './components/AdminNavigation';
import AddNewUser from './components/AddNewUser';
import help from '../../services/helperfunctions';
import UsersTable from "./components/UsersTable";
import LoadingPage from "../other/LoadingPage";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            addNewUser: false
        }
    }

    componentWillMount() {
        this.setState({isLoading: true});
        help.verification()
            .then((verified) => {
                if(verified) {
                    this.users();
                }
            })
    }

    async users() {
        this.setState({isLoading: true});
        let users = await userActions.getUsers();
        this.setState({isLoading: false, users: users});
    }

    async removeUser(id) {
        const token = localStorage.getItem('token');
        userActions.deleteUser(id, token)
        .then(() => this.users())
            .catch(err => console.log(err))
    }

    userAdded() {
        this.users();
        this.setState({addNewUser: false})
    }

    render() {
        const { users, isLoading, addNewUser } = this.state;
        return(
            <div>
                <UserNavigation/>
                <AdminNavigation/>
                <div className={'tableDiv ' + help.addClass(addNewUser, 'short')}>
                    {isLoading ? <LoadingPage page={'adminUsers'}/> : <UsersTable users={users} removeUser={(e) => this.removeUser(e)} />}
                </div>
                <button className='btn newUserBtn' onClick={() => this.setState({addNewUser: !addNewUser})}>{!addNewUser ? 'Pridėti naują' : 'Atšaukti'}</button>
                {addNewUser ? <AddNewUser added={() => this.userAdded()}/> : ''}
            </div>
        )
    }
}

export default Users