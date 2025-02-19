const express = require('express')
const r̥outer  = express.Router()

const AuthController = require('../controllers/AuthController')

r̥outer.post('/register', AuthController.register)
r̥outer.post('/login', AuthController.login)

module.exports = r̥outer