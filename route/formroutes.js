const express = require('express');
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
  .get(formController.readForm)
  .get(formController.readForms)
  .patch(formController.respondToForm)
  .patch(formController.review)
  .post(reviewController.writeReview);

router.route('/engineering/forms').post().get().patch();
router.route('/Operations/forms').post().get().patch();
router.route('/hr/forms').post().get().patch();

module.exports = router;
