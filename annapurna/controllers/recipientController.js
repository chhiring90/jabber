const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const MessageRecipientModel = require('../models/messageRecipientModel');

exports.getAllRecipients = factory.getAll(MessageRecipientModel);
exports.getReccipient = factory.getOne(MessageRecipientModel);
exports.createRecipient = factory.createOne(MessageRecipientModel);
exports.updateRecipient = factory.updateOne(MessageRecipientModel);
exports.deleteRecipient = factory.deleteOne(MessageRecipientModel);

exports.getRoomRecipients = catchAsync(async (req, res, next) => {
    const {recipient, room} = req.params;

    if(!recipient) return new AppError('No Message Recipient with that Id', 404);

    if(!room) return new AppError('No Message Recipient found with that Room Id', 404);

    const messageRecipients = await MessageRecipientModel.find({
        recipient: recipient,
        recipientRoom: room
    });

    res.status(200).json({
        status: 'success',
        results: messageRecipients.length,
        data: {
            data: messageRecipients
        }
    });
});