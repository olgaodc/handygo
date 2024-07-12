import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true, minlength: 3 },
  businessId: { type: String, required: true, minlength: 3 },
  // TO DO: Apjungti data ir laika i viena su Date tipu???
  date: { type: String, required: true, minlength: 10 },
  time: { type: String, required: true, minlength: 5 },
  userEmail: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  userName: { type: String, required: true, minlength: 3 },
  status: { type: String, required: true, minlength: 5 },
  creationDate: { type: Date, required: true },
});

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;
