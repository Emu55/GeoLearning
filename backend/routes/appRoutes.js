const express = require('express');
const router = express.Router();
const Country = require('../models/dataSchema');
const StudyTemplate = require('../models/studyTemplateSchema');

// Search for countries by name
router.get('/search', async (req, res, next) => {
    try {
        const searchQuery = req.query.name; // Get the query parameter
        const countries = await Country.find({
            name: { $regex: searchQuery, $options: 'i' } // Case-insensitive search
        });
        res.status(200).json({ msg: countries });
    } catch (err) {
        res.status(500).json({ errmsg: err.message });
    }
});

// Create a new country
router.post('/create', async (req, res, next) => {
    try {
        const countryName = req.body.name;
        const capital = req.body.capital;
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(countryName)}`; // Generate Wikipedia URL

        const newCountry = new Country({
            name: countryName,
            capital: capital,
            wikipediaUrl: wikipediaUrl
        });

        const country = await newCountry.save();
        res.status(200).json({ msg: country });
    } catch (err) {
        res.status(500).json({ errmsg: err.message });
    }
});


// Read all countries
router.get('/read', async (req, res, next) => {
    try {
        const countries = await Country.find({}).sort({ name: 1 });
        res.status(200).json({ msg: countries });
    } catch (err) {
        res.status(500).json({ errmsg: err.message });
    }
});

// Update a country
router.put('/update', async (req, res, next) => {
    try {
        const country = await Country.findById(req.body._id);
        if (!country) {
            return res.status(404).json({ errmsg: 'Country not found' });
        }

        country.name = req.body.name;
        country.capital = req.body.capital;
        country.wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(req.body.name)}`; // Regenerate Wikipedia URL

        const updatedCountry = await country.save();
        res.status(200).json({ msg: updatedCountry });
    } catch (err) {
        res.status(500).json({ errmsg: err.message });
    }
});


// Delete a country
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const country = await Country.findByIdAndDelete(req.params.id);
        if (!country) {
            return res.status(404).json({ errmsg: 'Country not found' });
        }
        res.status(200).json({ msg: country });
    } catch (err) {
        console.error('Error deleting country:', err);
        res.status(500).json({ errmsg: 'Failed to delete country' });
    }
});


// Route to save a new study template
router.post('/saveStudyTemplate', async (req, res) => {
    try {
        const { countryId, answers } = req.body; // Destructure the form data from the request

        // Create a new study template document
        const newTemplate = new StudyTemplate({
            countryId: countryId,
            answers: answers
        });

        // Save the new template to the database
        const savedTemplate = await newTemplate.save();
        res.status(200).json({ message: 'Study template saved successfully!', data: savedTemplate });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save study template', details: err.message });
    }
});

// Get the study template for a country
router.get('/getStudyTemplate/:countryId', async (req, res, next) => {
    try {
        const studyTemplate = await StudyTemplate.findOne({ countryId: req.params.countryId });
        if (!studyTemplate) {
            return res.status(404).json({ msg: 'No study template found for this country' });
        }
        res.status(200).json({ msg: studyTemplate });
    } catch (err) {
        res.status(500).json({ errmsg: err.message });
    }
});

// Route to update an existing study template
router.put('/updateStudyTemplate/:id', async (req, res) => {
    try {
        const template = await StudyTemplate.findById(req.params.id);
        if (!template) {
            return res.status(404).json({ errmsg: 'Study template not found' });
        }

        // Update the answers in the study template
        template.answers = req.body.answers;

        // Save the updated template
        const updatedTemplate = await template.save();
        res.status(200).json({ message: 'Study template updated successfully!', data: updatedTemplate });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update study template', details: err.message });
    }
});

module.exports = router;
