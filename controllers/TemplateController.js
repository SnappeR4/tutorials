const Template = require('../models/Template');

// Show all templates
const index = async (req, res) => {
    try {
        const templates = await Template.find();
        res.status(200).json({
            success: true,
            data: templates,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching templates.',
        });
    }
};

// Show a single template
const show = async (req, res) => {
    const { templateID } = req.body;
    if (!templateID) {
        return res.status(400).json({ success: false, message: 'templateID is required.' });
    }

    try {
        const template = await Template.findById(templateID);
        if (!template) {
            return res.status(404).json({ success: false, message: 'Template not found.' });
        }
        res.status(200).json({ success: true, data: template });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while fetching the template.' });
    }
};

// Add new template
const store = async (req, res) => {
    const { name, templateCategory, jsonData } = req.body;

    if (!name || !templateCategory || !jsonData) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const newTemplate = new Template({ name, templateCategory, jsonData });
        await newTemplate.save();
        res.status(201).json({ success: true, message: 'Template added successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while adding the template.' });
    }
};

// Update existing template
const update = async (req, res) => {
    const { templateID, name, templateCategory, jsonData } = req.body;

    if (!templateID || !name || !templateCategory || !jsonData) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const updatedTemplate = await Template.findByIdAndUpdate(
            templateID,
            { name, templateCategory, jsonData },
            { new: true } // Returns the updated document
        );

        if (!updatedTemplate) {
            return res.status(404).json({ success: false, message: 'Template not found.' });
        }

        res.status(200).json({ success: true, message: 'Template updated successfully.', data: updatedTemplate });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while updating the template.' });
    }
};

// Delete template
const destroy = async (req, res) => {
    const { templateID } = req.body;

    if (!templateID) {
        return res.status(400).json({ success: false, message: 'templateID is required.' });
    }

    try {
        const deletedTemplate = await Template.findByIdAndDelete(templateID);
        if (!deletedTemplate) {
            return res.status(404).json({ success: false, message: 'Template not found.' });
        }
        res.status(200).json({ success: true, message: 'Template deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while deleting the template.' });
    }
};

module.exports = { index, show, store, update, destroy };
