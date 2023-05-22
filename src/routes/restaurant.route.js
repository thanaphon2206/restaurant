const express = require('express');
const controller = require('../controllers/restaurant.controller');
const router = express.Router();

router.post('/initialize',  controller.initialize)

module.exports = router;