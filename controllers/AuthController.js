const User   = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedpass) {
        if(err){
            res.json({
                error: err
            })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedpass
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
    })
}

const login = (req, res, next) =>{
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username}, {phone:username}]})
    .then(user => {
        if(user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if(err) {
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name:user.name}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not macthed!'
                    })
                }
            })
        } else {
            res.json({
                message: 'No user Found!'
            })
        }
    })
}

const quickLogin = (req, res, next) => {
    const email = req.body.email;

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json({
                    message: 'Quick Login Successful!',
                    user: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone
                    }
                });
            } else {
                res.json({
                    message: 'No user found with this email!'
                });
            }
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!',
                error: error
            });
        });
};
module.exports = {
    register, login, quickLogin
}