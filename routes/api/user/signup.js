const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const nodemailer = require('nodemailer');

// @route   PUT api/user/signup
// @desc    Register new user
router.post('/', (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    if(email) {
        if(password) {
            User.find({email: email})
                .then(users => {
                    if (users.length > 0) {
                        res.send({
                            success: false,
                            message: `Šis el. paštas jau užregistruotas`
                        })
                    } else {
                        const newUser = new User();
                        if(newUser.validEmail(email)) {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'mostlytolearn@gmail.com',
                                    pass: 'Keturiasdesimtspenki56'
                                }
                            });
                            newUser.email = email;
                            newUser.password = newUser.generateHash(password);
                            if (firstName) {
                                newUser.firstName = firstName;
                            }
                            if (lastName) {
                                newUser.lastName = lastName;
                            }
                            newUser.save().then(() => {
                                res.send({
                                    success: true,
                                    message: `Vartotojas ${newUser.email} sėkmingai priregistruotas.`
                                });
                                User.find({email: email})
                                    .then((user) => {
                                        const mailOptions = {
                                            from: 'mostlytolearn@gmail.com',
                                            to: email,
                                            subject: 'Patvirtinkite savo el. pašto adresą',
                                            text: `Jūsų elektroninio pašto patvirtinimo nuoroda - http://localhost:5000/api/user/confirmation/${user[0]._id}`
                                        };
                                        transporter.sendMail(mailOptions, function(error, info) {
                                            if(error) {
                                                res.json(`Error sending email ${error}`);
                                            } else {
                                                console.log(info);
                                            }
                                        });
                                    })
                                    .catch((err) => console.log(err));
                            })
                                .catch(err => res.json(err))
                        } else {
                            return res.send({
                                success: false,
                                message: 'Neteisingas elektroninio pašto adresas'
                            });
                        }
                    }
                })
                .catch(err => res.json(err));
        } else {
            res.send({
                success: false,
                message: 'Užpildykite privalomus laukelius'
            })
        }
    } else {
        res.send({
            success: false,
            message: 'Užpildykite privalomus laukelius'
        })
    }
});

module.exports = router;