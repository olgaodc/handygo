const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    id: {type: String, required: true, min: 3},
    businessName: {type: String, required: true, min: 3},
    description: {type: String, required: true, min: 10},
    address: {type: String, required: true, min: 10},
    category: {type: String, required: true, min: 3},
    person: {type: String, required: true, min: 3},
    email: {type: String, required: true, min: 5},
    images: [{
        url: { type: String, required: true },
        alt: { type: String, required: false }, // ar reikia?????
      }],
    creationDate: {type: Date, required: true},
});

module.exports = mongoose.model('Business', businessSchema);