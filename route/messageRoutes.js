const express = require('express');
const messageController = require('./../controllers/messageController');

const app = express();

app
  .route('/')
  .get(messageController.getMessage)
  .post(messageController.sendMessage);

module.exports = app;
