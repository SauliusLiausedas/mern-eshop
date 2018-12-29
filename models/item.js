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
    properties: {
        weight: {
            type: Number,
            default: 0.0
        },
        description: {
            type: String,
            default: 'Nėra aprašymo'
        }
    },
    discount: {
        type: Boolean,
        default: false
    },
    priceWithDiscount: {
        type: Number
    },
    clickPoints: {
        type: Number,
        default: 0
    }
});

module.exports = Item = mongoose.model('Item', ItemSchema);