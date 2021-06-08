const mongoose = require('mongoose');

const userRoomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    groupId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Group'
    },
    createAt: Date,
    isActive: {
        type: Boolean,
        default: true
    }
});

const UserRoom = mongoose.model('UserRoom', userRoomSchema);
module.exports = UserRoom;