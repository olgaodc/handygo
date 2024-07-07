const { v4: uuidv4 } = require('uuid');
const BookingModel = require('../models/booking');

module.exports.GET_USER_BOOKINGS = async (req, res) => {
  try {
    const bookings = await BookingModel.find({ email: req.params.userEmail });

    if (!bookings) {
      return res.status(404).json({ response: 'Bookings not found' });
    };

    return res.status(200).json({ bookings: bookings })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}

module.exports.GET_BUSINESS_BOOKINGS_BY_DATE = async (req, res) => {
  try {
    const filteredBookings = await BookingModel.find({businessId: req.params.businessId, date: req.params.date});

    if (!filteredBookings) {
      return res.status(404).json({ response: 'Bookings not found' });
    };

    return res.status(200).json({ bookings: filteredBookings })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}

module.exports.ADD_BOOKING = async (req, res) => {
  try {
    const {businessId, date, time, userEmail, userName, status} = req.body;
    const booking = new BookingModel({
      id: uuidv4(),
      businessId,
      date,
      time,
      userEmail,
      userName,
      status,
      creationDate: new Date(),
    });

    // if (!booking.length) {
    //   return res.status(400).json({response: 'Booking validation failed'})
    // }

    const newBooking = await booking.save();
    return res.status(200).json({ booking: newBooking });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}


module.exports.DELETE_BOOKING = async (req, res) => { 
  try {
    const booking = await BookingModel.findOneAndDelete({id: req.params.id});

    if(!booking) {
      return res.status(404).json({response: 'Booking not found'});
    }

    return res.status(200).json({response: 'Booking deleted successfully', booking: booking })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: 'Error, please try later' });
  }
}