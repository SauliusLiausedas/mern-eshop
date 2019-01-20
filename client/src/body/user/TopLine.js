import React from 'react';
import { Link } from "react-router-dom";
import FontAwesomeIcon from '../../services/font'

function TopLine(props) {
    return(
        <div className={'mainpageTopLine'}>
            <div className={'topLineText'}>
                <Link to={'/pristatymas'}><p className={'topLineItem'}><FontAwesomeIcon icon="car"/> Prekių pristatymas </p> </Link>
                <Link to={'/kontaktai'}><p className={'topLineItem'}><FontAwesomeIcon icon="mail-bulk"/> Parašyk Mums </p> </Link>
                <Link to={'/kokybe'}><p className={'topLineItem'}><FontAwesomeIcon icon="check"/> Kokybė </p> </Link>
                {props.loggedIn ? <Link to={'/login'}><p className={'topLineItem'}><FontAwesomeIcon icon="user"/> Atsijungti </p> </Link> :
                    <Link to={'/prisijungti'}><p className={'topLineItem'}><FontAwesomeIcon icon="user"/> Prisijungti </p> </Link> }
            </div>
        </div>
    )
}

export default TopLine