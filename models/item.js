const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        default: 'https://www.freeiconspng.com/uploads/no-image-icon-32.png'
    },
    category: {
        type: String,
        default: 'Miscellaneous'
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    discount: {
        type: Boolean,
        default: false
    }
});

module.exports = Item = mongoose.model('Item', ItemSchema);