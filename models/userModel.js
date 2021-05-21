const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name.']
    },
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Please enter a valid email address.'
        },
        unique: true
    },
    photo: {
        type: String,
        default: 'jabtar-default.jpg',
    },
    role: {
        type: String,
        enum: ['member', 'moderator', 'admin'],
        default: 'member'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password.'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide a password'],
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: 'Password are not same'
        }
    },
    passwordChangeAt: Date,
    PasswordResetToken: String,
    passwordResetExpire: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

const User = mongoose.model('User', userSchema);
exports.default = User;