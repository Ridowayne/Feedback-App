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
  fedbacktype: {
    type: String,
    required: [true, 'kindly specify the kind of feedback you want to give'],
    enum: [
      'Engineering',
      'Operations',
      'Team-lead/hr',
      'General Suggestion',
      'Management',
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
    ref: Review,
    type: Schema.Types.ObjectId,
  },
});

formSchema.pre('save', function (next) {
  if (this.isModified('resolutiion')) return next;

  this.resolved = true;
  next();
});
const Form = mongoose.model('Form', formSchema);

module.exports = Form;
