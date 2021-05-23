const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    createAt: {
        type: Date,
    },
    parentMessage: {
        type: mongoose.Schema.ObjectId,
        ref: 'Message'
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    expiryDate: {
        type: Date
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;