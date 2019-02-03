import React, { Component } from 'react';
import logo from '../../../../images/logo.png';
import itemActions from "../../../../services/itemActions";
import PredictiveSearch from "./PredictiveSearch";

class MainSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            searchResult: ''
        }
    }

    async search(e) {
        this.setState({searchWord: e.target.value});
        if(this.state.searchWord.length > 1) {
            const searchResult = await itemActions.getSearchItems(this.state.searchWord);
            this.setState({searchResult: searchResult});
        }
    }

    openSearchPage(e) {
        if(e.key === 'Enter') {
            this.props.history.push('/paieska');
        }
    }

    render() {
        return (
            <div>
                <div className={'searchSection'}>
                    <img alt={'logo'} src={logo} className={'searchLogo'}/>
                    <input className={'searchBar'} value={this.state.searchWord} onKeyPress={(e) => this.openSearchPage(e)} onChange={(e) => this.search(e)} type={'text'} placeholder={'Įveskite ieškomą prekę'}/>
                </div>
                {this.state.searchResult.length > 0 ? <PredictiveSearch result={this.state.searchResult}/> : ''}
            </div>
        )
    }
}

export default MainSearch