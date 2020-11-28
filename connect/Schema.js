const mongoose = require('mongoose')
const UrlSheme = mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    clicks: {
        type: Number
        // default:0
    },
    created: {
        type: String,
        default: new Date
    }
})

module.exports = mongoose.model('short_URL', UrlSheme)