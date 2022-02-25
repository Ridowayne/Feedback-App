const express = require('express');
const { Agent } = require('http');
const app = express();
const superAdminController = require('../controllers/supperAdminController');
const reviewController = require('../controllers/reviewController');

// Super Admin getting issues
router.route('superAdmin/forms').get(superAdminController.superAdminallforms);

// super Admin getting specific issues by Id
router.route('superAdmin/forms/:id').get(superAdminController.readForm);
