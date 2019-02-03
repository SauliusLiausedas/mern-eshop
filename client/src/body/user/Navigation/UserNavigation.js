import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import UserSubNavigation from "./UserSubNavigation";
import {connect} from "react-redux";
import {actions} from "../../../actions/actions";
library.add(faArrowDown, faAngleDown);


class UserNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subNavigation: '',
            subNavContext: ''
        }
    }

    subNavShow(context) {
        this.setState({subNavigation: true, subNavContext: context})
    }
    subNavHide() {
        this.setState({subNavigation: false})
    }

    render() {
        return (
            <div>
                <nav className={'navigation'}>
                    <ul className={'userNavItems'}>
                        <li className={'userNavItem'}><Link to={'/'}> Pagrindinis </Link></li>
                        <li className={'userNavItem'} onMouseEnter={() => this.subNavShow('medus')}><Link
                                to={'/produktai/Medus'}> Medus &nbsp;<FontAwesomeIcon icon="angle-down"/></Link></li>
                        <li className={'userNavItem'} onMouseEnter={() => this.subNavShow('biciu produktai')}><Link
                                to={'/produktai/Bičių%20produktai'}> Bičių Produktai <FontAwesomeIcon icon="angle-down"/></Link></li>
                        <li className={'userNavItem'} onMouseEnter={() => this.subNavShow('kiti')}><Link to={'/produktai/Kiti%20produktai'}> Kiti
                                Produktai <FontAwesomeIcon icon="angle-down"/></Link></li>
                        <li className={'userNavItem'}><Link to={'/naujienos'}> Naujienos </Link></li>
                        <li className={'userNavItem'}><Link to={'/kontaktai'}> Kontaktai </Link></li>
                    </ul>
                </nav>
            {this.state.subNavigation ? <UserSubNavigation context={this.state.subNavContext} subnav={() => this.subNavHide()}/> : ''}
            </div>
        )
    }
}

// export default UserNavigation
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, actions)(UserNavigation);