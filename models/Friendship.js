const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    user1: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming 'User' is the correct model name
    },
    user2: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming 'User' is the correct model name
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Friendship', friendshipSchema);
