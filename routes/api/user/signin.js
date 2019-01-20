const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');

router.post('/', (req, res) => {
    const { body } = req;
    const { email, password } = body;

    if(!email || !password) {
        res.send({
            success: false,
            message: 'Pamiršote įvesti duomenis'
        });
    } else {
        User.find({
            email: email,
            isDeleted: false
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
                        message: 'Tokio vartotojo nėra'
                    });
                }
                const user = users[0];
                if (!user.validPassword(password)) {
                    return res.send({
                        success: false,
                        message: 'Neteisingas slaptažodis'
                    });
                } else if(!user.confirmed) {
                    /*
                     *      User email must be confirmed to login
                     */
                    return res.send({
                        success: false,
                        message: `Vartotojo el. paštas dar nepatvirtintas`
                    })
                } else {
                    /*
                     *      Delete inactive sessions
                     */
                    const userId = users[0]._id;
                    UserSession.find({sessionId: userId}, (err, session) => {
                       if(err) {
                           res.send({
                               message: 'Server error'
                           })
                       } else {
                           if(session.length > 0) {
                               session.forEach(sessionId => {
                                   sessionId.remove()
                               })
                           }
                       }
                    });
                    /*
                     *  Create New Session
                     */
                    const userSession = new UserSession();
                    userSession.sessionId = user._id;
                    // userSession.save().then(session => res.json(session));
                    userSession.save((err, doc) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: 'Server error' + err
                            });
                        } else {
                            User.find({ _id: user._id})
                                .then(user => {
                                   if(user[0].isAdministrator) {
                                       return res.send({
                                           success: true,
                                           message: 'Signed in as admin',
                                           token: doc._id
                                       })
                                   } else {
                                       return res.send({
                                           success: true,
                                           message: 'Signed In'
                                       })
                                   }
                                })
                                .catch(err => res.json(err));
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;