import React from 'react';

function ItemsTable(props) {
    return (
        <table className='userTable'>
            <thead>
            <tr>
                <th> Pavadinimas </th>
                <th> Kiekis </th>
                <th> Nuotrauka </th>
                <th> Kategorija </th>
                <th> Aprašymas </th>
                <th> Svoris </th>
                <th> Kaina </th>
                <th> Nuolaida </th>
                <th> Paspaudimai </th>
                <th> Ištrinti </th>
            </tr>
            </thead>
            {props.items.length > 0 ?
                <tbody>
                {props.items.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.quantity} vnt.</td>
                            <td>{item.picture}</td>
                            <td>{item.category}</td>
                            {item.properties.description.length > 50 ? <td>{item.properties.description.slice(0, 50)}...</td> : <td>{item.properties.description}</td>}
                            <td>{item.properties.weight} kg</td>
                            <td>{item.price} &euro;</td>
                            <td>{item.discount ? 'Yra' : 'Nėra'}</td>
                            <td>{item.clickPoints}</td>
                            <td><span onClick={() => props.removeItem(props.items[i]._id)}
                                      className='removeButton'>&#10008; </span></td>
                        </tr>
                    )
                })}
                </tbody>
            :
                <tbody>
                    <tr>
                        <td style={{"height":"400px", "border":"none"}} colSpan={9}> Prekių nėra </td>
                    </tr>
                </tbody>
            }
        </table>
    )
}

export default ItemsTable