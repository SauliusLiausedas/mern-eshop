import React from 'react';
import TopLine from "../user/TopLine";
import UserNavigation from "../user/Navigation/UserNavigation";
import { Link } from 'react-router-dom';
import '../../stylesheets/sass/confirm.css';

function AlreadyConfirmed () {
    return(
        <div className="mainConfirm">
            <TopLine/>
            <UserNavigation/>
            <div className={'confirmed'}>
                Šis elektroninis paštas jau buvo patvirtintas. Galite <Link to={'/prisijungti'} style={{"color": "red"}}> prisijungti </Link>.
            </div>
        </div>
    )
}

export default AlreadyConfirmed