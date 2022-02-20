const express = require('express');
const messageController = require('./../controllers/messageController');

const router = express.Router();

router
  .route('/')
  .get(messageController.getMessage)
  .post(messageController.sendMessage);

module.exports = router;
