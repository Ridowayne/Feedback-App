const express = require('express');
const bodyParser = require('body-parser');
const ErrorResponse = require('./utils/errorResponse');
const globalErrorHandler = require('.');

const messageRoutes = require('./route/messageRoutes');
const chat = require('./controllers/messageController');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/message', messageRoutes);
// app.get('/message', chat.getMessage);
// app.post('/message', chat.sendMessage);

// this is for unhandled routes
// app.all('*', (req, res, next) => {
//   // res.status(404).json({
//   //   status: 'fail',
//   //   message: `can not get ${req.originalUrl} on the server`
//   // });
//   next(new ErrorResponse(`can not get ${req.originalUrl} on the server`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
