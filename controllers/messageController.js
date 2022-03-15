const http = require('http');
const socketio = require('socket.io');
const bodyPareser = require('body-parser');

const app = require('../app');
const Message = require('./../models/messageModel');
const catchAsync = require('./../utils/catchAsync');

const server = require('http').createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  // send a message to the client
  socket.emit('hello from server', console.log('hello from here'));
});

exports.getMessage = catchAsync(async (req, res) => {
  const messages = await Message.find();

  io.on('connection', (socket) => {
    // send a message to the client
    socket.emit('new message', messages);
  });
  // res.socket.emit('newMessage', messages);

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
  //  res.socket.on('createMessage', send);
  res.status(201).json({
    status: 'success',
    message: {
      send,
    },
  });
};
