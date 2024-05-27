const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', cartController.getAllCartItems);
router.post('/', cartController.addCartItem);
router.put('/:id', cartController.updateCartItem);
router.delete('/:id', cartController.deleteCartItem);

module.exports = router;
