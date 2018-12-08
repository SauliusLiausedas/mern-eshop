const express = require('express');
const router = express.Router();
const UserSession = require('../../../models/UserSession');

router.get('/', (req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    },
    {
        $set: { isDeleted: true }
    }, null, (err) => {
        if(err) {
            return res.send({
                success: 'false',
                message: 'Server error' + err
            })
        }
        if(!token) {
            return res.send({
                success: false,
                message: 'Invalid token'
            })
        }
        return res.send({
            success: true,
            message: 'Logged out'
        })
    })
});

module.exports = router;