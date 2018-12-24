import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import navigationActions from '../../../services/navigationActions';
import LoadingPage from "../../other/LoadingPage";
import '../../../stylesheets/sass/navigation.css';
import 'react-dropdown/style.css';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowDown, faAngleDown } from '@fortawesome/free-solid-svg-icons'
// library.add(faArrowDown, faAngleDown);
class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            navItems: [],
            newNavItemName: '',
            dropdown: false
        }
    }

    componentWillMount() {
        this.setNavItems()
        console.log(this.props)
    }

    async setNavItems() {
        this.setState({isLoading: true});
        let items = await navigationActions.getNavItems();
        this.setState({navItems: items, isLoading: false})
    }

    removeNavItem(id) {
        navigationActions.removeNavItem(id)
            .then(() => this.setNavItems())
            .catch(err => console.log(err))
    }

    addNavItem(e) {
        if(e.key === 'Enter') {
            navigationActions.addNavItem(this.state.newNavItemName)
                .then(() => { this.setNavItems()})
                .catch(err => console.log(err))
        }
    }

    dropdown() {
        this.setState({dropdown: !this.state.dropdown})
    }

    render() {
        if(this.state.isLoading) {
            return (
                <LoadingPage page={'adminNav'}/>
            )
        } else {
            return(
                <nav>
                    <div className={'dropdown'}>
                        <li className={'dropNavItem'}> Produktai </li>
                        <div className={'dropdown-content'}>
                            <a href={'#alpha'}>ALPHA</a>
                            <a href={'#beta'}>BETA</a>
                            <a href={'#charlie'}>CHARLIE</a>
                        </div>
                    </div>
                    {this.state.navItems.map((navObj, i) => {
                        return (
                            <li key={i} className={'navItem'}>
                                <Link key={i} to={'/admin/'+navObj.href}>{navObj.name}</Link>
                                <span className={'removeButton'} onClick={() => this.removeNavItem(navObj._id)}>&#10008;</span>
                            </li>

                        )
                    })}
                    <li className={'newItem'}><input type={'text'}
                         onChange={(e) => this.setState({newNavItemName: e.target.value})}
                         placeholder={'Naujas meniu punktas'}
                         value={this.state.newNavItemName}
                         onKeyPress={(e) => this.addNavItem(e)}/>
                    </li>
                    <li className={'newItem'}><Link to={'/admin/nustatymai'}>Nustatymai </Link></li>
                </nav>
            )
        }
    }
}

export default Navigation