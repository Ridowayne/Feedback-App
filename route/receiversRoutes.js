const express = require('express');
const { Agent } = require('http');
const app = express();
// const router = app.router;
const receiverController = require('../controllers/receiversController');

// Engineering routes
app
  .route('/engineering/forms')
  .get(receiverController.engineeringForms)
  .patch(receiverController.respondToForm);

// specific engineering issues by id
app
  .route('/engineering/forms/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

app
  .route('/operations/forms')
  .post()
  .get(receiverController.operationsForms)
  .patch(receiverController.respondToForm);

// specific operations issues by Id
app
  .route('/operations/forms/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

app
  .route('/management/forms')
  .post()
  .get(receiverController.managementForms)
  .patch(receiverController.respondToForm);

// specific management issues by Id
app
  .route('/management/forms/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

app
  .route('/')
  .get(receiverController.generalSuggestionForms)
  .patch(receiverController.respondToForm);

// specific general issues based on id
app
  .route('/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

// export it
module.exports = app;
