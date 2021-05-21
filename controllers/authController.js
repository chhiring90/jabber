const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');


const signToken = id => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
});

const createSendToken = (user, statusCode, res, req) => {
    const token = signToken(user._id);
    const daysToMilliseconds = 24 * 60 * 60 * 1000;
    const cookieOption = {
        expiresIn: new Date(Date.now() + process.env.JWT_EXPIRES * daysToMilliseconds),
        httpOnly: true,
    }

    if (process.env.NODE_ENV === 'production') cookieOption.secure = true;

    user.password = undefined;

    res.cookie('jwt', token, cookieOption);

    res.statusCode(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}


exports.signup = catchAsync(async (req, res, next) => {
    console.log(catchAsync);

    res.status(200).json({
        status: 'success',
    });
});