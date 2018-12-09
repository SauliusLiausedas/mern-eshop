import React, { Component } from 'react';
import Navigation from "./Navigation";
import help from "../../services/helperfunctions";

class AdminHome extends Component {
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
        return(
            <div>
                <Navigation/>
                ADMIN HOME
            </div>
        )
    }
}

export default AdminHome