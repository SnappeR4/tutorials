const express = require('express')
const r̥outer  = express.Router()

const ShowAdController = require('../controllers/ShowAdController')
const upload           = require('../middleware/upload')

r̥outer.get('/', ShowAdController.index)
r̥outer.post('/show', ShowAdController.show)
r̥outer.post('/store', upload.single('image_url'), ShowAdController.store)
r̥outer.post('/update', upload.single('image_url'), ShowAdController.update)
r̥outer.post('/delete', ShowAdController.destroy)

module.exports = r̥outer