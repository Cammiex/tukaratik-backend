const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.delete('/:id', userController.deleteUser);
router.get('/:id/points', userController.getUserPointsById);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);

module.exports = router;
