const catchAsync = require('../utils/catchAsync');

// const onJoin = catchAsync()


exports.onJoin = (socket) => {
    socket.on('join', (text) => {
        console.log(text);
        console.log(socket.rooms);
    });

    socket.join('Hello world');
    console.dir(socket);
}