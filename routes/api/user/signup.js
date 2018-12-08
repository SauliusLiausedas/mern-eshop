const express = require('express');
const router = express.Router();
const User = require('../../../models/User');

router.post('/', (req, res) => {
   const { body } = req;
   const { name, password } = body;
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
               const newUser = new User();
               newUser.name = name;
               newUser.password = newUser.generateHash(password);
               newUser.save().then(user => res.json(user));
           }
       });
   }



});

module.exports = router;