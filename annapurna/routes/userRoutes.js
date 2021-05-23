const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Mounting Routes
// Authentication Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// User Routes
router
    .route('/')
    .get(
        authController.protect,
        userController.getAllUsers);
router
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser);

module.exports = router;