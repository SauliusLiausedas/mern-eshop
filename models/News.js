const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    header: {
        type: String,
        maxlength: [100, 'Too long for header'],
        required: true
    },
    image: {
        type: String,
        default: 'http://www.identdentistry.ca/identfiles/no_image_available.png'
    },
    text: {
        type: String,
        minlength: [200, 'Text must be longer'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = News = mongoose.model('News', NewsSchema);