const express = require('express');
const router = express.Router();
const {
    GET_CATEGORIES,
    ADD_CATEGORY,
} = require('../controllers/category');

router.get('/categories', GET_CATEGORIES);
router.post('/categories', ADD_CATEGORY);

module.exports = router;