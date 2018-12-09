import React, { Component } from 'react';
import help from '../../services/helperfunctions'
import LoadingPage from "../other/LoadingPage";
import Navigation from "./Navigation";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verified: false,
            isLoading: false,
        }
    }
    componentWillMount() {
        this.verification()
    }

    async verification() {
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
                </div>
            )
        }
    }
}

export default MainPage