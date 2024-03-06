const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming 'User' is the correct model name
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message' // Assuming 'Message' is the correct model name
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GroupChat', groupChatSchema);
