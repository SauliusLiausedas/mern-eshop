import React, { Component } from 'react';
import userActions from "../../services/userActions";
import LoadingPage from "../other/LoadingPage";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
            firstName: '',
            lastName: '',
            isLoading: false,
            error: '',
            regSuccess: false
        }
    }

    async submitForm(e) {
        e.preventDefault();
        this.setState({isLoading: true});
        const userInfo = {
            userEmail: this.state.userEmail,
            userPassword: this.state.userPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };
        let signInResponse = await userActions.userRegister(userInfo);
        if(signInResponse && signInResponse.message && !signInResponse.success) {
            this.setState({isLoading: false, error: signInResponse.message})
        } else if (signInResponse.success) {
            this.setState({isLoading: false, regSuccess: true})
        }
        // if(signInResponse && signInResponse.token) {
        //     localStorage.setItem('token', signInResponse.token);
        //     this.props.history.push('/admin');
        // } else {
        //     this.setState({ isLoading: false, wrongCredentials: true })
        // }
    }

    setUserInfo(e) {
        const id = e.target.id;
        const value = e.target.value;
        switch(id) {
            case 'email':
                this.setState({userEmail: value});
                break;
            case 'password':
                this.setState({userPassword: value});
                break;
            case 'firstName':
                this.setState({firstName: value});
                break;
            default:
                this.setState({lastName: value});
                break;
        }
    }

    backToLogin(e) {
        e.preventDefault();
        this.props.registration(false);
    }

    render() {
        if(this.state.isLoading) {
            return(
                <form className={'loginInputDiv'}>
                    <LoadingPage page={'login'}/>
                </form>
            )
        } else {
            if(!this.state.regSuccess) {
                return (
                    <form className={'loginInputDiv'}>
                        <div className={'password'}>
                            <label>
                                <span className={'requiredField'}>*</span>Elektroninis paštas:<br/>
                                <input onChange={(e) => this.setUserInfo(e)} autoComplete={'email'} id={'email'}
                                       type={'text'} placeholder={'El. paštas'} value={this.state.userEmail}/>
                            </label><br/>
                            <label>
                                <span className={'requiredField'}>*</span>Slaptažodis:<br/>
                                <input onChange={(e) => this.setUserInfo(e)} autoComplete={'current-password'}
                                       id={'password'} type={'password'} placeholder={'Slaptažodis'}
                                       value={this.state.userPassword}/>
                            </label>
                            <label><br/>
                                Vardas:<br/>
                                <input onChange={(e) => this.setUserInfo(e)} autoComplete={'name'} id={'firstName'}
                                       type={'text'} placeholder={'Jūsų vardas'} value={this.state.firstName}/>
                            </label><br/>
                            <label>
                                Pavardė:<br/>
                                <input onChange={(e) => this.setUserInfo(e)} autoComplete={'lastname'}
                                       id={'lastName'} type={'text'} placeholder={'Jūsų pavardė'}
                                       value={this.state.lastName}/>
                            </label>
                        </div>
                        <button onClick={(e) => this.submitForm(e)} className={'btn loginBtn'}> Registruotis</button>
                        <button onClick={(e) => this.backToLogin(e)}
                                className={'btn loginBtn'}> Grįžti
                        </button>
                        <pre style={{"color": "red"}}>{this.state.error}</pre>
                    </form>
                )
            } else {
                return(
                    <form className={'loginInputDiv'}>
                        <p> Sėkmingai užsiregistravote! </p>
                        <p> Išsiuntėme laišką į {this.state.userEmail} su patvirtinimo nuoroda! </p>
                    </form>
                )
            }
        }
    }
}

export default Register