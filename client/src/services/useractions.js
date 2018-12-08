export default class {

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

    static userVerify(token) {
        return fetch('http://localhost:5000/api/user/verify?token='+token)
            .then((res) => res.json())
            .then(data => data)
            .catch((err) => console.log(err))
    }
}