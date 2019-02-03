import React, { Component } from 'react';
import news from "../../../services/newsApi";
import NewsFeed from "./components/NewsFeed";
import TopLine from "../TopLine";
import UserNavigation from "../Navigation/UserNavigation";
import MainSearch from "../mainpage/components/MainSearch";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNews: ''
        }
    }

    componentDidMount() {
        this.getNews()
    }

    getNews() {
        news.getAllNews()
            .then((content) => {
            this.setState({pageNews: content})
        })
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div className={'background-mainPage'}>
                <TopLine/>
                <MainSearch/>
                <UserNavigation/>
                <NewsFeed pageNews={this.state.pageNews}/>
            </div>
        )
    }
}

export default News