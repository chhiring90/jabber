const socketController = require('./controllers/socketController');

module.exports = io => io.on('connection', socket => {
    socketController.onJoin(socket);
    console.log('We have new connection')
});;