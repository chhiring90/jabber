const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

const Message = require('./models/messageModel');
const User = require('./models/userModel');
const Room = require('./models/roomModel');
const UserRoom  = require('./models/userRoomModel');
const MessageRecipient = require('./models/messageRecipientModel');

dotenv.config({ path: path.join(__dirname, './config.env') });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => console.log(chalk.blue('DATABASE CONNECT SUCCESSFULLY')))
.catch(err => console.log(chalk.red(err)));

const deleteData = async () => {
    try {
        await Message.deleteMany();
        await UserRoom.deleteMany();
        await Room.deleteMany();
        await MessageRecipient.deleteMany();
        console.log(chalk.green('Database clean Successfully!!!'));
    }catch(err) {
        console.log(chalk.red(err));
    }
    process.exit();
}

if(process.argv[2] === '--clean'){
    deleteData();
}

