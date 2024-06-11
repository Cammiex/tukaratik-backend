const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addItemToCart);
router.put('/update', cartController.updateCartItem);
router.get('/:userId', cartController.getCartItems);
router.delete('/delete', cartController.deleteCartItem);
router.delete('/clear/:userId', cartController.clearCart);

module.exports = router;
