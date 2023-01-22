const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreeDatesSchema = new Schema({
    dateOfService: {
        type: String
    }
}, { collection: 'freeDates' });

module.exports = mongoose.model('FreeDates', FreeDatesSchema);