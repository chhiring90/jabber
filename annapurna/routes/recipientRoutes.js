const express = require('express');
const recipientController = require('../controllers/recipientController');

const router = express.Router();

router.route('/')
    .get(recipientController.getAllRecipients)
    .post(recipientController.createRecipient);

router.route('/:id')
    .get(recipientController.getReccipient)
    .patch(recipientController.updateRecipient)
    .delete(recipientController.deleteRecipient);

router.route('/:recipient/:room')
    .get(recipientController.getRoomRecipients);

module.exports = router;