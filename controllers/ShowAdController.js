const { error } = require('console')
const ShowAd = require('../models/Showad')

// Show the list of ShowAd
const index = (req, res, next) => {
    ShowAd.find()
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
// get single ShowAd
const show = (req, res, next) => {
    let ShowAdID = req.body.ShowAdID
    ShowAd.findById(ShowAdID)
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

// add new ShowAd
const store = (req, res, next) => {
    let ShowAd = new ShowAd({
        target_url: req.body.target_url
    })
    if(req.file){
        ShowAd.image_url = req.file.path
    }
    ShowAd.save()
    .then(response => {
        res.json({
            message: 'ShowAd Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// update ShowAd
const update = (req, res, next) => {
    let ShowAdID = req.body.ShowAdID
    let updateData = {
        image_url: req.body.image_url,
        target_url: req.body.target_url
    }
    ShowAd.findByIdAndUpdate(ShowAdID, {$set: updateData})
    .then(response => {
        res.json({
            message: 'ShowAd Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// delete ShowAd
const destroy = (req, res, next) => {
    let ShowAdID = req.body.ShowAdID
    ShowAd.findByIdAndDelete(ShowAdID)
    .then(response => {
        res.json({
            message: 'ShowAd Deleted Successfully!'
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