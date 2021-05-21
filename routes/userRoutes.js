const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// Mounting Routes
router.get('/signup', authController.signup);

module.exports = router;