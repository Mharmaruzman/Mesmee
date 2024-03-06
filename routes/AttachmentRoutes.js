const express = require('express');
const router = express.Router();
const AttachmentController = require('../controllers/AttachmentController');

router.route('/')
    .get(AttachmentController.getAllAttachments)
    .post(AttachmentController.createNewAttachment)
    .patch(AttachmentController.updateAttachment)
    .delete(AttachmentController.deleteAttachment);

module.exports = router;
