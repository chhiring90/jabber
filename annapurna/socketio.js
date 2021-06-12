const socketController = require('./controllers/socketController');

module.exports = io => io.on('connection', socket => {
    console.log('We have new connection');

    socket.on('joinserver', socketController.onJoinServer(socket));
    socket.on('createroom', socketController.onCreateRoom(socket))
    socket.on('disconnect', socketController.onDisconnect(socket));
});