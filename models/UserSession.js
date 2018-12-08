const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSessionSchema = new Schema({
    sessionId: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});


module.exports = mongoose.model('UserSession', UserSessionSchema)