const express = require('express');
const router = express.Router();
const Navigation = require('../../models/Navigation');

/*
 *  Add new Navigation Item
 */
router.post('/', (req, res) => {
    const { body } = req;
    const { name } = body;
    if(!name) {
        res.send({
            success: false,
            message: 'Must add name'
        })
    } else {
        const newNavItem = new Navigation();
        newNavItem.name = name;
        newNavItem.save().then(item => res.json(item));
    }
});

/*
 *  Get all navigation items
 */
router.get('/', (req, res) => {
    Navigation.find().sort({name: 1})
        .then(navItems => res.json(navItems))
});

/*
 *  Delete navigation item by ID
 */
router.delete('/:id', (req, res) => {
   Navigation.findById(req.params.id)
       .then(item => item.remove().then(() => res.json({success: true})))
       .catch(err => res.status(404).json(err.message));
});

router.put('/', (req, res) => {
    const { body } = req;
    const id = { _id } = body;
    Navigation.findOneAndUpdate(
        {
            _id: id
        },
        {
            $set: { name: req.body.name }
        }, null, (err) => {
            if(err) {
                return res.send({
                    success: false,
                    message: `Server error ${err}`
                })
            }
            if(!req.body.name) {
                return res.send({
                    success: false,
                    message: 'Must enter name'
                })
            }
            return res.send({
                success: true,
                message: 'Navigation item name updated'
            })
        }
    )
});

module.exports = router;