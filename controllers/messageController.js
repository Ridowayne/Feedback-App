const bodyPareser = require('body-parser');
const Message = require('./../models/messageModel');
const catchAsync = require('./../utils/catchAsync');

exports.getMessage = catchAsync(async (req, res) => {
  const messages = await Message.find();

  res.status(200).json({
    status: 'success',
    message: {
      messages,
    },
  });
});

exports.sendMessage = async (req, res) => {
  const send = await Message.create(req.body);

  res.status(201).json({
    status: 'success',
    message: {
      send,
    },
  });
};
