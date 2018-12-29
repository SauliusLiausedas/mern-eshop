import React, { Component } from 'react';
import help from '../../services/helperfunctions';
import '../../stylesheets/sass/mainpage.css';
import LoadingPage from "../other/LoadingPage";
import MainText from "./components/MainText";
import AdminNavigation from './components/AdminNavigation';
import UserNavigation from '../user/UserNavigation';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false,
            isLoading: false
        }
    }
    async componentWillMount() {
        this.setState({isLoading: true});
        let verified = await help.verification();
        if (verified) { this.setState({isLoading: false}) }
    }

    render(){
        if(this.state.isLoading) {
            return (
                <LoadingPage page={'pageCenter'}/>
            )
        } else {
            return (
                <div>
                    <div className={'background-mainPage'}>
                        <UserNavigation/>
                        <AdminNavigation/>
                        <MainText/>
                    </div>
                </div>
            )
        }
    }
}

export default MainPage