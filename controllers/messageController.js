const socketio = require('socket.io');
const bodyPareser = require('body-parser');
const Message = require('./../models/messageModel');
const catchAsync = require('./../utils/catchAsync');
let io;

function init(httpServer) {
  io = socketio(httpServer);
}

exports.getMessage = catchAsync(async (req, res) => {
  const messages = await Message.find();

  io.emit('newMessage', messages);

  res.status(200).json({
    status: 'success',
    message: {
      messages,
    },
  });
});

exports.sendMessage = async (req, res) => {
  const send = await Message.create(req.body);

  io.socket.on('send', function (send) {
    io.socket.emit('messageSent', send);
  });

  res.status(201).json({
    status: 'success',
    message: {
      send,
    },
  });
};
