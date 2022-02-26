const express = require('express');
const { Agent } = require('http');
const app = express();
const superAdminController = require('../controllers/supperAdminController');
const reviewController = require('../controllers/reviewController');

// Super Admin getting issues
app.route('/').get(superAdminController.superAdminallforms);

// super Admin getting specific issues by Id
app.route('/:id').get(superAdminController.readForm);
module.exports = app;
