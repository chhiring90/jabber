const Message = require('../models/messageModel');
const factory = require('./handlerFactory');

exports.getAllMessage = factory.getAll(Message);
exports.getMesssage = factory.getOne(Message);
// Donot use this route to create message
exports.createMessage = factory.createOne(Message);
exports.updateMessage = factory.updateOne(Message);
exports.deleteMessage = factory.deleteOne(Message);