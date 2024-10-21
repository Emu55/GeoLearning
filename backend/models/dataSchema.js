var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
    name: { type: String, required: true },
    capital: { type: String, required: true },
    wikipediaUrl: { type: String }
});

module.exports = mongoose.model('country', countrySchema);