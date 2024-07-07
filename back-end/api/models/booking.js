const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    id: {type: String, required: true, min: 3},
    businessId: {type: String, required: true, min: 3},
    date: {type: String, required: true, min: 10}, //TO DO: Apjungti data ir laika i viena su Date tipu???
    time: {type: String, required: true, min: 10}, //
    userEmail: {type: String, required: true, min: 3},
    userName: {type: String, required: true, min: 3},
    status: {type: String, required: true, min: 5},
    creationDate: {type: Date, required: true},
});

module.exports = mongoose.model('Booking', bookingSchema);