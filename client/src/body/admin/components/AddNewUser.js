import React, { Component } from 'react';
import userActions from '../../../services/userActions';

class AddNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            admin: false
        }
    }

    addUser(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        userActions.addUser(this.state.name, this.state.password, this.state.admin, token)
            .then(res => res.json())
            .then(data => {
                if(data.success === true) {
                    window.alert('User Added');
                    this.props.added()
                } else {
                    console.log(data)
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const { name, password, admin } = this.state;
        return(
            <div className='newUser'>
                <form>
                    <label>Vartotojo vardas</label><br/>
                    <input type='text' placeholder='Jūsų vardas' value={ name } 
                        onChange={(e) => this.setState({name: e.target.value})}/><br/>
                    <label>Slaptažodis</label><br/>
                    <input type='password' placeholder='Slaptažodis' value={ password } 
                        onChange={(e) => this.setState({password: e.target.value})} autoComplete='password'/><br/>
                    <label>Administratorius</label>
                    <input type='checkbox' onChange={() => this.setState({admin: !admin})}/><br/>
                    <button onClick={(e) => this.addUser(e)} className='btn submitBtn'> Pridėti </button>
                </form>
            </div>
        )
    }
}

export default AddNewUser
