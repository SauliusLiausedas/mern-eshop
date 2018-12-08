import React from 'react';
import beeLoader from '../../images/bee-loading.gif'
import '../../stylesheets/sass/loading.css'

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
    } else {
        return (
            <div>
                Loading
            </div>
        )
    }
}

export default LoadingPage