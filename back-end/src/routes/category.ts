import express from 'express';

import {
  GET_CATEGORIES,
  ADD_CATEGORY,
} from '../controllers/category';

const router = express.Router();

router.get('/categories', GET_CATEGORIES);
router.post('/categories', ADD_CATEGORY);

export default router;
