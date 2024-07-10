const express = require('express');

const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  GET_USERS,
  REGISTER,
  LOGIN,
} = require('../controllers/user');

router.get('/users', authMiddleware, GET_USERS);
router.post('/register', REGISTER);
router.post('/login', LOGIN);

module.exports = router;
