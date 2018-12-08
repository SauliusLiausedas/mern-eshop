const express = require('express');
const router = express.Router();
const UserSession = require('../../../models/UserSession');

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
            return res.send({
                success: true,
                message: 'Logged in'
            })
        }
    })
});
module.exports = router;