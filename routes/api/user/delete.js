const express = require('express');
const router = express.Router();
const UserSession = require('../../../models/UserSession');

router.put('/', async (req, res) => {
    const { body } = req;
    const { token, id } = body;

    UserSession.find({
        _id: token,
        isDeleted: false
    })
        .then((session) => {
            User.find({
                _id: session[0].sessionId,
                isAdministrator: true
            })
                .then(user => {
                    if(session[0].sessionId === id) {
                        return res.send({
                            success: false,
                            message: 'You can not delete yourself!'
                        })
                    }
                    if(user.length < 1) {
                        res.send({
                            success: false,
                            message: 'Only admin can delete user'
                        })
                    } else {
                        User.findOneAndUpdate({
                            _id: id,
                            isDeleted: false
                        }, 
                        {
                            $set: { isDeleted: true }
                        }, null, (err) => {
                            if(err) {
                                return res.send({
                                    success: 'false',
                                    message: 'Server error ' + err
                                })
                            } else {
                                return res.send({
                                    success: true,
                                    message: `user with ${id} deleted`
                                })
                            }
                        })
                    }
                })
                .catch(err => {
                    res.send({
                        success: false,
                        message: 'Server error: ' + err
                    })
                })
        })
        .catch(err => { 
            res.send({
                success: false,
                message: 'Server error: ' + err
            })
        })
});

module.exports = router;