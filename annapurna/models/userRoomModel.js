const mongoose = require('mongoose');

const userRoomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    roomId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Room'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const UserRoom = mongoose.model('UserRoom', userRoomSchema);
module.exports = UserRoom;