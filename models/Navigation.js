const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NavItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = NavItem = mongoose.model('NavItems', NavItemsSchema);