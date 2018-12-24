const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    },
    isAdministrator: {
        type: Boolean,
        default: false
    }
});

    UserSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    UserSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };


module.exports = User = mongoose.model('User', UserSchema);