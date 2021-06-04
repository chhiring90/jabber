const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Mounting Routes
// Authentication Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotpassword', authController.forgotpassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.get('/authorize', authController.protect, authController.isAuthorized);

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