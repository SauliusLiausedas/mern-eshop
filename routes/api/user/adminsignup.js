const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const UserSession = require('../../../models/UserSession');

// @route   PUT api/user/adminsignup
// @desc    Sign up for admin

router.post('/', (req, res) => {
   const { body } = req;
   const { email, password, admin, token } = body;
   let authorized = false;
   let userId = '';
    
    UserSession.find({
        _id: token
    }).then(session =>{
        userId = session[0].sessionId;
        User.find({
            _id: userId,
            isAdministrator: true
         })
         .then((user) => {
             if(user.length === 1) {
                 authorized = true;
                 if(!email) {
                    res.send({
                        success: false,
                        message: 'Email is required!'
                    })
                } else if(!password) {
                    res.send({
                        success: false,
                        message: 'Password is required!'
                    })
                } else {
                    User.find({
                        email: email
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
                                    if(newUser.validEmail(email)) {
                                        newUser.email = email;
                                        newUser.password = newUser.generateHash(password);
                                        if (admin) {
                                            newUser.isAdministrator = true
                                        }
                                        newUser.save().then(() => res.send({
                                            success: true,
                                            message: `User successfully added with name ${newUser.name}`
                                        }))
                                            .catch(err => res.json(err))
                                    } else {
                                        return res.send({
                                            success: false,
                                            message: 'Email not valid'
                                        });
                                    }
                                } else {
                                    res.status(401).send({
                                        success: false,
                                        message: 'Unauthorized'
                                    })
                                }
                        }
                    });
                }
             } else {
                return res.status(401).send({
                    success: false,
                    message: 'Must be admin to add users'
                })
             }
         })
         .catch(err => {
             res.status(401).res.send({
                 success: false,
                 message: 'Unauthorised'
             });
             console.log(err);
         });
    
    });
});

module.exports = router;