import React from 'react';

function ItemDescription(props) {
    if(props.description.length > 75) {
        return(
            <p className={'mainPageDescription'}>{props.description.slice(0,75)}...</p>
        )
    } else {
        return(
            <p className={'mainPageDescription'}>{props.description}</p>
        )
    }
}

export default ItemDescription