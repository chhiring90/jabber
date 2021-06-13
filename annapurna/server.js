const path = require('path');
const http = require('http');
const socket = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config({ path: `${path.join(__dirname, './config.env')}` });
const app = require('./app');
const socketHandler = require('./controllers/socketController');

const server = http.createServer(app);
const io =  socket(server);

const onConnection = sock => {
    socketHandler(io, sock);
}

io.on('connection', onConnection);

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log(chalk.greenBright('Database connected succesfully')));

// START SERVER 
const port = process.env.PORT || 5000;
server.listen(port, () =>
    console.log(`Server listening to port ${chalk.cyan(port)} on ${chalk.cyan(process.env.NODE_ENV.toUpperCase())} mode.`));