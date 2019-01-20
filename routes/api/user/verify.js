const express = require('express');
const router = express.Router();
const UserSession = require('../../../models/UserSession');
const User = require('../../../models/User');

router.get('/', (req, res) => {
    const { query } = req;
    const { token } = query;
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if(err) {
            return res.send({
                success: false,
                message: 'This session is inactive'
            })
        }
        if(sessions.length !== 1) {
            return res.send({
                success: false,
                message: 'Not signed in'
            })
        } else {
            const userId = sessions[0].sessionId;
            User.find({ _id: userId })
                .then((user) => {
                    if(user[0].isAdministrator) {
                        return res.send({
                            success: true,
                            message: 'Logged in as administrator',
                            admin: true
                        })
                    } else {
                        return res.send({
                            success: false,
                            message: 'Not an admin user'
                        })
                    }
                })
                .catch(err => console.log(err));
        }
    })
});
module.exports = router;