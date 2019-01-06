import React from 'react';
import beeLoader from '../../images/bee-loading.gif';
import circleLoader from '../../images/loading-circle.gif';
import '../../stylesheets/sass/loading.css';
import yellow from '../../images/yellow.gif';

function LoadingPage(props) {
    if(props.page === 'login') {
        return (
            <div className={'loadBox'}>
                <img src={beeLoader} alt={'Loading'} className={'beeLoadImage'}/>
                <h3> Loading... </h3>
            </div>
        )
    } else if(props.page === 'pageCenter') {
        return (
            <div className={'center'}>
                <img src={beeLoader} alt={'Loading'}/>
                <h3> Loading... </h3>
            </div>
        )
    } else if(props.page === 'adminNav') {
            return(
                <nav>
                    <img className={'navLoader'} src={'http://66.media.tumblr.com/0018b4de0800b3e822bc5a7895ccfc62/tumblr_nbp3g3IwBz1sq0qq9o1_400.gif'} alt={'loading'}/>
                    <h5> Please wait... </h5>
                </nav>
            )
    } else if(props.page === 'adminUsers') {
            return(
                <img src={circleLoader} className={'loadCircle'} alt={'Loading'}/>
            )
    } else if(props.page === 'mainItems') {
            return (
                <div>
                    <img src={yellow} className={'mainItemsLoader'} alt={'Loading'}/><br/>
                </div>
            )
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
}

export default LoadingPage