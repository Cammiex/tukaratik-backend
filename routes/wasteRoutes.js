const express = require('express');
const router = express.Router();
const wasteController = require('../controllers/wasteController');

router.post('/submit', wasteController.submitWaste);

module.exports = router;