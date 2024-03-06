// GroupchatRoutes.js

const express = require('express');
const router = express.Router();
const GroupchatController = require('../controllers/GroupchatController');

router.route('/')
    .get(GroupchatController.getAllGroupChats)
    .post(GroupchatController.createNewGroupChat)
    .patch(GroupchatController.updateGroupChat)
    .delete(GroupchatController.deleteGroupChat);

module.exports = router;
