const bodyPareser = require('body-parser');
const Form = require('./../models/formModel');
const catchAsync = require('./../utils/catchAsync');
const ErrorResponse = require('../utils/errorResponse');
const APIFeatures = require('../utils/apiFeatures');

// for filling form for feedback POST
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

// for getting feedbacks related to management on the Operations Dashboard
exports.operationsForms = catchAsync(async (req, res) => {
  const operationIssues = await Form.find({
    feedbackType: 'Operations/Team-lead/hr',
  });

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
  res.status(201).json({
    status: 'Success',
    data: {
      review,
    },
  });
});

// Super admin getting all forms with the features
exports.superAdminallforms = catchAsync(async (req, res) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Form.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const forms = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: forms.length,
    data: {
      forms,
    },
  });
});
