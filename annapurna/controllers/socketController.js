const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.onJoinServer = socket => async (data, callback) => {
    try {
        const user = await User.findByIdAndUpdate(data._id, {active: true});
        if(!user) return callback();
        socket.userId = user._id;
        console.log('Join Server');
        socket.emit('joinedserver', user._id);
        callback();
    }catch(err) {
        console.log(err);
    }
}

exports.onDisconnect = socket => async (reason) => {
    try {
        const user = await User.findByIdAndUpdate(socket.userId, {active: false});
        console.log(reason);
        // if(!user) return new AppError('User not found')
        if(user){
            //  do stuff hahaha
        }
    }catch(err){
        console.log(err);
    }
}