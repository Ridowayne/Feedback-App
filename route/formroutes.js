const express = require('express');
const { Agent } = require('http');
const app = express();
const formController = require('../controllers/formControllers');
const reviewController = require('../controllers/reviewController');

const router = app.router;

// to get all feedbacks submitted, await MyModel.find({ name: 'john', age: { $gte: 18 } })
// to get all resolved feedbacks, Form.find({resolved: true})
// to get all unresolved feedbacks, Form.find({resolved: false})
// to get all pending feedbacks,
// to get all feedbacks with ratings and reviews, will be done by refferencing the ratings and review that will have its own collection in the DB, Form.find().populate
// supper admin to get all users User.find()

router
  .route('/admin/forms')
  .get(formController.readForm)
  .get(formController.readForms)
  .get()
  .get()
  .get();

// routes partaining to agents and forms
router
  .route('/agents/forms')
  .post(formController.sendForm)
  .get(formController.readForms)
  .patch(formController.review);

// Routes for for handling specific form
router
  .route('/agents/forms/:id')
  .get(formController.readForm)
  .patch(formController.respondToForm);

// Engineering routes
router
  .route('/engineering/forms')
  .get(formController.engineeringForms)
  .patch(formController.respondToForm);

// specific engineering issues by id
router
  .route('/engineering/forms/:id')
  .get(formController.readForm)
  .patch(formController.respondToForm);

router
  .route('/operations/forms')
  .post()
  .get(formController.operationsForms)
  .patch(formController.respondToForm);

// specific operations issues by Id
router
  .route('/operations/forms/:id')
  .get(formController.readForm)
  .patch(formController.respondToForm);

router
  .route('/management/forms')
  .post()
  .get(formController.managementForms)
  .patch(formController.respondToForm);

// specific management issues by Id
router
  .route('/management/forms/:id')
  .get(formController.readForm)
  .patch(formController.respondToForm);

router
  .route('/general/forms')
  .get(formController.generalSuggestionForms)
  .patch(formController.respondToForm);

// specific general issues based on id
router
  .route('/general/forms/:id')
  .get(formController.readForm)
  .patch(formController.respondToForm);

// Super Admin getting issues
router.route('superAdmin/forms').get(formController.superAdminallforms);

// super Admin getting specific issues by Id
router.route('superAdmin/forms/:id').get(formController.readForm);

router.route('reviews').post(reviewController.writeReview);
module.exports = router;
