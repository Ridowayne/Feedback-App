const mongoose = require('mongoose');
const Review = require('./reviewsModels');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'kindly provide your name'],
  },
  time: {
    type: Date,
    default: Date.now,
  },
  feedbacktype: {
    type: String,
    required: [true, 'kindly specify the kind of feedback you want to give'],
    enum: [
      'Engineering',
      'Operations/Team-lead/hr',
      'General Suggestion',
      'Management',
    ],
  },
  description: {
    type: String,
    required: [
      true,
      'kindly give a description of the feedback you intend to submit',
    ],
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  resolution: {
    type: String,
  },
  // ratings and reviews could be reffrenced instead of embedding them here, just aded it it for the mean time
  ratings: {
    type: Number,
    max: 5,
    min: 1,
  },
  reviews: {
    type: String,
  },
  reviews: {
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
  },
});

formSchema.pre('save', function (next) {
  if (this.isModified('resolutiion')) return next;

  this.resolved = true;
  next();
});
const Form = mongoose.model('Form', formSchema);

module.exports = Form;
