const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    slug: String,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// DOCUMENT MIDDLEWARE: RUNS BEFORE .SAVE() AND .CREATE()
userSchema.pre('save', function(next) {
    this.slug = slugify(this.name, {lower: true});
    next();
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.methods.passwordCorrect = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (jwtTimestamp) {
    if (this.passwordChangedAt) {
        const changedtimeStamp = parseInt(this.passwordChangedAt / 1000, 10);
        return changedtimeStamp > jwtTimestamp;
    }
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const tenMinutes = 10 * 60 * 1000;
    this.passwordResetExpires = Date.now() + tenMinutes;

    return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;