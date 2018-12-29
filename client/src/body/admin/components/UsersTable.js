import React from 'react';

function UsersTable(props) {
    return(
        <table className='userTable'>
            <thead>
            <tr>
                <th> Vartotojas</th>
                <th> Teisės</th>
                <th> Registracijos data ir laikas</th>
                <th> Būsena</th>
                <th> ID</th>
                <th> Ištrinti</th>
            </tr>
            </thead>
            <tbody>
            {props.users.map((user, i) => {
                return (
                    <tr key={i}>
                        <td>{user.name}</td>
                        <td>{user.isAdministrator ? 'Administratorius' : 'Vartotojas'}</td>
                        <td>{user.date.split('T')[0]} | {user.date.split('T')[1].split('.')[0]}</td>
                        <td>{user.isDeleted ? 'Neaktyvus' : 'Aktyvus'}</td>
                        <td>{user._id}</td>
                        <td><span onClick={() => props.removeUser(props.users[i]._id)}
                                  className='removeButton'>&#10008; </span></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default UsersTable