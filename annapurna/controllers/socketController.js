const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.onJoin = socket => async (data, callback) => {
    try {
        const user = await User.findByIdAndUpdate(data.id, {active: true}).select('+active');
        socket.userId = user._id;
    }catch(err) {
        console.log(err);
    }
}

exports.onDisconnect = socket => async (reason) => {
    try {
        const user = await User.findByIdAndUpdate(socket.userId, {active: false}).select('+active');
        console.log(reason);
        // if(!user) return new AppError('User not found')
        if(user){
            //  do stuff hahaha
        }
    }catch(err){
        console.log(err);
    }
}