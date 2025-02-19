const { error } = require('console')
const AppVersions = require('../models/Appversion')

// Show the list of AppVersions
const index = (req, res, next) => {
    AppVersions.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}
// get single AppVersions
const show = (req, res, next) => {
    let AppVersionsID = req.body.AppVersionsID
    AppVersions.findById(AppVersionsID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// add new AppVersions
const store = (req, res, next) => {
    let AppVersions = new AppVersions({
        appVersion: req.body.appVersion,
        isForce: req.body.isForce
    })
    AppVersions.save()
    .then(response => {
        res.json({
            message: 'AppVersions Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// update AppVersions
const update = (req, res, next) => {
    let AppVersionsID = req.body.AppVersionsID
    let updateData = {
        appVersion: req.body.appVersion,
        isForce: req.body.isForce
    }
    AppVersions.findByIdAndUpdate(AppVersionsID, {$set: updateData})
    .then(response => {
        res.json({
            message: 'AppVersions Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// delete AppVersions
const destroy = (req, res, next) => {
    let AppVersionsID = req.body.AppVersionsID
    AppVersions.findByIdAndDelete(AppVersionsID)
    .then(response => {
        res.json({
            message: 'AppVersions Deleted Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}