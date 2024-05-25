const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/create', transactionController.createTransaction);
router.get('/user/:userId', transactionController.getTransactionsByUser);

module.exports = router;
