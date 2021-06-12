const mongoose = require('mongoose');

const messageRecipientSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    recipientRoom: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room',
    },
    message: {
        type: mongoose.Schema.ObjectId,
        ref: 'Message',
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

const MessageRecipient = mongoose.model('MessageRecipient', messageRecipientSchema);
module.exports = MessageRecipient;