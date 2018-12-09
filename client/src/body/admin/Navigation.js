import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import navigationActions from '../../services/navigationActions'
import LoadingPage from "../other/LoadingPage";
import '../../stylesheets/sass/navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            navItems: [],
            newNavItemName: ''
        }
    }

    componentWillMount() {
        this.setNavItems()
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

    render() {
        if(this.state.isLoading) {
            return (
                <LoadingPage/>
            )
        } else {
            return(
                <nav>
                    {this.state.navItems.map((navObj, i) => {
                        return (
                            <li key={i} className={'navItem'}>
                                <Link key={i} to={'/admin/'+navObj.name}>{navObj.name}</Link>
                                <span className={'removeButton'} onClick={() => this.removeNavItem(navObj._id)}>&#10008;</span>
                            </li>

                        )
                    })}
                    <li className={'navItem'}><input type={'text'}
                         onChange={(e) => this.setState({newNavItemName: e.target.value})}
                         placeholder={'Naujas meniu punktas'}
                         value={this.state.newNavItemName}
                         onKeyPress={(e) => this.addNavItem(e)}/></li>
                    <li className={'navItem'}><Link to={'/admin/nustatymai'}>Nustatymai </Link></li>
                </nav>
            )
        }
    }
}

export default Navigation