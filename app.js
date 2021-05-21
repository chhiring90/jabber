const express = require('express');
const morgan = require('morgan');

const app = express();

//  Serve Static Files

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

module.exports = app;