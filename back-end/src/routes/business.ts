import express from 'express';

import {
  GET_BUSINESSES,
  GET_BUSINESS,
  GET_BUSINESSES_BY_CATEGORY,
  ADD_BUSINESS,
  UPDATE_BUSINESS,
} from '../controllers/business';

const router = express.Router();

router.get('/businesses', GET_BUSINESSES);
router.get('/business/:id', GET_BUSINESS);
router.get('/businesses/category/:category', GET_BUSINESSES_BY_CATEGORY);
router.post('/businesses', ADD_BUSINESS);
router.patch('/business/:id', UPDATE_BUSINESS);

export default router;
