const express = require('express');
const router = express.Router();
const Navigation = require('../../models/Navigation');

/*
 *  Add new Navigation Item
 */
router.post('/', (req, res) => {
    const { body } = req;
    const { name } = body;
    let { position } = body;
    if(!name) {
        return res.send({
            success: false,
            message: 'Must add name'
        })
    } else {
        if (!position) {
            Navigation.countDocuments((err, pos) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Server error ' + err
                    })
                }
                saveItem(name, pos, res)
            });
        } else {
            Navigation.find({position: position}, async (err, docs) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Server error: ' + err
                    })
                } else if (docs.length > 0) {
                    await Navigation.countDocuments((err, pos) => {
                        if (err) {
                            return res.send({
                                success: false,
                                message: 'Server error: ' + err
                            })
                        } else {
                            saveItem(name, pos, res)
                        }
                    })
                } else {
                    saveItem(name, position, res)
                }
            });
        }
    }
});

function saveItem(name, position, res) {
    const newNavItem = new Navigation();
    newNavItem.name = name;
    newNavItem.position = position;
    newNavItem.save()
        .then(item => res.json(item))
        .catch(err => console.log(err));
    console.log(newNavItem);
}

/*
 *  Get all navigation items
 */
router.get('/', (req, res) => {
    Navigation.find().sort({position: 1})
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