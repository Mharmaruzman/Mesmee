// StatusRoutes.js

const express = require('express');
const router = express.Router();
const StatusController = require('../controllers/StatusController');

// Import the updateStatus function from the controller
const { updateStatus } = StatusController;

// Define the route for updating a status
router.patch('/:id', updateStatus);

module.exports = router;
