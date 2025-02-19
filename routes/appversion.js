const express = require('express')
const r̥outer  = express.Router()

const AppVersionController = require('../controllers/AppVersionController')

r̥outer.get('/', AppVersionController.index)
r̥outer.post('/show', AppVersionController.show)
r̥outer.post('/store', AppVersionController.store)
r̥outer.post('/update', AppVersionController.update)
r̥outer.post('/delete', AppVersionController.destroy)

module.exports = r̥outer