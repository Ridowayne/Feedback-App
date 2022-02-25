const express = require('express');
const { Agent } = require('http');
const app = express();
const router = app.router;
const receiverController = require('../controllers/receiversController');

// Engineering routes
router
  .route('/engineering/forms')
  .get(receiverController.engineeringForms)
  .patch(receiverController.respondToForm);

// specific engineering issues by id
router
  .route('/engineering/forms/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

router
  .route('/operations/forms')
  .post()
  .get(receiverController.operationsForms)
  .patch(receiverController.respondToForm);

// specific operations issues by Id
router
  .route('/operations/forms/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

router
  .route('/management/forms')
  .post()
  .get(receiverController.managementForms)
  .patch(receiverController.respondToForm);

// specific management issues by Id
router
  .route('/management/forms/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

router
  .route('/general/forms')
  .get(receiverController.generalSuggestionForms)
  .patch(receiverController.respondToForm);

// specific general issues based on id
router
  .route('/general/forms/:id')
  .get(receiverController.readForm)
  .patch(receiverController.respondToForm);

// export it
module.exports = router;
