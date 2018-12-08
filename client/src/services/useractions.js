export default class {

    static userLogin(userName, userPassword) {
        fetch('api/user/signin', {
            method: 'POST'
        },
        {
            body: {
                name: userName,
                password: userPassword
            }
        })
    }

}