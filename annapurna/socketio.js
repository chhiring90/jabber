const socketController = require('./controllers/socketController');

module.exports = (io, socket) => {
    console.log('We have new connection');

    socket.on('joinserver', socketController.onJoinServer(io, socket));
    socket.on('createroom', socketController.onCreateRoom(io, socket));
    socket.on('message', socketController.onMessage(io, socket));
    socket.on('disconnect', socketController.onDisconnect(io, socket));
};