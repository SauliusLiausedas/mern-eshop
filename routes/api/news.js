const express = require('express');
const router = express.Router();
const News = require('../../models/News');

// Get all threads
router.get('/', (req, res) => {
   News.find().sort({date: -1})
       .then(news => res.json(news))
});

// Create new thread
router.post('/', (req, res) => {
    const { body } = req;
    const { header, image, text } = body;
    if(!header || !text) {
        return res.send({
            success: false,
            message: 'You must add header and text!'
        })
    } else {
        if(header.length > 100) {
            return res.send({
                success: false,
                message: 'Header too long!'
            })
        } else if(text.length < 200) {
            return res.send({
                success: false,
                message: 'Text too short!'
            })
        } else {
            const newNews = new News();
            newNews.header = header;
            if (image) {
                newNews.image = image;
            }
            newNews.text = text;
            newNews.save()
                .then(news => res.json(news))
                .catch(err => console.log(err))
        }
    }
});

//  Delete thread
router.delete('/:id', (req, res) => {
   News.findById({ _id: req.params.id})
       .then(item => item.remove().then((item) => res.json(item)))
       .catch(err => res.status(404).json(err.message));
});

// Edit
router.put('/:id', (req, res) => {
    const { body } = req;
    const { header, image, text } = body;
    News.findOneAndUpdate({_id: req.params.id}, {header: header, image: image, text: text }, null, (err) => {
        if(err) {
            return res.send({
                success: false,
                message: 'Server error ' + err
            })
        } else {
          return res.send({
              success: true,
              message: 'Successfully updated'
          })
        }
    })
});

module.exports = router;