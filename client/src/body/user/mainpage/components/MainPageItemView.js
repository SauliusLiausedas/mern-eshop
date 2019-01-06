import React from 'react';
import {Link} from "react-router-dom";
import ItemDescription from "./ItemDescription";

function MainPageItemView(props) {
    return(
        <div className={'mainPageItems'}>
            {props.items.map((item, i) => {
            const itemPath = `/produktai/${item.category}/${item.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ').join('-')}-${item.properties.weight}`;
                return (
                    <div key={i} className={'mainPageItem'}>
                        <h3>{item.name}</h3>
                        <Link to={{
                            pathname: itemPath,
                            state: {
                                id: item._id
                            }}}>
                            <img src={item.picture} alt={item.name} className={'mainPageItemPicture'}/>
                        </Link>
                        <Link to={`/produktai/${item.category}`}><pre> {item.category} </pre></Link>
                        <ItemDescription description={item.properties.description}/>
                    </div>
                )
            })}
        </div>
    )
}

export default MainPageItemView