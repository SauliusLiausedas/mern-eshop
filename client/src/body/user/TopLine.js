import React, { Component } from 'react';
import { Link } from "react-router-dom";
import FontAwesomeIcon from '../../services/font'
import {connect} from "react-redux";
import {actions} from "../../actions/actions";
import helperfunctions from "../../services/helperfunctions";

// function TopLine(props) {
class TopLine extends Component {
    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token) {
            this.props.login(true);
        }
    }
    render() {
        return (
            <div className={'mainpageTopLine'}>
                <div className={'topLineText'}>
                    <Link to={'/pristatymas'}><p className={'topLineItem'}><FontAwesomeIcon icon="car"/> Prekių
                        pristatymas </p></Link>
                    <Link to={'/kontaktai'}><p className={'topLineItem'}><FontAwesomeIcon icon="mail-bulk"/> Parašyk
                        Mums </p></Link>
                    <Link to={'/kokybe'}><p className={'topLineItem'}><FontAwesomeIcon icon="check"/> Kokybė </p></Link>
                    {this.props.loggedIn ?
                        <Link to={'/prisijungti'} onClick={() => helperfunctions.logout()}><p className={'topLineItem'}><FontAwesomeIcon icon="user"/> Atsijungti </p></Link>
                        :
                        <Link to={'/prisijungti'}><p className={'topLineItem'}><FontAwesomeIcon
                            icon="user"/> Prisijungti </p></Link>}
                </div>
            </div>
        )
    }
}

// export default TopLine
function mapStateToProps(state) {
    return state
}

export default connect(mapStateToProps, actions)(TopLine);