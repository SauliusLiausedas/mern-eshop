export default class {

    // User Login
    static userLogin(userName, userPassword) {
        return fetch('http://localhost:5000/api/user/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": userName,
                "password": userPassword
            })
        }).then((res) => res.json())
            .then(data => data)
    }

    // Verify User when in /admin
    static userVerify(token) {
        return fetch(`http://localhost:5000/api/user/verify?token=${token}`)
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => console.log(err))
    }

    // Get list of users
    static getUsers() {
        return fetch(`http://localhost:5000/api/user/getlist`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }

    // Delete user
    static deleteUser(id, token) {
        return fetch(`http://localhost:5000/api/user/delete`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "token": token
            })
        }).then((res) => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    // Add new user
    static async addUser(name, password, admin, token) {
        let addUser = fetch(`http://localhost:5000/api/user/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password,
                admin: admin,
                token: token
            })
        })
        return addUser
    }
}