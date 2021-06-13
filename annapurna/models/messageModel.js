const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageBody: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
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