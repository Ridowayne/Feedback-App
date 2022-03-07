const Form = require('./../models/formModel');
const catchAsync = require('./../utils/catchAsync');
const ErrorResponse = require('../utils/errorResponse');
const APIFeatures = require('../utils/apiFeatures');
const { isValidObjectId } = require('mongoose');

exports.respondToForm = catchAsync(async (req, res, next) => {
  const response = await Form.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!response) {
    return next(new ErrorResponse('no tour found with such id', 404));
  }

  io.socket.emit('');

  res.status(200).json({
    status: 'success',
    feedback: {
      allForm,
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

// getting feedbacks related to operartions issues
exports.operationsForms = catchAsync(async (req, res) => {
  const operationIssues = await Form.find({
    feedback: 'Operations/Team-lead/hr',
  });
  if (!operationIssues) {
    return next(
      new ErrorResponse('no Operations Issues submitted at the moment', 404)
    );
  }
  io.socket.emit('operationalFeedBack', operationIssues);
  res.status(200).json({
    status: 'Success',
    data: {
      operationIssues,
    },
  });
});

// for getting feedbacks related to management on the engineering Dashboard
exports.engineeringForms = catchAsync(async (req, res) => {
  const engineeringIssues = await Form.find({ feedback: 'Engineering' });

  if (!engineeringIssues) {
    return next(
      new ErrorResponse('no Engineering Issues submitted at the moment', 404)
    );
  }

  io.socket.emit('engineeringIssues', engineeringIssues);

  res.status(200).json({
    status: 'Success',
    data: {
      engineeringIssues,
    },
  });
});

// for getting feedbacks related to management on the mgt Console
exports.generalSuggestionForms = catchAsync(async (req, res) => {
  const generalSuggestionIssues = await Form.find({
    feedback: 'General Suggestion',
  });

  if (!generalSuggestionIssues) {
    return next(
      new ErrorResponse(
        'no General Suggestion feedbacks submitted at the moment',
        404
      )
    );
  }
  io.socket.emit('generalSuggestionIssues', generalSuggestionIssues);

  res.status(200).json({
    status: 'Success',
    data: {
      generalSuggestionIssues,
    },
  });
});

// for getting all Management Feedbacks
exports.managementForms = catchAsync(async (req, res) => {
  const managementIssues = await Form.find({ feedback: 'Management' });

  if (!managementIssues) {
    return next(
      new ErrorResponse('no Managements feedback submitted at the moment', 404)
    );
  }

  io.socket.emit('managementIssues', managementIssues);

  res.status(200).json({
    status: 'Success',
    data: {
      managementIssues,
    },
  });
});

// for rating the resolution of feedback PATCH if i later embed te ratins rather than refferece it
exports.review = catchAsync(async (req, res) => {
  const review = await Form.findByIdAndUpdate(req.params.ratins, req.body, {
    new: true,
    runValidators: true,
  });

  io.socket.on('allreview', function (review) {
    io.socket.emit('review', review);
  });

  res.status(201).json({
    status: 'Success',
    data: {
      review,
    },
  });
});
