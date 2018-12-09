import React, { Component } from 'react';
import '../../stylesheets/sass/Login.css'
import userActions from '../../services/userActions'
import LoadingPage from "../other/LoadingPage";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userPassword: '',
            isLoading: false,
            wrongCredentials: false
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
        this.setState({isLoading: true});
        let signInResponse = await userActions.userLogin(this.state.userName, this.state.userPassword);
        if(signInResponse && signInResponse.token) {
            localStorage.setItem('token', signInResponse.token);
            this.props.history.push('/admin');
        } else {
            this.setState({ isLoading: false, wrongCredentials: true })
        }
    }

    render() {
        return (
            <div className={'background-login'}>
                {this.state.isLoading ?
                <form className={'loginInputDiv'}>
                    <LoadingPage page={'login'}/>
                </form>
                :
                <form className={'loginInputDiv'}>
                    <div className={'name'}>
                        <label>
                            Prisijungimo vardas:<br/>
                            <input onChange={(e) => this.setUserInfo(e)} autoComplete={'name'} id={'name'}
                                   type={'text'} placeholder={'Vardas'}/>
                        </label><br/>
                    </div>
                    <div className={'password'}>
                        <label>
                            Slaptažodis<br/>
                            <input onChange={(e) => this.setUserInfo(e)} autoComplete={'current-password'}
                                   id={'password'} type={'password'} placeholder={'Slaptažodis'}/>
                        </label>
                    </div>
                    <button onClick={(e) => this.submitForm(e)} className={'btn loginBtn'}> Prisijungti</button>
                    {this.state.wrongCredentials ?
                        <pre style={{"color": "red"}}>Neteisingi prisijungimo duomenys</pre> : ''}
                </form>
                }
            </div>
        )
    }
}

export default Login