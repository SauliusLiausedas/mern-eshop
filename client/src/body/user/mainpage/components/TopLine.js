import React from 'react';
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailBulk, faCar, faCheck, faUser } from '@fortawesome/free-solid-svg-icons'
library.add(faMailBulk, faCar, faCheck, faUser);

function TopLine() {
    return(
        <div className={'mainpageTopLine'}>
            <div className={'topLineText'}>
                <Link to={'/delivery'}><p className={'topLineItem'}><FontAwesomeIcon icon="car"/> Prekių pristatymas </p> </Link>
                <Link to={'/contact'}><p className={'topLineItem'}><FontAwesomeIcon icon="mail-bulk"/> Parašyk Mums </p> </Link>
                <Link to={'/quality'}><p className={'topLineItem'}><FontAwesomeIcon icon="check"/> Kokybė </p> </Link>
                <Link to={'/login'}><p className={'topLineItem'}><FontAwesomeIcon icon="user"/> Prisijungti </p> </Link>
            </div>
        </div>
    )
}

export default TopLine