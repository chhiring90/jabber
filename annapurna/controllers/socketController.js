const User = require('../models/userModel');
const Room = require('../models/roomModel');
const UserRoom = require('../models/userRoomModel');
const Message = require('../models/messageModel');
const MessageRecipient = require('../models/messageRecipientModel');

// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

exports.onJoinServer = (io,socket) => async (data, callback) => {
    try {
        const user = await User.findByIdAndUpdate(data._id, { active: true });
        if (!user) return callback();
        socket.userId = user._id;
        socket.emit('joinedserver', user._id);
        callback();
    } catch (err) {
        console.log(err);
    }
}

exports.onCreateRoom = (io,socket) => async (roomInfo, callback) => {
    try {
        const { name, admin, slug, userId } = roomInfo;

        if(!slug) callback();

        const slugArr = slug.split('&');
        const slugRevert = `${slugArr[1]}&${slugArr[0]}`;

        let room = await Room.findOne({ slug: { $in: [slugRevert, slug] } });
        if (!room) {
            room = await Room.create({ slug, name, admin });
        }

        socket.join(room._id);

        let userRoom = await UserRoom.findOne({ userId, roomId: room._id });
        if (!userRoom) {
            userRoom = await UserRoom.create({
                userId,
                roomId: room._id
            });
        }

        socket.emit('createdroom', room._id);
        callback();
    } catch (err) {
        console.log(err);
    }
}

exports.onMessage = (io,socket) => async (message, callback) => {
    try {
        const { creator, messageBody, parentMessage, recipientRoom } = message;
        if(creator){
            await Message.create({
                creator,
                messageBody,
                parentMessage
            });
        }
        socket.join(recipientRoom);
        socket.emit('message', message);
    } catch (err) {
        console.log(err);
    }
}

exports.onDisconnect = (io,socket) => async (reason) => {
    try {
        const user = await User.findByIdAndUpdate(socket.userId, { active: false });
        console.log({ reason, user }, socket.userId, 'onDisconnect');
    } catch (err) {
        console.log(err);
    }
}