export default class {

    // User Login
    static userLogin(userEmail, userPassword) {
        return fetch('http://localhost:5000/api/user/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": userEmail,
                "password": userPassword
            })
        }).then((res) => res.json())
            .then(data => {
                console.log(data);
                return data
            })
            .catch(err => console.log(err))
    }

    // User registration

    static userRegister(userInfo) {
        return fetch('http://localhost:5000/api/user/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": userInfo.userEmail,
                "password": userInfo.userPassword,
                "firstName": userInfo.firstName,
                "lastName": userInfo.lastName
            })
        }).then((res) => res.json())
            .then(data => data)
            .catch(err => err)
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
    static async addAdminUser(email, password, admin, token) {
        return fetch(`http://localhost:5000/api/user/adminsignup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                admin: admin,
                token: token
            })
        });
    }
    
    // User logout
    static logout(token) {
        return fetch(`http://localhost:5000/api/user/logout?token=${token}`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }
}