const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

const app = require('../app');
const Review = require('../models/reviewsModels');
const catchAsync = require('../utils/catchAsync');

exports.writeReview = catchAsync(async (req, res) => {
  const review = await Review.create(req.body);

  io.socket.on('review', function (review) {
    io.emit('newFeedback', review);
  });

  res.status(201).json({
    status: 'Success',
    data: {
      review,
    },
  });
});
