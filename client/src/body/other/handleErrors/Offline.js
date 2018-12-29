import React from 'react';

function Offline(props) {
    if(props.page === 'promoted') {
        return (
            <div style={{"textAlign":"center", "color":"orange"}}>
                <h1>Nepavyko rasti prekių</h1>
            </div>
        )
    } else {
        return(
            <h1>
                Patikrinkite interneto ryšį
            </h1>
        )
    }
}

export default Offline