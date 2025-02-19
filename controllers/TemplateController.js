const { error } = require('console')
const Template = require('../models/Template')

// Show the list of Templates
const index = (req, res, next) => {
    Template.find()
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
// get single template
const show = (req, res, next) => {
    let templateID = req.body.templateID
    Template.findById(templateID)
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

// add new template
const store = (req, res, next) => {
    let template = new Template({
        name: req.body.name,
        templateCategory: req.body.templateCategory,
        jsonData: req.body.jsonData
    })
    template.save()
    .then(response => {
        res.json({
            message: 'Template Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// update template
const update = (req, res, next) => {
    let templateID = req.body.templateID
    let updateData = {
        name: req.body.name,
        templateCategory: req.body.templateCategory,
        jsonData: req.body.jsonData
    }
    Template.findByIdAndUpdate(templateID, {$set: updateData})
    .then(response => {
        res.json({
            message: 'Template Updated Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// delete template
const destroy = (req, res, next) => {
    let templateID = req.body.templateID
    Template.findByIdAndDelete(templateID)
    .then(response => {
        res.json({
            message: 'Template Deleted Successfully!'
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