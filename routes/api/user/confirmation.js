const express = require('express');
const router = express.Router();
const User = require('../../../models/User');

//  @route  PUT api/user/confirmation/:id
//  @desc   confirm new users email
router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.find({_id: id})
        .then((user) => {
            if(user.confirmed) {
                res.json(`Already confirmed`)
            } else {
                User.findOneAndUpdate({_id: id}, {confirmed: true}, null)
                    .then((user) => {
                        if(user.confirmed) {
                            return res.redirect('http://localhost:3000/patvirtinta');
                        } else {
                            return res.redirect('http://localhost:3000/patvirtinimas');
                        }
                    })
                    .catch(err => res.json(err));
            }
        })
});

module.exports = router;