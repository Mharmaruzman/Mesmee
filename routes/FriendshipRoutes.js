const express = require('express');
const router = express.Router();
const FriendshipController = require('../controllers/FriendshipController');

router.route('/')
    .get(FriendshipController.getAllFriendships)
    .post(FriendshipController.createNewFriendship)
    .patch(FriendshipController.updateFriendship)
    .delete(FriendshipController.deleteFriendship);

module.exports = router;
