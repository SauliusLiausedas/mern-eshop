const express = require('express');
const router = express.Router();
const UserSession = require('../../models/UserSession');
const User = require('../../models/User');

const Item = require('../../models/item');

// @route   GET api/items
// @desc    Get all items
router.get('/', (req, res) => {
    Item.find().sort({ price: -1 })
        .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create item
// @access  Public
router.post('/', (req, res) => {
    const { body } = req;
    const { item, token } = body;
    const { name, quantity, picture, category, price, properties, discount } = item;
    let success = true;


    if(!name || !quantity || !price) {
        success = false;
        res.send({
            success: false,
            message: 'Item must have name, quantity and price!'
        })
    }

    const newItem = new Item({
        name: name,
        quantity: quantity,
        picture: picture,
        category: category,
        price: price,
        properties: {
            weight: properties.weight,
            description: properties.description
        },
        discount: discount
    });

    if(success) {
        UserSession.find({
            _id: token
        }).then(session => {
            userId = session[0].sessionId;
            User.find({
                _id: userId,
                isAdministrator: true
            })
                .then((user) => {
                    if(user.length === 1) {
                        newItem.save()
                        .then((item) => {
                            res.json({
                                success: true,
                                message: `Item is added with name ${item.name}`
                            })
                        })
                        .catch((err) => {
                            if(err.name === "ValidationError") {
                                res.status(400).json({
                                    success: false,
                                    message: 'Wrong type of item value'
                                })
                            } else {
                                res.status(404).json({
                                    success: false,
                                    message: err
                                })
                            }
                        })
                    } else {
                        return res.status(404).send({
                            success: false,
                            message: 'Must be admin to add items!'
                        })
                    }
                })
        })
    } else {
        res.status(404).send({
            success: false,
            message: 'Server error'
        })
    }
});

// @route   DELETE api/items/:id
// @desc    Delete Item
router.delete('/:id/:token', (req, res) => {
    UserSession.find({
        _id: req.params.token,
        isDeleted: false
    })
        .then((session) => {
            User.find({
                _id: session[0].sessionId,
                isAdministrator: true
            })
                .then(user => {
                    if (user.length < 1) {
                        res.send({
                            success: false,
                            message: 'Only admin can delete items'
                        })
                    } else {
                        Item.findById(req.params.id)
                            .then(item => item.remove()
                                .then(() => res.send({
                                    success: true,
                                    message: 'Item deleted'
                                }))
                            )
                            .catch(err => res.status(404).json(err.message));
                    }
                })
                .catch(err => {
                    res.send({
                        success: false,
                        message: 'Server Error: ' + err
                    })
                })
        })
        .catch(err => {
            if(err.name === 'TypeError') {
                res.send({
                    success: false,
                    message: 'No permission'
                })
            } else {
                res.send({
                    success: false,
                    message: 'Server Error: ' + err
                })
            }
        })
});

module.exports = router;