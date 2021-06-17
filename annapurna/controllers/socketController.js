const User = require('../models/userModel');
const Room = require('../models/roomModel');
const UserRoom = require('../models/userRoomModel');
const Message = require('../models/messageModel');
const MessageRecipient = require('../models/messageRecipientModel');

// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');

module.exports = (io, socket) => {
    console.log('We have new connection');

    const onJoinServer = async (data, callback) => {
        try {
            const user = await User.findByIdAndUpdate(data._id, { active: true });
            if (!user) return callback();
            socket.userId = user._id;
            socket.broadcast.emit('joinedserver', user._id);
            callback();
        } catch (err) {
            console.log(err);
        }
    }

    const onCreateRoom = async (roomInfo, callback) => {
        try {
            const { name, admin, slug, userId, userSlug, currentUserSlug } = roomInfo;
            if (!slug) return callback();

            const slugArr = slug.split('&');
            const slugRevert = `${slugArr[1]}&${slugArr[0]}`;

            let room = await Room.findOne({ slug: { $in: [slugRevert, slug] } });
            if (!room) {
                room = await Room.create({ slug, name, admin });
            }

            let userRoom = await UserRoom.findOne({ userId, roomId: room._id });
            if (!userRoom) {
                userRoom = await UserRoom.create({
                    userId,
                    roomId: room._id
                });
            }
            socket.emit('createdroom', room);
            socket.roomId = room._id;
        } catch (err) {
            console.log(err);
        }
    }

    const onJoinRoom = async ({room, user}) => {
        try {
            console.log(room, 'ONJOINROOM');
            socket.join(room);

            const message = {
                messageBody: `${user.name} joined conversation`,
                creator: 'jabber-admin'
            }

            socket.broadcast.to(room).emit('messagesend', message);
        }catch(err){
            console.log(err);
        }
    }

    const onMessage = async (message) => {
        try {
            const { creator, messageBody, parentMessage, recipientRoom, recipientId, messageId } = message;
            // console.log(message);
            if (creator) {
                await Message.create({
                    creator,
                    messageBody,
                    parentMessage
                });
            }

            socket.join(recipientRoom);
            io.to(recipientRoom).emit('messagesend', message);
            console.log(socket.rooms);
        } catch (err) {
            console.log(err);
        }
    }

    const onDisconnect = async (reason) => {
        try {
            const user = await User.findByIdAndUpdate(socket.userId, { active: false });
            socket.broadcast.emit('disconnectserver', socket.userId);
            console.log({ reason, user }, socket.userId, 'onDisconnect');
        } catch (err) {
            console.log(err);
        }
    }

    socket.on('joinserver', onJoinServer);
    socket.on('createroom', onCreateRoom);
    socket.on('joinroom', onJoinRoom);
    socket.on('message', onMessage);
    socket.on('disconnect', onDisconnect);
};