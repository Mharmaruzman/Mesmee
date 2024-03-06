const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Message'
    }],
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Attachment', attachmentSchema);
