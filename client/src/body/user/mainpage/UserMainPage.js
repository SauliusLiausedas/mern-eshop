import React, { Component } from 'react';
import '../../../stylesheets/sass/userMainPage.css';
import TopLine from "../TopLine";
import MainSearch from "./components/MainSearch";
import UserNavigation from "../UserNavigation";
import UserSubNavigation from "../UserSubNavigation";
import PromotedItems from "./components/PromotedItems";

class UserMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavigation: false,
            subNavContext: ''
        }
    }

    subNavShow(e) {
        this.setState({subNavigation: true, subNavContext: e})
    }
    subNavHide() {
        this.setState({subNavigation: false})
    }

    render() {
        return(
            <div>
                <TopLine/>
                <MainSearch/>
                <UserNavigation subNavHide={() => this.subNavHide()} subnav={(e) => this.subNavShow(e)}/>
                {this.state.subNavigation ? <UserSubNavigation context={this.state.subNavContext} subnav={() => this.subNavHide()}/> : ''}
                <PromotedItems/>
            </div>
        )
    }
}

export default UserMainPage