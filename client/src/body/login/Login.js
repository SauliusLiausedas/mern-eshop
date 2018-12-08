import React, { Component } from 'react';
import '../../stylesheets/sass/Login.css'
import userActions from '../../services/useractions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: ''
        }
    }

    setUserInfo(e) {
        if(e.target.id === 'name') {
            this.setState({userName: e.target.value})
        } else {
            this.setState({userPassword: e.target.value})
        }
    }

    async submitForm(e) {
        e.preventDefault();
        let signin = await userActions.userLogin(this.state.userName, this.state.userPassword);
        if(signin && signin.token) {
            this.props.history.push('/admin')
        } else {
            window.alert(signin.message)
        }
    }

    render() {
        return(
            <div className={'background'}>
                <form className={'loginInputDiv'}>
                    <div className={'name'}>
                        <label>
                            Prisijungimo vardas:<br/>
                            <input onChange={(e) => this.setUserInfo(e)} autoComplete={'name'} id={'name'} type={'text'} placeholder={'Vardas'}/>
                        </label><br/>
                    </div>
                    <div className={'password'}>
                        <label>
                            Slaptažodis<br/>
                            <input onChange={(e) => this.setUserInfo(e)} autoComplete={'current-password'} id={'password'} type={'password'} placeholder={'Slaptažodis'}/>
                        </label>
                    </div>
                    <button onClick={(e) => this.submitForm(e)} className={'btn loginBtn'}> Prisijungti </button>
                </form>
            </div>
        )
    }
}

export default Login