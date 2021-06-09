const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find().select('-__v');

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError('No user found with this id'));

    res.status(200).json({
        status: 'success',
        data: user
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
    });
});