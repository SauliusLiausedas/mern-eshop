import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons'
library.add(faBars);

class AdminNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOn: false
        }
    }

    toggleMenu() {
        this.setState({menuOn: !this.state.menuOn})
    }

    isActive() {
        if(this.state.menuOn) {
            return 'adminNavigationShow'
        } else {
            return ''
        }
    }

    render() {
        return(
            <div>
                <button className='toggleMenuButton' onClick={() => this.toggleMenu()}><FontAwesomeIcon icon='bars'/></button>
                <div className={'adminNavigation ' + this.isActive()}>
                    <ul>
                        <Link to='/admin/vartotojai'><li className='adminNav'>Tvarkyti vartotojus</li></Link>
                        <Link to='/prekes'></Link><li className='adminNav'>Tvarkyti prekes</li>
                        <li className='adminNav'>Tvarkyti ...</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AdminNavigation