import React from 'react';
import {Link} from "react-router-dom";

function PredictiveSearch(props) {
    return(
        <div className={'predictiveSearchWindow'}>
            <ul>
                {props.result.map((item, i) => {
                    const itemPath = `/produktai/${item.category}/` + item.name.split(' ').join('-') + `-${item.properties.weight}`;
                    return(
                        <li key={i}>
                            <Link to={{
                                pathname: itemPath,
                                state: {
                                    id: item._id
                                }}}>
                            <div className={'resultLine'}>
                                <img alt={item.name} className={'searchImage'} src={item.picture} />
                                <h3> {item.name} {item.properties.weight}kg</h3>
                                <p> {item.category} </p>
                            </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default PredictiveSearch