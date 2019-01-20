const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date
    },
    email: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    address: {
        country: {
            type: String
        },
        city: {
            type: String
        },
        postalCode: {
            type: String
        }
    },
    summary: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    isAdministrator: {
        type: Boolean,
        default: false
    }
});

    UserSchema.methods.validEmail = function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    UserSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    UserSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };


module.exports = User = mongoose.model('User', UserSchema);