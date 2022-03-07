const express = require('express');
const bodyParser = require('body-parser');
const ErrorResponse = require('./utils/errorResponse');
const globalErrorHandler = require('./utils/errorResponse');

const messageRoutes = require('./route/messageRoutes');
const amRoutes = require('./route/amRoutes');
const superAdminRoutes = require('./route/superAdminRoutes');
const recceiverRoutes = require('./route/receiversRoutes');
const chat = require('./controllers/messageController');

const app = express();

app.use(express.json({ limit: '10kb' }));
// app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.io = io;
  return next();
});

// Routes
app.use('/api/v1/message', messageRoutes);
app.use('/api/v1/agents/forms', amRoutes);
app.use('/api/v1/superAdmin/forms', superAdminRoutes);
app.use('/api/v1/engineering', recceiverRoutes);
app.use('/api/v1/operations', recceiverRoutes);
app.use('/api/v1/management', recceiverRoutes);
app.use('/api/v1/generalSugesstions', recceiverRoutes);
//  app.route('/message').get(chat.getMessage).post(chat.sendMessage);

// this is for unhandled routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can not get ${req.originalUrl} on the server`,
  });
  next(new ErrorResponse(`can not get ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
