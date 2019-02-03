import React, { Component } from 'react';
import '../../stylesheets/sass/Login.css'
import userActions from '../../services/userActions'
import LoadingPage from "../other/LoadingPage";
import { connect } from "react-redux";
import {actions} from "../../actions/actions";
import Register from "./Register";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
            isLoading: false,
            loginError: '',
            userRegistration: false
        }
    }

    setUserInfo(e) {
        if(e.target.id === 'email') {
            this.setState({userEmail: e.target.value})
        } else {
            this.setState({userPassword: e.target.value})
        }
    }

    async submitForm(e) {
        e.preventDefault();
        this.setState({isLoading: true});
        let signInResponse = await userActions.userLogin(this.state.userEmail, this.state.userPassword);
        if(signInResponse && signInResponse.success) {
            if(signInResponse.token) {
                localStorage.setItem('token', signInResponse.token);
                this.props.history.push('/admin');
            } else {
                this.props.history.push('/');
            }
        } else {
            this.setState({ isLoading: false, loginError: signInResponse.message})
        }
    }

    showRegistrationForm(e) {
        e.preventDefault();
        this.setState({userRegistration: true})
    }

    render() {
        if(this.state.isLoading) {
            return(
                <div className={'background-login'}>
                    <form className={'loginInputDiv'}>
                        <LoadingPage page={'login'}/>
                    </form>
                </div>
            )
        } else {
            return (
                <div className={'background-login'}>
                    {!this.state.userRegistration ?
                        <form className={'loginInputDiv'}>
                            <div className={'password'}>
                                <label>
                                    Elektroninis paštas:<br/>
                                    <input onChange={(e) => this.setUserInfo(e)} autoComplete={'email'} id={'email'}
                                           type={'email'} placeholder={'El. paštas'}/>
                                </label><br/>
                                <label>
                                    Slaptažodis<br/>
                                    <input onChange={(e) => this.setUserInfo(e)} autoComplete={'current-password'}
                                           id={'password'} type={'password'} placeholder={'Slaptažodis'}/>
                                </label>
                            </div>
                            <button onClick={(e) => this.submitForm(e)} className={'btn loginBtn'}> Prisijungti</button>
                            <button onClick={(e) => this.showRegistrationForm(e)}
                                className={'btn loginBtn'}> Registruotis </button>
                            {this.state.loginError ?
                                <pre style={{"color": "red"}}>{this.state.loginError}</pre> : ''}
                        </form>
                    :
                        <Register success={() => this.props.history.push('/')} registration={(e) => this.setState({userRegistration: e})}/>
                    }
                </div>
            )
        }
    }
}

// export default AdminLogin
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, actions)(Login);