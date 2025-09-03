const express = require('express');
const formController = require('../controllers/formController');

const router = express.Router();

// POST /form
router.post('/', formController.createForm);

// GET /form
router.get('/', formController.getForm);

// PATCH /form
router.patch('/', formController.updateForm);

module.exports = router;