const Room = require('../models/roomModel'); 
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getAllRooms = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Room.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const rooms = await features.query;

    res.status(200).json({
        status: 'success',
        data: rooms
    });
});

exports.getRoom = catchAsync(async (req, res, next) => {
    const user = await Room.findById(req.params.id);

    if(!user) return next(new AppError('No Room found with this id', 404));
    res.status(200).json({
        status: 'success',
        data: user
    });
});

exports.createRoom = catchAsync(async (req, res, next) => {

});

exports.deleteRoom = catchAsync(async (req, res, next) => {
    await Room.findOneAndDelete(req.params.id);

    res.status(204).json({
        status: 'success',
    });
});

exports.updateRoom = catchAsync(async (req, res, next) => {

});