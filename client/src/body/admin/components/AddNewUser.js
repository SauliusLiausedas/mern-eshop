import React, { Component } from 'react';
import userActions from '../../../services/userActions';

class AddNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            admin: false
        }
    }

    addAdminUser(e) {
        e.preventDefault();
        let token = localStorage.getItem('token');
        userActions.addAdminUser(this.state.email, this.state.password, this.state.admin, token)
            .then(res => res.json())
            .then(data => {
                if(data.success === true) {
                    window.alert('User Added');
                    this.props.added();
                } else {
                    window.alert(data.message);
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { email, password, admin } = this.state;
        return(
            <div className='newUser'>
                <form>
                    <label>El. paštas</label><br/>
                    <input type='email' placeholder='Vartotojo el. paštas' value={ email }
                        onChange={(e) => this.setState({email: e.target.value})}/><br/>
                    <label>Slaptažodis</label><br/>
                    <input type='password' placeholder='Slaptažodis' value={ password } 
                        onChange={(e) => this.setState({password: e.target.value})} autoComplete='password'/><br/>
                    <label>Administratorius</label>
                    <input type='checkbox' onChange={() => this.setState({admin: !admin})}/><br/>
                    <button onClick={(e) => this.addAdminUser(e)} className='btn submitBtn'> Pridėti </button>
                </form>
            </div>
        )
    }
}

export default AddNewUser
