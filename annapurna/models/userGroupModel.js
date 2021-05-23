const mongoose = require('mongoose');

const userGroupSchema = new mongoose.Schema({
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

const UserGroup = mongoose.model('UserGroup', userGroupSchema);
module.exports = UserGroup;