import React from 'react';
import TopLine from "../user/TopLine";
import UserNavigation from "../user/Navigation/UserNavigation";
import { Link } from 'react-router-dom';
import '../../stylesheets/sass/confirm.css';

function Confirmed () {
    return(
        <div className="mainConfirm">
            <TopLine/>
            <UserNavigation/>
            <div className={'confirmed'}>
                Sėkmingai patvirtinote savo el. paštą. Dabar galite <Link to={'/prisijungti'} style={{"color": "red"}}> prisijungti. </Link>
            </div>
        </div>
    )
}

export default Confirmed