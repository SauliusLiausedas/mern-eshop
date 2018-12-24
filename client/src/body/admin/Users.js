import React, { Component } from 'react';
import userActions from '../../services/userActions';
import '../../stylesheets/sass/users.css';
import UserNavigation from '../user/UserNavigation';
import AdminNavigation from './components/AdminNavigation';
import AddNewUser from './components/AddNewUser';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: true,
            addNewUser: false
        }
    }

    componentDidMount() {
        this.users()
    }

    async users() {
        let users = await userActions.getUsers()
        this.setState({isLoading: false, users: users})
        console.log(this.state)
    }

    async removeUser(id) {
        const token = localStorage.getItem('token')
        userActions.deleteUser(id, token)
        .then(() => this.users())
    }

    shortDiv() {
        if(this.state.addNewUser) {
            return 'short'
        } else {
            return ''
        }
    }

    userAdded() {
        this.users()
        this.setState({addNewUser: false})
    }

    render() {
        const { users, isLoading, addNewUser } = this.state;
        if(isLoading) {
            return( <div> Loading </div>)
        } else {
            return(
                <div>
                    <UserNavigation/>
                    <AdminNavigation/>
                    <div className={'tableDiv ' + this.shortDiv()}>
                        <table className='userTable'>
                            <thead>
                                <tr>
                                    <th> Vartotojas </th>
                                    <th> Teisės </th>
                                    <th> Registracijos data ir laikas </th>
                                    <th> Būsena </th>
                                    <th> ID </th>
                                    <th> Ištrinti </th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, i) => {
                                    return(
                                        <tr key={i}>
                                            <td>{user.name}</td>
                                            <td>{user.isAdministrator ? 'Administratorius' : 'Vartotojas'}</td>
                                            <td>{user.date.split('T')[0]} | {user.date.split('T')[1].split('.')[0]}</td>
                                            <td>{user.isDeleted ? 'Neaktyvus' : 'Aktyvus'}</td>
                                            <td>{user._id}</td> 
                                            <td><span onClick={() => this.removeUser(users[i]._id)} className='removeButton'>&#10008; </span></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button className='btn newUserBtn' onClick={() => this.setState({addNewUser: !addNewUser})}>{!addNewUser ? 'Pridėti naują' : 'Atšaukti'}</button>
                    {addNewUser ? <AddNewUser added={() => this.userAdded()}/> : ''}
                </div>
            )
        }
    }
}

export default Users