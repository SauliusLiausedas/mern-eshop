const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = Cart = mongoose.model('Cart', CartSchema);