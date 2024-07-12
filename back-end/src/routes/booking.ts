import express from 'express';

import {
  GET_USER_BOOKINGS,
  GET_BUSINESS_BOOKINGS_BY_DATE,
  ADD_BOOKING,
  DELETE_BOOKING,
} from '../controllers/booking';

const router = express.Router();

router.get('/bookings/user/:email', GET_USER_BOOKINGS);
router.get('/businesses/:businessId/bookings/date/:date', GET_BUSINESS_BOOKINGS_BY_DATE);
router.post('/bookings', ADD_BOOKING);
router.delete('/bookings/:id', DELETE_BOOKING);

export default router;
