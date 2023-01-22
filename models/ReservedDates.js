const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservedDatesSchema = new Schema({
    dateOfService: {
        type: String
    },
    typeOfService: {
        type: String
    },
    car: {
        make: {
            type: String
        },
        model: {
            type: String
        },
        modelYear: {
            type: String
        }
    },
    customer: {
        id: {
            type: String
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        }
    }
}, {collection: 'reservedDates'});

module.exports = mongoose.model('ReservedDates', ReservedDatesSchema);