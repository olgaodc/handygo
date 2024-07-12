import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  id: { type: String, required: true, minlength: 3 },
  businessName: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  address: { type: String, required: true, minlength: 10 },
  category: { type: String, required: true, minlength: 3 },
  person: { type: String, required: true, minlength: 8 },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  images: [{
    url: { type: String, required: true },
    alt: { type: String, required: false },
  }],
  creationDate: { type: Date, required: true },
});

const BusinessModel = mongoose.model('Business', businessSchema);

export default BusinessModel;
