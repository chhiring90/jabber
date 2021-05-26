const socketController = require('./controllers/socketController');

module.exports = io => {
    const onConnetion = socket => {
        socketController.onJoin(socket);
    }

    io.on('connection', onConnetion);
};
