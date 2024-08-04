import express from 'express';

import authMiddleware from '../middleware/auth';
import {
  GET_USERS,
  REGISTER,
  LOGIN,
  EDIT_USER,
} from '../controllers/user';

const router = express.Router();

router.get('/users', authMiddleware, GET_USERS);
router.post('/register', REGISTER);
router.post('/login', LOGIN);
router.put('/user/:id', authMiddleware, EDIT_USER);

export default router;
