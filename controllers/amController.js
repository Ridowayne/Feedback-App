const socketio = require('socket.io');
const Form = require('./../models/formModel');
const catchAsync = require('./../utils/catchAsync');
const ErrorResponse = require('../utils/errorResponse');
const APIFeatures = require('../utils/apiFeatures');

// for sending forms
exports.sendForm = catchAsync(async (req, res) => {
  const form = await Form.create(req.body);

  io.socket.on('form', function (form) {
    io.socket.emit('newFeedback', form);
  });

  res.status(200).json({
    status: 'success',
    feedback: {
      form,
    },
  });
});

// for getting all feedback forms GET
exports.readForms = catchAsync(async (req, res) => {
  const user = req.params.user;
  const allForms = await Form.find({ sender: user });

  if (!allForms) {
    return next(
      new ErrorResponse('you do not have any feedback submitted yet')
    );
  }

  io.emit('usersforms', allForms);

  res.status(200).json({
    status: 'success',
    feedback: {
      allForms,
    },
  });
});

// for responding to responding to forms by resolver GET
exports.respondToForm = catchAsync(async (req, res, next) => {
  const response = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    return next(new ErrorResponse('no tour found with such id', 404));
  }
  io.socket.on('response', function (response) {
    io.socket.emit('agentResponse', response);
  });
  res.status(201).json({
    status: 'sucess',
    data: {
      response,
    },
  });
});

// for reading one parrticular form GET
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
