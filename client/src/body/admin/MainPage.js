import React, { Component } from 'react';
import help from '../../services/helperfunctions';
import '../../stylesheets/sass/mainpage.css';
import LoadingPage from "../other/LoadingPage";
import Navigation from "./Navigation";
import MainText from "./components/MainText"

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false,
            isLoading: false,
            pageNews: ''
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
                    <Navigation/>
                    <div className={'background-mainPage'}>
                        <MainText threads={this.state.pageNews}/>
                    </div>
                </div>
            )
        }
    }
}

export default MainPage