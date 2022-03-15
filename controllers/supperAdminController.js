const http = require('http');
const socketio = require('socket.io');

const app = require('../app');
const Form = require('./../models/formModel');
const catchAsync = require('./../utils/catchAsync');
const ErrorResponse = require('../utils/errorResponse');
const APIFeatures = require('../utils/apiFeatures');

const server = require('http').createServer(app);
const io = socketio(server);

// Super admin getting all forms with the features
exports.superAdminallforms = catchAsync(async (req, res) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Form.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const forms = await features.query;

  io.on('connection', (socket) => {
    // send a message to the client
    socket.emit('allFeedbacks', forms);
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: forms.length,
    data: {
      forms,
    },
  });
});

exports.readForm = catchAsync(async (req, res, next) => {
  const oneForm = await Form.findById(req.params.id);

  if (!oneForm) {
    return next(new ErrorResponse('no form found with such id', 404));
  }

  res.status(200).json({
    status: 'success',
    feedback: {
      allForm,
    },
  });
});
