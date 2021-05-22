const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function (next) {
    //  only run if the password was actually modified
    if (!this.isModified('password')) return next();

    // hash the password with the cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.passwordCorrect = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.passwordChangedAfter = function (jwtTimestamp) {
    if (this.passwordChangedAt) {
        const changedtimeStamp = parseInt(this.passwordChangedAt / 1000, 10);
        return changedtimeStamp > jwtTimestamp;
    }
    return false;
}

const User = mongoose.model('User', userSchema);
module.exports = User;