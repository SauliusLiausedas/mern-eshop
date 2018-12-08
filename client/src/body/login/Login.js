import React, { Component } from 'react';
import '../../stylesheets/sass/Login.css'

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

    submitForm() {

    }

    render() {
        return(
            <div className={'background'}>
                <div className={'loginInputDiv'}>
                    <div className={'name'}>
                        <label>
                            Prisijungimo vardas:<br/>
                            <input onChange={(e) => this.setUserInfo(e)} id={'name'} type={'text'} placeholder={'Vardas'}/>
                        </label><br/>
                    </div>
                    <div className={'password'}>
                        <label>
                            Slaptažodis<br/>
                            <input onChange={(e) => this.setUserInfo(e)} id={'password'} type={'password'} placeholder={'Slaptažodis'}/>
                        </label>
                    </div>
                    <button onClick={this.submitForm} className={'btn loginBtn'}> Prisijungti </button>
                </div>
            </div>
        )
    }
}

export default Login