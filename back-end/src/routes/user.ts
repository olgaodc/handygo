import express from 'express';

import authMiddleware from '../middleware/auth';
import {
  GET_USERS,
  REGISTER,
  LOGIN,
} from '../controllers/user';

const router = express.Router();

router.get('/users', authMiddleware, GET_USERS);
router.post('/register', REGISTER);
router.post('/login', LOGIN);

export default router;
