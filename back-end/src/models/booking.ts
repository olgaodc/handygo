import mongoose, { Schema, Document } from 'mongoose';

interface IBooking extends Document {
  id: string;
  businessId: string;
  date: string;
  time: string;
  userEmail: string;
  userName: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  creationDate: Date;
}

const bookingSchema = new Schema<IBooking>({
  id: { type: String, required: true, minlength: 3 },
  businessId: { type: String, required: true, minlength: 3 },
  date: { type: String, required: true, minlength: 10 },
  time: { type: String, required: true, minlength: 5 },
  userEmail: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  userName: { type: String, required: true, minlength: 3 },
  status: {
    type: String,
    required: true,
    enum: ['confirmed', 'pending', 'cancelled', 'completed'],
  },
  creationDate: { type: Date, required: true },
});

const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema);

export default BookingModel;
