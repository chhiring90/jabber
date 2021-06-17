const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.route('/')
    .get(messageController.getAllMessage)
    .post(messageController.createMessage);

router.route('/:id')
    .get(messageController.getMesssage)
    .patch(messageController.updateMessage)
    .delete(messageController.deleteMessage);

module.exports = router;