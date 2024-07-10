const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  id: { type: String, required: true, min: 3 },
  serviceName: { type: String, required: true, min: 3 },
  imageUrl: { type: String, required: true, min: 10 },
  bgColor: { type: String, required: true, min: 3 },
  creationDate: { type: Date, required: true },
});

module.exports = mongoose.model('Category', categorySchema);
