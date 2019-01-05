import React, { Component } from 'react';
import TopLine from "../TopLine";
import UserNavigation from "../Navigation/UserNavigation";

class SelectedCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ''
        }
    }
    componentWillMount() {
        const category = (this.props && this.props.match && this.props.match.params && this.props.match.params.category) || '';
        if(category) {
            this.setState({categoryName: category})
        }
    }

    render() {
        return(
            <div>
                <TopLine/>
                <UserNavigation subNavHide={() => this.subNavHide()} subnav={(e) => this.subNavShow(e)}/>
                <h1> Kategorija: {this.state.categoryName}</h1>
            </div>
        )
    }
}

export default SelectedCategory