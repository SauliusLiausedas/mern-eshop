import React from 'react';
import LoadingPage from "../../../other/LoadingPage";

function NewsFeed(props) {
    return (
        <div className={'newsFeed'}>
            {props.pageNews ?
                props.pageNews.map((thread, i) => {
                    const threadDate = thread.date.split('T')[0];
                    return (
                        <div key={i}>
                            <div className={'userThreadDateDiv'}>
                                <p className={'userThreadDate'}>Straipsnis pridėtas {threadDate}</p>
                            </div>
                            <div className={'newsFeedBox'}>
                                <div>
                                    <h1>{thread.header}</h1>
                                    <p className={'threadText'}>{thread.text}</p>
                                </div>
                                <div>
                                    <img className={'newsImage'} src={thread.image} alt={thread.header}/>
                                </div>
                            </div>
                        </div>
                    )
                })
            :
                <LoadingPage page={'news'}/>
            }
        </div>
    )
}

export default NewsFeed