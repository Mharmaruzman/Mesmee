// ConversationRoutes.js

const express = require('express');
const router = express.Router();
const ConversationController = require('../controllers/ConversationController');

// Import the updateConversation function from the controller
const { updateConversation } = ConversationController;

// Define the route for updating a conversation
router.patch('/:id', updateConversation);

module.exports = router;
