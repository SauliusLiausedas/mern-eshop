const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');

router.post('/', (req, res) => {
    const { body } = req;
    const { name, password } = body;
    if(!name || !password) {
        res.send({
            success: false,
            message: 'Fill all fields!'
        });
    } else {
        User.find({
            name: name
        }, (err, users) => {
            if(err) {
                return res.send({
                    success: false,
                    message: 'Server error' + err
                });
            } else {
                if (users.length !== 1) {
                    return res.send({
                        success: false,
                        message: 'No such username'
                    });
                }
                const user = users[0];
                if (!user.validPassword(password)) {
                    return res.send({
                        success: false,
                        message: 'Bad password'
                    });
                } else {
                    const userSession = new UserSession();
                    userSession.sessionId = user._id;
                    // userSession.save().then(session => res.json(session));
                    userSession.save((err, doc) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: 'Server error' + err
                            });
                        }
                        return res.send({
                            success: true,
                            message: 'Signed In',
                            token: doc._id
                        })
                    });
                }
            }
        });
    }
});

module.exports = router;