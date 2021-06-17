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

// POPULATE MIDDLEWARE 
userRoomSchema.pre(/^find/, function(next){
    this.populate({
        path: 'userId',
        select: '-__v'
    });
    next();
});

const UserRoom = mongoose.model('UserRoom', userRoomSchema);
module.exports = UserRoom;