const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Group must have a name']
    },
    createAt: Date,
    admin: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    isActive: {
        type: Boolean,
        default: true,
        select: false
    }
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;