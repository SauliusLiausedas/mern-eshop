import React, { Component } from 'react';
import TopLine from "../TopLine";
import UserNavigation from "../Navigation/UserNavigation";
import '../../../stylesheets/sass/selectedCategory.css';
import itemActions from "../../../services/itemActions";
import LoadingPage from "../../other/LoadingPage";
import MainPageItemView from "../mainpage/components/MainPageItemView";

class SelectedCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            isLoading: false,
            categoryItems: '',
            error: false
        }
    }
    componentWillMount() {
        const category = (this.props && this.props.match && this.props.match.params && this.props.match.params.category) || '';
        if(category) {
            this.loadCategory(category);
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const category = (nextProps && nextProps.match && nextProps.match.params && nextProps.match.params.category) || '';
        if(category) {
            this.loadCategory(category);
        }
    }

    async loadCategory(category) {
        this.setState({isLoading: true});
        let categoryItems = await itemActions.getCategoryItems(category);
        if(typeof(categoryItems) !== 'string') {
            this.setState({categoryItems: categoryItems, isLoading: false, categoryName: category, error: false})
        } else {
            this.setState({error: true, isLoading: false, categoryName: category})
        }

    }

    render() {
        if(this.state.isLoading) {
            return (
                <div className={'selectedCategory'}>
                    <LoadingPage/>
                </div>
            )
        } else {
            console.log(this.state);
            return (
                <div>
                    <TopLine/>
                    <UserNavigation/>
                    {this.state.error ?
                        <div className={'selectedCategory'}><h1>Nėra prekių kategorijoje {this.state.categoryName}</h1>
                        </div>
                        :
                        <div className={'selectedCategory'}>
                            <h1> {this.state.categoryName}</h1>
                            <MainPageItemView items={this.state.categoryItems}/>
                        </div>
                    }
                </div>
            )
        }
    }
}

export default SelectedCategory