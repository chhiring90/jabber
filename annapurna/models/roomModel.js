const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Room must have a name']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false
    },
    slug: String
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;