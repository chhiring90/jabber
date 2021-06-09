const socketController = require('./controllers/socketController');

module.exports = io => io.on('connection', socket => {
    console.log('We have new connection');

    socket.on('join', socketController.onJoin(socket));
    socket.on('disconnect', socketController.onDisconnect(socket));
});