import React, { Component } from 'react';
import logo from '../../../../images/logo.png';

class MainSearch extends Component {
    // TODO make predictive
    render() {
        return (
            <div className={'searchSection'}>
                <img alt={'logo'} src={logo} className={'searchLogo'}/>
                <input className={'searchBar'} type={'text'} placeholder={'Įveskite ieškomą prekę'}/>
            </div>
        )
    }
}

export default MainSearch