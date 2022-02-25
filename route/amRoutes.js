const express = require('express');
const { Agent } = require('http');
const app = express();
const amController = require('../controllers/amController');
const reviewController = require('../controllers/reviewController');

const router = app.router;

// routes partaining to agents and forms
router
  .route('/agents/forms')
  .post(amController.sendForm)
  .get(amController.readForms)
  .patch(amController.review);

// Routes for for handling specific form
router
  .route('/agents/forms/:id')
  .get(amController.readForm)
  .patch(amController.respondToForm);
//
router.route('reviews').post(reviewController.writeReview);
// exporting it
module.exports = router;
