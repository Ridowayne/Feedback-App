const express = require('express');
const { Agent } = require('http');
const app = express();
const amController = require('../controllers/amController');
const reviewController = require('../controllers/reviewController');

// const router = app.router;

// routes partaining to agents and forms
app.route('/').get(amController.readForms).post(amController.sendForm);

// .patch(amController.review);

// Routes for for handling specific form
app.route('/:id').get(amController.readForm).patch(amController.respondToForm);
//
app.route('reviews').post(reviewController.writeReview);
// exporting it
module.exports = app;
