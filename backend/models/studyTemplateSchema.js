var mongoose = require('mongoose');

var studyTemplateSchema = new mongoose.Schema({
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'country',
        required: true
    },
    answers: {
        type: [String], // Array of answers from the user
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('studyTemplate', studyTemplateSchema);
