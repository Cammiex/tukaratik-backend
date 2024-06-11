const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);
router.put('/status', orderController.updateOrderStatus);
router.get('/:userId/history', orderController.getOrderHistory);

module.exports = router;
