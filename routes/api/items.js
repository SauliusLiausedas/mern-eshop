const express = require('express');
const router = express.Router();

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
    const { name, quantity, picture, category, price, description, discount} = body;
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
        description: description,
        discount: discount
    });

    if(success) {
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
    }
});

// @route   DELETE api/items/:id
// @desc    Delete Item
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json(err.message));
})

module.exports = router;