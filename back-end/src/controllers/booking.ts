import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import BookingModel from '../models/booking';

export const GET_USER_BOOKINGS = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ response: 'Invalid email format' });
    }

    const bookings = await BookingModel.find({ userEmail: email });

    if (bookings.length === 0) {
      return res.status(404).json({ response: 'Bookings not found' });
    }

    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const GET_BUSINESS_BOOKINGS_BY_DATE = async (req: Request, res: Response) => {
  try {
    const filteredBookings = await BookingModel.find({
      businessId: req.params.businessId,
      date: req.params.date,
    });

    if (filteredBookings.length === 0) {
      return res.status(404).json({ response: 'Bookings not found' });
    }

    return res.status(200).json({ bookings: filteredBookings });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const ADD_BOOKING = async (req: Request, res: Response) => {
  try {
    const booking = req.body;

    if (!booking.businessId || !booking.date || !booking.time
      || !booking.userEmail || !booking.userName || !booking.status) {
      return res.status(400).json({ response: 'All fields are required' });
    }

    const newBooking = new BookingModel({
      ...booking,
      id: uuidv4(),
      creationDate: new Date(),
    });

    await newBooking.save();
    return res.status(200).json({ booking: newBooking });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};

export const DELETE_BOOKING = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId) {
      return res.status(400).json({ response: 'Invalid booking Id' });
    }

    const booking = await BookingModel.findOneAndDelete({ id: bookingId });

    if (!booking) {
      return res.status(404).json({ response: 'Booking not found' });
    }

    return res.status(200).json({ response: 'Booking deleted successfully', booking });
  } catch (err) {
    return res.status(500).json({ response: 'Error, please try later', err });
  }
};
