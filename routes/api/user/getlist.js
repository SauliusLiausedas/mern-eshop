const express = require('express');
const router = express.Router();
const User = require('../../../models/User');

router.get('/', (req, res) => {

    User.find().sort({isAdministrator: -1, isDeleted: 1, name: 1}).then(users => res.json(users))

});

module.exports = router;