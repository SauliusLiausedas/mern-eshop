import React from 'react';
import { Link } from 'react-router-dom';

function UserSubNavigation(props) {
    if(props.context === 'medus') {
        return (
            <nav className={'subNavigation'} onMouseLeave={() => props.subnav()}>
                <ul className={'userNavItems'}>
                    <li className={'userNavItem'}><Link to={'/medus/skystas'}> Skystas </Link></li>
                    <li className={'userNavItem'}><Link to={'/medus/susicukraves'}> Susicukravęs </Link></li>
                    <li className={'userNavItem'}><Link to={'/medus/pievu'}> Pievų </Link></li>
                    <li className={'userNavItem'}><Link to={'/medus/griku'}> Grikių </Link></li>
                    <li className={'userNavItem'}><Link to={'/medus/liepu'}> Liepų </Link></li>
                </ul>
            </nav>
        )
    } else if (props.context === 'biciu produktai') {
        return (
            <nav className={'subNavigation'} onMouseLeave={() => props.subnav()}>
                <ul className={'userNavItems'}>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/duonele'}> Bičių duonelė </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/nuodai'}> Bičių nuodai </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/pienelis'}> Bičių pienelis </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/medus'}> Medus </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/propolis'}> Propolis </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/vaskas'}> Vaškas </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/ziedadulkes'}> Žiedadulkės </Link></li>
                </ul>
            </nav>
        )
    } else if (props.context === 'kiti') {
        return (
            <nav className={'subNavigation'} onMouseLeave={() => props.subnav()}>
                <ul className={'userNavItems'}>
                    <li className={'userNavItem'}><Link to={'/kiti/duonele'}> Bičių duonelė </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/nuodai'}> Bičių nuodai </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/pienelis'}> Bičių pienelis </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/medus'}> Medus </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/propolis'}> Propolis </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/vaskas'}> Vaškas </Link></li>
                    <li className={'userNavItem'}><Link to={'/biciuproduktai/ziedadulkes'}> Žiedadulkės </Link></li>
                </ul>
            </nav>
        )
    } else {
        return(
            <div>
                Nothing
            </div>
        )
    }
}

export default UserSubNavigation