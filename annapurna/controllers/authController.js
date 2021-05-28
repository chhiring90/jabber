const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
});

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const daysToMilliseconds = 24 * 60 * 60 * 1000;
    const cookieOption = {
        expiresIn: new Date(Date.now() + process.env.JWT_EXPIRES * daysToMilliseconds),
        httpOnly: true,
    }

    if (process.env.NODE_ENV === 'production') cookieOption.secure = true;

    user.password = undefined;
    res.cookie('jwt', token, cookieOption);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        // passwordChangeAt: req.body.passwordChangeAt,
    });

    createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1)  check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // 2) check if password & user is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(user.passwordCorrect(password, user.password))) {
        return next(new AppError('Incorrect email or password'), 401);
    }

    // 3) createSendToken
    createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Get token and check if its there
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(new AppError('You are not logged in. Please login to get access.', 401));

    // 2) verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user exist
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) return next(new AppError('The user belongs to this token doesnot exist'), 401);

    if (currentUser.passwordChangedAfter(decoded.iat)) {
        return next(new AppError('User has recently changed password. Please login again', 401));
    }

    req.user = currentUser;
    next();
});