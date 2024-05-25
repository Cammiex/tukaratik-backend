const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/redeem', productController.redeemPoints);

module.exports = router;