import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown, faAngleDown } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowDown, faAngleDown);

function UserNavigation(props) {
    return(
        <nav className={'navigation'}>
            <ul className={'userNavItems'}>
                <li className={'userNavItem'}><Link to={'/'}> Pagrindinis </Link></li>
                {props.subnav ? <li className={'userNavItem'} onMouseEnter={() => props.subnav('medus')}><Link to={'/medus'}> Medus &nbsp;<FontAwesomeIcon icon="angle-down" /></Link></li> : <li className={'userNavItem'}><Link to={'/medus'}> Medus </Link></li>}
                {props.subnav ? <li className={'userNavItem'} onMouseEnter={() => props.subnav('biciu produktai')}><Link to={'/biciu'}> Bičių Produktai <FontAwesomeIcon icon="angle-down" /></Link></li> : <li className={'userNavItem'}><Link to={'/biciu'}> Bičių Produktai</Link></li>}
                {props.subnav ? <li className={'userNavItem'} onMouseEnter={() => props.subnav('kiti')}><Link to={'/kiti'}> Kiti Produktai <FontAwesomeIcon icon="angle-down" /></Link></li> : <li className={'userNavItem'}><Link to={'/kiti'}> Kiti Produktai </Link></li>}
                <li className={'userNavItem'}><Link to={'/naujienos'}> Naujienos </Link></li>
                <li className={'userNavItem'}><Link to={'/kontaktai'}> Kontaktai </Link></li>
            </ul>
        </nav>
    )
}

export default UserNavigation