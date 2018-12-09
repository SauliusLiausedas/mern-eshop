import React, { Component } from 'react';
import news from "../../../services/newsApi";
import CreateNewThread from "./CreateNewThread";

class MainText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNews: '',
            createNew: false
        }
    }

    componentDidMount() {
        this.getNews()
    }

    getNews() {
        news.getAllNews().then((content) => {
            this.setState({pageNews: content})
        })
    }

    deleteThread(threadId) {
        news.deleteThread(threadId)
            .then(() => this.getNews())
    }

    // editThread(index, threadId) {
    //     console.log(this.state.pageNews[index])
    // }

    addThread() {

    }

    render() {
        if(this.state.pageNews) {
            return(
                <div className={'newsFeed'}>
                    <button className={'btn'} onClick={() => this.setState({createNew: true})}> Sukurti naują </button>
                    {this.state.createNew ?
                        <CreateNewThread cancelNewThread={() => this.setState({createNew: !this.state.createNew})}/>
                    :
                    ''}
                    {this.state.pageNews.map((thread, i) => {
                        const threadDate = thread.date.split('T')[0];
                        return(
                            <div key={i}>
                                <div className={'threadDateAndButtons'}>
                                    <p className={'threadDate'}>Straipsnis pridėtas {threadDate}</p>
                                    <button className={'btn editBtn'} onClick={() => this.editThread(i, thread._id)}> Taisyti</button>
                                    <button className={'btn deleteBtn'} onClick={() => this.deleteThread(thread._id)}> Ištrinti</button>
                                </div>
                                <div className={'newsFeedBox'}>
                                    <div>
                                        <h1>{thread.header}</h1>
                                        <p className={'threadText'}>{thread.text}</p>
                                    </div>
                                    <div>
                                        <img className={'newsImage'} src={thread.image} alt={thread.header} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return(
                <div>
                    Loading
                </div>
            )
        }
    }
}

export default MainText