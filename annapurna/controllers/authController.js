const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Email = require('../utils/email');

const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
});

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const daysToMilliseconds = 24 * 60 * 60 * 1000;

    res.cookie('jwt', token,  {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * daysToMilliseconds
        ),
        httpOnly: true,
        // domain: 'http://127.0.0.1:5000',
        // path: '/login',
        sameSite: 'none',
        // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
        secure: true,
    });

    // Remove password from output
    user.password = undefined;

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

    if (!user || !(await user.passwordCorrect(password, user.password))) {
        return next(new AppError('Incorrect email or password'), 401);
    }

    // 3) createSendToken
    createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
    const oneSecond = 1 * 1000;
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + oneSecond),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });

    res.status(200).json({
        status: 'success',
    });
}

exports.isAuthorized = catchAsync(async (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: {
            user: req.user
        }
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    // 1) Get token and check if its there
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }

    if (!token) return next(new AppError('You are not logged in. Please login to get access.', 401));

    // 2) verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check if user exist
    const currentUser = await User.findById(decoded.id).select('-__v');

    if (!currentUser) return next(new AppError('The user belongs to this token doesnot exist'), 401);

    if (currentUser.passwordChangedAfter(decoded.iat)) {
        return next(new AppError('User has recently changed password. Please login again', 401));
    }

    req.user = currentUser;
    next();
});

exports.forgotpassword = catchAsync(async (req, res, next) => {
    // 1) Get User
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user email with this address.', 400));
    }

    // 2) Generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;
        await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email'
        });
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending email. Please try again.', 500));
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // 2) Token has not expired, there is a user, set new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update passwordChangeAt Property for user
    createSendToken(user, 200, req, res);
});