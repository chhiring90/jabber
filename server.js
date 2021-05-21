const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config({ path: `${path.join(__dirname, './config.env')}` });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log(chalk.greenBright('Database connected succesfully')));

// START SERVER 
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Server listening to port ${chalk.cyan(port)} on ${chalk.cyan(process.env.NODE_ENV.toUpperCase())} mode.`));