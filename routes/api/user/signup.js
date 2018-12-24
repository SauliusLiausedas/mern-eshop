const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');

router.post('/', (req, res) => {
   const { body } = req;
   const { name, password, admin, token } = body;
   let authorized = false
   let userId = ''
    
    UserSession.find({
        _id: token
    }).then(session =>{
        userId = session[0].sessionId
        User.find({
            _id: userId,
            isAdministrator: true
         })
         .then((user) => {
             if(user.length === 1) {
                 authorized = true
             } else {
                res.send({
                    success: false,
                    message: 'You are not allowed'
                })
             }
         })
         .catch(err => console.log(err))
         
     
        if(!name) {
            res.send({
                success: false,
                message: 'Username is required!'
            })
        } else if(!password) {
            res.send({
                success: false,
                message: 'Password is required!'
            })
        } else {
            User.find({
                name: name
            }, (err, previousUsers) => {
                if (err) {
                    res.send({
                        success: false,
                        message: 'Server Error'
                    })
                } else if (previousUsers.length > 0) {
                    res.send({
                        success: false,
                        message: 'User already exists.'
                    })
                } else {
                     if(authorized) {
                             const newUser = new User();
                             newUser.name = name;
                             newUser.password = newUser.generateHash(password);
                             if(admin) {
                                 newUser.isAdministrator = true
                             }
                             newUser.save().then(user => res.send({
                                 success: true,
                                 message: `User successfully added with name ${newUser.name}`
                             }))
                             .catch(err => res.json(err))
                     } else {
                            console.log('Unauthorized')
                     }
                }
            });
        }
    });

});

module.exports = router;