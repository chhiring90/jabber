const express = require('express');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.route('/')
    .get(roomController.getAllRooms);

router.route('/:id')
    .get(roomController.getRoom)
    .delete(roomController.deleteRoom);

module.exports = router;