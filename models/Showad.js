const mongoose = require('mongoose')
const { type } = require('os')
const Schema   = mongoose.Schema

const showadSchema = new Schema({
    image_url: {
        type: String
    },
    target_url: {
        type: String
    },
}, {timestamps: true})

const ShowAd = mongoose.model('ShowAd', showadSchema)
module.exports = ShowAd