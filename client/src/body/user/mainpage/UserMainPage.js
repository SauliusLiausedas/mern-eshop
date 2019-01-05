import React, { Component } from 'react';
import '../../../stylesheets/sass/userMainPage.css';
import TopLine from "../TopLine";
import MainSearch from "./components/MainSearch";
import UserNavigation from "../Navigation/UserNavigation";
import PromotedItems from "./components/PromotedItems";
import MainItems from "./components/MainItems";

class UserMainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavigation: false,
            subNavContext: ''
        }
    }

    render() {
        return(
            <div>
                <TopLine/>
                <MainSearch/>
                <UserNavigation subNavHide={() => this.subNavHide()} subnav={(e) => this.subNavShow(e)}/>
                <h2> Populiariausios prekės </h2>
                <PromotedItems/>
                <MainItems/>
            </div>
        )
    }
}

export default UserMainPage