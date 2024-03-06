const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [String], // Change type to an array of strings
        enum: ["user"], // Add more roles if needed
        default: ["user"] // Set default value as an array with "user"
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);
