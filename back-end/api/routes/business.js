const express = require('express');
const router = express.Router();
const {
    GET_BUSINESSES,
    GET_BUSINESS,
    GET_BUSINESSES_BY_CATEGORY,
    ADD_BUSINESS,
    UPDATE_BUSINESS,
} = require('../controllers/business');

router.get('/businesses', GET_BUSINESSES);
router.get('/business/:id', GET_BUSINESS);
router.get('/businesses/category/:category', GET_BUSINESSES_BY_CATEGORY);
router.post('/businesses', ADD_BUSINESS);
router.patch('/business/:id', UPDATE_BUSINESS);

module.exports = router;
