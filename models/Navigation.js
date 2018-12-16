const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const NavItemsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    href: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true,
        index: { unique: true }
    }
});

module.exports = NavItem = mongoose.model('NavItems', NavItemsSchema);