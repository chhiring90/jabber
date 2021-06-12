const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// app.enable('trust proxy');
app.use(cookieParser());

// Pug Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//  Serve Static Files
// app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rooms', roomRoutes);

app.use('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;