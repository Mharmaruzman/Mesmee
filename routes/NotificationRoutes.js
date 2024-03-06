// NotificationRoutes.js

const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

router.patch('/:id', NotificationController.updateNotification);

module.exports = router;
