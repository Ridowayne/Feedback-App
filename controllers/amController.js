const Form = require('./../models/formModel');
const catchAsync = require('./../utils/catchAsync');
const ErrorResponse = require('../utils/errorResponse');
const APIFeatures = require('../utils/apiFeatures');

// for sending forms
exports.sendForm = catchAsync(async (req, res) => {
  const form = await Form.create(req.body);

  io.emit('form', req.body);
  res.status(200).json({
    status: 'success',
    feedback: {
      form,
    },
  });
});

// for getting all feedback forms GET
exports.readForms = catchAsync(async (req, res) => {
  const allForms = await Form.find();

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
