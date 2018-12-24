import React, { Component } from 'react';
import '../../stylesheets/sass/navigation.css';
import Navigation from "../user/UserNavigation";
import help from "../../services/helperfunctions";
import AdminNavigation from './components/AdminNavigation';

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
                <AdminNavigation/>
            </div>
        )
    }
}

export default AdminHome