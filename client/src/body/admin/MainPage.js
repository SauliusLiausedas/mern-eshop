import React, { Component } from 'react';
import userActions from '../../services/useractions';
import LoadingPage from "../other/LoadingPage";

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
        const token = localStorage.getItem('token');
        let authorized = await userActions.userVerify(token);
        if (authorized.success) {
            this.setState({verified: true, isLoading: false})
        } else {
            window.alert('Privalote prisijungti, jei norite čia būti');
            this.props.history.push('/login')
        }
    }

    render(){
        if(this.state.isLoading) {
            return (
                <LoadingPage page={'pageCenter'}/>
            )
        } else {
            return (
                <div>
                    ADMIN
                </div>
            )
        }
    }
}

export default MainPage